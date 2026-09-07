import { business, orgId, siteUrl } from './business';

// Electrician (a LocalBusiness subtype) — emitted on every page from
// BaseLayout. geo is deliberately omitted (not fabricated) until real
// coordinates arrive; see docs/OPEN-FACTS.md.
export function organizationSchema() {
  const sameAs: string[] = [business.instagram];
  if (business.googleBusinessProfileUrl) sameAs.push(business.googleBusinessProfileUrl);

  return {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    '@id': orgId,
    name: 'SolVita',
    url: siteUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.street,
      postalCode: business.postalCode,
      addressLocality: business.city,
      addressCountry: business.country,
    },
    telephone: business.phoneHref.replace('tel:', ''),
    email: business.email,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '14:00',
      },
    ],
    areaServed: business.areasServed.map((name) => ({ '@type': 'City', name })),
    founder: {
      '@type': 'Person',
      name: business.legalContact,
      jobTitle: business.legalContactTitle,
    },
    foundingDate: String(business.foundedCompany),
    sameAs,
    // TODO(daniel): geo coordinates (lat/long) — omitted rather than guessed.
  };
}

export function serviceSchema(opts: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: { '@id': orgId },
    areaServed: business.areasServed.map((name) => ({ '@type': 'City', name })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function breadcrumbSchema(items: { label: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: new URL(item.href, siteUrl).toString(),
    })),
  };
}
