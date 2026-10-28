# HeroGuard — App

Landing page institucional do **HeroGuard** — plataforma de inteligência e
proteção digital para pais e responsáveis ("Menos ruído. Mais contexto.").

**Status:** v0.2 em produção — <https://heroguard.my>

> **Migração de nome (2026-10-23):** o projeto passou de ChatGuard para
> **HeroGuard** em todo o código e na infraestrutura versionada — imagem
> Docker `wallesonnn/heroguard-app`, containers `heroguard-app`/`heroguard-db`,
> routers e services do Traefik, labels, usuário/banco `heroguard` e domínio
> `heroguard.my` (alterado de `heroguard.life` em 2026-10-23). Artefatos
> antigos (domínio `chatguard.life`, imagem
> `wallesonnn/chatguard-app`) não são mais usados por esta configuração.
> Repositórios: [`wallesonn/heroguard`](https://github.com/wallesonn/heroguard)
> (app) e
> [`wallesonn/heroguard-docker`](https://github.com/wallesonn/heroguard-docker)
> (deploy).

A versão atual é uma página de apresentação e conversão com **cadastro real**:
o modal da lista de espera envia nome, e-mail e telefone para a API
(`POST /api/waitlist`), que grava na tabela `waitlist` do Postgres da própria
stack (validação, consentimento com versão do aviso e limite por IP). O
contato pelos leads será feito por fluxo n8n que consulta essa tabela.
Funcionalidades de produto (monitoramento, classificação, integrações)
permanecem conceituais e todas as demonstrações usam dados fictícios.

## Stack

- **Next.js 16.4.3** (App Router, `output: 'export'`), React 19.1.0,
  TypeScript — a página é pré-renderizada como HTML estático em `out/`.
- **Fontes:** Fraunces (títulos) e DM Sans (interface) via `next/font`
  (arquivos locais, sem chamada ao Google Fonts).
- **Docker (site):** imagem multi-stage (`node:22-alpine` → `nginx:1.27-alpine`)
  servindo o estático; publicada como `wallesonnn/heroguard-app`.
- **API de cadastro:** `api/server.js` — `node:http` + `pg`, sem framework;
  publicada como `wallesonnn/heroguard-api`. O nginx faz proxy de `/api/`.
- **Deploy:** VPS com Traefik externo (rede `web`, entrypoint `websecure`,
  certresolver `lets-encrypt`) via stack no **Portainer** — config no repo
  aninhado [`heroguard-docker/`](heroguard-docker/) (remote próprio:
  `github.com/wallesonn/heroguard-docker`). Stack: `app` + `api` + `db`.
- **Postgres 17** na stack (rede interna `db:5432`, volume `pgdata`):
  guarda a tabela `waitlist`; também na rede `web` (alias `heroguard-db`)
  para o n8n consultar.

## Comandos

```bash
npm run dev                 # desenvolvimento em http://localhost:3000
                            # (sem /api — use NEXT_PUBLIC_WAITLIST_ENDPOINT p/ testar o modal)
npm run build               # export estático em out/
./build.sh vX.Y.Z           # build + push das imagens app e api (linux/amd64)
node api/server.js          # API local (requer DATABASE_URL; cria o schema)
node scripts/generate-mundo-em-movimento.mjs   # regenera o infográfico animado
```

Após publicar as imagens, a atualização em produção é manual no Portainer:
**Pull and redeploy** (seguindo `latest`) ou `DOCKER_IMAGE`/`API_IMAGE`
travadas + **Update the stack**.

## Documentação

- [`docs/landing-page.md`](docs/landing-page.md) — especificação da página
- [`docs/platform-concept.md`](docs/platform-concept.md) — conceito do produto
- [`docs/implementation-progress.md`](docs/implementation-progress.md) —
  registro de implementação, verificações e do deploy de 2026-10-19
- [`heroguard-docker/README.md`](heroguard-docker/README.md) — stack Docker,
  deploy no Portainer e lições do primeiro deploy
- [`AGENTS.md`](AGENTS.md) — regras de trabalho (commits são manuais, feitos
  pelo usuário)

## Observações

- `public/videos/` fica fora do Git mas **entra na imagem** quando presente
  no build local (ver `.gitignore` vs `heroguard-docker/Dockerfile.dockerignore`).
- Vídeo de abertura: ainda é uma simulação de 10 s; nenhum arquivo de vídeo
  existe ainda.
