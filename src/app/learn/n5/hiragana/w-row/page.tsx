import type { Metadata } from "next";
import { HiraganaRowLesson } from "@/components/learning/hiragana-row-lesson";
export const metadata: Metadata = { title: "Hiragana W-row and N" };
const characters = [
  {kana:"わ",romaji:"wa",strokes:2,hint:"ဘယ်ဘက်ဒေါင်လိုက်ပြီးမှ ညာဘက်သို့ကွေးကာ အောက်ဘက်ကိုဝိုင်းရေးပါ။"},
  {kana:"を",romaji:"wo",strokes:3,hint:"အပေါ်အလျားလိုက်၊ အလယ်ကွေးဆွဲချက်နဲ့ အောက်ဖြတ်ဆွဲချက်ကို ရေးပါ။ Particle အဖြစ် အများအားဖြင့် o လို့အသံထွက်ပါတယ်။"},
  {kana:"ん",romaji:"n",strokes:1,hint:"ဘယ်အပေါ်ကနေ အောက်သို့ကွေးဆင်းပြီး ညာဘက်အပေါ်သို့ ပျော့ပျော့တက်ရေးပါ။"},
];
export default function Page(){return <HiraganaRowLesson row="わ行・ん" characters={characters} progress="44–46" note="အခြေခံ ၄၆ လုံးရဲ့ နောက်ဆုံးသုံးလုံးပါ—နောက် lesson မှာ အသံပြောင်းပုံတွေ ဆက်နားထောင်မယ်" previous={{href:"/learn/n5/hiragana/r-row",label:"ら行 ပြန်သွားမယ်"}} next={{href:"/learn/n5/hiragana/voiced-sounds",label:"Next Lesson"}}/>;}
