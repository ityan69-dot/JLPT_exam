"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getQuestionReviews, saveQuestionReview } from "@/services/question-review-service";
import type { JLPTQuestion } from "@/types/jlpt";
import type { QuestionReview, QuestionReviewStatus } from "@/types/question-review";

function emptyReview(questionId: string): QuestionReview {
  return { questionId, status: "pending", naturalJapanese: null, levelAppropriate: null, answerCorrect: null, reviewer: "", notes: "", updatedAt: "" };
}

const statusLabels: Record<QuestionReviewStatus, string> = { pending: "မစစ်ရသေး", approved: "အတည်ပြုပြီး", "needs-fix": "ပြင်ရန်လို" };

export function ExpertQuestionReview({ questions }: { questions: JLPTQuestion[] }) {
  const [reviews, setReviews] = useState<QuestionReview[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<QuestionReviewStatus | "all">("all");
  const [ready, setReady] = useState(false);
  const question = questions[currentIndex];
  const savedReview = reviews.find((item) => item.questionId === question.id);
  const [draft, setDraft] = useState<QuestionReview>(() => emptyReview(question.id));
  const canApprove = draft.naturalJapanese === true && draft.levelAppropriate === true && draft.answerCorrect === true;
  const currentQuestionIds = useMemo(() => new Set(questions.map((item) => item.id)), [questions]);

  useEffect(() => {
    const id = window.setTimeout(() => { setReviews(getQuestionReviews()); setReady(true); }, 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => setDraft(savedReview ?? emptyReview(question.id)), 0);
    return () => window.clearTimeout(id);
  }, [question.id, savedReview]);

  const counts = useMemo(() => ({
    approved: reviews.filter((item) => currentQuestionIds.has(item.questionId) && item.status === "approved").length,
    needsFix: reviews.filter((item) => currentQuestionIds.has(item.questionId) && item.status === "needs-fix").length,
    pending: questions.length - reviews.filter((item) => currentQuestionIds.has(item.questionId) && item.status !== "pending").length,
  }), [currentQuestionIds, questions.length, reviews]);

  function persist(status: QuestionReviewStatus) {
    const nextReview = { ...draft, status, updatedAt: new Date().toISOString() };
    const next = saveQuestionReview(nextReview);
    setDraft(nextReview);
    setReviews(next);
  }

  function goToNextMatching() {
    for (let offset = 1; offset <= questions.length; offset += 1) {
      const nextIndex = (currentIndex + offset) % questions.length;
      const status = reviews.find((item) => item.questionId === questions[nextIndex].id)?.status ?? "pending";
      if (filter === "all" || status === filter) { setCurrentIndex(nextIndex); return; }
    }
  }

  if (!ready) return <main className="washi-surface min-h-[70vh] bg-[#f7f5ef] px-4 py-14"><div className="mx-auto h-96 max-w-6xl animate-pulse rounded-[2rem] bg-[#eee9df]" /></main>;

  return (
    <main className="washi-surface min-h-screen bg-[#f7f5ef] px-4 py-10 text-[#172033] sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <section className="relative overflow-hidden rounded-[2rem] bg-[#111827] p-7 text-white sm:p-10">
          <div className="absolute -right-16 -top-24 size-72 rounded-full border-[38px] border-[#c83f35]/75" aria-hidden="true" />
          <div className="relative">
            <p className="text-xs font-bold tracking-[0.22em] text-[#f2d48f] uppercase">問題監修 · Expert Review</p>
            <h1 className="mt-4 text-3xl font-black sm:text-5xl">N3 Question Quality Review</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">ဂျပန်စာကျွမ်းကျင်သူက မေးခွန်းတွေရဲ့ ဘာသာစကားသဘာဝကျမှု၊ N3 difficulty နဲ့ အဖြေမှန်ကန်မှုကို အတည်ပြုရန်ဖြစ်ပါတယ်။</p>
          </div>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          {[["အတည်ပြုပြီး", counts.approved, "text-[#24523a] bg-[#eef4ef] border-[#c8d7cc]"], ["ပြင်ရန်လို", counts.needsFix, "text-[#8f2d27] bg-[#fff1ed] border-[#efb9b2]"], ["မစစ်ရသေး", counts.pending, "text-[#625b50] bg-[#fffdf8] border-[#ded8ca]"]].map(([label, value, tone]) => <div key={String(label)} className={`rounded-2xl border p-5 ${tone}`}><p className="text-xs font-bold">{label}</p><p className="mt-2 text-3xl font-black">{value}<span className="ml-1 text-xs">/ {questions.length}</span></p></div>)}
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[16rem_1fr]">
          <aside className="rounded-[1.75rem] border border-[#ded8ca] bg-[#fffdf8] p-5 lg:sticky lg:top-6 lg:self-start">
            <label htmlFor="reviewFilter" className="text-xs font-black">Review Status</label>
            <select id="reviewFilter" value={filter} onChange={(event) => setFilter(event.target.value as typeof filter)} className="mt-2 min-h-11 w-full rounded-xl border border-[#cfc6b7] bg-white px-3 text-sm">
              <option value="all">အားလုံး</option><option value="pending">မစစ်ရသေး</option><option value="approved">အတည်ပြုပြီး</option><option value="needs-fix">ပြင်ရန်လို</option>
            </select>
            <div className="mt-5 grid grid-cols-5 gap-2 lg:grid-cols-4">
              {questions.map((item, index) => {
                const status = reviews.find((review) => review.questionId === item.id)?.status ?? "pending";
                const hidden = filter !== "all" && status !== filter;
                return <button key={item.id} type="button" hidden={hidden} onClick={() => setCurrentIndex(index)} className={`aspect-square rounded-xl text-xs font-black ${index === currentIndex ? "bg-[#111827] text-white" : status === "approved" ? "bg-[#dce9df] text-[#24523a]" : status === "needs-fix" ? "bg-[#fae0dc] text-[#9a342d]" : "bg-[#eee9df] text-[#625b50]"}`}>{index + 1}</button>;
              })}
            </div>
            <Link href="/test/setup/n3" className="mt-5 flex min-h-11 items-center justify-center rounded-xl border border-[#cfc6b7] text-xs font-bold">← Setup သို့ပြန်မယ်</Link>
          </aside>

          <section className="overflow-hidden rounded-[1.75rem] border border-[#ded8ca] bg-[#fffdf8] shadow-[0_18px_50px_rgba(50,42,28,0.08)]">
            <div className="flex items-center justify-between border-b border-[#e7e1d4] bg-[#fbf7ee] p-5 sm:px-8">
              <div><span className="rounded-full bg-[#c83f35] px-3 py-1.5 text-xs font-black text-white">{question.category}</span><span className="ml-3 text-xs text-[#746c60]">Question {currentIndex + 1} / {questions.length}</span></div>
              <span className="text-xs font-black">{statusLabels[draft.status]}</span>
            </div>
            <div className="p-5 sm:p-8">
              <p lang="ja" className="text-xl font-bold leading-10">{question.questionText}</p>
              {question.listeningScript && <div className="mt-4 rounded-xl border border-[#b8c6c8] bg-[#eef4f2] p-4"><p className="text-xs font-black text-[#315f63]">Listening Script</p><p lang="ja" className="mt-2 text-sm leading-7">{question.listeningScript}</p></div>}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {question.options.map((option, index) => <div key={option} lang="ja" className={`rounded-xl border p-4 text-sm ${option === question.correctAnswer ? "border-[#4f7b5e] bg-[#eef4ef] font-black text-[#24523a]" : "border-[#ded8ca] bg-[#fbf7ee]"}`}><span className="mr-2 text-xs opacity-60">{String.fromCharCode(65 + index)}</span>{option}{option === question.correctAnswer && <span className="ml-2 text-[10px]">✓ CORRECT</span>}</div>)}
              </div>
              <div className="mt-6 rounded-2xl border border-[#e2dccf] bg-[#fbf7ee] p-5"><p className="text-xs font-black text-[#a33a32]">Explanation</p><p className="mt-2 text-sm leading-7 text-[#625b50]">{question.explanation ?? "Explanation မရှိသေးပါ"}</p></div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[["naturalJapanese", "ဂျပန်စာ သဘာဝကျသလား"], ["levelAppropriate", "N3 Level ကိုက်သလား"], ["answerCorrect", "အဖြေမှန်ကန်သလား"]] .map(([field, label]) => {
                  const key = field as "naturalJapanese" | "levelAppropriate" | "answerCorrect";
                  return <fieldset key={field} className="rounded-2xl border border-[#ded8ca] p-4"><legend className="px-1 text-xs font-black">{label}</legend><div className="mt-2 flex gap-2"><button type="button" onClick={() => setDraft({ ...draft, [key]: true })} className={`min-h-10 flex-1 rounded-lg text-xs font-bold ${draft[key] === true ? "bg-[#4f7b5e] text-white" : "bg-[#eee9df]"}`}>ဟုတ်</button><button type="button" onClick={() => setDraft({ ...draft, [key]: false })} className={`min-h-10 flex-1 rounded-lg text-xs font-bold ${draft[key] === false ? "bg-[#c83f35] text-white" : "bg-[#eee9df]"}`}>မဟုတ်</button></div></fieldset>;
                })}
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div><label htmlFor="reviewer" className="text-xs font-black">Reviewer name</label><input id="reviewer" value={draft.reviewer} onChange={(event) => setDraft({ ...draft, reviewer: event.target.value })} className="mt-2 min-h-11 w-full rounded-xl border border-[#cfc6b7] px-4 text-sm" placeholder="ဥပမာ — Yuki" /></div>
                <div><label htmlFor="reviewNotes" className="text-xs font-black">ပြင်ဆင်ရန်မှတ်ချက်</label><textarea id="reviewNotes" value={draft.notes} onChange={(event) => setDraft({ ...draft, notes: event.target.value })} className="mt-2 min-h-24 w-full rounded-xl border border-[#cfc6b7] p-4 text-sm" placeholder="စကားလုံး၊ option သို့မဟုတ် difficulty ပြဿနာကို ရေးပါ" /></div>
              </div>
            </div>
            <div className="grid gap-3 border-t border-[#e7e1d4] bg-[#fbf7ee] p-5 sm:grid-cols-3 sm:px-8">
              <button type="button" onClick={() => persist("needs-fix")} className="min-h-11 rounded-xl border border-[#c83f35]/40 bg-[#fff1ed] text-sm font-bold text-[#9a342d]">ပြင်ရန်လိုတယ်</button>
              <button type="button" onClick={() => persist("approved")} disabled={!canApprove} title={!canApprove ? "အချက်သုံးခုလုံး ဟုတ် ရွေးပြီးမှ အတည်ပြုနိုင်ပါတယ်" : undefined} className="min-h-11 rounded-xl bg-[#4f7b5e] text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-[#c9d2cb] disabled:text-[#657168]">အတည်ပြုမယ်</button>
              <button type="button" onClick={goToNextMatching} className="min-h-11 rounded-xl bg-[#111827] text-sm font-bold text-white">နောက်မေးခွန်း →</button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
