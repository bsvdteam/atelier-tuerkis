"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Card = {
  cat: string;
  slug: string;
  ph: string;
  label: string;
  tag: string;
  tagMod: string;
  spots?: string;
  spotsFew?: boolean;
  title: string;
  desc: string;
  price: string;
};

const CARDS: Card[] = [
  { cat: "malen aktuell", slug: "aquarell-fuer-einsteiger", ph: "coral", label: "Aquarell", tag: "Malen", tagMod: "coral", spots: "Start 14. Sep", title: "Aquarell für Einsteiger", desc: "Farbverläufe, Nass-in-Nass und der Mut zur leeren Fläche.", price: "CHF 280" },
  { cat: "malen", slug: "zeichnen-grundlagen", ph: "teal", label: "Zeichnen", tag: "Zeichnen", tagMod: "sky", title: "Zeichnen Grundlagen", desc: "Linie, Licht und Schatten, beobachten und festhalten lernen.", price: "CHF 260" },
  { cat: "papier", slug: "handlettering-kalligrafie", ph: "violet", label: "Lettering", tag: "Papier", tagMod: "violet", title: "Handlettering & Kalligrafie", desc: "Schöne Buchstaben von Hand, für Karten und Geschenke.", price: "CHF 240" },
  { cat: "papier", slug: "buchbinden-schachteln", ph: "orange", label: "Buchbinden", tag: "Papier", tagMod: "orange", title: "Buchbinden & Schachteln", desc: "Eigene Notizbücher und schöne Boxen selbst gefertigt.", price: "CHF 290" },
  { cat: "textil aktuell", slug: "naehen-fuer-einsteiger", ph: "pink", label: "Nähen", tag: "Textil", tagMod: "coral", spots: "wenige Plätze", spotsFew: true, title: "Nähen für Einsteiger", desc: "Von der Nähmaschine bis zum ersten fertigen Stück.", price: "CHF 300" },
  { cat: "foto aktuell", slug: "cyanotypie-workshop", ph: "sky", label: "Cyanotypie", tag: "Experimentell", tagMod: "sky", spots: "Neu · 8. Nov", title: "Cyanotypie-Workshop", desc: "Blaudruck mit Sonne & Wasser, magische Naturbilder.", price: "CHF 160" },
];

const FILTERS = [
  { key: "all", label: "Alle" },
  { key: "aktuell", label: "Aktuell" },
  { key: "malen", label: "Malen & Zeichnen" },
  { key: "papier", label: "Papier & Schrift" },
  { key: "textil", label: "Textil" },
  { key: "foto", label: "Experimentell" },
];

const d = (i: number) => (i % 3 === 1 ? " d1" : i % 3 === 2 ? " d2" : "");

export function ErwachseneView() {
  const [view, setView] = useState<"cards" | "calendar">("cards");
  const [filter, setFilter] = useState("all");

  const shown = filter === "all" ? CARDS : CARDS.filter((c) => c.cat.split(" ").includes(filter));

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
            {FILTERS.map((f) => (
              <button key={f.key} className={filter === f.key ? "active" : ""} onClick={() => setFilter(f.key)}>
                {f.label}
              </button>
            ))}
          </div>
          <div className="grid grid-3">
            {shown.map((c, i) => (
              <Link key={c.slug} className={`card reveal in${d(i)}`} href={`/angebot/erwachsene/${c.slug}`}>
                <div className="card__media"><div className={`ph ph--${c.ph}`} /><div className="ph-label">{c.label}</div></div>
                <div className="card__body">
                  <div className="card__spots">
                    <span className={`tag tag--${c.tagMod}`}>{c.tag}</span>
                    {c.spots && <span className={cn("spots", c.spotsFew && "spots--few")}><span className="spots__dot" />{c.spots}</span>}
                  </div>
                  <h3 className="card__title">{c.title}</h3>
                  <p className="card__desc">{c.desc}</p>
                  <div className="card__foot"><span className="card__price">{c.price}</span><span className="card__arrow">→</span></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {view === "calendar" && <Calendar />}
    </>
  );
}

const CAL_COURSES = [
  { dow: 1, time: "18–20 Uhr", title: "Zeichnen Grundlagen", mod: "sky", slug: "zeichnen-grundlagen" },
  { dow: 2, time: "18–20 Uhr", title: "Aquarell Einsteiger", mod: "coral", slug: "aquarell-fuer-einsteiger" },
  { dow: 3, time: "18–20:30", title: "Nähen Einsteiger", mod: "coral", slug: "naehen-fuer-einsteiger" },
  { dow: 4, time: "19–21 Uhr", title: "Handlettering", mod: "violet", slug: "handlettering-kalligrafie" },
  { dow: 6, time: "10–13 Uhr", title: "Buchbinden", mod: "orange", slug: "buchbinden-schachteln" },
  { dow: 6, time: "13–17 Uhr", title: "Cyanotypie", mod: "sky", slug: "cyanotypie-workshop" },
];
const MONTHS = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const WD = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

function Calendar() {
  const today = useMemo(() => new Date(), []);
  const [cur, setCur] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

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
                {CAL_COURSES.filter((c) => c.dow === dow).map((c, j) => (
                  <Link key={j} className={`cal__event cal__event--${c.mod}`} href={`/angebot/erwachsene/${c.slug}`}>
                    <span className="t">{c.time}</span><span className="n">{c.title}</span>
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
