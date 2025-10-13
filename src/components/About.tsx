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
              We're not here to fit in. We're here to remix reality.
            </p>
            <p>
              FutureCandy makes pop that bites — crafted by digital minds and human hearts. 
              Every track is a new flavor, every sound is an adventure into what's next.
            </p>
            <p className="text-2xl font-semibold text-gradient">
              "We're not just making music. We're making the future sound like fun."
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-card rounded-lg border border-candy-pink/30 glow-pink">
              <h3 className="text-2xl font-bold text-candy-pink mb-2">Digital First</h3>
              <p className="text-foreground/70">Created in the cloud, designed for infinite possibilities</p>
            </div>
            <div className="p-6 bg-card rounded-lg border border-candy-cyan/30 glow-cyan">
              <h3 className="text-2xl font-bold text-candy-cyan mb-2">Pop Reimagined</h3>
              <p className="text-foreground/70">Familiar feelings, futuristic sounds</p>
            </div>
            <div className="p-6 bg-card rounded-lg border border-candy-violet/30 glow-violet">
              <h3 className="text-2xl font-bold text-candy-violet mb-2">Always Evolving</h3>
              <p className="text-foreground/70">Every release pushes boundaries further</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
