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
      <div className="relative pt-8 md:pt-6 pb-2 md:pb-1">
        <div className="flex items-center gap-2 md:gap-3 max-w-2xl mx-auto px-4 md:px-8">
          <img src={heroImage} alt="K-pop demon hunter" className="shrink-0 w-14 h-14 md:w-18 md:h-18 object-contain" />
          <h1 className="font-display text-primary text-glow-magenta tracking-wide leading-tight text-2xl md:text-3xl lg:text-4xl min-w-0 truncate">
            {data.childName}'s Star Chart
          </h1>
          <div className="flex gap-2 ml-auto shrink-0">
            <button
              onClick={() => navigate("/")}
              className="p-2 rounded-full bg-card hover:bg-muted transition-colors neon-border">
              <Home className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 rounded-full bg-card hover:bg-muted transition-colors neon-border">
              <Settings className="w-5 h-5 text-foreground" />
            </button>
          </div>
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