/* ============================== МИР 3 · 3-3 «СИРИН И АЛКОНОСТ» — гусельный уровень ============================== */
// «Во поле берёза стояла» · 84 → 104 удара в минуту · перья вспыхивают в долю: на вспышку — светомостик, между — тенемостик
// девять частей: вспышки · эхо «повтори за птицей» · припев · протяжные ноты (держи прыжок) · гроза (щит в такт) · дуэт · перья (взлёт) · хоровод (дорожки меняются) · соло Пелагеи
const BER=[[[69,69],[69,69],[67,65],[65,64],[62,62],[64,65],[64,62],[62,0]],[[69,69],[69,69],[67,65],[65,64],[62,0],[64,65],[64,62],[62,0]],
  [[65,65],[67,65],[64,62],[64,0],[65,65],[67,65],[64,62],[62,0]]];
const BER_BASS=[50,50,55,57,50,45,50,50];
function build33(){
  W.zvenAway=true;W.world=3;setTheme('heaven');W.name='3-3 · «Сирин и Алконост»';W.sub='Небесное царство · гусельный уровень · «Во поле берёза стояла»';W.camX=8;const F=W.flags;
  W.abil.pero=true;W.abil.roll=true;W.abil.toss=true;W.abil.owl=true;W.fallY=-12;W.noSplit=true;
  scene.background=new THREE.Color(0x4a4a90);scene.fog=new THREE.Fog(0x4a4a90,26,90);amb.intensity=0.56;
  const SPEED=4,LANE=[-2.6,2.6];
  /* ---------- песня: девять частей, у каждой своя затея ---------- */
  const PH=[{n:24,bpm:84,type:'basic',v:'s',name:'Поёт Сирин',sub:'перья вспыхивают в такт — на каждую вспышку прыгай'},
    {n:32,bpm:84,type:'echo',v:'s',name:'Эхо: вслед за Сирин повтори',sub:'птица поёт — плитки призраками светятся; после прыгай так же'},
    {n:24,bpm:92,type:'basic',v:'a',name:'Припев: Алконост вступает',sub:'Пелагея, подпевай! В такт прыгай — и в песне голос твой зазвучит'},
    {n:32,bpm:92,type:'hold',v:'a',name:'Протяжные ноты',sub:'золотая лента длинна — прыгни в такт да прыжок держи до конца'},
    {n:32,bpm:96,type:'storm',v:'sa',name:'Гроза над полем гремит',sub:'синяя молния над дорожкой — щит в такт · золото — прыг'},
    {n:24,bpm:96,type:'duet',v:'sa',name:'Птицы поют вдвоём',sub:'у Прошки ритм Сирин, у Пелагеи — Алконоста · в конце строки — прыжок вдвоём'},
    {n:32,bpm:100,type:'high',v:'sa',name:'Перья в небе кружат',sub:'перо над плиткой — прыгни в такт да взлети за ним'},
    {n:24,bpm:100,type:'swap',v:'sa',name:'Хоровод: местами меняемся',sub:'дорожки крест-накрест — на перекрёстке прыгайте вместе'},
    {n:16,bpm:104,type:'solo',v:'',name:'Последний куплет: Пелагея поёт',sub:'птицы замолкли и слушают'}];
  const bt=[],bph=[],bi=[];{let t=0;PH.forEach((p,k)=>{const B=60/p.bpm;for(let i=0;i<p.n;i++){bt.push(t);bph.push(k);bi.push(i);t+=B;}});bt.push(t);}
  const PS=[];{let a=0;PH.forEach(p=>{PS.push(a);a+=p.n;});PS.push(a);}   // начало каждой части (в долях)
  const NB=bt.length-1,END_T=bt[NB],B0=60/PH[0].bpm;const zAt=t=>-t*SPEED;
  const typ=k=>PH[bph[k]].type;
  const ECHO=[[1,0,1,1],[1,1,0,1],[0,1,1,1],[1,1,1,0]];
  const echoPat=k=>ECHO[Math.floor(bi[k]/8)%4];
  const HOLD={0:2,4:3};            // в каждой восьмёрке «протяжных»: с доли 0 — на 2 доли, с доли 4 — на 3
  const holdIn=k=>{const i=bi[k]%8;for(const s in HOLD){const a=+s,b=a+HOLD[s];if(i>a&&i<=b)return true;}return false;};
  const STORM=[0,0,1,0,1,0,0,1];   // 1 — молния (щит)
  // событие в долю k для игрока pi: 'jump' | 'guard' | 'hold' | 'high' | null
  const ev=(pi,k)=>{const T=typ(k),i=bi[k];
    if(T==='basic')return 'jump';
    if(T==='echo'){const j=i%8;return j<4?null:(echoPat(k)[j-4]?'jump':null);}
    if(T==='hold'){const j=i%8;if(HOLD[j]!==undefined)return 'hold';return holdIn(k)?null:'jump';}
    if(T==='storm')return STORM[i%8]?'guard':'jump';
    if(T==='duet')return pi===1||i%2===1?'jump':null;
    if(T==='high')return (i%8===2||i%8===6)?'high':(i%8===3||i%8===7)?null:'jump';   // после взлёта — доля на полёт
    if(T==='swap')return 'jump';
    if(T==='solo')return pi===1?'jump':null;return null;};
  const need=(pi,k)=>{const e=ev(pi,k);return e==='jump'||e==='hold'||e==='high';};
  const needG=(pi,k)=>ev(pi,k)==='guard';
  const merged=k=>(typ(k)==='duet'&&bi[k]%8===7)||(typ(k)==='high'&&bi[k]%8===5)||(typ(k)==='swap'&&bi[k]%8===4);
  const ghost=k=>typ(k)==='echo'&&bi[k]%8<4&&echoPat(k)[bi[k]%8];
  // хоровод: дорожки плавно меняются местами, перекрёсток — на доле 4 каждой восьмёрки (прыгают вместе)
  const laneX=(pi,t)=>{let k=0;while(k<NB&&bt[k+1]<=t)k++;if(typ(k)!=='swap'){const done=Math.floor(PH[7].n/8);const after=bph[k]>7;return LANE[after&&done%2?1-pi:pi];}
    const g=Math.floor(bi[k]/8),j=bi[k]%8+(t-bt[k])/(bt[k+1]-bt[k]),from=g%2?1-pi:pi,to=1-from;const u=smooth(clamp((j-2.5)/3,0,1));return lerp(LANE[from],LANE[to],u);};
  /* ---------- дорога: облачная полоса ---------- */
  const zEnd=zAt(END_T)-30;colBox(-9,9,-4,0,zEnd,24,false);wall(-9.2,-9,zEnd,24);wall(9,9.2,zEnd,24);wall(-9.2,9.2,24,24.2);
  heavenDecor(zEnd,24,{xw:10,sunY:12});
  {const base=new THREE.Mesh(new THREE.BoxGeometry(12,0.4,24-zEnd),CLOUD_SIDE);base.position.set(0,-0.3,(24+zEnd)/2);base.receiveShadow=true;W.group.add(base);
    for(let z=22;z>zEnd;z-=1.6)for(const s of[-1,1])W.puffs.push({x:s*rand(6.2,7.4),y:-0.4-rand(0,0.6),z:z+rand(-0.5,0.5),s:rand(0.8,1.3)});}
  for(let z=16;z>zEnd;z-=rand(6,10))for(const s of[-1,1]){const x=s*rand(8.6,12);const g=new THREE.Group();g.position.set(x,-0.2,z);W.group.add(g);addMesh(new THREE.CylinderGeometry(0.14,0.2,4.2,8),M(0xf4f2ea),0,2.1,0,g);
    for(let i=0;i<4;i++)addMesh(new THREE.BoxGeometry(0.3,0.05,0.04),MAT.dark,0,0.8+i*0.9,0.17,g);for(const[dx,dy,r]of[[0,4.6,1.2],[0.6,4.1,0.8],[-0.6,4.2,0.85]])addMesh(new THREE.SphereGeometry(r,10,8),M(0x9ac860,{emissive:0x304010,emissiveIntensity:0.2}),dx,dy,0,g);}
  // арки-ворота на входе в каждую часть
  PS.slice(1,-1).forEach((k,i)=>{const z=zAt(bt[k])+1.2,g=new THREE.Group();g.position.set(0,0,z);W.group.add(g);const c=[0xffd76a,0x9a7ae8,0x7ad8ff][i%3];
    for(const s of[-1,1])addMesh(new THREE.CylinderGeometry(0.16,0.2,4.4,8),M(0xf4f2ea),s*6,2.2,0,g);const a=new THREE.Mesh(new THREE.TorusGeometry(6,0.14,6,24,Math.PI),M(c,{emissive:c,emissiveIntensity:0.5}));a.position.y=4.3;g.add(a);});
  const tiles=[],bolts=[],feathers=[];
  const gold=M(0xffd76a,{emissive:0xffa020,emissiveIntensity:0.2,transparent:true,opacity:0.9}),lil=M(0x9a7ae8,{emissive:0x4a2aa0,emissiveIntensity:0.2,transparent:true,opacity:0.85});
  const boltM=M(0x6ab8ff,{emissive:0x3a8aff,emissiveIntensity:0.6,transparent:true,opacity:0.9});
  for(let k=0;k<NB;k++){const z0=zAt(bt[k]),z1=zAt(bt[k+1]);
    if(merged(k)&&typ(k)!=='swap'){const m=addMesh(new THREE.BoxGeometry(8.4,0.14,1.3),gold.clone(),0,0.05,z0);tiles.push({pi:2,k,m,type:'gold'});continue;}
    for(const pi of[0,1]){const x=laneX(pi,bt[k]),e=ev(pi,k);
      if(e==='jump'||e==='high'){const m=addMesh(new THREE.BoxGeometry(1.7,0.14,1.3),gold.clone(),x,0.05,z0);tiles.push({pi,k,m,type:'gold'});
        if(e==='high'){const f=new THREE.Group();f.position.set(x,3.6,z0);W.group.add(f);const fm=addMesh(new THREE.SphereGeometry(0.25,10,8),M(0xffe08a,{emissive:0xffb040,emissiveIntensity:0.9}),0,0,0,f);fm.scale.set(0.4,1.9,0.14);fm.rotation.z=0.5;feathers.push({pi,k,g:f,taken:false});}}
      else if(e==='hold'){const len=HOLD[bi[k]%8],z2=zAt(bt[k+len]);const m=addMesh(new THREE.BoxGeometry(1.1,0.1,Math.abs(z2-z0)),gold.clone(),x,0.06,(z0+z2)/2);tiles.push({pi,k,m,type:'gold'});
        const cap=addMesh(new THREE.BoxGeometry(1.7,0.16,0.6),gold.clone(),x,0.07,z2);tiles.push({pi,k:k+len,m:cap,type:'gold'});}
      else if(e==='guard'){const b=new THREE.Group();b.position.set(x,3.2,z0);W.group.add(b);const zig=[[0,0.8],[0.3,0.2],[-0.1,0.1],[0.2,-0.7]];for(let i=0;i<3;i++){const a=zig[i],c=zig[i+1],L=Math.hypot(c[0]-a[0],c[1]-a[1]);const s=addMesh(new THREE.BoxGeometry(0.12,L,0.12),boltM,(a[0]+c[0])/2,(a[1]+c[1])/2,0,b);s.rotation.z=Math.atan2(a[0]-c[0],a[1]-c[1]);}
        addMesh(new THREE.SphereGeometry(0.5,12,8),M(0x5a6a90,{transparent:true,opacity:0.8}),0,1.2,0,b).scale.set(1.8,0.8,1.2);bolts.push({pi,k,g:b});
        const m=addMesh(new THREE.BoxGeometry(1.7,0.1,1.3),boltM.clone(),x,0.05,z0);tiles.push({pi,k,m,type:'bolt'});}
      else if(ghost(k)){const m=addMesh(new THREE.BoxGeometry(1.7,0.12,1.3),gold.clone(),x,0.05,z0);m.material.opacity=0.25;tiles.push({pi,k,m,type:'ghost'});}
      const c=addMesh(new THREE.BoxGeometry(1.2,0.1,Math.max(0.1,Math.abs(z1-z0)-1.3)),lil.clone(),x,0.03,(z0+z1)/2);tiles.push({pi,k,m:c,type:'lil'});}}
  // звенья и орешки над плитками: попал в такт — само летит в лапы
  const itemAt={};const put=(pi,k,kind)=>{const it=(kind==='link'?linkItem:nutItem)(laneX(pi,bt[k]),3.4,zAt(bt[k]));itemAt[pi+':'+k]=it;return it;};
  put(0,11,'link');put(1,PS[2]+11,'link');put(1,5,'nut');put(0,PS[2]+5,'nut');put(1,PS[4]+9,'nut');put(0,PS[6]+10,'nut');W.linkTotal++;   // третье звено — от птиц
  /* ---------- Сирин и Алконост летят впереди, над облаками ---------- */
  const sirin=makeSirin('sirin'),alk=makeSirin('alkonost');sirin.g.scale.setScalar(1.3);alk.g.scale.setScalar(1.3);
  const perch=[0,1].map(i=>{const g=new THREE.Group();W.group.add(g);const c=new THREE.Mesh(PUFF_GEO,CLOUD_TOP);c.scale.set(1.6,0.5,1.2);g.add(c);return g;});
  const Z=makeZven();W.zven=Z;Z.pos.set(0,3,6);W.zvenGoal=()=>new V3(0,3.4,active(0).pos.z-4);W.zvenFree=true;
  /* ---------- состояние песни ---------- */
  const S={bt,need,needG,ev,typ,PS,NB,t:-4*B0,B:B0,lastK:-5,state:'cine',show:true,judged:[{},{}],jg:[{},{}],hits:[[],[]],tries:[[],[]],rep:{},combo:[0,0],best:[0,0],voice:0,pulse:0,phase:0,listenT:0,soloT:0,merges:0,off:[0,0],
    hold:[null,null],holds:0,feathers:0,shields:0};W.song=S;
  const winOf=pi=>(LADWIN[players[pi].path]||0.1)+(W.ladBonus||0);
  const beatB=k=>bt[Math.min(NB,k+1)]-bt[k];
  const nearK=(t,pi,f)=>{let best=-1,bd=1e9;for(let k=Math.max(0,S.lastK-2);k<Math.min(NB,S.lastK+3);k++){if(!f(pi,k))continue;if((f===needG?S.jg:S.judged)[pi][k])continue;const d=Math.abs(t-bt[k]);if(d<bd){bd=d;best=k;}}return best;};
  const phr=k=>Math.floor(k/8);
  function combo(pi,ok){if(ok){S.combo[pi]++;S.best[pi]=Math.max(S.best[pi],S.combo[pi]);if(S.combo[pi]%8===0){banner('Лад ×'+S.combo[pi]+'!',PCSS[pi],1,pi?'Пелагея':'Прошка');SFX.ok();}}else S.combo[pi]=0;}
  function owlVoice(k,loud){const line=BER[phr(k)%3===2?2:phr(k)%2][bi[k]%8];const m=line[0]||line[1];if(!m)return;tone(mf(m+12),0.36,'sine',loud?0.2:0.09,mf(m+12)*1.004);if(line[1])tone(mf(line[1]+12),0.2,'sine',loud?0.12:0.05,null,S.B/2);}
  function hit(pi,k,ok,d){S.judged[pi][k]=ok?'hit':'miss';const p=phr(k);S.tries[pi][p]=(S.tries[pi][p]||0)+1;if(ok)S.hits[pi][p]=(S.hits[pi][p]||0)+1;combo(pi,ok);const h=active(pi);
    if(ok){const e=ev(pi,k);floatText(h.pos.clone().add(new V3(0,h.d.height+0.7,0)),merged(k)?'Вместе!':e==='high'?'Взлёт!':e==='hold'?'Держи!':'В такт!',merged(k)?'#ffd76a':'#ffe36b');burst(new V3(h.pos.x,0.3,zAt(bt[k])),0xffd76a,8,3);
      if(e==='high'){h.vel.y=12.5;const f=feathers.find(q=>q.pi===pi&&q.k===k);if(f&&!f.taken){f.taken=true;S.feathers++;anim(0.5,q=>{f.g.position.lerp(h.pos.clone().add(new V3(0,1.4,0)),q);if(q>=1)f.g.visible=false;});tone(1400,0.2,'sine',0.14,2200);}}
      if(e==='hold'){S.hold[pi]={k,end:bt[k+HOLD[bi[k]%8]]};}
      const it=itemAt[pi+':'+k];if(it&&!it.taken){const from=it.pos.clone();anim(0.5,q=>{if(it.taken)return;it.base=lerp(from.y,h.pos.y+1,q);it.pos.x=lerp(from.x,h.pos.x,q);it.pos.z=lerp(from.z,h.pos.z-0.4,q);if(q>=1)takeItem(it,h);});}
      if(pi===1&&bph[k]>=2){owlVoice(k,S.combo[1]>=4||typ(k)==='solo');if(S.combo[1]===4&&!F.turn){F.turn=true;floatText(sirin.g.position.clone().add(new V3(0,2.6,0)),'Сирин оборачивается','#c8c0ff');}}
      if(merged(k)&&S.judged[1-pi][k]==='hit'){S.merges++;SFX.ok();ringFx(new V3(0,0.1,zAt(bt[k])),COL.gold,4);}}
    else{floatText(h.pos.clone().add(new V3(0,h.d.height+0.7,0)),d===undefined?'мостик погас':d<0?'рано':'поздно','#dddddd');if(d===undefined){h.vel.y=3.5;h.grounded=false;SFX.knock();}}}
  function hitG(pi,k,ok,d){S.jg[pi][k]=ok?'hit':'miss';const p=phr(k);S.tries[pi][p]=(S.tries[pi][p]||0)+1;if(ok)S.hits[pi][p]=(S.hits[pi][p]||0)+1;combo(pi,ok);const h=active(pi);const b=bolts.find(q=>q.pi===pi&&q.k===k);
    if(ok){S.shields++;SFX.parry();floatText(h.pos.clone().add(new V3(0,h.d.height+0.7,0)),'Щит!','#bfe0ff');if(b){b.g.visible=false;burst(b.g.position.clone(),0x9ad0ff,14,4);}}
    else{SFX.knock();floatText(h.pos.clone().add(new V3(0,h.d.height+0.7,0)),d===undefined?'Бах! Щит — да в такт!':d<0?'рано':'поздно','#bfd8ff');h.vel.y=3.5;h.grounded=false;if(b){b.g.visible=false;}}}
  function onBeat(k){if(k<0){tone(1760,0.06,'square',0.05);banner(['Раз','Два','Три','Четыре!'][k+4],'#ffe7a0',0.5,k===-1?'прыгай, как перо вспыхнет':'');return;}
    if(k>=NB){S.state='stop';endScene();return;}
    const p=bph[k],i=bi[k],line=BER[phr(k)%3===2?2:phr(k)%2][i%8],P=PH[p];S.B=beatB(k);S.phase=p;
    if(i%8===0&&k>0&&P.type!=='solo'){const q=phr(k)-1;const bad=[0,1].every(pi=>(S.tries[pi][q]||0)>0&&(S.hits[pi][q]||0)<(S.tries[pi][q]||0)*0.5);if(bad&&(S.rep[q]||0)<2){S.rep[q]=(S.rep[q]||0)+1;rewind(q);return;}}
    if(i===0)banner(P.name,'#ffd76a',2.2,P.sub);
    if(P.type==='echo'&&i%8===0)floatText(sirin.g.position.clone().add(new V3(0,2.8,0)),'Слушай!','#e0d8ff');
    if(P.type==='echo'&&i%8===4)for(const pi of[0,1])floatText(active(pi).pos.clone().add(new V3(0,2.2,0)),'Повтори!','#ffe7a0');
    const sv=P.v.includes('s')&&!(P.type==='echo'&&i%8>=4),av=P.v.includes('a');
    if(P.type==='echo'&&i%8<4&&!echoPat(k)[i%8]){}else{if(sv&&line[0])tone(mf(line[0]),0.5,'triangle',0.13,mf(line[0])*0.997);if(sv&&line[1])tone(mf(line[1]),0.3,'triangle',0.1,null,S.B/2);}
    if(av&&line[0])tone(mf(line[0]+7),0.26,'square',0.045);if(av&&line[1])tone(mf(line[1]+7),0.2,'square',0.04,null,S.B/2);
    if(P.type==='storm'&&STORM[i%8]){tone(80,0.3,'sawtooth',0.08,40);}
    if(P.type==='solo'){tone(mf(BER_BASS[i%8]),0.6,'sine',0.14);}else{gusli(line[0]?line[0]-12:0,0,0.1);tone(mf(BER_BASS[i%8]),0.5,'sine',0.18);}
    tone(2600,0.04,'square',0.03);rumble(0,0.02,0.05);rumble(1,0.02,0.05);S.pulse=1;
    if(P.type!=='solo'&&Math.random()<0.8)floatText((sv?sirin:alk).g.position.clone().add(new V3(rand(-0.3,0.3),2.4,0)),'♪','#e0d8ff');}
  function rewind(q){const k0=q*8,k1=k0+8,dt=bt[k1]-bt[k0];S.t-=dt;S.lastK=k0-1;S.hold=[null,null];for(const pi of[0,1]){S.hits[pi][q]=0;S.tries[pi][q]=0;for(let k=k0;k<k1;k++){delete S.judged[pi][k];delete S.jg[pi][k];}}
    for(const b of bolts)if(b.k>=k0&&b.k<k1)b.g.visible=true;
    for(const h of HEROES)placeOnGround(h,h.pos.x,h.pos.z+dt*SPEED,0);stitch();SFX.whoosh();banner('Эту строчку — ещё разок!','#ffe7a0',2,'прыгай, как перо вспыхнет — под звон бубенца');snapCams();}
  // игрок ведёт прыжок (и щит в грозу); второй герой бежит следом. В соло Прошка может стоять и слушать
  W.custom=(pi,h,dt,c)=>{
    if(c.lock||S.state==='stop'||S.state==='cine'){for(const q of players[pi].heroes){q.vel.x=damp(q.vel.x,0,10,dt);q.vel.z=damp(q.vel.z,0,10,dt);}active(pi).guard=false;return;}
    const hh=active(pi),oo=other(pi);const free=pi===0&&S.t>=bt[PS[8]];const lx=laneX(pi,Math.max(0,S.t));
    if(free){const want=Math.abs(c.iz)>0.2?-c.iz*SPEED*1.2:0;hh.vel.z=damp(hh.vel.z,want,8,dt);hh.vel.x=(lx-hh.pos.x)*6;if(Math.abs(c.iz)<0.2)S.listenT+=dt;S.soloT+=dt;}
    else{const want=zAt(S.t);hh.vel.z=-SPEED+(want-hh.pos.z)*5;hh.vel.x=(lx-hh.pos.x)*8;}
    hh.face=Math.PI;{const tx=lx+(pi?0.7:-0.7),tz=hh.pos.z+1.8;oo.vel.x=(tx-oo.pos.x)*6;oo.vel.z=(tz-oo.pos.z)*6;oo.face=Math.PI;}
    hh.guard=btn(pi,'guard');
    // протяжная нота: держишь прыжок — паришь до конца ленты
    const H=S.hold[pi];if(H){if((btn(pi,'jump')||AUTO(pi))&&S.t<H.end+0.1){if(hh.vel.y<-0.6)hh.vel.y=-0.6;if(hh.pos.y<0.9&&hh.vel.y<1)hh.vel.y=2.2;}
      else{const d=rT(S.t)-H.end;S.hold[pi]=null;if(Math.abs(d)<0.28||S.t>=H.end){S.holds++;floatText(hh.pos.clone().add(new V3(0,hh.d.height+0.8,0)),'Протянул!','#ffe36b');tone(1320,0.3,'sine',0.14,1760);combo(pi,true);}
        else floatText(hh.pos.clone().add(new V3(0,hh.d.height+0.8,0)),'отпустил рано','#dddddd');}}
    if(tap(pi,'jump')&&(hh.grounded||hh.coyote>0)){hh.vel.y=6.4;hh.grounded=false;hh.coyote=0;SFX.jump();if(!free){const k=nearK(rT(S.t),pi,need);if(k>=0&&Math.abs(rT(S.t)-bt[k])<beatB(Math.max(0,k-1))*0.5){const d=rT(S.t)-bt[k];hit(pi,k,Math.abs(d)<=winOf(pi),d);}}}
    if(tap(pi,'guard')&&!free){const k=nearK(rT(S.t),pi,needG);if(k>=0&&Math.abs(rT(S.t)-bt[k])<beatB(Math.max(0,k-1))*0.5){const d=rT(S.t)-bt[k];hitG(pi,k,Math.abs(d)<=winOf(pi)*1.2,d);}}};
  W.updates.push(dt=>{
    if(S.state==='play'&&!G.cine){S.t+=dt;while(S.state==='play'&&S.lastK+1<=NB&&S.t>=(S.lastK+1<0?(S.lastK+1)*B0:bt[S.lastK+1])-1e-6){S.lastK++;onBeat(S.lastK);}
      for(const pi of[0,1])for(let k=Math.max(0,S.lastK-2);k<=S.lastK&&k<NB;k++){
        if(AUTO(pi)&&need(pi,k)&&!S.judged[pi][k]&&S.t>=bt[k]&&!(pi===0&&typ(k)==='solo')){const ah=active(pi);if(ah.grounded){ah.vel.y=6.4;ah.grounded=false;}hit(pi,k,true,0);}
        if(AUTO(pi)&&needG(pi,k)&&!S.jg[pi][k]&&S.t>=bt[k]){active(pi).atkT=0.2;hitG(pi,k,true,0);}
        if(need(pi,k)&&!S.judged[pi][k]&&rT(S.t)>bt[k]+winOf(pi)+0.06&&!(pi===0&&typ(k)==='solo'))hit(pi,k,false);
        if(needG(pi,k)&&!S.jg[pi][k]&&rT(S.t)>bt[k]+winOf(pi)*1.2+0.06)hitG(pi,k,false);}}
    S.pulse=Math.max(0,S.pulse-dt*4);
    let fl=0;if(S.state==='play'&&S.t>-0.2){const k=Math.max(0,S.lastK);const d=Math.min(Math.abs(S.t-bt[k]),Math.abs(bt[Math.min(NB,k+1)]-S.t));fl=Math.max(0,1-d/0.16);}
    for(const pi of[0,1]){const h=active(pi);h.lit=fl>0.05;}
    for(const t of tiles){const near=Math.abs(t.m.position.z-active(t.pi===2?0:t.pi).pos.z)<26;t.m.visible=near;if(!near)continue;
      if(t.type==='gold'){t.m.material.emissiveIntensity=0.15+1.2*fl;t.m.material.opacity=0.35+0.6*fl;}
      else if(t.type==='ghost'){const on=S.lastK===t.k&&S.t-bt[t.k]<0.3;t.m.material.opacity=on?0.8:0.18;t.m.material.emissiveIntensity=on?1.4:0.1;}
      else if(t.type==='bolt'){t.m.material.emissiveIntensity=0.3+1.0*fl;}
      else{t.m.material.emissiveIntensity=0.15+0.6*(1-fl);t.m.material.opacity=0.3+0.55*(1-fl);}}
    for(const b of bolts){if(!b.g.visible)continue;const dz=b.g.position.z-active(b.pi).pos.z;b.g.children.forEach((c,i)=>{if(i<3)c.material.emissiveIntensity=Math.abs(dz)<4?0.6+Math.sin(G.time*30)*0.6:0.4;});}
    for(const f of feathers)if(!f.taken){f.g.rotation.y+=dt*2;f.g.position.y=3.6+Math.sin(G.time*3+f.k)*0.15;}
    const lz=Math.min(active(0).pos.z,active(1).pos.z)-11;const sing=S.state==='play'&&S.t>=0;
    const place=(b,pc,x,k)=>{b.g.position.set(x,4.2+Math.sin(G.time*1.4+k)*0.25,lz+Math.sin(G.time*0.7+k)*0.8);pc.position.set(x,3.7+Math.sin(G.time*1.4+k)*0.25,b.g.position.z);b.g.rotation.y=k?-0.4:0.4;b.wings.forEach(w=>{w.wp.rotation.z=w.s*(0.2+Math.sin(G.time*(k?5:2.5))*0.25);});};
    place(sirin,perch[0],-6.4,0);place(alk,perch[1],6.4,1);
    const P=PH[S.phase]||PH[0];
    if(F.turn&&P.type!=='solo')sirin.head.rotation.y=damp(sirin.head.rotation.y,-0.7,3,dt);if(P.type==='solo'){sirin.head.rotation.y=damp(sirin.head.rotation.y,-0.6,3,dt);alk.head.rotation.y=damp(alk.head.rotation.y,-0.9,3,dt);}
    sirin.mouth.scale.y=sing&&P.v.includes('s')?1+S.pulse:1;alk.mouth.scale.y=sing&&P.v.includes('a')?1+S.pulse:1;
    note.visible=S.state==='play'&&S.phase>=2;if(note.visible){const pe=active(1);note.position.set(pe.pos.x,pe.pos.y+pe.d.height+1.3,pe.pos.z);note.material.emissiveIntensity=0.2+Math.min(1,S.combo[1]/4)*1.2;note.scale.setScalar(1+0.3*S.pulse);note.rotation.y+=dt*2;}
    // гроза: небо темнеет
    const stormK=P.type==='storm'?1:0;scene.background.lerp(new THREE.Color(stormK?0x2a2a58:0x4a4a90),Math.min(1,dt*2));});
  const note=new THREE.Mesh(new THREE.OctahedronGeometry(0.22),M(0xe8c0ff,{emissive:0xc080ff,emissiveIntensity:0.2}));W.group.add(note);
  /* ---------- финал: птицы подхватывают песню Пелагеи ---------- */
  function endScene(){const T=HERO,pe=T.pelageya,pr=T.proshka;F.listened=S.soloT>2&&S.listenT/S.soloT>0.6;
    const bz=pe.pos.z-7;
    play({dur:18,fov:48,shots:[shot(0,[0,3.2,pe.pos.z+6],[0,3.8,bz]),shot(5.6,[pe.pos.x+2.2,1.4,pe.pos.z+2.4],[pe.pos.x,0.9,pe.pos.z]),shot(10.2,[pr.pos.x-2,1.6,pr.pos.z+2.6],[pr.pos.x,1,pr.pos.z]),shot(14,[0,3,pe.pos.z+5],[0,3.6,bz])],
      says:[[0.3,3.4,null,'<i>Птицы умолкли, слушают —</i><br><i>А потом подхватили вдвоём, одну песню, дружно.</i>',true],[5.8,3.6,null,'<i>Пелагея клюв в перья прячет. Но не улетает.</i>',true],
        [10.4,3.4,null,F.listened?'<i>А Прошка на своей половине всё стоял да слушал —</i><br><i>Хоть бежать мог дальше, а слушал, не нарушил.</i>':'<i>Прошка на Пелагею оглянулся — и шаг замедлил.</i>',true],
        [13.9,3.6,null,F.listened?'<i>Кто-то заметил — да промолчал. Лишь улыбнулся.</i>':'<i>Сирин с Алконостом поют вдвоём. Небо снова ровно.</i>',true]],
      events:[{t:0.2,fn:()=>{sirin.g.position.set(-2.4,3.6,bz);alk.g.position.set(2.4,3.6,bz);perch[0].position.set(-2.4,3.1,bz);perch[1].position.set(2.4,3.1,bz);sirin.head.rotation.y=-0.3;alk.head.rotation.y=0.3;
          for(let r=0;r<2;r++)BER[0].concat(BER[2]).forEach((l,i)=>later(r*4.6+i*0.3,()=>{if(l[0]){tone(mf(l[0]),0.4,'triangle',0.12);tone(mf(l[0]+7),0.3,'square',0.04);tone(mf(l[0]+12),0.3,'sine',0.08);}}));}},
        {t:5.8,fn:()=>{pe.parts.beak.visible=false;anim(0.6,k=>{pe.body.scale.set(1+0.1*k,1-0.1*k,1+0.1*k);});}},
        {t:10.4,fn:()=>{pr.face=Math.atan2(pe.pos.x-pr.pos.x,pe.pos.z-pr.pos.z);}},
        {t:14,fn:()=>{const it=linkItem(0,4,bz);W.linkTotal--;anim(1.2,k=>{it.base=4-k*2.6;it.pos.lerpVectors(new V3(0,4,bz),pe.pos.clone().add(new V3(0,1,0)),smooth(k));if(k>=1)takeItem(it,pe);});}}],
      tick:(t)=>{sirin.wings.forEach(w=>{w.wp.rotation.z=w.s*(0.3+Math.sin(t*3)*0.2);});alk.wings.forEach(w=>{w.wp.rotation.z=w.s*(0.3+Math.sin(t*3+1)*0.2);});},
      end:()=>{pe.parts.beak.visible=true;pe.body.scale.set(1,1,1);banner('Лад: '+S.best[0]+' и '+S.best[1]+' подряд','#ffe7a0',2.6,'вместе: '+S.merges+' · перьев: '+S.feathers+' · щитов: '+S.shields+' · у Векши в лавке — хоровод «Берёзка»');later(1.6,()=>{F.out=true;finishLevel();});}});}
  /* ---------- рисунки кнопок и задачи ---------- */
  const nextOf=(pi,f,J)=>{for(let k=Math.max(0,S.lastK);k<Math.min(NB,S.lastK+3);k++)if(f(pi,k)&&!J[pi][k])return k;return -1;};
  for(const pi of[0,1]){prompt(pi,'jump',()=>headOf(active(pi)),()=>S.state==='play'&&(S.lastK<8||typ(Math.max(0,S.lastK))==='echo')&&(()=>{const k=nextOf(pi,need,S.judged);return k>=0&&Math.abs(bt[k]-S.t)<0.5;})(),'когда вспыхнет');
    prompt(pi,'jump',()=>headOf(active(pi)),()=>S.state==='play'&&(()=>{const k=nextOf(pi,need,S.judged);return k>=0&&merged(k)&&bt[k]-S.t<1.2;})(),'вместе!');
    prompt(pi,'guard',()=>headOf(active(pi)),()=>S.state==='play'&&(()=>{const k=nextOf(pi,needG,S.jg);return k>=0&&bt[k]-S.t<0.9;})(),'щит в такт');
    prompt(pi,'jump',()=>headOf(active(pi)),()=>S.state==='play'&&!!S.hold[pi],'держи!');}
  prompt(0,'label',()=>headOf(HERO.proshka),()=>S.state==='play'&&typ(Math.max(0,S.lastK))==='solo','беги — или слушай');
  const info=pi=>()=>' <span style="opacity:.8">· лад ×'+S.combo[pi]+'</span>';
  const partDone=p=>()=>S.t>=bt[PS[p+1]]||S.state==='stop';
  for(const pi of[0,1])W.objectives[pi]=[
    O(()=>'Поёт Сирин. Перья в такт вспыхивают — мосток золотой встаёт.<br>Прыгай '+K(pi,'jump')+' на каждую вспышку — вперёд!'+info(pi)(),partDone(0),()=>[sirin.g]),
    O(()=>'Эхо! Сперва птица поёт — плитки призраками светятся.<br>Запомни, где светилось, и прыгай '+K(pi,'jump')+' так же — не ошибётся, кто метится!'+info(pi)(),partDone(1),()=>[sirin.g]),
    O(()=>(pi?'Припев! Поёт Алконост. Пелагея, подпевай:<br>Прыгай '+K(1,'jump')+' в такт — и в песне голос твой, так и знай!':'Припев! Алконост быстрее поёт. Прыгай '+K(0,'jump')+' в такт, не отставай!')+info(pi)(),partDone(2),()=>[alk.g]),
    O(()=>'Протяжные ноты! На длинной золотой ленте прыгни '+K(pi,'jump')+' в такт<br>И держи кнопку до конца ленты — будешь парить, вот так!'+info(pi)(),partDone(3),()=>[alk.g]),
    O(()=>'Гроза! Синяя молния над дорожкой — щит '+K(pi,'guard')+' в такт жми.<br>Золотая плитка — прыжок '+K(pi,'jump')+', не спи!'+info(pi)(),partDone(4),()=>[]),
    O(()=>(pi?'Птицы поют вместе. Ты прыгаешь, как Алконост, — на каждый звон.':'Птицы поют вместе. Ты прыгаешь, как Сирин, — через звон.')+'<br>Широкая золотая плитка — прыгайте вместе, в унисон!'+info(pi)(),partDone(5),()=>[sirin.g,alk.g]),
    O(()=>'Перья в небе! Над плиткой перо висит — прыгни '+K(pi,'jump')+' в такт:<br>К нему подбросит — вот так!'+info(pi)(),partDone(6),()=>feathers.filter(f=>f.pi===pi&&!f.taken&&Math.abs(f.g.position.z-active(pi).pos.z)<16).map(f=>f.g)),
    O(()=>'Хоровод! Дорожки крест-накрест — местами меняетесь вы.<br>На перекрёстке прыгайте '+K(pi,'jump')+' вместе — дружно, как соловьи!'+info(pi)(),partDone(7),()=>[]),
    O(pi?()=>'Последний куплет поёт Пелагея: прыгай '+K(1,'jump')+' в такт —<br>Её голос песню ведёт, вот так.':()=>'Последний куплет поёт Пелагея. Можно бежать дальше —<br>А можно встать да послушать, без фальши.',()=>S.state==='stop',()=>[]),
    O('Сирин с Алконостом поют вдвоём',()=>false,()=>[sirin.g])];
  W.spawns=[[new V3(LANE[0],0,10),new V3(LANE[0]-0.7,0,11.8)],[new V3(LANE[1],0,10),new V3(LANE[1]+0.7,0,11.8)]];W.startAct=[0,0];W.noSwap=()=>true;W.noSwapTip='В песне Прошка с Пелагеей бегут';
  W.pauseLine='Сирин и Алконост поссорились — и небо всё сбилось.<br>Бежим по песне: вспышки — прыжок, эхо — повтори, ленты — прыжок держи, молнии — щит,<br>Перья — взлёт, хоровод — местами меняйся, и песня звучит!';
  W.onStart=()=>{play({dur:9.6,fov:48,shots:[shot(0,[0,3.4,16],[0,4,-4]),shot(4.6,[-3,4.6,4],[-6.4,4.4,-2])],
    says:[[0.3,4,null,'<i>На двух облаках две птицы, у каждой девичий лик:</i><br><i>Сирин поёт печально, медленно, а Алконост — радостно, быстро, в тот же миг.</i>',true],[4.6,2.6,'sirin','Небо ровное, когда поют тихонько…'],[7.2,2.2,'alkonost','…а весело — ещё ровней, звонко!']],
    events:[{t:0,fn:()=>{sirin.g.position.set(-6.4,4.2,-2);alk.g.position.set(6.4,4.2,-2);perch[0].position.set(-6.4,3.7,-2);perch[1].position.set(6.4,3.7,-2);}}],
    tick:(t)=>{sirin.g.position.set(-6.4,4.2,-2);alk.g.position.set(6.4,4.2,-2);perch[0].position.set(-6.4,3.7,-2);perch[1].position.set(6.4,3.7,-2);},
    end:()=>{S.state='play';snapCams();later(0.2,()=>say('zven','Они поссорились — и сбилось всё небо. Попадите в песню!',2.8,true));}});};
  flushDecor();flushPuffs();}

