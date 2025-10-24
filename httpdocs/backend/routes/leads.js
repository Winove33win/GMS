import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  res.json({ ok: true, received: req.body || null });
});

export default router;
