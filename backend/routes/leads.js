const express = require('express');
const pool = require('../db/pool');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { nome, email, telefone, origem, mensagem } = req.body || {};
    if (!email && !telefone) {
      return res.status(400).json({ error: 'Informe email ou telefone.' });
    }
    await pool.execute(
      `INSERT INTO leads_libras
       (nome, email, telefone, origem, mensagem, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [nome || null, email || null, telefone || null, origem || 'site', mensagem || null]
    );
    res.status(201).json({ ok: true });
  } catch (e) {
    console.error('[leads] erro:', e);
    res.status(500).json({ error: 'Falha ao salvar lead.' });
  }
});

module.exports = router;
