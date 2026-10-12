/* ============================== МИР 4 · СЮЖЕТ: ГОРЫНЫЧ НАД МИРОМ, ДУГА ПЕЛАГЕИ (docs/39, СЮ.1, СЮ.4) ============================== */
// Горыныч нависает над миром: 4-1 — рык из-за реки во вступлении (метка ролика в late_86_cine_direction.js → W4S.farRoar),
// 4-2 — силуэт над лавопадом, 4-3 — дым на горизонте (proto/levels/4-2.js, 4-3.js, gorSilhouette — w4_common.js), 4-4 — Демьян: «валы на Змее пахали».
// Дуга Пелагеи: 4-1 шепчет, 4-3 читает громко (запись чуть громче — gain), 4-5 закрывает тетрадку («Потап, беги — я вижу целые доски!»),
// 4-Б — сама командует в бою: начало этапа 2, первая сытая голова, этап 3 (после урока, не поверх ролика). FIN.w4story — для ботов.
const W4S={said:{},log:[]};FIN.w4story=W4S;
W4S.farRoar=()=>{W4S.log.push('roar');if(!AUD.ready())return;[58,65,87].forEach((f,i)=>AUD.osc({type:'sawtooth',f0:f,f1:f*1.3,glide:0.5,d:2.4,v:0.04,a:0.25,lp:380,lp1:900,trem:19+i*5,vib:0.03,vibF:5,wet:0.7,at:i*0.03}));};
{const CMD=[['p2',()=>W.flags.phase===2,'Потап — щит! Прошка — жёлудь в пасть!'],
    ['sat',()=>W.flags.phase===2&&W.enemies.some(e=>e.alive&&e.sat>0),'Йоша, сытую голову — водой!'],
    ['p3',()=>W.flags.phase===3,'Узду — вдвоём! Раз-два-три!']];
  const L=()=>FIN.lesson&&FIN.lesson.on;
  {const _ll=loadLevel;loadLevel=function(i){_ll(i);W4S.said={};W4S.calm=0;};}
  {const _st=step;step=function(dt){_st(dt);if(!W||W.levelId!=='4-B'||G.state!=='play')return;W4S.calm=G.cine||L()?0:(W4S.calm||0)+dt;if(W4S.calm<1.5)return;
    for(const[id,cond,text]of CMD){if(W4S.said[id])continue;let ok=false;try{ok=cond();}catch(e){}if(!ok)continue;
      W4S.said[id]=true;W4S.calm=0;W4S.log.push(id);bark(HERO.pelageya,'pelageya',text,2.8);break;}};}}
