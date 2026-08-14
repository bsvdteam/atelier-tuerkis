import { useLocale, useTranslations } from "next-intl";
import { Camera, Share2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/site";
import type { Locale } from "@/types";

export function Footer() {
  const t = useTranslations();
  const locale = useLocale() as Locale;

  const discover = [
    { href: "/atelier", label: t("nav.atelier") },
    { href: "/angebot", label: t("nav.angebot") },
    { href: "/kunst/galerie", label: t("nav.galerie") },
    { href: "/kunst/verkauf", label: t("nav.verkauf") },
    { href: "/gutscheine", label: t("nav.gutscheine") },
    { href: "/faq", label: t("nav.faq") },
  ];

  return (
    <footer className="mt-10">
      <div className="container-page">
        <div className="frost rounded-t-[40px] px-6 py-12 sm:px-10">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1.2fr]">
            {/* Brand */}
            <div>
              <p className="font-display text-2xl text-ink">
                Atelier <span className="text-teal-deep">Türkis</span>
              </p>
              <p className="mt-3 max-w-xs text-ink-soft">
                {SITE.tagline[locale] ?? SITE.tagline.de}
              </p>
              <div className="mt-5 flex gap-3">
                <a
                  href={SITE.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-ink transition-colors hover:bg-white"
                >
                  <Camera size={18} />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-ink transition-colors hover:bg-white"
                >
                  <Share2 size={18} />
                </a>
              </div>
            </div>

            {/* Entdecken */}
            <div>
              <p className="eyebrow mb-4">{t("footer.discover")}</p>
              <ul className="flex flex-col gap-2">
                {discover.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-ink-soft transition-colors hover:text-teal-deep">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kontakt */}
            <div>
              <p className="eyebrow mb-4">{t("footer.contact")}</p>
              <address className="flex flex-col gap-2 not-italic text-ink-soft">
                <span>
                  {SITE.address.street}
                  <br />
                  {SITE.address.city}
                </span>
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-teal-deep">
                  {SITE.phone}
                </a>
                <a href={`mailto:${SITE.email}`} className="hover:text-teal-deep">
                  {SITE.email}
                </a>
                <span>{SITE.hours[locale] ?? SITE.hours.de}</span>
              </address>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-sm text-ink-mute sm:flex-row">
            <p>© 2026 Atelier Türkis · {t("footer.rights")}</p>
            <div className="flex gap-4">
              <Link href="/impressum" className="hover:text-ink">
                {t("footer.impressum")}
              </Link>
              <Link href="/datenschutz" className="hover:text-ink">
                {t("footer.datenschutz")}
              </Link>
              <Link href="/agb" className="hover:text-ink">
                {t("footer.agb")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
