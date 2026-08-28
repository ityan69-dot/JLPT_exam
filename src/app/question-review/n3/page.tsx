import type { Metadata } from "next";
import { ExpertQuestionReview } from "@/components/review/expert-question-review";
import { getQuestionsByLevel } from "@/services/exam-service";

export const metadata: Metadata = { title: "N3 Question Review", description: "Expert quality review for the N3 question bank." };

export default function N3QuestionReviewPage() {
  return <ExpertQuestionReview questions={getQuestionsByLevel("N3")} />;
}
