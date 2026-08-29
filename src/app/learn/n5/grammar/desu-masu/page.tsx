import type { Metadata } from "next";
import Link from "next/link";
import { MeaningReveal } from "@/components/learning/meaning-reveal";
import { SoundButton } from "@/components/learning/sound-button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "N5 Grammar — です・ます" };
const examples = [
  { key: "watashi-wa-gakusei-desu", jp: "わたし は がくせい です。", romaji: "Watashi wa gakusei desu.", meaning: "ကျွန်တော် / ကျွန်မက ကျောင်းသားဖြစ်ပါတယ်။", note: "စာကြောင်းထဲက は ကို wa လို့ အသံထွက်ပါတယ်။" },
  { key: "kore-wa-hon-desu", jp: "これ は ほん です。", romaji: "Kore wa hon desu.", meaning: "ဒါက စာအုပ်ဖြစ်ပါတယ်။" },
  { key: "gakusei-dewa-arimasen", jp: "がくせい では ありません。", romaji: "Gakusei dewa arimasen.", meaning: "ကျောင်းသား မဟုတ်ပါဘူး။" },
  { key: "sensei-desu-ka", jp: "せんせい ですか。", romaji: "Sensei desu ka?", meaning: "ဆရာ / ဆရာမ ဖြစ်ပါသလား။" },
  { key: "pan-o-tabemasu", jp: "パン を たべます。", romaji: "Pan o tabemasu.", meaning: "ပေါင်မုန့် စားပါတယ်။", note: "စာကြောင်းထဲက を ကို o လို့ အသံထွက်ပါတယ်။" },
  { key: "ocha-o-nomimasen", jp: "おちゃ を のみません。", romaji: "Ocha o nomimasen.", meaning: "လက်ဖက်ရည် မသောက်ပါဘူး။" },
  { key: "gakkou-e-ikimasu-ka", jp: "がっこう へ いきますか。", romaji: "Gakkou e ikimasu ka?", meaning: "ကျောင်းကို သွားပါသလား။", note: "စာကြောင်းထဲက へ ကို e လို့ အသံထွက်ပါတယ်။" },
];
const patterns = [
  { label: "Noun · Positive", pattern: "A は B です", meaning: "A က B ဖြစ်ပါတယ်" },
  { label: "Noun · Negative", pattern: "A は B では ありません", meaning: "A က B မဟုတ်ပါဘူး" },
  { label: "Noun · Question", pattern: "A は B ですか", meaning: "A က B ဖြစ်ပါသလား" },
  { label: "Verb · Positive", pattern: "A は B を Vます", meaning: "A က B ကို လုပ်ပါတယ်" },
  { label: "Verb · Negative", pattern: "A は B を Vません", meaning: "A က B ကို မလုပ်ပါဘူး" },
  { label: "Verb · Question", pattern: "A は B を Vますか", meaning: "A က B ကို လုပ်ပါသလား" },
];

export default function Page() { return <div className="washi-surface min-h-screen bg-[#f7f5ef] text-[#172033]"><header className="border-b border-[#ded8ca] bg-[#fffdf8]"><Container className="py-7"><Link href="/learn/n5/grammar" className="text-xs font-bold text-[#746c60]">← Grammar Lessons</Link><p className="mt-6 text-xs font-black tracking-[.2em] text-[#a33a32] uppercase">Lesson 01 · です・ます</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">Basic Japanese Sentences</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-[#746c60]">`です` က နာမ်ဝါကျကို ယဉ်ကျေးစွာ အဆုံးသတ်ပေးပြီး `ます` က ကြိယာဝါကျကို ယဉ်ကျေးစွာ အဆုံးသတ်ပေးတယ်။</p></Container></header><Container className="py-10 sm:py-14"><section><p className="text-xs font-black tracking-[.18em] text-[#a33a32] uppercase">Sentence Patterns</p><h2 className="mt-2 text-2xl font-black">အရင်ဆုံး Pattern ကို နားလည်မယ်</h2><div className="mt-6 grid gap-4 md:grid-cols-2">{patterns.map((item) => <article key={item.label} className="rounded-[1.5rem] border border-[#ded8ca] bg-[#fffdf8] p-5"><p className="text-[10px] font-black tracking-[.14em] text-[#31513e] uppercase">{item.label}</p><p lang="ja" className="mt-3 text-xl font-black text-[#a33a32]">{item.pattern}</p><p className="mt-2 text-sm text-[#746c60]">{item.meaning}</p></article>)}</div></section><section className="mt-14"><p className="text-xs font-black tracking-[.18em] text-[#a33a32] uppercase">Examples with Audio</p><h2 className="mt-2 text-2xl font-black">ဥပမာဝါကျနဲ့ နားထောင်မယ်</h2><p className="mt-2 text-sm text-[#746c60]">အရင်ဆုံး Japanese ဝါကျကိုဖတ်ပြီး အဓိပ္ပာယ်ခန့်မှန်းပါ။ ပြီးမှ မြန်မာလို ဖွင့်ကြည့်ပါ။</p><div className="mt-6 space-y-4">{examples.map((example, index) => <article key={example.key} className="rounded-[1.5rem] border border-[#ded8ca] bg-[#fffdf8] p-5 sm:p-6"><div className="flex items-start justify-between gap-5"><div><p className="text-[10px] font-black tracking-[.15em] text-[#8a8276]">EXAMPLE {String(index + 1).padStart(2, "0")}</p><p lang="ja" className="mt-3 text-2xl font-black text-[#a33a32]">{example.jp}</p><p className="mt-2 text-xs font-bold text-[#746c60]">{example.romaji}</p></div><SoundButton audioUrl={`/audio/n5/grammar/desu-masu/${example.key}.mp3`} label={example.jp} /></div><MeaningReveal meaning={example.meaning} detail={example.note} /></article>)}</div></section><aside className="mt-10 rounded-[1.5rem] border border-[#d8c8aa] bg-[#fff8e7] p-6"><p className="text-xs font-black tracking-[.16em] text-[#9a6721] uppercase">မှတ်ရန်</p><p className="mt-3 text-sm leading-7 text-[#625b50]">`か` ကို ဝါကျအဆုံးမှာ ထည့်ရင် ယဉ်ကျေးတဲ့ မေးခွန်းဖြစ်သွားတယ်။ Japanese မှာ အကြောင်းအရာရှင်းနေရင် `わたし は` လို subject ကို ချန်ထားလို့လည်းရတယ်။</p></aside><div className="mt-10 flex flex-wrap justify-between gap-3"><Link href="/learn/n5/grammar" className="rounded-xl border border-[#cfc6b7] bg-white px-5 py-3 text-sm font-bold">← Grammar Lessons</Link><Link href="/learn/n5/grammar/core-particles" className="rounded-xl bg-[#d43d34] px-5 py-3 text-sm font-black text-white transition hover:bg-[#b92f28]">Next Lesson →</Link></div></Container></div>; }
