"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { saveRetryHistoryEntry } from "@/services/retry-history-service";
import { getTestHistory } from "@/services/test-history-service";
import type { MockTestHistoryEntry } from "@/types/history";
import type { JLPTQuestion } from "@/types/jlpt";

type RetryWrongQuestionsProps = {
  questions: JLPTQuestion[];
  resultId?: string;
};

export function RetryWrongQuestions({ questions, resultId }: RetryWrongQuestionsProps) {
  const [entry, setEntry] = useState<MockTestHistoryEntry | null | undefined>(undefined);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const hydrationId = window.setTimeout(() => {
      const history = getTestHistory();
      setEntry(resultId ? history.find((item) => item.id === resultId) ?? null : history[0] ?? null);
    }, 0);

    return () => window.clearTimeout(hydrationId);
  }, [resultId]);

  if (entry === undefined) {
    return <main className="washi-surface min-h-[70vh] bg-[#f7f5ef] px-4 py-16"><div className="mx-auto h-64 max-w-4xl animate-pulse rounded-[2rem] bg-[#eee9df]" /></main>;
  }

  if (!entry) {
    return (
      <main className="washi-surface min-h-[70vh] bg-[#f7f5ef] px-4 py-16 text-[#172033]">
        <section className="mx-auto max-w-xl rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] p-8 text-center shadow-lg">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#c83f35] text-xl font-black text-white">再</div>
          <h1 className="mt-5 text-2xl font-black">Retry result ရှာမတွေ့ပါဘူး</h1>
          <p className="mt-3 text-sm leading-7 text-[#746c60]">Mock Test အသစ်တစ်ကြိမ် ပြီးဆုံးမှ မှားခဲ့တဲ့မေးခွန်းတွေကို ပြန်ဖြေနိုင်ပါတယ်။</p>
          <Link href="/test/setup/n3" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#c83f35] px-6 py-3 text-sm font-bold text-white">Mock Test စမယ်</Link>
        </section>
      </main>
    );
  }

  const activeEntry = entry;

  const retryQuestions = activeEntry.wrongQuestions
    .map((id) => questions.find((question) => question.id === id))
    .filter((question): question is JLPTQuestion => Boolean(question));
  const question = retryQuestions[currentIndex];

  if (!question) {
    return (
      <main className="washi-surface min-h-[70vh] bg-[#f7f5ef] px-4 py-16 text-[#172033]">
        <section className="mx-auto max-w-xl rounded-[2rem] border border-[#c8d7cc] bg-[#eef4ef] p-8 text-center">
          <h1 className="text-2xl font-black">ပြန်ဖြေစရာ မရှိပါဘူး</h1>
          <p className="mt-3 text-sm text-[#3f604d]">ဒီ Mock Test မှာ မေးခွန်းအားလုံးမှန်ပါတယ်။</p>
          <Link href="/progress" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#111827] px-6 py-3 text-sm font-bold text-white">Progress သို့ပြန်သွားမယ်</Link>
        </section>
      </main>
    );
  }

  const isCorrect = selectedAnswer === question.correctAnswer;

  function checkAnswer() {
    if (!selectedAnswer || isChecked) return;
    setIsChecked(true);
    if (selectedAnswer === question.correctAnswer) setCorrectCount((count) => count + 1);
  }

  function goNext() {
    if (currentIndex === retryQuestions.length - 1) {
      const retryAccuracy = Math.round((correctCount / retryQuestions.length) * 100);
      const improvedScore = Math.round(((activeEntry.correct + correctCount) / activeEntry.total) * 100);
      saveRetryHistoryEntry({
        id: crypto.randomUUID(),
        testResultId: activeEntry.id,
        level: "N3",
        originalScore: activeEntry.score,
        retryCorrect: correctCount,
        retryTotal: retryQuestions.length,
        retryAccuracy,
        improvedScore,
        improvement: improvedScore - activeEntry.score,
        completedAt: new Date().toISOString(),
      });
      setIsFinished(true);
      return;
    }
    setCurrentIndex((index) => index + 1);
    setSelectedAnswer(null);
    setIsChecked(false);
  }

  function restart() {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsChecked(false);
    setCorrectCount(0);
    setIsFinished(false);
  }

  if (isFinished) {
    const retryAccuracy = Math.round((correctCount / retryQuestions.length) * 100);
    const improvedScore = Math.round(((entry.correct + correctCount) / entry.total) * 100);
    const improvement = improvedScore - entry.score;

    return (
      <main className="washi-surface min-h-screen bg-[#f7f5ef] px-4 py-12 text-[#172033] sm:py-16">
        <section className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] shadow-[0_20px_60px_rgba(50,42,28,0.1)]">
          <div className="bg-[#111827] p-8 text-center text-white sm:p-10">
            <p className="text-xs font-bold tracking-[0.22em] text-[#f2d48f] uppercase">再挑戦結果 · Retry Result</p>
            <h1 className="mt-4 text-3xl font-black">မှားခဲ့တာတွေ ပြန်ဖြေပြီးပါပြီ</h1>
            <p className="mt-3 text-sm text-white/60">Retry မေးခွန်း {retryQuestions.length} ခုအနက် {correctCount} ခု ပြန်မှန်ခဲ့ပါတယ်။</p>
          </div>
          <div className="p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#ded8ca] bg-[#fbf7ee] p-5 text-center"><p className="text-xs font-bold text-[#746c60]">မူလရမှတ်</p><p className="mt-2 text-3xl font-black">{entry.score}%</p></div>
              <div className="rounded-2xl border border-[#c8d7cc] bg-[#eef4ef] p-5 text-center"><p className="text-xs font-bold text-[#3f604d]">Retry ပြီးရမှတ်</p><p className="mt-2 text-3xl font-black text-[#24523a]">{improvedScore}%</p></div>
              <div className="rounded-2xl border border-[#dfc487] bg-[#fff8e7] p-5 text-center"><p className="text-xs font-bold text-[#654b19]">တိုးတက်မှု</p><p className="mt-2 text-3xl font-black text-[#9a6b12]">+{improvement}%</p></div>
            </div>
            <p className="mt-5 rounded-xl bg-[#fbf7ee] p-4 text-center text-sm text-[#625b50]">Retry accuracy: <strong>{retryAccuracy}%</strong> · ဒီရမှတ်က မှားခဲ့တဲ့မေးခွန်းတွေကို ပြန်မှန်တယ်လို့ယူဆတွက်ထားတဲ့ practice comparison ဖြစ်ပါတယ်။</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <button type="button" onClick={restart} className="min-h-12 rounded-xl bg-[#c83f35] px-5 py-3 text-sm font-bold text-white">ထပ်ဖြေမယ်</button>
              <Link href={`/review/n3?result=${encodeURIComponent(entry.id)}`} className="flex min-h-12 items-center justify-center rounded-xl border border-[#cfc6b7] px-5 py-3 text-sm font-bold">Review ပြန်ကြည့်မယ်</Link>
              <Link href="/progress" className="flex min-h-12 items-center justify-center rounded-xl bg-[#111827] px-5 py-3 text-sm font-bold text-white">Progress ကြည့်မယ်</Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <div className="washi-surface min-h-screen bg-[#f7f5ef] text-[#172033]">
      <header className="bg-[#111827] text-white shadow-lg">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-4 py-4 sm:px-6">
          <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-full border-2 border-white/80 bg-[#c83f35]"><span className="text-[9px] font-bold text-white/70">再挑戦</span><span className="text-sm font-black">N3</span></div>
          <div className="min-w-0 flex-1"><p className="text-[10px] font-bold tracking-[0.2em] text-[#f2d48f] uppercase">誤答再挑戦 · Retry Mode</p><h1 className="mt-1 text-sm font-black">မှားခဲ့တဲ့မေးခွန်းများ ပြန်ဖြေခြင်း</h1></div>
          <span className="text-xs font-bold text-white/55">{currentIndex + 1} / {retryQuestions.length}</span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
        <section className="overflow-hidden rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] shadow-[0_18px_50px_rgba(50,42,28,0.08)]">
          <div className="flex items-center justify-between border-b border-[#e7e1d4] bg-[#fbf7ee] px-6 py-4 sm:px-8"><span className="rounded-full bg-[#c83f35] px-3 py-1.5 text-xs font-black text-white">Retry Question</span><span className="text-xs font-bold text-[#746c60]">မူလ score {entry.score}%</span></div>
          <div className="p-6 sm:p-8">
            <h2 lang="ja" className="text-xl font-bold leading-10 sm:text-2xl">{question.questionText}</h2>
            <div className="mt-7 space-y-3">
              {question.options.map((option, index) => {
                const selected = option === selectedAnswer;
                const answer = option === question.correctAnswer;
                return (
                  <button key={option} type="button" disabled={isChecked} onClick={() => setSelectedAnswer(option)} className={`flex min-h-16 w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition ${isChecked && answer ? "border-[#4f7b5e] bg-[#eef4ef] text-[#244735]" : isChecked && selected && !answer ? "border-[#c83f35] bg-[#fff1ed] text-[#7f211d]" : selected ? "border-[#111827] bg-[#111827] text-white" : "border-[#ded8ca] hover:border-[#c83f35]/55"}`}>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/70 text-sm font-black text-[#625b50]">{String.fromCharCode(65 + index)}</span><span lang="ja" className="font-semibold leading-7">{option}</span>
                  </button>
                );
              })}
            </div>
            {isChecked && <div className={`mt-5 rounded-2xl border p-5 ${isCorrect ? "border-[#c8d7cc] bg-[#eef4ef] text-[#244735]" : "border-[#e0aaa5] bg-[#fff1ed] text-[#7f211d]"}`}><p className="font-black">{isCorrect ? "မှန်ပါတယ်" : `မှားပါတယ် · အဖြေမှန်က ${question.correctAnswer} ဖြစ်ပါတယ်`}</p><p className="mt-2 text-sm leading-7 opacity-80">{question.explanation}</p></div>}
          </div>
          <div className="flex flex-col gap-3 border-t border-[#e7e1d4] bg-[#fbf7ee] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <Link href={`/review/n3?result=${encodeURIComponent(entry.id)}`} className="text-center text-sm font-bold text-[#625b50]">← Review သို့ပြန်သွားမယ်</Link>
            {!isChecked ? <button type="button" onClick={checkAnswer} disabled={!selectedAnswer} className="min-h-12 rounded-xl bg-[#c83f35] px-7 py-3 text-sm font-bold text-white disabled:bg-[#d7d1c5]">အဖြေစစ်မယ်</button> : <button type="button" onClick={goNext} className="min-h-12 rounded-xl bg-[#111827] px-7 py-3 text-sm font-bold text-white">{currentIndex === retryQuestions.length - 1 ? "ရလဒ်ကြည့်မယ်" : "နောက်မေးခွန်း →"}</button>}
          </div>
        </section>
      </main>
    </div>
  );
}
