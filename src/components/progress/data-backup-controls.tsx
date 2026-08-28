"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { createDataBackup, importDataBackup } from "@/services/data-backup-service";

const maximumFileSize = 1024 * 1024;

type Status = { kind: "success" | "error"; message: string } | null;

export function DataBackupControls() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>(null);

  function exportData() {
    const backup = createDataBackup();
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `jlpt-mock-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus({ kind: "success", message: "Backup ဖိုင်ကို download လုပ်ပြီးပါပြီ။" });
  }

  async function importData(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (file.size > maximumFileSize) {
      setStatus({ kind: "error", message: "Backup ဖိုင်က 1 MB ထက်ကြီးနေပါတယ်။" });
      return;
    }

    try {
      const parsed: unknown = JSON.parse(await file.text());
      const result = importDataBackup(parsed);
      setStatus({
        kind: "success",
        message: `Import ပြီးပါပြီ — Mock Test ${result.testCount}, Practice ${result.practiceCount}, Retry ${result.retryCount}, Question Review ${result.questionReviewCount} records ရှိပါတယ်။`,
      });
    } catch (error) {
      setStatus({
        kind: "error",
        message: error instanceof Error ? error.message : "Backup ဖိုင်ကို ဖတ်လို့မရပါ။",
      });
    }
  }

  return (
    <section className="mt-6 rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] p-6 shadow-[0_18px_50px_rgba(50,42,28,0.08)] sm:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-bold tracking-[0.2em] text-[#a33a32] uppercase">データ保管 · Data Backup</p>
          <h2 className="mt-2 text-2xl font-black">လေ့လာမှုမှတ်တမ်း Backup</h2>
          <p className="mt-3 text-sm leading-7 text-[#746c60]">
            ဒီ browser ထဲက Mock Test, Practice နဲ့ Retry history ကို JSON ဖိုင်အဖြစ် သိမ်းနိုင်ပါတယ်။ Import လုပ်တဲ့အခါ လက်ရှိမှတ်တမ်းတွေကို မဖျက်ဘဲ ID အလိုက် ပေါင်းထည့်ပါမယ်။
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <button type="button" onClick={exportData} className="min-h-12 rounded-xl bg-[#111827] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#273349]">
            Backup ထုတ်မယ်
          </button>
          <button type="button" onClick={() => fileInputRef.current?.click()} className="min-h-12 rounded-xl border border-[#c83f35]/40 bg-[#fff1ed] px-5 py-3 text-sm font-bold text-[#9a342d] transition hover:border-[#c83f35]">
            Backup ပြန်ထည့်မယ်
          </button>
          <input ref={fileInputRef} type="file" accept=".json,application/json" onChange={importData} className="sr-only" aria-label="Backup JSON ဖိုင်ရွေးမယ်" />
        </div>
      </div>

      {status && (
        <div role="status" className={`mt-5 rounded-xl border p-4 text-sm leading-6 ${status.kind === "success" ? "border-[#c8d7cc] bg-[#eef4ef] text-[#24523a]" : "border-[#efb9b2] bg-[#fff1ed] text-[#8f2d27]"}`}>
          {status.message}
          {status.kind === "success" && (
            <button type="button" onClick={() => window.location.reload()} className="ml-2 font-black underline underline-offset-4">Dashboard ကို refresh လုပ်မယ်</button>
          )}
        </div>
      )}
      <p className="mt-4 text-xs leading-6 text-[#8b8171]">JSON ဖိုင်သာ လက်ခံပြီး အများဆုံး 1 MB ဖြစ်ရပါမယ်။ Backup ဖိုင်ကို ယုံကြည်ရတဲ့နေရာမှာသာ သိမ်းပါ။</p>
    </section>
  );
}
