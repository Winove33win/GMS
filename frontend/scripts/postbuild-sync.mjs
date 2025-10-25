import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendDir = path.resolve(__dirname, '..');
const repoRoot = path.resolve(frontendDir, '..');
const backendDir = path.resolve(repoRoot, 'backend');
const sourceDist = path.resolve(frontendDir, 'dist');
const targetDist = path.resolve(backendDir, 'dist');

function log(message) {
  console.log(`[postbuild-sync] ${message}`);
}

function fail(message) {
  console.error(`[postbuild-sync] ${message}`);
  process.exit(1);
}

try {
  const sourceIndex = path.join(sourceDist, 'index.html');
  if (!fs.existsSync(sourceIndex)) {
    fail(`Arquivo não encontrado após build: ${sourceIndex}`);
  }

  fs.rmSync(targetDist, { recursive: true, force: true });
  fs.mkdirSync(targetDist, { recursive: true });
  fs.cpSync(sourceDist, targetDist, { recursive: true });

  const targetIndex = path.join(targetDist, 'index.html');
  if (!fs.existsSync(targetIndex)) {
    fail(`Falha ao copiar build: ${targetIndex} não existe.`);
  }

  log(`Build copiado com sucesso para ${targetDist}`);
} catch (error) {
  fail(error.message || String(error));
}
