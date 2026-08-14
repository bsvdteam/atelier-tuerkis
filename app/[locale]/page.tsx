import { setRequestLocale } from "next-intl/server";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { CourseCard } from "@/components/ui/CourseCard";
import { Testimonials } from "@/components/home/Testimonials";
import { featuredCourses, TESTIMONIALS } from "@/content";
import type { Locale, PlaceholderColor } from "@/types";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Home />;
}

function Home() {
  const t = useTranslations("home");
  const tt = useTranslations("technique");
  const locale = useLocale() as Locale;
  const courses = featuredCourses();

  const stats: { value: string; label: { de: string; en: string } }[] = [
    { value: "12", label: { de: "Jahre Erfahrung", en: "years of experience" } },
    { value: "40+", label: { de: "Kurse & Workshops", en: "courses & workshops" } },
    { value: "2000+", label: { de: "Teilnehmende", en: "participants" } },
    { value: "4.9★", label: { de: "auf Google", en: "on Google" } },
  ];

  const techniques: { label: string; href: string; color: PlaceholderColor }[] = [
    { label: tt("malen"), href: "/angebot/erwachsene", color: "teal" },
    { label: tt("zeichnen"), href: "/angebot/erwachsene", color: "violet" },
    { label: tt("papier"), href: "/angebot/erwachsene", color: "coral" },
    { label: tt("textil"), href: "/angebot/erwachsene", color: "green" },
    { label: tt("experimentell"), href: "/angebot/erwachsene", color: "sky" },
    { label: tt("kinder"), href: "/angebot/kinder", color: "yellow" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="section--tight pt-10 sm:pt-16">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="eyebrow">{t("heroEyebrow")}</span>
            <h1 className="display mt-4">{t("heroTitle")}</h1>
            <p className="lead mt-5 max-w-xl">{t("heroLead")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/angebot" className="btn btn--primary btn--lg">
                {t("heroCtaCourses")}
                <ArrowRight size={18} />
              </Link>
              <Link href="/atelier" className="btn btn--ghost btn--lg">
                {t("heroCtaAtelier")}
              </Link>
            </div>
          </div>

          {/* Deko */}
          <div className="relative hidden gap-4 lg:grid lg:grid-cols-2">
            <div className="ph ph--teal aspect-[3/4] rounded-[28px]" />
            <div className="mt-10 grid gap-4">
              <div className="ph ph--coral aspect-square rounded-[28px]" />
              <div className="ph ph--yellow aspect-[4/3] rounded-[28px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section--tight">
        <div className="container-page">
          <div className="frost grid grid-cols-2 gap-6 rounded-[32px] px-6 py-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.value} className="text-center">
                <p className="font-display text-3xl text-teal-ink sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-ink-soft">{s.label[locale] ?? s.label.de}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technik-Grid */}
      <section className="section">
        <div className="container-page">
          <div className="max-w-xl">
            <span className="eyebrow">{t("techniqueEyebrow")}</span>
            <h2 className="h2 mt-3">{t("techniqueTitle")}</h2>
            <p className="lead mt-3">{t("techniqueLead")}</p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {techniques.map((tech) => (
              <Link
                key={tech.label}
                href={tech.href}
                className={`ph ph--${tech.color} card--hover aspect-[5/4] rounded-[24px] font-display text-xl`}
              >
                {tech.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Aktuelle Kurse */}
      <section className="section--tight">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <span className="eyebrow">{t("coursesEyebrow")}</span>
              <h2 className="h2 mt-3">{t("coursesTitle")}</h2>
              <p className="lead mt-3">{t("coursesLead")}</p>
            </div>
            <Link href="/angebot" className="btn btn--outline btn--sm">
              {t("coursesAll")}
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <CourseCard key={c.slug} course={c} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container-page">
          <div className="mb-8 text-center">
            <span className="eyebrow justify-center">{t("testimonialsEyebrow")}</span>
            <h2 className="h2 mt-3 flex items-center justify-center gap-2">
              <Star size={22} className="text-yellow" fill="currentColor" />
              {t("testimonialsTitle")}
            </h2>
          </div>
          <Testimonials items={TESTIMONIALS} />
        </div>
      </section>

      {/* Gutschein-CTA */}
      <section className="section--tight pb-4">
        <div className="container-page">
          <div className="frost flex flex-col items-center gap-5 rounded-[32px] px-6 py-12 text-center">
            <h2 className="h2 max-w-xl">{t("ctaTitle")}</h2>
            <p className="lead max-w-lg">{t("ctaLead")}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/gutscheine" className="btn btn--coral btn--lg">
                {t("ctaGutschein")}
              </Link>
              <Link href="/kontakt" className="btn btn--ghost btn--lg">
                {t("ctaKontakt")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
