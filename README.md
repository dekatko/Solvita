# SolVita — Website Rebuild (v1)

Rebuilt marketing site for SolVita (Photovoltaik/Solaranlagen, Wolfsburg), replacing the previous WordPress/Elementor site at energy-solvita.de. Built with [Astro](https://astro.build) + Tailwind CSS for near-zero shipped JS and strong Core Web Vitals/SEO.

**This is local scaffolding only — nothing here has been deployed.** All copy is grounded in facts pulled from the live site but rewritten; every page carries a `<!-- REVIEW: verify facts, pricing, brand names before publishing -->` marker and every unconfirmed fact is a bracketed `[TODO: ...]` / `[Preis auf Anfrage]` placeholder. A human fact-check pass against the real business is required before publishing.

## Project structure

```text
src/
  content.config.ts       content collection schemas (standorte, ratgeber)
  content/
    standorte/             one .md per town (Wolfsburg, Gifhorn, Helmstedt, Braunschweig)
    ratgeber/               blog/guide articles (incl. Förderung in Niedersachsen)
  data/                    single-source data: NAP, FAQ, services, testimonials
  components/              BaseHead (SEO), Header, Footer, Breadcrumbs, ServiceLinks,
                           LocationLinks, FaqList, Testimonials, CTA, Icon, SiteImage
  layouts/Layout.astro     base layout, <html lang="de">
  pages/                   all routes, incl. dynamic /standorte/[slug]/ and /ratgeber/[slug]/
```

## SEO implementation

- `BaseHead.astro` sets title/description/canonical/Open Graph per page (props, no duplication).
- JSON-LD: `LocalBusiness` (site-wide, in the footer), `FAQPage` (`/faq/`), `Review`/`AggregateRating` (`/referenzen/`), `BreadcrumbList` (`/standorte/*`, `/ratgeber/*`).
- `@astrojs/sitemap` generates `sitemap-index.xml` on build; `public/robots.txt` allows all crawling and links to it.
- `SiteImage.astro` requires `alt` as a typed prop and warns in dev if it's ever empty.
- `ServiceLinks`/`LocationLinks` cross-link every `/standorte/*` page to `/leistungen/*` pages and vice versa.

## Commands

| Command           | Action                                      |
| :----------------- | :------------------------------------------ |
| `npm install`       | Install dependencies                        |
| `npm run dev`       | Start local dev server at `localhost:4321`  |
| `npm run build`     | Build production site to `./dist/`          |
| `npm run preview`   | Preview the build locally                   |

## Known gaps before publishing

- Handelsregister number and USt-IdNr. were not published on the live site — confirm and add to `src/data/nap.ts`, `/impressum/`.
- Datenschutzerklärung is a placeholder — needs a proper legal review.
- Brand/partner list (Sungrow, Huawei, Deye, EcoFlow, K2 Systems, Heidelberg, myenergi, Loxone) was scraped from the homepage and should be reconfirmed.
- No photography is included (nothing was downloaded from the old site); real project photos should replace the icon/gradient-based visuals via `SiteImage.astro`.
