"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { logout } from "@/app/[locale]/admin/actions";

const LINKS = [
  { href: "/admin", label: "Übersicht", exact: true },
  { href: "/admin/courses", label: "Kurse" },
  { href: "/admin/products", label: "Shop" },
  { href: "/admin/gallery", label: "Galerie" },
  { href: "/admin/team", label: "Team" },
];

export function AdminNav({ email }: { email: string }) {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <header className="admin__top">
      <Link href="/admin" className="admin__brand">
        Atelier <span>Türkis</span>
      </Link>
      <nav className="admin__nav">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className={isActive(l.href, l.exact) ? "active" : ""}>
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="admin__spacer" />
      <span className="admin__user">{email}</span>
      <form action={logout}>
        <button type="submit" className="btn btn--ghost btn--sm">
          Abmelden
        </button>
      </form>
    </header>
  );
}
