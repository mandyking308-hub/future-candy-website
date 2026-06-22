
-- 1. Roles infrastructure
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 2. fc_artists — admin-only writes
DROP POLICY IF EXISTS "Auth can delete artists" ON public.fc_artists;
DROP POLICY IF EXISTS "Auth can insert artists" ON public.fc_artists;
DROP POLICY IF EXISTS "Auth can update artists" ON public.fc_artists;
DROP POLICY IF EXISTS "Auth can view all artists" ON public.fc_artists;

CREATE POLICY "Admins can insert artists" ON public.fc_artists
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update artists" ON public.fc_artists
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete artists" ON public.fc_artists
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can view all artists" ON public.fc_artists
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 3. fc_songs
DROP POLICY IF EXISTS "Auth can delete songs" ON public.fc_songs;
DROP POLICY IF EXISTS "Auth can insert songs" ON public.fc_songs;
DROP POLICY IF EXISTS "Auth can update songs" ON public.fc_songs;
DROP POLICY IF EXISTS "Auth can view all songs" ON public.fc_songs;

CREATE POLICY "Admins can insert songs" ON public.fc_songs
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update songs" ON public.fc_songs
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete songs" ON public.fc_songs
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can view all songs" ON public.fc_songs
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 4. fc_videos
DROP POLICY IF EXISTS "Auth can delete videos" ON public.fc_videos;
DROP POLICY IF EXISTS "Auth can insert videos" ON public.fc_videos;
DROP POLICY IF EXISTS "Auth can update videos" ON public.fc_videos;
DROP POLICY IF EXISTS "Auth can view all videos" ON public.fc_videos;

CREATE POLICY "Admins can insert videos" ON public.fc_videos
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update videos" ON public.fc_videos
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete videos" ON public.fc_videos
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can view all videos" ON public.fc_videos
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 5. futurecandy_enquiries — admin-only reads/updates
DROP POLICY IF EXISTS "Authenticated users can update enquiries" ON public.futurecandy_enquiries;
DROP POLICY IF EXISTS "Authenticated users can view enquiries" ON public.futurecandy_enquiries;

CREATE POLICY "Admins can view enquiries" ON public.futurecandy_enquiries
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update enquiries" ON public.futurecandy_enquiries
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete enquiries" ON public.futurecandy_enquiries
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 6. neoncandy_partner_enquiries — admin-only reads/updates
DROP POLICY IF EXISTS "Authenticated users can delete partner enquiries" ON public.neoncandy_partner_enquiries;
DROP POLICY IF EXISTS "Authenticated users can update partner enquiries" ON public.neoncandy_partner_enquiries;
DROP POLICY IF EXISTS "Authenticated users can view partner enquiries" ON public.neoncandy_partner_enquiries;

CREATE POLICY "Admins can view partner enquiries" ON public.neoncandy_partner_enquiries
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update partner enquiries" ON public.neoncandy_partner_enquiries
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete partner enquiries" ON public.neoncandy_partner_enquiries
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 7. Storage: fc-media — drop broad listing policy and restrict writes to admins.
-- Direct public URL reads still work for public buckets without a SELECT policy.
DROP POLICY IF EXISTS "Public read fc-media" ON storage.objects;
DROP POLICY IF EXISTS "Auth upload fc-media" ON storage.objects;
DROP POLICY IF EXISTS "Auth update fc-media" ON storage.objects;
DROP POLICY IF EXISTS "Auth delete fc-media" ON storage.objects;

CREATE POLICY "Admins upload fc-media" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'fc-media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update fc-media" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'fc-media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete fc-media" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'fc-media' AND public.has_role(auth.uid(), 'admin'));
