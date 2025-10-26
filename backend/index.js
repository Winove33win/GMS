const fs = require('fs');
const path = require('path');
const express = require('express');

process.on('uncaughtException', e => { console.error('[uncaught]', e); });
process.on('unhandledRejection', e => { console.error('[unhandled]', e); });

const app = express();
app.disable('x-powered-by');
app.use(express.json());

// === Paths e logs de diagnóstico ===
const distDir = process.env.SSR_DIST_DIR || path.join(__dirname, 'dist');
const indexFile = path.join(distDir, 'index.html');

console.log('[startup] SSR_DIST_DIR =', distDir);
console.log('[startup] index.html existe? ', fs.existsSync(indexFile));

// === Cache policy: HTML no-store; assets cache longo ===
app.use((req, res, next) => {
  if ((req.headers.accept || '').includes('text/html')) {
    res.setHeader('Cache-Control', 'no-store');
  }
  next();
});

// === Estático do bundle ===
app.use(express.static(distDir, {
  index: false,
  maxAge: '1y',
  setHeaders: (res, file) => {
    if (file.endsWith('.html')) res.setHeader('Cache-Control', 'no-store');
  }
}));

// === API (mantenha outras rotas existentes) ===
try { app.use('/api/leads', require('./routes/leads')); } catch (e) {
  console.warn('[startup] /api/leads indisponível:', e.message);
}
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// === Fallback SPA: qualquer rota que não comece com /api ===
app.get(/^\/(?!api\/).*/, (_req, res) => {
  if (!fs.existsSync(indexFile)) {
    console.error('[fallback] index.html não encontrado em', indexFile);
    return res.status(500).send('Build ausente. Rode o deploy para gerar dist.');
  }
  res.sendFile(indexFile);
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log('[server] listening on', port, '— dist =', distDir);
});
