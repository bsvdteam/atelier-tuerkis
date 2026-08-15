import { PageHeader } from "@/components/ui/PageHeader";

export type LegalSection = { title: string; body: React.ReactNode };

export function LegalPage({
  title,
  eyebrow,
  lead,
  updated,
  sections,
}: {
  title: string;
  eyebrow: string;
  lead: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: title }]}
        eyebrow={eyebrow}
        title={title}
        lead={lead}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="legal reveal">
            <span className="legal__updated">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
              {updated}
            </span>

            {sections.map((s, i) => (
              <div className="legal__section" key={i}>
                <div className="legal__head">
                  <span className="legal__num">{i + 1}</span>
                  <h2>{s.title}</h2>
                </div>
                {s.body}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
