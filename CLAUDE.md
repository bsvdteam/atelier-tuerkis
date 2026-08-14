# CLAUDE.md — Projekt-Verfassung · Atelier Türkis

**Lies diese Datei zuerst. Jede Session. Ohne Ausnahme.**

Dies ist die verbindliche Regel- und Orientierungsdatei. Sie beschreibt nicht den
aktuellen Zustand (→ `progress.txt`) und keine Fehlerhistorie (→ `lessons.md`),
sondern was **dauerhaft gilt**. Bei Konflikt zwischen einer Chat-Anweisung und
dieser Datei gilt diese Datei — weiche nur ab, wenn der Mensch es in der laufenden
Session ausdrücklich anordnet, und flagge den Konflikt.

---

## 0. WAS DAS PROJEKT IST

Eine zweisprachige (DE/EN) Website für **Atelier Türkis**, ein Kunst- und
Kreativ-Atelier: Kurse (Kinder, Erwachsene, Gruppen), Kunst-Galerie und -Verkauf,
Vermietung von Räumen, Gutscheine. Kern-Interaktion für Buchungen/Anfragen läuft
über WhatsApp-Deeplinks (`wa.me`), nicht über einen Warenkorb.

Jede Kurs-, Produkt- und Kinder-Angebotsseite ist eine **eigene, echte Detailseite**
mit eigenem Inhalt — niemals dieselbe Platzhalterseite mehrfach.

---

## 1. ERSTE HANDLUNGEN — JEDE SESSION

In dieser Reihenfolge, bevor Code geschrieben wird:
1. **`progress.txt` lesen** — obersten Block finden, aktuelle Phase/Schritt + `OPEN (next)`.
2. **Schritt laut benennen:** „Wir sind bei Schritt X — [Name]."
3. **`lessons.md` prüfen**, bevor ein Subsystem angefasst wird, das dort eine Falle hat.
4. **Bei Unklarheit fragen** — vor dem Bauen, nicht danach.

---

## 2. TECH-STACK (Source of Truth: `project docs/TECH_STACK.md`)

| Bereich | Technologie |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript 5 (strict) |
| Runtime / PM | Node 20+ · npm |
| Styling | Tailwind CSS v4 (`@theme` in `app/globals.css`) + `tw-animate-css` |
| UI-Primitives | shadcn/ui auf **Base UI** (`@base-ui/react`) · `cva` · `clsx` · `tailwind-merge` |
| Icons | `lucide-react` |
| Animation | GSAP (`gsap` + `@gsap/react`) — sparsam, `useGSAP`, `prefers-reduced-motion` beachten |
| i18n | `next-intl` (DE default, EN) |
| Daten/Backend | Supabase (`@supabase/supabase-js` + `@supabase/ssr`) |
| Data-Fetching | `@tanstack/react-query` |
| Formulare | `react-hook-form` + `zod` (`@hookform/resolvers`) |
| Toasts | `sonner` |
| Dev | prettier (+`prettier-plugin-tailwindcss`), eslint, supabase-CLI, shadcn-CLI, ffmpeg-static |

**Regel:** Keine Dependency einführen, die hier nicht steht. Wenn eine gebraucht wird
→ stoppen und explizit flaggen, nicht eigenmächtig installieren.

**Fonts:** `Fraunces` (Display/Headings), `Nunito` (Body), `Fredoka` (Akzent/Kinder) —
via `next/font`, nicht per CDN-`<link>`.

---

## 3. ARCHITEKTUR-REGELN (nicht verhandelbar)

1. **App Router only.** Kein Pages Router. Server Components sind Default;
   `"use client"` nur wo nötig (Interaktivität, Hooks, Browser-APIs).
2. **TypeScript strict.** Kein `any` ohne Kommentar mit Begründung.
3. **Styling nur über Tailwind-Klassen** + Theme-Tokens in `globals.css`. Keine
   Inline-Styles, keine CSS-Module, kein styled-components. Farben/Spacing/Radius
   kommen aus den Design-Tokens, keine Magic-Hex-Werte im JSX.
4. **i18n:** Kein hartkodierter UI-Text in Komponenten. Alle Strings über
   `next-intl`-Messages (`messages/de.json`, `messages/en.json`). Routen unter
   `app/[locale]/`.
5. **Detailseiten sind datengetrieben:** Kurse/Kunstwerke/Kinder-Angebote kommen aus
   einer Datenquelle (`content/` bzw. später Supabase) und werden über dynamische
   Routen (`[slug]`) gerendert — nicht 20× dieselbe Datei kopieren.
6. **Secrets nie committen.** Nur `.env.example` ist im Repo. Echte Werte in
   `.env.local` (gitignored). Service-Role-Key nie im Client verwenden.
7. **Barrierefreiheit & Reduced Motion:** semantisches HTML, Alt-Texte, Fokus-States;
   jede Animation respektiert `prefers-reduced-motion`.
8. **WhatsApp-Deeplinks** über einen zentralen Helper (`buildWhatsAppUrl`), nicht
   verstreute `wa.me`-Strings.

---

## 4. KANONISCHE ORDNERSTRUKTUR

```
app/
  [locale]/            # DE/EN – alle Seiten liegen hierunter
    layout.tsx         # Header, Footer, Provider
    page.tsx           # Startseite
    atelier/ angebot/ kunst/ kontakt/ faq/ gutscheine/
    angebot/[slug]/    # dynamische Kurs-Detailseite
    kunst/[slug]/      # dynamische Kunstwerk-Detailseite
  globals.css          # Tailwind v4 @theme (Farben, Fonts, Radius, Spacing)
components/
  ui/                  # shadcn-Primitives (button, card, …)
  <Header, Footer, CourseCard, ArtworkCard, …>
lib/
  utils.ts             # cn()
  whatsapp.ts          # buildWhatsAppUrl()
  supabase/            # client.ts, server.ts
content/               # Kurs-/Kunstwerk-/Angebots-Daten (bis CMS)
messages/              # de.json, en.json
i18n/                  # next-intl request config + routing
types/                 # gemeinsame TS-Typen
public/                # Bilder, Assets
```

---

## 5. CODING-PATTERNS

**`cn()`-Helper** (`lib/utils.ts`):
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...i: ClassValue[]) => twMerge(clsx(i));
```

**WhatsApp-Link** (`lib/whatsapp.ts`):
```ts
export const buildWhatsAppUrl = (phone: string, text: string) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
```

**Server Component holt Daten, Client Component ist interaktiv.** Datenzugriff und
`await` gehören in Server Components; `"use client"` nur für Buttons/Menüs/Slider.

---

## 6. WAS NICHT TUN (Anti-Patterns)

- ❌ Dieselbe Platzhalter-Detailseite für mehrere Kurse/Produkte kopieren.
- ❌ Hartkodierte deutsche Strings im JSX (bricht i18n).
- ❌ Inline-Styles oder rohe Hex-Farben statt Theme-Tokens.
- ❌ `any`, `@ts-ignore` ohne Begründung.
- ❌ Neue Dependency ohne Eintrag in TECH_STACK.md.
- ❌ Secrets/Keys committen; Service-Role-Key im Client.
- ❌ Animationen ohne `prefers-reduced-motion`.
- ❌ Client Component, wo eine Server Component reicht.

---

## 7. SESSION-PROTOKOLL (Gedächtnis-Dateien)

- **`CLAUDE.md`** (diese Datei) — dauerhafte Regeln. Selten geändert, überschrieben
  (nicht angehängt). Hat Vorrang vor dem Ist-Zustand des Codes.
- **`progress.txt`** — Logbuch, neuester Block oben. Am **Ende** jeder Session neuen
  Block anhängen; `OPEN (next)` ist die wichtigste Zeile für die nächste Session.
- **`lessons.md`** — append-only Fehler-/Erkenntnis-Log. Bei jeder nicht-offensichtlichen
  Falle **sofort** Eintrag anhängen; nie löschen, nur `[SUPERSEDED]` markieren.
- **Design-Referenz** liegt in `project docs/` (PRD, APP_FLOW, FRONTEND_GUIDELINES,
  BACKEND_STRUCTURE, SITE_ARCHITECTURE). Bei Konflikt gilt CLAUDE.md.
```
