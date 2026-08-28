import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RetryWrongQuestions } from "@/components/retry/retry-wrong-questions";
import { getQuestionsByLevel } from "@/services/exam-service";

export const metadata: Metadata = {
  title: "N3 Retry Wrong Questions",
  description: "Retry incorrect questions from a completed JLPT N3 mock test.",
};

export function generateStaticParams() {
  return [{ level: "n3" }];
}

type RetryPageProps = {
  params: Promise<{ level: string }>;
  searchParams: Promise<{ result?: string | string[] }>;
};

export default async function RetryPage({ params, searchParams }: RetryPageProps) {
  if ((await params).level.toUpperCase() !== "N3") notFound();
  const requestedResult = (await searchParams).result;
  const resultId = Array.isArray(requestedResult) ? requestedResult[0] : requestedResult;
  return <RetryWrongQuestions questions={getQuestionsByLevel("N3")} resultId={resultId} />;
}
