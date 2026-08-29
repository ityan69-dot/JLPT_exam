import type { Metadata } from "next";
import Link from "next/link";
import { HiraganaTracingSection } from "@/components/learning/hiragana-tracing-section";
import { StrokeOrderCard } from "@/components/learning/stroke-order-card";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "Hiragana A-row", description: "Hiragana あ・い・う・え・お ကို အသံ၊ stroke order နဲ့ tracing ဖြင့် လေ့လာရန်။" };
const characters = [
  { kana: "あ", romaji: "a", strokes: 3, asset: "a", hint: "ပထမအလျားလိုက်၊ ဒုတိယဒေါင်လိုက်၊ နောက်ဆုံးဝိုင်းတဲ့ဆွဲချက်ကို ဆက်ရေးပါ။" },
  { kana: "い", romaji: "i", strokes: 2, asset: "i", hint: "ဘယ်ဘက်ဆွဲချက်ကို အရင်ရေးပြီး ညာဘက်ကတိုတဲ့ဆွဲချက်ကို ဆက်ရေးပါ။" },
  { kana: "う", romaji: "u", strokes: 2, asset: "u", hint: "အပေါ်ကတိုတဲ့ဆွဲချက်ပြီးမှ အောက်ကကွေးတဲ့ဆွဲချက်ကို ရေးပါ။" },
  { kana: "え", romaji: "e", strokes: 2, asset: "e", hint: "အပေါ်ကတိုတဲ့ဆွဲချက်နဲ့ အောက်ကရှည်တဲ့ဆွဲချက် နှစ်ချက်ဖြစ်ပါတယ်။" },
  { kana: "お", romaji: "o", strokes: 3, asset: "o", hint: "အလျားလိုက်ကိုအရင်ရေးပြီး အလယ်ဆွဲချက်နဲ့ ညာဘက်အမှတ်ကို အစဉ်လိုက်ရေးပါ။" },
];

export default function HiraganaARowPage() {
  return (
    <div className="washi-surface min-h-screen bg-[#f7f5ef] text-[#172033]">
      <header className="border-b border-[#ded8ca] bg-[#fffdf8]">
        <Container className="py-6">
          <Link href="/learn/n5" className="text-xs font-bold text-[#746c60] hover:text-[#a33a32]">← N5 Course Overview</Link>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <div><p className="text-xs font-black tracking-[0.2em] text-[#a33a32] uppercase">Lesson 02 · あ行</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">Hiragana: あ・い・う・え・お</h1><p className="mt-3 text-sm text-[#746c60]">အသံနားထောင်မယ် · ဆွဲချက်အစဉ်ကြည့်မယ် · ကိုယ်တိုင်လိုက်ရေးမယ်</p></div>
            <span className="rounded-full bg-[#fff8e7] px-4 py-2 text-xs font-black text-[#8a5a18]">20–25 မိနစ်</span>
          </div>
        </Container>
      </header>
      <Container className="py-10 sm:py-14">
        <section>
          <p className="text-xs font-black tracking-[0.2em] text-[#a33a32] uppercase">Stroke Order · ဆွဲချက်အစဉ်</p>
          <h2 className="mt-3 text-3xl font-black">ပုံအတိုင်း အစဉ်လိုက်ရေးပါ</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#746c60]">အသံခလုတ်တစ်ခုစီက သက်ဆိုင်ရာစာလုံးအသံကိုပဲ နှစ်ကြိမ်ထွက်ပေးပါတယ်။</p>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{characters.map((character) => <StrokeOrderCard key={character.romaji} {...character} asset={`/strokes/hiragana/${character.asset}.svg`} audioUrl={`/audio/n5/hiragana/${character.romaji}.mp3`} />)}</div>
        </section>
        <div className="mt-12"><HiraganaTracingSection /></div>
        <div className="mt-8 flex flex-wrap justify-between gap-3">
          <Link href="/learn/n5/romaji" className="rounded-xl border border-[#cfc6b7] bg-[#fffdf8] px-5 py-3 text-sm font-bold text-[#514b41]">← Romaji Lesson</Link>
          <Link href="/learn/n5/hiragana/k-row" className="rounded-xl bg-[#c83f35] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#c83f35]/15 transition hover:bg-[#a92f28]">Next Lesson →</Link>
        </div>
        <p className="mt-8 text-center text-[10px] text-[#9b9489]">Stroke diagrams: strokesvg / Klee One (MIT & SIL OFL 1.1)</p>
      </Container>
    </div>
  );
}
