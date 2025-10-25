import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const r = Router();
const dataPath = path.resolve(__dirname, "../../content/mentors.json");

r.get("/", (_req, res) => {
  try {
    const items = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: "read_error" });
  }
});

export default r;
