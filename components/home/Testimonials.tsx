"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { getLocalised } from "@/lib/localise";
import type { Locale, Testimonial } from "@/types";

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function Testimonials({ items }: { items: Testimonial[] }) {
  const locale = useLocale() as Locale;
  const [idx, setIdx] = useState(0);
  const timer = useRef<number | null>(null);

  const stop = () => {
    if (timer.current) window.clearInterval(timer.current);
  };
  const start = useCallback(() => {
    stop();
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    timer.current = window.setInterval(() => setIdx((i) => (i + 1) % items.length), 5200);
  }, [items.length]);

  useEffect(() => {
    start();
    return stop;
  }, [start]);

  const go = (i: number) => {
    setIdx((i + items.length) % items.length);
    start();
  };

  return (
    <div
      className="testi__stage reveal"
      id="testi"
      onMouseEnter={stop}
      onMouseLeave={start}
    >
      <svg className="testi__doodle" style={{ top: "6%", left: "4%", ["--r" as string]: "-10deg" }} width="46" height="46" viewBox="0 0 40 40" aria-hidden="true">
        <path d="M8 26 Q20 6 32 26" stroke="#FF6F91" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>
      <svg className="testi__doodle" style={{ bottom: "8%", right: "5%", ["--r" as string]: "12deg" }} width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
        <path d="M20 4l4 12h12l-10 8 4 12-10-8-10 8 4-12-10-8h12z" fill="#FFC94D" />
      </svg>
      <svg className="testi__doodle" style={{ top: "14%", right: "12%", ["--r" as string]: "0deg" }} width="34" height="34" viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="11" fill="none" stroke="#57C9EC" strokeWidth="4" />
      </svg>

      <button className="testi__nav testi__prev" aria-label="Vorherige Stimme" onClick={() => go(idx - 1)}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>

      <div className="testi__cards">
        {items.map((item, i) => (
          <figure
            key={i}
            className={`testi__card${i === idx ? " is-active" : ""}`}
            style={{ ["--c" as string]: `var(--${item.color})` }}
          >
            <div className="testi__mark">&ldquo;</div>
            <blockquote>{getLocalised(item.quote, locale)}</blockquote>
            <figcaption>
              <span className="testi__avatar">{initials(item.author)}</span>
              <span>
                <strong>{item.author}</strong>
                <small>{getLocalised(item.context, locale)}</small>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <button className="testi__nav testi__next" aria-label="Nächste Stimme" onClick={() => go(idx + 1)}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

      <div className="testi__dots" role="tablist" aria-label="Stimmen auswählen">
        {items.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-label={`Stimme ${i + 1}`}
            className={i === idx ? "is-active" : ""}
            aria-selected={i === idx}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </div>
  );
}
