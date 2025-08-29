import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const backendDir = path.resolve(__dirname, '..');
const repoRoot = path.resolve(backendDir, '..');
const frontendDir = path.resolve(repoRoot, 'frontend');
const srcDist = path.resolve(frontendDir, 'dist');
const dstDist = path.resolve(backendDir, 'dist');

function run(cmd, cwd) {
  console.log(`$ ${cmd}`);
  execSync(cmd, { stdio: 'inherit', cwd });
}

try {
  // 1) Install and build frontend
  if (!process.env.BYPASS_FRONTEND_INSTALL) {
    try {
      run('npm ci', frontendDir);
    } catch (e) {
      console.warn('npm ci failed, falling back to npm install');
      run('npm install', frontendDir);
    }
  } else {
    console.log('Skipping frontend install due to BYPASS_FRONTEND_INSTALL=1');
  }

  run('npm run build', frontendDir);

  // 2) Sync dist -> backend/dist
  fs.rmSync(dstDist, { recursive: true, force: true });
  fs.mkdirSync(dstDist, { recursive: true });
  // Node 16+ has cpSync with recursive
  fs.cpSync(srcDist, dstDist, { recursive: true });

  // Sanity check
  const indexHtml = path.join(dstDist, 'index.html');
  if (!fs.existsSync(indexHtml)) {
    throw new Error(`Build sync failed: ${indexHtml} not found`);
  }

  console.log('Frontend build synced to backend/dist');
} catch (err) {
  console.error(err.message || err);
  process.exit(1);
}

