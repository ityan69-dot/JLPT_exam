"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getTestHistory } from "@/services/test-history-service";
import type { MockTestHistoryEntry } from "@/types/history";
import type { JLPTQuestion } from "@/types/jlpt";

type WrongAnswerReviewProps = {
  questions: JLPTQuestion[];
  resultId?: string;
};

const categoryLabels = {
  Vocab: "ဝေါဟာရ",
  Grammar: "သဒ္ဒါ",
  Reading: "ဖတ်ရှုခြင်း",
  Listening: "နားထောင်ခြင်း",
};

export function WrongAnswerReview({ questions, resultId }: WrongAnswerReviewProps) {
  const [historyEntry, setHistoryEntry] = useState<MockTestHistoryEntry | null | undefined>(undefined);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const hydrationId = window.setTimeout(() => {
      const history = getTestHistory();
      setHistoryEntry(resultId ? history.find((entry) => entry.id === resultId) ?? null : history[0] ?? null);
    }, 0);

    return () => window.clearTimeout(hydrationId);
  }, [resultId]);

  if (historyEntry === undefined) {
    return <main className="washi-surface min-h-[70vh] bg-[#f7f5ef] px-4 py-16"><div className="mx-auto h-64 max-w-4xl animate-pulse rounded-[2rem] bg-[#eee9df]" /></main>;
  }

  if (!historyEntry) {
    return (
      <main className="washi-surface min-h-[70vh] bg-[#f7f5ef] px-4 py-16 text-[#172033]">
        <section className="mx-auto max-w-xl rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] p-8 text-center shadow-lg">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#c83f35] text-xl font-black text-white">復</div>
          <h1 className="mt-5 text-2xl font-black">Review result ရှာမတွေ့ပါဘူး</h1>
          <p className="mt-3 text-sm leading-7 text-[#746c60]">Mock Test အသစ်တစ်ကြိမ် ဖြေပြီးရင် မှားထားတဲ့မေးခွန်းတွေကို ဒီနေရာမှာ ပြန်စစ်နိုင်ပါတယ်။</p>
          <Link href="/test/setup/n3" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#c83f35] px-6 py-3 text-sm font-bold text-white">Mock Test စမယ်</Link>
        </section>
      </main>
    );
  }

  const wrongQuestions = historyEntry.wrongQuestions
    .map((id) => questions.find((question) => question.id === id))
    .filter((question): question is JLPTQuestion => Boolean(question));
  const question = wrongQuestions[currentIndex];

  if (!question) {
    return (
      <main className="washi-surface min-h-[70vh] bg-[#f7f5ef] px-4 py-16 text-[#172033]">
        <section className="mx-auto max-w-xl rounded-[2rem] border border-[#c8d7cc] bg-[#eef4ef] p-8 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#4f7b5e] text-xl font-black text-white">満</div>
          <h1 className="mt-5 text-2xl font-black">ပြန်စစ်စရာ မရှိပါဘူး</h1>
          <p className="mt-3 text-sm text-[#3f604d]">ဒီ Mock Test မှာ မှားထားတဲ့မေးခွန်း မရှိပါဘူး။</p>
          <Link href="/progress" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#111827] px-6 py-3 text-sm font-bold text-white">Progress သို့ပြန်သွားမယ်</Link>
        </section>
      </main>
    );
  }

  const selectedAnswer = historyEntry.answers?.[question.id];

  return (
    <div className="washi-surface min-h-screen bg-[#f7f5ef] text-[#172033]">
      <header className="bg-[#111827] text-white shadow-lg">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-4 py-4 sm:px-6">
          <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-full border-2 border-white/80 bg-[#c83f35]"><span className="text-[9px] font-bold text-white/70">復習</span><span className="text-sm font-black">N3</span></div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#f2d48f] uppercase">誤答復習 · Wrong Answer Review</p>
            <h1 className="mt-1 text-sm font-black">မှားခဲ့တဲ့မေးခွန်းများ ပြန်စစ်ခြင်း</h1>
          </div>
          <span className="text-xs font-bold text-white/55">{currentIndex + 1} / {wrongQuestions.length}</span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
        <section className="overflow-hidden rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] shadow-[0_18px_50px_rgba(50,42,28,0.08)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e7e1d4] bg-[#fbf7ee] px-6 py-4 sm:px-8">
            <span className="rounded-full bg-[#c83f35] px-3 py-1.5 text-xs font-black text-white">{categoryLabels[question.category]}</span>
            <span className="text-xs font-bold text-[#746c60]">Test Score {historyEntry.score}%</span>
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#a33a32] uppercase">မှားခဲ့သော မေးခွန်း {currentIndex + 1}</p>
            <h2 lang="ja" className="mt-4 text-xl font-bold leading-10 sm:text-2xl">{question.questionText}</h2>

            <div className="mt-7 space-y-3">
              {question.options.map((option, index) => {
                const isCorrect = option === question.correctAnswer;
                const wasSelected = option === selectedAnswer;
                return (
                  <div key={option} className={`flex min-h-16 items-center gap-4 rounded-2xl border-2 p-4 ${isCorrect ? "border-[#4f7b5e] bg-[#eef4ef] text-[#244735]" : wasSelected ? "border-[#c83f35] bg-[#fff1ed] text-[#7f211d]" : "border-[#ded8ca] bg-[#fffdf8] text-[#746c60]"}`}>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/70 text-sm font-black">{String.fromCharCode(65 + index)}</span>
                    <span lang="ja" className="min-w-0 flex-1 font-semibold leading-7">{option}</span>
                    {isCorrect && <span className="text-xs font-black">အဖြေမှန်</span>}
                    {wasSelected && !isCorrect && <span className="text-xs font-black">မင်းရွေးခဲ့တာ</span>}
                  </div>
                );
              })}
            </div>

            {!selectedAnswer && (
              <p className="mt-5 rounded-xl border border-[#dfc487] bg-[#fff8e7] p-4 text-xs leading-6 text-[#654b19]">ဒီ result က feature မထည့်ခင် သိမ်းထားတာဖြစ်လို့ ရွေးခဲ့တဲ့အဖြေ record မရှိပါဘူး။ အဖြေမှန်နဲ့ explanation ကိုတော့ ကြည့်နိုင်ပါတယ်။</p>
            )}
            <div className="mt-5 rounded-2xl border border-[#c8d7cc] bg-[#eef4ef] p-5 text-[#244735]">
              <p className="font-black">အဖြေရှင်းလင်းချက်</p>
              <p className="mt-2 text-sm leading-7 opacity-85">{question.explanation ?? "အဖြေရှင်းလင်းချက် မရှိသေးပါဘူး။"}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-[#e7e1d4] bg-[#fbf7ee] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link href="/progress" className="flex min-h-11 items-center justify-center px-2 text-center text-sm font-bold text-[#625b50]">← Progress</Link>
              <Link href={`/retry/n3?result=${encodeURIComponent(historyEntry.id)}`} className="flex min-h-11 items-center justify-center rounded-xl bg-[#c83f35] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#a92f28]">မှားတာတွေ ပြန်ဖြေမယ်</Link>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))} disabled={currentIndex === 0} className="min-h-11 rounded-xl border border-[#cfc6b7] bg-[#fffdf8] px-4 py-2 text-sm font-bold disabled:opacity-40">← ရှေ့</button>
              <button type="button" onClick={() => setCurrentIndex((index) => Math.min(wrongQuestions.length - 1, index + 1))} disabled={currentIndex === wrongQuestions.length - 1} className="min-h-11 rounded-xl bg-[#111827] px-4 py-2 text-sm font-bold text-white disabled:opacity-40">နောက် →</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
