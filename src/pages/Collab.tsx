import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Briefcase, Film, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ContentProtection from "@/components/ContentProtection";
import { Helmet } from "react-helmet";

const Collab = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    purpose: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll review your collaboration proposal and get back to you soon.",
    });
    setFormData({ name: "", email: "", project: "", purpose: "", message: "" });
  };

  const features = [
    {
      icon: Film,
      title: "Film & Media",
      description: "Cinematic soundtracks for visual storytelling",
    },
    {
      icon: Palette,
      title: "Digital Experiences",
      description: "Interactive installations and immersive projects",
    },
    {
      icon: Briefcase,
      title: "Brand Partnerships",
      description: "Custom sonic identities and campaign music",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Licensing & Collaboration | FutureCandy</title>
        <meta name="description" content="License FutureCandy's AI-powered pop music for film, brands, and digital experiences. Custom sonic identities and creative partnerships." />
        <link rel="canonical" href="https://futurecandy.lovable.app/collab" />
      </Helmet>
      <ContentProtection />
      <div className="min-h-screen page-transition">
        <Navigation />
      
      <section className="pt-32 pb-24 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold text-center mb-6">
              <span className="text-gradient">Licensing & Collaboration</span>
            </h1>
            <p className="text-xl text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              We work with creators, studios, and brands to license our sound.
              <br />
              For film, design, or digital experiences, reach out directly.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={index}
                    className="p-6 glass border-candy-cyan/30 hover:border-candy-cyan/50 transition-all animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 bg-gradient-neon rounded-lg flex items-center justify-center glow-cyan mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-candy-cyan">{feature.title}</h3>
                    <p className="text-foreground/70">{feature.description}</p>
                  </Card>
                );
              })}
            </div>

            <Card className="p-8 glass border-candy-pink/30 glow-pink">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-background/50 border-candy-pink/30 focus:border-candy-pink"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-background/50 border-candy-pink/30 focus:border-candy-pink"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Project Name</label>
                    <Input
                      value={formData.project}
                      onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                      required
                      className="bg-background/50 border-candy-pink/30 focus:border-candy-pink"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Purpose</label>
                    <Input
                      value={formData.purpose}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                      placeholder="e.g., Film, Brand Campaign, Installation"
                      required
                      className="bg-background/50 border-candy-pink/30 focus:border-candy-pink"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your vision..."
                    required
                    rows={6}
                    className="bg-background/50 border-candy-pink/30 focus:border-candy-pink"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full glow-pink">
                  Submit Proposal
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </>
  );
};

export default Collab;
