import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { HiraganaSoundGrid, type SoundGroup } from "@/components/learning/hiragana-sound-grid";
export const metadata: Metadata = { title: "Hiragana Voiced Sounds" };
const groups: SoundGroup[] = [
  {title:"が行 · G အသံ",subtitle:"か行 ကို ゛ထည့်လိုက်ရင် G အသံပြောင်းပါတယ်",items:[["が","ga"],["ぎ","gi"],["ぐ","gu"],["げ","ge"],["ご","go"]].map(([kana,romaji])=>({kana,romaji}))},
  {title:"ざ行 · Z အသံ",subtitle:"さ行 ကို ゛ထည့်ထားတဲ့ အသံများ",items:[{kana:"ざ",romaji:"za"},{kana:"じ",romaji:"ji",note:"zi မဟုတ်ဘဲ ji လို့ ဖတ်ပါတယ်"},{kana:"ず",romaji:"zu"},{kana:"ぜ",romaji:"ze"},{kana:"ぞ",romaji:"zo"}]},
  {title:"だ行 · D အသံ",subtitle:"た行 ကို ゛ထည့်ထားတဲ့ အသံများ",items:[{kana:"だ",romaji:"da"},{kana:"ぢ",romaji:"ji",audioKey:"ji-d",note:"ယနေ့ဂျပန်အသံမှာ じ နဲ့ အသံနီးပါးတူပါတယ်"},{kana:"づ",romaji:"zu",audioKey:"zu-d",note:"ယနေ့ဂျပန်အသံမှာ ず နဲ့ အသံနီးပါးတူပါတယ်"},{kana:"で",romaji:"de"},{kana:"ど",romaji:"do"}]},
  {title:"ば行 · B အသံ",subtitle:"は行 ကို ゛ထည့်လိုက်ရင် B အသံပြောင်းပါတယ်",items:[["ば","ba"],["び","bi"],["ぶ","bu"],["べ","be"],["ぼ","bo"]].map(([kana,romaji])=>({kana,romaji}))},
  {title:"ぱ行 · P အသံ",subtitle:"は行 ကို ゜ထည့်လိုက်ရင် P အသံပြောင်းပါတယ်",items:[["ぱ","pa"],["ぴ","pi"],["ぷ","pu"],["ぺ","pe"],["ぽ","po"]].map(([kana,romaji])=>({kana,romaji}))},
];
export default function Page(){return <div className="washi-surface min-h-screen bg-[#f7f5ef] text-[#172033]"><header className="border-b border-[#ded8ca] bg-[#fffdf8]"><Container className="py-7"><Link href="/learn/n5" className="text-xs font-bold text-[#746c60] hover:text-[#a33a32]">← N5 Course Overview</Link><p className="mt-6 text-xs font-black tracking-[.2em] text-[#a33a32] uppercase">Sound Recognition · 濁音・半濁音</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">အသံပြောင်း Hiragana</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-[#746c60]">ရေးနည်းမပါပါဘူး။ စာလုံးပေါ်က ゛နဲ့ ゜ အမှတ်ကိုကြည့်ပြီး အသံဘယ်လိုပြောင်းသွားလဲ နားထောင်မှတ်သားပါ။</p></Container></header><Container className="py-10 sm:py-14"><HiraganaSoundGrid groups={groups}/><div className="mt-10 flex flex-wrap justify-between gap-3"><Link href="/learn/n5/hiragana/w-row" className="rounded-xl border border-[#cfc6b7] bg-[#fffdf8] px-5 py-3 text-sm font-bold text-[#514b41]">← Previous Lesson</Link><Link href="/learn/n5/hiragana/combined-sounds" className="rounded-xl bg-[#c83f35] px-5 py-3 text-sm font-black text-white">Next Lesson →</Link></div></Container></div>;}
