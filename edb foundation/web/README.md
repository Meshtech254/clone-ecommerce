EDB Foundation website built with Next.js, Supabase, and Stripe.

Setup

1. Copy .env.example to .env.local and fill values

   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (webhook/admin server ops)
   - `STRIPE_PUBLIC_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_SITE_URL` (e.g., http://localhost:3000)

2. Apply Supabase schema

   - Open the SQL editor in Supabase and run the content of `supabase.sql`.
   - Create at least one admin by inserting into `public.user_roles` with role 'admin'.

3. Install and run

```bash
npm install
npm run dev
```

Pages

- Public: `/`, `/programs`, `/galleries`, `/feedback`, `/donate`, `/contact`
- Admin: `/login`, `/admin`

Webhooks

- Configure Stripe webhook to `/api/stripe/webhook` for `checkout.session.completed`.
