import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WeaknessPracticeSession } from "@/components/practice/weakness-practice-session";
import { getQuestionsByLevel } from "@/services/exam-service";
import { getTagLabel } from "@/services/weakness-analysis-service";

export const metadata: Metadata = {
  title: "N3 Weakness Practice",
  description: "Practice JLPT N3 questions selected from a weakness tag.",
};

export function generateStaticParams() {
  return [{ level: "n3" }];
}

type PracticePageProps = {
  params: Promise<{ level: string }>;
  searchParams: Promise<{ tag?: string | string[] }>;
};

export default async function PracticePage({
  params,
  searchParams,
}: PracticePageProps) {
  const level = (await params).level.toUpperCase();

  if (level !== "N3") {
    notFound();
  }

  const requestedTag = (await searchParams).tag;
  const tag = Array.isArray(requestedTag) ? requestedTag[0] : requestedTag;
  const questions = tag
    ? getQuestionsByLevel("N3").filter((question) => question.tags.includes(tag))
    : [];

  return (
    <WeaknessPracticeSession
      questions={questions}
      tag={tag ?? "Unknown"}
      tagLabel={tag ? getTagLabel(tag) : "ရွေးချယ်ထားသော အားနည်းချက်"}
    />
  );
}
