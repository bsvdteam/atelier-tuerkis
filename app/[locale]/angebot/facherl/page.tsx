import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Facherl" };

export default async function FacherlPage({
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
          { label: t("nav.facherl") },
        ]}
        eyebrow={t("nav.facherl")}
        title={
          <>
            Bald <span className="squiggle text-teal-deep">mehr</span>
          </>
        }
        lead="Dieses Angebot ist gerade in Arbeit. Sobald es so weit ist, findest du hier alle Details."
      />
      <section className="section--tight">
        <div className="container-page">
          <div className="frost max-w-xl rounded-[32px] px-6 py-10 sm:px-10">
            <p className="text-ink-soft">
              Du willst schon jetzt wissen, was das Facherl ist? Schreib uns — wir erzählen dir gern
              mehr.
            </p>
            <Link href="/kontakt" className="btn btn--primary mt-6">
              {t("common.kontaktAufnehmen")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
