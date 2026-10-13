/* ============================== РЕЛИЗ final06 · 2-2: ТРИ ЧАСТИ КИТА — КОЛОКОЛЬЧИКИ И СМОТРОВЫЕ, КУПОЛА КИТЕЖА ПОД ВОДОЙ, КУПЛЕТ ПЕЛАГЕИ ============================== */
// По разбору мира 2 (выбранные правки c08, c22, c20):
//  1) Все восемь прежних колокольчиков стояли на хвосте и в селе (до z = −76), а дальше — 350 метров без закладки. Теперь кит делится на три части:
//     хвост и село → бока и губа → голова. На каждом стыке — смотровая горка с колокольчиком: с неё видно следующую часть, над ней — её имя.
//     Внутри частей — ещё колокольчики (после рёбер, перед дубравой, после дубравы). Новые колокольчики добавляются в конец W.bells — номера прежних не меняются.
//  2) Под водой по бокам кита — тёмные силуэты храмов Китежа (те же, что за рифом в 2-1: k21Temple).
//  3) Дуга Пелагеи: когда спета первая строка колыбельной, Пелагея тихо подпевает свой куплет.
const K22P={parts:[],told:{}};
// горка-смотровая: квадратный холм с двумя ступенями, колокольчик на макушке; y0 — земля под ней
function k22Lookout(x,z,y0,name,sub){const top=y0+1.3,mat=M(0x7ab060),side=M(0x5a8a4a);
  box(x-1.6,x+1.6,y0,top,z-1.6,z+1.6,mat,{occ:false});
  box(x-1.0,x+1.0,y0,y0+0.45,z+1.6,z+2.4,side,{occ:false});box(x-1.0,x+1.0,y0,y0+0.9,z+1.6,z+2.0,side,{occ:false});   // ступени со стороны прихода
  const b=bell(x-0.4,z-0.6,top);K22P.parts.push({x,z,top,name,sub,b,done:false});return b;}
// храмы прозрачные — в пачки статики не идут, и ~20 храмов по 10 частей давали ~200 отрисовок (бюджет tfin_budget). Сливаем все в один меш:
// материал общий, освещения нет (MB) — нужны только позиции.
function k22MergeTemples(T,mat){const P=[],inv=new THREE.Matrix4(),mw=new THREE.Matrix4(),v=new THREE.Vector3();W.group.updateMatrixWorld(true);inv.copy(W.group.matrixWorld).invert();
  for(const g of T)g.traverse(m=>{if(!m.isMesh)return;const geo=m.geometry.index?m.geometry.toNonIndexed():m.geometry,pa=geo.attributes.position;mw.multiplyMatrices(inv,m.matrixWorld);
    for(let i=0;i<pa.count;i++){v.fromBufferAttribute(pa,i).applyMatrix4(mw);P.push(v.x,v.y,v.z);}if(geo!==m.geometry)geo.dispose();m.geometry.dispose();});
  for(const g of T)W.group.remove(g);
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(P,3));geo.computeBoundingSphere();
  const m=new THREE.Mesh(geo,mat);m.userData.noBatch=true;W.group.add(m);return m;}
function k22Ground(x,z,yHint){const g=groundAt(x,z,yHint+2,0.05);return g.y>-1e8?g.y:yHint;}
function k22Parts(){K22P.parts=[];K22P.told={};const D=W.dbg22?W.dbg22():null;if(!D)return;
  // стыки частей: после печки — перед рёбрами; после губы — перед хороводом
  k22Lookout(-6.5,-142.5,k22Ground(-6.5,-142.5,4.5),'Бока кита','рёбра ходят — прыгай в лад');
  k22Lookout(6.5,-270,k22Ground(6.5,-270,4.5),'Голова кита','хоровод, дубрава, колыбельная');
  // колокольчики внутри частей
  for(const[x,z]of[[0,-191],[0,-300],[0,-359]])bell(x,z,k22Ground(x,z,4.5));
  // купола Китежа по бокам кита: город под водой, над морем — только луковки
  if(typeof k21Temple==='function'){const mat=MB(0x1a3a52,{fog:false,transparent:true,opacity:0.3,depthWrite:false});
    const T=[];for(let z=20;z>-440;z-=rand(40,55))for(const sd of[-1,1]){const sc=rand(2.4,3.6),g=k21Temple(sd*rand(19,27),z+rand(-10,10),sc,mat);g.position.y=WH22.SEA0-5*sc;T.push(g);}   // из моря торчат лишь луковки с крестами; море поднимется (колыбельная) — скроются
    k22MergeTemples(T,mat);}
  W.updates.push(dt=>{
    for(const P of K22P.parts){if(P.done)continue;for(const pi of[0,1]){const h=active(pi);if(!h||players[pi].downed)continue;
      if(Math.abs(h.pos.x-P.x)<1.8&&Math.abs(h.pos.z-P.z)<1.8&&h.pos.y>P.top-0.2){P.done=true;banner(P.name,'#cfe8ff',2.2,P.sub);SFX.ok();break;}}}
    const L=D.LS;if(L&&L.lines>=1&&!K22P.told.pel&&!G.cine){K22P.told.pel=true;
      later(1.2,()=>say('pelageya','<i>(тихо)</i> Спи, китушка, спи… Мама мне так пела.',3.2));}});}
FIN.k22Parts=K22P;
{const _b=build22;build22=function(){_b();try{k22Parts();}catch(err){console.error('k22 parts',err);}};}
