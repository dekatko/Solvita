# SolVita — project spec

Website rebuild for **SolVita**, solar/electrical contractor, Wolfsburg (Lower Saxony, DE).
Replaces a WordPress + Elementor site that had no SEO layer at all.
Site language is **German**. This file is the source of truth; if code and this file
disagree, this file is right.

## Business facts (verified — do not alter)

| | |
|---|---|
| Legal contact | Daniel Weiss, Elektroingenieur |
| Address | Zum Badekoth 22a, 38448 Wolfsburg |
| Phone | `05366 9894361` → `tel:+4953669894361` |
| Email | `info@energy-solvita.de` |
| WhatsApp | `https://wa.me/4917620126267` |
| Hours | Mo–Fr 08:00–17:00, Sa 10:00–14:00 |
| Founded | independent 2022, company 2024 |
| Areas served | Wolfsburg, Gifhorn, Braunschweig, Helmstedt |
| Manufacturers | Sungrow, Deye, myenergi, Loxone, K2 Systems |
| Instagram | `https://www.instagram.com/energy_solvita/` |

**Unknown — must stay TODO, never guessed:** geo coordinates, USt-IdNr., legal form,
chamber of trade, Google Business Profile URL, Facebook/LinkedIn URLs, all reference
projects, all prices, all reviews.

## Brand

The logo is a gear containing a rising sun, halved by a horizon line, in a single
flat fill: **`#77B0AA`** — hue 174°, sat 26%, light 58%.

Design direction: **"Horizont"**. Quiet, precise, engineered. The horizon split is the
recurring layout device — 50/50 compositions with a hard edge, never soft gradients.
No decorative gears or sun rays; the mark already carries that.

### Tokens — `src/styles/tokens.css`

```css
:root{
  /* brand — one hue (174deg) at three lightnesses */
  --c-sage:       #77B0AA;  /* the logo colour. SURFACES ONLY. */
  --c-petrol:     #2C5B56;  /* text-safe brand: links, buttons, interactive text */
  --c-petrol-dk:  #1F4340;  /* hover / pressed */
  --c-ink:        #142523;  /* headings */
  --c-ink-2:      #2E403D;  /* body text */

  /* neutrals — faintly green-biased to sit under the brand */
  --c-paper:      #F8F9F7;
  --c-mist:       #E8EEEC;
  --c-line:       #D3DDDA;
  --c-zinc:       #63726F;  /* captions — 4.77:1 on paper */

  /* data only — NOT brand colours */
  --c-yield:      #C8873F;  /* chart marks and fills — 2.84:1, never text */
  --c-yield-ink:  #9B6318;  /* the same note as text — 4.74:1 */

  --c-ok:   #3E7D5C;
  --c-warn: #A87A22;
  --c-crit: #A8452F;

  --f-display: "Archivo", "Helvetica Neue", Arial, sans-serif;
  --f-body:    "Public Sans", system-ui, sans-serif;
  --f-mono:    "IBM Plex Mono", ui-monospace, monospace;

  --t-xs:.8125rem; --t-sm:.9375rem; --t-base:1.0625rem;
  --t-lg:1.25rem;  --t-xl:1.5rem;   --t-2xl:2rem;
  --t-3xl:2.75rem; --t-4xl:3.5rem;
  --lh-tight:1.06; --lh-body:1.62;
  --tracking-display:-.02em;  /* tight — counterpoint to the wide wordmark */
  --tracking-label:  .10em;   /* the one place we echo the wordmark */
  --measure:65ch;

  --s-1:8px;  --s-2:16px; --s-3:24px;  --s-4:32px;
  --s-6:48px; --s-8:64px; --s-12:96px; --s-16:128px;

  --r-sm:3px; --r-md:6px;  /* the mark is angular — keep radii small */
  --shadow:0 1px 2px rgba(20,37,35,.06), 0 12px 32px -20px rgba(20,37,35,.4);
}
```

### Contrast rules — non-negotiable

Measured, not estimated:

| Pairing | Ratio | Rule |
|---|---|---|
| `--c-sage` on `--c-paper` | **2.32:1** | Fails AA text *and* the 3:1 UI floor. Surfaces and illustration only. |
| white on `--c-sage` | **2.45:1** | Never a filled button. This is the likeliest mistake in the whole build. |
| `--c-petrol` on `--c-paper` | 7.26:1 | Default for links, buttons, interactive text. |
| `--c-ink` on `--c-paper` | 15.08:1 | Headings and body. |
| `--c-zinc` on `--c-paper` | 4.77:1 | Captions, secondary labels. |
| `--c-sage` on `--c-ink` | 6.50:1 | The only place sage carries text — dark sections. |
| `--c-yield` on `--c-paper` | 2.84:1 | Chart fills only. Yield figures as text use `--c-yield-ink`. |

Add an automated contrast check to the verification step. The failure mode is
predictable: someone reaches for the brand colour *because* it is the brand colour and
ships an unreadable button.

### Typography

The wordmark is a light geometric sans with wide tracking. Do **not** echo it in running
text — the site sets a deliberate counterpoint.

- Headings: **Archivo** 500/600, `--tracking-display` (tight)
- Body & UI: **Public Sans** 400/600
- Numbers (kWp, kWh, °, €, yields): **IBM Plex Mono** 400/500, `tabular-nums`
- Uppercase labels are the one place `--tracking-label` is used

### Logo

Supplied asset is a 1536×1196 PNG, single fill, vertical lockup — not enough to build
with. Until real assets arrive, create `src/assets/logo-placeholder.svg` (clearly marked)
and structure the code so swapping it is one file change. Header logo is **inlined SVG**
using `currentColor`, never `<img>`.

Still needed from the client (list these in `docs/OPEN-FACTS.md`):
vector SVG, horizontal lockup, paper-white negative, mark-only crop for favicon
(32/180/512 + `site.webmanifest`), clear space = ½ mark height, min lockup height 32px.

## Stack

- Astro 5, `output: 'static'`, TypeScript strict
- Tailwind v4 via `@tailwindcss/vite`, theme extended from the tokens above
- `@astrojs/mdx`, `@astrojs/sitemap`
- Images via `astro:assets` → AVIF + WebP, explicit width/height everywhere,
  hero preloaded, everything below the fold `loading="lazy"`
- Fonts self-hosted (no third-party request in production)
- Forms: serverless function + honeypot + timestamp trap. No third-party embed,
  no CAPTCHA, nothing stored.
- Analytics: Plausible (EU, cookieless). Avoids a consent banner entirely.
- Host: Cloudflare Pages. Redirects in `public/_redirects`.

Zero client JS by default. Islands only: mobile nav, FAQ accordion, contact form,
map-on-click.

### Content collections

```
src/content/
  leistungen/   # service pages
  orte/         # city pages
  ratgeber/     # advice articles
  referenzen/   # reference projects (empty until real data arrives)
```

Zod schema on every collection must enforce:
`title: z.string().max(60)` and `description: z.string().min(140).max(158)`.
Over-length metadata fails the build.

## Routes

| Route | Status |
|---|---|
| `/` | home |
| `/photovoltaikanlage/` | keep slug — it has the keyword and existing equity |
| `/photovoltaik-wolfsburg/` | new |
| `/photovoltaik-gifhorn/` | new |
| `/photovoltaik-braunschweig/` | new |
| `/photovoltaik-helmstedt/` | new |
| `/stromspeicher/` | new |
| `/waermepumpe/` | new — service exists, had no page |
| `/wallboxen/` `/klimaanlage/` `/smart-home/` `/baustromkasten/` | keep |
| `/energie-gebaeudetechnik/` | typo fixed (was `…techni`) |
| `/referenzen/` + `/referenzen/[slug]/` | new |
| `/ratgeber/` + `/ratgeber/[slug]/` | new, 10 drafts |
| `/ueber-uns/` `/jobs/` `/faq/` `/kontakt/` | keep |
| `/impressum/` `/datenschutz/` `/agb/` | legal |

City pages need genuinely local content — local references, travel radius, local
specifics. **Never** one template with the city name swapped; Google filters that
reliably and it is the single most common way these pages fail.

### Titles and descriptions (verbatim)

| Route | Title | Description |
|---|---|---|
| `/` | Photovoltaik in Wolfsburg & Umgebung \| SolVita | Solaranlagen, Speicher und Wallboxen vom Elektrofachbetrieb aus Wolfsburg. Planung, Montage und Service aus einer Hand — kostenlose Dachprüfung. |
| `/photovoltaikanlage/` | Photovoltaikanlage: Planung & Montage \| SolVita | Von der Dachanalyse bis zur Inbetriebnahme: PV-Anlagen von 5 bis 30 kWp für Einfamilienhaus, Betrieb und Landwirtschaft in Niedersachsen. |
| `/photovoltaik-wolfsburg/` | Photovoltaik Wolfsburg – Solaranlage vom Fachbetrieb | Ihr Solarteur in Wolfsburg: Beratung vor Ort, Montage durch das eigene Team, Anmeldung beim Netzbetreiber inklusive. Referenzen aus dem Stadtgebiet. |
| `/stromspeicher/` | Stromspeicher: Lohnt sich der Batteriespeicher? | Speichergrößen von 6 bis 20 kWh, Rechenbeispiel für ein Einfamilienhaus in Niedersachsen und ehrliche Antwort, wann sich ein Speicher nicht rechnet. |
| `/waermepumpe/` | Wärmepumpe Wolfsburg – Beratung & Installation | Luft-Wasser-Wärmepumpe kombiniert mit Photovoltaik: Auslegung, Förderung und Installation vom Elektrofachbetrieb aus dem Landkreis Gifhorn. |
| `/wallboxen/` | Wallbox installieren – Wolfsburg & Braunschweig | Wallbox-Installation mit Überschussladen aus der eigenen PV-Anlage. Anmeldung beim Netzbetreiber, Fördermittelcheck und Abnahme inklusive. |
| `/referenzen/` | Referenzen: PV-Anlagen aus der Region | Umgesetzte Projekte mit echten Zahlen: Leistung in kWp, Dachausrichtung, Speichergröße und Jahresertrag — aus Wolfsburg, Gifhorn und Braunschweig. |
| `/faq/` | Photovoltaik FAQ: Kosten, Technik, Förderung | Die 15 häufigsten Fragen zu Photovoltaik, Speicher und Einspeisung — kurz beantwortet vom Fachbetrieb, ohne Verkaufssprache. |

Remaining routes follow the same pattern: specific topic first, city where it fits,
brand last and only if there is room. **Never** the old suffix
`– SolVita | Photovoltaik | Solaranlagen | Niedersachsen`.

## Redirects — `public/_redirects`, all 301 unless noted

```
/pv-anlagen/                       /photovoltaikanlage/        301
/energie-gebaeudetechni/           /energie-gebaeudetechnik/   301
/allgemeine-geschaefsbedingungen/  /agb/                       301
/daniel-weiss/                     /ueber-uns/                 301
/leistungen/                       /#leistungen                301
/gebaeude-3d-bilder/               /leistungen/drohnenaufnahmen/ 301
/2024/07/03/hello-world/           /                           410
```

`hello-world` is the WordPress default post, still live on the old site. It must leave
the index, not pass equity — 410, not 301.

## Structured data

`Electrician` (LocalBusiness subtype) in the base layout on every page, `@id`
`https://energy-solvita.de/#organisation`, with `address`, `telephone`, `email`,
`openingHoursSpecification` (Mo–Fr 08–17, Sa 10–14), `areaServed` (the four cities as
`City`), `founder` (Daniel Weiss, Elektroingenieur), `foundingDate` 2024, `geo` (TODO),
`sameAs` (Instagram now; GBP URL is TODO and matters — it is how Google ties site and
profile together).

Also: `Service` per service page pointing at the org `@id`; `FAQPage` only for Q&A
actually visible on the page; `BreadcrumbList` on nested routes matching the visible
breadcrumb.

## Performance budget — CI-enforced

| Metric | Target (mobile) |
|---|---|
| LCP | < 2.0 s |
| INP | < 200 ms |
| CLS | < 0.05 |
| JS on marketing pages | < 30 KB |
| Total page weight | < 500 KB |
| Third-party requests | **0** |
| Lighthouse SEO / Best Practices | 100 / 100 |
| Lighthouse Accessibility | ≥ 95 |

A PR that breaks the budget does not merge. Fix the page, do not lower the budget.

## Conventions

- German content, `lang="de"`. No English strings in the UI — the old site had
  "Our Services" sitting in German copy.
- No manual hyphenation in headings (`hyphens:auto` instead). The old site shipped
  "Energie-unabhängigkeit" with a hard hyphen into the markup.
- Exactly one `<h1>` per page. The old home page had two.
- Alt text on every content image; `alt=""` only for decorative. Manufacturer logos:
  alt = manufacturer name.
- Every Ratgeber article links to its matching service page.
- Numbers are content: prefer "9,6 kWp, Ost-West, 10 kWh Speicher" over "hochwertig".
  Set them in mono so they read as data.
- Do not fabricate reviews, reference projects, prices, or certifications. Ever.
  Placeholder + `docs/OPEN-FACTS.md` entry instead.

## Post-launch checklist (for `docs/HANDOVER.md`)

Before cutover: redirects tested on the preview domain · `noindex` removed · schema
validated in the Rich Results Test · every title/description present and in range ·
contact form delivers to the real inbox, tested twice · Impressum complete ·
Datenschutzerklärung matches what the site actually loads.

After cutover: Search Console property + new sitemap · indexing requested for the six
money pages · old WP sitemap removed · GBP website link updated and GBP URL added to
`sameAs` · crawl for 404s and orphans · baseline ranking snapshot for the 12 target
queries · 30-day impressions review.

Keep the old WordPress running read-only for 30 days as a rollback path.
