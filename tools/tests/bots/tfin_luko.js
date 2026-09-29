//@@
// релиз final06: в Лукоморье волшебный стан и берег отодвинуты от дуба (W.shoreDZ) — у карты-рушника дуб не закрывает героев и стан.
// Лучи из игровой камеры к головам героев и к стану: сколько из них проходит сквозь дуб (крону или ствол). Плюс кадры и карта (A).
window.oakHits=()=>{ZC.FIN.occ.frame();const D=ZC.FIN.occ.dbg,cam=D.camS,W=ZC.W,rc=new THREE.Raycaster(),from=new THREE.Vector3();cam.getWorldPosition(from);
  const tg=[];for(const pi of[0,1]){const h=ZC.players[pi].heroes[ZC.players[pi].act];tg.push(['p'+pi,new THREE.Vector3(h.pos.x,h.pos.y+1.0,h.pos.z)]);}
  const lz=-22.6-(W.shoreDZ||0);tg.push(['стан',new THREE.Vector3(0,2.4,lz)],['стан-низ',new THREE.Vector3(0,0.9,lz+1.2)]);
  // части дуба как сферы (габариты в мире): луч, прошедший сквозь сферу, или камера внутри неё — дуб закрывает (изнутри кроны лучи
  // Three.js грани листвы не видят, поэтому проверяем по габаритам)
  W.oak.updateMatrixWorld(true);const S=[];W.oak.traverse(m=>{if(m.isMesh&&m.visible&&m.geometry){if(!m.geometry.boundingSphere)m.geometry.computeBoundingSphere();const bs=m.geometry.boundingSphere.clone().applyMatrix4(m.matrixWorld);S.push(bs);}});
  const ray=new THREE.Ray();const inside=S.filter(bs=>bs.containsPoint(from)).length;const out=[];let hit=inside?1:0;
  for(const [n,p] of tg){const d=p.clone().sub(from),L=d.length();ray.set(from,d.clone().normalize());const pt=new THREE.Vector3();
    const blk=S.some(bs=>{if(bs.containsPoint(p))return false;const q=ray.intersectSphere(bs,pt);return q&&q.distanceTo(from)<L;});if(blk)hit++;out.push(n+(blk?':ДУБ':':ok'));}
  return {hit,txt:'cam='+[from.x,from.y,from.z].map(v=>v.toFixed(1)).join(',')+(inside?' КАМЕРА В КРОНЕ':'')+' '+out.join(' ')};};
ZC.startFrom(ZC.LV('4-1'));ZC.G.manual=true;ZC.tick(5);ZC.G.hub=true;ZC.loadLevel(ZC.LV('luko'));ZC.tick(30);ZC.skip();ZC.tick(60);ZC.skip();ZC.tick(30);
['shoreDZ='+(ZC.W.shoreDZ||0),ZC.W.flags.mode,ZC.W.flags.stage,U.st()].join(' | ')
//@@ shot=luko_spawn.png
// сразу после появления в хабе (спавн у карты): камера
ZC.tick(90);const o=oakHits();window.R0=o;'spawn '+o.txt
//@@ shot=luko_map.png
// оба героя подошли к карте (там, где работает A) и стоят рядом — дуб не должен закрывать ни героев, ни стан
const dz=ZC.W.shoreDZ||0;const r=[U.walkTo(0,-1.3,-17.9-dz,6),U.walkTo(1,1.3,-17.9-dz,6)];ZC.tick(150);const o=oakHits();window.R1=o;r.join(' ')+' | at map '+o.txt
//@@ shot=luko_mapwide.png
// разошлись пошире (общий экран ещё не делится) — камера дальше и выше
const dz=ZC.W.shoreDZ||0;U.walkTo(0,-3.2,-17.6-dz,4);U.walkTo(1,3.2,-17.6-dz,4);ZC.tick(150);const o=oakHits();window.R2=o;'wide '+o.txt+' split='+ZC.G.split.toFixed(2)
//@@ shot=luko_open.png
U.tap('Space');ZC.tick(40);const ok=ZC.G.ui==='map';const res=['map ui='+ZC.G.ui,'hits spawn/map/wide='+[R0.hit,R1.hit,R2.hit].join('/')];
if(!ok)throw new Error('карта не открылась у стана: '+res.join(' | '));if((ZC.W.shoreDZ||0)>0&&R1.hit+R2.hit>0)throw new Error('дуб закрывает героев или стан у карты: '+R1.txt+' || '+R2.txt);res
//@@ shot=luko_gor.png
// после мира 4 Горыныч дремлет на отодвинутом берегу, между дубом и морем
U.tap('Escape');ZC.tick(10);const G=ZC.G;G.flags.w4done=true;G.flags.w3done=true;G.flags.w2done=true;G.flags.voiceDone=true;G.flags.zvenBack=true;ZC.loadLevel(ZC.LV('luko'));ZC.tick(30);ZC.skip&&ZC.skip();ZC.tick(90);
const dz=ZC.W.shoreDZ||0;U.walkTo(0,-4,-15-dz,5);U.walkTo(1,-1,-15-dz,5);ZC.tick(120);'mode='+ZC.W.flags.mode+' '+oakHits().txt
//@@
// первый приход: рушник раскатывается у отодвинутого стана, ролик карты снят вместе с берегом (кадры) — и уводит в 1-1
const G=ZC.G;G.flags={};G.done={};G.hub=false;G.got={};ZC.loadLevel(ZC.LV('luko'));ZC.tick(30);ZC.skip();ZC.tick(60);
const dz=ZC.W.shoreDZ||0;const r=['mode='+ZC.W.flags.mode,U.walkTo(0,-1.3,-17.9-dz,8),U.walkTo(1,1.3,-17.9-dz,8)];U.tap('Space');ZC.tick(60*1.6);r.push('cine='+!!ZC.G.cine);r
//@@ shot=luko_cine1.png
ZC.tick(60*1.2);ZC.FIN.occ.frame();'t='+(ZC.G.cine&&ZC.G.cine.t.toFixed(1))
//@@ shot=luko_cine2.png
ZC.tick(60*3.4);ZC.FIN.occ.frame();'t='+(ZC.G.cine&&ZC.G.cine.t.toFixed(1))
//@@ shot=luko_cine3.png
ZC.tick(60*3.4);ZC.FIN.occ.frame();'t='+(ZC.G.cine&&ZC.G.cine.t.toFixed(1))
//@@
ZC.tick(60*6);'lvl='+ZC.W.levelId+' trans='+!!ZC.G.trans
