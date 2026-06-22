
-- 1) Switch has_role from SECURITY DEFINER to SECURITY INVOKER.
-- Authenticated users can already read their own role row, so RLS checks of the
-- form has_role(auth.uid(), 'admin') continue to work. The service role bypasses RLS.
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 2) Remove the always-true anon INSERT policies. Both forms will go through
-- edge functions that use the service role and perform full server-side validation.
DROP POLICY IF EXISTS "Anyone can submit enquiries" ON public.futurecandy_enquiries;
DROP POLICY IF EXISTS "Anyone can submit partner enquiries" ON public.neoncandy_partner_enquiries;

-- 3) Defence-in-depth: constrain enquiry_type at the DB level.
ALTER TABLE public.neoncandy_partner_enquiries
  DROP CONSTRAINT IF EXISTS chk_partner_enquiry_type;
ALTER TABLE public.neoncandy_partner_enquiries
  ADD CONSTRAINT chk_partner_enquiry_type
  CHECK (enquiry_type IN ('partnership','collaboration','dj','creator','media','brand','other','general'));

ALTER TABLE public.neoncandy_partner_enquiries
  DROP CONSTRAINT IF EXISTS chk_partner_lengths;
ALTER TABLE public.neoncandy_partner_enquiries
  ADD CONSTRAINT chk_partner_lengths CHECK (
    char_length(full_name) BETWEEN 1 AND 120
    AND char_length(email) BETWEEN 3 AND 255
    AND char_length(message) BETWEEN 10 AND 2000
    AND (company IS NULL OR char_length(company) <= 150)
    AND (phone IS NULL OR char_length(phone) <= 60)
    AND (website IS NULL OR char_length(website) <= 255)
  );
