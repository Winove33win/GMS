const express = require('express');
const pool = require('../db/pool');
const router = express.Router();


router.post('/', async (req, res) => {

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { nome, email, telefone, origem, mensagem } = req.body || {};

    const normalise = (value) => {
      if (value === undefined || value === null) return null;
      const trimmed = String(value).trim();
      return trimmed.length ? trimmed : null;
    };

    const emailLimpo = normalise(email);
    const telefoneLimpo = normalise(telefone);

    if (!emailLimpo && !telefoneLimpo) {
      return res.status(400).json({ error: "Informe email ou telefone." });
    }

    const sql = `
      INSERT INTO leads_libras
        (nome, email, telefone, origem, mensagem, created_at)
      VALUES (?, ?, ?, ?, ?, NOW())
    `;
    const params = [
      normalise(nome),
      emailLimpo,
      telefoneLimpo,
      normalise(origem) || "site",
      normalise(mensagem),
    ];

    await pool.execute(sql, params);

    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error("POST /api/leads error:", err);
    return res.status(500).json({ error: "Falha ao salvar lead." });
  }
});

router.post("/libras", async (req, res) => {

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
