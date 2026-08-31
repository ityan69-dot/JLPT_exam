"use client";

import { useState } from "react";

const questions = [
  {
    sentence: "まいあさ 七時に おきます。",
    prompt: "ဒီလူက ဘယ်အချိန် အိပ်ရာထပါသလဲ။",
    options: ["မနက် ၆ နာရီ", "မနက် ၇ နာရီ", "ည ၇ နာရီ"],
    answer: 1,
    explanation: "まいあさ = မနက်တိုင်း၊ 七時に = ၇ နာရီမှာ၊ おきます = အိပ်ရာထပါတယ်။",
  },
  {
    sentence: "きょうは あめです。かさを もっていきます。",
    prompt: "ဘာကြောင့် ထီးယူသွားမှာလဲ။",
    options: ["ဒီနေ့မိုးရွာလို့", "ဒီနေ့ပူလို့", "မနက်ဖြန်ခရီးသွားလို့"],
    answer: 0,
    explanation: "きょう = ဒီနေ့၊ あめ = မိုး၊ かさ = ထီး။ ရှေ့ဝါကျက အကြောင်းရင်း၊ နောက်ဝါကျက လုပ်မယ့်အရာပါ။",
  },
  {
    sentence: "田中さんは さかなを たべません。",
    prompt: "မှန်တဲ့အချက်ကို ရွေးပါ။",
    options: ["Tanaka က ငါးစားပါတယ်", "Tanaka က ငါးမစားပါဘူး", "Tanaka က ငါးဝယ်ပါတယ်"],
    answer: 1,
    explanation: "たべます = စားပါတယ်။ たべません ဖြစ်သွားရင် အငြင်းပုံစံ ‘မစားပါဘူး’ လို့ အဓိပ္ပာယ်ရပါတယ်။",
  },
];

export function ReadingMiniPractice() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const question = questions[index];

  function choose(option: number) {
    if (selected !== null) return;
    setSelected(option);
    if (option === question.answer) setScore((value) => value + 1);
  }

  function next() {
    if (index === questions.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  if (finished) return <div className="rounded-[1.75rem] bg-[#111827] p-7 text-center text-white sm:p-10"><p className="text-xs font-black tracking-[.18em] text-[#9fd0ac] uppercase">Practice Complete</p><p className="mt-4 text-4xl font-black">{score} / {questions.length}</p><p className="mt-3 text-sm text-white/60">စာကြောင်းရဲ့ အချိန်၊ action နဲ့ အငြင်းပုံစံကို ခွဲဖတ်နိုင်မှု ရလဒ်ပါ။</p><button onClick={restart} className="mt-6 rounded-xl bg-[#c83f35] px-5 py-3 text-sm font-black">ပြန်လေ့ကျင့်မယ်</button></div>;

  return <div className="rounded-[1.75rem] border border-[#d8c8aa] bg-[#fffdf8] p-5 sm:p-8">
    <div className="flex items-center justify-between"><p className="text-xs font-black tracking-[.16em] text-[#a33a32] uppercase">Question {index + 1} / {questions.length}</p><span className="text-xs font-bold text-[#746c60]">Score {score}</span></div>
    <p lang="ja" className="mt-6 rounded-2xl bg-[#f2eee5] px-5 py-6 text-xl font-black leading-9 sm:text-2xl">{question.sentence}</p>
    <h3 className="mt-6 text-lg font-black">{question.prompt}</h3>
    <div className="mt-4 grid gap-3">{question.options.map((option, optionIndex) => {
      const isCorrect = selected !== null && optionIndex === question.answer;
      const isWrong = selected === optionIndex && optionIndex !== question.answer;
      return <button key={option} onClick={() => choose(optionIndex)} disabled={selected !== null} className={`min-h-12 rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${isCorrect ? "border-[#47745a] bg-[#e4f0e7] text-[#254632]" : isWrong ? "border-[#c83f35] bg-[#fbe5e2] text-[#8d2922]" : "border-[#d8d1c4] bg-white hover:border-[#a33a32]"}`}>{optionIndex + 1}. {option}</button>;
    })}</div>
    {selected !== null && <div className="mt-5 rounded-2xl border border-[#e2c99a] bg-[#fff8e7] p-5"><p className={`font-black ${selected === question.answer ? "text-[#31513e]" : "text-[#a33a32]"}`}>{selected === question.answer ? "မှန်ပါတယ် ✓" : "မမှန်သေးပါ"}</p><p className="mt-2 text-sm leading-7 text-[#625b50]">{question.explanation}</p><button onClick={next} className="mt-4 rounded-xl bg-[#111827] px-5 py-3 text-sm font-black text-white">{index === questions.length - 1 ? "ရလဒ်ကြည့်မယ်" : "နောက်မေးခွန်း →"}</button></div>}
  </div>;
}
