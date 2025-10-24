import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';

const BASE = 'https://winove.com.br';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backendRoot = path.resolve(__dirname, '..');
const outOverride = process.env.SITEMAP_OUTPUT;
const resolvedOut = outOverride
  ? (path.isAbsolute(outOverride) ? outOverride : path.resolve(backendRoot, outOverride))
  : path.join(backendRoot, 'dist', 'sitemap.xml');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'lweb03.appuni.com.br',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || 'winove',
  password: process.env.DB_PASSWORD || '9*19avmU0',
  database: process.env.DB_NAME || 'fernando_winove_com_br_',
  waitForConnections: true,
  connectionLimit: 10,
});

const staticUrls = [
  { loc: `${BASE}/`,         changefreq: 'weekly',  priority: '1.0' },
  { loc: `${BASE}/blog`,     changefreq: 'weekly',  priority: '0.9' },
  { loc: `${BASE}/cases`,    changefreq: 'monthly', priority: '0.7' },
  { loc: `${BASE}/servicos`, changefreq: 'monthly', priority: '0.7' },
  { loc: `${BASE}/contato`,  changefreq: 'monthly', priority: '0.6' },
];

const toUrlXml = ({ loc, changefreq, priority, lastmod }) => `
  <url>
    <loc>${loc}</loc>
    ${lastmod ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`.trim();

try {
  const [rows] = await pool.query(
    `SELECT slug, data_publicacao
     FROM blog_posts
     WHERE slug IS NOT NULL AND slug <> ''
     ORDER BY data_publicacao DESC
     LIMIT 5000`
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls.map(u => toUrlXml(u)).join('')}
  ${rows.map(p => toUrlXml({
        loc: `${BASE}/blog/${p.slug}`,
        changefreq: 'weekly',
        priority: '0.8',
        lastmod: p.data_publicacao || new Date(),
      })).join('')}
</urlset>`;

  fs.mkdirSync(path.dirname(resolvedOut), { recursive: true });
  fs.writeFileSync(resolvedOut, xml, 'utf8');
  console.log('Sitemap escrito em', resolvedOut);
  process.exit(0);
} catch (e) {
  console.error('Erro ao gerar sitemap:', e);
  process.exit(1);
}
