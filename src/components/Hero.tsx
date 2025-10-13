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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-28">
      {/* Hero Background Image - Optimized for all devices */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${heroVisual})`,
          backgroundPosition: 'center 30%',
          filter: 'brightness(0.6) contrast(1.1)',
        }}
      />
      
      {/* Gradient Overlays for Better Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-candy-pink/10 via-candy-violet/10 to-candy-cyan/10 animate-gradient-shift" />
      
      {/* Ambient Glow Effect */}
      <div className="absolute inset-0 ambient-glow opacity-30" style={{ 
        background: 'radial-gradient(circle at 50% 50%, hsl(var(--candy-pink) / 0.4), hsl(var(--candy-violet) / 0.3), transparent 70%)'
      }} />
      
      {/* Content - Properly spaced from navigation */}
      <div className="relative z-10 container mx-auto px-4 text-center py-12 md:py-0">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 animate-fade-in">
          <span className="text-gradient drop-shadow-[0_0_30px_rgba(236,72,153,0.5)]">FutureCandy</span>
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-3 md:mb-4 text-foreground/95 animate-fade-in drop-shadow-lg" style={{ animationDelay: "0.2s" }}>
          Sweet Beats. Synthetic Dreams.
        </p>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 text-foreground/90 animate-fade-in max-w-2xl mx-auto drop-shadow-md leading-relaxed" style={{ animationDelay: "0.4s" }}>
          The future of pop isn&apos;t human — it&apos;s energy, color, and sound.
          <br className="hidden sm:block" />
          <span className="block sm:inline"> We make tracks that melt your brain and move your heart.</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center animate-fade-in px-4" style={{ animationDelay: "0.6s" }}>
          <a href="#about" onClick={scrollToSection} className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto glow-pink gap-2 text-base md:text-lg px-6 md:px-8 py-5 md:py-6 bg-gradient-to-r from-candy-pink to-candy-violet hover:scale-105 transition-transform shadow-[0_0_30px_rgba(236,72,153,0.6)] font-semibold">
              Enter the World
            </Button>
          </a>
          <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto gap-2 text-base md:text-lg px-6 md:px-8 py-5 md:py-6 bg-candy-cyan/20 border-2 border-candy-cyan text-candy-cyan hover:bg-candy-cyan hover:text-background transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              <Music className="w-4 h-4 md:w-5 md:h-5" />
              Listen on Spotify
            </Button>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 text-base md:text-lg px-6 md:px-8 py-5 md:py-6 border-2 border-candy-violet text-candy-violet hover:bg-candy-violet hover:text-background transition-all shadow-[0_0_20px_rgba(167,139,250,0.4)]">
              <Video className="w-4 h-4 md:w-5 md:h-5" />
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

      {/* Floating Elements - Adjusted positions for better visibility */}
      <div className="absolute top-24 md:top-32 left-5 md:left-10 w-3 h-3 md:w-4 md:h-4 bg-candy-pink rounded-full glow-pink animate-float" />
      <div className="absolute bottom-16 md:bottom-20 right-10 md:right-20 w-4 h-4 md:w-6 md:h-6 bg-candy-cyan rounded-full glow-cyan animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-32 md:top-40 right-20 md:right-40 w-2 h-2 md:w-3 md:h-3 bg-candy-violet rounded-full glow-violet animate-float" style={{ animationDelay: "2s" }} />
    </section>
  );
};

export default Hero;
