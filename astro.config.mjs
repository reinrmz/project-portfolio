// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import { SITE } from './src/data/site.ts';

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  output: 'static',
  trailingSlash: 'never',
  build: {
    // Single page, ~20KB of CSS. Inlining it removes the only render-blocking
    // request on the page; there is no second page to amortise a cached
    // stylesheet across, so the external file would never pay for itself.
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
