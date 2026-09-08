# SolVita — website relaunch

Astro rebuild of energy-solvita.de (Photovoltaik/Solaranlagen, Wolfsburg),
replacing the old WordPress/Elementor site. `CLAUDE.md` in the repo root is
the project spec and the source of truth if anything here disagrees with it.

Full status, open facts, and the deploy/post-launch checklist:
[docs/HANDOVER.md](docs/HANDOVER.md) and [docs/OPEN-FACTS.md](docs/OPEN-FACTS.md).

## Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the local dev server at `localhost:4321` |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the build locally |
| `npm run check` | `astro check` — type/template errors |
| `npm run verify` | Post-build audit: title/description lengths, `--c-sage` misuse, internal 404s, orphan pages. Run `npm run build` first. |

## Deploy targets

This site builds for two different hosts from the same source, switched by
an environment variable:

- **Cloudflare Pages** (the real, eventual production host) — `npm run
  build` with no env var. Serves from the site's own domain root. Redirects
  (`public/_redirects`) and the contact form (`functions/api/kontakt.ts`,
  a Cloudflare Pages Function) only work here.
- **GitHub Pages** (a secondary target for sharing a client preview) —
  `GITHUB_PAGES=true npm run build`, or just push to `relaunch`/`main` and
  let [`.github/workflows/deploy-gh-pages.yml`](.github/workflows/deploy-gh-pages.yml)
  do it. GitHub Pages serves project sites from a subpath
  (`https://<user>.github.io/Solvita/`, not the root), so this build mode
  sets `base`/`site` accordingly and rewrites the built HTML's internal
  links to match — see the comment above `githubPagesBaseRewrite()` in
  `astro.config.mjs` for why that's a post-build rewrite rather than
  per-component code. **The contact form does not work on this
  deployment** — GitHub Pages can't run the Cloudflare Pages Function it
  posts to, so submitting it shows the form's own error state rather than
  actually sending mail. Everything else (all pages, fonts, the
  click-to-load map) works normally.

## Project structure

```text
src/
  content.config.ts       content collection schemas (leistungen, orte, ratgeber, referenzen)
  content/                the four collections' entries
  lib/                    business.ts (NAP facts), schema.ts (JSON-LD builders), faq.ts
  layouts/                BaseLayout, LeistungLayout, OrtLayout
  components/             Header, Footer, Seo, Faq, Breadcrumbs, ContactForm, MapOnClick, ...
  pages/                  every route in CLAUDE.md's table
  styles/                 tokens.css (verbatim from CLAUDE.md), global.css (Tailwind wiring), fonts.css
functions/api/kontakt.ts  Cloudflare Pages Function backing the contact form
scripts/verify.mjs        the npm run verify script
docs/                     OPEN-FACTS.md, HANDOVER.md
```
