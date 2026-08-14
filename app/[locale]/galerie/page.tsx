import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
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
  const t = await getTranslations();

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: t("nav.atelier") },
          { label: t("nav.galerie") },
        ]}
        eyebrow={t("nav.galerie")}
        title={
          <>
            Was bei uns <span className="squiggle text-teal-deep">entsteht</span>
          </>
        }
        lead="Arbeiten von Kursleiterinnen, Teilnehmenden und aus dem Atelier selbst. Manche sind erhältlich — schreib uns einfach."
      />
      <section className="section--tight">
        <div className="container-page">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
