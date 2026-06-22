import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, User, Music } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface Artist {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  personality: string | null;
  spotify_link: string | null;
  youtube_link: string | null;
  apple_music_link: string | null;
  song_count: number;
}

const Artists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: artistData } = await supabase
        .from("fc_artists")
        .select("id, name, description, image_url, personality, spotify_link, youtube_link, apple_music_link")
        .eq("status", "active")
        .order("name");

      const { data: songData } = await supabase
        .from("fc_songs")
        .select("artist_id")
        .eq("status", "published");

      const counts = (songData || []).reduce<Record<string, number>>((acc, s: any) => {
        acc[s.artist_id] = (acc[s.artist_id] || 0) + 1;
        return acc;
      }, {});

      setArtists((artistData || []).map((a: any) => ({ ...a, song_count: counts[a.id] || 0 })));
      setLoading(false);
    };
    load();
  }, []);

  const flavors = ["All", ...Array.from(new Set(artists.map(a => a.personality).filter(Boolean) as string[]))];
  const filteredArtists = activeFilter === "All" ? artists : artists.filter(a => a.personality === activeFilter);
  const colorFor = (i: number) => ["candy-pink", "candy-cyan", "candy-violet"][i % 3];

  return (
    <section id="artists" className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-4">
          <span className="text-gradient">Meet the Sounds of FutureCandy</span>
        </h2>
        <p className="text-xl text-center text-muted-foreground mb-16">
          We build artist worlds, not just tracks.
          <br />
          Each project has a look, a voice, a mood, and a visual lane.
        </p>

        {flavors.length > 1 && (
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {flavors.map((flavor) => (
              <Button key={flavor} onClick={() => setActiveFilter(flavor)} variant={activeFilter === flavor ? "default" : "outline"} className={`transition-all capitalize ${activeFilter === flavor ? "bg-gradient-to-r from-candy-pink to-candy-violet shadow-[0_0_20px_rgba(236,72,153,0.5)]" : "border-candy-cyan/50 text-candy-cyan hover:bg-candy-cyan/10"}`}>
                {flavor}
              </Button>
            ))}
          </div>
        )}

        {loading ? (
          <p className="text-center text-muted-foreground">Loading artists…</p>
        ) : filteredArtists.length === 0 ? (
          <p className="text-center text-muted-foreground">No artists yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredArtists.map((artist, index) => {
              const color = colorFor(index);
              return (
                <Card key={artist.id} className="group relative overflow-hidden border-2 hover:scale-105 hover:shadow-[0_0_40px_rgba(236,72,153,0.4)] transition-all duration-300 animate-fade-in glass" style={{ animationDelay: `${index * 0.2}s`, borderColor: `hsl(var(--${color}) / 0.5)` }}>
                  <Link to={`/artists/${artist.id}`} className="block">
                    <div className="aspect-square relative bg-muted/30">
                      {artist.image_url ? (
                        <img src={artist.image_url} alt={`${artist.name} — FutureCandy artist`} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-candy-pink/20 via-candy-violet/20 to-candy-cyan/20">
                          <User className="w-20 h-20 text-muted-foreground/40" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
                    </div>
                  </Link>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Link to={`/artists/${artist.id}`}>
                        <h3 className="text-3xl font-bold hover:underline" style={{ color: `hsl(var(--${color}))` }}>{artist.name}</h3>
                      </Link>
                      {artist.personality && <Badge variant="outline" className="capitalize text-xs">{artist.personality}</Badge>}
                    </div>
                    {artist.description && <p className="text-foreground/80 mb-3 text-sm line-clamp-2">{artist.description}</p>}

                    <div className="flex items-center gap-3 text-sm flex-wrap">
                      <Link to={`/artists/${artist.id}`} className="flex items-center gap-1.5 text-foreground hover:text-candy-pink transition-colors">
                        <Music className="w-4 h-4" />
                        {artist.song_count} {artist.song_count === 1 ? "release" : "releases"}
                      </Link>
                      {artist.spotify_link && <a href={artist.spotify_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">Spotify <ExternalLink className="w-3.5 h-3.5" /></a>}
                      {artist.youtube_link && <a href={artist.youtube_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-secondary transition-colors">YouTube <ExternalLink className="w-3.5 h-3.5" /></a>}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Artists;