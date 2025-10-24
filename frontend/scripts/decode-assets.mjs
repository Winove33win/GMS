// frontend/scripts/decode-assets.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const manifestPath = path.resolve(__dirname, "../assets/manifest.json");

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
}

function writeBinary(targetPath, base64String) {
  ensureDir(targetPath);
  const buffer = Buffer.from(base64String, "base64");
  fs.writeFileSync(targetPath, buffer);
  console.log(`✅ wrote ${targetPath} (${buffer.length} bytes)`);
}

try {
  if (!fs.existsSync(manifestPath)) {
    console.log("ℹ️ manifest not found, skipping asset decode.");
    process.exit(0);
  }
  const raw = fs.readFileSync(manifestPath, "utf-8");
  const map = JSON.parse(raw);
  const projectRoot = path.resolve(__dirname, "../../");

  Object.entries(map).forEach(([relativeOut, b64]) => {
    if (!b64 || b64.includes("TODO")) {
      console.warn(`⚠️ skipped ${relativeOut}: missing Base64`);
      return;
    }
    const outPath = path.resolve(projectRoot, relativeOut);
    writeBinary(outPath, b64);
  });

  console.log("🧩 Assets decoded successfully.");
  process.exit(0);
} catch (err) {
  console.error("❌ Error decoding assets:", err);
  process.exit(1);
}
