import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { EdgeTTS } from "node-edge-tts";

const projectRoot = process.cwd();
const questions = JSON.parse(
  await readFile(path.join(projectRoot, "src/data/mock-n3-questions.json"), "utf8"),
);
const listeningQuestions = questions.filter(
  (question) => question.category === "Listening" && question.listeningScript,
);
const outputDirectory = path.join(projectRoot, "public/audio/n3");
await mkdir(outputDirectory, { recursive: true });

const tts = new EdgeTTS({
  voice: "ja-JP-NanamiNeural",
  lang: "ja-JP",
  outputFormat: "audio-24khz-96kbitrate-mono-mp3",
  rate: "-5%",
  pitch: "+0Hz",
  volume: "+0%",
  timeout: 30000,
});

for (const question of listeningQuestions) {
  const outputPath = path.join(outputDirectory, `${question.id}.mp3`);
  await tts.ttsPromise(question.listeningScript, outputPath);
  process.stdout.write(`Generated ${path.relative(projectRoot, outputPath)}\n`);
}
