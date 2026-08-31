import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "N5 Japanese Course",
  description: "Romaji, Hiragana, Katakana, vocabulary, grammar, kanji, reading and listening ပါဝင်သော N5 ဂျပန်စာသင်တန်း။",
};

const modules = [
  { no: "01", jp: "文字の基礎", title: "စာလုံးအခြေခံ", detail: "Romaji ဆိုတာဘာလဲ၊ ဂျပန်အသံစနစ်နဲ့ စာရေးကိရိယာကို မှန်မှန်ကိုင်နည်း", lessons: "3 lessons", active: true, href: "/learn/n5/romaji" },
  { no: "02", jp: "ひらがな", title: "Hiragana", detail: "あ行 ကနေ ん အထိ အသံထွက်၊ stroke order၊ tracing နဲ့ စကားလုံးများ", lessons: "12 lessons", active: true, href: "/learn/n5/hiragana/a-row" },
  { no: "03", jp: "カタカナ", title: "Katakana", detail: "ア行 ကနေ ン အထိ အသံထွက်၊ ဆွဲချက်အစဉ်၊ tracing နဲ့ အသံပြောင်း၊ ပေါင်းသံ၊ Quiz", lessons: "13 lessons", active: true, href: "/learn/n5/katakana/a-row" },
  { no: "04", jp: "ことば", title: "Vocabulary", detail: "Hiragana ဖတ်ပုံ၊ Romaji၊ မြန်မာအဓိပ္ပာယ်နဲ့ အသံကိုတွဲပြီး N5 အခြေခံစကားလုံးတွေ သင်မယ်", lessons: "20 lessons", active: true, href: "/learn/n5/vocabulary" },
  { no: "05", jp: "文法", title: "Grammar", detail: "です／ます၊ particles နဲ့ အခြေခံဝါကျတည်ဆောက်ပုံကို မြန်မာလိုရှင်းပြခြင်း", lessons: "18 lessons", active: true, href: "/learn/n5/grammar" },
  { no: "06", jp: "漢字", title: "Kanji", detail: "ပုံသဏ္ဌာန်မှတ်နည်း၊ ဆွဲချက်အစဉ်၊ ဖတ်ပုံနဲ့ N5 core Kanji ၈၀ လုံးကို တွဲသင်မယ်", lessons: "16 lessons", active: true, href: "/learn/n5/kanji" },
  { no: "07", jp: "読む", title: "Reading", detail: "အခြေခံဝါကျကနေ message၊ notice၊ short passage နဲ့ အချက်အလက်ရှာဖတ်ခြင်းအထိ အဆင့်လိုက်သင်မယ်", lessons: "6 lessons", active: true, href: "/learn/n5/reading" },
  { no: "08", jp: "聴く", title: "Listening", detail: "နေ့စဉ်စကားပြော၊ အချိန်၊ နေရာနဲ့ လိုအပ်တဲ့အချက်ကို Natural Japanese audio မှာ ဖမ်းယူနားလည်မယ်", lessons: "8 lessons", active: true, href: "/learn/n5/listening" },
];

export default function N5CoursePage() {
  return (
    <div className="washi-surface min-h-screen bg-[#f7f5ef] text-[#172033]">
      <section className="relative overflow-hidden bg-[#111827] py-12 text-white sm:py-16">
        <div className="absolute -right-16 -top-28 size-80 rounded-full border-[48px] border-[#4f7b5e]/80" aria-hidden="true" />
        <Container className="relative">
          <Link href="/#courses" className="text-xs font-bold text-white/55 transition hover:text-white">← Learning Courses</Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-black tracking-[0.22em] text-[#9fd0ac] uppercase">入門 · Beginner Course</p>
              <h1 className="mt-4 text-4xl font-black sm:text-6xl">N5 ဂျပန်စာ အခြေခံ</h1>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-white/65 sm:text-base">Romaji ကနေ စပြီး Hiragana၊ Katakana ကို ဖတ်တတ်၊ ရေးတတ်အောင်သင်မယ်။ ပြီးရင် N5 Vocabulary၊ Grammar၊ Kanji၊ Reading နဲ့ Listening ကို အဆင့်ဆင့်ဆက်လေ့လာမယ်။</p>
            </div>
            <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-white/10 text-center">
              <div className="bg-[#111827]/95 p-4"><p className="text-xl font-black">96</p><p className="mt-1 text-[10px] text-white/45">Lessons</p></div>
              <div className="bg-[#111827]/95 p-4"><p className="text-xl font-black">8</p><p className="mt-1 text-[10px] text-white/45">Modules</p></div>
              <div className="bg-[#111827]/95 p-4"><p className="text-xl font-black">0%</p><p className="mt-1 text-[10px] text-white/45">Progress</p></div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-10 sm:py-14">
        <section className="grid gap-5 lg:grid-cols-[1fr_20rem]">
          <div>
            <p className="text-xs font-black tracking-[0.2em] text-[#a33a32] uppercase">学習ロードマップ · Course Roadmap</p>
            <h2 className="mt-3 text-3xl font-black">အခြေခံကနေ အဆင့်ဆင့်သွားမယ်</h2>
            <div className="mt-7 space-y-4">
              {modules.map((module) => {
                const card = (
                <article className={`grid gap-5 rounded-2xl border border-[#ded8ca] bg-[#fffdf8] p-5 sm:grid-cols-[4rem_1fr_auto] sm:items-center sm:p-6 ${module.href ? "transition hover:-translate-y-0.5 hover:border-[#4f7b5e] hover:shadow-lg" : "opacity-70"}`}>
                  <span className={`flex size-14 items-center justify-center rounded-full text-sm font-black ${module.active ? "bg-[#4f7b5e] text-white" : "bg-[#eee9df] text-[#8a8276]"}`}>{module.no}</span>
                  <div><p lang="ja" className="text-xs font-bold text-[#a33a32]">{module.jp}</p><h3 className="mt-1 text-xl font-black">{module.title}</h3><p className="mt-2 text-sm leading-7 text-[#746c60]">{module.detail}</p></div>
                  <span className={`w-fit rounded-full px-3 py-1.5 text-[11px] font-bold ${module.href ? "bg-[#e5eee7] text-[#31513e]" : "bg-[#eee9df] text-[#625b50]"}`}>{module.href ? `${module.lessons} · ဖွင့်မယ် →` : module.lessons}</span>
                </article>
                );

                return module.href ? <Link key={module.no} href={module.href} className="block rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#4f7b5e]/25">{card}</Link> : <div key={module.no}>{card}</div>;
              })}
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[1.75rem] border border-[#d8c8aa] bg-[#fff8e7] p-6">
              <p className="text-xs font-black tracking-[0.18em] text-[#9a6721] uppercase">書き方 · Writing Practice</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="relative flex aspect-square items-center justify-center rounded-2xl border border-[#d8c8aa] bg-[#fffdf8] text-6xl font-medium" lang="ja"><span className="absolute inset-x-0 top-1/2 border-t border-dashed border-[#d8c8aa]" /><span className="absolute inset-y-0 left-1/2 border-l border-dashed border-[#d8c8aa]" /><span className="relative">あ</span></div>
                <div className="flex flex-col justify-center"><p className="text-3xl font-black">a</p><p className="mt-2 text-xs leading-6 text-[#746c60]">ဆွဲချက် ၃ ချက်<br />Stroke 1 → 2 → 3</p></div>
              </div>
              <ul className="mt-5 space-y-2 text-xs leading-6 text-[#625b50]"><li>✓ ဆွဲချက်အစဉ် animation</li><li>✓ မျဉ်းကြောင်းလိုက် tracing</li><li>✓ ကိုယ်တိုင်ရေးတဲ့ practice grid</li><li>✓ ရေးပြီးမှတ်မိမှု quick quiz</li></ul>
            </div>
          </aside>
        </section>
      </Container>
    </div>
  );
}
