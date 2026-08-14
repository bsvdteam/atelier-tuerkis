import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Datenschutz" };

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Datenschutz" }]}
        title="Datenschutz"
        lead="Deine Daten sind bei uns sicher. Diese Seite wird noch mit der vollständigen Datenschutzerklärung ergänzt."
      />
      <section className="section--tight">
        <div className="container-page max-w-2xl">
          <div className="card text-ink-soft">
            <p>
              Wir erheben nur die Daten, die du uns aktiv über WhatsApp, E-Mail oder Telefon
              mitteilst, und verwenden sie ausschliesslich zur Beantwortung deiner Anfrage. Eine
              ausführliche Datenschutzerklärung folgt an dieser Stelle.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
