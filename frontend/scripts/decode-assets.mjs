import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const encodedDir = path.resolve(__dirname, "../assets/encoded");
const outputDir = path.resolve(__dirname, "../public/assets");

function walkBase64Files(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results.push(...walkBase64Files(entryPath));
    } else if (entry.isFile() && entry.name.endsWith(".b64")) {
      results.push(entryPath);
    }
  }

  return results;
}

function decodeFile(sourcePath, targetPath) {
  const base64Content = fs.readFileSync(sourcePath, "utf-8").replace(/\s+/g, "");
  const buffer = Buffer.from(base64Content, "base64");
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, buffer);
  const relativeTarget = path.relative(path.resolve(__dirname, ".."), targetPath);
  console.log(`🧾 decoded ${relativeTarget} (${buffer.length} bytes)`);
}

try {
  if (!fs.existsSync(encodedDir)) {
    console.log("ℹ️ No encoded assets directory found, skipping decode.");
    process.exit(0);
  }

  const files = walkBase64Files(encodedDir);

  if (files.length === 0) {
    console.log("ℹ️ No Base64 assets to decode.");
    process.exit(0);
  }

  for (const sourcePath of files) {
    const relativePath = path.relative(encodedDir, sourcePath);
    const baseName = relativePath.replace(/\.b64$/i, "");
    const targetPath = path.join(outputDir, baseName);
    decodeFile(sourcePath, targetPath);
  }

  console.log("✅ Assets decoded successfully.");
} catch (error) {
  console.error("❌ Error decoding assets:", error);
  process.exit(1);
}
