import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = { title: "Gutscheine" };

const TYPES = [
  { bg: "coral", icon: <path d="M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7S9 2 6.5 3.5 8 7 12 7zM12 7s3-5 5.5-3.5S16 7 12 7z" />, t: "Kursgutschein", p: "Für einen bestimmten Kurs, Aquarell, Lettering, Nähen & mehr." },
  { bg: "yellow", icon: <><path d="M4 21h16V9l-8-6-8 6z" /><path d="M9 21v-6h6v6" /></>, t: "Geburtstagsgutschein", p: "Ein kreatives Geschenk für kleine und grosse Geburtstagskinder." },
  { bg: "violet", icon: <path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2L12 16.4 5.7 21l2.3-7.2-6-4.4h7.6z" />, t: "Weihnachtsgeschenk", p: "Frei wählbarer Betrag, das Geschenk, das garantiert Freude macht." },
];

export default async function GutscheinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <section className="pagehead">
        <div className="container">
          <p className="crumbs reveal"><Link href="/">Home</Link> · Gutscheine</p>
          <span className="badge-fun reveal">🎁 Sehr beliebt</span>
          <h1 className="display reveal d1" style={{ marginTop: "14px" }}>Kreativität <span className="squiggle-word">verschenken</span>.</h1>
          <p className="lead reveal d2">Ein Gutschein vom Atelier Türkis ist mehr als ein Geschenk, er ist ein Nachmittag voller Farben, Ruhe und Freude. Für einen bestimmten Kurs oder als frei wählbarer Betrag.</p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="grid grid-3">
            {TYPES.map((ty, i) => (
              <div key={ty.t} className={`pillar reveal${i === 1 ? " d1" : i === 2 ? " d2" : ""}`}>
                <div className="pillar__icon" style={{ background: `var(--${ty.bg})` }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">{ty.icon}</svg>
                </div>
                <h3>{ty.t}</h3>
                <p>{ty.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="frost reveal" style={{ padding: "44px 34px" }}>
            <div className="split">
              <div>
                <span className="eyebrow">So einfach geht's</span>
                <h2 className="h2 mt-s">In drei Schritten zum Gutschein</h2>
                <ul className="checklist mt-m">
                  <li>Schreib uns Wunschkurs oder Betrag &amp; Anlass</li>
                  <li>Wir gestalten den Gutschein, digital oder gedruckt</li>
                  <li>Du erhältst ihn zum Verschenken (Abholung oder Versand)</li>
                </ul>
                <div className="btn-row mt-m"><Link href="/kontakt" className="btn btn--coral btn--lg">Gutschein bestellen <span className="arr">→</span></Link></div>
              </div>
              <div className="split__media" style={{ aspectRatio: "4/3" }}>
                <div className="ph ph--coral" style={{ position: "relative" }}><span className="ph-label">🎁 Gutschein</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
