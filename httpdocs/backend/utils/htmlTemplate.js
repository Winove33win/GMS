import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FALLBACK_TEMPLATE =
  `<!doctype html><html lang="pt-br"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Mentoria Solidária</title><link rel="icon" href="/favicon.ico"/></head><body><div id="root"></div><script type="module" src="/assets/index.js"></script></body></html>`;

/**
 * Candidatos onde procurar o template base já buildado.
 * A busca segue a ordem: SSR_INDEX_FILE (se setado) → backend/dist → frontend/dist → frontend/index.html
 */
const candidateIndexPaths = [
  process.env.SSR_INDEX_FILE && path.resolve(__dirname, process.env.SSR_INDEX_FILE),
  path.resolve(__dirname, '../../dist/index.html'),
  path.resolve(__dirname, '../../frontend/dist/index.html'),
  path.resolve(__dirname, '../../frontend/index.html'),
].filter(Boolean);

let cachedTemplate = null;
let cachedTemplatePath = null;
let cachedTemplateMtime = 0;

const locateTemplate = () => {
  for (const filePath of candidateIndexPaths) {
    try {
      const stats = fs.statSync(filePath);
      if (stats.isFile()) {
        return { filePath, stats };
      }
    } catch {
      // tenta o próximo candidato
    }
  }
  return null;
};

const loadTemplate = () => {
  const located = locateTemplate();
  if (!located) {
    cachedTemplatePath = null;
    cachedTemplateMtime = 0;
    return FALLBACK_TEMPLATE;
  }

  cachedTemplatePath = located.filePath;
  cachedTemplateMtime = located.stats.mtimeMs;
  try {
    return fs.readFileSync(located.filePath, 'utf8');
  } catch {
    return FALLBACK_TEMPLATE;
  }
};

export const getBaseTemplate = () => {
  if (!cachedTemplate) {
    cachedTemplate = loadTemplate();
  }
  return cachedTemplate;
};

export const ensureTemplateIsFresh = () => {
  const located = locateTemplate();

  if (!located) {
    if (cachedTemplatePath !== null) {
      cachedTemplate = FALLBACK_TEMPLATE;
      cachedTemplatePath = null;
      cachedTemplateMtime = 0;
      return cachedTemplate;
    }
    return cachedTemplate;
  }

  const { filePath, stats } = located;
  if (filePath !== cachedTemplatePath || stats.mtimeMs !== cachedTemplateMtime) {
    cachedTemplatePath = filePath;
    cachedTemplateMtime = stats.mtimeMs;
    try {
      cachedTemplate = fs.readFileSync(filePath, 'utf8');
    } catch {
      cachedTemplate = FALLBACK_TEMPLATE;
      cachedTemplatePath = null;
      cachedTemplateMtime = 0;
    }
    return cachedTemplate;
  }

  return cachedTemplate;
};

export const renderTemplateWithMeta = (tpl, meta) => {
  const head = `
    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}"/>
    <link rel="canonical" href="${meta.canonical}"/>
    <meta property="og:type" content="${meta.openGraph?.['og:type'] || 'website'}"/>
    <meta property="og:title" content="${meta.openGraph?.['og:title'] || meta.title}"/>
    <meta property="og:description" content="${meta.openGraph?.['og:description'] || meta.description}"/>
    <meta property="og:image" content="${meta.openGraph?.['og:image'] || ''}"/>
    <meta name="twitter:card" content="${meta.twitter?.['twitter:card'] || 'summary_large_image'}"/>
    <meta name="twitter:title" content="${meta.twitter?.['twitter:title'] || meta.title}"/>
    <meta name="twitter:description" content="${meta.twitter?.['twitter:description'] || meta.description}"/>
    <meta name="twitter:image" content="${meta.twitter?.['twitter:image'] || ''}"/>
    <script type="application/ld+json">${JSON.stringify(meta.jsonLd || {})}</script>
  `.replace(/\n\s+/g, '');

  return tpl.replace('</head>', head + '</head>');
};
