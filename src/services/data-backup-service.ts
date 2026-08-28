import { getPracticeHistory } from "@/services/practice-history-service";
import { getRetryHistory } from "@/services/retry-history-service";
import { getTestHistory } from "@/services/test-history-service";
import { getUserProfile, isUserProfile } from "@/services/user-profile-service";
import type { JLPTDataBackup, BackupImportResult } from "@/types/backup";
import type { MockTestHistoryEntry, RetryHistoryEntry } from "@/types/history";
import type { PracticeHistoryEntry } from "@/types/practice";

const practiceStorageKey = "jlpt-mock:practice-history:v1";
const testStorageKey = "jlpt-mock:test-history:v1";
const retryStorageKey = "jlpt-mock:retry-history:v1";
const profileStorageKey = "jlpt-mock:user-profile:v1";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isValidDate(value: unknown) {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function isFiniteNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value);
}

function isPracticeEntry(value: unknown): value is PracticeHistoryEntry {
  if (!isRecord(value)) return false;
  return typeof value.id === "string" && value.level === "N3" &&
    typeof value.tag === "string" && typeof value.tagLabel === "string" &&
    isFiniteNumber(value.correct) && isFiniteNumber(value.total) &&
    isFiniteNumber(value.accuracy) && isFiniteNumber(value.durationSeconds) &&
    isValidDate(value.completedAt);
}

function isTestEntry(value: unknown): value is MockTestHistoryEntry {
  if (!isRecord(value)) return false;
  return typeof value.id === "string" && value.level === "N3" &&
    isFiniteNumber(value.score) && isFiniteNumber(value.correct) &&
    isFiniteNumber(value.total) && Array.isArray(value.wrongQuestions) &&
    value.wrongQuestions.every((item) => typeof item === "string") &&
    isRecord(value.categoryScores) && isValidDate(value.completedAt) &&
    (value.answers === undefined || isRecord(value.answers));
}

function isRetryEntry(value: unknown): value is RetryHistoryEntry {
  if (!isRecord(value)) return false;
  return typeof value.id === "string" && typeof value.testResultId === "string" &&
    value.level === "N3" && isFiniteNumber(value.originalScore) &&
    isFiniteNumber(value.retryCorrect) && isFiniteNumber(value.retryTotal) &&
    isFiniteNumber(value.retryAccuracy) && isFiniteNumber(value.improvedScore) &&
    isFiniteNumber(value.improvement) && isValidDate(value.completedAt);
}

function mergeById<T extends { id: string; completedAt: string }>(
  current: T[],
  imported: T[],
  limit: number,
) {
  const merged = new Map(current.map((entry) => [entry.id, entry]));
  for (const entry of imported) merged.set(entry.id, entry);
  return [...merged.values()]
    .sort((a, b) => Date.parse(b.completedAt) - Date.parse(a.completedAt))
    .slice(0, limit);
}

export function createDataBackup(): JLPTDataBackup {
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    practiceHistory: getPracticeHistory(),
    testHistory: getTestHistory(),
    retryHistory: getRetryHistory(),
    userProfile: getUserProfile(),
  };
}

export function importDataBackup(value: unknown): BackupImportResult {
  if (!isRecord(value) || value.version !== 1) {
    throw new Error("ဒီ backup ဖိုင်ရဲ့ version ကို app က မထောက်ပံ့သေးပါ။");
  }
  if (!Array.isArray(value.practiceHistory) || !Array.isArray(value.testHistory) || !Array.isArray(value.retryHistory)) {
    throw new Error("Backup ဖိုင်ရဲ့ data ပုံစံ မမှန်ပါ။");
  }
  if (!value.practiceHistory.every(isPracticeEntry) || !value.testHistory.every(isTestEntry) || !value.retryHistory.every(isRetryEntry)) {
    throw new Error("Backup ထဲမှာ မမှန်ကန်တဲ့ history record ပါနေပါတယ်။");
  }
  if (value.userProfile !== undefined && !isUserProfile(value.userProfile)) {
    throw new Error("Backup ထဲက profile အချက်အလက် မမှန်ပါ။");
  }

  const practiceHistory = mergeById(getPracticeHistory(), value.practiceHistory, 50);
  const testHistory = mergeById(getTestHistory(), value.testHistory, 30);
  const retryHistory = mergeById(getRetryHistory(), value.retryHistory, 50);

  window.localStorage.setItem(practiceStorageKey, JSON.stringify(practiceHistory));
  window.localStorage.setItem(testStorageKey, JSON.stringify(testHistory));
  window.localStorage.setItem(retryStorageKey, JSON.stringify(retryHistory));
  if (value.userProfile !== undefined) {
    window.localStorage.setItem(profileStorageKey, JSON.stringify(value.userProfile));
  }

  return {
    practiceCount: practiceHistory.length,
    testCount: testHistory.length,
    retryCount: retryHistory.length,
  };
}
