import { Music, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gradient mb-4">
            FutureCandy™
          </h3>
          <p className="text-xl text-muted-foreground mb-8">
            AI Pop for the Future.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <a
              href="/music"
              aria-label="Explore the FutureCandy music catalogue"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-candy-pink to-candy-violet px-5 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:scale-[1.02] transition-transform"
            >
              <Music className="w-4 h-4" />
              Music
            </a>
            <a
              href="/contact"
              aria-label="Contact FutureCandy"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-5 py-2 text-sm font-semibold text-foreground hover:border-candy-pink/60 hover:text-candy-pink transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contact
            </a>
          </div>

          <p className="text-xs text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed mb-8">
            FutureCandy creates AI-powered visual pop, digital-first artists, and future-facing music content. External streaming and social links will be added once the catalogue is ready.
          </p>

          <div className="mb-8">
            <h4 className="text-sm font-semibold text-candy-cyan mb-3">Legal Hub</h4>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="/terms" className="text-muted-foreground hover:text-candy-pink transition-colors">Terms of Use</a>
              <span className="text-muted-foreground/30">|</span>
              <a href="/privacy" className="text-muted-foreground hover:text-candy-pink transition-colors">Privacy Policy</a>
              <span className="text-muted-foreground/30">|</span>
              <a href="/digital-licensing" className="text-muted-foreground hover:text-candy-pink transition-colors">Digital Licensing</a>
              <span className="text-muted-foreground/30">|</span>
              <a href="/refund-policy" className="text-muted-foreground hover:text-candy-pink transition-colors">Refund Policy</a>
              <span className="text-muted-foreground/30">|</span>
              <a href="/cookies" className="text-muted-foreground hover:text-candy-pink transition-colors">Cookies Policy</a>
              <span className="text-muted-foreground/30">|</span>
              <a href="/global-licensing" className="text-muted-foreground hover:text-candy-pink transition-colors">Global Licensing</a>
              <span className="text-muted-foreground/30">|</span>
              <a href="/multilingual-rights" className="text-muted-foreground hover:text-candy-pink transition-colors">Multilingual Rights</a>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 mb-4">
            <p className="text-sm text-muted-foreground">
              © 2026 FutureCandy. Born Digital. Made for the Future.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
              <span>All Rights Reserved</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground/60 max-w-3xl mx-auto leading-relaxed">
            FutureCandy is operated by Global Solutions Management LLC, a company registered in Delaware, United States (File Number: 10420698).
          </p>
          <p className="text-xs text-muted-foreground/60 max-w-3xl mx-auto leading-relaxed mt-3">
            FutureCandy™ is a trade mark of Global Solutions Management LLC. © 2026 Global Solutions Management LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;