# TECH_STACK.md — Technology Stack
# Atelier Website

**Version:** 1.0  
**Status:** Approved — Source of Truth  
**Last Updated:** 2025  
**References:** PRD.md

> **RULE FOR ALL AGENTS:** Never introduce a dependency not listed here. If you believe a new package is needed, stop and flag it explicitly. Do not install it autonomously.

---

## 1. Core Framework

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 14.2.x (App Router) | Framework — routing, SSR, ISR, image optimisation |
| React | 18.3.x | UI library |
| TypeScript | 5.4.x | Type safety — mandatory on all files |
| Node.js | 20.x LTS | Runtime |

**App Router only.** No Pages Router. No mixing.  
**TypeScript strict mode enabled.** No `any` types without explicit comment explaining why.

---

## 2. Styling

| Technology | Version | Purpose |
|---|---|---|
| Tailwind CSS | 3.4.x | Utility-first styling — all styling goes here |
| tailwind-merge | 2.x | Merge Tailwind classes without conflicts |
| clsx | 2.x | Conditional class composition |
| @tailwindcss/typography | 0.5.x | Prose styling for CMS rich-text content |

**No inline styles.** No CSS modules. No styled-components. No emotion.  
All visual decisions are in Tailwind classes or `tailwind.config.ts` (custom tokens).

---

## 3. Animation

| Technology | Version | Purpose |
|---|---|---|
| Framer Motion | 11.x | Page transitions, scroll animations, intro animation |

**No GSAP. No anime.js. No CSS-only keyframe hacks for complex sequences.**  
Framer Motion is the single animation library. Use it consistently.  
All animations must check `useReducedMotion()` hook and disable if true.

---

## 4. CMS — Content Management

| Technology | Version | Purpose |
|---|---|---|
| Sanity | 3.x | Headless CMS — courses, artworks, atelier content |
| @sanity/client | 6.x | Data fetching from Sanity |
| @sanity/image-url | 1.x | Image URL builder with transformations |
| next-sanity | 8.x | Next.js + Sanity integration, GROQ query helpers |

**Sanity Studio** runs at `/studio` route (embedded in Next.js app).  
All CMS content types defined in `/sanity/schemas/`.  
GROQ queries defined in `/sanity/queries/` — never inline in components.

---

## 5. Database & Backend

| Technology | Version | Purpose |
|---|---|---|
| Supabase | 2.x (JS client) | Community Canvas submissions, storage |
| @supabase/supabase-js | 2.x | Supabase JS client |
| @supabase/ssr | 0.x | Server-side Supabase helpers for Next.js App Router |

**Supabase usage is limited to:**
1. Community Canvas image uploads (Supabase Storage)
2. Canvas submission records (Supabase Database)
3. Real-time gallery updates (Supabase Realtime)

**Supabase is NOT used for authentication.** There are no user accounts.  
**Supabase is NOT used for CMS content.** That is Sanity's responsibility.

---

## 6. Internationalisation

| Technology | Version | Purpose |
|---|---|---|
| next-intl | 3.x | i18n routing, translations, locale detection |

**Locale files:** `/messages/de.json` and `/messages/en.json`  
**Route strategy:** Prefix on non-default locale — `/kurse` (DE default), `/en/courses` (EN)  
**No automatic locale detection.** User selects language manually. Preference saved to localStorage.

---

## 7. Icons & Assets

| Technology | Version | Purpose |
|---|---|---|
| Lucide React | 0.380.x | UI icons (nav, buttons, UI elements) |

**No FontAwesome. No Heroicons. No custom SVG icon systems.**  
Lucide React is the single icon source. Import only what is used.

---

## 8. Fonts

Loaded via `next/font` (self-hosted, no Google Fonts external request).

| Font | Weights | Use |
|---|---|---|
| Cormorant Garamond | 300, 400, 500 | Headlines, display text |
| DM Sans | 400, 500 | Body text, UI, navigation |

**Both fonts loaded in `app/layout.tsx` as CSS variables:**
```ts
--font-cormorant: 'Cormorant Garamond', serif
--font-dm-sans: 'DM Sans', sans-serif
```

---

## 9. Development & Code Quality

| Technology | Version | Purpose |
|---|---|---|
| ESLint | 8.x | Linting |
| eslint-config-next | 14.x | Next.js ESLint rules |
| Prettier | 3.x | Code formatting |
| prettier-plugin-tailwindcss | 0.6.x | Auto-sort Tailwind classes |
| Husky | 9.x | Git hooks |
| lint-staged | 15.x | Run linters on staged files only |

**Prettier runs on every commit via Husky + lint-staged.**  
**ESLint errors block commits.** Warnings are acceptable temporarily.  
`.eslintrc` and `.prettierrc` are committed and enforced — no local overrides.

---

## 10. Environment Variables

All environment variables defined in `.env.local` (local) and Vercel dashboard (production).  
**Never commit `.env.local`. It is in `.gitignore`.**

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=          # server-only, never NEXT_PUBLIC_

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY= # server-only, never NEXT_PUBLIC_

# Contact
NEXT_PUBLIC_WHATSAPP_NUMBER=  # format: 41791234567 (no + no spaces)
NEXT_PUBLIC_CONTACT_EMAIL=

# App
NEXT_PUBLIC_SITE_URL=          # https://atelier-domain.ch (no trailing slash)
NEXT_PUBLIC_DEFAULT_LOCALE=de
```

**NEXT_PUBLIC_ prefix = exposed to browser.** Never put secrets with this prefix.  
`SANITY_API_TOKEN` and `SUPABASE_SERVICE_ROLE_KEY` are server-only.

---

## 11. Deployment

| Service | Purpose |
|---|---|
| Vercel | Hosting, CI/CD, edge functions, preview deployments |
| Sanity CDN | Image and asset delivery for CMS content |
| Supabase (EU Frankfurt) | Database, Storage, Realtime |

**Vercel config:**
- Production branch: `main`
- Preview deployments: all other branches
- Node.js runtime: 20.x
- Build command: `next build`
- Output: default (not `export` — we need server features)

**No Docker. No self-hosted servers.** Fully managed infrastructure.

---

## 12. File & Folder Structure

```
/
├── app/                        # Next.js App Router
│   ├── [locale]/               # i18n root layout
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Home
│   │   ├── kurse/
│   │   │   ├── page.tsx        # Course catalogue
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Course detail
│   │   ├── galerie/
│   │   │   ├── page.tsx        # Gallery
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Artwork detail
│   │   ├── atelier/
│   │   │   └── page.tsx
│   │   ├── canvas/
│   │   │   └── page.tsx
│   │   ├── datenschutz/
│   │   │   └── page.tsx
│   │   └── impressum/
│   │       └── page.tsx
│   ├── studio/                 # Sanity Studio (embedded)
│   │   └── [[...tool]]/
│   │       └── page.tsx
│   └── api/
│       └── canvas/
│           └── submit/
│               └── route.ts    # Canvas submission endpoint
├── components/
│   ├── ui/                     # Base UI components (Button, Card, etc.)
│   ├── layout/                 # Nav, Footer, Layout wrappers
│   ├── sections/               # Page sections (Hero, CourseGrid, etc.)
│   ├── canvas/                 # Community Canvas components
│   └── sanity/                 # Sanity-specific components (PortableText, etc.)
├── lib/
│   ├── sanity/
│   │   ├── client.ts
│   │   └── queries.ts
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   └── utils.ts
├── sanity/
│   ├── schemas/                # All Sanity content type schemas
│   │   ├── course.ts
│   │   ├── artwork.ts
│   │   ├── teamMember.ts
│   │   └── atelierPage.ts
│   ├── queries/                # All GROQ queries (no inline queries in components)
│   └── sanity.config.ts
├── messages/
│   ├── de.json                 # All DE translations
│   └── en.json                 # All EN translations
├── public/
│   └── fonts/                  # Self-hosted font files
├── types/
│   └── index.ts                # All shared TypeScript types
├── tailwind.config.ts
├── next.config.ts
└── .env.local                  # Never committed
```

---

## 13. Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Components | PascalCase | `CourseCard.tsx` |
| Pages | lowercase | `page.tsx` |
| Hooks | camelCase with `use` prefix | `useCanvas.ts` |
| Utilities | camelCase | `formatPrice.ts` |
| Types/Interfaces | PascalCase | `CourseType`, `ArtworkType` |
| CSS classes | Tailwind only | `text-ink font-dm-sans` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_CANVAS_SIZE` |
| GROQ queries | camelCase, descriptive | `getCourseBySlug`, `getAllArtworks` |
| Env variables | SCREAMING_SNAKE_CASE | `NEXT_PUBLIC_SANITY_PROJECT_ID` |

---

## 14. What We Do NOT Use

This list is definitive. If it's not in the stack above, it's not in the project.

- ❌ WordPress
- ❌ Webflow
- ❌ Any page builder or template system
- ❌ jQuery
- ❌ Bootstrap or any CSS framework other than Tailwind
- ❌ GSAP, anime.js, or any animation library other than Framer Motion
- ❌ Redux, Zustand, or any global state manager (React state + context is sufficient)
- ❌ Axios (use native fetch)
- ❌ Moment.js (use native Intl or date-fns if needed)
- ❌ CSS-in-JS (styled-components, emotion, etc.)
- ❌ Any icon library other than Lucide React
- ❌ Any font loading method other than `next/font`
