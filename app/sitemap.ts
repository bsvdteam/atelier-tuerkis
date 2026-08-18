import type { MetadataRoute } from "next";
import { getCourses, getProducts } from "@/lib/db";
import { absoluteUrl } from "@/lib/seo";

/** Ein Eintrag mit DE als Haupt-URL und EN als hreflang-Alternative. */
function entry(path: string, opts: { priority?: number; changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"] } = {}): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path, "de"),
    lastModified: new Date(),
    changeFrequency: opts.changeFrequency ?? "weekly",
    priority: opts.priority ?? 0.7,
    alternates: {
      languages: {
        de: absoluteUrl(path, "de"),
        en: absoluteUrl(path, "en"),
      },
    },
  };
}

const STATIC_PATHS: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/atelier", priority: 0.8 },
  { path: "/galerie", priority: 0.7 },
  { path: "/angebot", priority: 0.9 },
  { path: "/angebot/erwachsene", priority: 0.9 },
  { path: "/angebot/kinder", priority: 0.9 },
  { path: "/angebot/gruppen", priority: 0.7 },
  { path: "/angebot/raeume", priority: 0.6 },
  { path: "/angebot/facherl", priority: 0.6 },
  { path: "/shop", priority: 0.8 },
  { path: "/kontakt", priority: 0.7 },
  { path: "/faq", priority: 0.5 },
  { path: "/gutscheine", priority: 0.6 },
  { path: "/impressum", priority: 0.2 },
  { path: "/datenschutz", priority: 0.2 },
  { path: "/agb", priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [courses, products] = await Promise.all([getCourses(), getProducts()]);

  const staticEntries = STATIC_PATHS.map((p) => entry(p.path, { priority: p.priority }));
  const courseEntries = courses.map((c) => entry(`/angebot/${c.audience}/${c.slug}`, { priority: 0.8 }));
  const productEntries = products.map((p) => entry(`/shop/${p.slug}`, { priority: 0.6 }));

  return [...staticEntries, ...courseEntries, ...productEntries];
}
