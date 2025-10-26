const fs = require('fs');
const path = require('path');
const express = require('express');

process.on('uncaughtException', e => { console.error('[uncaught]', e); });
process.on('unhandledRejection', e => { console.error('[unhandled]', e); });

const app = express();
app.disable('x-powered-by');
app.use(express.json());

const distDir = process.env.SSR_DIST_DIR || path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) console.error('[startup] dist ausente:', distDir);

// HTML sem cache; assets com cache longo
app.use((req, res, next) => {
  if ((req.headers.accept || '').includes('text/html')) {
    res.setHeader('Cache-Control', 'no-store');
  }
  next();
});

app.use(express.static(distDir, {
  index: false,
  maxAge: '1y',
  setHeaders: (res, file) => {
    if (file.endsWith('.html')) res.setHeader('Cache-Control', 'no-store');
  }
}));

// Rotas API (preservar existentes)
try { app.use('/api/leads', require('./routes/leads')); } catch (_) {}

// Health mínimo
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// SPA fallback
app.get('*', (_req, res) => res.sendFile(path.join(distDir, 'index.html')));

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => console.log('[server] on', port, 'dist=', distDir));
