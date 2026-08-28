import type { PracticeHistoryEntry } from "@/types/practice";

const storageKey = "jlpt-mock:practice-history:v1";
const maximumEntries = 50;

function isPracticeHistoryEntry(value: unknown): value is PracticeHistoryEntry {
  if (!value || typeof value !== "object") return false;

  const entry = value as Partial<PracticeHistoryEntry>;
  return (
    typeof entry.id === "string" &&
    entry.level === "N3" &&
    typeof entry.tag === "string" &&
    typeof entry.tagLabel === "string" &&
    typeof entry.correct === "number" &&
    typeof entry.total === "number" &&
    typeof entry.accuracy === "number" &&
    typeof entry.durationSeconds === "number" &&
    typeof entry.completedAt === "string"
  );
}

export function getPracticeHistory(): PracticeHistoryEntry[] {
  try {
    const savedValue = window.localStorage.getItem(storageKey);
    if (!savedValue) return [];

    const parsedValue: unknown = JSON.parse(savedValue);
    if (!Array.isArray(parsedValue)) return [];

    return parsedValue.filter(isPracticeHistoryEntry).slice(0, maximumEntries);
  } catch {
    return [];
  }
}

export function savePracticeHistoryEntry(
  entry: PracticeHistoryEntry,
): PracticeHistoryEntry[] {
  const nextHistory = [entry, ...getPracticeHistory()].slice(0, maximumEntries);

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(nextHistory));
  } catch {
    // Return the in-memory history when browser storage is unavailable.
  }

  return nextHistory;
}
