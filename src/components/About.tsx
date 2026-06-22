import Timeline from "./Timeline";

const About = () => {
  return (
    <section id="about" className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="text-gradient">Born Digital.</span>
            <br />
            Made for the Future.
          </h2>
          
          <div className="space-y-6 text-lg md:text-xl text-foreground/80">
            <p>
              FutureCandy is a digital-first AI pop studio.
              <br />
              We build artists, songs, videos, and visual worlds quickly.
            </p>
            <p>
              Our music is built by creative direction, amplified by AI tools, and shaped for a world that never stops scrolling.
            </p>
            <p>
              Every hook, visual, and character is treated as part of a repeatable content engine.
            </p>
            <p className="text-2xl font-semibold text-gradient">
              We make the future sound like fun.
            </p>
          </div>

          <div className="mt-16 p-8 glass rounded-lg border border-candy-violet/30">
            <h3 className="text-3xl font-bold text-gradient mb-6">Our Philosophy</h3>
            <p className="text-lg text-foreground/80 leading-relaxed">
              We believe creativity should be fast, visual, emotional, and scalable. FutureCandy is a live production lab for AI-powered pop, artist identities, and release-ready media.
            </p>
          </div>

          <div className="mt-12 p-8 glass rounded-lg border border-candy-pink/30">
            <h3 className="text-3xl font-bold text-gradient mb-6">Music Without Borders.</h3>
            <p className="text-lg text-foreground/80 leading-relaxed mb-4">
              FutureCandy is designed for global audiences from day one, with artist profiles, songs, and visuals structured for future distribution and licensing.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed mb-4">
              Every track can grow into video, social cuts, licensing assets, and later streaming links.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              The system is built to move fast now and connect to wider distribution when the catalogue is ready.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="relative w-32 h-32 animate-[spin_20s_linear_infinite]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-candy-pink via-candy-cyan to-candy-violet opacity-30 blur-xl"></div>
                <div className="absolute inset-4 rounded-full bg-gradient-to-r from-candy-violet via-candy-pink to-candy-cyan opacity-50"></div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-card rounded-lg border border-candy-pink/30 glow-pink">
              <h3 className="text-2xl font-bold text-candy-pink mb-2">Digital First</h3>
              <p className="text-foreground/70">Created in the cloud, designed for fast output</p>
            </div>
            <div className="p-6 bg-card rounded-lg border border-candy-cyan/30 glow-cyan">
              <h3 className="text-2xl font-bold text-candy-cyan mb-2">Pop Reimagined</h3>
              <p className="text-foreground/70">Familiar feelings, futuristic visuals</p>
            </div>
            <div className="p-6 bg-card rounded-lg border border-candy-violet/30 glow-violet">
              <h3 className="text-2xl font-bold text-candy-violet mb-2">Always Evolving</h3>
              <p className="text-foreground/70">Every release teaches the engine what works next</p>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-3xl font-bold text-gradient mb-8">Timeline of Creation</h3>
            <Timeline />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;