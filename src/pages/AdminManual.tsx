import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import { ArrowLeft, Download, RefreshCw, Clock } from "lucide-react";

// Live system configuration
const SITE_CONFIG = {
  name: "FutureCandy",
  tagline: "Sweet Beats. Synthetic Dreams. AI Pop for the Future.",
  company: "HEALTH CHOICES GLOBAL LIMITED",
  companyNumber: "10941962",
  address: "128 City Road, London, EC1V 2NX",
  adminEmail: "contact@futurecandy.studio",
  publishedUrl: "https://future-candy-website.lovable.app",
};

const PUBLIC_PAGES = [
  { path: "/", name: "Home (The Portal)", description: "Hero, About, Artists, Visuals, Candy Club newsletter, Contact CTA, Footer" },
  { path: "/journal", name: "The Drop Room (Journal)", description: "Blog-style announcements and creative statements" },
  { path: "/collab", name: "Licensing & Collaboration", description: "Information about licensing opportunities with CTA to contact page" },
  { path: "/contact", name: "Contact Page", description: "Full enquiry form with hCaptcha, subject categories, honeypot spam protection" },
  { path: "/terms", name: "Terms of Use", description: "Legal terms and conditions" },
  { path: "/privacy", name: "Privacy Policy", description: "Data protection and privacy information" },
  { path: "/digital-licensing", name: "Digital Licensing", description: "Digital content licensing terms" },
  { path: "/refund-policy", name: "Refund Policy", description: "Refund and cancellation policy" },
  { path: "/cookies", name: "Cookies Policy", description: "Cookie usage and consent information" },
  { path: "/modern-slavery", name: "Modern Slavery Statement", description: "Modern slavery and human trafficking statement" },
  { path: "/global-licensing", name: "Global Licensing", description: "International licensing framework" },
  { path: "/multilingual-rights", name: "Multilingual Rights", description: "Multilingual content rights information" },
];

const ADMIN_PAGES = [
  { path: "/admin", name: "Admin Dashboard", description: "View, search, filter, and manage all contact enquiries. Update status (new/read/replied)." },
  { path: "/admin/manual", name: "Admin Manual (this page)", description: "Self-updating system documentation with PDF export" },
  { path: "/admin/qa-report", name: "QA Report", description: "Latest quality assurance findings and system health status" },
];

const ARTISTS = ["Velvette", "EchoNova", "ByteBaby"];

const AdminManual = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [enquiryStats, setEnquiryStats] = useState({ total: 0, new: 0, read: 0, replied: 0 });
  const [lastUpdated] = useState(new Date().toISOString());
  const [exporting, setExporting] = useState(false);
  const manualRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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

  useEffect(() => {
    if (session) fetchStats();
  }, [session]);

  const fetchStats = async () => {
    const { data } = await supabase.from("futurecandy_enquiries").select("status");
    if (data) {
      setEnquiryStats({
        total: data.length,
        new: data.filter(e => e.status === "new").length,
        read: data.filter(e => e.status === "read").length,
        replied: data.filter(e => e.status === "replied").length,
      });
    }
  };

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const content = manualRef.current;
      if (!content) return;

      // Build a clean HTML document for printing
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        toast({ title: "Error", description: "Please allow popups to download the PDF", variant: "destructive" });
        return;
      }

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>FutureCandy Admin Manual</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Space Grotesk', sans-serif; color: #1a1a2e; padding: 40px; max-width: 800px; margin: 0 auto; }
            h1 { font-size: 28px; margin-bottom: 8px; color: #1a1a2e; }
            h2 { font-size: 20px; margin-top: 32px; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 2px solid #e8c4b8; color: #1a1a2e; }
            h3 { font-size: 16px; margin-top: 20px; margin-bottom: 8px; color: #444; }
            p, li { font-size: 13px; line-height: 1.7; color: #333; }
            ul { padding-left: 20px; margin-bottom: 12px; }
            li { margin-bottom: 4px; }
            table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 12px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background: #f5ebe6; font-weight: 600; }
            .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 3px solid #1a1a2e; }
            .subtitle { color: #666; font-size: 14px; }
            .timestamp { color: #999; font-size: 11px; margin-top: 4px; }
            .badge { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600; background: #f0e6df; color: #8b6f5a; }
            @media print { body { padding: 20px; } h2 { page-break-after: avoid; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1>FutureCandy Admin Manual</h1>
              <p class="subtitle">System Documentation & Operations Guide</p>
              <p class="timestamp">Generated: ${new Date().toLocaleString('en-GB')}</p>
            </div>
          </div>

          <h2>1. System Overview</h2>
          <p><strong>${SITE_CONFIG.name}</strong> — ${SITE_CONFIG.tagline}</p>
          <p>A digital-first, AI-powered music label website featuring digital artist projects. The platform serves as an immersive digital sound universe with integrated enquiry management.</p>
          <ul>
            <li><strong>Published URL:</strong> ${SITE_CONFIG.publishedUrl}</li>
            <li><strong>Admin Email:</strong> ${SITE_CONFIG.adminEmail}</li>
            <li><strong>Company:</strong> ${SITE_CONFIG.company} (No. ${SITE_CONFIG.companyNumber})</li>
            <li><strong>Address:</strong> ${SITE_CONFIG.address}</li>
            <li><strong>Artists:</strong> ${ARTISTS.join(", ")}</li>
          </ul>

          <h2>2. Public Website Pages</h2>
          <table>
            <tr><th>Page</th><th>Path</th><th>Description</th></tr>
            ${PUBLIC_PAGES.map(p => `<tr><td>${p.name}</td><td>${p.path}</td><td>${p.description}</td></tr>`).join('')}
          </table>

          <h2>3. Admin / Dashboard Pages</h2>
          <table>
            <tr><th>Page</th><th>Path</th><th>Description</th></tr>
            ${ADMIN_PAGES.map(p => `<tr><td>${p.name}</td><td>${p.path}</td><td>${p.description}</td></tr>`).join('')}
          </table>

          <h2>4. Navigation Map</h2>
          <p>The main navigation bar appears on all public pages with links to: Home, About, Artists, Visuals, Journal, Collab, Contact.</p>
          <p>The footer contains links to all legal pages, music platforms, and company information.</p>
          <p>Admin pages are not linked from the public site — access via <code>/admin</code> directly.</p>

          <h2>5. Content Management</h2>
          <h3>Enquiry Management</h3>
          <p>All contact form submissions are stored in the database and visible in the Admin Dashboard. Current stats:</p>
          <ul>
            <li>Total enquiries: <strong>${enquiryStats.total}</strong></li>
            <li>New (unread): <strong>${enquiryStats.new}</strong></li>
            <li>Read: <strong>${enquiryStats.read}</strong></li>
            <li>Replied: <strong>${enquiryStats.replied}</strong></li>
          </ul>
          <h3>Status Workflow</h3>
          <p>Enquiries follow the lifecycle: <strong>New → Read → Replied</strong>. Update status from the detail panel in the dashboard.</p>

          <h2>6. How to Update Branding, Text, Media & Links</h2>
          <p>All visual content is managed through the codebase in Lovable. To make changes:</p>
          <ul>
            <li><strong>Logo:</strong> Replace <code>src/assets/futurecandy-logo-new.png</code></li>
            <li><strong>Favicon:</strong> Replace <code>public/favicon.png</code></li>
            <li><strong>Hero Image:</strong> Replace <code>src/assets/hero-visual.jpg</code></li>
            <li><strong>Text & Copy:</strong> Edit the relevant component file in <code>src/components/</code> or <code>src/pages/</code></li>
            <li><strong>Colours:</strong> Edit CSS variables in <code>src/index.css</code> under <code>:root</code></li>
            <li><strong>Font:</strong> Currently using Space Grotesk, loaded from Google Fonts in <code>index.html</code></li>
          </ul>

          <h2>7. Forms & Submissions</h2>
          <p>The main contact form at <code>/contact</code> includes:</p>
          <ul>
            <li>Fields: Name*, Email*, Phone, Company, Subject*, Message*</li>
            <li>hCaptcha verification (currently using test key)</li>
            <li>Honeypot spam field (hidden)</li>
            <li>Zod validation with inline error messages</li>
            <li>Submissions are processed via a backend function and stored in the database</li>
            <li>Email notifications sent to admin via Resend integration</li>
          </ul>

          <h2>8. User Roles & Permissions</h2>
          <ul>
            <li><strong>Public (anonymous):</strong> Can view all public pages and submit contact enquiries</li>
            <li><strong>Authenticated (admin):</strong> Can view, search, filter, and update enquiry statuses. Can access admin dashboard, manual, and QA report.</li>
            <li><strong>Primary admin:</strong> ${SITE_CONFIG.adminEmail}</li>
          </ul>
          <p>Authentication uses email/password sign-in. Admin pages redirect to login if not authenticated.</p>

          <h2>9. Automations & Workflows</h2>
          <ul>
            <li>Contact form submissions trigger an email notification to the admin</li>
            <li>Cookie consent banner appears on first visit</li>
            <li>Content protection (right-click/copy prevention) active on all public pages</li>
            <li>SEO metadata auto-applied per page via React Helmet</li>
          </ul>

          <h2>10. Troubleshooting</h2>
          <ul>
            <li><strong>Contact form not sending:</strong> Check that the backend function is deployed and the email service secret is configured</li>
            <li><strong>Can't log in to admin:</strong> Verify account exists and email is confirmed. Password reset not yet implemented.</li>
            <li><strong>Enquiries not appearing:</strong> Check database connection and RLS policies</li>
            <li><strong>Favicon not updating:</strong> Clear browser cache or try incognito mode</li>
          </ul>

          <h2>11. Dependencies & Integrations</h2>
          <ul>
            <li><strong>Hosting:</strong> Lovable Cloud</li>
            <li><strong>Database:</strong> Lovable Cloud (PostgreSQL)</li>
            <li><strong>Authentication:</strong> Lovable Cloud Auth</li>
            <li><strong>Email:</strong> Resend (via backend function)</li>
            <li><strong>CAPTCHA:</strong> hCaptcha</li>
            <li><strong>Fonts:</strong> Google Fonts (Space Grotesk)</li>
            <li><strong>Analytics:</strong> Google Analytics 4 placeholder (not yet active)</li>
            <li><strong>Tracking:</strong> Meta Pixel placeholder (not yet active)</li>
          </ul>

          <h2>12. Version Summary</h2>
          <p>Current version includes: Brand polish pass (soft luxury identity), full contact system with email delivery, admin dashboard with enquiry management, self-updating admin manual with PDF export, QA report.</p>
          <p class="timestamp">Last updated: ${new Date().toLocaleString('en-GB')}</p>
        </body>
        </html>
      `);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    } catch {
      toast({ title: "Export Error", description: "Failed to generate PDF", variant: "destructive" });
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!session) {
    window.location.href = "/admin";
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Admin Manual | FutureCandy</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-background p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <a href="/admin">
              <Button variant="outline" size="sm" className="border-border">
                <ArrowLeft className="w-4 h-4 mr-2" /> Dashboard
              </Button>
            </a>
            <div>
              <h1 className="text-3xl font-bold">
                <span className="text-gradient">Admin Manual</span>
              </h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" /> Last updated: {new Date(lastUpdated).toLocaleString('en-GB')}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchStats} className="border-border">
              <RefreshCw className="w-4 h-4 mr-2" /> Refresh
            </Button>
            <Button size="sm" onClick={handleExportPDF} disabled={exporting} className="glow-pink">
              <Download className="w-4 h-4 mr-2" /> {exporting ? "Generating..." : "Download PDF"}
            </Button>
          </div>
        </div>

        <div ref={manualRef} className="max-w-4xl mx-auto space-y-8">
          {/* 1. System Overview */}
          <Card className="p-6 glass border-border">
            <h2 className="text-xl font-bold text-gradient mb-4">1. System Overview</h2>
            <p className="text-muted-foreground mb-3">
              <strong className="text-foreground">{SITE_CONFIG.name}</strong> — {SITE_CONFIG.tagline}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div><span className="text-muted-foreground">Published URL:</span> <span className="text-foreground">{SITE_CONFIG.publishedUrl}</span></div>
              <div><span className="text-muted-foreground">Admin Email:</span> <span className="text-foreground">{SITE_CONFIG.adminEmail}</span></div>
              <div><span className="text-muted-foreground">Company:</span> <span className="text-foreground">{SITE_CONFIG.company}</span></div>
              <div><span className="text-muted-foreground">Company No:</span> <span className="text-foreground">{SITE_CONFIG.companyNumber}</span></div>
              <div><span className="text-muted-foreground">Address:</span> <span className="text-foreground">{SITE_CONFIG.address}</span></div>
              <div><span className="text-muted-foreground">Artists:</span> <span className="text-foreground">{ARTISTS.join(", ")}</span></div>
            </div>
          </Card>

          {/* 2. Public Pages */}
          <Card className="p-6 glass border-border">
            <h2 className="text-xl font-bold text-gradient mb-4">2. Public Website Pages</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-muted-foreground font-semibold">Page</th>
                    <th className="text-left py-2 text-muted-foreground font-semibold">Path</th>
                    <th className="text-left py-2 text-muted-foreground font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {PUBLIC_PAGES.map((page) => (
                    <tr key={page.path} className="border-b border-border/50">
                      <td className="py-2 text-foreground font-medium">{page.name}</td>
                      <td className="py-2 text-candy-cyan font-mono text-xs">{page.path}</td>
                      <td className="py-2 text-muted-foreground">{page.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* 3. Admin Pages */}
          <Card className="p-6 glass border-border">
            <h2 className="text-xl font-bold text-gradient mb-4">3. Admin / Dashboard Pages</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-muted-foreground font-semibold">Page</th>
                    <th className="text-left py-2 text-muted-foreground font-semibold">Path</th>
                    <th className="text-left py-2 text-muted-foreground font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {ADMIN_PAGES.map((page) => (
                    <tr key={page.path} className="border-b border-border/50">
                      <td className="py-2 text-foreground font-medium">{page.name}</td>
                      <td className="py-2 text-candy-cyan font-mono text-xs">{page.path}</td>
                      <td className="py-2 text-muted-foreground">{page.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* 4. Navigation Map */}
          <Card className="p-6 glass border-border">
            <h2 className="text-xl font-bold text-gradient mb-4">4. Navigation Map</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p><strong className="text-foreground">Main Nav:</strong> Home, About, Artists, Visuals, Journal, Collab, Contact — visible on all public pages.</p>
              <p><strong className="text-foreground">Footer:</strong> Links to all legal pages, music platforms (Spotify, Apple Music, YouTube Music), and company info.</p>
              <p><strong className="text-foreground">Admin:</strong> Not linked from public site. Access via <span className="text-candy-cyan font-mono">/admin</span> directly. Dashboard links to Manual and QA Report.</p>
            </div>
          </Card>

          {/* 5. Content Management */}
          <Card className="p-6 glass border-border">
            <h2 className="text-xl font-bold text-gradient mb-4">5. Content Management</h2>
            <h3 className="text-foreground font-semibold mb-2">Enquiry Management (Live Stats)</h3>
            <div className="flex flex-wrap gap-3 mb-4">
              <Badge className="bg-muted text-foreground border border-border">{enquiryStats.total} Total</Badge>
              <Badge className="bg-candy-pink/20 text-candy-pink border border-candy-pink/30">{enquiryStats.new} New</Badge>
              <Badge className="bg-candy-cyan/20 text-candy-cyan border border-candy-cyan/30">{enquiryStats.read} Read</Badge>
              <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">{enquiryStats.replied} Replied</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Workflow: <strong className="text-foreground">New → Read → Replied</strong>. Update status from the enquiry detail panel in the dashboard.</p>
          </Card>

          {/* 6. Branding Updates */}
          <Card className="p-6 glass border-border">
            <h2 className="text-xl font-bold text-gradient mb-4">6. How to Update Branding, Text, Media & Links</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>All content is managed through the Lovable editor. Key files:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-foreground">Logo:</strong> <code className="text-candy-cyan">src/assets/futurecandy-logo-new.png</code></li>
                <li><strong className="text-foreground">Favicon:</strong> <code className="text-candy-cyan">public/favicon.png</code></li>
                <li><strong className="text-foreground">Hero Image:</strong> <code className="text-candy-cyan">src/assets/hero-visual.jpg</code></li>
                <li><strong className="text-foreground">Colours:</strong> CSS variables in <code className="text-candy-cyan">src/index.css</code></li>
                <li><strong className="text-foreground">Font:</strong> Space Grotesk via Google Fonts</li>
              </ul>
            </div>
          </Card>

          {/* 7. Forms */}
          <Card className="p-6 glass border-border">
            <h2 className="text-xl font-bold text-gradient mb-4">7. Forms & Submissions</h2>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Main contact form at <code className="text-candy-cyan">/contact</code>:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Required fields: Name, Email, Subject, Message</li>
                <li>Optional: Phone, Company</li>
                <li>hCaptcha verification (test key — replace for production)</li>
                <li>Honeypot spam trap (hidden field)</li>
                <li>Zod schema validation with inline errors</li>
                <li>Submissions stored in database + email sent to admin</li>
              </ul>
            </div>
          </Card>

          {/* 8. Roles */}
          <Card className="p-6 glass border-border">
            <h2 className="text-xl font-bold text-gradient mb-4">8. User Roles & Permissions</h2>
            <div className="text-sm text-muted-foreground space-y-2">
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-foreground">Public (anonymous):</strong> View all public pages, submit contact enquiries</li>
                <li><strong className="text-foreground">Authenticated (admin):</strong> View/manage enquiries, access dashboard, manual, QA report</li>
                <li><strong className="text-foreground">Primary admin:</strong> {SITE_CONFIG.adminEmail}</li>
              </ul>
              <p>Auth: Email/password sign-in. Admin pages redirect to login if unauthenticated.</p>
            </div>
          </Card>

          {/* 9. Automations */}
          <Card className="p-6 glass border-border">
            <h2 className="text-xl font-bold text-gradient mb-4">9. Automations & Workflows</h2>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Contact form → backend function → database insert + email notification</li>
              <li>Cookie consent banner on first visit</li>
              <li>Content protection (right-click/copy prevention) on public pages</li>
              <li>SEO metadata auto-applied per page</li>
              <li>Admin manual auto-populates from live config and database stats</li>
            </ul>
          </Card>

          {/* 10. Troubleshooting */}
          <Card className="p-6 glass border-border">
            <h2 className="text-xl font-bold text-gradient mb-4">10. Troubleshooting</h2>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li><strong className="text-foreground">Contact form not sending:</strong> Check backend function is deployed and email service secret is configured</li>
              <li><strong className="text-foreground">Can't log in:</strong> Verify account exists and email is confirmed</li>
              <li><strong className="text-foreground">Enquiries missing:</strong> Check database connection and RLS policies</li>
              <li><strong className="text-foreground">Favicon not updating:</strong> Clear browser cache or try incognito</li>
              <li><strong className="text-foreground">Styling broken:</strong> Check index.css variables and Tailwind config</li>
            </ul>
          </Card>

          {/* 11. Dependencies */}
          <Card className="p-6 glass border-border">
            <h2 className="text-xl font-bold text-gradient mb-4">11. Dependencies & Integrations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div><span className="text-muted-foreground">Hosting:</span> <span className="text-foreground">Lovable Cloud</span></div>
              <div><span className="text-muted-foreground">Database:</span> <span className="text-foreground">Lovable Cloud (PostgreSQL)</span></div>
              <div><span className="text-muted-foreground">Auth:</span> <span className="text-foreground">Lovable Cloud Auth</span></div>
              <div><span className="text-muted-foreground">Email:</span> <span className="text-foreground">Resend (backend function)</span></div>
              <div><span className="text-muted-foreground">CAPTCHA:</span> <span className="text-foreground">hCaptcha</span></div>
              <div><span className="text-muted-foreground">Fonts:</span> <span className="text-foreground">Google Fonts (Space Grotesk)</span></div>
              <div><span className="text-muted-foreground">Analytics:</span> <span className="text-foreground">GA4 (placeholder, not active)</span></div>
              <div><span className="text-muted-foreground">Tracking:</span> <span className="text-foreground">Meta Pixel (placeholder, not active)</span></div>
            </div>
          </Card>

          {/* 12. Version */}
          <Card className="p-6 glass border-border">
            <h2 className="text-xl font-bold text-gradient mb-4">12. Version & Release Notes</h2>
            <p className="text-sm text-muted-foreground mb-2">
              Current build includes: Soft luxury brand identity, full contact system with email delivery, admin dashboard with enquiry management, self-updating admin manual with PDF export, QA audit report.
            </p>
            <p className="text-xs text-muted-foreground/60">
              Last updated: {new Date(lastUpdated).toLocaleString('en-GB')}
            </p>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminManual;
