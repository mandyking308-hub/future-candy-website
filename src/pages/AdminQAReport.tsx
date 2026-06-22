import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet";
import { ArrowLeft, CheckCircle, AlertTriangle } from "lucide-react";

const QA_DATE = "22 June 2026";

const checks = [
  ["Brand", "pass", "Public brand is NeonCandy. Repo search shows no public FutureCandy wording remaining."],
  ["Homepage", "pass", "Homepage Helmet, hero, about, release, visual, contact, and footer sections are NeonCandy aligned."],
  ["Domain", "pass", "Canonical, robots, and sitemap are aligned to neoncandy.net."],
  ["Music", "pass", "/music routes to the clean NeonCandy catalogue and pulls published songs from the content database."],
  ["Distribution", "pass", "Copy recognises real DistroKid releases and confirmed channels including Apple Music, iTunes, Spotify, Deezer, and iHeartRadio."],
  ["Contact", "pass", "/contact uses the live form and backend function. Storage is prioritised before email notification."],
  ["Fake forms", "pass", "Known fake/local-only forms have been removed or routed to the real contact form."],
  ["Admin Manual", "pass", "Admin manual rebuilt as operating manual, user manual, technical manual, release guide, and pre-send checklist."],
  ["Legal", "pass", "Terms, privacy, licensing, and legal wrapper are NeonCandy aligned."],
  ["Deploy", "warning", "Lovable must publish/sync the latest GitHub commits before the live site reflects this QA state."],
];

const issues = [
  ["Live deploy may lag GitHub", "warning", "Publish from Lovable and check incognito after deploy."],
  ["Platform URLs", "warning", "Add exact Apple/Spotify/iTunes/Shopify public links only after checking each URL."],
  ["Historical table name", "note", "The database table futurecandy_enquiries remains for continuity; do not rename without a migration."],
];

const AdminQAReport = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => { setSession(nextSession); setLoading(false); });
    supabase.auth.getSession().then(({ data: { session } }) => { setSession(session); setLoading(false); });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>;
  if (!session) { window.location.href = "/admin"; return null; }

  const passCount = checks.filter((c) => c[1] === "pass").length;
  const warningCount = checks.filter((c) => c[1] === "warning").length + issues.filter((i) => i[1] === "warning").length;

  return (
    <>
      <Helmet><title>QA Report | NeonCandy Admin</title><meta name="robots" content="noindex, nofollow" /></Helmet>
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="flex items-center gap-4 mb-8"><a href="/admin"><Button variant="outline" size="sm"><ArrowLeft className="w-4 h-4 mr-2" />Dashboard</Button></a><div><h1 className="text-3xl font-bold"><span className="text-gradient">NeonCandy QA Report</span></h1><p className="text-sm text-muted-foreground">Latest pass: {QA_DATE}</p></div></div>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4"><Card className="p-4 glass border-border"><p className="text-2xl font-bold text-foreground">{checks.length}</p><p className="text-xs text-muted-foreground">Checks</p></Card><Card className="p-4 glass border-green-500/30"><p className="text-2xl font-bold text-green-400">{passCount}</p><p className="text-xs text-muted-foreground">Passed</p></Card><Card className="p-4 glass border-candy-orange/30"><p className="text-2xl font-bold text-candy-orange">{warningCount}</p><p className="text-xs text-muted-foreground">Warnings</p></Card><Card className="p-4 glass border-candy-cyan/30"><p className="text-2xl font-bold text-candy-cyan">Ready</p><p className="text-xs text-muted-foreground">Repo State</p></Card></div>
          <Card className="p-6 glass border-border"><h2 className="text-xl font-bold text-gradient mb-4">Production Checks</h2><div className="space-y-2">{checks.map(([name, status, note]) => <div key={name} className="flex items-start gap-3 py-2 border-b border-border/30 last:border-0">{status === "pass" ? <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-candy-orange mt-0.5 shrink-0" />}<div><div className="flex items-center gap-2"><span className="text-sm font-medium text-foreground">{name}</span><Badge className={`text-xs border ${status === "pass" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-candy-orange/20 text-candy-orange border-candy-orange/30"}`}>{status}</Badge></div><p className="text-xs text-muted-foreground mt-0.5">{note}</p></div></div>)}</div></Card>
          <Card className="p-6 glass border-border"><h2 className="text-xl font-bold text-gradient mb-4">Remaining Control Notes</h2><div className="space-y-2">{issues.map(([name, status, note]) => <div key={name} className="flex items-start gap-3 py-2 border-b border-border/30 last:border-0"><AlertTriangle className="w-4 h-4 text-candy-orange mt-0.5 shrink-0" /><div><div className="flex items-center gap-2"><span className="text-sm font-medium text-foreground">{name}</span><Badge className="text-xs border bg-candy-orange/20 text-candy-orange border-candy-orange/30">{status}</Badge></div><p className="text-xs text-muted-foreground mt-0.5">{note}</p></div></div>)}</div></Card>
        </div>
      </div>
    </>
  );
};

export default AdminQAReport;