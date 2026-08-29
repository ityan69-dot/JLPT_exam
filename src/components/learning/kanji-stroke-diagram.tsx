"use client";

import { useEffect, useState } from "react";

export function KanjiStrokeDiagram({ character, asset, strokes }: { character: string; asset: string; strokes: number }) {
  const [svg, setSvg] = useState("");
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    fetch(asset)
      .then((response) => response.text())
      .then((source) => {
        let order = 0;
        const svgSource = source.slice(source.indexOf("<svg")).replace(/<path\b/g, () => `<path style="--stroke-delay:${.25 + order++ * .8}s"`);
        setSvg(svgSource);
      })
      .catch(() => setSvg(""));
  }, [asset]);

  return <div>
    <div className="relative aspect-square overflow-hidden rounded-2xl border border-[#d8c8aa] bg-[#fffdf8]">
      <span className="absolute inset-x-0 top-1/2 border-t border-dashed border-[#ded8ca]" />
      <span className="absolute inset-y-0 left-1/2 border-l border-dashed border-[#ded8ca]" />
      {svg
        ? <div key={animationKey} className="kanji-stroke-animation absolute inset-3" dangerouslySetInnerHTML={{ __html: svg }} />
        : <div className="flex h-full items-center justify-center text-xs text-[#8a8276]">ဆွဲချက်ပုံ ဖွင့်နေသည်…</div>}
    </div>
    <div className="mt-3 flex items-center justify-between gap-3">
      <p className="text-xs font-bold text-[#746c60]">ဆွဲချက် {strokes} ချက်</p>
      <button type="button" onClick={() => setAnimationKey((key) => key + 1)} className="rounded-lg border border-[#cfc6b7] bg-[#fffdf8] px-3 py-2 text-[11px] font-black text-[#625b50]">▶ ဆွဲပြတာ ပြန်ကြည့်မယ်</button>
    </div>
    <p className="mt-2 text-xs leading-6 text-[#746c60]">နံပါတ် {1}{strokes > 1 ? ` ကနေ ${strokes}` : ""} အထိ အနီရောင်မျဉ်းကို အစဉ်လိုက်ကြည့်ပါ။</p>
    <style jsx global>{`
      .kanji-stroke-animation svg{width:100%;height:100%}
      .kanji-stroke-animation path{stroke:#b33a34!important;stroke-dasharray:500;stroke-dashoffset:500;animation:kanji-draw .7s ease-out forwards;animation-delay:var(--stroke-delay)}
      .kanji-stroke-animation text{fill:#776f63!important;font-weight:800}
      @keyframes kanji-draw{to{stroke-dashoffset:0}}
      @media (prefers-reduced-motion:reduce){.kanji-stroke-animation path{animation-duration:.01ms;animation-delay:0s}}
    `}</style>
    <span className="sr-only">{character} ၏ ဆွဲချက်အစဉ် animation</span>
  </div>;
}
