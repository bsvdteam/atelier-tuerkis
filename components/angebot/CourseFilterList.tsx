"use client";

import { useMemo, useState } from "react";
import { CourseCard } from "@/components/ui/CourseCard";
import { getLocalised } from "@/lib/localise";
import { cn } from "@/lib/utils";
import type { Course, Locale } from "@/types";

export function CourseFilterList({
  courses,
  locale,
  allLabel = "Alle",
}: {
  courses: Course[];
  locale: Locale;
  allLabel?: string;
}) {
  const categories = useMemo(() => {
    const seen = new Map<string, string>();
    for (const c of courses) {
      const key = c.category.de;
      if (!seen.has(key)) seen.set(key, getLocalised(c.category, locale));
    }
    return Array.from(seen, ([key, label]) => ({ key, label }));
  }, [courses, locale]);

  const [active, setActive] = useState<string>("alle");
  const shown =
    active === "alle" ? courses : courses.filter((c) => c.category.de === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <FilterButton active={active === "alle"} onClick={() => setActive("alle")}>
          {allLabel}
        </FilterButton>
        {categories.map((c) => (
          <FilterButton key={c.key} active={active === c.key} onClick={() => setActive(c.key)}>
            {c.label}
          </FilterButton>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((c) => (
          <CourseCard key={c.slug} course={c} locale={locale} />
        ))}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-bold transition-colors",
        active
          ? "border-teal-deep bg-teal-deep text-white"
          : "border-line bg-white/60 text-ink-soft hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
