import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Impressum" };

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const sections: LegalSection[] = [
    {
      title: "Betreiberin",
      body: (
        <>
          <p>Diese Website wird betrieben von:</p>
          <dl>
            <dt>{SITE.name}</dt>
            <dd>
              Einzelunternehmen von [Vor- und Nachname der Inhaberin]
              <br />
              {SITE.address.street}
              <br />
              {SITE.address.city}, Schweiz
            </dd>
            <dt>Verantwortlich für den Inhalt</dt>
            <dd>[Vor- und Nachname der Inhaberin]</dd>
          </dl>
          <p>
            Das Atelier ist ein Kleinunternehmen (Einzelfirma) und nicht im Handelsregister
            eingetragen; es wird keine Mehrwertsteuer ausgewiesen.
          </p>
        </>
      ),
    },
    {
      title: "Kontakt",
      body: (
        <dl>
          <dt>Telefon</dt>
          <dd>
            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
          </dd>
          <dt>E-Mail</dt>
          <dd>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </dd>
        </dl>
      ),
    },
    {
      title: "Haftung für Inhalte",
      body: (
        <p>
          Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit,
          Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
          Kurstermine, Preise und Verfügbarkeiten können sich ändern, massgebend ist jeweils unsere
          Bestätigung deiner Anfrage.
        </p>
      ),
    },
    {
      title: "Haftung für Links",
      body: (
        <p>
          Unsere Website enthält Links zu externen Websites Dritter (z.&nbsp;B. WhatsApp, Instagram).
          Auf deren Inhalte haben wir keinen Einfluss und übernehmen dafür keine Haftung. Für die
          Inhalte der verlinkten Seiten ist stets die jeweilige Betreiberin verantwortlich.
        </p>
      ),
    },
    {
      title: "Urheberrecht",
      body: (
        <p>
          Alle Inhalte dieser Website – insbesondere Texte, Bilder, Grafiken und Gestaltung – sind
          urheberrechtlich geschützt. Eine Verwendung, Vervielfältigung oder Weitergabe ausserhalb
          der gesetzlichen Grenzen bedarf der vorherigen schriftlichen Zustimmung des Ateliers
          Türkis.
        </p>
      ),
    },
  ];

  return (
    <LegalPage
      title="Impressum"
      eyebrow="Rechtliches"
      lead="Angaben gemäss den gesetzlichen Vorgaben zur Betreiberin dieser Website."
      updated="Stand: August 2026"
      sections={sections}
    />
  );
}
