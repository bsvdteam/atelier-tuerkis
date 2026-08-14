import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { TEAM } from "@/content";
import { getLocalised } from "@/lib/localise";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

export const metadata: Metadata = { title: "Über uns" };

const VALUES = [
  { title: "Raum zum Abschalten", text: "Ein heller Ort, an dem der Alltag draussen bleibt.", color: "teal" },
  { title: "Raum zum Ausprobieren", text: "Hier darf misslingen. Genau da fängt das Gute an.", color: "coral" },
  { title: "Kreativität verbindet", text: "Man kommt allein und geht mit neuen Bekanntschaften.", color: "yellow" },
  { title: "Wertschätzende Atmosphäre", text: "Kein Wettbewerb, kein Urteil — nur Neugier.", color: "violet" },
  { title: "Kleine Gruppen", text: "Damit jede und jeder gesehen wird und Zeit bekommt.", color: "green" },
  { title: "Individuelle Begleitung", text: "Wir holen dich da ab, wo du gerade stehst.", color: "sky" },
] as const;

export default async function AtelierPage({
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
        crumbs={[{ label: "Home", href: "/" }, { label: t("nav.atelier") }]}
        eyebrow={t("nav.ueberUns")}
        title={
          <>
            Ein Ort, der{" "}
            <span className="squiggle text-teal-deep">Mut macht</span>.
          </>
        }
        lead="Das Atelier Türkis entstand aus einer einfachen Idee: ein Raum, in dem Menschen malen, formen und ausprobieren können — ohne Leistungsdruck, aber mit echter Anleitung."
      />

      {/* Werte */}
      <section className="section">
        <div className="container-page">
          <span className="eyebrow">Wofür wir stehen</span>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="card">
                <span className={cn("ph inline-flex h-11 w-11 rounded-2xl", `ph--${v.color}`)} />
                <h3 className="mt-4 font-display text-xl text-ink">{v.title}</h3>
                <p className="mt-1 text-ink-soft">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section--tight">
        <div className="container-page">
          <span className="eyebrow">Das Team</span>
          <h2 className="h2 mt-3">Menschen, die gerne zeigen</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((m) => (
              <div key={m.slug} className="card flex flex-col">
                <div className={cn("ph h-40 rounded-2xl", `ph--${m.color}`)}>
                  <span className="ph-label">{m.name}</span>
                </div>
                <h3 className="mt-4 font-display text-xl text-ink">{m.name}</h3>
                <p className="text-sm font-bold text-teal-deep">{getLocalised(m.role, locale)}</p>
                <p className="mt-2 text-ink-soft">{getLocalised(m.bio, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Räume-Teaser */}
      <section className="section--tight">
        <div className="container-page">
          <div className="frost flex flex-col items-start gap-5 rounded-[32px] px-6 py-10 sm:px-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="h3">Unsere Werkstatt kannst du auch mieten</h2>
              <p className="mt-2 text-ink-soft">
                Rund 65 m² Tageslicht, grosse Arbeitstische, Nähmaschinen und eine Küche — für
                Gruppen, Feiern oder eigene Projekte.
              </p>
            </div>
            <Link href="/angebot/raeume" className="btn btn--primary">
              Räume ansehen <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
