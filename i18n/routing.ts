import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  // DE ohne Präfix (/atelier), EN mit Präfix (/en/atelier)
  localePrefix: "as-needed",
});
