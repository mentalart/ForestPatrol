// План озвучки: node tools/voice/plan.js реплики.json [--batches DIR]
// Берёт вывод extract.js и дополняет каталог zlataya_cep/build/voice/lines.json: новые реплики персонажей (ремарки без
// говорящего не озвучиваются) — с номером, текстом для голоса (ремарки в скобках → подсказки интонации ElevenLabs), уровнем
// и пределом длины (в ролике — время до следующей реплики). Уже озвученные реплики не трогает. С --batches пишет пачки
// запросов к Eleven v4 (по 10) для реплик без записи: DIR/batch_NNN.json — [{index, params}] для generate_audio_batch.
const fs=require('fs'),path=require('path');
const CAT=path.join(__dirname,'..','..','zlataya_cep','build','voice','lines.json');
const arg=k=>{const i=process.argv.indexOf(k);return i<0?null:process.argv[i+1];};
const X=JSON.parse(fs.readFileSync(process.argv[2],'utf8')),D=JSON.parse(fs.readFileSync(CAT,'utf8'));
const key=(who,text)=>(who||'-')+'|'+String(text).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
// ремарка в скобках → подсказка интонации (не произносится), остальные скобки просто убираются
const DIR=[[/шёпот|шепч|на ухо|еле слышно/,'whispers'],[/вполголоса|тихо|тихонько|негромко|ласково/,'softly'],[/фырка/,'scoffs'],
  [/смеёт|хохоч|хихика|смеясь|со смехом/,'laughs'],[/вздых|со вздохом/,'sighs'],[/крич|орёт|громко|во весь голос|кричит/,'shouting'],
  [/поёт|напева|нараспев/,'sings'],[/зева|сонно|сквозь сон|спросонья/,'sleepy'],[/плач|всхлип/,'crying'],[/испуган|дрожа/,'scared'],
  [/гордо/,'proudly'],[/ворч|недовольн|сердит/,'annoyed'],[/удивл/,'surprised'],[/радостно|весело/,'happy'],[/с набитым ртом/,'mumbling']];
function tts(text){let tag=null,far=false;
  let t=String(text).replace(/<i>\s*\(([^)]*)\)\s*<\/i>/g,(m,d)=>{d=d.toLowerCase();if(/издалека/.test(d))far=true;for(const [re,tg] of DIR)if(!tag&&re.test(d))tag=tg;return ' ';});
  t=t.replace(/\(([^)]*)\)/g,(m,d)=>{d=d.toLowerCase();for(const [re,tg] of DIR)if(!tag&&re.test(d))tag=tg;return ' ';});
  if(/♪/.test(t)&&!tag)tag='sings softly';
  t=t.replace(/<[^>]*>/g,'').replace(/♪/g,'').replace(/\s+/g,' ').trim();
  if(!/[А-Яа-яЁёA-Za-z]/.test(t))return null;return {tts:(tag?'['+tag+'] ':'')+t,far};}
// предел длины: в ролике — до следующей реплики (или конца ролика), иначе — длина субтитра + секунда
function maxOf(e){if(e.src==='cine'&&e.gap)return Math.max(0.8,+(e.gap-0.08).toFixed(2));return +((e.d||2.6)+1).toFixed(2);}
const have=new Map(D.lines.map(e=>[key(e.who,e.text),e]));const seen=new Map();
for(const e of X.lines){if(e.who===null||e.who==='all'||!D.cast[e.who])continue;const k=key(e.who,e.text);
  if(have.has(k)){const h=have.get(k);if(!h.url&&e.src==='cine'&&e.gap)h.max=Math.min(h.max||99,maxOf(e));continue;}
  const s=seen.get(k);if(s){s.max=Math.min(s.max,maxOf(e));if(!s.lv&&e.lv)s.lv=e.lv;continue;}
  const v=tts(e.text);if(!v)continue;const o={id:null,lv:e.lv||'g',who:e.who,text:e.text,tts:v.tts,max:maxOf(e)};if(v.far){o.fx='far';o.gain=0.7;}seen.set(k,o);}
// номера: <уровень>_<nnn> по порядку в коде
const cnt={};for(const e of D.lines){const m=/^(.+)_(\d+)$/.exec(e.id);if(m)cnt[m[1]]=Math.max(cnt[m[1]]||0,+m[2]);}
for(const o of seen.values()){const lv=o.lv.replace(/[^\w-]/g,'');cnt[lv]=(cnt[lv]||0)+1;o.id=lv+'_'+String(cnt[lv]).padStart(3,'0');D.lines.push(o);}
fs.writeFileSync(CAT,JSON.stringify(D,null,1)+'\n');
const todo=D.lines.filter(e=>!e.url);console.log('каталог:',D.lines.length,'реплик, новых:',seen.size,'без записи:',todo.length,
  'символов:',todo.reduce((a,e)=>a+e.tts.length,0));
const B=arg('--batches');if(B){fs.mkdirSync(B,{recursive:true});for(const f of fs.readdirSync(B))if(/^batch_/.test(f))fs.rmSync(path.join(B,f));
  for(let i=0;i<todo.length;i+=10){const reqs=todo.slice(i,i+10).map((e,j)=>{const c=D.cast[e.voice||e.who];
      return {index:i+j,params:{model:'elevenlabs_v4',prompt:e.id,dialogue:[{text:e.tts,voice_id:c.voice_id,voice_type:'preset'}]}};});
    fs.writeFileSync(path.join(B,'batch_'+String(i/10+1).padStart(3,'0')+'.json'),JSON.stringify(reqs));}
  console.log('пачек:',Math.ceil(todo.length/10));}
