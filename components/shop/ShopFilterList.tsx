"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { getLocalised } from "@/lib/localise";
import { cn } from "@/lib/utils";
import type { Artwork, Locale } from "@/types";

const FILTERS = [
  { key: "all", label: "Alles" },
  { key: "werke", label: "Werke" },
  { key: "produkte", label: "Handgemachtes" },
  { key: "material", label: "Kreativmaterial" },
];

const d = (i: number) => (i % 3 === 1 ? " d1" : i % 3 === 2 ? " d2" : "");

export function ShopFilterList({ artworks, locale }: { artworks: Artwork[]; locale: Locale }) {
  const [filter, setFilter] = useState("all");
  const shown = filter === "all" ? artworks : artworks.filter((a) => a.group === filter);

  return (
    <>
      <div className="filters reveal in">
        {FILTERS.map((f) => (
          <button key={f.key} className={filter === f.key ? "active" : ""} onClick={() => setFilter(f.key)}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-3">
        {shown.map((a, i) => (
          <Link key={a.slug} className={cn("card reveal in", d(i))} href={`/shop/${a.slug}`}>
            <div className="card__media"><div className={`ph ph--${a.color}`} /></div>
            <div className="card__body">
              <span className={`tag tag--${a.color}`}>{getLocalised(a.category, locale)}</span>
              <h3 className="card__title">{getLocalised(a.title, locale)}</h3>
              <p className="card__desc">{getLocalised(a.teaser, locale)}</p>
              <div className="card__foot"><span className="card__price">{a.price}</span><span className="card__arrow">→</span></div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
