import { LevelSelector } from "@/components/exam/level-selector";
import { Container } from "@/components/ui/container";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#111827] py-16 text-white sm:py-20">
        <div className="absolute right-[8%] top-1/2 size-72 -translate-y-1/2 rounded-full bg-[#cf3d32] opacity-90 sm:size-96" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:36px_36px]" aria-hidden="true" />
        <div className="absolute right-4 top-8 hidden font-serif text-xs tracking-[0.35em] text-white/50 [writing-mode:vertical-rl] lg:block" lang="ja">
          日本語能力試験・模擬試験
        </div>

        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-slate-100 backdrop-blur-sm">
                <span className="size-2.5 rounded-full bg-[#ef5348]" aria-hidden="true" />
                <span lang="ja">日本語能力試験</span>
                <span className="text-white/40">/</span>
                <span>JLPT MOCK</span>
              </div>
              <h1 className="text-4xl font-black leading-[1.3] tracking-tight sm:text-6xl">
                ကိုယ့် Level ကို ရွေးပြီး
                <span className="block text-[#ffcc80]">တကယ်တိုးတက်အောင် လေ့ကျင့်ပါ။</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                စာမေးပွဲပုံစံအတိုင်း အချိန်ကန့်သတ်ပြီး ဖြေဆိုပါ။ ဝေါဟာရ၊
                သဒ္ဒါ၊ ဖတ်ရှုခြင်းနဲ့ နားထောင်ခြင်းပိုင်းက အားနည်းချက်တွေကို
                ရလဒ်အပြီးမှာ ရှာဖွေနိုင်ပါတယ်။
              </p>
            </div>

            <div className="relative grid grid-cols-2 gap-3 sm:max-w-md lg:ml-auto">
              <div className="rounded-2xl border border-white/15 bg-[#111827]/70 p-5 backdrop-blur-sm">
                <p className="font-serif text-2xl font-black text-white">N5—N1</p>
                <p className="mt-2 text-xs leading-5 text-slate-300">အဆင့်အားလုံးအတွက်</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-[#111827]/70 p-5 backdrop-blur-sm">
                <p lang="ja" className="font-serif text-2xl font-black text-white">四技能</p>
                <p className="mt-2 text-xs leading-5 text-slate-300">စွမ်းရည် ၄ ပိုင်း ခွဲခြမ်းမှု</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="washi-surface relative z-10 -mt-5 pb-20 sm:-mt-8 sm:pb-28">
        <Container>
          <LevelSelector />
        </Container>
      </section>
    </>
  );
}
