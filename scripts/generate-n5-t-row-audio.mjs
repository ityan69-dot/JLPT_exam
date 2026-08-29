import { mkdir } from "node:fs/promises";
import path from "node:path";
import { EdgeTTS } from "node-edge-tts";

const characters = [["ta", "た"], ["chi", "ち"], ["tsu", "つ"], ["te", "て"], ["to", "と"]];
const outputDirectory = path.join(process.cwd(), "public/audio/n5/hiragana");
await mkdir(outputDirectory, { recursive: true });

const tts = new EdgeTTS({ voice: "ja-JP-NanamiNeural", lang: "ja-JP", outputFormat: "audio-24khz-96kbitrate-mono-mp3", rate: "-15%", pitch: "+0Hz", volume: "+0%", timeout: 30000 });
for (const [romaji, kana] of characters) {
  const outputPath = path.join(outputDirectory, `${romaji}.mp3`);
  await tts.ttsPromise(`${kana}。${kana}。`, outputPath);
  console.log(`Generated ${path.relative(process.cwd(), outputPath)}`);
}
