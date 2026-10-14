/* ============================== РЕЛИЗ final06 · «ПРИСКАЗКА» — ВСТУПИТЕЛЬНЫЙ РОЛИК ИГРЫ (2): СЕМЬ СЦЕН ============================== */
// Сценарий — zlataya_cep/docs/42_priskazka_intro.md (шоты 1-1…7-3), площадки — late_96f_intro_sets.js.
// Запуск: «Кто играет?» → «Начать сказку!» (FIN.introWant) → пролог грузится, и вместо игры сразу идут семь роликов (def.kino,
// правила — docs/40_kino_pravila.md), каждый ≤ 25 с; конец последнего — комната пролога, игра. Пропуск любого ролика пропускает
// всю «Присказку» (PRK.skipped) — пролог в том же состоянии, что и без неё. Повтор — «Главы» → «Присказка».
// Озвучки новых реплик пока нет (Higgsfield из облачной сессии недоступен): реплики в кадре звучат «голоском» (babble), рассказ
// Кота — субтитрами. Тексты для записи — tools/voice/pending/intro.json; появится запись в voice/lines.json — зазвучит сама.
const PRK_T=HERO;
const prLA=(x,y,z)=>prA(PRO.L,x,y,z),prPA=(x,y,z)=>prA(PRO.P,x,y,z),prWA=(k,x,y,z)=>prA(PRO[k],x,y,z);
const prkV=a=>PRV(a[0],a[1],a[2]);
const prkWP=o=>o.getWorldPosition(new V3());
// озвучка: id → текст (то же, что в pending/intro.json); vo — голос за кадром (Кот-рассказчик), в кадре его нет
const PRK_LINES={};
function prkSay(t,dur,who,text,vo){return [t,dur,who,text,!!vo];}
// ---------- звук ----------
const PSN=KSND,psfx=n=>()=>{try{SFX[n]();}catch(e){}};
function prkMot(inst,notes,spb,vol,delay){try{if(!AC||!FIN.music||!FIN.music.inst)return;const I=FIN.music.inst,t0=AC.currentTime+(delay||0);let t=t0;
  for(const[m,b]of notes){if(m!==null)I[inst](FIN.music.hz(m),t,b*spb*0.95,vol);t+=b*spb;}}catch(e){}}
{const TR=FIN.music.TR;
  TR.prk_night={bpm:60,root:50,sc:'aeo',len:16,v:[{i:'drone',drone:[0],oct:-12,vol:0.035},{i:'harp',arp:[0,5],per:8,pat:[0,4,7,4],st:1,oct:0,vol:0.03}]};
  TR.prk_kosh={bpm:56,root:45,sc:'phr',len:16,v:[{i:'drone',drone:[0],oct:-12,vol:0.06},{i:'bell',oct:0,vol:0.045,seq:[[[0,4],[1,4],[0,4],[-2,4]]]},{i:'frame',drum:'x.......x.......',vol:0.035}]};
  TR.prk_quiet={bpm:60,root:50,sc:'dor',len:16,v:[{i:'drone',drone:[0],oct:-12,vol:0.03}]};}
// ---------- надписи: лента с именем героя, титул пролога, чёрный срез ----------
{const st=document.createElement('style');st.textContent=
  '#prkPlate{position:fixed;left:5%;bottom:23%;z-index:40;pointer-events:none;opacity:0;transform:translateX(-30px);transition:opacity .35s,transform .45s cubic-bezier(.2,1.4,.4,1);font-family:Georgia,Palatino,serif}'+
  '#prkPlate.on{opacity:1;transform:none}#prkPlate .r{display:inline-block;padding:8px 26px 9px 18px;background:linear-gradient(90deg,rgba(54,28,46,.92),rgba(54,28,46,.78));border-left:7px solid var(--c);'+
  'border-radius:4px 22px 22px 4px;box-shadow:0 4px 14px rgba(0,0,0,.35);color:#fff3d6}#prkPlate b{font-size:calc(30px*var(--ts,1));letter-spacing:.08em;color:var(--c);text-shadow:0 1px 0 #000}'+
  '#prkPlate i{display:block;font-size:calc(17px*var(--ts,1));opacity:.92}#prkPlate s{display:block;text-decoration:none;font:600 calc(13px*var(--ts,1)) sans-serif;opacity:.75;margin-top:2px}'+
  '#prkTitle{position:fixed;left:50%;top:44%;z-index:40;pointer-events:none;opacity:0;transform:translate(-50%,-50%) scale(.86);transition:opacity .6s,transform .9s cubic-bezier(.2,1.2,.4,1);text-align:center;font-family:Georgia,Palatino,serif}'+
  '#prkTitle.on{opacity:1;transform:translate(-50%,-50%) scale(1)}#prkTitle .ring{width:min(46vh,62vw);height:min(46vh,62vw);border-radius:50%;border:6px double #e8c060;display:flex;flex-direction:column;align-items:center;justify-content:center;'+
  'background:radial-gradient(circle,rgba(40,22,40,.82),rgba(40,22,40,.55) 70%,rgba(40,22,40,0));box-shadow:0 0 40px rgba(255,200,90,.35),inset 0 0 30px rgba(255,200,90,.25)}'+
  '#prkTitle small{font-size:calc(20px*var(--ts,1));letter-spacing:.3em;color:#e8c060;text-transform:uppercase}#prkTitle b{font-size:calc(52px*var(--ts,1));color:#fff3d6;text-shadow:0 2px 0 #5a3410,0 0 18px rgba(255,200,90,.6);margin:.15em 0}'+
  '#prkTitle .dot{color:#e8c060;letter-spacing:.4em}#prkBlack{position:fixed;inset:0;background:#120a18;z-index:39;pointer-events:none;opacity:0;transition:opacity .25s}';
  document.head.appendChild(st);
  for(const id of['prkPlate','prkTitle','prkBlack']){const d=document.createElement('div');d.id=id;document.body.appendChild(d);}}
const PRK_PLATE={proshka:['ПРОШКА','лисёнок-изобретатель',0],potap:['ПОТАП','медвежонок-силач',0],yosha:['ЙОША','ёжик-водонос',1],pelageya:['ПЕЛАГЕЯ','совушка-сказительница',1]};
function prkPlate(who,dur){const el=$('prkPlate');if(!el)return;const p=PRK_PLATE[who];if(!p)return;const prPl=G.solo?'':FIN.co&&FIN.co.on&&p[2]?'напарник':'Игрок '+(p[2]+1);
  el.style.setProperty('--c',PCSS[p[2]]);el.style.setProperty('--ts',FIN.set.ts||1);el.innerHTML='<div class="r"><b>'+p[0]+'</b><i>'+p[1]+'</i>'+(prPl?'<s>'+prPl+'</s>':'')+'</div>';
  el.classList.add('on');const k=prkPlate.k=(prkPlate.k||0)+1;later(dur||2.6,()=>{if(prkPlate.k===k)el.classList.remove('on');});}
function prkTitle(on){const el=$('prkTitle');if(!el)return;el.style.setProperty('--ts',FIN.set.ts||1);
  if(on){el.innerHTML='<div class="ring"><small>Пролог</small><b>Звенышко</b><span class="dot">• • •</span></div>';el.classList.add('on');}else el.classList.remove('on');}
function prkBlack(a){const el=$('prkBlack');if(el)el.style.opacity=a;}
// ---------- общие помощники сцен ----------
const prL=()=>PRK.L,prPm=()=>PRK.P,prWd=k=>PRK.Wd[k];
// Кот на цепи: u — место на спирали; face — 'out' (к зрителю, наружу от ствола), 'walk' (вдоль цепи) или угол
function prkKotChain(u,face){const L=prL(),p=L.spiral(u),r=Math.hypot(p.x,p.z)||1,ox=p.x/r,oz=p.z/r,k=L.kot;
  k.g.position.set(p.x+ox*0.34,p.y+0.12,p.z+oz*0.34);const a=u*Math.PI*2*3;
  k.g.rotation.set(0,face==='walk'?Math.atan2(Math.cos(a),-Math.sin(a)):face==='out'?Math.atan2(ox,oz):(face||0),0);}
function prkKotScale(s,sy){const k=prL().kot,b=prL().kotS;k.g.scale.set(b*s,b*(sy||s),b*s);}
// цвет и свечение: плавно в серое
function prkGrey(o,k,col){o.traverse(c=>{if(!c.material||Array.isArray(c.material)||!c.material.color)return;if(!c.userData.prkOwn){c.material=c.material.clone();c.userData.prkOwn=1;}const m=c.material;   // своя копия: общие материалы моделей не трогаем
  if(!c.userData.c0)c.userData.c0=m.color.clone();if(c.userData.e0===undefined&&m.emissive)c.userData.e0=m.emissiveIntensity;
  const grey=new THREE.Color(col||0x8a8a90);m.color.copy(c.userData.c0).lerp(grey,k);if(m.emissive)m.emissiveIntensity=(c.userData.e0||0)*(1-k*0.9);});}
function prkAttach(par,obj,x,y,z){par.add(obj);obj.position.set(x,y,z);PRK.att.push(obj);return obj;}
// падающая искра мира: от a к b за d секунд
function prkFallAnim(s,a,b,d,then){s.visible=true;s.position.copy(a);const tr=s.userData.tr;anim(d,k=>{const e=prkE.i(k);s.position.lerpVectors(a,b,e);if(tr){tr.lookAt(prkWP(s).add(a.clone().sub(b).normalize()));}if(k>=1){s.visible=false;if(then)then();}});}
function prkBurst(pos,col,n){try{burst(pos,col,n||14,4);}catch(e){}try{FX.sparkle(pos,10,col);}catch(e){}}
function prkHeroesOff(){for(const h of HEROES){h.following=false;h.vel.set(0,0,0);}}
// камера для KC.fcam у NPC: смотрит вперёд по повороту g
const prFc=KC.fcam,prPl=KC.place;
// как KC.fcam, но поворот героя берётся один раз — в начале плана: камера не дёргается, когда герой поворачивает голову или туловище
const prFc0=(o,d,side,dy,push,ly)=>{let a0=null;return (pose,u)=>{if(a0===null)a0=o.face;const H=PRV(o.pos.x,o.pos.y+o.d.height*0.74,o.pos.z),a=a0+(side||0),dd=d*(1-(push==null?0.1:push)*CINE.E.inOutSine(u));
  pose.pos.set(H.x+Math.sin(a)*dd,H.y+(dy==null?0.12:dy),H.z+Math.cos(a)*dd);pose.look.copy(H);pose.look.y+=ly||0;};};   // ly — взгляд ниже головы (в кадре — то, что в лапах)
// ---------- жизнь персонажей: follow-through на пружинах (spring-damper) ----------
// Кот: хвост (семь позвонков вокруг корня) идёт волной от корня к кончику и отстаёт от поворотов и подскоков; уши подёргиваются
// и «доколебываются» после поворота головы (русалка живёт сама — L.mer.anim). PRK.calm (0…1) — сколько жизни осталось: Кот каменеет в 6-6.
function prkSpring(k,c){return {x:0,v:0,k:k||70,c:c||8,go(to,dt){dt=Math.min(dt,0.05);this.v+=(this.k*(to-this.x)-this.c*this.v)*dt;this.x+=this.v*dt;return this.x;}};}
const PRK_LIFE={kot:null};
function prkLife(t,dt){const L=PRK.L;if(!L||!dt)return;const k=L.kot,cm=PRK.calm==null?1:PRK.calm;
  if(!k||!k.g.visible||!k.g.parent||!L.g.visible)return;
  let s=PRK_LIFE.kot;if(!s||s.o!==k){s=PRK_LIFE.kot={o:k,yaw:prkSpring(38,5.5),bob:prkSpring(55,6.5),ear:prkSpring(160,7),hy:prkSpring(120,9),p:prkWP(k.g),r:k.g.rotation.y,hr:0,tw:1.5,
    tail0:(k.tail||[]).map(b=>b?b.position.clone():null),e0:['L','R'].map(n=>k.rig&&k.rig['ear'+n]?k.rig['ear'+n].rotation.x:0)};}
  const p=prkWP(k.g),vy=(p.y-s.p.y)/dt,yv=angN(k.g.rotation.y-s.r)/dt,hr=k.head?k.head.rotation.y:0,hv=(hr-s.hr)/dt;s.p.copy(p);s.r=k.g.rotation.y;s.hr=hr;
  s.yaw.go(clamp(-yv*0.1,-0.7,0.7),dt);s.bob.go(clamp(-vy*0.08,-0.4,0.4),dt);
  // хвост: волна (overlapping action) + отставание от поворота и подскока
  (k.tail||[]).forEach((b,i)=>{const b0=s.tail0[i];if(!b||!b0)return;const q=i/6;b.position.copy(b0);
    b.position.y+=((0.05+0.16*q)*(0.5+0.5*Math.sin(t*2.3-i*0.6))*q+s.bob.x*q*0.5)*cm;b.position.x+=((Math.sin(t*1.7-i*0.55)*0.06+s.yaw.x*0.3)*q)*cm;});
  // уши: изредка дёргаются, после поворота головы доколебываются
  s.tw-=dt;if(s.tw<=0){s.tw=1.6+Math.random()*2.4;s.ear.v+=9*cm;}s.hy.go(clamp(-hv*0.15,-0.5,0.5),dt);s.ear.go(0,dt);
  ['L','R'].forEach((n,i)=>{const e=k.rig&&k.rig['ear'+n];if(e)e.rotation.x=s.e0[i]+(s.ear.x*(i?0.7:1)+s.hy.x*(i?-1:1))*0.35*cm;});}
{const _b=PRK.build;PRK.build=function(){_b();PRK_LIFE.kot=null;PRK.calm=1;if(PRK.root)PRK.ups.push(prkLife);};}
// поворот с перелётом (overshoot): от угла a к b по outBack
const prkTurn=(a,b,k)=>a+angN(b-a)*prkE.back(clamp(k,0,1));
// угол Кота на цепи (как в prkKotChain), не двигая его
function prkKotAng(u,face){const p=prL().spiral(u),r=Math.hypot(p.x,p.z)||1,a=u*Math.PI*2*3;return face==='walk'?Math.atan2(Math.cos(a),-Math.sin(a)):Math.atan2(p.x/r,p.z/r);}

/* ============================== СЦЕНА 1 «У ЛУКОМОРЬЯ» ============================== */
function prkS1(){const L=prL();let hero=null;
  return {dur:23,fov:44,kino:true,mood:['#ffc890',0.08],
    shots:[KS(0,prLA(0,8.1,30.4),prLA(0,8,26),{p2:prLA(0,8.02,27.3),l2:prLA(0,8,22),dur:2.95,move:'none'}),   // 1-1 звено в темноте — сквозь него
      KS(3.0,prLA(30,22,48),prLA(0,7,0),{p2:prLA(12,8.5,30),l2:prLA(0,6.5,0),dur:4.2,move:'none',tr:'dip'}),   // 1-2 рассвет с птичьего полёта: из тёплого света за звеном
      KS(7.2,prLA(0.2,4.6,4.4),prLA(0,4.3,2.6),{trk:(pose,u)=>{const uu=lerp(0.25,0.4,prkE.io(u)),p=L.spiral(uu),r=Math.hypot(p.x,p.z),o=PRV(p.x/r,0,p.z/r);
        pose.look.set(PRO.L.x+p.x,p.y,PRO.L.z+p.z);pose.pos.copy(pose.look).addScaledVector(o,1.75);pose.pos.y+=0.35;}}),   // 1-3 вдоль цепи: гравюры
      KS(9.4,prLA(2.4,5.2,6.6),prLA(0,4.6,2.6),{trk:prFc(L.kot,2.9,0,0.15,0.12)}),   // 1-4 Кот идёт по цепи к нам
      KS(13.4,prLA(1.2,5.0,4.2),prLA(0,4.9,2.6),{trk:prFc(L.kot,1.9,0.55,0.12,0.1)}),   // 1-5а «направо — песнь…»
      KS(15.3,prLA(-1.2,5.0,4.2),prLA(0,4.9,2.6),{trk:prFc(L.kot,1.9,-0.55,0.12,0.1),tr:'whip'}),   // 1-5б whip — «налево — сказку…»
      KS(17.4,prLA(-6.2,1.5,5.6),prLA(-2.6,1.0,-2.5),{move:'push',amp:0.45,tr:'whip'}),   // 1-6а «там леший бродит» — Леший выглядывает из-за ствола
      KS(19.0,prLA(-8.2,5.6,6.4),prLA(-4.9,8.1,0.9),{trk:KC.orbit(()=>prkP(PRO.L,-4.9,7.9,0.9),5.4,-0.9,-0.66,-0.3,0.3)}),   // 1-6б русалка на ветке — облёт снизу
      KS(20.6,prLA(0,3.2,15),prLA(0,3,0),{p2:prLA(0,7.5,28),l2:prLA(0,4,0),dur:2.4,move:'none'})],   // 1-7 отъезд: слушатели сходятся
    says:[prkSay(0.3,2.3,'kot','Садитесь в круг — начну рассказ!',true),prkSay(3.3,3.8,'kot','У лукоморья дуб зелёный,<br>Златая цепь на дубе том…',true),
      prkSay(9.6,3.7,'kot','И днём и ночью кот учёный<br>Всё ходит по цепи кругом.'),prkSay(13.5,3.8,'kot','Идёт направо — песнь заводит,<br>Налево — сказку говорит!'),
      prkSay(17.6,3.0,'kot','Там чудеса: там леший бродит,<br>Русалка на ветвях сидит…',true)],
    events:[{t:0,fn:()=>{PRK.only(null);PRK.look('voidk');FIN.music.play('title');
        L.cliff.visible=false;L.fire.visible=false;L.hand.visible=false;L.chain.visible=true;L.crown.visible=true;L.oak.visible=true;L.stupa.g.visible=true;
        L.links.forEach(o=>{o.m.visible=true;});prkKotScale(1);prkKotChain(0.3,'walk');PRK.calm=1;L.mer.g.visible=false;
        // слушатели пока далеко — сойдутся к 1-7
        [[L.kolo,-9,0,10],[L.belka,9,0,11],[L.sadko,-12,0.25,13]].forEach(([o,x,y,z])=>{o.g.position.set(x,y,z);});
        L.bookL.rotation.z=-1.4;L.bookR.rotation.z=1.4;
        hero=L.hero;hero.visible=true;}},
      {t:3.0,fn:()=>{PRK.only('L');   // мир — на склейке, под засветкой: без короткого плана «дуб с камеры звена» между 1-1 и 1-2
        PRK.look('dawn');if(hero)hero.visible=false;}}],
    cues:[[0.1,()=>{PSN.magic(0,520);}],[0.5,()=>FX.sparkle(prkP(PRO.L,0,8,26),8,0xffe08a)],[2.7,()=>{CINE.flashDip('#ffe8b0',0.5);psfx('dzin')();}],[3.1,()=>PSN.trill(0.1)],
      [7.4,()=>psfx('link')()],[8.4,()=>psfx('link')()],[12.7,()=>{const l=L.kot.lids;if(l&&l[0])l[0].rotation&&(l[0].rotation.x=1.3);later(0.26,()=>{if(l&&l[0]&&l[0].rotation)l[0].rotation.x=-0.5;});}],
      [13.7,()=>{FX.sparkle(prkWP(L.kot.head),8,0xffe08a);prkMot('harp',[[74,0.5],[76,0.5],[79,1]],0.3,0.07);}],[15.4,()=>{FX.sparkle(prkWP(L.kot.head),6,0xfff0c0);PSN.feather&&PSN.feather(0);}],
      [17.6,()=>PSN.creak&&PSN.creak(0)],[18.2,()=>{PSN.peep(0);KC.emo('leshy','surprise')();}],
      [19.15,()=>{FX.drops(prkWP(L.mer.g),14);FX.sparkle(prkWP(L.mer.g),10,0x9af0e8);psfx('splash')();PSN.poof(0.05);}],[20.8,()=>{psfx('whoosh')();PSN.yay&&PSN.yay(0.4);}]],
    tick:(t,dt)=>{dt=dt||0;if(hero&&hero.visible){hero.rotation.y=t*0.5;hero.rotation.x=Math.sin(t*0.7)*0.2;}
      // 1-4: Кот шагает по цепи к фасаду (u=1/3), шажками; в конце — лицом к нам
      if(t<12.45){const u=lerp(0.296,0.333,prkE.io(clamp((t-9.2)/3.25,0,1)));prkKotChain(u,'walk');L.kot.g.position.y+=Math.abs(Math.sin(t*7))*0.06;L.kot.g.rotation.z=Math.sin(t*7)*0.04;}
      else{prkKotChain(0.3333,'out');L.kot.g.rotation.z=0;L.kot.g.rotation.y=prkTurn(prkKotAng(0.3333,'walk'),prkKotAng(0.3333,'out'),(t-12.45)/0.45);
        if(t>=13.6&&t<15.3)L.kot.g.rotation.y+=0.45*prkE.back(clamp((t-13.6)/0.4,0,1));if(t>=15.3&&t<17.4)L.kot.g.rotation.y-=0.45*prkE.back(clamp((t-15.3)/0.4,0,1));}
      {const ant=t>12.1&&t<12.45?Math.sin((t-12.1)/0.35*Math.PI*0.5):t>=12.45&&t<12.55?1-(t-12.45)/0.1:0,pop=t>=12.5&&t<13.4?Math.sin(clamp((t-12.5)/0.9,0,1)*Math.PI*3)*Math.exp(-(t-12.5)*4):0;
        if(t<17.4)prkKotScale(1+ant*0.07-pop*0.06,1-ant*0.13+pop*0.14);}
      if(L.kot.head)L.kot.head.rotation.y=t>12.4&&t<13.4?Math.sin((t-12.4)*3)*0.2:0;
      // 1-6: Леший выглядывает и прячется; русалка машет
      const lk=t>17.5&&t<19.1?Math.sin(clamp((t-17.5)/1.6,0,1)*Math.PI):0;L.leshy.g.position.x=lerp(-1.4,-3.3,prkE.o(lk));L.leshy.g.rotation.y=0.4+lk*0.5;
      L.mer.g.visible=t>=19.1;if(t>=19.1)L.mer.g.scale.setScalar(1.6*Math.max(0.05,prkE.back(clamp((t-19.1)/0.45,0,1))));
      // 1-7: слушатели сходятся к корням, книга раскрывается
      const k=prkE.io(clamp((t-20.4)/2.2,0,1));[[L.kolo,-9,10,-2.3,7.4],[L.belka,9,11,2.4,7.8],[L.sadko,-12,13,-4.6,8.6]].forEach(([o,x0,z0,x1,z1])=>{o.g.position.x=lerp(x0,x1,k);o.g.position.z=lerp(z0,z1,k);
        if(k>0&&k<1)o.g.position.y=(o===L.sadko?0.25:0)+Math.abs(Math.sin(t*9))*0.18;});
      const bk=prkE.o(clamp((t-21)/1.2,0,1));L.bookL.rotation.z=lerp(-1.4,-0.08,bk);L.bookR.rotation.z=lerp(1.4,0.08,bk);},
    end:()=>PRK.next()};}

/* ============================== СЦЕНА 2 «СЛОВО И МОЛОТ» ============================== */
function prkS2(){const L=prL(),coal=()=>prkWP(L.coal),ham=()=>prkWP(L.hamGlow),gap=L.links[4];let letT=-1,flyT=-1,waveT=-1,strikes=[],hamA=null,held=false;
  const kid=L.kidHammer,arm=L.kuzma.arm,KZH=Math.atan2(8.7-6.35,4.4-3.53);
  // точка в лапе Кузьмы (кость руки): туда прилетает молоточек
  const grip=()=>arm?arm.localToWorld(PRV(0,-0.55,0.1)):prkWP(L.kuzma.g).add(PRV(0.4,1,0.3));
  const kotHead=()=>prkWP(L.kot.head),lp=[],KZ0=0.6,KZ1=Math.atan2(3.4-5.3,0.35-2.45);
  const letC=()=>{const a=L.letters.filter(s=>s.visible);if(!a.length)return coal();const c=new V3();a.forEach(s=>c.add(prkWP(s)));return c.multiplyScalar(1/a.length);};
  return {dur:20,fov:46,kino:true,mood:['#ffd08a',0.08],
    shots:[KS(0,prLA(3.9,5.2,2.6),prLA(3.4,5.1,0.35),{trk:prFc(L.kot,2.1,0.3,0.1,0.12)}),   // 2-1 Кот на ветке: слово — звено
      KS(3.0,prLA(2.4,6.0,4.6),prLA(3.6,5.0,0.5),{trk:KC.follow(letC,PRV(-1.1,0.7,4.0),PRV(0.4,-0.2,0),0.9),move:'truck',amp:0.4}),   // 2-2 буквы лентой летят в горн — камера ведёт их
      KS(5.2,prLA(7.6,2.0,4.6),prLA(8.4,1.8,3.2),{trk:(pose,u)=>{if(!hamA){const q=new THREE.Quaternion();L.rack.getWorldQuaternion(q);const f=PRV(0,0,1).applyQuaternion(q),sd=PRV(f.z,0,-f.x),h=ham();
          hamA={p:h.clone().addScaledVector(f,1.0).addScaledVector(sd,3.2).add(PRV(0,-0.35,0)),h:h.clone()};}
        const w=prkE.io(clamp((u-0.4)/0.5,0,1)),K=prkWP(L.kuzma.head);pose.pos.copy(hamA.p).lerp(K,0.12*prkE.io(u));pose.look.copy(hamA.h).lerp(K,0.4).lerp(ham().lerp(K,0.3),w);}}),   // 2-3 волшебный молоточек: светится — слетает с крюка — к Кузьме в лапу
      KS(6.6,prLA(6.6,2.4,5.6),prLA(6.4,1.9,3.6),{trk:prFc(L.kuzma,2.4,-0.35,0.05,0.14)}),   // 2-4 Кузьма куёт им звено: три удара
      KS(9.0,prLA(-1.6,1.4,7.4),prLA(4.3,3.0,1.4),{trk:(pose)=>{pose.look.copy(kotHead()).lerp(prkWP(L.kuzma.head),0.7);},move:'push',amp:0.2,fov:7}),   // 2-5 Кот и Кузьма вдвоём: Кузьма подошёл к дубу и смотрит на Кота снизу
      KS(11.6,prLA(3,2.2,17),prLA(0,6,0),{p2:prLA(5,15,30),l2:prLA(0,8,0),dur:3.8,move:'none'}),   // 2-6 звено на цепь — дуб зеленеет
      KS(15.4,prLA(1.0,1.0,13.8),prLA(1.2,2.7,5.0),{trk:(pose,u)=>{const e=prkE.io(u),W=(x,y,z)=>prkP(PRO.L,x,y,z);pose.pos.copy(W(1.0,1.0,13.8)).lerp(W(0.3,4.6,16.8),e);
        pose.look.copy(W(1.2,2.7,5.0)).lerp(W(0.6,5.4,6),prkE.io(clamp((u-0.35)/0.65,0,1)));}}),   // 2-7 сказка живёт: из-за спин слушателей — Кот рассказывает, буквы кружат над кругом и летят на нас; кран вверх
      KS(18.0,prLA(0.2,6,8),prLA(0,9,84),{trk:(pose,u)=>{const e=prkE.io(u),W=(x,y,z)=>prkP(PRO.L,x,y,z);pose.pos.copy(W(0.2,6,8)).lerp(W(0,24,80),e);
        pose.look.copy(letC()).lerp(W(0,16,240),0.3+0.5*e);}})],   // 2-8 обратная точка: буквы улетают от нас над морем — к лесу (сцена 3)
    says:[prkSay(0.3,2.6,'kot','Что ни сказка — то звено:<br>Слово к слову — вот оно!'),prkSay(6.75,1.9,'kuzma','Звено куют руками…'),prkSay(9.15,2.1,'kot','…а держится оно — словами.'),
      prkSay(11.8,3.4,'kot','Пока цела цепь золотая, —<br>Живут и сказки, не смолкая.',true)],
    events:[{t:0,fn:()=>{PRK.only('L');PRK.look('day');FIN.music.play('title');L.cliff.visible=false;L.stupa.g.visible=false;L.mer.g.visible=false;
        L.kot.g.position.set(3.4,4.66,0.35);L.kot.g.rotation.set(0,0,0);prkKotScale(1);gap.m.visible=false;L.newLink.visible=false;
        L.kolo.g.position.set(-2.3,0,7.4);L.belka.g.position.set(2.4,0,7.8);L.sadko.g.position.set(-4.6,0.25,8.6);L.bookL.rotation.z=-0.08;L.bookR.rotation.z=0.08;}},
      {t:0.5,fn:()=>{letT=0;const h=kotHead();L.letters.forEach((s,i)=>{s.visible=true;s.position.copy(L.g.worldToLocal(h.clone()));s.material.opacity=1;s.material.color.setHex(0xffffff);s.userData.ph=i*0.5;});}},
      {t:6.8,fn:()=>{strikes=[6.95,7.55,8.15];}},{t:8.2,fn:()=>{L.newLink.visible=true;L.letters.forEach(s=>{s.visible=false;});}},
      {t:5.75,fn:()=>{L.web.forEach(w=>{w.visible=false;});const p=prkWP(kid);L.g.attach(kid);held=false;kid.userData.from=p;}},
      {t:6.3,fn:()=>{if(arm){arm.add(kid);kid.position.set(0,-0.55,0.06);kid.rotation.set(-Math.PI/2,0,0);kid.scale.setScalar(1.5);}held=true;}},
      {t:11.8,fn:()=>{flyT=0;}},{t:15.4,fn:()=>PRK.look('sunset')}],
    cues:[[0.6,()=>PSN.magic(0,660)],[3.2,()=>PSN.feather&&PSN.feather(0)],[5.0,()=>{prkBurst(coal(),0xffb040,12);psfx('ember')();}],
      [5.25,()=>{PSN.magic(0,880);FX.sparkle(ham(),10,0xffe08a);}],[5.6,()=>{PSN.creak(0);}],[5.78,()=>{FX.sparkle(ham(),12,0xffffff);PSN.feather&&PSN.feather(0);psfx('whoosh')();}],
      [6.3,()=>{psfx('clink')();FX.stars(ham(),6,0xffe080);CINE.punch(1.1);}],[6.4,KC.emo('kuzma','surprise')],
      [6.95,()=>{psfx('clink')();CINE.punch(1.2);FX.sparks(prkWP(L.newLink),10,0xffc060);FX.sparkle(ham(),6,0xffe08a);}],[7.55,()=>{psfx('clink')();CINE.punch(1.2);FX.sparks(prkWP(L.newLink),10,0xffc060);FX.sparkle(ham(),6,0xffe08a);}],
      [8.15,()=>{psfx('clink')();CINE.punch(1.6);CINE.hitstop(3);FX.sparks(prkWP(L.newLink),16,0xffe080);FX.stars(prkWP(L.newLink),5,0xffe080);FX.sparkle(ham(),12,0xffe08a);}],[9.5,KC.emo('kot','nod')],[10.4,KC.emo('kuzma','laugh')],[8.3,KC.emo('kuzma','nod')],[9.4,()=>PSN.trill(0)],
      [12.6,()=>{psfx('link')();prkBurst(prkWP(gap.m),0xffe08a,16);CINE.hitstop(2);CINE.punch(1.2);}],[13.0,()=>{psfx('dzin')();CINE.rimPulse(0.5);}],[13.9,()=>{PSN.flaps(0);PSN.trill(0.2);FX.leaves(prkP(PRO.L,0,14,0),26,0x7ab04a);}],
      [15.6,()=>prkMot('pluck',[[67,0.5],[69,0.5],[71,0.5],[74,1]],0.32,0.06)],[15.5,()=>{PSN.magic(0,740);FX.sparkle(kotHead(),10,0xffe08a);}],[16.0,()=>PSN.trill(0)],[16.4,KC.emo('kolobok','hop')],[16.95,()=>{PSN.feather&&PSN.feather(0);psfx('whoosh')();}],[18.2,()=>psfx('whoosh')()]],
    tick:(t,dt)=>{dt=dt||0;
      // буквы: вьются у морды Кота, потом лентой — в горн
      // молоточек: разгорается (свечение, кольцо рун), ёрзает на крюке, слетает дугой Кузьме в лапу; в лапе — светится, на ударах вспыхивает
      {const gl=clamp((t-5.2)/0.4,0,1);let fl=0;for(const s0 of strikes){const u=t-s0;if(u>0&&u<0.35)fl=Math.max(fl,1-u/0.35);}
        L.hamGlow.material.opacity=gl*(0.4+0.15*Math.sin(t*9))+fl*0.3;L.hamGlow.scale.setScalar(0.5+fl*0.35);L.hamMats.forEach(m=>{m.emissiveIntensity=gl*0.55+fl*0.6;});
        L.hamRune.visible=gl>0;L.hamRune.rotation.set(t*4,Math.PI/2,0,'YXZ');L.hamRune.scale.setScalar(0.85+0.2*Math.sin(t*6));
        if(t>5.5&&t<5.75)kid.rotation.z=L.ham0.r.z+Math.sin((t-5.5)*40)*0.12;
        if(t>=5.75&&!held&&kid.userData.from){const k=clamp((t-5.75)/0.55,0,1),a=kid.userData.from,b=grip(),q=a.clone().lerp(b,prkE.io(k));q.y+=Math.sin(k*Math.PI)*0.9;kid.position.copy(L.g.worldToLocal(q));
          kid.rotation.set(0,t*2,lerp(0,Math.PI*2,prkE.io(k)));kid.scale.setScalar(lerp(1,1.5,k));if(Math.random()<dt*14)FX.sparkle(q,1,0xffe08a);}}
      if(letT>=0&&t<8.2){const c=coal(),h=kotHead();L.letters.forEach((s,i)=>{const ph=s.userData.ph,k=clamp((t-2.6-i*0.05)/2.2,0,1),e=prkE.io(k);
        const sw=PRV(Math.sin(t*2.4+ph)*(0.9-e*0.6),0.3+Math.cos(t*1.9+ph)*0.5+Math.sin(e*Math.PI)*1.6,Math.cos(t*2.1+ph)*(0.7-e*0.5));
        const w=h.clone().lerp(c,e).add(sw.multiplyScalar(1-e*0.85));s.position.copy(L.g.worldToLocal(w));s.material.opacity=1-Math.max(0,k-0.9)*10;});}
      // удары Кузьмы: рука вверх — вниз
      if(L.kuzma.arm){let a=t>5.8&&t<6.6?-1.25*Math.sin(clamp((t-5.8)/0.8,0,1)*Math.PI):0;for(const s of strikes){const u=(t-s+0.35)/0.45;if(u>0&&u<1)a=u<0.6?-1.7*prkE.o(u/0.6):-1.7*(1-prkE.i((u-0.6)/0.4));}L.kuzma.arm.rotation.x=a;}
      {let q=0;for(const s of strikes){const u=t-s+0.25;if(u>0&&u<0.5)q=Math.max(q,Math.sin(u/0.5*Math.PI)*Math.exp(-u*3));}L.kuzma.g.scale.set(1+q*0.07,1-q*0.11,1+q*0.07);}
      L.kuzma.g.rotation.y=t<5.6?KZ0:t<6.35?prkTurn(KZ0,KZH,(t-5.6)/0.3):t<9.0?prkTurn(KZH,KZ0,(t-6.35)/0.3):prkTurn(KZ0,KZ1,(t-9.0)/0.55);{const w=prkE.io(clamp((t-9.0)/0.7,0,1));L.kuzma.g.position.set(lerp(6.35,5.3,w),w>0&&w<1?Math.abs(Math.sin(w*Math.PI*3))*0.09:0,lerp(3.53,2.45,w));}if(L.kot.head)L.kot.head.rotation.x=t>9.2&&t<11.6?0.28*prkE.io(clamp((t-9.2)/0.4,0,1)):0;
      // новое звено: из клещей — на цепь
      if(flyT>=0){const k=clamp((t-11.8)/0.8,0,1),a=prkWP(L.fg).add(PRV(0,1.2,0)),b=prkWP(gap.m);if(k<1){L.newLink.visible=true;const p=a.lerp(b,prkE.io(k));p.y+=Math.sin(k*Math.PI)*2.2;L.newLink.position.copy(L.fg.worldToLocal(p));L.newLink.rotation.y=t*8;}
        else{L.newLink.visible=false;gap.m.visible=true;if(waveT<0)waveT=t;}}
      if(waveT>=0){const w=(t-waveT)/2;L.links.forEach(o=>{const d=Math.max(0,1-Math.abs(o.u-w)*8);o.m.scale.setScalar(1+d*0.45);});L.crown.scale.setScalar(1+Math.max(0,Math.sin(clamp((t-waveT-1.3)/0.9,0,1)*Math.PI))*0.07);}
      // 2-7/2-8: сказка живёт — буквы вылетают у Кота, кружат над слушателями и улетают над морем к лесу; Кот рассказывает с поднятой лапой
      if(t>=15.4){const C=PRV(0,3.6,7.6),hd=L.g.worldToLocal(kotHead()),FB=PRV(0,12,30),FC=PRV(0,20,140);
        L.letters.forEach((s,i)=>{const ph=i/L.letters.length*Math.PI*2,k1=clamp((t-15.5-i*0.03)/0.9,0,1),k2=prkE.io(clamp((t-16.9-i*0.025)/3.0,0,1));
          if(k1<=0){s.visible=false;return;}if(!s.visible){s.visible=true;s.material.color.setHex(0xffe08a);}
          const R=PRV(C.x+Math.cos(ph+t*1.6)*2.6,C.y+0.35*Math.sin(ph*3+t*3),C.z+Math.sin(ph+t*1.6)*2.0),p=hd.clone().lerp(R,prkE.io(k1));p.y+=Math.sin(k1*Math.PI)*0.8;
          if(k2>0){const j=PRV(Math.cos(ph)*3,Math.sin(ph*2)*2,0),b=FB.clone().add(j),c=FC.clone().add(j.multiplyScalar(3)),m=1-k2;p.multiplyScalar(m*m).addScaledVector(b,2*m*k2).addScaledVector(c,k2*k2);}
          s.position.copy(p);s.scale.setScalar(0.42+k2*1.4);s.material.opacity=1-Math.max(0,k2-0.85)/0.15;});
        const R=L.kot.rig;if(R&&R.armR)R.armR.rotation.x=-0.12-1.1*prkE.back(clamp((t-15.45)/0.5,0,1))+Math.sin(t*3)*0.12;
        if(L.kot.head)L.kot.head.rotation.y=Math.sin((t-15.5)*1.6)*0.32;
        L.belka.g.position.y=t>16.0&&t<16.9?Math.abs(Math.sin((t-16.0)/0.9*Math.PI*2))*0.22:0;}
      // слушатели живут: Колобок подпрыгивает, Садко покачивается
      L.kolo.g.position.y=t>15.4?Math.abs(Math.sin(t*5))*0.18:0;if(L.sadko.body)L.sadko.body.rotation.z=Math.sin(t*2.6)*0.05;},
    end:()=>{L.rack.add(kid);kid.position.copy(L.ham0.p);kid.rotation.copy(L.ham0.r);kid.scale.copy(L.ham0.s);L.hamGlow.material.opacity=0;L.hamRune.visible=false;L.hamMats.forEach(m=>{m.emissiveIntensity=0;});L.web.forEach(w=>{w.visible=true;});
      L.links.forEach(o=>o.m.scale.setScalar(1));L.crown.scale.setScalar(1);L.kuzma.g.scale.setScalar(1);L.kuzma.g.rotation.y=KZ0;L.kuzma.g.position.set(6.35,0,3.53);if(L.kot.head){L.kot.head.rotation.x=0;L.kot.head.rotation.y=0;}if(L.kot.rig&&L.kot.rig.armR)L.kot.rig.armR.rotation.x=-0.12;L.belka.g.position.y=0;L.letters.forEach(s=>{s.scale.setScalar(0.42);s.material.opacity=1;s.material.color.setHex(0xffffff);});L.letters.forEach(s=>{s.visible=false;});L.newLink.visible=false;gap.m.visible=true;PRK.next();}};}

/* ============================== СЦЕНА 3 «ЛЕСНОЙ ПАТРУЛЬ» ============================== */
// Пролёт над лесом мира 1 к сосне-штабу; «четверо друзей» — каждый машет по-своему, Пелагея делает круг над настилом; Прошка докручивает
// ключом свою катапульту и стреляет яблоком — Потап ловит; Йоша поливает из лейки засохший цветок — тот расцветает; Пелагея пишет
// сказку в тетрадь (вставка: страница, строка за строкой) и зачёркивает; Тишка в ночном колпаке, с подушкой, зевает — «Сказку!».
function prkS3(){const P=prPm(),O=PRO.P,T=PRK_T,pr=T.proshka,po=T.potap,pe=T.pelageya,yo=T.yosha;let apT=-1,lastT=0;
  const at=(x,z)=>PRV(O.x+x,0,O.z+z),poHead=()=>PRV(po.pos.x,po.pos.y+po.d.height*0.8,po.pos.z),appleW=()=>prkWP(P.apple),bookW=()=>prkWP(P.book);
  const PR=PRV(-9.6,0,5.6),PO=PRV(2.0,0,6.6),YO=PRV(9.6,0,5.5),PE=PRV(1.6,11,5.9),CAT=PRV(-8.6,0,6.4),FLW=PRV(10.45,0.36,5.95),PE2=PRV(2.5,0,6.6);
  // 3-2: все вместе посреди настила (потом — каждый у своего дела)
  const G3={pr:PRV(-2.7,0,6.3),yo:PRV(-1.0,0,7.0),po:PRV(0.7,0,6.2)};
  const FPR=Math.atan2(CAT.x-PR.x,CAT.z-PR.z),FYO=Math.atan2(FLW.x-YO.x,FLW.z-YO.z);
  const lp=v=>P.g.worldToLocal(v.clone());
  // где яблоко у Потапа: перед грудью, после «Хо-хо!» — над головой
  const inPaws=t=>{const f=po.face;return PRV(po.pos.x+Math.sin(f)*0.5,po.pos.y+po.d.height*0.52,po.pos.z+Math.cos(f)*0.5);};
  const TXT_N=40;
  return {dur:24.2,fov:46,kino:true,mood:['#ffb070',0.1],
    shots:[KS(0,prPA(-64,7,96),prPA(0,4,0),{p2:prPA(-9,7.5,28),l2:prPA(0,4,2),dur:3.0,move:'none'}),   // 3-1 низко над лесом мира 1 — к сосне с огоньком в окне
      KS(3.0,prPA(1.2,3.2,14.0),prPA(0,1.2,6.5),{p2:prPA(-0.4,2.5,11.4),l2:prPA(0,0.8,6.5),dur:2.8,move:'none'}),   // 3-2 «четверо друзей»: все вместе на настиле, Пелагея слетает к ним
      KS(5.8,prPA(-7.9,1.5,9.7),prPA(-9.0,0.85,5.6),{move:'push',amp:0.35}),   // 3-3 Прошка докручивает катапульту и стреляет
      KS(8.8,prPA(-1.5,1.7,11.8),prPA(0,1,6.6),{trk:KC.look(()=>apT>=0&&apT<1?appleW():poHead(),0.7),move:'push',amp:0.3}),   // 3-4 яблоко — Потапу в лапы
      KS(11.6,prPA(9.85,1.1,8.0),prPA(10.0,0.55,5.7),{move:'push',amp:0.3}),   // 3-5 Йоша поливает засохший цветок — расцвёл
      KS(14.4,prPA(3,3,13),prPA(1.6,8,5.9),{p2:prPA(2.6,12.4,8.9),l2:prPA(1.6,11.5,6.2),dur:1.1,move:'none'}),   // 3-6а вверх по стволу — к гнезду
      KS(15.5,prPA(1.8,12.4,8.5),prPA(1.6,11.4,6.5),{fov:-12,trk:(pose,u)=>{const b=bookW();pose.look.copy(b).add(PRV(0,0.12,-0.1));pose.pos.copy(b).add(PRV(0.14,0.62-u*0.05,0.66-u*0.08));}}),   // 3-6б тетрадь: сказка пишется
      KS(16.3,prPA(2.0,12.4,7.9),prPA(1.6,11.7,5.9),{trk:prFc0(pe,2.2,0.22,0.0,0.1,-0.32)}),   // 3-6в «…нет, не так» — комок бумаги из гнезда
      KS(17.4,prPA(-1.4,1.3,6.6),prPA(-1.9,0.6,4.4),{trk:prFc(P.tish,2.1,0.25,0.12,0.1)}),   // 3-7 Тишка в дверях: колпак, подушка, зевок
      KS(19.6,prPA(-1.6,1.0,3.75),prPA(-2.0,1.0,9.2),{move:'pull',amp:0.35}),   // 3-8 куча-мала у двери: бегут прямо на нас
      KS(21.8,prPA(1.9,12.4,7.6),prPA(1.6,11.9,5.9),{trk:prFc0(pe,2.4,0.2,0.05,0.12,-0.25)}),   // 3-9а Пелагея: «…и я»
      KS(23.1,prPA(7,14,20),prPA(1.6,12,5.9),{p2:prPA(12,17,32),l2:prPA(0,14,0),dur:1.1,move:'none'})],   // 3-9б отъезд — первая звезда
    says:[prkSay(0.2,2.8,'kot','А в дремучем лесу, на сосне,<br>Светит штаб огоньком в окне.',true),prkSay(3.1,2.6,'kot','Четверо друзей там живут —<br>Лесным патрулём их зовут.',true),
      prkSay(6.0,2.4,'proshka','Сказки — сказками, а техника — вещь!'),prkSay(9.8,1.7,'potap','Держу-держу. Хо-хо!'),prkSay(12.8,1.6,'yosha','Сам вырастил! Я сам!'),
      prkSay(15.4,2.6,'pelageya','<i>(шёпотом)</i> В некотором царстве… нет, не так…'),prkSay(17.5,2.1,'tishka','Сказку! Кто мне сказку на ночь?'),
      prkSay(19.7,0.75,'proshka','Чур, я!'),prkSay(20.45,0.6,'potap','Я!'),prkSay(21.05,0.75,'yosha','Нет, я сам!'),prkSay(21.9,1.1,'pelageya','<i>(шёпотом)</i> …и я.')],
    events:[{t:0,fn:()=>{PRK.only('P');PRK.look('forestset');FIN.music.play('hub');prkHeroesOff();
        prPl(pr,O.x+G3.pr.x,O.z+G3.pr.z,0,at(G3.pr.x,G3.pr.z+3));prPl(po,O.x+G3.po.x,O.z+G3.po.z,0,at(G3.po.x,G3.po.z+3));prPl(yo,O.x+G3.yo.x,O.z+G3.yo.z,0,at(G3.yo.x,G3.yo.z+3));prPl(pe,O.x+PE.x,O.z+PE.z,PE.y,at(PE.x,PE.z+3));
        if(pr.rig&&pr.rig.handR)prkAttach(pr.rig.handR,P.wrench,0,-0.04,0.04).rotation.set(1.2,0,0);
        if(yo.rig&&yo.rig.handR)prkAttach(yo.rig.handR,P.can,0,-0.05,0.07).rotation.set(0,0,0);
        prkAttach(pe.g,P.book,0,pe.d.height*0.46,0.6).rotation.set(0.75,0,0);P.page.k=null;P.page(0,0);P.ball.visible=false;
        P.cat.position.copy(CAT);P.catArm.rotation.z=0.25;P.lever.rotation.z=0.5;P.coil.scale.set(1,0.75,1);P.apple.visible=true;
        P.flw.position.copy(FLW);P.bloom(0);P.drops.forEach(d=>{d.visible=false;});P.zzz.forEach(z=>{z.material.opacity=0;});
        P.tish.g.visible=false;P.zv.visible=false;P.rain.forEach(r=>{r.s.visible=false;r.t=-1;});P.cloud.visible=false;P.rv.g.visible=false;P.star.material.opacity=0;}},
      {t:5.8,fn:()=>{prPl(pr,O.x+PR.x,O.z+PR.z,0,at(PR.x,PR.z+3));prPl(po,O.x+PO.x,O.z+PO.z,0,at(PO.x,PO.z+3));prPl(yo,O.x+YO.x,O.z+YO.z,0,at(YO.x,YO.z+3));prPl(pe,O.x+PE.x,O.z+PE.z,PE.y,at(PE.x,PE.z+3));pe.glide=false;}},
      {t:7.95,fn:()=>{apT=0;}},
      {t:17.4,fn:()=>{P.g.add(P.tish.g);P.tish.g.visible=true;P.tish.g.position.copy(P.doorPos).sub(O);P.tish.g.position.y=0;P.tish.g.rotation.set(0,-0.42,0);}},
      {t:19.6,fn:()=>{prPl(pr,O.x-3.4,O.z+8.2,0,P.doorPos);prPl(po,O.x-1.9,O.z+8.9,0,P.doorPos);prPl(yo,O.x-0.4,O.z+8.2,0,P.doorPos);}}],
    cues:[[0.3,()=>PSN.flaps(0.2)],[3.3,KC.emo('proshka','cheer')],[3.6,KC.emo('potap','joy')],[3.9,KC.emo('yosha','hop')],[4.6,KC.emo('yosha','hop')],[3.1,()=>PSN.flaps(0)],[4.25,()=>{KC.emo('pelageya','joy')();FX.dust(prkP(O,PE2.x,0.1,PE2.z),6,0xe8c8a0,0.5);}],[4.9,()=>KC.all('cheer',0.08)()],[5.3,()=>PSN.trill(0)],
      [6.0,()=>prkPlate('proshka')],[6.15,()=>{FX.sparks(prkWP(P.gears[0]),8,0xffd060);psfx('clink')();}],[6.6,()=>{FX.sparks(prkWP(P.gears[0]),10,0xffd060);psfx('clink')();}],
      [7.05,KC.emo('proshka','pride')],[7.15,()=>{FX.stars(prkWP(pr.g).add(PRV(0,pr.d.height+0.35,0)),4,0xfff08a);PSN.trill(0);}],[7.65,()=>PSN.snap(0)],
      [7.95,()=>{PSN.poof(0);psfx('whoosh')();FX.dust(prkWP(P.cup),8,0xf0f0f0,0.6);CINE.punch(1.15);}],[8.15,KC.emo('proshka','cheer')],
      [9.0,()=>prkPlate('potap')],[9.42,()=>{PSN.thud(0);KC.emo('potap','effort')();FX.stars(appleW(),4,0xffe080);}],[10.1,KC.emo('potap','laugh')],
      [11.8,()=>{prkPlate('yosha');psfx('water')();}],[12.35,()=>{psfx('grow')();PSN.magic(0,700);}],[12.7,()=>{FX.sparkle(prkWP(P.flwHead),12,0xffb0d0);FX.petals&&FX.petals(prkWP(P.flwHead),10);}],
      [12.75,()=>{KC.emo('yosha','surprise')();PSN.peep&&PSN.peep(0);}],[13.25,KC.emo('yosha','pride')],[13.7,KC.emo('yosha','hop')],
      [15.0,()=>prkPlate('pelageya')],[15.5,KC.emo('pelageya','tilt')],[15.6,()=>PSN.feather&&PSN.feather(0)],[16.35,()=>PSN.snap(0)],[16.5,KC.emo('pelageya','droop')],[16.95,()=>{PSN.poof(0);psfx('whoosh')();}],
      [17.5,()=>{if(PSN.ok())AUD.osc({type:'sine',f0:560,f1:250,d:0.75,v:0.045,a:0.12,vib:0.03,vibF:5,wet:0.3});}],[17.6,KC.emo('tishka','nod')],[19.7,KC.emo('proshka','hop')],[20.45,KC.emo('potap','nod')],[21.05,KC.emo('yosha','hop')],
      [21.15,()=>{PSN.thud(0);CINE.hitstop(3);CINE.punch(1.4);FX.stars&&FX.stars(P.doorPos.clone().add(PRV(0,1.4,0.6)),6,0xffe080);shakeAll(0.06,0.25);}],
      [21.3,()=>{KC.emo('proshka','flinch')();KC.emo('yosha','surprise')();}],[21.45,()=>FX.dust(P.doorPos.clone().add(PRV(0,0.1,1.8)),10,0xd8b080,0.8)],[21.5,()=>PSN.poof(0)],[22.4,KC.emo('pelageya','droop')],[23.4,()=>psfx('dzin')()]],
    tick:(t,dt)=>{dt=dt||0;prkHeroesOff();const pre=t<19.6;
      // ---- 3-2: каждый машет по-своему; Пелагея — круг над настилом и обратно в гнездо
      pr._armUp=t>3.4&&t<5.6?0.55+0.45*Math.sin(t*11):0;po._armUp=t>3.7&&t<5.6?0.45+0.3*Math.sin(t*7):0;yo._armUp=t>4.3&&t<5.6?0.6+0.4*Math.sin(t*13):0;
      if(t<5.8){const k=prkE.io(clamp((t-3.0)/1.25,0,1)),q=PE.clone().lerp(PE2,k);q.y+=Math.sin(k*Math.PI)*1.6;pe.pos.set(O.x+q.x,q.y,O.z+q.z);pe.vel.set(0,0,0);
        pe.face=k<1?Math.atan2(PE2.x-PE.x,PE2.z-PE.z)*(1-k):0;pe.glide=k>0&&k<1;P.book.visible=false;if(t>4.3&&t<5.6)pe._armUp=0;}
      else if(pre){pe.glide=false;pe.face=0;P.book.visible=true;}
      // ---- Прошка: к катапульте — докручивает ключом (лапы вперёд), гордо к нам, дёргает рычаг; шестерни крутятся
      if(pre){pr.face=t<5.9?0:t<7.0?prkTurn(0,FPR,(t-5.9)/0.35):t<7.6?prkTurn(FPR,0.2,(t-7.0)/0.4):prkTurn(0.2,FPR,(t-7.6)/0.2);
        pr._armF=t>6.0&&t<7.0?0.75:t>7.55&&t<7.9?0.9:0;P.wrench.visible=t<7.5;P.wrench.rotation.y=t>6.0&&t<7.0?Math.sin(t*16)*0.7:0;
        P.lever.rotation.z=t<7.62?0.5:lerp(0.5,-0.7,prkE.back(clamp((t-7.62)/0.18,0,1)));
        const fire=t>7.9&&t<8.6;P.gears.forEach((g,i)=>{g.rotation.z+=dt*(i?-1:1)*(t>6.0&&t<7.0?4:fire?22:0.6);});
        const fk=clamp((t-7.9)/0.28,0,1);P.catArm.rotation.z=t<7.9?0.25:lerp(0.25,-2.15,prkE.back(fk));P.coil.scale.set(1,t<7.9?0.75:0.75+0.6*Math.sin(clamp((t-7.9)/0.5,0,1)*Math.PI*2.5)*Math.exp(-(t-7.9)*3)+0.25*fk,1);}
      // ---- яблоко: в ложке → дугой к Потапу → в лапах (на «Хо-хо!» — над головой)
      if(apT<0)P.apple.position.copy(lp(prkWP(P.cup))).add(PRV(0,0.12,0));
      else if(apT<1){apT=clamp((t-7.95)/1.47,0,1);const a=prkWP(P.cup).add(PRV(0,0.12,0)),b=inPaws(9.42),q=a.clone().lerp(b,prkE.io(apT));q.y+=Math.sin(apT*Math.PI)*2.9;P.apple.position.copy(lp(q));P.apple.rotation.set(t*7,t*5,0);
        if(apT>=1)FX.sparkle(b,6,0xffe080);}
      else if(pre){P.apple.position.copy(lp(inPaws(t)));P.apple.rotation.set(0,0,0);}
      else P.apple.visible=false;
      // ---- Потап: ждёт, поворачивается к катапульте, ловит (сжатие), «Хо-хо!» — к нам
      if(pre&&t>=5.8){po.pos.x=O.x+PO.x;po.pos.z=O.z+PO.z;po.face=t<7.4?0:t<9.9?prkTurn(0,-Math.PI/2,(t-7.4)/0.5):prkTurn(-Math.PI/2,-0.59,(t-9.9)/0.4);po._armF=t>8.9&&t<11.6?0.9:0;}
      if(t>9.35&&t<10.2){const u=t-9.42,q=u>0?Math.sin(clamp(u/0.7,0,1)*Math.PI*2)*Math.exp(-u*4.5):-Math.sin(clamp((t-9.35)/0.07,0,1)*Math.PI*0.5)*0.3;po.g.scale.set(1+q*0.1,1-q*0.14,1+q*0.1);}
      else if(t>=10.2&&t<10.3)po.g.scale.setScalar(1);
      // ---- Йоша: к цветку, поливает из лейки (струйка капель), цветок встаёт и раскрывается; «Сам вырастил!» — к нам
      if(pre){yo.face=t<11.65?0:t<12.7?prkTurn(0,FYO,(t-11.65)/0.3):prkTurn(FYO,0.1,(t-12.7)/0.35);if(t>=11.8&&lastT<11.8)yo._skT=G.time;
        P.can.rotation.x=t>11.85&&t<12.45?-0.75*Math.sin(clamp((t-11.85)/0.6,0,1)*Math.PI):0;
        const tip=prkWP(P.canTip),dst=prkWP(P.flwHead);P.drops.forEach((d,i)=>{const u=(t-11.95-i*0.035)/0.32;d.visible=u>0&&u<1&&t<12.55;if(!d.visible)return;const q=tip.clone().lerp(dst,u);q.y+=Math.sin(u*Math.PI)*0.12;d.position.copy(lp(q));});
        P.bloom(clamp((t-12.25)/0.9,0,1));if(t>13.2)P.flwHead.rotation.y=Math.sin(t*2)*0.15;}
      // ---- Пелагея пишет: перо бежит по строке, буквы появляются; «нет, не так» — зачёркивает, вырывает лист и бросает комком
      if(pre&&t>=14.5){const n=clamp((t-14.6)/1.7,0,1)*TXT_N,cr=clamp((t-16.35)/0.45,0,1);if(t<16.9)P.page(n,cr);else P.page(0,0);
        const lens=[11,8,11,12];let left=n,li=0;while(li<3&&left>lens[li]){left-=lens[li];li++;}const u=t<16.35?clamp(left/lens[li],0,1):cr;
        const q=P.pageAt(t<16.35?li:Math.floor(cr*3.99),u);P.quill.position.set(q.x,q.y+0.05+Math.abs(Math.sin(t*26))*0.02,q.z);
        if(t>=16.9&&t<17.6){P.ball.visible=true;const k=(t-16.9)/0.7,a=bookW(),b=a.clone().add(PRV(0.6,-3.4,2.6));const q2=a.lerp(b,k);q2.y+=Math.sin(k*Math.PI)*0.9;P.ball.position.copy(lp(q2));P.ball.rotation.set(t*9,t*7,0);}else P.ball.visible=false;}
      // ---- Тишка: зевает, клюёт носом, обнимает подушку; «z-z-z» над колпаком
      if(t>=17.4&&t<19.7){const R=P.tish.rig||{},yawn=Math.sin(clamp((t-17.45)/0.7,0,1)*Math.PI);if(R.mouth)R.mouth.scale.set(1+yawn*0.8,1+yawn*2.4,1);
        if(R.head)R.head.rotation.x=0.18+Math.sin(t*2.2)*0.12;P.tish.g.rotation.z=Math.sin(t*1.6)*0.06;P.capTip.rotation.z=-1.0+Math.sin(t*3)*0.25;
        P.pillow.scale.set(1+yawn*0.08,1-yawn*0.06,1);const hp=prkWP(R.head||P.tish.g);
        P.zzz.forEach((z,i)=>{const u=((t-17.6)*0.7+i/3)%1;z.position.copy(lp(hp.clone().add(PRV(0.25+u*0.35,0.3+u*0.7,0))));z.material.opacity=t>17.6?Math.sin(u*Math.PI)*0.9:0;});}
      else P.zzz.forEach(z=>{z.material.opacity=0;});
      // ---- куча-мала: трое — к двери
      if(t>=19.6){const k=prkE.io(clamp((t-19.6)/1.45,0,1)),D=P.doorPos;[[pr,-3.4,8.2,-0.9],[po,-1.9,8.9,0.1],[yo,-0.4,8.2,0.85]].forEach(([h,x,z,dx],i)=>{
        const tx=D.x+dx*0.7,tz=D.z+2.1+(i===1?0.6:0);h.pos.x=lerp(O.x+x,tx,k);h.pos.z=lerp(O.z+z,tz,k);h.pos.y=0;h._armUp=0;h._armF=0;});
        if(t>21.4){const s=1+Math.sin(clamp((t-21.4)/0.4,0,1)*Math.PI)*0.12;po.g.scale.set(s,1/s,s);}}
      // первая звезда
      P.star.material.opacity=clamp((t-23.2)/0.8,0,1)*(0.75+Math.sin(t*9)*0.25);lastT=t;},
    end:()=>{po.g.scale.setScalar(1);for(const h of[pr,po,yo,pe]){h._armUp=0;h._armF=0;h.glide=false;}P.star.material.opacity=0;P.apple.visible=false;P.drops.forEach(d=>{d.visible=false;});P.zzz.forEach(z=>{z.material.opacity=0;});P.ball.visible=false;PRK.next();}};}

/* ============================== СЦЕНА 4 «КОЛЫБЕЛЬНАЯ ЗА РЕКОЙ» ============================== */
function prkS4(){const L=prL(),ko=L.ko,koHead=()=>prkWP(ko.head);let nutT=-1;
  return {dur:19.8,fov:46,kino:true,mood:['#7a8cff',0.12],
    shots:[KS(0,prLA(4.5,3.0,24),prLA(34,30,-40),{p2:prLA(1.5,4.4,18.5),l2:prLA(0,2.6,4),dur:2.4,move:'none'}),   // 4-1 от звезды над морем — вниз, к костру (крона не заслоняет)
      KS(2.4,prLA(0.6,5.1,6.4),prLA(0,4.8,2.6),{trk:prFc(L.kot,3.0,0.22,0.1,0.14)}),   // 4-2 «…а Кощей, как водится, — проиграл»
      KS(6.2,prLA(3.8,2.3,12.8),prLA(0,0.9,7.2),{move:'push',amp:0.6}),   // 4-3 смех у костра
      KS(8.0,prLA(-4.4,6.8,-36),prLA(-6,9.2,-70),{p2:prLA(-5.2,8.2,-58),l2:prLA(-6,9.3,-70),dur:1.0,move:'none'}),   // 4-4а за морем — силуэт против луны
      KS(9.0,prLA(-5.4,9.7,-67.3),prLA(-6,9.6,-70),{trk:prFc(ko,2.7,0.3,0.05,0.16),tr:'cut'}),   // 4-4б Кощей крупно: «Как водится… проиграл»
      KS(11.2,prLA(0.4,5,4.6),prLA(0,4.9,2.6),{trk:prFc(L.kot,2.0,0,0.1,0.12)}),   // 4-5 «А теперь — колыбельная…»
      KS(14.2,prLA(0,4.6,6),prLA(-6,8,-70),{p2:prLA(-5.5,8.9,-65.8),l2:prLA(-6,9.1,-70),dur:4.0,move:'none',trk:KC.look(()=>koHead().add(PRV(0,-0.4,0)),1)}),   // 4-6 песня над водой
      KS(18.2,prLA(-5,8.6,-68.6),prLA(-5.6,8.3,-69.6),{trk:(pose,u)=>{const H=koHead(),hd=prkWP(ko.hand),c=H.clone().lerp(hd,0.38),d=4.1-1.1*prkE.io(u);pose.look.copy(c);pose.pos.copy(c).add(PRV(Math.sin(0.35)*d,-0.55,Math.cos(0.35)*d));}})],   // 4-7 Кощей поднимает голову: глаза вспыхивают, кулак сжимается у груди — решился
    says:[prkSay(2.6,3.4,'kot','…а Кощей, как водится, — проиграл.<br>Тут и сказке конец!'),prkSay(9.0,2.4,'koschei','<i>(тихо)</i> Как водится… проиграл.'),
      prkSay(11.3,1.7,'kot','А теперь — колыбельная…'),prkSay(14.3,3.9,'kot','♪ Баю-баю, за рекою,<br>Серый волк живёт… ♪',true)],
    events:[{t:0,fn:()=>{PRK.only('L');PRK.look('night');FIN.music.play('prk_night');L.cliff.visible=true;L.fire.visible=true;L.stupa.g.visible=false;L.hand.visible=false;
        L.moon.position.set(-29,50,-300);L.moon.lookAt(PRO.L.x-4,8,PRO.L.z-40);prkKotScale(1);prkKotChain(0.3333,'out');
        L.kolo.g.position.set(-2.3,0,7.4);L.kolo.g.rotation.set(0,Math.PI,0);L.belka.g.position.set(2.4,0,7.8);L.sadko.g.position.set(-4.6,0.25,8.6);
        ko.g.rotation.set(0,0.08,0);if(ko.head)ko.head.rotation.x=0;L.mer.g.visible=false;L.frost.forEach(d=>d.scale.setScalar(0.01));L.raven.g.visible=true;
        L.cloudBlobs.forEach(b=>{b.scale.setScalar(0.01);b.position.copy(b.userData.p0);});L.cloud.position.set(-6,6,-96);}},
      {t:6.4,fn:()=>{nutT=0;}}],
    cues:[[0.2,()=>PSN.trill(0)],[4.6,()=>{CINE.punch(1.4);PSN.sting(0);}],[6.3,()=>{PSN.yay(0);KC.emo('sadko','laugh')();KC.emo('kolobok','laugh')();KC.emo('kuzma','laugh')();}],[6.9,()=>PSN.yay(0.1)],
      [8.2,()=>psfx('keys')()],[9.05,()=>{CINE.rimPulse(0.7);CINE.mood('#6a7cff',0.18);}],[9.6,()=>{PSN.icy&&PSN.icy(0);}],[11.3,()=>CINE.mood('#7a8cff',0.12)],[12.2,()=>lullaby(LUL1,0.42,0,0.2)],[15.6,()=>lullaby(LUL2,0.46,0,0.18)],[16.2,()=>PSN.icy&&PSN.icy(0)],[18.4,()=>{psfx('keys')();}],[18.6,()=>{PSN.menace(0);CINE.mood('#5a6cff',0.2);}],[19.0,()=>{CINE.punch(1.3);CINE.rimPulse(0.8);FX.sparkle(prkWP(ko.hand),8,0xff4050);PSN.caw(0.1);}]],
    tick:(t,dt)=>{dt=dt||0;
      // 4-2: на «проиграл» — лапой «бац»
      const R=L.kot.rig;if(R&&R.armR)R.armR.rotation.x=-0.12-(t>4.2&&t<5.2?Math.sin(clamp((t-4.2)/1,0,1)*Math.PI)*1.3:0);
      // смех: Колобок катается, белка роняет орех
      L.kolo.g.rotation.z=t>6.2&&t<8?Math.sin((t-6.2)*9)*0.5:0;L.kolo.g.position.y=t>6.2&&t<8?Math.abs(Math.sin((t-6.2)*7))*0.2:0;
      if(L.belka.nut&&nutT>=0){const k=clamp((t-6.4)/0.5,0,1);L.belka.nut.position.y=(L.belka.nut.userData.y0=L.belka.nut.userData.y0===undefined?L.belka.nut.position.y:L.belka.nut.userData.y0)-prkE.i(k)*0.4;}
      // слушатели клюют носом под колыбельную
      if(t>11.4){const d=Math.min(1,(t-11.4)/2);L.kolo.g.rotation.x=Math.sin(t*1.4)*0.08*d;}
      // Кощей опускает голову на «серый волк» (это он — за рекой, один); 4-7 — поднимает её, глаза вспыхивают; иней бежит по камню
      if(ko.head)ko.head.rotation.x=t<18.3?0.4*prkE.io(clamp((t-16.3)/0.9,0,1)):lerp(0.4,-0.12,prkE.back(clamp((t-18.35)/0.5,0,1)));
      {const e=clamp((t-18.6)/0.3,0,1);(L.koEyes||[]).forEach(g=>{g.material.opacity=e*(0.75+Math.sin(t*20)*0.1);g.scale.setScalar(0.32+e*0.25);});}
      L.frost.forEach((d,i)=>d.scale.setScalar(Math.max(0.01,prkE.o(clamp((t-15.4-i*0.25)/1.4,0,1)))));
      // 4-7: рука сжимается — перстень вспыхивает
      // кулак: рука поднимается к груди и сжимается, перстень вспыхивает
      if(ko.armR){const k=prkE.io(clamp((t-18.45)/0.5,0,1));ko.armR.rotation.x=-1.25*k;ko.armR.rotation.z=0.35*k;}
      if(ko.hand){const k=clamp((t-18.85)/0.3,0,1);ko.hand.scale.setScalar(1-prkE.io(k)*0.2);ko.hand.rotation.x=prkE.io(k)*0.6;}
      if(L.koGem)L.koGem.scale.setScalar(0.5+Math.max(0,Math.sin(clamp((t-18.95)/0.6,0,1)*Math.PI))*1.6);},
    end:()=>{if(ko.hand){ko.hand.scale.setScalar(1);ko.hand.rotation.x=0;}if(ko.armR)ko.armR.rotation.set(0,0,0);(L.koEyes||[]).forEach(g=>{g.material.opacity=0;});if(L.koGem)L.koGem.scale.setScalar(0.5);PRK.next();}};}

/* ============================== СЦЕНА 5 «ЧЁРНАЯ ТУЧА» ============================== */
function prkS5(){const L=prL(),ko=L.ko,koHead=()=>prkWP(ko.head),U=0.62;let cloudT=-1,sparkT=-1;
  const lnk=()=>{const p=L.spiral(U);return PRV(PRO.L.x+p.x,p.y,PRO.L.z+p.z);};
  const handTo=()=>{const p=L.spiral(U),r=Math.hypot(p.x,p.z);return PRV(p.x+p.x/r*0.4,p.y+1.45*1.6,p.z+p.z/r*0.4);};
  let ringT=-1;
  // молнии в туче: зигзаги, вспыхивают на миг
  if(!L.bolts){L.bolts=[0,1,2].map(i=>{const pts=[];let x=(i-1)*7,y=8,z=(i-1)*2;for(let k=0;k<7;k++){pts.push(PRV(x,y,z));x+=(Math.random()-0.5)*3;y-=2.4;z+=(Math.random()-0.5)*1.5;}
      const ln=new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color:0xf0e8ff,transparent:true,opacity:0,fog:false}));L.cloud.add(ln);return ln;});
    L.handGlow=prkGlow(L.hand,0xa070ff,6,0,-0.4,0.3,0);
    L.ring=new THREE.Mesh(new THREE.TorusGeometry(1,0.06,6,40),new THREE.MeshBasicMaterial({color:0xffe080,transparent:true,opacity:0,depthWrite:false,fog:false}));L.g.add(L.ring);
    L.links.forEach(o=>{o.p0=o.m.position.clone();});}
  const bolt=i=>{const b=L.bolts[i];if(b)b.userData.t=G.time;};
  const goldE=L.goldM.emissive.clone();
  const koloA=PRV(-2.3,0,7.4),koloB=PRV(-8.5,0,13.5);
  return {dur:22.6,fov:46,kino:true,mood:['#8a6ad0',0.16],
    shots:[KS(0,prLA(-5.3,8.1,-67.4),prLA(-6,9.3,-70),{p2:prLA(-5,9.4,-66),l2:prLA(-6,13,-76),dur:2.6,move:'none'}),   // 5-1 «Довольно.» — снизу, туча встаёт
      KS(2.8,prLA(7,5,19),prLA(-3,10,-30),{move:'crane',amp:0.6}),   // 5-2 туча идёт на Лукоморье
      KS(4.8,prLA(-4,1.2,10),prLA(-2.3,0.6,7.4),{trk:prFc({g:L.kolo.g},2.6,0,0.55,0.05)}),   // 5-3а Колобок катится прочь
      KS(7.0,prLA(-1.4,4.6,12.6),prLA(-2.2,5.0,3.0),{tr:'whip',move:'push',amp:0.5}),   // 5-3б белка в дупло, русалка в море — обе в кадре
      KS(8.0,prLA(3.0,4.6,6.4),prLA(5.2,4.8,0.4),{tr:'whip',move:'push',amp:0.5}),   // 5-3в Жар-птица прячется, Садко обнимает гусли
      KS(9.0,prLA(0,6.9,-6.0),prLA(0,6.9,-2.65),{trk:prFc(L.kot,3.4,0,0.25,0.15)}),   // 5-4 «Кто там?! Тебя сюда не звали!»
      KS(12.0,prLA(-11,11,12),prLA(-8,12,6),{trk:(pose,u)=>{if(!L.hand.visible)return;const h=prkWP(L.hand),c=lnk();pose.pos.copy(h).add(PRV(-2.4-u*0.6,-1.5+u*0.4,4.2+u*0.8));pose.look.copy(h).lerp(c,0.25+0.35*prkE.io(u));},move:'none'}),   // 5-5 камера ведёт руку: из тучи, снаружи круга — к цепи
      KS(15.0,prLA(0,6.6,-3),prLA(0,6.4,-2.1),{trk:prFc(L.kot,1.05,0,0.08,0.2)}),   // 5-6 глаза Кота
      KS(16.2,prLA(-3.4,8.2,3.0),prLA(-1.7,7.6,1.4),{trk:(pose)=>{const c=lnk(),r=Math.hypot(c.x-PRO.L.x,c.z-PRO.L.z),o=PRV((c.x-PRO.L.x)/r,0,(c.z-PRO.L.z)/r);pose.look.copy(c).add(PRV(0,1.2,0));pose.pos.copy(c).addScaledVector(o,6.2).add(PRV(0,2.0,0));}}),   // 5-7а пальцы смыкаются на звене
      KS(17.0,prLA(-6,3,9),prLA(-2,8,1),{trk:(pose,u)=>{const c=lnk(),r=Math.hypot(c.x-PRO.L.x,c.z-PRO.L.z),o=PRV((c.x-PRO.L.x)/r,0,(c.z-PRO.L.z)/r),sd=PRV(o.z,0,-o.x),d=7.4-1.6*prkE.io(u);
        pose.look.copy(c).add(PRV(0,1.4,0));pose.pos.copy(c).addScaledVector(o,d).addScaledVector(sd,2.2).add(PRV(0,-3.4,0));},tr:'cut'}),   // 5-7б рука тянет — цепь натянута, Кот держит её лапами — разрыв
      KS(18.6,prLA(4,16,34),prLA(0,13,0),{p2:prLA(6,26,64),l2:prLA(0,15,0),dur:4.0,move:'none',tr:'cut'})],   // 5-8 искры — во все стороны
    says:[prkSay(0.6,1.3,'koschei','Довольно.'),prkSay(4.9,2.2,'kolobok','Я от бабушки ушёл —<br>А от тучи — укачусь!'),prkSay(9.2,2.4,'kot','Кто там?! Тебя сюда не звали!'),
      prkSay(20.2,2.1,'kot','Разлетелись звенья по свету —',true)],
    events:[{t:0,fn:()=>{PRK.only('L');PRK.look('night');FIN.music.play('prk_kosh');L.cliff.visible=true;L.fire.visible=true;L.hand.visible=false;L.chain.visible=true;L.crown.visible=true;
        L.links.forEach(o=>{o.m.visible=true;});prkKotScale(1);prkKotChain(0.5,'out');L.raven.g.visible=true;
        L.kolo.g.position.copy(koloA);L.belka.g.visible=true;L.belka.g.scale.setScalar(1.05);L.mer.g.visible=true;L.mer.g.position.set(-4.9,7.65,0.9);
        {const sp=L.spiral(U);L.hand.position.set(sp.x,24,sp.z);}L.fingers.forEach(f=>{f.p.rotation.x=0;f.d.rotation.x=0;});cloudT=0;}},
      {t:2.8,fn:()=>{PRK.look('storm');L.moon.visible=false;}},{t:3.6,fn:()=>{L.flames.forEach(f=>f.scale.setScalar(0.01));L.fireGlow.visible=false;}},
      {t:9.0,fn:()=>{L.raven.g.visible=false;}},{t:12.0,fn:()=>{L.hand.visible=true;L.hand.scale.setScalar(1.6);}},
      {t:18.35,fn:()=>prkBlack(1)},{t:18.6,fn:()=>{L.chain.visible=false;L.hand.visible=false;sparkT=0;
        const sp=L.spiral(U),c=PRV(sp.x,sp.y,sp.z);L.sparks.forEach(p=>{p.s.visible=true;p.s.position.copy(c);const a=Math.random()*6.283,e=(Math.random()-0.3)*1.2;p.v.set(Math.cos(a)*Math.cos(e),Math.sin(e)+0.3,Math.sin(a)*Math.cos(e)).multiplyScalar(6+Math.random()*10);p.life=2.5+Math.random()*1.5;p.s.material.opacity=1;});
        const dirs=[[-1,0.35,0],[-0.89,0.4,0.45],[-0.89,0.45,-0.45],[-0.71,0.3,0.71],[0,0.4,-1]];L.big.forEach((b,i)=>{b.visible=true;b.position.copy(c);b.userData.v=PRV(...dirs[i]).normalize().multiplyScalar(24);});}},
      {t:18.85,fn:()=>prkBlack(0)}],
    cues:[[0.4,()=>{CINE.dutch(0.12);PSN.menace(0);}],[1.0,()=>{psfx('whoosh')();PSN.caw(0.2);}],[2.9,()=>{PSN.gust&&PSN.gust(0);shakeAll(0.08,0.5);}],[3.6,()=>{PSN.puff(0);FX.dust(prkP(PRO.L,0,0.6,5.2),14,0x6a6a7a,1.2);}],
      [4.9,()=>PSN.peep&&PSN.peep(0)],[7.1,()=>{PSN.poof(0);}],[7.4,()=>{FX.drops&&FX.drops(prkP(PRO.L,-8,0,4),16);psfx('splash')();}],[8.1,()=>PSN.flaps(0)],
      [9.2,()=>{PSN.sting(0);CINE.punch(1.5);}],[12.2,()=>{CINE.slowmo(0.5,1.6);psfx('keys')();}],[13.2,()=>psfx('keys')()],[14.2,()=>PSN.menace(0)],[15.1,()=>{CINE.dollyZoom&&CINE.dollyZoom(0.3,1.0,0.2);}],
      // гроза: молнии в туче (≤ 3 вспышек в секунду), гром, ветер срывает листья с дуба
      [12.05,()=>{bolt(0);PSN.thunder&&PSN.thunder(0);CINE.flashDip('#d8c8ff',0.22);}],[12.9,()=>{bolt(1);}],[13.6,()=>{FX.leaves(prkP(PRO.L,0,13,0),24,0x6a8a3a);PSN.gust&&PSN.gust(0);}],[14.4,()=>{bolt(2);PSN.thunder&&PSN.thunder(0.05);CINE.flashDip('#d8c8ff',0.2);}],
      [16.4,()=>PSN.creak(0)],[16.85,()=>{CINE.hitstop(4);CINE.punch(1.5);}],
      [17.05,()=>{KC.emo('kot','surprise')();PSN.creak(0);}],[17.35,()=>{PSN.creak(0.1);shakeAll(0.06,0.3);FX.sparks(lnk(),8,0xff6040);}],[17.75,()=>{CINE.slowmo(0.4,0.6);PSN.menace(0);bolt(0);}],
      [18.25,()=>{CINE.hitstop(4);CINE.punch(1.8);CINE.flashDip('#fff0c0',0.3);shakeAll(0.12,0.35);psfx('dzin')();FX.sparks(lnk(),24,0xffe080);FX.stars(lnk(),8,0xffe080);ringT=0;}],
      [18.65,()=>{psfx('dzin')();PSN.icy&&PSN.icy(0);}],[18.9,()=>{CINE.flashDip('#ffe080',0.45);psfx('link')();}],[19.6,()=>PSN.trill(0)]],
    tick:(t,dt)=>{dt=dt||0;
      // туча: встаёт над утёсом (0,8–2,8), потом катится к дубу и накрывает его
      if(cloudT>=0){const k1=prkE.o(clamp((t-0.8)/2.0,0,1)),k2=prkE.io(clamp((t-2.9)/3.4,0,1));L.cloudBlobs.forEach((b,i)=>{b.scale.setScalar(Math.max(0.01,k1*(1+k2*0.8)));});
        L.cloud.position.set(lerp(-6,0,k2),lerp(6,16,k2)+k1*2,lerp(-96,-3,k2));if(t>18.6)L.cloudBlobs.forEach(b=>{b.scale.multiplyScalar(1-dt*0.9);});}
      // ворон срывается с плеча
      if(t>1.0&&t<9){const k=(t-1.0)/2.5;L.raven.g.position.set(0.42+k*3,2.25+k*4,-0.05-k*6);}
      // костёр гаснет, трава в инее
      L.grassM.color.setHex(0x6f9a4a).lerp(new THREE.Color(0x9ab4c4),clamp((t-3.2)/2,0,1));
      // Колобок катится прочь
      {const k=prkE.io(clamp((t-4.8)/2.3,0,1));L.kolo.g.position.lerpVectors(koloA,koloB,k);L.kolo.g.rotation.y=Math.atan2(koloB.x-koloA.x,koloB.z-koloA.z);if(L.kolo.ball)L.kolo.ball.rotation.x=k*14;L.kolo.g.position.y=Math.abs(Math.sin(t*10))*0.15*(k>0&&k<1?1:0);}
      // белка — в дупло, русалка — в море
      {const k=clamp((t-7.0)/0.85,0,1);L.belka.g.position.set(lerp(2.4,0.9,k),Math.sin(k*Math.PI)*1.6+k*1.4,lerp(7.8,2.2,k));L.belka.g.scale.setScalar(Math.max(0.01,1.05*(1-Math.max(0,k-0.8)*5)));}
      {const k=clamp((t-7.15)/0.75,0,1);L.mer.g.position.set(lerp(-4.9,-8,k),7.65-prkE.i(k)*8.6,lerp(0.9,4,k));L.mer.g.visible=k<1;}
      // Жар-птица прячет голову, Садко обнимает гусли
      if(L.zhar.head)L.zhar.head.rotation.x=t>8?0.9*clamp((t-8)/0.4,0,1):0;if(L.sadko.body)L.sadko.body.rotation.x=t>8?0.35*clamp((t-8.1)/0.4,0,1):0;
      // Кот: шерсть дыбом (одуванчик), смотрит вверх на руку
      {const k=t>9.0?prkE.back(clamp((t-9.0)/0.35,0,1)):0;prkKotScale(1+k*0.22,1-k*0.12);if(L.kot.head)L.kot.head.rotation.x=t>14.6?-0.35*clamp((t-14.6)/0.5,0,1):0;}
      // рука: опускается к цепи, пальцы смыкаются на звене
      // рука тянется снаружи, из-за круга (звено висит прямо под кроной — сверху её не видно), по дуге; перед хватком — замах вверх
      if(L.hand.visible){const b=handTo(),r=Math.hypot(b.x,b.z)||1,a=PRV(b.x+b.x/r*11,13,b.z+b.z/r*11),k=prkE.io(clamp((t-12.0)/3.2,0,1));L.hand.position.lerpVectors(a,b,k);L.hand.rotation.y=-0.4;
        L.hand.position.y+=Math.sin(k*Math.PI)*0.5+(t>15.6&&t<16.3?Math.sin((t-15.6)/0.7*Math.PI*0.5)*0.4:t>=16.3&&t<16.45?0.4*(1-(t-16.3)/0.15):0);
        // рывки: тянет цепь вверх — три рывка, на четвёртом рвёт
        const tug=t>17.0&&t<18.25?Math.abs(Math.sin((t-17.0)*Math.PI*2.2))*(0.35+(t-17.0)*0.5):t>=18.25?Math.min(6,(t-18.25)*14):0;L.hand.position.y+=tug;L.hand.rotation.z=t>17&&t<18.3?Math.sin(t*30)*0.03:0;
        L.handGlow.material.opacity=clamp((t-12.0)/0.8,0,1)*(0.45+0.15*Math.sin(t*5))+(t>17&&t<18.3?0.25:0);if(Math.random()<dt*10)FX.sparkle(prkWP(L.hand).add(PRV(0,-0.6,0)),1,0xb8d8ff);
        const c=prkE.io(clamp((t-16.3)/0.6,0,1));L.fingers.forEach(f=>{f.p.rotation.x=-c*1.1;f.d.rotation.x=-c*1.2;});L.thumb.rotation.x=c*0.8;}
      // искры: пять больших звеньев улетают в пять сторон
      // молнии гаснут; цепь натягивается к руке и раскаляется; Кот вцепился в неё и дрожит; кольцо ударной волны
      L.bolts.forEach(b=>{const u=b.userData.t!=null?G.time-b.userData.t:9;b.material.opacity=u<0.16?1-u/0.16:0;});
      {const st=t>16.5&&t<18.3?prkE.io(clamp((t-16.5)/1.6,0,1)):0,hp=L.chain.worldToLocal(prkWP(L.hand).add(PRV(0,-1.4,0)));
        L.links.forEach(o=>{const du=Math.abs(o.u-U);if(du>0.14||!o.p0)return;const w=(1-du/0.14)**2*st*0.55;o.m.position.copy(o.p0).lerp(hp,w);});
        L.goldM.emissive.copy(goldE).lerp(new THREE.Color(0xff3010),st*0.8);L.goldM.emissiveIntensity=0.55+st*0.6;
        if(t>17.0&&t<18.3){L.kot.g.rotation.z=Math.sin(t*34)*0.05;L.kot.g.rotation.x=-0.25;}else if(t>=18.3){L.kot.g.rotation.x=0;L.kot.g.rotation.z=0;}}
      if(ringT>=0){ringT+=dt;const k=clamp(ringT/0.8,0,1);L.ring.position.copy(L.g.worldToLocal(lnk()));L.ring.lookAt(prkWP(L.ring).add(PRV(0,1,0)));L.ring.scale.setScalar(0.5+prkE.o(k)*14);L.ring.material.opacity=(1-k)*0.85;}
      if(sparkT>=0)L.big.forEach(b=>{if(b.visible){b.position.addScaledVector(b.userData.v,dt);b.rotation.y+=dt*6;if(b.position.length()>130)b.visible=false;}});},
    end:()=>{prkBlack(0);prkKotScale(1);L.big.forEach(b=>{b.visible=false;});L.hand.scale.setScalar(1);L.ring.material.opacity=0;L.goldM.emissive.copy(goldE);L.goldM.emissiveIntensity=0.55;
      L.links.forEach(o=>{if(o.p0)o.m.position.copy(o.p0);});L.kot.g.rotation.x=0;L.kot.g.rotation.z=0;if(L.kolo.ball)L.kolo.ball.rotation.x=0;PRK.next();}};}

/* ============================== СЦЕНА 6 «ПЯТЬ СТОРОН» ============================== */
function prkS6(){const L=prL(),P=prPm(),D=PRK.Wd,O=PRO.P,pe=PRK_T.pelageya;let rainT=-1;
  const look=(k,w)=>()=>{PRK.only(w);PRK.look(k);};
  return {dur:18.4,fov:46,kino:true,mood:['#8a9ad0',0.12],
    shots:[KS(0,prWA('W1',0,2.0,12),prWA('W1',0.4,7.2,-12),{move:'push',amp:0.8,tr:'cut'}),   // 6-1 лес: снизу — на встающего Лешего
      KS(1.8,prWA('W2',4,2.0,9),prWA('W2',0,3.6,-9),{move:'crane',amp:0.6,tr:'cut'}),   // 6-2 Китеж: Водяной на соме над куполами
      KS(3.6,prWA('W3',2,-4,6),prWA('W3',-1,2,-6),{p2:prWA('W3',1.8,3.6,3.4),l2:prWA('W3',0.3,5.0,-9),dur:1.8,move:'none',tr:'cut'}),   // 6-3 сад за облаками
      KS(5.4,prWA('W4',-5,4.5,9),prWA('W4',2,3.6,-13),{move:'push',amp:0.7,tr:'cut'}),   // 6-4 Смородина
      KS(7.2,prWA('W5',3,2.4,11),prWA('W5',-1.2,3.8,-1),{move:'push',amp:0.7,tr:'cut'}),   // 6-5 Буян: Лихо у дуба
      KS(9.2,prLA(1.4,2.0,7.4),prLA(0.6,0.8,3.2),{p2:prLA(1.6,2.7,9.8),l2:prLA(0.4,1.1,3.0),dur:3.8,move:'none'}),   // 6-6 Лукоморье без цепи
      KS(13.0,prPA(-0.8,12.75,7.5),prPA(40,9.6,3),{trk:KC.look(()=>prkWP(P.zv),0.08),move:'push',amp:0.35}),   // 6-7 Пелагея и звёздный дождь: камера тянется за искрой
      KS(15.8,prPA(3.4,12.3,6.8),prPA(1.6,11.9,6.3),{trk:prFc0(pe,1.9,0.25,0.08,0.12)})],   // 6-8 «Ой… летит… к нам!» (поворот — на начало плана: без рывка)
    says:[prkSay(0.1,1.6,'kot','В лес дремучий…',true),prkSay(1.9,1.6,'kot','…в Китеж подводный…',true),prkSay(3.7,1.6,'kot','…за облака…',true),prkSay(5.5,1.7,'kot','…за огненную реку…',true),
      prkSay(7.3,1.8,'kot','…на остров Буян.',true),prkSay(9.4,3.6,'kot','Без цепи сказки забываются —<br>Слово за словом рассыпаются.',true),prkSay(16.0,1.9,'pelageya','<i>(шёпотом)</i> Ой… летит… к нам!')],
    events:[{t:0,fn:()=>{look('forest','w1')();FIN.music.play('prk_quiet');for(const pi of[0,1])players[pi].heroes.forEach((h,k)=>{if(h.kind==='pelageya')return;const s=W.spawns[pi][k];placeOnGround(h,s.x,s.z,s.y||0);});const w=D.w1;w.walk.forEach(f=>f.position.copy(f.userData.p0));w.lesh.g.position.y=-12;w.hut.g.rotation.y=-0.4;
        prkFallAnim(w.sp,prkP(PRO.W1,0,20,-4),prkP(PRO.W1,0.6,0.5,-4),1.0);}},
      {t:1.8,fn:()=>{look('kitezh','w2')();const w=D.w2;w.somAt(-0.6);FIN.k2v.set(w.vod,'ride','angry');w.str.forEach(s=>{s.visible=true;});prkFallAnim(w.sp,prkP(PRO.W2,-1,13,-4),prkP(PRO.W2,-1.4,0.5,-4.2),1.1);}},
      {t:3.6,fn:()=>{look('heaven','w3')();const w=D.w3;prkGrey(w.fb.g,0);w.leaf.color.setHex(0x5ab04a);w.feather.visible=false;prkFallAnim(w.sp,prkP(PRO.W3,1,-8,-5),prkP(PRO.W3,-1,3.2,-6.4),1.0);}},
      {t:5.4,fn:()=>{look('smor','w4')();const w=D.w4;w.fire.forEach(f=>f.visible=false);prkFallAnim(w.sp,prkP(PRO.W4,1,16,-8),prkP(PRO.W4,1,-0.4,-8),0.8);}},
      {t:7.2,fn:()=>{look('buyan','w5')();const w=D.w5;w.lih.lid.rotation.x=1.1;w.eyeGlow.material.opacity=0;w.chest.rotation.z=0;prkFallAnim(w.sp,prkP(PRO.W5,3.6,16,-2.4),prkP(PRO.W5,3.6,5.8,-2.4),0.8);}},
      {t:9.2,fn:()=>{PRK.only('L');PRK.look('grey');FIN.music.play('prk_quiet');L.crown.visible=false;L.chain.visible=false;L.fire.visible=false;L.cliff.visible=false;L.hand.visible=false;
        L.kot.g.position.set(1.3,0,3.5);L.kot.g.rotation.set(0,0.15,0);prkKotScale(1.3);if(L.kot.head)L.kot.head.rotation.x=0.35;L.kolo.g.visible=false;L.belka.g.visible=false;L.sadko.g.visible=false;L.zhar.g.visible=false;L.leshy.g.visible=false;L.mer.g.visible=false;
        L.grassM.color.setHex(0x7a8a6a);L.letters.forEach((s,i)=>{s.visible=true;s.material.color.setHex(0xffffff);s.material.opacity=0;s.position.set(-1.9+(Math.random()-0.5)*0.6,0.3,3.0+(Math.random()-0.5)*0.4);s.userData.ph=Math.random()*2;});}},
      {t:13.0,fn:()=>{PRK.only('P');PRK.look('pnight');FIN.music.play('prk_night');prPl(pe,O.x+1.6,O.z+6.3,11,PRV(O.x+40,12,O.z+6));rainT=0;
        P.zv.visible=true;P.zv.position.set(170,34,40);P.rv.g.visible=true;}}],
    cues:[[0.15,()=>prkMot('flute',[[69,0.5],[72,0.5],[74,1],[72,1]],0.3,0.09)],[1.0,()=>{prkBurst(prkP(PRO.W1,0.6,0.6,-4),0xffd060,10);psfx('link')();}],[1.2,()=>PSN.creak(0)],
      [1.9,()=>prkMot('bell',[[64,1],[67,1],[69,2]],0.28,0.1)],[2.95,()=>{PSN.snap(0);}],[3.7,()=>prkMot('harp',[[76,0.5],[79,0.5],[81,0.5],[84,1]],0.24,0.08)],[4.4,()=>PSN.sadCoo(0)],
      [5.5,()=>prkMot('pluck',[[52,0.5],[52,0.5],[55,1],[52,1]],0.26,0.1)],[6.2,()=>{prkBurst(prkP(PRO.W4,1,0,-8),0xff7a20,16);psfx('splash')();}],[6.75,()=>{PSN.thud(0);CINE.punch(1.2);}],
      [7.3,()=>prkMot('flute',[[62,1],[65,0.5],[64,0.5],[62,1.5]],0.28,0.09)],[8.0,()=>{psfx('clink')();prkBurst(prkP(PRO.W5,3.6,5.8,-2.4),0xffd060,10);}],[8.4,()=>PSN.creak(0)],
      [9.4,()=>{FX.leaves(prkP(PRO.L,0,10,0),30,0xa89a6a);prkMot('harp',[[67,1],[null,0.5],[71,1],[null,1],[69,2]],0.4,0.06);}],[11.4,()=>FX.leaves(prkP(PRO.L,1,10,1),20,0x9a8a5a)],
      [13.2,()=>psfx('dzin')()],[14.6,()=>{psfx('dzin')();}],[16.15,KC.emo('pelageya','surprise')],[17.7,()=>{KC.emo('pelageya','hop')();PSN.flaps(0);}]],
    tick:(t,dt)=>{dt=dt||0;
      // лес: ели переступают и смыкаются, из чащи встаёт Леший выше елей, избушка — задом
      if(t<1.8){const w=D.w1,k=prkE.io(clamp((t-0.4)/1.2,0,1));w.walk.forEach(f=>{f.position.x=f.userData.p0.x*(1-k*0.45);f.position.y=Math.abs(Math.sin(t*12))*0.15*(k>0&&k<1?1:0);});
        const up=prkE.o(clamp((t-0.15)/1.15,0,1));w.lesh.g.position.y=-12+12*up;w.lesh.g.rotation.z=Math.sin(t*2.2)*0.04;w.hut.g.rotation.y=-0.4+Math.PI*prkE.io(clamp((t-0.6)/1.1,0,1));}
      // Китеж: Водяной на соме кружит над куполами и рычит, колокол качается без звона, струна лопается
      if(t>=1.8&&t<3.6){const w=D.w2;w.bell.rotation.z=Math.sin((t-1.8)*3.2)*0.35;if(t>2.95)w.str[2].visible=false;w.somAt(-0.6+(t-1.8)*0.75);if(t>2.5&&w.vod.st.pose!=='roar')FIN.k2v.set(w.vod,'roar','angry');}
      // сад: яблони сереют, Жар-птица тускнеет, перо падает
      if(t>=3.6&&t<5.4){const w=D.w3,k=clamp((t-3.9)/1.3,0,1);w.leaf.color.setHex(0x5ab04a).lerp(new THREE.Color(0x8a8a90),k);prkGrey(w.fb.g,k);
        const S=w.sol,pf=clamp((t-3.8)/0.4,0,1);if(S.cheeks)S.cheeks.forEach(c=>c.scale.setScalar(1+pf*0.9));if(S.wings)S.wings.forEach(q=>{q.wp.rotation.z=q.s*(0.5+pf*0.7+Math.sin(t*14)*0.12*pf);});
        w.gust.forEach(m=>{const u=((t-3.6)*1.3+m.userData.ph)%1;m.scale.setScalar(1+u*3.2);m.position.z=2+u*12;m.rotation.z=u*2+m.userData.ph*6;m.material.opacity=pf*(1-u)*0.55;});
        const f=clamp((t-4.4)/1.0,0,1);w.feather.visible=f>0;w.feather.position.set(-1+Math.sin(f*6)*0.4,3-f*3.2,-6+f*0.6);w.feather.rotation.z=Math.sin(f*8)*0.6;}
      // Смородина: головы Горыныча из пара — к искре — лбами
      if(t>=5.4&&t<7.2){const w=D.w4,N=w.gor.necks||[];const up=prkE.o(clamp((t-5.6)/0.8,0,1)),bonk=Math.sin(clamp((t-6.5)/0.45,0,1)*Math.PI);w.gor.g.position.y=-6+up*5;
        const H=w.gor.heads||[],PV=w.gor.piv||[];
        N.forEach((n,i)=>{if(!n)return;n.rotation.z=(i-1)*-0.35*bonk;n.rotation.x=-0.25*up;
          // голова — за своей шеей: тот же поворот вокруг основания шеи
          const h=H[i],pv=PV[i];if(h&&pv){h.g.position.copy(h.base).sub(pv).applyEuler(n.rotation).add(pv);h.g.rotation.copy(n.rotation);}});
        // после «бом» — три столба огня в небо
        const fk=clamp((t-6.85)/0.3,0,1);w.fire.forEach((f,i)=>{const h=H[i];f.visible=fk>0&&!!h;if(!f.visible)return;w.gor.g.updateMatrixWorld(true);f.position.copy(w.g.worldToLocal(h.g.getWorldPosition(new THREE.Vector3())));
          f.scale.setScalar(0.4+fk*1.1+Math.sin(t*30+i)*0.06);f.rotation.z=(i-1)*0.35;});}
      // Буян: сундук качается, Лихо поднимает голову и открывает свой единственный глаз
      if(t>=7.2&&t<9.2){const w=D.w5,k=prkE.o(clamp((t-8.4)/0.5,0,1));w.chest.rotation.z=t>8?Math.sin((t-8)*6)*0.25*Math.exp(-(t-8)*0.8):0;
        w.lih.lid.rotation.x=lerp(1.1,-1.25,k);w.eyeGlow.material.opacity=k*0.85;if(w.lih.head)w.lih.head.rotation.x=lerp(0.3,-0.05,prkE.o(clamp((t-8.1)/0.6,0,1)));}
      // Лукоморье: буквы встают из книги и рассыпаются серым пеплом
      if(t>=9.2&&t<13){const L0=L;L0.letters.forEach((s,i)=>{const k=clamp((t-9.5-i*0.1)/2.2,0,1);s.position.y=0.3+k*2.4;s.position.x+=Math.sin(t*3+i)*0.004;
        s.material.color.setHex(0xffe08a).lerp(new THREE.Color(0x6a6a70),clamp(k*1.6,0,1));s.material.opacity=Math.sin(k*Math.PI)*0.95;});}
      // Кот у корней сереет, каменеет и закрывает глаза (в ролике прибытия на Лукоморье его разбудит Звенышко)
      if(t>=9.2&&t<13){const k=clamp((t-10.0)/2.6,0,1);PRK.calm=1-k;prkGrey(L.kot.g,k*0.85,0x8a96a8);if(L.kot.lids)L.kot.lids.forEach(l=>{if(l&&l.rotation)l.rotation.x=lerp(-0.5,1.3,clamp((t-11.6)/0.8,0,1));});}
      // звёздный дождь и искра, свернувшая к сосне
      if(rainT>=0&&t>=13){P.rain.forEach((r,i)=>{if(r.t<0&&Math.random()<dt*2.5){r.t=0;r.s.visible=true;r.s.position.set(110+Math.random()*90,26+Math.random()*22,(Math.random()-0.6)*120);r.v.set(0,-14-Math.random()*6,-22-Math.random()*10);
          r.tr.lookAt(prkWP(r.s).add(r.v.clone().normalize().multiplyScalar(-1)));r.tr.rotateX(Math.PI/2);}});
        const k=prkE.io(clamp((t-13.6)/4.6,0,1));P.zv.position.set(lerp(170,60,k),lerp(34,18,k),lerp(40,12,k));P.zv.rotation.y=t*5;P.rv.g.position.copy(P.zv.position).add(PRV(14,3,6));P.rv.g.lookAt(prkWP(P.zv));}
      // 6-8: Пелагея слетает к двери
      if(t>17.8){const k=prkE.io(clamp((t-17.8)/0.6,0,1));pe.pos.set(O.x+lerp(1.6,-0.6,k),lerp(11,0,k)+Math.sin(k*Math.PI)*0.8,O.z+lerp(6.3,6.6,k));pe.vel.set(0,0,0);}},
    end:()=>{L.letters.forEach(s=>{s.visible=false;});PRK.next();}};}

/* ============================== СЦЕНА 7 «ПРИСКАЗКА» ============================== */
function prkS7(){const P=prPm(),O=PRO.P;let titleOn=false;
  const win=[Math.sin(Math.PI-0.85)*6.9,2.55,Math.cos(Math.PI-0.85)*6.9];
  return {dur:11.4,fov:46,kino:true,mood:['#ffc070',0.1],
    shots:[KS(0,prPA(7,-2.5,24),prPA(0,7,0),{p2:prPA(5,1.5,22),l2:prPA(0,9,0),dur:4.0,move:'none'}),   // 7-1 сосна снизу, искра-комета, туча
      KS(4.0,prPA(3.0,3.5,10),prPA(1.36,3.3,3.22),{p2:prPA(2.1,3.35,5.0),l2:prPA(1.36,3.3,3.22),dur:2.0,move:'none'}),   // 7-2а к окну
      KS(6.0,[0,3.2,10.4],[0,1.3,-1.2],{p2:[0,2.6,8.2],l2:[0,1.2,-1.6],dur:2.0,move:'none',tr:'dip'}),   // 7-2б в комнате: спорят, кто расскажет
      KS(8.0,[win[0]-2.0,2.45,win[2]+2.2],win,{move:'push',amp:0.4})],   // 7-3 круглое окно — титул
    says:[prkSay(0.2,1.9,'kot','Кто соберёт звено к звену?',true),prkSay(2.1,1.9,'kot','Кто сказку вспомнит — не одну?',true),prkSay(4.2,3.6,'kot','Это присказка, не сказка.<br>Сказка — будет впереди!',true)],
    events:[{t:0,fn:()=>{PRK.only('P');PRK.look('pnight');FIN.music.play('hub');P.cloud.visible=true;P.zv.visible=true;P.rv.g.visible=true;}},
      {t:6.0,fn:()=>PRK.toRoom()},{t:8.0,fn:()=>{titleOn=true;}}],
    cues:[[0.3,()=>psfx('dzin')()],[4.4,()=>PSN.trill(0)],[6.2,()=>{KC.all('laugh',0.1)();}],[7.2,KC.emo('pelageya','joy')],[8.1,()=>{prkTitle(true);psfx('dzin')();FX.sparkle(prkV(win),14,0xffe08a);}],[8.4,()=>{FX.confetti(prkV(win).add(PRV(0,0.4,0)),30,1.2);PSN.yay(0);}],[9.6,()=>psfx('link')()]],
    tick:(t,dt)=>{dt=dt||0;if(t<6){const k=t/6;P.zv.position.set(lerp(60,30,k),lerp(18,14,k),lerp(12,40,k));P.zv.rotation.y=t*5;P.rv.g.position.copy(P.zv.position).add(PRV(5,2.5,10));P.cloud.position.z=-80+k*14;}},
    end:()=>{prkTitle(false);PRK.finish();}};}

/* ============================== ХОД «ПРИСКАЗКИ» ============================== */
PRK.scenes=[prkS1,prkS2,prkS3,prkS4,prkS5,prkS6,prkS7];
PRK.run=function(i){PRK.i=i;let def;try{def=PRK.scenes[i]();}catch(e){console.error(e);PRK.finish();return;}play(def);const S=G.cine;
  if(S&&S.skip){const sk=S.skip;S.skip=function(){PRK.skipped=true;return sk.apply(this,arguments);};}};
PRK.next=function(){if(!PRK.on)return;if(PRK.skipped||PRK.i+1>=PRK.scenes.length){PRK.finish();return;}PRK.run(PRK.i+1);};
PRK.start=function(){if(PRK.on)return;PRK.on=true;PRK.skipped=false;PRK.inRoom=false;PRK.att=[];PRK.saveLook();
  PRK.heroes0=HEROES.map(h=>({h,pos:h.pos.clone(),face:h.face}));PRK.hideLevel();
  try{PRK.build();}catch(e){console.error(e);PRK.on=false;PRK.showLevel();PRK.restoreLook();return;}
  $('level').style.opacity=0;PRK.run(0);};
// в комнату пролога: уровень видим, площадки скрыты, свет — как был, герои — на местах, вещи сняты
PRK.toRoom=function(){if(PRK.inRoom)return;PRK.inRoom=true;PRK.showLevel();PRK.only(null);PRK.restoreLook();
  (PRK.att||[]).forEach(o=>{if(o.parent)o.parent.remove(o);});PRK.att=[];
  for(const pi of[0,1]){const p=players[pi];p.heroes.forEach((h,k)=>{const s=W.spawns[pi][k];h.face=W.spawnFace?W.spawnFace[pi][k]:Math.PI;placeOnGround(h,s.x,s.z,s.y||0);h.vel.set(0,0,0);h.following=false;h.g.scale.setScalar(1);});}
  prkPlate(null);};
PRK.finish=function(){if(!PRK.on)return;PRK.toRoom();PRK.on=false;PRK.inRoom=false;PRK.dispose();prkTitle(false);prkBlack(0);const el=$('prkPlate');if(el)el.classList.remove('on');
  FIN.music.play(null);snapCams();if(PRK.skipped&&G.state==='play')showTitle();};
// уровень сменили посреди ролика (меню, бот) — убрать за собой
{const _ll=loadLevel;loadLevel=function(i){if(PRK.on){PRK.on=false;PRK.inRoom=false;PRK.showLevel();PRK.restoreLook();(PRK.att||[]).forEach(o=>{if(o.parent)o.parent.remove(o);});PRK.att=[];PRK.dispose();prkTitle(false);prkBlack(0);}
  _ll(i);if(FIN.introWant&&W.levelId==='p'){FIN.introWant=false;try{PRK.start();}catch(e){console.error(e);}}};}
// название уровня не всплывает поверх «Присказки» (титул пролога — в её последнем кадре)
{const _st=showTitle;showTitle=function(){if(PRK.on)return;_st();};}
// для ботов: последняя реплика и за кадром ли она
{const _s=say;say=function(who,text,dur,nv){if(!PRK.on)return _s(who,text,dur,nv);PRK.lastSay={who,text,vo:!!nv,t:G.time,until:G.time+(dur||2.5)};PRK.curVO=!!nv;
  try{return _s(who,text,dur,nv);}finally{PRK.curVO=false;}};}
// голос за кадром (Кот-рассказчик) — не «говорящий»: режиссёр (late_82) не разворачивает к нему камеру, герои не оглядываются
{const _cs=cineSay;cineSay=function(who,text,dur){if(PRK.on&&PRK.curVO)return;return _cs(who,text,dur);};}
// «Главы» → «Присказка» первой строкой
{const _cs=chaptersScreen;chaptersScreen=function(){const s=_cs();s.items.unshift({label:'Присказка',sub:'вступление: Кот Учёный, Златая цепь и Лесной патруль',
  act:()=>finGo(()=>{FIN.introWant=true;const sv=FIN.readSave();if(sv)FIN.continueGame(LV('p'));else startFrom(0);})});s.sel=(s.sel||0)+1;return s;};}
