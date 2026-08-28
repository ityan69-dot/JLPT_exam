import type { CategoryScore, JLPTCategory, JLPTLevel } from "./jlpt";

export interface MockTestHistoryEntry {
  id: string;
  level: JLPTLevel;
  score: number;
  correct: number;
  total: number;
  wrongQuestions: string[];
  categoryScores: Partial<Record<JLPTCategory, CategoryScore>>;
  answers?: Record<string, string>;
  completedAt: string;
}

export interface RetryHistoryEntry {
  id: string;
  testResultId: string;
  level: JLPTLevel;
  originalScore: number;
  retryCorrect: number;
  retryTotal: number;
  retryAccuracy: number;
  improvedScore: number;
  improvement: number;
  completedAt: string;
}
