import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-demon-hunter.png";

export default function NamePrompt() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    localStorage.setItem("childName", trimmed);
    navigate("/chart");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8 text-center">
        <img src={heroImage} alt="K-pop demon hunter" className="w-24 h-24 object-contain mx-auto" />
        <h1 className="font-display text-primary text-glow-magenta text-3xl tracking-wide">
          Who's tracking stars?
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter your child's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-card text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary font-nunito text-lg text-center"
            autoFocus
          />
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-display text-2xl tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-transform neon-border"
          >
            LET'S GO ⭐
          </button>
        </form>
      </div>
    </div>
  );
}
