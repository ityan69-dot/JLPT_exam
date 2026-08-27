"use client";

import { useState } from "react";
import Link from "next/link";
import type { JlptLevel } from "@/types/jlpt";

type LevelOption = {
  level: JlptLevel;
  label: string;
  description: string;
  tone: string;
};

const levels: LevelOption[] = [
  {
    level: "N5",
    label: "အစပြုအဆင့်",
    description: "အခြေခံဝေါဟာရနဲ့ ရိုးရှင်းတဲ့ ဝါကျတွေကို စမ်းသပ်မယ်။",
    tone: "bg-emerald-400",
  },
  {
    level: "N4",
    label: "အခြေခံအဆင့်",
    description: "နေ့စဉ်သုံးဂျပန်စာကို နားလည်မှုရှိမရှိ စမ်းသပ်မယ်။",
    tone: "bg-cyan-400",
  },
  {
    level: "N3",
    label: "အလယ်အလတ်အဆင့်",
    description: "နေ့စဉ်အကြောင်းအရာတွေကို ကျယ်ကျယ်ပြန့်ပြန့် စမ်းသပ်မယ်။",
    tone: "bg-amber-400",
  },
  {
    level: "N2",
    label: "အဆင့်မြင့်",
    description: "သတင်းနဲ့ ဆောင်းပါးလို ရှုပ်ထွေးတဲ့ အကြောင်းအရာတွေ ပါဝင်မယ်။",
    tone: "bg-orange-400",
  },
  {
    level: "N1",
    label: "ကျွမ်းကျင်အဆင့်",
    description: "နက်ရှိုင်းပြီး အဆင့်မြင့်တဲ့ ဂျပန်ဘာသာစွမ်းရည်ကို စမ်းသပ်မယ်။",
    tone: "bg-rose-400",
  },
];

export function LevelSelector() {
  const [selectedLevel, setSelectedLevel] = useState<JlptLevel>("N5");
  const selected = levels.find((item) => item.level === selectedLevel)!;

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.25)] sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold text-red-600">ပထမအဆင့်</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            သင်ဖြေဆိုမယ့် JLPT Level ကို ရွေးပါ
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            လက်ရှိပြင်ဆင်နေတဲ့ level ကို ရွေးချယ်ပါ။ နောက်ပိုင်းမှာ
            ပြောင်းလဲနိုင်ပါတယ်။
          </p>
        </div>
        <div className="hidden rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600 sm:block">
          ၅ ဆင့်ထဲမှ ၁ ဆင့်ရွေးပါ
        </div>
      </div>

      <fieldset className="mt-7">
        <legend className="sr-only">JLPT Level ရွေးချယ်ရန်</legend>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {levels.map((item) => {
            const isSelected = item.level === selectedLevel;

            return (
              <label
                key={item.level}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 p-4 transition duration-200 focus-within:ring-4 focus-within:ring-red-200 ${
                  isSelected
                    ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/20"
                    : "border-slate-200 bg-slate-50 text-slate-950 hover:-translate-y-1 hover:border-slate-400 hover:bg-white hover:shadow-lg"
                }`}
              >
                <input
                  type="radio"
                  name="jlpt-level"
                  value={item.level}
                  checked={isSelected}
                  onChange={() => setSelectedLevel(item.level)}
                  className="sr-only"
                />
                <span
                  className={`absolute inset-x-0 top-0 h-1.5 ${item.tone}`}
                  aria-hidden="true"
                />
                <span className="flex items-start justify-between gap-3 pt-1">
                  <span className="text-3xl font-black tracking-tight">
                    {item.level}
                  </span>
                  <span
                    className={`mt-1 flex size-5 items-center justify-center rounded-full border-2 text-[10px] font-black ${
                      isSelected
                        ? "border-white bg-white text-slate-950"
                        : "border-slate-300 bg-white text-transparent"
                    }`}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                </span>
                <span
                  className={`mt-8 block text-sm font-bold ${
                    isSelected ? "text-white" : "text-slate-800"
                  }`}
                >
                  {item.label}
                </span>
                <span
                  className={`mt-2 block text-xs leading-6 ${
                    isSelected ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {item.description}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-base font-black text-slate-950 shadow-sm">
            {selected.level}
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">ရွေးချယ်ထားသည်</p>
            <p className="mt-1 text-sm font-bold text-slate-950">
              {selected.level} · {selected.label}
            </p>
          </div>
        </div>
        <Link
          href={`/test/setup/${selectedLevel.toLowerCase()}`}
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-300 active:translate-y-px"
        >
          ဒီ Level နဲ့ ဆက်သွားမယ်
          <span className="ml-2 text-lg" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
