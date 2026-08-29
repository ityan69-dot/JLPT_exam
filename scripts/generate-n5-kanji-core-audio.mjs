import { readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";
import { EdgeTTS } from "node-edge-tts";

const source = await readFile(path.join(process.cwd(), "src/data/n5-kanji-course.ts"), "utf8");
const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const loaded = { exports: {} };
new Function("module", "exports", output)(loaded, loaded.exports);
const items = loaded.exports.remainingN5KanjiLessons.flatMap((lesson) => lesson.kanji);
const outputDir = path.join(process.cwd(), "public/audio/n5/kanji/core");
await mkdir(outputDir, { recursive: true });

async function createAudio(item) {
  const tts = new EdgeTTS({ voice: "ja-JP-NanamiNeural", lang: "ja-JP", outputFormat: "audio-24khz-96kbitrate-mono-mp3", rate: "-12%", pitch: "+0Hz", volume: "+0%", timeout: 30000 });
  await tts.ttsPromise(`${item.audioText}。${item.audioText}。`, path.join(outputDir, `${item.audioKey}.mp3`));
  console.log(item.audioKey);
}

for (let index = 0; index < items.length; index += 4) {
  await Promise.all(items.slice(index, index + 4).map(createAudio));
}
