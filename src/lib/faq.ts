// Single source for FAQ content — used by /faq/ (full FAQPage schema)
// and the homepage teaser (a subset), so the copy is never duplicated.
//
// These 8 questions match the real FAQ on the old site's homepage
// (re-verified against a fresh fetch, 2026-09) — rewritten in our own
// words, not copied. CLAUDE.md's page description originally said "15
// häufigsten Fragen"; the real source only has 8, so the description
// was corrected to match rather than padding the list with invented
// questions to hit a promised number.
export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: 'Was ist eine Photovoltaikanlage und wie funktioniert sie?',
    answer:
      'Eine Photovoltaikanlage wandelt Sonnenlicht über Solarmodule direkt in elektrische Energie um. Ein Wechselrichter macht aus dem erzeugten Gleichstrom nutzbaren Wechselstrom, den Sie im Haushalt verbrauchen, in einem Stromspeicher zwischenspeichern oder ins öffentliche Netz einspeisen können.',
  },
  {
    question: 'Lohnt sich eine Photovoltaikanlage für mein Eigenheim oder mein Unternehmen?',
    answer:
      'In den meisten Fällen ja: Angesichts steigender Strompreise amortisieren sich Photovoltaikanlagen in der Regel innerhalb weniger Jahre und senken danach dauerhaft die laufenden Energiekosten. Wie schnell sich eine Anlage konkret rechnet, hängt von Verbrauch, Dachfläche und Ausrichtung ab.',
  },
  {
    question: 'Wie lange dauert die Installation einer Photovoltaikanlage?',
    answer:
      'Die reine Montage auf dem Dach eines durchschnittlichen Einfamilienhauses dauert in der Regel 2 bis 5 Tage. Das gesamte Projekt von der ersten Beratung bis zur Inbetriebnahme kann je nach Genehmigungen, Netzanschluss und Terminplanung mehrere Wochen bis Monate in Anspruch nehmen.',
  },
  {
    question: 'Benötige ich für meine Photovoltaikanlage eine Baugenehmigung?',
    answer:
      'Für bestehende Wohngebäude ist in Niedersachsen in der Regel keine gesonderte Baugenehmigung erforderlich. Ausnahmen gelten unter anderem für denkmalgeschützte Gebäude. Wir prüfen das individuell, bevor die Planung beginnt.',
  },
  {
    question: 'Was ist der Unterschied zwischen einer Photovoltaikanlage und einer Solarthermieanlage?',
    answer:
      'Eine Photovoltaikanlage erzeugt aus Sonnenlicht elektrischen Strom. Eine Solarthermieanlage erwärmt dagegen Wasser für Heizung und Warmwasser. Unser Fokus liegt auf Photovoltaik und den dazugehörigen Speicher- und Ladelösungen.',
  },
  {
    question: 'Ist ein Stromspeicher sinnvoll für meine Photovoltaikanlage?',
    answer:
      'In vielen Fällen ja: Ein Stromspeicher speichert den tagsüber erzeugten Solarstrom, den Sie in dem Moment nicht verbrauchen, für den Abend und die Nacht und erhöht so Ihren Eigenverbrauch. Ob sich das für Sie konkret lohnt, hängt von Ihrem Verbrauchsprofil ab — das prüfen wir ehrlich mit Ihnen.',
  },
  {
    question: 'Wie viel Leistung benötige ich für meine Photovoltaikanlage?',
    answer:
      'Das hängt von Ihrem Jahresstromverbrauch, der verfügbaren Dachfläche, der Dachausrichtung und Ihren persönlichen Zielen ab — etwa ob Sie zusätzlich ein Elektrofahrzeug oder eine Wärmepumpe versorgen möchten. Wir analysieren diese Faktoren gemeinsam mit Ihnen und schlagen eine passende Anlagengröße vor.',
  },
  {
    question: 'Welche Garantien und Wartungsleistungen bietet SolVita?',
    answer:
      'Die verbauten Komponenten unserer Hersteller-Partner tragen eigene Herstellergarantien — üblich sind rund 10 bis 25 Jahre auf Solarmodule. Zusätzlich bieten wir optionale Wartungsverträge an. [Preis auf Anfrage] — die genauen Konditionen besprechen wir in Ihrem individuellen Angebot.',
  },
];
