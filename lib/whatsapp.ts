import { SITE } from "./site";

/** Baut einen wa.me-Deeplink mit vorformuliertem, URL-kodiertem Text. */
export function buildWhatsAppUrl(text: string, phone: string = SITE.whatsapp) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/** Baut einen mailto-Link mit optionalem Betreff. */
export function buildMailtoUrl(subject?: string, email: string = SITE.email) {
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${email}${query}`;
}
