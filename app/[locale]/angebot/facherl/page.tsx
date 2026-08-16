import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactCta } from "@/components/ui/ContactCta";
import { cn } from "@/lib/utils";
import type { PlaceholderColor } from "@/types";

export const metadata: Metadata = { title: "Facherl" };

const SHELF: { color: PlaceholderColor; label: string; free?: boolean }[] = [
  { color: "coral", label: "Keramik" },
  { color: "yellow", label: "frei", free: true },
  { color: "teal", label: "Karten" },
  { color: "violet", label: "Schmuck" },
  { color: "sky", label: "frei", free: true },
  { color: "green", label: "Textiles" },
  { color: "orange", label: "Papeterie" },
  { color: "pink", label: "frei", free: true },
];

const PLANS = [
  { t: "Halbes Jahr", price: "CHF 30", note: "6 Monate dein Facherl", tag: "" },
  { t: "Ganzes Jahr", price: "CHF 50", note: "12 Monate, am beliebtesten", tag: "Beliebt" },
];

const STEPS = [
  { n: "1", text: "Sag uns Bescheid, wir zeigen dir, welche Fächer gerade frei sind." },
  { n: "2", text: "Du gestaltest dein Facherl: ausstellen, dekorieren oder zum Verkauf anbieten." },
  { n: "3", text: "Wir geben ihm einen Platz im Atelier, deine kleine Bühne mitten im Geschehen." },
];

export default async function FacherlPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Angebot", href: "/angebot" },
          { label: "Facherl" },
        ]}
        eyebrow="Facherl"
        title={<>Dein eigenes <span className="squiggle-word">Facherl</span></>}
        lead="In unserem Atelier steht ein Regal voller kleiner Fächer, dein eigenes Schaufenster mitten im Atelier. Stell aus, verkaufe oder zeig einfach, was du gestaltest. Wir kümmern uns um den Ort, du um die Ideen."
      />

      {/* Das Regal */}
      <section className="section--tight">
        <div className="container">
          <div className="shelf reveal">
            {SHELF.map((f, i) => (
              <div key={i} className={cn("fach", `ph ph--${f.color}`, f.free && "fach--free")}>
                <span className="fach__label">{f.free ? "frei" : f.label}</span>
              </div>
            ))}
          </div>
          <p className="muted center" style={{ marginTop: "16px", fontSize: "0.9rem" }}>
            Jedes Fach ist ein kleiner Ausstellungsplatz, einige sind gerade frei.
          </p>
        </div>
      </section>

      {/* Preise */}
      <section className="section">
        <div className="container">
          <div className="center maxw reveal">
            <span className="eyebrow">Miete</span>
            <h2 className="h2 mt-s">Zwei einfache Preise</h2>
          </div>
          <div className="grid grid-2 mt-l" style={{ maxWidth: "720px", margin: "0 auto" }}>
            {PLANS.map((p) => (
              <div key={p.t} className="frost reveal" style={{ padding: "34px 30px", textAlign: "center", position: "relative" }}>
                {p.tag && <span className="tag tag--coral" style={{ position: "absolute", top: "18px", right: "18px" }}>{p.tag}</span>}
                <h3 className="h3">{p.t}</h3>
                <div className="card__price" style={{ fontSize: "2.6rem", margin: "10px 0 4px" }}>{p.price}</div>
                <p className="muted">{p.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* So funktioniert's */}
      <section className="section--tight">
        <div className="container">
          <div className="center maxw reveal">
            <span className="eyebrow">So funktioniert's</span>
            <h2 className="h2 mt-s">In drei Schritten zum Facherl</h2>
          </div>
          <div className="grid grid-3 mt-l">
            {STEPS.map((s) => (
              <div key={s.n} className="frost reveal" style={{ padding: "26px" }}>
                <span className="flex" style={{ display: "flex", width: "44px", height: "44px", alignItems: "center", justifyContent: "center", borderRadius: "999px", background: "var(--teal-deep)", color: "#fff", fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600 }}>{s.n}</span>
                <p className="mt-s">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-banner reveal">
            <span className="tag tag--sky">Frei ab sofort</span>
            <h2 className="h2 mt-s">Ein Facherl reservieren</h2>
            <p className="lead mt-s center maxw">Schreib uns kurz, wir sagen dir, welche Fächer frei sind, und richten dir deins ein.</p>
            <div className="btn-row" style={{ justifyContent: "center" }}>
              <ContactCta
                whatsappText="Hallo Elena, ich möchte gern ein Facherl mieten. Ist gerade eines frei?"
                emailSubject="Facherl mieten"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
