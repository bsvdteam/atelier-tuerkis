import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = "Atelier Türkis · Kreativkurse & Workshops in Degersheim";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Standard-Vorschaubild für Social-Media (WhatsApp, Instagram, Facebook …). */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "center", padding: "80px",
          background: "linear-gradient(150deg, #CFF7E3 0%, #9FEFD6 45%, #7FE6E0 100%)",
          position: "relative", fontFamily: "sans-serif",
        }}
      >
        {/* Farbkleckse */}
        <div style={{ position: "absolute", top: 70, right: 110, width: 90, height: 90, borderRadius: 90, background: "#ffd23f" }} />
        <div style={{ position: "absolute", bottom: 90, right: 180, width: 70, height: 70, borderRadius: 20, background: "#8ac6ff" }} />
        <div style={{ position: "absolute", top: 130, right: 250, width: 60, height: 60, borderRadius: 60, background: "#ff8fa3" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 28 }}>
          <div style={{ display: "flex", width: 20, height: 20, borderRadius: 20, background: "#ff6b6b" }} />
          <div style={{ fontSize: 30, letterSpacing: 2, color: "#0f6b63", fontWeight: 700 }}>
            KUNST- & KREATIVATELIER · DEGERSHEIM
          </div>
        </div>

        <div style={{ fontSize: 92, fontWeight: 800, color: "#12354f", lineHeight: 1.05, maxWidth: 900 }}>
          Atelier Türkis
        </div>

        <div style={{ fontSize: 38, color: "#2a5c56", marginTop: 26, maxWidth: 820, lineHeight: 1.3 }}>
          {SITE.tagline.de}
        </div>
      </div>
    ),
    { ...size },
  );
}
