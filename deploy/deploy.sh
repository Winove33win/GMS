#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FRONT="$ROOT_DIR/frontend"
BACK="$ROOT_DIR/backend"
BACK_DIST="${SSR_DIST_DIR:-$BACK/dist}"

echo "▶ Deploy iniciado: $(date)"

cd "$FRONT"
echo "📦 Frontend install/build"
npm ci --no-audit --prefer-offline
npm run build

echo "⤳ Copiando dist para $BACK_DIST"
mkdir -p "$BACK_DIST"
rm -rf "$BACK_DIST"
mkdir -p "$BACK_DIST"
cp -r "$FRONT/dist/"* "$BACK_DIST/"

cd "$BACK"
echo "📦 Backend install"
npm ci --no-audit --prefer-offline

echo "🔁 Reiniciando app (Passenger)"
mkdir -p "$BACK/tmp"
touch "$BACK/tmp/restart.txt"

echo "🟢 Deploy concluído: $(date)"
