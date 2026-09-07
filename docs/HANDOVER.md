# Handover — SolVita relaunch

Status: built and verified locally on the `relaunch` branch. Not deployed.
Nothing has touched DNS or hosting.

## What was built

A full Astro 7 rebuild of energy-solvita.de per `CLAUDE.md`, replacing the
WordPress/Elementor site. Zero client JS beyond two tiny islands (mobile nav
toggle, contact form fetch handler — both under 300 bytes each, inlined by
Astro rather than shipped as separate requests). No third-party requests at
all: fonts are self-hosted, Analytics (Plausible) was never wired up (not
requested in this pass — see "Not done" below), the map is click-to-load.

**Routes** (32 pages, all in CLAUDE.md's route table):
- `/` — home
- `/photovoltaikanlage/`, `/stromspeicher/`, `/waermepumpe/`, `/wallboxen/`,
  `/klimaanlage/`, `/smart-home/`, `/baustromkasten/`,
  `/energie-gebaeudetechnik/` — the `leistungen` content collection
- `/photovoltaik-{wolfsburg,gifhorn,braunschweig,helmstedt}/` — the `orte`
  content collection, genuinely distinct copy per city
- `/referenzen/` + `/referenzen/[slug]/` — `referenzen` collection, currently
  **empty** (honest "coming soon" state, not fabricated projects)
- `/ratgeber/` + `/ratgeber/[slug]/` — `ratgeber` collection, 10 MDX drafts
  (`draft: true`), excluded from the sitemap and from `/ratgeber/` but
  directly reachable with a visible draft banner + `noindex` for review
- `/ueber-uns/`, `/jobs/`, `/faq/` (15 Q&A, `FAQPage` schema), `/kontakt/`
  (form + click-to-load map)
- `/impressum/`, `/datenschutz/`, `/agb/` — structural placeholders, need a
  lawyer's review, excluded from the sitemap (still indexable)

**SEO/structured data**: `Electrician` JSON-LD site-wide (geo and Google
Business Profile `sameAs` genuinely omitted, not guessed), `Service` schema
on every leistungen page pointing at the org `@id`, `FAQPage` on `/faq/`,
`BreadcrumbList` on nested routes. Every title/description enforced by a
Zod schema (140–158 char descriptions, ≤60 char titles) that fails the
build on violation — verified this for real, not just by inspection.

**Design system**: `src/styles/tokens.css` copied verbatim from CLAUDE.md,
wired into Tailwind v4 via `@theme`. Two real rendering bugs were found and
fixed during verification (see git log on `relaunch` for detail): an
unlayered CSS rule beating Tailwind utilities via cascade-layer priority
(made the homepage h1 briefly invisible), and two color-contrast failures
caught by an actual axe-core pass, not just a visual check.

## Every open fact

See **[docs/OPEN-FACTS.md](OPEN-FACTS.md)** — nothing here is duplicated,
that file is the single source. Summary of categories: business/legal facts
(geo, USt-IdNr., Rechtsform, Handelsregister, GBP URL), logo assets (only a
placeholder mark exists), reference projects (zero — collection is empty),
prices (all `[Preis auf Anfrage]`), and per-page content TODOs.

## Deploy steps (Cloudflare Pages)

1. **Push `relaunch` to GitHub** (already the case) and connect the repo in
   the Cloudflare Pages dashboard, or run `wrangler pages deploy dist` from
   a built checkout.
2. **Build settings**: build command `npm run build`, output directory
   `dist`, Node version 22+ (matches `engines` in `package.json`).
3. **Environment variable**: set `RESEND_API_KEY` (or swap
   `functions/api/kontakt.ts`'s `sendEmail()` for whichever provider/SMTP
   relay you prefer — it's one function body). Without this the contact
   form validates correctly but the send step returns 500. Verify the
   sender domain (`kontaktformular@energy-solvita.de`) with your email
   provider before going live, or change `FROM_EMAIL` in that file.
4. **Preview-deployment indexing**: Cloudflare Pages preview URLs (the
   `*.pages.dev` branch deploys) should not get indexed while you're
   testing. Check Cloudflare Pages' project settings for a preview-deploy
   protection/robots option, since the site itself has no code-level
   staging flag — every page here is either indexable-by-design or
   `noindex` because it's a draft, not because it's "not launched yet".
5. **Custom domain**: point `energy-solvita.de` at the Pages project once
   ready, following Cloudflare's DNS instructions.
6. **`_redirects`** and **`robots.txt`** are already in `public/` and get
   deployed automatically — no separate configuration needed. One redirect
   needs a decision before launch: `/gebaeude-3d-bilder/` currently points
   at `/leistungen/drohnenaufnahmen/`, which doesn't exist on the new site
   (flagged in `public/_redirects` and here).

## Post-launch checklist (from CLAUDE.md, annotated)

### Before cutover
- [ ] **Redirects tested on the preview domain** — not yet possible locally;
  test every line in `public/_redirects` against the live Cloudflare Pages
  preview URL once deployed, including the 410 for `hello-world`.
- [ ] **`noindex` removed** — applies to the Ratgeber drafts: review each of
  the 10 articles in `src/content/ratgeber/`, fill in their `TODO(daniel)`
  placeholders, and flip `draft: true` → `false` once approved. That
  automatically removes the `noindex` meta tag, adds the page to
  `/ratgeber/` and the sitemap — no other code change needed.
- [x] **Schema validated in the Rich Results Test** — I can't run Google's
  actual tool from here, but every JSON-LD block was extracted from the
  rendered pages and checked for valid structure (see git history for the
  Step 3 verification). Worth a real pass through
  [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
  once deployed.
- [x] **Every title/description present and in range** — enforced by the
  Zod schema for collection-backed pages, and checked by
  `scripts/verify.mjs` against actual built HTML for every page including
  the hand-written ones.
- [ ] **Contact form delivers to the real inbox, tested twice** — can't be
  tested until `RESEND_API_KEY` is configured in a real Cloudflare Pages
  environment (Pages Functions don't run under plain `astro dev`/`preview`
  locally).
- [ ] **Impressum complete** — missing Rechtsform, Handelsregisternummer,
  USt-IdNr., Handwerkskammer. See OPEN-FACTS.md.
- [ ] **Datenschutzerklärung matches what the site actually loads** — the
  current text is a structural placeholder, not a compliant policy; needs
  a lawyer's or Datenschutzbeauftragter's review before publishing,
  especially once Plausible (or any analytics) is actually wired up.

### After cutover
- [ ] Search Console property + submit the new sitemap
  (`https://energy-solvita.de/sitemap-index.xml`)
- [ ] Request indexing for the six money pages (home, `/photovoltaikanlage/`,
  the four `/photovoltaik-{city}/` pages — or whichever six matter most)
- [ ] Remove the old WordPress sitemap from Search Console
- [ ] Update the GBP website link to the new domain, and once you have the
  GBP URL, add it to `sameAs` in `src/lib/business.ts`
  (`googleBusinessProfileUrl`) — CLAUDE.md flags this as mattering for
  tying the site and profile together in Google's eyes
- [ ] Crawl for 404s and orphans on the live domain (a repeat of
  `npm run verify`'s link/orphan check, but against production)
- [ ] Baseline ranking snapshot for the 12 target queries
- [ ] 30-day impressions review

**Keep the old WordPress running read-only for 30 days** as a rollback path.

## Not done (out of this pass's scope)

- **Plausible analytics** — CLAUDE.md's stack section names it, but no
  account/site ID was provided, so nothing was wired up. Adding it later is
  a two-line change (one script tag, self-hosted-friendly since Plausible
  is cookieless and needs no consent banner).
- **Real photography/logo** — the entire site uses the placeholder mark and
  icon/color-block illustration instead of photos, since nothing was
  downloaded from the old site and no real assets were supplied. See
  OPEN-FACTS.md's Logo section for exactly what's needed.
- **PNG favicon set / `site.webmanifest`** — only an SVG favicon exists.
  Generate the 32/180/512 PNGs + manifest once the real mark-only crop
  arrives (no point generating them from the placeholder).
