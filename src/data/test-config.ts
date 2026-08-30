import type { JLPTLevel } from "@/types/jlpt";

export type TestSectionConfig = {
  name: string;
  japaneseName: string;
  durationMinutes: number;
  accent: string;
};

export type TestConfig = {
  level: JLPTLevel;
  title: string;
  description: string;
  totalMinutes: number;
  estimatedQuestions: number;
  sections: TestSectionConfig[];
};

export const testConfigs: Record<JLPTLevel, TestConfig> = {
  N5: {
    level: "N5",
    title: "အစပြုအဆင့် Mock Test",
    description: "အခြေခံဂျပန်စာကို နားလည်အသုံးပြုနိုင်မှု စမ်းသပ်ချက်",
    totalMinutes: 90,
    estimatedQuestions: 24,
    sections: [
      { name: "ဝေါဟာရ", japaneseName: "文字・語彙", durationMinutes: 20, accent: "bg-emerald-500" },
      { name: "သဒ္ဒါနှင့် ဖတ်ရှုခြင်း", japaneseName: "文法・読解", durationMinutes: 40, accent: "bg-amber-500" },
      { name: "နားထောင်ခြင်း", japaneseName: "聴解", durationMinutes: 30, accent: "bg-cyan-500" },
    ],
  },
  N4: {
    level: "N4",
    title: "အခြေခံအဆင့် Mock Test",
    description: "နေ့စဉ်သုံးဂျပန်စာကို နားလည်နိုင်မှု စမ်းသပ်ချက်",
    totalMinutes: 115,
    estimatedQuestions: 50,
    sections: [
      { name: "ဝေါဟာရ", japaneseName: "文字・語彙", durationMinutes: 25, accent: "bg-emerald-500" },
      { name: "သဒ္ဒါနှင့် ဖတ်ရှုခြင်း", japaneseName: "文法・読解", durationMinutes: 55, accent: "bg-amber-500" },
      { name: "နားထောင်ခြင်း", japaneseName: "聴解", durationMinutes: 35, accent: "bg-cyan-500" },
    ],
  },
  N3: {
    level: "N3",
    title: "အလယ်အလတ်အဆင့် Mock Test",
    description: "နေ့စဉ်အခြေအနေမျိုးစုံမှာ ဂျပန်စာကို နားလည်နိုင်မှု စမ်းသပ်ချက်",
    totalMinutes: 140,
    estimatedQuestions: 24,
    sections: [
      { name: "ဝေါဟာရ", japaneseName: "文字・語彙", durationMinutes: 30, accent: "bg-emerald-500" },
      { name: "သဒ္ဒါနှင့် ဖတ်ရှုခြင်း", japaneseName: "文法・読解", durationMinutes: 70, accent: "bg-amber-500" },
      { name: "နားထောင်ခြင်း", japaneseName: "聴解", durationMinutes: 40, accent: "bg-cyan-500" },
    ],
  },
  N2: {
    level: "N2",
    title: "အဆင့်မြင့် Mock Test",
    description: "နေ့စဉ်နဲ့ အထွေထွေအခြေအနေများမှ ဂျပန်စာနားလည်မှု စမ်းသပ်ချက်",
    totalMinutes: 155,
    estimatedQuestions: 70,
    sections: [
      { name: "ဘာသာစကားနှင့် ဖတ်ရှုခြင်း", japaneseName: "言語知識・読解", durationMinutes: 105, accent: "bg-amber-500" },
      { name: "နားထောင်ခြင်း", japaneseName: "聴解", durationMinutes: 50, accent: "bg-cyan-500" },
    ],
  },
  N1: {
    level: "N1",
    title: "ကျွမ်းကျင်အဆင့် Mock Test",
    description: "ရှုပ်ထွေးနက်ရှိုင်းသော ဂျပန်ဘာသာစွမ်းရည် စမ်းသပ်ချက်",
    totalMinutes: 165,
    estimatedQuestions: 75,
    sections: [
      { name: "ဘာသာစကားနှင့် ဖတ်ရှုခြင်း", japaneseName: "言語知識・読解", durationMinutes: 110, accent: "bg-amber-500" },
      { name: "နားထောင်ခြင်း", japaneseName: "聴解", durationMinutes: 55, accent: "bg-cyan-500" },
    ],
  },
};
