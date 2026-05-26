import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  const input: Record<string, string> = {
    main: path.resolve(__dirname, 'index.html'),
  };

  // Dynamically resolve entry points to avoid build errors if directories are named differently on different environments (e.g., privacy vs privacypolicy)
  if (fs.existsSync(path.resolve(__dirname, 'privacy/index.html'))) {
    input.privacy = path.resolve(__dirname, 'privacy/index.html');
  }
  if (fs.existsSync(path.resolve(__dirname, 'privacypolicy/index.html'))) {
    input.privacypolicy = path.resolve(__dirname, 'privacypolicy/index.html');
  }

  return {
    base: './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input,
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
