import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { testConfigs } from "@/data/test-config";
import type { JLPTLevel } from "@/types/jlpt";

const levels = ["N5", "N4", "N3", "N2", "N1"] as const;

function getLevel(value: string): JLPTLevel | null {
  const normalized = value.toUpperCase();
  return levels.includes(normalized as JLPTLevel)
    ? (normalized as JLPTLevel)
    : null;
}

export function generateStaticParams() {
  return levels.map((level) => ({ level: level.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: PageProps<"/test/setup/[level]">): Promise<Metadata> {
  const level = getLevel((await params).level);

  return {
    title: level ? `${level} စာမေးပွဲအချက်အလက်` : "စာမေးပွဲအချက်အလက်",
  };
}

export default async function TestSetupPage({
  params,
}: PageProps<"/test/setup/[level]">) {
  const level = getLevel((await params).level);

  if (!level) {
    notFound();
  }

  const config = testConfigs[level];

  return (
    <div className="washi-surface flex-1 py-10 sm:py-14">
      <Container>
        <nav aria-label="စာမေးပွဲအဆင့်များ" className="mb-8 flex flex-wrap items-center gap-2 text-xs font-bold">
          <span className="rounded-full border border-stone-200 bg-[#fffdf8] px-3 py-1.5 text-stone-500">一 · Level ရွေးချယ်ခြင်း</span>
          <span className="h-px w-5 bg-stone-300" aria-hidden="true" />
          <span className="rounded-full bg-[#111827] px-3 py-1.5 text-white">二 · ပြင်ဆင်ခြင်း</span>
          <span className="h-px w-5 bg-stone-300" aria-hidden="true" />
          <span className="rounded-full border border-stone-200 bg-[#fffdf8] px-3 py-1.5 text-stone-500">三 · စာမေးပွဲ</span>
        </nav>

        <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-start">
          <section className="relative overflow-hidden rounded-[2rem] bg-[#111827] text-white shadow-2xl shadow-slate-950/15">
            <div className="absolute -right-12 -top-20 size-64 rounded-full bg-[#c83f35]" aria-hidden="true" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" aria-hidden="true" />

            <div className="relative border-b border-white/10 p-6 sm:p-9">
              <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3 text-sm font-bold text-[#ffcc80]">
                    <span className="size-2 rounded-full bg-[#ef5348]" aria-hidden="true" />
                    <span lang="ja">受験案内</span>
                    <span className="text-white/30">/</span>
                    <span>စာမေးပွဲပြင်ဆင်မှု</span>
                  </div>
                  <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">{config.level} · {config.title}</h1>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">{config.description}</p>
                </div>
                <div className="relative flex size-24 shrink-0 items-center justify-center rounded-full border-4 border-white/30 bg-[#fffdf8] text-3xl font-black text-[#111827] shadow-xl">
                  {config.level}
                  <span lang="ja" className="absolute -bottom-3 rounded-full bg-[#c83f35] px-3 py-1 font-serif text-[10px] text-white">模擬</span>
                </div>
              </div>
            </div>

            <div className="relative grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-3">
              <div className="bg-[#111827]/95 p-5 sm:p-6">
                <p className="text-xs font-semibold text-slate-400">စုစုပေါင်းအချိန် · 時間</p>
                <p className="mt-2 text-2xl font-black">{config.totalMinutes} <span className="text-sm font-semibold text-slate-400">မိနစ်</span></p>
              </div>
              <div className="bg-[#111827]/95 p-5 sm:p-6">
                <p className="text-xs font-semibold text-slate-400">ခန့်မှန်းမေးခွန်း · 問題</p>
                <p className="mt-2 text-2xl font-black">~{config.estimatedQuestions} <span className="text-sm font-semibold text-slate-400">ခု</span></p>
              </div>
              <div className="col-span-2 bg-[#111827]/95 p-5 sm:col-span-1 sm:p-6">
                <p className="text-xs font-semibold text-slate-400">စာမေးပွဲပိုင်း · 科目</p>
                <p className="mt-2 text-2xl font-black">{config.sections.length} <span className="text-sm font-semibold text-slate-400">ပိုင်း</span></p>
              </div>
            </div>
          </section>

          <aside className="rounded-[2rem] border border-stone-200 bg-[#fffdf8] p-6 shadow-sm lg:row-span-2">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-[#c83f35] font-serif text-xs font-bold text-white">準</span>
              <p className="text-xs font-black tracking-widest text-[#b3312b] uppercase">အဆင်သင့်ဖြစ်ပြီလား</p>
            </div>
            <h2 className="mt-4 text-xl font-black text-slate-950">မစတင်ခင် စစ်ဆေးပါ</h2>
            <p lang="ja" className="mt-1 font-serif text-xs tracking-[0.12em] text-stone-400">試験前の確認</p>

            <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-600">
              {[
                "အင်တာနက်ချိတ်ဆက်မှု တည်ငြိမ်ပါစေ။",
                "Listening အတွက် နားကြပ် သို့မဟုတ် အသံကို စစ်ဆေးပါ။",
                "စာမေးပွဲကြားမှာ page ကို refresh မလုပ်ပါနဲ့။",
                "အပိုင်းတစ်ပိုင်းပြီးသွားရင် ပြန်ဝင်ပြင်လို့ မရနိုင်ပါ။",
              ].map((rule, index) => (
                <li key={rule} className="flex gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-[#d9a5a1] bg-[#faecea] text-[10px] font-black text-[#a92f28]" aria-hidden="true">{index + 1}</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>

            {level === "N3" ? (
              <Link href="/test/exam/n3" className="mt-7 flex min-h-13 w-full items-center justify-center rounded-xl bg-[#c83f35] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-900/15 transition hover:bg-[#a92f28] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-200">
                စာမေးပွဲ စတင်မယ် →
              </Link>
            ) : (
              <button type="button" disabled className="mt-7 flex min-h-13 w-full cursor-not-allowed items-center justify-center rounded-xl bg-stone-200 px-5 py-3.5 text-sm font-bold text-stone-500" aria-describedby="start-note">
                စာမေးပွဲ စတင်မယ်
              </button>
            )}
            <p id="start-note" className="mt-3 text-center text-xs leading-5 text-stone-500">
              {level === "N3" ? "Official item-type structure ကိုအခြေခံထားတဲ့ original N3 မေးခွန်း ၂၄ ခုဖြင့် စမ်းသပ်နိုင်ပါတယ်။" : `${level} question bank ကို နောက်ပိုင်းထည့်ပါမယ်။`}
            </p>
            {level === "N3" && (
              <div className="mt-3 grid gap-2">
                <Link href="/test/exam/n3?dev=1" className="flex min-h-11 items-center justify-center rounded-xl border border-[#d09a2f]/50 bg-[#fff8e7] px-5 py-3 text-sm font-bold text-[#765716] transition hover:border-[#d09a2f]">Developer Test Mode သုံးမယ်</Link>
                <Link href="/question-review/n3" className="flex min-h-11 items-center justify-center rounded-xl border border-[#4f7b5e]/40 bg-[#eef4ef] px-5 py-3 text-sm font-bold text-[#31513e] transition hover:border-[#4f7b5e]">Expert Question Review ဖွင့်မယ်</Link>
              </div>
            )}
            <Link href="/" className="mt-5 flex min-h-11 items-center justify-center rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-stone-500 hover:bg-stone-50">Level ပြန်ရွေးမယ်</Link>
          </aside>

          <section className="rounded-[2rem] border border-stone-200 bg-[#fffdf8] p-6 shadow-sm sm:p-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-[#b3312b]">စာမေးပွဲဖွဲ့စည်းပုံ</p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">ဖြေဆိုရမယ့် အပိုင်းများ</h2>
                <p lang="ja" className="mt-1 font-serif text-xs tracking-[0.12em] text-stone-400">試験科目と時間</p>
              </div>
              <p className="hidden text-xs font-semibold text-stone-500 sm:block">အချိန်ကို အပိုင်းအလိုက် ကန့်သတ်ထားသည်</p>
            </div>

            <div className="mt-6 space-y-3">
              {config.sections.map((section, index) => (
                <div key={section.japaneseName} className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-[#faf8f2] p-4 transition hover:border-stone-300 hover:bg-white sm:p-5">
                  <div className={`flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-black text-white ${section.accent}`}>{index + 1}</div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-950">{section.name}</p>
                    <p lang="ja" className="mt-1 font-serif text-xs text-stone-500">{section.japaneseName}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-lg font-black text-slate-950">{section.durationMinutes}</p>
                    <p className="text-xs text-stone-500">မိနစ်</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[#e5c8a0] bg-[#fff6e7] p-4 text-sm leading-7 text-[#704c20]">
              <strong>注意 · သတိပြုရန် — </strong> အချိန်ပြည့်သွားပါက လက်ရှိအပိုင်းကို အလိုအလျောက်တင်ပြီး နောက်အပိုင်းသို့ ရွှေ့ပေးပါမယ်။
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
