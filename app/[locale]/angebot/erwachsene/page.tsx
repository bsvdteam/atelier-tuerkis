import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { CourseFilterList } from "@/components/angebot/CourseFilterList";
import { adultCourses } from "@/content";
import type { Locale } from "@/types";

export const metadata: Metadata = { title: "Kurse für Erwachsene" };

export default async function ErwachsenePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;
  const t = await getTranslations();

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: t("nav.angebot"), href: "/angebot" },
          { label: t("nav.erwachsene") },
        ]}
        eyebrow={t("nav.erwachsene")}
        title={
          <>
            Zeit für <span className="squiggle text-coral">dich</span>
          </>
        }
        lead="Ob Anfängerin oder Geübter — in unseren Erwachsenenkursen findest du Anleitung und Raum für deine eigene Handschrift. Kleine Gruppen, entspannte Atmosphäre."
      />
      <section className="section--tight">
        <div className="container-page">
          <CourseFilterList courses={adultCourses()} locale={locale} />
        </div>
      </section>
    </>
  );
}
