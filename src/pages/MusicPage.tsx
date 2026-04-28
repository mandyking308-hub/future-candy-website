import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Play, Music as MusicIcon } from "lucide-react";

interface Song {
  id: string;
  title: string;
  mood: string | null;
  audio_url: string | null;
  description: string | null;
  cover_image_url: string | null;
  youtube_link: string | null;
  hyperfollow_url: string | null;
  fc_artists: { id: string; name: string; image_url: string | null } | null;
  fc_videos: { id: string; embed_url: string | null; video_url: string | null; status: string }[] | null;
}

const MusicPage = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSong, setActiveSong] = useState<Song | null>(null);

  useEffect(() => {
    supabase
      .from("fc_songs")
      .select("*, fc_artists(id, name, image_url), fc_videos(id, embed_url, video_url, status)")
      .eq("status", "published")
      .order("display_order", { ascending: true })
      .then(({ data }) => {
        setSongs((data as unknown as Song[]) || []);
        setLoading(false);
      });
  }, []);

  const getEmbed = (song: Song): string | null => {
    const v = song.fc_videos?.find((x) => x.status === "published" && x.embed_url);
    if (v?.embed_url) return v.embed_url;
    if (song.youtube_link) return song.youtube_link;
    return null;
  };

  return (
    <>
      <Helmet>
        <title>Music & Releases | NeonCandy</title>
        <meta
          name="description"
          content="Listen to the latest AI-powered releases from NeonCandy artists."
        />
      </Helmet>
      <Navigation />
      <main className="min-h-screen bg-background pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="text-gradient">Music & Releases</span>
          </h1>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            The latest sounds from the NeonCandy universe.
          </p>

          {loading ? (
            <div className="text-center text-muted-foreground py-20">Loading releases...</div>
          ) : songs.length === 0 ? (
            <div className="text-center text-muted-foreground py-20">Releases coming soon.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {songs.map((song) => {
                const embed = getEmbed(song);
                return (
                  <Card
                    key={song.id}
                    className="glass border-border overflow-hidden group flex flex-col"
                  >
                    {/* Cover */}
                    <button
                      onClick={() => embed && setActiveSong(song)}
                      className="relative aspect-square overflow-hidden bg-muted/30 block w-full"
                      aria-label={`Play ${song.title}`}
                    >
                      {song.cover_image_url ? (
                        <img
                          src={song.cover_image_url}
                          alt={`${song.title} cover artwork`}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-candy-pink/20 via-candy-violet/20 to-candy-cyan/20">
                          <MusicIcon className="w-16 h-16 text-muted-foreground/40" />
                        </div>
                      )}
                      {embed && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-candy-pink to-candy-violet flex items-center justify-center shadow-lg">
                            <Play className="w-6 h-6 text-white ml-0.5" fill="currentColor" />
                          </div>
                        </div>
                      )}
                      {song.mood && (
                        <Badge className="absolute top-3 right-3 bg-background/80 backdrop-blur text-foreground border-border capitalize">
                          {song.mood}
                        </Badge>
                      )}
                    </button>

                    {/* Meta */}
                    <div className="p-4 flex-1 flex flex-col gap-2">
                      <h2 className="text-base font-bold text-foreground line-clamp-1">
                        {song.title}
                      </h2>
                      {song.fc_artists && (
                        <Link
                          to={`/artists/${song.fc_artists.id}`}
                          className="text-sm text-candy-pink hover:underline w-fit"
                        >
                          {song.fc_artists.name}
                        </Link>
                      )}
                      {song.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                          {song.description}
                        </p>
                      )}
                      <div className="mt-auto pt-3">
                        {embed ? (
                          <Button
                            size="sm"
                            onClick={() => setActiveSong(song)}
                            className="w-full bg-gradient-to-r from-candy-pink to-candy-violet hover:opacity-90"
                          >
                            <Play className="w-4 h-4 mr-2" fill="currentColor" />
                            Play
                          </Button>
                        ) : song.audio_url ? (
                          <audio
                            controls
                            preload="none"
                            className="w-full h-9"
                            aria-label={`${song.title} audio player`}
                          >
                            <source src={song.audio_url} />
                          </audio>
                        ) : (
                          <p className="text-xs text-muted-foreground italic">
                            Coming soon
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Player dialog */}
      <Dialog open={!!activeSong} onOpenChange={(o) => !o && setActiveSong(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {activeSong?.title}
              {activeSong?.fc_artists && (
                <span className="text-muted-foreground font-normal text-sm ml-2">
                  by {activeSong.fc_artists.name}
                </span>
              )}
            </DialogTitle>
          </DialogHeader>
          {activeSong &&
            (() => {
              const embed = getEmbed(activeSong);
              if (embed) {
                return (
                  <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                    <iframe
                      src={embed}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={activeSong.title}
                    />
                  </div>
                );
              }
              if (activeSong.audio_url) {
                return (
                  <audio controls autoPlay className="w-full">
                    <source src={activeSong.audio_url} />
                  </audio>
                );
              }
              return (
                <p className="text-muted-foreground text-sm">No player available.</p>
              );
            })()}
          {activeSong?.description && (
            <p className="text-sm text-muted-foreground mt-2">{activeSong.description}</p>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
};

export default MusicPage;
