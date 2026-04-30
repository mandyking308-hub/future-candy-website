const HYPERFOLLOW_URL =
  "https://distrokid.com/hyperfollow/velvettenoir/boom-in-my-step?ref=release";

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

const CurrentRelease = () => {
  return (
    <section
      id="current-release"
      aria-labelledby="current-release-heading"
      className="py-16 md:py-20 bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative glass rounded-2xl border border-candy-pink/30 p-6 md:p-10 overflow-hidden shadow-[0_0_40px_rgba(236,72,153,0.15)]">
            {/* Soft gradient highlight */}
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
                <span
                  id="current-release-heading"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-candy-cyan"
                >
                  <span className="w-2 h-2 rounded-full bg-candy-cyan animate-pulse glow-cyan" />
                  Current Release
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gradient leading-tight">
                  Boom in My Step
                </h2>
                <p className="text-base md:text-lg text-foreground/80">
                  Velvette Noir
                </p>
              </div>

              <div className="space-y-3 text-sm md:text-base text-foreground/80 max-w-3xl">
                <p>
                  Boom in My Step is NeonCandy&apos;s current release, delivered
                  across 150+ digital music, streaming and social audio
                  platforms worldwide.
                </p>
                <p className="text-foreground/70">
                  From release day, listeners can access NeonCandy through major
                  platforms including Spotify, Apple Music, iTunes, Amazon
                  Music, YouTube Music, TikTok, Instagram/Facebook, Deezer,
                  TIDAL, Pandora, iHeartRadio and more.
                </p>
                <p className="text-candy-pink/90 font-medium">
                  New visual music drops arrive monthly.
                </p>
              </div>

              {/* CTA */}
              <div className="mt-6">
                <a
                  href={HYPERFOLLOW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Listen or pre-save Boom in My Step on the official release link"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base font-semibold bg-gradient-to-r from-candy-pink to-candy-violet text-white shadow-[0_0_25px_rgba(236,72,153,0.45)] hover:scale-[1.02] transition-transform"
                >
                  Listen / Pre-save Boom in My Step
                </a>
              </div>

              {/* Platform pills */}
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
                <p className="mt-3 text-xs text-muted-foreground/80">
                  More platforms appear through the release link as the release
                  becomes available globally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentRelease;
