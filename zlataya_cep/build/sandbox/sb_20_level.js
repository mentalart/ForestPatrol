/* ============================== ПОЛИГОН ЭФФЕКТОВ: тестовая локация (только сборка --sandbox) ============================== */
// Зоны: тир (манекены, всегда открыты), три сигнала, уголок урона с родником, дорожка поверхностей, ряд звеньев.
// Мороки и звенья возвращаются сами. Запуск — сразу в полигон, без титров и меню.
function sbLabel(text,x,y,z,col){const c=document.createElement('canvas');c.width=512;c.height=128;const g=c.getContext('2d');g.fillStyle='rgba(20,18,26,0.72)';g.beginPath();
  if(g.roundRect)g.roundRect(4,14,504,100,26);else g.rect(4,14,504,100);g.fill();g.fillStyle=col||'#ffe8a8';let fs=50;g.font='600 '+fs+'px system-ui,sans-serif';while(g.measureText(text).width>470&&fs>22){fs-=2;g.font='600 '+fs+'px system-ui,sans-serif';}g.textAlign='center';g.textBaseline='middle';g.fillText(text,256,66);
  const s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthWrite:false,fog:false}));s.scale.set(4.4,1.1,1);s.position.set(x,y,z);W.group.add(s);return s;}
const SB_SURF=['grass','wood','stone','water','cloud','sand'],SB_SURF_RU={grass:'трава',wood:'дерево',stone:'камень',water:'вода',cloud:'облако',sand:'песок'};
const SB_SURF_COL={grass:0x5c8a4c,wood:0x9a6a3a,stone:0x8c8c94,water:0x4a9ad8,cloud:0xf2f4ff,sand:0xe2ca8a};
function buildSandbox(){
  setTheme('forest');W.name='Полигон эффектов';W.sub='заход 1 · удар, сигналы, урон, шаги';W.camX=10;W.fallY=-6;W.abil.roll=true;W.abil.toss=true;
  // земля: поле, дорожка поверхностей, площадка старта
  ground(-30,30,-34,2,0);ground(-30,30,10,18,0);
  SB_SURF.forEach((s,i)=>{const x0=-24+i*8;ground(x0,x0+8,2,10,0,M(SB_SURF_COL[s],s==='water'?{emissive:0x10304a,emissiveIntensity:0.3}:undefined));sbLabel(SB_SURF_RU[s],x0+4,1.6,9.4,'#ffffff');});
  ground(-30,-24,2,10,0);ground(24,30,2,10,0);
  W.sbSurf=(x,z)=>(z>=2&&z<=10&&x>=-24&&x<24)?SB_SURF[Math.floor((x+24)/8)]:null;
  sbLabel('ДОРОЖКА: ШАГИ',0,3.2,6);
  // тир: манекены не нападают и всегда открыты; пень — с корой (тяжёлый удар)
  sbLabel('ТИР: БЕЙ',-16,4,-9);
  const DUM=[['kiki',-20,-6],['leshonok',-16,-6],['stump',-11.5,-6.5]];
  const dums=DUM.map(([k,x,z])=>({k,x,z,e:null,t:0}));
  const mkDum=d=>{d.e=makeFoe(d.k,d.x,d.z,{harmless:true,leash:0.5});d.e.sbDummy=true;};dums.forEach(mkDum);
  // сигналы: по мороку на цвет
  sbLabel('СИГНАЛЫ',0,4.2,-15);
  const SIG=[['kiki',-6,-11,['yellow'],'жёлтый — щит'],['rak',0,-12,['red'],'красный — кувырок'],['thread',6,-11,['blue'],'синий — отбей/увернись']];
  const sigs=SIG.map(([k,x,z,s,l])=>{sbLabel(l,x,2.9,z-1.6,s[0]==='yellow'?'#ffe36b':s[0]==='red'?'#ff8a80':'#9fc4ff');return {k,x,z,s,e:null,t:0};});
  const mkSig=d=>{d.e=makeFoe(d.k,d.x,d.z,{signals:d.s,leash:3.5});};sigs.forEach(mkSig);
  // урон: колючий куст (касание — минус лепесток), кусачий морок, родник (лепестки обратно)
  sbLabel('УРОН',15,4,-9);
  const bushP=new V3(13,0,-4);{const bm=M(0x3e6a34),tm=M(0xd8c8a0);for(let i=0;i<7;i++)addMesh(new THREE.IcosahedronGeometry(rand(0.45,0.7),0),bm,bushP.x+rand(-0.6,0.6),rand(0.4,0.8),bushP.z+rand(-0.6,0.6));
    for(let i=0;i<16;i++){const c=addMesh(new THREE.ConeGeometry(0.05,0.32,4),tm,bushP.x+rand(-0.9,0.9),rand(0.3,1.2),bushP.z+rand(-0.9,0.9));c.rotation.set(rand(-1.5,1.5),0,rand(-1.5,1.5));}}
  sbLabel('колючки',bushP.x,2.3,bushP.z,'#ffb0c8');
  const bite={k:'kiki',x:16,z:-12,s:['yellow'],e:null,t:0};mkSig(bite);
  const springP=new V3(20,0,-4);{addMesh(new THREE.CylinderGeometry(1.1,1.3,0.3,16),M(0x8c8c94),springP.x,0.15,springP.z);const w=addMesh(new THREE.CylinderGeometry(0.9,0.9,0.06,16),MB(0x7fd8ff,{transparent:true,opacity:0.8}),springP.x,0.32,springP.z);w.castShadow=false;}
  sbLabel('родник: лепестки',springP.x,2.3,springP.z,'#9fe6ff');
  // звенья: лесенка нот
  sbLabel('ЗВЕНЬЯ ПОДРЯД',0,3.4,-22);
  let links=[];const mkLinks=()=>{links=[];for(let i=0;i<10;i++)links.push(linkItem(-9+i*2,1,-20));};mkLinks();let linkT=0;
  // возвращение мороков и звеньев, тир, колючки, родник
  W.updates.push(dt=>{
    for(const d of dums){if(d.e&&d.e.alive){d.e.cd=99;if(d.e.state==='idle'||d.e.state==='recover')d.e.open=0.5;}else if(!d.e||W.enemies.indexOf(d.e)<0){d.t+=dt;if(d.t>1.2){d.t=0;mkDum(d);}}}
    for(const d of sigs.concat([bite])){if(d.e&&(d.e.alive||W.enemies.indexOf(d.e)>=0))continue;d.t+=dt;if(d.t>2){d.t=0;mkSig(d);}}
    if(links.every(l=>l.taken)){linkT+=dt;if(linkT>2.5){linkT=0;mkLinks();}}
    for(const h of HEROES){if(!h.active||G.cine)continue;const p=players[h.player];
      if(hd(h.pos,bushP)<1.7&&h.pos.y<1.5)damageHero(h,{kind:'hazard',ref:{pos:bushP}});
      if(hd(h.pos,springP)<1.4&&!p.downed&&p.petals<3){p.petals=3;SFX.water();floatText(h.pos.clone().add(new V3(0,2,0)),'Лепестки вернулись!','#9fe6ff');}}});
  W.spawns=[[new V3(-2,0,13),new V3(-4,0,14)],[new V3(2,0,13),new V3(4,0,14)]];
  for(let pi=0;pi<2;pi++)W.objectives[pi]=[O(()=>'Полигон эффектов. <b>Tab</b> — панель (флажки, оценки, «было/стало»), <b>Ё</b> — всё новое вкл/выкл.<br>Тир — бей; сигналы — щит '+K(pi,'guard')+', кувырок '+K(pi,'roll')+'; колючки — урон; родник лечит; дорожка — шаги.',()=>false,()=>[]),O('…',()=>false,()=>[])];
  W.pauseLine='Полигон эффектов: Tab — панель, Ё — сравнить с релизом.';}
LEVELS.push({id:'sb',name:'Полигон эффектов',build:buildSandbox});
// запуск: сразу полигон, выбор «один / двое»
finBoot=function(){FIN.applyQuality();FIN.applySettings();loadLevel(0);G.state='menu';
  const o=document.createElement('div');o.style.cssText='position:fixed;inset:0;z-index:70;display:flex;align-items:center;justify-content:center;background:rgba(14,12,20,.86);color:#f3efe6;font:15px/1.45 system-ui,sans-serif;padding:16px';
  o.innerHTML='<div style="max-width:560px;text-align:center"><div style="font-size:26px;font-weight:700;margin-bottom:8px">Златая цепь · Полигон эффектов</div>'+
    '<div style="opacity:.85;margin-bottom:18px">Заход 1: удар, сигналы мороков, урон, шаги. Сборка без озвучки.<br><b>Tab</b> — панель с флажками и оценками · <b>Ё</b> (`) — всё новое вкл/выкл, чтобы сравнить с релизом.</div>'+
    '<button data-n="1" style="font:600 16px system-ui;padding:12px 22px;margin:6px;border-radius:10px;border:0;background:#2f9e5b;color:#fff;cursor:pointer">Один игрок</button>'+
    '<button data-n="2" style="font:600 16px system-ui;padding:12px 22px;margin:6px;border-radius:10px;border:0;background:#3a6fd8;color:#fff;cursor:pointer">Двое</button>'+
    '<div style="opacity:.7;margin-top:14px;font-size:13px">Управление как в игре: WASD, пробел, F — удар, G — щит, Shift — кувырок, Q — смена героя.<br>Или Enter — один игрок.</div></div>';
  document.body.appendChild(o);
  const go=n=>{if(!o.parentNode)return;o.remove();uiAudio();setSolo(n===1);startFrom(LV('sb'));};
  o.addEventListener('click',ev=>{const n=ev.target.dataset&&ev.target.dataset.n;if(n)go(+n);});
  addEventListener('keydown',function k(ev){if(ev.code==='Enter'&&o.parentNode){removeEventListener('keydown',k);go(1);}});};
