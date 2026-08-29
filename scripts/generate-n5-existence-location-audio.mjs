import { mkdir } from "node:fs/promises";
import path from "node:path";
import { EdgeTTS } from "node-edge-tts";
const examples = [["koko-wa-toshokan-desu","ここは、としょかんです。"],["toire-wa-doko-desu-ka","トイレは、どこですか。"],["asoko-desu","あそこです。"],["tsukue-no-ue-ni-hon-ga-arimasu","つくえのうえに、ほんがあります。"],["heya-ni-neko-ga-imasu","へやに、ねこがいます。"],["sensei-wa-kyoushitsu-ni-imasu","せんせいは、きょうしつにいます。"],["kouen-ni-ki-ga-arimasu","こうえんに、きがあります。"],["eki-no-mae-ni-ginkou-ga-arimasu","えきのまえに、ぎんこうがあります。"]];
const dir = path.join(process.cwd(), "public/audio/n5/grammar/existence-location");
await mkdir(dir, { recursive: true });
const tts = new EdgeTTS({ voice: "ja-JP-NanamiNeural", lang: "ja-JP", outputFormat: "audio-24khz-96kbitrate-mono-mp3", rate: "-12%", pitch: "+0Hz", volume: "+0%", timeout: 30000 });
for (const [key, value] of examples) { await tts.ttsPromise(`${value}。${value}。`, path.join(dir, `${key}.mp3`)); console.log(key); }
