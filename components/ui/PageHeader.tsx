import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

export function PageHeader({
  crumbs,
  eyebrow,
  title,
  lead,
  className,
}: {
  crumbs?: Crumb[];
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("container-page pt-8 sm:pt-12", className)}>
      {crumbs && crumbs.length > 0 && (
        <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm font-semibold text-ink-mute">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-2">
              {c.href ? (
                <Link href={c.href} className="transition-colors hover:text-teal-deep">
                  {c.label}
                </Link>
              ) : (
                <span className="text-ink-soft">{c.label}</span>
              )}
              {i < crumbs.length - 1 && <span aria-hidden>·</span>}
            </span>
          ))}
        </nav>
      )}

      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1 className="display mt-4 max-w-3xl">{title}</h1>
      {lead && <p className="lead mt-5 max-w-2xl">{lead}</p>}
    </header>
  );
}
