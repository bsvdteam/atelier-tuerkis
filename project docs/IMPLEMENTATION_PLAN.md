# IMPLEMENTATION_PLAN.md — Build Sequence
# Atelier Website

**Version:** 1.0  
**Status:** Approved — Source of Truth  
**Last Updated:** 2025  
**References:** PRD.md, TECH_STACK.md, FRONTEND_GUIDELINES.md, BACKEND_STRUCTURE.md

> **RULE FOR ALL AGENTS:** Build exactly the step you are on. Do not skip ahead. Do not build step 3 while assigned step 2. After completing a step, update `progress.txt` with what was done, any deviations, and blockers. Then stop and wait.

---

## Phase 0 — Project Setup (Day 1–2)

### Step 0.1 — Initialise Project

```bash
npx create-next-app@14 atelier --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*"
cd atelier
```

Verify: Next.js 14, TypeScript, Tailwind CSS, ESLint are all present in `package.json`.

### Step 0.2 — Install All Dependencies

Install exactly these packages, no others:

```bash
# Animation
npm install framer-motion@11

# CMS
npm install @sanity/client@6 @sanity/image-url@1 next-sanity@8 sanity@3

# Database
npm install @supabase/supabase-js@2 @supabase/ssr@0

# i18n
npm install next-intl@3

# Icons
npm install lucide-react@0.380

# Tailwind plugins
npm install -D @tailwindcss/typography prettier prettier-plugin-tailwindcss husky lint-staged

# Merge utilities
npm install tailwind-merge@2 clsx@2
```

### Step 0.3 — Configure Tailwind

Replace `tailwind.config.ts` with the full configuration:

```ts
import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './sanity/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        creme: '#F5F0E8',
        linen: '#EEEAE2',
        'deep-teal': '#2C4A4E',
        'mid-teal': '#4A7A80',
        ink: '#1A1A18',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', ...fontFamily.serif],
        'dm-sans': ['var(--font-dm-sans)', ...fontFamily.sans],
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
```

### Step 0.4 — Configure ESLint & Prettier

`.eslintrc.json`:
```json
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "no-console": "warn",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

`.prettierrc`:
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Step 0.5 — Setup Husky

```bash
npx husky init
echo "npx lint-staged" > .husky/pre-commit
```

`package.json` lint-staged config:
```json
"lint-staged": {
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
}
```

### Step 0.6 — Create Folder Structure

Create all directories from TECH_STACK.md section 12:
```bash
mkdir -p components/{ui,layout,sections,canvas,sanity}
mkdir -p lib/{sanity,supabase}
mkdir -p sanity/{schemas,queries}
mkdir -p messages
mkdir -p types
mkdir -p public/fonts
```

### Step 0.7 — Setup Environment Variables

Create `.env.local` with all variables from TECH_STACK.md section 10. Leave values empty initially. Add `.env.local` to `.gitignore` (should already be there from create-next-app).

Create `.env.example` with the same keys but no values — this IS committed.

### Step 0.8 — Configure next.config.ts

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
}

export default nextConfig
```

**Phase 0 complete when:** `npm run dev` starts without errors. Folder structure matches TECH_STACK.md exactly.

---

## Phase 1 — Foundation (Day 2–4)

### Step 1.1 — TypeScript Types

Create `/types/index.ts` with all types from BACKEND_STRUCTURE.md section 7. This file is created first — components reference these types.

### Step 1.2 — Fonts

Load both fonts in `app/layout.tsx` using `next/font/google`:

```ts
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-cormorant',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
})
```

Apply variables to `<html>` tag: `className={`${cormorant.variable} ${dmSans.variable}`}`

### Step 1.3 — Global CSS

`app/globals.css`: Set default background to Crème. Set default text to Ink. Remove any Tailwind base overrides that conflict.

```css
body {
  @apply bg-creme text-ink font-dm-sans;
}

h1, h2, h3, h4 {
  @apply font-cormorant;
}
```

### Step 1.4 — i18n Setup (next-intl)

Configure `next-intl` per its documentation for App Router:
- Create `i18n.ts` in root
- Create `middleware.ts` for locale routing
- Create `messages/de.json` and `messages/en.json` with all UI strings
- Wrap `app/layout.tsx` with `NextIntlClientProvider`

**DE strings to include at minimum:**
```json
{
  "nav": {
    "home": "Startseite",
    "courses": "Kurse",
    "gallery": "Galerie",
    "atelier": "Atelier",
    "canvas": "Canvas"
  },
  "cta": {
    "discoverCourses": "Kurse entdecken",
    "viewGallery": "Galerie ansehen",
    "inquire": "Jetzt anfragen",
    "learnMore": "Mehr erfahren",
    "joinCanvas": "Jetzt mitmachen",
    "submit": "Einreichen"
  },
  "canvas": {
    "successMessage": "Danke! Dein Werk wird geprüft und erscheint bald in der Galerie.",
    "errorMessage": "Upload fehlgeschlagen. Bitte versuche es erneut.",
    "namePlaceholder": "Dein Name (optional)",
    "clearConfirm": "Alles löschen?"
  },
  "errors": {
    "courseNotFound": "Kurs nicht gefunden.",
    "artworkNotFound": "Werk nicht gefunden.",
    "noCoursesFilter": "Keine Kurse für diese Auswahl gefunden.",
    "noArtworksFilter": "Keine Werke für diese Auswahl gefunden.",
    "noCanvasSubmissions": "Noch keine Einreichungen. Sei der Erste!"
  },
  "filters": {
    "all": "Alle",
    "adults": "Erwachsene",
    "children": "Kinder & Jugendliche"
  },
  "techniques": {
    "aquarell": "Aquarell",
    "acryl": "Acryl",
    "zeichnen": "Zeichnen & Illustration",
    "keramik": "Keramik"
  }
}
```

### Step 1.5 — Utility Functions

Create `lib/utils.ts`:
```ts
// cn: merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// formatPrice: format CHF price
export function formatPrice(price: number): string {
  return `CHF ${price.toLocaleString('de-CH')}`
}

// getLocalised: get localised string with DE fallback
export function getLocalised(field: { de: string; en?: string }, locale: string): string {
  if (locale === 'en' && field.en) return field.en
  return field.de
}

// buildWhatsAppUrl: generate pre-filled WhatsApp link
export function buildWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

// buildMailtoUrl: generate pre-filled mailto link
export function buildMailtoUrl(email: string, subject: string, body: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
```

**Phase 1 complete when:** Types are defined, fonts load correctly, i18n routes work for `/` and `/en/`, utility functions are tested.

---

## Phase 2 — Sanity CMS (Day 4–6)

### Step 2.1 — Initialise Sanity

```bash
npm create sanity@latest -- --project-id=XXXXXX --dataset=production --template=clean
```

Do NOT use Sanity's CLI to scaffold — configure manually to embed in Next.js app.

### Step 2.2 — Sanity Studio Route

Create `app/studio/[[...tool]]/page.tsx` to embed Sanity Studio.

### Step 2.3 — Define All Schemas

Create all schema files from BACKEND_STRUCTURE.md section 2:
- `/sanity/schemas/course.ts`
- `/sanity/schemas/artwork.ts`
- `/sanity/schemas/teamMember.ts`
- `/sanity/schemas/atelierPage.ts`

Export all schemas in `/sanity/schemas/index.ts`.

### Step 2.4 — Sanity Client

Create `/lib/sanity/client.ts`:
```ts
import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,  // false for draft preview if needed later
})
```

### Step 2.5 — All GROQ Queries

Create `/sanity/queries/index.ts` with all queries from BACKEND_STRUCTURE.md section 3. Each query is an exported constant string. No inline queries in components.

### Step 2.6 — Seed Test Data

Via Sanity Studio, create:
- 3 test courses (one per technique, different audiences)
- 4 test artworks
- 1 team member
- Atelier page content

This enables testing all pages before they're fully styled.

**Phase 2 complete when:** Sanity Studio accessible at `/studio`, all schemas visible, test data created, GROQ queries return correct data when tested in Sanity Vision.

---

## Phase 3 — Supabase Setup (Day 6–7)

### Step 3.1 — Create Supabase Project

- Region: EU West (Frankfurt)
- Create project in Supabase dashboard
- Copy project URL and anon key to `.env.local`

### Step 3.2 — Run Database Migration

Run the SQL from BACKEND_STRUCTURE.md section 4.1 in Supabase SQL editor:
- Create `canvas_submissions` table
- Create indexes
- Enable RLS
- Apply all policies

### Step 3.3 — Create Storage Bucket

- Bucket name: `canvas`
- Access: Public
- Apply storage policies for public read

### Step 3.4 — Supabase Clients

Create `/lib/supabase/client.ts` (browser):
```ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

Create `/lib/supabase/server.ts` (server-side):
```ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  )
}
```

### Step 3.5 — Canvas Submit API Route

Create `app/api/canvas/submit/route.ts` with the full logic from BACKEND_STRUCTURE.md section 5.1:
- Input validation
- File upload to Supabase Storage (using service role key)
- DB record creation
- Error handling

**Test with Postman or curl before moving on.**

**Phase 3 complete when:** Test submission via API route creates a record in Supabase with status `pending`, image stored in Storage bucket.

---

## Phase 4 — Layout Components (Day 7–9)

### Step 4.1 — Navigation Component

Create `components/layout/Navbar.tsx`:
- Desktop layout (logo left, links centre/right, language switcher right)
- Mobile hamburger + overlay
- Sticky on scroll (Framer Motion `useScroll`)
- Active link detection using Next.js `usePathname`
- Language switcher linked to i18n locale

### Step 4.2 — Footer Component

Create `components/layout/Footer.tsx`:
- Ink background, Crème text
- Navigation links
- Language switcher
- Copyright

### Step 4.3 — Root Layout

Update `app/[locale]/layout.tsx`:
- Wrap with `NextIntlClientProvider`
- Include `<Navbar />` and `<Footer />`
- Set correct `lang` attribute on `<html>`
- Include font variables

### Step 4.4 — Base UI Components

Create these in `components/ui/`:

`Button.tsx` — primary and secondary variants (see FRONTEND_GUIDELINES.md section 5.1)  
`Tag.tsx` — technique/audience tags (see FRONTEND_GUIDELINES.md section 5.4)  
`Container.tsx` — max-width wrapper  
`SectionWrapper.tsx` — standard section padding  

**Phase 4 complete when:** Nav and footer render correctly on all viewports. Language switcher works. No console errors.

---

## Phase 5 — Home Page (Day 9–12)

### Step 5.1 — Intro Animation Component

Create `components/sections/IntroAnimation.tsx`:
- Check `localStorage.getItem('atelier_intro_seen')`
- If not seen: play brush stroke SVG animation (Framer Motion `stroke-dashoffset`)
- On complete: set `localStorage.setItem('atelier_intro_seen', 'true')`
- If already seen: render null immediately, Hero becomes visible
- Wrap entire logic in `useReducedMotion()` check

### Step 5.2 — Hero Section

Create `components/sections/HomeHero.tsx`:
- Full viewport height (`min-h-screen`)
- Background: Crème
- Atelier name in Cormorant 300, display size
- Tagline: DM Sans, body-lg
- Two CTAs: Primary "Kurse entdecken" + Secondary "Galerie ansehen"

### Step 5.3 — Philosophy Statement Section

Create `components/sections/Philosophy.tsx`:
- No image
- Large Cormorant text, centred or left-aligned
- `max-w-3xl` text container
- Fade-in on scroll (Framer Motion `useInView`)

### Step 5.4 — Featured Works Section

Create `components/sections/FeaturedWorks.tsx`:
- Fetch 3–4 artworks (featured flag or most recent from Sanity)
- Horizontal scroll on mobile (`overflow-x-auto`, snap-scroll)
- 3-column grid on desktop
- Parallax effect on images (desktop only)
- "Galerie ansehen →" link below

### Step 5.5 — Course Preview Section

Create `components/sections/CoursePreview.tsx`:
- Fetch 3 active courses from Sanity
- Render as `<CourseCard />` components (built in Phase 6)
- "Alle Kurse →" link below

### Step 5.6 — Canvas Teaser Section

Create `components/sections/CanvasTeaser.tsx`:
- Simple text block + CTA "Jetzt mitmachen"
- Optionally show count of approved submissions ("87 Werke von unserer Community")

### Step 5.7 — Contact Section

Create `components/sections/ContactSection.tsx`:
- WhatsApp link (icon + number)
- Email link
- Address
- Opening hours

### Step 5.8 — Scroll Progress Indicator

Create `components/ui/ScrollProgress.tsx`:
- 1px line, Deep Teal, fixed top of viewport
- Width: percentage of page scrolled
- Framer Motion `useScroll` + `motion.div`

**Phase 5 complete when:** Home page renders all sections, intro animation works, scroll animations trigger correctly, all CTAs link to correct routes.

---

## Phase 6 — Courses Pages (Day 12–15)

### Step 6.1 — CourseCard Component

Create `components/sections/CourseCard.tsx` per FRONTEND_GUIDELINES.md section 5.2.

### Step 6.2 — Filter Component

Create `components/ui/FilterBar.tsx`:
- Technique filter buttons (Alle | Aquarell | Acryl | Zeichnen | Keramik)
- Audience filter buttons (Alle | Erwachsene | Kinder & Jugendliche)
- Active state: Deep Teal fill on active button
- Client-side filtering (no page reload)

### Step 6.3 — Courses List Page (`/kurse`)

Create `app/[locale]/kurse/page.tsx`:
- Fetch all active courses (ISR, revalidate: 3600)
- Render `<FilterBar />` + grid of `<CourseCard />`
- Empty state handling

### Step 6.4 — Course Detail Page (`/kurse/[slug]`)

Create `app/[locale]/kurse/[slug]/page.tsx`:
- Fetch course by slug (ISR, revalidate: 3600)
- Full content layout (see PRD.md section 3.4)
- WhatsApp + email CTAs with pre-filled messages from APP_FLOW.md section 7
- Image gallery (swipeable on mobile — Framer Motion drag)
- Related courses section
- 404 handling (redirect to `/kurse` if course not found)

### Step 6.5 — Static Params

Implement `generateStaticParams` for `/kurse/[slug]` to pre-render all course pages at build time.

**Phase 6 complete when:** All course pages render with real Sanity data. Filters work. CTAs open WhatsApp/email correctly.

---

## Phase 7 — Gallery Pages (Day 15–18)

### Step 7.1 — Artwork Masonry Component

Create `components/sections/ArtworkMasonry.tsx`:
- CSS columns masonry (see FRONTEND_GUIDELINES.md section 4.1)
- Lazy loading with blur placeholder
- Hover overlay (per FRONTEND_GUIDELINES.md section 5.3)
- Pagination: show 24 items, "Mehr laden" button for next 24

### Step 7.2 — Gallery Page (`/galerie`)

Create `app/[locale]/galerie/page.tsx`:
- Fetch first 24 artworks (ISR, revalidate: 3600)
- Filter bar (technique + creator type)
- Masonry grid

### Step 7.3 — Artwork Detail Page (`/galerie/[slug]`)

Create `app/[locale]/galerie/[slug]/page.tsx`:
- Fetch artwork by slug
- Image gallery (main image + up to 5 detail shots)
- All artwork metadata
- Price display logic (show price / "Preis auf Anfrage" / "Verkauft")
- WhatsApp + email CTAs with pre-filled messages
- Related works (3 artworks, same technique)
- 404 handling

**Phase 7 complete when:** Gallery loads with real artwork data. Masonry layout is correct. Detail pages render all content. CTAs work.

---

## Phase 8 — Atelier Page (Day 18–20)

### Step 8.1 — Atelier Page

Create `app/[locale]/atelier/page.tsx`:
- Fetch atelier page data + team members from Sanity
- Render all sections per PRD.md section 3.7
- Photo essay grid for space images
- Team member cards

**Phase 8 complete when:** Atelier page renders with real Sanity content for all sections.

---

## Phase 9 — Community Canvas (Day 20–24)

### Step 9.1 — Drawing Tool Component

Create `components/canvas/DrawingCanvas.tsx`:
- HTML5 Canvas element (400×400px)
- Mouse + touch event handlers (draw on mousedown+mousemove, touchstart+touchmove)
- State: current color, brush size (3 sizes: 4px / 8px / 16px)
- Color picker: 5 atelier colors + 6 additional colors (fixed, not free-pick)
- Undo: store stroke history, pop on undo (max 20 undos in memory)
- Clear: reset canvas with confirm dialog

### Step 9.2 — Canvas Gallery Component

Create `components/canvas/CanvasGallery.tsx`:
- Fetch approved submissions from Supabase (client-side)
- Mosaic grid layout
- Supabase Realtime subscription for new approvals
- Fade-in animation for new items

### Step 9.3 — Canvas Submission Flow

Create `components/canvas/CanvasSubmit.tsx`:
- Convert canvas to WebP blob (`canvas.toBlob('image/webp', 0.85)`)
- Name input (optional, max 50 chars)
- POST to `/api/canvas/submit`
- Loading / success / error states

### Step 9.4 — Canvas Page

Create `app/[locale]/canvas/page.tsx`:
- Composition: gallery + teaser text + drawing tool (revealed on CTA click)
- All components from steps 9.1–9.3

**Phase 9 complete when:** Full draw → submit → pending → (manual admin approval) → gallery appearance flow works end-to-end.

---

## Phase 10 — Legal, SEO, Polish (Day 24–27)

### Step 10.1 — Legal Pages

Create `app/[locale]/datenschutz/page.tsx` and `app/[locale]/impressum/page.tsx`.  
Content provided by atelier (or standard Swiss template). Hardcoded — no CMS.

### Step 10.2 — SEO Metadata

Add `generateMetadata` to every page:
- Correct title per page (from Sanity SEO fields where available)
- Meta description
- Open Graph image (default: atelier logo/hero image)
- Canonical URL
- `lang` attribute correct per locale

### Step 10.3 — Sitemap

Create `app/sitemap.ts` generating XML sitemap with all static + dynamic routes.

### Step 10.4 — 404 Page

Create `app/not-found.tsx` — atelier-branded, CTA back to home.

### Step 10.5 — On-Demand Revalidation

Create `app/api/revalidate/route.ts`:
- Receives Sanity webhook POST with secret
- Validates secret matches env var `SANITY_WEBHOOK_SECRET`
- Calls `revalidatePath` for appropriate routes

Configure webhook in Sanity dashboard.

### Step 10.6 — Performance Audit

Run Lighthouse on all pages. Fix any score below:
- Performance: 90
- Accessibility: 95
- SEO: 95

Common fixes: image `sizes` attributes, priority flags, font loading, CLS issues.

### Step 10.7 — Cross-Browser & Device Testing

Test on:
- Chrome, Firefox, Safari (desktop)
- iOS Safari (iPhone 15)
- Android Chrome (Samsung Galaxy)
- iPad (768px)

---

## Phase 11 — Launch (Day 27–30)

### Step 11.1 — Vercel Production Setup

- Connect GitHub repo to Vercel
- Set all environment variables in Vercel dashboard
- Configure production domain
- Verify `main` branch = production

### Step 11.2 — Supabase Production Check

- Verify RLS policies are active
- Verify Storage bucket permissions
- Test canvas submission end-to-end on production

### Step 11.3 — Sanity Production Dataset

- Verify dataset is `production`
- Migrate test data or create real content
- Test Sanity webhook for on-demand revalidation

### Step 11.4 — DNS & Domain

- Point domain DNS to Vercel
- Verify SSL certificate
- Test all routes on production domain

### Step 11.5 — CMS Handoff

- Create Sanity login for atelier team
- Provide documentation for: adding courses, adding artworks, editing atelier page, approving canvas submissions (via Supabase table editor)
- Record short Loom walkthrough video (optional but recommended)

### Step 11.6 — Launch ✓

Update `progress.txt` with LAUNCHED status and date.

---

## Milestone Summary

| Phase | Duration | Deliverable |
|---|---|---|
| 0 — Setup | Day 1–2 | Running project, all dependencies |
| 1 — Foundation | Day 2–4 | Types, fonts, i18n, utilities |
| 2 — Sanity | Day 4–6 | CMS with all schemas + test data |
| 3 — Supabase | Day 6–7 | DB, storage, API route |
| 4 — Layout | Day 7–9 | Nav, footer, base components |
| 5 — Home | Day 9–12 | Full home page with animation |
| 6 — Courses | Day 12–15 | Courses list + detail pages |
| 7 — Gallery | Day 15–18 | Gallery + artwork detail pages |
| 8 — Atelier | Day 18–20 | About page |
| 9 — Canvas | Day 20–24 | Full community canvas feature |
| 10 — Polish | Day 24–27 | SEO, legal, performance |
| 11 — Launch | Day 27–30 | Live site, handoff |

**Total: 30 working days (~6 weeks)**
