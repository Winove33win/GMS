import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Iniciando ambiente de desenvolvimento...\n');

// Iniciar o servidor Node.js
const serverProcess = spawn('node', ['index.js'], {
  cwd: join(__dirname, 'server'),
  stdio: 'inherit'
});

// Iniciar o Vite (frontend)
const viteProcess = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit'
});

// Gerenciar encerramento
process.on('SIGINT', () => {
  console.log('\n🛑 Encerrando serviços...');
  serverProcess.kill();
  viteProcess.kill();
  process.exit(0);
});

const apiPort = process.env.PORT || 3000;
console.log(`✅ Servidor API: http://127.0.0.1:${apiPort}`);
console.log('✅ Frontend: http://127.0.0.1:8080');