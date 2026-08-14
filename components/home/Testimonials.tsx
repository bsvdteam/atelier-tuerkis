"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";
import { getLocalised } from "@/lib/localise";
import { cn } from "@/lib/utils";
import type { Locale, Testimonial } from "@/types";

export function Testimonials({ items }: { items: Testimonial[] }) {
  const locale = useLocale() as Locale;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + items.length) % items.length),
    [items.length],
  );

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, [paused, items.length]);

  const current = items[index];

  return (
    <div
      className="mx-auto max-w-2xl text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="frost min-h-[220px] rounded-[32px] px-8 py-10">
        <blockquote className="font-display text-2xl leading-snug text-ink sm:text-[1.7rem]">
          «{getLocalised(current.quote, locale)}»
        </blockquote>
        <p className="mt-6 font-bold text-ink">{current.author}</p>
        <p className="text-sm text-ink-mute">{getLocalised(current.context, locale)}</p>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => go(-1)}
          aria-label="Vorheriges"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-ink transition-colors hover:bg-white"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Stimme ${i + 1}`}
              className={cn(
                "h-2.5 rounded-full transition-all",
                i === index ? "w-6 bg-teal-deep" : "w-2.5 bg-ink/20 hover:bg-ink/40",
              )}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          aria-label="Nächstes"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-ink transition-colors hover:bg-white"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
