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
    <div className="min-h-screen md:h-screen bg-background pb-6 md:pb-0 md:flex md:flex-col">
      {/* Header */}
      <div className="relative px-4 md:px-8 pt-4 md:pt-3 pb-1 md:pb-0">
        <div className="flex items-center gap-3 md:gap-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/")}
              className="p-2 md:p-3 rounded-full bg-card hover:bg-muted transition-colors neon-border">
              <Home className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 md:p-3 rounded-full bg-card hover:bg-muted transition-colors neon-border">
              <Settings className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
            </button>
          </div>
          <img src={heroImage} alt="K-pop demon hunter" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
          <h1 className="font-display text-primary text-glow-magenta tracking-wide leading-tight text-3xl md:text-4xl lg:text-5xl">
            {data.childName}'s Star Chart
          </h1>
        </div>
      </div>

      {/* Chores */}
      <div className="max-w-2xl mx-auto px-4 md:px-8 space-y-2 md:space-y-2 md:flex-1 md:overflow-auto w-full">
        {data.chores.map((chore) =>
        <ChoreRow
          key={chore.id}
          chore={chore}
          onComplete={handleComplete}
          onUndo={handleUndo} />
        )}
      </div>

      {/* Points Tracker & Nav */}
      <div className="max-w-2xl mx-auto px-4 md:px-8 mt-4 md:mt-2 md:pb-4 w-full">
        <PointsTracker current={totalPoints} target={data.weeklyTarget} />
        <p className="font-nunito text-secondary font-bold text-base md:text-lg text-center mt-3">
          {weekRange.start} – {weekRange.end}
        </p>
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