const Timeline = () => {
  const milestones = [
    { year: "2025", event: "Launch", description: "FutureCandy is born" },
    { year: "2025", event: "Project Christine", description: "Pure pop energy unleashed" },
    { year: "2025", event: "EchoNova Debut", description: "Dreamy electro emerges" },
    { year: "2026", event: "ByteBaby Chaos", description: "Experimental hyperpop arrives" },
    { year: "2026", event: "The Future", description: "Infinite possibilities ahead" },
  ];

  return (
    <div className="w-full overflow-x-auto py-8">
      <div className="flex gap-8 min-w-max px-4">
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className="flex flex-col items-center min-w-[200px] animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-candy flex items-center justify-center glow-pink mb-4">
              <span className="text-xl font-bold text-white">{milestone.year}</span>
            </div>
            <h3 className="text-xl font-bold text-gradient mb-2">{milestone.event}</h3>
            <p className="text-sm text-muted-foreground text-center">{milestone.description}</p>
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
