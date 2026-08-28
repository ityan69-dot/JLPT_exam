"use client";

import { useState } from "react";
import Link from "next/link";
import { SoundButton } from "@/components/learning/sound-button";

const questions = [
  { prompt: "အသံအုပ်စုကို နားထောင်ပြီး မှန်တာရွေးပါ", audio: "/audio/n5/romaji/s.mp3", options: ["sa · shi · su · se · so", "ta · chi · tsu · te · to", "za · ji · zu · ze · zo"], answer: "sa · shi · su · se · so" },
  { prompt: "Japanese ‘R row’ အသံအုပ်စုက ဘယ်ဟာလဲ?", options: ["ra · ri · ru · re · ro", "la · li · lu · le · lo", "wa · wi · wu · we · wo"], answer: "ra · ri · ru · re · ro" },
  { prompt: "အသံကိုနားထောင်ပြီး combined sound ကိုရွေးပါ", audio: "/audio/n5/romaji/cha.mp3", options: ["sha · shu · sho", "cha · chu · cho", "ja · ju · jo"], answer: "cha · chu · cho" },
  { prompt: "‘fu’ ပါတဲ့ အခြေခံ row က ဘယ်ဟာလဲ?", options: ["ha · hi · fu · he · ho", "fa · fi · fu · fe · fo", "ba · bi · bu · be · bo"], answer: "ha · hi · fu · he · ho" },
  { prompt: "အသံကိုနားထောင်ပြီး special rule ကိုရွေးပါ", audio: "/audio/n5/romaji/double.mp3", options: ["Long vowel", "Double consonant", "Final n"], answer: "Double consonant" },
];

export function RomajiQuizSession() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const question = questions[index];

  function next() {
    const nextScore = score + (selected === question.answer ? 1 : 0);
    setScore(nextScore);
    if (index === questions.length - 1) setFinished(true);
    else { setIndex((current) => current + 1); setSelected(""); }
  }

  function retry() { setIndex(0); setSelected(""); setScore(0); setFinished(false); }

  if (finished) return <div className="mx-auto max-w-xl rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] p-7 text-center shadow-lg sm:p-10"><p className="text-xs font-black tracking-[0.2em] text-[#a33a32] uppercase">Practice Complete</p><div className="mx-auto mt-6 flex size-36 flex-col items-center justify-center rounded-full border-8 border-[#4f7b5e] bg-[#eef4ef]"><span className="text-5xl font-black">{score}</span><span className="text-xs font-bold text-[#625b50]">/ {questions.length}</span></div><h1 className="mt-6 text-2xl font-black">Romaji Practice ပြီးပါပြီ</h1><p className="mt-3 text-sm leading-7 text-[#746c60]">{score >= 4 ? "အသံအခြေခံကို ကောင်းကောင်းမှတ်မိပါတယ်။" : "Lesson audio တွေကို ထပ်နားထောင်ပြီး နောက်တစ်ကြိမ်ပြန်စမ်းပါ။"}</p><div className="mt-7 grid gap-3 sm:grid-cols-2"><button type="button" onClick={retry} className="min-h-12 rounded-xl bg-[#c83f35] px-5 py-3 text-sm font-black text-white">ထပ်ဖြေမယ်</button><Link href="/learn/n5/romaji" className="flex min-h-12 items-center justify-center rounded-xl border border-[#cfc6b7] px-5 py-3 text-sm font-bold">Lesson ပြန်သွားမယ်</Link></div></div>;

  return <div className="mx-auto max-w-2xl"><div className="flex items-center justify-between"><p className="text-xs font-black text-[#a33a32]">မေးခွန်း {index + 1} / {questions.length}</p><p className="text-xs font-bold text-[#746c60]">ရွေးချယ်မှုတစ်ခု ရွေးပါ</p></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e5dfd3]"><div className="h-full rounded-full bg-[#4f7b5e] transition-all" style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div><section className="mt-6 rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] p-6 shadow-lg sm:p-9"><div className="flex items-start gap-4">{question.audio && <SoundButton audioUrl={question.audio} label={`မေးခွန်း ${index + 1} အသံ`} />}<h1 className="text-xl font-black leading-8 sm:text-2xl">{question.prompt}</h1></div><div className="mt-7 space-y-3">{question.options.map((option) => <button key={option} type="button" onClick={() => setSelected(option)} className={`min-h-14 w-full rounded-xl border-2 px-5 py-3 text-left text-sm font-black transition ${selected === option ? "border-[#111827] bg-[#111827] text-white" : "border-[#ded8ca] bg-[#fffdf8] hover:border-[#c83f35]/60"}`}>{option}</button>)}</div><button type="button" disabled={!selected} onClick={next} className="mt-7 min-h-12 w-full rounded-xl bg-[#c83f35] px-5 py-3 text-sm font-black text-white disabled:opacity-40">{index === questions.length - 1 ? "အဖြေတင်မယ်" : "နောက်မေးခွန်း →"}</button></section></div>;
}
