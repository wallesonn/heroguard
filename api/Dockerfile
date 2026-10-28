# syntax=docker/dockerfile:1

# ---------- API do HeroGuard (node:http + pg) ----------
# Build a partir da pasta api/:  docker build -f api/Dockerfile api
FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY server.js ./

# O container roda sem root; o node:alpine já traz o usuário "node".
USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health > /dev/null || exit 1

CMD ["node", "server.js"]
