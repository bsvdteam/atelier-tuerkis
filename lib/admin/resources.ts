export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "combobox" // frei tippen ODER aus Vorschlägen wählen
  | "multiselect" // mehrere aus einer Liste (z.B. Team)
  | "image"
  | "gallery" // mehrere Bilder
  | "keyvalue"
  | "qalist"
  | "dates";

/** Woher dynamische Optionen kommen (aus der DB, zur Laufzeit geladen). */
export type OptionsSource = "team" | "courseCategories" | "productCategories";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  section?: string;
  options?: { value: string; label: string }[];
  optionsFrom?: OptionsSource;
  help?: string;
  placeholder?: string;
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

const CATEGORY_SUGGESTIONS = [
  "Malen", "Zeichnen", "Aquarell", "Handlettering", "Buchbinden",
  "Nähen", "Drucken", "Töpfern", "Basteln", "Ferienkurs",
].map((c) => ({ value: c, label: c }));

// Standard-Eckdaten für einen neuen Kurs (leer, aber schon strukturiert).
const COURSE_META_DEFAULT = [
  { label: "Zielgruppe", value: "" },
  { label: "Level", value: "" },
  { label: "Dauer", value: "" },
  { label: "Termine", value: "" },
  { label: "Gruppe", value: "" },
  { label: "Material", value: "" },
  { label: "Start", value: "" },
];

// Standard-Details für ein neues Produkt.
const PRODUCT_SPECS_DEFAULT = [
  { label: "Technik", value: "" },
  { label: "Masse", value: "" },
  { label: "Jahr", value: "" },
];

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
      // — Kopf —
      { name: "title", label: "Titel", type: "text", section: "Kopf" },
      { name: "slug", label: "Slug (URL-Teil, z.B. aquarell-fuer-einsteiger)", type: "text", section: "Kopf" },
      { name: "audience", label: "Zielgruppe", type: "select", section: "Kopf", options: [
        { value: "erwachsene", label: "Erwachsene" },
        { value: "kinder", label: "Kinder" },
      ] },
      { name: "category", label: "Kategorie", type: "combobox", section: "Kopf",
        options: CATEGORY_SUGGESTIONS, optionsFrom: "courseCategories",
        help: "Auswählen oder frei eintippen." },
      { name: "color", label: "Farbe", type: "select", section: "Kopf", options: COLORS },
      { name: "image_url", label: "Titelbild", type: "image", section: "Kopf" },
      { name: "teaser", label: "Kurzbeschreibung (für die Karten)", type: "textarea", section: "Kopf" },

      // — Inhalt —
      { name: "description", label: "Beschreibung (Worum es geht)", type: "textarea", section: "Inhalt" },
      { name: "takeaway", label: "Das nimmst du mit nach Hause", type: "textarea", section: "Inhalt" },
      { name: "images", label: "Eindrücke (mehrere Bilder)", type: "gallery", section: "Inhalt",
        help: "Bilder aus dem Kurs. Ohne Bilder zeigen wir farbige Platzhalter." },
      { name: "faq", label: "Häufige Fragen", type: "qalist", section: "Inhalt", itemLabels: ["Frage", "Antwort"] },

      // — Eckdaten (rechte Spalte auf der Kursseite) —
      { name: "meta", label: "Eckdaten", type: "keyvalue", section: "Eckdaten (rechte Spalte)",
        itemLabels: ["Bezeichnung", "Wert"], default: COURSE_META_DEFAULT,
        help: "Erscheint rechts als Infobox. Zeilen frei entfernen oder ergänzen." },
      { name: "price", label: "Preis (z.B. CHF 280)", type: "text", section: "Eckdaten (rechte Spalte)" },
      { name: "price_note", label: "Preis-Zusatz (z.B. pro Mal)", type: "text", section: "Eckdaten (rechte Spalte)" },
      { name: "schedule", label: "Zeit (z.B. Di 18 bis 20 Uhr)", type: "text", section: "Eckdaten (rechte Spalte)" },
      { name: "dates", label: "Kurstermine (im Kalender anklicken)", type: "dates", section: "Eckdaten (rechte Spalte)",
        help: "Diese Termine erscheinen im Kalender auf der Erwachsenen-Seite." },
      { name: "start_label", label: "Start (z.B. Start 14. September)", type: "text", section: "Eckdaten (rechte Spalte)" },
      { name: "availability", label: "Verfügbarkeit (z.B. noch 3 Plätze)", type: "text", section: "Eckdaten (rechte Spalte)" },
      { name: "instructor_slugs", label: "Kursleitung", type: "multiselect", section: "Eckdaten (rechte Spalte)",
        optionsFrom: "team", help: "Mehrere möglich." },

      // — Sichtbarkeit —
      { name: "is_new", label: "Als Neu markieren", type: "boolean", section: "Sichtbarkeit" },
      { name: "is_published", label: "Sichtbar auf der Website", type: "boolean", section: "Sichtbarkeit", default: true },
      { name: "sort_order", label: "Reihenfolge (kleiner = weiter oben)", type: "number", section: "Sichtbarkeit", default: 0 },
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
      // — Kopf —
      { name: "title", label: "Titel", type: "text", section: "Kopf" },
      { name: "slug", label: "Slug (URL-Teil)", type: "text", section: "Kopf" },
      { name: "group_name", label: "Gruppe", type: "select", section: "Kopf", options: [
        { value: "werke", label: "Werke (Originale)" },
        { value: "produkte", label: "Handgemachtes" },
        { value: "material", label: "Kreativmaterial" },
      ] },
      { name: "category", label: "Kategorie (z.B. Aquarell · Original)", type: "combobox", section: "Kopf",
        optionsFrom: "productCategories", help: "Auswählen oder frei eintippen." },
      { name: "color", label: "Farbe", type: "select", section: "Kopf", options: COLORS },
      { name: "image_url", label: "Titelbild", type: "image", section: "Kopf" },
      { name: "teaser", label: "Kurzbeschreibung", type: "textarea", section: "Kopf" },

      // — Bilder —
      { name: "images", label: "Weitere Bilder", type: "gallery", section: "Bilder",
        help: "Zusätzliche Ansichten. Ohne Bilder zeigen wir farbige Platzhalter." },

      // — Inhalt —
      { name: "description", label: "Über das Werk", type: "textarea", section: "Inhalt" },
      { name: "story", label: "Die Geschichte dahinter", type: "textarea", section: "Inhalt" },

      // — Details —
      { name: "specs", label: "Details (Technik, Masse …)", type: "keyvalue", section: "Details",
        itemLabels: ["Bezeichnung", "Wert"], default: PRODUCT_SPECS_DEFAULT,
        help: "Zeilen frei entfernen oder ergänzen." },
      { name: "price", label: "Preis (z.B. CHF 480)", type: "text", section: "Details" },
      { name: "availability", label: "Verfügbarkeit (z.B. Unikat)", type: "text", section: "Details" },
      { name: "instructor_slug", label: "Urheber:in", type: "select", section: "Details", optionsFrom: "team" },

      // — Sichtbarkeit —
      { name: "is_published", label: "Sichtbar im Shop", type: "boolean", section: "Sichtbarkeit", default: true },
      { name: "sort_order", label: "Reihenfolge", type: "number", section: "Sichtbarkeit", default: 0 },
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
      { name: "image_url", label: "Bild", type: "image", section: "Bild" },
      { name: "alt", label: "Bildbeschreibung (Alt-Text)", type: "text", section: "Bild" },
      { name: "category", label: "Kategorie", type: "select", section: "Bild", options: [
        { value: "kinder", label: "Kinder" },
        { value: "erwachsene", label: "Erwachsene" },
        { value: "ferien", label: "Ferienkurse" },
        { value: "workshop", label: "Workshops" },
        { value: "atelier", label: "Atelier" },
      ] },
      { name: "color", label: "Farbe (Fallback)", type: "select", section: "Bild", options: COLORS },
      { name: "is_published", label: "Sichtbar in der Galerie", type: "boolean", section: "Sichtbarkeit", default: true },
      { name: "sort_order", label: "Reihenfolge", type: "number", section: "Sichtbarkeit", default: 0 },
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
      { name: "name", label: "Name", type: "text", section: "Person" },
      { name: "slug", label: "Slug (z.B. lena-baumann)", type: "text", section: "Person" },
      { name: "role", label: "Rolle (z.B. Leitung · Malerei)", type: "text", section: "Person" },
      { name: "bio", label: "Kurzbeschreibung", type: "textarea", section: "Person" },
      { name: "color", label: "Farbe", type: "select", section: "Person", options: COLORS },
      { name: "image_url", label: "Foto", type: "image", section: "Person" },
      { name: "is_published", label: "Sichtbar auf der Über-uns-Seite", type: "boolean", section: "Sichtbarkeit", default: true },
      { name: "sort_order", label: "Reihenfolge", type: "number", section: "Sichtbarkeit", default: 0 },
    ],
  },
} satisfies Record<string, ResourceConfig>;

export type ResourceKey = keyof typeof RESOURCES;
export const RESOURCE_KEYS = Object.keys(RESOURCES) as ResourceKey[];
