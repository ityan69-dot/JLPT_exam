export type QuestionReviewStatus = "pending" | "approved" | "needs-fix";

export interface QuestionReview {
  questionId: string;
  status: QuestionReviewStatus;
  naturalJapanese: boolean | null;
  levelAppropriate: boolean | null;
  answerCorrect: boolean | null;
  reviewer: string;
  notes: string;
  updatedAt: string;
}
