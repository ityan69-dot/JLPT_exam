import { mkdir } from "node:fs/promises";
import path from "node:path";
import { EdgeTTS } from "node-edge-tts";
const words = [["watashi","わたし"],["anata","あなた"],["kazoku","かぞく"],["chichi","ちち"],["haha","はは"],["ani","あに"],["ane","あね"],["otouto","おとうと"],["imouto","いもうと"],["tomodachi","ともだち"],["ie","いえ"],["heya","へや"],["tsukue","つくえ"],["isu","いす"],["hon","ほん"],["mizu","みず"],["gohan","ごはん"],["kuruma","くるま"],["denwa","でんわ"],["kaban","かばん"],["okiru","おきる"],["neru","ねる"],["taberu","たべる"],["nomu","のむ"],["iku","いく"],["kuru","くる"],["miru","みる"],["kiku","きく"],["hanasu","はなす"],["yomu","よむ"]];
const dir = path.join(process.cwd(), "public/audio/n5/vocabulary/daily-life");
await mkdir(dir, { recursive: true });
const tts = new EdgeTTS({ voice: "ja-JP-NanamiNeural", lang: "ja-JP", outputFormat: "audio-24khz-96kbitrate-mono-mp3", rate: "-15%", pitch: "+0Hz", volume: "+0%", timeout: 30000 });
for (const [key, value] of words) { await tts.ttsPromise(`${value}。${value}。`, path.join(dir, `${key}.mp3`)); console.log(key); }
