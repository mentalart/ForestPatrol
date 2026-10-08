/* ============================== РЕЛИЗ final06 · 1-2 «КИКИМОРИНО БОЛОТО»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Для выхода из уровня достаточно одного героя каждого игрока (финальная стычка и z<−351,5 у любого активного), а ковшик Йоши нужен в тумане и у кувшинки, поэтому бот проходит весь
// уровень Йошей — быстрым и маленьким; Пелагея стоит там, где была. Участки (положения — из proto/levels/1-2.js, состояние болота — W.sw12):
//   колышки над кочками (своя дорожка справа) → высокая ветка и съезд по струне → толстая струну Потапа (бросает человек) → гать Журавля и Цапли → огоньки в тумане →
//   Царевна-лягушка (кувшинки в лад) → бесёнок Балды (струна через омут, герой у флажка) → колода → стычка у ворот и выход.
// Брошенный в сторону колышка клубок сам целится в колышек (nearStake): бот встаёт лицом к нему и бросает; по струне идёт как по канату.
const K12={w:null,t:0,pi:0,dv:0,spT:0,hp:null,rp:null};
CMP.k12=K12;   // состояние бота на этом уровне — для проверки ботом
const k12=()=>{if(K12.w!==W){K12.w=W;K12.t=0;K12.dv=0;K12.spT=0;K12.hp=null;K12.rp=null;}return K12;};
const k12Str=(st)=>W.threads.some(t=>t.string&&!t.sag&&!t.ret&&t.owner===1&&t.stake&&Math.hypot(t.stake.x-st[0],t.stake.z-st[1])<0.4);
const k12Fwd=h=>{h.face=Math.PI;};
// бросок клубка в колышек st (раз в секунду); true — струна уже лежит
function k12Throw(h,st){if(k12Str(st))return true;h.face=Math.atan2(st[0]-h.pos.x,st[1]-h.pos.z);if(!(K12.t>G.time-1)){K12.t=G.time;cmpTap('item');}return false;}
// гать Журавля и Цапли: пролёты струн от берега (−1,6; −89,4) через три кочки к берегу Цапли; колышек каждого пролёта — GS[k], брошенная струна — GS[k].used
const k12At=(s,u)=>[s.sx+s.dx*s.len*u,s.sz+s.dz*s.len*u],k12Mid=(A,k)=>[A[k].x-0.3,A[k].z+0.7],k12Start=(A,k)=>k===0?[-1.6,-89.4]:k12Mid(A,k-1);
// болотное чудо лезет из трясины возле героя — щит (устоишь, не столкнёт)
const k12Chu=h=>{const C=W.sw12&&W.sw12.CHU;return !!C&&!C.peek&&(C.st==='warn'||C.st==='up'||(C.st==='hold'&&C.t<1.3))&&hd(C,h.pos)<3.4;};
// прыжок с площадки a на площадку b {x,z,r[,jw]}: идёт к b, у края прыгает (или по окну jw) и держит направление, пока не встанет на b; true — встал
function k12Hop(h,a,b){let hp=K12.hp;if(!hp||hp.b.x!==b.x||hp.b.z!==b.z){hp=K12.hp={a,b,j:false,t0:G.time};}   // цель — по координатам: объект строится заново каждый кадр
  const dx=b.x-h.pos.x,dz=b.z-h.pos.z,d=Math.hypot(dx,dz);
  if(hp.j&&h.grounded&&d<b.r-0.15){K12.hp=null;return true;}
  if(G.time-hp.t0>5){K12.hp=null;return false;}                                              // не вышло (упал и вернулся) — заново
  cmpAxes(dx,dz,1);if(!hp.j&&h.grounded&&(a.jw?a.jw(h):Math.hypot(h.pos.x-a.x,h.pos.z-a.z)>a.r-0.45)){cmpTap('jump');hp.j=true;}return false;}
const K12_RP0=[[-3.2,-291.5],[-3.0,-297.0],[0,-297.6]];
const K12_EDGE=[-156,-170.7,-188.4,-206.1,-223.8];
const k12Pad=P=>({x:P.col.x,z:P.col.z,r:P.col.r});
// кувшинка P наверху через d секунд: чётные и нечётные всплывают по очереди (период 3 с), шестая — только когда её оживили
const k12Up=(P,t)=>P.i===6?!!W.flags.frog.lily:(P.grp===0?Math.sin(t*Math.PI*2/3.0)>-0.3:Math.sin(t*Math.PI*2/3.0)<0.3);
const k12Safe=(A,B)=>{const t=W.flags.frog.t;for(let d=0;d<=1.4;d+=0.05){if(A&&d<=0.4&&!k12Up(A,t+d))return false;if(B&&d>=0.45&&!k12Up(B,t+d))return false;}return true;};
const K12_S=[[6.0,-14.6],[5.9,-24.4]],K12_BR=[[-5.8,-33.5],[-5.8,-40.5],[-3.0,-42.4]],K12_BRS=[0.6,-53.6];
CMP.route('1-2',[
  // колышки над кочками: бросок вперёд, по струне на следующую кочку
  {id:'s1',done:()=>HERO.yosha.pos.z<-13.4,run:h=>{k12();if(!cmpWant('yosha'))return;
    if(!k12Str(K12_S[0])){if(Math.hypot(h.pos.x-5.5,h.pos.z+5.4)>0.5){cmpGoto(h,5.5,-5.4,0.3);return;}k12Throw(h,K12_S[0]);return;}
    cmpGoto(h,K12_S[0][0]-0.2,-14.0,0.3);}},
  {id:'s2',done:()=>HERO.yosha.pos.z<-23.6,run:h=>{k12();if(!cmpWant('yosha'))return;
    if(!k12Str(K12_S[1])){if(Math.hypot(h.pos.x-5.5,h.pos.z+14.2)>0.6){cmpGoto(h,5.5,-14.2,0.3);return;}k12Throw(h,K12_S[1]);return;}
    cmpGoto(h,K12_S[1][0],-24.0,0.3);}},
  // высокая ветка: по пенькам наверх, бросок в колышек над трясиной и съезд по струне
  {id:'branch',done:()=>HERO.yosha.pos.z<-52,run:h=>{k12();if(!cmpWant('yosha'))return;
    if(h.hang)return;
    if(h.pos.y<1.0&&h.pos.z>-42){cmpPath(h,K12_BR,0.4);return;}                                            // пеньки наверх
    if(Math.hypot(h.pos.x+3.0,h.pos.z+42.4)>0.9&&!k12Str(K12_BRS)){cmpGoto(h,-3.0,-42.4,0.4);return;}
    if(!k12Throw(h,K12_BRS))return;                                                                       // клубок в колышек над трясиной
    const a=Math.atan2(K12_BRS[0]-h.pos.x,K12_BRS[1]-h.pos.z);cmpGoto(h,h.pos.x+Math.sin(a)*1.4,h.pos.z+Math.cos(a)*1.4,0.2);}},   // шаг на струну — и съезд
  // толстая струна: бросает Потап (человек) с камня-лапы; бот ждёт у начала и идёт по ней
  {id:'thick',done:()=>HERO.yosha.pos.z<-75,run:h=>{k12();if(!cmpWant('yosha'))return;
    const th=W.threads.some(t=>t.thick&&t.string&&!t.sag&&!t.ret);if(!th){cmpGoto(h,0.3,-56.5,0.4);return;}
    cmpGoto(h,0,-76,0.4);}},
  // гать: от пролёта к пролёту — бросок клубка в колышек (если друг не успел), по струне на кочку, бой с Паутинником (общий); последний пролёт — к берегу Цапли
  {id:'gat',done:()=>HERO.yosha.pos.z<-141&&HERO.yosha.pos.z>-157,run:h=>{k12();if(!cmpWant('yosha'))return;if(h.hang)return;
    if(k12Chu(h)){cmpKey('guard',true);return;}
    const S=W.sw12,GS=S.GS;let k=0;for(let i=0;i<3;i++)if(h.pos.z<k12Mid(GS,i)[1]+0.9)k=i+1;       // следующий пролёт: 0 — от берега, 3 — к берегу Цапли
    const st=k12Start(GS,k),s=GS[k].used;
    if(!s||!W.threads.includes(s)){                                                              // струны на этом пролёте ещё нет
      if(Math.hypot(h.pos.x-st[0],h.pos.z-st[1])>0.45){cmpGoto(h,st[0],st[1],0.2);return;}      // вплотную к назначенной точке: колышек своей кочки ближе метра «не перехватит» бросок
      if(!K12.spT)K12.spT=G.time;                                                                // сначала даёт другу бросить, потом бросает сам (последний пролёт — «Игрока 2»: ждёт меньше)
      if(G.time-K12.spT>(k===3?4:10)){h.face=Math.atan2(GS[k].x-h.pos.x,GS[k].z-h.pos.z);if(!(K12.t>G.time-1.2)){K12.t=G.time;cmpTap('item');}}return;}
    K12.spT=0;const end=k<3?k12Mid(GS,k):[GS[3].x-0.6,GS[3].z-1.2],a=k12At(s,0.6);
    if(h.pos.z>a[1]+0.8&&Math.hypot(h.pos.x-s.sx,h.pos.z-s.sz)>1.2&&!(h.pos.y>0.3)){cmpGoto(h,st[0],st[1],0.5);return;}   // сойти на начало струны
    if(Math.hypot(h.pos.x-a[0],h.pos.z-a[1])>0.7&&h.pos.z>a[1]){cmpGoto(h,a[0],a[1],0.4);return;}
    cmpGoto(h,end[0],end[1],0.4);}},
  // свадьба: Журавль идёт по струнам (их не трогать!), потом звено у избушки Цапли
  {id:'wed',done:()=>{const L=W.sw12.wedLink;return !!L&&L.taken;},run:h=>{k12();if(!cmpWant('yosha'))return;if(k12Chu(h)){cmpKey('guard',true);return;}
    const L=W.sw12.wedLink,GS=W.sw12.GS;if(!L||L.locked||!L.g.visible){cmpGoto(h,GS[3].x-0.6,GS[3].z-1.2,0.5);return;}cmpGoto(h,L.pos.x,L.pos.z,0.3);}},
  // туман: четыре развилки; когда Прошка (человек) открыл тропу — прыжками по кочкам; засохшую кочку на второй и четвёртой поливает Йоша (с первой кочки тропы)
  {id:'fog',done:()=>HERO.yosha.pos.z<-224,run:h=>{k12();if(!cmpWant('yosha'))return;
    if(K12.hp){k12Hop(h,K12.hp.a,K12.hp.b);return;}                                           // прыжок начат — цель не меняется, пока не приземлился (в воздухе «под ногами» ничего нет)
    const fk=W.sw12.forks;let k=0;for(let i=0;i<4;i++)if(h.pos.z<K12_EDGE[i+1]-1.0)k=i+1;k=Math.min(k,3);const f=fk[k];
    if(!f.open){if(h.pos.z>f.zs-0.5)cmpGoto(h,f.x+0.8,f.zs+1.0,0.4);return;}                // ждёт, пока тропа поднимется
    let idx=-1;f.lane.forEach((L,i)=>{if(h.grounded&&Math.hypot(h.pos.x-L.col.x,h.pos.z-L.col.z)<L.col.r)idx=i;});
    if(idx<0&&h.pos.z>f.zs-0.4&&!K12.hp){if(Math.hypot(h.pos.x-f.x,h.pos.z-(f.zs+1.0))>0.6){cmpGoto(h,f.x,f.zs+1.0,0.3);return;}}
    if(idx===0&&f.dry&&f.dry.dry){h.face=Math.atan2(f.dry.col.x-h.pos.x,f.dry.col.z-h.pos.z);if(!(K12.t>G.time-1.5)){K12.t=G.time;cmpTap('skill');}return;}   // ковшик на засохшую кочку
    const a=idx<0?{jw:q=>q.pos.z<f.zs+0.45}:k12Pad({col:f.lane[idx].col}),b=idx<2?k12Pad({col:f.lane[idx+1].col}):{x:f.x,z:K12_EDGE[k+1]-1.5,r:1.6};
    if(idx>=0&&idx<2&&f.lane[idx+1].col&&f.dry&&f.dry.dry&&idx+1===f.lane.indexOf(f.lane.find(L=>L.col===f.dry.col)))return;   // следующая — засохшая: ждёт полива
    k12Hop(h,a,b);}},
  // «Царевна-лягушка»: стрелу сбивает Прошка; кувшинки всплывают в лад — прыгает, когда своя ещё наверху, а нужная уже всплыла; шестую завядшую поливает с пятой
  {id:'frog',done:()=>HERO.yosha.pos.z<-278,run:h=>{k12();if(!cmpWant('yosha'))return;const S=W.sw12,PD=S.PADS,FR=W.flags.frog;
    if(K12.hp&&FR.sing){k12Hop(h,K12.hp.a,K12.hp.b);return;}
    if(!FR.sing){cmpGoto(h,-1.5,-237.6,0.5);return;}
    let c=-1;PD.forEach((P,i)=>{if(h.grounded&&Math.hypot(h.pos.x-P.col.x,h.pos.z-P.col.z)<P.col.r)c=i;});
    if(c<0&&h.pos.z>-239.3&&!K12.hp){if(Math.hypot(h.pos.x+1.5,h.pos.z+238.4)>0.7){cmpGoto(h,-1.5,-238.4,0.3);return;}}
    if(c===5&&!FR.lily){h.face=Math.atan2(PD[6].col.x-h.pos.x,PD[6].col.z-h.pos.z);if(!(K12.t>G.time-1.5)){K12.t=G.time;cmpTap('skill');}return;}   // оживить завядшую шестую
    const n=c+1,A=c>=0?PD[c]:null,B=n<=10?PD[n]:null;
    if(!K12.hp&&!k12Safe(A,B))return;                                                        // ждёт нужный момент на своей кувшинке
    k12Hop(h,c<0?{jw:q=>q.pos.z<-239.5}:k12Pad(A),B?k12Pad(B):{x:0,z:-280,r:2.5});}},
  // бесёнок Балды: струна через омут к колышку у флажка (кружок обходит — иначе забег начнётся без струны), потом на кружок и — по струне быстрее бесёнка
  {id:'race',done:()=>!!W.flags.race.won,run:h=>{k12();if(!cmpWant('yosha'))return;if(h.hang)return;const S=W.sw12,RC=W.flags.race,fs=[S.finStake.x,S.finStake.z],str=k12Str(fs)?W.threads.find(t=>t.string&&!t.sag&&!t.ret&&t.owner===1&&t.stake===S.finStake):null;
    if(RC.st==='lost'||RC.st==='won')return;
    if(!str){if(RC.st==='count'||RC.st==='run')return;                                         // забег пошёл без струны — стоит (не бежит в омут), счёт начнётся заново
      if(h.pos.z>-296.5&&Math.hypot(h.pos.x,h.pos.z+297.6)>0.6){cmpPath(h,K12_RP0,0.4);return;}
      if(Math.hypot(h.pos.x,h.pos.z+297.6)>0.5){cmpGoto(h,0,-297.6,0.3);return;}k12Throw(h,fs);return;}
    if(!K12.rp||K12.rp.s!==str){K12.rp=[[0,-297.3],k12At(str,0.3),k12At(str,0.6),k12At(str,0.9),[S.flag.position.x-0.6,S.flag.position.z]];K12.rp.s=str;}
    if(RC.st==='run'){cmpPath(h,K12.rp,0.3,0.7);return;}                                        // по струне к флажку
    if(RC.st==='count')return;
    cmpGoto(h,S.raceMat.position.x,S.raceMat.position.z,0.4);}},   // на кружок — начинается счёт
  // колода: поднимает Потап (человек); бот ждёт, потом проходит
  {id:'log',done:()=>!W.sw12.logCol.on,run:h=>{k12();if(!cmpWant('yosha'))return;cmpGoto(h,W.sw12.flag.position.x-0.6,W.sw12.flag.position.z+0.5,0.5);}},
  // стычка у ворот (общий бой), потом выход
  {id:'end',done:()=>!!W.flags.out,run:h=>{k12();if(!cmpWant('yosha'))return;if(W.enemies.some(e=>e.alive))return 'follow';
    if(h.pos.z>-328){cmpGoto(h,0,-329,0.5);return;}cmpGoto(h,0,-353,0.5);}},
]);
