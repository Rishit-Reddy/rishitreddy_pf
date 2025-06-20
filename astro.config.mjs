// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Improve error reporting
      sourcemap: true,
    },
    resolve: {
      preserveSymlinks: true
    }
  },
  integrations: [react()]
});