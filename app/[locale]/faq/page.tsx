import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQ } from "@/content";
import { getLocalised } from "@/lib/localise";
import { alternatesFor, absoluteUrl, ogImageUrl, faqLd } from "@/lib/seo";
import type { Locale } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const description =
    "Antworten zu Anmeldung, Material, Terminen und Bezahlung für die Kurse im Atelier Türkis in Degersheim.";
  return {
    title: "FAQ",
    description,
    alternates: alternatesFor("/faq"),
    openGraph: { title: "Häufige Fragen · Atelier Türkis", description, url: absoluteUrl("/faq", locale), images: [ogImageUrl(locale)] },
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;

  return (
    <>
      <JsonLd data={faqLd(FAQ, locale)} />
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        eyebrow="Gut zu wissen"
        title={<>Häufige <span className="squiggle-word">Fragen</span></>}
        lead="Die wichtigsten Antworten auf einen Blick. Ist deine Frage nicht dabei? Schreib uns einfach."
      />

      <section className="section section--tight">
        <div className="container">
          <div className="faq reveal">
            {FAQ.map((item, i) => (
              <details key={i} open={i === 0}>
                <summary>{getLocalised(item.q, locale)}</summary>
                <p>{getLocalised(item.a, locale)}</p>
              </details>
            ))}
          </div>

          <div className="cta-banner reveal mt-l">
            <h2 className="h2">Noch eine Frage offen?</h2>
            <p className="lead mt-s center maxw">Wir antworten gern, am schnellsten per WhatsApp.</p>
            <div className="btn-row"><Link href="/kontakt" className="btn btn--coral btn--lg">Kontakt aufnehmen <span className="arr">→</span></Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
