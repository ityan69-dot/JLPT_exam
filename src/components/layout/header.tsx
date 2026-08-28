import Link from "next/link";
import { Container } from "@/components/ui/container";

export function Header() {
  return (
    <header className="border-b border-stone-200 bg-[#fffdf8]">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-3 text-slate-950">
          <span className="flex size-9 items-center justify-center rounded-full bg-[#c83f35] font-serif text-xs font-black text-white shadow-sm transition-transform group-hover:rotate-12" aria-hidden="true">日</span>
          <span>
            <span className="block text-sm font-bold tracking-tight">JLPT Mock</span>
            <span className="block text-[10px] tracking-[0.12em] text-stone-500">日本語能力試験</span>
          </span>
        </Link>
        <div className="flex items-center gap-3 text-xs text-stone-500">
          <Link href="/profile" className="rounded-lg px-2 py-2 font-bold text-stone-600 transition hover:bg-stone-100 hover:text-[#c83f35]">
            Profile
          </Link>
          <Link href="/progress" className="rounded-lg px-2 py-2 font-bold text-stone-600 transition hover:bg-stone-100 hover:text-[#c83f35]">
            Progress
          </Link>
          <span className="size-1 rounded-full bg-[#c83f35]" aria-hidden="true" />
          <span>မြန်မာ</span>
        </div>
      </Container>
    </header>
  );
}
