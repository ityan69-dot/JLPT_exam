import { mkdir } from "node:fs/promises";
import path from "node:path";
import { EdgeTTS } from "node-edge-tts";
const examples = [["shichiji-ni-okimasu","しちじに、おきます。"],["gakkou-ni-ikimasu","がっこうに、いきます。"],["heya-ni-neko-ga-imasu","へやに、ねこがいます。"],["nihon-e-ikimasu","にほんへ、いきます。"],["eki-e-arukimasu","えきへ、あるきます。"],["toshokan-de-hon-o-yomimasu","としょかんで、ほんをよみます。"],["basu-de-gakkou-e-ikimasu","バスで、がっこうへいきます。"],["hashi-de-gohan-o-tabemasu","はしで、ごはんをたべます。"]];
const dir = path.join(process.cwd(), "public/audio/n5/grammar/ni-e-de");
await mkdir(dir, { recursive: true });
const tts = new EdgeTTS({ voice: "ja-JP-NanamiNeural", lang: "ja-JP", outputFormat: "audio-24khz-96kbitrate-mono-mp3", rate: "-12%", pitch: "+0Hz", volume: "+0%", timeout: 30000 });
for (const [key, value] of examples) { await tts.ttsPromise(`${value}。${value}。`, path.join(dir, `${key}.mp3`)); console.log(key); }
