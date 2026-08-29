import type { Metadata } from "next";
import Link from "next/link";
import { HiraganaTracingSection } from "@/components/learning/hiragana-tracing-section";
import { StrokeOrderCard } from "@/components/learning/stroke-order-card";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "Hiragana S-row" };

const characters = [
  { kana: "さ", romaji: "sa", strokes: 3, asset: "sa", hint: "အလျားလိုက်ဆွဲချက်ကိုအရင်ရေးပြီး ဒေါင်လိုက်နဲ့ အောက်ကွေးဆွဲချက်ကို ဆက်ရေးပါ။" },
  { kana: "し", romaji: "shi", strokes: 1, asset: "shi", hint: "အပေါ်ကနေအောက်ဆင်းပြီး ညာဘက်သို့ပျော့ပျော့ကွေးပါ။ si မဟုတ်ဘဲ shi လို့ အသံထွက်ပါတယ်။" },
  { kana: "す", romaji: "su", strokes: 2, asset: "su", hint: "အလျားလိုက်ကိုအရင်ရေးပြီး ဒေါင်လိုက်ဆင်းကာ အလယ်မှာဝိုင်းပြီး အောက်သို့ဆက်ဆွဲပါ။" },
  { kana: "せ", romaji: "se", strokes: 3, asset: "se", hint: "အလျားလိုက်၊ ညာဘက်ဒေါင်လိုက်နဲ့ ဘယ်ဘက်ကနေဆက်တဲ့ အဓိကဆွဲချက်ကို အစဉ်လိုက်ရေးပါ။" },
  { kana: "そ", romaji: "so", strokes: 1, asset: "so", hint: "အပေါ်ပိုင်းကနေ ဇစ်ဇက်ပုံစံကွေးပြီး အောက်ဘက်ကို တစ်ချက်တည်းဆက်ရေးပါ။" },
];

export default function HiraganaSRowPage() {
  return <div className="washi-surface min-h-screen bg-[#f7f5ef] text-[#172033]">
    <header className="border-b border-[#ded8ca] bg-[#fffdf8]"><Container className="py-6">
      <Link href="/learn/n5" className="text-xs font-bold text-[#746c60] hover:text-[#a33a32]">← N5 Course Overview</Link>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-black tracking-[0.2em] text-[#a33a32] uppercase">Lesson 02 · さ行</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">Hiragana: さ・し・す・せ・そ</h1><p className="mt-3 text-sm text-[#746c60]">`し` ကို si မဟုတ်ဘဲ <strong>shi</strong> လို့ အသံထွက်တာ သတိထားပါ</p></div><span className="rounded-full bg-[#fff8e7] px-4 py-2 text-xs font-black text-[#8a5a18]">Hiragana 11–15 / 46</span></div>
    </Container></header>
    <Container className="py-10 sm:py-14"><section><p className="text-xs font-black tracking-[0.2em] text-[#a33a32] uppercase">Stroke Order · ဆွဲချက်အစဉ်</p><h2 className="mt-3 text-3xl font-black">အသံနားထောင်ပြီး အစဉ်လိုက်ရေးပါ</h2><div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{characters.map((character) => <StrokeOrderCard key={character.romaji} {...character} asset={`/strokes/hiragana/${character.asset}.svg`} audioUrl={`/audio/n5/hiragana/${character.romaji}.mp3`} />)}</div></section>
      <div className="mt-12"><HiraganaTracingSection characters={characters.map(({ kana }) => kana)} /></div>
      <div className="mt-8 flex flex-wrap justify-between gap-3"><Link href="/learn/n5/hiragana/k-row" className="rounded-xl border border-[#cfc6b7] bg-[#fffdf8] px-5 py-3 text-sm font-bold text-[#514b41]">← か行 ပြန်သွားမယ်</Link><Link href="/learn/n5/hiragana/t-row" className="rounded-xl bg-[#c83f35] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#c83f35]/15 hover:bg-[#a92f28]">Next Lesson →</Link></div>
      <p className="mt-8 text-center text-[10px] text-[#9b9489]">Stroke diagrams: strokesvg / Klee One (MIT & SIL OFL 1.1)</p>
    </Container>
  </div>;
}
