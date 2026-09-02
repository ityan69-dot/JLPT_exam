"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import type { N4Lesson } from "@/data/n4-course";
import { completeN4Lesson, getN4ProgressServerSnapshot, getN4ProgressSnapshot, subscribeN4Progress, toggleN4Lesson, visitN4Lesson } from "@/services/n4-progress-service";

export function N4LessonSession({ lesson, href, previousHref, nextHref }: { lesson: N4Lesson; href: string; previousHref?: string; nextHref?: string }) {
  const progress = useSyncExternalStore(subscribeN4Progress, getN4ProgressSnapshot, getN4ProgressServerSnapshot);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const correct = selected === lesson.answer;
  const completed = Boolean(progress.completed[href]);

  useEffect(() => { visitN4Lesson(href); }, [href]);
  useEffect(() => { if (selected !== null) completeN4Lesson(href); }, [href, selected]);

  function speak(text: string) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 0.82;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div className="washi-surface min-h-screen bg-[#f7f5ef] text-[#172033]">
      <header className="border-b border-[#ded8ca] bg-[#fffdf8]">
        <div className="mx-auto max-w-6xl px-5 py-7 sm:px-8">
          <Link href="/learn/n4" className="text-xs font-bold text-[#746c60] hover:text-[#a33a32]">← N4 Course Overview</Link>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-5">
            <div><p className="text-xs font-black tracking-[.18em] text-[#a33a32] uppercase">{lesson.module} · N4 Lesson</p><h1 className="mt-2 text-3xl font-black sm:text-5xl">{lesson.title}</h1><p lang="ja" className="mt-2 text-lg font-bold text-[#477d8c]">{lesson.japanese}</p></div>
            <button type="button" onClick={() => toggleN4Lesson(href)} className={`rounded-xl px-4 py-3 text-xs font-black ${completed ? "bg-[#e4f0e7] text-[#31513e]" : "bg-[#c83f35] text-white"}`}>{completed ? "✓ သင်ခန်းစာပြီးပါပြီ" : "ပြီးပြီဟု မှတ်မယ်"}</button>
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#746c60]">{lesson.summary}</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <section>
          <p className="text-xs font-black tracking-[.18em] text-[#a33a32] uppercase">要点 · Key Points</p>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {lesson.points.map((point, index) => (
              <article key={point.japanese} className="rounded-[1.5rem] border border-[#ded8ca] bg-[#fffdf8] p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4"><div><p lang="ja" className="text-2xl font-black">{point.japanese}</p><p className="mt-2 text-xs font-bold text-[#477d8c]">{point.reading}</p></div><button type="button" onClick={() => speak(point.japanese)} className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#31513e] text-white" aria-label="ဂျပန်အသံနားထောင်မယ်">{speaking ? "■" : "♪"}</button></div>
                <button type="button" onClick={() => setRevealed((old) => ({ ...old, [index]: !old[index] }))} className="mt-5 w-full rounded-xl border border-[#d8d1c4] bg-[#f7f3ea] px-4 py-3 text-left text-sm font-black">
                  {revealed[index] ? point.meaning : "မြန်မာအဓိပ္ပာယ် ကြည့်မယ်"}
                </button>
                <p className="mt-4 border-l-2 border-[#c83f35] pl-4 text-sm leading-7 text-[#625b50]">{point.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[1.75rem] border border-[#d8c8aa] bg-[#fff8e7] p-6 sm:p-8">
          <p className="text-xs font-black tracking-[.18em] text-[#9a6721] uppercase">理解チェック · Mini Check</p>
          <h2 className="mt-4 text-xl font-black">{lesson.question}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">{lesson.options.map((option, index) => <button type="button" key={option} disabled={selected !== null} onClick={() => setSelected(index)} className={`min-h-12 rounded-xl border px-4 py-3 text-left text-sm font-bold ${selected !== null && index === lesson.answer ? "border-[#47745a] bg-[#e4f0e7] text-[#254632]" : selected === index ? "border-[#c83f35] bg-[#fbe5e2] text-[#8d2922]" : "border-[#d8d1c4] bg-white hover:border-[#477d8c]"}`}>{index + 1}. {option}</button>)}</div>
          {selected !== null && <div className="mt-5 rounded-xl bg-white p-5"><p className="font-black">{correct ? "မှန်ပါတယ် ✓" : "မမှန်သေးပါ"}</p><p className="mt-2 text-sm leading-7 text-[#625b50]">{lesson.explanation}</p></div>}
        </section>

        <nav className="mt-8 flex flex-wrap justify-between gap-3">{previousHref ? <Link href={previousHref} className="rounded-xl border border-[#cfc6b7] bg-[#fffdf8] px-5 py-3 text-sm font-bold">← Previous Lesson</Link> : <Link href="/learn/n4" className="rounded-xl border border-[#cfc6b7] bg-[#fffdf8] px-5 py-3 text-sm font-bold">← Course Overview</Link>}{nextHref ? <Link href={nextHref} className="rounded-xl bg-[#c83f35] px-5 py-3 text-sm font-black text-white">Next Lesson →</Link> : <Link href="/learn/n4" className="rounded-xl bg-[#31513e] px-5 py-3 text-sm font-black text-white">N4 Course Overview ✓</Link>}</nav>
      </main>
    </div>
  );
}
