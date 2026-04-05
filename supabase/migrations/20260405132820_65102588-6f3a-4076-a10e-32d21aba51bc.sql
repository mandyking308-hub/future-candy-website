
-- Create enquiries table
CREATE TABLE public.futurecandy_enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  subject TEXT NOT NULL DEFAULT 'general',
  message TEXT NOT NULL,
  source_page TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.futurecandy_enquiries ENABLE ROW LEVEL SECURITY;

-- Allow service role (edge functions) to insert
CREATE POLICY "Service role can manage enquiries"
ON public.futurecandy_enquiries
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Allow anon to insert (for contact form submissions)
CREATE POLICY "Anyone can submit enquiries"
ON public.futurecandy_enquiries
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow authenticated admins to read/update (we'll use authenticated role for admin)
CREATE POLICY "Authenticated users can view enquiries"
ON public.futurecandy_enquiries
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can update enquiries"
ON public.futurecandy_enquiries
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);
