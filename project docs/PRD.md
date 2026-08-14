# PRD.md — Product Requirements Document
# Atelier Website

**Version:** 1.1 — Color palette updated to Vivid Teal  
**Status:** Approved — Source of Truth  
**Last Updated:** 2025  
**Owner:** PIXEL / Lead Developer  

---

## 1. Project Overview

### 1.1 What We Are Building

A premium bilingual (DE/EN) website for a Kunst- und Kreativ-Atelier. The site serves as the primary digital presence: showcasing the atelier's identity, displaying artwork and courses, enabling workshop inquiries, and housing an interactive community feature (Community Canvas). The site is designed for longevity — content-managed by non-technical staff after handoff, with zero developer dependency for day-to-day operations.

### 1.2 The Problem We Are Solving

The atelier has a physical presence and reputation but no digital home that matches its quality. Potential students cannot discover courses online. Artwork has no showcase platform. There is no way for interested visitors to make contact without prior knowledge of the atelier. The website closes this gap.

### 1.3 Success Criteria (Measurable)

- A first-time visitor understands what the atelier is and does within 3 seconds of landing
- A potential student can find a relevant course and submit an inquiry in under 60 seconds
- The atelier team can add/edit courses, artworks, and page content without developer help
- The site scores 90+ on Google Lighthouse (Performance, Accessibility, SEO)
- The site is live within 3 months of development start
- Zero broken links or dead-end pages at launch

### 1.4 What This Is NOT (Explicit Out-of-Scope)

- No online payment / checkout. All transactions happen offline or via WhatsApp/email.
- No user accounts or login for visitors
- No e-commerce cart or basket
- No online-only or hybrid courses (Phase 2 consideration)
- No newsletter or email subscription system (Phase 2 consideration)
- No booking calendar or real-time availability system
- No multi-location support — this is one atelier, one location
- No blog or editorial content section

---

## 2. Target Users

### 2.1 Primary User: Potential Course Participant

**Who:** Adults (25–65), residents within travel distance of the atelier, with disposable income and interest in creative hobbies. Parents seeking courses for children/teenagers.

**Goal:** Discover what courses exist, understand what they'll learn, assess the atelier's atmosphere and quality, and make contact to register.

**Pain Points:** Cannot find course information easily. Doesn't know if the atelier is "for them." No clear contact path.

**How We Solve It:** Clear course cards with technique, level, schedule, and price. Strong visual identity that communicates atmosphere. Prominent WhatsApp/email CTA on every course.

### 2.2 Secondary User: Art-Interested Browser

**Who:** Someone who discovered the atelier through social media, word of mouth, or search. Not yet committed to a course. Curious about the work produced.

**Goal:** Browse artwork, understand the atelier's aesthetic, feel inspired.

**How We Solve It:** Galerie page with high-quality image presentation. Artwork detail pages. Community Canvas as an engagement hook.

### 2.3 Tertiary User: Atelier Staff / Content Manager

**Who:** Non-technical team member responsible for keeping the site current.

**Goal:** Add new workshops, upload artwork, update descriptions — without asking a developer.

**How We Solve It:** Sanity CMS with a simple, intuitive editing interface. Full documentation provided at handoff.

---

## 3. Pages & Features

### 3.1 Page Inventory

| Page | Route | Priority | CMS-Managed |
|---|---|---|---|
| Home | `/` | P0 | Partially |
| Kurse (Courses) | `/kurse` | P0 | Fully |
| Course Detail | `/kurse/[slug]` | P0 | Fully |
| Galerie (Works) | `/galerie` | P0 | Fully |
| Artwork Detail | `/galerie/[slug]` | P0 | Fully |
| Atelier (About) | `/atelier` | P1 | Fully |
| Community Canvas | `/canvas` | P1 | Partially |
| 404 | `/404` | P1 | No |

**Note:** No standalone contact page. Contact is embedded as a section in Home and Atelier, and as a CTA on every Course Detail page.

### 3.2 Home Page (`/`)

**Purpose:** First impression. Communicate identity in 3 seconds. Guide visitors to their next step.

**Sections (in order):**
1. **Hero** — Full-viewport. Atelier name, one-line tagline (DE/EN), two CTAs: "Kurse entdecken" and "Galerie ansehen". Intro animation on first visit only (brush-stroke reveal of the atelier name).
2. **Philosophy Statement** — 2–3 sentences. What the atelier believes about art and creativity. Large serif typography. No images.
3. **Featured Works** — 3–4 curated artwork images. Horizontal scroll on mobile. Links to Galerie.
4. **Course Preview** — 3 upcoming/featured courses as cards. Link to full Kurse page.
5. **Community Canvas Teaser** — Brief intro to the interactive drawing feature. CTA to `/canvas`.
6. **Contact Section** — WhatsApp number, email address, physical address. Map embed (optional, Phase 2).
7. **Footer** — Navigation links, language switcher (DE/EN), copyright.

**No hero video.** Images only. Performance is non-negotiable.

### 3.3 Kurse Page (`/kurse`)

**Purpose:** Full course catalogue. Easy to scan, easy to filter.

**Features:**
- Filter by technique: Aquarell / Acryl / Zeichnen & Illustration / Keramik / Alle
- Filter by audience: Erwachsene / Kinder & Jugendliche / Alle
- Course cards: technique tag, title, short description (max 2 lines), schedule (day + time), price, "Mehr erfahren" link
- Empty state: clear message if no courses match filter
- All courses managed via Sanity CMS — no hardcoding

### 3.4 Course Detail Page (`/kurse/[slug]`)

**Purpose:** Full course information. Single clear conversion action: contact to register.

**Content:**
- Technique tag + course title
- Long description (what participants learn, what to expect)
- Schedule: day(s), time, duration per session, total sessions
- Level: Beginner / Intermediate / Advanced / All levels
- Target audience: Adults / Children & Teenagers / All
- Price (CHF) — displayed if set in CMS, hidden if not
- Materials: what to bring, what is provided
- Instructor name + short bio (optional)
- Gallery of 2–4 images from past sessions or example work
- **CTA (sticky on mobile):** "Jetzt anfragen" → opens WhatsApp pre-filled message OR mailto link. Both options displayed.
- Related courses (2 suggestions, same technique)

### 3.5 Galerie Page (`/galerie`)

**Purpose:** Showcase all artwork in the atelier — by instructors, participants, and the atelier collectively. Also entry point to individual artwork detail pages.

**Features:**
- Masonry grid layout. Responsive: 1 col mobile, 2 col tablet, 3 col desktop.
- Filter by technique: Aquarell / Acryl / Zeichnen & Illustration / Keramik / Alle
- Filter by creator type: Atelier / Kursteilnehmer / Alle
- Artwork card: image, title, technique tag, creator name (optional)
- Price badge on card if artwork is for sale (text only: "CHF 480 — Anfragen via WhatsApp")
- Click → Artwork Detail page
- Lazy loading with placeholder blur. No infinite scroll — paginate at 24 items.

### 3.6 Artwork Detail Page (`/galerie/[slug]`)

**Purpose:** Full artwork presentation. Contact hook for interested buyers.

**Content:**
- Image gallery: up to 6 images (main + detail shots). Swipeable on mobile.
- Title, technique, dimensions (if provided), year (if provided)
- Description (optional — atelier can add context, story, materials)
- Creator: Atelier / Participant name (if consented)
- Price: displayed prominently if set. If not set: "Preis auf Anfrage"
- **CTA:** "Interesse? Schreib uns auf WhatsApp" + WhatsApp link with pre-filled message including artwork title. Secondary: email link.
- Related works: 3 artworks, same technique

### 3.7 Atelier Page (`/atelier`)

**Purpose:** Build trust and emotional connection. Who are these people, what is this place.

**Sections:**
1. **Hero Statement** — One powerful sentence about the atelier's philosophy
2. **Our Story** — 3–5 paragraphs. Origin, values, approach. Written by the atelier, edited for clarity.
3. **The Space** — Photo essay of the atelier rooms. 4–8 images. No captions needed.
4. **Team** — Instructor cards: photo, name, disciplines, short bio (3–4 sentences)
5. **Contact & Location** — Address, WhatsApp, email, opening hours

### 3.8 Community Canvas (`/canvas`)

**Purpose:** Interactive engagement feature. Visitors draw a small artwork and submit it to a public gallery. Unique differentiator.

**How it works:**
1. Visitor lands on `/canvas`
2. Sees the live community gallery (approved submissions displayed in mosaic)
3. Clicks "Jetzt mitmachen" / "Join now"
4. Drawing tool opens: minimal canvas (approx. 400×400px), brush size selector (3 sizes), color picker limited to the atelier's palette + 6 additional colors, undo button, clear button
5. Visitor adds name (optional) and clicks "Einreichen" / "Submit"
6. Submission saved to Supabase (image as base64 or file upload to Supabase Storage)
7. Submission status: `pending` — not shown publicly until approved
8. Admin approves via Supabase dashboard (simple status toggle). Approved submissions appear in gallery.
9. Gallery updates in real-time (Supabase Realtime subscription)

**Moderation:** All submissions require manual approval before appearing publicly. No automated display of user content. This is non-negotiable for legal/content safety reasons.

**Data stored per submission:**
- Image file (Supabase Storage)
- Submitted name (optional, nullable)
- Timestamp
- Status: `pending` | `approved` | `rejected`
- Language of submission session (DE/EN)

### 3.9 Features Explicitly Deferred to Phase 2

- Newsletter / email list
- Online course booking with payment
- Live camera feed from atelier
- Ambient sound mode
- Map embed on contact section
- Mood-based course finder quiz

---

## 4. Language & Localisation

- **Default language:** German (DE)
- **Second language:** English (EN)
- Language switcher in navigation and footer
- All UI labels, CTAs, error messages, and static copy available in both DE and EN
- All CMS-managed content (courses, artworks, atelier description) must support DE and EN fields. Sanity schema will require both.
- If EN field is empty in CMS, fall back to DE content — never show empty fields
- URL structure: `/kurse` (DE default), `/en/courses` (EN)
- No automatic browser-language detection — user chooses manually via switcher

---

## 5. Design Constraints

- **Color palette:** Crème (#F5F0E8), Linen (#EEEAE2), Vivid Teal (#1A6B6F), Light Teal (#2E9EA4), Ink (#1A1A18), + 4 technique accent colors (Terracotta, Dusty Rose, Sage, Graphite) — see FRONTEND_GUIDELINES.md section 1
- **Typography:** Cormorant Garamond (headlines, serif), DM Sans (body, UI), spaced caps for labels/nav
- **No gradients** except one permitted use in intro animation
- **No stock photography** — all images are real atelier content
- **Animation:** subtle, purposeful, respects `prefers-reduced-motion`
- **Intro animation:** first visit only (LocalStorage flag `atelier_intro_seen`)
- See FRONTEND_GUIDELINES.md for full detail

---

## 6. Performance Requirements

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse SEO | ≥ 95 |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Total page weight (Home) | < 1MB |

Images: WebP format, Next.js `<Image>` component with `sizes` and `priority` attributes where appropriate. No unoptimised images.

---

## 7. Technical Constraints

- Next.js 14 (App Router) — non-negotiable
- TypeScript — non-negotiable
- Tailwind CSS — non-negotiable
- Supabase for Community Canvas data and storage
- Sanity CMS for all editorial content
- Vercel deployment
- See TECH_STACK.md for exact versions and all dependencies

---

## 8. Accessibility Requirements

- WCAG 2.1 AA compliance minimum
- All images have meaningful `alt` text (managed in Sanity CMS fields)
- All interactive elements keyboard-navigable
- Sufficient color contrast: minimum 4.5:1 for body text, 3:1 for large text
- Focus indicators visible at all times
- No motion for users with `prefers-reduced-motion: reduce`
- Language attribute (`lang`) set correctly per page/route

---

## 9. DSGVO / Data Privacy (Swiss & EU)

- Community Canvas: store only image + optional name + timestamp. No email, no IP address stored permanently.
- Cookie banner required if any analytics or third-party scripts used
- WhatsApp links are external — no data captured by the site
- Supabase hosted in EU region (Frankfurt)
- Privacy policy page required at launch (`/datenschutz`, `/en/privacy`)
- Imprint page required at launch (`/impressum`, `/en/imprint`)

---

## 10. Out-of-Scope Clarifications

Any request during development that is not in this document is out of scope for Phase 1. It goes on a Phase 2 list. This document is the contract. Changes require explicit sign-off and may affect timeline.
