import mockN3Questions from "@/data/mock-n3-questions.json";
import mockN5Questions from "@/data/mock-n5-questions.json";
import type { JLPTLevel, JLPTQuestion } from "@/types/jlpt";

const n3Questions = mockN3Questions as JLPTQuestion[];
const n5Questions = mockN5Questions as JLPTQuestion[];

export function getQuestionsByLevel(level: JLPTLevel): JLPTQuestion[] {
  const questions=level==="N3"?n3Questions:level==="N5"?n5Questions:[];
  return questions
    .filter((question) => question.level === level)
    .map((question) => question.category === "Listening" && question.listeningScript
      ? { ...question, audioUrl: `/audio/${level.toLowerCase()}/${question.id}.mp3` }
      : question);
}

export const examService = {
  getQuestionsByLevel,
};
