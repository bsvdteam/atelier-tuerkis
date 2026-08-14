"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const revealInView = () => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.in)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92 && r.bottom > 0) el.classList.add("in");
      });
    };

    // Sofort sichtbare Elemente einblenden (oberhalb des Folds)
    revealInView();
    const raf = requestAnimationFrame(revealInView);

    // Progressives Einblenden beim Scrollen — IO wenn verfügbar, sonst Scroll-Listener
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );
      document.querySelectorAll<HTMLElement>(".reveal:not(.in)").forEach((el) => io!.observe(el));
    }
    window.addEventListener("scroll", revealInView, { passive: true });

    // Sicherheitsnetz: nach 1.5s garantiert alles sichtbar (falls IO/Scroll ausfällt)
    const safety = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.in)").forEach((el) => el.classList.add("in"));
    }, 1500);

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      window.removeEventListener("scroll", revealInView);
      window.clearTimeout(safety);
    };
  }, [pathname]);

  return null;
}
