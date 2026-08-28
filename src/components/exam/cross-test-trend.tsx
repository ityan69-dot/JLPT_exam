import Link from "next/link";
import { getTagLabel } from "@/services/weakness-analysis-service";
import type { MockTestHistoryEntry } from "@/types/history";
import type { JLPTCategory, JLPTQuestion } from "@/types/jlpt";

const categoryLabels: Record<JLPTCategory, string> = {
  Vocab: "ဝေါဟာရ",
  Grammar: "သဒ္ဒါ",
  Reading: "ဖတ်ရှုခြင်း",
  Listening: "နားထောင်ခြင်း",
};

export function CrossTestTrend({ history, questions }: { history: MockTestHistoryEntry[]; questions: JLPTQuestion[] }) {
  const recent = history.slice(0, 3);

  if (recent.length < 2) {
    return (
      <section className="mt-6 rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] p-6 shadow-[0_18px_50px_rgba(50,42,28,0.08)] sm:p-8">
        <p className="text-xs font-bold tracking-[0.2em] text-[#a33a32] uppercase">継続診断 · Cross-Test Trend</p>
        <h2 className="mt-2 text-2xl font-black">ထပ်တလဲလဲ Weakness ရှာဖွေခြင်း</h2>
        <p className="mt-4 text-sm leading-7 text-[#746c60]">Mock Test နှစ်ကြိမ်ပြည့်တဲ့အခါ ဒီတစ်ကြိမ်ပဲမှားတာနဲ့ ထပ်ခါထပ်ခါမှားနေတဲ့ pattern ကို ခွဲပြပေးပါမယ်။</p>
        <Link href="/test/setup/n3" className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl border border-[#c83f35]/40 bg-[#fff1ed] px-5 py-2.5 text-sm font-bold text-[#9a342d]">နောက် Test အတွက် ပြင်ဆင်မယ် →</Link>
      </section>
    );
  }

  const tagOccurrences = new Map<string, number>();
  for (const attempt of recent) {
    const tagsInAttempt = new Set<string>();
    for (const questionId of attempt.wrongQuestions) {
      const question = questions.find((item) => item.id === questionId);
      for (const tag of question?.tags ?? []) tagsInAttempt.add(tag);
    }
    for (const tag of tagsInAttempt) tagOccurrences.set(tag, (tagOccurrences.get(tag) ?? 0) + 1);
  }

  const recurring = [...tagOccurrences.entries()]
    .filter(([, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  const scoreChange = recent[0].score - recent.at(-1)!.score;
  const categoryTrends = (["Vocab", "Grammar", "Reading", "Listening"] as JLPTCategory[])
    .map((category) => {
      const latest = recent[0].categoryScores[category]?.percentage ?? 0;
      const oldest = recent.at(-1)!.categoryScores[category]?.percentage ?? 0;
      return { category, latest, change: latest - oldest };
    })
    .sort((a, b) => a.latest - b.latest);
  const weakest = categoryTrends[0];

  return (
    <section className="mt-6 overflow-hidden rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] shadow-[0_18px_50px_rgba(50,42,28,0.08)]">
      <div className="border-b border-[#e7e1d4] p-6 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-[#a33a32] uppercase">継続診断 · Cross-Test Trend</p>
            <h2 className="mt-2 text-2xl font-black">နောက်ဆုံး {recent.length} ကြိမ်ရဲ့ Weakness Pattern</h2>
          </div>
          <span className={`rounded-full px-3 py-1.5 text-xs font-black ${scoreChange > 0 ? "bg-[#eef4ef] text-[#31513e]" : scoreChange < 0 ? "bg-[#fff1ed] text-[#9a342d]" : "bg-[#eee9df] text-[#625b50]"}`}>Score {scoreChange > 0 ? "+" : ""}{scoreChange}%</span>
        </div>
      </div>

      <div className="grid gap-px bg-[#e7e1d4] md:grid-cols-[1.15fr_0.85fr]">
        <div className="bg-[#fffdf8] p-6 sm:p-8">
          <h3 className="font-black">ထပ်ခါထပ်ခါဖြစ်နေတဲ့ Weakness</h3>
          {recurring.length > 0 ? (
            <div className="mt-4 space-y-3">
              {recurring.map(([tag, count], index) => (
                <article key={tag} className="flex flex-col gap-3 rounded-2xl border border-[#e2dccf] bg-[#fbf7ee] p-4 sm:flex-row sm:items-center">
                  <span className={`flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-black ${index === 0 ? "bg-[#c83f35] text-white" : "bg-[#eee9df] text-[#625b50]"}`}>{index + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-black">{getTagLabel(tag)}</p>
                    <p className="mt-1 text-xs text-[#746c60]">နောက်ဆုံး {recent.length} ကြိမ်ထဲက {count} ကြိမ်မှာ မှားထားပါတယ်</p>
                  </div>
                  <Link href={`/practice/n3?tag=${encodeURIComponent(tag)}`} className="flex min-h-10 items-center justify-center rounded-xl bg-[#c83f35] px-4 py-2 text-xs font-bold text-white">ပြန်လေ့ကျင့်မယ် →</Link>
                </article>
              ))}
            </div>
          ) : <p className="mt-4 rounded-2xl border border-[#c8d7cc] bg-[#eef4ef] p-4 text-sm leading-7 text-[#31513e]">တူညီတဲ့ tag ကို အကြိမ်ကြိမ်မှားထားတာ မတွေ့ပါဘူး။ လက်ရှိအမှားတွေဟာ တစ်ကြိမ်တည်းဖြစ်နိုင်ပါတယ်။</p>}
        </div>

        <div className="bg-[#fbf7ee] p-6 sm:p-8">
          <h3 className="font-black">Category Trend</h3>
          <div className="mt-4 space-y-3">
            {categoryTrends.map((item) => (
              <div key={item.category} className="flex items-center justify-between gap-3 rounded-xl border border-[#e2dccf] bg-[#fffdf8] p-3">
                <span className="text-sm font-bold">{categoryLabels[item.category]}</span>
                <span className="text-right text-sm font-black">{item.latest}% <small className={item.change > 0 ? "text-[#4f7b5e]" : item.change < 0 ? "text-[#c83f35]" : "text-[#8b8171]"}>({item.change > 0 ? "+" : ""}{item.change})</small></span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-6 text-[#746c60]">လက်ရှိအနည်းဆုံးက <strong>{categoryLabels[weakest.category]} {weakest.latest}%</strong> ဖြစ်ပါတယ်။ ပြောင်းလဲမှုက အစောဆုံးနဲ့ နောက်ဆုံး attempt ကို နှိုင်းယှဉ်ထားတာပါ။</p>
        </div>
      </div>
    </section>
  );
}
