import type { Metadata } from "next";
import { HiraganaRowLesson } from "@/components/learning/hiragana-row-lesson";
export const metadata: Metadata = { title: "Hiragana N-row" };
const characters = [
  { kana: "な", romaji: "na", strokes: 4, hint: "ဘယ်ဘက်ဆွဲချက်နှစ်ချက်ကိုအရင်ရေးပြီး ညာဘက်အမှတ်နဲ့ ကွေးဆွဲချက်ကို ဆက်ရေးပါ။" },
  { kana: "に", romaji: "ni", strokes: 3, hint: "ဘယ်ဘက်ဒေါင်လိုက်ဆွဲချက်ပြီးမှ ညာဘက်အလျားလိုက်နှစ်ချက်ကို ရေးပါ။" },
  { kana: "ぬ", romaji: "nu", strokes: 2, hint: "ပထမဆွဲချက်ကို ဖြတ်ပြီး ဒုတိယဆွဲချက်ကို ဝိုင်းကာ အဆုံးမှာကွင်းလုပ်ပါ။" },
  { kana: "ね", romaji: "ne", strokes: 2, hint: "ဘယ်ဘက်ဒေါင်လိုက်ပြီးမှ ညာဘက်သို့ကွေးကာ အဆုံးမှာဝိုင်းပါ။" },
  { kana: "の", romaji: "no", strokes: 1, hint: "အတွင်းဘက်ကစပြီး နာရီလက်တံပြောင်းပြန် ညင်ညင်သာသာ တစ်ချက်တည်းဝိုင်းရေးပါ။" },
];
export default function Page(){return <HiraganaRowLesson row="な行" characters={characters} progress="21–25" note="အသံငါးလုံးကို နားထောင်ပြီး ぬ・ね・の ရဲ့ကွေးပုံကွာခြားချက်ကို သတိထားပါ" previous={{href:"/learn/n5/hiragana/t-row",label:"た行 ပြန်သွားမယ်"}} next={{href:"/learn/n5/hiragana/h-row",label:"は・ひ・ふ・へ・ほ ဆက်သင်မယ်"}}/>;}
