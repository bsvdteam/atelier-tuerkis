import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Angebot" };

const PILLARS = [
  { href: "/angebot/erwachsene", bg: "coral", icon: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0116 0" /></>, t: "Erwachsene", p: "Nähen, Lettering, Malen, Cyanotypie & mehr.", go: "Kurse ansehen" },
  { href: "/angebot/kinder", bg: "yellow", icon: <><circle cx="12" cy="12" r="9" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><circle cx="9" cy="10" r="1" fill="#fff" stroke="none" /><circle cx="15" cy="10" r="1" fill="#fff" stroke="none" /></>, t: "Kinder", p: "Werkstatt, Ferienkurse & Geburtstage.", go: "Los geht's" },
  { href: "/angebot/gruppen", bg: "violet", icon: <><circle cx="9" cy="9" r="3.5" /><circle cx="17" cy="10" r="2.5" /><path d="M2.5 20a6.5 6.5 0 0113 0M15 20a5 5 0 016.5-4.8" /></>, t: "Gruppen", p: "Firmen, Vereine & Feiern.", go: "Mehr erfahren" },
  { href: "/angebot/raeume", bg: "teal", icon: <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" />, t: "Räume mieten", p: "Für Kursleiter & Kreative.", go: "Details" },
];

const TERMINE = [
  { href: "/angebot/erwachsene/aquarell-fuer-einsteiger", c: "coral", tag: "Erwachsene", title: "Aquarell für Einsteiger", desc: "Start: 14. September · Di 18–20 Uhr", price: "CHF 280" },
  { href: "/angebot/kinder/ferienkurse", c: "yellow", tag: "Kinder · Ferien", title: "Ferienwerkstatt Herbst", desc: "6.–8. Oktober · je 9–12 Uhr", price: "CHF 120" },
  { href: "/angebot/erwachsene/cyanotypie-workshop", c: "violet", tag: "Erwachsene", title: "Cyanotypie-Workshop", desc: "Neu · 8. November · Sa 13–17 Uhr", price: "CHF 160" },
  { href: "/angebot/kinder/kreativwerkstatt-gross", c: "green", tag: "Kinder · 8–12", title: "Kreativwerkstatt Mittwoch", desc: "Laufend · Mi 14–16 Uhr", price: "CHF 22 / Mal" },
];

export default async function AngebotPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Angebot" }]}
        eyebrow="Unser Angebot"
        title={<>Finde deinen <span className="squiggle-word">Kurs</span>.</>}
        lead="Von Aquarell bis Keramik, von den Kleinsten bis zu den Grossen, hier ist für jede kreative Neugier etwas dabei. Wähle deinen Bereich:"
      />

      <section className="section section--tight">
        <div className="container">
          <div className="grid grid-4">
            {PILLARS.map((p, i) => (
              <Link key={p.href} className={`pillar reveal${i === 1 ? " d1" : i === 2 ? " d2" : i === 3 ? " d3" : ""}`} href={p.href}>
                <div className="pillar__icon" style={{ background: `var(--${p.bg})` }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">{p.icon}</svg>
                </div>
                <h3>{p.t}</h3>
                <p>{p.p}</p>
                <span className="pillar__go">{p.go} <span className="arr">→</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="stack-head reveal">
            <div><span className="eyebrow">Aktuelle Termine</span><h2 className="h2 mt-s">Was als Nächstes startet</h2></div>
          </div>
          <div className="grid grid-2">
            {TERMINE.map((t, i) => (
              <Link key={t.href} className={`card reveal${i % 2 === 1 ? " d1" : ""}`} href={t.href} style={{ flexDirection: "row", alignItems: "stretch" }}>
                <div className={`ph ph--${t.c}`} style={{ width: "120px", flex: "none" }} />
                <div className="card__body">
                  <span className={`tag tag--${t.c}`}>{t.tag}</span>
                  <h3 className="card__title">{t.title}</h3>
                  <p className="card__desc">{t.desc}</p>
                  <div className="card__foot"><span className="card__price">{t.price}</span><span className="card__arrow">→</span></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-banner reveal">
            <span className="tag tag--sky">Unsicher, was passt?</span>
            <h2 className="h2 mt-s">Wir beraten dich gerne</h2>
            <p className="lead mt-s center maxw">Schreib uns kurz, was dich interessiert, wir finden gemeinsam den passenden Kurs.</p>
            <div className="btn-row"><Link href="/kontakt" className="btn btn--coral btn--lg">Kontakt aufnehmen <span className="arr">→</span></Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
