-- Partner / collaboration enquiries
CREATE TABLE public.neoncandy_partner_enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  website TEXT,
  enquiry_type TEXT NOT NULL DEFAULT 'general',
  message TEXT NOT NULL,
  source_page TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT neoncandy_partner_enquiries_status_check
    CHECK (status IN ('new','read','replied','archived'))
);

CREATE INDEX idx_neoncandy_partner_enquiries_status
  ON public.neoncandy_partner_enquiries(status);
CREATE INDEX idx_neoncandy_partner_enquiries_created_at
  ON public.neoncandy_partner_enquiries(created_at DESC);

ALTER TABLE public.neoncandy_partner_enquiries ENABLE ROW LEVEL SECURITY;

-- Anyone (including anon) can submit an enquiry
CREATE POLICY "Anyone can submit partner enquiries"
ON public.neoncandy_partner_enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Authenticated admin users can view all
CREATE POLICY "Authenticated users can view partner enquiries"
ON public.neoncandy_partner_enquiries
FOR SELECT
TO authenticated
USING (true);

-- Authenticated admin users can update status
CREATE POLICY "Authenticated users can update partner enquiries"
ON public.neoncandy_partner_enquiries
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Authenticated admin users can delete
CREATE POLICY "Authenticated users can delete partner enquiries"
ON public.neoncandy_partner_enquiries
FOR DELETE
TO authenticated
USING (true);

-- Service role full access
CREATE POLICY "Service role can manage partner enquiries"
ON public.neoncandy_partner_enquiries
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Reusable updated_at trigger function (idempotent)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_neoncandy_partner_enquiries_updated_at
BEFORE UPDATE ON public.neoncandy_partner_enquiries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();