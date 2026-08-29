import { mkdir } from "node:fs/promises";
import path from "node:path";
import { EdgeTTS } from "node-edge-tts";
const examples = [["kore-wa-hon-desu","これは、ほんです。"],["sore-wa-kaban-desu","それは、かばんです。"],["are-wa-gakkou-desu","あれは、がっこうです。"],["dore-ga-anata-no-hon-desu-ka","どれが、あなたのほんですか。"],["kono-hon-wa-atarashii-desu","このほんは、あたらしいです。"],["sono-kaban-wa-watashi-no-desu","そのかばんは、わたしのです。"],["ano-hito-wa-sensei-desu","あのひとは、せんせいです。"],["dono-kasa-desu-ka","どのかさですか。"]];
const dir = path.join(process.cwd(), "public/audio/n5/grammar/demonstratives");
await mkdir(dir, { recursive: true });
const tts = new EdgeTTS({ voice: "ja-JP-NanamiNeural", lang: "ja-JP", outputFormat: "audio-24khz-96kbitrate-mono-mp3", rate: "-12%", pitch: "+0Hz", volume: "+0%", timeout: 30000 });
for (const [key, value] of examples) { await tts.ttsPromise(`${value}。${value}。`, path.join(dir, `${key}.mp3`)); console.log(key); }
