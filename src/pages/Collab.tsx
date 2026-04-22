import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Briefcase, Film, Palette } from "lucide-react";
import ContentProtection from "@/components/ContentProtection";
import { Helmet } from "react-helmet";

const Collab = () => {
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
        <title>Licensing & Collaboration | NeonCandy</title>
        <meta name="description" content="License NeonCandy's AI-powered pop music for film, brands, and digital experiences. Custom sonic identities and creative partnerships." />
        <link rel="canonical" href="https://neoncandy.online/collab" />
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
                    <div className="w-12 h-12 bg-gradient-neon rounded-full flex items-center justify-center glow-cyan mb-4">
                      <Icon className="w-6 h-6 text-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-candy-cyan">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </Card>
                );
              })}
            </div>

            <div className="text-center">
              <p className="text-lg text-muted-foreground mb-8">
                Interested in working together? Send us a partnership or collaboration enquiry.
              </p>
              <a href="/collab/enquire">
                <Button size="lg" className="glow-pink text-lg px-8">
                  Get in Touch
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </>
  );
};

export default Collab;
