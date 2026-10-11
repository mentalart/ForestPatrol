/* ============================== РЕЛИЗ final06 · 3-1 «САД МОЛОДИЛЬНЫХ ЯБЛОК»: РЕЖИССУРА РОЛИКОВ ============================== */
// Ролики 3-1 поставлены заново (сами сцены — в late_99p_sky31.js, здесь — общий слой и звук). Ролик с def.d31 = true:
//  · шоты S31(t,p,l,o): кроме позы и проезда по сплайну (o.p2/o.l2/o.dur) — движение камеры o.move ('push'|'pull'|'crane'|'truck'|'orbit'|'none')
//    с силой o.amp, склейка o.tr ('cut'|'whip'|'dip'), поправка угла o.fov, слежение o.trk(pose,u,t) — камера ведёт движущееся
//    (птицу в полёте, падающий ключ, пикирующего Ворона); помощники C31.look/follow/orbit/two;
//  · автоматические врезки крупных планов (late_82) в этих роликах выключены — кадр выбран вручную под каждую реплику:
//    говорящего видно в лицо, слушатели повёрнуты к нему;
//  · def.cues31 — метки только для показа (эмоции, тряска, замедление, искры, звук): при пропуске ролика не срабатывают;
//  · S31snd — звук сцен (синтез AUD из late_81): Жар-птица, перья, ключ, превращения, Ворон, ворота, финальная фанфара.
//    Звуки привязаны к меткам и к событиям CINE ('cut' — лёгкий «вжух» на склейке ролика 3-1).
const C31={};FIN.cine31=C31;
function S31(t,p,l,o){o=o||{};return {t,p,l,p2:o.p2,l2:o.l2,dur:o.dur,cut:o.cut,x31:o};}
{const _pr=prepShots;prepShots=function(def,key){const sh=_pr(def,key);if(def&&def.d31)(def.shots||[]).forEach((src,i)=>{const o=src.x31,s=sh[i];if(!o||!s)return;
    if(o.move)s.move=o.move;if(o.amp!=null)s.amp=o.amp;if(o.tr&&i>0)s.tr=o.tr;if(o.size)s.size=o.size;s.trk=o.trk||null;s.fovD=o.fov||0;});return sh;};}
{const _bp=basePose;basePose=function(s,t,out){_bp(s,t,out);if(s.trk){try{s.trk(out,clamp((t-s.t)/s.len,0,1),t);}catch(e){console.error(e);s.trk=null;}}if(s.fovD)out.fov+=s.fovD;return out;};}
{const _dir=CINE.direct;CINE.direct=function(cd){const d=cd&&cd.def;if(!d||!d.d31)return _dir(cd);cd.directed=true;cd.inserts=false;cd.cover=[];if(d.calm)cd.calm=true;
    const m=d.mood31||['#ffc890',0.07];CINE.mood(m[0],m[1]);cd.cues=(d.cues31||[]).map(([t,fn])=>({t,fn})).sort((a,b)=>a.t-b.t);cd.ci=0;};}
// слежение: смотреть на движущееся (вес w), ехать за ним, облёт вокруг, кадр на двоих
C31.look=(fn,w)=>(pose,u)=>{const p=fn();if(p)pose.look.lerp(p,w==null?1:w);};
C31.follow=(fn,off,lk,k)=>(pose,u)=>{const p=fn();if(!p)return;const w=k==null?1:k;pose.pos.lerp(p.clone().add(off),w);pose.look.lerp(p.clone().add(lk||new V3()),w);};
C31.orbit=(fn,r,h,a0,a1,lkY,ease)=>(pose,u)=>{const c=fn();if(!c)return;const e=(ease||CINE.E.inOutSine)(u),a=lerp(a0,a1,e);pose.pos.set(c.x+Math.sin(a)*r,c.y+h,c.z+Math.cos(a)*r);pose.look.set(c.x,c.y+(lkY||0),c.z);};
C31.two=(fa,fb,w)=>(pose)=>{const a=fa(),b=fb();if(!a||!b)return;pose.look.lerp(a.clone().add(b).multiplyScalar(0.5),w==null?1:w);};
C31.head=(o,dy)=>()=>{if(!o)return null;if(o.pos&&o.d)return new V3(o.pos.x,o.pos.y+o.d.height*0.78+(dy||0),o.pos.z);const g=o.head||o.g;const p=g.getWorldPosition(new V3());p.y+=dy||0;return p;};
C31.at=(o,dy)=>()=>{const g=o.g||o;const p=g.getWorldPosition?g.getWorldPosition(new V3()):g.clone();p.y+=dy||0;return p;};
// герои: повернуться к точке, к камере; эмоция
C31.face=(h,p)=>{if(h&&p)h.face=Math.atan2(p.x-h.pos.x,p.z-h.pos.z);};
C31.faceAll=(p,list)=>{(list||HEROES).forEach(h=>C31.face(h,p));};
C31.emo=(who,type,delay)=>()=>{const h=HERO[who];if(h&&h.g.visible)ACT.emote(h,type,delay);else{const n=npcByWho(who);if(n)n.em={type:type==='fear'?'surprise':type,t:0,d:0.8};}};
C31.all=(type,st)=>()=>ACT.emoteAll(type,null,st==null?0.09:st);
// ---------- звук сцен ----------
const S31snd={
  ok:()=>typeof AUD!=='undefined'&&AUD.ready&&AUD.ready(),
  // Жар-птица: старая — грустное «курлы» вниз; молодая — звонкая трель вверх
  sadCoo(at){if(!S31snd.ok())return;AUD.osc({type:'sine',f0:740,f1:520,d:0.5,v:0.05,a:0.05,at,vib:0.02,vibF:7,wet:0.45});AUD.osc({type:'sine',f0:620,f1:430,d:0.6,v:0.045,a:0.05,at:(at||0)+0.42,vib:0.02,vibF:6,wet:0.45});},
  trill(at){if(!S31snd.ok())return;for(let i=0;i<6;i++)AUD.osc({type:'sine',f0:1300+i*140,f1:1700+i*160,d:0.09,v:0.04,a:0.005,at:(at||0)+i*0.07,wet:0.4});AUD.bell(2093,{v:0.03,d:0.9,at:(at||0)+0.45,wet:0.6});},
  // перо: мягкий взмах и огонёк-колокольчик
  feather(at,pan){if(!S31snd.ok())return;AUD.nz({type:'highpass',f0:1200,f1:4200,d:0.4,v:0.05,a:0.08,at,pan0:pan||0,pan1:-(pan||0),wet:0.3});AUD.bell(1568,{v:0.035,d:0.9,at:(at||0)+0.35,wet:0.6});},
  catchF(at){if(!S31snd.ok())return;AUD.osc({type:'triangle',f0:880,f1:1320,d:0.18,v:0.05,at,glide:0.12,wet:0.3});AUD.bell(2637,{v:0.025,d:0.7,at:(at||0)+0.1});},
  // ключ: ледяной блик, падение со свистом и далёкий «дзынь» внизу
  icy(at){if(!S31snd.ok())return;AUD.bell(2637,{v:0.04,d:1.4,at,wet:0.8});AUD.bell(3520,{v:0.025,d:1.1,at:(at||0)+0.08,wet:0.8});AUD.nz({type:'highpass',f0:6000,f1:9000,d:0.5,v:0.02,at,wet:0.5});},
  keyFall(at){if(!S31snd.ok())return;AUD.osc({type:'sine',f0:1900,f1:240,d:1.6,v:0.045,a:0.03,at,glide:1.6,wet:0.4});AUD.bell(1175,{v:0.018,d:1.4,at:(at||0)+1.9,wet:0.9});},
  // яблоко-видение: золотой аккорд; посерело — фальшивое «вау-вау» вниз
  appleGlow(at){if(!S31snd.ok())return;[523,659,784].forEach((f,i)=>AUD.bell(f*2,{v:0.03,d:1.4,at:(at||0)+i*0.09,wet:0.6}));},
  appleSad(at){if(!S31snd.ok())return;AUD.osc({type:'triangle',f0:440,f1:330,d:0.4,v:0.05,at,vib:0.03,vibF:5,wet:0.3});AUD.osc({type:'triangle',f0:330,f1:220,d:0.7,v:0.05,at:(at||0)+0.38,vib:0.04,vibF:5,wet:0.3});},
  // превращение: искристое глиссандо вверх и «пуф»
  magic(at,base){if(!S31snd.ok())return;const b=base||523;[1,1.25,1.5,2,2.5,3].forEach((m,i)=>AUD.bell(b*m,{v:0.03,d:0.9,at:(at||0)+i*0.11,wet:0.6}));AUD.nz({type:'highpass',f0:2500,f1:8000,d:1.0,v:0.025,a:0.3,at,wet:0.5});},
  poof(at){if(!S31snd.ok())return;AUD.nz({type:'lowpass',f0:2400,f1:300,d:0.45,v:0.09,a:0.01,at,wet:0.2});AUD.osc({type:'sine',f0:320,f1:900,d:0.25,v:0.05,at:(at||0)+0.05,wet:0.3});},
  bite(at){if(!S31snd.ok())return;for(let i=0;i<3;i++)AUD.nz({type:'bandpass',f0:2600-i*300,d:0.06,v:0.08,q:2,a:0.003,at:(at||0)+i*0.07});},
  creak(at){if(!S31snd.ok())return;AUD.osc({type:'sawtooth',f0:95,f1:70,d:1.1,v:0.035,at,vib:0.08,vibF:11,lp:700,wet:0.3});AUD.nz({type:'bandpass',f0:500,f1:900,d:1.0,v:0.03,q:4,at,wet:0.2});},
  thud(at,v){if(!S31snd.ok())return;AUD.osc({type:'sine',f0:120,f1:45,d:0.35,v:v||0.12,a:0.004,at});AUD.nz({type:'lowpass',f0:900,f1:200,d:0.25,v:0.06,at});},
  steps(at,n,gap){if(!S31snd.ok())return;for(let i=0;i<(n||4);i++)AUD.nz({type:'lowpass',f0:700,f1:300,d:0.14,v:0.035,a:0.01,at:(at||0)+i*(gap||0.28),wet:0.25});},
  puff(at){if(!S31snd.ok())return;AUD.nz({type:'lowpass',f0:1400,f1:500,d:0.3,v:0.04,a:0.03,at,wet:0.4});},
  // Ворон: хриплое «кар-р», взмахи крыльев, угрожающий аккорд
  caw(at,big){if(!S31snd.ok())return;const v=big?0.07:0.05;for(let i=0;i<(big?2:1);i++){const a=(at||0)+i*0.32;AUD.osc({type:'sawtooth',f0:560,f1:360,d:0.26,v,a:0.01,at:a,vib:0.05,vibF:28,lp:1800,wet:0.35});AUD.nz({type:'bandpass',f0:1100,f1:700,d:0.24,v:v*0.7,q:2.5,at:a,wet:0.3});}},
  flaps(at,n,gap){if(!S31snd.ok())return;for(let i=0;i<(n||3);i++)AUD.nz({type:'lowpass',f0:600,f1:180,d:0.18,v:0.07,a:0.02,at:(at||0)+i*(gap||0.24),wet:0.2});},
  menace(at){if(!S31snd.ok())return;[110,131,156].forEach((f,i)=>AUD.osc({type:'sawtooth',f0:f,d:1.6,v:0.03,a:0.12,at:(at||0)+i*0.05,lp:600,lp1:300,wet:0.4}));AUD.osc({type:'sine',f0:55,d:1.4,v:0.08,a:0.05,at});},
  sting(at){if(!S31snd.ok())return;AUD.osc({type:'square',f0:330,f1:311,d:0.25,v:0.03,at,lp:1500});AUD.osc({type:'square',f0:247,f1:233,d:0.4,v:0.03,at:(at||0)+0.22,lp:1500});},
  peep(at){if(!S31snd.ok())return;AUD.osc({type:'square',f0:1900,f1:2400,d:0.08,v:0.025,at,lp:4000});AUD.osc({type:'square',f0:2000,f1:2600,d:0.09,v:0.025,at:(at||0)+0.14,lp:4000});},
  // героям хорошо: короткая «ура»-фраза; финал — колокольная фанфара
  yay(at){if(!S31snd.ok())return;[784,988,1175,1568].forEach((f,i)=>AUD.osc({type:'triangle',f0:f,d:0.22,v:0.04,at:(at||0)+i*0.08,wet:0.3}));},
  fanfare(at){if(!S31snd.ok())return;const a=at||0;[[523,0],[659,0.12],[784,0.24],[1047,0.4]].forEach(([f,d])=>{AUD.osc({type:'triangle',f0:f,d:0.5,v:0.05,at:a+d,wet:0.4});AUD.bell(f*2,{v:0.025,d:1.2,at:a+d,wet:0.6});});
    [523,659,784,1047].forEach(f=>AUD.osc({type:'triangle',f0:f,d:1.6,v:0.03,a:0.05,at:a+0.62,wet:0.6,vib:0.006}));}};
FIN.snd31=S31snd;
// склейки в роликах 3-1 — лёгкий воздушный «вжух» (whip и затемнение озвучивает late_85)
CINE.on('cut',d=>{const cd=CINE.CD&&CINE.CD();if(!cd||!cd.def||!cd.def.d31||d.type!=='cut'||!S31snd.ok())return;AUD.nz({type:'bandpass',f0:900,f1:2400,d:0.16,v:0.018,q:0.8,a:0.02,wet:0.2});});
