import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "AGB" };

export default async function AgbPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "AGB" }]}
        title="AGB"
        lead="Unsere allgemeinen Geschäftsbedingungen zu Anmeldung, Bezahlung und Stornierung folgen an dieser Stelle."
      />
      <section className="section--tight">
        <div className="container-page max-w-2xl">
          <div className="card text-ink-soft">
            <p>
              Anmeldungen sind verbindlich, sobald wir sie bestätigt haben. Details zu Bezahlung,
              Rücktritt und Kursausfall ergänzen wir hier in Kürze.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
