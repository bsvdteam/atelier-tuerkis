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
            Verantwortlich für die Bearbeitung von Personendaten im Zusammenhang mit dieser Website
            ist:
          </p>
          <dl>
            <dt>{SITE.name}</dt>
            <dd>
              {SITE.address.street}, {SITE.address.city}, Schweiz
              <br />
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a> ·{" "}
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
            </dd>
          </dl>
          <p>
            Wir bearbeiten Personendaten im Einklang mit dem revidierten Schweizer Datenschutzgesetz
            (revDSG) und der zugehörigen Verordnung. Soweit das europäische Datenschutzrecht (DSGVO)
            anwendbar ist, halten wir dessen Vorgaben ebenfalls ein.
          </p>
        </>
      ),
    },
    {
      title: "Grundsätze",
      body: (
        <p>
          Wir bearbeiten Personendaten nach Treu und Glauben, verhältnismässig und zweckgebunden. Wir
          erheben nur so viele Daten wie nötig, schützen sie mit angemessenen technischen und
          organisatorischen Massnahmen und geben sie nicht unbefugt an Dritte weiter.
        </p>
      ),
    },
    {
      title: "Welche Daten wir bearbeiten",
      body: (
        <>
          <p>Je nach Kontakt und Nutzung bearbeiten wir insbesondere folgende Daten:</p>
          <ul>
            <li>Kontaktangaben (Name, Telefonnummer, E-Mail-Adresse)</li>
            <li>Angaben zu deiner Anfrage oder Anmeldung (Kurs, Termin, Alter des Kindes)</li>
            <li>Inhalt deiner Nachrichten und Korrespondenz</li>
            <li>bei Newsletter-Anmeldung: E-Mail-Adresse und Anmeldedaten</li>
            <li>technische Daten beim Websitebesuch (siehe «Server-Logfiles»)</li>
          </ul>
          <p>Ein Benutzerkonto besteht nicht; du musst dich zum Besuch der Website nicht registrieren.</p>
        </>
      ),
    },
    {
      title: "Zwecke der Bearbeitung",
      body: (
        <p>
          Wir bearbeiten die Daten, um Anfragen zu beantworten, Kurse und Termine zu organisieren,
          Verträge abzuwickeln, die Website sicher und funktionsfähig bereitzustellen und – mit deiner
          Einwilligung – um dir einen Newsletter zuzustellen und unser Angebot zu verbessern.
          Grundlage ist die Vertragserfüllung, deine Einwilligung oder unser berechtigtes Interesse
          am sicheren Betrieb.
        </p>
      ),
    },
    {
      title: "Server-Logfiles & Hosting",
      body: (
        <p>
          Diese Website wird bei einem spezialisierten Anbieter gehostet; die Übertragung erfolgt
          verschlüsselt (HTTPS). Beim Aufruf der Website werden aus technischen Gründen automatisch
          Daten in Server-Logfiles gespeichert (z.&nbsp;B. gekürzte IP-Adresse, Datum und Uhrzeit,
          abgerufene Seite, Browsertyp). Diese Daten dienen der Sicherheit, Stabilität und
          Fehleranalyse und werden nach kurzer Zeit gelöscht. Der Hoster bearbeitet Daten
          ausschliesslich in unserem Auftrag (Auftragsbearbeitung).
        </p>
      ),
    },
    {
      title: "Cookies & Einwilligung",
      body: (
        <>
          <p>
            Für den technischen Betrieb notwendige Cookies setzen wir ohne Einwilligung ein; sie
            sind für die Grundfunktionen der Website erforderlich. Cookies und Dienste, die nicht
            zwingend nötig sind (insbesondere Web-Analyse und eingebettete Karten), setzen wir erst
            ein, nachdem du über unseren Cookie-Hinweis <strong>eingewilligt</strong> hast.
          </p>
          <p>
            Deine Auswahl wird lokal in deinem Browser gespeichert. Du kannst deine Einwilligung
            jederzeit mit Wirkung für die Zukunft ändern oder widerrufen, indem du die
            Cookie-Einstellungen erneut aufrufst oder die gespeicherten Daten in deinem Browser
            löschst.
          </p>
        </>
      ),
    },
    {
      title: "Web-Analyse",
      body: (
        <p>
          Zur Verbesserung unseres Angebots setzen wir – nur mit deiner Einwilligung – ein
          Web-Analyse-Werkzeug ein, das die Nutzung der Website in aggregierter, möglichst
          anonymisierter Form auswertet (z.&nbsp;B. besuchte Seiten, ungefähre Region, verwendetes
          Gerät). Es werden keine Profile zu deiner Person über verschiedene Websites hinweg
          erstellt. Ohne Einwilligung findet keine Analyse statt.
        </p>
      ),
    },
    {
      title: "Newsletter",
      body: (
        <p>
          Wenn du dich für unseren Newsletter anmeldest, verwenden wir deine E-Mail-Adresse
          ausschliesslich für den Versand. Die Anmeldung erfolgt im Double-Opt-In-Verfahren: Du
          erhältst zunächst eine Bestätigungs-E-Mail. Du kannst den Newsletter jederzeit abbestellen
          (Abmeldelink in jeder E-Mail oder kurze Nachricht an uns); danach löschen wir deine Daten
          aus dem Verteiler.
        </p>
      ),
    },
    {
      title: "WhatsApp & Instagram",
      body: (
        <p>
          Für die Kontaktaufnahme nutzen wir <strong>WhatsApp</strong>; wir betreiben zudem ein{" "}
          <strong>Instagram</strong>-Profil. Beide Dienste werden von Meta Platforms betrieben. Wenn
          du uns darüber kontaktierst oder unserem Profil folgst, gelten zusätzlich die
          Datenschutzbestimmungen von Meta; dabei können Daten auch ausserhalb der Schweiz und der
          EU/EWR bearbeitet werden. Auf diese Bearbeitungen haben wir keinen Einfluss. Für
          vertrauliche Anliegen empfehlen wir den Kontakt per E-Mail oder Telefon.
        </p>
      ),
    },
    {
      title: "Google Maps",
      body: (
        <p>
          Auf der Kontaktseite binden wir – nur nach deiner Einwilligung – eine Karte von Google Maps
          (Google Ireland Ltd. / Google LLC) ein. Beim Laden der Karte werden Daten wie deine
          IP-Adresse an Google übermittelt, ggf. auch in die USA. Ohne Einwilligung wird die Karte
          nicht geladen; du erhältst stattdessen einen Platzhalter mit Link.
        </p>
      ),
    },
    {
      title: "Bekanntgabe an Dritte & Auslandübermittlung",
      body: (
        <p>
          Eine Weitergabe von Personendaten erfolgt nur, soweit es zur Vertragserfüllung nötig ist
          (z.&nbsp;B. an Hoster, Newsletter- oder Zahlungsdienstleister als Auftragsbearbeiter), du
          eingewilligt hast oder wir gesetzlich dazu verpflichtet sind. Erfolgt eine Übermittlung in
          Länder ohne angemessenes Datenschutzniveau, stellen wir angemessene Garantien sicher (z.
          &nbsp;B. Standardvertragsklauseln).
        </p>
      ),
    },
    {
      title: "Aufbewahrung & Löschung",
      body: (
        <p>
          Wir bewahren Personendaten nur so lange auf, wie es für den jeweiligen Zweck erforderlich
          ist oder gesetzliche Aufbewahrungspflichten (z.&nbsp;B. handels- und steuerrechtlich) es
          verlangen. Danach werden die Daten gelöscht oder anonymisiert.
        </p>
      ),
    },
    {
      title: "Deine Rechte",
      body: (
        <>
          <p>Du hast im Rahmen des anwendbaren Rechts insbesondere folgende Rechte:</p>
          <ul>
            <li>Auskunft über die zu dir bearbeiteten Personendaten</li>
            <li>Berichtigung unrichtiger oder Ergänzung unvollständiger Daten</li>
            <li>Löschung («Recht auf Vergessen») und Einschränkung der Bearbeitung</li>
            <li>Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft</li>
            <li>Herausgabe oder Übertragung deiner Daten (Datenportabilität)</li>
            <li>Widerspruch gegen eine Bearbeitung</li>
          </ul>
          <p>
            Zur Ausübung genügt eine Nachricht an{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Zudem hast du das Recht, dich beim
            Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) zu beschweren.
          </p>
        </>
      ),
    },
    {
      title: "Änderungen",
      body: (
        <p>
          Wir können diese Datenschutzerklärung jederzeit anpassen, um sie an geänderte
          Rechtslagen oder Abläufe anzupassen. Massgebend ist die jeweils auf dieser Seite
          veröffentlichte Fassung.
        </p>
      ),
    },
  ];

  return (
    <LegalPage
      title="Datenschutz"
      eyebrow="Rechtliches"
      lead="Wie wir mit deinen Daten umgehen – transparent, verständlich und nach Schweizer Datenschutzgesetz (revDSG)."
      updated="Stand: August 2026"
      sections={sections}
    />
  );
}
