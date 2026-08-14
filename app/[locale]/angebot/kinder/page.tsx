import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { CourseCard } from "@/components/ui/CourseCard";
import { kidsCourses } from "@/content";
import type { Locale } from "@/types";

export const metadata: Metadata = { title: "Kinderangebote" };

export default async function KinderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;
  const t = await getTranslations();

  return (
    <div className="theme-kids">
      <PageHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: t("nav.angebot"), href: "/angebot" },
          { label: t("nav.kinder") },
        ]}
        eyebrow={t("nav.kinder")}
        title={
          <>
            Hier dürfen Kinder <span className="squiggle text-coral">einfach machen</span>
          </>
        }
        lead="Malen, basteln, matschen, staunen. Wir geben Anregung, Material und Zeit — und freuen uns über alles, was daraus entsteht."
      />
      <section className="section--tight">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {kidsCourses().map((c) => (
            <CourseCard key={c.slug} course={c} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
}
