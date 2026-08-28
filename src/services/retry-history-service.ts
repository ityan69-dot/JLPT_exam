import type { RetryHistoryEntry } from "@/types/history";

const storageKey = "jlpt-mock:retry-history:v1";
const maximumEntries = 50;

function isRetryHistoryEntry(value: unknown): value is RetryHistoryEntry {
  if (!value || typeof value !== "object") return false;
  const entry = value as Partial<RetryHistoryEntry>;

  return (
    typeof entry.id === "string" &&
    typeof entry.testResultId === "string" &&
    entry.level === "N3" &&
    typeof entry.originalScore === "number" &&
    typeof entry.retryCorrect === "number" &&
    typeof entry.retryTotal === "number" &&
    typeof entry.retryAccuracy === "number" &&
    typeof entry.improvedScore === "number" &&
    typeof entry.improvement === "number" &&
    typeof entry.completedAt === "string"
  );
}

export function getRetryHistory(): RetryHistoryEntry[] {
  try {
    const savedValue = window.localStorage.getItem(storageKey);
    if (!savedValue) return [];
    const parsedValue: unknown = JSON.parse(savedValue);
    if (!Array.isArray(parsedValue)) return [];
    return parsedValue.filter(isRetryHistoryEntry).slice(0, maximumEntries);
  } catch {
    return [];
  }
}

export function saveRetryHistoryEntry(entry: RetryHistoryEntry): RetryHistoryEntry[] {
  const nextHistory = [entry, ...getRetryHistory()].slice(0, maximumEntries);
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(nextHistory));
  } catch {
    // Return the in-memory history when browser storage is unavailable.
  }
  return nextHistory;
}
