export type N5CourseStep = { href: string; title: string; module: string };

const rows = ["a", "k", "s", "t", "n", "h", "m", "y", "r", "w"];
const kanjiSlugs = ["numbers-six-ten", "big-numbers-year", "time-now", "position-order", "directions", "family-people", "school-study", "movement", "language-actions", "daily-things", "nature-elements", "size-color", "everyday-words", "useful-final"];
const listeningSlugs = ["sounds-numbers-time", "basic-questions", "quick-responses", "who-when-where", "instructions-order", "task-based", "situation-expression", "listening-check"];

export const n5CourseSteps: N5CourseStep[] = [
  { href: "/learn/n5/romaji", title: "Romaji & Japanese Sounds", module: "Romaji" },
  { href: "/learn/n5/romaji/quiz", title: "Romaji Quiz", module: "Romaji" },
  ...rows.map((row) => ({ href: `/learn/n5/hiragana/${row}-row`, title: `Hiragana ${row.toUpperCase()} Row`, module: "Hiragana" })),
  { href: "/learn/n5/hiragana/voiced-sounds", title: "Hiragana Voiced Sounds", module: "Hiragana" },
  { href: "/learn/n5/hiragana/combined-sounds", title: "Hiragana Combined Sounds", module: "Hiragana" },
  { href: "/learn/n5/hiragana/quiz", title: "Hiragana Quiz", module: "Hiragana" },
  ...rows.map((row) => ({ href: `/learn/n5/katakana/${row}-row`, title: `Katakana ${row.toUpperCase()} Row`, module: "Katakana" })),
  { href: "/learn/n5/katakana/voiced-sounds", title: "Katakana Voiced Sounds", module: "Katakana" },
  { href: "/learn/n5/katakana/combined-sounds", title: "Katakana Combined Sounds", module: "Katakana" },
  { href: "/learn/n5/katakana/quiz", title: "Katakana Quiz", module: "Katakana" },
  { href: "/learn/n5/vocabulary/numbers-1-10", title: "Numbers 1–10", module: "Vocabulary" },
  { href: "/learn/n5/vocabulary/time-hours", title: "Time & Hours", module: "Vocabulary" },
  { href: "/learn/n5/vocabulary/days-dates-months", title: "Days, Dates & Months", module: "Vocabulary" },
  { href: "/learn/n5/vocabulary/daily-life", title: "Daily Life Words", module: "Vocabulary" },
  { href: "/learn/n5/vocabulary/food-places-transport", title: "Food, Places & Transport", module: "Vocabulary" },
  { href: "/learn/n5/vocabulary/adjectives-questions-greetings", title: "Adjectives, Questions & Greetings", module: "Vocabulary" },
  { href: "/learn/n5/grammar/desu-masu", title: "Basic Sentences", module: "Grammar" },
  { href: "/learn/n5/grammar/core-particles", title: "Core Particles", module: "Grammar" },
  { href: "/learn/n5/grammar/demonstratives", title: "Demonstratives", module: "Grammar" },
  { href: "/learn/n5/grammar/existence-location", title: "Existence & Location", module: "Grammar" },
  { href: "/learn/n5/grammar/adjectives", title: "Adjective Sentences", module: "Grammar" },
  { href: "/learn/n5/grammar/past-negative", title: "Past & Negative", module: "Grammar" },
  { href: "/learn/n5/grammar/ni-e-de", title: "に・へ・で", module: "Grammar" },
  { href: "/learn/n5/grammar/to-mo-no", title: "と・も・の", module: "Grammar" },
  { href: "/learn/n5/grammar/te-form", title: "て-form", module: "Grammar" },
  { href: "/learn/n5/kanji/picture-kanji", title: "Picture Kanji", module: "Kanji" },
  { href: "/learn/n5/kanji/numbers-one-five", title: "Kanji Numbers 1–5", module: "Kanji" },
  ...kanjiSlugs.map((slug) => ({ href: `/learn/n5/kanji/lesson/${slug}`, title: slug.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join(" "), module: "Kanji" })),
  { href: "/learn/n5/kanji/quiz", title: "Kanji Quiz", module: "Kanji" },
  { href: "/learn/n5/reading/short-sentences", title: "Short Sentences", module: "Reading" },
  { href: "/learn/n5/reading/messages-notes", title: "Messages & Notes", module: "Reading" },
  { href: "/learn/n5/reading/signs-notices", title: "Signs & Notices", module: "Reading" },
  { href: "/learn/n5/reading/short-passages", title: "Short Passages", module: "Reading" },
  { href: "/learn/n5/reading/information-reading", title: "Information Reading", module: "Reading" },
  { href: "/learn/n5/reading/check", title: "Reading Check", module: "Reading" },
  ...listeningSlugs.map((slug) => ({ href: `/learn/n5/listening/${slug}`, title: slug.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join(" "), module: "Listening" })),
];

export const n5CourseModules = ["Romaji", "Hiragana", "Katakana", "Vocabulary", "Grammar", "Kanji", "Reading", "Listening"];
