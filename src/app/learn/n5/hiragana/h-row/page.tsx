import type { Metadata } from "next";
import { HiraganaRowLesson } from "@/components/learning/hiragana-row-lesson";
export const metadata: Metadata = { title: "Hiragana H-row" };
const characters = [
  { kana:"は",romaji:"ha",strokes:3,hint:"ဘယ်ဘက်ဒေါင်လိုက်ကိုအရင်ရေးပြီး ညာဘက်အလျားလိုက်နဲ့ ကွေးဆွဲချက်ကို ဆက်ရေးပါ။" },
  { kana:"ひ",romaji:"hi",strokes:1,hint:"ဘယ်ဘက်ကစပြီး အောက်သို့ဝိုင်းကွေးကာ ညာဘက်အပေါ်သို့ တစ်ချက်တည်းဆက်ရေးပါ။" },
  { kana:"ふ",romaji:"fu",strokes:4,hint:"အလယ်အမှတ်နှစ်ချက်ကိုအရင်ရေးပြီး ဘေးနှစ်ဖက်ကဆွဲချက်တွေ ဖြည့်ပါ။ hu မဟုတ်ဘဲ fu လို့ဖတ်ပါတယ်။" },
  { kana:"へ",romaji:"he",strokes:1,hint:"ဘယ်အောက်ကနေ အလယ်အပေါ်သို့တက်ပြီး ညာအောက်သို့ တစ်ချက်တည်းရေးပါ။" },
  { kana:"ほ",romaji:"ho",strokes:4,hint:"ဘယ်ဘက်ဒေါင်လိုက်ပြီးမှ ညာဘက်အလျားလိုက်နှစ်ချက်နဲ့ နောက်ဆုံးကွေးဆွဲချက်ကို ရေးပါ။" },
];
export default function Page(){return <HiraganaRowLesson row="は行" characters={characters} progress="26–30" note="`ふ` ကို hu မဟုတ်ဘဲ fu လို့ဖတ်ပြီး は နဲ့ ほ ပုံစံမရောအောင် သတိထားပါ" previous={{href:"/learn/n5/hiragana/n-row",label:"な行 ပြန်သွားမယ်"}} next={{href:"/learn/n5/hiragana/m-row",label:"ま・み・む・め・も ဆက်သင်မယ်"}}/>;}
