import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WrongAnswerReview } from "@/components/review/wrong-answer-review";
import { getQuestionsByLevel } from "@/services/exam-service";

export const metadata: Metadata = {
  title: "N3 Wrong Answer Review",
  description: "Review incorrect answers from a completed JLPT N3 mock test.",
};

export function generateStaticParams() {
  return [{ level: "n3" }];
}

type ReviewPageProps = {
  params: Promise<{ level: string }>;
  searchParams: Promise<{ result?: string | string[] }>;
};

export default async function ReviewPage({ params, searchParams }: ReviewPageProps) {
  const level = (await params).level.toUpperCase();
  if (level !== "N3") notFound();

  const requestedResult = (await searchParams).result;
  const resultId = Array.isArray(requestedResult) ? requestedResult[0] : requestedResult;

  return <WrongAnswerReview questions={getQuestionsByLevel("N3")} resultId={resultId} />;
}
