/*
 * API do HeroGuard — recebe o formulário da landing page e grava na tabela
 * "waitlist" do Postgres da stack. Sem framework: node:http + pg.
 *
 * Rotas:
 *   POST /api/waitlist  { name, email, phone, consent, consentVersion? }
 *   GET  /api/health    verifica a conexão com o banco
 *
 * O schema é criado/garantido na inicialização (idempotente), para o deploy
 * no Portainer não depender de um passo manual de migração.
 */

import { createServer } from "node:http";
import { Pool } from "pg";

const PORT = Number(process.env.PORT ?? 3000);
const DATABASE_URL = process.env.DATABASE_URL;

const MAX_BODY_BYTES = 4096;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const PHONE_MIN_DIGITS = 10;
const PHONE_MAX_DIGITS = 11;

if (!DATABASE_URL) {
  console.error("[api] DATABASE_URL não definida — encerrando.");
  process.exit(1);
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
});

const SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS waitlist (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    status text NOT NULL DEFAULT 'novo',
    consent_version text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
  );

  CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_key ON waitlist (email);
  CREATE INDEX IF NOT EXISTS waitlist_status_created_idx ON waitlist (status, created_at DESC);

  /* Migração (2026-10-28, decisão do usuário): ip, user_agent, consent_at e
   * source removidos — minimização de dados (LGPD). O IP é usado apenas em
   * memória para o rate limit; o momento do consentimento fica documentado
   * por created_at/updated_at e a versão aceita em consent_version.
   * Idempotente: derruba colunas criadas pela v0.1.6. */
  ALTER TABLE waitlist DROP COLUMN IF EXISTS ip;
  ALTER TABLE waitlist DROP COLUMN IF EXISTS user_agent;
  ALTER TABLE waitlist DROP COLUMN IF EXISTS consent_at;
  ALTER TABLE waitlist DROP COLUMN IF EXISTS source;
`;

const INSERT_SQL = `
  INSERT INTO waitlist (name, email, phone, consent_version)
  VALUES ($1, $2, $3, $4)
  ON CONFLICT (email) DO UPDATE SET
    name = EXCLUDED.name,
    phone = EXCLUDED.phone,
    consent_version = EXCLUDED.consent_version,
    updated_at = now()
  RETURNING id, status;
`;

/* ---------- Rate limit em memória (por IP) ---------- */

const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || entry.resetAt <= now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

const cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of hits) {
    if (entry.resetAt <= now) hits.delete(ip);
  }
}, 60_000);
cleanupTimer.unref();

/* ---------- Helpers ---------- */

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "content-length": Buffer.byteLength(body),
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];

    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error("payload-too-large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function clientIp(req) {
  /* Usado APENAS para o rate limit, em memória — nunca é persistido
   * (decisão de minimização de dados, 2026-10-28). */
  const forwarded = req.headers["x-forwarded-for"];

  if (typeof forwarded === "string" && forwarded.trim().length > 0) {
    /* A ÚLTIMA entrada é a adicionada pelo proxy confiável (Traefik); as
     * anteriores podem ter sido enviadas pelo próprio cliente. Usar a
     * primeira permitiria forjar IPs e burlar o rate limit. */
    const parts = forwarded
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);

    if (parts.length > 0) return parts[parts.length - 1].slice(0, 60);
  }

  return (req.socket.remoteAddress ?? "desconhecido").slice(0, 60);
}

function normalizeText(value, maxLength) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, maxLength) : "";
}

function validate(payload) {
  const name = normalizeText(payload?.name, 120);
  const email = normalizeText(payload?.email, 200).toLowerCase();
  const phoneDigits = typeof payload?.phone === "string" ? payload.phone.replace(/\D/g, "") : "";
  const consent = payload?.consent === true;

  if (name.length < 2) {
    return { error: "Informe seu nome para continuar." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return { error: "Informe um e-mail válido." };
  }
  if (phoneDigits.length < PHONE_MIN_DIGITS || phoneDigits.length > PHONE_MAX_DIGITS) {
    return { error: "Informe um telefone válido com DDD." };
  }
  if (!consent) {
    return { error: "É necessário aceitar o aviso de privacidade para continuar." };
  }

  return {
    value: {
      name,
      email,
      phone: phoneDigits,
      consentVersion: normalizeText(payload?.consentVersion, 40) || null,
    },
  };
}

/* ---------- Rotas ---------- */

async function handleWaitlist(req, res) {
  let payload;
  try {
    payload = JSON.parse(await readBody(req));
  } catch (error) {
    const tooLarge = error instanceof Error && error.message === "payload-too-large";
    sendJson(res, tooLarge ? 413 : 400, { ok: false, error: "Requisição inválida." });
    return;
  }

  const { error, value } = validate(payload);
  if (error) {
    sendJson(res, 400, { ok: false, error });
    return;
  }

  /* O limite conta apenas envios válidos: quem erra o formulário pode
   * corrigir e reenviar sem ficar bloqueado. */
  if (rateLimited(clientIp(req))) {
    sendJson(res, 429, { ok: false, error: "Muitas tentativas. Tente novamente em alguns minutos." });
    return;
  }

  try {
    const result = await pool.query(INSERT_SQL, [
      value.name,
      value.email,
      value.phone,
      value.consentVersion,
    ]);

    sendJson(res, 201, { ok: true, id: String(result.rows[0].id) });
  } catch (dbError) {
    console.error("[api] falha ao gravar na waitlist:", dbError);
    sendJson(res, 503, { ok: false, error: "Não foi possível salvar seus dados agora. Tente novamente." });
  }
}

async function handleHealth(res) {
  try {
    await pool.query("SELECT 1");
    sendJson(res, 200, { ok: true, database: "up" });
  } catch (error) {
    console.error("[api] healthcheck do banco falhou:", error);
    sendJson(res, 503, { ok: false, database: "down" });
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  const route = url.pathname.replace(/\/+$/, "") || "/";

  try {
    if (route === "/api/waitlist") {
      if (req.method !== "POST") {
        res.writeHead(405, { allow: "POST" });
        res.end();
        return;
      }
      await handleWaitlist(req, res);
      return;
    }

    if (route === "/api/health") {
      await handleHealth(res);
      return;
    }

    sendJson(res, 404, { ok: false, error: "Rota não encontrada." });
  } catch (error) {
    console.error("[api] erro não tratado:", error);
    if (!res.headersSent) sendJson(res, 500, { ok: false, error: "Erro interno." });
  }
});

/* ---------- Inicialização ---------- */

async function bootstrap() {
  const maxAttempts = 30;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await pool.query(SCHEMA_SQL);
      console.log("[api] schema da tabela waitlist pronto.");
      break;
    } catch (error) {
      if (attempt === maxAttempts) {
        console.error("[api] não foi possível preparar o schema:", error);
        process.exit(1);
      }
      console.warn(`[api] banco indisponível (tentativa ${attempt}/${maxAttempts}), aguardando 2s...`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  server.listen(PORT, () => {
    console.log(`[api] ouvindo em http://0.0.0.0:${PORT}`);
  });
}

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, async () => {
    console.log(`[api] ${signal} recebido — encerrando.`);
    server.close();
    await pool.end().catch(() => {});
    process.exit(0);
  });
}

bootstrap();
