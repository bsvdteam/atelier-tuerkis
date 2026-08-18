"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { SITE } from "@/lib/site";
import { CookieSettingsButton } from "@/components/layout/CookieSettingsButton";
import type { Locale } from "@/types";

export function Footer() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname.startsWith("/coming-soon")) return null;

  const discover = [
    { href: "/atelier", label: t("nav.ueberUns") },
    { href: "/angebot", label: t("nav.angebot") },
    { href: "/galerie", label: t("nav.galerie") },
    { href: "/shop", label: t("nav.shop") },
    { href: "/gutscheine", label: t("nav.gutscheine") },
    { href: "/faq", label: t("nav.faq") },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__grid">
            <div>
              <div className="footer__brand">
                Atelier <span>Türkis</span>
              </div>
              <p className="muted" style={{ marginTop: "10px", maxWidth: "34ch" }}>
                {SITE.tagline[locale] ?? SITE.tagline.de}
              </p>
              <div className="social" style={{ marginTop: "16px" }}>
                <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href="#" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2c0-.6.4-1 1-1z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4>{t("footer.discover")}</h4>
              {discover.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>

            <div>
              <h4>{t("footer.contact")}</h4>
              <a href="#">
                {SITE.address.street}, {SITE.address.city}
              </a>
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <p className="muted" style={{ marginTop: "8px" }}>
                {SITE.hours[locale] ?? SITE.hours.de}
              </p>
            </div>
          </div>

          <div className="footer__bottom">
            <span>© 2026 Atelier Türkis · {t("footer.rights")}</span>
            <span>
              <Link href="/impressum">{t("footer.impressum")}</Link> ·{" "}
              <Link href="/datenschutz">{t("footer.datenschutz")}</Link> ·{" "}
              <Link href="/agb">{t("footer.agb")}</Link> · <CookieSettingsButton />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
