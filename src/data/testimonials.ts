// Customer quotes as shown on the live site's Photovoltaikanlage page,
// paraphrased into complete German sentences. Used on the homepage
// trust section and on /referenzen/.
export interface Testimonial {
  name: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Daniel O.',
    quote:
      'Die Kommunikation war jederzeit transparent und zuverlässig, die Ausführung der Arbeiten lief reibungslos und professionell ab.',
    rating: 5,
  },
  {
    name: 'Hannes T.',
    quote:
      'Schnelle, kompetente und zuverlässige Installation mit offener, freundlicher Kommunikation und hilfsbereitem Support.',
    rating: 5,
  },
];
