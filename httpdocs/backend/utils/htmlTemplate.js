let cached = null;
export const getBaseTemplate = () => `
<!doctype html><html lang="pt-br">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Mentoria Solidária</title>
<link rel="icon" href="/favicon.ico"/>
</head>
<body><div id="root"></div><script type="module" src="/assets/index.js"></script></body>
</html>`;
export const ensureTemplateIsFresh = () => cached;
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
