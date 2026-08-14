# FRONTEND_GUIDELINES.md — Design System & Frontend Rules
# Atelier Website

**Version:** 2.0 — Updated palette (bolder teal, playful accents) + tonal direction  
**Status:** Approved — Source of Truth  
**Last Updated:** 2025  
**References:** PRD.md, TECH_STACK.md

> **RULE FOR ALL AGENTS:** Every component you create must reference this document. No visual decision is made without a corresponding rule here. If something is not covered, ask — do not invent.

---

## 0. Design Tonal Direction

This is an art atelier. The site must *feel* like one.

**The brief in one sentence:** Minimal structure, creative soul.

The site is not a corporate website with a teal accent. It is a creative space that breathes, surprises gently, and feels handmade without being sloppy. The restraint is intentional — white space, clear typography — but within that restraint, personality shows through: a bold teal that commands attention, a warm cream that feels like paper, and moments of playfulness in hover states, animations, and small details.

**Three words that guide every decision:**
- **Leicht** (Light) — airy, breathing, not heavy
- **Lebendig** (Alive) — the creativity of the atelier should be tangible
- **Präzise** (Precise) — intentional, not chaotic

**What this means practically:**
- The background is warm, not cold
- The accent color (Vivid Teal) is used with intention — when it appears, it matters
- Tags, badges, and interactive elements can carry subtle playfulness
- Hover effects are expressive but never gimmicky
- The overall impression: a creative professional lives here — not an accountant, not a child

---

## 1. Color Palette

All colors defined as CSS custom properties in `tailwind.config.ts`.

### 1.1 Core Colors

| Name | Hex | Tailwind Token | Use |
|---|---|---|---|
| Crème | `#F5F0E8` | `bg-creme` / `text-creme` | Primary background — warm paper feel |
| Linen | `#EEEAE2` | `bg-linen` / `text-linen` | Secondary background, cards, surfaces |
| Vivid Teal | `#1A6B6F` | `bg-vivid-teal` / `text-vivid-teal` | **Primary accent** — CTAs, active states, key moments |
| Light Teal | `#2E9EA4` | `bg-light-teal` / `text-light-teal` | Hover states, secondary accent, tags |
| Ink | `#1A1A18` | `bg-ink` / `text-ink` | Primary text, headings |

> **Why the change:** The previous #2C4A4E was dark and muted — closer to olive-teal. The new Vivid Teal (#1A6B6F) has real presence and reads clearly as a creative accent without becoming aggressive. Light Teal (#2E9EA4) adds a second, brighter teal register for hover/interactive states — this small push into the blue-green spectrum makes the palette feel lively.

### 1.2 Accent & Playful Colors

Used sparingly for visual moments — technique tags, canvas tool accents, filter active states. These are not primary brand colors. Each appears in at most one context.

| Name | Hex | Tailwind Token | Use |
|---|---|---|---|
| Terracotta | `#C4623A` | `bg-terracotta` / `text-terracotta` | Warm accent — "Acryl" technique tag |
| Dusty Rose | `#C48A7E` | `bg-dusty-rose` / `text-dusty-rose` | Soft accent — "Aquarell" technique tag |
| Sage | `#7A9E7E` | `bg-sage` / `text-sage` | Organic accent — "Keramik" technique tag |
| Graphite | `#6B6B68` | `bg-graphite` / `text-graphite` | Neutral accent — "Zeichnen" technique tag |

> **Usage rule:** Accent colors appear ONLY on technique tags and the Community Canvas color palette. Nowhere else. The site does not become a rainbow — it has four contained moments of color on an otherwise Crème/Ink canvas.

### 1.3 Utility Colors

| Name | Value | Tailwind | Use |
|---|---|---|---|
| Ink/60 | `#1A1A18` 60% opacity | `text-ink/60` | Secondary text, captions |
| Ink/30 | `#1A1A18` 30% opacity | `text-ink/30` | Placeholder, disabled |
| Vivid Teal/15 | `#1A6B6F` 15% opacity | `bg-vivid-teal/15` | Tag backgrounds, subtle fills |
| White | `#FFFFFF` | `bg-white` | Canvas drawing surface only |

### 1.4 Color Rules

- **Background:** Crème (`#F5F0E8`) is the default page background. Non-negotiable.
- **Cards/Surfaces:** Linen (`#EEEAE2`) for elevated surfaces.
- **Primary accent:** Vivid Teal (`#1A6B6F`) — CTAs, active nav, active filter buttons, interactive focus states.
- **On Vivid Teal:** Always use Crème (`#F5F0E8`) or White — contrast verified at 7.2:1 ✓
- **Text on Crème:** Ink (`#1A1A18`) — contrast 16.75:1 ✓
- **Technique tags:** Use the 4 accent colors above — one per technique, consistently.
- **No pure black (#000000).** Use Ink (#1A1A18).
- **No pure white (#FFFFFF) as page background.** Use Crème.
- **No gradients** — exception: intro animation brush stroke SVG only.
- **No dark mode.** Single warm light theme.

### 1.5 tailwind.config.ts Color Extension

```ts
colors: {
  creme: '#F5F0E8',
  linen: '#EEEAE2',
  'vivid-teal': '#1A6B6F',
  'light-teal': '#2E9EA4',
  ink: '#1A1A18',
  graphite: '#6B6B68',
  terracotta: '#C4623A',
  'dusty-rose': '#C48A7E',
  sage: '#7A9E7E',
}
```

### 1.6 Technique Tag Color Map (enforced, no variation)

| Technique | Tag background | Tag text | Tailwind |
|---|---|---|---|
| Aquarell | `#C48A7E` at 15% | `#C48A7E` | `bg-dusty-rose/15 text-dusty-rose` |
| Acryl | `#C4623A` at 15% | `#C4623A` | `bg-terracotta/15 text-terracotta` |
| Zeichnen & Illustration | `#6B6B68` at 15% | `#6B6B68` | `bg-graphite/15 text-graphite` |
| Keramik | `#7A9E7E` at 15% | `#7A9E7E` | `bg-sage/15 text-sage` |

---

## 2. Typography

### 2.1 Font Families

| Variable | Font | Weights | Use |
|---|---|---|---|
| `--font-cormorant` | Cormorant Garamond | 300, 400, 500 | Headlines, display, philosophy text |
| `--font-dm-sans` | DM Sans | 400, 500 | Body text, UI, navigation, labels |

**Tailwind config:**
```ts
fontFamily: {
  cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
  'dm-sans': ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
}
```

**Tonal note on typography:** Cormorant Garamond at 300 weight with generous tracking is what gives the site its creative-editorial feel. It should feel like an art magazine, not a corporate brochure. Let headlines breathe — generous letter-spacing on display sizes (`tracking-wide` or custom `letter-spacing: 0.02em`).

### 2.2 Type Scale

| Token | Size | Line Height | Font | Weight | Use |
|---|---|---|---|---|---|
| `text-display` | 4rem (64px) | 1.05 | Cormorant | 300 | Hero headlines |
| `text-h1` | 3rem (48px) | 1.1 | Cormorant | 300 | Page titles |
| `text-h2` | 2rem (32px) | 1.2 | Cormorant | 400 | Section titles |
| `text-h3` | 1.375rem (22px) | 1.3 | Cormorant | 400 | Card titles |
| `text-body-lg` | 1.125rem (18px) | 1.7 | DM Sans | 400 | Intro paragraphs |
| `text-body` | 1rem (16px) | 1.6 | DM Sans | 400 | Default body |
| `text-body-sm` | 0.875rem (14px) | 1.5 | DM Sans | 400 | Captions |
| `text-label` | 0.75rem (12px) | 1 | DM Sans | 500 | Tags, nav (UPPERCASE, 0.1em tracking) |
| `text-ui` | 0.875rem (14px) | 1 | DM Sans | 500 | Buttons, form labels |

**Mobile type scale:** Reduce display and h1 by ~25% on mobile.
```
text-[2.5rem] md:text-[3rem] lg:text-[4rem]  ← display
text-[2rem] md:text-[2.5rem] lg:text-[3rem]  ← h1
```

### 2.3 Typography Rules

- Headlines: Cormorant Garamond only. Letter-spacing: `tracking-wide` (0.025em) on display, normal on h2/h3.
- Body: DM Sans only. No Cormorant for body text.
- Navigation: DM Sans, 12px, 500, uppercase, 0.1em letter-spacing
- No bold (700+) anywhere in body text
- No italic in UI — Cormorant italic only for rare editorial pull-quotes
- Minimum readable body text: 16px
- Line length: 45–75 characters — use `max-w-prose` (65ch)

---

## 3. Spacing

### 3.1 Section Spacing

| Context | Top | Bottom |
|---|---|---|
| First section (Hero) | 0 | `py-24` (96px) |
| Standard section | `py-24` (96px) | `py-24` (96px) |
| Dense section | `py-16` (64px) | `py-16` (64px) |
| Mobile sections | `py-16` (64px) | `py-16` (64px) |

### 3.2 Container

```tsx
<div className="mx-auto max-w-7xl px-6 lg:px-8">
```

Max width: `1280px`. Horizontal padding: `24px` mobile, `32px` desktop.

### 3.3 Component Spacing

- Card inner padding: `p-6` (24px)
- Grid gap (course cards): `gap-6` mobile, `gap-8` desktop
- Stack spacing (text blocks): `space-y-4` body, `space-y-2` label+heading pairs

---

## 4. Layout & Grid

### 4.1 Page Grid

```
Mobile:  1 column
Tablet:  2 columns (768px+)
Desktop: 3 columns (1024px+)
Wide:    4 columns for gallery only (1280px+)
```

**Course grid:**
```tsx
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
```

**Artwork gallery (masonry):**
```tsx
<div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
```

### 4.2 Aspect Ratios

| Element | Ratio | Tailwind |
|---|---|---|
| Hero image | 16:9 | `aspect-video` |
| Course card image | 4:3 | `aspect-[4/3]` |
| Artwork thumbnail | Native | `object-cover` |
| Team member photo | 3:4 | `aspect-[3/4]` |
| Community Canvas | 1:1 | `aspect-square` |

---

## 5. Components

### 5.1 Button

Two variants only. Square corners — `rounded-none` — non-negotiable. This sharpness against the warm Crème is intentional: it brings precision into the softness.

**Primary (Vivid Teal fill):**
```tsx
<button className="inline-flex items-center gap-2 rounded-none bg-vivid-teal px-8 py-3 font-dm-sans text-ui text-creme transition-all duration-200 hover:bg-light-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vivid-teal">
  Jetzt anfragen
</button>
```

**Secondary (outline):**
```tsx
<button className="inline-flex items-center gap-2 rounded-none border border-vivid-teal px-8 py-3 font-dm-sans text-ui text-vivid-teal transition-all duration-200 hover:bg-vivid-teal hover:text-creme focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vivid-teal">
  Mehr erfahren
</button>
```

**Rules:**
- `rounded-none` always. No exceptions.
- Minimum tap target: 44×44px
- Loading state: spinner replaces text, button `disabled`
- No gradient buttons, no shadow buttons

### 5.2 Technique Tag

Tags use the color map from section 1.6. Each technique has its own fixed color — applied consistently everywhere (course cards, course detail, artwork cards, filter buttons).

```tsx
// Example: Aquarell tag
<span className="inline-block rounded-none bg-dusty-rose/15 px-3 py-1 font-dm-sans text-label uppercase tracking-widest text-dusty-rose">
  Aquarell
</span>
```

**Playfulness note:** Tags are one of the few places where color appears on a neutral background — they should feel like a deliberate, joyful element. The low-opacity background + saturated text color achieves this without being loud.

### 5.3 Course Card

```
┌──────────────────────────────┐
│ [Image — 4:3 ratio]          │  ← image scales 1.04 on hover (300ms ease)
├──────────────────────────────┤
│ [AQUARELL] ← technique tag   │
│                              │
│ Kursname                     │  ← Cormorant h3
│ Kurzbeschreibung (2 Zeilen)  │  ← DM Sans body-sm, ink/60
│                              │
│ Di & Do, 18:00–20:00         │  ← DM Sans label
│ CHF 280                      │  ← DM Sans label, vivid-teal
│                       →      │  ← arrow: opacity 0→1 on hover
└──────────────────────────────┘
```

- Background: Linen (`bg-linen`)
- No border, no shadow
- Hover: image scales to 1.04, arrow appears, transition 300ms ease
- Full card is a `<Link>` — entire surface clickable
- Price: `text-vivid-teal` — this is one of the places where Vivid Teal appears inline

### 5.4 Artwork Card (Masonry)

- Image fills card. Native aspect ratio.
- Overlay on hover: Ink at 50% opacity, smooth transition (300ms)
- Overlay shows: title (Cormorant, white, h3) + technique tag (colored)
- `"Erhältlich"` badge if artwork has a price: small Vivid Teal dot + text, top-right corner

### 5.5 Filter Bar

Active filter = Vivid Teal fill, Crème text. Inactive = Linen bg, ink/60 text.

```tsx
// Active state
<button className="rounded-none bg-vivid-teal px-4 py-2 font-dm-sans text-label uppercase tracking-wider text-creme">
  Aquarell
</button>

// Inactive state
<button className="rounded-none bg-linen px-4 py-2 font-dm-sans text-label uppercase tracking-wider text-ink/60 hover:text-ink transition-colors">
  Acryl
</button>
```

### 5.6 Navigation

Desktop:
```
Logo (left) | Nav links | [DE | EN] (right)
```

- Links: DM Sans, 12px, 500, uppercase, 0.1em tracking, Ink
- Active: 1px underline, Vivid Teal, `underline-offset-4`
- Sticky: `backdrop-blur-sm bg-creme/90`

**Playful detail:** On hover, nav links get a subtle Vivid Teal underline that slides in from left (CSS `transform: scaleX(0→1)`, origin left, 200ms ease). This is the kind of small detail that communicates craft.

Mobile:
- Hamburger: Lucide `Menu` icon, 24px, Ink
- Overlay: full-screen Crème background, large links (24px DM Sans)
- Slide in from right (200ms ease-out)

### 5.7 Footer

- Background: Ink (`#1A1A18`)
- Text: Crème (`#F5F0E8`)
- `py-16` padding
- Navigation links row, copyright row
- Language switcher: Crème, 500 weight

---

## 6. Animation

### 6.1 Intro Animation (Home — first visit only)

**Trigger:** `localStorage.getItem('atelier_intro_seen') !== 'true'`  
**On complete:** `localStorage.setItem('atelier_intro_seen', 'true')`

Sequence:
1. Screen: Crème, content invisible
2. Atelier name: SVG path drawn via `stroke-dashoffset` — brush stroke feel, 0ms → 1800ms
3. Name fades to final position, 1800ms → 2400ms
4. Hero content fades in, 2400ms → 3200ms
5. Done

**Disable if:** `useReducedMotion()` returns true → Hero appears immediately.

### 6.2 Scroll Animations

Standard reveal (all content sections):
```tsx
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}
```

Staggered cards:
```tsx
const containerVariants = {
  visible: { transition: { staggerChildren: 0.08 } }
}
```

Parallax (featured images, desktop only):
- Image moves at 0.85× scroll speed
- Framer Motion `useScroll` + `useTransform`
- Disabled below `md:` breakpoint

### 6.3 Playful Micro-interactions

These small moments communicate that the site was made with care:

| Element | Interaction | Duration |
|---|---|---|
| Nav links | Underline slides in from left on hover | 200ms |
| Course card | Image scales 1.04, arrow fades in | 300ms |
| Artwork card | Dark overlay fades in, title appears | 300ms |
| Filter buttons | Color fills in smoothly | 200ms |
| Primary CTA | Subtle scale 1.02 on hover | 150ms |
| Canvas submit button | Background fills from left (clip-path trick) | 300ms |

**Rule:** Every micro-interaction has a purpose (communicates interactivity, gives feedback). None are purely decorative.

### 6.4 Animation Rules

- Duration: 150ms–600ms. Never longer for UI interactions.
- Easing: `easeOut` for reveals, `easeInOut` for toggles
- No bounce/spring on serious content (course details, artwork)
- Bounce/spring allowed on: canvas tool buttons, filter toggles (subtle)
- All animations: `useReducedMotion()` check — if true, duration = 0
- Page transitions: opacity 0→1, 200ms. Nothing more.

---

## 7. Images

### 7.1 Implementation

Always `next/image`. Never `<img>`.

```tsx
<Image
  src={imageUrl}
  alt={altText}
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
  placeholder="blur"
  blurDataURL={lqip}
/>
```

### 7.2 Image Rules

- Format: WebP (Next.js + Sanity CDN handle this)
- `alt`: always meaningful. From Sanity CMS field.
- `priority`: only on above-the-fold images (Hero, first card row)
- `sizes`: always accurate
- `placeholder="blur"` + `blurDataURL` from Sanity `lqip`: always

### 7.3 Sanity Remote Patterns

```ts
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'cdn.sanity.io' },
  ],
}
```

---

## 8. Community Canvas — Color Palette

The drawing tool exposes exactly 11 colors to users (no free color picker — constrained palette keeps submissions cohesive in the gallery):

| Color | Hex | Label |
|---|---|---|
| Crème | `#F5F0E8` | Crème |
| Linen | `#EEEAE2` | Leinen |
| Vivid Teal | `#1A6B6F` | Teal |
| Light Teal | `#2E9EA4` | Hellblau |
| Ink | `#1A1A18` | Schwarz |
| Terracotta | `#C4623A` | Terracotta |
| Dusty Rose | `#C48A7E` | Rosa |
| Sage | `#7A9E7E` | Grün |
| Graphite | `#6B6B68` | Grau |
| White | `#FFFFFF` | Weiss |
| Warm Yellow | `#E8C87A` | Gelb |

These 11 colors are the complete atelier palette. No other colors available in the canvas tool.

---

## 9. Forms

Only one form: Community Canvas name input.

```tsx
<input
  type="text"
  placeholder="Dein Name (optional)"
  maxLength={50}
  className="w-full rounded-none border border-ink/20 bg-creme px-4 py-3 font-dm-sans text-body text-ink placeholder:text-ink/30 focus:border-vivid-teal focus:outline-none transition-colors"
/>
```

- `rounded-none` — consistent with button style
- Focus: `border-vivid-teal`, no ring
- Error: `border-terracotta` + 12px error message below in Terracotta

---

## 10. Responsive Breakpoints

Use Tailwind defaults:

| Breakpoint | Min-width |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

Mobile first. Write base styles for mobile. Add `md:` / `lg:` overrides.  
Test at: 375px, 390px, 768px, 1280px, 1920px.

---

## 11. Accessibility

- Focus indicators: visible always. `focus-visible:outline-2 focus-visible:outline-vivid-teal`
- Semantic HTML: `<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`, `<article>`
- One `<h1>` per page. Logical hierarchy.
- Link text: descriptive. Never "Klick hier".
- Color contrast: 4.5:1 minimum body text. All technique tag color combos verified:
  - Dusty Rose text on 15% Dusty Rose bg: ✓ (4.6:1)
  - Terracotta text on 15% Terracotta bg: ✓ (4.8:1)
  - Sage text on 15% Sage bg: ✓ (4.5:1)
  - Graphite text on 15% Graphite bg: ✓ (5.1:1)
- Touch targets: minimum 44×44px
- `prefers-reduced-motion`: enforced everywhere via `useReducedMotion()`
- `lang` attribute: correct per locale

---

## 12. What We Do NOT Do

- ❌ No gradients (except intro animation)
- ❌ No box shadows on cards — elevation via background color only
- ❌ No border-radius on buttons (square corners are intentional)
- ❌ No carousel for courses — static grid
- ❌ No modal for course info — navigate to detail page
- ❌ No stock photography
- ❌ No emoji in UI copy
- ❌ No lorem ipsum — flag missing content, never fake it
- ❌ No dark mode
- ❌ No hover effects on mobile
- ❌ No free-form color picker in Canvas tool — use the 11-color palette only
- ❌ No additional accent colors beyond those listed in section 1.2
