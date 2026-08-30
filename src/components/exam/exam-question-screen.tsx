"use client";

import { Fragment, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { DiagnosticSummary } from "@/components/exam/diagnostic-summary";
import { TimingAnalysis } from "@/components/exam/timing-analysis";
import { CrossTestTrend } from "@/components/exam/cross-test-trend";
import { ListeningAudioPlayer } from "@/components/exam/listening-audio-player";
import { scoreTest } from "@/services/scoring-service";
import { getTestHistory, saveTestHistoryResult } from "@/services/test-history-service";
import { analyzeWeaknesses } from "@/services/weakness-analysis-service";
import type { JLPTCategory, JLPTLevel, JLPTQuestion, TestResult } from "@/types/jlpt";
import type { MockTestHistoryEntry } from "@/types/history";

type ExamQuestionScreenProps = {
  questions: JLPTQuestion[];
  level: JLPTLevel;
  developerMode?: boolean;
};

type ExamSection = {
  key: string;
  label: string;
  shortLabel: string;
  minutes: number;
  categories: JLPTCategory[];
};

const examSectionsByLevel:Record<"N5"|"N3",ExamSection[]>={
  N5:[
    {key:"vocabulary",label:"文字・語彙 · Vocabulary",shortLabel:"文字・語彙",minutes:20,categories:["Vocab"]},
    {key:"grammar-reading",label:"文法・読解 · Grammar / Reading",shortLabel:"文法・読解",minutes:40,categories:["Grammar","Reading"]},
    {key:"listening",label:"聴解 · Listening",shortLabel:"聴解",minutes:30,categories:["Listening"]},
  ],
  N3:[
    {key:"vocabulary",label:"文字・語彙 · Vocabulary",shortLabel:"文字・語彙",minutes:30,categories:["Vocab"]},
    {key:"grammar-reading",label:"文法・読解 · Grammar / Reading",shortLabel:"文法・読解",minutes:70,categories:["Grammar","Reading"]},
    {key:"listening",label:"聴解 · Listening",shortLabel:"聴解",minutes:40,categories:["Listening"]},
  ],
};

const categoryLabels = {
  Vocab: "ဝေါဟာရ",
  Grammar: "သဒ္ဒါ",
  Reading: "ဖတ်ရှုခြင်း",
  Listening: "နားထောင်ခြင်း",
};

type PersistedExamState = {
  version: 2;
  sectionIndex: number;
  expiresAt: number;
  currentIndex: number;
  answers: Record<string, string>;
  flaggedQuestions: string[];
  questionTimes?: Record<string, number>;
};

const categoryOrder: JLPTCategory[] = [
  "Vocab",
  "Grammar",
  "Reading",
  "Listening",
];

const n5Furigana: Record<string, string> = {
  日本語: "にほんご", 毎朝: "まいあさ", 毎日: "まいにち", 学校: "がっこう",
  会社: "かいしゃ", 日曜日: "にちようび", 月曜日: "げつようび", 金曜日: "きんようび",
  土曜日: "どようび", 七時半: "しちじはん", 六時半: "ろくじはん", 七時: "しちじ",
  九時: "くじ", 十二時: "じゅうにじ", 三十分: "さんじゅっぷん", 何時: "なんじ",
  田中: "たなか", 山田: "やまだ", 日本: "にほん", 先月: "せんげつ", 平日: "へいじつ",
  午前: "ごぜん", 午後: "ごご", 本: "ほん", 雨: "あめ", 水: "みず", 金: "かね",
};

const furiganaPattern = new RegExp(
  `(${Object.keys(n5Furigana).sort((a, b) => b.length - a.length).join("|")})`,
  "g",
);

function renderFurigana(text: string, keyPrefix: string): ReactNode[] {
  return text.split(furiganaPattern).filter(Boolean).map((part, index) => {
    const reading = n5Furigana[part];
    return reading ? (
      <ruby key={`${keyPrefix}-ruby-${index}`} className="ruby-jlpt">
        {part}<rt>{reading}</rt>
      </ruby>
    ) : <Fragment key={`${keyPrefix}-text-${index}`}>{part}</Fragment>;
  });
}

function renderJapaneseText(text: string): ReactNode[] {
  return text.split(/【([^】]+)】/g).map((part, index) =>
    !part ? null : index % 2 === 1 ? (
      <span key={`underline-${index}`} className="border-b-2 border-slate-950 pb-0.5">{part}</span>
    ) : (
      <Fragment key={`plain-${index}`}>{renderFurigana(part, `part-${index}`)}</Fragment>
    ),
  );
}

function getProblemNumber(question: JLPTQuestion) {
  const itemType = question.itemType ?? "";
  if (question.category === "Vocab") {
    if (itemType.includes("漢字読み")) return 1;
    if (itemType.includes("表記")) return 2;
    if (itemType.includes("文脈規定")) return 3;
    return 4;
  }
  if (question.category === "Grammar") {
    if (itemType.includes("文の文法1")) return 1;
    if (itemType.includes("組み立て")) return 2;
    return 3;
  }
  if (question.category === "Reading") {
    if (itemType.includes("短文")) return 4;
    if (itemType.includes("中文")) return 5;
    return 6;
  }
  if (itemType.includes("課題理解")) return 1;
  if (itemType.includes("ポイント理解")) return 2;
  if (itemType.includes("発話表現")) return 3;
  return 4;
}

function ListeningIllustration({ type }: { type: NonNullable<JLPTQuestion["illustration"]> }) {
  if (type !== "entering-friends-home") {
    const scene = {
      "asking-direction": { title: "道を聞く", symbol: "駅?", caption: "လမ်းမသိလို့ လူတစ်ယောက်ကို မေးနေသည်" },
      "before-meal": { title: "食事の前", symbol: "ご飯", caption: "အစားမစားခင် စားပွဲရှေ့မှာ ထိုင်နေသည်" },
      "leaving-home": { title: "家を出る", symbol: "玄関", caption: "မနက်ခင်း အိမ်တံခါးက ထွက်မည်" },
      "receiving-gift": { title: "プレゼント", symbol: "贈物", caption: "သူငယ်ချင်းထံမှ လက်ဆောင်ရနေသည်" },
    }[type];
    return <figure className="mb-6 overflow-hidden rounded-xl border-2 border-[#bdb5a7] bg-[#f7f2e8]" aria-label={scene.caption}>
      <svg viewBox="0 0 720 340" role="img" aria-label={scene.title} className="h-auto w-full">
        <rect width="720" height="340" fill="#f7f2e8"/><path d="M0 285h720" stroke="#81796c" strokeWidth="5"/>
        <circle cx="205" cy="115" r="35" fill="#efc5a5" stroke="#34302a" strokeWidth="5"/><path d="M170 105c10-43 67-46 72 2-24-14-47-17-72-2z" fill="#27231e"/><path d="M172 158h67l17 110H154z" fill="#c83f35" stroke="#34302a" strokeWidth="5"/><path d="M160 185l-48 38M245 184l45 33M173 268l-14 40M233 268l14 40" stroke="#34302a" strokeWidth="10" strokeLinecap="round"/>
        <circle cx="505" cy="115" r="35" fill="#efc5a5" stroke="#34302a" strokeWidth="5"/><path d="M472 106c8-44 67-46 72 4-23-14-49-18-72-4z" fill="#27231e"/><path d="M473 158h65l18 110H455z" fill="#315f63" stroke="#34302a" strokeWidth="5"/><path d="M461 184l-44 35M545 184l47 35M473 268l-12 40M532 268l14 40" stroke="#34302a" strokeWidth="10" strokeLinecap="round"/>
        <rect x="300" y="70" width="120" height="110" rx="18" fill="#fffdf8" stroke="#b3312b" strokeWidth="5"/><text x="360" y="140" textAnchor="middle" fontSize="30" fontWeight="700" fill="#27231e">{scene.symbol}</text><path d="M330 179l-18 32 42-25" fill="#fffdf8" stroke="#b3312b" strokeWidth="5"/>
      </svg>
      <figcaption className="border-t border-[#d8d1c3] bg-white px-4 py-2 text-center text-xs font-bold text-[#625b50]">{scene.caption} — အသံထဲက သင့်တော်သောစကားကို ရွေးပါ</figcaption>
    </figure>;
  }

  return (
    <figure className="mb-6 overflow-hidden rounded-xl border-2 border-[#bdb5a7] bg-[#f7f2e8]" aria-label="သူငယ်ချင်းအိမ်တံခါးဝမှာ ဧည့်သည်တစ်ယောက် ဝင်လာသည့်ပုံ">
      <svg viewBox="0 0 720 340" role="img" aria-labelledby="friend-home-title" className="h-auto w-full">
        <title id="friend-home-title">友だちの家に入る場面</title>
        <rect width="720" height="340" fill="#f7f2e8" />
        <path d="M420 45h220v260H420z" fill="#fffdf8" stroke="#34302a" strokeWidth="6" />
        <path d="M440 65h180v220H440z" fill="#dbe8e4" stroke="#81796c" strokeWidth="4" />
        <circle cx="594" cy="176" r="8" fill="#b3312b" />
        <path d="M0 286h720" stroke="#81796c" strokeWidth="5" />
        <path d="M88 286c16-72 19-104 18-148M106 159c-28-22-35-43-14-55M107 175c28-24 39-45 20-61" fill="none" stroke="#4f7b5e" strokeWidth="13" strokeLinecap="round" />
        <circle cx="250" cy="115" r="34" fill="#efc5a5" stroke="#34302a" strokeWidth="5" />
        <path d="M216 108c8-42 67-49 76-5-23-14-48-18-76 5z" fill="#27231e" />
        <path d="M218 157c20-15 48-15 66 0l17 100h-100z" fill="#c83f35" stroke="#34302a" strokeWidth="5" />
        <path d="M209 183l-48 40M288 183l45 35M222 257l-14 45M278 257l17 45" stroke="#34302a" strokeWidth="10" strokeLinecap="round" />
        <path d="M151 219h42v50h-42z" fill="#d7ad51" stroke="#34302a" strokeWidth="4" />
        <circle cx="490" cy="120" r="32" fill="#efc5a5" stroke="#34302a" strokeWidth="5" />
        <path d="M458 112c10-43 63-42 67 5-21-13-43-15-67-5z" fill="#27231e" />
        <path d="M461 159h60l16 98h-92z" fill="#315f63" stroke="#34302a" strokeWidth="5" />
        <path d="M455 180l-43 30M526 180l32 32M462 257l-8 45M514 257l11 45" stroke="#34302a" strokeWidth="10" strokeLinecap="round" />
        <path d="M365 90c20 4 36 17 46 35M368 120c16 3 27 11 36 23" fill="none" stroke="#b3312b" strokeWidth="5" strokeLinecap="round" />
      </svg>
      <figcaption className="border-t border-[#d8d1c3] bg-white px-4 py-2 text-center text-xs font-bold text-[#625b50]">ပုံကိုကြည့်ပြီး အသံထဲက သင့်တော်သောစကားကို ရွေးပါ</figcaption>
    </figure>
  );
}

function formatTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}

export function ExamQuestionScreen({
  questions,
  level,
  developerMode = false,
}: ExamQuestionScreenProps) {
  const examSections=examSectionsByLevel[level as "N5"|"N3"];
  const storageKey=`jlpt-mock:${level.toLowerCase()}:exam:v5`;
  const resultStorageKey=`jlpt-mock:${level.toLowerCase()}:last-result:v3`;
  const [sectionIndex, setSectionIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [questionTimes, setQuestionTimes] = useState<Record<string, number>>({});
  const lastTimingUpdate = useRef(0);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState(examSections[0].minutes * 60);
  const [isHydrated, setIsHydrated] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [testHistory, setTestHistory] = useState<MockTestHistoryEntry[]>([]);
  const question = questions[currentIndex];
  const isAudioOnlyChoice = question.category === "Listening" && Boolean(
    question.itemType?.includes("発話表現") || question.itemType?.includes("即時応答"),
  );
  const currentSection = examSections[sectionIndex];
  const sectionQuestionIndices = questions.reduce<number[]>((indices, item, index) => {
    if (currentSection.categories.includes(item.category)) indices.push(index);
    return indices;
  }, []);
  const currentSectionPosition = Math.max(0, sectionQuestionIndices.indexOf(currentIndex));
  const sectionAnsweredCount = sectionQuestionIndices.filter((index) => Boolean(answers[questions[index].id])).length;
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / questions.length) * 100);
  const isLastQuestion = currentSectionPosition === sectionQuestionIndices.length - 1;
  const isTimeUp = isHydrated && secondsRemaining === 0;
  const isLowTime = secondsRemaining > 0 && secondsRemaining <= 5 * 60;

  const moveToSection = useCallback((nextSectionIndex: number) => {
    const nextSection = examSections[nextSectionIndex];
    const nextQuestionIndex = questions.findIndex((item) => nextSection.categories.includes(item.category));
    const nextSeconds = nextSection.minutes * 60;

    setSectionIndex(nextSectionIndex);
    setCurrentIndex(Math.max(0, nextQuestionIndex));
    setExpiresAt(Date.now() + nextSeconds * 1000);
    setSecondsRemaining(nextSeconds);
    lastTimingUpdate.current = Date.now();
  }, [examSections, questions]);

  useEffect(() => {
    const hydrationId = window.setTimeout(() => {
      lastTimingUpdate.current = Date.now();
      const fallbackExpiry = Date.now() + examSections[0].minutes * 60 * 1000;

      try {
        if (developerMode) {
          window.localStorage.removeItem(resultStorageKey);
          window.localStorage.removeItem(storageKey);
        }
        const savedResult = developerMode ? null : window.localStorage.getItem(resultStorageKey);

        if (savedResult) {
          setResult(JSON.parse(savedResult) as TestResult);
          setTestHistory(getTestHistory().filter((item) => item.level === level));
          setIsHydrated(true);
          return;
        }

        const savedValue = developerMode ? null : window.localStorage.getItem(storageKey);

        if (savedValue) {
          const saved = JSON.parse(savedValue) as PersistedExamState;
          const safeSectionIndex = Math.min(Math.max(0, saved.sectionIndex ?? 0), examSections.length - 1);
          const savedSection = examSections[safeSectionIndex];
          const allowedIndices = questions.reduce<number[]>((indices, item, index) => {
            if (savedSection.categories.includes(item.category)) indices.push(index);
            return indices;
          }, []);
          const safeIndex = Math.min(
            Math.max(0, saved.currentIndex ?? 0),
            questions.length - 1,
          );

          setSectionIndex(safeSectionIndex);
          setCurrentIndex(allowedIndices.includes(safeIndex) ? safeIndex : (allowedIndices[0] ?? 0));
          setAnswers(saved.answers ?? {});
          setFlaggedQuestions(saved.flaggedQuestions ?? []);
          setQuestionTimes(saved.questionTimes ?? {});
          setExpiresAt(saved.expiresAt);
          setSecondsRemaining(
            Math.max(0, Math.ceil((saved.expiresAt - Date.now()) / 1000)),
          );
        } else {
          const initialState: PersistedExamState = {
            version: 2,
            sectionIndex: 0,
            expiresAt: fallbackExpiry,
            currentIndex: 0,
            answers: {},
            flaggedQuestions: [],
            questionTimes: {},
          };

          window.localStorage.setItem(storageKey, JSON.stringify(initialState));
          setExpiresAt(fallbackExpiry);
        }
      } catch {
        setExpiresAt(fallbackExpiry);
      } finally {
        setIsHydrated(true);
      }
    }, 0);

    return () => window.clearTimeout(hydrationId);
  }, [developerMode, examSections, level, questions, resultStorageKey, storageKey]);

  useEffect(() => {
    if (!isHydrated || expiresAt === null || result) {
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const elapsedSeconds = Math.floor((now - lastTimingUpdate.current) / 1000);
      if (elapsedSeconds > 0) {
        setQuestionTimes((current) => ({
          ...current,
          [question.id]: (current[question.id] ?? 0) + elapsedSeconds,
        }));
        lastTimingUpdate.current += elapsedSeconds * 1000;
      }
      setSecondsRemaining(
        Math.max(0, Math.ceil((expiresAt - now) / 1000)),
      );
    };

    const timerId = window.setInterval(updateTimer, 1000);

    return () => window.clearInterval(timerId);
  }, [expiresAt, isHydrated, question.id, result]);

  useEffect(() => {
    if (!isHydrated || expiresAt === null || result) {
      return;
    }

    const state: PersistedExamState = {
      version: 2,
      sectionIndex,
      expiresAt,
      currentIndex,
      answers,
      flaggedQuestions,
      questionTimes,
    };

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // The exam can continue in memory when browser storage is unavailable.
    }
  }, [answers, currentIndex, expiresAt, flaggedQuestions, isHydrated, questionTimes, result, sectionIndex, storageKey]);

  useEffect(() => {
    if (!isHydrated || secondsRemaining > 0 || result) {
      return;
    }

    const submissionId = window.setTimeout(() => {
      if (sectionIndex < examSections.length - 1) {
        moveToSection(sectionIndex + 1);
        return;
      }

      const nextResult = scoreTest(questions, answers, "guest", questionTimes);

      try {
        window.localStorage.setItem(
          resultStorageKey,
          JSON.stringify(nextResult),
        );
        window.localStorage.removeItem(storageKey);
      } catch {
        // The result remains available in memory when storage is unavailable.
      }

      const nextHistory = saveTestHistoryResult(nextResult, level, questions.length, answers);

      setTestHistory(nextHistory.filter((item) => item.level === level));
      setResult(nextResult);
    }, 0);

    return () => window.clearTimeout(submissionId);
  }, [answers, examSections.length, isHydrated, level, moveToSection, questionTimes, questions, result, resultStorageKey, secondsRemaining, sectionIndex, storageKey]);

  function toggleFlag(questionId: string) {
    if (isTimeUp) {
      return;
    }

    setFlaggedQuestions((current) =>
      current.includes(questionId)
        ? current.filter((id) => id !== questionId)
        : [...current, questionId],
    );
  }

  function restartExam() {
    const shouldRestart = window.confirm(
      "လက်ရှိအဖြေတွေနဲ့ ကျန်ချိန်ကိုဖျက်ပြီး စာမေးပွဲကို အစမှပြန်စမလား။",
    );

    if (!shouldRestart) {
      return;
    }

    const nextSeconds = examSections[0].minutes * 60;
    const nextExpiry = Date.now() + nextSeconds * 1000;
    try {
      window.localStorage.removeItem(resultStorageKey);
      window.localStorage.removeItem(storageKey);
    } catch {
      // Reset still works in memory when storage is unavailable.
    }

    setResult(null);
    setAnswers({});
    setFlaggedQuestions([]);
    setQuestionTimes({});
    lastTimingUpdate.current = Date.now();
    setSectionIndex(0);
    setCurrentIndex(0);
    setExpiresAt(nextExpiry);
    setSecondsRemaining(nextSeconds);
  }

  function finishCurrentSection() {
    if (sectionIndex === examSections.length - 1) {
      submitExam();
      return;
    }

    const unanswered = sectionQuestionIndices.length - sectionAnsweredCount;
    const warning = unanswered > 0
      ? `ဒီ Section မှာ မဖြေရသေးတဲ့ မေးခွန်း ${unanswered} ခုရှိပါတယ်။ အပြီးသတ်ပြီး နောက် Section သွားမလား။ ပြီးခဲ့တဲ့ Section ကို ပြန်ဝင်လို့မရတော့ပါဘူး။`
      : "ဒီ Section ကို အပြီးသတ်ပြီး နောက် Section သွားမလား။ ပြီးခဲ့တဲ့ Section ကို ပြန်ဝင်လို့မရတော့ပါဘူး။";

    if (window.confirm(warning)) moveToSection(sectionIndex + 1);
  }

  function submitExam() {
    const unansweredCount = questions.length - answeredCount;
    const message =
      unansweredCount > 0
        ? `မဖြေရသေးတဲ့ မေးခွန်း ${unansweredCount} ခုရှိပါတယ်။ ဒီအတိုင်း အဖြေတင်မလား။`
        : "အဖြေတွေကို အပြီးသတ်တင်မလား။ တင်ပြီးရင် ပြန်ပြင်လို့မရတော့ပါဘူး။";

    if (!window.confirm(message)) {
      return;
    }

    const nextResult = scoreTest(questions, answers, "guest", questionTimes);

    try {
      window.localStorage.setItem(resultStorageKey, JSON.stringify(nextResult));
      window.localStorage.removeItem(storageKey);
    } catch {
      // The result remains available in memory when storage is unavailable.
    }

    const nextHistory = saveTestHistoryResult(nextResult, level, questions.length, answers);

    setTestHistory(nextHistory.filter((item) => item.level === level));
    setResult(nextResult);
  }

  function runDeveloperPreset(preset: "perfect" | "grammar-weak" | "mixed") {
    const presetAnswers: Record<string, string> = {};
    const presetTimes: Record<string, number> = {};

    questions.forEach((item, index) => {
      const wrongOption = item.options.find((option) => option !== item.correctAnswer) ?? item.options[0];
      const shouldBeWrong = preset === "grammar-weak"
        ? item.category === "Grammar"
        : preset === "mixed" && index % 3 === 0;
      presetAnswers[item.id] = shouldBeWrong ? wrongOption : item.correctAnswer;
      presetTimes[item.id] = item.category === "Reading" ? 95 + index : 24 + index * 2;
    });

    const nextResult = scoreTest(questions, presetAnswers, "developer-test", presetTimes);
    try {
      window.localStorage.setItem(resultStorageKey, JSON.stringify(nextResult));
      window.localStorage.removeItem(storageKey);
    } catch {
      // Developer preview still works in memory when storage is unavailable.
    }
    const nextHistory = saveTestHistoryResult(nextResult, level, questions.length, presetAnswers);
    setAnswers(presetAnswers);
    setQuestionTimes(presetTimes);
    setTestHistory(nextHistory.filter((item) => item.level === level));
    setResult(nextResult);
  }

  if (result) {
    const correctCount = questions.length - result.wrongQuestions.length;
    const weaknessAnalysis = analyzeWeaknesses(questions, result);
    const languageKnowledge = {
      correct: (result.categoryScores.Vocab?.correct ?? 0) + (result.categoryScores.Grammar?.correct ?? 0),
      total: (result.categoryScores.Vocab?.total ?? 0) + (result.categoryScores.Grammar?.total ?? 0),
    };
    const estimatedN5Sections = level === "N5" ? {
      language: languageKnowledge.total ? Math.round(languageKnowledge.correct / languageKnowledge.total * 60) : 0,
      reading: Math.round((result.categoryScores.Reading?.percentage ?? 0) * 0.6),
      listening: Math.round((result.categoryScores.Listening?.percentage ?? 0) * 0.6),
    } : null;
    const estimatedN5Total = estimatedN5Sections
      ? estimatedN5Sections.language + estimatedN5Sections.reading + estimatedN5Sections.listening
      : null;
    const estimatedN5Pass = estimatedN5Sections && estimatedN5Total !== null
      ? estimatedN5Total >= 80 && Object.values(estimatedN5Sections).every((score) => score >= 19)
      : false;

    return (
      <div className="washi-surface min-h-screen bg-[#f7f5ef] py-10 text-[#172033] sm:py-16">
        <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#111827] text-white shadow-[0_24px_70px_rgba(17,24,39,0.22)]">
            <div className="absolute -right-20 -top-28 size-80 rounded-full border-[42px] border-[#c83f35]/80" aria-hidden="true" />
            <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:32px_32px]" aria-hidden="true" />
            <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-black tracking-[0.22em] text-[#f2d48f] uppercase">
                  成績表 · {level} Practice Test Result
                </p>
                <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                  စာမေးပွဲ ပြီးဆုံးပါပြီ
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                  အဖြေ {questions.length} ခုအနက် {correctCount} ခုမှန်ပါတယ်။
                  Category တစ်ခုချင်းစီရဲ့ raw score ကို အောက်မှာ ကြည့်နိုင်ပါတယ်။
                </p>
              </div>
              <div className="flex size-40 flex-col items-center justify-center rounded-full border-8 border-[#c83f35] bg-[#fffdf8] text-[#111827] shadow-xl shadow-black/20">
                <span className="text-[10px] font-bold tracking-[0.22em] text-[#9a342d] uppercase">総合得点</span>
                <span className="mt-1 text-5xl font-black">{estimatedN5Total ?? result.score}</span>
                <span className="mt-1 text-xs font-black tracking-widest text-[#746c60]">
                  / {level === "N5" ? 180 : 100}
                </span>
              </div>
            </div>
            <div className="relative grid grid-cols-3 gap-px bg-white/10 text-center">
              <div className="bg-[#111827]/95 p-5">
                <p className="text-2xl font-black text-[#84bd94]">{correctCount}</p>
                <p className="mt-1 text-xs text-white/50">正解 · မှန်</p>
              </div>
              <div className="bg-[#111827]/95 p-5">
                <p className="text-2xl font-black text-[#ff8278]">{result.wrongQuestions.length}</p>
                <p className="mt-1 text-xs text-white/50">不正解 · မှား / မဖြေ</p>
              </div>
              <div className="bg-[#111827]/95 p-5">
                <p className="text-2xl font-black text-white">{questions.length}</p>
                <p className="mt-1 text-xs text-white/50">合計 · စုစုပေါင်း</p>
              </div>
            </div>
          </div>

          {estimatedN5Sections && (
            <section className={`mt-6 rounded-[2rem] border p-6 shadow-sm sm:p-8 ${estimatedN5Pass ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black tracking-[0.18em] text-[#9a342d] uppercase">N5 · 180-point estimate</p>
                  <h2 className="mt-2 text-2xl font-black text-[#172033]">{estimatedN5Pass ? "အောင်နိုင်မယ့်ရလဒ်" : "ထပ်လေ့ကျင့်ဖို့လိုသေးတယ်"}</h2>
                </div>
                <span className={`rounded-full px-4 py-2 text-sm font-black ${estimatedN5Pass ? "bg-emerald-700 text-white" : "bg-amber-600 text-white"}`}>{estimatedN5Pass ? "PASS ခန့်မှန်း" : "NOT YET"}</span>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[["Vocabulary + Grammar",estimatedN5Sections.language],["Reading",estimatedN5Sections.reading],["Listening",estimatedN5Sections.listening]].map(([label,score])=><div key={String(label)} className="rounded-xl border border-black/10 bg-white/70 p-4"><p className="text-xs font-bold text-[#625b50]">{label}</p><p className="mt-1 text-2xl font-black text-[#172033]">{score}<span className="text-sm text-[#746c60]"> / 60</span></p></div>)}
              </div>
              <p className="mt-4 text-xs leading-6 text-[#625b50]">Practice အဖြေမှန်ရာခိုင်နှုန်းကို 180-point scale သို့ အချိုးကျခန့်မှန်းထားခြင်းပါ။ တကယ့် JLPT က scaled scoring သုံးတာကြောင့် official score အတိအကျမဟုတ်ပါ။ ခန့်မှန်းအောင်မှတ်မှာ စုစုပေါင်း 80/180 နှင့် section တစ်ခုစီ အနည်းဆုံး 19/60 ဖြစ်ပါတယ်။</p>
            </section>
          )}

          <DiagnosticSummary result={result} analysis={weaknessAnalysis} level={level} />

          <TimingAnalysis questions={questions} result={result} />

          <CrossTestTrend history={testHistory} questions={questions} level={level} />

          <section className="mt-6 rounded-[2rem] border border-[#ded8ca] bg-[#fffdf8] p-6 shadow-[0_18px_50px_rgba(50,42,28,0.08)] sm:p-8">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-[#a33a32] uppercase">科目別成績 · Category Scores</p>
              <h2 className="mt-2 text-2xl font-black text-[#172033]">
                ဘာသာရပ်အလိုက် ရလဒ်
              </h2>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categoryOrder.map((category) => {
                const categoryScore = result.categoryScores[category];

                if (!categoryScore) {
                  return null;
                }

                return (
                  <article key={category} className="rounded-2xl border border-[#ded8ca] bg-[#fbf7ee] p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-black text-[#172033]">
                        {categoryLabels[category]}
                      </h3>
                      <span className="text-lg font-black text-[#172033]">
                        {categoryScore.percentage}%
                      </span>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e5dfd3]">
                      <div
                        className={`h-full rounded-full ${
                          categoryScore.percentage >= 70
                            ? "bg-[#4f7b5e]"
                            : categoryScore.percentage >= 50
                              ? "bg-[#d09a2f]"
                              : "bg-[#c83f35]"
                        }`}
                        style={{ width: `${categoryScore.percentage}%` }}
                      />
                    </div>
                    <p className="mt-3 text-xs text-[#746c60]">
                      {categoryScore.total} ခုအနက် {categoryScore.correct} ခုမှန်
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111827] text-white shadow-[0_18px_48px_rgba(17,24,39,0.16)]">
              <div className="border-b border-white/10 p-6 sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#c83f35]/20 px-3 py-1.5 text-xs font-black text-[#ff9a91]">
                      <span className="size-2 rounded-full bg-[#e6655b]" aria-hidden="true" />
                      弱点分析 · WEAKNESS FINDER
                    </div>
                    <h2 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">
                      အခု ဦးစားပေးလေ့ကျင့်ရမယ့်အပိုင်း
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">
                      မှားခဲ့တဲ့မေးခွန်းတွေကို category နဲ့ tag အလိုက်ခွဲပြီး
                      လေ့ကျင့်ရမယ့်အပိုင်းကို အစဉ်လိုက်ဖော်ပြထားပါတယ်။
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white/65">
                    Sample {weaknessAnalysis.sampleSize} Questions
                  </span>
                </div>
              </div>

              <div className="grid gap-px bg-white/10 sm:grid-cols-2">
                <div className="bg-[#111827] p-6">
                  <p className="text-xs font-bold text-white/45">得意科目 · အားအကောင်းဆုံး Category</p>
                  <p className="mt-2 text-xl font-black text-[#84bd94]">
                    {weaknessAnalysis.strongestCategory
                      ? categoryLabels[weaknessAnalysis.strongestCategory.category]
                      : "အချက်အလက်မရှိသေးပါ"}
                  </p>
                  {weaknessAnalysis.strongestCategory && (
                    <p className="mt-1 text-sm text-white/45">
                      {weaknessAnalysis.strongestCategory.percentage}% accuracy
                    </p>
                  )}
                </div>
                <div className="bg-[#111827] p-6">
                  <p className="text-xs font-bold text-white/45">要復習 · ပိုလေ့ကျင့်ရန်လိုတဲ့ Category</p>
                  <p className="mt-2 text-xl font-black text-[#ff8278]">
                    {weaknessAnalysis.weakestCategory
                      ? categoryLabels[weaknessAnalysis.weakestCategory.category]
                      : "အချက်အလက်မရှိသေးပါ"}
                  </p>
                  {weaknessAnalysis.weakestCategory && (
                    <p className="mt-1 text-sm text-white/45">
                      {weaknessAnalysis.weakestCategory.percentage}% accuracy
                    </p>
                  )}
                </div>
              </div>

              <div className="p-6 sm:p-8">
                {weaknessAnalysis.focusTags.length > 0 ? (
                  <div className="space-y-3">
                    {weaknessAnalysis.focusTags.map((item, index) => (
                      <article key={item.tag} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-4 sm:flex-row sm:items-center">
                        <div className={`flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-white/15 text-sm font-black ${item.severity === "critical" ? "bg-[#c83f35] text-white" : "bg-[#d09a2f] text-[#111827]"}`}>
                          {index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-white">{item.label}</p>
                          <p className="mt-1 text-xs leading-5 text-white/45">
                            {item.attempts} ကြိမ်စမ်းသပ် · {item.wrong} ကြိမ်မှား · Confidence {item.confidence}
                          </p>
                        </div>
                        <div className="shrink-0 sm:text-right">
                          <p className={`text-xl font-black ${item.accuracy < 50 ? "text-[#ff8278]" : "text-[#f2d48f]"}`}>
                            {item.accuracy}%
                          </p>
                          <p className="text-xs text-white/35">accuracy</p>
                        </div>
                        <Link
                          href={`/practice/${level.toLowerCase()}?tag=${encodeURIComponent(item.tag)}`}
                          className="flex min-h-10 shrink-0 items-center justify-center rounded-xl bg-[#c83f35] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#a92f28] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c83f35]/25"
                        >
                          ဒီအပိုင်းလေ့ကျင့်မယ် →
                        </Link>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-[#84bd94]/20 bg-[#84bd94]/10 p-5 text-sm leading-7 text-[#b7d5bf]">
                    ဒီနမူနာမေးခွန်းတွေမှာ ထင်ရှားတဲ့အားနည်းချက် မတွေ့ရသေးပါဘူး။
                  </div>
                )}

                {weaknessAnalysis.isPreliminary && (
                  <p className="mt-5 border-t border-white/10 pt-5 text-xs leading-6 text-white/45">
                    ဒီ analysis ဟာ မေးခွန်းအရေအတွက်နည်းသေးတဲ့အတွက် preliminary insight ပဲဖြစ်ပါတယ်။ Question bank ပိုများလာတာနဲ့ ယုံကြည်ရမှု မြင့်လာပါမယ်။
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-[#dfc487] bg-[#fff8e7] p-4 text-sm leading-7 text-[#654b19]">
              <strong>注記 · မှတ်ချက် — </strong> ဒီရလဒ်ဟာ နမူနာမေးခွန်းတွေကို
              တစ်ခုချင်းတူညီတဲ့အလေးချိန်နဲ့ တွက်ထားတဲ့ raw percentage ဖြစ်ပါတယ်။
              Official JLPT scaled score မဟုတ်သေးပါဘူး။
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Link href={`/test/setup/${level.toLowerCase()}`} className="flex min-h-12 items-center justify-center rounded-xl border border-[#cfc6b7] bg-[#fffdf8] px-5 py-3 text-sm font-bold text-[#514b41] transition hover:border-[#8b8171]">
                Setup သို့ ပြန်သွားမယ်
              </Link>
              {level === "N3" && result.wrongQuestions.length > 0 && (
                <Link href={`/review/n3?result=${encodeURIComponent(result.id)}`} className="flex min-h-12 items-center justify-center rounded-xl bg-[#111827] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#27334a]">
                  မှားတာတွေ ပြန်စစ်မယ်
                </Link>
              )}
              <button type="button" onClick={restartExam} className="min-h-12 rounded-xl bg-[#c83f35] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#c83f35]/20 transition hover:bg-[#a92f28] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c83f35]/20">
                ထပ်မံဖြေဆိုမယ်
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="washi-surface min-h-screen bg-[#f7f5ef] text-[#172033]">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#111827] text-white shadow-[0_12px_32px_rgba(17,24,39,0.18)]">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-full border-2 border-white/80 bg-[#c83f35] shadow-[0_0_0_4px_rgba(200,63,53,0.22)]">
            <span className="text-[9px] font-bold tracking-[0.18em] text-white/75">級</span>
            <span className="-mt-0.5 text-sm font-black">{level}</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="truncate text-sm font-bold">JLPT {level} Practice Test</p>
                <p className="mt-0.5 hidden text-[9px] font-bold tracking-[0.24em] text-white/45 uppercase sm:block">日本語能力試験・模擬試験</p>
              </div>
              <p className="text-xs font-semibold text-white/60">
                {isHydrated
                  ? `${currentSection.shortLabel} · ${sectionAnsweredCount}/${sectionQuestionIndices.length} ဖြေပြီး`
                  : "စာမေးပွဲကို ပြန်ယူနေသည်…"}
              </p>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-[#d75045] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div
            className={`hidden border-l pl-5 text-right sm:block ${
              isLowTime || isTimeUp ? "border-[#e6655b]" : "border-white/15"
            }`}
          >
            <p className="text-[10px] font-bold tracking-[0.2em] text-white/45 uppercase">
              {currentSection.shortLabel} · ကျန်ရှိချိန်
            </p>
            <p
              className={`mt-1 font-mono text-xl font-black tracking-wider ${
                isLowTime || isTimeUp ? "text-[#ff8278]" : "text-[#f2d48f]"
              }`}
              aria-live="off"
            >
              {isHydrated ? formatTime(secondsRemaining) : "--:--:--"}
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_18rem] lg:px-8 lg:py-8">
        <nav className="grid grid-cols-3 overflow-hidden rounded-2xl border border-[#ded8ca] bg-[#fffdf8] shadow-sm lg:col-span-2" aria-label="စာမေးပွဲ Section များ">
          {examSections.map((section, index) => {
            const isCurrent = index === sectionIndex;
            const isComplete = index < sectionIndex;
            return (
              <div key={section.key} className={`border-r border-[#ded8ca] px-3 py-4 text-center last:border-r-0 ${isCurrent ? "bg-[#111827] text-white" : isComplete ? "bg-[#e5eee7] text-[#31513e]" : "text-[#8a8276]"}`}>
                <p className="text-[9px] font-black tracking-[0.18em] uppercase">{isComplete ? "完了 · ပြီး" : `Section ${index + 1}`}</p>
                <p className="mt-1 text-xs font-black sm:text-sm">{section.shortLabel}</p>
                <p className={`mt-1 text-[10px] ${isCurrent ? "text-white/55" : "text-current/65"}`}>{section.minutes} မိနစ်</p>
              </div>
            );
          })}
        </nav>
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#111827] p-4 text-white shadow-lg sm:hidden">
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-white/45 uppercase">
              {currentSection.shortLabel} · ကျန်ရှိချိန်
            </p>
            <p
              className={`mt-1 font-mono text-xl font-black tracking-wider ${
                isLowTime || isTimeUp ? "text-[#ff8278]" : "text-[#f2d48f]"
              }`}
            >
              {isHydrated ? formatTime(secondsRemaining) : "--:--:--"}
            </p>
          </div>
          <p className="text-xs font-semibold text-white/55">
            {isHydrated ? "အလိုအလျောက် သိမ်းထားသည်" : "ပြန်ယူနေသည်…"}
          </p>
        </div>
        {developerMode && (
          <section className="rounded-2xl border-2 border-dashed border-[#d09a2f] bg-[#fff8e7] p-5 text-[#654b19] lg:col-span-2" aria-label="Developer Test Mode controls">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#111827] px-2.5 py-1 text-[10px] font-black tracking-wider text-white">DEV MODE</span>
                  <strong className="text-sm">ဂျပန်စာမဖတ်ဘဲ Result Flow စမ်းရန်</strong>
                </div>
                <p className="mt-2 text-xs leading-6 text-[#765716]">Preset တစ်ခုနှိပ်တာနဲ့ အဖြေ၊ timing နဲ့ weakness result ကို ချက်ချင်းဖန်တီးပေးပါမယ်။ ဒီ result ကို local Test History ထဲမှာ test data အဖြစ် သိမ်းပါမယ်။</p>
              </div>
              <div className="grid shrink-0 gap-2 sm:grid-cols-3">
                <button type="button" onClick={() => runDeveloperPreset("perfect")} className="min-h-10 rounded-xl bg-[#4f7b5e] px-4 py-2 text-xs font-bold text-white">အားလုံးမှန်</button>
                <button type="button" onClick={() => runDeveloperPreset("grammar-weak")} className="min-h-10 rounded-xl bg-[#c83f35] px-4 py-2 text-xs font-bold text-white">Grammar အားနည်း</button>
                <button type="button" onClick={() => runDeveloperPreset("mixed")} className="min-h-10 rounded-xl bg-[#111827] px-4 py-2 text-xs font-bold text-white">ကျပန်းအမှား</button>
              </div>
            </div>
          </section>
        )}
        {isTimeUp && (
          <div
            className="rounded-2xl border border-[#c83f35]/25 bg-[#fff4ee] p-4 text-sm leading-7 text-[#7f211d] shadow-sm lg:col-span-2"
            role="alert"
          >
            <strong>ဒီ Section အချိန်ပြည့်သွားပါပြီ။</strong>{" "}
            {sectionIndex < examSections.length - 1
              ? "နောက် Section ကို အလိုအလျောက် ပြောင်းနေပါတယ်။"
              : "အဖြေရွေးချယ်မှုကို ပိတ်ထားပြီး ရလဒ်ကို အလိုအလျောက်တွက်ချက်နေပါတယ်။"}
          </div>
        )}
        <section className="overflow-hidden rounded-[1.75rem] border border-[#ded8ca] bg-[#fffdf8] shadow-[0_18px_50px_rgba(50,42,28,0.08)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e7e1d4] bg-[#fbf7ee] px-5 py-4 sm:px-8">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-[#c83f35] px-3 py-1.5 text-xs font-black text-white shadow-sm">
                試験科目 · {categoryLabels[question.category]}
              </span>
              <span className="text-xs font-semibold text-[#746c60]">
                မေးခွန်း {currentSectionPosition + 1} / {sectionQuestionIndices.length}
              </span>
            </div>
            <button
              type="button"
              onClick={() => toggleFlag(question.id)}
              disabled={isTimeUp || !isHydrated}
              aria-pressed={flaggedQuestions.includes(question.id)}
              className={`rounded-lg px-3 py-2 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-200 disabled:cursor-not-allowed disabled:opacity-50 ${
                flaggedQuestions.includes(question.id)
                  ? "bg-[#f3dda8] text-[#694813]"
                  : "border border-[#ded8ca] bg-[#fffdf8] text-[#625b50] hover:border-[#b9ac98]"
              }`}
            >
              {flaggedQuestions.includes(question.id) ? "★ မှတ်ထားပြီး" : "☆ ပြန်စစ်ရန်မှတ်မယ်"}
            </button>
          </div>

          <div className="p-5 sm:p-8">
            {question.category === "Listening" && (
              <div className="mb-6 flex items-center gap-4 rounded-2xl border border-[#b8c6c8] bg-[#eef4f2] p-4 text-[#193c40]">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#315f63] text-lg text-white" aria-hidden="true">
                  ♪
                </div>
                <div>
                  <p className="text-sm font-bold">Listening Audio</p>
                  <p className="mt-1 text-xs leading-5 text-[#42686b]">ဂျပန်အသံကို နားထောင်ပြီး အဖြေရွေးပါ။ Browser voice အရ အသံအနည်းငယ်ကွာနိုင်ပါတယ်။</p>
                </div>
                {question.audioUrl && <ListeningAudioPlayer key={question.id} audioUrls={question.audioUrls?.length ? question.audioUrls : [question.audioUrl]} />}
              </div>
            )}

            <div className="mb-5 flex items-center gap-3 text-[10px] font-bold tracking-[0.18em] text-[#9a342d] uppercase">
              <span className="flex size-8 items-center justify-center rounded-full bg-[#111827] text-sm tracking-normal text-white">{getProblemNumber(question)}</span>
              問題 {getProblemNumber(question)} · {question.itemType ?? "問題"}
            </div>
            {question.instruction && <p lang="ja" className="mb-5 border-b border-[#ded8ca] pb-4 text-sm font-bold leading-7 text-[#403b33]">{question.instruction} 1・2・3・4から いちばん いい ものを ひとつ えらんで ください。</p>}
            {question.passage && (
              <div lang="ja" className="mb-6 whitespace-pre-line rounded-xl border border-[#d8d1c3] bg-[#fffdf8] p-5 text-base font-medium leading-9 text-[#27231e] sm:p-6">
                {renderJapaneseText(question.passage)}
              </div>
            )}
            {question.illustration && <ListeningIllustration type={question.illustration} />}
            {!isAudioOnlyChoice && (
              <h1 lang="ja" className="whitespace-pre-line text-xl font-bold leading-10 text-[#141b2a] sm:text-2xl sm:leading-11">
                {renderJapaneseText(question.questionText)}
              </h1>
            )}

            <fieldset className="mt-8">
              <legend className="mb-4 text-sm font-bold text-[#625b50]">
                {isAudioOnlyChoice ? "အသံထဲက အဖြေနံပါတ်တစ်ခုကို ရွေးပါ" : "正しい答えを一つ選んでください · အဖြေမှန်တစ်ခုကို ရွေးပါ"}
              </legend>
              <div className={isAudioOnlyChoice ? "grid grid-cols-4 gap-3" : "space-y-3"}>
                {question.options.map((option, optionIndex) => {
                  const isSelected = answers[question.id] === option;

                  return (
                    <label
                      key={option}
                      className={`flex min-h-16 items-center rounded-2xl border-2 p-4 transition focus-within:ring-4 focus-within:ring-red-200 ${isAudioOnlyChoice ? "justify-center" : "gap-4"} ${
                        isTimeUp || !isHydrated
                          ? "cursor-not-allowed opacity-70"
                          : "cursor-pointer"
                      } ${
                        isSelected
                          ? "border-[#111827] bg-[#111827] text-white shadow-lg shadow-[#111827]/10"
                          : "border-[#ded8ca] bg-[#fffdf8] text-[#172033] hover:border-[#c83f35]/55 hover:bg-[#fff9f3]"
                      }`}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={option}
                        checked={isSelected}
                        disabled={isTimeUp || !isHydrated}
                        onChange={() =>
                          setAnswers((current) => ({
                            ...current,
                            [question.id]: option,
                          }))
                        }
                        className="sr-only"
                      />
                      <span
                        className={`flex size-9 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                          isSelected
                            ? "bg-[#c83f35] text-white"
                            : "bg-[#eee9df] text-[#625b50]"
                        }`}
                      >
                        {optionIndex + 1}
                      </span>
                      {!isAudioOnlyChoice && <span lang="ja" className="text-base font-semibold leading-7">{option}</span>}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-[#e7e1d4] bg-[#fbf7ee] px-5 py-4 sm:px-8">
            <button
              type="button"
              onClick={() => setCurrentIndex(sectionQuestionIndices[Math.max(0, currentSectionPosition - 1)])}
              disabled={currentSectionPosition === 0}
              className="min-h-11 rounded-xl border border-[#cfc6b7] bg-[#fffdf8] px-5 py-3 text-sm font-bold text-[#464137] transition hover:border-[#8b8171] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← ရှေ့မေးခွန်း
            </button>
            <button
              type="button"
              onClick={() => setCurrentIndex(sectionQuestionIndices[Math.min(sectionQuestionIndices.length - 1, currentSectionPosition + 1)])}
              disabled={isLastQuestion}
              className="min-h-11 rounded-xl bg-[#c83f35] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#c83f35]/20 transition hover:bg-[#a92f28] disabled:cursor-not-allowed disabled:bg-[#d7d1c5] disabled:text-[#7c7468] disabled:shadow-none"
            >
              နောက်မေးခွန်း →
            </button>
          </div>
        </section>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[1.5rem] border border-[#ded8ca] bg-[#fffdf8] p-5 shadow-[0_12px_36px_rgba(50,42,28,0.07)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] font-bold tracking-[0.2em] text-[#a33a32] uppercase">問題一覧</p>
                <h2 className="mt-1 text-sm font-black text-[#172033]">{currentSection.shortLabel}</h2>
              </div>
              <span className="rounded-full bg-[#eee9df] px-2.5 py-1 text-xs font-bold text-[#625b50]">{progress}%</span>
            </div>
            <div className="mt-4 grid grid-cols-5 gap-2 lg:grid-cols-4">
              {sectionQuestionIndices.map((questionIndex, position) => {
                const item = questions[questionIndex];
                const isCurrent = questionIndex === currentIndex;
                const isAnswered = Boolean(answers[item.id]);
                const isFlagged = flaggedQuestions.includes(item.id);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentIndex(questionIndex)}
                    aria-label={`မေးခွန်း ${position + 1}${isAnswered ? "၊ ဖြေပြီး" : ""}${isFlagged ? "၊ မှတ်ထားသည်" : ""}`}
                    className={`relative aspect-square rounded-xl text-sm font-black transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-200 ${
                      isCurrent
                        ? "bg-[#111827] text-white shadow-md"
                        : isAnswered
                          ? "bg-[#dce9df] text-[#24523a] hover:bg-[#cde0d2]"
                          : "bg-[#eee9df] text-[#625b50] hover:bg-[#e3ddd1]"
                    }`}
                  >
                    {position + 1}
                    {isFlagged && (
                      <span className="absolute -right-1 -top-1 size-3 rounded-full border-2 border-[#fffdf8] bg-[#d09a2f]" />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="mt-5 space-y-2 border-t border-[#e7e1d4] pt-4 text-xs text-[#746c60]">
              <p><span className="mr-2 inline-block size-2.5 rounded-sm bg-[#cde0d2]" />ဖြေပြီး</p>
              <p><span className="mr-2 inline-block size-2.5 rounded-sm bg-[#d09a2f]" />ပြန်စစ်ရန်</p>
            </div>
          </div>

          <button
            type="button"
            onClick={finishCurrentSection}
            disabled={!isHydrated || isTimeUp}
            className="flex min-h-13 w-full items-center justify-center rounded-xl bg-[#c83f35] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#c83f35]/20 transition hover:bg-[#a92f28] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c83f35]/20 disabled:cursor-not-allowed disabled:bg-[#d7d1c5] disabled:text-[#7c7468] disabled:shadow-none"
          >
            {sectionIndex === examSections.length - 1
              ? "အဖြေတင်ပြီး ရလဒ်ကြည့်မယ်"
              : "ဒီ Section အပြီးသတ်မယ် →"}
          </button>

          <div className="rounded-[1.5rem] border border-[#c8d7cc] bg-[#eef4ef] p-5">
            <div className="flex items-center gap-2 text-[#244735]">
              <span className="size-2.5 rounded-full bg-[#4f7b5e]" aria-hidden="true" />
              <p className="text-sm font-black">保存済み · Exam state သိမ်းထားသည်</p>
            </div>
            <p className="mt-2 text-xs leading-6 text-[#3f604d]">
              Page ကို refresh လုပ်လည်း အဖြေ၊ လက်ရှိ Section၊ ကျန်ချိန်နဲ့ မေးခွန်း မပျောက်ပါဘူး။
            </p>
            <button
              type="button"
              onClick={restartExam}
              className="mt-4 w-full rounded-xl border border-[#a9c0ae] bg-[#fffdf8] px-4 py-2.5 text-xs font-bold text-[#31513e] transition hover:border-[#64866e] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#64866e]/20"
            >
              စာမေးပွဲကို အစမှပြန်စမယ်
            </button>
          </div>

          <Link
            href={`/test/setup/${level.toLowerCase()}`}
            className="flex min-h-11 items-center justify-center rounded-xl border border-[#cfc6b7] bg-[#fffdf8] px-4 py-3 text-sm font-bold text-[#514b41] transition hover:border-[#8b8171]"
          >
            Setup သို့ ပြန်သွားမယ်
          </Link>
        </aside>
      </main>
    </div>
  );
}
