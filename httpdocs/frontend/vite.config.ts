import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    fs: {
      allow: [path.resolve(__dirname, '..', 'content')],
    },
  },
  build: {
    outDir: path.resolve(__dirname, '../backend/dist'),
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@content': path.resolve(__dirname, '..', 'content'),
    },
  },
});
