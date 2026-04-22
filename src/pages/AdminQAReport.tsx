import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet";
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const QA_DATE = "8 April 2026";

const PAGES_CHECKED = [
  { page: "Home (/)", status: "pass", notes: "All sections render. Hero, About, Artists, Visuals, CandyClub, Contact CTA, Footer all present." },
  { page: "Journal (/journal)", status: "pass", notes: "Posts display correctly. Layout and spacing consistent." },
  { page: "Collab (/collab)", status: "fixed", notes: "Removed non-functional form. Now routes to Contact page for all enquiries." },
  { page: "Contact (/contact)", status: "pass", notes: "Form validation, hCaptcha, honeypot, and submission all functional." },
  { page: "Terms of Use (/terms)", status: "pass", notes: "Legal content renders correctly." },
  { page: "Privacy Policy (/privacy)", status: "pass", notes: "Content present and accessible." },
  { page: "Digital Licensing", status: "pass", notes: "Page renders correctly." },
  { page: "Refund Policy", status: "pass", notes: "Page renders correctly." },
  { page: "Cookies Policy", status: "pass", notes: "Page renders correctly." },
  { page: "Modern Slavery", status: "pass", notes: "Page renders correctly." },
  { page: "Global Licensing", status: "pass", notes: "Page renders correctly." },
  { page: "Multilingual Rights", status: "pass", notes: "Page renders correctly." },
  { page: "404 Not Found", status: "fixed", notes: "Updated to use design system tokens instead of hardcoded colors." },
  { page: "Admin Dashboard (/admin)", status: "pass", notes: "Login, enquiry list, search, filter, status updates all working." },
  { page: "Admin Manual (/admin/manual)", status: "new", notes: "Created self-updating manual with PDF export." },
  { page: "QA Report (/admin/qa-report)", status: "new", notes: "Created this QA summary page." },
];

const ISSUES_FOUND = [
  { issue: "NotFound page used hardcoded colors (bg-gray-100, text-blue-500)", severity: "low", status: "fixed", fix: "Replaced with design system tokens" },
  { issue: "Collab page form didn't send data to backend — only showed toast", severity: "medium", status: "fixed", fix: "Removed fake form, redirected users to Contact page" },
  { issue: "Contact section (homepage) had dead # links for Spotify/YouTube/Instagram", severity: "low", status: "warning", fix: "Links remain as placeholders until real URLs are provided" },
  { issue: "Footer had dead # links for music platforms", severity: "low", status: "warning", fix: "Links remain as placeholders until real URLs are provided" },
  { issue: "Journal posts are static/hardcoded content", severity: "low", status: "warning", fix: "Content works but is not CMS-managed — acceptable for current phase" },
  { issue: "hCaptcha using test key", severity: "medium", status: "warning", fix: "Replace with production key before go-live" },
  { issue: "GA4 and Meta Pixel placeholders not active", severity: "low", status: "warning", fix: "Insert real IDs when ready" },
  { issue: "No password reset flow for admin", severity: "low", status: "warning", fix: "Can be added when needed" },
];

const AdminQAReport = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>;
  }

  if (!session) {
    window.location.href = "/admin";
    return null;
  }

  const passed = PAGES_CHECKED.filter(p => p.status === "pass").length;
  const fixed = PAGES_CHECKED.filter(p => p.status === "fixed").length;
  const created = PAGES_CHECKED.filter(p => p.status === "new").length;
  const warnings = ISSUES_FOUND.filter(i => i.status === "warning").length;

  return (
    <>
      <Helmet>
        <title>QA Report | NeonCandy Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="flex items-center gap-4 mb-8">
          <a href="/admin">
            <Button variant="outline" size="sm" className="border-border">
              <ArrowLeft className="w-4 h-4 mr-2" /> Dashboard
            </Button>
          </a>
          <div>
            <h1 className="text-3xl font-bold"><span className="text-gradient">QA Report</span></h1>
            <p className="text-sm text-muted-foreground">Latest pass: {QA_DATE}</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 glass border-border">
              <p className="text-2xl font-bold text-foreground">{PAGES_CHECKED.length}</p>
              <p className="text-xs text-muted-foreground">Pages Checked</p>
            </Card>
            <Card className="p-4 glass border-green-500/30">
              <p className="text-2xl font-bold text-green-400">{passed}</p>
              <p className="text-xs text-muted-foreground">Passed</p>
            </Card>
            <Card className="p-4 glass border-candy-cyan/30">
              <p className="text-2xl font-bold text-candy-cyan">{fixed + created}</p>
              <p className="text-xs text-muted-foreground">Fixed / New</p>
            </Card>
            <Card className="p-4 glass border-candy-orange/30">
              <p className="text-2xl font-bold text-candy-orange">{warnings}</p>
              <p className="text-xs text-muted-foreground">Warnings</p>
            </Card>
          </div>

          {/* Pages Checked */}
          <Card className="p-6 glass border-border">
            <h2 className="text-xl font-bold text-gradient mb-4">Pages Checked</h2>
            <div className="space-y-2">
              {PAGES_CHECKED.map((p, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b border-border/30 last:border-0">
                  {p.status === "pass" && <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />}
                  {p.status === "fixed" && <CheckCircle className="w-4 h-4 text-candy-cyan mt-0.5 shrink-0" />}
                  {p.status === "new" && <CheckCircle className="w-4 h-4 text-candy-violet mt-0.5 shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{p.page}</span>
                      <Badge className={`text-xs ${
                        p.status === "pass" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                        p.status === "fixed" ? "bg-candy-cyan/20 text-candy-cyan border-candy-cyan/30" :
                        "bg-candy-violet/20 text-candy-violet border-candy-violet/30"
                      } border`}>
                        {p.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{p.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Issues */}
          <Card className="p-6 glass border-border">
            <h2 className="text-xl font-bold text-gradient mb-4">Issues Found & Resolved</h2>
            <div className="space-y-3">
              {ISSUES_FOUND.map((issue, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b border-border/30 last:border-0">
                  {issue.status === "fixed" ? (
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-candy-orange mt-0.5 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-foreground">{issue.issue}</span>
                      <Badge className={`text-xs border ${
                        issue.severity === "medium" ? "bg-candy-orange/20 text-candy-orange border-candy-orange/30" :
                        "bg-muted text-muted-foreground border-border"
                      }`}>{issue.severity}</Badge>
                      <Badge className={`text-xs border ${
                        issue.status === "fixed" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                        "bg-candy-orange/20 text-candy-orange border-candy-orange/30"
                      }`}>{issue.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{issue.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminQAReport;
