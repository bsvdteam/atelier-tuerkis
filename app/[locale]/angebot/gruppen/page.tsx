import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Gruppen" };

const PILLARS = [
  { bg: "teal", icon: <path d="M3 21h18M6 21V8h12v13M9 12h2M13 12h2M9 16h2M13 16h2" />, t: "Firmen", p: "Teamevents, die verbinden." },
  { bg: "coral", icon: <><circle cx="9" cy="9" r="3" /><circle cx="16" cy="10" r="2.5" /><path d="M3 19a6 6 0 0112 0M14 19a5 5 0 016-4.5" /></>, t: "Vereine", p: "Ausflüge mit Kreativfaktor." },
  { bg: "violet", icon: <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0112 5a5.5 5.5 0 019.5 7c-2.5 4.5-9.5 9-9.5 9z" />, t: "Freundesgruppen", p: "Ein besonderer Nachmittag." },
  { bg: "yellow", icon: <path d="M4 21h16M6 21v-8h12v8M9 13V9a3 3 0 016 0v4M12 3v3" />, t: "Geburtstage", p: "Feiern & gestalten in einem." },
];

export default async function GruppenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Angebot", href: "/angebot" }, { label: "Gruppen" }]}
        eyebrow="Gruppen"
        title={<>Gemeinsam <span className="squiggle-word">gestalten</span>.</>}
        lead="Ob Firmenevent, Vereinsausflug, Freundesrunde oder Feier, ein kreativer Nachmittag im Atelier verbindet und bleibt in Erinnerung. Wir stimmen Thema und Technik auf euch ab."
      />

      <section className="section section--tight">
        <div className="container">
          <div className="grid grid-4">
            {PILLARS.map((p, i) => (
              <div key={p.t} className={`pillar reveal${i === 1 ? " d1" : i === 2 ? " d2" : i === 3 ? " d3" : ""}`}>
                <div className="pillar__icon" style={{ background: `var(--${p.bg})` }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">{p.icon}</svg>
                </div>
                <h3>{p.t}</h3>
                <p>{p.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split">
            <div className="reveal">
              <span className="eyebrow">So läuft's</span>
              <h2 className="h2 mt-s">Auf euch zugeschnitten</h2>
              <p className="lead mt-s">Sagt uns, wer ihr seid und was euch Freude macht, den Rest organisieren wir. Material, Anleitung und ein passender Raum sind inklusive.</p>
              <ul className="checklist mt-m">
                <li>Bis 15 Personen pro Gruppe</li>
                <li>Individuelle Themen &amp; Techniken</li>
                <li>Dauer flexibel (2–4 Stunden)</li>
                <li>Material &amp; Anleitung inklusive</li>
              </ul>
            </div>
            <div className="reveal d1">
              <div className="frost" style={{ padding: "34px 30px" }}>
                <span className="tag tag--coral">Preis auf Anfrage</span>
                <h3 className="h3 mt-s">Erzählt uns von eurem Anlass</h3>
                <p className="muted mt-s">Gruppengrösse, Wunschtermin und Idee, wir melden uns mit einem passenden Vorschlag und Preis.</p>
                <div className="btn-row mt-m"><Link href="/kontakt" className="btn btn--coral">Anfrage senden <span className="arr">→</span></Link></div>
                <div className="split__media" style={{ aspectRatio: "16/9", marginTop: "22px" }}><div className="ph ph--violet" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
