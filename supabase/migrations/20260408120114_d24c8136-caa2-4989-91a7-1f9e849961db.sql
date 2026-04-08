
-- Artists table
CREATE TABLE public.fc_artists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  visual_style_prompt text,
  personality text,
  image_url text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  spotify_link text,
  apple_music_link text,
  youtube_link text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Songs table
CREATE TABLE public.fc_songs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id uuid REFERENCES public.fc_artists(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  lyrics text,
  mood text DEFAULT 'energetic',
  audio_url text,
  description text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'ready', 'published')),
  spotify_link text,
  apple_music_link text,
  youtube_link text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Videos table
CREATE TABLE public.fc_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  song_id uuid REFERENCES public.fc_songs(id) ON DELETE CASCADE NOT NULL,
  video_prompt text,
  style text DEFAULT 'cinematic',
  video_url text,
  embed_url text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'rendering', 'complete', 'published')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.fc_artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fc_songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fc_videos ENABLE ROW LEVEL SECURITY;

-- Public read for published content
CREATE POLICY "Public can view active artists" ON public.fc_artists FOR SELECT TO anon USING (status = 'active');
CREATE POLICY "Public can view published songs" ON public.fc_songs FOR SELECT TO anon USING (status = 'published');
CREATE POLICY "Public can view published videos" ON public.fc_videos FOR SELECT TO anon USING (status = 'published');

-- Authenticated full access
CREATE POLICY "Auth can view all artists" ON public.fc_artists FOR SELECT TO authenticated USING (true);
CREATE POLICY "Auth can insert artists" ON public.fc_artists FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth can update artists" ON public.fc_artists FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth can delete artists" ON public.fc_artists FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth can view all songs" ON public.fc_songs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Auth can insert songs" ON public.fc_songs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth can update songs" ON public.fc_songs FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth can delete songs" ON public.fc_songs FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth can view all videos" ON public.fc_videos FOR SELECT TO authenticated USING (true);
CREATE POLICY "Auth can insert videos" ON public.fc_videos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth can update videos" ON public.fc_videos FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth can delete videos" ON public.fc_videos FOR DELETE TO authenticated USING (true);

-- Storage bucket for media
INSERT INTO storage.buckets (id, name, public) VALUES ('fc-media', 'fc-media', true);

-- Storage policies
CREATE POLICY "Public read fc-media" ON storage.objects FOR SELECT TO anon USING (bucket_id = 'fc-media');
CREATE POLICY "Auth upload fc-media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'fc-media');
CREATE POLICY "Auth update fc-media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'fc-media');
CREATE POLICY "Auth delete fc-media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'fc-media');
