import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ArtworkDetail } from "@/components/detail/ArtworkDetail";
import { ARTWORKS, artworkBySlug } from "@/content";
import { getLocalised } from "@/lib/localise";
import type { Locale } from "@/types";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    ARTWORKS.map((a) => ({ locale, slug: a.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const artwork = artworkBySlug(slug);
  return { title: artwork ? getLocalised(artwork.title, locale as Locale) : "Shop" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const artwork = artworkBySlug(slug);
  if (!artwork) notFound();
  return <ArtworkDetail artwork={artwork} locale={locale as Locale} />;
}
