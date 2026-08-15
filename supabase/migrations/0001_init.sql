-- ============================================================================
-- Atelier Türkis — Initiales Schema (Kurse, Shop, Galerie, Team, Admin-Rollen)
-- ============================================================================

-- ---------- Profile & Admin-Rollen ----------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

-- Profil automatisch bei neuer Registrierung anlegen
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Hilfsfunktion: ist der aktuelle Nutzer Admin?
create or replace function public.is_admin()
returns boolean
language sql
stable security definer set search_path = public
as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

-- updated_at automatisch pflegen
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------- Kurse ----------------------------------------------------------
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  audience text not null check (audience in ('erwachsene', 'kinder')),
  title text not null,
  category text,
  teaser text,
  description text,
  takeaway text,
  price text,
  price_note text,
  schedule text,
  start_label text,
  availability text,
  is_new boolean not null default false,
  instructor_slug text,
  color text not null default 'teal',
  image_url text,
  meta jsonb not null default '[]'::jsonb,   -- [{label, value}]
  faq jsonb not null default '[]'::jsonb,     -- [{q, a}]
  cta_to text not null default 'detail',
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger courses_touch before update on public.courses
  for each row execute function public.touch_updated_at();

-- ---------- Shop-Produkte / Werke -----------------------------------------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text,
  group_name text not null default 'werke' check (group_name in ('werke', 'produkte', 'material')),
  price text,
  teaser text,
  description text,
  story text,
  specs jsonb not null default '[]'::jsonb,   -- [{label, value}]
  availability text,
  instructor_slug text,
  color text not null default 'teal',
  image_url text,
  images jsonb not null default '[]'::jsonb,   -- [url, ...]
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger products_touch before update on public.products
  for each row execute function public.touch_updated_at();

-- ---------- Galerie-Bilder -------------------------------------------------
create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  category text not null default 'atelier',
  image_url text,
  alt text,
  color text not null default 'teal',
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- Team -----------------------------------------------------------
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  role text,
  bio text,
  color text not null default 'teal',
  image_url text,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger team_touch before update on public.team_members
  for each row execute function public.touch_updated_at();

-- ============================================================================
-- Row Level Security: öffentlich nur lesen (veröffentlichte), schreiben nur Admin
-- ============================================================================
alter table public.profiles       enable row level security;
alter table public.courses        enable row level security;
alter table public.products       enable row level security;
alter table public.gallery_images enable row level security;
alter table public.team_members   enable row level security;

-- Profile: jede:r sieht das eigene Profil; Admins alle
create policy "profiles_self_read" on public.profiles
  for select using (id = auth.uid() or public.is_admin());

-- Generischer Lesezugriff (öffentlich = veröffentlicht, Admin = alles)
create policy "courses_read"  on public.courses        for select using (is_published or public.is_admin());
create policy "products_read" on public.products       for select using (is_published or public.is_admin());
create policy "gallery_read"  on public.gallery_images  for select using (is_published or public.is_admin());
create policy "team_read"     on public.team_members    for select using (is_published or public.is_admin());

-- Schreibzugriff nur für Admins
create policy "courses_write"  on public.courses       for all using (public.is_admin()) with check (public.is_admin());
create policy "products_write" on public.products      for all using (public.is_admin()) with check (public.is_admin());
create policy "gallery_write"  on public.gallery_images for all using (public.is_admin()) with check (public.is_admin());
create policy "team_write"     on public.team_members  for all using (public.is_admin()) with check (public.is_admin());

-- ============================================================================
-- Storage-Bucket für Bilder (öffentlich lesbar, Upload nur Admin)
-- ============================================================================
insert into storage.buckets (id, name, public)
  values ('atelier', 'atelier', true)
  on conflict (id) do nothing;

create policy "atelier_public_read" on storage.objects
  for select using (bucket_id = 'atelier');
create policy "atelier_admin_write" on storage.objects
  for insert with check (bucket_id = 'atelier' and public.is_admin());
create policy "atelier_admin_update" on storage.objects
  for update using (bucket_id = 'atelier' and public.is_admin());
create policy "atelier_admin_delete" on storage.objects
  for delete using (bucket_id = 'atelier' and public.is_admin());
