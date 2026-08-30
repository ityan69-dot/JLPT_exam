import type { Metadata } from "next";
import Link from "next/link";
import { KanjiQuizSession } from "@/components/learning/kanji-quiz-session";
import { Container } from "@/components/ui/container";
import { allN5KanjiForQuiz } from "@/data/n5-kanji-course";

export const metadata:Metadata={title:"N5 Kanji Quiz"};
export default function Page(){return <div className="washi-surface min-h-screen bg-[#f7f5ef] text-[#172033]"><header className="border-b border-[#ded8ca] bg-[#fffdf8]"><Container className="py-8 sm:py-10"><Link href="/learn/n5/kanji" className="text-xs font-bold text-[#746c60]">← Kanji Lessons</Link><p className="mt-6 text-xs font-black tracking-[.2em] text-[#a33a32] uppercase">N5 Kanji · Practice</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">Kanji Quiz</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-[#746c60]">N5 core Kanji ၈၀ လုံးကို ပုံ၊ အသံနဲ့ မြန်မာအဓိပ္ပာယ် သုံးမျိုးခွဲပြီး စမ်းပါ။ Mode တစ်ခုစီမှာ မေးခွန်း ၁၀ ခု ပါဝင်ပါတယ်။</p></Container></header><Container className="py-10 sm:py-14"><KanjiQuizSession items={allN5KanjiForQuiz}/></Container></div>}
