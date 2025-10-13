import { Music } from "lucide-react";
import { Card } from "@/components/ui/card";

const NowPlaying = () => {
  return (
    <Card className="glass fixed bottom-8 right-8 p-4 flex items-center gap-3 animate-slide-up z-40 border-candy-pink/30">
      <div className="w-12 h-12 bg-gradient-candy rounded-lg flex items-center justify-center glow-pink">
        <Music className="w-6 h-6 text-white animate-glow-pulse" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">Now Playing</span>
        <a 
          href="#" 
          className="text-sm font-semibold text-foreground hover:text-candy-pink transition-colors"
        >
          Latest Release
        </a>
      </div>
    </Card>
  );
};

export default NowPlaying;
