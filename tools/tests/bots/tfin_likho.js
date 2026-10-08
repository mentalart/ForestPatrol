//@@ wait=300
// релиз: Лихо Одноглазое (5-1), бой «без ударов» с поляны: фаза 1 зеркальце → фаза 2 овечки → фаза 3 колыбельная → сундук.
// Проверки: стадии идут boss1 → boss2 → boss3 → сундук; баннер каждой фазы и подсказки боя ≤ 7 слов в подписи (≤ 10 жёстко), на экране ≥ 5 с с tipMul мира 5;
// полоса босса показывает «Лихо … N / 3»; сундук открыт.
window.ERR=[];window.addEventListener('error',e=>ERR.push(String(e.message)));
Math.random=(()=>{let q=777;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
ZC.startFrom(ZC.LV('5-1'));ZC.G.manual=true;ZC.tick(60);
window.BAD=[];window.chk=(c,m)=>{if(!c)BAD.push(m);return c;};
window.SEEN={};window.words=t=>t.replace(/<[^>]+>/g,' ').split(/\s+/).filter(w=>w&&!/^[·—–\-\/]+$/.test(w)).length;
window.tk=n=>{for(let i=0;i<n;i++){ZC.tick(1);const b=document.getElementById('banner');if(b&&b.style.opacity==='1'&&b.innerHTML){const sm=b.querySelector('small'),s=sm?sm.textContent:'',h=b.firstChild?b.firstChild.textContent:'';SEEN[h]=SEEN[h]||{sub:s,n:0};SEEN[h].n++;}}};
const W=ZC.W,F=W.flags,B=F.B;const r=[];
window.B51={eye(){const L=ZC.W.likhos[1];const p=new THREE.Vector3();L.m.eye.getWorldPosition(p);return p;},faceAway(pi){const h=U.act(pi),e=B51.eye();h.face=Math.atan2(h.pos.x-e.x,h.pos.z-e.z);}};
r.push(W.warp51('boss1'));for(let q=0;q<6&&ZC.G.cine;q++){ZC.skip();ZC.tick(3);}ZC.tick(5);
chk(F.stage==='boss1'&&B.ph===1,'фаза 1 не началась: '+F.stage);
chk(W.tipMul>=1.5,'tipMul мира 5 = '+W.tipMul+' (ждали ≥ 1,5)');
r.push('tipMul='+W.tipMul,'stage='+F.stage);
// фаза 1: зеркальце в руки Пелагее, Потап — в кольцо-приманку
const L=W.likhos[1];r.push(U.walkTo(0,-3.5,-125.4,6));r.push(U.walkTo(1,0.6,-125.3,6));U.tap('Semicolon');tk(3);
const between=t=>{const e=B51.eye(),b=U.act(0).pos;return [e.x+(b.x-e.x)*t,e.z+(b.z-e.z)*t];};
for(let n=0;n<4&&B.refl<3;n++){const r0=B.refl;for(let i=0;i<60*8;i++){if(!L.goal&&!(L.daze>0))break;tk(1);}
  if(B.refl===2){const e=B51.eye();U.path(1,[[e.x+4.5,U.act(1).pos.z],[e.x+4.5,e.z+5.2],[e.x,e.z+5.2]],6);B51.faceAway(1);for(let i=0;i<60*16&&B.refl===r0;i++){B51.faceAway(1);tk(1);}}
  else{const [x,z]=between(0.45);U.path(1,[[x+4.5,U.act(1).pos.z],[x+4.5,z],[x,z]],6);B51.faceAway(1);for(let i=0;i<60*6&&B.refl===r0;i++){B51.faceAway(1);tk(1);}}}
r.push('refl='+B.refl);chk(B.refl>=3,'фаза 1 не пройдена: refl='+B.refl);
// фаза 2: овечки прыгают через бревно по очереди
tk(240);if(ZC.G.cine){ZC.skip();tk(3);}chk(B.ph===2,'фаза 2 не началась: ph='+B.ph);
r.push(U.walkTo(0,-5,-130.2,6),U.walkTo(1,-2,-130.2,6));const K=[['KeyW','KeyS','Space'],['ArrowUp','ArrowDown','KeyM']];
for(let n=0;n<24&&B.count<8&&F.stage==='boss2';n++){const pi=n%2,h=U.act(pi),k=K[pi];const north=h.pos.z>-131.5;ZC.hold(north?k[0]:k[1],true);tk(4);ZC.press(k[2]);tk(34);ZC.hold(k[0],false);ZC.hold(k[1],false);tk(40);}
r.push('count='+B.count);chk(B.count>=8,'фаза 2 не пройдена: count='+B.count);
// фаза 3: колыбельная на гуслях у головы, перо у лапы
tk(120);if(ZC.G.cine){ZC.skip();tk(3);}chk(B.ph===3,'фаза 3 не началась: ph='+B.ph);
const gs=W.signs.find(s=>s.item==='gusli'&&s.on&&s.on()&&s.z<-130),ps=W.signs.find(s=>s.item==='pero'&&s.on&&s.on()&&s.z<-130);
r.push(U.walkTo(1,gs.x,gs.z,6),U.walkTo(0,ps.x,ps.z,6));U.tap('KeyR');tk(2);
for(let i=0;i<60*60&&F.stage!=='chest'&&F.stage!=='end'&&F.stage!=='bossEnd';i++){if(i%100===0)ZC.press('Semicolon');tk(1);}
r.push('stage='+F.stage);
// сундук: крышку поднимают вдвоём
for(let i=0;i<60*30&&F.stage!=='chest';i++){if(ZC.G.cine){ZC.skip();tk(5);}else tk(1);}r.push('stage='+F.stage);chk(F.stage==='chest','сундук не дождались: '+F.stage);
const C=W.dbg51.chest.g.position;for(const pi of[0,1]){U.walkTo(pi,C.x+(pi?1.4:-1.4),C.z+1.3,6);const h=U.act(pi);h.face=Math.atan2(C.x-h.pos.x,C.z-h.pos.z);}
U.tap('KeyF');tk(12);U.tap('Comma');tk(150);r.push('lid='+W.dbg51.chest.lid.rotation.x.toFixed(2),'hare='+!!F.hare);
chk(W.dbg51.chest.lid.rotation.x<-1,'сундук не открылся');
// подписи баннеров
let mx=0,sum=0,cnt=0;const rows=[];
for(const h of Object.keys(SEEN)){const s=SEEN[h].sub,w=words(s);rows.push(h+' ['+w+']: '+s);if(s){cnt++;sum+=w;mx=Math.max(mx,w);chk(w<=10,'подпись «'+h+'» '+w+' слов');}}
chk(rows.some(x=>/фаза 1/i.test(x))&&rows.some(x=>/Фаза 2/.test(x))&&rows.some(x=>/Фаза 3/.test(x)),'не видно баннеров всех 3 фаз: '+rows.join(' | '));
chk(cnt&&sum/cnt<=7,'средняя подпись '+(sum/cnt).toFixed(1)+' слов (> 7)');
for(const h of Object.keys(SEEN))if(/^(Лихо Одноглазое · фаза 1|Фаза [23])/.test(h))chk(SEEN[h].n>=300,'баннер «'+h+'» на экране '+(SEEN[h].n/60).toFixed(1)+' с (< 5)');
const bbx=document.getElementById('bossbar');chk(/Лихо/.test(bbx.innerHTML)||bbx.style.display==='none','полоса босса без имени: '+bbx.innerHTML.slice(0,80));
r.push('subs='+rows.join(' | '),'avg='+(sum/Math.max(1,cnt)).toFixed(1),'max='+mx,'errs='+ERR.length);
if(ERR.length)BAD.push('ошибки: '+ERR.join(';'));
if(BAD.length)throw new Error(BAD.join(' || ')+' :: '+r.join(' '));
r
