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
      <div className="relative px-4 pt-6 pb-1">
        <div className="flex items-start justify-between max-w-xl mx-auto">
          <div className="flex items-center gap-4">
            <img src={heroImage} alt="K-pop demon hunter" className="w-20 h-20 object-contain" />
            <div>
              <h1 className="font-display text-primary text-glow-magenta tracking-wide leading-tight text-center text-5xl">
                {data.childName}'s Star Chart
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Chores */}
      <div className="max-w-xl mx-auto px-4 space-y-3">
        {data.chores.map((chore) =>
        <ChoreRow
          key={chore.id}
          chore={chore}
          onComplete={handleComplete}
          onUndo={handleUndo} />

        )}
      </div>

      {/* Points Tracker */}
      <div className="max-w-xl mx-auto px-4 mt-6">
        <PointsTracker current={totalPoints} target={data.weeklyTarget} />
        <p className="font-nunito text-secondary mt-5 mb-2 text-center font-bold text-lg py-[3px]">
          {weekRange.start} – {weekRange.end}
        </p>
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => navigate("/")}
            className="p-3 rounded-full bg-card hover:bg-muted transition-colors neon-border">
            
            <Home className="w-6 h-6 text-foreground" />
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className="p-3 rounded-full bg-card hover:bg-muted transition-colors neon-border">
            
            <Settings className="w-6 h-6 text-foreground" />
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