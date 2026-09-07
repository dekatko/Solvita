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

## Content TODOs

Populated as pages are written — see the `<!-- TODO(daniel): ... -->` comments
in each page's source for the exact in-context location.
