"use client";

import { useState } from "react";

export function MeaningReveal({ meaning, detail }: { meaning: string; detail?: string }) {
  const [visible, setVisible] = useState(false);
  return <div className="mt-4 border-t border-[#eee8dc] pt-3">
    <button type="button" aria-expanded={visible} onClick={() => setVisible((value) => !value)} className="w-full rounded-xl border border-[#cfc6b7] bg-[#f7f4ed] px-4 py-3 text-sm font-black text-[#31513e] transition hover:border-[#4f7b5e] hover:bg-[#eef4ef]">
      {visible ? "မြန်မာအဓိပ္ပာယ် ဖျောက်မယ်" : "မြန်မာလို ကြည့်မယ်"}
    </button>
    {visible && <div className="mt-3 rounded-xl bg-[#eaf2eb] p-4 text-[#264936]"><p className="text-lg font-black">{meaning}</p>{detail && <p className="mt-2 text-xs leading-6 text-[#587061]">{detail}</p>}</div>}
  </div>;
}
