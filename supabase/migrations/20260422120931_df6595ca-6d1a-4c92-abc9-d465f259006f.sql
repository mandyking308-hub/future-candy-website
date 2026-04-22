-- Add required cover_image_url field to songs for catalogue display
ALTER TABLE public.fc_songs ADD COLUMN IF NOT EXISTS cover_image_url TEXT;