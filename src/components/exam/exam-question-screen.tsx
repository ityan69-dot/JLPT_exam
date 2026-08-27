"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { JLPTQuestion } from "@/types/jlpt";

type ExamQuestionScreenProps = {
  questions: JLPTQuestion[];
  totalMinutes: number;
};

const categoryLabels = {
  Vocab: "ဝေါဟာရ",
  Grammar: "သဒ္ဒါ",
  Reading: "ဖတ်ရှုခြင်း",
  Listening: "နားထောင်ခြင်း",
};

type PersistedExamState = {
  version: 1;
  expiresAt: number;
  currentIndex: number;
  answers: Record<string, string>;
  flaggedQuestions: string[];
};

const storageKey = "jlpt-mock:n3:prototype:v1";

function formatTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}

export function ExamQuestionScreen({
  questions,
  totalMinutes,
}: ExamQuestionScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState(totalMinutes * 60);
  const [isHydrated, setIsHydrated] = useState(false);
  const question = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / questions.length) * 100);
  const isLastQuestion = currentIndex === questions.length - 1;
  const isTimeUp = isHydrated && secondsRemaining === 0;
  const isLowTime = secondsRemaining > 0 && secondsRemaining <= 5 * 60;

  useEffect(() => {
    const hydrationId = window.setTimeout(() => {
      const fallbackExpiry = Date.now() + totalMinutes * 60 * 1000;

      try {
        const savedValue = window.localStorage.getItem(storageKey);

        if (savedValue) {
          const saved = JSON.parse(savedValue) as PersistedExamState;
          const safeIndex = Math.min(
            Math.max(0, saved.currentIndex ?? 0),
            questions.length - 1,
          );

          setCurrentIndex(safeIndex);
          setAnswers(saved.answers ?? {});
          setFlaggedQuestions(saved.flaggedQuestions ?? []);
          setExpiresAt(saved.expiresAt);
          setSecondsRemaining(
            Math.max(0, Math.ceil((saved.expiresAt - Date.now()) / 1000)),
          );
        } else {
          const initialState: PersistedExamState = {
            version: 1,
            expiresAt: fallbackExpiry,
            currentIndex: 0,
            answers: {},
            flaggedQuestions: [],
          };

          window.localStorage.setItem(storageKey, JSON.stringify(initialState));
          setExpiresAt(fallbackExpiry);
        }
      } catch {
        setExpiresAt(fallbackExpiry);
      } finally {
        setIsHydrated(true);
      }
    }, 0);

    return () => window.clearTimeout(hydrationId);
  }, [questions.length, totalMinutes]);

  useEffect(() => {
    if (!isHydrated || expiresAt === null) {
      return;
    }

    const updateTimer = () => {
      setSecondsRemaining(
        Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000)),
      );
    };

    const timerId = window.setInterval(updateTimer, 1000);

    return () => window.clearInterval(timerId);
  }, [expiresAt, isHydrated]);

  useEffect(() => {
    if (!isHydrated || expiresAt === null) {
      return;
    }

    const state: PersistedExamState = {
      version: 1,
      expiresAt,
      currentIndex,
      answers,
      flaggedQuestions,
    };

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // The exam can continue in memory when browser storage is unavailable.
    }
  }, [answers, currentIndex, expiresAt, flaggedQuestions, isHydrated]);

  function toggleFlag(questionId: string) {
    if (isTimeUp) {
      return;
    }

    setFlaggedQuestions((current) =>
      current.includes(questionId)
        ? current.filter((id) => id !== questionId)
        : [...current, questionId],
    );
  }

  function restartExam() {
    const shouldRestart = window.confirm(
      "လက်ရှိအဖြေတွေနဲ့ ကျန်ချိန်ကိုဖျက်ပြီး စာမေးပွဲကို အစမှပြန်စမလား။",
    );

    if (!shouldRestart) {
      return;
    }

    const nextExpiry = Date.now() + totalMinutes * 60 * 1000;
    setAnswers({});
    setFlaggedQuestions([]);
    setCurrentIndex(0);
    setExpiresAt(nextExpiry);
    setSecondsRemaining(totalMinutes * 60);
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950 text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-red-600 text-sm font-black">
            N3
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <p className="truncate text-sm font-bold">JLPT N3 Real Mock Test</p>
              <p className="text-xs font-semibold text-slate-400">
                {isHydrated
                  ? `${answeredCount}/${questions.length} ဖြေပြီး · သိမ်းထားပြီး`
                  : "စာမေးပွဲကို ပြန်ယူနေသည်…"}
              </p>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-700">
              <div
                className="h-full rounded-full bg-red-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div
            className={`hidden border-l pl-5 text-right sm:block ${
              isLowTime || isTimeUp ? "border-red-500" : "border-slate-700"
            }`}
          >
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              ကျန်ရှိချိန်
            </p>
            <p
              className={`mt-1 font-mono text-xl font-black tracking-wider ${
                isLowTime || isTimeUp ? "text-red-400" : "text-amber-300"
              }`}
              aria-live="off"
            >
              {isHydrated ? formatTime(secondsRemaining) : "--:--:--"}
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_18rem] lg:px-8 lg:py-8">
        <div className="flex items-center justify-between rounded-2xl bg-slate-950 p-4 text-white sm:hidden">
          <div>
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              ကျန်ရှိချိန်
            </p>
            <p
              className={`mt-1 font-mono text-xl font-black tracking-wider ${
                isLowTime || isTimeUp ? "text-red-400" : "text-amber-300"
              }`}
            >
              {isHydrated ? formatTime(secondsRemaining) : "--:--:--"}
            </p>
          </div>
          <p className="text-xs font-semibold text-slate-400">
            {isHydrated ? "အလိုအလျောက် သိမ်းထားသည်" : "ပြန်ယူနေသည်…"}
          </p>
        </div>
        {isTimeUp && (
          <div
            className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-7 text-red-950 lg:col-span-2"
            role="alert"
          >
            <strong>အချိန်ပြည့်သွားပါပြီ။</strong> အဖြေရွေးချယ်မှုကို
            ပိတ်ထားပါတယ်။ Answer submission နဲ့ result calculation ကို
            နောက်အဆင့်မှာ ချိတ်ဆက်ပါမယ်။
          </div>
        )}
        <section className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 sm:px-8">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-black text-red-700">
                {categoryLabels[question.category]}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                မေးခွန်း {currentIndex + 1} / {questions.length}
              </span>
            </div>
            <button
              type="button"
              onClick={() => toggleFlag(question.id)}
              disabled={isTimeUp || !isHydrated}
              aria-pressed={flaggedQuestions.includes(question.id)}
              className={`rounded-lg px-3 py-2 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-200 disabled:cursor-not-allowed disabled:opacity-50 ${
                flaggedQuestions.includes(question.id)
                  ? "bg-amber-100 text-amber-900"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {flaggedQuestions.includes(question.id) ? "★ မှတ်ထားပြီး" : "☆ ပြန်စစ်ရန်မှတ်မယ်"}
            </button>
          </div>

          <div className="p-5 sm:p-8">
            {question.category === "Listening" && (
              <div className="mb-6 flex items-center gap-4 rounded-2xl border border-cyan-200 bg-cyan-50 p-4 text-cyan-950">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-cyan-700 text-lg text-white" aria-hidden="true">
                  ♪
                </div>
                <div>
                  <p className="text-sm font-bold">Listening Audio</p>
                  <p className="mt-1 text-xs leading-5 text-cyan-800">
                    Audio player ကို Listening implementation အဆင့်မှာ ချိတ်ဆက်ပါမယ်။
                  </p>
                </div>
              </div>
            )}

            <h1 lang="ja" className="text-xl font-bold leading-10 text-slate-950 sm:text-2xl sm:leading-11">
              {question.questionText}
            </h1>

            <fieldset className="mt-8">
              <legend className="mb-4 text-sm font-bold text-slate-600">
                အဖြေမှန်တစ်ခုကို ရွေးပါ
              </legend>
              <div className="space-y-3">
                {question.options.map((option, optionIndex) => {
                  const isSelected = answers[question.id] === option;

                  return (
                    <label
                      key={option}
                      className={`flex min-h-16 items-center gap-4 rounded-2xl border-2 p-4 transition focus-within:ring-4 focus-within:ring-red-200 ${
                        isTimeUp || !isHydrated
                          ? "cursor-not-allowed opacity-70"
                          : "cursor-pointer"
                      } ${
                        isSelected
                          ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/10"
                          : "border-slate-200 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={option}
                        checked={isSelected}
                        disabled={isTimeUp || !isHydrated}
                        onChange={() =>
                          setAnswers((current) => ({
                            ...current,
                            [question.id]: option,
                          }))
                        }
                        className="sr-only"
                      />
                      <span
                        className={`flex size-9 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                          isSelected
                            ? "bg-white text-slate-950"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                      <span lang="ja" className="text-base font-semibold leading-7">
                        {option}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-8">
            <button
              type="button"
              onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
              disabled={currentIndex === 0}
              className="min-h-11 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← ရှေ့မေးခွန်း
            </button>
            <button
              type="button"
              onClick={() =>
                setCurrentIndex((index) =>
                  Math.min(questions.length - 1, index + 1),
                )
              }
              disabled={isLastQuestion}
              className="min-h-11 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 disabled:shadow-none"
            >
              နောက်မေးခွန်း →
            </button>
          </div>
        </section>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black text-slate-950">မေးခွန်းများ</h2>
              <span className="text-xs font-semibold text-slate-500">{progress}%</span>
            </div>
            <div className="mt-4 grid grid-cols-5 gap-2 lg:grid-cols-4">
              {questions.map((item, index) => {
                const isCurrent = index === currentIndex;
                const isAnswered = Boolean(answers[item.id]);
                const isFlagged = flaggedQuestions.includes(item.id);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`မေးခွန်း ${index + 1}${isAnswered ? "၊ ဖြေပြီး" : ""}${isFlagged ? "၊ မှတ်ထားသည်" : ""}`}
                    className={`relative aspect-square rounded-xl text-sm font-black transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-200 ${
                      isCurrent
                        ? "bg-slate-950 text-white"
                        : isAnswered
                          ? "bg-emerald-100 text-emerald-900 hover:bg-emerald-200"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {index + 1}
                    {isFlagged && (
                      <span className="absolute -right-1 -top-1 size-3 rounded-full border-2 border-white bg-amber-400" />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="mt-5 space-y-2 border-t border-slate-200 pt-4 text-xs text-slate-500">
              <p><span className="mr-2 inline-block size-2.5 rounded-sm bg-emerald-200" />ဖြေပြီး</p>
              <p><span className="mr-2 inline-block size-2.5 rounded-sm bg-amber-400" />ပြန်စစ်ရန်</p>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex items-center gap-2 text-emerald-950">
              <span className="size-2.5 rounded-full bg-emerald-500" aria-hidden="true" />
              <p className="text-sm font-black">Exam state သိမ်းထားသည်</p>
            </div>
            <p className="mt-2 text-xs leading-6 text-emerald-900">
              Page ကို refresh လုပ်လည်း အဖြေ၊ ကျန်ချိန်နဲ့ လက်ရှိမေးခွန်း မပျောက်ပါဘူး။
            </p>
            <button
              type="button"
              onClick={restartExam}
              className="mt-4 w-full rounded-xl border border-emerald-300 bg-white px-4 py-2.5 text-xs font-bold text-emerald-900 transition hover:border-emerald-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
            >
              စာမေးပွဲကို အစမှပြန်စမယ်
            </button>
          </div>

          <Link
            href="/test/setup/n3"
            className="flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-500"
          >
            Setup သို့ ပြန်သွားမယ်
          </Link>
        </aside>
      </main>
    </div>
  );
}
