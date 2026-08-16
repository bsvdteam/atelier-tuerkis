import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CourseCard } from "@/components/ui/CourseCard";
import { Testimonials } from "@/components/home/Testimonials";
import { TESTIMONIALS } from "@/content";
import { getCourses } from "@/lib/db";
import type { Course, Locale } from "@/types";

export const dynamic = "force-dynamic";

const FLOAT = {
  arc: (c: string) => <path d="M8 26 Q20 6 32 26" stroke={c} strokeWidth="4" fill="none" strokeLinecap="round" />,
  circle: (c: string) => <circle cx="20" cy="20" r="12" fill="none" stroke={c} strokeWidth="4" />,
  star: (c: string) => <path d="M20 4l4 12h12l-10 8 4 12-10-8-10 8 4-12-10-8h12z" fill={c} />,
  square: (c: string) => <rect x="8" y="8" width="24" height="24" rx="8" fill="none" stroke={c} strokeWidth="4" />,
};

const TECHS = [
  { c: "green", e: "✏️", t: "Zeichnen", s: "Sehen und festhalten" },
  { c: "orange", e: "📦", t: "Kartonage", s: "Schachteln & Boxen" },
  { c: "coral", e: "🖐️", t: "Stempeldruck", s: "Selber schnitzen & drucken" },
  { c: "sky", e: "📓", t: "Buchbinden", s: "Eigene Notizbücher" },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;

  const adults = await getCourses("erwachsene");
  const featuredSlugs = ["aquarell-fuer-einsteiger", "handlettering-kalligrafie", "naehen-fuer-einsteiger"];
  const featured = (featuredSlugs
    .map((s) => adults.find((c) => c.slug === s))
    .filter(Boolean) as Course[]).concat(adults).slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <span className="float-wrap" data-parallax="0.22" style={{ top: "8%", left: "6%" }}>
          <svg className="float" style={{ ["--r" as string]: "-8deg" }} width="70" height="70" viewBox="0 0 40 40" aria-hidden="true">{FLOAT.arc("#FF6F91")}</svg>
        </span>
        <span className="float-wrap" data-parallax="0.12" style={{ top: "14%", right: "8%" }}>
          <svg className="float float--2" style={{ ["--r" as string]: "10deg" }} width="58" height="58" viewBox="0 0 40 40" aria-hidden="true">{FLOAT.circle("#FFC94D")}</svg>
        </span>
        <span className="float-wrap" data-parallax="0.3" style={{ bottom: "6%", left: "12%" }}>
          <svg className="float float--3" style={{ ["--r" as string]: "6deg" }} width="48" height="48" viewBox="0 0 40 40" aria-hidden="true">{FLOAT.star("#9B8CFF")}</svg>
        </span>
        <span className="float-wrap" data-parallax="0.16" style={{ bottom: "14%", right: "10%" }}>
          <svg className="float" style={{ ["--r" as string]: "-12deg" }} width="54" height="54" viewBox="0 0 40 40" aria-hidden="true">{FLOAT.square("#57C9EC")}</svg>
        </span>

        <div className="container hero__inner">
          <span className="eyebrow reveal">Kunst- &amp; Kreativatelier · Degersheim</span>
          <h1 className="display reveal d1">
            Kreativität <span className="squiggle-word">erleben</span>,<br />entdecken &amp; gestalten.
          </h1>
          <p className="lead reveal d2">
            Ein heller, ruhiger Ort für Kinder und Erwachsene. Hier zählt nicht die Perfektion,
            sondern die Freude am Gestalten.
          </p>
          <div className="btn-row hero__ctas reveal d3">
            <Link href="/angebot" className="btn btn--coral btn--lg">
              Kurse entdecken <span className="arr">→</span>
            </Link>
            <Link href="/kontakt" className="btn btn--ghost btn--lg">
              Kontakt
            </Link>
          </div>
        </div>
      </section>

      {/* WILLKOMMEN */}
      <section className="section section--tight">
        <div className="container">
          <div className="split split--wide-l">
            <div className="reveal">
              <span className="eyebrow">Willkommen</span>
              <h2 className="h2 mt-s">Ein Atelier, das Mut zum Gestalten macht.</h2>
              <p className="lead mt-s">
                Wir glauben: Jeder Mensch kann kreativ sein. Bei uns findest du Raum zum Abschalten,
                zum Ausprobieren und zum Wachsen.
              </p>
              <div className="btn-row mt-m">
                <Link href="/atelier" className="btn btn--outline">
                  Mehr über uns <span className="arr">→</span>
                </Link>
              </div>
            </div>
            <div className="grid" style={{ gap: "14px" }}>
              <div className="value reveal frost" style={{ padding: "20px", borderRadius: "24px" }}>
                <div className="value__icon" style={{ background: "var(--coral)" }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0112 5a5.5 5.5 0 019.5 7c-2.5 4.5-9.5 9-9.5 9z" /></svg>
                </div>
                <div><h3>Viel Zeit für dich</h3><p>Kleine Gruppen, in denen jede und jeder gesehen wird.</p></div>
              </div>
              <div className="value reveal d1 frost" style={{ padding: "20px", borderRadius: "24px" }}>
                <div className="value__icon" style={{ background: "var(--violet)" }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2-6.3-4.6L5.7 21l2.3-7.2-6-4.4h7.6z" /></svg>
                </div>
                <div><h3>Freude statt Perfektion</h3><p>Es darf gelingen, und es darf auch mal krumm sein.</p></div>
              </div>
              <div className="value reveal d2 frost" style={{ padding: "20px", borderRadius: "24px" }}>
                <div className="value__icon" style={{ background: "var(--teal)" }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16M6 16l4-8 4 6 4-10" /></svg>
                </div>
                <div><h3>Persönliche Begleitung</h3><p>Wir gehen auf dich ein, vom ersten Strich an.</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VERTRAUENS-ZAHLEN */}
      <section className="section section--tight">
        <div className="container">
          <div className="frost reveal" style={{ padding: "34px 28px" }}>
            <div className="stats">
              <div className="stat"><div className="stat__num">12</div><div className="stat__label">Jahre Erfahrung</div></div>
              <div className="stat"><div className="stat__num">40<sup>+</sup></div><div className="stat__label">Kurse &amp; Workshops</div></div>
              <div className="stat"><div className="stat__num">2000<sup>+</sup></div><div className="stat__label">Teilnehmende</div></div>
              <div className="stat"><div className="stat__num">4.9<sup>★</sup></div><div className="stat__label">auf Google</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* KURSANGEBOT */}
      <section className="section">
        <div className="container">
          <div className="center maxw reveal">
            <span className="eyebrow">Kurse &amp; Workshops</span>
            <h2 className="h2 mt-s">Finde deine Technik</h2>
            <p className="lead mt-s">
              Von der ersten Farbe bis zur eigenen Handschrift. Entdecke in ruhiger Atmosphäre und
              kleinen Gruppen, was dir liegt.
            </p>
          </div>
          <div className="techgrid mt-l">
            {TECHS.map((tech, i) => (
              <Link key={tech.t} className={`tech reveal${i % 3 === 1 ? " d1" : i % 3 === 2 ? " d2" : ""}`} href="/angebot/erwachsene">
                <span className="tech__dot" style={{ background: `var(--${tech.c})` }}>{tech.e}</span>
                <span><b>{tech.t}</b><span>{tech.s}</span></span>
              </Link>
            ))}
          </div>
          <div className="btn-row mt-m" style={{ justifyContent: "center" }}>
            <Link href="/angebot/erwachsene" className="btn btn--coral">Alle Kurse für Erwachsene <span className="arr">→</span></Link>
          </div>
          <div className="agerow reveal" style={{ marginTop: "36px" }}>
            <Link href="/angebot/kinder" className="agerow__link"><strong>Kinderkurse</strong><span>Kreativwerkstatt, Ferien &amp; Geburtstage</span></Link>
            <Link href="/angebot/gruppen" className="agerow__link"><strong>Gruppenkurse</strong><span>Firmen, Vereine, Geburtstage</span></Link>
          </div>
        </div>
      </section>

      {/* AKTUELLE KURSE */}
      <section className="section">
        <div className="container">
          <div className="stack-head reveal">
            <div>
              <span className="eyebrow">Aktuelle Kurse</span>
              <h2 className="h2 mt-s">Diese Kurse starten bald</h2>
            </div>
            <Link href="/angebot" className="btn btn--outline">Alle Kurse <span className="arr">→</span></Link>
          </div>
          <div className="grid grid-3">
            {featured.map((c, i) => (
              <CourseCard key={c.slug} course={c} locale={locale} reveal={i === 1 ? "reveal d1" : i === 2 ? "reveal d2" : "reveal"} />
            ))}
          </div>
        </div>
      </section>

      {/* EINBLICKE / INSTAGRAM */}
      <section className="section">
        <div className="container">
          <div className="stack-head reveal">
            <div>
              <span className="eyebrow">Einblicke</span>
              <h2 className="h2 mt-s">Aus dem Atelier, Tag für Tag</h2>
            </div>
            <a href="https://instagram.com/atelier.tuerkis" target="_blank" rel="noopener noreferrer" className="btn btn--outline">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg> @atelier.tuerkis
            </a>
          </div>
          <div className="insta__grid reveal">
            {["sky", "coral", "green", "yellow", "violet", "orange"].map((c, i) => (
              <a className="insta__tile" href="https://instagram.com/atelier.tuerkis" target="_blank" rel="noopener noreferrer" key={i} aria-label="Instagram-Beitrag"><div className={`ph ph--${c}`} /></a>
            ))}
          </div>
          <div className="center" style={{ marginTop: "22px" }}>
            <Link href="/galerie" className="insta__handle">Mehr in der Galerie <span className="arr">→</span></Link>
          </div>
        </div>
      </section>

      {/* STIMMEN */}
      <section className="section testi">
        <div className="container">
          <div className="center maxw reveal">
            <span className="eyebrow">Stimmen</span>
            <h2 className="h2 mt-s">Das schönste Feedback kommt von Herzen</h2>
          </div>
          <Testimonials items={TESTIMONIALS} />
        </div>
      </section>

      {/* GUTSCHEINE + KONTAKT */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <div className="cta-banner reveal" style={{ textAlign: "left" }}>
              <span className="tag tag--coral">Sehr beliebt</span>
              <h2 className="h2 mt-s">Kreativität verschenken</h2>
              <p className="lead mt-s">Gutscheine für Kurse, Geburtstage oder als Weihnachtsgeschenk, Freude zum Auspacken.</p>
              <div className="btn-row mt-m"><Link href="/gutscheine" className="btn btn--coral">Zu den Gutscheinen <span className="arr">→</span></Link></div>
            </div>
            <div className="cta-banner reveal d1" style={{ textAlign: "left" }}>
              <span className="tag tag--sky">Kontakt</span>
              <h2 className="h2 mt-s">Fragen? Schreib uns.</h2>
              <p className="lead mt-s">Am schnellsten per WhatsApp oder E-Mail. Wir freuen uns auf dich.</p>
              <div className="btn-row mt-m">
                <a href="https://wa.me/41796561126?text=Hallo%20Elena%2C%20ich%20interessiere%20mich%20f%C3%BCr%20einen%20Kurs.%20K%C3%B6nnt%20ihr%20mir%20mehr%20Infos%20geben%3F" target="_blank" rel="noopener noreferrer" className="btn btn--primary">Auf WhatsApp schreiben <span className="arr">→</span></a>
                <Link href="/kontakt" className="btn btn--ghost">Alle Kontakt-Wege</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
