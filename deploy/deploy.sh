#!/bin/bash
set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
FRONTEND_DIR="$ROOT_DIR/frontend"
BACKEND_DIR="$ROOT_DIR/backend"

# Build frontend
cd "$FRONTEND_DIR"
echo "Installing frontend dependencies..."
if ! npm ci; then
  echo "npm ci failed, falling back to npm install"
  npm install
fi

echo "Building frontend..."
npm run build

# Generate sitemaps
cd "$ROOT_DIR"
echo "Generating sitemap..."
SITEMAP_OUTPUT="$FRONTEND_DIR/dist/sitemap.xml" node "$BACKEND_DIR/scripts/generate-sitemap.mjs"
echo "Sitemap generated at $FRONTEND_DIR/dist/sitemap.xml"

