"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

type Group = { key: string; label: string; href: string; sub: { href: string; label: string }[] };

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const mmenuRef = useRef<HTMLDivElement>(null);

  // Blur-Streifen beim Scrollen — robust, egal ob window oder body scrollt
  useEffect(() => {
    const nav = document.querySelector(".nav");
    const onScroll = () => {
      const y =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      nav?.classList.toggle("scrolled", y > 16);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    return () => window.removeEventListener("scroll", onScroll, { capture: true });
  }, []);

  // Body-Scroll sperren + Escape schliesst
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) setActiveGroup(null);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const groups: Group[] = [
    {
      key: "atelier",
      label: t("atelier"),
      href: "/atelier",
      sub: [
        { href: "/atelier", label: t("ueberUns") },
        { href: "/galerie", label: t("galerie") },
      ],
    },
    {
      key: "angebot",
      label: t("angebot"),
      href: "/angebot",
      sub: [
        { href: "/angebot/erwachsene", label: t("erwachsene") },
        { href: "/angebot/kinder", label: t("kinder") },
        { href: "/angebot/gruppen", label: t("gruppen") },
        { href: "/angebot/raeume", label: t("raeume") },
        { href: "/angebot/facherl", label: t("facherl") },
      ],
    },
  ];

  const openMenu = () => {
    const b = burgerRef.current;
    const m = mmenuRef.current;
    if (b && m) {
      const r = b.getBoundingClientRect();
      m.style.setProperty("--bx", `${Math.round(r.left + r.width / 2)}px`);
      m.style.setProperty("--by", `${Math.round(r.top + r.height / 2)}px`);
    }
    setActiveGroup(null);
    setOpen(true);
  };

  const switchLocale = (next: string) => {
    if (next !== locale) router.replace(pathname, { locale: next });
  };

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <header className="nav">
        <div className="nav__inner">
          <Link className="brand" href="/">
            Atelier <span>Türkis</span>
          </Link>

          {/* Desktop-Fallback (ohne JS) */}
          <nav className="nav__menu" aria-label="Hauptnavigation">
            {groups.map((g) => (
              <div key={g.key} className="nav__group">
                <Link href={g.href} className="nav__top">
                  {g.label}
                </Link>
                <div className="nav__drop">
                  {g.sub.map((s) => (
                    <Link key={s.href} href={s.href}>
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link href="/shop">{t("shop")}</Link>
          </nav>

          <div className="nav__right">
            <Link href="/kontakt" className="btn btn--primary btn--sm hide-m">
              {t("contactCta")}
            </Link>
            <div className="lang">
              <button className={locale === "de" ? "active" : ""} onClick={() => switchLocale("de")}>
                DE
              </button>
              <span>/</span>
              <button className={locale === "en" ? "active" : ""} onClick={() => switchLocale("en")}>
                EN
              </button>
            </div>
            <button
              ref={burgerRef}
              className="burger"
              aria-label={t("openMenu")}
              onClick={openMenu}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Vollbild-Menü mit Farbkreis */}
      <div
        ref={mmenuRef}
        className={`mmenu${open ? " open" : ""}`}
        aria-hidden={!open}
      >
        <div className="mmenu__paint" />
        <div className="mmenu__top">
          <span className="brand">
            Atelier <span>Türkis</span>
          </span>
          <button className="mmenu__close" aria-label={t("closeMenu")} onClick={() => setOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {groups.map((g) => (
          <Fragment key={g.key}>
            <Link
              href={g.href}
              className={activeGroup === g.key ? "is-active" : ""}
              onMouseEnter={() => setActiveGroup(g.key)}
              onFocus={() => setActiveGroup(g.key)}
              onClick={() => setOpen(false)}
            >
              {g.label}
            </Link>
            <div className={`sub${open && activeGroup === g.key ? " show" : ""}`}>
              {g.sub.map((s) => (
                <Link key={s.href} href={s.href} onClick={() => setOpen(false)}>
                  {s.label}
                </Link>
              ))}
            </div>
          </Fragment>
        ))}

        <Link href="/shop" onClick={() => setOpen(false)} onMouseEnter={() => setActiveGroup(null)}>
          {t("shop")}
        </Link>
      </div>
    </>
  );
}
