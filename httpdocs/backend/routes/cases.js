import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.resolve(__dirname, '../../content/projects.json');

const router = Router();

const readProjects = () => JSON.parse(fs.readFileSync(dataPath, 'utf8'));

router.get('/', (_req, res) => {
  res.json(readProjects());
});

router.get('/:slug', (req, res) => {
  const project = readProjects().find((item) => item.slug === req.params.slug);
  if (!project) {
    return res.status(404).json({ error: 'not_found' });
  }

  res.json(project);
});

export default router;
