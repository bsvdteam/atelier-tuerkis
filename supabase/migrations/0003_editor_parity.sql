-- Editor-Parität: Kurse bekommen mehrere Kursleitungen und eigene Eindrücke-Bilder.
-- Produkte haben die images-Spalte bereits (0001).

alter table public.courses
  add column if not exists instructor_slugs jsonb not null default '[]'::jsonb; -- ["slug", ...]
alter table public.courses
  add column if not exists images jsonb not null default '[]'::jsonb;            -- [url, ...] (Eindrücke)

-- Bestehende Einzel-Kursleitung in die Mehrfach-Spalte übernehmen.
update public.courses
  set instructor_slugs = jsonb_build_array(instructor_slug)
  where instructor_slug is not null
    and instructor_slug <> ''
    and (instructor_slugs is null or instructor_slugs = '[]'::jsonb);
