import { Music, Facebook, Instagram, Youtube } from "lucide-react";

const HYPERFOLLOW_URL =
  "https://distrokid.com/hyperfollow/velvettenoir/boom-in-my-step?ref=release";

const social = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61588811651986",
    Icon: Facebook,
    color: "text-candy-cyan hover:text-candy-cyan/80",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/neoncandyofficial/",
    Icon: Instagram,
    color: "text-candy-pink hover:text-candy-pink/80",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@neoncandyofficial",
    Icon: Youtube,
    color: "text-candy-violet hover:text-candy-violet/80",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@neoncandyofficial",
    Icon: Music,
    color: "text-foreground hover:text-candy-pink",
  },
];

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gradient mb-4">
            NeonCandy™
          </h3>
          <p className="text-xl text-muted-foreground mb-8">
            Pop Without Limits.
          </p>

          {/* Streaming / release access */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <a
              href={HYPERFOLLOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Listen or pre-save Boom in My Step (Streaming Link)"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-candy-pink to-candy-violet px-5 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:scale-[1.02] transition-transform"
            >
              <Music className="w-4 h-4" />
              Listen / Pre-save
            </a>
            <a
              href={HYPERFOLLOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify via release link"
              className="inline-flex items-center gap-2 rounded-full border border-candy-cyan/50 px-4 py-2 text-sm text-candy-cyan hover:bg-candy-cyan/10 transition-colors"
            >
              <Music className="w-4 h-4" />
              Spotify via Release Link
            </a>
            <a
              href={HYPERFOLLOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Apple Music via release link"
              className="inline-flex items-center gap-2 rounded-full border border-candy-violet/50 px-4 py-2 text-sm text-candy-violet hover:bg-candy-violet/10 transition-colors"
            >
              <Music className="w-4 h-4" />
              Apple Music via Release Link
            </a>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-4 mb-4">
            {social.map(({ name, href, Icon, color }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`NeonCandy on ${name}`}
                className={`flex items-center justify-center w-10 h-10 rounded-full border border-border/50 bg-background/40 transition-all hover:scale-110 ${color}`}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <p className="text-xs text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed mb-8">
            Current release: Boom in My Step — distributed across 150+ global
            digital music, streaming and social audio platforms from release day.
          </p>

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
              Translation and localization features of NeonCandy's productions are generated using supervised AI systems.
              Artistic adaptations may differ from literal linguistic equivalents. All works are reviewed for cultural respect
              and accuracy prior to release.
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 mb-4">
            <p className="text-sm text-muted-foreground">
              © 2025 NeonCandy. Born Digital. Made for the Future.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
              <span>🛡️ DMCA Protected</span>
              <span>|</span>
              <span>All Rights Reserved</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground/60 max-w-3xl mx-auto leading-relaxed">
            NeonCandy is operated by Global Solutions Management LLC, a company registered in Delaware, United States (File Number: 10420698).
          </p>
          <p className="text-xs text-muted-foreground/60 max-w-3xl mx-auto leading-relaxed mt-3">
            NeonCandy™ is a trade mark of Global Solutions Management LLC. © 2026 Global Solutions Management LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
