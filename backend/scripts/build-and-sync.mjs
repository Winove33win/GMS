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
const distOverride = process.env.SSR_DIST_DIR;
const dstDist = distOverride
  ? path.resolve(path.isAbsolute(distOverride) ? distOverride : path.join(backendDir, distOverride))
  : path.resolve(backendDir, 'dist');

if (distOverride) {
  console.log(`Using SSR_DIST_DIR override: ${dstDist}`);
}

function run(cmd, cwd) {
  console.log(`$ ${cmd}`);
  execSync(cmd, { stdio: 'inherit', cwd });
}

const args = new Set(process.argv.slice(2));
const skipInstall =
  args.has('--skip-install') ||
  process.env.BYPASS_FRONTEND_INSTALL === '1' ||
  process.env.BYPASS_FRONTEND_INSTALL?.toLowerCase() === 'true' ||
  process.env.SKIP_FRONTEND_INSTALL === '1' ||
  process.env.SKIP_FRONTEND_INSTALL?.toLowerCase() === 'true' ||
  process.env.CI_SKIP_FRONTEND_INSTALL === '1' ||
  process.env.CI_SKIP_FRONTEND_INSTALL?.toLowerCase() === 'true';

try {
  // 1) Install and build frontend
  if (!skipInstall) {
    try {
      run('npm ci', frontendDir);
    } catch (e) {
      console.warn('npm ci failed, falling back to npm install');
      run('npm install', frontendDir);
    }
  } else {
    console.log('Skipping frontend install (flag or environment variable detected)');
  }

  run('npm run build', frontendDir);

  // 2) Sync dist -> backend/dist
  console.log(`Syncing frontend build to ${dstDist}`);
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

