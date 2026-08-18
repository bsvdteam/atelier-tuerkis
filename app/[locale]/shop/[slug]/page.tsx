import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArtworkDetail } from "@/components/detail/ArtworkDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProduct } from "@/lib/db";
import { getLocalised } from "@/lib/localise";
import { alternatesFor, absoluteUrl, ogImageUrl, productLd, breadcrumbLd } from "@/lib/seo";
import type { Locale } from "@/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const artwork = await getProduct(slug);
  if (!artwork) return { title: "Shop" };
  const title = getLocalised(artwork.title, locale as Locale);
  const description = getLocalised(artwork.teaser, locale as Locale);
  const path = `/shop/${slug}`;
  return {
    title,
    description,
    alternates: alternatesFor(path),
    openGraph: {
      title, description, url: absoluteUrl(path, locale), type: "website",
      images: [artwork.images && artwork.images.length ? artwork.images[0] : ogImageUrl(locale)],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const artwork = await getProduct(slug);
  if (!artwork) notFound();
  const loc = locale as Locale;
  const path = `/shop/${slug}`;
  return (
    <>
      <JsonLd data={[
        productLd(artwork, loc, path),
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
          { name: getLocalised(artwork.title, loc), path },
        ], loc),
      ]} />
      <ArtworkDetail artwork={artwork} locale={loc} />
    </>
  );
}
