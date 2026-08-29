import Link from "next/link";
import { Container } from "@/components/ui/container";
import { HiraganaTracingSection } from "@/components/learning/hiragana-tracing-section";
import { StrokeOrderCard } from "@/components/learning/stroke-order-card";

export type HiraganaCharacter = { kana: string; romaji: string; strokes: number; hint: string };
type RowLink = { href: string; label: string };
type Props = { row: string; characters: HiraganaCharacter[]; progress: string; note: string; previous: RowLink; next?: RowLink };

export function HiraganaRowLesson({ row, characters, progress, note, previous, next }: Props) {
  const list = characters.map(({ kana }) => kana).join("・");
  return <div className="washi-surface min-h-screen bg-[#f7f5ef] text-[#172033]">
    <header className="border-b border-[#ded8ca] bg-[#fffdf8]"><Container className="py-6">
      <Link href="/learn/n5" className="text-xs font-bold text-[#746c60] hover:text-[#a33a32]">← N5 Course Overview</Link>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-black tracking-[0.2em] text-[#a33a32] uppercase">Lesson 02 · {row}</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">Hiragana: {list}</h1><p className="mt-3 text-sm text-[#746c60]">{note}</p></div><span className="rounded-full bg-[#fff8e7] px-4 py-2 text-xs font-black text-[#8a5a18]">Hiragana {progress} / 46</span></div>
    </Container></header>
    <Container className="py-10 sm:py-14"><section><p className="text-xs font-black tracking-[0.2em] text-[#a33a32] uppercase">Stroke Order · ဆွဲချက်အစဉ်</p><h2 className="mt-3 text-3xl font-black">အသံနားထောင်ပြီး အစဉ်လိုက်ရေးပါ</h2><div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{characters.map((character) => <StrokeOrderCard key={character.romaji} {...character} asset={`/strokes/hiragana/${character.romaji}.svg`} audioUrl={`/audio/n5/hiragana/${character.romaji}.mp3`} />)}</div></section>
      <div className="mt-12"><HiraganaTracingSection characters={characters.map(({ kana }) => kana)} /></div>
      <div className="mt-8 flex flex-wrap justify-between gap-3"><Link href={previous.href} className="rounded-xl border border-[#cfc6b7] bg-[#fffdf8] px-5 py-3 text-sm font-bold text-[#514b41]">← {previous.label}</Link>{next ? <Link href={next.href} className="rounded-xl bg-[#c83f35] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#c83f35]/15 hover:bg-[#a92f28]">Next Lesson →</Link> : <Link href="/learn/n5" className="rounded-xl bg-[#31513e] px-5 py-3 text-sm font-black text-white hover:bg-[#254332]">✓ Hiragana 46 လုံး ပြီးပါပြီ</Link>}</div>
      <p className="mt-8 text-center text-[10px] text-[#9b9489]">Stroke diagrams: strokesvg / Klee One (MIT & SIL OFL 1.1)</p>
    </Container>
  </div>;
}
