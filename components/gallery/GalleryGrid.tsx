"use client";

import { useState } from "react";

const FILTERS = [
  { key: "all", label: "Alle" },
  { key: "kinder", label: "Kinder" },
  { key: "erwachsene", label: "Erwachsene" },
  { key: "ferien", label: "Ferienkurse" },
  { key: "workshop", label: "Workshops" },
  { key: "atelier", label: "Atelier" },
];

const TILES: { cat: string; ph: string; t: string }[] = [
  { cat: "kinder", ph: "yellow", t: "t3" }, { cat: "erwachsene", ph: "coral", t: "t1" },
  { cat: "atelier", ph: "teal", t: "t2" }, { cat: "workshop", ph: "violet", t: "t4" },
  { cat: "ferien", ph: "green", t: "t2" }, { cat: "kinder", ph: "pink", t: "t3" },
  { cat: "erwachsene", ph: "sky", t: "t1" }, { cat: "atelier", ph: "orange", t: "t2" },
  { cat: "workshop", ph: "teal", t: "t3" }, { cat: "kinder", ph: "coral", t: "t1" },
  { cat: "ferien", ph: "yellow", t: "t4" }, { cat: "erwachsene", ph: "violet", t: "t2" },
  { cat: "atelier", ph: "green", t: "t1" }, { cat: "workshop", ph: "pink", t: "t3" },
  { cat: "kinder", ph: "sky", t: "t2" }, { cat: "ferien", ph: "orange", t: "t1" },
];

export function GalleryGrid() {
  const [filter, setFilter] = useState("all");

  return (
    <>
      <div className="filters reveal in">
        {FILTERS.map((f) => (
          <button key={f.key} className={filter === f.key ? "active" : ""} onClick={() => setFilter(f.key)}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="masonry">
        {TILES.map((tile, i) => (
          <div
            key={i}
            className="masonry__item reveal in"
            style={{ display: filter === "all" || filter === tile.cat ? "" : "none" }}
          >
            <div className={`ph ph--${tile.ph} ${tile.t}`} />
          </div>
        ))}
      </div>
    </>
  );
}
