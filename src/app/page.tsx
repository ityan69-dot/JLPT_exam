import { LevelSelector } from "@/components/exam/level-selector";
import { Container } from "@/components/ui/container";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 py-16 text-white sm:py-20">
        <div
          className="absolute -top-32 right-0 size-80 rounded-full bg-red-600/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-36 left-1/3 size-72 rounded-full bg-amber-400/10 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-slate-100">
                <span className="size-2 rounded-full bg-red-500" />
                JLPT REAL MOCK TEST
              </div>
              <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl">
                ကိုယ့် Level ကို ရွေးပြီး
                <span className="block text-amber-300">တကယ်တိုးတက်အောင် လေ့ကျင့်ပါ။</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                JLPT စာမေးပွဲပုံစံအတိုင်း လေ့ကျင့်ပြီး ဝေါဟာရ၊ သဒ္ဒါ၊ ဖတ်ရှုခြင်းနဲ့
                နားထောင်ခြင်းပိုင်းက အားနည်းချက်တွေကို ရှာဖွေပါ။
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:max-w-md lg:ml-auto">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-black text-white">N5—N1</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">Level အားလုံးအတွက်</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-black text-white">4 Skills</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">အားနည်းချက်ခွဲခြမ်းမှု</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative z-10 -mt-5 pb-20 sm:-mt-8 sm:pb-28">
        <Container>
          <LevelSelector />
        </Container>
      </section>
    </>
  );
}
