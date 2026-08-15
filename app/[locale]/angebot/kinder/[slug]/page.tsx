import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { CourseDetail } from "@/components/detail/CourseDetail";
import { getCourse } from "@/lib/db";
import { getLocalised } from "@/lib/localise";
import type { Locale } from "@/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const course = await getCourse("kinder", slug);
  return { title: course ? getLocalised(course.title, locale as Locale) : "Kurs" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const course = await getCourse("kinder", slug);
  if (!course) notFound();
  return <CourseDetail course={course} locale={locale as Locale} />;
}
