#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FRONTEND_DIR="$ROOT_DIR/frontend"
BACKEND_DIR="$ROOT_DIR/backend"
BACK_DIST="${SSR_DIST_DIR:-$BACKEND_DIR/dist}"

echo "▶ Deploy iniciado: $(date)"
echo "ROOT: $ROOT_DIR"

echo "📦 Frontend: install + build"
cd "$FRONTEND_DIR"
if ! npm ci --no-audit --prefer-offline; then
  echo "npm ci falhou, executando npm install"
  npm install
fi
npm run build

echo "🗺️ Gerando sitemap"
cd "$ROOT_DIR"
SITEMAP_OUTPUT="$FRONTEND_DIR/dist/sitemap.xml" node "$BACKEND_DIR/scripts/generate-sitemap.mjs"

echo "🧹 Limpando dist antigo em $BACK_DIST"
mkdir -p "$BACK_DIST"
rm -rf "$BACK_DIST"
mkdir -p "$BACK_DIST"

echo "📂 Copiando build para $BACK_DIST"
cp -R "$FRONTEND_DIR/dist/." "$BACK_DIST/"

if [ ! -f "$BACK_DIST/index.html" ]; then
  echo "❌ Build inválido: $BACK_DIST/index.html ausente" >&2
  exit 1
fi

echo "📦 Backend: install"
cd "$BACKEND_DIR"
if ! npm ci --no-audit --prefer-offline; then
  echo "npm ci falhou, executando npm install"
  npm install
fi

echo "🔁 Reiniciando aplicação"
mkdir -p "$BACKEND_DIR/tmp"
touch "$BACKEND_DIR/tmp/restart.txt"

echo "✅ Deploy concluído: $(date)"

