import { Music } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gradient mb-4">
            FutureCandy
          </h3>
          <p className="text-xl text-muted-foreground mb-8">
            Pop Without Limits.
          </p>
          
          <div className="flex justify-center gap-8 mb-8">
            <a
              href="#"
              className="flex items-center gap-2 text-candy-cyan hover:text-candy-cyan/80 transition-colors"
            >
              <Music className="w-5 h-5" />
              Spotify
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-candy-violet hover:text-candy-violet/80 transition-colors"
            >
              <Music className="w-5 h-5" />
              Apple Music
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-candy-pink hover:text-candy-pink/80 transition-colors"
            >
              <Music className="w-5 h-5" />
              YouTube Music
            </a>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © 2025 FutureCandy. Born Digital. Made for the Future.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
