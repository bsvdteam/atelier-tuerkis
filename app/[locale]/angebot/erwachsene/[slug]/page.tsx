import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { CourseDetail } from "@/components/detail/CourseDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCourse } from "@/lib/db";
import { getLocalised } from "@/lib/localise";
import { alternatesFor, absoluteUrl, ogImageUrl, courseLd, breadcrumbLd } from "@/lib/seo";
import type { Locale } from "@/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const course = await getCourse("erwachsene", slug);
  if (!course) return { title: "Kurs" };
  const title = getLocalised(course.title, locale as Locale);
  const description = getLocalised(course.teaser, locale as Locale);
  const path = `/angebot/erwachsene/${slug}`;
  return {
    title,
    description,
    alternates: alternatesFor(path),
    openGraph: { title, description, url: absoluteUrl(path, locale), type: "website", images: [ogImageUrl(locale)] },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const course = await getCourse("erwachsene", slug);
  if (!course) notFound();
  const loc = locale as Locale;
  const path = `/angebot/erwachsene/${slug}`;
  return (
    <>
      <JsonLd data={[
        courseLd(course, loc, path),
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Angebot", path: "/angebot" },
          { name: "Erwachsene", path: "/angebot/erwachsene" },
          { name: getLocalised(course.title, loc), path },
        ], loc),
      ]} />
      <CourseDetail course={course} locale={loc} />
    </>
  );
}
