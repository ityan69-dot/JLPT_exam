import mockN3Questions from "@/data/mock-n3-questions.json";
import type { JLPTLevel, JLPTQuestion } from "@/types/jlpt";

const n3Questions = mockN3Questions as JLPTQuestion[];

export function getQuestionsByLevel(level: JLPTLevel): JLPTQuestion[] {
  if (level !== "N3") {
    return [];
  }

  return n3Questions
    .filter((question) => question.level === level)
    .map((question) => question.category === "Listening" && question.listeningScript
      ? { ...question, audioUrl: `/audio/n3/${question.id}.mp3` }
      : question);
}

export const examService = {
  getQuestionsByLevel,
};
