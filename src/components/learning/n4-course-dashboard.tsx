"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { n4LessonHref, n4Lessons, n4Modules } from "@/data/n4-course";
import { getN4ProgressServerSnapshot, getN4ProgressSnapshot, subscribeN4Progress } from "@/services/n4-progress-service";

const meta = {
  Vocabulary: { no: "01", jp: "語彙", mm: "နေ့စဉ်ဘဝ၊ အလုပ်၊ ခရီးနဲ့ ခံစားချက်ဝေါဟာရ" },
  Grammar: { no: "02", jp: "文法", mm: "N4 sentence patterns နဲ့ ဆက်စပ်အသုံးများ" },
  Kanji: { no: "03", jp: "漢字", mm: "အဓိပ္ပာယ်အုပ်စုလိုက် N4 Kanji မှတ်နည်း" },
  Reading: { no: "04", jp: "読む", mm: "Message၊ notice၊ passage နဲ့ information search" },
  Listening: { no: "05", jp: "聴く", mm: "နေ့စဉ်စကားပြော၊ ညွှန်ကြားချက်နဲ့ quick response" },
} as const;

export function N4CourseDashboard() {
  const progress = useSyncExternalStore(subscribeN4Progress, getN4ProgressSnapshot, getN4ProgressServerSnapshot);
  const totalDone = n4Lessons.filter((item) => progress.completed[n4LessonHref(item)]).length;
  const percent = Math.round(totalDone / n4Lessons.length * 100);

  return <>
    <div className="rounded-[1.75rem] border border-[#b8ccd1] bg-[#edf4f5] p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-black tracking-[.18em] text-[#356774] uppercase">Your N4 Progress</p><p className="mt-2 text-4xl font-black">{percent}%</p></div><p className="text-sm font-black text-[#356774]">{totalDone} / {n4Lessons.length} lessons</p></div>
      <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-[#477d8c] transition-all" style={{ width: `${percent}%` }} /></div>
    </div>
    <div className="mt-6 grid gap-4 lg:grid-cols-2">
      {n4Modules.map((module) => {
        const lessons = n4Lessons.filter((item) => item.module === module);
        const done = lessons.filter((item) => progress.completed[n4LessonHref(item)]).length;
        const next = lessons.find((item) => !progress.completed[n4LessonHref(item)]) ?? lessons[0];
        const modulePercent = Math.round(done / lessons.length * 100);
        return <article key={module} className="rounded-[1.5rem] border border-[#ded8ca] bg-[#fffdf8] p-5 sm:p-6">
          <div className="flex items-start gap-4"><span className={`flex size-12 shrink-0 items-center justify-center rounded-full text-xs font-black ${done === lessons.length ? "bg-[#477d8c] text-white" : "bg-[#eef1eb] text-[#625b50]"}`}>{done === lessons.length ? "✓" : meta[module].no}</span><div className="min-w-0 flex-1"><p lang="ja" className="text-xs font-bold text-[#a33a32]">{meta[module].jp}</p><div className="mt-1 flex items-center justify-between gap-3"><h2 className="text-xl font-black">{module}</h2><span className="text-xs font-black text-[#477d8c]">{done}/{lessons.length}</span></div><p className="mt-2 text-sm leading-7 text-[#746c60]">{meta[module].mm}</p></div></div>
          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#eee9df]"><div className="h-full rounded-full bg-[#477d8c]" style={{ width: `${modulePercent}%` }} /></div>
          <div className="mt-5 grid gap-2">{lessons.map((item, index) => { const complete = Boolean(progress.completed[n4LessonHref(item)]); return <Link key={item.slug} href={n4LessonHref(item)} className="flex items-center justify-between gap-3 rounded-xl border border-[#e4ded2] bg-white px-4 py-3 text-sm transition hover:border-[#477d8c]"><span className="truncate font-bold"><span className="mr-2 text-[10px] text-[#9a9184]">{String(index + 1).padStart(2, "0")}</span>{item.title}</span><span className={complete ? "text-[#477d8c]" : "text-[#a33a32]"}>{complete ? "✓" : "→"}</span></Link>; })}</div>
          <Link href={n4LessonHref(next)} className="mt-4 flex min-h-11 items-center justify-center rounded-xl bg-[#172033] px-4 py-3 text-xs font-black text-white">{done ? "ဆက်လေ့လာမယ်" : "စတင်လေ့လာမယ်"} →</Link>
        </article>;
      })}
    </div>
  </>;
}
