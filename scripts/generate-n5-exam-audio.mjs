import {readFile,mkdir,mkdtemp,rm,writeFile} from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import {EdgeTTS} from "node-edge-tts";
import ts from "typescript";
const baseQuestions=JSON.parse(await readFile(path.join(process.cwd(),"src/data/mock-n5-questions.json"),"utf8"));
const fullMockSource=await readFile(path.join(process.cwd(),"src/data/n5-full-mock-questions.ts"),"utf8");
const compiled=ts.transpileModule(fullMockSource,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
const moduleRecord={exports:{}};
const localRequire=(id)=>{if(id==="@/data/mock-n5-questions.json")return baseQuestions;throw new Error(`Unsupported generator import: ${id}`);};
new Function("require","module","exports",compiled)(localRequire,moduleRecord,moduleRecord.exports);
const questions=moduleRecord.exports.n5FullMockQuestions.filter((question)=>question.category==="Listening");
if(process.argv.includes("--check")){
  const all=moduleRecord.exports.n5FullMockQuestions;
  const counts=Object.fromEntries(["Vocab","Grammar","Reading","Listening"].map(category=>[category,all.filter(question=>question.category===category).length]));
  const invalid=all.filter(question=>question.options.length!==4||!question.options.includes(question.correctAnswer)).map(question=>question.id);
  console.log(JSON.stringify({total:all.length,counts,invalid},null,2));
  process.exit(invalid.length?1:0);
}
const dir=path.join(process.cwd(),"public/audio/n5");await mkdir(dir,{recursive:true});
const voices={narrator:"ja-JP-NanamiNeural",female:"ja-JP-NanamiNeural",male:"ja-JP-KeitaNeural"};
async function synthesize(text,file,voice){const tts=new EdgeTTS({voice,lang:"ja-JP",outputFormat:"audio-24khz-96kbitrate-mono-mp3",rate:"-8%",pitch:"+0Hz",volume:"+0%",timeout:30000});await tts.ttsPromise(text,file);}
for(const question of questions){
  const readsChoices=question.itemType.includes("発話表現")||question.itemType.includes("即時応答");
  const choiceAudio=readsChoices?question.options.map((option,index)=>`${index+1}ばん。${option}。`).join(" "):"";
  const turns=question.listeningTurns??[{speaker:"narrator",text:`${question.listeningScript}。 ${choiceAudio}`}];
  const tempDir=await mkdtemp(path.join(os.tmpdir(),"manabu-n5-audio-"));
  try{
    const segments=[];
    for(let index=0;index<turns.length;index+=1){
      const turn=turns[index];
      const segmentPath=path.join(tempDir,`${String(index).padStart(2,"0")}.mp3`);
      await synthesize(turn.text,segmentPath,voices[turn.speaker]);
      const segment=await readFile(segmentPath);
      segments.push(segment);
      if(question.listeningTurns){
        await writeFile(path.join(dir,`${question.id}.part-${String(index+1).padStart(2,"0")}.mp3`),segment);
      }
    }
    if(!question.listeningTurns){
      await writeFile(path.join(dir,`${question.id}.mp3`),Buffer.concat(segments));
    }
  }finally{await rm(tempDir,{recursive:true,force:true});}
  console.log(question.id);
}
