import { mkdir } from "node:fs/promises";
import path from "node:path";
import { EdgeTTS } from "node-edge-tts";
const examples = [["watashi-wa-gakusei-desu","わたしは、がくせいです。"],["kore-wa-watashi-no-kaban-desu","これは、わたしのかばんです。"],["dare-ga-sensei-desu-ka","だれが、せんせいですか。"],["tanaka-san-ga-sensei-desu","たなかさんが、せんせいです。"],["neko-ga-imasu","ねこが、います。"],["pan-o-tabemasu","パンを、たべます。"],["ocha-o-nomimasu","おちゃを、のみます。"],["watashi-wa-hon-o-yomimasu","わたしは、ほんを、よみます。"]];
const dir = path.join(process.cwd(), "public/audio/n5/grammar/core-particles");
await mkdir(dir, { recursive: true });
const tts = new EdgeTTS({ voice: "ja-JP-NanamiNeural", lang: "ja-JP", outputFormat: "audio-24khz-96kbitrate-mono-mp3", rate: "-12%", pitch: "+0Hz", volume: "+0%", timeout: 30000 });
for (const [key, value] of examples) { await tts.ttsPromise(`${value}。${value}。`, path.join(dir, `${key}.mp3`)); console.log(key); }
