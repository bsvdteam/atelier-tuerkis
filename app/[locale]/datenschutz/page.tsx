import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Datenschutz" };

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const sections: LegalSection[] = [
    {
      title: "Verantwortliche Stelle",
      body: (
        <>
          <p>
            Verantwortlich für die Bearbeitung deiner Personendaten im Zusammenhang mit dieser
            Website ist:
          </p>
          <dl>
            <dt>{SITE.name}</dt>
            <dd>
              {SITE.address.street}, {SITE.address.city}
              <br />
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a> · {SITE.phone}
            </dd>
          </dl>
          <p>
            Wir bearbeiten Personendaten im Einklang mit dem revidierten Schweizer
            Datenschutzgesetz (revDSG).
          </p>
        </>
      ),
    },
    {
      title: "Welche Daten wir bearbeiten",
      body: (
        <>
          <p>
            Wir erheben nur Daten, die du uns aktiv mitteilst, wenn du mit uns Kontakt aufnimmst –
            etwa für eine Kursanmeldung oder eine Frage. Dazu gehören insbesondere:
          </p>
          <ul>
            <li>Name und Kontaktangaben (Telefonnummer, E-Mail-Adresse)</li>
            <li>Angaben zu deiner Anfrage (z.&nbsp;B. gewünschter Kurs, Termin, Alter des Kindes)</li>
            <li>Inhalt deiner Nachricht</li>
          </ul>
          <p>
            Ein Benutzerkonto gibt es nicht. Beim blossen Besuch der Website werden keine
            Registrierungen verlangt.
          </p>
        </>
      ),
    },
    {
      title: "Zweck der Bearbeitung",
      body: (
        <p>
          Wir verwenden deine Daten ausschliesslich, um deine Anfrage zu beantworten, Kurse und
          Termine zu organisieren und mit dir zu kommunizieren. Eine Weitergabe zu Werbezwecken oder
          an unbeteiligte Dritte findet nicht statt.
        </p>
      ),
    },
    {
      title: "Kontaktkanäle & Dritte",
      body: (
        <>
          <p>
            Wenn du uns über <strong>WhatsApp</strong> schreibst, gelten zusätzlich die
            Datenschutzbestimmungen von Meta Platforms. Wenn du unserem{" "}
            <strong>Instagram</strong>-Profil folgst, gelten ebenfalls deren Bestimmungen. Auf diese
            Bearbeitungen haben wir keinen Einfluss.
          </p>
          <p>
            Bei Kontakt per E-Mail oder Telefon werden deine Daten über die jeweiligen Anbieter
            übermittelt.
          </p>
        </>
      ),
    },
    {
      title: "Cookies & Statistik",
      body: (
        <p>
          Diese Website setzt keine Tracking-Cookies und keine Analyse-Werkzeuge ein, die dich
          über Websites hinweg verfolgen. Für den technischen Betrieb können durch unseren Hoster
          serverseitige Protokolldaten anfallen (z.&nbsp;B. IP-Adresse, Zeitpunkt des Zugriffs), die
          der Sicherheit und Stabilität dienen.
        </p>
      ),
    },
    {
      title: "Hosting",
      body: (
        <p>
          Diese Website wird bei einem spezialisierten Anbieter gehostet. Die Übertragung erfolgt
          verschlüsselt (HTTPS). Der Hoster bearbeitet Daten ausschliesslich in unserem Auftrag und
          zur technischen Bereitstellung der Website.
        </p>
      ),
    },
    {
      title: "Aufbewahrung",
      body: (
        <p>
          Wir bewahren deine Daten nur so lange auf, wie es für den jeweiligen Zweck nötig ist oder
          gesetzliche Aufbewahrungspflichten es verlangen. Danach werden sie gelöscht.
        </p>
      ),
    },
    {
      title: "Deine Rechte",
      body: (
        <>
          <p>Du hast im Rahmen des anwendbaren Rechts insbesondere das Recht:</p>
          <ul>
            <li>auf Auskunft über die zu dir bearbeiteten Daten</li>
            <li>auf Berichtigung unrichtiger Daten</li>
            <li>auf Löschung deiner Daten</li>
            <li>der Bearbeitung zu widersprechen</li>
          </ul>
          <p>
            Für die Ausübung deiner Rechte genügt eine kurze Nachricht an{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </>
      ),
    },
  ];

  return (
    <LegalPage
      title="Datenschutz"
      eyebrow="Rechtliches"
      lead="Wie wir mit deinen Daten umgehen – kurz, klar und verständlich."
      updated="Stand: August 2026"
      sections={sections}
    />
  );
}
