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

          <div className="mb-8">
            <h4 className="text-sm font-semibold text-candy-cyan mb-3">Legal Hub</h4>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="/terms" className="text-muted-foreground hover:text-candy-pink transition-colors">
                Terms of Use
              </a>
              <span className="text-muted-foreground/30">|</span>
              <a href="/privacy" className="text-muted-foreground hover:text-candy-pink transition-colors">
                Privacy Policy
              </a>
              <span className="text-muted-foreground/30">|</span>
              <a href="/digital-licensing" className="text-muted-foreground hover:text-candy-pink transition-colors">
                Digital Licensing
              </a>
              <span className="text-muted-foreground/30">|</span>
              <a href="/refund-policy" className="text-muted-foreground hover:text-candy-pink transition-colors">
                Refund Policy
              </a>
              <span className="text-muted-foreground/30">|</span>
              <a href="/cookies" className="text-muted-foreground hover:text-candy-pink transition-colors">
                Cookies Policy
              </a>
              <span className="text-muted-foreground/30">|</span>
              <a href="/modern-slavery" className="text-muted-foreground hover:text-candy-pink transition-colors">
                Modern Slavery Statement
              </a>
              <span className="text-muted-foreground/30">|</span>
              <a href="/global-licensing" className="text-muted-foreground hover:text-candy-pink transition-colors">
                Global Licensing
              </a>
              <span className="text-muted-foreground/30">|</span>
              <a href="/multilingual-rights" className="text-muted-foreground hover:text-candy-pink transition-colors">
                Multilingual Rights
              </a>
            </div>
          </div>
          
          <div className="mb-6 max-w-3xl mx-auto">
            <p className="text-xs text-muted-foreground/60 leading-relaxed">
              Translation and localization features of FutureCandy's productions are generated using supervised AI systems. 
              Artistic adaptations may differ from literal linguistic equivalents. All works are reviewed for cultural respect 
              and accuracy prior to release.
            </p>
          </div>
          
          <p className="text-sm text-muted-foreground mb-2">
            © 2025 FutureCandy. Born Digital. Made for the Future.
          </p>
          <p className="text-xs text-muted-foreground/60">
            A subsidiary of HEALTH CHOICES GLOBAL LIMITED | Company No. 10941962 | 128 City Road, London, EC1V 2NX
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
