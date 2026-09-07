#!/usr/bin/env node
// Post-build verification. Run `npm run build` first, then `npm run verify`.
//
// Checks:
//   1. Every page's <title> is <=60 chars and meta description is 140-158 chars.
//   2. --c-sage is never used as a button/panel fill (bg-sage must not appear
//      at all — CLAUDE.md: "Never a filled button"). text-sage usages are
//      listed for a human to confirm they're only ever on a bg-ink panel
//      (the one sanctioned case) — that ancestor relationship isn't
//      reliably checkable with a plain HTML-string parser.
//   3. Every internal link in the built site resolves to a real page
//      (zero internal 404s).
//   4. Every page is reachable from at least one other page (zero orphans),
//      except pages that are intentionally unlisted: draft Ratgeber
//      articles (CLAUDE.md: must not appear in listings) and the legal
//      pages (reachable only via the footer, which still counts as a link,
//      so this exception in practice only applies to drafts).

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
if (!existsSync(DIST)) {
  console.error('dist/ not found — run `npm run build` first.');
  process.exit(1);
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (entry === 'index.html') out.push(full);
  }
  return out;
}

const files = walk(DIST);
const pages = files.map((file) => {
  const route = '/' + file.replace(new RegExp(`^${DIST}[\\\\/]`), '').replace(/index\.html$/, '').replace(/\\/g, '/');
  return { file, route, html: readFileSync(file, 'utf-8') };
});
const routeSet = new Set(pages.map((p) => p.route));

// Draft ratgeber articles are intentionally unlisted anywhere — reachable
// only by direct URL. Detected via the visible "noindex" draft banner text
// rather than re-reading source frontmatter, so this script only depends on dist/.
const draftRoutes = new Set(
  pages.filter((p) => p.html.includes('Entwurf — noch nicht veröffentlicht')).map((p) => p.route)
);

let errors = 0;

// --- 1. Title / description length ---
console.log('--- Title / description length ---');
for (const { route, html } of pages) {
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  const descMatch = html.match(/<meta name="description" content="([^"]*)"/);
  const title = titleMatch?.[1];
  const desc = descMatch?.[1]?.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
  const titleLen = title ? [...title].length : 0;
  const descLen = desc ? [...desc].length : 0;
  const titleOk = title && titleLen <= 60;
  const descOk = desc && descLen >= 140 && descLen <= 158;
  if (!titleOk || !descOk) {
    errors++;
    console.log(`  FAIL ${route}`);
    if (!titleOk) console.log(`    title (${titleLen}): ${title}`);
    if (!descOk) console.log(`    desc  (${descLen}): ${desc}`);
  }
}
console.log(`Checked ${pages.length} pages.\n`);

// --- 2. --c-sage misuse ---
console.log('--- --c-sage usage ---');
const bgSagePages = pages.filter((p) => /\bbg-sage\b/.test(p.html));
if (bgSagePages.length) {
  errors++;
  console.log('  FAIL: bg-sage found (never allowed as a filled button/panel):');
  for (const p of bgSagePages) console.log('   ', p.route);
} else {
  console.log('  OK: bg-sage never used.');
}
const textSagePages = pages.filter((p) => /\btext-sage\b/.test(p.html));
console.log(`  text-sage appears on ${textSagePages.length} page(s) — confirm by hand each is on a bg-ink panel:`);
for (const p of textSagePages) console.log('   ', p.route);
console.log();

// --- 3 & 4. Internal links: 404s and orphans ---
console.log('--- Internal links ---');
const incoming = new Map([...routeSet].map((r) => [r, new Set()]));
let brokenLinks = 0;

for (const { route, html } of pages) {
  // Only <a href="...">, not <link>/<script> asset references.
  const hrefs = [...html.matchAll(/<a\s[^>]*href="(\/[^"#]*)"/g)].map((m) => m[1]);
  for (const href of hrefs) {
    const normalized = href.endsWith('/') ? href : href + '/';
    if (!routeSet.has(normalized)) {
      brokenLinks++;
      console.log(`  BROKEN LINK on ${route} -> ${href}`);
      continue;
    }
    incoming.get(normalized)?.add(route);
  }
}
if (brokenLinks === 0) console.log('  OK: zero internal 404s.');
else errors += brokenLinks;

console.log();
let orphans = 0;
for (const route of routeSet) {
  if (draftRoutes.has(route)) continue; // intentionally unlisted
  if (route === '/') continue; // the entry point
  const linkedFrom = incoming.get(route);
  if (!linkedFrom || linkedFrom.size === 0) {
    orphans++;
    console.log(`  ORPHAN: ${route} has no incoming internal links`);
  }
}
if (orphans === 0) console.log('  OK: zero orphan pages (excluding intentionally-unlisted drafts).');
else errors += orphans;

console.log(`\n${errors === 0 ? 'ALL CHECKS PASSED' : `${errors} PROBLEM(S) FOUND`}`);
process.exit(errors === 0 ? 0 : 1);
