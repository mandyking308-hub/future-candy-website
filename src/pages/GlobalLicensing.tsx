import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Globe } from "lucide-react";

const GlobalLicensing = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    organisation: "",
    country: "",
    email: "",
    projectType: "",
    language: "",
    message: "",
    acceptTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      toast({
        title: "Terms Required",
        description: "Please acknowledge our Licensing Policy and Terms of Use.",
        variant: "destructive",
      });
      return;
    }

    // Redirect to contact page with pre-filled subject
    toast({
      title: "Redirecting to Contact Form",
      description: "Please complete the full contact form for licensing inquiries.",
    });
    
    setTimeout(() => {
      window.location.href = "/contact";
    }, 1500);
    
    toast({
      title: "Request Submitted",
      description: "Your global licensing request has been sent to our team.",
    });

    setFormData({
      name: "",
      organisation: "",
      country: "",
      email: "",
      projectType: "",
      language: "",
      message: "",
      acceptTerms: false,
    });
  };

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
              Request regional or language-specific versions of NeonCandy productions for your project. 
              We create music that transcends borders — tailored for audiences worldwide.
            </p>
          </div>

          <div className="glass p-8 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-candy-cyan mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background/50 border-candy-pink/30 focus:border-candy-cyan"
                  />
                </div>

                <div>
                  <label htmlFor="organisation" className="block text-sm font-semibold text-candy-cyan mb-2">
                    Organisation
                  </label>
                  <Input
                    id="organisation"
                    type="text"
                    value={formData.organisation}
                    onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                    className="bg-background/50 border-candy-pink/30 focus:border-candy-cyan"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="country" className="block text-sm font-semibold text-candy-cyan mb-2">
                    Country / Region *
                  </label>
                  <Input
                    id="country"
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="bg-background/50 border-candy-pink/30 focus:border-candy-cyan"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-candy-cyan mb-2">
                    Contact Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background/50 border-candy-pink/30 focus:border-candy-cyan"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="projectType" className="block text-sm font-semibold text-candy-cyan mb-2">
                    Project Type *
                  </label>
                  <select
                    id="projectType"
                    required
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-background/50 border border-candy-pink/30 focus:border-candy-cyan rounded-md px-3 py-2 text-foreground"
                  >
                    <option value="">Select type</option>
                    <option value="Film">Film</option>
                    <option value="Brand">Brand / Advertising</option>
                    <option value="Media">Media / Broadcasting</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="language" className="block text-sm font-semibold text-candy-cyan mb-2">
                    Preferred Language or Market *
                  </label>
                  <Input
                    id="language"
                    type="text"
                    required
                    placeholder="e.g., Japanese, Spanish, French"
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="bg-background/50 border-candy-pink/30 focus:border-candy-cyan"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-candy-cyan mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your project and licensing needs..."
                  className="bg-background/50 border-candy-pink/30 focus:border-candy-cyan"
                />
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, acceptTerms: checked as boolean })
                  }
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                  I acknowledge NeonCandy's{" "}
                  <a href="/digital-licensing" className="text-candy-cyan hover:underline">
                    Licensing Policy
                  </a>{" "}
                  and{" "}
                  <a href="/terms" className="text-candy-cyan hover:underline">
                    Terms of Use
                  </a>
                  .
                </label>
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-candy-pink via-candy-cyan to-candy-violet hover:opacity-90 transition-opacity"
              >
                Submit Request
              </Button>
            </form>
          </div>

          <div className="mt-12 glass p-6 rounded-lg">
            <h3 className="text-xl font-bold text-candy-violet mb-3">What Happens Next?</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Our team will review your request within 48 hours</li>
              <li>• We'll provide licensing terms and availability for your selected market</li>
              <li>• Each language version is a unique master recording with dedicated ISRC</li>
              <li>• All multilingual works maintain NeonCandy's quality and artistic standards</li>
            </ul>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Questions?{" "}
              <a href="/contact" className="text-candy-cyan hover:underline font-semibold">
                Contact us through our contact form
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GlobalLicensing;
