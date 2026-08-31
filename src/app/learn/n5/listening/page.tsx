import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { n5ListeningLessons } from "@/data/n5-listening-course";

export const metadata: Metadata = {
  title: "N5 Listening Course",
  description: "Natural Japanese အသံမှ အချိန်၊ နေရာ၊ လူနှင့် လုပ်ဆောင်ချက်ကို အဆင့်လိုက်နားထောင်လေ့ကျင့်မည့် N5 Listening Course။",
};

type ListeningLesson = { no: string; jp: string; title: string; detail: string; focus: string; time: string; href?: string };

const overviewLessons: ListeningLesson[] = [
  { no: "01", jp: "音と数字", title: "Sounds, Numbers & Time", detail: "အသံတူစကားလုံး၊ နံပါတ်၊ နာရီနဲ့ မိနစ်ကို နှေးနှေးကနေ သဘာဝအမြန်နှုန်းအထိ နားထောင်ခွဲမယ်။", focus: "Sound · Number · Time", time: "16 min" },
  { no: "02", jp: "短い質問", title: "Basic Questions", detail: "だれ・いつ・どこ・なに မေးခွန်းတွေကို ကြားတာနဲ့ ဘာအချက်မေးနေတယ်ဆိုတာ ခွဲမယ်။", focus: "Question words", time: "16 min" },
  { no: "03", jp: "応答", title: "Quick Responses", detail: "နေ့စဉ်နှုတ်ဆက်စကားနဲ့ မေးခွန်းတိုကို ကြားပြီး သဘာဝကျတဲ့ တုံ့ပြန်စကားကို ရွေးမယ်။", focus: "Short reply", time: "18 min" },
  { no: "04", jp: "ポイント理解", title: "Who, When & Where", detail: "စကားပြောထဲက လူ၊ အချိန်၊ နေရာနဲ့ နံပါတ်လို အဓိကအချက်တစ်ခုကို ဖမ်းယူမယ်။", focus: "Key points", time: "20 min" },
  { no: "05", jp: "順番と指示", title: "Instructions & Order", detail: "ဘာကိုအရင်လုပ်မလဲ၊ နောက်ဘာလုပ်မလဲဆိုတဲ့ အစီအစဉ်နဲ့ လမ်းညွှန်ချက်ကို နားထောင်မယ်။", focus: "First · Next · Last", time: "20 min" },
  { no: "06", jp: "課題理解", title: "Task-based Listening", detail: "စကားဝိုင်းအဆုံးမှာ လူက ဘာလုပ်ရမလဲဆိုတာ အကြောင်းအရာနဲ့ရွေးချယ်စရာကနေ ဆုံးဖြတ်မယ်။", focus: "Next action", time: "22 min" },
  { no: "07", jp: "発話表現", title: "Situation & Expression", detail: "ပုံနဲ့အခြေအနေကိုကြည့်ပြီး အဲ့ဒီအချိန်မှာ ဘာပြောသင့်လဲ၊ ဘယ်စကားက သဘာဝကျလဲ ရွေးမယ်။", focus: "Natural expression", time: "18 min" },
  { no: "08", jp: "聴解チェック", title: "Listening Check", detail: "ရှေ့ lesson ခုနစ်ခုက pattern တွေကို N5-style listening quiz နဲ့ ပေါင်းစပ်ပြန်စစ်မယ်။", focus: "Mixed practice", time: "15 min" },
];

const lessons = overviewLessons.map((lesson, index) => ({ ...lesson, href: `/learn/n5/listening/${n5ListeningLessons[index].slug}` }));

export default function N5ListeningPage() {
  return <div className="washi-surface min-h-screen bg-[#f7f5ef] text-[#172033]">
    <header className="relative overflow-hidden bg-[#111827] text-white">
      <div className="absolute -right-20 -top-28 size-80 rounded-full border-[48px] border-[#4f7b5e]/75" aria-hidden="true" />
      <Container className="relative py-12 sm:py-16">
        <Link href="/learn/n5" className="text-xs font-bold text-white/55 transition hover:text-white">← N5 Course Overview</Link>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_18rem] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-black tracking-[0.22em] text-[#9fd0ac] uppercase">Module 08 · 聴く</p>
            <h1 className="mt-3 text-4xl font-black sm:text-6xl">N5 Listening</h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-white/65 sm:text-base">အသံတိုင်းကို စာလုံးလိုက်ဘာသာပြန်ဖို့ မကြိုးစားဘဲ မေးခွန်းကို အရင်သိ၊ keyword ကိုဖမ်း၊ စကားပြောသူရဲ့ နောက်ဆုံးဆုံးဖြတ်ချက်ကို နားထောင်တတ်အောင် အဆင့်လိုက်လေ့ကျင့်မယ်။</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-4"><span className="flex size-12 items-center justify-center rounded-full bg-[#4f7b5e] text-xl" aria-hidden="true">♪</span><div><p className="text-xs font-bold text-white/45">ဒီ Module ပြီးရင်</p><p className="mt-1 text-lg font-black">N5 Audio Clues</p></div></div>
            <p className="mt-4 text-sm text-[#9fd0ac]">သဘာဝအသံထဲက ဖမ်းနိုင်မယ်</p>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-0 rounded-full bg-[#9fd0ac]" /></div>
            <p className="mt-2 text-[10px] text-white/40">0 / 8 lessons</p>
          </div>
        </div>
      </Container>
    </header>

    <Container className="py-10 sm:py-14">
      <section className="grid gap-6 lg:grid-cols-[1fr_19rem]">
        <div>
          <p className="text-xs font-black tracking-[0.2em] text-[#a33a32] uppercase">聴解ロードマップ · Listening Roadmap</p>
          <h2 className="mt-3 text-3xl font-black">အသံကိုသိခြင်းကနေ အဓိကအချက်ဖမ်းခြင်းအထိ</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#746c60]">Lesson တစ်ခုချင်းစီမှာ listening strategy၊ Natural Japanese audio၊ transcript ဖွင့်ကြည့်ခြင်းနဲ့ short practice ပါမယ်။</p>
          <div className="mt-7 space-y-4">
            {lessons.map((lesson, index) => {
              const card = <article className={`grid gap-5 rounded-[1.75rem] border p-5 sm:grid-cols-[4rem_1fr_auto] sm:items-center sm:p-6 ${index === 0 ? "border-[#b9cdbf] bg-[#fffdf8] shadow-[0_14px_40px_rgba(50,42,28,0.07)] transition hover:-translate-y-0.5 hover:border-[#4f7b5e]" : "border-[#ded8ca] bg-[#fbf9f4]"}`}>
                <span className="flex size-14 items-center justify-center rounded-full bg-[#4f7b5e] text-sm font-black text-white">{lesson.no}</span>
                <div><div className="flex flex-wrap items-center gap-2"><p lang="ja" className="text-xs font-black text-[#a33a32]">{lesson.jp}</p>{index === 0 && <span className="rounded-full bg-[#e7f0e9] px-2.5 py-1 text-[10px] font-black text-[#31513e]">START</span>}</div><h3 className="mt-1 text-xl font-black">{lesson.title}</h3><p className="mt-2 text-sm leading-7 text-[#746c60]">{lesson.detail}</p><p className="mt-3 text-xs font-bold text-[#31513e]">{lesson.focus}</p></div>
                <div className="flex items-center gap-3 sm:flex-col sm:items-end"><span className="rounded-full bg-[#eee9df] px-3 py-1.5 text-[11px] font-bold text-[#625b50]">{lesson.time}</span><span className="text-[11px] font-bold text-[#31513e]">သင်ခန်းစာစမယ် →</span></div>
              </article>;
              return lesson.href ? <Link key={lesson.no} href={lesson.href} className="block rounded-[1.75rem] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#4f7b5e]/25">{card}</Link> : <div key={lesson.no}>{card}</div>;
            })}
          </div>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[1.75rem] border border-[#d8c8aa] bg-[#fff8e7] p-6">
            <p className="text-xs font-black tracking-[0.18em] text-[#9a6721] uppercase">聴き方 · Listening Method</p>
            <h2 className="mt-3 text-xl font-black">တစ်ခါနားထောင်တိုင်း ရည်ရွယ်ချက်တစ်ခုထားမယ်</h2>
            <ol className="mt-5 space-y-4 text-sm leading-7 text-[#625b50]">{["ပထမအကြိမ် — အခြေအနေနဲ့ လူကိုသိမယ်","ဒုတိယအကြိမ် — keyword နဲ့ နံပါတ်ဖမ်းမယ်","အဖြေရွေးပြီးမှ transcript ဖွင့်မယ်","နောက်ဆုံး အသံနောက်ကလိုက်ပြောမယ်"].map((step,index)=><li key={step} className="flex gap-3"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#4f7b5e] text-[10px] font-black text-white">{index+1}</span><span>{step}</span></li>)}</ol>
          </div>
          <div className="rounded-[1.75rem] bg-[#111827] p-6 text-white">
            <p className="text-xs font-black tracking-[0.18em] text-[#9fd0ac] uppercase">Audio Rule</p>
            <p className="mt-3 text-sm leading-7 text-white/65">Lesson audio ကို browser voice တစ်သံတည်း မမှီခိုဘဲ Japanese အမျိုးသား/အမျိုးသမီး speaker ခွဲပြီး natural speed နဲ့ထည့်မယ်။ Audio မရှိသေးရင် button ကို ဖွင့်ထားမှာမဟုတ်ပါဘူး။</p>
          </div>
        </aside>
      </section>
    </Container>
  </div>;
}
