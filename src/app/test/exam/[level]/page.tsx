import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExamQuestionScreen } from "@/components/exam/exam-question-screen";
import { getQuestionsByLevel } from "@/services/exam-service";

export const metadata: Metadata = {
  title: "N3 Mock Test",
  description: "Original JLPT N3-style mock test with vocabulary, grammar, reading, and listening simulations.",
};

export function generateStaticParams() {
  return [{ level: "n3" }];
}

export default async function ExamPage({
  params,
  searchParams,
}: {
  params: Promise<{ level: string }>;
  searchParams: Promise<{ dev?: string | string[] }>;
}) {
  const level = (await params).level.toUpperCase();
  const query = await searchParams;

  if (level !== "N3") {
    notFound();
  }

  const questions = getQuestionsByLevel("N3");

  return (
    <ExamQuestionScreen
      questions={questions}
      developerMode={query.dev === "1"}
    />
  );
}
