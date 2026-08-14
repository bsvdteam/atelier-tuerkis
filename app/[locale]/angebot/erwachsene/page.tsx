import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { ErwachseneView } from "@/components/angebot/ErwachseneView";

export const metadata: Metadata = { title: "Kurse für Erwachsene" };

export default async function ErwachsenePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Angebot", href: "/angebot" }, { label: "Erwachsene" }]}
        eyebrow="Für Erwachsene"
        title={<>Zeit für <span className="squiggle-word">dich</span>.</>}
        lead="Ob Anfängerin oder Geübter, in unseren Erwachsenenkursen findest du Ruhe, gute Anleitung und Raum für deine eigene Handschrift. Kleine Gruppen, entspannte Atmosphäre."
      />

      <section className="section section--tight">
        <div className="container">
          <ErwachseneView />

          <div className="frost reveal mt-l" style={{ padding: "24px 28px", display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center", justifyContent: "space-between" }}>
            <span className="pill-info">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 8v4l3 2" /></svg> Auch als Schnuppernachmittag oder Tag der offenen Tür möglich.
            </span>
            <Link href="/kontakt" className="btn btn--outline btn--sm">Fragen? Kontakt <span className="arr">→</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
