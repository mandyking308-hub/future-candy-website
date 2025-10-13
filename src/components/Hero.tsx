import { Button } from "@/components/ui/button";
import { Music, Video } from "lucide-react";
import heroVisual from "@/assets/hero-visual.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${heroVisual})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
          <span className="text-gradient">FutureCandy</span>
        </h1>
        <p className="text-2xl md:text-4xl mb-4 text-foreground/90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Sweet Beats. Synthetic Dreams.
        </p>
        <p className="text-xl md:text-2xl mb-12 text-muted-foreground animate-fade-in max-w-2xl mx-auto" style={{ animationDelay: "0.4s" }}>
          The future of pop isn&apos;t human — it&apos;s energy, color, and sound.
          <br />
          We make tracks that melt your brain and move your heart.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <Button size="lg" className="glow-pink gap-2 text-lg px-8">
            <Music className="w-5 h-5" />
            Listen on Spotify
          </Button>
          <Button size="lg" variant="outline" className="gap-2 text-lg px-8 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
            <Video className="w-5 h-5" />
            Watch on YouTube
          </Button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-candy-pink rounded-full glow-pink animate-float" />
      <div className="absolute bottom-20 right-20 w-6 h-6 bg-candy-cyan rounded-full glow-cyan animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-40 right-40 w-3 h-3 bg-candy-violet rounded-full glow-violet animate-float" style={{ animationDelay: "2s" }} />
    </section>
  );
};

export default Hero;
