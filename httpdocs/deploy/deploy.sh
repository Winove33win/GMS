#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FRONT="$ROOT_DIR/frontend"
BACK="$ROOT_DIR/backend"

echo "▶️ Deploy iniciado: $(date)"
echo "🗂  ROOT: $ROOT_DIR"

echo "📦 Frontend: instalando deps…"
cd "$FRONT"
if [ -f "package-lock.json" ]; then
  npm ci --no-audit --prefer-offline
else
  npm install --no-audit --prefer-offline
fi

echo "🏗  Frontend: build…"
npm run build

if [ ! -d "$FRONT/dist" ]; then
  echo "❌ Build não gerou dist/"
  exit 1
fi
echo "✅ Frontend build em $FRONT/dist"

echo "📦 Backend: instalando deps…"
cd "$BACK"
if [ -f "package-lock.json" ]; then
  npm ci --no-audit --prefer-offline
else
  npm install --no-audit --prefer-offline
fi

echo "🔁 Reiniciando app (Passenger)…"
mkdir -p "$BACK/tmp"
touch "$BACK/tmp/restart.txt"

echo "🟢 Deploy concluído: $(date)"
