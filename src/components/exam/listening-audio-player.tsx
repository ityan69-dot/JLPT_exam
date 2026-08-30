"use client";

import { useEffect, useRef, useState } from "react";

const maximumPlays = 2;

export function ListeningAudioPlayer({ audioUrls }: { audioUrls: string[] }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [plays, setPlays] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [segmentIndex, setSegmentIndex] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isPlaying || segmentIndex === 0) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    void audio.play().catch(() => {
      setIsPlaying(false);
      setError("နောက်အသံပိုင်းကို ဆက်ဖွင့်မရပါ။");
    });
  }, [isPlaying, segmentIndex]);

  async function play() {
    const audio = audioRef.current;
    if (!audio || plays >= maximumPlays || isPlaying) return;

    setError("");
    setSegmentIndex(0);
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

  function handleEnded() {
    if (segmentIndex < audioUrls.length - 1) {
      setSegmentIndex((index) => index + 1);
    } else {
      setIsPlaying(false);
      setSegmentIndex(0);
    }
  }

  return (
    <div className="ml-auto flex shrink-0 flex-col items-end gap-1.5">
      <audio ref={audioRef} src={audioUrls[segmentIndex]} preload="metadata" onEnded={handleEnded} onError={() => setError("Audio ဖိုင်ကို load မလုပ်နိုင်ပါ။")} />
      <div className="flex gap-2">
        <button type="button" onClick={play} disabled={plays >= maximumPlays || isPlaying} className="min-h-10 rounded-xl bg-[#315f63] px-4 py-2 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-45">
          {isPlaying ? "အသံဖွင့်နေသည်…" : plays === 0 ? "▶ အသံဖွင့်မယ်" : "↻ ထပ်နားထောင်မယ်"}
        </button>
        {isPlaying && <button type="button" onClick={stop} className="min-h-10 rounded-xl border border-[#315f63]/30 bg-white px-3 py-2 text-xs font-bold text-[#315f63]">■ ရပ်မယ်</button>}
      </div>
      <p className="text-[10px] text-[#42686b]">Japanese multi-speaker MP3 · {maximumPlays - plays} ကြိမ်ကျန်</p>
      {error && <p role="alert" className="max-w-64 text-right text-[10px] leading-5 text-[#9a342d]">{error}</p>}
    </div>
  );
}
