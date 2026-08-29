import { mkdir } from "node:fs/promises";
import path from "node:path";
import { EdgeTTS } from "node-edge-tts";
const words = [["tabemono","たべもの"],["nomimono","のみもの"],["pan","パン"],["tamago","たまご"],["niku","にく"],["sakana","さかな"],["yasai","やさい"],["kudamono","くだもの"],["ocha","おちゃ"],["gyuunyuu","ぎゅうにゅう"],["gakkou","がっこう"],["eki","えき"],["byouin","びょういん"],["ginkou","ぎんこう"],["yuubinkyoku","ゆうびんきょく"],["mise","みせ"],["kouen","こうえん"],["toshokan","としょかん"],["uchi","うち"],["kuni","くに"],["densha","でんしゃ"],["basu","バス"],["jitensha","じてんしゃ"],["hikouki","ひこうき"],["fune","ふね"],["takushii","タクシー"],["arukimasu","あるきます"],["norimasu","のります"],["orimasu","おります"],["tsukimasu","つきます"]];
const dir = path.join(process.cwd(), "public/audio/n5/vocabulary/food-places-transport");
await mkdir(dir, { recursive: true });
const tts = new EdgeTTS({ voice: "ja-JP-NanamiNeural", lang: "ja-JP", outputFormat: "audio-24khz-96kbitrate-mono-mp3", rate: "-15%", pitch: "+0Hz", volume: "+0%", timeout: 30000 });
for (const [key, value] of words) { await tts.ttsPromise(`${value}。${value}。`, path.join(dir, `${key}.mp3`)); console.log(key); }
