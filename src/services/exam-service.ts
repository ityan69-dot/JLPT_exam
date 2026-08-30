import mockN3Questions from "@/data/mock-n3-questions.json";
import { n5FullMockQuestions } from "@/data/n5-full-mock-questions";
import type { JLPTLevel, JLPTQuestion } from "@/types/jlpt";

const n3Questions = mockN3Questions as JLPTQuestion[];
const n5Questions = n5FullMockQuestions;

export function getQuestionsByLevel(level: JLPTLevel): JLPTQuestion[] {
  const questions=level==="N3"?n3Questions:level==="N5"?n5Questions:[];
  return questions
    .filter((question) => question.level === level)
    .map((question) => question.category === "Listening" && question.listeningScript
      ? {
          ...question,
          audioUrl: `/audio/${level.toLowerCase()}/${question.id}.mp3`,
          audioUrls: question.listeningTurns?.map((_, index) =>
            `/audio/${level.toLowerCase()}/${question.id}.part-${String(index + 1).padStart(2, "0")}.mp3`,
          ),
        }
      : question);
}

export const examService = {
  getQuestionsByLevel,
};
