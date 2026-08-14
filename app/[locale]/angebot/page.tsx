import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { CourseCard } from "@/components/ui/CourseCard";
import { featuredCourses } from "@/content";
import { cn } from "@/lib/utils";
import type { Locale, PlaceholderColor } from "@/types";

export const metadata: Metadata = { title: "Angebot" };

export default async function AngebotPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;
  const t = await getTranslations();
  const courses = featuredCourses();

  const pillars: {
    href: string;
    title: string;
    text: string;
    color: PlaceholderColor;
  }[] = [
    { href: "/angebot/erwachsene", title: t("nav.erwachsene"), text: "Malen, Zeichnen, Lettering, Nähen und mehr — in kleinen Gruppen.", color: "teal" },
    { href: "/angebot/kinder", title: t("nav.kinder"), text: "Kreativwerkstatt, Samstags- und Ferienkurse für kleine Künstler:innen.", color: "coral" },
    { href: "/angebot/gruppen", title: t("nav.gruppen"), text: "Firmen, Vereine, Freundesrunden oder Geburtstage — kreativ zusammen.", color: "yellow" },
    { href: "/angebot/raeume", title: t("nav.raeume"), text: "Miete unsere helle Werkstatt für deine eigenen Projekte.", color: "violet" },
    { href: "/angebot/facherl", title: t("nav.facherl"), text: "Bald mehr — schau bald wieder vorbei.", color: "green" },
  ];

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: t("nav.angebot") }]}
        eyebrow={t("nav.angebot")}
        title={
          <>
            Für alle, die gern <span className="squiggle text-teal-deep">machen</span>
          </>
        }
        lead="Ob zum ersten Mal oder mit Übung — such dir aus, worauf du Lust hast. Wir kümmern uns um Material und Anleitung."
      />

      {/* Säulen */}
      <section className="section--tight">
        <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <Link key={p.href} href={p.href} className="card card--hover group flex flex-col">
              <div className={cn("ph h-32 rounded-2xl", `ph--${p.color}`)} />
              <h2 className="mt-4 font-display text-2xl text-ink">{p.title}</h2>
              <p className="mt-1 flex-1 text-ink-soft">{p.text}</p>
              <span className="mt-4 inline-flex items-center gap-1 font-bold text-teal-deep">
                {t("common.mehrErfahren")} <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Aktuelle Kurse */}
      <section className="section">
        <div className="container-page">
          <span className="eyebrow">{t("home.coursesEyebrow")}</span>
          <h2 className="h2 mt-3">{t("home.coursesTitle")}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <CourseCard key={c.slug} course={c} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
