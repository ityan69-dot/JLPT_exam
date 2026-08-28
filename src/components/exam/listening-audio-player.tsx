"use client";

import { useRef, useState } from "react";

const maximumPlays = 2;

export function ListeningAudioPlayer({ audioUrl }: { audioUrl: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [plays, setPlays] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState("");

  async function play() {
    const audio = audioRef.current;
    if (!audio || plays >= maximumPlays || isPlaying) return;

    setError("");
    audio.currentTime = 0;
    try {
      await audio.play();
      setPlays((count) => count + 1);
      setIsPlaying(true);
    } catch {
      setError("အသံဖွင့်မရပါ။ Device volume နဲ့ browser audio permission ကို စစ်ပါ။");
    }
  }

  function stop() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }

  return (
    <div className="ml-auto flex shrink-0 flex-col items-end gap-1.5">
      <audio ref={audioRef} src={audioUrl} preload="metadata" onEnded={() => setIsPlaying(false)} onError={() => setError("Audio ဖိုင်ကို load မလုပ်နိုင်ပါ။")} />
      <div className="flex gap-2">
        <button type="button" onClick={play} disabled={plays >= maximumPlays || isPlaying} className="min-h-10 rounded-xl bg-[#315f63] px-4 py-2 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-45">
          {isPlaying ? "အသံဖွင့်နေသည်…" : plays === 0 ? "▶ အသံဖွင့်မယ်" : "↻ ထပ်နားထောင်မယ်"}
        </button>
        {isPlaying && <button type="button" onClick={stop} className="min-h-10 rounded-xl border border-[#315f63]/30 bg-white px-3 py-2 text-xs font-bold text-[#315f63]">■ ရပ်မယ်</button>}
      </div>
      <p className="text-[10px] text-[#42686b]">Nanami Neural MP3 · {maximumPlays - plays} ကြိမ်ကျန်</p>
      {error && <p role="alert" className="max-w-64 text-right text-[10px] leading-5 text-[#9a342d]">{error}</p>}
    </div>
  );
}
