import { Fragment } from "react";
import { Link } from "@/i18n/navigation";

type Crumb = { label: string; href?: string };

export function PageHeader({
  crumbs,
  eyebrow,
  title,
  lead,
}: {
  crumbs?: Crumb[];
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
}) {
  return (
    <section className="pagehead">
      <div className="container">
        {crumbs && crumbs.length > 0 && (
          <p className="crumbs reveal">
            {crumbs.map((c, i) => (
              <Fragment key={i}>
                {i > 0 && " · "}
                {c.href ? <Link href={c.href}>{c.label}</Link> : c.label}
              </Fragment>
            ))}
          </p>
        )}
        {eyebrow && <span className="eyebrow reveal">{eyebrow}</span>}
        <h1 className="display reveal d1">{title}</h1>
        {lead && <p className="lead reveal d2">{lead}</p>}
      </div>
    </section>
  );
}
