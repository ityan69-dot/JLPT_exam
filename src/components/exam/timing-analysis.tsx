import type { JLPTCategory, JLPTQuestion, TestResult } from "@/types/jlpt";

const categoryLabels: Record<JLPTCategory, string> = {
  Vocab: "ဝေါဟာရ",
  Grammar: "သဒ္ဒါ",
  Reading: "ဖတ်ရှုခြင်း",
  Listening: "နားထောင်ခြင်း",
};

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return minutes > 0 ? `${minutes} မိနစ် ${remainder} စက္ကန့်` : `${remainder} စက္ကန့်`;
}

export function TimingAnalysis({ questions, result }: { questions: JLPTQuestion[]; result: TestResult }) {
  const times = result.questionTimes;
  if (!times || Object.keys(times).length === 0) return null;

  const categories = (["Vocab", "Grammar", "Reading", "Listening"] as JLPTCategory[]).map((category) => {
    const items = questions.filter((question) => question.category === category);
    const totalSeconds = items.reduce((sum, question) => sum + (times[question.id] ?? 0), 0);
    const wrongCount = items.filter((question) => result.wrongQuestions.includes(question.id)).length;
    return {
      category,
      totalSeconds,
      averageSeconds: items.length ? Math.round(totalSeconds / items.length) : 0,
      accuracy: items.length ? Math.round(((items.length - wrongCount) / items.length) * 100) : 0,
    };
  });
  const slowest = [...categories].sort((a, b) => b.averageSeconds - a.averageSeconds)[0];
  const fastest = [...categories].sort((a, b) => a.averageSeconds - b.averageSeconds)[0];
  const speedRisk = categories.find((item) => item.category === fastest.category && item.accuracy < 60);

  return (
    <section className="mt-6 rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] p-6 shadow-[0_18px_50px_rgba(50,42,28,0.08)] sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-[#a33a32] uppercase">時間分析 · Timing Analysis</p>
          <h2 className="mt-2 text-2xl font-black">အချိန်အသုံးပြုမှုပုံစံ</h2>
        </div>
        <span className="text-xs font-bold text-[#746c60]">စုစုပေါင်း {formatDuration(result.totalDurationSeconds ?? 0)}</span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((item) => (
          <article key={item.category} className="rounded-2xl border border-[#ded8ca] bg-[#fbf7ee] p-5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-black">{categoryLabels[item.category]}</h3>
              <span className={`rounded-full px-2 py-1 text-[10px] font-black ${item.accuracy >= 70 ? "bg-[#eef4ef] text-[#31513e]" : "bg-[#fff1ed] text-[#9a342d]"}`}>{item.accuracy}%</span>
            </div>
            <p className="mt-4 text-2xl font-black">{item.averageSeconds}<span className="ml-1 text-xs text-[#746c60]">sec / question</span></p>
            <p className="mt-2 text-xs text-[#8b8171]">စုစုပေါင်း {formatDuration(item.totalSeconds)}</p>
          </article>
        ))}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-[#ead59d] bg-[#fff8e7] p-4 text-sm leading-7 text-[#654b19]">
          <strong>{categoryLabels[slowest.category]}</strong> မှာ တစ်ပုဒ်လျှင် ပျမ်းမျှ {slowest.averageSeconds} စက္ကန့်နဲ့ အချိန်အများဆုံးသုံးထားပါတယ်။ {slowest.accuracy >= 70 ? "နှေးပေမယ့် တိကျမှုကောင်းပါတယ်။" : "အချိန်ကုန်ပြီး accuracy နည်းနေသေးလို့ ဖြေဆိုနည်းကို ပြန်စစ်သင့်ပါတယ်။"}
        </div>
        <div className={`rounded-2xl border p-4 text-sm leading-7 ${speedRisk ? "border-[#efb9b2] bg-[#fff1ed] text-[#8f2d27]" : "border-[#c8d7cc] bg-[#eef4ef] text-[#31513e]"}`}>
          <strong>{categoryLabels[fastest.category]}</strong> ကို အမြန်ဆုံးဖြေထားပါတယ်။ {speedRisk ? `ဒါပေမယ့် accuracy ${fastest.accuracy}% ပဲရှိလို့ မေးခွန်းကို အလျင်လိုဖတ်မိသလား ပြန်စစ်သင့်ပါတယ်။` : `Accuracy ${fastest.accuracy}% ရှိလို့ speed နဲ့ accuracy ညီမျှမှုကောင်းပါတယ်။`}
        </div>
      </div>
      <p className="mt-4 text-xs leading-6 text-[#8b8171]">မေးခွန်း screen တစ်ခုစီပေါ်မှာရှိခဲ့တဲ့ elapsed time ကို ခန့်မှန်းမှတ်တမ်းတင်ထားခြင်းဖြစ်ပါတယ်။ Browser ကို လုံးဝပိတ်ထားတဲ့အချိန်ကို မထည့်တွက်ပါ။</p>
    </section>
  );
}
