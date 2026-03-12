import { StarChartData, Chore, getWeekStart } from "@/lib/starChartStore";
import { X, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface SettingsPanelProps {
  data: StarChartData;
  onSave: (data: StarChartData) => void;
  onClose: () => void;
}

export default function SettingsPanel({ data, onSave, onClose }: SettingsPanelProps) {
  const [childName, setChildName] = useState(data.childName);
  const [target, setTarget] = useState(data.weeklyTarget);
  const [chores, setChores] = useState<Chore[]>(data.chores.map((c) => ({ ...c })));

  function handleSave() {
    onSave({
      ...data,
      childName,
      weeklyTarget: target,
      chores,
    });
    onClose();
  }

  function updateChore(id: string, field: "label" | "points", value: string | number) {
    setChores((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  }

  function addChore() {
    setChores((prev) => [
      ...prev,
      { id: Date.now().toString(), label: "New chore", points: 1, completions: 0 },
    ]);
  }

  function removeChore(id: string) {
    setChores((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-auto">
      <div className="max-w-xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-3xl text-primary text-glow-magenta">⚙️ SETTINGS</h2>
          <button onClick={onClose} className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors">
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="font-nunito font-bold text-foreground block mb-2">Child's Name</label>
            <input
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-card text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary font-nunito text-lg"
            />
          </div>

          <div>
            <label className="font-nunito font-bold text-foreground block mb-2">Weekly Target Points</label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              className="w-32 px-4 py-3 rounded-xl bg-card text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary font-nunito text-lg"
            />
          </div>

          <div>
            <label className="font-nunito font-bold text-foreground block mb-3">Chores & Points</label>
            <div className="space-y-3">
              {chores.map((chore) => (
                <div key={chore.id} className="flex items-center gap-2">
                  <input
                    value={chore.label}
                    onChange={(e) => updateChore(chore.id, "label", e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-card text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary font-nunito"
                  />
                  <input
                    type="number"
                    value={chore.points}
                    onChange={(e) => updateChore(chore.id, "points", Number(e.target.value))}
                    className="w-20 px-3 py-2 rounded-lg bg-card text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary font-nunito text-center"
                  />
                  <span className="text-muted-foreground text-sm w-8">pts</span>
                  <button
                    onClick={() => removeChore(chore.id)}
                    className="p-2 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={addChore}
              className="mt-3 flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-colors font-nunito font-bold"
            >
              <Plus className="w-4 h-4" /> Add Chore
            </button>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-display text-2xl tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-transform neon-border"
          >
            SAVE SETTINGS
          </button>

          <button
            onClick={() => {
              if (window.confirm("Reset all stars and start fresh?")) {
                onSave({
                  ...data,
                  childName,
                  weeklyTarget: target,
                  chores: chores.map((c) => ({ ...c, completions: 0 })),
                  weekStart: getWeekStart(),
                  goalReached: false,
                });
                onClose();
              }
            }}
            className="w-full py-3 rounded-xl bg-destructive/20 text-destructive font-display text-xl tracking-wider hover:bg-destructive/30 transition-colors"
          >
            🔄 RESET WEEK
          </button>
        </div>
      </div>
    </div>
  );
}
