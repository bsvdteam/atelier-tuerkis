"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type SubLink = { href: string; key: string };

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body-Scroll sperren, wenn Mobile-Menü offen
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const angebotLinks: SubLink[] = [
    { href: "/angebot/erwachsene", key: "erwachsene" },
    { href: "/angebot/kinder", key: "kinder" },
    { href: "/angebot/gruppen", key: "gruppen" },
    { href: "/angebot/raeume", key: "raeume" },
  ];
  const kunstLinks: SubLink[] = [
    { href: "/kunst/galerie", key: "galerie" },
    { href: "/kunst/verkauf", key: "verkauf" },
  ];

  const switchLocale = (next: string) => {
    if (next !== locale) router.replace(pathname, { locale: next });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all",
        scrolled && "backdrop-blur-md",
      )}
    >
      <div
        className={cn(
          "container-page mt-3 flex items-center gap-4 rounded-full px-4 py-2 transition-all sm:px-5",
          scrolled ? "frost" : "bg-white/40",
        )}
      >
        {/* Brand */}
        <Link
          href="/"
          className="font-display text-xl font-medium tracking-tight text-ink"
          onClick={() => setMobileOpen(false)}
        >
          Atelier <span className="text-teal-deep">Türkis</span>
        </Link>

        {/* Desktop-Menü */}
        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          <NavLink href="/atelier">{t("atelier")}</NavLink>
          <NavDropdown label={t("angebot")} links={angebotLinks} t={t} rootHref="/angebot" />
          <NavDropdown label={t("kunst")} links={kunstLinks} t={t} rootHref="/kunst" />
        </nav>

        {/* Aktionen */}
        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <Link href="/kontakt" className="btn btn--primary btn--sm hidden sm:inline-flex">
            {t("contactCta")}
          </Link>

          <div className="hidden items-center rounded-full border border-line bg-white/60 p-0.5 text-sm font-bold sm:flex">
            {["de", "en"].map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={cn(
                  "rounded-full px-2.5 py-1 uppercase transition-colors",
                  locale === l ? "bg-teal-deep text-white" : "text-ink-mute hover:text-ink",
                )}
                aria-pressed={locale === l}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Burger */}
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/60 text-ink lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile-Menü */}
      {mobileOpen && (
        <div className="fixed inset-0 top-0 z-40 overflow-y-auto bg-white/95 backdrop-blur-lg lg:hidden">
          <div className="container-page flex flex-col gap-1 pt-24 pb-16">
            <MobileLink href="/atelier" onClick={() => setMobileOpen(false)}>
              {t("atelier")}
            </MobileLink>

            <MobileGroup label={t("angebot")} links={angebotLinks} t={t} onNavigate={() => setMobileOpen(false)} />
            <MobileGroup label={t("kunst")} links={kunstLinks} t={t} onNavigate={() => setMobileOpen(false)} />

            <MobileLink href="/gutscheine" onClick={() => setMobileOpen(false)}>
              {t("gutscheine")}
            </MobileLink>
            <MobileLink href="/faq" onClick={() => setMobileOpen(false)}>
              {t("faq")}
            </MobileLink>
            <MobileLink href="/kontakt" onClick={() => setMobileOpen(false)}>
              {t("kontakt")}
            </MobileLink>

            <div className="mt-6 flex items-center gap-2">
              {["de", "en"].map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    switchLocale(l);
                    setMobileOpen(false);
                  }}
                  className={cn(
                    "rounded-full border border-line px-4 py-2 text-sm font-bold uppercase",
                    locale === l ? "bg-teal-deep text-white" : "text-ink-mute",
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-full px-3.5 py-2 font-bold text-ink transition-colors hover:bg-white/70"
    >
      {children}
    </Link>
  );
}

function NavDropdown({
  label,
  links,
  t,
  rootHref,
}: {
  label: string;
  links: SubLink[];
  t: (k: string) => string;
  rootHref: string;
}) {
  return (
    <div className="group relative">
      <Link
        href={rootHref}
        className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 font-bold text-ink transition-colors hover:bg-white/70 group-focus-within:bg-white/70"
      >
        {label}
        <ChevronDown size={15} className="transition-transform group-hover:rotate-180" />
      </Link>
      <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="frost flex w-52 flex-col gap-0.5 rounded-2xl p-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-xl px-3 py-2 font-semibold text-ink transition-colors hover:bg-white/70"
            >
              {t(l.key)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="border-b border-line py-3 font-display text-2xl text-ink"
    >
      {children}
    </Link>
  );
}

function MobileGroup({
  label,
  links,
  t,
  onNavigate,
}: {
  label: string;
  links: SubLink[];
  t: (k: string) => string;
  onNavigate: () => void;
}) {
  return (
    <div className="border-b border-line py-3">
      <p className="font-display text-2xl text-ink">{label}</p>
      <div className="mt-1 flex flex-col">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={onNavigate}
            className="py-1.5 pl-1 font-semibold text-ink-soft"
          >
            {t(l.key)}
          </Link>
        ))}
      </div>
    </div>
  );
}
