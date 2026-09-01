"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { n5CourseModules, n5CourseSteps } from "@/data/n5-course-registry";
import { getCourseProgressServerSnapshot, getCourseProgressSnapshot, subscribeCourseProgress } from "@/services/course-progress-service";

export function N5ProgressHero() {
  const state = useSyncExternalStore(subscribeCourseProgress, getCourseProgressSnapshot, getCourseProgressServerSnapshot);
  const completed = n5CourseSteps.filter((step) => state.completed[step.href]).length;
  const percent = Math.round((completed / n5CourseSteps.length) * 100);
  return <div className="min-w-[17rem] rounded-2xl border border-white/10 bg-white/5 p-5"><div className="flex items-end justify-between gap-4"><div><p className="text-3xl font-black">{percent}%</p><p className="mt-1 text-[10px] text-white/45">Course Progress</p></div><p className="text-xs font-bold text-[#9fd0ac]">{completed} / {n5CourseSteps.length} steps</p></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[#9fd0ac] transition-all" style={{ width: `${percent}%` }} /></div></div>;
}

export function N5ProgressPanel() {
  const state = useSyncExternalStore(subscribeCourseProgress, getCourseProgressSnapshot, getCourseProgressServerSnapshot);
  const nextStep = (state.lastVisited && !state.completed[state.lastVisited] ? n5CourseSteps.find((step) => step.href === state.lastVisited) : undefined) ?? n5CourseSteps.find((step) => !state.completed[step.href]);
  return <div className="rounded-[1.75rem] border border-[#b9cdbf] bg-[#edf5ef] p-6"><p className="text-xs font-black tracking-[.18em] text-[#31513e] uppercase">Continue Learning</p>{nextStep ? <><h2 className="mt-3 text-xl font-black">{nextStep.title}</h2><p className="mt-2 text-xs font-bold text-[#4f7b5e]">{nextStep.module}</p><Link href={nextStep.href} className="mt-5 flex min-h-11 items-center justify-center rounded-xl bg-[#4f7b5e] px-4 py-3 text-sm font-black text-white">ဆက်လေ့လာမယ် →</Link></> : <><h2 className="mt-3 text-xl font-black">N5 Course ပြီးပါပြီ 🎉</h2><p className="mt-2 text-sm leading-7 text-[#54705d]">Learning steps အားလုံးကို ပြီးမြောက်ထားပါတယ်။</p></>}
    <div className="mt-5 border-t border-[#c9dccd] pt-4"><p className="text-[10px] font-black tracking-[.14em] text-[#54705d] uppercase">Module Status</p><div className="mt-3 flex flex-wrap gap-2">{n5CourseModules.map((module) => { const steps = n5CourseSteps.filter((step) => step.module === module); const done = steps.filter((step) => state.completed[step.href]).length; return <span key={module} className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${done === steps.length ? "bg-[#4f7b5e] text-white" : "bg-white text-[#625b50]"}`}>{module} {done}/{steps.length}</span>; })}</div></div>
  </div>;
}

const moduleLabels: Record<string, { jp: string; mm: string }> = {
  Romaji: { jp: "音の基礎", mm: "ဂျပန်အသံအခြေခံ" },
  Hiragana: { jp: "ひらがな", mm: "ဟိရဂန" },
  Katakana: { jp: "カタカナ", mm: "ခတခန" },
  Vocabulary: { jp: "ことば", mm: "ဝေါဟာရ" },
  Grammar: { jp: "文法", mm: "သဒ္ဒါ" },
  Kanji: { jp: "漢字", mm: "ခန်းဂျီး" },
  Reading: { jp: "読む", mm: "စာဖတ်ခြင်း" },
  Listening: { jp: "聴く", mm: "နားထောင်ခြင်း" },
};

export function N5ModuleProgressDashboard() {
  const state = useSyncExternalStore(subscribeCourseProgress, getCourseProgressSnapshot, getCourseProgressServerSnapshot);

  return (
    <section className="mt-10" aria-labelledby="module-progress-title">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black tracking-[0.2em] text-[#a33a32] uppercase">学習記録 · Study Progress</p>
          <h2 id="module-progress-title" className="mt-3 text-2xl font-black sm:text-3xl">ဘာသာရပ်အလိုက် လေ့လာမှုအခြေအနေ</h2>
        </div>
        <p className="max-w-md text-sm leading-7 text-[#746c60]">ပြီးထားတဲ့သင်ခန်းစာနဲ့ နောက်ဆက်လေ့လာရမယ့်အပိုင်းကို ဒီနေရာမှာ တစ်ခါတည်းကြည့်နိုင်ပါတယ်။</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {n5CourseModules.map((module, index) => {
          const steps = n5CourseSteps.filter((step) => step.module === module);
          const done = steps.filter((step) => state.completed[step.href]).length;
          const percent = Math.round((done / steps.length) * 100);
          const next = steps.find((step) => !state.completed[step.href]);
          const label = moduleLabels[module];

          return (
            <article key={module} className="flex min-h-[15rem] flex-col rounded-[1.5rem] border border-[#ded8ca] bg-[#fffdf8] p-5 shadow-[0_8px_30px_rgba(23,32,51,.04)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p lang="ja" className="text-xs font-bold text-[#a33a32]">{label.jp}</p>
                  <h3 className="mt-1 text-lg font-black">{module}</h3>
                  <p className="mt-1 text-xs text-[#746c60]">{label.mm}</p>
                </div>
                <span className={`flex size-10 items-center justify-center rounded-full text-xs font-black ${done === steps.length ? "bg-[#4f7b5e] text-white" : "bg-[#f2eee5] text-[#625b50]"}`}>{done === steps.length ? "✓" : String(index + 1).padStart(2, "0")}</span>
              </div>

              <div className="mt-5 flex items-end justify-between">
                <p className="text-3xl font-black text-[#172033]">{done}<span className="text-base text-[#8a8276]"> / {steps.length}</span></p>
                <p className="text-xs font-black text-[#4f7b5e]">{percent}%</p>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#eee9df]" aria-label={`${module} ${percent}% complete`}>
                <div className="h-full rounded-full bg-[#4f7b5e] transition-all duration-500" style={{ width: `${percent}%` }} />
              </div>

              <div className="mt-auto pt-5">
                {next ? (
                  <Link href={next.href} className="group block rounded-xl border border-[#d8d1c4] bg-white px-4 py-3 transition hover:border-[#4f7b5e] hover:bg-[#f4f8f5]">
                    <span className="block text-[10px] font-black tracking-[.12em] text-[#8a8276] uppercase">နောက်သင်ခန်းစာ</span>
                    <span className="mt-1 flex items-center justify-between gap-2 text-sm font-black"><span className="truncate">{next.title}</span><span className="text-[#a33a32] transition group-hover:translate-x-0.5">→</span></span>
                  </Link>
                ) : (
                  <div className="rounded-xl bg-[#e4f0e7] px-4 py-3 text-sm font-black text-[#31513e]">ဒီအပိုင်း ပြီးဆုံးပါပြီ ✓</div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
