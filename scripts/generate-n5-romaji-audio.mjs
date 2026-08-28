import { mkdir } from "node:fs/promises";
import path from "node:path";
import { EdgeTTS } from "node-edge-tts";

const soundRows = [
  ["vowels", "あ、い、う、え、お"], ["k", "か、き、く、け、こ"], ["s", "さ、し、す、せ、そ"],
  ["t", "た、ち、つ、て、と"], ["n", "な、に、ぬ、ね、の"], ["h", "は、ひ、ふ、へ、ほ"],
  ["m", "ま、み、む、め、も"], ["y", "や、ゆ、よ"], ["r", "ら、り、る、れ、ろ"], ["w", "わ、を、ん"],
  ["g", "が、ぎ、ぐ、げ、ご"], ["z", "ざ、じ、ず、ぜ、ぞ"], ["d", "だ、ぢ、づ、で、ど"],
  ["b", "ば、び、ぶ、べ、ぼ"], ["p", "ぱ、ぴ、ぷ、ぺ、ぽ"],
  ["kya", "きゃ、きゅ、きょ"], ["sha", "しゃ、しゅ、しょ"], ["cha", "ちゃ、ちゅ、ちょ"],
  ["nya", "にゃ、にゅ、にょ"], ["hya", "ひゃ、ひゅ、ひょ"], ["mya", "みゃ、みゅ、みょ"],
  ["rya", "りゃ、りゅ、りょ"], ["gya", "ぎゃ、ぎゅ、ぎょ"], ["ja", "じゃ、じゅ、じょ"],
  ["bya", "びゃ、びゅ、びょ"], ["pya", "ぴゃ、ぴゅ、ぴょ"],
  ["double", "きって。がっこう。"], ["long", "とうきょう。おかあさん。"], ["final-n", "ほん。にほん。"],
];
const outputDirectory = path.join(process.cwd(), "public/audio/n5/romaji");
await mkdir(outputDirectory, { recursive: true });
const tts = new EdgeTTS({ voice: "ja-JP-NanamiNeural", lang: "ja-JP", outputFormat: "audio-24khz-96kbitrate-mono-mp3", rate: "-18%", pitch: "+0Hz", volume: "+0%", timeout: 30000 });

for (const [name, text] of soundRows) {
  const outputPath = path.join(outputDirectory, `${name}.mp3`);
  await tts.ttsPromise(text, outputPath);
  process.stdout.write(`Generated ${path.relative(process.cwd(), outputPath)}\n`);
}
