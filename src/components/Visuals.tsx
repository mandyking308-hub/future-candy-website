import visual1 from "@/assets/visual-1.jpg";
import visual2 from "@/assets/visual-2.jpg";

const Visuals = () => {
  const visuals = [
    {
      image: visual1,
      title: "Kaleidoscope Dreams",
      description: "Motion. Emotion. Explosion.",
    },
    {
      image: visual2,
      title: "Liquid Chrome",
      description: "See the Sound.",
    },
  ];

  return (
    <section id="visuals" className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-4">
          <span className="text-gradient">See the Sound.</span>
        </h2>
        <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
          Every track deserves a vision.
          <br />
          FutureCandy visuals are explosions of color and emotion — part music video, part dream sequence.
          <br />
          No avatars. No fake faces. Just pure energy in motion.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {visuals.map((visual, index) => (
            <div
              key={visual.title}
              className="group relative overflow-hidden rounded-lg cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="aspect-square relative">
                <img
                  src={visual.image}
                  alt={visual.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold text-gradient mb-2">
                    {visual.title}
                  </h3>
                  <p className="text-foreground/80">{visual.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Visuals;
