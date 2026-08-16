"use client";

import { useState } from "react";
import type { PlaceholderColor } from "@/types";

export function ArtworkGallery({ colors, images }: { colors: PlaceholderColor[]; images?: string[] }) {
  const [active, setActive] = useState(0);
  const imgs = (images ?? []).filter(Boolean);
  const useImages = imgs.length > 0;
  const count = useImages ? imgs.length : colors.length;
  const idx = Math.min(active, count - 1);

  return (
    <div className="gallery reveal in">
      <div className="gallery__main">
        {useImages ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imgs[idx]} alt="" />
        ) : (
          <div className={`ph ph--${colors[idx]}`} />
        )}
      </div>
      <div className="gallery__thumbs">
        {(useImages ? imgs : colors).map((c, i) => (
          <button
            key={i}
            className={`gallery__thumb${i === idx ? " is-active" : ""}`}
            aria-label={`Ansicht ${i + 1}`}
            onClick={() => setActive(i)}
          >
            {useImages ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c} alt="" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span className={`ph ph--${c}`} style={{ display: "block", width: "100%", height: "100%" }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
