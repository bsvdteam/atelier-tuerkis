"use client";

import { useState } from "react";

const MONTHS = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const WD = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

const fmt = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

const pretty = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d}. ${MONTHS[m - 1]} ${y}`;
};

export function DatePicker({
  value,
  onChange,
}: {
  value: string[];
  onChange: (dates: string[]) => void;
}) {
  const today = new Date();
  const first = value.length ? value.slice().sort()[0].split("-").map(Number) : null;
  const [cur, setCur] = useState(() =>
    first ? new Date(first[0], first[1] - 1, 1) : new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const y = cur.getFullYear();
  const m = cur.getMonth();
  const lead = (new Date(y, m, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const selected = new Set(value);

  const toggle = (d: number) => {
    const iso = fmt(y, m, d);
    const next = new Set(selected);
    if (next.has(iso)) next.delete(iso);
    else next.add(iso);
    onChange(Array.from(next).sort());
  };

  return (
    <div className="datepick">
      <div className="datepick__bar">
        <button type="button" className="kv__del" onClick={() => setCur(new Date(y, m - 1, 1))}>‹</button>
        <strong>{MONTHS[m]} {y}</strong>
        <button type="button" className="kv__del" onClick={() => setCur(new Date(y, m + 1, 1))}>›</button>
      </div>
      <div className="datepick__grid">
        {WD.map((w) => <span key={w} className="datepick__wd">{w}</span>)}
        {Array.from({ length: lead }).map((_, i) => <span key={`p${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const d = i + 1;
          const iso = fmt(y, m, d);
          const isSel = selected.has(iso);
          const isToday = y === today.getFullYear() && m === today.getMonth() && d === today.getDate();
          return (
            <button
              type="button"
              key={d}
              className={`datepick__day${isSel ? " is-sel" : ""}${isToday ? " is-today" : ""}`}
              onClick={() => toggle(d)}
            >
              {d}
            </button>
          );
        })}
      </div>

      {value.length > 0 && (
        <div className="datepick__chips">
          {value.slice().sort().map((iso) => (
            <span key={iso} className="datepick__chip">
              {pretty(iso)}
              <button type="button" onClick={() => onChange(value.filter((v) => v !== iso))}>×</button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
