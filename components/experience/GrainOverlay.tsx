"use client";

import { usePathname } from "@/i18n/navigation";

/** Feines Papier-Korn über der ganzen Seite — gibt der Fläche Textur & Tiefe. */
export function GrainOverlay() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <div className="grain" aria-hidden="true" />;
}
