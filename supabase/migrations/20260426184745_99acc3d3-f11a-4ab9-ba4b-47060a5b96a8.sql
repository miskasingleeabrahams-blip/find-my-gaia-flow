-- Add columns to consultation_bookings for the new flow
ALTER TABLE public.consultation_bookings
  ADD COLUMN IF NOT EXISTS agent_email text,
  ADD COLUMN IF NOT EXISTS booking_date date,
  ADD COLUMN IF NOT EXISTS booking_time time,
  ADD COLUMN IF NOT EXISTS price_cents integer,
  ADD COLUMN IF NOT EXISTS approval_token text UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  ADD COLUMN IF NOT EXISTS confirmed_at timestamptz,
  ADD COLUMN IF NOT EXISTS declined_at timestamptz,
  ADD COLUMN IF NOT EXISTS payment_link text,
  ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'unpaid';

-- Index for fast token lookup
CREATE INDEX IF NOT EXISTS idx_bookings_approval_token ON public.consultation_bookings(approval_token);

-- Allow public read by approval_token only (so agents can view via secure email link)
DROP POLICY IF EXISTS "Public read by approval token" ON public.consultation_bookings;
CREATE POLICY "Anyone can view by token via service" ON public.consultation_bookings
  FOR SELECT TO anon, authenticated USING (false);
-- (Service role bypasses RLS so the agent route uses service key.)