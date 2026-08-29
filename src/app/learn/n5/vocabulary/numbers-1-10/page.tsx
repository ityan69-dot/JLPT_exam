import type { Metadata } from "next";
import Link from "next/link";
import { MeaningReveal } from "@/components/learning/meaning-reveal";
import { SoundButton } from "@/components/learning/sound-button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "Japanese Numbers 1–10" };
const words = [
  { number: "1", reading: "いち", romaji: "ichi", meaning: "တစ်", note: "အခြေခံဖတ်ပုံက いち ဖြစ်ပါတယ်။" },
  { number: "2", reading: "に", romaji: "ni", meaning: "နှစ်", note: "လူနှစ်ယောက်ကို ふたり လို့ သီးခြားပြောပါတယ်။" },
  { number: "3", reading: "さん", romaji: "san", meaning: "သုံး", note: "နေ့စဉ်ရေတွက်ရာမှာ さん လို့ ဖတ်ပါတယ်။" },
  { number: "4", reading: "よん", romaji: "yon", meaning: "လေး", note: "し လို့လည်းဖတ်ပေမယ့် ရေတွက်ရာမှာ よん ကို များသုံးပါတယ်။" },
  { number: "5", reading: "ご", romaji: "go", meaning: "ငါး", note: "အခြေခံဖတ်ပုံက ご ဖြစ်ပါတယ်။" },
  { number: "6", reading: "ろく", romaji: "roku", meaning: "ခြောက်", note: "အခြေခံဖတ်ပုံက ろく ဖြစ်ပါတယ်။" },
  { number: "7", reading: "なな", romaji: "nana", meaning: "ခုနစ်", note: "しち လို့လည်းဖတ်ပါတယ်။ နံပါတ်အဖြစ် なな က ရှင်းလင်းပါတယ်။" },
  { number: "8", reading: "はち", romaji: "hachi", meaning: "ရှစ်", note: "အခြေခံဖတ်ပုံက はち ဖြစ်ပါတယ်။" },
  { number: "9", reading: "きゅう", romaji: "kyuu", meaning: "ကိုး", note: "く လို့လည်းဖတ်ပေမယ့် ရေတွက်ရာမှာ きゅう ကို များသုံးပါတယ်။" },
  { number: "10", reading: "じゅう", romaji: "juu", meaning: "တစ်ဆယ်", note: "၁၁ ကို じゅういち ဆိုပြီး ဆက်ပေါင်းဖတ်ပါတယ်။" },
];

export default function Page() {
  return <div className="washi-surface min-h-screen bg-[#f7f5ef] text-[#172033]">
    <header className="border-b border-[#ded8ca] bg-[#fffdf8]"><Container className="py-7"><Link href="/learn/n5/vocabulary" className="text-xs font-bold text-[#746c60]">← Vocabulary Topics</Link><p className="mt-6 text-xs font-black tracking-[.2em] text-[#a33a32] uppercase">Lesson 01 · Numbers</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">Japanese Numbers 1–10</h1><p className="mt-3 text-sm text-[#746c60]">Hiragana ဖတ်ပုံ၊ Romaji၊ မြန်မာအဓိပ္ပာယ်နဲ့ အသံကို တွဲမှတ်ပါ။ Kanji ကို နောက်ပိုင်းသီးသန့်သင်မယ်။</p></Container></header>
    <Container className="py-10 sm:py-14"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{words.map((word) => <article key={word.number} className="rounded-[1.75rem] border border-[#ded8ca] bg-[#fffdf8] p-5 shadow-sm"><div className="flex items-start justify-between"><span className="flex size-12 items-center justify-center rounded-full bg-[#4f7b5e] text-lg font-black text-white">{word.number}</span><SoundButton audioUrl={`/audio/n5/vocabulary/numbers/${word.romaji}.mp3`} label={word.reading} /></div><p lang="ja" className="mt-5 text-4xl font-black text-[#a33a32]">{word.reading}</p><p className="mt-1 text-xs font-bold text-[#8a8276]">{word.romaji}</p><MeaningReveal meaning={word.meaning} detail={word.note} /></article>)}</div><div className="mt-10 flex justify-between gap-3"><Link href="/learn/n5/vocabulary" className="rounded-xl border border-[#cfc6b7] bg-white px-5 py-3 text-sm font-bold">← Topics</Link><Link href="/learn/n5/vocabulary/time-hours" className="rounded-xl bg-[#c83f35] px-5 py-3 text-sm font-black text-white">Next Lesson →</Link></div></Container>
  </div>;
}
