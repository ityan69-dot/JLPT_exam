import type { JLPTQuestion } from "@/types/jlpt";
import mockN5Questions from "@/data/mock-n5-questions.json";
import { n5FullMockQuestions } from "@/data/n5-full-mock-questions";

export type N5ListeningLesson = {
  slug: string;
  no: string;
  jp: string;
  title: string;
  description: string;
  strategy: string[];
  questions: JLPTQuestion[];
};

const starter = (mockN5Questions as unknown as JLPTQuestion[]).filter((question) => question.category === "Listening");
const full = n5FullMockQuestions.filter((question) => question.category === "Listening");
const byId = new Map([...starter, ...full].map((question) => [question.id, question]));
const pick = (...ids: string[]) => ids.map((id) => byId.get(id)).filter((question): question is JLPTQuestion => Boolean(question));

export function listeningAudioUrls(question: JLPTQuestion) {
  if (question.id.startsWith("n5-2026")) return [`/audio/n5/${question.id}.mp3`];
  if (question.listeningTurns?.length && /^n5-full-l-(00[7-9]|01[0-6])$/.test(question.id)) {
    return question.listeningTurns.map((_, index) => `/audio/n5/${question.id}.part-${String(index + 1).padStart(2, "0")}.mp3`);
  }
  return [`/audio/n5/${question.id}.mp3`];
}

export const n5ListeningLessons: N5ListeningLesson[] = [
  { slug: "sounds-numbers-time", no: "01", jp: "音と数字", title: "Sounds, Numbers & Time", description: "နံပါတ်၊ နာရီနဲ့ စျေးနှုန်းကို နောက်ဆုံးပြောတဲ့အချက်အထိ သေချာနားထောင်မယ်။", strategy: ["時・半・円 အသံကို အရင်မှတ်ပါ", "ပထမပြောတဲ့နံပါတ်ကို ချက်ချင်းမရွေးပါနဲ့", "နောက်ဆုံးသဘောတူတဲ့ အချိန်/စျေးကိုရွေးပါ"], questions: pick("n5-2026-listening-002", "n5-full-l-015") },
  { slug: "basic-questions", no: "02", jp: "短い質問", title: "Basic Questions", description: "Question word ကိုကြားတာနဲ့ ဘယ်အမျိုးအစားအဖြေလိုလဲ ခွဲတတ်အောင်လေ့ကျင့်မယ်။", strategy: ["だれ = လူ", "どこ = နေရာ", "いつ・何時 = အချိန်"], questions: pick("n5-full-l-023", "n5-full-l-025", "n5-full-l-026") },
  { slug: "quick-responses", no: "03", jp: "応答", title: "Quick Responses", description: "နေ့စဉ်စကားတိုကိုကြားပြီး grammar ထက် အခြေအနေကိုက်တဲ့ တုံ့ပြန်မှုကို ရွေးမယ်။", strategy: ["တောင်းဆိုမှုလား မေးခွန်းလား ခွဲပါ", "tense နဲ့ question word ကို ကိုက်စစ်ပါ", "သဘာဝမကျတဲ့ စကားကို ဖယ်ပါ"], questions: pick("n5-2026-listening-005", "n5-2026-listening-006", "n5-full-l-024") },
  { slug: "who-when-where", no: "04", jp: "ポイント理解", title: "Who, When & Where", description: "စကားဝိုင်းထဲက အချိန်၊ နေရာနဲ့ နေ့ရက် အဓိကအချက်ကို ဖမ်းယူမယ်။", strategy: ["မေးခွန်းကို audio မတိုင်ခင်ဖတ်ပါ", "မဆိုင်တဲ့ နံပါတ်/နေရာကို ကျော်ပါ", "အဆုံးမှာ ပြောင်းသွားသလား စစ်ပါ"], questions: pick("n5-full-l-014", "n5-full-l-016", "n5-2026-listening-002") },
  { slug: "instructions-order", no: "05", jp: "順番と指示", title: "Instructions & Order", description: "まず・そのあと・〜てから ကိုနားထောင်ပြီး အရင်နဲ့နောက် အစီအစဉ်ကိုခွဲမယ်။", strategy: ["まず = အရင်ဆုံး", "そのまえに = အဲဒါမတိုင်ခင်", "〜てから = လုပ်ပြီးမှ"], questions: pick("n5-2026-listening-001", "n5-full-l-009", "n5-full-l-010") },
  { slug: "task-based", no: "06", jp: "課題理解", title: "Task-based Listening", description: "ညွှန်ကြားချက်နားထောင်ပြီး စကားပြောသူ နောက်ဘာလုပ်ရမလဲကို ဆုံးဖြတ်မယ်။", strategy: ["ဘယ်သူလုပ်ရမလဲ အရင်သိပါ", "လုပ်စရာနှစ်ခုရှိရင် အစီအစဉ်ဖမ်းပါ", "နောက်ဆုံးအတည်ပြုစကားကို နားထောင်ပါ"], questions: pick("n5-full-l-007", "n5-full-l-008", "n5-full-l-011", "n5-full-l-012") },
  { slug: "situation-expression", no: "07", jp: "発話表現", title: "Situation & Expression", description: "အိမ်ဝင်ခြင်း၊ ထမင်းစားခြင်းနဲ့ လမ်းမေးခြင်းလို အခြေအနေမှာ သဘာဝကျတဲ့ စကားကိုရွေးမယ်။", strategy: ["ဘယ်နေရာမှာလဲ စဉ်းစားပါ", "ဘယ်သူ့ကိုပြောတာလဲ ခွဲပါ", "အချိန်မတိုင်ခင်/ပြီးနောက် expression ကိုစစ်ပါ"], questions: pick("n5-2026-listening-004", "n5-full-l-019", "n5-full-l-020", "n5-full-l-021", "n5-full-l-022") },
  { slug: "listening-check", no: "08", jp: "聴解チェック", title: "Listening Check", description: "N5 listening item type အားလုံးကို ရောစပ်ပြီး နောက်ဆုံးစစ်ဆေးမယ်။", strategy: ["Audio မဖွင့်ခင် မေးခွန်းကိုဖတ်ပါ", "တစ်ခါတည်း အကုန်ဘာသာမပြန်ပါနဲ့", "Keyword နဲ့ နောက်ဆုံးဆုံးဖြတ်ချက်ကိုရွေးပါ"], questions: pick("n5-2026-listening-003", "n5-full-l-013", "n5-full-l-024", "n5-full-l-008", "n5-full-l-016") },
];

export function getN5ListeningLesson(slug: string) {
  return n5ListeningLessons.find((lesson) => lesson.slug === slug);
}
