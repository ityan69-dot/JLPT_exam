"use client";

import Link from "next/link";
import { useState } from "react";
import type { JlptLevel } from "@/types/jlpt";

type LevelOption = {
  level: JlptLevel;
  label: string;
  japaneseLabel: string;
  description: string;
  tone: string;
};

const levels: LevelOption[] = [
  { level: "N5", label: "အစပြုအဆင့်", japaneseLabel: "入門", description: "အခြေခံဝေါဟာရနဲ့ ရိုးရှင်းတဲ့ ဝါကျများ", tone: "bg-[#4f7c67]" },
  { level: "N4", label: "အခြေခံအဆင့်", japaneseLabel: "初級", description: "နေ့စဉ်သုံးဂျပန်စာရဲ့ အခြေခံနားလည်မှု", tone: "bg-[#477d8c]" },
];

export function LevelSelector() {
  const [selectedLevel, setSelectedLevel] = useState<JlptLevel | null>(null);
  const selected = levels.find((item) => item.level === selectedLevel);

  return (
    <div className="rounded-[2rem] border border-stone-200 bg-[#fffdf8] p-5 shadow-[0_24px_80px_-32px_rgba(17,24,39,0.3)] sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-full bg-[#c83f35] font-serif text-xs font-bold text-white">一</span>
            <p className="text-sm font-bold text-[#b3312b]">ပထမအဆင့်</p>
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            ဖြေဆိုမယ့် JLPT Level ကို ရွေးပါ
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            လက်ရှိပြင်ဆင်နေတဲ့ level ကို ရွေးချယ်ပါ။ နောက်ပိုင်းမှာ ပြောင်းလဲနိုင်ပါတယ်။
          </p>
        </div>
        <p lang="ja" className="font-serif text-sm tracking-[0.16em] text-stone-400">レベルを選択</p>
      </div>

      <fieldset className="mt-7">
        <legend className="sr-only">JLPT Level ရွေးချယ်ရန်</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {levels.map((item) => {
            const isSelected = item.level === selectedLevel;

            return (
              <label
                key={item.level}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 p-4 transition duration-200 focus-within:ring-4 focus-within:ring-red-200 ${
                  isSelected
                    ? "border-[#111827] bg-[#111827] text-white shadow-lg shadow-slate-950/20"
                    : "border-stone-200 bg-[#faf8f2] text-slate-950 hover:-translate-y-1 hover:border-stone-400 hover:bg-white hover:shadow-lg"
                }`}
              >
                <input type="radio" name="jlpt-level" value={item.level} checked={isSelected} onChange={() => setSelectedLevel(item.level)} className="sr-only" />
                <span className={`absolute inset-x-0 top-0 h-1.5 ${item.tone}`} aria-hidden="true" />
                <span className="flex items-start justify-between gap-3 pt-1">
                  <span className="text-3xl font-black tracking-tight">{item.level}</span>
                  <span lang="ja" className={`font-serif text-xs ${isSelected ? "text-slate-400" : "text-stone-400"}`}>{item.japaneseLabel}</span>
                </span>
                <span className={`mt-8 block text-sm font-bold ${isSelected ? "text-white" : "text-slate-800"}`}>{item.label}</span>
                <span className={`mt-2 block text-xs leading-6 ${isSelected ? "text-slate-300" : "text-slate-600"}`}>{item.description}</span>
                <span className={`absolute bottom-3 right-3 flex size-5 items-center justify-center rounded-full border text-[10px] font-black ${isSelected ? "border-[#ef5348] bg-[#ef5348] text-white" : "border-stone-300 bg-white text-transparent"}`} aria-hidden="true">✓</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-stone-200 bg-[#f4f0e7] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-[#c83f35] bg-[#fffdf8] text-base font-black text-[#9f2f29]">{selected?.level ?? "?"}</div>
          <div>
            <p className="text-xs font-semibold text-stone-500">ရွေးချယ်ထားသည် · 選択中</p>
            <p className="mt-1 text-sm font-bold text-slate-950">{selected ? `${selected.level} · ${selected.label}` : "Level တစ်ခုကို ရွေးပါ"}</p>
          </div>
        </div>
        {selectedLevel ? <Link href={`/test/setup/${selectedLevel.toLowerCase()}`} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#c83f35] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-900/15 transition hover:bg-[#a92f28] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-200 active:translate-y-px">ဒီ Level နဲ့ ဆက်သွားမယ်<span className="ml-2 text-lg" aria-hidden="true">→</span></Link> : <span className="inline-flex min-h-12 cursor-not-allowed items-center justify-center rounded-xl bg-stone-300 px-6 py-3 text-sm font-bold text-stone-600">Level ရွေးပြီးမှ ဆက်သွားမယ်</span>}
      </div>
    </div>
  );
}
