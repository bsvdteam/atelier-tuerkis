import type { TeamMember } from "@/types";

export const TEAM: TeamMember[] = [
  {
    slug: "lena-baumann",
    name: "Lena Baumann",
    role: { de: "Leitung · Malerei", en: "Direction · Painting" },
    bio: {
      de: "Ausbildung in Bildender Kunst, 15 Jahre Kurserfahrung. Schwerpunkte: Aquarell & freies Malen. «Ich liebe den Moment, in dem jemand merkt: Ich kann das ja doch.»",
    },
    color: "teal",
  },
  {
    slug: "mara-kunz",
    name: "Mara Kunz",
    role: { de: "Lettering · Papier", en: "Lettering · Paper" },
    bio: {
      de: "Grafikerin & Kalligrafin. Schwerpunkte: Handlettering, Buchbinden, Cyanotypie. Bringt Ordnung und Verspieltheit zusammen, mit viel Ruhe.",
    },
    color: "coral",
  },
  {
    slug: "sofia-meier",
    name: "Sofia Meier",
    role: { de: "Kinderkurse", en: "Kids' Courses" },
    bio: {
      de: "Werklehrerin mit einem grossen Herz für Kinder. Schwerpunkte: Kreativwerkstatt & Ferienkurse. Ihre Motivation: Kindern Mut zum eigenen Ausdruck geben.",
    },
    color: "yellow",
  },
];
