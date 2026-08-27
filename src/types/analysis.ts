import type { JLPTCategory } from "./jlpt";

export type WeaknessSeverity = "strong" | "needs-practice" | "critical";

export type AnalysisConfidence = "low" | "medium" | "high";

export interface TagPerformance {
  tag: string;
  label: string;
  attempts: number;
  correct: number;
  wrong: number;
  accuracy: number;
  severity: WeaknessSeverity;
  confidence: AnalysisConfidence;
}

export interface CategoryInsight {
  category: JLPTCategory;
  percentage: number;
}

export interface WeaknessAnalysis {
  sampleSize: number;
  isPreliminary: boolean;
  strongestCategory: CategoryInsight | null;
  weakestCategory: CategoryInsight | null;
  tagPerformance: TagPerformance[];
  focusTags: TagPerformance[];
}
