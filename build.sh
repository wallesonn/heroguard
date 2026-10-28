#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ] || [ -z "${1:-}" ]; then
  echo "❌ Uso: ./build.sh <version>"
  echo "   Exemplo: ./build.sh v1.0.0"
  exit 1
fi

VERSION=$1

DOCKER_IMAGE="${DOCKER_IMAGE:-wallesonnn/heroguard-app}"
API_IMAGE="${API_IMAGE:-wallesonnn/heroguard-api}"
DOCKER_PLATFORM="${DOCKER_PLATFORM:-linux/amd64}"

echo "🔨 Building: ${DOCKER_IMAGE}:${VERSION} (${DOCKER_PLATFORM})"
docker buildx build --platform "${DOCKER_PLATFORM}" --no-cache --progress=plain \
  -f heroguard-docker/Dockerfile \
  -t "${DOCKER_IMAGE}:${VERSION}" \
  -t "${DOCKER_IMAGE}:latest" \
  --push \
  .

echo ""
echo "🔨 Building: ${API_IMAGE}:${VERSION} (${DOCKER_PLATFORM})"
docker buildx build --platform "${DOCKER_PLATFORM}" --no-cache --progress=plain \
  -f api/Dockerfile \
  -t "${API_IMAGE}:${VERSION}" \
  -t "${API_IMAGE}:latest" \
  --push \
  api

echo ""
echo "✅ Build + push concluídos com sucesso! As imagens foram enviadas para o registry sem erros."
echo "   📦 Site  : ${DOCKER_IMAGE}:${VERSION}"
echo "   📦 API   : ${API_IMAGE}:${VERSION}"
echo "   🏷️  Latest: ${DOCKER_IMAGE}:latest · ${API_IMAGE}:latest"
echo "   🚀 Para atualizar a produção no Portainer, use: ${DOCKER_IMAGE}:${VERSION} e ${API_IMAGE}:${VERSION}"
