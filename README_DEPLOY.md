Deploy to Plesk
===============

Point the server to the GMS repository
-------------------------------------

Se o servidor foi configurado a partir do repositório antigo da Winove, o clone
local ainda apontará para aquele remoto. Atualize-o antes de executar qualquer
deploy:

```
git remote set-url origin git@github.com:<sua-org>/<novo-repo>.git
# (Opcional) renomeie o remote caso use outro nome
# git remote rename origin gms
```

Os scripts de deploy aceitam as variáveis `DEPLOY_REMOTE` e `DEPLOY_BRANCH`. Se o
remote tiver outro nome (por exemplo `gms`) ou se você publicar a partir de uma
branch diferente, exporte essas variáveis na tarefa agendada ou no shell da
aplicação:

```
export DEPLOY_REMOTE=origin
export DEPLOY_BRANCH=main
```

What is included
- `dist-for-deploy.zip` — Vite production build (contains `index.html` and `assets/`).
- `backend/index.js` — serves the build from `backend/dist`.

Goal
- After each pull from GitHub, Plesk runs the Node app and it serves the built frontend from `backend/dist` without manual tweaks.

Recommended steps (Plesk GUI)
1. Open Domains → your domain → File Manager.
2. Go to the app root that contains `backend/index.js`.
3. Upload `dist-for-deploy.zip` (or keep `backend/dist` tracked in Git if you prefer).
4. Extract it so you have:
   - `backend/dist/index.html`
   - `backend/dist/assets/...`
5. In Domains → Node.js, restart the application.

Notes
- The server maps `/assets/*` to `backend/dist/assets` and serves `backend/dist/index.html` for SPA routes.
- If assets 404 or load as `text/html`, make sure the files exist in `backend/dist/assets` and that the Node process restarted.
- Adjust CSP in `backend/index.js` if you add new external sources.
- The auto-update script prints a warning if it still points to a `winove` remote URL.

