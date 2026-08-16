import { createClient } from "@/lib/supabase/server";
import type { Artwork, Course, Localised, TeamMember } from "@/types";

/* Mappt deutsche DB-Strings auf die Localised-Struktur der öffentlichen Komponenten. */
const L = (s: string | null | undefined): Localised => ({ de: s ?? "" });
const Lo = (s: string | null | undefined): Localised | undefined => (s ? { de: s } : undefined);

type Row = Record<string, any>;

function toCourse(r: Row): Course {
  return {
    slug: r.slug,
    audience: r.audience,
    title: L(r.title),
    category: L(r.category),
    teaser: L(r.teaser),
    description: L(r.description),
    takeaway: Lo(r.takeaway),
    price: r.price ?? "",
    priceNote: Lo(r.price_note),
    meta: (r.meta ?? []).map((m: Row) => ({ label: L(m.label), value: L(m.value) })),
    schedule: Lo(r.schedule),
    dates: Array.isArray(r.dates) ? r.dates : [],
    start: Lo(r.start_label),
    availability: Lo(r.availability),
    isNew: r.is_new ?? false,
    instructor: r.instructor_slug ?? undefined,
    instructors: instructorList(r),
    images: Array.isArray(r.images) ? r.images.filter(Boolean) : [],
    faq: (r.faq ?? []).map((f: Row) => ({ q: L(f.q), a: L(f.a) })),
    color: r.color,
    ctaTo: r.cta_to ?? "detail",
  };
}

/** Liest die Kursleitungs-Slugs, mit Fallback auf das alte Einzelfeld. */
function instructorList(r: Row): string[] {
  const many = Array.isArray(r.instructor_slugs) ? r.instructor_slugs.filter(Boolean) : [];
  if (many.length) return many;
  return r.instructor_slug ? [r.instructor_slug] : [];
}

function toArtwork(r: Row): Artwork {
  return {
    slug: r.slug,
    title: L(r.title),
    category: L(r.category),
    group: r.group_name,
    price: r.price ?? "",
    teaser: L(r.teaser),
    description: Lo(r.description),
    story: Lo(r.story),
    specs: (r.specs ?? []).map((s: Row) => ({ label: L(s.label), value: L(s.value) })),
    availability: Lo(r.availability),
    instructor: r.instructor_slug ?? undefined,
    images: Array.isArray(r.images) ? r.images.filter(Boolean) : [],
    color: r.color,
  };
}

function toTeam(r: Row): TeamMember {
  return { slug: r.slug, name: r.name, role: L(r.role), bio: L(r.bio), color: r.color };
}

// ---------------------------------------------------------------- Kurse
export async function getCourses(audience?: Course["audience"]): Promise<Course[]> {
  const supabase = await createClient();
  let q = supabase.from("courses").select("*").eq("is_published", true).order("sort_order");
  if (audience) q = q.eq("audience", audience);
  const { data } = await q;
  return (data ?? []).map(toCourse);
}

export async function getCourse(audience: Course["audience"], slug: string): Promise<Course | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("courses").select("*").eq("audience", audience).eq("slug", slug).maybeSingle();
  return data ? toCourse(data) : null;
}

// ---------------------------------------------------------------- Shop
export async function getProducts(): Promise<Artwork[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("products").select("*").eq("is_published", true).order("sort_order");
  return (data ?? []).map(toArtwork);
}

export async function getProduct(slug: string): Promise<Artwork | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("products").select("*").eq("slug", slug).maybeSingle();
  return data ? toArtwork(data) : null;
}

// ---------------------------------------------------------------- Team
export async function getTeam(): Promise<TeamMember[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("team_members").select("*").eq("is_published", true).order("sort_order");
  return (data ?? []).map(toTeam);
}

export async function getTeamMember(slug?: string): Promise<TeamMember | undefined> {
  if (!slug) return undefined;
  const supabase = await createClient();
  const { data } = await supabase.from("team_members").select("*").eq("slug", slug).maybeSingle();
  return data ? toTeam(data) : undefined;
}

/** Mehrere Team-Mitglieder in der übergebenen Reihenfolge. */
export async function getTeamMembers(slugs?: string[]): Promise<TeamMember[]> {
  const list = (slugs ?? []).filter(Boolean);
  if (!list.length) return [];
  const supabase = await createClient();
  const { data } = await supabase.from("team_members").select("*").in("slug", list);
  const bySlug = new Map((data ?? []).map((r) => [r.slug as string, toTeam(r)]));
  return list.map((s) => bySlug.get(s)).filter(Boolean) as TeamMember[];
}

/** Alle im Admin verwendbaren Optionen (Team + bestehende Kategorien). */
export async function getAdminLookups(): Promise<{
  team: { value: string; label: string; color: string }[];
  courseCategories: string[];
  productCategories: string[];
}> {
  const supabase = await createClient();
  const [team, courses, products] = await Promise.all([
    supabase.from("team_members").select("slug, name, color").order("sort_order"),
    supabase.from("courses").select("category"),
    supabase.from("products").select("category"),
  ]);
  const uniq = (rows: { category: string | null }[] | null) =>
    Array.from(new Set((rows ?? []).map((r) => r.category).filter((c): c is string => Boolean(c)))).sort();
  return {
    team: (team.data ?? []).map((t) => ({ value: t.slug, label: t.name, color: t.color })),
    courseCategories: uniq(courses.data),
    productCategories: uniq(products.data),
  };
}
