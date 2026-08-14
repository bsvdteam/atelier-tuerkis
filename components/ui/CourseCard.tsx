import { Link } from "@/i18n/navigation";
import { getLocalised } from "@/lib/localise";
import { cn } from "@/lib/utils";
import type { Course, Locale } from "@/types";

export function CourseCard({ course, locale }: { course: Course; locale: Locale }) {
  const href =
    course.ctaTo === "kontakt"
      ? "/kontakt"
      : `/angebot/${course.audience}/${course.slug}`;

  return (
    <Link
      href={href}
      className="card card--hover group flex flex-col overflow-hidden !p-0"
    >
      {/* Bild-Platzhalter */}
      <div className={cn("ph relative h-44", `ph--${course.color}`)}>
        <span className="ph-label text-sm opacity-90">
          {getLocalised(course.title, locale)}
        </span>
        {course.isNew && (
          <span className="tag absolute left-3 top-3 !bg-white/90 !text-coral">
            Neu
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <span className="tag">{getLocalised(course.category, locale)}</span>
          {course.availability && (
            <span className="text-xs font-bold text-teal-deep">
              {getLocalised(course.availability, locale)}
            </span>
          )}
        </div>

        <h3 className="mt-3 font-display text-xl text-ink">
          {getLocalised(course.title, locale)}
        </h3>
        <p className="mt-1 flex-1 text-sm text-ink-soft">
          {getLocalised(course.teaser, locale)}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
          <span className="font-display text-lg text-teal-ink">
            {course.price}
            {course.priceNote && (
              <span className="ml-1 text-xs font-normal text-ink-mute">
                {getLocalised(course.priceNote, locale)}
              </span>
            )}
          </span>
          {course.schedule && (
            <span className="text-xs font-semibold text-ink-mute">
              {getLocalised(course.schedule, locale)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
