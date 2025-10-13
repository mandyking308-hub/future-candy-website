import { useState } from "react";

const Timeline = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const milestones = [
    { year: "2024", event: "Launch", description: "FutureCandy is born" },
    { year: "Mid 2024", event: "Project Velvette", description: "Pure pop energy unleashed" },
    { year: "Early 2025", event: "EchoNova Debut", description: "Dreamy electro emerges" },
    { year: "Mid 2025", event: "ByteBaby Chaos", description: "Experimental hyperpop arrives" },
    { year: "2026", event: "The Future", description: "Infinite possibilities ahead" },
  ];

  return (
    <div className="w-full overflow-x-auto py-8">
      <div className="flex gap-8 min-w-max px-4">
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className="flex flex-col items-center min-w-[200px] animate-fade-in cursor-pointer transition-transform hover:scale-110"
            style={{ animationDelay: `${index * 0.1}s` }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className={`w-16 h-16 rounded-full bg-gradient-candy flex items-center justify-center mb-4 transition-all ${hoveredIndex === index ? 'glow-pink scale-125 shadow-[0_0_30px_rgba(236,72,153,0.6)]' : 'glow-pink'}`}>
              <span className="text-xl font-bold text-white">{milestone.year}</span>
            </div>
            <h3 className={`text-xl font-bold mb-2 transition-colors ${hoveredIndex === index ? 'text-candy-pink' : 'text-gradient'}`}>
              {milestone.event}
            </h3>
            <p className={`text-sm text-center transition-all ${hoveredIndex === index ? 'text-foreground scale-105' : 'text-muted-foreground'}`}>
              {milestone.description}
            </p>
            {index < milestones.length - 1 && (
              <div className="absolute h-1 w-[200px] bg-gradient-neon top-8 left-[100px] -z-10" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
