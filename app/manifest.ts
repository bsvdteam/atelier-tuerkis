import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Atelier Türkis · Kreativkurse in Degersheim",
    short_name: "Atelier Türkis",
    description: SITE.tagline.de,
    start_url: "/",
    display: "standalone",
    background_color: "#f6fcfa",
    theme_color: "#12b3a6",
    lang: "de-CH",
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png" },
    ],
  };
}
