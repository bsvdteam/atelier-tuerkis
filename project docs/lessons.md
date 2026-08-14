# lessons.md — Accumulated Project Corrections
# Atelier Website

**How this file works:**
- Every mistake, correction, or unexpected behavior gets logged here
- Format: date, area, what happened, what the fix is, what rule prevents recurrence
- Agents read the relevant section BEFORE working in that area
- Agents ADD to this file whenever a correction is made during a session

**AGENT INSTRUCTION:** At the end of every session where a mistake was corrected, add an entry. Use the format below exactly. This file is how the project gets smarter over time.

---

## FORMAT

```
### [DATE] — [AREA] — [Short title]

**What happened:**
[What the agent did wrong]

**Why it happened:**
[Root cause — missing context, wrong assumption, ambiguous spec, etc.]

**The fix:**
[What was done to correct it]

**Rule going forward:**
[One sentence that prevents this from happening again]

**Reference:**
[Which doc has the authoritative answer: CLAUDE.md §X, TECH_STACK.md §X, etc.]
```

---

## SECTION: PROJECT SETUP

*No entries yet. Add here when setup mistakes occur.*

---

## SECTION: Sanity

*No entries yet. Add here when Sanity schema or query mistakes occur.*

**Pre-loaded guidance (before first mistake):**

### PRE — Sanity — Singleton schemas behave differently

**What to watch for:**
The `atelierPage` schema is a singleton — one document, not a list. It requires `__experimental_actions: ['update', 'publish']` to prevent creation of duplicates. Standard schema setup without this allows staff to create multiple atelier page documents, breaking the site.

**Rule:**
Always include `__experimental_actions` on singleton schemas. Verify in Sanity Studio that "Create new document" is not available for `atelierPage`.

**Reference:** `BACKEND_STRUCTURE.md` section 2.4

---

### PRE — Sanity — GROQ queries never go inline in components

**What to watch for:**
Do not write GROQ query strings inside component files or page files. They belong exclusively in `/sanity/queries/index.ts` (or `/lib/sanity/queries.ts`).

**Why:** Inline queries cannot be easily updated across agents/sessions. A single change in requirements requires hunting through all components.

**Rule:**
Every GROQ query is a named exported constant in `@/lib/sanity/queries`. Import it. Never write backtick GROQ strings in component files.

**Reference:** `CLAUDE.md` §8, `BACKEND_STRUCTURE.md` section 3

---

## SECTION: Supabase

*No entries yet. Add here when Supabase mistakes occur.*

**Pre-loaded guidance (before first mistake):**

### PRE — Supabase — Service role key must never reach the browser

**What to watch for:**
`SUPABASE_SERVICE_ROLE_KEY` is used in the canvas submit API route to upload images and insert records. It must only appear in server-side code (`app/api/canvas/submit/route.ts`). Never import it in a client component. Never prefix it with `NEXT_PUBLIC_`.

**Rule:**
Any file that imports `SUPABASE_SERVICE_ROLE_KEY` must be a server-only file (API route, server component, or `server.ts` utility). If you see it in a component file, it's a security error — fix immediately.

**Reference:** `TECH_STACK.md` section 10, `BACKEND_STRUCTURE.md` section 5.1

---

### PRE — Supabase — RLS must be verified before testing

**What to watch for:**
Row Level Security policies must be applied before any frontend testing. Without RLS, the anon key can read and write everything. Verify in Supabase dashboard → Authentication → Policies that the policies from `BACKEND_STRUCTURE.md` section 4.2 are active.

**Rule:**
After running the DB migration, immediately verify RLS is enabled on `canvas_submissions` and the three policies exist before writing any frontend code.

**Reference:** `BACKEND_STRUCTURE.md` section 4.2

---

### PRE — Supabase — Realtime subscription must be cleaned up

**What to watch for:**
Supabase Realtime subscriptions in React components must be unsubscribed on component unmount. Forgetting this causes memory leaks and multiple active subscriptions when navigating away and back.

**Rule:**
Every `supabase.channel().subscribe()` call must have a corresponding cleanup in the `useEffect` return function:
```ts
return () => { supabase.removeChannel(channel) }
```

**Reference:** `BACKEND_STRUCTURE.md` section 4.4

---

## SECTION: i18n

*No entries yet. Add here when i18n mistakes occur.*

**Pre-loaded guidance (before first mistake):**

### PRE — i18n — Fallback to DE when EN field is empty

**What to watch for:**
Sanity CMS fields have `de` (required) and `en` (optional) sub-fields. When rendering content, always use the `getLocalised()` utility from `@/lib/utils.ts`. Never access `field.en` directly — it may be undefined.

**Correct:**
```ts
const title = getLocalised(course.title, locale)
// Returns: en value if exists and locale === 'en', otherwise de value
```

**Wrong:**
```ts
const title = locale === 'en' ? course.title.en : course.title.de
// Crashes if course.title.en is undefined
```

**Rule:**
Always use `getLocalised(field, locale)` for any localised Sanity field. Never access `.en` or `.de` directly in components.

**Reference:** `TECH_STACK.md` section 6, `CLAUDE.md` §12

---

### PRE — i18n — Language switcher must preserve the current page

**What to watch for:**
When switching from DE to EN (or back), the user must land on the EN/DE equivalent of the page they are currently on — not the homepage. Example: `/kurse/aquarell-kurs` → `/en/courses/aquarell-kurs`, not `/en/`.

**Rule:**
The language switcher uses `usePathname()` and `useParams()` to construct the target URL. Never use a hardcoded link to `/` or `/en/` in the language switcher.

**Reference:** `APP_FLOW.md` section FLOW 6

---

## SECTION: Framer Motion

*No entries yet. Add here when animation mistakes occur.*

**Pre-loaded guidance (before first mistake):**

### PRE — Framer Motion — Always check useReducedMotion

**What to watch for:**
Every component that uses Framer Motion animations must import and check `useReducedMotion()`. If it returns true, set `transition: { duration: 0 }` or skip the animation entirely.

**Template:**
```tsx
import { useReducedMotion } from 'framer-motion'

const shouldReduceMotion = useReducedMotion()

const variants = {
  hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: shouldReduceMotion ? 0 : 0.6 }
  }
}
```

**Rule:**
No Framer Motion animation ships without a `useReducedMotion()` check. This is an accessibility requirement, not a nice-to-have.

**Reference:** `FRONTEND_GUIDELINES.md` section 6.4, `PRD.md` section 8

---

### PRE — Framer Motion — Parallax on desktop only

**What to watch for:**
The parallax effect on featured images uses `useScroll` + `useTransform`. This must be disabled on mobile (below `md:` breakpoint) for performance reasons.

**Rule:**
Wrap parallax transforms in a media query check. Use a `useMediaQuery` hook or Tailwind's responsive approach to apply parallax only at `md:` and above.

**Reference:** `FRONTEND_GUIDELINES.md` section 6.2

---

## SECTION: Canvas

*No entries yet. Add here when Community Canvas mistakes occur.*

**Pre-loaded guidance (before first mistake):**

### PRE — Canvas — Image conversion before upload

**What to watch for:**
The canvas element produces a blob. This must be converted to WebP before uploading. Maximum file size is 2MB. Both checks happen client-side before the API call.

**Template:**
```ts
const blob = await new Promise<Blob>((resolve) => {
  canvasRef.current.toBlob(
    (b) => resolve(b!),
    'image/webp',
    0.85
  )
})

if (blob.size > 2 * 1024 * 1024) {
  setError('Das Bild ist zu gross. Bitte zeichne weniger Details.')
  return
}
```

**Rule:**
Always convert to WebP at 0.85 quality and check size before calling `/api/canvas/submit`. Never upload raw canvas data or PNG.

**Reference:** `BACKEND_STRUCTURE.md` section 4.3, `IMPLEMENTATION_PLAN.md` step 9.3

---

### PRE — Canvas — Touch events alongside mouse events

**What to watch for:**
The drawing canvas must support both mouse and touch events. Touch events require `e.preventDefault()` to stop scrolling while drawing. Mouse events do not. Both must be wired up.

**Required event handlers:**
- `onMouseDown`, `onMouseMove`, `onMouseUp`, `onMouseLeave`
- `onTouchStart`, `onTouchMove`, `onTouchEnd`

**Rule:**
Test the canvas on a real mobile device or browser touch simulator before considering it complete. Mouse-only implementation is an incomplete implementation.

**Reference:** `IMPLEMENTATION_PLAN.md` step 9.1

---

## SECTION: Typography & Styling

*No entries yet. Add here when Tailwind/typography mistakes occur.*

**Pre-loaded guidance (before first mistake):**

### PRE — Styling — No inline styles, ever

**What to watch for:**
The reflex to write `style={{ color: '#1A6B6F' }}` or `style={{ marginTop: '24px' }}`. This is always wrong on this project. Tailwind has the full color palette and spacing scale.

**Correct:**
```tsx
<div className="text-vivid-teal mt-6">
```

**Wrong:**
```tsx
<div style={{ color: '#1A6B6F', marginTop: '24px' }}>
```

**Rule:**
Zero inline styles. If a value isn't in Tailwind's config, it goes in `tailwind.config.ts` as a custom token — not as an inline style.

**Reference:** `TECH_STACK.md` section 2, `CLAUDE.md` §7

---

### PRE — Styling — Button corners are always square

**What to watch for:**
Framer Motion drag handles, Tailwind's default rounded classes, or component library defaults sometimes add `border-radius`. Every button on this site has `rounded-none`. This is intentional and non-negotiable.

**Rule:**
Every `<button>` element has `rounded-none` in its className. If it doesn't, add it.

**Reference:** `FRONTEND_GUIDELINES.md` section 5.1

---

## SECTION: Performance

*No entries yet. Add here when performance mistakes occur.*

**Pre-loaded guidance (before first mistake):**

### PRE — Performance — Always use Next.js Image

**What to watch for:**
Using `<img>` instead of Next.js `<Image>`. The `<img>` tag bypasses Next.js image optimization, WebP conversion, lazy loading, and blur placeholders.

**Rule:**
Every image on this site uses `import Image from 'next/image'`. No exceptions. Lint rule enforces this (`@next/next/no-img-element`).

**Reference:** `FRONTEND_GUIDELINES.md` section 7, `CLAUDE.md` §7

---

### PRE — Performance — ISR values per page type

**What to watch for:**
Using `export const revalidate = 0` (always dynamic) or forgetting `revalidate` entirely (defaults to static, won't update).

**Correct values:**
```ts
// Courses and artworks (change occasionally)
export const revalidate = 3600  // 1 hour

// Atelier page and team (rarely change)
export const revalidate = 86400  // 24 hours

// Canvas page (do NOT set revalidate — uses client-side Supabase)
// No revalidate export on canvas page
```

**Rule:**
Every page file has an explicit `export const revalidate` value. No page relies on Next.js defaults.

**Reference:** `BACKEND_STRUCTURE.md` section 6

---

*Last updated: [Date of project start]*  
*Entries: 0 real corrections + 12 pre-loaded guidance entries*
