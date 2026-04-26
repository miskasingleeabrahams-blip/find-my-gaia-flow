ALTER TABLE public.consultation_bookings
  ADD CONSTRAINT customer_name_length CHECK (char_length(customer_name) BETWEEN 1 AND 200),
  ADD CONSTRAINT customer_email_length CHECK (char_length(customer_email) BETWEEN 3 AND 320),
  ADD CONSTRAINT customer_phone_length CHECK (char_length(customer_phone) BETWEEN 5 AND 50),
  ADD CONSTRAINT session_length_valid CHECK (session_length IN ('15', '30')),
  ADD CONSTRAINT notes_length CHECK (notes IS NULL OR char_length(notes) <= 2000),
  ADD CONSTRAINT preferred_consultant_length CHECK (preferred_consultant IS NULL OR char_length(preferred_consultant) <= 100);