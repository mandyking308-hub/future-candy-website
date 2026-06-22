import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { User } from "lucide-react";

interface Artist {
  id: string; name: string; description: string | null; image_url: string | null; personality: string | null;
}

const ArtistsPage = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("fc_artists").select("id, name, description, image_url, personality").eq("status", "active").order("name")
      .then(({ data }) => { setArtists((data as Artist[]) || []); setLoading(false); });
  }, []);

  return (
    <>
      <Helmet>
        <title>Artists | NeonCandy</title>
        <meta name="description" content="Meet the artists of NeonCandy — AI-powered pop creators shaping the future of music." />
        <link rel="canonical" href="https://neoncandy.net/artists" />
        <meta property="og:title" content="Artists | NeonCandy" />
        <meta property="og:description" content="Meet the artists of NeonCandy — AI-powered pop creators shaping the future of music." />
        <meta property="og:url" content="https://neoncandy.net/artists" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "NeonCandy Artists",
          "url": "https://neoncandy.net/artists",
          "description": "Directory of NeonCandy artists.",
          "hasPart": artists.map(a => ({
            "@type": "MusicGroup",
            "name": a.name,
            "url": `https://neoncandy.net/artists/${a.id}`,
            ...(a.image_url ? { "image": a.image_url } : {}),
            ...(a.description ? { "description": a.description } : {}),
          })),
        })}</script>
      </Helmet>
      <Navigation />
      <main className="min-h-screen bg-background pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4"><span className="text-gradient">Our Artists</span></h1>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">Digital-first creators. AI-powered voices. The next evolution of pop.</p>

          {loading ? (
            <div className="text-center text-muted-foreground py-20">Loading artists...</div>
          ) : artists.length === 0 ? (
            <div className="text-center text-muted-foreground py-20">Artists coming soon.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {artists.map(artist => (
                <Link key={artist.id} to={`/artists/${artist.id}`}>
                  <Card className="glass border-border overflow-hidden group hover:border-candy-pink/40 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--candy-pink)/0.15)]">
                    <div className="aspect-square bg-muted/30 flex items-center justify-center overflow-hidden">
                      {artist.image_url ? (
                        <img src={artist.image_url} alt={artist.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      ) : (
                        <User className="w-16 h-16 text-muted-foreground/30" />
                      )}
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-foreground mb-1">{artist.name}</h2>
                      {artist.personality && <p className="text-sm text-candy-pink capitalize mb-2">{artist.personality}</p>}
                      {artist.description && <p className="text-sm text-muted-foreground line-clamp-2">{artist.description}</p>}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ArtistsPage;
