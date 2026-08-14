# ENV_TEMPLATE.md — Environment Variables Reference
# Atelier Website

**Version:** 1.0  
**Status:** Approved — Source of Truth  
**References:** TECH_STACK.md §10, BACKEND_STRUCTURE.md §3–4, CLAUDE.md §9

> This file is documentation only. The actual `.env.local` is never committed.  
> Copy `.env.example` to `.env.local` and fill in real values.

---

## 1. Quick Setup Checklist

```
[ ] Created Sanity project → got Project ID
[ ] Created Supabase project (EU Frankfurt) → got URL + keys
[ ] Confirmed atelier WhatsApp number (international format, no +)
[ ] Confirmed atelier contact email
[ ] Confirmed production domain (or using Vercel preview URL initially)
[ ] All values added to .env.local (local dev)
[ ] All values added to Vercel dashboard (production)
```

---

## 2. Complete Variable Reference

### SANITY

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
```
**Where to find:** Sanity dashboard → your project → Settings → API → Project ID  
**Format:** 8-character alphanumeric string, e.g. `abc12345`  
**Exposure:** Browser-safe (`NEXT_PUBLIC_`)  
**Used in:** `lib/sanity/client.ts`

---

```bash
NEXT_PUBLIC_SANITY_DATASET=production
```
**Value:** Always `production` — do not change  
**Exposure:** Browser-safe  
**Used in:** `lib/sanity/client.ts`

---

```bash
SANITY_API_TOKEN=
```
**Where to find:** Sanity dashboard → Settings → API → Tokens → Create token  
**Permission level:** `Editor` (needs to read + write for on-demand revalidation)  
**Format:** Long alphanumeric string starting with `sk`  
**⚠️ Server only.** Never prefix with `NEXT_PUBLIC_`. Never import in client components.  
**Used in:** `app/api/revalidate/route.ts`

---

```bash
SANITY_WEBHOOK_SECRET=
```
**What it is:** A secret string you generate yourself — used to verify Sanity webhook calls  
**How to generate:** `openssl rand -base64 32` in terminal, or any random 32-char string  
**Where to add:** Also add this exact value in Sanity dashboard → API → Webhooks → HTTP Header secret  
**⚠️ Server only.**  
**Used in:** `app/api/revalidate/route.ts`

---

### SUPABASE

```bash
NEXT_PUBLIC_SUPABASE_URL=
```
**Where to find:** Supabase dashboard → your project → Settings → API → Project URL  
**Format:** `https://xxxxxxxxxxx.supabase.co`  
**Exposure:** Browser-safe  
**Used in:** `lib/supabase/client.ts`, `lib/supabase/server.ts`

---

```bash
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
**Where to find:** Supabase dashboard → Settings → API → Project API keys → `anon public`  
**What it does:** Public key — allows browser clients to interact with Supabase within RLS rules  
**Exposure:** Browser-safe (intentionally public, RLS protects data)  
**Used in:** `lib/supabase/client.ts`

---

```bash
SUPABASE_SERVICE_ROLE_KEY=
```
**Where to find:** Supabase dashboard → Settings → API → Project API keys → `service_role secret`  
**What it does:** Bypasses RLS — full admin access to database and storage  
**⚠️ Server only. Most sensitive key in the project.**  
- Never use `NEXT_PUBLIC_` prefix  
- Never import in any client component  
- Never log this value  
- Never commit this value  
**Used in:** `app/api/canvas/submit/route.ts` ONLY

---

### CONTACT

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=
```
**Format:** International format WITHOUT `+` and WITHOUT spaces  
**Example:** `41791234567` (Switzerland: 41 + rest of number without leading 0)  
**NOT:** `+41 79 123 45 67` or `0791234567`  
**Exposure:** Browser-safe  
**Used in:** `lib/utils.ts` → `buildWhatsAppUrl()`, all course and artwork CTAs

---

```bash
NEXT_PUBLIC_CONTACT_EMAIL=
```
**Format:** Plain email address  
**Example:** `hallo@atelier-name.ch`  
**Exposure:** Browser-safe  
**Used in:** `lib/utils.ts` → `buildMailtoUrl()`, contact sections

---

### APP

```bash
NEXT_PUBLIC_SITE_URL=
```
**Format:** Full URL, no trailing slash  
**Local dev:** `http://localhost:3000`  
**Production:** `https://atelier-name.ch`  
**Exposure:** Browser-safe  
**Used in:** SEO metadata, sitemap, Open Graph URLs

---

```bash
NEXT_PUBLIC_DEFAULT_LOCALE=de
```
**Value:** Always `de` — do not change  
**Exposure:** Browser-safe  
**Used in:** i18n configuration, language switcher fallback

---

## 3. .env.example (commit this file)

This is the file committed to the repo — values empty, keys documented:

```bash
# SANITY CMS
# Get from: https://sanity.io/manage → your project → Settings → API
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=           # server-only — Editor permissions
SANITY_WEBHOOK_SECRET=      # server-only — generate with: openssl rand -base64 32

# SUPABASE
# Get from: https://supabase.com/dashboard → your project → Settings → API
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=  # server-only — NEVER expose to browser

# CONTACT (atelier)
NEXT_PUBLIC_WHATSAPP_NUMBER=   # format: 41791234567 (no + no spaces)
NEXT_PUBLIC_CONTACT_EMAIL=

# APP
NEXT_PUBLIC_SITE_URL=          # local: http://localhost:3000 | prod: https://domain.ch
NEXT_PUBLIC_DEFAULT_LOCALE=de
```

---

## 4. Vercel Dashboard Setup

When deploying to production, add all variables to:  
Vercel → your project → Settings → Environment Variables

| Variable | Environment |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Production + Preview |
| `NEXT_PUBLIC_SANITY_DATASET` | Production + Preview |
| `SANITY_API_TOKEN` | Production only |
| `SANITY_WEBHOOK_SECRET` | Production only |
| `NEXT_PUBLIC_SUPABASE_URL` | Production + Preview |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production + Preview |
| `SUPABASE_SERVICE_ROLE_KEY` | Production only |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Production + Preview |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Production + Preview |
| `NEXT_PUBLIC_SITE_URL` | Production only (use Vercel URL for Preview) |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | Production + Preview |

**Preview deployments** use the same Sanity + Supabase projects as production. This is intentional — there is only one dataset and one database. No separate staging environment.

---

## 5. Security Rules (non-negotiable)

1. `.env.local` is in `.gitignore` — never commit it
2. `SANITY_API_TOKEN` — server only, editor permissions minimum
3. `SUPABASE_SERVICE_ROLE_KEY` — server only, used in one file: `app/api/canvas/submit/route.ts`
4. `SANITY_WEBHOOK_SECRET` — server only, rotate if ever exposed
5. No secrets in `NEXT_PUBLIC_` variables — browser bundle is public
6. If any secret is accidentally committed: rotate it immediately in the respective dashboard

---

## 6. Local Development

```bash
# 1. Copy template
cp .env.example .env.local

# 2. Fill in all values (see section 2 for where to find each)
# Open .env.local in editor and fill in each variable

# 3. Start development server
npm run dev

# 4. Verify in browser console that no env var is undefined
# Open DevTools → Console → type: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
# Should return the project ID, not undefined
```

---

## 7. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Sanity returns no data | `NEXT_PUBLIC_SANITY_PROJECT_ID` wrong or empty | Check Sanity dashboard, copy exact value |
| Canvas submit returns 500 | `SUPABASE_SERVICE_ROLE_KEY` missing or wrong | Check Supabase dashboard → service_role key |
| WhatsApp link broken | `NEXT_PUBLIC_WHATSAPP_NUMBER` wrong format | Remove `+`, remove spaces, include country code |
| Realtime gallery not updating | `NEXT_PUBLIC_SUPABASE_URL` or anon key wrong | Check Supabase dashboard → project URL |
| Images not loading | `NEXT_PUBLIC_SANITY_PROJECT_ID` wrong | Sanity CDN URL includes project ID |
| On-demand revalidation fails | `SANITY_WEBHOOK_SECRET` mismatch | Must match exactly what's in Sanity webhook config |
