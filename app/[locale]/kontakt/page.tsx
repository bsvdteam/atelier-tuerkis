import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { MessageCircle, Mail, MapPin, Phone, Clock } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SITE } from "@/lib/site";
import { buildWhatsAppUrl, buildMailtoUrl } from "@/lib/whatsapp";
import type { Locale } from "@/types";

export const metadata: Metadata = { title: "Kontakt" };

export default async function KontaktPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;
  const t = await getTranslations();

  const ways = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      text: "Am schnellsten. Schreib uns einfach.",
      href: buildWhatsAppUrl("Hallo Atelier Türkis, ich hätte eine Frage."),
      cta: t("common.perWhatsapp"),
      external: true,
    },
    {
      icon: Mail,
      title: "E-Mail",
      text: SITE.email,
      href: buildMailtoUrl(),
      cta: t("common.perEmail"),
      external: false,
    },
    {
      icon: Phone,
      title: "Telefon",
      text: SITE.phone,
      href: `tel:${SITE.phone.replace(/\s/g, "")}`,
      cta: "Anrufen",
      external: false,
    },
  ];

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: t("nav.kontakt") }]}
        eyebrow={t("nav.kontakt")}
        title={
          <>
            Schreib uns <span className="squiggle text-coral">einfach</span>
          </>
        }
        lead="Fragen zu Kursen, Terminen oder Geburtstagen? Wir melden uns rasch zurück."
      />

      <section className="section--tight">
        <div className="container-page grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          {/* Wege */}
          <div className="grid gap-5 sm:grid-cols-3">
            {ways.map((w) => (
              <a
                key={w.title}
                href={w.href}
                target={w.external ? "_blank" : undefined}
                rel={w.external ? "noopener noreferrer" : undefined}
                className="card card--hover flex flex-col"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-deep text-white">
                  <w.icon size={18} />
                </span>
                <h2 className="mt-4 font-display text-lg text-ink">{w.title}</h2>
                <p className="mt-1 flex-1 text-sm text-ink-soft">{w.text}</p>
                <span className="mt-3 text-sm font-bold text-teal-deep">{w.cta}</span>
              </a>
            ))}
          </div>

          {/* Adresse */}
          <div className="card">
            <h2 className="h3">So findest du uns</h2>
            <div className="mt-4 flex flex-col gap-3 text-ink-soft">
              <p className="flex items-start gap-2">
                <MapPin size={18} className="mt-0.5 text-teal-deep" />
                {SITE.address.street}, {SITE.address.city}
              </p>
              <p className="flex items-center gap-2">
                <Clock size={18} className="text-teal-deep" />
                {SITE.hours[locale] ?? SITE.hours.de}
              </p>
            </div>
            <div className="ph ph--sky mt-5 h-40 rounded-2xl">
              <span className="ph-label">Lageplan</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
