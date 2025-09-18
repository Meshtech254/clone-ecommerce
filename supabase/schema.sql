-- Enable extensions
create extension if not exists "uuid-ossp";

-- Public profiles (optional, linked to auth.users)
create table if not exists public.profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  name text,
  created_at timestamptz not null default now()
);

-- Products
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text not null,
  price numeric(10,2) not null check (price >= 0),
  original_price numeric(10,2) check (original_price >= 0),
  category text not null check (category in ('Women','Men','Accessories','New Arrivals','Sale')),
  subcategory text,
  brand text not null default 'Clo''ne',
  images text[] not null,
  main_image text not null,
  tags text[] not null default '{}',
  is_featured boolean not null default false,
  is_new_arrival boolean not null default false,
  is_on_sale boolean not null default false,
  sale_percentage int check (sale_percentage between 0 and 100),
  rating numeric(2,1) not null default 0 check (rating between 0 and 5),
  review_count int not null default 0 check (review_count >= 0),
  material text,
  care text,
  dimensions text,
  weight numeric(10,2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_variants (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references public.products(id) on delete cascade,
  size text check (size in ('XS','S','M','L','XL','XXL','One Size')),
  color text,
  stock int not null default 0 check (stock >= 0),
  sku text not null unique
);

-- Orders
create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending','processing','shipped','delivered','cancelled')),
  subtotal numeric(10,2) not null default 0,
  tax numeric(10,2) not null default 0,
  shipping numeric(10,2) not null default 0,
  total numeric(10,2) not null default 0,
  shipping_address jsonb not null,
  billing_address jsonb not null,
  payment_method text not null,
  payment_status text not null default 'pending' check (payment_status in ('pending','completed','failed')),
  tracking_number text,
  estimated_delivery timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id),
  variant_sku text not null references public.product_variants(sku),
  size text,
  color text,
  quantity int not null check (quantity > 0),
  price numeric(10,2) not null check (price >= 0),
  name text not null,
  image text not null
);

-- Triggers to maintain updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists set_orders_updated_at on public.orders;
create trigger set_orders_updated_at before update on public.orders
for each row execute function public.set_updated_at();

-- Compute totals before insert/update
create or replace function public.compute_order_totals()
returns trigger as $$
declare
  items_total numeric(10,2);
begin
  select coalesce(sum(price * quantity), 0) into items_total from public.order_items where order_id = new.id;
  new.subtotal := coalesce(items_total, 0);
  new.tax := round(new.subtotal * 0.08, 2);
  new.shipping := case when new.subtotal > 200 then 0 else 15 end;
  new.total := new.subtotal + new.tax + new.shipping;
  return new;
end;
$$ language plpgsql;

drop trigger if exists compute_order_totals_before_update on public.orders;
create trigger compute_order_totals_before_update before update on public.orders
for each row execute function public.compute_order_totals();

-- RLS
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.profiles enable row level security;

-- Products readable by anyone
create policy "Products are readable by anon and auth" on public.products for select using (true);
create policy "Variants are readable by anon and auth" on public.product_variants for select using (true);

-- Orders only accessible by owner
create policy "Users can read their orders" on public.orders
  for select using (auth.uid() = user_id);
create policy "Users can insert their orders" on public.orders
  for insert with check (auth.uid() = user_id);
create policy "Users can update their orders" on public.orders
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can read their order items" on public.order_items
  for select using (exists (
    select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()
  ));
create policy "Users can insert their order items" on public.order_items
  for insert with check (exists (
    select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()
    ));
create policy "Users can update their order items" on public.order_items
  for update using (exists (
    select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()
  )) with check (exists (
    select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()
  ));

