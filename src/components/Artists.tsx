import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import christineWorld from "@/assets/christine-world.jpg";
import echoNovaWorld from "@/assets/echonova-world.jpg";

const Artists = () => {
  const projects = [
    {
      name: "Christine",
      description: "Candy pink chaos. Pop with a bite.",
      image: christineWorld,
      color: "candy-pink",
      spotify: "#",
      youtube: "#",
    },
    {
      name: "EchoNova",
      description: "Dreamy neon cloudscapes. Ethereal vibes.",
      image: echoNovaWorld,
      color: "candy-cyan",
      spotify: "#",
      youtube: "#",
    },
  ];

  return (
    <section id="artists" className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-4">
          <span className="text-gradient">Artists & Projects</span>
        </h2>
        <p className="text-xl text-center text-muted-foreground mb-16">
          Visual worlds. Sonic universes. No limits.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={project.name}
              className="group relative overflow-hidden border-2 hover:scale-105 transition-transform duration-300 cursor-pointer animate-fade-in"
              style={{ 
                animationDelay: `${index * 0.2}s`,
                borderColor: `hsl(var(--${project.color}) / 0.5)`,
              }}
            >
              <div className="aspect-square relative">
                <img
                  src={project.image}
                  alt={`${project.name} visual world`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-3xl font-bold mb-2" style={{ color: `hsl(var(--${project.color}))` }}>
                  {project.name}
                </h3>
                <p className="text-foreground/80 mb-4">{project.description}</p>
                
                <div className="flex gap-4">
                  <a
                    href={project.spotify}
                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                  >
                    Spotify <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href={project.youtube}
                    className="flex items-center gap-2 text-sm hover:text-secondary transition-colors"
                  >
                    YouTube <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Artists;
