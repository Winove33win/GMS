import fs from 'fs';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import sitemapRoute from './routes/sitemap.js';
import blogPostsRoute from './routes/blogPosts.js';
import casesRoute from './routes/cases.js';
import templatesRoute from './routes/templates.js';
import leadsRoutes from './routes/leads.js';
import { postSeoApiRouter, postSeoPageRouter } from './routes/postSeo.js';
import {
  ensureTemplateIsFresh,
  getBaseTemplate,
  renderTemplateWithMeta,
} from './utils/htmlTemplate.js';
import { siteConfig } from './utils/siteConfig.js';

// Env vars
dotenv.config();

// Express setup
const app = express();
app.set('trust proxy', 1);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const {
  port: fallbackPort,
  canonicalUrl,
  canonicalBase: BASE_URL,
  canonicalHostname,
  canonicalPort,
  canonicalProtocol,
  canonicalOrigin,
} = siteConfig;

const getTemplate = () => {
  const initial = getBaseTemplate();
  const fresh = ensureTemplateIsFresh();
  return fresh || initial;
};

const sendHtml = (res, html, cacheControl = 'public, max-age=300, s-maxage=300') => {
  res
    .status(200)
    .set('Content-Type', 'text/html; charset=UTF-8')
    .set('Cache-Control', cacheControl)
    .send(html);
};

// Middlewares
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

const apiRouter = express.Router();

// Sitemap must be served before static middlewares
const LOOPBACKS = new Set(['127.0.0.1', '0.0.0.0', '::1']);
const isLoopback = (value) => LOOPBACKS.has(value);
const isLocalRequest = (req) => {
  const host = req.headers.host || '';
  if (!host) return true;
  const hostname = host.split(':')[0]?.toLowerCase() || '';
  if (isLoopback(hostname) || hostname.endsWith('.local')) {
    return true;
  }
  const ip = (req.ip || '').toLowerCase();
  const normalisedIp = ip.startsWith('::ffff:') ? ip.slice(7) : ip;
  return isLoopback(normalisedIp);
};

app.use((req, res, next) => {
  const hostHeader = req.headers.host || '';
  if (isLocalRequest(req) || process.env.NODE_ENV === 'development') {
    return next();
  }

  const [requestHost, requestPort] = hostHeader.toLowerCase().split(':');
  const forwardedProto = (req.headers['x-forwarded-proto'] || req.protocol || canonicalProtocol).toLowerCase();
  const needsHostRedirect =
    requestHost !== canonicalHostname ||
    (!!canonicalPort && requestPort !== canonicalPort) ||
    (!canonicalPort && !!requestPort);

  if (needsHostRedirect || forwardedProto !== canonicalProtocol) {
    const redirectUrl = `${canonicalUrl.protocol}//${canonicalUrl.host}${req.originalUrl}`;
    return res.redirect(301, redirectUrl);
  }

  next();
});

app.use((req, res, next) => {
  const { path: pathname } = req;
  if (!pathname.startsWith('/blog')) {
    return next();
  }

  if (pathname === '/blog') {
    const queryIndex = req.url.indexOf('?');
    const query = queryIndex >= 0 ? req.url.slice(queryIndex) : '';
    return res.redirect(301, `/blog/${query}`);
  }

  if (/^\/blog\/[^/.]+$/.test(pathname)) {
    const queryIndex = req.url.indexOf('?');
    const query = queryIndex >= 0 ? req.url.slice(queryIndex) : '';
    return res.redirect(301, `${pathname}/${query}`);
  }

  next();
});

app.use('/', sitemapRoute);

// Basic CSP for production
app.use((_req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline' ${canonicalOrigin} https://www.googletagmanager.com https://www.google-analytics.com https://js.stripe.com`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      `img-src 'self' data: blob: ${canonicalOrigin} https://images.unsplash.com`,
      "font-src 'self' https://fonts.gstatic.com",
      `connect-src 'self' ${canonicalOrigin} https://www.google-analytics.com https://api.stripe.com`,
      "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://www.youtube.com https://www.youtube-nocookie.com",
      "frame-ancestors 'none'",
      "object-src 'none'",
    ].join('; ')
  );
  next();
});

const resolveDistPath = () => {
  const candidateDirs = [
    process.env.SSR_DIST_DIR && path.resolve(__dirname, process.env.SSR_DIST_DIR),
    path.join(__dirname, 'dist'),
    path.join(__dirname, '../frontend/dist'),
  ].filter(Boolean);

  for (const dir of candidateDirs) {
    try {
      if (fs.statSync(dir).isDirectory()) {
        return dir;
      }
    } catch (_err) {
      // Try next candidate
    }
  }

  // Default to last candidate so express still has a path to work with
  return candidateDirs[candidateDirs.length - 1];
};

const distPath = resolveDistPath();
// Serve frontend build (prefer backend/dist but support legacy paths)
app.use(
  '/assets',
  express.static(path.join(distPath, 'assets'), {
    immutable: true,
    maxAge: '1y',
  })
);
app.use(express.static(distPath));

const HOME_DESCRIPTION =
  'A Winove entrega soluções digitais que transformam negócios. Descubra nossos cases de sucesso, serviços e portfólio.';
const BLOG_DESCRIPTION =
  'Conteúdos exclusivos, tendências e estratégias para manter seu negócio sempre à frente no mundo digital';
const DEFAULT_IMAGE =
  process.env.DEFAULT_SHARE_IMAGE || `${canonicalOrigin}/assets/images/default-share.png`;

app.get('/blog/', (req, res, next) => {
  const template = getTemplate();
  if (!template) {
    return next();
  }

  const canonical = `${BASE_URL}/blog/`;
  const html = renderTemplateWithMeta(template, {
    title: 'Blog & Insights | Winove',
    description: BLOG_DESCRIPTION,
    canonical,
    openGraph: {
      'og:type': 'website',
      'og:title': 'Blog & Insights | Winove',
      'og:description': BLOG_DESCRIPTION,
      'og:image': DEFAULT_IMAGE,
    },
    twitter: {
      'twitter:card': 'summary_large_image',
      'twitter:title': 'Blog & Insights | Winove',
      'twitter:description': BLOG_DESCRIPTION,
      'twitter:image': DEFAULT_IMAGE,
    },
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Winove Blog',
      description: BLOG_DESCRIPTION,
      url: canonical,
    },
  });

  if (!html) {
    return next();
  }

  sendHtml(res, html);
});

// API routes
apiRouter.use('/blog-posts', blogPostsRoute);
apiRouter.use('/cases', casesRoute);
apiRouter.use('/templates', templatesRoute);
apiRouter.use('/leads', leadsRoutes);
apiRouter.use('/post', postSeoApiRouter);

apiRouter.get('/health', (_req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV || 'production' });
});

apiRouter.use((_req, res) => res.status(404).json({ error: 'not_found' }));

app.use('/api', apiRouter);

app.use('/', postSeoPageRouter);

app.get('/', (req, res, next) => {
  const template = getTemplate();
  if (!template) {
    return next();
  }

  const canonical = `${BASE_URL}/`;
  const html = renderTemplateWithMeta(template, {
    title: 'Winove - Soluções Criativas e Resultados Reais',
    description: HOME_DESCRIPTION,
    canonical,
    openGraph: {
      'og:type': 'website',
      'og:title': 'Winove - Soluções Criativas e Resultados Reais',
      'og:description': HOME_DESCRIPTION,
      'og:image': DEFAULT_IMAGE,
    },
    twitter: {
      'twitter:card': 'summary_large_image',
      'twitter:title': 'Winove - Soluções Criativas e Resultados Reais',
      'twitter:description': HOME_DESCRIPTION,
      'twitter:image': DEFAULT_IMAGE,
    },
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Início - Winove',
      url: canonical,
      description: HOME_DESCRIPTION,
    },
  });

  if (!html) {
    return next();
  }

  sendHtml(res, html);
});

// SPA fallback for React Router
app.get('*', (req, res) => {
  if (req.path.includes('.')) return res.status(404).end();
  res.sendFile(path.join(distPath, 'index.html'));
});
// Start server (Plesk sets PORT)
app.listen(fallbackPort, () => {
  console.log(`API + Frontend running on port ${fallbackPort}`);
});
