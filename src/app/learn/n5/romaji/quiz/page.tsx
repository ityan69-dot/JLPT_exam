import type { Metadata } from "next";
import Link from "next/link";
import { RomajiQuizSession } from "@/components/learning/romaji-quiz-session";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "Romaji Quiz Practice", description: "Natural Japanese audio ပါဝင်သော Romaji quick practice မေးခွန်း ၅ ခု။" };

export default function RomajiQuizPage() {
  return <div className="washi-surface min-h-screen bg-[#f7f5ef] text-[#172033]"><header className="border-b border-[#ded8ca] bg-[#fffdf8]"><Container className="py-6"><Link href="/learn/n5/romaji" className="text-xs font-bold text-[#746c60] hover:text-[#a33a32]">← Romaji Lesson</Link><p className="mt-5 text-xs font-black tracking-[0.2em] text-[#a33a32] uppercase">Quick Practice · 5 Questions</p><h1 className="mt-2 text-3xl font-black">Romaji Quiz</h1></Container></header><Container className="py-10 sm:py-14"><RomajiQuizSession /></Container></div>;
}
