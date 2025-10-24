import { Router } from 'express';

export const postSeoApiRouter = Router();
export const postSeoPageRouter = Router();

postSeoApiRouter.get('/', (_req, res) => {
  res.json({ ok: true });
});

postSeoPageRouter.get('/seo', (_req, res) => {
  res.status(200).send('SEO landing placeholder');
});
