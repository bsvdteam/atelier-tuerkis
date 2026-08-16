export type Locale = "de" | "en";

/** Zweisprachiger Text — DE Pflicht, EN optional (fällt auf DE zurück). */
export type Localised = {
  de: string;
  en?: string;
};

export type PlaceholderColor =
  | "teal"
  | "coral"
  | "yellow"
  | "violet"
  | "green"
  | "sky"
  | "orange"
  | "pink";

/** Ein Kurs (Erwachsene oder Kinder). */
export type Course = {
  slug: string;
  audience: "erwachsene" | "kinder";
  title: Localised;
  category: Localised;
  /** Kurzbeschreibung für Karten. */
  teaser: Localised;
  /** Ausführliche Beschreibung („Worum es geht"). */
  description: Localised;
  /** Was man mitnimmt. */
  takeaway?: Localised;
  price: string; // z.B. "CHF 280" oder "auf Anfrage"
  priceNote?: Localised; // z.B. "pro Mal"
  meta: {
    label: Localised;
    value: Localised;
  }[];
  schedule?: Localised; // z.B. "Di 18–20 Uhr"
  dates?: string[]; // konkrete Termine als ISO-Daten ["2026-09-14", ...]
  start?: Localised; // z.B. "14. September"
  availability?: Localised; // z.B. "noch 3 Plätze"
  isNew?: boolean;
  instructor?: string; // Team-Slug (erste Kursleitung, Abwärtskompatibilität)
  instructors?: string[]; // mehrere Kursleitungen (Team-Slugs)
  images?: string[]; // eigene Eindrücke-Bilder (URLs)
  faq?: { q: Localised; a: Localised }[];
  color: PlaceholderColor;
  /** Ziel bei „Anmelden": eigene Detailseite oder direkt Kontakt. */
  ctaTo?: "detail" | "kontakt";
};

/** Ein Kunstwerk oder Produkt im Verkauf. */
export type Artwork = {
  slug: string;
  title: Localised;
  category: Localised;
  /** Filter-Gruppe: werke | produkte | material */
  group: "werke" | "produkte" | "material";
  price: string;
  teaser: Localised;
  description?: Localised;
  story?: Localised;
  specs?: { label: Localised; value: Localised }[];
  availability?: Localised;
  instructor?: string;
  images?: string[]; // eigene Produktbilder (URLs)
  color: PlaceholderColor;
};

export type TeamMember = {
  slug: string;
  name: string;
  role: Localised;
  bio: Localised;
  color: PlaceholderColor;
};

export type Testimonial = {
  quote: Localised;
  author: string;
  context: Localised;
  color: PlaceholderColor;
};

export type FaqItem = {
  q: Localised;
  a: Localised;
};
