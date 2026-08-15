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
      title: "Geltungsbereich",
      body: (
        <p>
          Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Kurse, Workshops,
          Gruppenangebote, Raummieten und Gutscheine des {SITE.name}. Mit deiner Anmeldung
          akzeptierst du diese Bedingungen.
        </p>
      ),
    },
    {
      title: "Anmeldung",
      body: (
        <p>
          Die Anmeldung erfolgt unkompliziert per WhatsApp, E-Mail oder Telefon. Sie ist verbindlich,
          sobald wir sie dir bestätigt haben. Die Plätze werden in der Reihenfolge der Anmeldungen
          vergeben; die Teilnehmerzahl ist begrenzt.
        </p>
      ),
    },
    {
      title: "Preise & Bezahlung",
      body: (
        <p>
          Es gelten die zum Zeitpunkt der Anmeldung kommunizierten Preise in Schweizer Franken (CHF),
          inklusive Material, sofern nicht anders angegeben. Die Bezahlung erfolgt vor Kursbeginn –
          vor Ort oder auf Rechnung nach Absprache.
        </p>
      ),
    },
    {
      title: "Rücktritt durch Teilnehmende",
      body: (
        <>
          <p>Solltest du an einem gebuchten Kurs nicht teilnehmen können, gilt:</p>
          <ul>
            <li>Abmeldung bis 14 Tage vor Kursbeginn: kostenlos</li>
            <li>Abmeldung 7–14 Tage vorher: 50 % der Kurskosten</li>
            <li>Abmeldung weniger als 7 Tage vorher oder Nichterscheinen: 100 % der Kurskosten</li>
          </ul>
          <p>
            Findest du eine Ersatzperson, entfallen die Gebühren. Bei Krankheit melde dich bitte
            frühzeitig – wir finden gemeinsam eine faire Lösung, etwa das Nachholen eines Termins.
          </p>
        </>
      ),
    },
    {
      title: "Absage durch das Atelier",
      body: (
        <p>
          Wird ein Kurs mangels Teilnehmerzahl oder aus wichtigem Grund abgesagt, informieren wir
          dich rechtzeitig. Bereits bezahlte Beträge werden vollständig zurückerstattet oder auf
          Wunsch für einen anderen Kurs gutgeschrieben. Weitergehende Ansprüche bestehen nicht.
        </p>
      ),
    },
    {
      title: "Gutscheine",
      body: (
        <p>
          Gutscheine sind ab Ausstellung drei Jahre gültig und übertragbar. Eine Barauszahlung ist
          nicht möglich. Ein Restbetrag bleibt bis zum Ablauf der Gültigkeit bestehen.
        </p>
      ),
    },
    {
      title: "Kinderkurse",
      body: (
        <p>
          Bei Kinderkursen sind die Erziehungsberechtigten für das Bringen und Abholen verantwortlich.
          Bitte informiere uns bei der Anmeldung über Allergien oder besondere Bedürfnisse deines
          Kindes.
        </p>
      ),
    },
    {
      title: "Haftung",
      body: (
        <p>
          Die Teilnahme erfolgt auf eigene Verantwortung. Für mitgebrachte Gegenstände sowie für
          leichte Fahrlässigkeit übernehmen wir keine Haftung, soweit gesetzlich zulässig. Für
          Schäden, die vorsätzlich oder grobfahrlässig verursacht werden, haften die Teilnehmenden.
        </p>
      ),
    },
    {
      title: "Anwendbares Recht & Gerichtsstand",
      body: (
        <p>
          Es gilt ausschliesslich Schweizer Recht. Gerichtsstand ist, soweit gesetzlich zulässig, der
          Sitz des Ateliers in {SITE.address.city}.
        </p>
      ),
    },
  ];

  return (
    <LegalPage
      title="AGB"
      eyebrow="Rechtliches"
      lead="Allgemeine Geschäftsbedingungen für Kurse, Gutscheine und Raummieten."
      updated="Stand: August 2026"
      sections={sections}
    />
  );
}
