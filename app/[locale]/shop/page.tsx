import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
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
  const t = await getTranslations();

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: t("nav.shop") }]}
        eyebrow={t("nav.shop")}
        title={
          <>
            Mitnehmen, was <span className="squiggle text-coral">gefällt</span>
          </>
        }
        lead="Originale, handgemachte Kleinigkeiten und Material aus dem Atelier. Bestellung ganz einfach per WhatsApp oder E-Mail — kein Online-Shop nötig."
      />
      <section className="section--tight">
        <div className="container-page">
          <ShopFilterList artworks={ARTWORKS} locale={locale} />
        </div>
      </section>
    </>
  );
}
