//@@ wait=300
ZC.start();ZC.G.manual=true;ZC.tick(2);'start'
//@@ key=Space wait=1200
PR.audInit()+' '+JSON.stringify(Object.keys(ZC.FIN.music.TR).length)
//@@ wait=300
ZC.startFrom(ZC.LV('luko'));ZC.G.manual=true;ZC.tick(30);'AC='+PR.audInit()+' names='+JSON.stringify(PR.names().mus)
//@@
(async()=>{const sleep=ms=>new Promise(r=>setTimeout(r,ms));const out=[];
  const run=async(name,f,ms)=>{PR.audReset();try{f();}catch(e){out.push([name,'ERR '+e.message]);return;}await sleep(ms);out.push([name,PR.audGet()]);};
  // тишина
  await run('silence',()=>{},600);
  // музыка: все темы по 5 с
  for(const n of PR.names().mus){await run('mus:'+n,()=>PR.musPlay(n),5200);PR.musPlay(null);await sleep(500);}
  PR.musPlay(null);await sleep(600);
  return JSON.stringify(out);})()
//@@
(async()=>{const sleep=ms=>new Promise(r=>setTimeout(r,ms));const out=[];
  const run=async(name,f,ms)=>{PR.audReset();try{f();}catch(e){out.push([name,'ERR '+e.message]);return;}await sleep(ms);out.push([name,PR.audGet()]);};
  // базовые SFX
  for(const k of PR.names().sfx){if(typeof PR.sfxs[k]!=='function')continue;if(/music|stop|mute/i.test(k))continue;await run('sfx:'+k,()=>PR.sfxs[k](),1300);}
  // боссовые синтез-звуки
  await run('3B свист белая 1500→2200 v.13',()=>PR.t(1500,0.6,'sine',0.13,2200),1000);
  await run('3B свист синяя 900→400',()=>PR.t(900,0.6,'sine',0.13,400),1000);
  await run('3B фиолет 520→260',()=>PR.t(520,0.6,'sine',0.13,260),1000);
  await run('3B большая 600→400',()=>PR.t(600,0.6,'sine',0.13,400),1000);
  await run('4B рык',()=>PR.snd.g4roar(),3200);
  await run('4B rumble',()=>PR.snd.g4rumble(),3200);
  await run('2B рык',()=>PR.snd.k2roar(),3000);
  for(const w of['koschei','leshy','vod','solovei','likho','gorM'])await run('babble:'+w,()=>PR.babble(w,'Опять заблудились? Ну-ка, где я? Довольно сказок!'),2500);
  return JSON.stringify(out);})()
//@@
(async()=>{const sleep=ms=>new Promise(r=>setTimeout(r,ms));const out=[];
  const run=async(name,f,ms)=>{let r;try{r=await f();}catch(e){out.push([name,'ERR '+e.message]);return;}await sleep(ms);out.push([name,r,PR.audGet()]);};
  // голоса: заглянуть в строки боссов (озвучка — на уровне, загруженном в память: сперва подготовка)
  const ids=['5-B2_k20','5-B2_k27','5-B2_k13','5-B2_k23','5-B2_k15','5-B2_k29','5-B2_015','4-B_023','4-B_001','4-B_010','3-B_001','3-B_005','2-B_001','1-B_007','1-B_008','5-B1_004','5-B2_002','5-B2_003','luko_050'];
  for(const id of ids){await run('vox:'+id,()=>PR.voxPlay(id),4200);}
  return JSON.stringify(out);})()
