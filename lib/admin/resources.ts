export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "image"
  | "keyvalue"
  | "qalist"
  | "dates";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  options?: { value: string; label: string }[];
  help?: string;
  itemLabels?: [string, string]; // Spaltenüberschriften für keyvalue/qalist
  default?: unknown;
};

export type ResourceConfig = {
  table: string;
  singular: string;
  plural: string;
  titleField: string;
  order: string;
  listColumns: { name: string; label: string }[];
  fields: Field[];
};

const COLORS = [
  "teal", "coral", "yellow", "violet", "green", "sky", "orange", "pink",
].map((c) => ({ value: c, label: c }));

export const RESOURCES = {
  courses: {
    table: "courses",
    singular: "Kurs",
    plural: "Kurse",
    titleField: "title",
    order: "sort_order",
    listColumns: [
      { name: "title", label: "Titel" },
      { name: "audience", label: "Zielgruppe" },
      { name: "price", label: "Preis" },
      { name: "is_published", label: "Sichtbar" },
    ],
    fields: [
      { name: "title", label: "Titel", type: "text" },
      { name: "slug", label: "Slug (URL-Teil, z.B. aquarell-fuer-einsteiger)", type: "text" },
      { name: "audience", label: "Zielgruppe", type: "select", options: [
        { value: "erwachsene", label: "Erwachsene" },
        { value: "kinder", label: "Kinder" },
      ] },
      { name: "category", label: "Kategorie (z.B. Malen)", type: "text" },
      { name: "teaser", label: "Kurzbeschreibung (Karten)", type: "textarea" },
      { name: "description", label: "Beschreibung (Worum es geht)", type: "textarea" },
      { name: "takeaway", label: "Das nimmst du mit nach Hause", type: "textarea" },
      { name: "price", label: "Preis (z.B. CHF 280)", type: "text" },
      { name: "price_note", label: "Preis-Zusatz (z.B. pro Mal)", type: "text" },
      { name: "schedule", label: "Zeit (z.B. Di 18–20 Uhr)", type: "text" },
      { name: "dates", label: "Kurstermine (im Kalender anklicken)", type: "dates", help: "Diese Termine erscheinen im Kalender auf der Erwachsenen-Seite." },
      { name: "start_label", label: "Start (z.B. Start 14. September)", type: "text" },
      { name: "availability", label: "Verfügbarkeit (z.B. noch 3 Plätze)", type: "text" },
      { name: "instructor_slug", label: "Kursleitung (Team-Slug)", type: "text" },
      { name: "color", label: "Farbe", type: "select", options: COLORS },
      { name: "image_url", label: "Bild", type: "image" },
      { name: "meta", label: "Eckdaten", type: "keyvalue", itemLabels: ["Bezeichnung", "Wert"] },
      { name: "faq", label: "Häufige Fragen", type: "qalist", itemLabels: ["Frage", "Antwort"] },
      { name: "is_new", label: "Als Neu markieren", type: "boolean" },
      { name: "is_published", label: "Sichtbar auf der Website", type: "boolean", default: true },
      { name: "sort_order", label: "Reihenfolge (kleiner = weiter oben)", type: "number", default: 0 },
    ],
  },
  products: {
    table: "products",
    singular: "Produkt",
    plural: "Shop-Produkte",
    titleField: "title",
    order: "sort_order",
    listColumns: [
      { name: "title", label: "Titel" },
      { name: "group_name", label: "Gruppe" },
      { name: "price", label: "Preis" },
      { name: "is_published", label: "Sichtbar" },
    ],
    fields: [
      { name: "title", label: "Titel", type: "text" },
      { name: "slug", label: "Slug (URL-Teil)", type: "text" },
      { name: "group_name", label: "Gruppe", type: "select", options: [
        { value: "werke", label: "Werke (Originale)" },
        { value: "produkte", label: "Handgemachtes" },
        { value: "material", label: "Kreativmaterial" },
      ] },
      { name: "category", label: "Kategorie (z.B. Aquarell · Original)", type: "text" },
      { name: "price", label: "Preis (z.B. CHF 480)", type: "text" },
      { name: "teaser", label: "Kurzbeschreibung", type: "textarea" },
      { name: "description", label: "Über das Werk", type: "textarea" },
      { name: "story", label: "Die Geschichte dahinter", type: "textarea" },
      { name: "specs", label: "Details (Technik, Masse …)", type: "keyvalue", itemLabels: ["Bezeichnung", "Wert"] },
      { name: "availability", label: "Verfügbarkeit (z.B. Unikat)", type: "text" },
      { name: "instructor_slug", label: "Urheber:in (Team-Slug)", type: "text" },
      { name: "color", label: "Farbe", type: "select", options: COLORS },
      { name: "image_url", label: "Bild", type: "image" },
      { name: "is_published", label: "Sichtbar im Shop", type: "boolean", default: true },
      { name: "sort_order", label: "Reihenfolge", type: "number", default: 0 },
    ],
  },
  gallery: {
    table: "gallery_images",
    singular: "Galerie-Bild",
    plural: "Galerie",
    titleField: "alt",
    order: "sort_order",
    listColumns: [
      { name: "alt", label: "Beschreibung" },
      { name: "category", label: "Kategorie" },
      { name: "is_published", label: "Sichtbar" },
    ],
    fields: [
      { name: "image_url", label: "Bild", type: "image" },
      { name: "alt", label: "Bildbeschreibung (Alt-Text)", type: "text" },
      { name: "category", label: "Kategorie", type: "select", options: [
        { value: "kinder", label: "Kinder" },
        { value: "erwachsene", label: "Erwachsene" },
        { value: "ferien", label: "Ferienkurse" },
        { value: "workshop", label: "Workshops" },
        { value: "atelier", label: "Atelier" },
      ] },
      { name: "color", label: "Farbe (Fallback)", type: "select", options: COLORS },
      { name: "is_published", label: "Sichtbar in der Galerie", type: "boolean", default: true },
      { name: "sort_order", label: "Reihenfolge", type: "number", default: 0 },
    ],
  },
  team: {
    table: "team_members",
    singular: "Team-Mitglied",
    plural: "Team",
    titleField: "name",
    order: "sort_order",
    listColumns: [
      { name: "name", label: "Name" },
      { name: "role", label: "Rolle" },
      { name: "is_published", label: "Sichtbar" },
    ],
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "slug", label: "Slug (z.B. lena-baumann)", type: "text" },
      { name: "role", label: "Rolle (z.B. Leitung · Malerei)", type: "text" },
      { name: "bio", label: "Kurzbeschreibung", type: "textarea" },
      { name: "color", label: "Farbe", type: "select", options: COLORS },
      { name: "image_url", label: "Foto", type: "image" },
      { name: "is_published", label: "Sichtbar auf der Über-uns-Seite", type: "boolean", default: true },
      { name: "sort_order", label: "Reihenfolge", type: "number", default: 0 },
    ],
  },
} satisfies Record<string, ResourceConfig>;

export type ResourceKey = keyof typeof RESOURCES;
export const RESOURCE_KEYS = Object.keys(RESOURCES) as ResourceKey[];
