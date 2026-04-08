import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Song {
  id: string; title: string; mood: string | null; audio_url: string | null; description: string | null;
  fc_artists: { id: string; name: string; image_url: string | null } | null;
  fc_videos: { id: string; embed_url: string | null; video_url: string | null; status: string }[] | null;
}

const MusicPage = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("fc_songs")
      .select("*, fc_artists(id, name, image_url), fc_videos(id, embed_url, video_url, status)")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .then(({ data }) => { setSongs((data as Song[]) || []); setLoading(false); });
  }, []);

  return (
    <>
      <Helmet>
        <title>Music & Releases | FutureCandy</title>
        <meta name="description" content="Listen to the latest AI-powered releases from FutureCandy artists." />
      </Helmet>
      <Navigation />
      <main className="min-h-screen bg-background pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4"><span className="text-gradient">Music & Releases</span></h1>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">The latest sounds from the FutureCandy universe.</p>

          {loading ? (
            <div className="text-center text-muted-foreground py-20">Loading releases...</div>
          ) : songs.length === 0 ? (
            <div className="text-center text-muted-foreground py-20">Releases coming soon.</div>
          ) : (
            <div className="space-y-8">
              {songs.map(song => {
                const publishedVideos = song.fc_videos?.filter(v => v.status === "published") || [];
                return (
                  <Card key={song.id} className="glass border-border p-6 md:p-8">
                    <div className="flex items-start gap-4 mb-4">
                      {song.fc_artists?.image_url && (
                        <Link to={`/artists/${song.fc_artists.id}`}>
                          <img src={song.fc_artists.image_url} alt={song.fc_artists.name} className="w-14 h-14 rounded-full object-cover border-2 border-candy-pink/30" loading="lazy" />
                        </Link>
                      )}
                      <div>
                        <h2 className="text-xl font-bold text-foreground">{song.title}</h2>
                        {song.fc_artists && <Link to={`/artists/${song.fc_artists.id}`} className="text-sm text-candy-pink hover:underline">{song.fc_artists.name}</Link>}
                      </div>
                      {song.mood && <Badge className="bg-candy-cyan/20 text-candy-cyan border-candy-cyan/30 border ml-auto capitalize hidden sm:inline-flex">{song.mood}</Badge>}
                    </div>
                    {song.description && <p className="text-sm text-muted-foreground mb-4">{song.description}</p>}
                    {song.audio_url && <audio controls className="w-full mb-4" preload="none"><source src={song.audio_url} /></audio>}
                    {publishedVideos.map(v => v.embed_url ? (
                      <div key={v.id} className="aspect-video rounded-lg overflow-hidden mb-4">
                        <iframe src={v.embed_url} className="w-full h-full" allowFullScreen title={song.title} loading="lazy" />
                      </div>
                    ) : v.video_url ? (
                      <video key={v.id} controls className="w-full rounded-lg mb-4" preload="none"><source src={v.video_url} /></video>
                    ) : null)}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MusicPage;
