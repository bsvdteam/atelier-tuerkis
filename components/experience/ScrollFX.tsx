"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP-Scroll-Choreografie:
 *  - Parallax auf [data-parallax] (Zahl = Stärke)
 *  - Hero-Inhalt zieht beim Wegscrollen sanft hoch & blendet aus
 * Läuft pro Seite neu, aus bei prefers-reduced-motion.
 */
export function ScrollFX() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.15");
        gsap.fromTo(
          el,
          { y: 0 },
          {
            y: () => window.innerHeight * speed,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      const heroInner = document.querySelector(".hero__inner");
      const hero = document.querySelector(".hero");
      if (heroInner && hero) {
        gsap.to(heroInner, {
          y: -70,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
        });
      }
    });

    const t = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
