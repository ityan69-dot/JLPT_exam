"use client";

import { useState } from "react";

const questions = [
  { note: "ゆきさんへ\n三時に えきの まえで あいましょう。\nまり", question: "Yuki နဲ့ Mari ဘယ်မှာတွေ့ကြမလဲ။", options: ["ဘူတာရှေ့မှာ", "ကျောင်းရှေ့မှာ", "ဆိုင်ထဲမှာ"], answer: 0, explanation: "えき = ဘူတာ၊ まえ = ရှေ့၊ 三時 = ၃ နာရီ။ စာပို့သူက Mari၊ လက်ခံသူက Yuki ပါ။" },
  { note: "おかあさんへ\nパンを かいました。れいぞうこに ぎゅうにゅうが ありません。\nけん", question: "Ken က ဘာကို ဝယ်ခဲ့ပါသလဲ။", options: ["နို့", "ပေါင်မုန့်", "ရေ"], answer: 1, explanation: "パンを かいました = ပေါင်မုန့်ဝယ်ခဲ့တယ်။ နို့ကတော့ ရေခဲသေတ္တာထဲမှာ မရှိဘူးလို့ ပြောထားတာပါ။" },
  { note: "田中さんへ\nあしたの べんきょうは ありません。月よう日に きてください。\n山田", question: "Tanaka က ဘယ်နေ့လာရမလဲ။", options: ["မနက်ဖြန်", "တနင်္ဂနွေ", "တနင်္လာ"], answer: 2, explanation: "月よう日 = တနင်္လာနေ့၊ きてください = လာပေးပါ။ あしたは ありません ဆိုတော့ မနက်ဖြန် မရှိပါဘူး။" },
];

export function MessageReadingPractice() {
  const [index, setIndex] = useState(0); const [selected, setSelected] = useState<number | null>(null); const [score, setScore] = useState(0); const [done, setDone] = useState(false); const item = questions[index];
  const select = (value: number) => { if (selected !== null) return; setSelected(value); if (value === item.answer) setScore((old) => old + 1); };
  const next = () => { if (index === questions.length - 1) setDone(true); else { setIndex((old) => old + 1); setSelected(null); } };
  const restart = () => { setIndex(0); setSelected(null); setScore(0); setDone(false); };
  if (done) return <div className="rounded-[1.75rem] bg-[#111827] p-8 text-center text-white"><p className="text-xs font-black tracking-[.18em] text-[#9fd0ac] uppercase">Note Reading Complete</p><p className="mt-4 text-4xl font-black">{score} / 3</p><p className="mt-3 text-sm text-white/60">Who · When · Where · Action ကို ရှာနိုင်မှုရလဒ်ပါ။</p><button onClick={restart} className="mt-6 rounded-xl bg-[#c83f35] px-5 py-3 text-sm font-black">ပြန်လေ့ကျင့်မယ်</button></div>;
  return <div className="rounded-[1.75rem] border border-[#d8c8aa] bg-[#fffdf8] p-5 sm:p-8"><div className="flex justify-between text-xs font-black"><span className="tracking-[.16em] text-[#a33a32]">NOTE {index + 1} / 3</span><span className="text-[#746c60]">Score {score}</span></div><div className="mt-5 rounded-2xl border border-[#dfd5c2] bg-[#fffaf0] p-6"><p lang="ja" className="whitespace-pre-line text-lg font-bold leading-9">{item.note}</p></div><h3 className="mt-6 text-lg font-black">{item.question}</h3><div className="mt-4 grid gap-3">{item.options.map((option, i) => <button key={option} disabled={selected !== null} onClick={() => select(i)} className={`min-h-12 rounded-xl border px-4 py-3 text-left text-sm font-bold ${selected !== null && i === item.answer ? "border-[#47745a] bg-[#e4f0e7] text-[#254632]" : selected === i ? "border-[#c83f35] bg-[#fbe5e2] text-[#8d2922]" : "border-[#d8d1c4] bg-white hover:border-[#a33a32]"}`}>{i + 1}. {option}</button>)}</div>{selected !== null && <div className="mt-5 rounded-2xl bg-[#f2eee5] p-5"><p className="font-black">{selected === item.answer ? "မှန်ပါတယ် ✓" : "မမှန်သေးပါ"}</p><p className="mt-2 text-sm leading-7 text-[#625b50]">{item.explanation}</p><button onClick={next} className="mt-4 rounded-xl bg-[#111827] px-5 py-3 text-sm font-black text-white">{index === 2 ? "ရလဒ်ကြည့်မယ်" : "နောက်မေးခွန်း →"}</button></div>}</div>;
}
