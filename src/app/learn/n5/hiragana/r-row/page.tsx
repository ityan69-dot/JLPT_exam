import type { Metadata } from "next";
import { HiraganaRowLesson } from "@/components/learning/hiragana-row-lesson";
export const metadata: Metadata = { title: "Hiragana R-row" };
const characters = [
  {kana:"ら",romaji:"ra",strokes:2,hint:"အပေါ်အမှတ်တိုကိုအရင်ရေးပြီး အောက်ဆွဲချက်ကို ညာဘက်သို့ကွေးရေးပါ။"},
  {kana:"り",romaji:"ri",strokes:2,hint:"ဘယ်ဘက်ဆွဲချက်တိုပြီးမှ ညာဘက်ရှည်တဲ့ဆွဲချက်ကို အောက်သို့ရေးပါ။"},
  {kana:"る",romaji:"ru",strokes:1,hint:"အပေါ်ကနေကွေးဆင်းပြီး အောက်ညာဘက်မှာ သေးသေးလေးဝိုင်းကာ အဆုံးသတ်ပါ။"},
  {kana:"れ",romaji:"re",strokes:2,hint:"ဘယ်ဘက်ဒေါင်လိုက်ပြီးမှ ညာဘက်သို့လှိုင်းပုံစံ ဆက်ရေးပါ။"},
  {kana:"ろ",romaji:"ro",strokes:1,hint:"အပေါ်ကနေကွေးဆင်းပြီး အောက်မှာဝိုင်းမပိတ်ဘဲ ညာဘက်သို့ဆက်ရေးပါ။"},
];
export default function Page(){return <HiraganaRowLesson row="ら行" characters={characters} progress="39–43" note="ဂျပန် r အသံက မြန်မာ ရ/လ ကြားအသံနီးပါးဖြစ်ပြီး る နဲ့ ろ ပုံစံကို ခွဲမှတ်ပါ" previous={{href:"/learn/n5/hiragana/y-row",label:"や行 ပြန်သွားမယ်"}} next={{href:"/learn/n5/hiragana/w-row",label:"わ・を・ん ဆက်သင်မယ်"}}/>;}
