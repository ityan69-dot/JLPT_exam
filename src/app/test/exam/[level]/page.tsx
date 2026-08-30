import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExamQuestionScreen } from "@/components/exam/exam-question-screen";
import { getQuestionsByLevel } from "@/services/exam-service";

export const metadata: Metadata = {
  title: "JLPT Practice Test",
  description: "Original JLPT-style practice test with vocabulary, grammar, reading, and listening simulations.",
};

export function generateStaticParams() {
  return [{ level: "n5" },{ level: "n3" }];
}

export default async function ExamPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const level = (await params).level.toUpperCase();

  if (level !== "N5" && level !== "N3") {
    notFound();
  }

  const questions = getQuestionsByLevel(level);

  return (
    <ExamQuestionScreen questions={questions} level={level} developerMode={false} />
  );
}
