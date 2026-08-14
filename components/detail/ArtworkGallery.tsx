"use client";

import { useState } from "react";
import type { PlaceholderColor } from "@/types";

export function ArtworkGallery({ colors }: { colors: PlaceholderColor[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="gallery reveal in">
      <div className="gallery__main"><div className={`ph ph--${colors[active]}`} /></div>
      <div className="gallery__thumbs">
        {colors.map((c, i) => (
          <button
            key={i}
            className={`gallery__thumb${i === active ? " is-active" : ""}`}
            aria-label={`Ansicht ${i + 1}`}
            onClick={() => setActive(i)}
          >
            <span className={`ph ph--${c}`} style={{ display: "block", width: "100%", height: "100%" }} />
          </button>
        ))}
      </div>
    </div>
  );
}
