export type JLPTLevel = "N5" | "N4" | "N3" | "N2" | "N1";

export type JLPTCategory = "Vocab" | "Grammar" | "Reading" | "Listening";

export interface JLPTQuestion {
  id: string;
  level: JLPTLevel;
  category: JLPTCategory;
  questionText: string;
  options: string[];
  correctAnswer: string;
  tags: string[];
  audioUrl: string | null;
  explanation?: string;
}

export interface CategoryScore {
  correct: number;
  total: number;
  percentage: number;
}

export interface TestResult {
  id: string;
  userId: string;
  score: number;
  wrongQuestions: string[];
  categoryScores: Partial<Record<JLPTCategory, CategoryScore>>;
  date: string;
}

export interface UserProfile {
  id: string;
  displayName: string;
  targetLevel: JLPTLevel;
  dailyStudyMinutes: number;
  examDate: string | null;
  pastScores: TestResult[];
  updatedAt: string;
}

// Backwards-compatible name used by the existing level selector.
export type JlptLevel = JLPTLevel;
