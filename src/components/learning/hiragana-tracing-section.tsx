"use client";

import { useState } from "react";
import { TracingPad } from "@/components/learning/tracing-pad";

const characters = ["あ", "い", "う", "え", "お"];

export function HiraganaTracingSection() {
  const [kana, setKana] = useState("あ");
  return <section className="rounded-[2rem] bg-[#eee9df] p-6 sm:p-8"><div className="grid gap-7 lg:grid-cols-[1fr_22rem] lg:items-center"><div><p className="text-xs font-black tracking-[0.18em] text-[#a33a32] uppercase">Tracing Practice</p><h2 className="mt-3 text-3xl font-black">မျဉ်းကြောင်းအတိုင်း လိုက်ရေးပါ</h2><p className="mt-3 max-w-xl text-sm leading-7 text-[#746c60]">စာလုံးရွေးပြီး မီးခိုးရောင်ပုံစံပေါ်မှာ mouse သို့မဟုတ် လက်ချောင်းနဲ့ လိုက်ရေးနိုင်ပါတယ်။</p><div className="mt-6 flex flex-wrap gap-3">{characters.map((character) => <button key={character} type="button" onClick={() => setKana(character)} className={`flex size-12 items-center justify-center rounded-xl text-xl font-black ${kana === character ? "bg-[#111827] text-white" : "bg-[#fffdf8] text-[#625b50]"}`}>{character}</button>)}</div></div><TracingPad kana={kana} /></div></section>;
}
