"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sanftes, trägheitsbasiertes Scrollen (Lenis), sauber mit GSAP ScrollTrigger
 * synchronisiert. Aus auf /admin und bei prefers-reduced-motion.
 * Exponiert die Instanz als window.__lenis, damit das Menü sie pausieren kann.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    const nav = document.querySelector(".nav");
    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      ScrollTrigger.update();
      nav?.classList.toggle("scrolled", scroll > 16);
    });
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Menü/Modal kann pausieren: Events 'lenis-stop' / 'lenis-start'
    const stop = () => lenis.stop();
    const start = () => lenis.start();
    window.addEventListener("lenis-stop", stop);
    window.addEventListener("lenis-start", start);

    return () => {
      gsap.ticker.remove(onTick);
      window.removeEventListener("lenis-stop", stop);
      window.removeEventListener("lenis-start", start);
      lenis.destroy();
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
    };
  }, [pathname]);

  return null;
}
