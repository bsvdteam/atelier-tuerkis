# TECH_STACK.md — Technology Stack · Atelier Türkis

**Status:** Source of Truth (Ist-Stand aus installierter `package.json`)
**Last Updated:** 2026-08-14
**Hinweis:** Diese Datei wurde am 2026-08-14 vom ursprünglichen Plan (Next 14 +
Sanity + Framer Motion) auf den TATSÄCHLICH installierten Stack umgestellt. Bei
Konflikt mit älteren project-docs gilt diese Datei + die Root-`CLAUDE.md`.

> **REGEL:** Keine Dependency einführen, die hier nicht steht. Wird eine gebraucht →
> stoppen und explizit flaggen, nicht eigenmächtig installieren.

---

## 1. Core Framework

| Technologie | Version | Zweck |
|---|---|---|
| Next.js | 16.3.x (App Router) | Framework — Routing, SSR/ISR, Image-Optimierung |
| React / React-DOM | 19.2.x | UI-Library |
| TypeScript | 5.x (strict) | Typsicherheit — auf allen Dateien Pflicht |
| Node.js | 20+ · npm | Runtime / Paketmanager |

App Router only. Kein Pages Router. Server Components sind Default.

---

## 2. Styling

| Technologie | Version | Zweck |
|---|---|---|
| Tailwind CSS | v4 | Utility-first — Theme via `@theme` in `app/globals.css` |
| @tailwindcss/postcss | v4 | PostCSS-Plugin |
| tailwind-merge | 3.x | Klassen konfliktfrei mergen (`cn`) |
| clsx | 2.x | Bedingte Klassen (`cn`) |
| class-variance-authority | 0.7.x | Varianten-Styling (shadcn) |
| tw-animate-css | 1.x | Animations-Utilities (shadcn) |

Keine Inline-Styles, keine CSS-Module, kein CSS-in-JS. Alles über Tailwind + Tokens.

---

## 3. UI-Primitives (shadcn/ui auf Base UI)

| Technologie | Version | Zweck |
|---|---|---|
| shadcn (CLI, dev) | 4.x | Generiert Komponenten nach `components/ui/` |
| @base-ui/react | 1.x | Basis-Primitives (statt Radix) |
| @radix-ui/react-slot | 1.x | `Slot` für `asChild`-Pattern |
| lucide-react | 1.x | Icon-Set (einziges) |

---

## 4. Animation

| Technologie | Version | Zweck |
|---|---|---|
| gsap | 3.x | Scroll-/Intro-Animationen |
| @gsap/react | 2.x | `useGSAP`-Hook |

Sparsam einsetzen. Jede Animation respektiert `prefers-reduced-motion`.
(Kein Framer Motion — bewusst durch GSAP ersetzt.)

---

## 5. Daten & Backend — Supabase

| Technologie | Version | Zweck |
|---|---|---|
| @supabase/supabase-js | 2.x | Supabase JS-Client |
| @supabase/ssr | 0.12.x | Server-Helper für Next App Router (Cookies) |
| supabase (CLI, dev) | 2.x | Migrationen, Typen-Generierung |
| @tanstack/react-query | 5.x | Client-seitiges Data-Fetching/Caching |

Kein Sanity — Inhalte kommen aus `content/` bzw. Supabase. Keine User-Accounts/Auth
in Phase 1.

---

## 6. Internationalisierung

| Technologie | Version | Zweck |
|---|---|---|
| next-intl | 4.x | i18n-Routing, Übersetzungen |

DE = Default (`/…`), EN = `/en/…`. Strings in `messages/de.json` + `messages/en.json`.
Kein hartkodierter UI-Text in Komponenten.

---

## 7. Formulare & Feedback

| Technologie | Version | Zweck |
|---|---|---|
| react-hook-form | 7.x | Formular-State |
| zod | 4.x | Schema-Validierung |
| @hookform/resolvers | 5.x | Brücke zod ↔ RHF |
| sonner | 2.x | Toast-Notifications |
| next-themes | 0.4.x | (kam mit sonner; Dark-Mode aktuell inaktiv) |

---

## 8. Fonts

Via `next/font` (self-hosted, kein externer CDN-Request):

| Font | Einsatz |
|---|---|
| Fraunces | Headlines / Display |
| Nunito | Body / UI |
| Fredoka | Akzent / Kinder-Bereich |

Als CSS-Variablen in `app/layout.tsx`: `--font-fraunces`, `--font-nunito`, `--font-fredoka`.

---

## 9. Dev & Code-Qualität

| Technologie | Version | Zweck |
|---|---|---|
| eslint | 9.x | Linting |
| eslint-config-next | 16.3.x | Next-Regeln |
| prettier | 3.x | Formatter |
| prettier-plugin-tailwindcss | 0.8.x | Tailwind-Klassen sortieren |
| ffmpeg-static | 5.x | Video → Frames (Hero-Scroll-Animation) |

(Husky/lint-staged aktuell NICHT installiert — bei Bedarf flaggen.)

---

## 10. Environment-Variablen

Vorlage: `.env.example` (im Repo). Echte Werte in `.env.local` (gitignored).

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # nur serverseitig, nie NEXT_PUBLIC_
NEXT_PUBLIC_WHATSAPP_NUMBER=      # Format: 41791234567 (ohne + / Leerzeichen)
```

`NEXT_PUBLIC_` = im Browser sichtbar. Niemals Secrets mit diesem Präfix.

---

## 11. Deployment

Vercel (Production = `main`). Build: `next build`. Lokaler Dev-Port: **3003**.

---

## 12. Ordnerstruktur & Naming

Siehe Root-`CLAUDE.md` Abschnitt 4 (kanonische Struktur) und Abschnitt 6 (Anti-Patterns).
Kurzform: Komponenten PascalCase, Utilities camelCase, Typen PascalCase, Env
SCREAMING_SNAKE_CASE, Routen unter `app/[locale]/`.

---

## 13. Was wir NICHT nutzen

- ❌ Sanity, WordPress, Webflow, Page-Builder
- ❌ Framer Motion, anime.js (Animation = GSAP)
- ❌ jQuery, Bootstrap, CSS-Framework außer Tailwind
- ❌ Redux/Zustand (React-State + Context reichen)
- ❌ Axios (native `fetch`)
- ❌ CSS-in-JS
- ❌ Icon-Library außer lucide-react
- ❌ Font-Loading außer `next/font`
