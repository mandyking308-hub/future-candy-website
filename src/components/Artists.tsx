import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import christineWorld from "@/assets/christine-world.jpg";
import echoNovaWorld from "@/assets/echonova-world.jpg";
import byteBabyWorld from "@/assets/bytebaby-world.jpg";
import { useState } from "react";

const Artists = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const projects = [
    {
      name: "Christine",
      description: "Pop attitude. Hooks that bite. Pure energy.",
      image: christineWorld,
      color: "candy-pink",
      flavor: "Bold",
      spotify: "https://open.spotify.com",
      youtube: "https://youtube.com",
    },
    {
      name: "EchoNova",
      description: "Dreamy electro and cinematic emotion.",
      image: echoNovaWorld,
      color: "candy-cyan",
      flavor: "Dreamy",
      spotify: "https://open.spotify.com",
      youtube: "https://youtube.com",
    },
    {
      name: "ByteBaby",
      description: "Experimental beats and hyperpop chaos.",
      image: byteBabyWorld,
      color: "candy-violet",
      flavor: "Experimental",
      spotify: "https://open.spotify.com",
      youtube: "https://youtube.com",
    },
  ];

  const flavors = ["All", "Dreamy", "Bold", "Experimental"];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.flavor === activeFilter);

  return (
    <section id="artists" className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-4">
          <span className="text-gradient">Meet the Sounds of FutureCandy</span>
        </h2>
        <p className="text-xl text-center text-muted-foreground mb-16">
          We don&apos;t do artists — we do experiences.
          <br />
          Each project is a world: a flavor, a mood, a vibe.
        </p>

        {/* Filter by Flavor */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {flavors.map((flavor) => (
            <Button
              key={flavor}
              onClick={() => setActiveFilter(flavor)}
              variant={activeFilter === flavor ? "default" : "outline"}
              className={`transition-all ${
                activeFilter === flavor 
                  ? "bg-gradient-to-r from-candy-pink to-candy-violet shadow-[0_0_20px_rgba(236,72,153,0.5)]" 
                  : "border-candy-cyan/50 text-candy-cyan hover:bg-candy-cyan/10"
              }`}
            >
              {flavor}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.name}
              className="group relative overflow-hidden border-2 hover:scale-105 hover:shadow-[0_0_40px_rgba(236,72,153,0.4)] transition-all duration-300 cursor-pointer animate-fade-in glass"
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
