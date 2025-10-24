import { Router } from 'express';
import { siteConfig } from '../utils/siteConfig.js';

const router = Router();

router.get('/sitemap.xml', (_req, res) => {
  const base = siteConfig.canonicalBase.replace(/\/$/, '');
  const urls = [
    '/',
    '/sobre',
    '/mentores',
    '/amentorados',
    '/projetos',
    '/parcerias',
    '/encontros',
    '/roteiro',
    '/metas',
    '/blog',
    '/contato',
  ]
    .map((path) => `<url><loc>${base}${path}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`)
    .join('');

  res
    .set('Content-Type', 'application/xml')
    .send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
});

export default router;
