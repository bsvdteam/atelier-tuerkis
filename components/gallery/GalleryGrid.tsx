"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { PlaceholderColor } from "@/types";

type Cat = "kinder" | "erwachsene" | "ferien" | "workshop" | "atelier";

type Item = { cat: Cat; color: PlaceholderColor; ratio: string; label: string };

const ITEMS: Item[] = [
  { cat: "erwachsene", color: "teal", ratio: "3/4", label: "Aquarellkurs" },
  { cat: "kinder", color: "coral", ratio: "1/1", label: "Kreativwerkstatt" },
  { cat: "workshop", color: "sky", ratio: "4/3", label: "Cyanotypie" },
  { cat: "atelier", color: "yellow", ratio: "5/4", label: "Werkstatt" },
  { cat: "erwachsene", color: "violet", ratio: "1/1", label: "Handlettering" },
  { cat: "ferien", color: "green", ratio: "3/4", label: "Ferienkurs" },
  { cat: "kinder", color: "orange", ratio: "4/3", label: "Basteln" },
  { cat: "atelier", color: "pink", ratio: "1/1", label: "Detail" },
  { cat: "workshop", color: "teal", ratio: "5/4", label: "Buchbinden" },
  { cat: "erwachsene", color: "coral", ratio: "3/4", label: "Nähen" },
  { cat: "ferien", color: "sky", ratio: "1/1", label: "Sommerferien" },
  { cat: "atelier", color: "violet", ratio: "4/3", label: "Farben" },
];

const FILTERS: { key: Cat | "alle"; label: string }[] = [
  { key: "alle", label: "Alle" },
  { key: "kinder", label: "Kinder" },
  { key: "erwachsene", label: "Erwachsene" },
  { key: "ferien", label: "Ferien" },
  { key: "workshop", label: "Workshops" },
  { key: "atelier", label: "Atelier" },
];

export function GalleryGrid() {
  const [active, setActive] = useState<Cat | "alle">("alle");
  const shown = active === "alle" ? ITEMS : ITEMS.filter((i) => i.cat === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-bold transition-colors",
              active === f.key
                ? "border-teal-deep bg-teal-deep text-white"
                : "border-line bg-white/60 text-ink-soft hover:text-ink",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-8 [column-fill:_balance] gap-4 sm:columns-2 lg:columns-3">
        {shown.map((item, i) => (
          <div
            key={i}
            className={cn("ph mb-4 break-inside-avoid rounded-[22px]", `ph--${item.color}`)}
            style={{ aspectRatio: item.ratio }}
          >
            <span className="ph-label text-sm opacity-90">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
