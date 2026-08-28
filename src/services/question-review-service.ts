import type { QuestionReview } from "@/types/question-review";

const storageKey = "jlpt-mock:question-reviews:v1";

export function isQuestionReview(value: unknown): value is QuestionReview {
  if (!value || typeof value !== "object") return false;
  const review = value as Partial<QuestionReview>;
  return typeof review.questionId === "string" &&
    (review.status === "pending" || review.status === "approved" || review.status === "needs-fix") &&
    (review.naturalJapanese === null || typeof review.naturalJapanese === "boolean") &&
    (review.levelAppropriate === null || typeof review.levelAppropriate === "boolean") &&
    (review.answerCorrect === null || typeof review.answerCorrect === "boolean") &&
    typeof review.reviewer === "string" && typeof review.notes === "string" &&
    typeof review.updatedAt === "string";
}

export function getQuestionReviews(): QuestionReview[] {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isQuestionReview) : [];
  } catch {
    return [];
  }
}

export function saveQuestionReview(review: QuestionReview) {
  const next = [review, ...getQuestionReviews().filter((item) => item.questionId !== review.questionId)];
  window.localStorage.setItem(storageKey, JSON.stringify(next));
  return next;
}

export function replaceQuestionReviews(reviews: QuestionReview[]) {
  window.localStorage.setItem(storageKey, JSON.stringify(reviews));
}
