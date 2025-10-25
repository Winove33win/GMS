Deploy to Plesk
===============

This repository now ships a full-stack app (`httpdocs/backend` + `httpdocs/frontend`).
The backend serves the SPA build from `backend/dist` and exposes the JSON
endpoints under `/api`. When the backend dependencies are installed, a
`postinstall` hook automatically installs the frontend packages and generates
the production bundle. Follow the steps below to keep the temporary Plesk domain
online without manual uploads of the `dist/` folder.

Prerequisites
-------------
- Configure the Node.js app in Plesk to point to `httpdocs/backend`.
- Use Node.js 20.x or 22.x (the project targets modern ESM).
- Set the environment variable `SITE_URL` with the temporary domain, e.g.
  `https://confident-heyrovsky.168-75-84-128.plesk.page`.

Install & build
---------------
1. Open **Domains → Node.js → Application root** and make sure it is
   `/httpdocs/backend`.
2. In the same panel, click **Install NPM Packages**. Plesk runs
   `npm install` which now triggers the script
   `npm --prefix ../frontend install && npm --prefix ../frontend run build`.
3. After the command finishes, verify that `../backend/dist/index.html`
   and `../backend/dist/assets/*` exist (File Manager → `httpdocs/backend/dist`).
4. Click **Restart Application**.

If the site still shows “Frontend build ausente…”, it means the automatic build
could not run (for example, lack of memory or npm registry access). In that case
SSH into the server and execute manually:

```bash
cd /var/www/vhosts/<dominio>/httpdocs/backend
npm install
npm --prefix ../frontend install
npm --prefix ../frontend run build
plesk bin node --restart <dominio>
```

Health checks
-------------
- `https://<dominio>/api/health` should respond with `{ ok: true }`.
- The Node logs will print `⚠️  Nenhum build do frontend encontrado…` if the
  `dist/` bundle is missing. Fix by rerunning the build commands above.

Updating the canonical URL
--------------------------
`siteConfig.canonicalBase` reads from `process.env.SITE_URL`. Update this value
in the Plesk Node.js configuration when switching from the temporary domain to
the final hostname. Restart the application afterwards so redirects and
structured data use the correct canonical origin.

Rollback
--------
If a deploy fails, you can restore the previous bundle by copying a known-good
`backend/dist` directory back into place and restarting the Node app. The API
endpoints continue to serve JSON from `httpdocs/content`, so no database restore
is required.
