import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { getTeam } from "@/lib/db";
import { getLocalised } from "@/lib/localise";
import type { Locale } from "@/types";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Atelier" };

const VALUES = [
  { icon: <path d="M3 12h4l3 8 4-16 3 8h4" />, bg: "teal", t: "Raum zum Abschalten", p: "Zeit nur für dich und deine Kreativität." },
  { icon: <path d="M12 3v18M3 12h18" />, bg: "coral", t: "Raum zum Ausprobieren", p: "Fehler sind hier erlaubt, sie gehören dazu." },
  { icon: <><circle cx="9" cy="9" r="4" /><path d="M15 21a6 6 0 00-12 0M16 11a4 4 0 100-8M21 21a6 6 0 00-4-5.7" /></>, bg: "violet", t: "Kreativität verbindet", p: "Gemeinsam gestalten schafft echte Nähe." },
  { icon: <path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2L12 16.4 5.7 21l2.3-7.2-6-4.4h7.6z" />, bg: "yellow", t: "Wertschätzende Atmosphäre", p: "Jedes Werk und jeder Mensch ist willkommen." },
  { icon: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /></>, bg: "green", t: "Kleine Gruppen", p: "Ruhe und Aufmerksamkeit für jeden Einzelnen." },
  { icon: <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0112 5a5.5 5.5 0 019.5 7c-2.5 4.5-9.5 9-9.5 9z" />, bg: "sky", t: "Individuelle Begleitung", p: "Wir gehen auf dein Tempo und deine Ideen ein." },
];

const MASONRY = [
  { c: "sky", t: "t3" }, { c: "green", t: "t2" }, { c: "yellow", t: "t4" }, { c: "teal", t: "t1" },
  { c: "coral", t: "t2" }, { c: "violet", t: "t3" }, { c: "orange", t: "t1" }, { c: "pink", t: "t4" },
];

const d = (i: number) => (i % 3 === 1 ? " d1" : i % 3 === 2 ? " d2" : "");

export default async function AtelierPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;
  const team = await getTeam();

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Atelier" }]}
        eyebrow="Unser Atelier"
        title={<>Ein Ort zum <span className="squiggle-word">Aufatmen</span><br />und Gestalten.</>}
        lead="Wir sind ein kleines Kreativatelier mit einem grossen Glauben: Jeder Mensch kann gestalten. Bei uns findest du Ruhe, Material und Menschen, die dich begleiten, egal, ob du zum ersten Mal einen Pinsel hältst oder schon lange malst."
      />

      {/* GESCHICHTE */}
      <section className="section">
        <div className="container">
          <div className="split">
            <div className="split__media reveal"><div className="ph ph--teal" /></div>
            <div className="reveal d1">
              <span className="eyebrow">Unsere Geschichte</span>
              <h2 className="h2 mt-s">Aus Freude entstanden</h2>
              <p className="lead mt-s">Das Atelier Türkis begann als Idee an einem Küchentisch, mit dem Wunsch, einen Raum zu schaffen, in dem Kreativität nicht bewertet, sondern gefeiert wird.</p>
              <p className="mt-s muted">Heute ist es ein heller Ort, an dem Kinder ihre ersten Kunstwerke schaffen und Erwachsene neue Techniken entdecken. Was uns geblieben ist: die Überzeugung, dass Gestalten guttut, dem Kopf, dem Herzen und der Gemeinschaft.</p>
              <div className="btn-row mt-m"><Link href="/angebot" className="btn btn--coral">Unser Angebot <span className="arr">→</span></Link></div>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHIE */}
      <section className="section">
        <div className="container">
          <div className="center maxw reveal">
            <span className="eyebrow">Unsere Philosophie</span>
            <h2 className="h2 mt-s">Woran wir glauben</h2>
            <p className="lead mt-s">Sechs Grundsätze, die man bei uns spürt, vom ersten Moment an.</p>
          </div>
          <div className="grid grid-3 mt-l">
            {VALUES.map((v, i) => (
              <div key={v.t} className={`value reveal${d(i)} frost`} style={{ padding: "24px", borderRadius: "26px" }}>
                <div className="value__icon" style={{ background: `var(--${v.bg})` }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">{v.icon}</svg>
                </div>
                <div><h3>{v.t}</h3><p>{v.p}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIE RÄUME */}
      <section className="section">
        <div className="container">
          <div className="stack-head reveal">
            <div>
              <span className="eyebrow">Die Räume</span>
              <h2 className="h2 mt-s">Hell, ruhig, inspirierend</h2>
            </div>
            <Link href="/angebot/raeume" className="btn btn--outline">Räume mieten <span className="arr">→</span></Link>
          </div>
          <div className="masonry reveal">
            {MASONRY.map((m, i) => (
              <div className="masonry__item" key={i}><div className={`ph ph--${m.c} ${m.t}`} /></div>
            ))}
          </div>
          <div className="grid grid-3 mt-l">
            {["Viel Tageslicht & Platz", "Hochwertiges Material", "Ruhige, freundliche Umgebung"].map((txt, i) => (
              <span key={txt} className={`pill-info reveal${d(i)}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5L20 7" /></svg> {txt}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section">
        <div className="container">
          <div className="center maxw reveal">
            <span className="eyebrow">Das Team</span>
            <h2 className="h2 mt-s">Wer dich begleitet</h2>
            <p className="lead mt-s">Menschen, die ihr Handwerk lieben, und es mit Geduld und Freude weitergeben.</p>
          </div>
          <div className="grid grid-3 mt-l">
            {team.map((m, i) => (
              <article key={m.slug} className={`card team-card reveal${d(i)}`}>
                <div className="card__media"><div className={`ph ph--${m.color}`} /></div>
                <div className="card__body">
                  <span className="role">{getLocalised(m.role, locale)}</span>
                  <h3>{m.name}</h3>
                  <p className="card__desc">{getLocalised(m.bio, locale)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section className="section">
        <div className="container">
          <div className="frost reveal" style={{ padding: "40px 34px" }}>
            <div className="split" style={{ alignItems: "center" }}>
              <div>
                <span className="eyebrow">Kontakt &amp; Anfahrt</span>
                <h2 className="h2 mt-s">Besuch uns im Atelier</h2>
                <p className="lead mt-s" style={{ maxWidth: "34ch" }}>Komm vorbei oder schreib uns, am liebsten per WhatsApp.</p>
                <div className="btn-row mt-m">
                  <a href="https://wa.me/41791234567?text=Hallo%20Atelier%20T%C3%BCrkis%2C%20ich%20h%C3%A4tte%20eine%20Frage." target="_blank" rel="noopener noreferrer" className="btn btn--primary">Auf WhatsApp schreiben <span className="arr">→</span></a>
                  <Link href="/kontakt" className="btn btn--ghost">Kontaktseite</Link>
                </div>
              </div>
              <div className="contact-grid">
                <div className="contact-card"><span className="label">Adresse</span><p>Wolfensbergstrasse 9<br />9113 Degersheim</p></div>
                <div className="contact-card"><span className="label">Öffnungszeiten</span><p>Mi–Fr 9–18 Uhr<br />Sa 9–13 Uhr</p></div>
                <div className="contact-card"><span className="label">Telefon</span><a href="tel:+41791234567">+41 79 123 45 67</a></div>
                <div className="contact-card"><span className="label">E-Mail</span><a href="mailto:hallo@atelier-tuerkis.ch">hallo@atelier-tuerkis.ch</a></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
