import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Music, Play } from "lucide-react";

interface Artist {
  id: string; name: string; description: string | null; image_url: string | null; personality: string | null;
}
interface Song {
  id: string; title: string; mood: string | null; audio_url: string | null; description: string | null;
  cover_image_url: string | null; youtube_link: string | null;
  fc_videos?: { id: string; embed_url: string | null; video_url: string | null; status: string }[];
}

const ArtistProfile = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      supabase.from("fc_artists").select("*").eq("id", id).eq("status", "active").single(),
      supabase.from("fc_songs").select("*, fc_videos(id, embed_url, video_url, status)").eq("artist_id", id).eq("status", "published").order("display_order", { ascending: true }),
    ]).then(([artistRes, songsRes]) => {
      setArtist(artistRes.data as Artist | null);
      setSongs((songsRes.data as Song[]) || []);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <><Navigation /><div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div></>;
  if (!artist) return <><Navigation /><div className="min-h-screen bg-background flex items-center justify-center pt-32"><p className="text-muted-foreground">Artist not found.</p></div><Footer /></>;

  return (
    <>
      <Helmet>
        <title>{artist.name} | NeonCandy</title>
        <meta name="description" content={artist.description || `${artist.name} — a NeonCandy artist.`} />
        <link rel="canonical" href={`https://neoncandy.net/artists/${artist.id}`} />
        <meta property="og:title" content={`${artist.name} | NeonCandy`} />
        <meta property="og:description" content={artist.description || `${artist.name} — a NeonCandy artist.`} />
        <meta property="og:url" content={`https://neoncandy.net/artists/${artist.id}`} />
        <meta property="og:type" content="profile" />
        {artist.image_url && <meta property="og:image" content={artist.image_url} />}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MusicGroup",
          "name": artist.name,
          "url": `https://neoncandy.net/artists/${artist.id}`,
          ...(artist.image_url ? { "image": artist.image_url } : {}),
          ...(artist.description ? { "description": artist.description } : {}),
          "track": songs.map(s => ({
            "@type": "MusicRecording",
            "name": s.title,
            "byArtist": { "@type": "MusicGroup", "name": artist.name },
            ...(s.audio_url ? { "audio": s.audio_url } : {}),
            ...(s.cover_image_url ? { "image": s.cover_image_url } : {}),
            ...(s.description ? { "description": s.description } : {}),
          })),
        })}</script>
      </Helmet>
      <Navigation />
      <main className="min-h-screen bg-background pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="w-full md:w-64 aspect-square rounded-2xl overflow-hidden bg-muted/30 flex-shrink-0">
              {artist.image_url ? (
                <img src={artist.image_url} alt={artist.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center"><User className="w-16 h-16 text-muted-foreground/30" /></div>
              )}
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-2"><span className="text-gradient">{artist.name}</span></h1>
              {artist.personality && <Badge className="bg-candy-pink/20 text-candy-pink border-candy-pink/30 border w-fit mb-4 capitalize">{artist.personality}</Badge>}
              {artist.description && <p className="text-muted-foreground leading-relaxed">{artist.description}</p>}
            </div>
          </div>

          {/* Songs */}
          {songs.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2"><Music className="w-5 h-5 text-candy-cyan" />Releases</h2>
              <div className="space-y-6">
                {songs.map(song => {
                  const publishedVideos = song.fc_videos?.filter(v => v.status === "published") || [];
                  const fallbackEmbed = !publishedVideos.length && song.youtube_link ? song.youtube_link : null;
                  return (
                    <Card key={song.id} className="glass border-border overflow-hidden">
                      <div className="flex flex-col sm:flex-row gap-0">
                        {/* Cover */}
                        <div className="w-full sm:w-48 aspect-square sm:aspect-square flex-shrink-0 bg-muted/30 overflow-hidden">
                          {song.cover_image_url ? (
                            <img
                              src={song.cover_image_url}
                              alt={`${song.title} cover artwork`}
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-candy-pink/20 via-candy-violet/20 to-candy-cyan/20">
                              <Music className="w-12 h-12 text-muted-foreground/40" />
                            </div>
                          )}
                        </div>
                        {/* Body */}
                        <div className="p-6 flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-bold text-foreground">{song.title}</h3>
                              {song.mood && <p className="text-sm text-candy-cyan capitalize">{song.mood}</p>}
                            </div>
                          </div>
                          {song.description && <p className="text-sm text-muted-foreground mb-4">{song.description}</p>}
                          {song.audio_url && (
                            <audio controls className="w-full mb-4" preload="none">
                              <source src={song.audio_url} />
                            </audio>
                          )}
                          {publishedVideos.map(v => v.embed_url ? (
                            <div key={v.id} className="aspect-video rounded-lg overflow-hidden mb-4">
                              <iframe src={v.embed_url} className="w-full h-full" allowFullScreen title={song.title} loading="lazy" />
                            </div>
                          ) : v.video_url ? (
                            <video key={v.id} controls className="w-full rounded-lg mb-4" preload="none"><source src={v.video_url} /></video>
                          ) : null)}
                          {fallbackEmbed && (
                            <div className="aspect-video rounded-lg overflow-hidden">
                              <iframe src={fallbackEmbed} className="w-full h-full" allowFullScreen title={song.title} loading="lazy" />
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ArtistProfile;
