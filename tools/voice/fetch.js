// Озвучка реплик: скачать готовые записи и подготовить их для сборки.
//   node tools/voice/fetch.js [--only id,id] [--keep]
// Берёт zlataya_cep/build/voice/lines.json: у каждой реплики — url записи (результат генерации Eleven v4 в Higgsfield, поле url).
// Скачивает запись в tools/voice/raw/<id>.<ext> (папка не в git), затем ffmpeg: обрезает тишину по краям, сдвигает тон голоса персонажа
// (cast.<голос>.pitch, полутона; тон меняется без изменения темпа), ускоряет, если реплика длиннее max (не больше чем в 1,2 раза),
// обработка fx (far — издалека: без низов и верхов, эхо; zven — звонкий перелив), громкость по EBU R128 (−16 LUFS),
// MP3 моно 48 кбит/с, 24 кГц → zlataya_cep/build/voice/<id>.mp3 (готовые файлы пропускаются; --force — переделать все), длительность → поле dur. После — python3 zlataya_cep/build/build_final.py.
const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process');
const ROOT=path.join(__dirname,'..','..'),VD=path.join(ROOT,'zlataya_cep','build','voice'),RAW=path.join(__dirname,'raw');
const FF=process.env.FFMPEG||'/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2';
const arg=k=>{const i=process.argv.indexOf(k);return i<0?null:process.argv[i+1];};
const ONLY=(arg('--only')||'').split(',').filter(Boolean);
const CAT=path.join(VD,'lines.json'),D=JSON.parse(fs.readFileSync(CAT,'utf8'));
fs.mkdirSync(RAW,{recursive:true});
const ff=(args)=>execFileSync(FF,['-hide_banner','-y',...args],{stdio:['ignore','pipe','pipe']});
const dur=f=>{let out='';try{execFileSync(FF,['-hide_banner','-i',f,'-f','null','-'],{stdio:['ignore','pipe','pipe']});}catch(e){out=String(e.stderr||'');}
  if(!out){const r=require('child_process').spawnSync(FF,['-hide_banner','-i',f,'-f','null','-']);out=String(r.stderr);}
  const m=[...out.matchAll(/time=(\d+):(\d+):([\d.]+)/g)].pop();return m?(+m[1])*3600+(+m[2])*60+(+m[3]):0;};
const FX={far:'highpass=f=320,lowpass=f=3000,aecho=0.8:0.6:70|140:0.32|0.18',
  zven:'aecho=0.8:0.55:23|41:0.28|0.2,chorus=0.6:0.85:28|36:0.35|0.3:0.3|0.45:1.6|2.1,treble=g=3:f=5000',
  wood:'aecho=0.8:0.5:40|75:0.25|0.15,lowpass=f=5200',                                    // Леший: скрип и гулкий лес
  water:'chorus=0.6:0.8:45|60:0.3|0.25:0.35|0.45:0.6|0.9,lowpass=f=3800,aecho=0.8:0.4:55:0.2', // Водяной: из-под воды
  dark:'aecho=0.8:0.7:90|180:0.35|0.2,lowpass=f=4000',                                    // Лихо: тёмное эхо
  dragon:'aecho=0.8:0.55:35|70:0.3|0.2,bass=g=4',                                         // головы Горыныча: раскатисто
  magic:'aecho=0.8:0.5:30|55:0.25|0.18,chorus=0.5:0.8:25|33:0.3|0.25:0.3|0.4:1.4|1.9,treble=g=2', // волшебные голоса
  hall:'aecho=0.8:0.45:60|110:0.18|0.1',                                                  // Кощей: холодный зал
  crone:'vibrato=f=5.5:d=0.12'};                                                          // Баба Яга: старческое дрожание
const TRIM='silenceremove=start_periods=1:start_threshold=-42dB:start_silence=0.03,areverse,silenceremove=start_periods=1:start_threshold=-42dB:start_silence=0.06,areverse';
const FORCE=process.argv.includes('--force');let done=0;
for(const e of D.lines){if(ONLY.length&&!ONLY.includes(e.id))continue;if(!e.url){continue;}
  if(!FORCE&&!ONLY.length&&e.dur&&fs.existsSync(path.join(VD,e.id+'.mp3')))continue;   // готовые не переделываем (--force — все)
  if(!/^[\w-]+$/.test(String(e.id)))throw new Error('недопустимый id в lines.json: '+e.id);   // id идёт в имена файлов: без ../ и разделителей
  const ext=(e.url.match(/\.(mp3|wav|ogg|m4a)(\?|$)/)||[,'mp3'])[1],raw=path.join(RAW,e.id+'.'+ext);
  // только https (и после перенаправлений): url из lines.json не должен читать локальные файлы (file://) и не может стать опцией curl (--)
  if(!fs.existsSync(raw)){execFileSync('curl',['-sSfL','--proto','=https','--proto-redir','=https','-m','60','-o',raw,'--',e.url]);}
  const who=e.voice||e.who,c=D.cast[who]||{},p=+c.pitch||0,r=Math.pow(2,p/12);
  // 1) обрезка и сдвиг тона — во временный wav, чтобы узнать длину
  const tmp=path.join(RAW,e.id+'.tmp.wav');
  const pitch=p?`,aresample=44100,asetrate=${(44100*r).toFixed(1)},aresample=44100,atempo=${(1/r).toFixed(5)}`:'';
  ff(['-i',raw,'-af',`aresample=44100,${TRIM}${pitch}`,'-ac','1',tmp]);
  let d0=dur(tmp),tempo=1;if(e.max&&d0>e.max)tempo=Math.min(1.2,d0/e.max);
  const fx=e.fx||c.fx;const chain=[tempo>1.001?`atempo=${tempo.toFixed(4)}`:null,fx?FX[fx]:null,'loudnorm=I=-16:TP=-1.5:LRA=11','aresample=24000'].filter(Boolean).join(',');
  const out=path.join(VD,e.id+'.mp3');ff(['-i',tmp,'-af',chain,'-ac','1','-ar','24000','-c:a','libmp3lame','-b:a','48k',out]);done++;fs.rmSync(tmp);
  e.dur=+dur(out).toFixed(2);console.log(`${e.id}  ${who}  pitch ${p>=0?'+':''}${p}  ${d0.toFixed(2)}s${tempo>1.001?' ×'+tempo.toFixed(2):''} → ${e.dur}s${e.max&&e.dur>e.max+0.05?'  (длиннее max '+e.max+')':''}`);}
fs.writeFileSync(CAT,JSON.stringify(D,null,1)+'\n');console.log('готово записей:',done);
if(!process.argv.includes('--keep'))fs.rmSync(RAW,{recursive:true,force:true});
