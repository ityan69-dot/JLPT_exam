import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "N5 Reading Course",
  description: "အခြေခံ Japanese ဝါကျ၊ message၊ notice နှင့် short passage များကို မြန်မာလို အဆင့်လိုက်လေ့လာမည့် N5 Reading Course။",
};

const lessons = [
  { no: "01", jp: "短い文", title: "Short Sentences", detail: "Particle၊ verb နဲ့ adjective ကိုရှာပြီး ဝါကျတိုတစ်ကြောင်းရဲ့ အဓိပ္ပာယ်ကို မှန်မှန်ဖတ်မယ်။", focus: "Sentence clues", time: "15 min" },
  { no: "02", jp: "メッセージ", title: "Messages & Notes", detail: "သူငယ်ချင်းစာ၊ မိသားစု note နဲ့ ချိန်းဆိုချက်ထဲက ဘယ်သူ၊ ဘယ်အချိန်၊ ဘယ်နေရာကို ဖမ်းမယ်။", focus: "Who · When · Where", time: "18 min" },
  { no: "03", jp: "お知らせ", title: "Signs & Notices", detail: "ဆိုင်ဖွင့်ချိန်၊ သတိပေးစာနဲ့ public sign တွေက လုပ်ရမယ့်အချက်ကို ရှာဖတ်မယ်။", focus: "Rules & schedules", time: "18 min" },
  { no: "04", jp: "短文読解", title: "Short Passages", detail: "နေ့စဉ်ဘဝအကြောင်း စာပိုဒ်တိုကို အစဉ်လိုက်ဖတ်ပြီး main idea နဲ့ detail ကို ခွဲမယ်။", focus: "Main idea · Detail", time: "22 min" },
  { no: "05", jp: "情報検索", title: "Information Reading", detail: "ဇယား၊ ကြော်ငြာနဲ့ timetable ထဲက မေးထားတဲ့အချက်ကို မြန်မြန်ရှာတတ်အောင် လေ့ကျင့်မယ်။", focus: "Scan for facts", time: "22 min" },
  { no: "06", jp: "読解クイズ", title: "Reading Check", detail: "သင်ခန်းစာငါးခုက pattern တွေကို N5-style quiz နဲ့ ပြန်စစ်မယ်။", focus: "Mixed practice", time: "15 min" },
];

export default function N5ReadingPage() {
  return (
    <div className="washi-surface min-h-screen bg-[#f7f5ef] text-[#172033]">
      <header className="relative overflow-hidden bg-[#111827] text-white">
        <div className="absolute -right-20 -top-28 size-80 rounded-full border-[48px] border-[#c83f35]/75" aria-hidden="true" />
        <Container className="relative py-12 sm:py-16">
          <Link href="/learn/n5" className="text-xs font-bold text-white/55 transition hover:text-white">← N5 Course Overview</Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_17rem] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-black tracking-[0.22em] text-[#ff9d94] uppercase">Module 07 · 読む</p>
              <h1 className="mt-3 text-4xl font-black sm:text-6xl">N5 Reading</h1>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-white/65 sm:text-base">စာလုံးတိုင်းကို ဘာသာပြန်နေရုံမဟုတ်ဘဲ ဝါကျရဲ့ clue ကိုရှာပြီး လိုအပ်တဲ့အဓိပ္ပာယ်ကို မြန်မြန်နားလည်တတ်အောင် မြန်မာလို အဆင့်လိုက်သင်မယ်။</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-bold text-white/45">ဒီ Module ပြီးရင်</p>
              <p className="mt-2 text-2xl font-black">N5 စာပိုဒ်တို</p>
              <p className="mt-1 text-sm text-[#9fd0ac]">ကိုယ်တိုင်ဖတ်နိုင်မယ်</p>
              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-0 rounded-full bg-[#c83f35]" /></div>
              <p className="mt-2 text-[10px] text-white/40">0 / 6 lessons</p>
            </div>
          </div>
        </Container>
      </header>

      <Container className="py-10 sm:py-14">
        <section className="grid gap-6 lg:grid-cols-[1fr_19rem]">
          <div>
            <p className="text-xs font-black tracking-[0.2em] text-[#a33a32] uppercase">読解ロードマップ · Reading Roadmap</p>
            <h2 className="mt-3 text-3xl font-black">ဝါကျတိုကနေ အချက်အလက်ရှာဖတ်ခြင်းအထိ</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#746c60]">Lesson တစ်ခုချင်းစီမှာ စကားလုံးအဓိပ္ပာယ်၊ ဖတ်နည်း strategy၊ နမူနာနဲ့ short practice ပါမယ်။</p>

            <div className="mt-7 space-y-4">
              {lessons.map((lesson, index) => {
                const content = <>
                  <span className="flex size-14 items-center justify-center rounded-full bg-[#c83f35] text-sm font-black text-white">{lesson.no}</span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2"><p lang="ja" className="text-xs font-black text-[#a33a32]">{lesson.jp}</p>{index === 5 && <span className="rounded-full bg-[#e7f0e9] px-2.5 py-1 text-[10px] font-black text-[#31513e]">FINAL</span>}</div>
                    <h3 className="mt-1 text-xl font-black">{lesson.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#746c60]">{lesson.detail}</p>
                    <p className="mt-3 text-xs font-bold text-[#31513e]">{lesson.focus}</p>
                  </div>
                  <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                    <span className="rounded-full bg-[#eee9df] px-3 py-1.5 text-[11px] font-bold text-[#625b50]">{lesson.time}</span>
                    <span className="text-[11px] font-bold text-[#9a9184]">{index === 5 ? "Reading Check ဖြေမယ် →" : "သင်ခန်းစာစမယ် →"}</span>
                  </div>
                </>;
                const href = ["/learn/n5/reading/short-sentences", "/learn/n5/reading/messages-notes", "/learn/n5/reading/signs-notices", "/learn/n5/reading/short-passages", "/learn/n5/reading/information-reading", "/learn/n5/reading/check"][index];
                return <Link key={lesson.no} href={href} className="grid gap-5 rounded-[1.75rem] border border-[#c9b895] bg-[#fffdf8] p-5 shadow-[0_14px_40px_rgba(50,42,28,0.07)] transition hover:-translate-y-0.5 hover:border-[#c83f35] sm:grid-cols-[4rem_1fr_auto] sm:items-center sm:p-6">{content}</Link>;
              })}
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[1.75rem] border border-[#d8c8aa] bg-[#fff8e7] p-6">
              <p className="text-xs font-black tracking-[0.18em] text-[#9a6721] uppercase">読み方 · Reading Method</p>
              <h2 className="mt-3 text-xl font-black">ဖတ်တဲ့အခါ ဒီအစဉ်လိုက်သွားမယ်</h2>
              <ol className="mt-5 space-y-4 text-sm leading-7 text-[#625b50]">
                {["အရင် မေးခွန်းကိုဖတ်မယ်","အချိန်၊ နေရာ၊ လူကို ဝိုင်းရှာမယ်","でも・から・そして clue ကိုဖမ်းမယ်","စာပိုဒ်ထဲက သက်သေနဲ့အဖြေရွေးမယ်"].map((step, index) => <li key={step} className="flex gap-3"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#c83f35] text-[10px] font-black text-white">{index + 1}</span><span>{step}</span></li>)}
              </ol>
            </div>
            <div className="rounded-[1.75rem] bg-[#111827] p-6 text-white">
              <p className="text-xs font-black tracking-[0.18em] text-[#9fd0ac] uppercase">Course Rule</p>
              <p className="mt-3 text-sm leading-7 text-white/65">Kanji အားလုံးမသိသေးလည်း context နဲ့ furigana ကိုသုံးပြီး ဖတ်တတ်အောင် လေ့ကျင့်မယ်။ မြန်မာအဓိပ္ပာယ်ကို အဖြေရွေးပြီးမှ ရှင်းပြပေးမယ်။</p>
            </div>
          </aside>
        </section>
      </Container>
    </div>
  );
}
