"use client";

import { useEffect, useRef, useState } from "react";

export function TracingPad({ kana }: { kana: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);

  function point(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!; const rect = canvas.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * (canvas.width / rect.width), y: (event.clientY - rect.top) * (canvas.height / rect.height) };
  }
  function start(event: React.PointerEvent<HTMLCanvasElement>) { const context = canvasRef.current?.getContext("2d"); if (!context) return; const p = point(event); context.beginPath(); context.moveTo(p.x, p.y); setDrawing(true); event.currentTarget.setPointerCapture(event.pointerId); }
  function move(event: React.PointerEvent<HTMLCanvasElement>) { if (!drawing) return; const context = canvasRef.current?.getContext("2d"); if (!context) return; const p = point(event); context.lineWidth = 12; context.lineCap = "round"; context.strokeStyle = "#315f63"; context.lineTo(p.x, p.y); context.stroke(); }
  function clear() { const canvas = canvasRef.current; if (canvas) canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height); }
  useEffect(() => clear(), [kana]);

  return <div><div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-[#d8c8aa] bg-[#fffdf8]"><span className="absolute inset-x-0 top-1/2 border-t border-dashed border-[#ded8ca]" /><span className="absolute inset-y-0 left-1/2 border-l border-dashed border-[#ded8ca]" /><span lang="ja" className="pointer-events-none absolute inset-0 flex items-center justify-center text-[11rem] font-medium text-[#ded8ca]/55">{kana}</span><canvas ref={canvasRef} width={360} height={360} onPointerDown={start} onPointerMove={move} onPointerUp={() => setDrawing(false)} onPointerCancel={() => setDrawing(false)} className="absolute inset-0 size-full touch-none cursor-crosshair" aria-label={`${kana} ကို မျဉ်းကြောင်းလိုက်ရေးရန်`} /></div><button type="button" onClick={clear} className="mt-3 w-full rounded-xl border border-[#cfc6b7] bg-[#fffdf8] px-4 py-2.5 text-xs font-bold text-[#625b50]">ရေးထားတာရှင်းမယ်</button></div>;
}
