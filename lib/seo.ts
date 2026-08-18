import { SITE } from "./site";
import type { Artwork, Course, FaqItem, Locale } from "@/types";
import { getLocalised } from "./localise";

export const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || SITE.url).replace(/\/$/, "");

/** Sprach-Pfad: DE ohne Präfix, EN mit /en (localePrefix "as-needed"). */
export function localizedPath(path: string, locale: string): string {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return locale === "de" ? clean || "/" : `/en${clean}`;
}

export function absoluteUrl(path: string, locale: string = "de"): string {
  const p = localizedPath(path, locale);
  return `${BASE_URL}${p === "/" ? "/" : p}`;
}

/** URL des generierten OG-Bilds (DE ohne Präfix, EN mit /en – wie die Route aufgelöst wird). */
export function ogImageUrl(locale: string = "de"): string {
  return locale === "de" ? `${BASE_URL}/opengraph-image` : `${BASE_URL}/${locale}/opengraph-image`;
}

/** canonical + hreflang für Next-Metadata. `path` ohne Locale-Präfix, mit führendem „/". */
export function alternatesFor(path: string) {
  return {
    canonical: absoluteUrl(path, "de"),
    languages: {
      "de-CH": absoluteUrl(path, "de"),
      en: absoluteUrl(path, "en"),
      "x-default": absoluteUrl(path, "de"),
    },
  };
}

function parsePrice(p?: string): string | undefined {
  if (!p) return undefined;
  const m = p.replace(/['’]/g, "").match(/(\d+(?:[.,]\d+)?)/);
  return m ? m[1].replace(",", ".") : undefined;
}

/* ----------------------------------------------------- JSON-LD Bausteine */

/** Das Atelier als lokales Geschäft — Basis für lokale Google-Sichtbarkeit. */
export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#business`,
    name: SITE.name,
    description: SITE.tagline.de,
    url: BASE_URL,
    email: SITE.email,
    telephone: SITE.phone,
    image: `${BASE_URL}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      postalCode: "9113",
      addressLocality: "Degersheim",
      addressRegion: "St. Gallen",
      addressCountry: "CH",
    },
    geo: { "@type": "GeoCoordinates", latitude: 47.3866, longitude: 9.1969 },
    areaServed: "Degersheim, Toggenburg, St. Gallen",
    priceRange: "CHF",
    sameAs: [SITE.instagram.url],
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "13:00" },
    ],
  };
}

export function courseLd(course: Course, locale: Locale, path: string) {
  const price = parsePrice(course.price);
  const url = absoluteUrl(path, locale);
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: getLocalised(course.title, locale),
    description: getLocalised(course.teaser, locale),
    url,
    provider: { "@type": "Organization", name: SITE.name, url: BASE_URL },
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            price,
            priceCurrency: "CHF",
            url,
            availability: "https://schema.org/InStock",
            category: course.audience === "kinder" ? "Kinderkurs" : "Erwachsenenkurs",
          },
        }
      : {}),
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      ...(course.dates && course.dates.length ? { startDate: course.dates[0] } : {}),
      location: {
        "@type": "Place",
        name: SITE.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.address.street,
          postalCode: "9113",
          addressLocality: "Degersheim",
          addressCountry: "CH",
        },
      },
    },
  };
}

export function productLd(artwork: Artwork, locale: Locale, path: string) {
  const price = parsePrice(artwork.price);
  const url = absoluteUrl(path, locale);
  const image = artwork.images && artwork.images.length ? artwork.images[0] : `${BASE_URL}/opengraph-image`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: getLocalised(artwork.title, locale),
    description: getLocalised(artwork.teaser, locale),
    image,
    category: getLocalised(artwork.category, locale),
    url,
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            price,
            priceCurrency: "CHF",
            url,
            availability: "https://schema.org/InStock",
            seller: { "@type": "Organization", name: SITE.name },
          },
        }
      : {}),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path, locale),
    })),
  };
}

export function faqLd(items: FaqItem[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: getLocalised(f.q, locale),
      acceptedAnswer: { "@type": "Answer", text: getLocalised(f.a, locale) },
    })),
  };
}
