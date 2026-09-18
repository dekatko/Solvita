# Open facts — needs Daniel before publishing

Every `<!-- TODO(daniel): ... -->` comment in the codebase is also logged here.
Nothing in this list has been guessed at; each item is either genuinely
unknown or explicitly withheld per CLAUDE.md ("Unknown — must stay TODO,
never guessed").

## Business facts (from CLAUDE.md's own list)

- [x] Legal form — **resolved**: re-fetched the old site's real Impressum
  (2026-09). It's "Daniel Weiss" trading as "SolVita | Photovoltaik |
  Solaranlagen" — an Einzelunternehmen, not a registered company name.
  That's a stated fact, not an inference.
- [ ] USt-IdNr. — confirmed genuinely absent from the old Impressum too, not
  just something I failed to find.
- [ ] Chamber of trade / Handwerkskammer registration details — same, not on
  the old page either.
- [x] Geo coordinates — **resolved** (2026-09): `52.4751042, 10.7679795`,
  taken from the pin of the Google Business Profile listing and confirmed
  correct by the owner. In `src/lib/business.ts`, emitted as `geo` in the
  `Electrician` JSON-LD.
- [x] Google Business Profile URL — **resolved** (2026-09): supplied as
  `https://maps.app.goo.gl/bLHBAVsfnxJf7kSK7`, now in `src/lib/business.ts`
  and emitted in the `Electrician` JSON-LD `sameAs`. Note the listing itself is
  still titled "SolVita Photovoltaik | Photovoltaik-Anlagen in Niedersachsen"
  (old branding) and its website link still needs pointing at the new domain
  at cutover — see `docs/HANDOVER.md`.
- [ ] Facebook / LinkedIn URLs — the old site's footer nav lists "Facebook"
  and "LinkedIn" under "Folge uns" alongside Instagram/WhatsApp, so profiles
  likely exist, but I only extracted link *text*, not the actual `href`
  values — someone should grab the real URLs from the old site's footer
  before adding them to `sameAs`.
- [ ] All reference projects (kWp, orientation, storage size, annual yield, city, photos) — `src/content/referenzen/` is intentionally empty until this arrives
- [ ] All prices
- [ ] All customer reviews/testimonials

## Logo assets (from CLAUDE.md's "Logo" section)

- [x] Vector SVG of the mark — **resolved, with caveats** (2026-09): the client
  supplied the real vertical lockup as a raster PNG
  (`src/assets/cropped-SOLVITA.png`, 1998×1556, single flat `#77B0AA` fill).
  I cropped it to just the mark and traced it programmatically (potrace) into
  `src/assets/logo.svg`, wired into `Header.astro`/`Footer.astro` via
  `currentColor`, and into `public/favicon.svg` and `public/og-default.svg`.
  This is a faithful trace of the real mark, not a hand-built bezier master —
  if the designer later sends a true vector file, swap it into
  `src/assets/logo.svg` in one file change (structure unchanged).
- [x] Horizontal lockup — **resolved, with caveats** (2026-09): also traced
  the wordmark itself (the client's actual custom "SOLVITA" lettering, not a
  typeset approximation) from the same source PNG, and combined it with the
  mark in `src/assets/logo-horizontal.svg` (mark left, wordmark right,
  `currentColor`, native relative scale — no invented rescale between the
  two pieces). Not yet wired into any page; it's a ready-to-use asset.
- [x] Paper-white negative version — **resolved, with caveats** (2026-09):
  `src/assets/logo-negative.svg` reconstructs the client's exact vertical
  composition (mark above wordmark, same relative position/gap as the
  source PNG) hardcoded to `#F8F9F7` instead of `currentColor`, for contexts
  without CSS control (photos, print, third-party profile uploads). Not
  wired into any page yet either.
- [x] Mark-only crop for favicon PNGs (32/180/512 + `site.webmanifest`) —
  **resolved** (2026-09): generated programmatically from `src/assets/logo.svg`
  (`public/favicon-32x32.png`, `public/apple-touch-icon.png`,
  `public/icon-512.png`), wired into `BaseLayout.astro`'s `<head>` and
  `public/site.webmanifest`. 32px is ink-on-transparent to match
  `favicon.svg`; 180/512 use the sage-on-ink dark-section pairing from
  `tokens.css` (6.50:1) since Apple/Android icons need an opaque background.
  Re-crop from a true vector master if/when one arrives.
- [ ] Clear space = ½ mark height (confirm against real vector)
- [ ] Min lockup height 32px (confirm against real vector)

## Content TODOs (Step 3)

Every `leistungen`/`orte`/`ratgeber` entry and every hand-written page carries
its own `<!-- TODO(daniel): ... -->` / `{/* TODO(daniel): ... */}` marker at
the top plus inline `[TODO(daniel): ...]` placeholders where a specific fact
is missing. Grouped summary:

- **Brand/manufacturer mentions** — I only ever wrote the five names CLAUDE.md
  confirms (Sungrow, Deye, myenergi, Loxone, K2 Systems), each still flagged
  `[TODO(daniel): aktuelle Markenpartner bestätigen]` since the pairing of
  manufacturer→service (e.g. "Sungrow for inverters") is my inference, not a
  confirmed fact. `src/content/leistungen/photovoltaikanlage.md`,
  `stromspeicher.md`, `wallboxen.md`, `smart-home.md`.
- **Pricing** — every service page ends with `[Preis auf Anfrage]`; nothing
  numeric was invented anywhere (packages/tiers I'd seen on the live site in
  an earlier, pre-CLAUDE.md pass were deliberately dropped, since CLAUDE.md
  itself lists "all prices" as unverified).
- **Förderung (funding) specifics** — every mention of a concrete program,
  KfW number, or funding rate is a `[TODO(daniel): ...]` placeholder across
  `waermepumpe.md`, `wallboxen.md`, and 3 Ratgeber drafts
  (`foerderung-niedersachsen`, `wallbox-foerderung`).
- **Local references per city** — `src/content/orte/*.md` each end with a
  TODO to add real reference projects once `/referenzen/` has data.
- **Legal pages** — updated 2026-09 after re-fetching the real old-site
  pages (the first pass had left all three as bare placeholders without
  ever checking what the old site actually said, which was a real gap —
  see conversation history):
  - `impressum.astro` — now the real content, verbatim. Only Handelsregister
    and USt-IdNr. remain TODO (genuinely not on the old page either).
  - `agb.astro` — now the real §1–§11 terms, copied verbatim from
    `/allgemeine-geschaefsbedingungen/` on the old site. Flagged for a
    lawyer to confirm it's still current, since I can't verify that myself.
  - `datenschutz.astro` — **rewritten (2026-09) to match the new site.** The
    old text (Google Analytics/Tag Manager/Ads, Usercentrics, Facebook/
    LinkedIn/Instagram plugins, All-Inkl hosting) was removed: none of it
    runs here, and the old site's HTML didn't load GTM/GA/Ads either (only
    the Usercentrics loader). New text covers Cloudflare hosting + server
    logs, the contact form and Resend e-mail delivery, WhatsApp/Instagram as
    plain links, click-to-load Google Maps, self-hosted fonts, and "no
    cookies, no analytics". The general rights/legal-basis boilerplate is
    kept from the old text. Still open, marked inline as
    `[TODO(daniel): ...]` on the page:
    - [ ] Provider of the `info@energy-solvita.de` mailbox (receives every
      form submission)
    - [ ] Signed AVV/DPA with Cloudflare and with Resend
    - [ ] US-transfer basis for both (Data Privacy Framework certification
      or SCCs)
    - [ ] Resend's full company address
    - [ ] Confirm on the live domain that Cloudflare sets no cookie of its
      own (the "keine Cookies" statement assumes that)
    - [ ] Lawyer / eRecht24 review before launch, and a new section if
      Plausible or any other third-party service is added later
- **FAQ** — the old site's real homepage FAQ has 8 questions, not the 15
  CLAUDE.md's page description promised. Rewrote `src/lib/faq.ts` to the
  real 8 (in our own words) and corrected the description to say 8. Note:
  CLAUDE.md's verbatim title still says "...Kosten, Technik, **Förderung**"
  but none of the 8 real questions are actually about funding/subsidies —
  left as-is since only the count was in scope to fix, but worth knowing.
- **Jobs** (`jobs.astro`) — no real open positions listed yet.
- **Über uns** (`ueber-uns.astro`) — kept to only the facts CLAUDE.md
  verifies (founder, founding dates, service area); deliberately does not
  state a team size, since that was only ever seen on the old live site and
  isn't corroborated by CLAUDE.md.
- **Contact form email delivery** — `functions/api/kontakt.ts` needs a
  `RESEND_API_KEY` (or an equivalent swap) set as a Cloudflare Pages
  environment variable before it can actually deliver mail; see
  `docs/HANDOVER.md`.
- **PV package tiers reinstated (2026-09)** — the Basis/Komfort/Effizient/
  Voll-Autark specs (module count, kWp, storage kWh) are back in
  `photovoltaikanlage.md`. An earlier pass (see the Pricing note above) had
  deliberately dropped this same tier data because CLAUDE.md lists "all
  prices" as unverified. On re-checking the live page, the tiers themselves
  never show a € figure — only hardware specs — so they were re-added
  without pricing. Worth Daniel's eyes regardless, since the two passes
  disagreed once already.
- **Manufacturer conflict on the PV page** — the live site's package tiers
  name Huawei and EcoFlow inverters/storage, not in CLAUDE.md's verified
  list (Sungrow, Deye, myenergi, Loxone, K2 Systems). Left as a `TODO` in
  `photovoltaikanlage.md` rather than guessing which is current.

## Images (2026-09)

The rebuild had zero images anywhere — only the logo placeholder and OG
default SVG existed. Checked the old live site page by page:

- **Klimaanlage and Photovoltaikanlage** — real SolVita project photos
  (a Daikin outdoor unit installed on a house wall; a PV roof install on a
  red-brick house). Pulled into `src/assets/leistungen/` and wired through
  `astro:assets` (`LeistungLayout.astro`'s `hero` prop) with real alt text,
  AVIF/WebP, explicit dimensions.
- **Wallbox, Smart Home, Baustromkasten, Energie-Gebäudetechnik** — the old
  site has photos on these too, but on inspection they're generic stock
  photography, not SolVita's own work (a golden-hour wallbox/lake shot, a
  staged hand-on-tablet kitchen scene, architectural blueprints, a white
  house model). The Baustromkasten and Energie-Gebäudetechnik stock photos
  don't even depict the actual service. Licensing for this stock imagery on
  a rebuilt site is unverified.
  - **Update (2026-09, at the owner's request):** the Wallbox and Smart Home
    photos (the two that do show the right subject) were reused from the old
    site — `src/assets/leistungen/wallboxen/hero.jpg` and
    `smart-home/hero.jpg`, also thumbnails on the homepage cards. **They are
    still stock photos, not SolVita's own work, and their licence is
    unverified** — [ ] Daniel to confirm the old site had the right to use
    them and that it extends to this site, or replace them with real project
    photos. The old site's other Wallbox/Smart Home images (clip-art
    illustration, 3D render) were not used.
  - Baustromkasten and Energie-Gebäudetechnik stay image-free (their old-site
    photos don't depict the service), as do Stromspeicher and Wärmepumpe
    (no old-site photo exists).
