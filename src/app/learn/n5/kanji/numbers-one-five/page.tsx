import type { Metadata } from "next";
import Link from "next/link";
import { KanjiStrokeDiagram } from "@/components/learning/kanji-stroke-diagram";
import { KanjiTracingSection } from "@/components/learning/kanji-tracing-section";
import { MeaningReveal } from "@/components/learning/meaning-reveal";
import { SoundButton } from "@/components/learning/sound-button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "Kanji Numbers 1–5 | N5" };

const numbers = [
  { char: "一", number: 1, mark: "1️⃣", image: "04e00", strokes: 1, on: "イチ", kun: "ひと・ひとつ", word: "ひとつ（一つ）", meaning: "တစ်ခု", story: "မျဉ်းတစ်ကြောင်းတည်းဆိုတော့ တစ် လို့မှတ်ပါ။ အပေါ်ကနေမဟုတ်ဘဲ ဘယ်ကနေညာကို ဆွဲမယ်။", key: "hitotsu" },
  { char: "二", number: 2, mark: "2️⃣", image: "04e8c", strokes: 2, on: "ニ", kun: "ふた・ふたつ", word: "ふたつ（二つ）", meaning: "နှစ်ခု", story: "မျဉ်းနှစ်ကြောင်း = နှစ်။ အပေါ်မျဉ်းတိုကို အရင်ဆွဲပြီး အောက်မျဉ်းရှည်ကို နောက်ဆွဲပါ။", key: "futatsu" },
  { char: "三", number: 3, mark: "3️⃣", image: "04e09", strokes: 3, on: "サン", kun: "み・みっつ", word: "みっつ（三つ）", meaning: "သုံးခု", story: "မျဉ်းသုံးကြောင်း = သုံး။ အပေါ်ကနေ အောက်ကို အစဉ်လိုက်ရေးပြီး အလယ်မျဉ်းအတိုဆုံးလို့ မှတ်ပါ။", key: "mittsu" },
  { char: "四", number: 4, mark: "4️⃣", image: "056db", strokes: 5, on: "シ", kun: "よ・よん・よっつ", word: "よっつ（四つ）", meaning: "လေးခု", story: "လေးထောင့်အခန်းထဲမှာ ခြေထောက်နှစ်ချောင်းကွဲနေတယ်လို့ မြင်ပါ။ အပြင်ဘောင်ကို အောက်ဆုံးမျဉ်းနဲ့ နောက်ဆုံးပိတ်မယ်။", key: "yottsu" },
  { char: "五", number: 5, mark: "5️⃣", image: "04e94", strokes: 4, on: "ゴ", kun: "いつ・いつつ", word: "いつつ（五つ）", meaning: "ငါးခု", story: "အပေါ်နဲ့အောက်မျဉ်းကြားမှာ ကွေ့ဆက်နေတဲ့ လမ်းတစ်ခုလို့ မှတ်ပါ။ ဆွဲချက် ၄ ချက်ရှိတယ်။", key: "itsutsu" },
];

export default function Page() {
  return <div className="washi-surface min-h-screen bg-[#f7f5ef] text-[#172033]">
    <header className="border-b border-[#ded8ca] bg-[#fffdf8]"><Container className="py-8 sm:py-10">
      <Link href="/learn/n5/kanji" className="text-xs font-bold text-[#746c60]">← Kanji Lessons</Link>
      <p className="mt-6 text-xs font-black tracking-[.2em] text-[#a33a32] uppercase">Lesson 02 · 数字</p>
      <h1 className="mt-2 text-3xl font-black sm:text-4xl">Kanji နံပါတ် ၁ မှ ၅</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#746c60]">`いち・に・さん…` ဆိုတဲ့ နံပါတ်အသံနဲ့ `ひとつ・ふたつ・みっつ…` ဆိုတဲ့ ပစ္စည်းရေတွက်ဖတ်ပုံ နှစ်မျိုးလုံးကို ခွဲမှတ်မယ်။ ဒီ lesson မှာ 一 ကနေ 五 အထိ ဆွဲတတ်အောင် လေ့ကျင့်မယ်။</p>
    </Container></header>
    <Container className="py-10 sm:py-14">
      <section className="rounded-[1.5rem] border border-[#d8c8aa] bg-[#fff8e7] p-6"><p className="text-xs font-black tracking-[.16em] text-[#9a6721] uppercase">ဖတ်ပုံနှစ်မျိုးကို ခွဲပါ</p><div className="mt-4 grid gap-4 sm:grid-cols-2"><div className="rounded-xl bg-[#fffdf8] p-4"><p className="font-black text-[#31513e]">On-reading</p><p className="mt-2 text-sm leading-7 text-[#625b50]">နံပါတ်၊ အချိန်၊ ရက်စွဲလို အခြား Kanji နဲ့ပေါင်းသုံးတဲ့အခါ များသောအားဖြင့် သုံးတယ်။</p></div><div className="rounded-xl bg-[#fffdf8] p-4"><p className="font-black text-[#31513e]">Kun-reading + つ</p><p className="mt-2 text-sm leading-7 text-[#625b50]">ပစ္စည်းအမျိုးအစားမခွဲဘဲ “တစ်ခု၊ နှစ်ခု” လို့ အထွေထွေရေတွက်ရာမှာ သုံးတယ်။</p></div></div></section>
      <div className="mt-10 space-y-8">{numbers.map((item) => <article key={item.char} className="overflow-hidden rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8]"><div className="grid lg:grid-cols-[18rem_1fr]">
        <div className="border-b border-[#ded8ca] bg-[#f2eee5] p-6 lg:border-b-0 lg:border-r"><div className="flex items-center justify-between"><span className="text-[10px] font-black tracking-[.16em] text-[#746c60]">NUMBER {item.number}</span><span className="text-4xl" role="img" aria-label={`${item.number}`}>{item.mark}</span></div><div className="mt-5"><KanjiStrokeDiagram character={item.char} asset={`/strokes/kanji/${item.image}.svg`} strokes={item.strokes} /></div></div>
        <div className="p-6 sm:p-8"><div className="flex items-start justify-between gap-5"><div><p lang="ja" className="text-7xl font-black text-[#a33a32]">{item.char}</p><p className="mt-2 text-lg font-black">နံပါတ် {item.number}</p></div><SoundButton audioUrl={`/audio/n5/kanji/numbers-one-five/${item.key}.mp3`} label={item.word} /></div>
          <div className="mt-6 rounded-2xl border border-[#e3c99b] bg-[#fff8e7] p-5"><p className="text-xs font-black tracking-[.15em] text-[#9a6721] uppercase">🧠 ဆွဲချက်မှတ်နည်း</p><p className="mt-3 text-sm font-bold leading-7 text-[#625b50]">{item.story}</p></div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2"><div className="rounded-xl bg-[#f2eee5] p-4"><p className="text-[10px] font-black text-[#746c60] uppercase">On-reading</p><p lang="ja" className="mt-2 text-lg font-black">{item.on}</p></div><div className="rounded-xl bg-[#e8efe9] p-4"><p className="text-[10px] font-black text-[#31513e] uppercase">Kun-reading</p><p lang="ja" className="mt-2 text-lg font-black">{item.kun}</p></div></div>
          <div className="mt-5 rounded-xl border border-[#ded8ca] p-4"><p className="text-[10px] font-black text-[#746c60] uppercase">ရေတွက်တဲ့အခါ</p><p lang="ja" className="mt-2 text-xl font-black text-[#a33a32]">{item.word}</p><MeaningReveal meaning={item.meaning} /></div>
        </div></div></article>)}</div>
      <div className="mt-12"><KanjiTracingSection characters={numbers.map((item) => item.char)} /></div>
      <aside className="mt-10 rounded-[1.5rem] border border-[#d8c8aa] bg-[#fff8e7] p-6"><p className="text-xs font-black tracking-[.16em] text-[#9a6721] uppercase">လွဲလွယ်သော ဖတ်ပုံ</p><p className="mt-3 text-sm leading-7 text-[#625b50]">四 ကို ပစ္စည်းလေးခုဆိုရင် `よっつ` လို့ဖတ်တယ်။ 五 က `いつつ` ဖြစ်ပြီး `いっつ` မဟုတ်ပါဘူး။ အသံကိုနှိပ်ပြီး စကားလုံးတစ်ခုစီ သုံးခါလိုက်ဆိုပါ။</p></aside>
      <div className="mt-10 flex justify-between gap-3"><Link href="/learn/n5/kanji/picture-kanji" className="rounded-xl border border-[#cfc6b7] bg-white px-5 py-3 text-sm font-bold">← Previous Lesson</Link><Link href="/learn/n5/kanji/lesson/numbers-six-ten" className="rounded-xl bg-[#d43d34] px-5 py-3 text-sm font-black text-white">Next Lesson →</Link></div>
      <p className="mt-8 text-center text-[10px] text-[#9a9185]">Stroke diagrams: KanjiVG · CC BY-SA 3.0</p>
    </Container>
  </div>;
}
