import { useNavigate } from "react-router-dom";
import splashHero from "@/assets/splash-hero.png";

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-end relative overflow-hidden bg-background"
      onClick={() => navigate("/chart")}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate("/chart")}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={splashHero}
          alt="K-pop demon hunters"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      {/* CTA */}
      <div className="relative z-10 text-center pb-16 px-6">
        <h1 className="font-display text-5xl md:text-6xl text-primary text-glow-magenta tracking-wider mb-4">
          STAR CHART
        </h1>
        <p className="font-nunito text-xl text-muted-foreground font-bold animate-pulse">
          Tap anywhere to begin ⭐
        </p>
      </div>
    </div>
  );
}
