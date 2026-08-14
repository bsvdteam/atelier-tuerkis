import { Link } from "@/i18n/navigation";
import { getLocalised } from "@/lib/localise";
import type { Course, Locale } from "@/types";

export function CourseCard({
  course,
  locale,
  reveal,
}: {
  course: Course;
  locale: Locale;
  reveal?: string;
}) {
  const href =
    course.ctaTo === "kontakt" ? "/kontakt" : `/angebot/${course.audience}/${course.slug}`;
  const audienceLabel = course.audience === "kinder" ? "Kinder" : "Erwachsene";
  const foot = course.start ?? course.schedule;
  const few = /wenige|noch [1-3] /i.test(course.availability?.de ?? "");

  return (
    <Link className={`card${reveal ? ` ${reveal}` : ""}`} href={href}>
      <div className="card__media">
        <div className={`ph ph--${course.color}`} />
        <div className="ph-label">{getLocalised(course.category, locale)}</div>
      </div>
      <div className="card__body">
        <div className="card__spots">
          <span className={`tag tag--${course.color}`}>{audienceLabel}</span>
          {course.availability && (
            <span className={`spots${few ? " spots--few" : ""}`}>
              <span className="spots__dot" />
              {getLocalised(course.availability, locale)}
            </span>
          )}
        </div>
        <h3 className="card__title">{getLocalised(course.title, locale)}</h3>
        <p className="card__desc">{getLocalised(course.teaser, locale)}</p>
        <div className="card__foot">
          <span className="card__price">{course.price}</span>
          {foot && (
            <span className="muted" style={{ fontWeight: 800, fontSize: ".82rem" }}>
              {getLocalised(foot, locale)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
