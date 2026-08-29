import { mkdir } from "node:fs/promises";
import path from "node:path";
import { EdgeTTS } from "node-edge-tts";
const voiced=[["ga","が"],["gi","ぎ"],["gu","ぐ"],["ge","げ"],["go","ご"],["za","ざ"],["ji","じ"],["zu","ず"],["ze","ぜ"],["zo","ぞ"],["da","だ"],["ji-d","ぢ"],["zu-d","づ"],["de","で"],["do","ど"],["ba","ば"],["bi","び"],["bu","ぶ"],["be","べ"],["bo","ぼ"],["pa","ぱ"],["pi","ぴ"],["pu","ぷ"],["pe","ぺ"],["po","ぽ"]];
const combined=[["kya","きゃ"],["kyu","きゅ"],["kyo","きょ"],["gya","ぎゃ"],["gyu","ぎゅ"],["gyo","ぎょ"],["sha","しゃ"],["shu","しゅ"],["sho","しょ"],["ja","じゃ"],["ju","じゅ"],["jo","じょ"],["cha","ちゃ"],["chu","ちゅ"],["cho","ちょ"],["nya","にゃ"],["nyu","にゅ"],["nyo","にょ"],["hya","ひゃ"],["hyu","ひゅ"],["hyo","ひょ"],["bya","びゃ"],["byu","びゅ"],["byo","びょ"],["pya","ぴゃ"],["pyu","ぴゅ"],["pyo","ぴょ"],["mya","みゃ"],["myu","みゅ"],["myo","みょ"],["rya","りゃ"],["ryu","りゅ"],["ryo","りょ"]];
const outputDirectory=path.join(process.cwd(),"public/audio/n5/hiragana/variants");await mkdir(outputDirectory,{recursive:true});
const tts=new EdgeTTS({voice:"ja-JP-NanamiNeural",lang:"ja-JP",outputFormat:"audio-24khz-96kbitrate-mono-mp3",rate:"-15%",pitch:"+0Hz",volume:"+0%",timeout:30000});
for(const [key,kana] of [...voiced,...combined]){await tts.ttsPromise(`${kana}。${kana}。`,path.join(outputDirectory,`${key}.mp3`));console.log(`Generated ${key}`);}
