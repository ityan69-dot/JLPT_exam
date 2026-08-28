import type { Metadata } from "next";
import Link from "next/link";
import { HiraganaTracingSection } from "@/components/learning/hiragana-tracing-section";
import { StrokeOrderCard } from "@/components/learning/stroke-order-card";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "Hiragana K-row", description: "Hiragana か・き・く・け・こ ကို အသံ၊ stroke order နဲ့ tracing ဖြင့် လေ့လာရန်။" };
const characters = [
  { kana: "か", romaji: "ka", strokes: 3, asset: "ka", hint: "ဘယ်ဘက်ဆွဲချက်နှစ်ချက်ကို အရင်ရေးပြီး ညာဘက်ကွေးတဲ့ဆွဲချက်ကို နောက်ဆုံးရေးပါ။" },
  { kana: "き", romaji: "ki", strokes: 4, asset: "ki", hint: "အလျားလိုက်နှစ်ချက်၊ အလယ်ဆွဲချက်၊ နောက်ဆုံးအောက်ကွေးတဲ့ဆွဲချက် အစဉ်လိုက်ရေးပါ။" },
  { kana: "く", romaji: "ku", strokes: 1, asset: "ku", hint: "ဘယ်အပေါ်ကနေ ညာဘက်သို့ကွေးပြီး ဘယ်အောက်သို့ တစ်ချက်တည်းဆက်ရေးပါ။" },
  { kana: "け", romaji: "ke", strokes: 3, asset: "ke", hint: "ဘယ်ဘက်ဒေါင်လိုက်ကိုအရင်ရေးပြီး ညာဘက်အလျားလိုက်နဲ့ ကွေးဆွဲချက်ကို ဆက်ရေးပါ။" },
  { kana: "こ", romaji: "ko", strokes: 2, asset: "ko", hint: "အပေါ်ဆွဲချက်ပြီးမှ အောက်ဆွဲချက်ကို ဘယ်ကနေညာသို့ ရေးပါ။" },
];

export default function HiraganaKRowPage() {
  return <div className="washi-surface min-h-screen bg-[#f7f5ef] text-[#172033]"><header className="border-b border-[#ded8ca] bg-[#fffdf8]"><Container className="py-6"><Link href="/learn/n5/hiragana/a-row" className="text-xs font-bold text-[#746c60] hover:text-[#a33a32]">← あ行 Lesson</Link><div className="mt-5 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-black tracking-[0.2em] text-[#a33a32] uppercase">Lesson 03 · か行</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">Hiragana: か・き・く・け・こ</h1><p className="mt-3 text-sm text-[#746c60]">K အသံအုပ်စု · ဆွဲချက်အစဉ် · ကိုယ်တိုင်လိုက်ရေးခြင်း</p></div><span className="rounded-full bg-[#fff8e7] px-4 py-2 text-xs font-black text-[#8a5a18]">20–25 မိနစ်</span></div></Container></header><Container className="py-10 sm:py-14"><section><p className="text-xs font-black tracking-[0.2em] text-[#a33a32] uppercase">Stroke Order · ဆွဲချက်အစဉ်</p><h2 className="mt-3 text-3xl font-black">K အသံနဲ့ စာလုံးပုံစံကို တွဲမှတ်ပါ</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-[#746c60]">အသံခလုတ်ကိုနှိပ်ပြီး animation ပြတဲ့ဆွဲချက်အတိုင်း လက်နဲ့လိုက်ရေးပါ။</p><div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{characters.map((character) => <StrokeOrderCard key={character.romaji} {...character} asset={`/strokes/hiragana/${character.asset}.svg`} audioUrl={`/audio/n5/hiragana/${character.romaji}.mp3`} />)}</div></section><div className="mt-12"><HiraganaTracingSection characters={characters.map((character) => character.kana)} /></div><div className="mt-8 flex justify-between gap-3"><Link href="/learn/n5/hiragana/a-row" className="rounded-xl border border-[#cfc6b7] bg-[#fffdf8] px-5 py-3 text-sm font-bold text-[#514b41]">← あ行</Link><span className="rounded-xl bg-[#d7d1c5] px-5 py-3 text-sm font-bold text-[#7c7468]">さ行 · နောက်တစ်ဆင့်</span></div><p className="mt-8 text-center text-[10px] text-[#9b9489]">Stroke diagrams: strokesvg / Klee One (MIT & SIL OFL 1.1)</p></Container></div>;
}
