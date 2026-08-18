import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SITE } from "@/lib/site";
import { buildWhatsAppUrl, buildMailtoUrl } from "@/lib/whatsapp";
import type { Locale } from "@/types";

export const metadata: Metadata = {
  title: "Wir öffnen bald",
  description:
    "Atelier Türkis in Degersheim: Kreativkurse, Workshops, Galerie und Shop. Unsere neue Website ist gerade im Entstehen.",
};

const T = {
  de: {
    eyebrow: "Kunst- & Kreativatelier · Degersheim",
    title: "Wir öffnen bald.",
    lead: "Kurse, Workshops, Galerie und Shop. Unsere neue Website ist gerade im Entstehen. Melde dich jederzeit, wir freuen uns auf dich.",
    whatsapp: "Auf WhatsApp schreiben",
    email: "E-Mail schreiben",
    instagram: "Instagram",
    login: "Team-Login",
    waText: "Hallo Elena, ich habe eine Frage zum Atelier Türkis.",
  },
  en: {
    eyebrow: "Art & creative studio · Degersheim",
    title: "Opening soon.",
    lead: "Courses, workshops, gallery and shop. Our new website is in the making. Reach out anytime, we'd love to hear from you.",
    whatsapp: "Message on WhatsApp",
    email: "Send an email",
    instagram: "Instagram",
    login: "Team login",
    waText: "Hello Elena, I have a question about Atelier Türkis.",
  },
} as const;

export default async function ComingSoonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = T[(locale as Locale) === "en" ? "en" : "de"];

  return (
    <section className="coming">
      <div className="coming__inner reveal in">
        <span className="coming__eyebrow">{t.eyebrow}</span>
        <div className="coming__brand">
          Atelier <span>Türkis</span>
        </div>
        <h1 className="coming__title">{t.title}</h1>
        <p className="coming__lead">{t.lead}</p>

        <div className="coming__cta">
          <a className="btn btn--primary" href={buildWhatsAppUrl(t.waText)} target="_blank" rel="noopener noreferrer">
            {t.whatsapp}
          </a>
          <a className="btn btn--ghost" href={buildMailtoUrl("Anfrage Atelier Türkis")}>
            {t.email}
          </a>
          <a className="btn btn--outline" href={SITE.instagram.url} target="_blank" rel="noopener noreferrer">
            {t.instagram}
          </a>
        </div>
      </div>

      {/* dekorative Farbkleckse */}
      <span className="coming__dot coming__dot--1" aria-hidden="true" />
      <span className="coming__dot coming__dot--2" aria-hidden="true" />
      <span className="coming__dot coming__dot--3" aria-hidden="true" />
      <span className="coming__ring" aria-hidden="true" />

      <footer className="coming__legal">
        <span>
          Atelier Türkis · Elena Borlini &amp; Marianne Holenstein · {SITE.address.street}, {SITE.address.city} ·{" "}
          <a href={buildMailtoUrl()}>{SITE.email}</a>
        </span>
        <a className="coming__login" href="/admin/login">{t.login}</a>
      </footer>
    </section>
  );
}
