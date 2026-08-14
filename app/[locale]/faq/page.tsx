import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { FAQ } from "@/content";
import { getLocalised } from "@/lib/localise";
import type { Locale } from "@/types";

export const metadata: Metadata = { title: "FAQ" };

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
