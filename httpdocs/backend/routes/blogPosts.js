import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const blogDir = path.resolve(__dirname, '../../content/blog');

const router = Router();

router.get('/', (_req, res) => {
  const files = fs.readdirSync(blogDir).filter((name) => name.endsWith('.md'));
  const items = files.map((file) => {
    const slug = file.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(blogDir, file), 'utf8');
    const title = (raw.match(/^#\s+(.+)/m) || [])[1] || slug;
    const excerpt = raw.replace(/^#.+\n/, '').trim().slice(0, 240);
    return { slug, title, excerpt };
  });

  res.json(items);
});

router.get('/:slug', (req, res) => {
  const filePath = path.join(blogDir, `${req.params.slug}.md`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'not_found' });
  }

  const markdown = fs.readFileSync(filePath, 'utf8');
  res.json({ slug: req.params.slug, markdown });
});

export default router;
