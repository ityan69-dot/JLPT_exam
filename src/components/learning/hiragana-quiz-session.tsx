"use client";

import { useRef, useState } from "react";
import { useAutoCompleteLesson } from "@/components/learning/use-auto-complete-lesson";

type Mode = "listening" | "sound-type";
type Question = { prompt: string; audio: string; options: string[]; answer: string };

const listeningQuestions: Question[] = [
  {prompt:"အသံကိုနားထောင်ပြီး စာလုံးရွေးပါ",audio:"/audio/n5/hiragana/a.mp3",options:["あ","お","う","え"],answer:"あ"},
  {prompt:"အသံကိုနားထောင်ပြီး စာလုံးရွေးပါ",audio:"/audio/n5/hiragana/shi.mp3",options:["さ","し","ち","す"],answer:"し"},
  {prompt:"အသံကိုနားထောင်ပြီး စာလုံးရွေးပါ",audio:"/audio/n5/hiragana/tsu.mp3",options:["つ","て","す","ち"],answer:"つ"},
  {prompt:"အသံကိုနားထောင်ပြီး စာလုံးရွေးပါ",audio:"/audio/n5/hiragana/fu.mp3",options:["ふ","ほ","へ","ひ"],answer:"ふ"},
  {prompt:"အသံကိုနားထောင်ပြီး စာလုံးရွေးပါ",audio:"/audio/n5/hiragana/nu.mp3",options:["ぬ","ね","の","め"],answer:"ぬ"},
  {prompt:"အသံကိုနားထောင်ပြီး စာလုံးရွေးပါ",audio:"/audio/n5/hiragana/variants/ji.mp3",options:["じ","ぢ","し","ち"],answer:"じ"},
  {prompt:"အသံကိုနားထောင်ပြီး စာလုံးရွေးပါ",audio:"/audio/n5/hiragana/variants/pa.mp3",options:["ぱ","ば","は","ま"],answer:"ぱ"},
  {prompt:"အသံကိုနားထောင်ပြီး စာလုံးရွေးပါ",audio:"/audio/n5/hiragana/variants/kyo.mp3",options:["きょ","きゅ","ぎょ","しょ"],answer:"きょ"},
  {prompt:"အသံကိုနားထောင်ပြီး စာလုံးရွေးပါ",audio:"/audio/n5/hiragana/variants/cha.mp3",options:["ちゃ","しゃ","ちゅ","じゃ"],answer:"ちゃ"},
  {prompt:"အသံကိုနားထောင်ပြီး စာလုံးရွေးပါ",audio:"/audio/n5/hiragana/variants/ryu.mp3",options:["りゅ","りょ","みゅ","にゅ"],answer:"りゅ"},
];

const soundTypeQuestions: Question[] = [
  {prompt:"ဒီအသံက ဘယ်အမျိုးအစားလဲ?",audio:"/audio/n5/hiragana/variants/ga.mp3",options:["အသံပြောင်း (゛/゜)","ပေါင်းသံ (ゃ/ゅ/ょ)"],answer:"အသံပြောင်း (゛/゜)"},
  {prompt:"ဒီအသံက ဘယ်အမျိုးအစားလဲ?",audio:"/audio/n5/hiragana/variants/kya.mp3",options:["အသံပြောင်း (゛/゜)","ပေါင်းသံ (ゃ/ゅ/ょ)"],answer:"ပေါင်းသံ (ゃ/ゅ/ょ)"},
  {prompt:"ဒီအသံက ဘယ်အမျိုးအစားလဲ?",audio:"/audio/n5/hiragana/variants/po.mp3",options:["အသံပြောင်း (゛/゜)","ပေါင်းသံ (ゃ/ゅ/ょ)"],answer:"အသံပြောင်း (゛/゜)"},
  {prompt:"ဒီအသံက ဘယ်အမျိုးအစားလဲ?",audio:"/audio/n5/hiragana/variants/shu.mp3",options:["အသံပြောင်း (゛/゜)","ပေါင်းသံ (ゃ/ゅ/ょ)"],answer:"ပေါင်းသံ (ゃ/ゅ/ょ)"},
  {prompt:"ဒီအသံက ဘယ်အမျိုးအစားလဲ?",audio:"/audio/n5/hiragana/variants/zo.mp3",options:["အသံပြောင်း (゛/゜)","ပေါင်းသံ (ゃ/ゅ/ょ)"],answer:"အသံပြောင်း (゛/゜)"},
  {prompt:"ဒီအသံက ဘယ်အမျိုးအစားလဲ?",audio:"/audio/n5/hiragana/variants/cho.mp3",options:["အသံပြောင်း (゛/゜)","ပေါင်းသံ (ゃ/ゅ/ょ)"],answer:"ပေါင်းသံ (ゃ/ゅ/ょ)"},
  {prompt:"ဒီအသံက ဘယ်အမျိုးအစားလဲ?",audio:"/audio/n5/hiragana/variants/bi.mp3",options:["အသံပြောင်း (゛/゜)","ပေါင်းသံ (ゃ/ゅ/ょ)"],answer:"အသံပြောင်း (゛/゜)"},
  {prompt:"ဒီအသံက ဘယ်အမျိုးအစားလဲ?",audio:"/audio/n5/hiragana/variants/nyo.mp3",options:["အသံပြောင်း (゛/゜)","ပေါင်းသံ (ゃ/ゅ/ょ)"],answer:"ပေါင်းသံ (ゃ/ゅ/ょ)"},
  {prompt:"ဒီအသံက ဘယ်အမျိုးအစားလဲ?",audio:"/audio/n5/hiragana/variants/de.mp3",options:["အသံပြောင်း (゛/゜)","ပေါင်းသံ (ゃ/ゅ/ょ)"],answer:"အသံပြောင်း (゛/゜)"},
  {prompt:"ဒီအသံက ဘယ်အမျိုးအစားလဲ?",audio:"/audio/n5/hiragana/variants/pya.mp3",options:["အသံပြောင်း (゛/゜)","ပေါင်းသံ (ゃ/ゅ/ょ)"],answer:"ပေါင်းသံ (ゃ/ゅ/ょ)"},
];

const katakanaListeningQuestions: Question[] = [
  {prompt:"အသံကိုနားထောင်ပြီး စာလုံးရွေးပါ",audio:"/audio/n5/katakana/a.mp3",options:["ア","オ","ウ","エ"],answer:"ア"},
  {prompt:"အသံကိုနားထောင်ပြီး စာလုံးရွေးပါ",audio:"/audio/n5/katakana/shi.mp3",options:["サ","シ","チ","ス"],answer:"シ"},
  {prompt:"အသံကိုနားထောင်ပြီး စာလုံးရွေးပါ",audio:"/audio/n5/katakana/tsu.mp3",options:["ツ","テ","ス","チ"],answer:"ツ"},
  {prompt:"အသံကိုနားထောင်ပြီး စာလုံးရွေးပါ",audio:"/audio/n5/katakana/fu.mp3",options:["フ","ホ","ヘ","ヒ"],answer:"フ"},
  {prompt:"အသံကိုနားထောင်ပြီး စာလုံးရွေးပါ",audio:"/audio/n5/katakana/nu.mp3",options:["ヌ","ネ","ノ","メ"],answer:"ヌ"},
  {prompt:"အသံကိုနားထောင်ပြီး စာလုံးရွေးပါ",audio:"/audio/n5/katakana/variants/ji.mp3",options:["ジ","ヂ","シ","チ"],answer:"ジ"},
  {prompt:"အသံကိုနားထောင်ပြီး စာလုံးရွေးပါ",audio:"/audio/n5/katakana/variants/pa.mp3",options:["パ","バ","ハ","マ"],answer:"パ"},
  {prompt:"အသံကိုနားထောင်ပြီး စာလုံးရွေးပါ",audio:"/audio/n5/katakana/variants/kyo.mp3",options:["キョ","キュ","ギョ","ショ"],answer:"キョ"},
  {prompt:"အသံကိုနားထောင်ပြီး စာလုံးရွေးပါ",audio:"/audio/n5/katakana/variants/cha.mp3",options:["チャ","シャ","チュ","ジャ"],answer:"チャ"},
  {prompt:"အသံကိုနားထောင်ပြီး စာလုံးရွေးပါ",audio:"/audio/n5/katakana/variants/ryu.mp3",options:["リュ","リョ","ミュ","ニュ"],answer:"リュ"},
];
const katakanaSoundTypeQuestions=soundTypeQuestions.map((question)=>({...question,audio:question.audio.replace("/hiragana/","/katakana/")}));

export function HiraganaQuizSession({script="hiragana"}:{script?:"hiragana"|"katakana"}) {
  const [mode,setMode]=useState<Mode|null>(null); const [index,setIndex]=useState(0); const [selected,setSelected]=useState<string|null>(null); const [score,setScore]=useState(0); const [finished,setFinished]=useState(false); const audioRef=useRef<HTMLAudioElement>(null);
  useAutoCompleteLesson(finished);
  const questions=mode === "sound-type" ? (script==="katakana"?katakanaSoundTypeQuestions:soundTypeQuestions) : (script==="katakana"?katakanaListeningQuestions:listeningQuestions); const question=questions[index]; const scriptLabel=script==="katakana"?"Katakana":"Hiragana";
  function choose(option:string){if(selected)return;setSelected(option);if(option===question.answer)setScore((value)=>value+1);}
  function next(){if(index===questions.length-1){setFinished(true);return;}setIndex((value)=>value+1);setSelected(null);}
  function restart(){setIndex(0);setSelected(null);setScore(0);setFinished(false);}
  if(!mode)return <div><div className="grid gap-5 md:grid-cols-2"><button type="button" onClick={()=>setMode("listening")} className="rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] p-7 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#c83f35]"><span className="flex size-12 items-center justify-center rounded-full bg-[#315f63] text-xl text-white">♪</span><h2 className="mt-5 text-xl font-black">အသံနားထောင်ပြီး {scriptLabel} ရွေးမယ်</h2><p className="mt-2 text-sm leading-7 text-[#746c60]">အသံပဲကြားရမယ်။ ရွေးချယ်စရာစာလုံးလေးခုထဲက မှန်တာကိုရွေးပါ။</p><p className="mt-5 text-xs font-black text-[#a33a32]">10 Questions →</p></button><button type="button" onClick={()=>setMode("sound-type")} className="rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] p-7 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#c83f35]"><span className="flex size-12 items-center justify-center rounded-full bg-[#a33a32] text-lg font-black text-white">゛</span><h2 className="mt-5 text-xl font-black">အသံပြောင်းနဲ့ ပေါင်းသံ ခွဲခြားမယ်</h2><p className="mt-2 text-sm leading-7 text-[#746c60]">ကြားရတဲ့အသံက ゛/゜ အသံပြောင်းလား၊ ゃ/ゅ/ょ ပေါင်းသံလား ရွေးပါ။</p><p className="mt-5 text-xs font-black text-[#a33a32]">10 Questions →</p></button></div></div>;
  if(finished)return <div className="mx-auto max-w-xl rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] p-8 text-center shadow-sm"><p className="text-xs font-black tracking-[.2em] text-[#a33a32] uppercase">Quiz Complete</p><p className="mt-5 text-6xl font-black text-[#172033]">{score}<span className="text-2xl text-[#8a8276]"> / 10</span></p><p className="mt-4 text-sm text-[#746c60]">{score>=8?"ကောင်းပါတယ်။ ဒီအသံတွေကို သေချာခွဲခြားနိုင်ပါပြီ။":"မှားခဲ့တဲ့အသံတွေကို lesson မှာ ပြန်နားထောင်ပြီး ထပ်ဖြေကြည့်ပါ။"}</p><div className="mt-7 flex flex-wrap justify-center gap-3"><button type="button" onClick={restart} className="rounded-xl bg-[#c83f35] px-5 py-3 text-sm font-black text-white">ထပ်ဖြေမယ်</button><button type="button" onClick={()=>{setMode(null);restart();}} className="rounded-xl border border-[#cfc6b7] px-5 py-3 text-sm font-bold">Quiz Mode ပြန်ရွေးမယ်</button></div></div>;
  return <div className="mx-auto max-w-2xl"><div className="mb-4 flex items-center justify-between text-xs font-black text-[#746c60]"><span>Question {index+1} / 10</span><span>Score {score}</span></div><div className="h-2 overflow-hidden rounded-full bg-[#e8e2d7]"><div className="h-full bg-[#c83f35] transition-all" style={{width:`${((index+1)/10)*100}%`}}/></div><section className="mt-5 rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] p-6 shadow-sm sm:p-9"><p className="text-center text-lg font-black">{question.prompt}</p><audio ref={audioRef} src={question.audio} preload="metadata"/><button type="button" onClick={()=>{if(audioRef.current){audioRef.current.currentTime=0;void audioRef.current.play();}}} className="mx-auto mt-7 flex size-20 items-center justify-center rounded-full bg-[#315f63] text-3xl text-white shadow-lg shadow-[#315f63]/20" aria-label="အသံနားထောင်မယ်">♪</button><p className="mt-3 text-center text-xs text-[#8a8276]">အသံပြန်နားထောင်ရန် နှိပ်ပါ</p><div className={`mt-8 grid gap-3 ${question.options.length>2?"grid-cols-2":"sm:grid-cols-2"}`}>{question.options.map((option)=>{const correct=selected&&option===question.answer;const wrong=selected===option&&option!==question.answer;return <button key={option} type="button" disabled={Boolean(selected)} onClick={()=>choose(option)} className={`min-h-16 rounded-xl border px-4 py-3 font-black transition ${correct?"border-[#3f7655] bg-[#e5f3e9] text-[#28503a]":wrong?"border-[#c83f35] bg-[#fff0ed] text-[#a42f28]":"border-[#d8d0c3] bg-white text-[#172033] hover:border-[#a33a32]"} ${mode==="listening"?"text-3xl":"text-sm"}`}>{option}</button>;})}</div>{selected&&<div className="mt-6 flex items-center justify-between gap-4"><p className={`text-sm font-black ${selected===question.answer?"text-[#315f63]":"text-[#a33a32]"}`}>{selected===question.answer?"✓ မှန်ပါတယ်":"✕ အဖြေမှန်ကို အစိမ်းရောင်နဲ့ ပြထားပါတယ်"}</p><button type="button" onClick={next} className="rounded-xl bg-[#c83f35] px-5 py-3 text-sm font-black text-white">{index===9?"Score ကြည့်မယ်":"Next →"}</button></div>}</section></div>;
}
