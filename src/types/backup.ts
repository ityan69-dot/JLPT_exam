import type { MockTestHistoryEntry, RetryHistoryEntry } from "./history";
import type { PracticeHistoryEntry } from "./practice";

export interface JLPTDataBackup {
  version: 1;
  exportedAt: string;
  practiceHistory: PracticeHistoryEntry[];
  testHistory: MockTestHistoryEntry[];
  retryHistory: RetryHistoryEntry[];
}

export interface BackupImportResult {
  practiceCount: number;
  testCount: number;
  retryCount: number;
}
