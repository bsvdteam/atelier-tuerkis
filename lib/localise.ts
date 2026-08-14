import type { Locale, Localised } from "@/types";

/**
 * Gibt den Text in der aktuellen Sprache zurück.
 * Fällt still auf Deutsch zurück, wenn die EN-Übersetzung fehlt.
 */
export function getLocalised(value: Localised, locale: Locale): string {
  return value[locale] ?? value.de;
}
