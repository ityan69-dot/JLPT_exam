import { mkdir } from "node:fs/promises";
import path from "node:path";
import { EdgeTTS } from "node-edge-tts";
const examples = [["watashi-wa-gakusei-desu","わたしは、がくせいです。"],["kore-wa-hon-desu","これは、ほんです。"],["gakusei-dewa-arimasen","がくせいでは、ありません。"],["sensei-desu-ka","せんせいですか。"],["pan-o-tabemasu","パンを、たべます。"],["ocha-o-nomimasen","おちゃを、のみません。"],["gakkou-e-ikimasu-ka","がっこうへ、いきますか。"]];
const dir = path.join(process.cwd(), "public/audio/n5/grammar/desu-masu");
await mkdir(dir, { recursive: true });
const tts = new EdgeTTS({ voice: "ja-JP-NanamiNeural", lang: "ja-JP", outputFormat: "audio-24khz-96kbitrate-mono-mp3", rate: "-12%", pitch: "+0Hz", volume: "+0%", timeout: 30000 });
for (const [key, value] of examples) { await tts.ttsPromise(`${value}。${value}。`, path.join(dir, `${key}.mp3`)); console.log(key); }
