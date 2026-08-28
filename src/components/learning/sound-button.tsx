"use client";

import { useRef, useState } from "react";

export function SoundButton({ audioUrl, label }: { audioUrl: string; label: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);

  async function play() {
    const audio = audioRef.current;
    if (!audio || isPlaying) return;
    setError(false);
    audio.currentTime = 0;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setError(true);
    }
  }

  return (
    <div>
      <audio ref={audioRef} src={audioUrl} preload="metadata" onEnded={() => setIsPlaying(false)} onError={() => setError(true)} />
      <button type="button" onClick={play} disabled={isPlaying} aria-label={`${label} အသံနားထောင်မယ်`} className="flex size-10 items-center justify-center rounded-full bg-[#315f63] text-sm font-black text-white transition hover:bg-[#244a4d] disabled:opacity-55">{isPlaying ? "…" : "♪"}</button>
      {error && <p className="mt-1 text-[9px] text-[#a33a32]">အသံဖွင့်မရပါ</p>}
    </div>
  );
}
