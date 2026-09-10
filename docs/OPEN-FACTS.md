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
- [ ] Geo coordinates (lat/long) for the `Electrician` JSON-LD `geo` property
- [ ] Google Business Profile URL — needed for `sameAs` in structured data (see CLAUDE.md's Structured Data section: "matters — it is how Google ties site and profile together")
- [ ] Facebook / LinkedIn URLs — the old site's footer nav lists "Facebook"
  and "LinkedIn" under "Folge uns" alongside Instagram/WhatsApp, so profiles
  likely exist, but I only extracted link *text*, not the actual `href`
  values — someone should grab the real URLs from the old site's footer
  before adding them to `sameAs`.
- [ ] All reference projects (kWp, orientation, storage size, annual yield, city, photos) — `src/content/referenzen/` is intentionally empty until this arrives
- [ ] All prices
- [ ] All customer reviews/testimonials

## Logo assets (from CLAUDE.md's "Logo" section)

- [ ] Vector SVG of the mark
- [ ] Horizontal lockup
- [ ] Paper-white negative version
- [ ] Mark-only crop for favicon (32/180/512 + `site.webmanifest`)
- [ ] Clear space = ½ mark height (confirm against real vector)
- [ ] Min lockup height 32px (confirm against real vector)

Until these arrive, `src/assets/logo-placeholder.svg` is a clearly-marked
placeholder built from the description in CLAUDE.md (gear containing a
rising sun, halved by a horizon line, single flat `--c-sage` fill).

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
  - `datenschutz.astro` — now the real old-site text, copied verbatim.
    **Important mismatch**: it describes Google Analytics, Google Ads,
    Google Tag Manager, Facebook/Instagram/LinkedIn embeds, Usercentrics
    consent, and All-Inkl hosting — none of which this new site actually
    uses (it uses none of them, hosts on Cloudflare Pages, and its only
    third-party embed is the click-to-load Google Maps on `/kontakt/`).
    CLAUDE.md's own checklist says "Datenschutzerklärung matches what the
    site actually loads" before cutover — this page needs that update
    before publishing, it's flagged in the page itself too.
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
