ALTER TABLE public.fc_songs ADD COLUMN IF NOT EXISTS display_order INTEGER NOT NULL DEFAULT 999;
CREATE INDEX IF NOT EXISTS idx_fc_songs_display_order ON public.fc_songs(display_order);