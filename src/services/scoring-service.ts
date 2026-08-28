import type {
  CategoryScore,
  JLPTCategory,
  JLPTQuestion,
  TestResult,
} from "@/types/jlpt";

export type ExamAnswers = Record<string, string>;

export function scoreTest(
  questions: JLPTQuestion[],
  answers: ExamAnswers,
  userId = "guest",
  questionTimes: Record<string, number> = {},
): TestResult {
  const categoryTotals: Partial<
    Record<JLPTCategory, { correct: number; total: number }>
  > = {};
  const wrongQuestions: string[] = [];
  let correctAnswers = 0;

  for (const question of questions) {
    const isCorrect = answers[question.id] === question.correctAnswer;
    const category = categoryTotals[question.category] ?? {
      correct: 0,
      total: 0,
    };

    category.total += 1;

    if (isCorrect) {
      correctAnswers += 1;
      category.correct += 1;
    } else {
      wrongQuestions.push(question.id);
    }

    categoryTotals[question.category] = category;
  }

  const categoryScores: Partial<Record<JLPTCategory, CategoryScore>> = {};

  for (const [category, values] of Object.entries(categoryTotals)) {
    categoryScores[category as JLPTCategory] = {
      ...values,
      percentage: Math.round((values.correct / values.total) * 100),
    };
  }

  return {
    id: globalThis.crypto.randomUUID(),
    userId,
    score: Math.round((correctAnswers / questions.length) * 100),
    wrongQuestions,
    categoryScores,
    questionTimes,
    totalDurationSeconds: Object.values(questionTimes).reduce((sum, seconds) => sum + seconds, 0),
    isDeveloperTest: userId === "developer-test",
    date: new Date().toISOString(),
  };
}
