import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, Home } from "lucide-react";
import { loadData, saveData, getTotalPoints, getWeekRange, StarChartData } from "@/lib/starChartStore";
import heroImage from "@/assets/hero-demon-hunter.png";
import ChoreRow from "@/components/ChoreRow";
import PointsTracker from "@/components/PointsTracker";
import CelebrationScreen from "@/components/CelebrationScreen";
import SettingsPanel from "@/components/SettingsPanel";

export default function Index() {
  const navigate = useNavigate();
  const [data, setData] = useState<StarChartData>(loadData);
  const [showSettings, setShowSettings] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const weekRange = getWeekRange();

  useEffect(() => {
    saveData(data);
  }, [data]);

  const totalPoints = getTotalPoints(data.chores);

  // Check goal reached
  useEffect(() => {
    if (totalPoints >= data.weeklyTarget && !data.goalReached) {
      setShowCelebration(true);
      setData((prev) => ({ ...prev, goalReached: true }));
    }
  }, [totalPoints, data.weeklyTarget, data.goalReached]);

  const handleComplete = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      chores: prev.chores.map((c) =>
      c.id === id ? { ...c, completions: c.completions + 1 } : c
      )
    }));
  }, []);

  const handleUndo = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      chores: prev.chores.map((c) =>
      c.id === id ? { ...c, completions: Math.max(0, c.completions - 1) } : c
      )
    }));
  }, []);

  const handleSettingsSave = useCallback((newData: StarChartData) => {
    setData(newData);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="relative px-4 md:px-8 pt-6 pb-1">
        <div className="flex items-start justify-between max-w-2xl mx-auto">
          <div className="flex items-center gap-4 md:gap-6">
            <img src={heroImage} alt="K-pop demon hunter" className="w-20 h-20 md:w-28 md:h-28 object-contain" />
            <div>
              <h1 className="font-display text-primary text-glow-magenta tracking-wide leading-tight text-center text-4xl md:text-5xl lg:text-6xl">
                {data.childName}'s Star Chart
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Chores */}
      <div className="max-w-2xl mx-auto px-4 md:px-8 space-y-3 md:space-y-4">
        {data.chores.map((chore) =>
        <ChoreRow
          key={chore.id}
          chore={chore}
          onComplete={handleComplete}
          onUndo={handleUndo} />
        )}
      </div>

      {/* Points Tracker */}
      <div className="max-w-2xl mx-auto px-4 md:px-8 mt-6 md:mt-8">
        <PointsTracker current={totalPoints} target={data.weeklyTarget} />
        <p className="font-nunito text-secondary mt-5 mb-2 text-center font-bold text-lg md:text-xl py-[3px]">
          {weekRange.start} – {weekRange.end}
        </p>
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => navigate("/")}
            className="p-3 md:p-4 rounded-full bg-card hover:bg-muted transition-colors neon-border">
            <Home className="w-6 h-6 md:w-7 md:h-7 text-foreground" />
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className="p-3 md:p-4 rounded-full bg-card hover:bg-muted transition-colors neon-border">
            <Settings className="w-6 h-6 md:w-7 md:h-7 text-foreground" />
          </button>
        </div>
      </div>

      {/* Celebration */}
      {showCelebration &&
      <CelebrationScreen
        childName={data.childName}
        onDismiss={() => setShowCelebration(false)} />
      }

      {/* Settings */}
      {showSettings &&
      <SettingsPanel
        data={data}
        onSave={handleSettingsSave}
        onClose={() => setShowSettings(false)} />
      }
    </div>);

}