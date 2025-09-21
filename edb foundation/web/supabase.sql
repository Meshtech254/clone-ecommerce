-- EDB Foundation schema
create extension if not exists "uuid-ossp";

-- Admin roles table (optional reference)
create table if not exists public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin','user')) default 'user',
  created_at timestamptz not null default now()
);

-- Programs
create table if not exists public.programs (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  images text[] default '{}',
  status text not null check (status in ('ongoing','completed','upcoming')),
  created_at timestamptz not null default now()
);

-- News
create table if not exists public.news (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  body text not null,
  created_at timestamptz not null default now()
);

-- Gallery
create table if not exists public.gallery_items (
  id uuid primary key default uuid_generate_v4(),
  type text not null check (type in ('image','video')),
  url text not null,
  caption text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- Storage bucket for media (run once manually if needed)
-- select storage.create_bucket('edb-media', jsonb_build_object('public', true));

-- Feedback
create table if not exists public.feedback (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Donations
create table if not exists public.donations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete set null,
  amount numeric(10,2) not null check (amount >= 0),
  currency text not null default 'usd',
  status text not null,
  provider text not null,
  provider_session_id text,
  created_at timestamptz not null default now()
);

-- RLS
alter table public.programs enable row level security;
alter table public.news enable row level security;
alter table public.gallery_items enable row level security;
alter table public.feedback enable row level security;
alter table public.donations enable row level security;
alter table public.user_roles enable row level security;

-- Public read for programs, news, gallery
create policy if not exists "Programs readable by anyone" on public.programs for select using (true);
create policy if not exists "News readable by anyone" on public.news for select using (true);
create policy if not exists "Gallery readable by anyone" on public.gallery_items for select using (true);

-- Feedback insert by anyone, read only by admins
create policy if not exists "Feedback insert by anyone" on public.feedback for insert with check (true);
create policy if not exists "Feedback select by admin" on public.feedback for select using (
  exists(select 1 from public.user_roles ur where ur.user_id = auth.uid() and ur.role = 'admin')
);

-- Donations readable by admins only
create policy if not exists "Donations select by admin" on public.donations for select using (
  exists(select 1 from public.user_roles ur where ur.user_id = auth.uid() and ur.role = 'admin')
);

-- User roles: user can read own role; admins can read all
create policy if not exists "User reads own role" on public.user_roles for select using (auth.uid() = user_id);
create policy if not exists "Admins read roles" on public.user_roles for select using (
  exists(select 1 from public.user_roles ur where ur.user_id = auth.uid() and ur.role = 'admin')
);

