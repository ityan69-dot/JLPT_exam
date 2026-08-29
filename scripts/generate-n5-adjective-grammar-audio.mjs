import { mkdir } from "node:fs/promises";
import path from "node:path";
import { EdgeTTS } from "node-edge-tts";
const examples = [["kono-hon-wa-omoshiroi-desu","このほんは、おもしろいです。"],["ookii-ie-desu","おおきいいえです。"],["kono-kaban-wa-takakunai-desu","このかばんは、たかくないです。"],["kyou-wa-samui-desu","きょうは、さむいです。"],["kono-machi-wa-shizuka-desu","このまちは、しずかです。"],["shizukana-machi-desu","しずかなまちです。"],["kono-heya-wa-kirei-desu","このへやは、きれいです。"],["kono-kouen-wa-nigiyaka-dewa-arimasen","このこうえんは、にぎやかではありません。"]];
const dir = path.join(process.cwd(), "public/audio/n5/grammar/adjectives");
await mkdir(dir, { recursive: true });
const tts = new EdgeTTS({ voice: "ja-JP-NanamiNeural", lang: "ja-JP", outputFormat: "audio-24khz-96kbitrate-mono-mp3", rate: "-12%", pitch: "+0Hz", volume: "+0%", timeout: 30000 });
for (const [key, value] of examples) { await tts.ttsPromise(`${value}。${value}。`, path.join(dir, `${key}.mp3`)); console.log(key); }
