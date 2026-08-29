import { mkdir } from "node:fs/promises";
import path from "node:path";
import { EdgeTTS } from "node-edge-tts";
const words = [["ookii","おおきい"],["chiisai","ちいさい"],["atarashii","あたらしい"],["furui","ふるい"],["ii","いい"],["warui","わるい"],["atsui","あつい"],["samui","さむい"],["takai","たかい"],["yasui","やすい"],["nani---nan","なに。なん"],["dare","だれ"],["doko","どこ"],["itsu","いつ"],["dou","どう"],["doushite","どうして"],["dore","どれ"],["dono","どの"],["ikutsu","いくつ"],["ikura","いくら"],["ohayou-gozaimasu","おはようございます"],["konnichiwa","こんにちは"],["konbanwa","こんばんは"],["arigatou-gozaimasu","ありがとうございます"],["sumimasen","すみません"],["gomennasai","ごめんなさい"],["hajimemashite","はじめまして"],["yoroshiku-onegaishimasu","よろしくおねがいします"],["itadakimasu","いただきます"],["gochisousama-deshita","ごちそうさまでした"]];
const dir = path.join(process.cwd(), "public/audio/n5/vocabulary/adjectives-questions-greetings");
await mkdir(dir, { recursive: true });
const tts = new EdgeTTS({ voice: "ja-JP-NanamiNeural", lang: "ja-JP", outputFormat: "audio-24khz-96kbitrate-mono-mp3", rate: "-15%", pitch: "+0Hz", volume: "+0%", timeout: 30000 });
for (const [key, value] of words) { await tts.ttsPromise(`${value}。${value}。`, path.join(dir, `${key}.mp3`)); console.log(key); }
