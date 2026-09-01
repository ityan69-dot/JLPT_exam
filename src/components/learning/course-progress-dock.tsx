"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { n5CourseSteps } from "@/data/n5-course-registry";
import { getCourseProgressServerSnapshot, getCourseProgressSnapshot, setLessonVisited, subscribeCourseProgress, toggleLessonComplete } from "@/services/course-progress-service";

export function CourseProgressDock() {
  const pathname = usePathname();
  const step = n5CourseSteps.find((item) => item.href === pathname);
  const progress = useSyncExternalStore(subscribeCourseProgress, getCourseProgressSnapshot, getCourseProgressServerSnapshot);
  useEffect(() => { if (step) setLessonVisited(step.href); }, [step]);
  if (!step) return null;
  const completed = Boolean(progress.completed[step.href]);
  return <aside className="fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-md items-center justify-between gap-4 rounded-2xl border border-[#d8c8aa] bg-[#fffdf8]/95 p-3 shadow-[0_16px_50px_rgba(23,32,51,.2)] backdrop-blur sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[23rem]" aria-label="Lesson progress">
    <div className="min-w-0"><p className="text-[10px] font-black tracking-[.14em] text-[#a33a32] uppercase">{step.module} Progress</p><p className="mt-1 truncate text-sm font-black">{step.title}</p></div>
    <button type="button" onClick={() => toggleLessonComplete(step.href)} className={`shrink-0 rounded-xl px-4 py-3 text-xs font-black transition ${completed ? "bg-[#e4f0e7] text-[#31513e] hover:bg-[#d6e7da]" : "bg-[#c83f35] text-white hover:bg-[#ad332b]"}`}>{completed ? "✓ ပြီးပါပြီ" : "ပြီးပြီ မှတ်မယ်"}</button>
  </aside>;
}
