/**
 * Seed: lädt die aktuellen content/*.ts-Daten in die Supabase-DB.
 * Aufruf (env aus .env.local):
 *   set -a; source .env.local; set +a; npx tsx scripts/seed.ts
 */
import { createClient } from "@supabase/supabase-js";
import { COURSES } from "../content/courses";
import { ARTWORKS } from "../content/artworks";
import { TEAM } from "../content/team";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
if (!url || !key) {
  console.error("NEXT_PUBLIC_SUPABASE_URL oder SUPABASE_SERVICE_ROLE_KEY fehlt in .env.local");
  process.exit(1);
}
const db = createClient(url, key, { auth: { persistSession: false } });

const de = (v?: { de: string }) => v?.de ?? null;

const courseRows = COURSES.map((c, i) => ({
  slug: c.slug,
  audience: c.audience,
  title: c.title.de,
  category: de(c.category),
  teaser: de(c.teaser),
  description: de(c.description),
  takeaway: de(c.takeaway),
  price: c.price,
  price_note: de(c.priceNote),
  schedule: de(c.schedule),
  start_label: de(c.start),
  availability: de(c.availability),
  is_new: c.isNew ?? false,
  instructor_slug: c.instructor ?? null,
  color: c.color,
  meta: c.meta.map((m) => ({ label: m.label.de, value: m.value.de })),
  faq: (c.faq ?? []).map((f) => ({ q: f.q.de, a: f.a.de })),
  cta_to: c.ctaTo ?? "detail",
  sort_order: i,
}));

const productRows = ARTWORKS.map((a, i) => ({
  slug: a.slug,
  title: a.title.de,
  category: de(a.category),
  group_name: a.group,
  price: a.price,
  teaser: de(a.teaser),
  description: de(a.description),
  story: de(a.story),
  specs: (a.specs ?? []).map((s) => ({ label: s.label.de, value: s.value.de })),
  availability: de(a.availability),
  instructor_slug: a.instructor ?? null,
  color: a.color,
  sort_order: i,
}));

const teamRows = TEAM.map((m, i) => ({
  slug: m.slug,
  name: m.name,
  role: de(m.role),
  bio: de(m.bio),
  color: m.color,
  sort_order: i,
}));

async function run() {
  console.log(`Seed: ${courseRows.length} Kurse, ${productRows.length} Produkte, ${teamRows.length} Team`);
  const c = await db.from("courses").upsert(courseRows, { onConflict: "slug" });
  if (c.error) throw c.error;
  const p = await db.from("products").upsert(productRows, { onConflict: "slug" });
  if (p.error) throw p.error;
  const t = await db.from("team_members").upsert(teamRows, { onConflict: "slug" });
  if (t.error) throw t.error;
  console.log("✅ Seed abgeschlossen.");
}

run().catch((e) => {
  console.error("❌ Seed-Fehler:", e.message ?? e);
  process.exit(1);
});
