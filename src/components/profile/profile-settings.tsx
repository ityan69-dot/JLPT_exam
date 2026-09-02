"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { defaultUserProfile, getUserProfile, saveUserProfile } from "@/services/user-profile-service";
import type { JLPTLevel, UserProfile } from "@/types/jlpt";

const levelDetails: Array<{ level: JLPTLevel; label: string; description: string }> = [
  { level: "N5", label: "အခြေခံ", description: "အခြေခံစကားလုံးနှင့် ဝါကျတိုများ" },
  { level: "N4", label: "အခြေခံအထက်", description: "နေ့စဉ်သုံးဂျပန်စာကို နားလည်ခြင်း" },
];

export function ProfileSettings() {
  const [profile, setProfile] = useState<UserProfile>(defaultUserProfile);
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const hydrationId = window.setTimeout(() => {
      setProfile(getUserProfile());
      setReady(true);
    }, 0);
    return () => window.clearTimeout(hydrationId);
  }, []);

  function submitProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextProfile = { ...profile, displayName: profile.displayName.trim(), updatedAt: new Date().toISOString() };
    saveUserProfile(nextProfile);
    setProfile(nextProfile);
    setSaved(true);
  }

  if (!ready) {
    return <main className="washi-surface min-h-[70vh] bg-[#f7f5ef] px-4 py-14"><div className="mx-auto h-96 max-w-5xl animate-pulse rounded-[2rem] bg-[#eee9df]" /></main>;
  }

  return (
    <main className="washi-surface min-h-screen bg-[#f7f5ef] px-4 py-10 text-[#172033] sm:px-6 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <section className="relative overflow-hidden rounded-[2rem] bg-[#111827] p-7 text-white shadow-[0_24px_70px_rgba(17,24,39,0.2)] sm:p-10">
          <div className="absolute -right-12 -top-20 size-64 rounded-full border-[34px] border-[#c83f35]/75" aria-hidden="true" />
          <div className="relative max-w-2xl">
            <p className="text-xs font-bold tracking-[0.22em] text-[#f2d48f] uppercase">目標設定 · Study Profile</p>
            <h1 className="mt-4 text-3xl font-black sm:text-5xl">မင်းရဲ့ JLPT ရည်မှန်းချက်</h1>
            <p className="mt-4 text-sm leading-7 text-white/65">ဒီ profile ကို ဒီ browser ထဲမှာသာ သိမ်းထားပြီး နောက်လာမယ့် study plan နဲ့ recommendation တွေကို မင်းရဲ့ target အလိုက် ပြင်ဆင်ဖို့ သုံးပါမယ်။</p>
          </div>
        </section>

        <form onSubmit={submitProfile} className="mt-6 space-y-6">
          <section className="rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] p-6 shadow-[0_18px_50px_rgba(50,42,28,0.08)] sm:p-8">
            <p className="text-xs font-bold tracking-[0.18em] text-[#a33a32] uppercase">基本情報 · Basic Profile</p>
            <label htmlFor="displayName" className="mt-5 block text-sm font-black">ခေါ်စေချင်တဲ့နာမည်</label>
            <input id="displayName" value={profile.displayName} maxLength={40} onChange={(event) => { setProfile({ ...profile, displayName: event.target.value }); setSaved(false); }} placeholder="ဥပမာ — Aung" className="mt-2 min-h-12 w-full rounded-xl border border-[#cfc6b7] bg-white px-4 text-sm outline-none transition focus:border-[#c83f35] focus:ring-4 focus:ring-[#c83f35]/10" />
          </section>

          <section className="rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] p-6 shadow-[0_18px_50px_rgba(50,42,28,0.08)] sm:p-8">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] text-[#a33a32] uppercase">目標レベル · Target Level</p>
              <h2 className="mt-2 text-2xl font-black">ဘယ် Level ကို ရည်မှန်းထားလဲ</h2>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {levelDetails.map((item) => {
                const selected = profile.targetLevel === item.level;
                return (
                  <button key={item.level} type="button" aria-pressed={selected} onClick={() => { setProfile({ ...profile, targetLevel: item.level }); setSaved(false); }} className={`min-h-36 rounded-2xl border p-4 text-left transition ${selected ? "border-[#c83f35] bg-[#fff1ed] shadow-[inset_0_0_0_1px_#c83f35]" : "border-[#ded8ca] bg-[#fbf7ee] hover:border-[#a99f90]"}`}>
                    <span className={`text-3xl font-black ${selected ? "text-[#c83f35]" : "text-[#172033]"}`}>{item.level}</span>
                    <span className="mt-3 block text-xs font-black">{item.label}</span>
                    <span className="mt-1 block text-[11px] leading-5 text-[#746c60]">{item.description}</span>
                  </button>
                );
              })}
            </div>
            <p className="mt-4 rounded-xl border border-[#b8ccd1] bg-[#edf4f5] p-4 text-xs leading-6 text-[#356774]">ဒီ platform ကို N5 နဲ့ N4 သီးသန့် အာရုံစိုက်ထားပါတယ်။ မိမိလေ့လာနေတဲ့ level ကို target အဖြစ်ရွေးပါ။</p>
          </section>

          <section className="grid gap-6 rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] p-6 shadow-[0_18px_50px_rgba(50,42,28,0.08)] sm:grid-cols-2 sm:p-8">
            <div>
              <label htmlFor="dailyMinutes" className="block text-sm font-black">တစ်နေ့လေ့လာမယ့်အချိန်</label>
              <p className="mt-1 text-xs leading-6 text-[#746c60]">5 မိနစ်မှ 240 မိနစ်အတွင်း</p>
              <div className="mt-3 flex items-center gap-3">
                <input id="dailyMinutes" type="number" min={5} max={240} step={5} required value={profile.dailyStudyMinutes} onChange={(event) => { setProfile({ ...profile, dailyStudyMinutes: Number(event.target.value) }); setSaved(false); }} className="min-h-12 w-full rounded-xl border border-[#cfc6b7] bg-white px-4 outline-none focus:border-[#c83f35] focus:ring-4 focus:ring-[#c83f35]/10" />
                <span className="text-sm font-bold text-[#625b50]">မိနစ်</span>
              </div>
            </div>
            <div>
              <label htmlFor="examDate" className="block text-sm font-black">ရည်မှန်းထားတဲ့ စာမေးပွဲရက်</label>
              <p className="mt-1 text-xs leading-6 text-[#746c60]">မသတ်မှတ်ရသေးရင် ချန်ထားနိုင်ပါတယ်</p>
              <input id="examDate" type="date" value={profile.examDate ?? ""} onChange={(event) => { setProfile({ ...profile, examDate: event.target.value || null }); setSaved(false); }} className="mt-3 min-h-12 w-full rounded-xl border border-[#cfc6b7] bg-white px-4 outline-none focus:border-[#c83f35] focus:ring-4 focus:ring-[#c83f35]/10" />
            </div>
          </section>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/progress" className="flex min-h-12 items-center justify-center rounded-xl border border-[#cfc6b7] bg-[#fffdf8] px-6 py-3 text-sm font-bold text-[#514b41]">← Progress သို့ပြန်မယ်</Link>
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <span aria-live="polite" className="text-sm font-bold text-[#4f7b5e]">{saved ? "✓ Profile သိမ်းပြီးပါပြီ" : ""}</span>
              <button type="submit" className="min-h-12 rounded-xl bg-[#c83f35] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#a92f28]">Profile သိမ်းမယ်</button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
