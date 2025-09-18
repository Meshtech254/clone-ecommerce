Supabase setup

- Create a Supabase project.
- In the SQL editor, run the contents of `schema.sql`.
- In Project Settings → API, copy:
  - Project URL → set `VITE_SUPABASE_URL`
  - anon key → set `VITE_SUPABASE_ANON_KEY`
- In Authentication → Providers → Email, enable Email/Password.

Optional: Add storage bucket for product images and reference URLs in `products.images` and `products.main_image`.
