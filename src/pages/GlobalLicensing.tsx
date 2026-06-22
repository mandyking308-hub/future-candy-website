import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe, Mail, ShieldCheck } from "lucide-react";

const GlobalLicensing = () => {
  return (
    <div className="min-h-screen page-transition">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <Globe className="w-16 h-16 mx-auto mb-6 text-candy-cyan" />
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              Global Licensing
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Request regional, language-specific, brand, film, or media licensing conversations for FutureCandy productions.
            </p>
          </div>

          <Card className="glass p-8 rounded-lg border-candy-pink/30 mb-8">
            <h2 className="text-2xl font-bold text-candy-cyan mb-4">Submit a Real Enquiry</h2>
            <p className="text-muted-foreground mb-6">
              This page no longer uses a local placeholder form. All licensing requests now go through the live enquiry system so your details are stored securely in the admin dashboard.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="/collab/enquire">
                <Button size="lg" className="w-full glow-pink gap-2">
                  <Mail className="w-4 h-4" />
                  Partnership / Licensing Enquiry
                </Button>
              </a>
              <a href="/contact">
                <Button size="lg" variant="outline" className="w-full border-candy-cyan/50 text-candy-cyan hover:bg-candy-cyan/10 gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  General Contact Form
                </Button>
              </a>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card className="glass p-6 border-candy-cyan/20">
              <h3 className="text-lg font-bold text-candy-cyan mb-2">Film & Media</h3>
              <p className="text-sm text-muted-foreground">Music and visual pop assets for campaigns, short-form video, film, and digital projects.</p>
            </Card>
            <Card className="glass p-6 border-candy-pink/20">
              <h3 className="text-lg font-bold text-candy-pink mb-2">Brand Projects</h3>
              <p className="text-sm text-muted-foreground">AI-assisted sound, artist worlds, and campaign-ready visual music concepts.</p>
            </Card>
            <Card className="glass p-6 border-candy-violet/20">
              <h3 className="text-lg font-bold text-candy-violet mb-2">Language Versions</h3>
              <p className="text-sm text-muted-foreground">Future regional and multilingual versions can be discussed once release assets are ready.</p>
            </Card>
          </div>

          <Card className="glass p-6 rounded-lg">
            <h3 className="text-xl font-bold text-candy-violet mb-3">What Happens Next?</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Your request is saved in the admin dashboard.</li>
              <li>• The team can mark it as new, read, or replied.</li>
              <li>• Licensing links and distribution references will only be added when release assets are ready.</li>
            </ul>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GlobalLicensing;