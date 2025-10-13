import { Button } from "@/components/ui/button";
import { Music, Video, Volume2, VolumeX } from "lucide-react";
import heroVisual from "@/assets/hero-visual.jpg";
import { useState, useRef, useEffect } from "react";

const Hero = () => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create ambient audio element (placeholder - user would need to add actual audio file)
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          console.log("Audio playback requires user interaction");
        });
      }
      setAudioPlaying(!audioPlaying);
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#about');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background with Ambient Glow */}
      <div className="absolute inset-0 ambient-glow opacity-50" style={{ 
        background: 'linear-gradient(135deg, hsl(var(--candy-pink) / 0.3), hsl(var(--candy-violet) / 0.3), hsl(var(--candy-cyan) / 0.3))'
      }} />
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
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
          <a href="#about" onClick={scrollToSection}>
            <Button size="lg" className="glow-pink gap-2 text-lg px-8 py-6 bg-gradient-to-r from-candy-pink to-candy-violet hover:scale-105 transition-transform shadow-[0_0_30px_rgba(236,72,153,0.5)]">
              Enter the World
            </Button>
          </a>
          <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-candy-cyan/20 border-2 border-candy-cyan text-candy-cyan hover:bg-candy-cyan hover:text-background transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              <Music className="w-5 h-5" />
              Listen on Spotify
            </Button>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6 border-2 border-candy-violet text-candy-violet hover:bg-candy-violet hover:text-background transition-all shadow-[0_0_20px_rgba(167,139,250,0.3)]">
              <Video className="w-5 h-5" />
              Watch on YouTube
            </Button>
          </a>
        </div>

        {/* Ambient Sound Toggle */}
        <div className="mt-8 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <Button
            onClick={toggleAudio}
            variant="ghost"
            size="sm"
            className="gap-2 text-sm text-muted-foreground hover:text-candy-cyan transition-colors"
          >
            {audioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            {audioPlaying ? "Ambient Sound On" : "Ambient Sound Off"}
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
