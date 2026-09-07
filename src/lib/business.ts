// Single source for the business facts in CLAUDE.md's "Business facts
// (verified — do not alter)" table. Do not edit values here without
// updating CLAUDE.md first.
export const business = {
  legalContact: 'Daniel Weiss',
  legalContactTitle: 'Elektroingenieur',
  street: 'Zum Badekoth 22a',
  postalCode: '38448',
  city: 'Wolfsburg',
  country: 'DE',
  phoneDisplay: '05366 9894361',
  phoneHref: 'tel:+4953669894361',
  email: 'info@energy-solvita.de',
  whatsapp: 'https://wa.me/4917620126267',
  hours: [
    { days: 'Mo–Fr', time: '08:00–17:00' },
    { days: 'Sa', time: '10:00–14:00' },
  ],
  foundedIndependent: 2022,
  foundedCompany: 2024,
  areasServed: ['Wolfsburg', 'Gifhorn', 'Braunschweig', 'Helmstedt'] as const,
  manufacturers: ['Sungrow', 'Deye', 'myenergi', 'Loxone', 'K2 Systems'] as const,
  instagram: 'https://www.instagram.com/energy_solvita/',
  // TODO(daniel): Google Business Profile URL — needed for sameAs, matters
  // for tying the site to the GBP listing in Google's eyes (see CLAUDE.md).
  googleBusinessProfileUrl: undefined as string | undefined,
} as const;

export const siteUrl = 'https://energy-solvita.de';
export const orgId = `${siteUrl}/#organisation`;
