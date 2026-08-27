import type {
  AnalysisConfidence,
  TagPerformance,
  WeaknessAnalysis,
  WeaknessSeverity,
} from "@/types/analysis";
import type { JLPTQuestion, TestResult } from "@/types/jlpt";

const tagLabels: Record<string, string> = {
  Kanji_Reading: "Kanji ဖတ်နည်း",
  Work: "အလုပ်အကိုင်ဆိုင်ရာ ဝေါဟာရ",
  Conjunction_Noni: "「のに」 ဆန့်ကျင်ဆက်စကား",
  Contrast: "ဆန့်ကျင်အဓိပ္ပာယ် ဆက်စပ်မှု",
  Short_Notice: "ကြေညာချက်တို ဖတ်ရှုခြင်း",
  Main_Idea: "အဓိကအကြောင်းအရာ ဖော်ထုတ်ခြင်း",
  Word_Meaning: "စကားလုံးအဓိပ္ပာယ်",
  Daily_Life: "နေ့စဉ်သုံး ဝေါဟာရ",
  Location: "နေရာအချက်အလက် နားထောင်ခြင်း",
  Conversation: "စကားပြော နားထောင်ခြင်း",
};

function getTagLabel(tag: string) {
  return tagLabels[tag] ?? tag.replaceAll("_", " ");
}

function getConfidence(attempts: number): AnalysisConfidence {
  if (attempts >= 4) return "high";
  if (attempts >= 2) return "medium";
  return "low";
}

function getSeverity(
  attempts: number,
  accuracy: number,
): WeaknessSeverity {
  if (accuracy === 100) return "strong";
  if (attempts >= 2 && accuracy < 50) return "critical";
  return "needs-practice";
}

export function analyzeWeaknesses(
  questions: JLPTQuestion[],
  result: TestResult,
): WeaknessAnalysis {
  const wrongQuestionIds = new Set(result.wrongQuestions);
  const tagTotals = new Map<
    string,
    { attempts: number; correct: number; wrong: number }
  >();

  for (const question of questions) {
    const isWrong = wrongQuestionIds.has(question.id);

    for (const tag of question.tags) {
      const totals = tagTotals.get(tag) ?? {
        attempts: 0,
        correct: 0,
        wrong: 0,
      };

      totals.attempts += 1;
      totals.correct += isWrong ? 0 : 1;
      totals.wrong += isWrong ? 1 : 0;
      tagTotals.set(tag, totals);
    }
  }

  const tagPerformance: TagPerformance[] = [...tagTotals.entries()].map(
    ([tag, totals]) => {
      const accuracy = Math.round((totals.correct / totals.attempts) * 100);

      return {
        tag,
        label: getTagLabel(tag),
        ...totals,
        accuracy,
        severity: getSeverity(totals.attempts, accuracy),
        confidence: getConfidence(totals.attempts),
      };
    },
  );

  const focusTags = tagPerformance
    .filter((item) => item.wrong > 0)
    .sort(
      (a, b) =>
        b.wrong - a.wrong ||
        a.accuracy - b.accuracy ||
        b.attempts - a.attempts,
    )
    .slice(0, 3);

  const categories = Object.entries(result.categoryScores)
    .filter((entry) => Boolean(entry[1]))
    .map(([category, score]) => ({
      category: category as keyof TestResult["categoryScores"],
      percentage: score!.percentage,
    }))
    .sort((a, b) => b.percentage - a.percentage);

  return {
    sampleSize: questions.length,
    isPreliminary: questions.length < 20,
    strongestCategory: categories[0] ?? null,
    weakestCategory: categories.at(-1) ?? null,
    tagPerformance,
    focusTags,
  };
}
