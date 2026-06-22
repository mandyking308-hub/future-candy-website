import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

type Song = { id: string; title: string; audio_url: string | null; cover_image_url: string | null; description: string | null; fc_artists: { name: string } | null };

const NeonCandyMusicPublic = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from("fc_songs").select("id,title,audio_url,cover_image_url,description,fc_artists(name)").eq("status", "published").order("display_order", { ascending: true }).then(({ data }) => { setSongs((data as unknown as Song[]) || []); setLoading(false); });
  }, []);
  return <>
    <Helmet><title>Music & Releases | NeonCandy</title><meta name="description" content="Published songs and releases from NeonCandy." /><link rel="canonical" href="https://neoncandy.net/music" /></Helmet>
    <Navigation />
    <main className="min-h-screen bg-background pt-32 pb-20 px-4"><div className="max-w-6xl mx-auto"><h1 className="text-4xl md:text-5xl font-bold text-center mb-4"><span className="text-gradient">Music & Releases</span></h1><p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">Published sounds from the NeonCandy studio.</p>{loading ? <div className="text-center text-muted-foreground py-20">Loading releases...</div> : songs.length === 0 ? <div className="text-center text-muted-foreground py-20">Releases are being added to the catalogue.</div> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{songs.map(song => <Card key={song.id} className="glass border-border overflow-hidden"><div className="aspect-square bg-muted/30">{song.cover_image_url && <img src={song.cover_image_url} alt={`${song.title} cover artwork`} loading="lazy" className="w-full h-full object-cover" />}</div><div className="p-4"><h2 className="text-base font-bold text-foreground">{song.title}</h2>{song.fc_artists?.name && <p className="text-sm text-candy-pink">{song.fc_artists.name}</p>}{song.description && <p className="text-xs text-muted-foreground mt-2">{song.description}</p>}{song.audio_url ? <audio controls preload="none" className="w-full mt-4"><source src={song.audio_url} /></audio> : <p className="text-xs text-muted-foreground italic mt-4">Audio link coming soon</p>}</div></Card>)}</div>}</div></main>
    <Footer />
  </>;
};

export default NeonCandyMusicPublic;