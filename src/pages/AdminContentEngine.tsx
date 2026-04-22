import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import {
  ArrowLeft, Plus, Pencil, Trash2, Music, Video, User, Upload,
  Search, BarChart3,
} from "lucide-react";

// Types
interface Artist {
  id: string; name: string; description: string | null; visual_style_prompt: string | null;
  personality: string | null; image_url: string | null; status: string;
  spotify_link: string | null; apple_music_link: string | null; youtube_link: string | null;
  created_at: string; updated_at: string;
}
interface Song {
  id: string; artist_id: string; title: string; lyrics: string | null; mood: string | null;
  audio_url: string | null; description: string | null; status: string;
  spotify_link: string | null; apple_music_link: string | null; youtube_link: string | null;
  created_at: string; updated_at: string;
  fc_artists?: { name: string };
}
interface VideoItem {
  id: string; song_id: string; video_prompt: string | null; style: string | null;
  video_url: string | null; embed_url: string | null; status: string;
  created_at: string; updated_at: string;
  fc_songs?: { title: string; fc_artists?: { name: string } };
}

const statusColors: Record<string, string> = {
  active: "bg-green-500/20 text-green-400 border-green-500/30",
  inactive: "bg-muted text-muted-foreground border-border",
  draft: "bg-muted text-muted-foreground border-border",
  ready: "bg-candy-cyan/20 text-candy-cyan border-candy-cyan/30",
  rendering: "bg-candy-orange/20 text-candy-orange border-candy-orange/30",
  complete: "bg-candy-violet/20 text-candy-violet border-candy-violet/30",
  published: "bg-candy-pink/20 text-candy-pink border-candy-pink/30",
};

const AdminContentEngine = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("artists");

  // Artists
  const [artists, setArtists] = useState<Artist[]>([]);
  const [artistFilter, setArtistFilter] = useState("all");
  const [artistSearch, setArtistSearch] = useState("");
  const [artistDialog, setArtistDialog] = useState(false);
  const [editArtist, setEditArtist] = useState<Partial<Artist> | null>(null);

  // Songs
  const [songs, setSongs] = useState<Song[]>([]);
  const [songFilter, setSongFilter] = useState("all");
  const [songSearch, setSongSearch] = useState("");
  const [songDialog, setSongDialog] = useState(false);
  const [editSong, setEditSong] = useState<Partial<Song> | null>(null);

  // Videos
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [videoFilter, setVideoFilter] = useState("all");
  const [videoSearch, setVideoSearch] = useState("");
  const [videoDialog, setVideoDialog] = useState(false);
  const [editVideo, setEditVideo] = useState<Partial<VideoItem> | null>(null);

  // Stats
  const stats = {
    artists: artists.length,
    songs: songs.length,
    videos: videos.length,
    published: songs.filter(s => s.status === "published").length + videos.filter(v => v.status === "published").length,
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { setSession(session); setLoading(false); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => { setSession(s); setLoading(false); });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => { if (session) { fetchArtists(); fetchSongs(); fetchVideos(); } }, [session]);

  // Fetch functions
  const fetchArtists = async () => {
    const { data } = await supabase.from("fc_artists").select("*").order("created_at", { ascending: false });
    setArtists((data as Artist[]) || []);
  };
  const fetchSongs = async () => {
    const { data } = await supabase.from("fc_songs").select("*, fc_artists(name)").order("created_at", { ascending: false });
    setSongs((data as Song[]) || []);
  };
  const fetchVideos = async () => {
    const { data } = await supabase.from("fc_videos").select("*, fc_songs(title, fc_artists(name))").order("created_at", { ascending: false });
    setVideos((data as VideoItem[]) || []);
  };

  // File upload helper
  const uploadFile = async (file: File, folder: string): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `${folder}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("fc-media").upload(path, file);
    if (error) { toast({ title: "Upload failed", description: error.message, variant: "destructive" }); return null; }
    const { data } = supabase.storage.from("fc-media").getPublicUrl(path);
    return data.publicUrl;
  };

  // CRUD Artists
  const saveArtist = async () => {
    if (!editArtist?.name) return;
    const payload = { name: editArtist.name, description: editArtist.description || null, visual_style_prompt: editArtist.visual_style_prompt || null, personality: editArtist.personality || null, image_url: editArtist.image_url || null, status: editArtist.status || "active" };
    if (editArtist.id) {
      await supabase.from("fc_artists").update({ ...payload, updated_at: new Date().toISOString() }).eq("id", editArtist.id);
    } else {
      await supabase.from("fc_artists").insert(payload);
    }
    setArtistDialog(false); setEditArtist(null); fetchArtists();
    toast({ title: editArtist.id ? "Artist updated" : "Artist created" });
  };
  const deleteArtist = async (id: string) => {
    await supabase.from("fc_artists").delete().eq("id", id);
    fetchArtists(); fetchSongs(); fetchVideos();
    toast({ title: "Artist deleted" });
  };

  // CRUD Songs
  const saveSong = async () => {
    if (!editSong?.title || !editSong?.artist_id) return;
    const payload = { title: editSong.title, artist_id: editSong.artist_id, lyrics: editSong.lyrics || null, mood: editSong.mood || "energetic", audio_url: editSong.audio_url || null, description: editSong.description || null, status: editSong.status || "draft" };
    if (editSong.id) {
      await supabase.from("fc_songs").update({ ...payload, updated_at: new Date().toISOString() }).eq("id", editSong.id);
    } else {
      await supabase.from("fc_songs").insert(payload);
    }
    setSongDialog(false); setEditSong(null); fetchSongs();
    toast({ title: editSong.id ? "Song updated" : "Song created" });
  };
  const deleteSong = async (id: string) => {
    await supabase.from("fc_songs").delete().eq("id", id);
    fetchSongs(); fetchVideos();
    toast({ title: "Song deleted" });
  };

  // CRUD Videos
  const saveVideo = async () => {
    if (!editVideo?.song_id) return;
    const payload = { song_id: editVideo.song_id, video_prompt: editVideo.video_prompt || null, style: editVideo.style || "cinematic", video_url: editVideo.video_url || null, embed_url: editVideo.embed_url || null, status: editVideo.status || "draft" };
    if (editVideo.id) {
      await supabase.from("fc_videos").update({ ...payload, updated_at: new Date().toISOString() }).eq("id", editVideo.id);
    } else {
      await supabase.from("fc_videos").insert(payload);
    }
    setVideoDialog(false); setEditVideo(null); fetchVideos();
    toast({ title: editVideo.id ? "Video updated" : "Video created" });
  };
  const deleteVideo = async (id: string) => {
    await supabase.from("fc_videos").delete().eq("id", id);
    fetchVideos();
    toast({ title: "Video deleted" });
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>;
  if (!session) { navigate("/admin"); return null; }

  const filteredArtists = artists.filter(a => {
    if (artistFilter !== "all" && a.status !== artistFilter) return false;
    if (artistSearch && !a.name.toLowerCase().includes(artistSearch.toLowerCase())) return false;
    return true;
  });
  const filteredSongs = songs.filter(s => {
    if (songFilter !== "all" && s.status !== songFilter) return false;
    if (songSearch && !s.title.toLowerCase().includes(songSearch.toLowerCase())) return false;
    return true;
  });
  const filteredVideos = videos.filter(v => {
    if (videoFilter !== "all" && v.status !== videoFilter) return false;
    if (videoSearch && !v.fc_songs?.title?.toLowerCase().includes(videoSearch.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <Helmet><title>Content Engine | NeonCandy Admin</title><meta name="robots" content="noindex, nofollow" /></Helmet>
      <div className="min-h-screen bg-background p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}><ArrowLeft className="w-5 h-5" /></Button>
            <h1 className="text-2xl md:text-3xl font-bold"><span className="text-gradient">Content Engine</span></h1>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: User, label: "Artists", value: stats.artists, color: "text-candy-pink" },
            { icon: Music, label: "Songs", value: stats.songs, color: "text-candy-cyan" },
            { icon: Video, label: "Videos", value: stats.videos, color: "text-candy-violet" },
            { icon: BarChart3, label: "Published", value: stats.published, color: "text-green-400" },
          ].map(s => (
            <Card key={s.label} className="p-4 glass border-border">
              <div className="flex items-center gap-3">
                <s.icon className={`w-5 h-5 ${s.color}`} />
                <div><p className={`text-2xl font-bold ${s.color}`}>{s.value}</p><p className="text-xs text-muted-foreground">{s.label}</p></div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-6 bg-muted/30">
            <TabsTrigger value="artists" className="gap-2"><User className="w-4 h-4" />Artists</TabsTrigger>
            <TabsTrigger value="songs" className="gap-2"><Music className="w-4 h-4" />Songs</TabsTrigger>
            <TabsTrigger value="videos" className="gap-2"><Video className="w-4 h-4" />Videos</TabsTrigger>
          </TabsList>

          {/* ===== ARTISTS TAB ===== */}
          <TabsContent value="artists">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search artists..." value={artistSearch} onChange={e => setArtistSearch(e.target.value)} className="pl-10 bg-background/50 border-border" />
              </div>
              <Select value={artistFilter} onValueChange={setArtistFilter}>
                <SelectTrigger className="w-full md:w-40 bg-background/50 border-border"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => { setEditArtist({}); setArtistDialog(true); }} className="glow-pink"><Plus className="w-4 h-4 mr-2" />Add Artist</Button>
            </div>
            <Card className="glass border-border overflow-hidden">
              <Table>
                <TableHeader><TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Name</TableHead>
                  <TableHead className="text-muted-foreground hidden md:table-cell">Personality</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {filteredArtists.length === 0 ? (
                    <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No artists yet</TableCell></TableRow>
                  ) : filteredArtists.map(a => (
                    <TableRow key={a.id} className="border-border">
                      <TableCell className="font-medium text-foreground">{a.name}</TableCell>
                      <TableCell className="text-muted-foreground text-sm hidden md:table-cell">{a.personality || "—"}</TableCell>
                      <TableCell><Badge className={`${statusColors[a.status]} border`}>{a.status}</Badge></TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => { setEditArtist(a); setArtistDialog(true); }}><Pencil className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteArtist(a.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* ===== SONGS TAB ===== */}
          <TabsContent value="songs">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search songs..." value={songSearch} onChange={e => setSongSearch(e.target.value)} className="pl-10 bg-background/50 border-border" />
              </div>
              <Select value={songFilter} onValueChange={setSongFilter}>
                <SelectTrigger className="w-full md:w-40 bg-background/50 border-border"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => { setEditSong({}); setSongDialog(true); }} className="glow-pink"><Plus className="w-4 h-4 mr-2" />Add Song</Button>
            </div>
            <Card className="glass border-border overflow-hidden">
              <Table>
                <TableHeader><TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Title</TableHead>
                  <TableHead className="text-muted-foreground hidden md:table-cell">Artist</TableHead>
                  <TableHead className="text-muted-foreground hidden md:table-cell">Mood</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {filteredSongs.length === 0 ? (
                    <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No songs yet</TableCell></TableRow>
                  ) : filteredSongs.map(s => (
                    <TableRow key={s.id} className="border-border">
                      <TableCell className="font-medium text-foreground">{s.title}</TableCell>
                      <TableCell className="text-muted-foreground text-sm hidden md:table-cell">{s.fc_artists?.name || "—"}</TableCell>
                      <TableCell className="text-muted-foreground text-sm hidden md:table-cell capitalize">{s.mood || "—"}</TableCell>
                      <TableCell><Badge className={`${statusColors[s.status]} border`}>{s.status}</Badge></TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => { setEditSong(s); setSongDialog(true); }}><Pencil className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteSong(s.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* ===== VIDEOS TAB ===== */}
          <TabsContent value="videos">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search by song..." value={videoSearch} onChange={e => setVideoSearch(e.target.value)} className="pl-10 bg-background/50 border-border" />
              </div>
              <Select value={videoFilter} onValueChange={setVideoFilter}>
                <SelectTrigger className="w-full md:w-40 bg-background/50 border-border"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="rendering">Rendering</SelectItem>
                  <SelectItem value="complete">Complete</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => { setEditVideo({}); setVideoDialog(true); }} className="glow-pink"><Plus className="w-4 h-4 mr-2" />Add Video</Button>
            </div>
            <Card className="glass border-border overflow-hidden">
              <Table>
                <TableHeader><TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Song</TableHead>
                  <TableHead className="text-muted-foreground hidden md:table-cell">Artist</TableHead>
                  <TableHead className="text-muted-foreground hidden md:table-cell">Style</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {filteredVideos.length === 0 ? (
                    <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No videos yet</TableCell></TableRow>
                  ) : filteredVideos.map(v => (
                    <TableRow key={v.id} className="border-border">
                      <TableCell className="font-medium text-foreground">{v.fc_songs?.title || "—"}</TableCell>
                      <TableCell className="text-muted-foreground text-sm hidden md:table-cell">{v.fc_songs?.fc_artists?.name || "—"}</TableCell>
                      <TableCell className="text-muted-foreground text-sm hidden md:table-cell capitalize">{v.style || "—"}</TableCell>
                      <TableCell><Badge className={`${statusColors[v.status]} border`}>{v.status}</Badge></TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => { setEditVideo(v); setVideoDialog(true); }}><Pencil className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteVideo(v.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>

        {/* ===== ARTIST DIALOG ===== */}
        <Dialog open={artistDialog} onOpenChange={setArtistDialog}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editArtist?.id ? "Edit Artist" : "New Artist"}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><label className="text-sm text-muted-foreground">Name *</label><Input value={editArtist?.name || ""} onChange={e => setEditArtist({ ...editArtist, name: e.target.value })} /></div>
              <div><label className="text-sm text-muted-foreground">Description</label><Textarea value={editArtist?.description || ""} onChange={e => setEditArtist({ ...editArtist, description: e.target.value })} rows={3} /></div>
              <div><label className="text-sm text-muted-foreground">Personality / Tone</label><Input value={editArtist?.personality || ""} onChange={e => setEditArtist({ ...editArtist, personality: e.target.value })} placeholder="e.g. mysterious, confident, dreamy" /></div>
              <div><label className="text-sm text-muted-foreground">Visual Style Prompt</label><Textarea value={editArtist?.visual_style_prompt || ""} onChange={e => setEditArtist({ ...editArtist, visual_style_prompt: e.target.value })} rows={2} placeholder="AI image/video generation style..." /></div>
              <div><label className="text-sm text-muted-foreground">Image URL</label><Input value={editArtist?.image_url || ""} onChange={e => setEditArtist({ ...editArtist, image_url: e.target.value })} placeholder="https://..." />
                <label className="text-xs text-muted-foreground mt-1 block">Or upload:</label>
                <Input type="file" accept="image/*" onChange={async e => { const f = e.target.files?.[0]; if (f) { const url = await uploadFile(f, "artists"); if (url) setEditArtist(prev => ({ ...prev, image_url: url })); } }} className="mt-1" />
              </div>
              <div><label className="text-sm text-muted-foreground">Status</label>
                <Select value={editArtist?.status || "active"} onValueChange={v => setEditArtist({ ...editArtist, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="active">Active</SelectItem><SelectItem value="inactive">Inactive</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter><Button variant="outline" onClick={() => setArtistDialog(false)}>Cancel</Button><Button onClick={saveArtist} className="glow-pink">Save</Button></DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ===== SONG DIALOG ===== */}
        <Dialog open={songDialog} onOpenChange={setSongDialog}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editSong?.id ? "Edit Song" : "New Song"}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><label className="text-sm text-muted-foreground">Title *</label><Input value={editSong?.title || ""} onChange={e => setEditSong({ ...editSong, title: e.target.value })} /></div>
              <div><label className="text-sm text-muted-foreground">Artist *</label>
                <Select value={editSong?.artist_id || ""} onValueChange={v => setEditSong({ ...editSong, artist_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Select artist" /></SelectTrigger>
                  <SelectContent>{artists.map(a => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><label className="text-sm text-muted-foreground">Mood</label><Input value={editSong?.mood || ""} onChange={e => setEditSong({ ...editSong, mood: e.target.value })} placeholder="e.g. emotional, confident, romantic" /></div>
              <div><label className="text-sm text-muted-foreground">Description</label><Textarea value={editSong?.description || ""} onChange={e => setEditSong({ ...editSong, description: e.target.value })} rows={2} /></div>
              <div><label className="text-sm text-muted-foreground">Lyrics</label><Textarea value={editSong?.lyrics || ""} onChange={e => setEditSong({ ...editSong, lyrics: e.target.value })} rows={6} placeholder="Full lyrics..." /></div>
              <div><label className="text-sm text-muted-foreground">Audio File</label>
                <Input type="file" accept="audio/*" onChange={async e => { const f = e.target.files?.[0]; if (f) { const url = await uploadFile(f, "audio"); if (url) setEditSong(prev => ({ ...prev, audio_url: url })); } }} />
                {editSong?.audio_url && <p className="text-xs text-muted-foreground mt-1 truncate">Current: {editSong.audio_url}</p>}
              </div>
              <div><label className="text-sm text-muted-foreground">Status</label>
                <Select value={editSong?.status || "draft"} onValueChange={v => setEditSong({ ...editSong, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="draft">Draft</SelectItem><SelectItem value="ready">Ready</SelectItem><SelectItem value="published">Published</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter><Button variant="outline" onClick={() => setSongDialog(false)}>Cancel</Button><Button onClick={saveSong} className="glow-pink">Save</Button></DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ===== VIDEO DIALOG ===== */}
        <Dialog open={videoDialog} onOpenChange={setVideoDialog}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editVideo?.id ? "Edit Video" : "New Video"}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><label className="text-sm text-muted-foreground">Song *</label>
                <Select value={editVideo?.song_id || ""} onValueChange={v => setEditVideo({ ...editVideo, song_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Select song" /></SelectTrigger>
                  <SelectContent>{songs.map(s => <SelectItem key={s.id} value={s.id}>{s.title} — {s.fc_artists?.name || "Unknown"}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><label className="text-sm text-muted-foreground">Style</label><Input value={editVideo?.style || ""} onChange={e => setEditVideo({ ...editVideo, style: e.target.value })} placeholder="cinematic, soft glow, neon..." /></div>
              <div><label className="text-sm text-muted-foreground">Video Prompt</label>
                <Textarea value={editVideo?.video_prompt || ""} onChange={e => setEditVideo({ ...editVideo, video_prompt: e.target.value })} rows={4} placeholder="Full generation prompt..." />
                {editVideo?.song_id && (() => {
                  const song = songs.find(s => s.id === editVideo.song_id);
                  const artist = song ? artists.find(a => a.id === song.artist_id) : null;
                  return artist?.visual_style_prompt ? (
                    <p className="text-xs text-candy-cyan mt-1">Artist style hint: {artist.visual_style_prompt}</p>
                  ) : null;
                })()}
              </div>
              <div><label className="text-sm text-muted-foreground">Video File</label>
                <Input type="file" accept="video/*" onChange={async e => { const f = e.target.files?.[0]; if (f) { const url = await uploadFile(f, "videos"); if (url) setEditVideo(prev => ({ ...prev, video_url: url })); } }} />
              </div>
              <div><label className="text-sm text-muted-foreground">Embed URL (YouTube/Vimeo)</label><Input value={editVideo?.embed_url || ""} onChange={e => setEditVideo({ ...editVideo, embed_url: e.target.value })} placeholder="https://www.youtube.com/embed/..." /></div>
              <div><label className="text-sm text-muted-foreground">Status</label>
                <Select value={editVideo?.status || "draft"} onValueChange={v => setEditVideo({ ...editVideo, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="draft">Draft</SelectItem><SelectItem value="rendering">Rendering</SelectItem><SelectItem value="complete">Complete</SelectItem><SelectItem value="published">Published</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter><Button variant="outline" onClick={() => setVideoDialog(false)}>Cancel</Button><Button onClick={saveVideo} className="glow-pink">Save</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AdminContentEngine;
