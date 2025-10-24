#!/bin/bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
REMOTE="${DEPLOY_REMOTE:-origin}"
BRANCH_ENV="${DEPLOY_BRANCH:-}"
BRANCH_INPUT="${1:-}"
BRANCH="${BRANCH_ENV:-${BRANCH_INPUT:-main}}"

cd "$ROOT_DIR"

# Fetch latest changes from the selected remote
if ! git remote get-url "$REMOTE" >/dev/null 2>&1; then
  echo "[auto-deploy] Remote '$REMOTE' not found. Set DEPLOY_REMOTE or add the remote before running this script." >&2
  exit 1
fi

REMOTE_URL=$(git remote get-url "$REMOTE")
if [[ "$REMOTE_URL" == *"winove"* ]]; then
  echo "[auto-deploy] Warning: remote '$REMOTE' currently points to '$REMOTE_URL'." >&2
  echo "[auto-deploy] Update it with 'git remote set-url $REMOTE <novo-repo>' to deploy the GMS site." >&2
fi

git fetch "$REMOTE" "$BRANCH"

LOCAL_SHA=$(git rev-parse HEAD)
REMOTE_SHA=$(git rev-parse "$REMOTE/$BRANCH")

if [[ "$LOCAL_SHA" != "$REMOTE_SHA" ]]; then
  echo "[auto-deploy] New changes detected on $REMOTE/$BRANCH. Pulling and deploying..."
  git pull --ff-only "$REMOTE" "$BRANCH"
  ./deploy/deploy.sh
else
  echo "[auto-deploy] No changes to deploy."
fi
