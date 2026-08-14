import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Impressum" };

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Impressum" }]}
        title="Impressum"
      />
      <section className="section--tight">
        <div className="container-page max-w-2xl">
          <div className="card space-y-4 text-ink-soft">
            <div>
              <h2 className="font-display text-lg text-ink">{SITE.name}</h2>
              <p>
                {SITE.address.street}
                <br />
                {SITE.address.city}
              </p>
            </div>
            <p>
              Telefon: {SITE.phone}
              <br />
              E-Mail: {SITE.email}
            </p>
            <p className="text-sm text-ink-mute">
              Weitere rechtliche Angaben (verantwortliche Person, Handelsregister etc.) ergänzen wir
              hier.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
