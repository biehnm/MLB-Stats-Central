import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath } from 'node:url';

const backendDir = fileURLToPath(new URL('../backend/', import.meta.url));

export default defineConfig(() => {
  const { PORT = 8080 } = loadEnv('development', backendDir, 'PORT');

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': `http://127.0.0.1:${PORT}`,
      },
    },
  };
});
