"use client";

import { useEffect, useState } from "react";
import { SoundButton } from "@/components/learning/sound-button";

type StrokeOrderCardProps = { kana: string; romaji: string; strokes: number; asset: string; audioUrl: string; hint: string };

export function StrokeOrderCard({ kana, romaji, strokes, asset, audioUrl, hint }: StrokeOrderCardProps) {
  const [svg, setSvg] = useState("");
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => { fetch(asset).then((response) => response.text()).then(setSvg).catch(() => setSvg("")); }, [asset]);

  return <article className="rounded-[1.75rem] border border-[#ded8ca] bg-[#fffdf8] p-5 shadow-sm">
    <div className="flex items-start justify-between"><div><p lang="ja" className="text-5xl font-medium">{kana}</p><p className="mt-1 text-xl font-black text-[#a33a32]">{romaji}</p></div><SoundButton audioUrl={audioUrl} label={kana} /></div>
    <div className="relative mt-5 aspect-square overflow-hidden rounded-2xl border border-[#d8c8aa] bg-[#fffdf8]">
      <span className="absolute inset-x-0 top-1/2 border-t border-dashed border-[#ded8ca]" /><span className="absolute inset-y-0 left-1/2 border-l border-dashed border-[#ded8ca]" />
      {svg ? <div key={animationKey} className="stroke-animation absolute inset-3" dangerouslySetInnerHTML={{ __html: svg }} /> : <div className="flex h-full items-center justify-center text-xs text-[#8a8276]">ဆွဲချက်ပုံ ဖွင့်နေသည်…</div>}
    </div>
    <div className="mt-4 flex items-center justify-between gap-3"><p className="text-xs font-black text-[#31513e]">ဆွဲချက် {strokes} ချက်</p><button type="button" onClick={() => setAnimationKey((key) => key + 1)} className="rounded-lg border border-[#cfc6b7] px-3 py-2 text-[11px] font-bold text-[#625b50]">↻ ပြန်ကြည့်မယ်</button></div>
    <p className="mt-3 text-xs leading-6 text-[#746c60]">{hint}</p>
    <style jsx global>{`.stroke-animation svg{width:100%;height:100%}.stroke-animation svg [data-strokesvg="shadows"]{fill:#e2ddd2!important}.stroke-animation svg [data-strokesvg="strokes"]{stroke:#b33a34!important}.stroke-animation svg [data-strokesvg="strokes"] path{stroke-dasharray:3333;stroke-dashoffset:3333;animation:kana-draw .8s linear forwards calc(var(--i,0)*.75s + .25s)}@keyframes kana-draw{to{stroke-dashoffset:0}}`}</style>
  </article>;
}
