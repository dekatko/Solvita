// @ts-check
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
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

// The primary deploy target is Cloudflare Pages at the site's own domain
// (base "/"). Setting GITHUB_PAGES=true switches to a secondary target:
// this repo hosted as a GitHub Pages *project* site, which is served
// from a subpath (https://<user>.github.io/<repo>/), not the root —
// unless a custom domain is configured for it later.
const isGithubPages = process.env.GITHUB_PAGES === 'true';
const repoName = 'Solvita';
const base = isGithubPages ? `/${repoName}` : '/';
const site = isGithubPages ? `https://dekatko.github.io/${repoName}/` : 'https://energy-solvita.de';

// Astro's `base` only rewrites paths generated through its own APIs
// (Astro.url, the sitemap, etc.) — it does not retroactively rewrite
// hardcoded root-relative hrefs/srcs written directly in components or
// in Markdown/MDX body content (e.g. every nav link, every
// [Stromspeicher](/stromspeicher/) link inside a Ratgeber article).
// Astro's own docs call this out as something you handle yourself.
// Rather than touch every one of those call sites individually (they're
// scattered across ~25 pages and inside prose content, which can't call
// a JS helper), this rewrites the built HTML once, uniformly, after the
// static build finishes — only when actually building for GitHub Pages.
// Skips anything already correctly base-prefixed (Astro's own canonical/
// OG tags, which are base-aware already) to avoid double-prefixing.
/** @returns {import('astro').AstroIntegration} */
function githubPagesBaseRewrite() {
  return {
    name: 'github-pages-base-rewrite',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        if (!isGithubPages) return;

        const root = fileURLToPath(dir);
        const segment = repoName;
        const attrRegex = new RegExp(`(href|src|action)="/(?!${segment}/)`, 'g');

        /** @param {string} current */
        function walk(current) {
          for (const entry of readdirSync(current, { withFileTypes: true })) {
            const full = join(current, entry.name);
            if (entry.isDirectory()) {
              walk(full);
            } else if (entry.name.endsWith('.html')) {
              const html = readFileSync(full, 'utf-8');
              const rewritten = html.replace(attrRegex, `$1="/${segment}/`);
              if (rewritten !== html) writeFileSync(full, rewritten, 'utf-8');
            }
          }
        }

        walk(root);
        logger.info(`Rewrote internal links to the /${segment}/ base for GitHub Pages.`);
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site,
  base,
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
    githubPagesBaseRewrite(),
  ]
});
