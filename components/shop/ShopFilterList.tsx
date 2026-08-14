"use client";

import { useState } from "react";
import { ArtworkCard } from "@/components/ui/ArtworkCard";
import { cn } from "@/lib/utils";
import type { Artwork, Locale } from "@/types";

const FILTERS: { key: Artwork["group"] | "alle"; label: string }[] = [
  { key: "alle", label: "Alle" },
  { key: "werke", label: "Originale" },
  { key: "produkte", label: "Handgemacht" },
  { key: "material", label: "Material" },
];

export function ShopFilterList({
  artworks,
  locale,
}: {
  artworks: Artwork[];
  locale: Locale;
}) {
  const [active, setActive] = useState<Artwork["group"] | "alle">("alle");
  const shown = active === "alle" ? artworks : artworks.filter((a) => a.group === active);

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

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((a) => (
          <ArtworkCard key={a.slug} artwork={a} locale={locale} />
        ))}
      </div>
    </div>
  );
}
