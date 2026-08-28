"use client";

import { useState } from "react";
import Link from "next/link";
import { savePracticeHistoryEntry } from "@/services/practice-history-service";
import type { JLPTQuestion } from "@/types/jlpt";
import type { PracticeHistoryEntry } from "@/types/practice";

type WeaknessPracticeSessionProps = {
  questions: JLPTQuestion[];
  tag: string;
  tagLabel: string;
};

export function WeaknessPracticeSession({
  questions,
  tag,
  tagLabel,
}: WeaknessPracticeSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [recentHistory, setRecentHistory] = useState<PracticeHistoryEntry[]>([]);
  const question = questions[currentIndex];

  if (!question) {
    return (
      <main className="washi-surface min-h-screen bg-[#f7f5ef] px-4 py-16 text-[#172033]">
        <section className="mx-auto max-w-xl rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] p-8 text-center shadow-[0_18px_50px_rgba(50,42,28,0.08)]">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#c83f35] text-xl font-black text-white">空</div>
          <p className="mt-6 text-xs font-bold tracking-[0.2em] text-[#a33a32] uppercase">練習問題なし</p>
          <h1 className="mt-3 text-2xl font-black">ဒီ tag အတွက် မေးခွန်းမရှိသေးပါဘူး</h1>
          <p className="mt-3 text-sm leading-7 text-[#746c60]">Question bank တိုးလာတဲ့အခါ ဒီနေရာမှာ သီးသန့်လေ့ကျင့်နိုင်ပါမယ်။</p>
          <Link href="/test/exam/n3" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#111827] px-6 py-3 text-sm font-bold text-white">
            Mock Test သို့ ပြန်သွားမယ်
          </Link>
        </section>
      </main>
    );
  }

  const isCorrect = selectedAnswer === question.correctAnswer;
  const progress = Math.round(((currentIndex + (isFinished ? 1 : 0)) / questions.length) * 100);

  function checkAnswer() {
    if (!selectedAnswer || isChecked) return;
    setIsChecked(true);
    if (selectedAnswer === question.correctAnswer) {
      setCorrectCount((count) => count + 1);
    }
  }

  function goNext() {
    if (currentIndex === questions.length - 1) {
      const accuracy = Math.round((correctCount / questions.length) * 100);
      const entry: PracticeHistoryEntry = {
        id: crypto.randomUUID(),
        level: "N3",
        tag,
        tagLabel,
        correct: correctCount,
        total: questions.length,
        accuracy,
        durationSeconds: Math.max(1, Math.round((Date.now() - startedAt) / 1000)),
        completedAt: new Date().toISOString(),
      };

      setRecentHistory(savePracticeHistoryEntry(entry).slice(0, 3));
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
    setStartedAt(Date.now());
    setRecentHistory([]);
  }

  if (isFinished) {
    const accuracy = Math.round((correctCount / questions.length) * 100);

    return (
      <main className="washi-surface min-h-screen bg-[#f7f5ef] px-4 py-12 text-[#172033] sm:py-16">
        <section className="mx-auto max-w-2xl overflow-hidden rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] shadow-[0_20px_60px_rgba(50,42,28,0.1)]">
          <div className="bg-[#111827] p-8 text-center text-white sm:p-10">
            <p className="text-xs font-bold tracking-[0.22em] text-[#f2d48f] uppercase">練習結果 · Practice Result</p>
            <h1 className="mt-4 text-3xl font-black">လေ့ကျင့်မှု ပြီးဆုံးပါပြီ</h1>
            <div className="mx-auto mt-7 flex size-36 flex-col items-center justify-center rounded-full border-8 border-[#c83f35] bg-[#fffdf8] text-[#111827]">
              <span className="text-4xl font-black">{accuracy}%</span>
              <span className="text-xs font-bold text-[#746c60]">accuracy</span>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <div className="rounded-2xl border border-[#ded8ca] bg-[#fbf7ee] p-5">
              <p className="text-xs font-bold text-[#a33a32]">復習した弱点 · လေ့ကျင့်ခဲ့တဲ့အားနည်းချက်</p>
              <p className="mt-2 text-lg font-black">{tagLabel}</p>
              <p className="mt-2 text-sm text-[#746c60]">{questions.length} ခုအနက် {correctCount} ခုမှန်ပါတယ်။</p>
            </div>
            <div className="mt-5 rounded-2xl border border-[#c8d7cc] bg-[#eef4ef] px-5 py-4 text-sm font-bold text-[#31513e]">
              <span className="mr-2 inline-block size-2.5 rounded-full bg-[#4f7b5e]" aria-hidden="true" />
              ဒီလေ့ကျင့်မှုရလဒ်ကို browser ထဲမှာ သိမ်းထားပြီးပါပြီ။
            </div>
            {recentHistory.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#a33a32] uppercase">最近の練習 · Recent History</p>
                    <h2 className="mt-1 text-lg font-black">မကြာသေးတဲ့ လေ့ကျင့်မှုများ</h2>
                  </div>
                  <span className="rounded-full bg-[#eee9df] px-3 py-1 text-xs font-bold text-[#625b50]">ဒီစက်ထဲမှာသာ</span>
                </div>
                <div className="mt-4 space-y-2">
                  {recentHistory.map((entry) => (
                    <article key={entry.id} className="flex items-center gap-3 rounded-xl border border-[#e2dccf] bg-[#fffdf8] p-4">
                      <div className={`flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-black ${entry.accuracy >= 70 ? "bg-[#dce9df] text-[#24523a]" : "bg-[#fff1ed] text-[#9a342d]"}`}>
                        {entry.accuracy}%
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">{entry.tagLabel}</p>
                        <p className="mt-1 text-xs text-[#746c60]">{entry.total} ခုအနက် {entry.correct} ခုမှန် · {entry.durationSeconds} စက္ကန့်</p>
                      </div>
                      <time dateTime={entry.completedAt} className="shrink-0 text-xs font-semibold text-[#8b8171]">
                        {new Date(entry.completedAt).toLocaleDateString("my-MM", { month: "short", day: "numeric" })}
                      </time>
                    </article>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <button type="button" onClick={restart} className="min-h-12 rounded-xl bg-[#c83f35] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#a92f28]">
                ထပ်လေ့ကျင့်မယ်
              </button>
              <Link href="/test/exam/n3" className="flex min-h-12 items-center justify-center rounded-xl border border-[#cfc6b7] px-5 py-3 text-sm font-bold text-[#514b41] transition hover:border-[#8b8171]">
                Mock Test သို့ ပြန်သွားမယ်
              </Link>
              <Link href="/progress" className="flex min-h-12 items-center justify-center rounded-xl bg-[#111827] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#27334a]">
                Progress ကြည့်မယ်
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <div className="washi-surface min-h-screen bg-[#f7f5ef] text-[#172033]">
      <header className="border-b border-white/10 bg-[#111827] text-white shadow-lg">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-4 py-4 sm:px-6">
          <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-full border-2 border-white/80 bg-[#c83f35]">
            <span className="text-[9px] font-bold text-white/70">練習</span>
            <span className="text-sm font-black">N3</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#f2d48f] uppercase">弱点集中練習 · Focus Practice</p>
            <h1 className="mt-1 truncate text-sm font-black sm:text-base">{tagLabel}</h1>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/15">
              <div className="h-full rounded-full bg-[#c83f35] transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <span className="text-xs font-bold text-white/55">{currentIndex + 1} / {questions.length}</span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
        <section className="overflow-hidden rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] shadow-[0_18px_50px_rgba(50,42,28,0.08)]">
          <div className="border-b border-[#e7e1d4] bg-[#fbf7ee] px-6 py-4 sm:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full bg-[#c83f35] px-3 py-1.5 text-xs font-black text-white">集中タグ · {tag.replaceAll("_", " ")}</span>
              <span className="text-xs font-bold text-[#746c60]">ချက်ချင်းအဖြေစစ်နိုင်သည်</span>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#a33a32] uppercase">問題 {currentIndex + 1}</p>
            <h2 lang="ja" className="mt-4 text-xl font-bold leading-10 sm:text-2xl">{question.questionText}</h2>

            <div className="mt-7 space-y-3" role="radiogroup" aria-label="အဖြေရွေးချယ်ရန်">
              {question.options.map((option, index) => {
                const isSelected = option === selectedAnswer;
                const isAnswer = option === question.correctAnswer;
                const showCorrect = isChecked && isAnswer;
                const showWrong = isChecked && isSelected && !isAnswer;

                return (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    disabled={isChecked}
                    onClick={() => setSelectedAnswer(option)}
                    className={`flex min-h-16 w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c83f35]/20 ${
                      showCorrect
                        ? "border-[#4f7b5e] bg-[#eef4ef] text-[#244735]"
                        : showWrong
                          ? "border-[#c83f35] bg-[#fff1ed] text-[#7f211d]"
                          : isSelected
                            ? "border-[#111827] bg-[#111827] text-white"
                            : "border-[#ded8ca] bg-[#fffdf8] hover:border-[#c83f35]/55 hover:bg-[#fff9f3]"
                    } disabled:cursor-default`}
                  >
                    <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl text-sm font-black ${isSelected && !isChecked ? "bg-[#c83f35] text-white" : "bg-[#eee9df] text-[#625b50]"}`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span lang="ja" className="font-semibold leading-7">{option}</span>
                  </button>
                );
              })}
            </div>

            {isChecked && (
              <div className={`mt-6 rounded-2xl border p-5 ${isCorrect ? "border-[#b8cfbf] bg-[#eef4ef] text-[#244735]" : "border-[#e0aaa5] bg-[#fff1ed] text-[#7f211d]"}`} role="status">
                <p className="font-black">{isCorrect ? "မှန်ပါတယ် · 正解" : `မှားပါတယ် · အဖြေမှန်က ${question.correctAnswer} ဖြစ်ပါတယ်`}</p>
                <p className="mt-2 text-sm leading-7 opacity-80">{question.explanation ?? "အဖြေရှင်းလင်းချက်ကို မကြာမီ ထည့်သွင်းပါမယ်။"}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 border-t border-[#e7e1d4] bg-[#fbf7ee] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <Link href="/test/exam/n3" className="text-center text-sm font-bold text-[#625b50] hover:text-[#172033]">← Practice မှ ထွက်မယ်</Link>
            {!isChecked ? (
              <button type="button" onClick={checkAnswer} disabled={!selectedAnswer} className="min-h-12 rounded-xl bg-[#c83f35] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#c83f35]/20 transition hover:bg-[#a92f28] disabled:cursor-not-allowed disabled:bg-[#d7d1c5] disabled:text-[#7c7468] disabled:shadow-none">
                အဖြေစစ်မယ်
              </button>
            ) : (
              <button type="button" onClick={goNext} className="min-h-12 rounded-xl bg-[#111827] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#27334a]">
                {currentIndex === questions.length - 1 ? "ရလဒ်ကြည့်မယ်" : "နောက်မေးခွန်း →"}
              </button>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
