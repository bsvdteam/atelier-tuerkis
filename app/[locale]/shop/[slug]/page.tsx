import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArtworkDetail } from "@/components/detail/ArtworkDetail";
import { getProduct } from "@/lib/db";
import { getLocalised } from "@/lib/localise";
import type { Locale } from "@/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const artwork = await getProduct(slug);
  return { title: artwork ? getLocalised(artwork.title, locale as Locale) : "Shop" };
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
  return <ArtworkDetail artwork={artwork} locale={locale as Locale} />;
}
