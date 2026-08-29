export type KatakanaCharacter={kana:string;romaji:string;strokes:number;hint:string};
export type KatakanaRow={slug:string;label:string;progress:string;note:string;characters:KatakanaCharacter[]};
const hint="အသံကိုနားထောင်ပြီး animation ပြထားတဲ့ ဆွဲချက်အစဉ်အတိုင်း လိုက်ရေးပါ။";
const make=(slug:string,label:string,progress:string,note:string,values:[string,string,number][]):KatakanaRow=>({slug,label,progress,note,characters:values.map(([kana,romaji,strokes])=>({kana,romaji,strokes,hint}))});
export const katakanaRows:KatakanaRow[]=[
 make("a-row","ア行","1–5","အခြေခံ သရအသံငါးလုံးကနေ စတင်လေ့ကျင့်ပါ။",[["ア","a",2],["イ","i",2],["ウ","u",3],["エ","e",3],["オ","o",3]]),
 make("k-row","カ行","6–10","K အသံအုပ်စုကို စာလုံးပုံစံနဲ့တွဲမှတ်ပါ။",[["カ","ka",2],["キ","ki",3],["ク","ku",2],["ケ","ke",3],["コ","ko",2]]),
 make("s-row","サ行","11–15","シ ကို shi လို့အသံထွက်တာ သတိထားပါ။",[["サ","sa",3],["シ","shi",3],["ス","su",2],["セ","se",2],["ソ","so",2]]),
 make("t-row","タ行","16–20","チ = chi နဲ့ ツ = tsu ကို အထူးသတိထားပါ။",[["タ","ta",3],["チ","chi",3],["ツ","tsu",3],["テ","te",3],["ト","to",2]]),
 make("n-row","ナ行","21–25","ナ行 အသံငါးလုံးရဲ့ ထောင့်ချိုးပုံစံတွေကို ခွဲမှတ်ပါ။",[["ナ","na",2],["ニ","ni",2],["ヌ","nu",2],["ネ","ne",4],["ノ","no",1]]),
 make("h-row","ハ行","26–30","フ ကို fu လို့ဖတ်ပြီး အခြားစာလုံးတွေနဲ့ ပုံစံခွဲပါ။",[["ハ","ha",2],["ヒ","hi",2],["フ","fu",1],["ヘ","he",1],["ホ","ho",4]]),
 make("m-row","マ行","31–35","နိုင်ငံခြားစကားလုံးတွေမှာ မကြာခဏတွေ့ရတဲ့ M အသံအုပ်စုပါ။",[["マ","ma",2],["ミ","mi",3],["ム","mu",2],["メ","me",2],["モ","mo",3]]),
 make("y-row","ヤ行","36–38","ယနေ့အသုံးပြုတဲ့ ヤ・ユ・ヨ သုံးလုံးကို လေ့ကျင့်ပါ။",[["ヤ","ya",2],["ユ","yu",2],["ヨ","yo",3]]),
 make("r-row","ラ行","39–43","ဂျပန် R အသံအုပ်စုကို စာလုံးပုံစံနဲ့တွဲမှတ်ပါ။",[["ラ","ra",2],["リ","ri",2],["ル","ru",2],["レ","re",1],["ロ","ro",3]]),
 make("w-row","ワ行・ン","44–46","အခြေခံ Katakana ၄၆ လုံးရဲ့ နောက်ဆုံးသုံးလုံးပါ။",[["ワ","wa",2],["ヲ","wo",3],["ン","n",2]]),
];
export function getKatakanaRow(slug:string){return katakanaRows.find((row)=>row.slug===slug);}
