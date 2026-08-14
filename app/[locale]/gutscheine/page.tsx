import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactCta } from "@/components/ui/ContactCta";
import { cn } from "@/lib/utils";
import type { PlaceholderColor } from "@/types";

export const metadata: Metadata = { title: "Gutscheine" };

const TYPES: { title: string; text: string; color: PlaceholderColor }[] = [
  { title: "Kursgutschein", text: "Für einen bestimmten Kurs oder frei wählbar.", color: "teal" },
  { title: "Geburtstagsgutschein", text: "Ein kreativer Nachmittag als Geschenk.", color: "coral" },
  { title: "Weihnachtsgeschenk", text: "Ein frei wählbarer Betrag, hübsch verpackt.", color: "yellow" },
];

const STEPS = [
  { n: "1", text: "Schreib uns, welcher Kurs oder Betrag es sein soll — und für welchen Anlass." },
  { n: "2", text: "Wir gestalten den Gutschein, digital oder gedruckt." },
  { n: "3", text: "Abholung im Atelier oder Versand zu dir nach Hause." },
];

export default async function GutscheinePage({
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
        crumbs={[{ label: "Home", href: "/" }, { label: t("nav.gutscheine") }]}
        eyebrow={t("nav.gutscheine")}
        title={
          <>
            Ein Geschenk, das <span className="squiggle text-coral">bleibt</span>
          </>
        }
        lead="Verschenke einen Kurs, einen Nachmittag oder einfach kreative Zeit im Atelier Türkis."
      />

      <section className="section--tight">
        <div className="container-page grid gap-5 sm:grid-cols-3">
          {TYPES.map((ty) => (
            <div key={ty.title} className="card">
              <span className={cn("ph h-28 rounded-2xl", `ph--${ty.color}`)} />
              <h2 className="mt-4 font-display text-xl text-ink">{ty.title}</h2>
              <p className="mt-1 text-ink-soft">{ty.text}</p>
            </div>
          ))}
        </div>

        <div className="container-page mt-12">
          <h2 className="h2">So einfach geht's</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="frost rounded-[24px] p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-deep font-display text-lg text-white">
                  {s.n}
                </span>
                <p className="mt-4 text-ink-soft">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="container-page mt-12">
          <div className="frost rounded-[32px] px-6 py-10 text-center sm:px-10">
            <h2 className="h3">Gutschein bestellen</h2>
            <p className="mt-2 text-ink-soft">Schreib uns kurz — wir kümmern uns um den Rest.</p>
            <div className="mt-6 flex justify-center">
              <ContactCta
                whatsappText="Hallo Atelier Türkis, ich möchte gern einen Gutschein bestellen."
                emailSubject="Gutschein-Bestellung"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
