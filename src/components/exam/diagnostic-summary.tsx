import Link from "next/link";
import type { WeaknessAnalysis } from "@/types/analysis";
import type { JLPTCategory, TestResult } from "@/types/jlpt";

const categoryLabels: Record<JLPTCategory, string> = {
  Vocab: "ဝေါဟာရ",
  Grammar: "သဒ္ဒါ",
  Reading: "ဖတ်ရှုခြင်း",
  Listening: "နားထောင်ခြင်း",
};

type DiagnosticSummaryProps = {
  result: TestResult;
  analysis: WeaknessAnalysis;
};

function getResultBand(score: number) {
  if (score >= 80) return { label: "အခြေခံကောင်းပြီး စာမေးပွဲအတွက် နီးစပ်နေပါတယ်", tone: "text-[#24523a] bg-[#eef4ef] border-[#c8d7cc]" };
  if (score >= 60) return { label: "အခြေခံရှိပြီး အားနည်းတဲ့အပိုင်းတွေကို ဖြည့်ဖို့လိုပါတယ်", tone: "text-[#765716] bg-[#fff8e7] border-[#ead59d]" };
  return { label: "အခြေခံအပိုင်းတချို့ကို ဦးစားပေးပြန်တည်ဆောက်ဖို့လိုပါတယ်", tone: "text-[#8f2d27] bg-[#fff1ed] border-[#efb9b2]" };
}

export function DiagnosticSummary({ result, analysis }: DiagnosticSummaryProps) {
  const band = getResultBand(result.score);
  const strongCategory = analysis.strongestCategory;
  const weakCategory = analysis.weakestCategory;

  return (
    <section className="mt-6 overflow-hidden rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] shadow-[0_18px_50px_rgba(50,42,28,0.08)]">
      <div className="border-b border-[#e7e1d4] p-6 sm:p-8">
        <p className="text-xs font-bold tracking-[0.2em] text-[#a33a32] uppercase">診断結果 · Diagnostic Summary</p>
        <h2 className="mt-2 text-2xl font-black">ဒီ Result က ဘာပြောနေလဲ</h2>
        <div className={`mt-5 rounded-2xl border p-4 text-sm font-bold leading-7 ${band.tone}`}>
          {band.label}။ ဒီသတ်မှတ်ချက်က လက်ရှိ Mock Test raw score အပေါ်အခြေခံထားတာပါ။
        </div>
      </div>

      <div className="grid gap-px bg-[#e7e1d4] md:grid-cols-2">
        <article className="bg-[#fffdf8] p-6 sm:p-8">
          <p className="text-xs font-black text-[#4f7b5e]">အားသာချက်</p>
          <h3 className="mt-2 text-xl font-black">
            {strongCategory ? `${categoryLabels[strongCategory.category]} က အကောင်းဆုံးအပိုင်းပါ` : "အားသာချက်ဆုံးဖြတ်ဖို့ data မလုံလောက်သေးပါ"}
          </h3>
          {strongCategory && <p className="mt-2 text-sm leading-7 text-[#746c60]">Accuracy {strongCategory.percentage}% ရထားပါတယ်။ ဒီအပိုင်းကို မမေ့အောင် ပုံမှန်ပြန်စစ်ရုံနဲ့ လုံလောက်ပါတယ်။</p>}
        </article>
        <article className="bg-[#fff8f3] p-6 sm:p-8">
          <p className="text-xs font-black text-[#c83f35]">အဓိကလိုအပ်ချက်</p>
          <h3 className="mt-2 text-xl font-black">
            {weakCategory ? `${categoryLabels[weakCategory.category]} ကို အရင်ပြင်သင့်ပါတယ်` : "ပြင်ဆင်ရန်အပိုင်း မတွေ့သေးပါ"}
          </h3>
          {weakCategory && <p className="mt-2 text-sm leading-7 text-[#746c60]">Accuracy {weakCategory.percentage}% ဖြစ်ပြီး အခြား category တွေထက် နည်းနေပါတယ်။ နောက် Mock Test မတိုင်ခင် ဒီအပိုင်းကို ဦးစားပေးပါ။</p>}
        </article>
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-[#a33a32] uppercase">優先順位 · Top Requirements</p>
            <h3 className="mt-2 text-xl font-black">အခုလုပ်ရမယ့် အရေးကြီးဆုံးအချက်များ</h3>
          </div>
          <span className="text-xs text-[#746c60]">မှားတဲ့ pattern အများဆုံးမှ စီထားသည်</span>
        </div>

        {analysis.focusTags.length > 0 ? (
          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            {analysis.focusTags.map((item, index) => (
              <article key={item.tag} className="flex flex-col rounded-2xl border border-[#ded8ca] bg-[#fbf7ee] p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className={`flex size-9 items-center justify-center rounded-full text-sm font-black ${index === 0 ? "bg-[#c83f35] text-white" : "bg-[#eee9df] text-[#625b50]"}`}>{index + 1}</span>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-black ${item.severity === "critical" ? "bg-[#fff1ed] text-[#9a342d]" : "bg-[#fff8e7] text-[#765716]"}`}>{item.accuracy}% accuracy</span>
                </div>
                <h4 className="mt-4 font-black leading-7">{item.label}</h4>
                <p className="mt-2 flex-1 text-xs leading-6 text-[#746c60]">{item.attempts} ခုအနက် {item.wrong} ခု မှားထားပါတယ်။ {item.confidence === "low" ? "Data နည်းသေးလို့ ထပ်စမ်းပြီး အတည်ပြုသင့်ပါတယ်။" : "ထပ်ခါထပ်ခါဖြစ်နေတဲ့ weakness pattern ဖြစ်နိုင်ပါတယ်။"}</p>
                <Link href={`/practice/n3?tag=${encodeURIComponent(item.tag)}`} className="mt-4 flex min-h-11 items-center justify-center rounded-xl bg-[#c83f35] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#a92f28]">Focused Practice လုပ်မယ် →</Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-[#c8d7cc] bg-[#eef4ef] p-5 text-sm leading-7 text-[#31513e]">အခု result မှာ ထင်ရှားတဲ့ weakness tag မတွေ့ပါဘူး။ အဆင့်ကိုအတည်ပြုဖို့ နောက် Mock Test တစ်ကြိမ် ထပ်ဖြေပါ။</div>
        )}
      </div>
    </section>
  );
}
