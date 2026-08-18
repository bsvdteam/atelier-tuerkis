import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/** Generiertes App-Icon / Favicon: Farbkleckse wie auf der Palette. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex",
          background: "linear-gradient(150deg, #A9F0BC 0%, #63E4B4 55%, #45D8C0 100%)",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 150, left: 226, width: 60, height: 60, borderRadius: 60, background: "#ff6b6b" }} />
        <div style={{ position: "absolute", top: 296, left: 150, width: 60, height: 60, borderRadius: 60, background: "#12b3a6" }} />
        <div style={{ position: "absolute", top: 296, left: 302, width: 60, height: 60, borderRadius: 60, background: "#ffd23f" }} />
      </div>
    ),
    { ...size },
  );
}
