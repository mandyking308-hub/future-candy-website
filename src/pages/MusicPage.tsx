import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music as MusicIcon } from "lucide-react";

interface Song {
  id: string;
  title: string;
  mood: string | null;
  audio_url: string | null;
  description: string | null;
  cover_image_url: string | null;
  youtube_link: string | null;
  release_date: string | null;
  fc_artists: { id: string; name: string; image_url: string | null } | null;
}

const MusicPage = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("fc_songs")
      .select("*, fc_artists(id, name, image_url)")
      .eq("status", "published")
      .order("display_order", { ascending: true })
      .then(({ data }) => {
        setSongs((data as unknown as Song[]) || []);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Music & Releases | FutureCandy</title>
        <meta name="description" content="Published songs and releases from FutureCandy." />
        <link rel="canonical" href="https://futurecandy.online/music" />
      </Helmet>
      <Navigation />
      <main className="min-h-screen bg-background pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4"><span className="text-gradient">Music & Releases</span></h1>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">Published sounds from the FutureCandy studio.</p>
          {loading ? (
            <div className="text-center text-muted-foreground py-20">Loading releases...</div>
          ) : songs.length === 0 ? (
            <div className="text-center text-muted-foreground py-20">Releases coming soon.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {songs.map((song) => (
                <Card key={song.id} className="glass border-border overflow-hidden group flex flex-col">
                  <div className="relative aspect-square overflow-hidden bg-muted/30 block w-full">
                    {song.cover_image_url ? <img src={song.cover_image_url} alt={`${song.title} cover artwork`} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" /> : <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-candy-pink/20 via-candy-violet/20 to-candy-cyan/20"><MusicIcon className="w-16 h-16 text-muted-foreground/40" /></div>}
                    {song.mood && <Badge className="absolute top-3 right-3 bg-background/80 backdrop-blur text-foreground border-border capitalize">{song.mood}</Badge>}
                  </div>
                  <div className="p-4 flex-1 flex flex-col gap-2">
                    <h2 className="text-base font-bold text-foreground line-clamp-1">{song.title}</h2>
                    {song.fc_artists && <Link to={`/artists/${song.fc_artists.id}`} className="text-sm text-candy-pink hover:underline w-fit">{song.fc_artists.name}</Link>}
                    {song.description && <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{song.description}</p>}
                    <div className="mt-auto pt-3">
                      {song.audio_url ? <audio controls preload="none" className="w-full h-9" aria-label={`${song.title} audio player`}><source src={song.audio_url} /></audio> : song.youtube_link ? <a href={song.youtube_link} target="_blank" rel="noopener noreferrer" className="text-sm text-candy-cyan hover:underline">Watch / Listen</a> : <p className="text-xs text-muted-foreground italic">Coming soon</p>}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MusicPage;