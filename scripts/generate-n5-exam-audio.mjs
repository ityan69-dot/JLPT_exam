import {readFile,mkdir} from "node:fs/promises";
import path from "node:path";
import {EdgeTTS} from "node-edge-tts";
const questions=JSON.parse(await readFile(path.join(process.cwd(),"src/data/mock-n5-questions.json"),"utf8")).filter((question)=>question.category==="Listening");
const dir=path.join(process.cwd(),"public/audio/n5");await mkdir(dir,{recursive:true});
for(const question of questions){const tts=new EdgeTTS({voice:"ja-JP-NanamiNeural",lang:"ja-JP",outputFormat:"audio-24khz-96kbitrate-mono-mp3",rate:"-8%",pitch:"+0Hz",volume:"+0%",timeout:30000});await tts.ttsPromise(question.listeningScript,path.join(dir,`${question.id}.mp3`));console.log(question.id);}
