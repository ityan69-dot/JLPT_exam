import { mkdir } from "node:fs/promises";
import path from "node:path";
import { EdgeTTS } from "node-edge-tts";
const examples = [["pan-to-tamago-o-tabemasu","パンと、たまごをたべます。"],["tomodachi-to-gakkou-e-ikimasu","ともだちと、がっこうへいきます。"],["chichi-to-haha-ga-imasu","ちちと、ははがいます。"],["watashi-mo-gakusei-desu","わたしも、がくせいです。"],["ocha-mo-nomimasu","おちゃも、のみます。"],["kore-wa-watashi-no-kaban-desu","これは、わたしのかばんです。"],["nihongo-no-hon-o-yomimasu","にほんごのほんを、よみます。"],["kore-wa-dare-no-kasa-desu-ka","これは、だれのかさですか。"]];
const dir = path.join(process.cwd(), "public/audio/n5/grammar/to-mo-no");
await mkdir(dir, { recursive: true });
const tts = new EdgeTTS({ voice: "ja-JP-NanamiNeural", lang: "ja-JP", outputFormat: "audio-24khz-96kbitrate-mono-mp3", rate: "-12%", pitch: "+0Hz", volume: "+0%", timeout: 30000 });
for (const [key, value] of examples) { await tts.ttsPromise(`${value}。${value}。`, path.join(dir, `${key}.mp3`)); console.log(key); }
