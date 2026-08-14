import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactCta } from "@/components/ui/ContactCta";
import { teamBySlug } from "@/content";
import { getLocalised } from "@/lib/localise";
import { cn } from "@/lib/utils";
import type { Course, Locale } from "@/types";

export function CourseDetail({ course, locale }: { course: Course; locale: Locale }) {
  const title = getLocalised(course.title, locale);
  const instructor = teamBySlug(course.instructor);
  const isKids = course.audience === "kinder";
  const angebotLabel = isKids ? "Kinder" : "Erwachsene";

  const whatsappText = isKids
    ? `Hallo Atelier Türkis, mein Kind möchte gern zu «${title}». Könnt ihr mir mehr Infos geben?`
    : `Hallo Atelier Türkis, ich interessiere mich für den Kurs «${title}». Können Sie mir mehr zum nächsten Termin sagen?`;

  return (
    <div className={cn(isKids && "theme-kids")}>
      <PageHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Angebot", href: "/angebot" },
          { label: angebotLabel, href: `/angebot/${course.audience}` },
          { label: title },
        ]}
        eyebrow={getLocalised(course.category, locale)}
        title={title}
        lead={getLocalised(course.teaser, locale)}
      />

      <section className="section--tight">
        <div className="container-page grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Inhalt */}
          <div>
            <div className={cn("ph h-64 rounded-[28px]", `ph--${course.color}`)}>
              <span className="ph-label">{title}</span>
            </div>

            <h2 className="h3 mt-8">Worum es geht</h2>
            <p className="mt-3 text-ink-soft">{getLocalised(course.description, locale)}</p>

            {course.takeaway && (
              <div className="frost mt-6 rounded-[24px] p-6">
                <p className="eyebrow">Das nimmst du mit</p>
                <p className="mt-2 text-ink">{getLocalised(course.takeaway, locale)}</p>
              </div>
            )}

            {course.faq && course.faq.length > 0 && (
              <div className="mt-8">
                <h2 className="h3">Häufige Fragen</h2>
                <div className="mt-4 flex flex-col gap-3">
                  {course.faq.map((f, i) => (
                    <details key={i} className="card !p-0">
                      <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-bold text-ink">
                        {getLocalised(f.q, locale)}
                        <span className="text-teal-deep">+</span>
                      </summary>
                      <p className="px-5 pb-5 text-ink-soft">{getLocalised(f.a, locale)}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Buchungs-Box */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card">
              <div className="flex items-end justify-between">
                <span className="font-display text-3xl text-teal-ink">{course.price}</span>
                {course.priceNote && (
                  <span className="text-sm text-ink-mute">{getLocalised(course.priceNote, locale)}</span>
                )}
              </div>

              <dl className="mt-5 divide-y divide-line">
                {course.meta.map((m, i) => (
                  <div key={i} className="flex justify-between gap-4 py-2.5">
                    <dt className="text-sm text-ink-mute">{getLocalised(m.label, locale)}</dt>
                    <dd className="text-right text-sm font-bold text-ink">
                      {getLocalised(m.value, locale)}
                    </dd>
                  </div>
                ))}
              </dl>

              {instructor && (
                <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                  <span className={cn("ph h-10 w-10 rounded-full", `ph--${instructor.color}`)} />
                  <div className="text-sm">
                    <p className="font-bold text-ink">{instructor.name}</p>
                    <p className="text-ink-mute">{getLocalised(instructor.role, locale)}</p>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <ContactCta whatsappText={whatsappText} emailSubject={`Kurs ${title}`} />
              </div>
            </div>

            <Link
              href={`/angebot/${course.audience}`}
              className="mt-4 inline-block text-sm font-bold text-ink-mute hover:text-teal-deep"
            >
              ← Alle {angebotLabel.toLowerCase()}-Kurse
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}
