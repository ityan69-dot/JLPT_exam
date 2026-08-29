import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { HiraganaSoundGrid, type SoundGroup } from "@/components/learning/hiragana-sound-grid";
export const metadata: Metadata = { title: "Hiragana Combined Sounds" };
const make=(title:string,subtitle:string,values:string[][]):SoundGroup=>({title,subtitle,items:values.map(([kana,romaji])=>({kana,romaji}))});
const groups:SoundGroup[]=[
  make("K / G ပေါင်းသံ","သေးတဲ့ ゃ・ゅ・ょ နဲ့ ပေါင်းဖတ်ပါ",[["きゃ","kya"],["きゅ","kyu"],["きょ","kyo"],["ぎゃ","gya"],["ぎゅ","gyu"],["ぎょ","gyo"]]),
  make("SH / J / CH ပေါင်းသံ","shi, ji, chi တို့နဲ့ ပေါင်းတဲ့ အသံများ",[["しゃ","sha"],["しゅ","shu"],["しょ","sho"],["じゃ","ja"],["じゅ","ju"],["じょ","jo"],["ちゃ","cha"],["ちゅ","chu"],["ちょ","cho"]]),
  make("N / H ပေါင်းသံ","nya နဲ့ hya အသံအုပ်စု",[["にゃ","nya"],["にゅ","nyu"],["にょ","nyo"],["ひゃ","hya"],["ひゅ","hyu"],["ひょ","hyo"]]),
  make("B / P ပေါင်းသံ","bya နဲ့ pya အသံအုပ်စု",[["びゃ","bya"],["びゅ","byu"],["びょ","byo"],["ぴゃ","pya"],["ぴゅ","pyu"],["ぴょ","pyo"]]),
  make("M / R ပေါင်းသံ","mya နဲ့ rya အသံအုပ်စု",[["みゃ","mya"],["みゅ","myu"],["みょ","myo"],["りゃ","rya"],["りゅ","ryu"],["りょ","ryo"]]),
];
export default function Page(){return <div className="washi-surface min-h-screen bg-[#f7f5ef] text-[#172033]"><header className="border-b border-[#ded8ca] bg-[#fffdf8]"><Container className="py-7"><Link href="/learn/n5" className="text-xs font-bold text-[#746c60] hover:text-[#a33a32]">← N5 Course Overview</Link><p className="mt-6 text-xs font-black tracking-[.2em] text-[#a33a32] uppercase">Sound Recognition · 拗音</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">ပေါင်းသံ Hiragana</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-[#746c60]">သေးသေးရေးထားတဲ့ ゃ・ゅ・ょ ကို ရှေ့စာလုံးနဲ့ တစ်သံတည်းပေါင်းဖတ်ပါတယ်။ စာလုံးကိုမြင်ပြီး အသံနားထောင်မှတ်သားပါ။</p></Container></header><Container className="py-10 sm:py-14"><HiraganaSoundGrid groups={groups}/><div className="mt-10 flex flex-wrap justify-between gap-3"><Link href="/learn/n5/hiragana/voiced-sounds" className="rounded-xl border border-[#cfc6b7] bg-[#fffdf8] px-5 py-3 text-sm font-bold text-[#514b41]">← Previous Lesson</Link><Link href="/learn/n5/hiragana/quiz" className="rounded-xl bg-[#c83f35] px-5 py-3 text-sm font-black text-white">Hiragana Quiz →</Link></div></Container></div>;}
