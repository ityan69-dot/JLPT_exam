import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ListeningLessonSession } from "@/components/learning/listening-lesson-session";
import { Container } from "@/components/ui/container";
import { getN5ListeningLesson, listeningAudioUrls, n5ListeningLessons } from "@/data/n5-listening-course";

export function generateStaticParams() { return n5ListeningLessons.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: PageProps<"/learn/n5/listening/[slug]">): Promise<Metadata> {
  const { slug } = await params; const lesson = getN5ListeningLesson(slug); if (!lesson) return {};
  return { title: `N5 Listening — ${lesson.title}`, description: lesson.description };
}

export default async function Page({ params }: PageProps<"/learn/n5/listening/[slug]">) {
  const { slug } = await params; const lesson = getN5ListeningLesson(slug); if (!lesson) notFound();
  const index = n5ListeningLessons.findIndex((item) => item.slug === slug); const previous = n5ListeningLessons[index - 1]; const next = n5ListeningLessons[index + 1];
  return <div className="washi-surface min-h-screen bg-[#f7f5ef] text-[#172033]"><header className="border-b border-[#ded8ca] bg-[#fffdf8]"><Container className="py-8 sm:py-10"><Link href="/learn/n5/listening" className="text-xs font-bold text-[#746c60] hover:text-[#a33a32]">← Listening Lessons</Link><p className="mt-7 text-xs font-black tracking-[.2em] text-[#a33a32] uppercase">Lesson {lesson.no} · {lesson.jp}</p><h1 className="mt-2 text-3xl font-black sm:text-5xl">{lesson.title}</h1><p className="mt-4 max-w-2xl text-sm leading-8 text-[#746c60]">{lesson.description}</p></Container></header><Container className="py-10 sm:py-14"><section className="grid gap-5 lg:grid-cols-[1fr_19rem]"><div><p className="text-xs font-black tracking-[.18em] text-[#a33a32] uppercase">Listening Practice</p><h2 className="mt-2 text-2xl font-black">အသံနားထောင်ပြီး အဖြေရွေးမယ်</h2><p className="mt-2 mb-6 text-sm leading-7 text-[#746c60]">အရင်ဆုံး transcript မကြည့်ဘဲ ဖြေပါ။ အဖြေရွေးပြီးမှ Japanese စာသားနဲ့ မြန်မာရှင်းလင်းချက်ကို ဖွင့်ကြည့်နိုင်ပါတယ်။</p><ListeningLessonSession questions={lesson.questions} audioSets={lesson.questions.map(listeningAudioUrls)} /></div><aside className="rounded-[1.75rem] border border-[#d8c8aa] bg-[#fff8e7] p-6 lg:sticky lg:top-24 lg:self-start"><p className="text-xs font-black tracking-[.18em] text-[#9a6721] uppercase">ဒီ Lesson မှာ</p><ol className="mt-5 space-y-4">{lesson.strategy.map((item, strategyIndex) => <li key={item} className="flex gap-3 text-sm leading-7 text-[#625b50]"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#4f7b5e] text-[10px] font-black text-white">{strategyIndex + 1}</span><span>{item}</span></li>)}</ol><div className="mt-6 border-t border-[#dfd5c2] pt-5"><p className="text-xs font-bold text-[#746c60]">Practice</p><p className="mt-1 text-2xl font-black">{lesson.questions.length} audio clips</p></div></aside></section><div className="mt-10 flex flex-wrap justify-between gap-3">{previous ? <Link href={`/learn/n5/listening/${previous.slug}`} className="rounded-xl border border-[#cfc6b7] bg-white px-5 py-3 text-sm font-bold">← Previous Lesson</Link> : <Link href="/learn/n5/listening" className="rounded-xl border border-[#cfc6b7] bg-white px-5 py-3 text-sm font-bold">← Listening Overview</Link>}{next ? <Link href={`/learn/n5/listening/${next.slug}`} className="rounded-xl bg-[#c83f35] px-5 py-3 text-sm font-black text-white">Next Lesson →</Link> : <Link href="/learn/n5" className="rounded-xl bg-[#4f7b5e] px-5 py-3 text-sm font-black text-white">N5 Course ပြန်သွားမယ် →</Link>}</div></Container></div>;
}
