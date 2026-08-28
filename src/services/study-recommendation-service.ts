import { getTagLabel } from "@/services/weakness-analysis-service";
import type { MockTestHistoryEntry, RetryHistoryEntry } from "@/types/history";
import type { JLPTQuestion } from "@/types/jlpt";
import type { PracticeHistoryEntry } from "@/types/practice";
import type { StudyRecommendation } from "@/types/recommendation";

type RecommendationInput = {
  questions: JLPTQuestion[];
  testHistory: MockTestHistoryEntry[];
  practiceHistory: PracticeHistoryEntry[];
  retryHistory: RetryHistoryEntry[];
};

export function createStudyRecommendations({
  questions,
  testHistory,
  practiceHistory,
  retryHistory,
}: RecommendationInput): StudyRecommendation[] {
  if (testHistory.length === 0) {
    return [{
      id: "take-diagnostic",
      kind: "diagnostic",
      priority: "high",
      title: "N3 Mock Test နဲ့ လက်ရှိအဆင့်ကို အရင်စစ်ပါ",
      reason: "Personalized plan တိကျဖို့ ပထမဆုံး diagnostic result တစ်ခုလိုပါတယ်။",
      evidence: "Mock Test history မရှိသေးပါ",
      href: "/test/setup/n3",
      actionLabel: "Mock Test စမယ်",
    }];
  }

  const recommendations: StudyRecommendation[] = [];
  const latestTest = testHistory[0];
  const recentTests = testHistory.slice(0, 3);
  const wrongTagCounts = new Map<string, number>();

  for (const test of recentTests) {
    for (const questionId of test.wrongQuestions) {
      const question = questions.find((item) => item.id === questionId);
      for (const tag of question?.tags ?? []) {
        wrongTagCounts.set(tag, (wrongTagCounts.get(tag) ?? 0) + 1);
      }
    }
  }

  const practiceByTag = new Map<string, PracticeHistoryEntry[]>();
  for (const session of practiceHistory) {
    const sessions = practiceByTag.get(session.tag) ?? [];
    sessions.push(session);
    practiceByTag.set(session.tag, sessions);
  }

  const weakestPractice = [...practiceByTag.entries()]
    .map(([tag, sessions]) => ({
      tag,
      label: sessions[0].tagLabel,
      sessions: sessions.length,
      average: Math.round(sessions.reduce((sum, item) => sum + item.accuracy, 0) / sessions.length),
    }))
    .sort((a, b) => a.average - b.average)[0];
  const mostMissedTag = [...wrongTagCounts.entries()].sort((a, b) => b[1] - a[1])[0];
  const focusTag = weakestPractice?.average < 70 ? weakestPractice.tag : mostMissedTag?.[0];

  if (focusTag) {
    const practiceEvidence = weakestPractice?.tag === focusTag
      ? `Practice ${weakestPractice.sessions} ကြိမ်ရဲ့ ပျမ်းမျှ accuracy ${weakestPractice.average}%`
      : `နောက်ဆုံး Mock Test ${recentTests.length} ကြိမ်မှာ ဒီ tag ကို ${mostMissedTag?.[1] ?? 0} ကြိမ်မှားထားပါတယ်`;

    recommendations.push({
      id: `practice-${focusTag}`,
      kind: "weakness",
      priority: weakestPractice && weakestPractice.average < 50 ? "urgent" : "high",
      title: `${getTagLabel(focusTag)} ကို ဒီနေ့အရင်လေ့ကျင့်ပါ`,
      reason: "လတ်တလောအချက်အလက်အရ တိုးတက်မှုအများဆုံးရနိုင်မယ့် weakness ဖြစ်ပါတယ်။",
      evidence: practiceEvidence,
      href: `/practice/n3?tag=${encodeURIComponent(focusTag)}`,
      actionLabel: "Focused Practice စမယ်",
    });
  }

  const latestRetry = retryHistory[0];
  if (latestTest.wrongQuestions.length > 0 && (!latestRetry || latestRetry.testResultId !== latestTest.id || latestRetry.retryAccuracy < 70)) {
    recommendations.push({
      id: `retry-${latestTest.id}`,
      kind: "retry",
      priority: latestRetry?.retryAccuracy !== undefined && latestRetry.retryAccuracy < 50 ? "urgent" : "high",
      title: "နောက်ဆုံးစာမေးပွဲက အမှားတွေကို ပြန်ဖြေပါ",
      reason: "Explanation ဖတ်ပြီးချက်ချင်း ပြန်ဖြေခြင်းက မှားတဲ့ pattern ကို မှတ်မိအောင် ကူညီပေးပါတယ်။",
      evidence: latestRetry
        ? `နောက်ဆုံး retry recovery ${latestRetry.retryAccuracy}%`
        : `${latestTest.wrongQuestions.length} ခု ပြန်ဖြေရန်ကျန်နေပါတယ်`,
      href: `/retry/n3?result=${encodeURIComponent(latestTest.id)}`,
      actionLabel: "အမှားတွေ ပြန်ဖြေမယ်",
    });
  }

  const hasReviewWork = practiceHistory.length >= 2 || retryHistory.length >= 1;
  if (hasReviewWork || latestTest.score >= 70) {
    recommendations.push({
      id: "retake-mock",
      kind: "mock-test",
      priority: "normal",
      title: "နောက်ထပ် Mock Test နဲ့ တိုးတက်မှုကို ပြန်တိုင်းပါ",
      reason: "Focused practice နဲ့ retry က စာမေးပွဲရမှတ်အပေါ် သက်ရောက်မှုရှိမရှိ ပြန်စစ်ရမယ့်အချိန်ပါ။",
      evidence: `နောက်ဆုံး Mock Test score ${latestTest.score}% · Practice ${practiceHistory.length} ကြိမ် · Retry ${retryHistory.length} ကြိမ်`,
      href: "/test/setup/n3",
      actionLabel: "Mock Test ထပ်ဖြေမယ်",
    });
  }

  return recommendations.slice(0, 3);
}
