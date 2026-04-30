import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const platforms = [
  "Spotify",
  "Apple Music",
  "iTunes",
  "Amazon Music",
  "YouTube Music",
  "TikTok",
  "Instagram/Facebook",
  "Deezer",
  "TIDAL",
  "Pandora",
  "iHeartRadio",
];

const GlobalDistribution = () => {
  return (
    <section
      id="global-distribution"
      aria-labelledby="global-distribution-heading"
      className="py-16 md:py-20 bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative glass rounded-2xl border border-candy-pink/30 p-6 md:p-10 overflow-hidden shadow-[0_0_40px_rgba(236,72,153,0.15)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-40"
              style={{
                background:
                  "radial-gradient(circle at 20% 0%, hsl(var(--candy-pink) / 0.25), transparent 50%), radial-gradient(circle at 100% 100%, hsl(var(--candy-violet) / 0.2), transparent 55%)",
              }}
            />

            <div className="relative">
              <div className="flex flex-col items-start gap-2 mb-6">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-candy-cyan">
                  <span className="w-2 h-2 rounded-full bg-candy-cyan animate-pulse glow-cyan" />
                  Worldwide
                </span>
                <h2
                  id="global-distribution-heading"
                  className="text-3xl md:text-4xl font-bold text-gradient leading-tight"
                >
                  Global Music Distribution
                </h2>
              </div>

              <div className="space-y-3 text-sm md:text-base text-foreground/80 max-w-3xl">
                <p>
                  NeonCandy releases visual pop and dance music across major
                  digital music, streaming and social audio platforms worldwide.
                </p>
                <p className="text-foreground/70">
                  NeonCandy drops are distributed across 150+ platforms,
                  including Spotify, Apple Music, iTunes, Amazon Music, YouTube
                  Music, TikTok, Instagram/Facebook, Deezer, TIDAL, Pandora,
                  iHeartRadio and more.
                </p>
                <p className="text-candy-pink/90 font-medium">
                  New visual music drops arrive monthly.
                </p>
              </div>

              <div className="mt-6">
                <Link to="/music" aria-label="Explore the NeonCandy music catalogue">
                  <Button
                    size="lg"
                    className="rounded-full px-6 py-3 text-sm md:text-base font-semibold bg-gradient-to-r from-candy-pink to-candy-violet text-white shadow-[0_0_25px_rgba(236,72,153,0.45)] hover:scale-[1.02] transition-transform"
                  >
                    Explore the Music
                  </Button>
                </Link>
              </div>

              <div className="mt-8">
                <div className="flex flex-wrap gap-2">
                  {platforms.map((p) => (
                    <span
                      key={p}
                      className="inline-flex items-center rounded-full border border-border/60 bg-card/40 backdrop-blur px-3 py-1 text-xs font-medium text-foreground/85 hover:border-candy-cyan/50 hover:text-candy-cyan transition-colors"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalDistribution;
