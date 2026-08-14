import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactCta } from "@/components/ui/ContactCta";
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
  const t = await getTranslations();

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: t("nav.faq") }]}
        eyebrow={t("nav.faq")}
        title={
          <>
            Häufige <span className="squiggle text-teal-deep">Fragen</span>
          </>
        }
        lead="Das Wichtigste vorab. Falls deine Frage nicht dabei ist, schreib uns einfach."
      />

      <section className="section--tight">
        <div className="container-page max-w-2xl">
          <div className="flex flex-col gap-3">
            {FAQ.map((item, i) => (
              <details key={i} className="card !p-0">
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-bold text-ink">
                  {getLocalised(item.q, locale)}
                  <span className="text-xl text-teal-deep">+</span>
                </summary>
                <p className="px-5 pb-5 text-ink-soft">{getLocalised(item.a, locale)}</p>
              </details>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <p className="text-ink-soft">Noch etwas offen?</p>
            <ContactCta
              whatsappText="Hallo Atelier Türkis, ich hätte eine Frage."
              emailSubject="Frage"
            />
          </div>
        </div>
      </section>
    </>
  );
}
