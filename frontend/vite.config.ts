import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Use absolute base to ensure built assets load on nested routes (e.g., /servicos/libras)
  // If you ever host under a subpath, set BASE_PATH env accordingly (e.g., "/subpath/").
  base: process.env.BASE_PATH || "/",
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: process.env.VITE_DEV_API_TARGET || 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Use root index.html as the entry so Vite can
    // transform it and inject the bundled assets correctly.
  },
}));
