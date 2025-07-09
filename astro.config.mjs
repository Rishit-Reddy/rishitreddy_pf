// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://rishitreddy.com', // Update this to your actual domain
  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],
    build: {
      // Improve error reporting
      sourcemap: true,
    },
    resolve: {
      preserveSymlinks: true,
    },
  },
  integrations: [
    react(),
    sitemap()
  ]
});