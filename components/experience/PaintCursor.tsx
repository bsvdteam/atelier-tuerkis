"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

/**
 * Custom Cursor im Atelier-Stil: ein weicher Farbklecks, der der Maus mit
 * Verzögerung folgt und über interaktiven Elementen aufblüht.
 * Nur auf Geräten mit feinem Zeiger (Desktop), nie auf Touch.
 */
export function PaintCursor() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;

    const dot = document.createElement("div");
    dot.className = "pcursor__dot";
    const ring = document.createElement("div");
    ring.className = "pcursor__ring";
    document.body.appendChild(ring);
    document.body.appendChild(dot);
    document.body.classList.add("has-pcursor");

    const p = { x: innerWidth / 2, y: innerHeight / 2 };
    const r = { x: p.x, y: p.y };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      p.x = e.clientX;
      p.y = e.clientY;
      dot.style.transform = `translate(${p.x}px, ${p.y}px)`;
      if (reduce) ring.style.transform = `translate(${p.x}px, ${p.y}px)`;
    };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      r.x += (p.x - r.x) * 0.18;
      r.y += (p.y - r.y) * 0.18;
      ring.style.transform = `translate(${r.x}px, ${r.y}px)`;
      raf = requestAnimationFrame(loop);
    };
    if (!reduce) raf = requestAnimationFrame(loop);

    const hoverSel = "a, button, input, textarea, select, summary, [role='button'], .pillar, .card, .tech";
    const onOver = (e: Event) => {
      if ((e.target as Element)?.closest?.(hoverSel)) document.body.classList.add("pcursor-hover");
    };
    const onOut = (e: Event) => {
      if ((e.target as Element)?.closest?.(hoverSel)) document.body.classList.remove("pcursor-hover");
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    const onDown = () => document.body.classList.add("pcursor-down");
    const onUp = () => document.body.classList.remove("pcursor-down");
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      dot.remove();
      ring.remove();
      document.body.classList.remove("has-pcursor", "pcursor-hover", "pcursor-down");
    };
  }, [pathname]);

  return null;
}
