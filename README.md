# GaiaBerry — Website

Halaal-conscious herbal remedies & consultations. Production website with shop, booking system, consultant approval flow, and Shopify-powered checkout.

---

## 1. Tech Stack

| Layer | Tech |
|---|---|
| Framework | **TanStack Start v1** (React 19 + Vite 7, file-based routing, SSR-capable) |
| Styling | **Tailwind CSS v4** (tokens in `src/styles.css`) + **shadcn/ui** components |
| Backend | **Supabase** (Postgres, Auth, Edge Functions, Storage) — provisioned via Lovable Cloud |
| Email | Built-in transactional email system (templates in `src/lib/email-templates/`) |
| Commerce | **Shopify Storefront API** — products, cart, checkout |
| Validation | **Zod** |
| State | **Zustand** (`src/stores/cartStore.ts`) |
| Hosting | Cloudflare Workers (edge runtime via TanStack Start) |

> ⚠️ The project runs in a **Cloudflare Worker runtime** (with `nodejs_compat`). Avoid Node-only packages (`child_process`, `sharp`, `puppeteer`, native bindings, `fs.watch`, etc.). Stick to Web-standard / fetch-based libraries.

---

## 2. Project Structure

```
src/
├── routes/                          # File-based routes (TanStack Router)
│   ├── __root.tsx                   # Root layout (html/head/body shell)
│   ├── index.tsx                    # Home /
│   ├── shop.tsx                     # /shop
│   ├── product.$handle.tsx          # /product/:handle
│   ├── about.tsx                    # /about
│   ├── consultation.tsx             # /consultation
│   ├── book.tsx                     # /book  (booking calendar)
│   ├── agent.tsx                    # /agent
│   ├── agent-portal.tsx             # /agent-portal
│   ├── agent.respond.tsx            # /agent/respond  (approve/decline)
│   ├── remedy-finder.tsx
│   ├── testimonials.tsx
│   ├── unsubscribe.tsx
│   ├── legal.*.tsx                  # privacy, terms, shipping, disclaimer
│   ├── sitemap[.]xml.tsx
│   ├── api.public.bookings.create.ts    # POST  /api/public/bookings/create
│   ├── api.public.bookings.respond.ts   # POST/GET /api/public/bookings/respond
│   ├── email/unsubscribe.ts
│   └── lovable/email/...            # Built-in email queue/send routes
├── components/
│   ├── ui/                          # shadcn primitives (DO NOT edit blindly)
│   ├── SiteHeader.tsx, SiteFooter.tsx
│   ├── AddToCartButton.tsx, CartDrawer.tsx
│   └── ...
├── lib/
│   ├── booking-config.ts            # ⭐ Agents, session options, hours, slots
│   ├── shopify.ts                   # Storefront client
│   ├── shopify-checkout.server.ts   # Server-only cart/checkout creation
│   ├── email-templates/             # React Email templates
│   └── utils.ts
├── integrations/supabase/
│   ├── client.ts                    # ⛔ AUTO-GENERATED — never edit
│   ├── client.server.ts             # Server-side Supabase
│   ├── types.ts                     # ⛔ AUTO-GENERATED — never edit
│   └── auth-middleware.ts
├── stores/cartStore.ts              # Zustand cart
├── hooks/
├── styles.css                       # ⭐ Design tokens (oklch) + Tailwind v4 theme
└── router.tsx                       # Router setup

supabase/config.toml                 # Project-level Supabase config
```

### Conventions
- **Add a page** → create `src/routes/<name>.tsx` with `createFileRoute("/name")`. Do NOT edit `src/routeTree.gen.ts` (auto-generated).
- **Server logic that the client calls directly** → use `createServerFn` in `*.functions.ts` files under `src/server/` or define API routes under `src/routes/api/`.
- **Public webhooks / cron / external callers** → put under `/api/public/*` (auth-bypassed; verify signatures yourself).
- **Never import server-only modules from client components.**

---

## 3. Booking System (the core flow)

End-to-end flow lives in 3 files. Read these first:

1. **`src/lib/booking-config.ts`** — single source of truth for:
   - `AGENTS` — Ronelle, Rhodanthe, Samiya, Nafeesah (with emails & locations)
   - `SESSION_OPTIONS` — 15min (R100) and 30min (R200), with **Shopify variant GIDs**
   - `getAvailableTimes(date, slotMinutes)` — Mon–Fri 9am–6pm, Sat 9am–12pm, closed Sunday
   - `isDateBookable(date)`

2. **`src/routes/book.tsx`** — `/book` page. Customer picks consultant, session length (15/30), date, time, fills in details. Supports `?session=15min|30min` and `?agent=<id>` query params for pre-selection.

3. **`src/routes/api.public.bookings.create.ts`** — `POST /api/public/bookings/create`
   - Validates with Zod, inserts into `consultation_bookings` table with status `pending_agent_approval`
   - Sends `agent-booking-notification` email to the chosen consultant with **Confirm / Decline** buttons (signed with `approval_token`)

4. **`src/routes/api.public.bookings.respond.ts`** — `POST /api/public/bookings/respond`
   - Agent clicks Confirm → builds **real Shopify checkout URL** for the matching variant (so Payflex etc. work) → emails `customer-payment-link` to customer
   - Agent clicks Decline → updates status, emails `customer-declined`
   - `GET` returns booking summary by token (used by `/agent/respond` page)

### Database table (`consultation_bookings`)
Key columns: `id`, `customer_name`, `customer_email`, `customer_phone`, `session_length`, `preferred_consultant`, `agent_email`, `booking_date`, `booking_time`, `price_cents`, `notes`, `status` (`pending_agent_approval | confirmed | declined`), `approval_token`, `confirmed_at`, `declined_at`, `payment_link`.

---

## 4. Email System

Templates: `src/lib/email-templates/` (React Email) — registered in `registry.ts`.

Active templates:
- `agent-booking-notification` → sent to consultant when a booking is requested
- `customer-payment-link` → sent to customer after consultant confirms
- `customer-declined` → sent to customer if consultant declines

Sending is done via the built-in route:
`POST /lovable/email/transactional/send` with `{ templateName, recipientEmail, idempotencyKey, templateData }` and `Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}`.

Suppressions/unsubscribes: `/email/unsubscribe` and `/unsubscribe` route.

---

## 5. Commerce (Shopify)

- Storefront client: `src/lib/shopify.ts`
- Server checkout creation: `src/lib/shopify-checkout.server.ts` → `createConsultationCheckout({ variantId, quantity, buyerEmail, bookingId })` returns `{ checkoutUrl }`.
- Cart state (client): `src/stores/cartStore.ts` + `CartDrawer.tsx`.
- Consultation product variants are referenced **by GID** in `booking-config.ts`. If product IDs change in Shopify, update them there.

---

## 6. Environment Variables / Secrets

Auto-provided by Lovable Cloud at runtime (do **not** check into source):

| Var | Where used |
|---|---|
| `VITE_SUPABASE_URL` | client + server |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | client (safe to expose) |
| `VITE_SUPABASE_PROJECT_ID` | client |
| `SUPABASE_SERVICE_ROLE_KEY` | server only — booking + email routes |
| `LOVABLE_API_KEY` | server only — Lovable AI Gateway (if used) |

Shopify Storefront token + shop domain — currently configured in the Shopify integration. If migrating off Lovable, you'll need to provide them as env vars and update `src/lib/shopify.ts`.

> Read env in **server function handlers**, not at module top-level (`process.env.X` is injected at call time).

---

## 7. Design System

- **All colors are semantic tokens** defined in `src/styles.css` using `oklch(...)`.
- **Never** hardcode `text-white`, `bg-black`, hex values, etc. in components — use tokens like `bg-background`, `text-foreground`, `bg-primary`, `text-muted-foreground`.
- Light + dark mode both supported via the token system.
- shadcn variants live in each `src/components/ui/*.tsx` file (use `cva`).

---

## 8. Local Development

```bash
bun install
bun run dev          # starts Vite dev server
```

Build:
```bash
bun run build
```

> The Lovable platform runs build/typecheck automatically — don't run `tsc --noEmit` or `npm run build` manually inside Lovable.

---

## 9. Deployment

- Hosted on Cloudflare Workers via TanStack Start's edge adapter (`wrangler.jsonc`).
- Lovable handles deployment automatically on Publish.
- Edge functions deploy automatically — no manual step.
- Stable URLs:
  - Preview: `https://id-preview--fe4df858-3966-4731-9baa-c8939f047f34.lovable.app`
  - Production (after publish): `https://project--fe4df858-3966-4731-9baa-c8939f047f34.lovable.app`

---

## 10. Things NOT to do

- ❌ Don't edit `src/integrations/supabase/client.ts` or `types.ts` (auto-generated).
- ❌ Don't edit `src/routeTree.gen.ts` (auto-generated by TanStack Router).
- ❌ Don't modify project-level keys in `supabase/config.toml` (function-specific blocks are fine).
- ❌ Don't use Node-only packages on the server (Worker runtime).
- ❌ Don't hardcode colors in components — use design tokens.
- ❌ Don't use `react-router-dom` — this project uses `@tanstack/react-router`.
- ❌ Don't store user roles on the `profiles` or `users` table — use a separate `user_roles` table with a `has_role()` security-definer function.

---

## 11. Quick Reference: Business Rules

| Item | Value |
|---|---|
| Session lengths | 15 min (R100), 30 min (R200) |
| Hours | Mon–Fri 9am–6pm, Sat 9am–12pm, Sun closed |
| Consultants | Ronelle (KZN), Rhodanthe (CPT), Samiya (CPT), Nafeesah (CPT) |
| Booking flow | Customer requests → consultant emailed → confirms/declines → customer gets Shopify checkout link (if confirmed) |
| Currency | ZAR |

---

## 12. Handing Off to Another Developer / AI

If giving Claude (or any dev) access:
1. Connect this Lovable project to GitHub: **Connectors → GitHub → Connect project**.
2. Share repo URL or invite as a collaborator.
3. Point them at this README.
4. They'll need their own Supabase project + Shopify Storefront token if running outside Lovable. Inside Lovable, everything is auto-wired.
