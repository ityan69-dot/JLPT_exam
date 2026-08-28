import type { MockTestHistoryEntry, RetryHistoryEntry } from "./history";
import type { PracticeHistoryEntry } from "./practice";
import type { UserProfile } from "./jlpt";
import type { QuestionReview } from "./question-review";

export interface JLPTDataBackup {
  version: 1;
  exportedAt: string;
  practiceHistory: PracticeHistoryEntry[];
  testHistory: MockTestHistoryEntry[];
  retryHistory: RetryHistoryEntry[];
  userProfile?: UserProfile;
  questionReviews?: QuestionReview[];
}

export interface BackupImportResult {
  practiceCount: number;
  testCount: number;
  retryCount: number;
  questionReviewCount: number;
}
