export type StudyRecommendationKind = "diagnostic" | "weakness" | "retry" | "mock-test";
export type StudyRecommendationPriority = "urgent" | "high" | "normal";

export interface StudyRecommendation {
  id: string;
  kind: StudyRecommendationKind;
  priority: StudyRecommendationPriority;
  title: string;
  reason: string;
  evidence: string;
  href: string;
  actionLabel: string;
}
