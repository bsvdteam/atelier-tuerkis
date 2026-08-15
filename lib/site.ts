/**
 * Zentrale Stammdaten des Ateliers.
 * Kontaktinfos NIE verstreut hartkodieren — hier zentral.
 */
export const SITE = {
  name: "Atelier Türkis",
  tagline: {
    de: "Ein heller, ruhiger Ort für Kunst und Kreativität, für Kinder und Erwachsene.",
    en: "A bright, calm place for art and creativity, for children and adults.",
  },
  address: {
    street: "Wolfensbergstrasse 9",
    city: "9113 Degersheim",
  },
  phone: "+41 79 123 45 67",
  whatsapp: "41791234567", // nur Ziffern, für wa.me
  email: "hallo@atelier-tuerkis.ch",
  hours: {
    de: "Mi–Fr 9–18 Uhr · Sa 9–13 Uhr",
    en: "Wed–Fri 9am–6pm · Sat 9am–1pm",
  },
  instagram: {
    handle: "@atelier.tuerkis",
    url: "https://instagram.com/atelier.tuerkis",
  },
  url: "https://atelier-tuerkis.ch",
} as const;
