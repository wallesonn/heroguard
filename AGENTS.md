# AGENTS.md

Instruções para agentes que trabalham neste repositório.

## Marca e identificadores técnicos

- O produto e o projeto se chamam **HeroGuard** (antes ChatGuard). A migração
  de nome foi aplicada em 2026-10-23 em todo o código e na infraestrutura
  versionada.
- Identificadores atuais: domínio `heroguard.my` (e `www.heroguard.my`),
  imagens `wallesonnn/heroguard-app` (site) e `wallesonnn/heroguard-api`
  (API de cadastro), containers `heroguard-app`/`heroguard-api`/`heroguard-db`,
  routers/services do Traefik `heroguard`, labels (`app=heroguard`,
  `domain=heroguard.my`, `service=heroguard-app`), usuário/banco
  `heroguard`, pastas `heroguard-app`/`heroguard-docker`. O cadastro da
  lista de espera grava na tabela `waitlist` do Postgres da própria stack.
- Domínio alterado de `heroguard.life` para `heroguard.my` em 2026-10-23
  (decisão do usuário). `heroguard.life` fica só como referência histórica na
  documentação; não voltar a usá-lo sem pedido explícito.
- Repositórios GitHub: app em `wallesonn/heroguard` e deploy em
  `wallesonn/heroguard-docker` (renomeados pelo usuário em 2026-10-23). Os
  remotes locais e a stack do Portainer (*Repository*) já usam as URLs novas.
- Artefatos antigos não usados pela configuração atual: domínio
  `chatguard.life`, imagem `wallesonnn/chatguard-app` e os PNGs
  `chatguard-sologo.png`/`chatguard-logo.png`.
- Wordmark: `components`/CSS usam as classes `brand-hero` e `brand-guard` e os
  tokens `--brand-hero`/`--brand-guard`.
- Identidade visual de `docs/visual-identity` (paleta azul/lilás,
  Manrope/Inter) **não** é aplicada à landing page — fica documentada para
  quando a aplicação de produto for implementada.
- Renomear novamente exige novo deploy, DNS e certificado — só com pedido
  explícito.

## Controle de versão (regra do usuário)

- **Não fazer commits nem push** — nem no repo do app (`heroguard-app`) nem no
  repo aninhado `heroguard-docker/` (que tem remote próprio no GitHub).
  O usuário faz os commits manualmente. Exceção: somente quando ele pedir
  explicitamente.
- Preparar alterações (edições, `git rm --cached`, stage) é permitido;
  `git commit` e `git push` não.

## Repo aninhado heroguard-docker/

- Remote próprio: `github.com/wallesonn/heroguard-docker` — padrão igual ao
  inlaudo (`inlaudo-web/inlaudo-docker`).
- O GitHub rastreia **somente** `README.md` e `docker-compose.yml`. Os demais
  arquivos (Dockerfile, nginx.conf, Dockerfile.dockerignore, .env.example)
  são apenas locais, ignorados pelo `.gitignore` da pasta.
- Não usar `git add .` no repo do app: a pasta `heroguard-docker/` é um repo
  aninhado e seria adicionada como "embedded repo" (gitlink).
- O código da API de cadastro fica em `api/` **no repo do app** (versionado
  lá, junto do `build.sh` que a compila); a pasta `heroguard-docker/` segue
  sendo só infraestrutura de deploy.

## Produção / deploy

- Produção anterior no ar desde 2026-10-19 em `https://chatguard.life`
  (stack `chatguard`, certificado Let's Encrypt). Em 2026-10-23 o projeto foi
  renomeado para HeroGuard e a nova stack entrou no ar em
  `https://heroguard.my` (domínio trocado e deploy feitos em 2026-10-23;
  certificado Let's Encrypt com SAN para `heroguard.my` e
  `www.heroguard.my`).
- Deploy manual via **Portainer**, método *Repository* apontando para
  `wallesonn/heroguard-docker`.
- Fluxo de atualização: `./build.sh vX.Y.Z` (build + push das **duas**
  imagens: `wallesonnn/heroguard-app` e `wallesonnn/heroguard-api`) →
  **Pull and redeploy** ou `DOCKER_IMAGE=<tag>` + `API_IMAGE=<tag>` +
  **Update the stack** no Portainer.
- Stack desde 2026-10-28: três serviços — `app` (nginx estático),
  `api` (Node + pg, grava a `waitlist`) e `db` (Postgres). O nginx faz
  proxy de `/api/` para `api:3000` (com `resolver` interno, para não morrer
  se a API ainda não existir).
- Postgres da stack: `db:5432` sem porta no host (a VPS já tem outro
  Postgres na 5432). Também está na rede `web` com alias `heroguard-db`
  para o n8n (mesma VPS) consultar a tabela `waitlist`.
- `POSTGRES_USER`/`POSTGRES_PASSWORD` só valem na **primeira criação** do
  volume `pgdata`; depois disso, trocar a variável no stack NÃO muda a senha
  do banco — use `ALTER USER` dentro do container ou recrie o volume.
- Traefik com `exposedByDefault`: serviços não-públicos precisam da label
  `traefik.enable=false` (o `db` e a `api` têm) ou geram spam de erros no log.
- Let's Encrypt: rate limit de 5 validações falhas/hora por domínio —
  garanta o DNS propagado (`dig +short dominio`) antes de subir a stack.
- Existe uma stack de TESTE (`teste.heroguard.my`, containers
  `heroguard-teste-*`) com a mesma topologia para validar mudanças antes
  da produção.

## Comandos úteis

- Dev: `npm run dev` (fallback: `node node_modules/next/dist/bin/next dev`
  se o binário perder permissão de execução). O dev server **não tem `/api`**
  (o proxy vive no nginx da imagem) — para testar o formulário localmente,
  defina `NEXT_PUBLIC_WAITLIST_ENDPOINT` no `.env.local` apontando para uma
  API em execução (ex.: `DATABASE_URL=... node api/server.js`).
- Build: `npm run build` (Next.js 16.4.3, export estático em `out/`).
- Imagens Docker: `./build.sh vX.Y.Z` (build + push no Docker Hub,
  plataforma `linux/amd64`, publica `heroguard-app` **e** `heroguard-api`;
  vídeo de `public/videos/` entra na imagem do site).
- API local: `DATABASE_URL='postgresql://...' node api/server.js` —
  cria/garante o schema da `waitlist` na inicialização.
- Infográfico animado: `node scripts/generate-mundo-em-movimento.mjs` após
  editar o script ou o SVG-mestre — nunca editar os arquivos gerados à mão.
- Verificação de tipos: `node node_modules/typescript/bin/tsc --noEmit`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
