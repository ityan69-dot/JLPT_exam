import { mkdir } from "node:fs/promises";
import path from "node:path";
import { EdgeTTS } from "node-edge-tts";
const examples = [["kinou-wa-getsuyoubi-deshita","きのうは、げつようびでした。"],["sensei-dewa-arimasen-deshita","せんせいでは、ありませんでした。"],["kinou-gakkou-e-ikimashita","きのう、がっこうへいきました。"],["asa-gohan-o-tabemasen-deshita","あさごはんを、たべませんでした。"],["kinou-wa-samukatta-desu","きのうは、さむかったです。"],["eiga-wa-omoshirokunakatta-desu","えいがは、おもしろくなかったです。"],["kono-machi-wa-shizuka-deshita","このまちは、しずかでした。"],["kouen-wa-nigiyaka-dewa-arimasen-deshita","こうえんは、にぎやかではありませんでした。"]];
const dir = path.join(process.cwd(), "public/audio/n5/grammar/past-negative");
await mkdir(dir, { recursive: true });
const tts = new EdgeTTS({ voice: "ja-JP-NanamiNeural", lang: "ja-JP", outputFormat: "audio-24khz-96kbitrate-mono-mp3", rate: "-12%", pitch: "+0Hz", volume: "+0%", timeout: 30000 });
for (const [key, value] of examples) { await tts.ttsPromise(`${value}。${value}。`, path.join(dir, `${key}.mp3`)); console.log(key); }
