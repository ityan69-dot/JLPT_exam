import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExamQuestionScreen } from "@/components/exam/exam-question-screen";
import { testConfigs } from "@/data/test-config";
import { getQuestionsByLevel } from "@/services/exam-service";

export const metadata: Metadata = {
  title: "N3 Mock Test",
  description: "JLPT N3 mock test question screen prototype.",
};

export function generateStaticParams() {
  return [{ level: "n3" }];
}

export default async function ExamPage({
  params,
}: PageProps<"/test/exam/[level]">) {
  const level = (await params).level.toUpperCase();

  if (level !== "N3") {
    notFound();
  }

  const questions = getQuestionsByLevel("N3");

  return (
    <ExamQuestionScreen
      questions={questions}
      totalMinutes={testConfigs.N3.totalMinutes}
    />
  );
}
