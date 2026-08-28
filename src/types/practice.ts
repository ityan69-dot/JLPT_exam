import type { JLPTLevel } from "./jlpt";

export interface PracticeHistoryEntry {
  id: string;
  level: JLPTLevel;
  tag: string;
  tagLabel: string;
  correct: number;
  total: number;
  accuracy: number;
  durationSeconds: number;
  completedAt: string;
}
