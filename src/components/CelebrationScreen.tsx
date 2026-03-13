import celebrationScene from "@/assets/celebration-scene.png";

interface CelebrationScreenProps {
  childName: string;
  onDismiss: () => void;
}

export default function CelebrationScreen({ childName, onDismiss }: CelebrationScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm overflow-auto py-8">
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

      {/* YouTube Video */}
      <div className="w-[320px] md:w-[400px] max-w-[90vw] aspect-[9/16] mb-6 rounded-2xl overflow-hidden celebration-glow">
        <video
          src="/kpop.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      <h1 className="font-display text-4xl md:text-6xl text-center text-primary text-glow-magenta mb-3 px-4">
        🎉 CONGRATULATIONS 🎉
      </h1>
      <h2 className="font-display text-3xl md:text-5xl text-center text-secondary text-glow-cyan mb-4 px-4">
        {childName.toUpperCase()} ACHIEVED THE WEEKLY GOAL!
      </h2>
      <p className="font-display text-xl md:text-2xl text-muted-foreground tracking-wider">
        THE HON MOON IS SEALED! ⭐🌙
      </p>

      <button
        onClick={onDismiss}
        className="mt-6 px-8 py-3 rounded-full bg-primary font-display text-xl text-primary-foreground tracking-wider hover:scale-105 active:scale-95 transition-transform neon-border"
      >
        TAP TO CONTINUE
      </button>
    </div>
  );
}
