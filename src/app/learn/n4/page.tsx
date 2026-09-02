import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { N4CourseDashboard } from "@/components/learning/n4-course-dashboard";

export const metadata: Metadata = { title: "N4 Japanese Course", description: "မြန်မာဘာသာဖြင့် သင်ယူနိုင်သော JLPT N4 Vocabulary, Grammar, Kanji, Reading နှင့် Listening course။" };

export default function N4CoursePage() {
  return <div className="washi-surface min-h-screen bg-[#f7f5ef] text-[#172033]">
    <section className="relative overflow-hidden bg-[#111827] py-12 text-white sm:py-16"><div className="absolute -right-16 -top-24 size-80 rounded-full border-[48px] border-[#477d8c]/70" aria-hidden="true" /><Container className="relative"><Link href="/#courses" className="text-xs font-bold text-white/55 hover:text-white">← Learning Courses</Link><div className="mt-8 max-w-3xl"><p className="text-xs font-black tracking-[.22em] text-[#8fc3d0] uppercase">初級 · Elementary Course</p><h1 className="mt-4 text-4xl font-black sm:text-6xl">N4 ဂျပန်စာ သင်တန်း</h1><p className="mt-5 text-sm leading-8 text-white/65 sm:text-base">N5 အခြေခံကနေတက်ပြီး နေ့စဉ်အခြေအနေတွေမှာ နားလည်ပြောဆိုနိုင်ဖို့ Vocabulary၊ Grammar၊ Kanji၊ Reading နဲ့ Listening ကို အဆင့်လိုက်လေ့လာမယ်။</p><div className="mt-7 flex flex-wrap gap-2 text-[11px] font-bold text-white/70"><span className="rounded-full bg-white/10 px-3 py-2">33 Lessons</span><span className="rounded-full bg-white/10 px-3 py-2">မြန်မာရှင်းလင်းချက်</span><span className="rounded-full bg-white/10 px-3 py-2">Audio Practice</span><span className="rounded-full bg-white/10 px-3 py-2">Mini Check</span></div></div></Container></section>
    <Container className="py-10 sm:py-14"><div className="mb-8"><p className="text-xs font-black tracking-[.2em] text-[#a33a32] uppercase">学習ロードマップ · Course Roadmap</p><h2 className="mt-3 text-3xl font-black">N4 အဆင့်အတွက် သင်ခန်းစာအားလုံး</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-[#746c60]">Module အစဉ်လိုက်သင်နိုင်သလို မိမိလိုအပ်တဲ့ lesson ကို တိုက်ရိုက်ရွေးပြီးလည်း လေ့လာနိုင်ပါတယ်။</p></div><N4CourseDashboard /></Container>
  </div>;
}
