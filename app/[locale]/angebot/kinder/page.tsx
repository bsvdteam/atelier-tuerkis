import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCourses } from "@/lib/db";
import { getLocalised } from "@/lib/localise";
import type { Locale } from "@/types";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Kinderangebote" };

const EMOJI = ["🖌️", "✂️", "🌈", "🏖️", "🎂", "🖐️", "🎨", "✨"];
const d = (i: number) => (i % 3 === 1 ? " d1" : i % 3 === 2 ? " d2" : "");

export default async function KinderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;
  const courses = await getCourses("kinder");

  return (
    <div className="theme-kids">
      <section className="pagehead" style={{ position: "relative" }}>
        <span className="confetti-dots" aria-hidden="true" />
        <div className="container">
          <p className="crumbs reveal"><Link href="/">Home</Link> · <Link href="/angebot">Angebot</Link> · Kinder</p>
          <span className="badge-fun reveal">🎨 Für kleine Künstler:innen</span>
          <h1 className="h1 reveal d1" style={{ fontSize: "clamp(2.6rem,7vw,4.4rem)", margin: "16px 0 14px" }}>
            Hier wird <span className="wiggle" style={{ display: "inline-block", color: "var(--coral)" }}>gematscht</span>,<br />gebaut &amp; gemalt! ✨
          </h1>
          <p className="lead reveal d2">Bei uns dürfen Kinder ausprobieren, staunen und stolz sein. Kein Richtig, kein Falsch, nur ganz viel Farbe, Kleber und gute Laune. Für Kinder von 4 bis 12 Jahren.</p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="grid grid-3">
            {courses.map((c, i) => {
              const href = c.ctaTo === "kontakt" ? "/kontakt" : `/angebot/kinder/${c.slug}`;
              return (
                <article key={c.slug} className={`card kids-card reveal${d(i)}`}>
                  <div className="kids-card__top" style={{ background: `var(--${c.color})` }}>
                    <span className="kids-card__emoji wiggle">{EMOJI[i % EMOJI.length]}</span><br />
                    <span className="kids-card__age">{getLocalised(c.category, locale)}</span>
                  </div>
                  <div className="card__body">
                    <h3 className="card__title">{getLocalised(c.title, locale)}</h3>
                    <p className="card__desc">{getLocalised(c.teaser, locale)}</p>
                    <div className="card__foot">
                      <span className="card__price">{c.price}</span>
                      <Link className="btn btn--coral btn--sm" href={href}>{c.ctaTo === "kontakt" ? "Anfragen" : "Los!"}</Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="frost reveal" style={{ padding: "44px 34px", position: "relative", overflow: "hidden" }}>
            <span className="confetti-dots" aria-hidden="true" />
            <div className="center maxw">
              <h2 className="h2">Warum Kinder uns lieben 💛</h2>
              <p className="lead mt-s">Weil sie hier einfach machen dürfen. Wir geben Anregung, Material und Zeit, und staunen, was daraus entsteht.</p>
            </div>
            <div className="grid grid-3 mt-l">
              {[["🎨", "Alles darf", "Kein Richtig, kein Falsch."], ["🤝", "Kleine Gruppen", "Jedes Kind wird gesehen."], ["🌟", "Stolz nach Hause", "Mit einem echten Kunstwerk."]].map(([e, t, p], i) => (
                <div key={t} className={`value reveal${d(i)}`} style={{ justifyContent: "center", textAlign: "center", flexDirection: "column", alignItems: "center" }}>
                  <span style={{ fontSize: "2.6rem" }}>{e}</span>
                  <h3 style={{ marginTop: "8px" }}>{t}</h3>
                  <p>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-banner reveal">
            <span className="badge-fun">👋 Für Eltern</span>
            <h2 className="h2 mt-s">Noch Fragen? Wir helfen gern.</h2>
            <p className="lead mt-s center maxw">Anmeldung, Termine oder Geburtstage, schreib uns einfach kurz.</p>
            <div className="btn-row">
              <Link href="/kontakt" className="btn btn--coral btn--lg">Kontakt aufnehmen <span className="arr">→</span></Link>
              <Link href="/gutscheine" className="btn btn--ghost btn--lg">Gutschein verschenken</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
