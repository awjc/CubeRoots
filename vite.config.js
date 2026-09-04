import { defineConfig } from 'vite';

export default defineConfig({
  // Using './' makes all asset paths relative to index.html
  // This is needed for GitHub Pages subpaths.
  base: './',
});
