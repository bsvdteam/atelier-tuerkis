"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Seitenübergang: Bei jedem Navigations-Wechsel wird der neue Inhalt sanft
 * eingeblendet und nach oben gescrollt. Reine Opacity → kein Konflikt mit
 * Scroll-Animationen/fixierten Elementen. Aus bei prefers-reduced-motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (el) gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power1.out" });
  }, []);

  return <div ref={ref}>{children}</div>;
}
