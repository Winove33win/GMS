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
}

(async () => {
  console.log('▶ build-and-sync');
  await sh('npm', ['ci','--no-audit','--prefer-offline'], FRONT);
  await sh('npm', ['run','build'], FRONT);
  if (!fs.existsSync(FRONT_DIST)) throw new Error('dist inexistente');

  await copyDir(FRONT_DIST, BACK_DIST);
  console.log('✅ sync ok →', BACK_DIST);
})();
