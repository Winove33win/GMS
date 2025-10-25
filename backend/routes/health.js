import { Router } from "express";
import pool from "../db/pool.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV || "production" });
});

router.get("/health/db", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS ok");
    res.json({ ok: rows?.[0]?.ok === 1 });
  } catch (e) {
    console.error("[health/db]", e);
    res.status(500).json({ ok: false, error: "db_error" });
  }
});

export default router;
