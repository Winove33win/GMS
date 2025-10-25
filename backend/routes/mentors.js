import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const dataPath = path.resolve(__dirname, '../data/mentors.json');

router.get('/', (_req, res) => {
  try {
    const raw = fs.readFileSync(dataPath, 'utf8');
    const items = JSON.parse(raw);
    res.json(items);
  } catch (error) {
    console.error('[mentors] failed to read data file', error);
    res.status(500).json({ error: 'read_error' });
  }
});

export default router;
