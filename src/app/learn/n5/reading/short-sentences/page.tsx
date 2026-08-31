import type { Metadata } from "next";
import Link from "next/link";
import { ReadingMiniPractice } from "@/components/learning/reading-mini-practice";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "N5 Reading — Short Sentences", description: "N5 Japanese ဝါကျတိုများကို clue ရှာပြီး မြန်မာလိုနားလည်အောင် လေ့လာမည့် lesson။" };

const examples = [
  { label: "Time", jp: "わたしは まいにち 六時に おきます。", chunks: ["わたしは · ကျွန်တော်/ကျွန်မက", "まいにち · နေ့တိုင်း", "六時に · ၆ နာရီမှာ", "おきます · အိပ်ရာထပါတယ်"], meaning: "ကျွန်တော်/ကျွန်မ နေ့တိုင်း ၆ နာရီမှာ အိပ်ရာထပါတယ်။", clue: "六時に + おきます" },
  { label: "Place", jp: "きのう としょかんで ほんを よみました。", chunks: ["きのう · မနေ့က", "としょかんで · စာကြည့်တိုက်မှာ", "ほんを · စာအုပ်ကို", "よみました · ဖတ်ခဲ့ပါတယ်"], meaning: "မနေ့က စာကြည့်တိုက်မှာ စာအုပ်ဖတ်ခဲ့ပါတယ်။", clue: "で = action ဖြစ်တဲ့နေရာ" },
  { label: "Negative", jp: "あには コーヒーを のみません。", chunks: ["あには · အစ်ကိုက", "コーヒーを · ကော်ဖီကို", "のみません · မသောက်ပါဘူး"], meaning: "အစ်ကိုက ကော်ဖီမသောက်ပါဘူး။", clue: "ません = မလုပ်ပါဘူး" },
  { label: "Adjective", jp: "この かばんは おおきいです。", chunks: ["この かばんは · ဒီအိတ်က", "おおきい · ကြီးတယ်", "です · ဖြစ်ပါတယ်"], meaning: "ဒီအိတ်က ကြီးပါတယ်။", clue: "おおきい = ကြီးသော" },
];

export default function Page() {
  return <div className="washi-surface min-h-screen bg-[#f7f5ef] text-[#172033]">
    <header className="border-b border-[#ded8ca] bg-[#fffdf8]"><Container className="py-8 sm:py-10"><Link href="/learn/n5/reading" className="text-xs font-bold text-[#746c60] hover:text-[#a33a32]">← Reading Lessons</Link><p className="mt-7 text-xs font-black tracking-[.2em] text-[#a33a32] uppercase">Lesson 01 · 短い文</p><h1 className="mt-2 text-3xl font-black sm:text-5xl">Short Sentences</h1><p className="mt-4 max-w-2xl text-sm leading-8 text-[#746c60]">ဝါကျတိုတစ်ကြောင်းကို စာလုံးတိုင်းပြန်မယ့်အစား ဘယ်သူ၊ ဘယ်အချိန်/နေရာ၊ ဘာလုပ်တယ် ဆိုတဲ့ clue သုံးခုနဲ့ မြန်မြန်နားလည်တတ်အောင် လေ့ကျင့်မယ်။</p></Container></header>
    <Container className="py-10 sm:py-14">
      <section className="grid gap-5 md:grid-cols-3">{[
        ["01", "Topic ကိုရှာ", "は・が ရှေ့က လူ ဒါမှမဟုတ် အရာကို အရင်ဖမ်းပါ။"],
        ["02", "Clue ကိုဝိုင်း", "အချိန်၊ နေရာနဲ့ object ကိုပြတဲ့ に・で・を ကိုရှာပါ။"],
        ["03", "အဆုံးကိုစစ်", "ます・ません・ました က action နဲ့ tense ကို ဆုံးဖြတ်ပေးတယ်။"],
      ].map(([no,title,detail]) => <article key={no} className="rounded-[1.5rem] border border-[#ded8ca] bg-[#fffdf8] p-6"><span className="flex size-10 items-center justify-center rounded-full bg-[#c83f35] text-xs font-black text-white">{no}</span><h2 className="mt-5 text-lg font-black">{title}</h2><p className="mt-2 text-sm leading-7 text-[#746c60]">{detail}</p></article>)}</section>

      <section className="mt-14"><p className="text-xs font-black tracking-[.18em] text-[#a33a32] uppercase">Guided Reading</p><h2 className="mt-2 text-2xl font-black">Clue ခွဲပြီး ဖတ်ကြည့်မယ်</h2><div className="mt-6 space-y-5">{examples.map((example, index) => <article key={example.jp} className="rounded-[1.75rem] border border-[#ded8ca] bg-[#fffdf8] p-5 sm:p-7"><div className="flex flex-wrap items-center justify-between gap-3"><p className="text-[10px] font-black tracking-[.16em] text-[#8a8276]">EXAMPLE {String(index + 1).padStart(2,"0")}</p><span className="rounded-full bg-[#e7f0e9] px-3 py-1 text-[10px] font-black text-[#31513e]">{example.label}</span></div><p lang="ja" className="mt-4 text-xl font-black leading-9 text-[#a33a32] sm:text-2xl">{example.jp}</p><div className="mt-5 flex flex-wrap gap-2">{example.chunks.map(chunk => <span key={chunk} className="rounded-lg bg-[#f2eee5] px-3 py-2 text-xs font-bold text-[#625b50]">{chunk}</span>)}</div><div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center"><p className="text-sm font-bold leading-7">{example.meaning}</p><span className="rounded-xl border border-[#e2c99a] bg-[#fff8e7] px-4 py-2 text-xs font-black text-[#9a6721]">KEY · {example.clue}</span></div></article>)}</div></section>

      <aside className="mt-10 rounded-[1.75rem] bg-[#111827] p-6 text-white sm:p-8"><p className="text-xs font-black tracking-[.18em] text-[#9fd0ac] uppercase">N5 Reading Tip</p><h2 className="mt-3 text-xl font-black">အဆုံးက စကားလုံးကို မလွတ်ပါနဲ့</h2><p className="mt-3 text-sm leading-7 text-white/65">`のみます` နဲ့ `のみません` က ません လေးတစ်ခုပဲကွာပေမယ့် အဓိပ္ပာယ်က ဆန့်ကျင်သွားတယ်။ JLPT ရွေးချယ်ခွင့်တွေမှာ ဒီလို positive / negative ကို လှည့်မေးတတ်ပါတယ်။</p></aside>

      <section className="mt-14"><p className="text-xs font-black tracking-[.18em] text-[#a33a32] uppercase">Mini Practice</p><h2 className="mt-2 text-2xl font-black">နားလည်ပြီလား စစ်ကြည့်မယ်</h2><p className="mt-2 mb-6 text-sm text-[#746c60]">မေးခွန်း ၃ ခုဖြေပြီးတာနဲ့ score နဲ့ ရှင်းလင်းချက်ကို ချက်ချင်းမြင်ရမယ်။</p><ReadingMiniPractice /></section>
      <div className="mt-10 flex flex-wrap justify-between gap-3"><Link href="/learn/n5/reading" className="rounded-xl border border-[#cfc6b7] bg-white px-5 py-3 text-sm font-bold">← Reading Lessons</Link><Link href="/learn/n5/reading/messages-notes" className="rounded-xl bg-[#c83f35] px-5 py-3 text-sm font-black text-white">Next Lesson · Messages & Notes →</Link></div>
    </Container>
  </div>;
}
