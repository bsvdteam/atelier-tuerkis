# BACKEND_STRUCTURE.md — Backend Architecture & Data Structure
# Atelier Website

**Version:** 1.0  
**Status:** Approved — Source of Truth  
**Last Updated:** 2025  
**References:** PRD.md, TECH_STACK.md

> **RULE FOR ALL AGENTS:** All data structures are defined here. Do not add columns, fields, or schemas not listed. If a new field is needed, flag it explicitly — do not add it autonomously.

---

## 1. Architecture Overview

The backend splits into two distinct systems with distinct responsibilities:

| System | Purpose | Who manages |
|---|---|---|
| **Sanity CMS** | All editorial content (courses, artworks, team, atelier page) | Atelier staff via Sanity Studio |
| **Supabase** | Community Canvas submissions, image storage, real-time gallery | Automated (user submissions) + admin approval |

These two systems do NOT share data. Sanity content is never written to Supabase. Supabase data (canvas submissions) is never synced to Sanity.

---

## 2. Sanity CMS — Content Schemas

Sanity Studio runs at `/studio` in the Next.js app. All schemas live in `/sanity/schemas/`.

### 2.1 Course Schema (`course.ts`)

```ts
{
  name: 'course',
  title: 'Kurs / Course',
  type: 'document',
  fields: [
    // Identification
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title.de' }, validation: required },
    { name: 'publishedAt', type: 'datetime', title: 'Veröffentlichungsdatum' },
    { name: 'isActive', type: 'boolean', title: 'Aktiv (auf Website sichtbar)', initialValue: true },

    // Localised title
    {
      name: 'title',
      type: 'object',
      title: 'Titel',
      fields: [
        { name: 'de', type: 'string', title: 'Titel (Deutsch)', validation: required },
        { name: 'en', type: 'string', title: 'Title (English)' },
      ]
    },

    // Localised description
    {
      name: 'description',
      type: 'object',
      title: 'Beschreibung',
      fields: [
        { name: 'de', type: 'array', of: [{ type: 'block' }], title: 'Beschreibung (Deutsch)', validation: required },
        { name: 'en', type: 'array', of: [{ type: 'block' }], title: 'Description (English)' },
      ]
    },

    // Classification
    {
      name: 'technique',
      type: 'string',
      title: 'Technik',
      options: {
        list: [
          { title: 'Aquarell', value: 'aquarell' },
          { title: 'Acryl', value: 'acryl' },
          { title: 'Zeichnen & Illustration', value: 'zeichnen' },
          { title: 'Keramik', value: 'keramik' },
        ]
      },
      validation: required
    },
    {
      name: 'audience',
      type: 'string',
      title: 'Zielgruppe',
      options: {
        list: [
          { title: 'Erwachsene', value: 'adults' },
          { title: 'Kinder & Jugendliche', value: 'children' },
          { title: 'Alle', value: 'all' },
        ]
      },
      validation: required
    },
    {
      name: 'level',
      type: 'string',
      title: 'Niveau',
      options: {
        list: [
          { title: 'Anfänger', value: 'beginner' },
          { title: 'Fortgeschritten', value: 'intermediate' },
          { title: 'Alle Niveaus', value: 'all' },
        ]
      },
      validation: required
    },

    // Schedule
    {
      name: 'schedule',
      type: 'object',
      title: 'Kurszeiten',
      fields: [
        { name: 'days', type: 'string', title: 'Tage (z.B. "Di & Do" oder "Samstag")' },
        { name: 'time', type: 'string', title: 'Uhrzeit (z.B. "18:00–20:00")' },
        { name: 'duration', type: 'string', title: 'Dauer pro Einheit (z.B. "2 Stunden")' },
        { name: 'totalSessions', type: 'number', title: 'Anzahl Einheiten (0 = unbegrenzt/fortlaufend)' },
        { name: 'startDate', type: 'date', title: 'Startdatum (optional)' },
        { name: 'endDate', type: 'date', title: 'Enddatum (optional)' },
      ]
    },

    // Pricing
    { name: 'price', type: 'number', title: 'Preis (CHF) — leer lassen wenn auf Anfrage' },
    { name: 'priceNote', type: 'string', title: 'Preishinweis (z.B. "inkl. Material")' },

    // Materials
    {
      name: 'materials',
      type: 'object',
      title: 'Material',
      fields: [
        { name: 'provided', type: 'string', title: 'Was wird gestellt' },
        { name: 'toBring', type: 'string', title: 'Was mitgebracht werden muss' },
      ]
    },

    // Instructor (optional reference)
    { name: 'instructor', type: 'reference', to: [{ type: 'teamMember' }], title: 'Kursleitung (optional)' },

    // Images
    {
      name: 'images',
      type: 'array',
      title: 'Bilder',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          { name: 'alt', type: 'object', fields: [
            { name: 'de', type: 'string', title: 'Alt-Text (Deutsch)', validation: required },
            { name: 'en', type: 'string', title: 'Alt-Text (English)' },
          ]},
          { name: 'caption', type: 'string', title: 'Bildunterschrift (optional)' },
        ]
      }],
      validation: min(1)  // at least one image required
    },

    // SEO
    {
      name: 'seo',
      type: 'object',
      title: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'object', fields: [
          { name: 'de', type: 'string', title: 'Meta Titel (Deutsch)' },
          { name: 'en', type: 'string', title: 'Meta Title (English)' },
        ]},
        { name: 'metaDescription', type: 'object', fields: [
          { name: 'de', type: 'string', title: 'Meta Beschreibung (Deutsch)' },
          { name: 'en', type: 'string', title: 'Meta Description (English)' },
        ]},
      ]
    },
  ],

  preview: {
    select: { title: 'title.de', technique: 'technique', active: 'isActive' },
    prepare: ({ title, technique, active }) => ({
      title,
      subtitle: `${technique} — ${active ? 'aktiv' : 'inaktiv'}`
    })
  }
}
```

### 2.2 Artwork Schema (`artwork.ts`)

```ts
{
  name: 'artwork',
  title: 'Kunstwerk / Artwork',
  type: 'document',
  fields: [
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title.de' }, validation: required },
    { name: 'isVisible', type: 'boolean', title: 'Sichtbar auf Website', initialValue: true },

    { name: 'title', type: 'object', fields: [
      { name: 'de', type: 'string', title: 'Titel (Deutsch)', validation: required },
      { name: 'en', type: 'string', title: 'Title (English)' },
    ]},

    { name: 'description', type: 'object', fields: [
      { name: 'de', type: 'array', of: [{ type: 'block' }], title: 'Beschreibung (Deutsch)' },
      { name: 'en', type: 'array', of: [{ type: 'block' }], title: 'Description (English)' },
    ]},

    {
      name: 'technique',
      type: 'string',
      options: {
        list: [
          { title: 'Aquarell', value: 'aquarell' },
          { title: 'Acryl', value: 'acryl' },
          { title: 'Zeichnen & Illustration', value: 'zeichnen' },
          { title: 'Keramik', value: 'keramik' },
        ]
      },
      validation: required
    },

    {
      name: 'creatorType',
      type: 'string',
      title: 'Erstellt von',
      options: {
        list: [
          { title: 'Atelier', value: 'atelier' },
          { title: 'Kursteilnehmer/in', value: 'participant' },
        ]
      },
      validation: required
    },

    { name: 'creatorName', type: 'string', title: 'Name der/des Teilnehmerin/Teilnehmers (nur wenn Zustimmung)' },

    // Physical details
    { name: 'year', type: 'number', title: 'Jahr (optional)' },
    { name: 'dimensions', type: 'string', title: 'Masse (z.B. "40 × 60 cm") (optional)' },

    // Pricing
    { name: 'price', type: 'number', title: 'Preis in CHF (leer = Preis auf Anfrage)' },
    { name: 'isSold', type: 'boolean', title: 'Verkauft', initialValue: false },

    // Images (multiple — first is primary)
    {
      name: 'images',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          { name: 'alt', type: 'object', fields: [
            { name: 'de', type: 'string', title: 'Alt-Text (Deutsch)', validation: required },
            { name: 'en', type: 'string', title: 'Alt-Text (English)' },
          ]},
        ]
      }],
      validation: min(1)
    },
  ]
}
```

### 2.3 Team Member Schema (`teamMember.ts`)

```ts
{
  name: 'teamMember',
  title: 'Teammitglied',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', title: 'Name', validation: required },
    { name: 'role', type: 'object', fields: [
      { name: 'de', type: 'string', title: 'Rolle (Deutsch)', validation: required },
      { name: 'en', type: 'string', title: 'Role (English)' },
    ]},
    { name: 'bio', type: 'object', fields: [
      { name: 'de', type: 'array', of: [{ type: 'block' }], title: 'Bio (Deutsch)', validation: required },
      { name: 'en', type: 'array', of: [{ type: 'block' }], title: 'Bio (English)' },
    ]},
    { name: 'disciplines', type: 'array', of: [{ type: 'string' }], title: 'Disziplinen' },
    { name: 'photo', type: 'image', options: { hotspot: true }, fields: [
      { name: 'alt', type: 'string', title: 'Alt-Text', validation: required },
    ]},
    { name: 'order', type: 'number', title: 'Reihenfolge', initialValue: 0 },
  ]
}
```

### 2.4 Atelier Page Schema (`atelierPage.ts`)

Single document (singleton) — not a list, one instance only.

```ts
{
  name: 'atelierPage',
  title: 'Atelier-Seite',
  type: 'document',
  __experimental_actions: ['update', 'publish'],  // no create/delete — singleton
  fields: [
    { name: 'heroStatement', type: 'object', fields: [
      { name: 'de', type: 'string', title: 'Hero-Statement (Deutsch)', validation: required },
      { name: 'en', type: 'string', title: 'Hero Statement (English)' },
    ]},
    { name: 'story', type: 'object', fields: [
      { name: 'de', type: 'array', of: [{ type: 'block' }], title: 'Geschichte (Deutsch)', validation: required },
      { name: 'en', type: 'array', of: [{ type: 'block' }], title: 'Story (English)' },
    ]},
    { name: 'spaceImages', type: 'array', of: [{
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'object', fields: [
        { name: 'de', type: 'string', validation: required },
        { name: 'en', type: 'string' },
      ]}]
    }], validation: min(4).max(8) },
    { name: 'address', type: 'text', title: 'Adresse' },
    { name: 'openingHours', type: 'object', fields: [
      { name: 'de', type: 'text', title: 'Öffnungszeiten (Deutsch)' },
      { name: 'en', type: 'text', title: 'Opening Hours (English)' },
    ]},
  ]
}
```

---

## 3. Sanity GROQ Queries

All queries live in `/sanity/queries/`. Never write GROQ inline in components.

### 3.1 Get All Active Courses

```groq
// getAllCourses
*[_type == "course" && isActive == true] | order(publishedAt desc) {
  slug,
  title,
  technique,
  audience,
  level,
  "schedule": schedule { days, time },
  price,
  "image": images[0] { asset->{ url }, alt },
}
```

### 3.2 Get Course by Slug

```groq
// getCourseBySlug (params: { slug: string })
*[_type == "course" && slug.current == $slug && isActive == true][0] {
  slug,
  title,
  description,
  technique,
  audience,
  level,
  schedule,
  price,
  priceNote,
  materials,
  "instructor": instructor-> { name, role, photo { asset->{ url }, alt }, bio },
  "images": images[] { asset->{ url, metadata { lqip, dimensions } }, alt },
  seo,
}
```

### 3.3 Get All Visible Artworks

```groq
// getAllArtworks (params: { limit: number, offset: number })
*[_type == "artwork" && isVisible == true && isSold != true] | order(_createdAt desc) [$offset...$offset + $limit] {
  slug,
  title,
  technique,
  creatorType,
  creatorName,
  price,
  "image": images[0] { asset->{ url, metadata { lqip, dimensions } }, alt },
}
```

### 3.4 Get Artwork by Slug

```groq
// getArtworkBySlug (params: { slug: string })
*[_type == "artwork" && slug.current == $slug && isVisible == true][0] {
  slug,
  title,
  description,
  technique,
  creatorType,
  creatorName,
  year,
  dimensions,
  price,
  isSold,
  "images": images[] { asset->{ url, metadata { lqip, dimensions } }, alt },
}
```

### 3.5 Get Related Artworks

```groq
// getRelatedArtworks (params: { technique: string, currentSlug: string })
*[_type == "artwork" && isVisible == true && technique == $technique && slug.current != $currentSlug][0...3] {
  slug,
  title,
  "image": images[0] { asset->{ url }, alt },
}
```

### 3.6 Get Team Members

```groq
// getAllTeamMembers
*[_type == "teamMember"] | order(order asc) {
  name,
  role,
  bio,
  disciplines,
  "photo": photo { asset->{ url }, alt },
}
```

### 3.7 Get Atelier Page

```groq
// getAtelierPage
*[_type == "atelierPage"][0] {
  heroStatement,
  story,
  "spaceImages": spaceImages[] { asset->{ url, metadata { lqip, dimensions } }, alt },
  address,
  openingHours,
}
```

---

## 4. Supabase — Database Schema

### 4.1 Table: `canvas_submissions`

```sql
CREATE TABLE canvas_submissions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  image_path  TEXT NOT NULL,           -- Supabase Storage path: canvas/{id}.webp
  image_url   TEXT NOT NULL,           -- Public URL from Supabase Storage
  name        TEXT,                    -- Optional. NULL if not provided.
  status      TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending', 'approved', 'rejected')),
  locale      TEXT NOT NULL DEFAULT 'de'
                CHECK (locale IN ('de', 'en'))
);
```

**Indexes:**
```sql
CREATE INDEX idx_canvas_status ON canvas_submissions(status);
CREATE INDEX idx_canvas_created ON canvas_submissions(created_at DESC);
```

**No other tables.** Supabase has exactly one table in this project.

### 4.2 Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE canvas_submissions ENABLE ROW LEVEL SECURITY;

-- Public can INSERT only (submit their own artwork)
CREATE POLICY "Allow public insert" ON canvas_submissions
  FOR INSERT TO anon
  WITH CHECK (true);

-- Public can SELECT only approved submissions
CREATE POLICY "Allow public read approved" ON canvas_submissions
  FOR SELECT TO anon
  USING (status = 'approved');

-- Service role (used by admin/server) can do everything
-- Handled by service_role key — no explicit policy needed
```

### 4.3 Supabase Storage

**Bucket name:** `canvas`  
**Access:** Public read (approved images are served publicly)  
**Bucket policy:** Public bucket — anyone can read. Only server-side uploads (via service role key).

**File naming convention:**
```
canvas/{submission_uuid}.webp
```

Example: `canvas/550e8400-e29b-41d4-a716-446655440000.webp`

**Max file size:** 2MB per upload (enforced client-side before upload + Supabase storage policy)  
**Accepted format:** Only WebP (converted client-side from canvas blob using `canvas.toBlob('image/webp', 0.85)`)

### 4.4 Supabase Realtime

Realtime subscription on the `/canvas` page:

```ts
supabase
  .channel('canvas_gallery')
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'canvas_submissions',
      filter: 'status=eq.approved'
    },
    (payload) => {
      // Add new approved submission to gallery state
      addToGallery(payload.new)
    }
  )
  .subscribe()
```

---

## 5. API Routes

The only server API route in this project:

### 5.1 POST `/api/canvas/submit`

**Purpose:** Receive canvas image + optional name, upload to Supabase Storage, create DB record.

**Request:**
```ts
// Content-Type: multipart/form-data
{
  image: File   // WebP blob from canvas
  name?: string // Optional, max 50 chars
  locale: 'de' | 'en'
}
```

**Validation (server-side):**
- `image` must exist
- `image` size ≤ 2MB
- `image` type must be `image/webp`
- `name` if provided: max 50 characters, strip HTML/XSS
- `locale` must be 'de' or 'en'

**Process:**
1. Validate input
2. Generate UUID for submission
3. Upload image to Supabase Storage: `canvas/${uuid}.webp` using service role key
4. Get public URL from Storage
5. Insert record to `canvas_submissions`: `{ image_path, image_url, name, locale, status: 'pending' }`
6. Return success response

**Response (success):**
```json
{ "success": true, "id": "uuid" }
```

**Response (error):**
```json
{ "success": false, "error": "VALIDATION_ERROR" | "UPLOAD_ERROR" | "DB_ERROR" }
```

**Rate limiting:** Max 3 submissions per IP per hour. Implemented via Vercel Edge middleware.  
**No authentication required** — public endpoint.  
**Uses `SUPABASE_SERVICE_ROLE_KEY`** — server-side only, never exposed to client.

---

## 6. Data Fetching Strategy

| Data | Strategy | Why |
|---|---|---|
| Course list | ISR, revalidate: 3600 (1hr) | Changes infrequently, needs SEO |
| Course detail | ISR, revalidate: 3600 (1hr) | Same as above |
| Artwork list | ISR, revalidate: 3600 (1hr) | Same as above |
| Artwork detail | ISR, revalidate: 3600 (1hr) | Same as above |
| Atelier page | ISR, revalidate: 86400 (24hr) | Very rarely changes |
| Team members | ISR, revalidate: 86400 (24hr) | Very rarely changes |
| Canvas gallery | Client-side fetch on mount + Realtime | Needs real-time updates |

**On-demand revalidation:** Sanity webhook triggers Next.js revalidation on content publish. Configure in Sanity project settings → API → Webhooks → POST to `/api/revalidate` (Next.js route handler).

---

## 7. TypeScript Types

All types defined in `/types/index.ts`.

```ts
// Localised string
export type LocalisedString = { de: string; en?: string }
export type LocalisedText = { de: any[]; en?: any[] }  // Sanity block content

// Course
export type Course = {
  slug: { current: string }
  title: LocalisedString
  description: LocalisedText
  technique: 'aquarell' | 'acryl' | 'zeichnen' | 'keramik'
  audience: 'adults' | 'children' | 'all'
  level: 'beginner' | 'intermediate' | 'all'
  schedule: {
    days: string
    time: string
    duration: string
    totalSessions: number
    startDate?: string
    endDate?: string
  }
  price?: number
  priceNote?: string
  materials?: { provided: string; toBring: string }
  instructor?: TeamMember
  images: SanityImage[]
  seo?: {
    metaTitle?: LocalisedString
    metaDescription?: LocalisedString
  }
}

// Artwork
export type Artwork = {
  slug: { current: string }
  title: LocalisedString
  description?: LocalisedText
  technique: 'aquarell' | 'acryl' | 'zeichnen' | 'keramik'
  creatorType: 'atelier' | 'participant'
  creatorName?: string
  year?: number
  dimensions?: string
  price?: number
  isSold?: boolean
  images: SanityImage[]
}

// Team Member
export type TeamMember = {
  name: string
  role: LocalisedString
  bio: LocalisedText
  disciplines: string[]
  photo: SanityImage
}

// Sanity Image
export type SanityImage = {
  asset: { url: string; metadata?: { lqip: string; dimensions: { width: number; height: number } } }
  alt: LocalisedString
}

// Canvas Submission (from Supabase)
export type CanvasSubmission = {
  id: string
  created_at: string
  image_url: string
  name: string | null
  status: 'pending' | 'approved' | 'rejected'
  locale: 'de' | 'en'
}
```
