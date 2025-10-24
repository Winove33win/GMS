import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const manifestPath = path.resolve(__dirname, '../assets/manifest.json');

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function writeBinary(targetPath, base64String) {
  ensureDir(targetPath);
  const buffer = Buffer.from(base64String, 'base64');
  fs.writeFileSync(targetPath, buffer);
  console.log('✅ wrote', targetPath, buffer.length, 'bytes');
}

try {
  if (!fs.existsSync(manifestPath)) {
    console.log('ℹ️ no manifest, skipping');
    process.exit(0);
  }

  const raw = fs.readFileSync(manifestPath, 'utf8');
  const map = JSON.parse(raw);
  const projectRoot = path.resolve(__dirname, '../../');

  for (const [relativeOut, base64] of Object.entries(map)) {
    if (!base64 || base64.includes('TODO')) {
      console.warn('⚠️ skip', relativeOut);
      continue;
    }

    const outPath = path.resolve(projectRoot, relativeOut);
    writeBinary(outPath, base64);
  }

  console.log('🧩 assets decoded');
  process.exit(0);
} catch (error) {
  console.error('❌ decode error', error);
  process.exit(1);
}
