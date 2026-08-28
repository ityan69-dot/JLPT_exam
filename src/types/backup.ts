import type { MockTestHistoryEntry, RetryHistoryEntry } from "./history";
import type { PracticeHistoryEntry } from "./practice";
import type { UserProfile } from "./jlpt";

export interface JLPTDataBackup {
  version: 1;
  exportedAt: string;
  practiceHistory: PracticeHistoryEntry[];
  testHistory: MockTestHistoryEntry[];
  retryHistory: RetryHistoryEntry[];
  userProfile?: UserProfile;
}

export interface BackupImportResult {
  practiceCount: number;
  testCount: number;
  retryCount: number;
}
