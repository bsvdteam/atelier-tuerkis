import { COURSES } from "./courses";
import { ARTWORKS } from "./artworks";
import { TEAM } from "./team";
import type { Course } from "@/types";

export { COURSES } from "./courses";
export { ARTWORKS } from "./artworks";
export { TEAM } from "./team";
export { TESTIMONIALS } from "./testimonials";
export { FAQ } from "./faq";

// -------------------------------------------------------------- Kurs-Selektoren
export const adultCourses = () =>
  COURSES.filter((c) => c.audience === "erwachsene");

export const kidsCourses = () => COURSES.filter((c) => c.audience === "kinder");

export const courseBySlug = (audience: Course["audience"], slug: string) =>
  COURSES.find((c) => c.audience === audience && c.slug === slug);

/** Aktuelle Kurse für die Startseite (mit nächstem Start/Verfügbarkeit). */
export const featuredCourses = () =>
  COURSES.filter((c) => c.start || c.availability).slice(0, 3);

// ------------------------------------------------------------ Kunst-Selektoren
export const artworkBySlug = (slug: string) =>
  ARTWORKS.find((a) => a.slug === slug);

export const relatedArtworks = (slug: string, count = 2) =>
  ARTWORKS.filter((a) => a.slug !== slug).slice(0, count);

// ------------------------------------------------------------- Team-Selektoren
export const teamBySlug = (slug?: string) =>
  slug ? TEAM.find((m) => m.slug === slug) : undefined;
