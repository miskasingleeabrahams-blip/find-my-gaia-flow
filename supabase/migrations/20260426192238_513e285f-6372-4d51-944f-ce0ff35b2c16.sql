
ALTER TABLE public.consultation_bookings
  ADD COLUMN IF NOT EXISTS yoco_checkout_id text,
  ADD COLUMN IF NOT EXISTS yoco_payment_id text;

CREATE TABLE IF NOT EXISTS public.yoco_shopify_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  yoco_checkout_id text NOT NULL UNIQUE,
  yoco_payment_id text,
  shopify_order_id text,
  shopify_draft_order_id text,
  shopify_cart_token text,
  amount_cents integer NOT NULL,
  currency text NOT NULL DEFAULT 'ZAR',
  customer_email text,
  status text NOT NULL DEFAULT 'pending',
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  paid_at timestamptz
);

CREATE INDEX IF NOT EXISTS yoco_shopify_orders_checkout_idx
  ON public.yoco_shopify_orders (yoco_checkout_id);

CREATE INDEX IF NOT EXISTS yoco_shopify_orders_shopify_order_idx
  ON public.yoco_shopify_orders (shopify_order_id);

ALTER TABLE public.yoco_shopify_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages yoco_shopify_orders"
  ON public.yoco_shopify_orders
  FOR ALL
  TO public
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
