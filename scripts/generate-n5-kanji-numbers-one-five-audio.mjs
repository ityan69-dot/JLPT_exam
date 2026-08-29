import { mkdir } from "node:fs/promises";
import path from "node:path";
import { EdgeTTS } from "node-edge-tts";

const outputDir = path.join(process.cwd(), "public/audio/n5/kanji/numbers-one-five");
const items = [["hitotsu", "ひとつ"], ["futatsu", "ふたつ"], ["mittsu", "みっつ"], ["yottsu", "よっつ"], ["itsutsu", "いつつ"]];
await mkdir(outputDir, { recursive: true });
const tts = new EdgeTTS({ voice: "ja-JP-NanamiNeural", lang: "ja-JP", outputFormat: "audio-24khz-96kbitrate-mono-mp3", rate: "-12%", pitch: "+0Hz", volume: "+0%", timeout: 30000 });
for (const [key, text] of items) { await tts.ttsPromise(`${text}。${text}。`, path.join(outputDir, `${key}.mp3`)); console.log(key); }
