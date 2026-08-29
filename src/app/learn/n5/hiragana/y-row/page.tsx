import type { Metadata } from "next";
import { HiraganaRowLesson } from "@/components/learning/hiragana-row-lesson";
export const metadata: Metadata = { title: "Hiragana Y-row" };
const characters = [
  {kana:"や",romaji:"ya",strokes:3,hint:"ဘယ်ဘက်ဆွဲချက်၊ အလယ်အမှတ်တိုနဲ့ ညာဘက်ရှည်တဲ့ဆွဲချက်ကို အစဉ်လိုက်ရေးပါ။"},
  {kana:"ゆ",romaji:"yu",strokes:2,hint:"ဘယ်ဘက်ကွေးဆွဲချက်ပြီးမှ အလယ်ကိုဖြတ်ပြီး ညာဘက်ကွေးတဲ့ဆွဲချက်ကို ရေးပါ။"},
  {kana:"よ",romaji:"yo",strokes:2,hint:"အပေါ်အလျားလိုက်ကိုအရင်ရေးပြီး ဒေါင်လိုက်ဆင်းကာ အောက်မှာဝိုင်းပါ။"},
];
export default function Page(){return <HiraganaRowLesson row="や行" characters={characters} progress="36–38" note="ယနေ့အသုံးများတဲ့ や・ゆ・よ သုံးလုံးကို သင်မယ်—yi နဲ့ ye မပါပါဘူး" previous={{href:"/learn/n5/hiragana/m-row",label:"ま行 ပြန်သွားမယ်"}} next={{href:"/learn/n5/hiragana/r-row",label:"ら・り・る・れ・ろ ဆက်သင်မယ်"}}/>;}
