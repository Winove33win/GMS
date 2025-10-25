import { Router } from "express";
import { pool } from "../db.js";

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
    const hp = typeof req.body?.hp_field === "string" ? req.body.hp_field.trim() : "";
    if (hp) return res.status(200).json({ ok: true });

    const {
      nome, email, telefone, empresa,
      tipoServico, dataEvento, local: local_evento,
      tamanhoPublico, duracao, linkVideo, descricao,
      lgpdConsent
    } = req.body || {};

    const normalise = (value) => {
      if (value === undefined || value === null) return null;
      const trimmed = String(value).trim();
      return trimmed.length ? trimmed : null;
    };

    const nomeLimpo = normalise(nome);
    const emailLimpo = normalise(email);

    if (!nomeLimpo || !emailLimpo) {
      return res.status(400).json({ error: "nome e email são obrigatórios" });
    }

    const consentValue = (() => {
      if (typeof lgpdConsent === "string") {
        return ["1", "true", "on", "yes"].includes(lgpdConsent.trim().toLowerCase()) ? 1 : 0;
      }
      return lgpdConsent ? 1 : 0;
    })();

    await pool.execute(
      `INSERT INTO leads_libras
       (nome, email, telefone, empresa, tipoServico, dataEvento, local_evento, tamanhoPublico, duracao, linkVideo, descricao, lgpdConsent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nomeLimpo,
        emailLimpo,
        normalise(telefone),
        normalise(empresa),
        normalise(tipoServico),
        normalise(dataEvento),
        normalise(local_evento),
        normalise(tamanhoPublico),
        normalise(duracao),
        normalise(linkVideo),
        normalise(descricao),
        consentValue
      ]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error("POST /api/leads/libras error:", err);
    res.status(500).json({ error: "internal_error" });
  }
});

export default router;
