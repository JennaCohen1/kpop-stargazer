import { startOfWeek, endOfWeek, format, isSameWeek } from "date-fns";

export interface Chore {
  id: string;
  label: string;
  points: number;
  completions: number;
}

export interface StarChartData {
  childName: string;
  weeklyTarget: number;
  chores: Chore[];
  weekStart: string; // ISO date string
  goalReached: boolean;
}

const DEFAULT_CHORES: Chore[] = [
  { id: "1", label: "Taking bag out of car", points: 1, completions: 0 },
  { id: "2", label: "Clean room", points: 2, completions: 0 },
  { id: "3", label: "Brush teeth", points: 1, completions: 0 },
  { id: "4", label: "Brush hair", points: 1, completions: 0 },
  { id: "5", label: "Fight with my sister", points: -1, completions: 0 },
];

export function getWeekStart(): string {
  return startOfWeek(new Date(), { weekStartsOn: 1 }).toISOString();
}

function getDefaultData(): StarChartData {
  return {
    childName: "Mischa",
    weeklyTarget: 20,
    chores: DEFAULT_CHORES.map((c) => ({ ...c })),
    weekStart: getWeekStart(),
    goalReached: false,
  };
}

export function loadData(): StarChartData {
  const raw = localStorage.getItem("starChartData");
  if (!raw) return getDefaultData();

  const data: StarChartData = JSON.parse(raw);

  // Check if we need to reset for a new week
  const savedWeekStart = new Date(data.weekStart);
  if (!isSameWeek(savedWeekStart, new Date(), { weekStartsOn: 1 })) {
    // New week - reset completions but keep settings
    return {
      ...data,
      chores: data.chores.map((c) => ({ ...c, completions: 0 })),
      weekStart: getWeekStart(),
      goalReached: false,
    };
  }

  return data;
}

export function saveData(data: StarChartData) {
  localStorage.setItem("starChartData", JSON.stringify(data));
}

export function getTotalPoints(chores: Chore[]): number {
  return chores.reduce((sum, c) => sum + c.points * c.completions, 0);
}

export function getWeekRange(): { start: string; end: string } {
  const now = new Date();
  const start = startOfWeek(now, { weekStartsOn: 1 });
  const end = endOfWeek(now, { weekStartsOn: 1 });
  return {
    start: format(start, "MMM d"),
    end: format(end, "MMM d, yyyy"),
  };
}
