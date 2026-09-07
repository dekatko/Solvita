// Single source for FAQ content — used by /faq/ (full FAQPage schema)
// and the homepage teaser (a subset), so the copy is never duplicated.
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
      'In den meisten Fällen ja: Angesichts steigender Strompreise amortisieren sich Photovoltaikanlagen über die Jahre und senken die laufenden Energiekosten. Wie schnell sich eine Anlage konkret rechnet, hängt von Verbrauch, Dachfläche und Ausrichtung ab.',
  },
  {
    question: 'Wie lange dauert die Installation?',
    answer:
      'Die reine Montage auf dem Dach eines durchschnittlichen Einfamilienhauses dauert in der Regel wenige Tage. Das gesamte Projekt von der ersten Beratung bis zur Inbetriebnahme kann je nach Genehmigungen, Netzanschluss und Terminplanung mehrere Wochen in Anspruch nehmen.',
  },
  {
    question: 'Brauche ich eine Baugenehmigung für meine PV-Anlage?',
    answer:
      'Für bestehende Wohngebäude ist in Niedersachsen in der Regel keine gesonderte Baugenehmigung erforderlich. Ausnahmen gelten unter anderem für denkmalgeschützte Gebäude. Wir prüfen das individuell, bevor die Planung beginnt.',
  },
  {
    question: 'Was ist der Unterschied zwischen Photovoltaik und Solarthermie?',
    answer:
      'Photovoltaik erzeugt aus Sonnenlicht elektrischen Strom. Solarthermie erwärmt dagegen Wasser für Heizung und Warmwasser. Unser Fokus liegt auf Photovoltaik und den dazugehörigen Speicher- und Ladelösungen.',
  },
  {
    question: 'Ist ein Stromspeicher empfehlenswert?',
    answer:
      'In vielen Fällen ja. Ein Stromspeicher speichert den tagsüber erzeugten Solarstrom, den Sie in dem Moment nicht verbrauchen, für den Abend und die Nacht. Ob sich das für Sie lohnt, hängt von Ihrem Verbrauchsprofil ab — das prüfen wir ehrlich mit Ihnen.',
  },
  {
    question: 'Wie funktioniert die Einspeisung ins öffentliche Netz?',
    answer:
      'Solarstrom, den Sie nicht selbst verbrauchen oder speichern, wird automatisch ins öffentliche Netz eingespeist. Dafür erhalten Sie über einen festgelegten Zeitraum eine Vergütung nach dem Erneuerbare-Energien-Gesetz (EEG).',
  },
  {
    question: 'Welche Anlagengröße benötige ich?',
    answer:
      'Das hängt von Ihrem Jahresstromverbrauch, der verfügbaren Dachfläche, der Dachausrichtung und Ihren persönlichen Zielen ab — etwa ob Sie zusätzlich ein Elektrofahrzeug oder eine Wärmepumpe versorgen möchten. Wir analysieren diese Faktoren gemeinsam mit Ihnen.',
  },
  {
    question: 'Kann ich eine Wallbox nachrüsten?',
    answer:
      'Ja, eine Wallbox lässt sich in der Regel unabhängig vom Alter Ihrer Photovoltaikanlage nachrüsten. In Kombination mit Ihrer PV-Anlage können Sie Ihr Elektrofahrzeug bevorzugt mit selbst erzeugtem Solarstrom laden.',
  },
  {
    question: 'Was ist Überschussladen?',
    answer:
      'Überschussladen bedeutet, dass Ihre Wallbox das Elektrofahrzeug bevorzugt dann lädt, wenn Ihre Photovoltaikanlage mehr Strom produziert, als Sie im Haushalt gerade verbrauchen — statt starr zu einer festen Uhrzeit.',
  },
  {
    question: 'Lässt sich eine Wärmepumpe mit Photovoltaik kombinieren?',
    answer:
      'Ja, eine Wärmepumpe zählt zu den größeren Stromverbrauchern im Haushalt und lässt sich gut mit einer Photovoltaikanlage kombinieren, um einen Teil des Stromverbrauchs mit eigenem Solarstrom zu decken.',
  },
  {
    question: 'Was macht eine Smart-Home-Lösung im Zusammenspiel mit Photovoltaik?',
    answer:
      'Eine Smart-Home-Steuerung vernetzt Photovoltaikanlage, Speicher und Verbraucher miteinander und kann größere Verbraucher automatisch in Zeiten mit hoher Solarstromproduktion verschieben — für mehr Eigenverbrauch.',
  },
  {
    question: 'Wie läuft die Anmeldung beim Netzbetreiber ab?',
    answer:
      'Nach der Installation melden wir Ihre Anlage beim zuständigen Netzbetreiber an. Dieser Schritt ist Voraussetzung für die Inbetriebnahme und die spätere Einspeisevergütung — wir übernehmen die Abwicklung für Sie.',
  },
  {
    question: 'Welche Garantien gibt es auf die Komponenten?',
    answer:
      'Die verbauten Komponenten unserer Hersteller-Partner tragen eigene Herstellergarantien. Die genauen Garantiezeiten hängen vom jeweiligen Hersteller und Bauteil ab und werden in Ihrem individuellen Angebot ausgewiesen.',
  },
  {
    question: 'Gibt es Förderungen für Photovoltaik, Speicher oder Wallbox?',
    answer:
      'Je nach Programm und Zeitpunkt gibt es bundesweite, landesweite oder kommunale Förderungen. Da sich Förderprogramme regelmäßig ändern, prüfen wir die aktuell gültigen Optionen individuell für Ihr Vorhaben — mehr dazu in unserem Ratgeber.',
  },
];
