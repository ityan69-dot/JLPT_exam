import type { Metadata } from "next";
import { HiraganaRowLesson } from "@/components/learning/hiragana-row-lesson";
export const metadata: Metadata = { title: "Hiragana M-row" };
const characters = [
  {kana:"ま",romaji:"ma",strokes:3,hint:"အလျားလိုက်နှစ်ချက်ကိုအရင်ရေးပြီး ဒေါင်လိုက်ဆင်းကာ အဆုံးမှာဝိုင်းပါ။"},
  {kana:"み",romaji:"mi",strokes:2,hint:"ပထမဆွဲချက်ကိုကွေးပြီး ဒုတိယဆွဲချက်ကို ညာဘက်မှဖြတ်ဆွဲပါ။"},
  {kana:"む",romaji:"mu",strokes:3,hint:"အလျားလိုက်ပြီး ဒုတိယဆွဲချက်ကိုဝိုင်းကွေးကာ နောက်ဆုံးအမှတ်တိုကိုဖြည့်ပါ။"},
  {kana:"め",romaji:"me",strokes:2,hint:"ပထမဆွဲချက်ကိုစောင်းရေးပြီး ဒုတိယဆွဲချက်နဲ့ ဖြတ်ကာ ဝိုင်းဆွဲပါ။"},
  {kana:"も",romaji:"mo",strokes:3,hint:"အလယ်ဒေါင်လိုက်ကွေးဆွဲချက်ပြီးမှ အလျားလိုက်နှစ်ချက်ကို ဖြည့်ပါ။"},
];
export default function Page(){return <HiraganaRowLesson row="ま行" characters={characters} progress="31–35" note="ま行 အသံငါးလုံးရဲ့ ပုံစံနဲ့ ဆွဲချက်အစဉ်ကို လေ့ကျင့်ပါ" previous={{href:"/learn/n5/hiragana/h-row",label:"は行 ပြန်သွားမယ်"}} next={{href:"/learn/n5/hiragana/y-row",label:"や・ゆ・よ ဆက်သင်မယ်"}}/>;}
