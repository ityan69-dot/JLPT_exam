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
    <div className="flex-1 bg-slate-100 py-10 sm:py-14">
      <Container>
        <nav aria-label="စာမေးပွဲအဆင့်များ" className="mb-8 flex items-center gap-2 text-xs font-bold">
          <span className="rounded-full bg-red-600 px-3 py-1.5 text-white">1 · Level ရွေးချယ်ခြင်း</span>
          <span className="h-px w-5 bg-slate-300" aria-hidden="true" />
          <span className="rounded-full bg-slate-950 px-3 py-1.5 text-white">2 · ပြင်ဆင်ခြင်း</span>
          <span className="h-px w-5 bg-slate-300" aria-hidden="true" />
          <span className="rounded-full bg-white px-3 py-1.5 text-slate-500">3 · စာမေးပွဲ</span>
        </nav>

        <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-start">
          <div className="overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl shadow-slate-950/15">
            <div className="relative border-b border-white/10 p-6 sm:p-9">
              <div className="absolute -right-16 -top-16 size-52 rounded-full bg-red-600/20 blur-3xl" aria-hidden="true" />
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-amber-300">REAL MOCK TEST · ပြင်ဆင်မှု</p>
                  <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{config.level} · {config.title}</h1>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">{config.description}</p>
                </div>
                <div className="flex size-24 shrink-0 items-center justify-center rounded-3xl bg-white text-3xl font-black text-slate-950 shadow-xl">{config.level}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-3">
              <div className="bg-slate-950 p-5 sm:p-6">
                <p className="text-xs font-semibold text-slate-400">စုစုပေါင်းအချိန်</p>
                <p className="mt-2 text-2xl font-black">{config.totalMinutes} <span className="text-sm font-semibold text-slate-400">မိနစ်</span></p>
              </div>
              <div className="bg-slate-950 p-5 sm:p-6">
                <p className="text-xs font-semibold text-slate-400">ခန့်မှန်းမေးခွန်း</p>
                <p className="mt-2 text-2xl font-black">~{config.estimatedQuestions} <span className="text-sm font-semibold text-slate-400">ခု</span></p>
              </div>
              <div className="col-span-2 bg-slate-950 p-5 sm:col-span-1 sm:p-6">
                <p className="text-xs font-semibold text-slate-400">စာမေးပွဲပိုင်း</p>
                <p className="mt-2 text-2xl font-black">{config.sections.length} <span className="text-sm font-semibold text-slate-400">ပိုင်း</span></p>
              </div>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:row-span-2">
            <p className="text-xs font-black tracking-widest text-red-600 uppercase">အဆင်သင့်ဖြစ်ပြီလား</p>
            <h2 className="mt-3 text-xl font-black text-slate-950">မစတင်ခင် စစ်ဆေးပါ</h2>
            <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
              {[
                "အင်တာနက်ချိတ်ဆက်မှု တည်ငြိမ်ပါစေ။",
                "Listening အတွက် နားကြပ် သို့မဟုတ် အသံကို စစ်ဆေးပါ။",
                "စာမေးပွဲကြားမှာ page ကို refresh မလုပ်ပါနဲ့။",
                "အပိုင်းတစ်ပိုင်းပြီးသွားရင် ပြန်ဝင်ပြင်လို့ မရနိုင်ပါ။",
              ].map((rule) => (
                <li key={rule} className="flex gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-black text-emerald-800" aria-hidden="true">✓</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>

            {level === "N3" ? (
              <Link href="/test/exam/n3" className="mt-7 flex min-h-13 w-full items-center justify-center rounded-xl bg-red-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-200">
                စာမေးပွဲ စတင်မယ် →
              </Link>
            ) : (
              <button type="button" disabled className="mt-7 flex min-h-13 w-full cursor-not-allowed items-center justify-center rounded-xl bg-slate-300 px-5 py-3.5 text-sm font-bold text-slate-600" aria-describedby="start-note">
                စာမေးပွဲ စတင်မယ်
              </button>
            )}
            <p id="start-note" className="mt-3 text-center text-xs leading-5 text-slate-500">
              {level === "N3" ? "လက်ရှိ N3 နမူနာမေးခွန်း ၅ ခုဖြင့် စမ်းသပ်နိုင်ပါတယ်။" : `${level} question bank ကို နောက်ပိုင်းထည့်ပါမယ်။`}
            </p>
            <Link href="/" className="mt-5 flex min-h-11 items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-500 hover:bg-slate-50">Level ပြန်ရွေးမယ်</Link>
          </aside>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-red-600">စာမေးပွဲဖွဲ့စည်းပုံ</p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">ဖြေဆိုရမယ့် အပိုင်းများ</h2>
              </div>
              <p className="hidden text-xs font-semibold text-slate-500 sm:block">အချိန်ကို အပိုင်းအလိုက် ကန့်သတ်ထားသည်</p>
            </div>

            <div className="mt-6 space-y-3">
              {config.sections.map((section, index) => (
                <div key={section.japaneseName} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                  <div className={`flex size-11 shrink-0 items-center justify-center rounded-xl text-sm font-black text-white ${section.accent}`}>{index + 1}</div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-950">{section.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{section.japaneseName}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-lg font-black text-slate-950">{section.durationMinutes}</p>
                    <p className="text-xs text-slate-500">မိနစ်</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-950">
              <strong>သတိပြုရန် — </strong> အချိန်ပြည့်သွားပါက လက်ရှိအပိုင်းကို အလိုအလျောက်တင်ပြီး နောက်အပိုင်းသို့ ရွှေ့ပေးပါမယ်။
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
