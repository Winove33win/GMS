#!/usr/bin/env node
import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const ROOT = path.join(__dirname, '..', '..');
const FRONT = path.join(ROOT, 'frontend');
const FRONT_DIST = path.join(FRONT, 'dist');
const BACK = path.join(ROOT, 'backend');
const BACK_DIST = process.env.SSR_DIST_DIR || path.join(BACK, 'dist');

function sh(cmd, args, cwd) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { cwd, stdio: 'inherit' });
    p.on('close', c => (c === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(' ')} -> ${c}`))));
  });
}

async function copyDir(src, dst) {
  await fsp.rm(dst, { recursive: true, force: true });
  await fsp.mkdir(dst, { recursive: true });
  const isWin = process.platform === 'win32';
  await sh(isWin ? 'xcopy' : 'cp', isWin ? ['/E','/I','/Y', src, dst] : ['-r', src+'/', dst+'/'], path.dirname(src));
=======
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

(async () => {
  console.log('▶ build-and-sync');
  await sh('npm', ['ci','--no-audit','--prefer-offline'], FRONT);
  await sh('npm', ['run','build'], FRONT);
  if (!fs.existsSync(FRONT_DIST)) throw new Error('dist inexistente');

  await copyDir(FRONT_DIST, BACK_DIST);
  console.log('✅ sync ok →', BACK_DIST);
})();
