import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = { title: "Galerie" };

export default async function GaleriePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Atelier", href: "/atelier" }, { label: "Galerie" }]}
        eyebrow="Galerie · Impressionen"
        title={<>Ein Blick <span className="squiggle-word">hinein</span>.</>}
        lead="Lachende Kinder, konzentrierte Hände, volle Farbpaletten und ruhige Momente. So fühlt sich das Atelier Türkis an."
      />

      <section className="section section--tight">
        <div className="container">
          <GalleryGrid />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-banner reveal">
            <h2 className="h2">Lust bekommen?</h2>
            <p className="lead mt-s center maxw">Genau diese Atmosphäre erlebst du in unseren Kursen. Komm vorbei und gestalte mit.</p>
            <div className="btn-row"><Link href="/angebot" className="btn btn--coral btn--lg">Kurse entdecken <span className="arr">→</span></Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
