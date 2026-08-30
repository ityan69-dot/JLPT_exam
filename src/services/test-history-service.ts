import type { TestResult } from "@/types/jlpt";
import type { JLPTLevel } from "@/types/jlpt";
import type { MockTestHistoryEntry } from "@/types/history";

const storageKey = "jlpt-mock:test-history:v1";
const maximumEntries = 30;

function isMockTestHistoryEntry(value: unknown): value is MockTestHistoryEntry {
  if (!value || typeof value !== "object") return false;

  const entry = value as Partial<MockTestHistoryEntry>;
  return (
    typeof entry.id === "string" &&
    ["N5","N4","N3","N2","N1"].includes(entry.level ?? "") &&
    typeof entry.score === "number" &&
    typeof entry.correct === "number" &&
    typeof entry.total === "number" &&
    Array.isArray(entry.wrongQuestions) &&
    Boolean(entry.categoryScores) &&
    typeof entry.completedAt === "string"
  );
}

export function getTestHistory(): MockTestHistoryEntry[] {
  try {
    const savedValue = window.localStorage.getItem(storageKey);
    if (!savedValue) return [];

    const parsedValue: unknown = JSON.parse(savedValue);
    if (!Array.isArray(parsedValue)) return [];

    return parsedValue.filter(isMockTestHistoryEntry).slice(0, maximumEntries);
  } catch {
    return [];
  }
}

export function saveTestHistoryResult(
  result: TestResult,
  level: JLPTLevel,
  totalQuestions: number,
  answers: Record<string, string>,
): MockTestHistoryEntry[] {
  const entry: MockTestHistoryEntry = {
    id: result.id,
    level,
    score: result.score,
    correct: totalQuestions - result.wrongQuestions.length,
    total: totalQuestions,
    wrongQuestions: result.wrongQuestions,
    categoryScores: result.categoryScores,
    answers,
    questionTimes: result.questionTimes,
    totalDurationSeconds: result.totalDurationSeconds,
    isDeveloperTest: result.isDeveloperTest,
    completedAt: result.date,
  };
  const previous = getTestHistory().filter((item) => item.id !== entry.id);
  const nextHistory = [entry, ...previous].slice(0, maximumEntries);

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(nextHistory));
  } catch {
    // Return the in-memory history when browser storage is unavailable.
  }

  return nextHistory;
}
