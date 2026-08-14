import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactCta } from "@/components/ui/ContactCta";

export const metadata: Metadata = { title: "Räume mieten" };

const SPECS = [
  { label: "Grösse", value: "ca. 65 m²" },
  { label: "Plätze", value: "bis 15 Personen" },
  { label: "Ausstattung", value: "Tische, Nähmaschinen, Werkzeuge" },
  { label: "Infrastruktur", value: "Küche, WC" },
  { label: "Anreise", value: "Parkplätze & ÖV in der Nähe" },
  { label: "Mindestdauer", value: "3 Stunden" },
  { label: "Mietpreis", value: "ab CHF 45 / Stunde" },
];

const CHECKS = [
  "Viel Tageslicht",
  "Grosse Arbeitstische",
  "Nähmaschinen nutzbar",
  "Küche & WC vorhanden",
];

export default async function RaeumePage({
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
          { label: t("nav.raeume") },
        ]}
        eyebrow={t("nav.raeume")}
        title={
          <>
            Dein Raum für <span className="squiggle text-teal-deep">eigene Ideen</span>
          </>
        }
        lead="Unsere helle Werkstatt kannst du stundenweise mieten — für Workshops, Feiern oder dein eigenes Projekt. Alles da, du musst nur kommen."
      />

      <section className="section--tight">
        <div className="container-page grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="ph ph--teal min-h-[280px] rounded-[32px]">
            <span className="ph-label">Werkstatt</span>
          </div>

          <div className="card">
            <h2 className="h3">Das bekommst du</h2>
            <dl className="mt-4 divide-y divide-line">
              {SPECS.map((s) => (
                <div key={s.label} className="flex justify-between gap-4 py-3">
                  <dt className="text-ink-mute">{s.label}</dt>
                  <dd className="text-right font-bold text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {CHECKS.map((c) => (
                <li key={c} className="flex items-center gap-2 text-ink-soft">
                  <Check size={16} className="text-green" /> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container-page mt-10">
          <div className="frost rounded-[32px] px-6 py-10 text-center sm:px-10">
            <h2 className="h3">Verfügbarkeit anfragen</h2>
            <p className="mt-2 text-ink-soft">Sag uns Datum und Dauer — wir prüfen und melden uns.</p>
            <div className="mt-6 flex justify-center">
              <ContactCta
                whatsappText="Hallo Atelier Türkis, ich möchte gern eure Räume mieten. Sind sie an folgendem Termin frei?"
                emailSubject="Anfrage Raummiete"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
