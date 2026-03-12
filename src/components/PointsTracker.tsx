interface PointsTrackerProps {
  current: number;
  target: number;
}

export default function PointsTracker({ current, target }: PointsTrackerProps) {
  const percentage = Math.max(0, Math.min(100, current / target * 100));

  return (
    <div className="rounded-xl bg-card p-5 neon-border">
      <div className="flex items-center justify-between mb-3">
        <span className="font-display text-2xl tracking-wide text-foreground text-glow-cyan">
          ⭐ Seal the HON MOON !           
        </span>
        <span className="font-display text-3xl text-primary text-glow-magenta">
          {current} / {target}
        </span>
      </div>
      <div className="w-full h-6 rounded-full bg-muted overflow-hidden relative">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${percentage}%`,
            background:
            "linear-gradient(90deg, hsl(320 100% 60%), hsl(280 100% 65%), hsl(190 100% 50%))",
            boxShadow: "0 0 15px hsl(320 100% 60% / 0.6)"
          }} />
        
        {percentage >= 100 &&
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-sm text-primary-foreground tracking-widest">
              GOAL REACHED!
            </span>
          </div>
        }
      </div>
    </div>);

}