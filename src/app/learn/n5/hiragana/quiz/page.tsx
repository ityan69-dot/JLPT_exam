import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { HiraganaQuizSession } from "@/components/learning/hiragana-quiz-session";
export const metadata:Metadata={title:"Hiragana Listening Quiz"};
export default function Page(){return <div className="washi-surface min-h-screen bg-[#f7f5ef] text-[#172033]"><header className="border-b border-[#ded8ca] bg-[#fffdf8]"><Container className="py-7"><Link href="/learn/n5/hiragana/combined-sounds" className="text-xs font-bold text-[#746c60] hover:text-[#a33a32]">← Hiragana Sounds</Link><p className="mt-6 text-xs font-black tracking-[.2em] text-[#a33a32] uppercase">Listening Practice · 10 Questions</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">Hiragana Quiz</h1><p className="mt-3 text-sm text-[#746c60]">လေ့ကျင့်ချင်တဲ့ Quiz mode တစ်ခုရွေးပါ။</p></Container></header><Container className="py-10 sm:py-14"><HiraganaQuizSession/></Container></div>;}
