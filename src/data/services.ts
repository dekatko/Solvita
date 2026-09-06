// Shared metadata for the six /leistungen/ pages — the single source used
// by navigation, the homepage services overview, and the <ServiceLinks>
// cross-linking component so titles/descriptions never drift out of sync.
export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  icon: 'sun' | 'battery' | 'plug' | 'home' | 'box' | 'bolt';
}

export const services: Service[] = [
  {
    slug: 'photovoltaikanlage',
    title: 'Photovoltaikanlage',
    shortDescription: 'Solarstrom vom eigenen Dach — planen, installieren, in Betrieb nehmen.',
    icon: 'sun',
  },
  {
    slug: 'stromspeicher',
    title: 'Stromspeicher',
    shortDescription: 'Eigenen Solarstrom speichern statt einspeisen — für mehr Unabhängigkeit.',
    icon: 'battery',
  },
  {
    slug: 'wallboxen',
    title: 'Wallboxen',
    shortDescription: 'Ihr Elektrofahrzeug intelligent mit selbst erzeugtem Solarstrom laden.',
    icon: 'plug',
  },
  {
    slug: 'smart-home',
    title: 'Smart Home',
    shortDescription: 'PV-Anlage, Speicher und Verbraucher intelligent miteinander vernetzt.',
    icon: 'home',
  },
  {
    slug: 'baustromkasten',
    title: 'Baustromkasten',
    shortDescription: 'Baustrom mieten, anschließen und anmelden — als Sorglos-Paket.',
    icon: 'box',
  },
  {
    slug: 'energie-gebaeudetechnik',
    title: 'Energie- & Gebäudetechnik',
    shortDescription: 'Elektroinstallation, Wärmepumpen und Gebäudetechnik aus einer Hand.',
    icon: 'bolt',
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
