"use client";

import { useState } from "react";
import { TracingPad } from "@/components/learning/tracing-pad";

export function KanjiTracingSection({ characters }: { characters: string[] }) {
  const [character, setCharacter] = useState(characters[0]);

  return <section className="rounded-[2rem] bg-[#eee9df] p-6 sm:p-8">
    <div className="grid gap-7 lg:grid-cols-[1fr_22rem] lg:items-center">
      <div>
        <p className="text-xs font-black tracking-[.18em] text-[#a33a32] uppercase">Kanji Tracing Practice</p>
        <h2 className="mt-3 text-3xl font-black">မီးခိုးရောင် Kanji ပေါ်မှာ လိုက်ရေးပါ</h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-[#746c60]">အပေါ်က ဆွဲပြထားတဲ့အစဉ်ကိုကြည့်ပြီး Kanji ရွေးပါ။ ပြီးရင် mouse သို့မဟုတ် လက်ချောင်းနဲ့ မျဉ်းကြောင်းအတိုင်း တစ်ချက်ချင်း လိုက်ရေးနိုင်ပါတယ်။</p>
        <div className="mt-6 flex flex-wrap gap-3">{characters.map((item) => <button key={item} type="button" onClick={() => setCharacter(item)} aria-pressed={character === item} className={`flex size-14 items-center justify-center rounded-xl text-2xl font-black transition ${character === item ? "bg-[#111827] text-white" : "bg-[#fffdf8] text-[#625b50] hover:bg-white"}`}>{item}</button>)}</div>
        <div className="mt-6 rounded-xl bg-[#fffdf8]/80 p-4 text-xs leading-6 text-[#625b50]">① ဆွဲချက် animation ကြည့်ပါ　② ဒီမှာ သုံးခါလိုက်ရေးပါ　③ မျဉ်းပုံမကြည့်ဘဲ တစ်ခါရေးကြည့်ပါ</div>
      </div>
      <TracingPad kana={character} />
    </div>
  </section>;
}
