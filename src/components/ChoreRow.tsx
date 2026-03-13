import { Chore } from "@/lib/starChartStore";
import starIcon from "@/assets/star-icon.png";

interface ChoreRowProps {
  chore: Chore;
  onComplete: (id: string) => void;
  onUndo: (id: string) => void;
}

export default function ChoreRow({ chore, onComplete, onUndo }: ChoreRowProps) {
  const isNegative = chore.points < 0;

  return (
    <div className="flex items-center gap-3 rounded-xl bg-card p-3 md:p-3 neon-border transition-all hover:scale-[1.01]">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-nunito font-bold text-lg text-foreground truncate">
            {chore.label}
          </span>
          <span
            className={`text-sm font-bold px-2 py-0.5 rounded-full ${
              isNegative
                ? "bg-destructive/20 text-destructive"
                : "bg-primary/20 text-primary"
            }`}
          >
            {chore.points > 0 ? "+" : ""}
            {chore.points} pt{Math.abs(chore.points) !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Star swimlane */}
        <div className="flex items-center gap-1 mt-2 min-h-[28px] flex-wrap">
          {Array.from({ length: Math.abs(chore.points) * chore.completions }).map((_, i) => (
            <img
              key={i}
              src={starIcon}
              alt="star"
              className={`w-7 h-7 ${isNegative ? "hue-rotate-180 opacity-70" : "star-pulse"}`}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
          {chore.completions === 0 && (
            <span className="text-muted-foreground text-sm italic">No stars yet</span>
          )}
        </div>
      </div>

      <div className="flex gap-2 shrink-0">
        {chore.completions > 0 && (
          <button
            onClick={() => onUndo(chore.id)}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-destructive/30 hover:text-destructive transition-colors text-xl font-bold"
          >
            −
          </button>
        )}
        <button
          onClick={() => onComplete(chore.id)}
          className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:scale-110 active:scale-95 transition-transform shadow-lg text-2xl font-bold"
          style={{
            boxShadow: "0 0 15px hsl(320 100% 60% / 0.5)",
          }}
        >
          {isNegative ? "😈" : "⭐"}
        </button>
      </div>
    </div>
  );
}
