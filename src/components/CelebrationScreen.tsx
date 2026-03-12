import celebrationScene from "@/assets/celebration-scene.png";

interface CelebrationScreenProps {
  childName: string;
  onDismiss: () => void;
}

export default function CelebrationScreen({ childName, onDismiss }: CelebrationScreenProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm"
      onClick={onDismiss}
    >
      {/* Confetti particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-5%`,
            background: `hsl(${Math.random() * 360} 100% 60%)`,
            animation: `confetti ${2 + Math.random() * 3}s linear ${Math.random() * 2}s infinite`,
          }}
        />
      ))}

      <img
        src={celebrationScene}
        alt="K-pop demon hunters sealing the moon"
        className="w-80 max-w-[90vw] mb-8 celebration-glow rounded-2xl"
      />

      <h1 className="font-display text-5xl md:text-6xl text-center text-primary text-glow-magenta mb-4 px-4">
        🎉 CONGRATULATIONS 🎉
      </h1>
      <h2 className="font-display text-4xl md:text-5xl text-center text-secondary text-glow-cyan mb-6 px-4">
        {childName.toUpperCase()} ACHIEVED THE WEEKLY GOAL!
      </h2>
      <p className="font-display text-2xl text-muted-foreground tracking-wider">
        THE HON MOON IS SEALED! ⭐🌙
      </p>

      <button className="mt-8 px-8 py-3 rounded-full bg-primary font-display text-xl text-primary-foreground tracking-wider hover:scale-105 active:scale-95 transition-transform neon-border">
        TAP TO CONTINUE
      </button>
    </div>
  );
}
