import Link from "next/link";
import { Container } from "@/components/ui/container";

const levels = [
  { level: "N5", jp: "入門", name: "အစပြုအဆင့်", note: "Hiragana၊ အခြေခံဝေါဟာရနဲ့ ရိုးရှင်းတဲ့ဝါကျများ", tone: "#4f7b5e" },
  { level: "N4", jp: "初級", name: "အခြေခံအဆင့်", note: "နေ့စဉ်သုံးစကားနဲ့ အခြေခံ Grammar များ", tone: "#477d8c" },
  { level: "N3", jp: "中級", name: "အလယ်အလတ်", note: "အလုပ်နဲ့နေ့စဉ်ဘဝအတွက် လက်တွေ့ဂျပန်စာ", tone: "#c58b35" },
  { level: "N2", jp: "上級", name: "အဆင့်မြင့်", note: "သတင်း၊ ဆောင်းပါးနဲ့ ရှုပ်ထွေးတဲ့စကားအသုံးများ", tone: "#bd633b" },
  { level: "N1", jp: "熟達", name: "ကျွမ်းကျင်အဆင့်", note: "နက်ရှိုင်းတဲ့ဖတ်ရှုမှုနဲ့ သဘာဝကျသောအသုံးအနှုန်းများ", tone: "#b33a34" },
];

const subjects = [
  { mark: "語", title: "Vocabulary", my: "ဝေါဟာရ", copy: "စကားလုံး၊ အသံထွက်နဲ့ example sentence" },
  { mark: "文", title: "Grammar", my: "သဒ္ဒါ", copy: "မြန်မာလိုရှင်းပြချက်နဲ့ သုံးပုံသုံးနည်း" },
  { mark: "漢", title: "Kanji", my: "ခန်းဂျီး", copy: "အဓိပ္ပာယ်၊ ဖတ်ပုံနဲ့ မှတ်မိလွယ်တဲ့လေ့ကျင့်ခန်း" },
  { mark: "聴", title: "Listening", my: "နားထောင်ခြင်း", copy: "Natural Japanese audio နဲ့ နားရည်ဝအောင်လေ့ကျင့်ရန်" },
];

export default function Home() {
  return (
    <div className="washi-surface bg-[#f7f5ef] text-[#172033]">
      <section className="relative overflow-hidden bg-[#111827] py-14 text-white sm:py-20">
        <div className="absolute -right-24 -top-32 size-96 rounded-full border-[58px] border-[#c83f35]/80" aria-hidden="true" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:36px_36px]" aria-hidden="true" />
        <Container className="relative">
          <div className="max-w-3xl">
            <p className="text-xs font-black tracking-[0.24em] text-[#f2d48f] uppercase">毎日、少しずつ · နေ့တိုင်း နည်းနည်းစီ</p>
            <h1 className="mt-5 text-4xl font-black leading-[1.35] tracking-tight sm:text-6xl">ဂျပန်စာကို စာမေးပွဲအတွက်တင်မဟုတ်ဘဲ<span className="block text-[#ffb4ad]">တကယ်အသုံးချနိုင်အောင် လေ့လာမယ်။</span></h1>
            <p className="mt-6 max-w-2xl text-sm leading-8 text-white/65 sm:text-lg">N5 ကနေ N1 အထိ ကိုယ့်အဆင့်နဲ့ကိုက်တဲ့ Vocabulary၊ Grammar၊ Kanji နဲ့ Listening ကို မြန်မာလို အဆင့်ဆင့်လေ့လာနိုင်မယ့်နေရာပါ။</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#courses" className="inline-flex min-h-12 items-center rounded-xl bg-[#c83f35] px-6 py-3 text-sm font-black text-white shadow-lg shadow-black/20 transition hover:bg-[#a92f28]">စတင်လေ့လာမယ် →</a>
              <Link href="/test/setup/n3" className="inline-flex min-h-12 items-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">Mock Test စမ်းမယ်</Link>
            </div>
          </div>
        </Container>
      </section>

      <Container className="relative -mt-7 pb-20 sm:-mt-10 sm:pb-28">
        <section className="grid gap-5 rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] p-5 shadow-[0_24px_70px_rgba(50,42,28,0.12)] sm:p-8 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-[1.5rem] bg-[#eef4ef] p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-black tracking-[0.18em] text-[#4f7b5e] uppercase">続きから · Continue Learning</p><h2 className="mt-3 text-2xl font-black sm:text-3xl">ဒီနေ့ ဘာကနေ စလေ့လာမလဲ?</h2><p className="mt-3 max-w-xl text-sm leading-7 text-[#526456]">သင်ခန်းစာစနစ်ကို နောက်တစ်ဆင့်မှာ N5 အခြေခံကနေ စတင်တည်ဆောက်ပါမယ်။</p></div><span className="rounded-full border border-[#b7cbbb] bg-white px-3 py-1.5 text-xs font-bold text-[#31513e]">Day 1</span></div>
            <a href="#courses" className="mt-7 inline-flex min-h-11 items-center rounded-xl bg-[#31513e] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#24402f]">Level ရွေးမယ် →</a>
          </div>
          <Link href="/test/setup/n3" className="group rounded-[1.5rem] bg-[#111827] p-6 text-white transition hover:-translate-y-1 hover:shadow-xl sm:p-8"><p className="text-xs font-black tracking-[0.18em] text-[#ff9a91] uppercase">実力試験 · Mock Test</p><h2 className="mt-3 text-2xl font-black">ကိုယ့် Level ကို စမ်းမယ်</h2><p className="mt-3 text-sm leading-7 text-white/55">စာမေးပွဲရွေးပြီး ဖြေဆိုကာ score ကို ရိုးရှင်းစွာကြည့်နိုင်ပါတယ်။ လက်ရှိ N3 ရပါပြီ။</p><span className="mt-7 inline-flex text-sm font-black text-[#f2d48f]">N3 Test သို့သွားမယ် <span className="ml-2 transition group-hover:translate-x-1">→</span></span></Link>
        </section>

        <section id="courses" className="scroll-mt-24 pt-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-black tracking-[0.2em] text-[#a33a32] uppercase">学習コース · Learning Courses</p><h2 className="mt-3 text-3xl font-black">ကိုယ့်အဆင့်ကို ရွေးပါ</h2></div><p className="max-w-md text-sm leading-7 text-[#746c60]">Level တစ်ခုချင်းစီမှာ သင်ခန်းစာ၊ လေ့ကျင့်ခန်းနဲ့ quick quiz တွေ ပါဝင်လာပါမယ်။</p></div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {levels.map((item, index) => <article key={item.level} className="relative overflow-hidden rounded-2xl border border-[#ded8ca] bg-[#fffdf8] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><span className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: item.tone }} aria-hidden="true" /><div className="flex items-start justify-between pt-1"><span className="text-3xl font-black">{item.level}</span><span lang="ja" className="text-xs font-bold text-[#8a8276]">{item.jp}</span></div><h3 className="mt-7 text-sm font-black">{item.name}</h3><p className="mt-2 min-h-18 text-xs leading-6 text-[#746c60]">{item.note}</p>{index === 0 ? <Link href="/learn/n5" className="mt-4 block border-t border-[#e7e1d4] pt-4 text-[11px] font-black text-[#a33a32] hover:underline">Course ကိုဖွင့်မယ် →</Link> : <p className="mt-4 border-t border-[#e7e1d4] pt-4 text-[11px] font-bold text-[#8a8276]">မကြာမီ ထည့်မည်</p>}</article>)}
          </div>
        </section>

        <section className="pt-16"><div className="rounded-[2rem] bg-[#eee9df] p-6 sm:p-9"><p className="text-xs font-black tracking-[0.2em] text-[#a33a32] uppercase">四つの技能 · Core Skills</p><h2 className="mt-3 text-3xl font-black">တစ်နေရာတည်းမှာ အစုံလေ့လာမယ်</h2><div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{subjects.map((subject) => <article key={subject.title} className="rounded-2xl bg-[#fffdf8] p-5"><span className="flex size-10 items-center justify-center rounded-full bg-[#c83f35] font-serif text-sm font-black text-white">{subject.mark}</span><h3 className="mt-5 font-black">{subject.title} · {subject.my}</h3><p className="mt-2 text-xs leading-6 text-[#746c60]">{subject.copy}</p></article>)}</div></div></section>
      </Container>
    </div>
  );
}
