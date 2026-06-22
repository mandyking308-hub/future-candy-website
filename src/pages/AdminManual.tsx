import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet";
import { ArrowLeft, Download, RefreshCw } from "lucide-react";

const BRAND = {
  name: "NeonCandy",
  tagline: "Sweet Beats. Synthetic Dreams. AI Pop for the Future.",
  company: "Global Solutions Management LLC",
  companyNumber: "10420698",
  jurisdiction: "Delaware, United States",
  primaryDomain: "https://neoncandy.net",
  backupDomain: "https://neoncandy.online",
  adminRoute: "/admin",
};

const liveChecklist = [
  "Homepage must say NeonCandy, not FutureCandy.",
  "Music/release copy must say singles are live, not only future or coming soon.",
  "Released songs must be playable or clearly linked from /music.",
  "Contact/enquiry forms must store submissions internally before email notification.",
  "No public fake forms, dead social links, or placeholder newsletter captures.",
  "Robots and sitemap must align to neoncandy.net.",
];

const publicPages = [
  ["/", "Home", "Hero, release status, about, artists, visuals, contact CTA, footer."],
  ["/music", "Music & Releases", "Published songs from the NeonCandy catalogue. Shows audio controls where audio_url exists."],
  ["/artists", "Artists", "Public artist roster."],
  ["/collab", "Licensing & Collaboration", "Collaboration overview with CTA to the real contact form."],
  ["/contact", "Contact", "Live enquiry form. Submissions go to the admin database."],
  ["/terms", "Terms", "Website terms for NeonCandy."],
  ["/privacy", "Privacy", "Privacy and enquiry-storage information."],
  ["/digital-licensing", "Digital Licensing", "Digital use and licensing terms."],
  ["/global-licensing", "Global Licensing", "Regional, film, brand, and licensing enquiry route."],
];

const technicalRoutes = [
  ["/admin", "Admin Dashboard", "Authenticated dashboard for viewing and managing enquiries."],
  ["/admin/manual", "Admin Manual", "This business/user/technical manual with PDF print export."],
  ["/admin/qa-report", "QA Report", "Quality assurance status page."],
  ["/admin/content", "Content Engine", "Artist, song, and video content management area."],
];

const AdminManual = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, new: 0, read: 0, replied: 0 });
  const manualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchStats = async () => {
    const { data } = await supabase.from("futurecandy_enquiries").select("status");
    if (!data) return;
    setStats({
      total: data.length,
      new: data.filter((e) => e.status === "new").length,
      read: data.filter((e) => e.status === "read").length,
      replied: data.filter((e) => e.status === "replied").length,
    });
  };

  useEffect(() => {
    if (session) fetchStats();
  }, [session]);

  const printManual = () => {
    const html = manualRef.current?.innerHTML;
    if (!html) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`<!doctype html><html><head><title>NeonCandy Manual</title><style>body{font-family:Arial,sans-serif;padding:32px;line-height:1.55;color:#111}h1,h2,h3{color:#111}section{margin-bottom:28px}table{width:100%;border-collapse:collapse;margin:12px 0}td,th{border:1px solid #ddd;padding:8px;text-align:left}.badge{display:inline-block;border:1px solid #aaa;border-radius:12px;padding:2px 8px;margin:2px;font-size:12px}</style></head><body>${html}</body></html>`);
    win.document.close();
    win.focus();
    win.print();
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Loading manual...</p></div>;
  if (!session) { window.location.href = "/admin"; return null; }

  return (
    <>
      <Helmet><title>Admin Manual | NeonCandy</title><meta name="robots" content="noindex, nofollow" /></Helmet>
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <a href="/admin"><Button variant="outline" size="sm"><ArrowLeft className="w-4 h-4 mr-2" />Dashboard</Button></a>
            <div><h1 className="text-3xl font-bold"><span className="text-gradient">NeonCandy Manual</span></h1><p className="text-sm text-muted-foreground">Business operating guide, user manual, and technical manual.</p></div>
          </div>
          <div className="flex gap-2"><Button variant="outline" onClick={fetchStats}><RefreshCw className="w-4 h-4 mr-2" />Refresh Stats</Button><Button onClick={printManual}><Download className="w-4 h-4 mr-2" />Print / Save PDF</Button></div>
        </div>

        <div ref={manualRef} className="max-w-5xl mx-auto space-y-6">
          <Card className="p-6 glass border-candy-pink/30">
            <h1 className="text-3xl font-bold mb-2">{BRAND.name}</h1>
            <p className="text-lg text-muted-foreground mb-4">{BRAND.tagline}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <p><strong>Company:</strong> {BRAND.company}</p><p><strong>File Number:</strong> {BRAND.companyNumber}</p><p><strong>Jurisdiction:</strong> {BRAND.jurisdiction}</p><p><strong>Primary Domain:</strong> {BRAND.primaryDomain}</p><p><strong>Backup Domain:</strong> {BRAND.backupDomain}</p><p><strong>Admin Route:</strong> {BRAND.adminRoute}</p>
            </div>
          </Card>

          <Card className="p-6 glass border-candy-cyan/30"><h2 className="text-2xl font-bold mb-4 text-candy-cyan">1. Executive Status</h2><p>NeonCandy is a live AI-pop music brand with released singles distributed through DistroKid. The website must present NeonCandy as real, polished, released, and operational. Do not describe confirmed releases as future-only claims.</p><div className="mt-4 flex flex-wrap gap-2"><Badge>Live brand</Badge><Badge>Released singles</Badge><Badge>DistroKid distribution</Badge><Badge>Admin enquiries</Badge><Badge>Content engine</Badge></div></Card>

          <Card className="p-6 glass border-candy-violet/30"><h2 className="text-2xl font-bold mb-4 text-candy-violet">2. Public Launch Checklist</h2><ul className="space-y-2 list-disc list-inside">{liveChecklist.map((item) => <li key={item}>{item}</li>)}</ul></Card>

          <Card className="p-6 glass border-candy-pink/30"><h2 className="text-2xl font-bold mb-4 text-candy-pink">3. Releases and Distribution</h2><p className="mb-3">Distribution is real. Release copy may reference DistroKid and confirmed platform availability. Confirmed examples from release emails include Boom In My Step and Can't Wait by Velvette Noir.</p><p className="mb-3">Confirmed platform examples include Apple Music, iTunes, Spotify, Deezer, and iHeartRadio. The broader DistroKid distribution network may cover many more stores and services; add individual public links only when the final link has been checked.</p><p>Shopify/store references should only be shown when the exact public store URL and product state have been verified.</p></Card>

          <Card className="p-6 glass border-candy-cyan/30"><h2 className="text-2xl font-bold mb-4 text-candy-cyan">4. User Manual: Daily Operation</h2><ol className="space-y-2 list-decimal list-inside"><li>Open /admin and sign in.</li><li>Check new enquiries first. Anything marked new needs review.</li><li>Open /music and check published songs are visible and playable.</li><li>Check /contact if sending the site to schools, partners, press, or brands.</li><li>Do not publish drafts or half-ready media publicly.</li><li>After changes, check homepage, music, contact, footer, and mobile menu in incognito.</li></ol></Card>

          <Card className="p-6 glass border-candy-violet/30"><h2 className="text-2xl font-bold mb-4 text-candy-violet">5. Enquiry Management</h2><p>Contact submissions are stored in the database table used by the admin dashboard. Email notification is secondary; storage is the source of truth.</p><div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4"><div><strong>{stats.total}</strong><p className="text-xs text-muted-foreground">Total</p></div><div><strong>{stats.new}</strong><p className="text-xs text-muted-foreground">New</p></div><div><strong>{stats.read}</strong><p className="text-xs text-muted-foreground">Read</p></div><div><strong>{stats.replied}</strong><p className="text-xs text-muted-foreground">Replied</p></div></div><p className="mt-4">Workflow: new → read → replied. Do not leave important enquiries sitting as new.</p></Card>

          <Card className="p-6 glass border-candy-pink/30"><h2 className="text-2xl font-bold mb-4 text-candy-pink">6. Public Pages</h2><table className="w-full text-sm border-collapse"><tbody>{publicPages.map(([path, name, desc]) => <tr key={path} className="border-b border-border"><td className="py-2 font-semibold">{path}</td><td className="py-2">{name}</td><td className="py-2 text-muted-foreground">{desc}</td></tr>)}</tbody></table></Card>

          <Card className="p-6 glass border-candy-cyan/30"><h2 className="text-2xl font-bold mb-4 text-candy-cyan">7. Admin and Technical Routes</h2><table className="w-full text-sm border-collapse"><tbody>{technicalRoutes.map(([path, name, desc]) => <tr key={path} className="border-b border-border"><td className="py-2 font-semibold">{path}</td><td className="py-2">{name}</td><td className="py-2 text-muted-foreground">{desc}</td></tr>)}</tbody></table></Card>

          <Card className="p-6 glass border-candy-violet/30"><h2 className="text-2xl font-bold mb-4 text-candy-violet">8. Technical Manual</h2><ul className="space-y-2 list-disc list-inside"><li>Frontend stack: React, Vite, TypeScript, Tailwind-style design system, React Router.</li><li>Database/Auth/Functions: Supabase integration through src/integrations/supabase.</li><li>Contact function: supabase/functions/contact-form/index.ts.</li><li>Primary enquiry table: futurecandy_enquiries.</li><li>Content engine tables: fc_artists, fc_songs, fc_videos.</li><li>SEO: React Helmet per route plus index.html base metadata.</li><li>Robots and sitemap: public/robots.txt and public/sitemap.xml.</li><li>Public brand: NeonCandy. Internal table names may still contain futurecandy for historical system reasons; do not rename database tables without migration planning.</li></ul></Card>

          <Card className="p-6 glass border-candy-pink/30"><h2 className="text-2xl font-bold mb-4 text-candy-pink">9. Content Engine Manual</h2><ol className="space-y-2 list-decimal list-inside"><li>Create or update artist profiles first.</li><li>Add songs with title, artist, mood, release status, audio URL, cover image, and description.</li><li>Only set songs to published when they are ready for public viewing.</li><li>Add videos only when they are complete and checked.</li><li>Use Velvette Noir and ByteBaby as female-led artist lanes. Do not publicly promote archived male/EchoNova content unless explicitly restored.</li></ol></Card>

          <Card className="p-6 glass border-candy-cyan/30"><h2 className="text-2xl font-bold mb-4 text-candy-cyan">10. Pre-Send School / Headmistress Check</h2><ul className="space-y-2 list-disc list-inside"><li>Open the website in incognito.</li><li>Check it says NeonCandy immediately in the browser and hero.</li><li>Open /music and play at least one track.</li><li>Open /contact and confirm form fields look professional.</li><li>Open mobile view and check navigation.</li><li>Do not send the link until the public site reflects the latest deploy.</li></ul></Card>

          <Card className="p-6 glass border-candy-violet/30"><h2 className="text-2xl font-bold mb-4 text-candy-violet">11. Troubleshooting</h2><ul className="space-y-2 list-disc list-inside"><li>If the live site still says FutureCandy, Lovable has not deployed the latest GitHub commit or browser cache is stale.</li><li>If songs do not appear, check that songs are marked published and have audio_url or a verified platform link.</li><li>If contact form submits but no email arrives, check admin dashboard first because database storage is the source of truth.</li><li>If admin is inaccessible, confirm auth session and account permissions.</li><li>If sitemap looks wrong, check public/sitemap.xml after deployment.</li></ul></Card>

          <Card className="p-6 glass border-candy-pink/30"><h2 className="text-2xl font-bold mb-4 text-candy-pink">12. Version Notes</h2><p>Current manual version: NeonCandy production-readiness manual. Built for public credibility, school-link readiness, released music positioning, contact storage confidence, and operator continuity.</p><p className="text-sm text-muted-foreground mt-3">Generated: {new Date().toLocaleString("en-GB")}</p></Card>
        </div>
      </div>
    </>
  );
};

export default AdminManual;