import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { remainingN5KanjiLessons } from "@/data/n5-kanji-course";

export const metadata: Metadata = { title: "N5 Kanji Course" };

const lessons = [
  { no: "01", kanji: "日 月 山 川 人", title: "ပုံကနေ ဖြစ်လာတဲ့ Kanji", detail: "နေ၊ လ၊ တောင်၊ မြစ်၊ လူ ပုံရိပ်နဲ့ ဆွဲချက်အစဉ်ကို တွဲမှတ်မယ်", href: "/learn/n5/kanji/picture-kanji" },
  { no: "02", kanji: "一 二 三 四 五", title: "နံပါတ် ၁ မှ ၅", detail: "အခြေခံနံပါတ် Kanji နဲ့ ရေတွက်ဖတ်ပုံ", href: "/learn/n5/kanji/numbers-one-five" },
  ...remainingN5KanjiLessons.map((lesson)=>({no:lesson.no,kanji:lesson.kanji.map(({char})=>char).join(" "),title:lesson.title,detail:lesson.subtitle,href:`/learn/n5/kanji/lesson/${lesson.slug}`})),
];

export default function Page() {
  return <div className="washi-surface min-h-screen bg-[#f7f5ef] text-[#172033]">
    <header className="relative overflow-hidden bg-[#111827] text-white">
      <div className="absolute -right-10 -top-20 text-[15rem] font-black leading-none text-white/[.04]" lang="ja" aria-hidden="true">字</div>
      <Container className="relative py-12 sm:py-16">
        <Link href="/learn/n5" className="text-xs font-bold text-white/55 hover:text-white">← N5 Course Overview</Link>
        <p className="mt-8 text-xs font-black tracking-[.2em] text-[#9fd0ac] uppercase">Module 06 · 漢字</p>
        <h1 className="mt-3 text-4xl font-black sm:text-5xl">N5 Kanji</h1>
        <p className="mt-4 max-w-2xl text-sm leading-8 text-white/65">Kanji ကို စာလုံးပုံစံသက်သက် မကျက်ဘဲ မူလပုံရိပ်၊ မြန်မာမှတ်နည်း၊ ဆွဲချက်အစဉ်၊ အသံထွက်နဲ့ အသုံးဝင်စကားလုံးကို တစ်ခါတည်း တွဲမှတ်မယ်။</p>
      </Container>
    </header>
    <Container className="py-10 sm:py-14">
      <section className="rounded-[1.75rem] border border-[#d8c8aa] bg-[#fff8e7] p-6 sm:p-8">
        <p className="text-xs font-black tracking-[.18em] text-[#9a6721] uppercase">မှတ်မိစေမယ့် နည်းလမ်း ၄ ဆင့်</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{["① ပုံကိုကြည့်", "② ဇာတ်လမ်းတိုနဲ့မှတ်", "③ ဆွဲချက်လိုက်ရေး", "④ အသံနဲ့စကားလုံးသုံး"].map((step) => <p key={step} className="rounded-xl bg-[#fffdf8] px-4 py-4 text-sm font-black text-[#31513e]">{step}</p>)}</div>
      </section>
      <section className="mt-12">
        <p className="text-xs font-black tracking-[.2em] text-[#a33a32] uppercase">Kanji Roadmap</p>
        <h2 className="mt-3 text-3xl font-black">ပုံရိပ်လွယ်တာကနေ စမယ်</h2>
        <div className="mt-7 grid gap-5 md:grid-cols-2">{lessons.map((lesson) => {
          const card = <article className={`h-full rounded-[1.75rem] border border-[#ded8ca] bg-[#fffdf8] p-6 ${lesson.href ? "transition hover:-translate-y-1 hover:border-[#4f7b5e] hover:shadow-lg" : "opacity-55"}`}>
            <div className="flex items-start justify-between gap-4"><span className="flex size-12 items-center justify-center rounded-full bg-[#4f7b5e] text-xs font-black text-white">{lesson.no}</span><span lang="ja" className="text-2xl font-black tracking-[.18em] text-[#a33a32]">{lesson.kanji}</span></div>
            <h3 className="mt-5 text-xl font-black">{lesson.title}</h3><p className="mt-3 text-sm leading-7 text-[#746c60]">{lesson.detail}</p><p className="mt-5 text-xs font-black text-[#31513e]">{lesson.href ? "သင်ခန်းစာဖွင့်မယ် →" : "မကြာမီ"}</p>
          </article>;
          return lesson.href ? <Link key={lesson.no} href={lesson.href}>{card}</Link> : <div key={lesson.no}>{card}</div>;
        })}</div>
      </section>
    </Container>
  </div>;
}
