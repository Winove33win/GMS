import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

const toArray = (value) => {
  if (!value) return [];
  try {
    const v = typeof value === 'string' ? JSON.parse(value) : value;
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
};

// Garante URL absoluta para imagens locais do /assets
const resolvePublicBase = () => {
  const raw = process.env.PUBLIC_BASE_URL || process.env.APP_BASE_URL || '';
  if (!raw) return '';
  try {
    const withProtocol = raw.includes('://') ? raw : `https://${raw}`;
    const parsed = new URL(withProtocol);
    const path = parsed.pathname.replace(/\/$/, '');
    return `${parsed.origin}${path}`;
  } catch (_err) {
    return '';
  }
};

const PUBLIC_BASE = resolvePublicBase();

const ABS = (url) => {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  const clean = url.startsWith('/assets') ? url : url.replace(/^assets\//, '/assets/');
  if (!PUBLIC_BASE) {
    return clean.startsWith('/') ? clean : `/${clean}`;
  }
  return `${PUBLIC_BASE}${clean.startsWith('/') ? '' : '/'}${clean}`;
};

// Converte a linha do banco no formato que o frontend espera
const normalize = (row) => {
  let meta = {};
  try {
    meta = typeof row.meta === 'string' ? JSON.parse(row.meta) : (row.meta || {});
  } catch {}

  const images = meta.images || {};
  const gallery = Array.isArray(images.gallery) ? images.gallery.map(ABS) : [];

  return {
    slug: row.slug,
    title: row.title,
    heading: meta.heading || '',
    subheading: meta.subheading || '',
    description: meta.description || '',
    category: meta.category || 'Outros',
    difficulty: meta.difficulty || 'Iniciante',
    price: Number(meta.price || 0),
    originalPrice: meta.originalPrice != null ? Number(meta.originalPrice) : undefined,
    pages: Number(meta.pages || 0),
    features: toArray(meta.features),
    includes: toArray(meta.includes),
    tags: toArray(meta.tags),
    demoUrl: meta.demoUrl || '',
    images: {
      cover: ABS(images.cover || ''),
      gallery,
    },
    content: row.content,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
};

router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, slug, title, content, meta, created_at, updated_at FROM templates ORDER BY created_at DESC'
    );
    const data = (rows || []).map(normalize);
    res.json(data);
  } catch (err) {
    console.error('GET /api/templates ->', err);
    res.status(500).json({ error: 'Erro ao listar templates' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, slug, title, content, meta, created_at, updated_at FROM templates WHERE slug = ? LIMIT 1',
      [req.params.slug]
    );
    if (!rows?.length) return res.status(404).json({ error: 'Template não encontrado' });
    res.json(normalize(rows[0]));
  } catch (err) {
    console.error('GET /api/templates/:slug ->', err);
    res.status(500).json({ error: 'Erro ao carregar template' });
  }
});

export default router;
