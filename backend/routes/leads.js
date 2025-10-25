import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

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
