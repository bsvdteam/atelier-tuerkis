import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { ShopFilterList } from "@/components/shop/ShopFilterList";
import { ARTWORKS } from "@/content";
import type { Locale } from "@/types";

export const metadata: Metadata = { title: "Shop" };

export default async function ShopPage({
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
        crumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
        eyebrow="Shop"
        title={<>Ein Stück Atelier <span className="squiggle-word">für dich</span>.</>}
        lead="Originale, handgemachte Kleinigkeiten und Kreativmaterial aus dem Atelier. Alles auf Anfrage erhältlich, ganz unkompliziert per Nachricht."
      />

      <section className="section section--tight">
        <div className="container">
          <ShopFilterList artworks={ARTWORKS} locale={locale} />

          <div className="frost reveal mt-l" style={{ padding: "24px 28px", display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center", justifyContent: "space-between" }}>
            <span className="pill-info">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v12H5.2L4 18z" /></svg> Bestellung ganz einfach per WhatsApp oder E-Mail, kein Online-Shop nötig.
            </span>
            <Link href="/kontakt" className="btn btn--outline btn--sm">Kontakt <span className="arr">→</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
