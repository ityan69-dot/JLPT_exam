"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { DataBackupControls } from "@/components/progress/data-backup-controls";
import { getQuestionsByLevel } from "@/services/exam-service";
import { getPracticeHistory } from "@/services/practice-history-service";
import { getRetryHistory } from "@/services/retry-history-service";
import { getTestHistory } from "@/services/test-history-service";
import { createStudyRecommendations } from "@/services/study-recommendation-service";
import type { MockTestHistoryEntry, RetryHistoryEntry } from "@/types/history";
import type { PracticeHistoryEntry } from "@/types/practice";

type TagProgress = {
  tag: string;
  label: string;
  sessions: number;
  averageAccuracy: number;
  latestAccuracy: number;
  change: number;
};

const n3Questions = getQuestionsByLevel("N3");

function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return minutes > 0 ? `${minutes} မိနစ် ${seconds} စက္ကန့်` : `${seconds} စက္ကန့်`;
}

export function ProgressDashboard() {
  const [history, setHistory] = useState<PracticeHistoryEntry[] | null>(null);
  const [testHistory, setTestHistory] = useState<MockTestHistoryEntry[] | null>(null);
  const [retryHistory, setRetryHistory] = useState<RetryHistoryEntry[] | null>(null);

  useEffect(() => {
    const hydrationId = window.setTimeout(() => {
      setHistory(getPracticeHistory());
      setTestHistory(getTestHistory());
      setRetryHistory(getRetryHistory());
    }, 0);

    return () => window.clearTimeout(hydrationId);
  }, []);

  const summary = useMemo(() => {
    if (!history?.length) return null;

    const totalCorrect = history.reduce((sum, entry) => sum + entry.correct, 0);
    const totalQuestions = history.reduce((sum, entry) => sum + entry.total, 0);
    const totalDuration = history.reduce((sum, entry) => sum + entry.durationSeconds, 0);
    const grouped = new Map<string, PracticeHistoryEntry[]>();

    for (const entry of history) {
      const entries = grouped.get(entry.tag) ?? [];
      entries.push(entry);
      grouped.set(entry.tag, entries);
    }

    const tagProgress: TagProgress[] = [...grouped.entries()]
      .map(([tag, entries]) => {
        const latest = entries[0];
        const oldest = entries.at(-1)!;
        const averageAccuracy = Math.round(
          entries.reduce((sum, entry) => sum + entry.accuracy, 0) / entries.length,
        );

        return {
          tag,
          label: latest.tagLabel,
          sessions: entries.length,
          averageAccuracy,
          latestAccuracy: latest.accuracy,
          change: latest.accuracy - oldest.accuracy,
        };
      })
      .sort((a, b) => a.averageAccuracy - b.averageAccuracy);

    return {
      sessions: history.length,
      accuracy: Math.round((totalCorrect / totalQuestions) * 100),
      totalQuestions,
      totalDuration,
      tagProgress,
    };
  }, [history]);

  const testSummary = useMemo(() => {
    if (!testHistory?.length) return null;

    const averageScore = Math.round(
      testHistory.reduce((sum, entry) => sum + entry.score, 0) / testHistory.length,
    );
    const latestScore = testHistory[0].score;
    const oldestScore = testHistory.at(-1)!.score;

    return {
      averageScore,
      latestScore,
      bestScore: Math.max(...testHistory.map((entry) => entry.score)),
      change: latestScore - oldestScore,
    };
  }, [testHistory]);

  const retrySummary = useMemo(() => {
    if (!retryHistory?.length) return null;
    return {
      averageAccuracy: Math.round(retryHistory.reduce((sum, entry) => sum + entry.retryAccuracy, 0) / retryHistory.length),
      latestAccuracy: retryHistory[0].retryAccuracy,
      bestAccuracy: Math.max(...retryHistory.map((entry) => entry.retryAccuracy)),
      averageImprovement: Math.round(retryHistory.reduce((sum, entry) => sum + entry.improvement, 0) / retryHistory.length),
    };
  }, [retryHistory]);

  const recommendations = useMemo(() => {
    if (!history || !testHistory || !retryHistory) return [];
    return createStudyRecommendations({
      questions: n3Questions,
      testHistory,
      practiceHistory: history,
      retryHistory,
    });
  }, [history, retryHistory, testHistory]);

  if (history === null || testHistory === null || retryHistory === null) {
    return (
      <main className="washi-surface min-h-[70vh] bg-[#f7f5ef] px-4 py-16 text-[#172033]">
        <div className="mx-auto max-w-6xl animate-pulse rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] p-8">
          <div className="h-4 w-40 rounded bg-[#e7e1d4]" />
          <div className="mt-4 h-9 w-72 rounded bg-[#e7e1d4]" />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[0, 1, 2].map((item) => <div key={item} className="h-28 rounded-2xl bg-[#eee9df]" />)}
          </div>
        </div>
      </main>
    );
  }

  if (!summary && !testSummary && !retrySummary) {
    return (
      <main className="washi-surface min-h-[70vh] bg-[#f7f5ef] px-4 py-16 text-[#172033]">
        <section className="mx-auto max-w-2xl rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] p-8 text-center shadow-[0_18px_50px_rgba(50,42,28,0.08)] sm:p-10">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#c83f35] text-xl font-black text-white">進</div>
          <p className="mt-6 text-xs font-bold tracking-[0.2em] text-[#a33a32] uppercase">学習記録 · Progress</p>
          <h1 className="mt-3 text-3xl font-black">Progress မရှိသေးပါဘူး</h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#746c60]">Mock Test သို့မဟုတ် weakness practice တစ်ခု ပြီးဆုံးတာနဲ့ ဒီနေရာမှာ တိုးတက်မှုစတင်ပြပါမယ်။</p>
          <Link href="/test/exam/n3" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#c83f35] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#a92f28]">
            N3 Mock Test စမယ်
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="washi-surface min-h-screen bg-[#f7f5ef] px-4 py-10 text-[#172033] sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <section className="relative overflow-hidden rounded-[2rem] bg-[#111827] p-7 text-white shadow-[0_24px_70px_rgba(17,24,39,0.2)] sm:p-10">
          <div className="absolute -right-16 -top-24 size-72 rounded-full border-[38px] border-[#c83f35]/75" aria-hidden="true" />
          <div className="relative">
            <p className="text-xs font-bold tracking-[0.22em] text-[#f2d48f] uppercase">学習記録 · Progress Dashboard</p>
            <h1 className="mt-4 text-3xl font-black sm:text-5xl">မင်းရဲ့လေ့ကျင့်မှု တိုးတက်မှု</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">ဒီ browser ထဲမှာ သိမ်းထားတဲ့ Mock Test၊ weakness practice နဲ့ retry history ကို စုစည်းဖော်ပြထားပါတယ်။</p>
          </div>
        </section>

        {recommendations.length > 0 && (
          <section className="mt-6 overflow-hidden rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] shadow-[0_18px_50px_rgba(50,42,28,0.08)]">
            <div className="border-b border-[#e7e1d4] bg-[#fbf7ee] p-6 sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] text-[#a33a32] uppercase">今日の学習 · Today&apos;s Study Plan</p>
                  <h2 className="mt-2 text-2xl font-black">ဒီနေ့အတွက် အကြံပြုအစီအစဉ်</h2>
                </div>
                <span className="text-xs font-bold text-[#746c60]">Rule-based · History အလိုက်ပြောင်းလဲသည်</span>
              </div>
            </div>
            <div className="grid gap-px bg-[#e7e1d4] lg:grid-cols-3">
              {recommendations.map((item, index) => (
                <article key={item.id} className={`flex flex-col bg-[#fffdf8] p-6 ${index === 0 ? "lg:bg-[#fff8f3]" : ""}`}>
                  <div className="flex items-start justify-between gap-3">
                    <span className={`flex size-10 items-center justify-center rounded-full text-sm font-black ${index === 0 ? "bg-[#c83f35] text-white" : "bg-[#eee9df] text-[#625b50]"}`}>{index + 1}</span>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${item.priority === "urgent" ? "bg-[#fff1ed] text-[#9a342d]" : item.priority === "high" ? "bg-[#fff8e7] text-[#8b6418]" : "bg-[#eef4ef] text-[#31513e]"}`}>{item.priority}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-black leading-8">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#625b50]">{item.reason}</p>
                  <p className="mt-4 rounded-xl bg-[#fbf7ee] p-3 text-xs leading-6 text-[#746c60]"><strong>အကြောင်းပြချက်:</strong> {item.evidence}</p>
                  <Link href={item.href} className={`mt-5 flex min-h-11 items-center justify-center rounded-xl px-4 py-2.5 text-sm font-bold transition ${index === 0 ? "bg-[#c83f35] text-white hover:bg-[#a92f28]" : "border border-[#cfc6b7] text-[#514b41] hover:border-[#8b8171]"}`}>{item.actionLabel} →</Link>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="စုစုပေါင်းတိုးတက်မှု">
          {[
            ["模擬試験 · Mock Tests", testHistory.length, "ကြိမ်"],
            ["練習回数 · Practice", summary?.sessions ?? 0, "ကြိမ်"],
            ["練習正答率 · Accuracy", summary?.accuracy ?? 0, "%"],
            ["学習時間 · Practice Time", formatDuration(summary?.totalDuration ?? 0), ""],
          ].map(([label, value, suffix]) => (
            <article key={label} className="rounded-2xl border border-[#ded8ca] bg-[#fffdf8] p-5 shadow-[0_10px_30px_rgba(50,42,28,0.06)]">
              <p className="text-[10px] font-bold tracking-[0.12em] text-[#8b8171] uppercase">{label}</p>
              <p className="mt-3 text-2xl font-black text-[#172033]">{value}<span className="ml-1 text-sm text-[#746c60]">{suffix}</span></p>
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] p-6 shadow-[0_18px_50px_rgba(50,42,28,0.08)] sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-[#a33a32] uppercase">誤答回復 · Retry Recovery</p>
              <h2 className="mt-2 text-2xl font-black">အမှားပြန်ပြင်နိုင်မှု</h2>
            </div>
            <span className="text-xs leading-6 text-[#746c60]">Retry session တစ်ကြိမ်ပြီးတိုင်း အလိုအလျောက်သိမ်းထားသည်</span>
          </div>

          {retrySummary ? (
            <>
              <div className="mt-6 grid gap-3 sm:grid-cols-4">
                {[
                  ["Retry အကြိမ်", `${retryHistory.length}`],
                  ["နောက်ဆုံး Recovery", `${retrySummary.latestAccuracy}%`],
                  ["ပျမ်းမျှ Recovery", `${retrySummary.averageAccuracy}%`],
                  ["ပျမ်းမျှ Score တိုးမှု", `+${retrySummary.averageImprovement}%`],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-[#c8d7cc] bg-[#eef4ef] p-4">
                    <p className="text-xs font-bold text-[#3f604d]">{label}</p>
                    <p className="mt-2 text-2xl font-black text-[#24523a]">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 overflow-x-auto pb-2">
                <div className="flex min-w-max items-end gap-3" aria-label="Retry recovery trend">
                  {[...retryHistory].reverse().slice(-10).map((item, index) => (
                    <div key={item.id} className="flex w-20 flex-col items-center gap-2">
                      <span className="text-xs font-black text-[#24523a]">{item.retryAccuracy}%</span>
                      <div className="flex h-28 w-10 items-end overflow-hidden rounded-t-lg bg-[#e4ece6]">
                        <div className="w-full rounded-t-lg bg-[#4f7b5e]" style={{ height: `${Math.max(4, item.retryAccuracy)}%` }} />
                      </div>
                      <span className="text-[10px] font-bold text-[#8b8171]">Retry {index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-xs leading-6 text-[#746c60]">အကောင်းဆုံး recovery accuracy: <strong>{retrySummary.bestAccuracy}%</strong> · Retry session history အများဆုံး ၅၀ ထိ ဒီစက်ထဲမှာ သိမ်းထားပါတယ်။</p>
            </>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-[#cfc6b7] bg-[#fbf7ee] p-6 text-sm leading-7 text-[#746c60]">Retry history မရှိသေးပါဘူး။ Mock Test history ထဲက မှားထားတဲ့မေးခွန်းတွေကို Review လုပ်ပြီး ပြန်ဖြေပါ။</div>
          )}
        </section>

        <section className="mt-6 rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] p-6 shadow-[0_18px_50px_rgba(50,42,28,0.08)] sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-[#a33a32] uppercase">模擬試験履歴 · Mock Test History</p>
              <h2 className="mt-2 text-2xl font-black">စာမေးပွဲရမှတ် အပြောင်းအလဲ</h2>
            </div>
            <Link href="/test/setup/n3" className="text-sm font-bold text-[#a33a32] hover:text-[#7f211d]">Mock Test ထပ်ဖြေမယ် →</Link>
          </div>

          {testSummary ? (
            <>
              <div className="mt-6 grid gap-3 sm:grid-cols-4">
                {[
                  ["နောက်ဆုံးရမှတ်", `${testSummary.latestScore}%`],
                  ["ပျမ်းမျှရမှတ်", `${testSummary.averageScore}%`],
                  ["အကောင်းဆုံးရမှတ်", `${testSummary.bestScore}%`],
                  ["ရမှတ်အပြောင်းအလဲ", `${testSummary.change > 0 ? "+" : ""}${testSummary.change}%`],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-[#e2dccf] bg-[#fbf7ee] p-4">
                    <p className="text-xs font-bold text-[#746c60]">{label}</p>
                    <p className="mt-2 text-2xl font-black">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 overflow-x-auto pb-2">
                <div className="flex min-w-max items-end gap-3" aria-label="နောက်ဆုံး Mock Test ရမှတ်များ">
                  {[...testHistory].reverse().slice(-10).map((entry, index) => (
                    <div key={entry.id} className="flex w-16 flex-col items-center gap-2">
                      <span className="text-xs font-black">{entry.score}%</span>
                      <div className="flex h-32 w-9 items-end overflow-hidden rounded-t-lg bg-[#eee9df]">
                        <div className="w-full rounded-t-lg bg-[#c83f35]" style={{ height: `${Math.max(4, entry.score)}%` }} />
                      </div>
                      <span className="text-[10px] font-bold text-[#8b8171]">Test {index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 space-y-2 border-t border-[#e7e1d4] pt-5">
                {testHistory.slice(0, 5).map((entry) => (
                  <article key={entry.id} className="flex flex-col gap-3 rounded-xl border border-[#e2dccf] bg-[#fbf7ee] p-4 sm:flex-row sm:items-center">
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#111827] text-sm font-black text-white">{entry.score}%</span>
                      <div>
                        <p className="text-sm font-bold">N3 Mock Test {entry.isDeveloperTest && <span className="ml-1 rounded-full bg-[#fff8e7] px-2 py-0.5 text-[9px] text-[#765716]">DEV DATA</span>}</p>
                        <p className="mt-1 text-xs text-[#746c60]">{entry.total} ခုအနက် {entry.correct} ခုမှန် · {entry.wrongQuestions.length} ခုမှား</p>
                      </div>
                    </div>
                    {entry.wrongQuestions.length > 0 ? (
                      <Link href={`/review/n3?result=${encodeURIComponent(entry.id)}`} className="flex min-h-10 items-center justify-center rounded-xl border border-[#c83f35]/30 bg-[#fff1ed] px-4 py-2 text-xs font-bold text-[#9a342d] transition hover:border-[#c83f35]">
                        မှားတာပြန်စစ်မယ် →
                      </Link>
                    ) : (
                      <span className="text-xs font-bold text-[#4f7b5e]">အားလုံးမှန်ပါတယ်</span>
                    )}
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-[#cfc6b7] bg-[#fbf7ee] p-6 text-sm leading-7 text-[#746c60]">Mock Test history မရှိသေးပါဘူး။ N3 Mock Test တစ်ကြိမ်ပြီးဆုံးတာနဲ့ score trend ဒီနေရာမှာ ပေါ်လာပါမယ်။</div>
          )}
        </section>

        <section className="mt-6 rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] p-6 shadow-[0_18px_50px_rgba(50,42,28,0.08)] sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-[#a33a32] uppercase">弱点別 · By Weakness Tag</p>
              <h2 className="mt-2 text-2xl font-black">Tag အလိုက် တိုးတက်မှု</h2>
            </div>
            <p className="text-xs leading-6 text-[#746c60]">Average နည်းဆုံး tag ကို အပေါ်ဆုံးပြထားပါတယ်</p>
          </div>

          {summary ? <div className="mt-6 space-y-4">
            {summary.tagProgress.map((item) => (
              <article key={item.tag} className="rounded-2xl border border-[#e2dccf] bg-[#fbf7ee] p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-black">{item.label}</h3>
                      <span className="rounded-full bg-[#eee9df] px-2.5 py-1 text-[10px] font-bold text-[#625b50]">{item.sessions} sessions</span>
                    </div>
                    <p className="mt-1 text-xs text-[#746c60]">နောက်ဆုံး accuracy {item.latestAccuracy}%</p>
                    <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#e5dfd3]">
                      <div className={`h-full rounded-full ${item.averageAccuracy >= 70 ? "bg-[#4f7b5e]" : item.averageAccuracy >= 50 ? "bg-[#d09a2f]" : "bg-[#c83f35]"}`} style={{ width: `${item.averageAccuracy}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-5 sm:justify-end">
                    <div className="text-right">
                      <p className="text-2xl font-black">{item.averageAccuracy}%</p>
                      <p className="text-[10px] font-bold text-[#8b8171]">AVERAGE</p>
                    </div>
                    <div className={`min-w-16 rounded-xl px-3 py-2 text-center text-xs font-black ${item.change > 0 ? "bg-[#dce9df] text-[#24523a]" : item.change < 0 ? "bg-[#fff1ed] text-[#9a342d]" : "bg-[#eee9df] text-[#625b50]"}`}>
                      {item.change > 0 ? `+${item.change}` : item.change}%
                      <span className="mt-0.5 block text-[9px] font-bold opacity-70">CHANGE</span>
                    </div>
                    <Link href={`/practice/n3?tag=${encodeURIComponent(item.tag)}`} className="flex min-h-11 items-center justify-center rounded-xl bg-[#c83f35] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#a92f28]">
                      လေ့ကျင့်မယ် →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div> : (
            <div className="mt-6 rounded-2xl border border-dashed border-[#cfc6b7] bg-[#fbf7ee] p-6 text-sm leading-7 text-[#746c60]">Weakness practice history မရှိသေးပါဘူး။ Mock Test result ထဲက tag တစ်ခုကို ရွေးပြီး လေ့ကျင့်ပါ။</div>
          )}
        </section>

        <DataBackupControls />

        <div className="mt-6 flex justify-center">
          <Link href="/" className="flex min-h-12 items-center justify-center rounded-xl border border-[#cfc6b7] bg-[#fffdf8] px-6 py-3 text-sm font-bold text-[#514b41] transition hover:border-[#8b8171]">← Home သို့ပြန်သွားမယ်</Link>
        </div>
      </div>
    </main>
  );
}
