import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "AGB" };

export default async function AgbPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const sections: LegalSection[] = [
    {
      title: "Geltungsbereich & Vertragspartnerin",
      body: (
        <>
          <p>
            Diese Allgemeinen Geschäftsbedingungen (nachfolgend «AGB») regeln das Vertragsverhältnis
            zwischen dem {SITE.name}, {SITE.address.street}, {SITE.address.city} (nachfolgend
            «Atelier»), und den Teilnehmenden bzw. Bestellenden (nachfolgend «Kundschaft») für alle
            Kurse, Workshops, Gruppenangebote, Raummieten und Gutscheine.
          </p>
          <p>
            Mit der Anmeldung bzw. Bestellung anerkennt die Kundschaft diese AGB. Abweichende oder
            entgegenstehende Bedingungen der Kundschaft gelten nur, wenn das Atelier ihnen
            schriftlich zustimmt. Massgebend ist die zum Zeitpunkt der Anmeldung gültige Fassung
            dieser AGB.
          </p>
        </>
      ),
    },
    {
      title: "Vertragsabschluss",
      body: (
        <p>
          Die Anmeldung erfolgt per WhatsApp, E-Mail, Telefon oder mündlich vor Ort. Sie stellt ein
          verbindliches Angebot der Kundschaft dar. Der Vertrag kommt zustande, sobald das Atelier
          die Anmeldung bestätigt (z.&nbsp;B. per Nachricht oder E-Mail). Plätze werden in der
          Reihenfolge des Eingangs vergeben; die Teilnehmerzahl ist beschränkt.
        </p>
      ),
    },
    {
      title: "Leistungen",
      body: (
        <p>
          Umfang, Inhalt, Dauer und allfällige Voraussetzungen eines Kurses ergeben sich aus der
          jeweiligen Kursbeschreibung. Sofern nicht anders angegeben, ist das benötigte Material im
          Kurspreis inbegriffen. Das Atelier ist berechtigt, aus organisatorischen Gründen die
          Kursleitung zu wechseln oder einzelne Inhalte anzupassen, soweit dies für die Kundschaft
          zumutbar ist.
        </p>
      ),
    },
    {
      title: "Preise & Zahlungsbedingungen",
      body: (
        <>
          <p>
            Es gelten die zum Zeitpunkt der Anmeldung kommunizierten Preise in Schweizer Franken
            (CHF), inklusive Material, sofern nicht anders angegeben. Als Kleinunternehmen wird keine
            Mehrwertsteuer ausgewiesen.
          </p>
          <p>
            Die Kurskosten sind <strong>im Voraus</strong>, spätestens vor Kursbeginn, zu bezahlen
            (Vorauskasse). Die Bezahlung erfolgt nach Absprache per Rechnung/Überweisung, TWINT oder
            bar vor Ort. Die Platzreservation gilt als definitiv, sobald die Zahlung eingegangen ist.
            Bei Zahlungsverzug ist das Atelier berechtigt, den Platz anderweitig zu vergeben.
          </p>
        </>
      ),
    },
    {
      title: "Rücktritt & Umbuchung durch die Kundschaft",
      body: (
        <>
          <p>
            Ein Rücktritt oder eine Umbuchung ist bis <strong>48 Stunden vor Kursbeginn</strong>{" "}
            kostenlos möglich; bereits bezahlte Beträge werden in diesem Fall zurückerstattet oder
            gutgeschrieben.
          </p>
          <p>
            Bei einem Rücktritt <strong>weniger als 48 Stunden</strong> vor Kursbeginn sowie bei
            Nichterscheinen bleibt die gesamte Kursgebühr geschuldet; eine Rückerstattung erfolgt
            nicht. Die Kundschaft ist jedoch berechtigt, eine Ersatzperson zu stellen; in diesem Fall
            entfallen die Kosten.
          </p>
          <p>Rücktritt und Umbuchung bedürfen einer Mitteilung an das Atelier (Nachricht genügt).</p>
        </>
      ),
    },
    {
      title: "Absage & Verschiebung durch das Atelier",
      body: (
        <p>
          Das Atelier kann einen Kurs bei ungenügender Teilnehmerzahl, Krankheit der Kursleitung
          oder aus anderem wichtigem Grund absagen oder verschieben. Die Kundschaft wird so früh wie
          möglich informiert. Bereits bezahlte Beträge werden bei Absage vollumfänglich
          zurückerstattet oder auf Wunsch für ein anderes Angebot gutgeschrieben. Weitergehende
          Ansprüche, insbesondere auf Ersatz von Auslagen oder Folgeschäden, sind ausgeschlossen.
        </p>
      ),
    },
    {
      title: "Gutscheine",
      body: (
        <p>
          Gutscheine sind ab Ausstellungsdatum <strong>drei Jahre</strong> gültig und übertragbar.
          Eine Barauszahlung ist ausgeschlossen. Ein nicht vollständig eingelöster Restbetrag bleibt
          bis zum Ablauf der Gültigkeit bestehen. Bei Verlust wird kein Ersatz geleistet.
        </p>
      ),
    },
    {
      title: "Kinderkurse",
      body: (
        <p>
          Bei Angeboten für Kinder sind die Erziehungsberechtigten für das rechtzeitige Bringen und
          Abholen verantwortlich. Allergien, gesundheitliche Einschränkungen oder besondere
          Bedürfnisse sind bei der Anmeldung mitzuteilen. Die Aufsichtspflicht des Ateliers besteht
          nur während der Kurszeit und im Rahmen des Angebots.
        </p>
      ),
    },
    {
      title: "Foto- & Bildaufnahmen",
      body: (
        <p>
          Im Kurs entstehen gelegentlich Fotos für die Dokumentation und – nur mit ausdrücklicher
          Zustimmung – für die Website oder Social Media. Ohne Einwilligung werden keine erkennbaren
          Aufnahmen von Teilnehmenden veröffentlicht. Eine erteilte Zustimmung kann jederzeit mit
          Wirkung für die Zukunft widerrufen werden.
        </p>
      ),
    },
    {
      title: "Haftung",
      body: (
        <p>
          Die Teilnahme erfolgt auf eigene Verantwortung. Das Atelier haftet nur für Schäden, die es
          vorsätzlich oder grobfahrlässig verursacht hat; die Haftung für leichte Fahrlässigkeit ist
          im gesetzlich zulässigen Umfang ausgeschlossen. Für mitgebrachte persönliche Gegenstände
          wird keine Haftung übernommen. Für Schäden, welche Teilnehmende vorsätzlich oder
          grobfahrlässig an Einrichtung oder Material verursachen, haften diese selbst.
        </p>
      ),
    },
    {
      title: "Höhere Gewalt",
      body: (
        <p>
          Kann das Atelier seine Leistung aufgrund von Umständen ausserhalb seines Einflussbereichs
          (z.&nbsp;B. behördliche Anordnungen, Naturereignisse) nicht erbringen, ruhen die
          gegenseitigen Pflichten für die Dauer des Ereignisses. Bereits bezahlte Beträge werden in
          diesem Fall gutgeschrieben oder zurückerstattet.
        </p>
      ),
    },
    {
      title: "Datenschutz",
      body: (
        <p>
          Die Bearbeitung von Personendaten richtet sich nach unserer{" "}
          <a href="/datenschutz">Datenschutzerklärung</a> und dem revidierten Schweizer
          Datenschutzgesetz (revDSG).
        </p>
      ),
    },
    {
      title: "Schlussbestimmungen",
      body: (
        <p>
          Sollte eine Bestimmung dieser AGB unwirksam sein, bleibt die Gültigkeit der übrigen
          Bestimmungen unberührt; an die Stelle der unwirksamen Bestimmung tritt eine dem Zweck am
          nächsten kommende zulässige Regelung. Es gilt ausschliesslich Schweizer Recht unter
          Ausschluss des Kollisionsrechts und des UN-Kaufrechts (CISG). Ausschliesslicher
          Gerichtsstand ist – soweit gesetzlich zulässig – der Sitz des Ateliers in{" "}
          {SITE.address.city}.
        </p>
      ),
    },
  ];

  return (
    <LegalPage
      title="AGB"
      eyebrow="Rechtliches"
      lead="Allgemeine Geschäftsbedingungen für Kurse, Gutscheine und Raummieten des Atelier Türkis."
      updated="Stand: August 2026"
      sections={sections}
    />
  );
}
