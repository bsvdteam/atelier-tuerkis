import { Link } from "@/i18n/navigation";
import { getCourses, getTeamMember } from "@/lib/db";
import { getLocalised } from "@/lib/localise";
import { buildWhatsAppUrl, buildMailtoUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import type { Course, Locale } from "@/types";

const KID_EMOJI: Record<string, string> = {
  Alter: "🎂", Wann: "📅", Dauer: "⏰", Gruppe: "🧒", Material: "🎨", Mitbringen: "🖐️",
};
const MASONRY = ["pink", "sky", "yellow", "teal"];
const KID_MASONRY = ["coral", "sky", "green", "violet"];
const MONTHS = ["Jan.", "Feb.", "März", "April", "Mai", "Juni", "Juli", "Aug.", "Sept.", "Okt.", "Nov.", "Dez."];
const fmtDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d}. ${MONTHS[m - 1]} ${y}`;
};

export async function CourseDetail({ course, locale }: { course: Course; locale: Locale }) {
  const isKids = course.audience === "kinder";
  const title = getLocalised(course.title, locale);
  const category = getLocalised(course.category, locale);
  const instructor = await getTeamMember(course.instructor);
  const related = (await getCourses(course.audience)).filter((c) => c.slug !== course.slug).slice(0, 3);

  const waText = isKids
    ? `Hallo Elena, ich möchte mein Kind gern für den Kurs «${title}» anmelden.`
    : `Hallo Elena, ich möchte mich gern für den Kurs «${title}» anmelden.`;

  const Inner = (
    <>
      <section className="pagehead" style={{ position: "relative", paddingBottom: "16px" }}>
        {isKids && <span className="confetti-dots" aria-hidden="true" />}
        <div className="container">
          <p className="crumbs reveal">
            <Link href="/">Home</Link> · <Link href="/angebot">Angebot</Link> ·{" "}
            <Link href={`/angebot/${course.audience}`}>{isKids ? "Kinder" : "Erwachsene"}</Link> · {title}
          </p>
          {isKids ? (
            <>
              <span className="badge-fun reveal">🖌️ Für kleine Künstler:innen · {category}</span>
              <h1 className="h1 reveal d1" style={{ fontSize: "clamp(2.4rem,6vw,4rem)", margin: "16px 0 0" }}>
                {title} <span className="wiggle" style={{ display: "inline-block", color: "var(--coral)" }}>✨</span>
              </h1>
            </>
          ) : (
            <>
              <span className="tag tag--coral reveal">Erwachsene · {category}</span>
              <h1 className="h1 reveal d1" style={{ margin: "14px 0 0" }}>{title}</h1>
            </>
          )}
        </div>
      </section>

      <section className="section" style={{ paddingTop: "24px" }}>
        <div className="container">
          <div className="kurs-layout">
            {/* LINKS */}
            <div>
              <div className="kurs-hero-img reveal"><div className={`ph ph--${course.color}`} /></div>

              <div className="reveal" style={{ marginTop: "30px" }}>
                <h2 className="h3">{isKids ? "Was wir machen 🎨" : "Worum es geht"}</h2>
                <p className="lead mt-s">{getLocalised(course.description, locale)}</p>
                {isKids && (
                  <div className="mt-m" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    <span className="badge-fun">🌈 Viel Farbe</span>
                    <span className="badge-fun">✂️ Basteln &amp; Werken</span>
                    <span className="badge-fun">👫 Kleine Gruppe</span>
                  </div>
                )}
              </div>

              {course.takeaway && (
                <div className="takeaway reveal" style={{ marginTop: "26px", borderWidth: isKids ? "2px" : undefined }}>
                  <span className="takeaway__icon">🎁</span>
                  <div>
                    <strong>Das nimmst du mit nach Hause</strong>
                    <p>{getLocalised(course.takeaway, locale)}</p>
                  </div>
                </div>
              )}

              <div className="reveal" style={{ marginTop: "34px" }}>
                <h2 className="h3 mb-m">{isKids ? "So sieht's bei uns aus 📸" : "Eindrücke aus dem Kurs"}</h2>
                <div className="masonry" style={{ columns: 2 }}>
                  {(isKids ? KID_MASONRY : MASONRY).map((c, i) => (
                    <div className="masonry__item" key={i}><div className={`ph ph--${c} t${(i % 3) + 1}`} /></div>
                  ))}
                </div>
              </div>

              {course.faq && course.faq.length > 0 && (
                <div className="reveal" style={{ marginTop: "34px" }}>
                  <h2 className="h3 mb-m">{isKids ? "Fragen von Eltern 👋" : "Häufige Fragen"}</h2>
                  <div className="faq" style={{ margin: 0 }}>
                    {course.faq.map((f, i) => (
                      <details key={i} open={isKids && i === 0}>
                        <summary>{getLocalised(f.q, locale)}</summary>
                        <p>{getLocalised(f.a, locale)}</p>
                      </details>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RECHTS */}
            <aside className="kurs-aside">
              <div className="frost reveal" style={{ padding: "26px", border: isKids ? "3px solid #fff" : undefined }}>
                {isKids ? (
                  <dl className="kidspecs">
                    {course.meta.map((m, i) => {
                      const label = getLocalised(m.label, locale);
                      return (
                        <div className="kidspec" key={i}>
                          <span className="emoji">{KID_EMOJI[label] ?? "•"}</span>
                          {label} <b>{getLocalised(m.value, locale)}</b>
                        </div>
                      );
                    })}
                  </dl>
                ) : (
                  <dl className="specs">
                    {course.meta.map((m, i) => (
                      <div className="spec" key={i}><dt>{getLocalised(m.label, locale)}</dt><dd>{getLocalised(m.value, locale)}</dd></div>
                    ))}
                  </dl>
                )}

                {course.dates && course.dates.length > 0 && (
                  <div className="course-dates">
                    <span className="course-dates__count">{course.dates.length}× Termin</span>
                    <ul>
                      {course.dates.map((d) => (
                        <li key={d}>{fmtDate(d)}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", margin: "20px 4px 16px" }}>
                  <span className="muted" style={{ fontWeight: 700 }}>{course.priceNote ? getLocalised(course.priceNote, locale) : "Kurskosten"}</span>
                  <span className="card__price" style={{ fontSize: "1.7rem", fontFamily: isKids ? "var(--font-kids)" : undefined }}>{course.price}</span>
                </div>

                <a href={buildWhatsAppUrl(waText)} target="_blank" rel="noopener noreferrer" className="btn btn--coral" style={{ width: "100%", justifyContent: "center" }}>
                  {isKids ? "Jetzt anmelden 🎉" : "Jetzt per WhatsApp anmelden"}
                </a>
                <a href={buildMailtoUrl(`Kurs ${title}`)} className="btn btn--ghost" style={{ width: "100%", justifyContent: "center", marginTop: "10px" }}>
                  {isKids ? "Eltern fragen per E-Mail" : "Per E-Mail anfragen"}
                </a>
                <p className="muted" style={{ fontSize: "0.82rem", textAlign: "center", marginTop: "14px" }}>Anmeldung ganz einfach per Nachricht, wir melden uns rasch zurück.</p>
              </div>

              {instructor && (
                <div className="frost reveal d1" style={{ padding: "22px 24px", marginTop: "18px", display: "flex", gap: "14px", alignItems: "center", border: isKids ? "3px solid #fff" : undefined }}>
                  <div className={`ph ph--${instructor.color}`} style={{ width: "56px", height: "56px", borderRadius: "16px", flex: "none" }} />
                  <div>
                    <span className="role" style={{ color: "var(--coral)", fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: ".06em" }}>Kursleitung</span>
                    <h3 style={{ fontSize: "1.15rem" }}>{instructor.name}</h3>
                    <p className="muted" style={{ fontSize: "0.85rem" }}>{getLocalised(instructor.role, locale)}</p>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* ÄHNLICHE KURSE */}
      <section className="section">
        <div className="container">
          <div className="stack-head reveal">
            <div>
              <span className="eyebrow">{isKids ? "Das gefällt dir bestimmt auch" : "Das könnte dir auch gefallen"}</span>
              <h2 className="h2 mt-s">{isKids ? "Mehr für Kinder" : "Ähnliche Kurse"}</h2>
            </div>
            <Link href={`/angebot/${course.audience}`} className="btn btn--outline">{isKids ? "Alle Kinderkurse" : "Alle Kurse"} <span className="arr">→</span></Link>
          </div>
          <div className="grid grid-3">
            {related.map((c, i) =>
              isKids ? (
                <article key={c.slug} className={`card kids-card reveal${i === 1 ? " d1" : i === 2 ? " d2" : ""}`}>
                  <div className="kids-card__top" style={{ background: `var(--${c.color})` }}>
                    <span className="kids-card__emoji wiggle">🎨</span><br />
                    <span className="kids-card__age">{getLocalised(c.category, locale)}</span>
                  </div>
                  <div className="card__body">
                    <h3 className="card__title">{getLocalised(c.title, locale)}</h3>
                    <p className="card__desc">{getLocalised(c.teaser, locale)}</p>
                    <div className="card__foot">
                      <span className="card__price">{c.price}</span>
                      <Link className="btn btn--coral btn--sm" href={c.ctaTo === "kontakt" ? "/kontakt" : `/angebot/kinder/${c.slug}`}>Los!</Link>
                    </div>
                  </div>
                </article>
              ) : (
                <Link key={c.slug} className={`card reveal${i === 1 ? " d1" : i === 2 ? " d2" : ""}`} href={`/angebot/erwachsene/${c.slug}`}>
                  <div className="card__media"><div className={`ph ph--${c.color}`} /><div className="ph-label">{getLocalised(c.category, locale)}</div></div>
                  <div className="card__body">
                    <span className={`tag tag--${c.color}`}>{getLocalised(c.category, locale)}</span>
                    <h3 className="card__title">{getLocalised(c.title, locale)}</h3>
                    <p className="card__desc">{getLocalised(c.teaser, locale)}</p>
                    <div className="card__foot"><span className="card__price">{c.price}</span><span className="card__arrow">→</span></div>
                  </div>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );

  return isKids ? <div className="theme-kids">{Inner}</div> : Inner;
}
