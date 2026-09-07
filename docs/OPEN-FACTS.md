# Open facts — needs Daniel before publishing

Every `<!-- TODO(daniel): ... -->` comment in the codebase is also logged here.
Nothing in this list has been guessed at; each item is either genuinely
unknown or explicitly withheld per CLAUDE.md ("Unknown — must stay TODO,
never guessed").

## Business facts (from CLAUDE.md's own list)

- [ ] Geo coordinates (lat/long) for the `Electrician` JSON-LD `geo` property
- [ ] USt-IdNr.
- [ ] Legal form (Einzelunternehmen? GmbH? etc.) for the Impressum
- [ ] Chamber of trade / Handwerkskammer registration details
- [ ] Google Business Profile URL — needed for `sameAs` in structured data (see CLAUDE.md's Structured Data section: "matters — it is how Google ties site and profile together")
- [ ] Facebook / LinkedIn URLs, if any exist
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
- **Legal pages** (`impressum.astro`, `datenschutz.astro`, `agb.astro`) —
  structural placeholders only; explicitly marked as needing a lawyer's
  review, not just a fact-fill. Impressum is missing Rechtsform,
  Handelsregisternummer, USt-IdNr., and Handwerkskammer.
- **Jobs** (`jobs.astro`) — no real open positions listed yet.
- **Über uns** (`ueber-uns.astro`) — kept to only the facts CLAUDE.md
  verifies (founder, founding dates, service area); deliberately does not
  state a team size, since that was only ever seen on the old live site and
  isn't corroborated by CLAUDE.md.
- **Contact form email delivery** — `functions/api/kontakt.ts` needs a
  `RESEND_API_KEY` (or an equivalent swap) set as a Cloudflare Pages
  environment variable before it can actually deliver mail; see
  `docs/HANDOVER.md`.
