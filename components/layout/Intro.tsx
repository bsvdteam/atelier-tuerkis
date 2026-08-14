"use client";

import { useEffect, useRef, useState } from "react";

export function Intro() {
  const [gone, setGone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    // Wiederkehrender Besuch / reduced-motion: intro-seen ist bereits gesetzt (Inline-Script)
    if (document.documentElement.classList.contains("intro-seen")) {
      setGone(true);
      return;
    }
    try {
      localStorage.setItem("at_intro_seen", "1");
    } catch {}
    document.body.style.overflow = "hidden";

    const end = (fast: boolean) => {
      if (doneRef.current) return;
      doneRef.current = true;
      if (fast) ref.current?.classList.add("intro--skip");
      document.body.style.overflow = "";
      window.setTimeout(() => setGone(true), fast ? 420 : 200);
    };

    const timer = window.setTimeout(() => end(false), 6750);
    const skip = ref.current?.querySelector<HTMLButtonElement>(".intro__skip");
    const onSkip = () => end(true);
    skip?.addEventListener("click", onSkip);

    return () => {
      window.clearTimeout(timer);
      skip?.removeEventListener("click", onSkip);
      document.body.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={ref} className="intro" id="intro" role="presentation">
      <div className="intro__wash" />
      <svg className="intro__doodle" style={{ top: "16%", left: "14%", ["--r" as string]: "-12deg", animationDelay: "2.4s" }} width="52" height="52" viewBox="0 0 40 40" aria-hidden="true">
        <path d="M8 26 Q20 6 32 26" stroke="#FF6F91" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>
      <svg className="intro__doodle" style={{ top: "20%", right: "16%", ["--r" as string]: "10deg", animationDelay: "2.7s" }} width="46" height="46" viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="12" fill="none" stroke="#57C9EC" strokeWidth="4" />
      </svg>
      <svg className="intro__doodle" style={{ bottom: "20%", left: "20%", ["--r" as string]: "8deg", animationDelay: "3s" }} width="50" height="50" viewBox="0 0 40 40" aria-hidden="true">
        <path d="M20 4l4 12h12l-10 8 4 12-10-8-10 8 4-12-10-8h12z" fill="#FFC94D" />
      </svg>
      <svg className="intro__doodle" style={{ bottom: "18%", right: "18%", ["--r" as string]: "-8deg", animationDelay: "3.3s" }} width="44" height="44" viewBox="0 0 40 40" aria-hidden="true">
        <rect x="9" y="9" width="22" height="22" rx="7" fill="none" stroke="#9B8CFF" strokeWidth="4" />
      </svg>
      <div className="intro__stage">
        <div className="intro__brand">
          Atelier <em>Türkis</em>
        </div>
        <svg className="intro__squiggle" viewBox="0 0 340 14" preserveAspectRatio="none" aria-hidden="true">
          <path d="M4 9C60 2 110 2 170 7s110 5 166-3" />
        </svg>
      </div>
      <button className="intro__skip" type="button">
        Überspringen
      </button>
    </div>
  );
}
