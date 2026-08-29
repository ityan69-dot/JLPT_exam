import { mkdir } from "node:fs/promises";
import path from "node:path";
import { EdgeTTS } from "node-edge-tts";
const items = [["katte","かって"],["nonde","のんで"],["kaite","かいて"],["oyoide","およいで"],["hanashite","はなして"],["tabete","たべて"],["mite","みて"],["shite","して"],["kite","きて"],["itte","いって"],["asa-okite-gakkou-e-ikimasu","あさおきて、がっこうへいきます。"],["pan-o-tabete-ocha-o-nomimasu","パンをたべて、おちゃをのみます。"]];
const dir = path.join(process.cwd(), "public/audio/n5/grammar/te-form");
await mkdir(dir, { recursive: true });
const tts = new EdgeTTS({ voice: "ja-JP-NanamiNeural", lang: "ja-JP", outputFormat: "audio-24khz-96kbitrate-mono-mp3", rate: "-12%", pitch: "+0Hz", volume: "+0%", timeout: 30000 });
for (const [key, value] of items) { await tts.ttsPromise(`${value}。${value}。`, path.join(dir, `${key}.mp3`)); console.log(key); }
