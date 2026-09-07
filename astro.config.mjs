// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

// Ratgeber entries marked draft: true must not appear in the sitemap
// (CLAUDE.md's kickoff spec) — computed here via plain fs since
// astro.config.mjs runs before the content layer is available.
const ratgeberDir = fileURLToPath(new URL('./src/content/ratgeber/', import.meta.url));
const draftRatgeberSlugs = readdirSync(ratgeberDir)
  .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
  .filter((file) => /^draft:\s*true/m.test(readFileSync(join(ratgeberDir, file), 'utf-8')))
  .map((file) => file.replace(/\.(md|mdx)$/, ''));

// Legal pages stay crawlable and indexable (footer-linked, no noindex)
// but aren't worth submitting in the sitemap — they carry no ranking
// value and aren't pages we want surfaced as separate search results.
const excludedFromSitemap = ['/impressum/', '/datenschutz/', '/agb/'];

// https://astro.build/config
export default defineConfig({
  site: 'https://energy-solvita.de',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap({
      filter: (page) =>
        !draftRatgeberSlugs.some((slug) => page.includes(`/ratgeber/${slug}/`)) &&
        !excludedFromSitemap.some((path) => page.includes(path)),
    }),
    mdx(),
  ]
});
