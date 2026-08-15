"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { getLocalised } from "@/lib/localise";
import { cn } from "@/lib/utils";
import type { Course, Locale } from "@/types";

const d = (i: number) => (i % 3 === 1 ? " d1" : i % 3 === 2 ? " d2" : "");

export function ErwachseneView({ courses, locale }: { courses: Course[]; locale: Locale }) {
  const [view, setView] = useState<"cards" | "calendar">("cards");
  const [filter, setFilter] = useState("all");

  const categories = useMemo(() => {
    const seen = new Map<string, string>();
    for (const c of courses) {
      const key = c.category.de.toLowerCase();
      if (!seen.has(key)) seen.set(key, getLocalised(c.category, locale));
    }
    return Array.from(seen, ([key, label]) => ({ key, label }));
  }, [courses, locale]);

  const shown =
    filter === "all" ? courses : courses.filter((c) => c.category.de.toLowerCase() === filter);

  return (
    <>
      <div className="center reveal in" style={{ marginBottom: "30px" }}>
        <div className="viewtoggle" role="tablist" aria-label="Ansicht wählen">
          <span className="viewtoggle__ind" style={{ width: "50%", transform: view === "cards" ? "translateX(0)" : "translateX(100%)" }} />
          <button className={view === "cards" ? "active" : ""} onClick={() => setView("cards")} role="tab" aria-selected={view === "cards"}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg> Karten
          </button>
          <button className={view === "calendar" ? "active" : ""} onClick={() => setView("calendar")} role="tab" aria-selected={view === "calendar"}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></svg> Kalender
          </button>
        </div>
      </div>

      {view === "cards" && (
        <div>
          <div className="filters reveal in">
            <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>Alle</button>
            {categories.map((c) => (
              <button key={c.key} className={filter === c.key ? "active" : ""} onClick={() => setFilter(c.key)}>
                {c.label}
              </button>
            ))}
          </div>
          <div className="grid grid-3">
            {shown.map((c, i) => {
              const few = /wenige|noch [1-3] /i.test(c.availability?.de ?? "");
              return (
                <Link key={c.slug} className={`card reveal in${d(i)}`} href={`/angebot/erwachsene/${c.slug}`}>
                  <div className="card__media"><div className={`ph ph--${c.color}`} /><div className="ph-label">{getLocalised(c.category, locale)}</div></div>
                  <div className="card__body">
                    <div className="card__spots">
                      <span className={`tag tag--${c.color}`}>{getLocalised(c.category, locale)}</span>
                      {c.availability && (
                        <span className={cn("spots", few && "spots--few")}><span className="spots__dot" />{getLocalised(c.availability, locale)}</span>
                      )}
                    </div>
                    <h3 className="card__title">{getLocalised(c.title, locale)}</h3>
                    <p className="card__desc">{getLocalised(c.teaser, locale)}</p>
                    <div className="card__foot"><span className="card__price">{c.price}</span><span className="card__arrow">→</span></div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {view === "calendar" && <Calendar courses={courses} locale={locale} />}
    </>
  );
}

const MONTHS = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const WD = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const DOW: Record<string, number> = { mo: 1, di: 2, mi: 3, do: 4, fr: 5, sa: 6, so: 0 };

/** Leitet aus dem Termin-Text (z.B. „Di 18–20 Uhr") Wochentag + Zeit ab. */
function parseSchedule(course: Course): { dow: number; time: string } | null {
  const s = course.schedule?.de ?? "";
  const m = s.match(/^(Mo|Di|Mi|Do|Fr|Sa|So)\s+(.*)$/i);
  if (!m) return null;
  return { dow: DOW[m[1].toLowerCase()], time: m[2].replace(/\s*Uhr\s*$/i, "") };
}

function Calendar({ courses, locale }: { courses: Course[]; locale: Locale }) {
  const today = useMemo(() => new Date(), []);
  const [cur, setCur] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const events = useMemo(
    () =>
      courses
        .map((c) => ({ c, s: parseSchedule(c) }))
        .filter((e): e is { c: Course; s: { dow: number; time: string } } => e.s !== null),
    [courses],
  );

  const y = cur.getFullYear();
  const m = cur.getMonth();
  const lead = (new Date(y, m, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(y, m + 1, 0).getDate();

  return (
    <div className="cal">
      <div className="cal__bar">
        <button className="cal__nav" type="button" aria-label="Voriger Monat" onClick={() => setCur(new Date(y, m - 1, 1))}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        <div className="cal__month">{MONTHS[m]} {y}</div>
        <button className="cal__nav" type="button" aria-label="Nächster Monat" onClick={() => setCur(new Date(y, m + 1, 1))}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
        </button>
        <button className="cal__today btn btn--ghost btn--sm" type="button" onClick={() => setCur(new Date(today.getFullYear(), today.getMonth(), 1))}>Heute</button>
      </div>
      <div className="cal__scroll">
        <div className="cal__grid">
          {WD.map((w) => <div className="cal__wd" key={w}>{w}</div>)}
          {Array.from({ length: lead }).map((_, i) => <div className="cal__cell cal__cell--pad" key={`p${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dow = new Date(y, m, day).getDay();
            const isToday = y === today.getFullYear() && m === today.getMonth() && day === today.getDate();
            return (
              <div className={cn("cal__cell", isToday && "cal__cell--today")} key={day}>
                <span className="cal__daynum">{day}</span>
                {events.filter((e) => e.s.dow === dow).map((e, j) => (
                  <Link key={j} className={`cal__event cal__event--${e.c.color}`} href={`/angebot/erwachsene/${e.c.slug}`}>
                    <span className="t">{e.s.time}</span><span className="n">{getLocalised(e.c.title, locale)}</span>
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      <p className="muted center" style={{ marginTop: "18px", fontSize: "0.9rem" }}>Klick auf einen Termin für alle Details.</p>
    </div>
  );
}
