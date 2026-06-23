const Timeline = () => {
  const milestones = [
    { year: "2026", event: "NeonCandy", description: "Studio direction locked" },
    { year: "2026", event: "Velvette Noir", description: "Soft-glam artist lane" },
    { year: "2026", event: "ByteBaby", description: "Digital-pop artist lane" },
    { year: "Next", event: "Global Links", description: "Verified platform links and listening pages" },
  ];

  return (
    <div className="w-full overflow-x-auto py-8">
      <div className="flex gap-8 min-w-max px-4">
        {milestones.map((milestone, index) => (
          <div key={index} className="flex flex-col items-center min-w-[200px] animate-fade-in transition-transform hover:scale-110" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="w-16 h-16 rounded-full bg-gradient-candy flex items-center justify-center mb-4 glow-pink">
              <span className="text-xl font-bold text-white">{milestone.year}</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gradient">{milestone.event}</h3>
            <p className="text-sm text-center text-muted-foreground">{milestone.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;