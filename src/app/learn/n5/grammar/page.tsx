import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "N5 Grammar" };
const lessons = [
  { no: "01", jp: "です・ます", title: "Basic Sentences", detail: "နာမ်ဝါကျ၊ ကြိယာဝါကျ၊ အငြင်းနဲ့ မေးခွန်းပုံစံ", href: "/learn/n5/grammar/desu-masu", active: true },
  { no: "02", jp: "は・が・を", title: "Core Particles", detail: "Topic၊ subject နဲ့ object ကို ခွဲသုံးပုံ", href: "/learn/n5/grammar/core-particles", active: true },
  { no: "03", jp: "これ・それ・あれ", title: "This, That & Which", detail: "အနီးအဝေးအလိုက် ပစ္စည်းညွှန်ပြပုံ", href: "/learn/n5/grammar/demonstratives", active: true },
  { no: "04", jp: "あります・います", title: "Existence & Location", detail: "လူ၊ တိရစ္ဆာန်နဲ့ ပစ္စည်းတည်ရှိရာကို ပြောပုံ", href: "/learn/n5/grammar/existence-location", active: true },
  { no: "05", jp: "い・な けいようし", title: "Adjective Sentences", detail: "い-adjective နဲ့ な-adjective ဝါကျတည်ဆောက်ပုံ", href: "/learn/n5/grammar/adjectives", active: true },
  { no: "06", jp: "かこ・ひてい", title: "Past & Negative", detail: "အတိတ်နဲ့ အငြင်းပုံစံ အခြေခံပြောင်းနည်း", href: "/learn/n5/grammar/past-negative", active: true },
  { no: "07", jp: "に・へ・で", title: "Time, Direction & Place", detail: "အချိန်၊ ဦးတည်ရာ၊ လုပ်ဆောင်ရာနေရာနဲ့ နည်းလမ်းကို ခွဲသုံးပုံ", href: "/learn/n5/grammar/ni-e-de", active: true },
  { no: "08", jp: "と・も・の", title: "And, Also & Possession", detail: "အတူ၊ လည်းနဲ့ ပိုင်ဆိုင်မှုကို နာမ်တွေနဲ့ ဆက်သုံးပုံ", href: "/learn/n5/grammar/to-mo-no", active: true },
  { no: "09", jp: "てフォーム", title: "Verb て-form", detail: "Verb အုပ်စုအလိုက် て-form ပြောင်းနည်းနဲ့ အထူးပုံစံများ", href: "/learn/n5/grammar/te-form", active: true },
];

export default function Page() { return <div className="washi-surface min-h-screen bg-[#f7f5ef] text-[#172033]"><header className="bg-[#111827] text-white"><Container className="py-12 sm:py-16"><Link href="/learn/n5" className="text-xs font-bold text-white/55 hover:text-white">← N5 Course Overview</Link><p className="mt-8 text-xs font-black tracking-[.2em] text-[#9fd0ac] uppercase">Module 05 · 文法</p><h1 className="mt-3 text-4xl font-black sm:text-5xl">N5 Grammar</h1><p className="mt-4 max-w-2xl text-sm leading-8 text-white/65">Pattern ကိုအလွတ်ကျက်ရုံမဟုတ်ဘဲ မြန်မာလိုအဓိပ္ပာယ်၊ စကားလုံးအစီအစဉ်နဲ့ အသံထွက်ကို တွဲပြီး ဝါကျတည်ဆောက်တတ်အောင် အဆင့်လိုက်သင်မယ်။</p></Container></header><Container className="py-10 sm:py-14"><p className="text-xs font-black tracking-[.2em] text-[#a33a32] uppercase">Grammar Roadmap</p><h2 className="mt-3 text-3xl font-black">ဝါကျအခြေခံကနေ စမယ်</h2><div className="mt-7 grid gap-5 md:grid-cols-2">{lessons.map((lesson) => { const card = <article className={`h-full rounded-[1.75rem] border border-[#ded8ca] bg-[#fffdf8] p-6 ${lesson.active ? "transition hover:-translate-y-1 hover:border-[#4f7b5e] hover:shadow-lg" : "opacity-55"}`}><span className={`flex size-12 items-center justify-center rounded-full text-xs font-black ${lesson.active ? "bg-[#4f7b5e] text-white" : "bg-[#eee9df] text-[#8a8276]"}`}>{lesson.no}</span><p lang="ja" className="mt-5 text-sm font-black text-[#a33a32]">{lesson.jp}</p><h3 className="mt-1 text-xl font-black">{lesson.title}</h3><p className="mt-3 text-sm leading-7 text-[#746c60]">{lesson.detail}</p><p className="mt-5 text-xs font-black text-[#31513e]">{lesson.active ? "သင်ခန်းစာဖွင့်မယ် →" : "မကြာမီ"}</p></article>; return lesson.href ? <Link key={lesson.no} href={lesson.href}>{card}</Link> : <div key={lesson.no}>{card}</div>; })}</div></Container></div>; }
