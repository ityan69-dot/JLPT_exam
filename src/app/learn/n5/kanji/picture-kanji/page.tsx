import type { Metadata } from "next";
import Link from "next/link";
import { KanjiStrokeDiagram } from "@/components/learning/kanji-stroke-diagram";
import { KanjiTracingSection } from "@/components/learning/kanji-tracing-section";
import { MeaningReveal } from "@/components/learning/meaning-reveal";
import { SoundButton } from "@/components/learning/sound-button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "Picture Kanji | N5" };

const kanji = [
  { char: "日", picture: "☀️", image: "065e5", strokes: 4, meaning: "နေ၊ နေ့", story: "အလယ်မှာ အလင်းတန်းပါတဲ့ လေးထောင့်နေမင်းလို့ မြင်ပါ။", on: "ニチ・ジツ", kun: "ひ・び", word: "ひ（日）", wordMeaning: "နေ့ / နေရောင်", key: "hi" },
  { char: "月", picture: "🌙", image: "06708", strokes: 4, meaning: "လ၊ လပိုင်း", story: "လခြမ်းထဲမှာ အလင်းတန်းနှစ်ကြောင်း ရှိနေတဲ့ပုံလို့ မှတ်ပါ။", on: "ゲツ・ガツ", kun: "つき", word: "つき（月）", wordMeaning: "လမင်း", key: "tsuki" },
  { char: "山", picture: "⛰️", image: "05c71", strokes: 3, meaning: "တောင်", story: "တောင်ထိပ်သုံးခု တန်းစီနေတဲ့ ပုံစံပါ။ အလယ်တောင်က အမြင့်ဆုံး။", on: "サン", kun: "やま", word: "やま（山）", wordMeaning: "တောင်", key: "yama" },
  { char: "川", picture: "🌊", image: "05ddd", strokes: 3, meaning: "မြစ်", story: "ရေစီးကြောင်းသုံးကြောင်း အပေါ်ကနေ အောက်ကို စီးဆင်းနေတာလို့ မြင်ပါ။", on: "セン", kun: "かわ", word: "かわ（川）", wordMeaning: "မြစ်", key: "kawa" },
  { char: "人", picture: "🧍", image: "04eba", strokes: 2, meaning: "လူ", story: "လူတစ်ယောက် ခြေနှစ်ချောင်းခွဲပြီး လမ်းလျှောက်နေတာလို့ မှတ်ပါ။", on: "ジン・ニン", kun: "ひと", word: "ひと（人）", wordMeaning: "လူ", key: "hito" },
];

export default function Page() {
  return <div className="washi-surface min-h-screen bg-[#f7f5ef] text-[#172033]">
    <header className="border-b border-[#ded8ca] bg-[#fffdf8]"><Container className="py-8 sm:py-10">
      <Link href="/learn/n5/kanji" className="text-xs font-bold text-[#746c60]">← Kanji Lessons</Link>
      <p className="mt-6 text-xs font-black tracking-[.2em] text-[#a33a32] uppercase">Lesson 01 · 象形文字</p>
      <h1 className="mt-2 text-3xl font-black sm:text-4xl">ပုံကနေ ဖြစ်လာတဲ့ Kanji</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#746c60]">Kanji ၅ လုံးကို ပုံရိပ် → အဓိပ္ပာယ် → ဆွဲချက် → ဖတ်ပုံ အစီအစဉ်နဲ့ မှတ်မယ်။ On-reading အကုန်အလွတ်မကျက်သေးဘဲ အရင်ဆုံး အသုံးများတဲ့ Kun-reading နဲ့ စကားလုံးကို ဦးစားပေးပါ။</p>
    </Container></header>
    <Container className="py-10 sm:py-14">
      <div className="space-y-8">{kanji.map((item, index) => <article key={item.char} className="overflow-hidden rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8]">
        <div className="grid lg:grid-cols-[18rem_1fr]">
          <div className="border-b border-[#ded8ca] bg-[#f2eee5] p-6 lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between"><span className="text-[10px] font-black tracking-[.16em] text-[#746c60]">KANJI {String(index + 1).padStart(2, "0")}</span><span className="text-4xl" role="img" aria-label={item.meaning}>{item.picture}</span></div>
            <div className="mt-5"><KanjiStrokeDiagram character={item.char} asset={`/strokes/kanji/${item.image}.svg`} strokes={item.strokes} /></div>
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-5"><div><p lang="ja" className="text-7xl font-black text-[#a33a32]">{item.char}</p><p className="mt-2 text-lg font-black">{item.meaning}</p></div><SoundButton audioUrl={`/audio/n5/kanji/picture-kanji/${item.key}.mp3`} label={item.word} /></div>
            <div className="mt-6 rounded-2xl border border-[#e3c99b] bg-[#fff8e7] p-5"><p className="text-xs font-black tracking-[.15em] text-[#9a6721] uppercase">🧠 ပုံနဲ့မှတ်နည်း</p><p className="mt-3 text-sm font-bold leading-7 text-[#625b50]">{item.story}</p></div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2"><div className="rounded-xl bg-[#f2eee5] p-4"><p className="text-[10px] font-black text-[#746c60] uppercase">On-reading</p><p lang="ja" className="mt-2 text-lg font-black">{item.on}</p></div><div className="rounded-xl bg-[#e8efe9] p-4"><p className="text-[10px] font-black text-[#31513e] uppercase">Kun-reading</p><p lang="ja" className="mt-2 text-lg font-black">{item.kun}</p></div></div>
            <div className="mt-5 rounded-xl border border-[#ded8ca] p-4"><p className="text-[10px] font-black text-[#746c60] uppercase">ပထမဆုံး မှတ်ရမယ့်စကားလုံး</p><p lang="ja" className="mt-2 text-xl font-black text-[#a33a32]">{item.word}</p><MeaningReveal meaning={item.wordMeaning} /></div>
          </div>
        </div>
      </article>)}</div>
      <div className="mt-12"><KanjiTracingSection characters={kanji.map((item) => item.char)} /></div>
      <aside className="mt-10 rounded-[1.5rem] border border-[#d8c8aa] bg-[#fff8e7] p-6"><p className="text-xs font-black tracking-[.16em] text-[#9a6721] uppercase">လေ့ကျင့်နည်း</p><p className="mt-3 text-sm leading-7 text-[#625b50]">ပုံ emoji ကိုကြည့်ပြီး Kanji ကို မျက်စိထဲဖော်ကြည့်ပါ။ ပြီးရင် stroke animation ကို တစ်ခါကြည့်၊ tracing pad မှာ သုံးခါရေး၊ နောက်ဆုံး အသံကိုနှိပ်ပြီး စကားလုံးကို သုံးခါလိုက်ဆိုပါ။</p></aside>
      <div className="mt-10 flex justify-between gap-3"><Link href="/learn/n5/kanji" className="rounded-xl border border-[#cfc6b7] bg-white px-5 py-3 text-sm font-bold">← Kanji Lessons</Link><Link href="/learn/n5/kanji/numbers-one-five" className="rounded-xl bg-[#d43d34] px-5 py-3 text-sm font-black text-white transition hover:bg-[#b92f28]">Next Lesson →</Link></div>
      <p className="mt-8 text-center text-[10px] text-[#9a9185]">Stroke diagrams: KanjiVG · CC BY-SA 3.0</p>
    </Container>
  </div>;
}
