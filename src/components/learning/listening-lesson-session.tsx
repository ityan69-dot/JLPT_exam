"use client";

import { useRef, useState } from "react";
import type { JLPTQuestion } from "@/types/jlpt";

export function ListeningLessonSession({ questions, audioSets }: { questions: JLPTQuestion[]; audioSets: string[][] }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [index, setIndex] = useState(0);
  const [part, setPart] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const question = questions[index];
  const urls = audioSets[index] ?? [];

  async function playAudio() {
    const audio = audioRef.current;
    if (!audio || urls.length === 0) return;
    setAudioError(false);
    setPart(0);
    audio.src = urls[0];
    audio.currentTime = 0;
    try { await audio.play(); setPlaying(true); } catch { setAudioError(true); setPlaying(false); }
  }

  async function continueAudio() {
    const nextPart = part + 1;
    if (nextPart >= urls.length) { setPlaying(false); setPart(0); return; }
    const audio = audioRef.current;
    if (!audio) return;
    setPart(nextPart);
    audio.src = urls[nextPart];
    try { await audio.play(); } catch { setAudioError(true); setPlaying(false); }
  }

  function choose(option: string) {
    if (selected) return;
    setSelected(option);
    if (option === question.correctAnswer) setScore((value) => value + 1);
  }

  function next() {
    if (index === questions.length - 1) { setDone(true); return; }
    setIndex((value) => value + 1); setSelected(null); setShowTranscript(false); setPlaying(false); setPart(0); setAudioError(false);
  }

  function restart() { setIndex(0); setPart(0); setPlaying(false); setAudioError(false); setSelected(null); setShowTranscript(false); setScore(0); setDone(false); }

  if (done) return <div className="rounded-[2rem] bg-[#111827] p-7 text-center text-white sm:p-10"><p className="text-xs font-black tracking-[.18em] text-[#9fd0ac] uppercase">Lesson Complete</p><p className="mt-4 text-5xl font-black">{score} / {questions.length}</p><p className="mt-3 text-sm text-white/60">{score === questions.length ? "အသံထဲက အဓိက clue တွေကို ကောင်းကောင်းဖမ်းနိုင်ပါတယ်။" : "Transcript ကိုပြန်ဖတ်ပြီး audio နဲ့တစ်ခေါက်ထပ်တိုက်ကြည့်ပါ။"}</p><button onClick={restart} className="mt-6 rounded-xl bg-[#c83f35] px-5 py-3 text-sm font-black">ပြန်လေ့ကျင့်မယ်</button></div>;

  return <div className="rounded-[2rem] border border-[#d8c8aa] bg-[#fffdf8] p-5 sm:p-8">
    <audio ref={audioRef} preload="metadata" onEnded={continueAudio} onError={() => { setAudioError(true); setPlaying(false); }} />
    <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-black tracking-[.16em] text-[#a33a32]">PRACTICE {index + 1} / {questions.length}</p><p className="mt-1 text-[10px] font-bold text-[#746c60]">{question.itemType}</p></div><span className="rounded-full bg-[#e7f0e9] px-3 py-1.5 text-xs font-black text-[#31513e]">Score {score}</span></div>
    <div className="mt-6 grid gap-5 rounded-[1.5rem] bg-[#111827] p-5 text-white sm:grid-cols-[auto_1fr] sm:items-center sm:p-6">
      <button onClick={playAudio} disabled={playing} className="flex size-16 items-center justify-center rounded-full bg-[#4f7b5e] text-2xl font-black transition hover:bg-[#416a50] disabled:opacity-50" aria-label="Japanese audio နားထောင်မယ်">{playing ? "…" : "♪"}</button>
      <div><p className="text-sm font-black">{playing ? `Audio နားထောင်နေသည် ${urls.length > 1 ? `· ${part + 1}/${urls.length}` : ""}` : "အသံဖွင့်ပြီး မေးခွန်းဖြေပါ"}</p><p className="mt-2 text-xs leading-6 text-white/50">အဖြေမရွေးခင် လိုအပ်ရင် ထပ်နားထောင်လို့ရပါတယ်။</p>{audioError && <p className="mt-2 text-xs font-bold text-[#ff9d94]">အသံဖိုင်ဖွင့်မရပါ။ Page ကို refresh လုပ်ပြီး ထပ်စမ်းပါ။</p>}</div>
    </div>
    <h2 lang="ja" className="mt-6 text-lg font-black leading-8">{question.questionText}</h2>
    <div className="mt-4 grid gap-3 sm:grid-cols-2">{question.options.map((option, optionIndex) => { const correct = selected !== null && option === question.correctAnswer; const wrong = selected === option && option !== question.correctAnswer; return <button key={option} disabled={selected !== null} onClick={() => choose(option)} className={`min-h-12 rounded-xl border px-4 py-3 text-left text-sm font-bold ${correct ? "border-[#47745a] bg-[#e4f0e7] text-[#254632]" : wrong ? "border-[#c83f35] bg-[#fbe5e2] text-[#8d2922]" : "border-[#d8d1c4] bg-white hover:border-[#4f7b5e]"}`}>{optionIndex + 1}. <span lang="ja">{option}</span></button>; })}</div>
    {selected && <div className="mt-5 rounded-2xl border border-[#e2c99a] bg-[#fff8e7] p-5"><p className={`font-black ${selected === question.correctAnswer ? "text-[#31513e]" : "text-[#a33a32]"}`}>{selected === question.correctAnswer ? "မှန်ပါတယ် ✓" : "မမှန်သေးပါ"}</p><p className="mt-2 text-sm leading-7 text-[#625b50]">{question.explanation}</p><button onClick={() => setShowTranscript((value) => !value)} className="mt-4 rounded-xl border border-[#cfc6b7] bg-white px-4 py-2.5 text-xs font-black">{showTranscript ? "Transcript ဖျောက်မယ်" : "Transcript ဖွင့်ကြည့်မယ်"}</button>{showTranscript && <div className="mt-4 rounded-xl bg-white p-4"><p lang="ja" className="whitespace-pre-line text-sm font-bold leading-8">{question.listeningScript}</p></div>}<button onClick={next} className="mt-4 ml-2 rounded-xl bg-[#111827] px-5 py-3 text-sm font-black text-white">{index === questions.length - 1 ? "ရလဒ်ကြည့်မယ်" : "နောက်မေးခွန်း →"}</button></div>}
  </div>;
}
