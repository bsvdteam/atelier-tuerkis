import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactCta } from "@/components/ui/ContactCta";
import { cn } from "@/lib/utils";
import type { PlaceholderColor } from "@/types";

export const metadata: Metadata = { title: "Gruppen & Firmen" };

const SPECS = [
  { label: "Personen", value: "bis 15" },
  { label: "Themen", value: "individuell wählbar" },
  { label: "Dauer", value: "2–4 Stunden" },
  { label: "Material & Anleitung", value: "inklusive" },
  { label: "Preis", value: "auf Anfrage" },
];

const GROUPS: { title: string; text: string; color: PlaceholderColor }[] = [
  { title: "Firmen", text: "Ein kreativer Teamnachmittag statt Meeting.", color: "teal" },
  { title: "Vereine", text: "Gemeinsam etwas gestalten und dabei lachen.", color: "coral" },
  { title: "Freundesrunden", text: "Ein besonderer Anlass mit Farbe und Ruhe.", color: "yellow" },
  { title: "Geburtstage", text: "Feiern und selber machen — für Gross und Klein.", color: "violet" },
];

export default async function GruppenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: t("nav.angebot"), href: "/angebot" },
          { label: t("nav.gruppen") },
        ]}
        eyebrow={t("nav.gruppen")}
        title={
          <>
            Gemeinsam <span className="squiggle text-teal-deep">kreativ</span>
          </>
        }
        lead="Ob Team, Verein oder Freundesrunde: Wir gestalten mit euch einen Nachmittag, an den ihr euch gern erinnert. Ihr bringt die Runde mit, wir den Rest."
      />

      <section className="section--tight">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="card">
            <h2 className="h3">Auf einen Blick</h2>
            <dl className="mt-4 divide-y divide-line">
              {SPECS.map((s) => (
                <div key={s.label} className="flex justify-between gap-4 py-3">
                  <dt className="text-ink-mute">{s.label}</dt>
                  <dd className="text-right font-bold text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {GROUPS.map((g) => (
              <div key={g.title} className="card">
                <span className={cn("ph inline-flex h-10 w-10 rounded-xl", `ph--${g.color}`)} />
                <h3 className="mt-3 font-display text-xl text-ink">{g.title}</h3>
                <p className="mt-1 text-ink-soft">{g.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="container-page mt-10">
          <div className="frost rounded-[32px] px-6 py-10 text-center sm:px-10">
            <h2 className="h3">Klingt gut? Erzählt uns von eurer Idee.</h2>
            <p className="mt-2 text-ink-soft">Wir melden uns mit einem Vorschlag zurück.</p>
            <div className="mt-6 flex justify-center">
              <ContactCta
                whatsappText="Hallo Atelier Türkis, wir möchten mit einer Gruppe zu euch kommen. Könnt ihr uns mehr Infos geben?"
                emailSubject="Anfrage Gruppe"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
