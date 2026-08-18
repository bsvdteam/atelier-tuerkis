"use client";

import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";

const KEY = "at_cookie_consent";

export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let decided: string | null = null;
    try {
      decided = localStorage.getItem(KEY);
    } catch {}
    if (!decided) setOpen(true);

    const reopen = () => setOpen(true);
    window.addEventListener("open-cookie-settings", reopen);
    return () => window.removeEventListener("open-cookie-settings", reopen);
  }, []);

  const choose = (value: "all" | "necessary") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    // Analyse-/Karten-Komponenten können hierauf reagieren
    window.dispatchEvent(new CustomEvent("cookieconsent", { detail: value }));
    setOpen(false);
  };

  if (!open || pathname.startsWith("/admin") || pathname.startsWith("/coming-soon")) return null;

  return (
    <div className="cookie" role="dialog" aria-label="Cookie-Hinweis" aria-live="polite">
      <div className="cookie__card">
        <span className="cookie__blob" style={{ width: 78, height: 78, background: "var(--coral)", top: -22, right: -12 }} />
        <span className="cookie__blob" style={{ width: 46, height: 46, background: "var(--yellow)", bottom: -14, right: 44 }} />
        <span className="cookie__blob" style={{ width: 34, height: 34, background: "var(--sky)", top: 30, right: 80 }} />

        <div className="cookie__head">
          <span className="cookie__emoji">🎨</span>
          <h3>Ein Klecks Cookies?</h3>
        </div>
        <p>Notwendige Cookies brauchen wir immer. Für Statistik &amp; Karte fragen wir zuerst.</p>

        <div className="cookie__row">
          <button className="btn btn--coral" onClick={() => choose("all")}>
            Alle akzeptieren
          </button>
          <button className="btn btn--ghost" onClick={() => choose("necessary")}>
            Nur Notwendige
          </button>
        </div>

        <Link className="cookie__link" href="/datenschutz" onClick={() => setOpen(false)}>
          Mehr in der Datenschutzerklärung →
        </Link>
      </div>
    </div>
  );
}
