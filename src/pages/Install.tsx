import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-demon-hunter.png";

export default function Install() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <img src={heroImage} alt="K-pop demon hunter" className="w-28 h-28 object-contain mb-6" />
      
      <h1 className="font-display text-4xl text-primary text-glow-magenta mb-4">
        Install Star Chart
      </h1>
      
      <p className="font-nunito text-foreground text-lg mb-8 max-w-md">
        Add this app to your iPad home screen for the best experience!
      </p>

      <div className="bg-card rounded-2xl p-6 neon-border max-w-md w-full space-y-5">
        <div className="flex items-start gap-4">
          <span className="font-display text-secondary text-2xl">1</span>
          <p className="font-nunito text-foreground text-left">
            Tap the <strong className="text-secondary">Share</strong> button{" "}
            <span className="text-secondary">⬆</span> at the top of Safari
          </p>
        </div>
        <div className="flex items-start gap-4">
          <span className="font-display text-secondary text-2xl">2</span>
          <p className="font-nunito text-foreground text-left">
            Scroll down and tap{" "}
            <strong className="text-secondary">"Add to Home Screen"</strong>
          </p>
        </div>
        <div className="flex items-start gap-4">
          <span className="font-display text-secondary text-2xl">3</span>
          <p className="font-nunito text-foreground text-left">
            Tap <strong className="text-secondary">"Add"</strong> — done! 🎉
          </p>
        </div>
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-8 font-nunito font-bold text-primary hover:text-secondary transition-colors"
      >
        ← Back to Star Chart
      </button>
    </div>
  );
}
