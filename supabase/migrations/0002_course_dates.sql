-- Kurstermine als konkrete Daten (Kalender-Auswahl im Admin, Anzeige im Kalender)
alter table public.courses
  add column if not exists dates jsonb not null default '[]'::jsonb; -- ["YYYY-MM-DD", ...]
