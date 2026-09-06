// Single source of truth for FAQ content — imported by both the homepage
// teaser (a subset) and the standalone /faq/ page (the full list), so the
// copy never has to be maintained in two places.
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
    question: 'Lohnt sich eine PV-Anlage für mein Haus oder mein Unternehmen?',
    answer:
      'In den meisten Fällen ja: Angesichts steigender Strompreise amortisieren sich Photovoltaikanlagen über die Jahre, senken Ihre laufenden Energiekosten, steigern den Wert der Immobilie und leisten einen Beitrag zum Klimaschutz. Wie schnell sich eine Anlage für Sie konkret rechnet, hängt von Verbrauch, Dachfläche und Ausrichtung ab — das klären wir in einer kostenlosen Beratung.',
  },
  {
    question: 'Wie lange dauert die Installation?',
    answer:
      'Die reine Montage auf dem Dach eines durchschnittlichen Einfamilienhauses dauert in der Regel 2 bis 5 Tage. Das gesamte Projekt von der ersten Beratung bis zur Inbetriebnahme kann je nach Genehmigungen, Netzanschluss und Terminplanung mehrere Wochen bis Monate in Anspruch nehmen.',
  },
  {
    question: 'Brauche ich eine Baugenehmigung für meine PV-Anlage?',
    answer:
      'Für bestehende Wohngebäude ist in Niedersachsen in der Regel keine gesonderte Baugenehmigung erforderlich. Ausnahmen gelten unter anderem für denkmalgeschützte Gebäude oder Grundstücke mit besonderen Bebauungsplänen. Wir prüfen das für Sie individuell, bevor die Planung beginnt.',
  },
  {
    question: 'Was ist der Unterschied zwischen Photovoltaik und Solarthermie?',
    answer:
      'Photovoltaik erzeugt aus Sonnenlicht elektrischen Strom. Solarthermie erwärmt dagegen Wasser für Heizung und Warmwasser. Beide Technologien lassen sich auf einem Dach kombinieren, unser Fokus liegt auf Photovoltaik und den dazugehörigen Speicher- und Ladelösungen.',
  },
  {
    question: 'Ist ein Stromspeicher empfehlenswert?',
    answer:
      'In den meisten Fällen ja. Ein Stromspeicher speichert den tagsüber erzeugten Solarstrom, den Sie in dem Moment nicht verbrauchen, für den Abend und die Nacht. Das erhöht Ihren Eigenverbrauchsanteil deutlich und macht Sie unabhängiger von steigenden Strompreisen und dem öffentlichen Netz.',
  },
  {
    question: 'Welche Anlagengröße benötige ich?',
    answer:
      'Das hängt von Ihrem Jahresstromverbrauch, der verfügbaren Dachfläche, der Dachausrichtung und Ihren persönlichen Zielen ab — etwa ob Sie zusätzlich ein Elektrofahrzeug oder eine Wärmepumpe versorgen möchten. Wir analysieren diese Faktoren gemeinsam mit Ihnen und schlagen eine passende Paketgröße vor.',
  },
  {
    question: 'Welche Garantien bietet SolVita?',
    answer:
      'Die verbauten Komponenten unserer Hersteller-Partner tragen eigene Herstellergarantien — üblich sind rund 10 bis 25 Jahre auf Solarmodule und 5 bis 10 Jahre auf Wechselrichter. Zusätzlich bieten wir optionale Wartungsverträge an. [Preis auf Anfrage] — die genauen Konditionen besprechen wir in Ihrem individuellen Angebot.',
  },
  {
    question: 'Welche Fördermöglichkeiten gibt es in Niedersachsen?',
    answer:
      'Neben der bundesweiten Einspeisevergütung gibt es je nach Kommune und Förderprogramm zusätzliche Zuschüsse für Photovoltaik, Stromspeicher und Wallboxen in Niedersachsen. Da sich Förderprogramme regelmäßig ändern, prüfen wir die aktuell gültigen Optionen für Ihr Vorhaben individuell. Mehr dazu in unserem Ratgeber zur [Förderung in Niedersachsen](/ratgeber/foerderung-niedersachsen/).',
  },
];
