// Заполнение настоящих страниц опросников ответами симулированных респондентов.
//   node tools/playtest/render_forms.js [R01,R02,…]   → tools/playtest/out/forms/<id>_<опрос>.json (+ .png снимок итоговой главы — по --shots)
// Страница опроса из zlataya_cep/docs/feedback/ открывается как у живого участника; ответы кладутся в черновик (localStorage, как их хранит сама страница),
// дальше — штатные кнопки «Дальше →», «Отправить ответы» и «Сохранить файлом». Файл — тот самый zc-opros-v1 (answers, qa, answered, total).
const {chromium}=require('../tests/pw');
const path=require('path'),fs=require('fs');
const ROOT=path.join(__dirname,'..','..');
const ANS=path.join(__dirname,'data','answers'),OUT=path.join(__dirname,'out','forms');
fs.mkdirSync(OUT,{recursive:true});
const roster=JSON.parse(fs.readFileSync(path.join(__dirname,'data','roster.json'),'utf8'));const byId=Object.fromEntries(roster.map(r=>[r.id,r]));
const KEYS={'7-8':'7-8','9-10':'9-10','11-13':'11-13','14plus':'14plus'};
const SURVEY_ID={'7-8':'7-8','9-10':'9-10','11-13':'11-13','14plus':'14plus'};

// ---------- детские рисунки (процедурно: дрожащая линия, яркие цвета, раскраска штрихами) ----------
const DRAW_JS=`(function(){
 const mk=(seed)=>{let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};};
 window.kidDraw=function(kind,seed,age){
  const r=mk(seed),cv=document.createElement('canvas');cv.width=400;cv.height=250;const c=cv.getContext('2d');
  c.fillStyle='#fffdf6';c.fillRect(0,0,400,250);c.lineCap='round';c.lineJoin='round';
  const PAL=['#c8412b','#f28c28','#f2c705','#3f9b3a','#1d7fb8','#7b5cd6','#ff8fb3','#8a5a2b','#2b2118'];
  const wob=age<=8?3.2:age<=10?2.2:1.4;
  const J=(v)=>v+(r()-0.5)*wob*2;
  function line(pts,col,w){c.strokeStyle=col;c.lineWidth=w;c.beginPath();pts.forEach((p,i)=>{const x=J(p[0]),y=J(p[1]);i?c.lineTo(x,y):c.moveTo(x,y);});c.stroke();}
  function ell(x,y,rx,ry,col,w,fill){c.strokeStyle=col;c.lineWidth=w;c.beginPath();for(let i=0;i<=24;i++){const a=i/24*Math.PI*2+0.1;const px=x+Math.cos(a)*rx+(r()-0.5)*wob,py=y+Math.sin(a)*ry+(r()-0.5)*wob;i?c.lineTo(px,py):c.moveTo(px,py);}c.stroke();
    if(fill){c.save();c.globalAlpha=0.85;c.strokeStyle=fill;c.lineWidth=5;for(let k=-ry;k<ry;k+=5){const hw=rx*Math.sqrt(Math.max(0,1-(k*k)/(ry*ry)));c.beginPath();c.moveTo(x-hw+3,y+k+(r()-0.5)*2);c.lineTo(x+hw-3,y+k+(r()-0.5)*2);c.stroke();}c.restore();}}
  function rect(x,y,w,h,col,lw,fill){line([[x,y],[x+w,y],[x+w,y+h],[x,y+h],[x,y]],col,lw);if(fill){c.save();c.globalAlpha=0.85;c.strokeStyle=fill;c.lineWidth=5;for(let k=4;k<h;k+=5){c.beginPath();c.moveTo(x+3,y+k);c.lineTo(x+w-3,y+k+(r()-0.5)*2);c.stroke();}c.restore();}}
  const dark='#2b2118',pick=()=>PAL[Math.floor(r()*8)];
  function sun(){ell(340,45,22,22,'#f2a900',3,'#ffd34d');for(let i=0;i<8;i++){const a=i/8*6.28;line([[340+Math.cos(a)*28,45+Math.sin(a)*28],[340+Math.cos(a)*40,45+Math.sin(a)*40]],'#f2a900',3);}}
  function grass(){line([[0,220],[400,222]],'#3f9b3a',6);for(let x=10;x<400;x+=24)line([[x,222],[x+4,208]],'#3f9b3a',3);}
  function face(x,y,s){ell(x-14*s,y-5*s,4*s,4*s,dark,2);ell(x+14*s,y-5*s,4*s,4*s,dark,2);line([[x-9*s,y+10*s],[x,y+16*s],[x+9*s,y+10*s]],dark,2.5);}
  function fox(x,y){ell(x,y+55,38,34,'#e86a1c',3,'#f28c28');ell(x,y,36,30,'#e86a1c',3,'#f28c28');line([[x-30,y-20],[x-36,y-52],[x-12,y-30]],'#e86a1c',3);line([[x+30,y-20],[x+36,y-52],[x+12,y-30]],'#e86a1c',3);ell(x,y+10,16,10,'#e86a1c',2,'#fff');face(x,y,1.1);ell(x,y+4,3,3,dark,3);line([[x+34,y+62],[x+70,y+40],[x+64,y+75]],'#e86a1c',4);line([[x+48,y+45],[x+60,y+30]],'#8a5a2b',4);}
  function bear(x,y){ell(x,y+55,44,38,'#8a5a2b',3,'#a9714a');ell(x,y,38,32,'#8a5a2b',3,'#a9714a');ell(x-30,y-28,13,13,'#8a5a2b',3,'#a9714a');ell(x+30,y-28,13,13,'#8a5a2b',3,'#a9714a');ell(x,y+10,17,11,'#8a5a2b',2,'#e8c9a0');face(x,y,1.15);ell(x,y+4,4,3,dark,3);rect(x+40,y+20,26,38,'#1d7fb8',3,'#8fd3ff');}
  function owl(x,y){ell(x,y+30,40,52,'#7a5a3a',3,'#b08a5a');ell(x-15,y,15,15,'#7a5a3a',3,'#fff');ell(x+15,y,15,15,'#7a5a3a',3,'#fff');ell(x-15,y,5,5,dark,3);ell(x+15,y,5,5,dark,3);line([[x-6,y+12],[x,y+22],[x+6,y+12]],'#f2a900',4);line([[x-30,y-20],[x-24,y-40],[x-12,y-24]],'#7a5a3a',3);line([[x+30,y-20],[x+24,y-40],[x+12,y-24]],'#7a5a3a',3);line([[x-40,y+20],[x-70,y+45],[x-42,y+50]],'#7a5a3a',3);line([[x+40,y+20],[x+70,y+45],[x+42,y+50]],'#7a5a3a',3);}
  function hedge(x,y){ell(x,y+30,48,34,'#6b4a2b',3,'#8a5a2b');for(let i=-5;i<=5;i++)line([[x+i*8,y+2+Math.abs(i)*2],[x+i*10,y-18+Math.abs(i)*3]],'#4a3320',3);ell(x+48,y+40,16,13,'#6b4a2b',3,'#e8c9a0');ell(x+52,y+38,2.5,2.5,dark,3);rect(x-10,y+50,22,26,'#1d7fb8',3,'#8fd3ff');line([[x-6,y+50],[x-14,y+40]],'#1d7fb8',3);}
  function whale(x,y){ell(x,y,95,45,'#1d7fb8',3,'#4aa8d8');line([[x+88,y-10],[x+130,y-50],[x+122,y-4]],'#1d7fb8',4);line([[x-20,y-45],[x-24,y-80]],'#8fd3ff',3);line([[x-20,y-80],[x-34,y-95]],'#8fd3ff',3);line([[x-20,y-80],[x-6,y-95]],'#8fd3ff',3);ell(x-62,y-8,4,4,dark,3);line([[x-70,y+20],[x-40,y+28],[x-10,y+22]],dark,2);for(let i=0;i<3;i++)line([[x-120+i*8,y+60],[x-100+i*10,y+75]],'#8fd3ff',2);}
  function gor(x,y){ell(x,y+50,70,36,'#3f9b3a',3,'#6fbf5a');for(const dx of[-48,0,48]){line([[x+dx*0.6,y+20],[x+dx,y-40]],'#3f9b3a',8);ell(x+dx,y-52,18,15,'#3f9b3a',3,'#6fbf5a');ell(x+dx-6,y-56,3,3,dark,3);ell(x+dx+6,y-56,3,3,dark,3);line([[x+dx-6,y-44],[x+dx+6,y-44]],'#c8412b',3);}line([[x-90,y+30],[x-150,y+10],[x-120,y+50]],'#3f9b3a',4);line([[x+80,y+30],[x+140,y-20],[x+110,y+60]],'#f28c28',5);}
  function hut(x,y){rect(x-45,y,90,60,'#8a5a2b',3,'#c9954e');line([[x-55,y],[x,y-45],[x+55,y]],'#c8412b',4);rect(x-10,y+22,20,38,'#5a3a1a',3,'#8a5a2b');line([[x-30,y+60],[x-34,y+90]],'#f2a900',5);line([[x+30,y+60],[x+34,y+90]],'#f2a900',5);line([[x-34,y+90],[x-48,y+92]],'#f2a900',4);line([[x+34,y+90],[x+48,y+92]],'#f2a900',4);}
  function kolobok(x,y){ell(x,y,34,34,'#e0a31a',3,'#ffd34d');face(x,y,1.0);for(let i=0;i<6;i++)line([[x-70+i*8,y+34],[x-90+i*6,y+40]],'#8a5a2b',2);}
  function ship(x,y){line([[x-70,y],[x+70,y],[x+50,y+30],[x-50,y+30],[x-70,y]],'#8a5a2b',3);rect(x-4,y-60,8,60,'#8a5a2b',3);line([[x+4,y-58],[x+50,y-30],[x+4,y-20]],'#c8412b',4);for(let i=0;i<5;i++)line([[x-60+i*30,y+32],[x-70+i*30,y+50]],'#8fd3ff',2);}
  function tree(x,y){rect(x-8,y,16,60,'#8a5a2b',3,'#a9714a');ell(x,y-18,40,34,'#3f9b3a',3,'#6fbf5a');ell(x+12,y-6,3,3,'#c8412b',5);}
  function castle(x,y){rect(x-60,y,120,70,'#7b5cd6',3,'#b9a5f0');for(const dx of[-60,-20,20])rect(x+dx,y-22,20,22,'#7b5cd6',3,'#b9a5f0');rect(x-12,y+30,24,40,'#4a3a8a',3,'#7b5cd6');line([[x,y-22],[x,y-50]],dark,3);line([[x,y-50],[x+24,y-42],[x,y-34]],'#c8412b',4);}
  function dragon(x,y){ell(x,y,50,28,'#c8412b',3,'#ee7a5a');line([[x+40,y-10],[x+70,y-40]],'#c8412b',8);ell(x+78,y-48,16,12,'#c8412b',3,'#ee7a5a');ell(x+82,y-52,3,3,dark,3);line([[x+90,y-46],[x+110,y-40],[x+96,y-34]],'#f28c28',3);line([[x-20,y-25],[x-50,y-70],[x-5,y-30]],'#7b5cd6',4);line([[x-50,y],[x-90,y+10],[x-110,y-10]],'#c8412b',5);}
  function cat(x,y){ell(x,y+30,30,32,'#555',3,'#9a9a9a');ell(x,y-8,26,22,'#555',3,'#9a9a9a');line([[x-22,y-22],[x-24,y-42],[x-8,y-28]],'#555',3);line([[x+22,y-22],[x+24,y-42],[x+8,y-28]],'#555',3);face(x,y-5,0.9);rect(x+30,y+10,24,34,'#8a5a2b',3,'#c9954e');}
  const K=kind.split(':')[0],arg=(kind.split(':')[1]||'');
  if(K==='hero'){grass();sun();({Прошка:fox,Потап:bear,Пелагея:owl,Йоша:hedge}[arg]||fox)(170+r()*40,60+r()*20);if(r()<0.6)tree(330,130);}
  else if(K==='place'){sun();grass();({'Рыба-кит':()=>whale(200,120),'Бег с Колобком':()=>{kolobok(130,170);tree(330,130);line([[20,225],[380,225]],'#c9954e',10);},'Летучий корабль':()=>ship(200,110),'Лукоморье':()=>{tree(120,130);tree(300,140);hut(210,130);},'Штаб-сосна':()=>{tree(200,100);hut(310,150);},'Кузня Кузьмы и Демьяна':()=>{rect(120,110,160,90,'#555',3,'#9a9a9a');rect(170,130,60,70,'#c8412b',3,'#f28c28');},'Терем Кощея':()=>castle(200,100),'Сад молодильных яблок':()=>{tree(120,120);tree(260,130);},'Застава богатырей':()=>castle(200,110)}[arg]||(()=>hut(200,120)))();}
  else if(K==='add'){sun();grass();({dragon:()=>dragon(190,130),castle:()=>castle(200,110),ship:()=>ship(200,120),cat:()=>cat(200,110),gor:()=>gor(200,110),whale:()=>whale(200,120),fox:()=>fox(190,90)}[arg]||(()=>dragon(190,130)))();}
  for(let i=0;i<Math.floor(r()*3);i++)ell(30+r()*340,30+r()*60,6+r()*8,5+r()*5,pick(),2.5,r()<0.5?pick():null);
  return cv.toDataURL('image/jpeg',0.72);};
})();`;

(async()=>{
  const want=process.argv[2]&&!process.argv[2].startsWith('--')?process.argv[2].split(','):null;
  const files=fs.readdirSync(ANS).filter(f=>f.endsWith('.json')&&(!want||want.includes(f.replace('.json',''))));
  const browser=await chromium.launch();
  const dctx=await browser.newPage();await dctx.setContent('<body></body>');await dctx.evaluate(DRAW_JS);
  let done=0;
  for(const f of files){
    const d=JSON.parse(fs.readFileSync(path.join(ANS,f),'utf8'));const key=d.survey;const r=byId[d.id];
    const A=Object.assign({},d.answers);
    for(const [q,v] of Object.entries(A)){if(typeof v==='string'&&v.startsWith('__DRAW__:')){const kind=v.slice(9);A[q]=await dctx.evaluate(([k,s,a])=>window.kidDraw(k,s,a),[kind,[...d.id].reduce((x,c)=>x*31+c.charCodeAt(0),7)>>>0,r.age]);}}
    const html=path.join(ROOT,'zlataya_cep','docs','feedback','opros_'+key+'.html');
    const ctx=await browser.newContext({viewport:{width:1000,height:900},acceptDownloads:true});
    const page=await ctx.newPage();const errs=[];page.on('pageerror',e=>errs.push(e.message));
    const KEY='zc-opros-'+SURVEY_ID[key]+'-v1';
    await page.addInitScript(([KEY,A,dur])=>{try{localStorage.setItem(KEY,JSON.stringify({sec:-1,A,t0:Date.now()-dur*1000,sent:null,sentSig:null,visited:{}}));}catch(e){}},[KEY,A,d.durationSec]);
    await page.goto('file://'+html);await page.waitForTimeout(500);
    // проходим главы кнопками «Продолжить / Дальше», в конце — «Отправить ответы»
    const jsClick=sel=>page.evaluate(s=>{const e=document.querySelector(s);if(e)e.click();return !!e;},sel);   // кнопки анимированы (pulse) — обычный click ждёт «стабильности»
    for(let i=0;i<20;i++){
      if(await jsClick('[data-act="finish"]'))break;
      if(!await jsClick('button.btn.primary[data-go]'))break;await page.waitForTimeout(150);}
    await page.waitForSelector('[data-act="save"]',{timeout:8000});
    const [dl]=await Promise.all([page.waitForEvent('download'),jsClick('[data-act="save"]')]);
    const tmp=await dl.path();const payload=JSON.parse(fs.readFileSync(tmp,'utf8'));
    payload.simulated=true;
    payload.respondent={id:d.id,group:r.group,age:r.age,role:r.role,mode:r.mode,pair:r.pair,partner:r.partner||null,path:r.path,input:r.input};
    payload.note='СИМУЛЯЦИЯ: ответы построены моделью по телеметрии ботов (tools/playtest), это не данные живых участников';
    fs.writeFileSync(path.join(OUT,d.id+'_'+key+'.json'),JSON.stringify(payload,null,1));
    if(process.argv.includes('--shots')){await page.screenshot({path:path.join(OUT,d.id+'_'+key+'.png')});}
    if(errs.length)console.log(d.id,'PAGEERRORS',errs.slice(0,3));
    console.log(d.id,key,'ответов',payload.answered,'из',payload.total,'(',Math.round(100*payload.answered/payload.total)+'%)');
    await ctx.close();done++;
  }
  await browser.close();console.log('готово',done);
})();
