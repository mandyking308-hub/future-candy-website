import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const roadmap = [
  "Artist profiles",
  "Song catalogue",
  "Visual music videos",
  "YouTube-ready links",
  "Future Spotify / Apple Music links",
  "Licensing enquiries",
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
                  Production Engine
                </span>
                <h2
                  id="global-distribution-heading"
                  className="text-3xl md:text-4xl font-bold text-gradient leading-tight"
                >
                  Built for Releases, Ready for Distribution
                </h2>
              </div>

              <div className="space-y-3 text-sm md:text-base text-foreground/80 max-w-3xl">
                <p>
                  FutureCandy is being structured as a repeatable AI pop production engine: artists, songs, videos, releases, and enquiries in one place.
                </p>
                <p className="text-foreground/70">
                  Streaming platform links are intentionally parked for now. Spotify, Apple Music, iTunes, and other distribution links can be added when the catalogue and release schedule are ready.
                </p>
                <p className="text-candy-pink/90 font-medium">
                  Current focus: create, publish, learn, and repeat quickly.
                </p>
              </div>

              <div className="mt-6">
                <Link to="/music" aria-label="Explore the FutureCandy music catalogue">
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
                  {roadmap.map((p) => (
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