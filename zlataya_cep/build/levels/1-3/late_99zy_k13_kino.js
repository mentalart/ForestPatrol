/* ============================== РЕЛИЗ final06 · 1-3 «КОЛОБОК»: РОЛИКИ В РУЧНОЙ ПОСТАНОВКЕ — ПЕСНЯ, «НУ, ЕШЬ», ПЛЯСКА ============================== */
// Ручная постановка общим слоем late_86b_kino.js (def.kino), правила — docs/40_kino_pravila.md. История уровня: Колобок поёт и удирает —
// в конце сказки он сам ждёт, что его съедят, — Прошка «не по сказке» его отпускает — все пляшут вместе.
// Ролик 1 «Я от бабушки ушёл» (8,2 с, 4 плана; было 5,2 с, 2 плана, запись песни 3,6 с не помещалась): кран над тропой к Колобку,
//   крупно — поёт и подпрыгивает в такт (гусли), герои изготовились, Колобок подмигивает, оборот — и к тропе (кран вверх).
// Ролик 2 «Ну, ешь» (24,4 с, 11 планов; было 22 с, 6 планов: камера смотрела в место, где Прошки не было, — в кадре Потап и
//   Колобок-шар спиной): «пластинка» обрывается, герои приземляются вокруг Колобка (общий), он жмурится и сжимается, дрожит (крупно);
//   «Ну, ешь…» — из-за плеча Прошки, подглядывает одним глазом; Прошка фыркает — лицом; глаза Колобка распахиваются по одному
//   (dolly-zoom), «А так можно было?»; Прошка — про пружинку; на «волшебная будет» Колобок прыгает с оборотом (конфетти);
//   Пелагея рисует в воздухе нового Колобка золотыми точками, Прошка «не смотрит» — и подглядывает.
//   Все планы — по одну сторону линии взглядов Прошка — Колобок (восток); герои стоят вокруг, а не где застал полёт.
// Ролик 3 «Пляска» (late_99_kolobok_dance.js) — хореография та же; под def.kino: общий план шире, Колобок крупно на свой сказ.
// Ролики зовёт прототип: rep_30_kolobok13.py (FIN.k13Intro, FIN.k13Stop; пляска — поверх FIN.kolDance). Конец роликов — прежний.
// Бот — tfin_k13cine.
const k13r=(t,a,b)=>clamp((t-a)/(b-a),0,1);
const k13Head=h=>new V3(h.pos.x,h.pos.y+h.d.height*0.9,h.pos.z);
/* ---------- ролик 1: «Я от бабушки ушёл» ---------- */
FIN.k13Intro=function(def,c){try{const kol=c.kol,E=CINE.E;if(!def.says||def.says.length!==2)return def;
  const ko={g:kol.g,head:kol.ball},r0=kol.g.rotation.y,K=kol.g.position.clone();
  def.kino=true;def.dur=8.2;def.mood=['#ffe8a0',0.07];
  def.says[0][0]=0.3;def.says[0][1]=3.95;def.says[1][0]=4.4;def.says[1][1]=3.5;
  const hc=()=>{const p=new V3();HEROES.forEach(h=>p.add(h.pos));return p.multiplyScalar(1/HEROES.length).setY(0.9);};
  def.shots=[KS(0,[0,7,16],[0,0.8,-6],{p2:[0,3.0,4.5],l2:[0,0.9,-6],dur:1.7,move:'none'}),               // 1 общий: кран над героями к Колобку
    KS(1.7,[0.6,1.0,-4.2],[0,0.7,-6],{trk:KC.fcam(ko,2.7,0.3,0.15,0.15)}),                               // 2 крупно: поёт и подпрыгивает
    KS(4.3,[0,1.5,5.5],[0,0.9,10.8],{move:'truck',amp:0.5,trk:KC.look(hc,0.5)}),                         // 3 герои изготовились бежать
    KS(5.6,[2.6,1.2,-3.0],[0,0.8,-6],{p2:[1.0,3.8,-1.0],l2:[0,0.6,-14],dur:2.6,move:'none'})];          // 4 подмигнул, оборот — кран вверх над тропой
  const note=(n,d)=>()=>{if(typeof gusli==='function')gusli(n,d||0,0.1);floatText(K.clone().add(new V3(0.3,1.6,0)),n%2?'♪':'♫','#ffe7a0');};
  def.cues=[[0.4,note(67)],[0.9,note(69)],[1.4,note(71)],[1.9,note(72)],[2.4,note(71)],[2.9,note(69)],[3.4,note(67)],
    [4.4,KC.all('effort',0.08)],[4.9,KC.emo('yosha','hop')],[5.8,()=>KSND.peep(0)],[6.1,()=>{SFX.whoosh();CINE.punch(-2);}],[6.8,()=>{KSND.yay(0);FX.dust(K.clone(),8,0xd8b070);}]];
  def.tick=(t,dt)=>{const sing=t<4.3,b=sing?Math.abs(Math.sin(t*Math.PI*2)):Math.abs(Math.sin(t*9))*0.4;
    if(kol.ball){kol.ball.position.y=0.55+b*0.3;kol.ball.rotation.y=sing?Math.sin(t*3)*0.3:0;}
    // подскок: сжался на земле — вытянулся в воздухе
    const sq=1-0.12*(1-b)*(sing?1:0.5);kol.g.scale.set(1/Math.sqrt(sq),sq,1/Math.sqrt(sq));
    // подмигнул (5,8–6,1), оборот (6,1–6,7) — и лицом к тропе
    if(kol.lids&&kol.lids[0])kol.lids[0].rotation.x=t>=5.8&&t<6.1?0.2:-0.5;
    kol.g.rotation.y=r0+(t<6.1?0:Math.PI*2*E.outBack(k13r(t,6.1,6.7))+Math.PI*E.inOutCubic(k13r(t,6.6,6.9)));
    HEROES.forEach(h=>{h.face=Math.atan2(K.x-h.pos.x,K.z-h.pos.z);});};
  const en=def.end;def.end=()=>{kol.g.scale.set(1,1,1);kol.g.rotation.y=r0;if(kol.ball){kol.ball.position.y=0.55;kol.ball.rotation.y=0;}if(kol.lids)kol.lids.forEach(l=>{l.rotation.x=-0.5;});en();};
  return def;}catch(e){console.error(e);return def;}};
/* ---------- ролик 2: «Ну, ешь» ---------- */
FIN.k13Stop=function(def,c){try{const kol=c.kol,T=HERO,pr=c.pr||T.proshka,E=CINE.E;if(!def.says||def.says.length!==6)return def;
  const ko={g:kol.g,head:kol.ball},B=new V3(pr.pos.x,0,pr.pos.z),K=B.clone().add(new V3(0.35,0,-2.3)),K0=kol.g.position.clone().setY(0),S0=kol.g.scale.clone();
  const SP={proshka:B.clone(),pelageya:B.clone().add(new V3(1.9,0,0.9)),potap:B.clone().add(new V3(-1.8,0,0.9)),yosha:B.clone().add(new V3(-0.7,0,1.7))};
  const from=new Map(HEROES.map(h=>[h,h.pos.clone()])),Pe=SP.pelageya,D=Pe.clone().add(new V3(0.7,1.15,0));
  const mid=B.clone().lerp(K,0.5).setY(0.8),kh=()=>new V3(kol.g.position.x,kol.g.position.y+0.65,kol.g.position.z);
  def.kino=true;def.dur=24.4;def.mood=['#ffd8a0',0.08];
  const SAY=[[0.4,3.4],[3.7,4.7],[8.5,3.4],[13.1,2.2],[15.3,5.2],[20.6,3.4]];def.says.forEach((s,i)=>{s[0]=SAY[i][0];s[1]=SAY[i][1];});
  // события прототипа (Колобок на месте, глаза, Пелагея с карандашом) — в tick; конец ролика — прежний
  def.events=[];
  // рисунок Пелагеи: золотые точки — круг, глаза, улыбка (по одной)
  const pic=new THREE.Group();pic.position.copy(D);pic.rotation.y=Math.atan2(0.9,1.4);   // плоскостью к камере плана 10
  pic.visible=false;pic.userData.k13pic=1;W.group.add(pic);const pm=new THREE.MeshBasicMaterial({color:0xffd76a}),bead=[];
  const addB=(y,z,r)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(r||0.035,6,5),pm);m.position.set(0,y,z);m.visible=false;m.userData.noBatch=true;pic.add(m);bead.push(m);};
  for(let i=0;i<14;i++){const a=i/14*Math.PI*2;addB(Math.cos(a)*0.32,Math.sin(a)*0.32);}addB(0.08,-0.1,0.045);addB(0.08,0.1,0.045);for(const z of[-0.12,0,0.12])addB(z?-0.1:-0.14,z);
  const BT0=20.75,BTD=0.09;
  def.shots=[KS(0,[B.x+7.0,4.6,B.z+3.4],k13A(mid),{p2:[B.x+4.6,2.6,B.z+1.8],l2:[mid.x,0.8,mid.z],dur:2.2,move:'none'}),   // 1 общий: музыка оборвалась, все приземлились
    KS(2.2,[K.x+0.6,0.8,K.z+1.4],[K.x,0.65,K.z],{trk:KC.fcam(ko,2.9,0.4,0.2,0.2)}),                               // 2 крупно: Колобок зажмурился, сжался
    KS(3.6,[B.x+1.1,1.5,B.z+1.4],[K.x,0.7,K.z],{move:'push',amp:0.4,trk:KC.look(kh,0.8)}),                       // 3 из-за плеча Прошки: «Ну, ешь…»
    KS(6.4,[K.x+0.6,0.8,K.z+1.3],[K.x,0.65,K.z],{trk:KC.fcam(ko,2.7,0.25,0.2,0.15)}),                           // 4 крупно: «таков уж сказ» — вздохнул
    KS(8.4,[B.x+0.9,1.3,B.z-1.7],[B.x,1.0,B.z],{trk:KC.fcam(pr,1.9,-0.45,0.05,0.15)}),                           // 5 Прошка фыркает — лицом
    KS(11.9,[K.x+0.5,0.8,K.z+1.1],[K.x,0.65,K.z],{trk:KC.fcam(ko,2.4,0.3,0.15,0.25),fov:-3}),                   // 6 глаза распахиваются по одному
    KS(13.0,[B.x+1.1,1.5,B.z+1.4],[K.x,0.7,K.z],{move:'push',amp:0.5,trk:KC.look(kh,0.8)}),                      // 7 из-за плеча: «А так можно было, правда?»
    KS(15.2,[B.x+0.9,1.3,B.z-1.6],[B.x,1.0,B.z],{trk:KC.fcam(pr,1.7,-0.35,0.05,0.15)}),                          // 8 Прошка: про пружинку
    KS(18.6,[B.x+4.2,1.3,mid.z],k13A(mid),{move:'truck',amp:0.5}),                                                   // 9 сбоку на двоих: Колобок прыгает от радости
    KS(20.4,[Pe.x+2.1,1.3,Pe.z-0.9],[Pe.x+0.45,1.1,Pe.z+0.05],{move:'push',amp:0.5}),                                 // 10 Пелагея рисует нового Колобка
    KS(22.5,[B.x+0.9,1.25,B.z-2.0],[B.x,1.0,B.z],{move:'push',amp:0.5})];                                         // 11 Прошка «не смотрит» — подглядывает
  const scratch=()=>{if(KSND.ok())AUD.osc({type:'sawtooth',f0:900,f1:120,d:0.35,v:0.035,a:0.005,lp:2200,wet:0.2});};
  def.cues=[[0.05,scratch],[1.25,()=>{FX.dust(B.clone(),10,0xd8b070);KSND.thud(0,0.06);}],[1.35,KC.all('surprise',0.07)],
    [2.35,()=>{KSND.sting(0);CINE.punch(-2);}],[2.6,KC.emo('potap','tilt')],[4.6,KC.emo('pelageya','surprise')],[5.0,KC.emo('yosha','fear')],
    [5.5,()=>KSND.peep(0)],[8.6,()=>{KC.emo('proshka','tilt')();KSND.puff(0);}],[9.9,KC.emo('proshka','nod')],[10.8,KC.emo('pelageya','laugh')],
    [11.95,()=>{CINE.dollyZoom(0.18,0.7,0.4);KSND.peep(0);}],[12.45,()=>KSND.peep(0)],[12.6,KC.emo('kolobok','surprise')],[13.3,KC.emo('kolobok','hop')],
    [15.5,KC.emo('proshka','tilt')],[17.2,KC.emo('potap','nod')],[18.8,KC.emo('proshka','nod')],
    [19.4,()=>{KSND.yay(0);FX.confetti(kh(),24,0.9);CINE.rimPulse(0.6);}],[19.6,KC.all('joy',0.08)],[20.5,KC.emo('pelageya','tilt')],
    [22.4,()=>{KC.emo('pelageya','joy')();KSND.magic(0,659);FX.sparkle(D.clone(),10,0xffd76a);}],[22.95,()=>KSND.peep(0)],[23.0,KC.emo('proshka','flinch')]];
  def.tick=(t,dt)=>{
    // герои: приземлились вокруг Колобка, глядят на него; Пелагея рисует; Прошка подглядывает на её рисунок
    for(const h of HEROES){const s=SP[h.kind];if(!s)continue;const f=from.get(h)||s,k=E.outCubic(k13r(t,0,1.2));h.pos.set(lerp(f.x,s.x,k),lerp(f.y,0,k),lerp(f.z,s.z,k));h.vel.set(0,0,0);
      let a=Math.atan2(kol.g.position.x-h.pos.x,kol.g.position.z-h.pos.z);
      if(h.kind==='pelageya'&&t>=20.4)a=Math.PI/2;
      if(h===pr&&t>=22.9&&t<23.6)a=Math.atan2(D.x-h.pos.x,D.z-h.pos.z);h.face=a;}
    // Колобок: докатился с перекатом — зажмурился и дрожит — подглядел — глаза по одному — подскок — прыжок с оборотом — к рисунку
    const rk=E.outBack(k13r(t,0,1.4));kol.g.position.set(lerp(K0.x,K.x,rk),0,lerp(K0.z,K.z,rk));if(kol.ball)kol.ball.rotation.x=-rk*Math.PI*4;
    const scared=t>=2.3&&t<11.9,squ=scared?0.86+0.03*Math.sin(t*5):t<12.6&&t>=11.9?0.86+0.14*E.outElastic(k13r(t,11.9,12.6)):1;
    let y=0,spin=0;if(t>=13.3&&t<13.8)y=0.35*Math.sin(Math.PI*k13r(t,13.3,13.8));
    if(t>=19.3&&t<20.3){const u=k13r(t,19.3,20.3);y=1.0*Math.sin(Math.PI*u);spin=Math.PI*2*E.inOutCubic(u);}
    if(t>=20.4)y=0.12*Math.abs(Math.sin(t*6));kol.g.position.y=y;
    kol.g.scale.set(S0.x/Math.sqrt(squ),S0.y*squ,S0.z/Math.sqrt(squ));
    const toP=Math.atan2(pr.pos.x-kol.g.position.x,pr.pos.z-kol.g.position.z),toD=Math.atan2(D.x-kol.g.position.x,D.z-kol.g.position.z);
    kol.g.rotation.set(0,(t>=20.6?lerp(toP,toD,E.inOutCubic(k13r(t,20.6,21.2))):toP)+spin,scared?0.05*Math.sin(t*38):0);
    if(kol.lids){const peek=t>=5.5&&t<6.2,l0=t<2.3?-0.5:t<11.9?(peek?-0.15:0.2):-0.5,l1=t<2.3?-0.5:t<12.4?0.2:-0.5;
      kol.lids[0].rotation.x=l0;if(kol.lids[1])kol.lids[1].rotation.x=l1;}
    // рисунок: точки по одной, потом мерцают
    pic.visible=t>=BT0;bead.forEach((m,i)=>{const ti=BT0+i*BTD;m.visible=t>=ti;m.scale.setScalar(t<ti+0.15?E.outBack(k13r(t,ti,ti+0.15)):1+0.15*Math.sin(t*6+i));
      if(dt>0&&dt<0.25&&t>=ti&&t-dt<ti&&i%4===0){FX.sparkle(m.getWorldPosition(new V3()),2,0xffd76a);if(KSND.ok())AUD.bell(1568+i*40,{v:0.012,d:0.4,wet:0.5});}});};
  const en=def.end;def.end=()=>{if(pic.parent)pic.parent.remove(pic);kol.g.scale.copy(S0);kol.g.rotation.z=0;if(kol.ball)kol.ball.rotation.x=0;en();};
  return def;}catch(e){console.error(e);return def;}};
function k13A(v){return [v.x,v.y,v.z];}
/* ---------- ролик 3: пляска — поверх FIN.kolDance ---------- */
{const _kd=FIN.kolDance;FIN.kolDance=function(def,ctx){def=_kd(def,ctx);try{const kol=ctx.kol,Z=ctx.gus?ctx.gus.z:kol.g.position.z,ko={g:kol.g,head:kol.ball};
  if(!def.shots||def.shots.length!==4)return def;def.kino=true;def.mood=['#ffe0a0',0.1];
  // общий план шире (поляна и гусли), затем Колобок крупно заводит свой сказ — хоровод и дальше как были
  def.shots[0]=shot(0,[0,3.4,Z+13.2],[0,0.9,Z+3.2],[0,1.9,Z+10.2],[0,0.85,Z+3.2],1.6);
  def.shots.splice(1,0,KS(1.6,[0.5,1.0,Z+5.3],[0,0.7,Z+3.7],{trk:KC.fcam(ko,2.4,0.2,0.15,0.15)}));
  }catch(e){console.error(e);}return def;};}
