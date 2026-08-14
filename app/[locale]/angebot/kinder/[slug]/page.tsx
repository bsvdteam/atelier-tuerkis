import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { CourseDetail } from "@/components/detail/CourseDetail";
import { kidsCourses, courseBySlug } from "@/content";
import { getLocalised } from "@/lib/localise";
import type { Locale } from "@/types";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    kidsCourses().map((c) => ({ locale, slug: c.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const course = courseBySlug("kinder", slug);
  return { title: course ? getLocalised(course.title, locale as Locale) : "Kurs" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const course = courseBySlug("kinder", slug);
  if (!course) notFound();
  return <CourseDetail course={course} locale={locale as Locale} />;
}
