// ---- продолжение build5B2 (k5epic, часть 16): СТАДИЯ 12, «ТЯНЕМ-ПОТЯНЕМ», ПРОЛОГ-ПОГОНЯ, тексты паузы ----
  /* ================= стадия 12 «Златая цепь на дубе том»: прежняя игла + кузнецы, Векша, Курочка Ряба ================= */
  // Застёжку из иглы куют в такт у наковальни (как прежде), Кузьма и Демьян рядом. Векша бросает орешки — Кощей на миг замирает;
  // Курочка Ряба катит золотое яичко тому, у кого остался один лепесток.
  const dem12=makeSmith('demyan',false);dem12.g.visible=false;K5L.noRay(dem12.g);
  const ryaba=(()=>{const g=k5Prop(new THREE.Group());addMesh(new THREE.SphereGeometry(0.42,10,8),M(0xf4f0e8),0,0.5,0,g);addMesh(new THREE.SphereGeometry(0.24,8,6),M(0xf4f0e8),0,0.95,0.28,g);addMesh(new THREE.ConeGeometry(0.08,0.2,5),M(0xf0a020),0,0.95,0.55,g).rotation.x=Math.PI/2;
    addMesh(new THREE.BoxGeometry(0.06,0.18,0.2),M(0xd82a2a),0,1.2,0.28,g);g.visible=false;K5L.noRay(g);return {g};})();
  E.layer[12]={start(){dem12.g.visible=true;dem12.g.position.set(ANV.x-2.2,0,ANV.z-1.2);dem12.g.rotation.y=0.6;kuzma.g.position.set(ANV.x+2.2,0,ANV.z-1.0);kuzma.g.rotation.y=-0.6;
      ryaba.g.visible=true;ryaba.g.position.set(-10,0,-8);belka.g.position.set(10.5,0,-7.5);ES.nutT=9;ES.eggT=0;
      later(1.2,()=>{if(E.cur===12)say('kuzma','Куй, Прошка! Не лупи — слушай металл. Мы рядом!',2.6,true);});},
    tick(dt){if(!K5.fight)return;ES.nutT-=dt;ryaba.g.rotation.y=Math.sin(G.time*2)*0.4;
      if(ES.nutT<=0&&K5.live&&KB.state!=='broken'){ES.nutT=G.solo?10:13;const f=belka.g.position.clone().add(new V3(0,1.4,0)),to=KS.g.position.clone().add(new V3(0,2.4,0));const n=k5Prop(new THREE.Mesh(new THREE.SphereGeometry(0.2,8,6),M(0x7ad06a,{emissive:0x2a8a30})));
        k5fx(0.8,k=>{n.position.lerpVectors(f,to,k);n.position.y+=Math.sin(k*Math.PI)*3;},()=>{k5Del(n);KB.dazeT=Math.max(KB.dazeT||0,1.6);K5L.gold(to,10);floatText(to.clone().add(new V3(0,1,0)),'Орешек-изумруд!','#9fe0a0');});E.log('nut');}
      ES.eggT-=dt;if(ES.eggT<=0)for(const pi of[0,1]){const p=players[pi];if(p.downed||p.petals>1)continue;const h=active(pi);ES.eggT=25;const e=k5Prop(new THREE.Mesh(new THREE.SphereGeometry(0.3,10,8),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.7})));e.scale.set(1,1.3,1);
        const f=ryaba.g.position.clone().add(new V3(0,0.4,0));k5fx(1.0,k=>{e.position.lerpVectors(f,h.pos.clone().add(new V3(0,0.4,0)),k);e.rotation.z+=0.3;},()=>{k5Del(e);p.petals=Math.min(3,p.petals+1);K5L.gold(h.pos.clone().add(new V3(0,1,0)),12);floatText(h.pos.clone().add(new V3(0,2,0)),'Золотое яичко! +лепесток','#ffe08a');});
        barkS(ryaba,'ryaba','Ко-ко! Держи яичко — не простое, золотое!',1.8,true);E.log('egg');break;}},
    end(){},goal:pi=>'',targets:pi=>[]};
  /* ================= «Тянем-потянем»: последняя чёрная цепь вросла в корни дуба ================= */
  // Встают все, как в «Репке»: Дедка за цепь, Яга за Дедку, Пелагея за Ягу, Потап за Пелагею, Кот за Потапа — и мышка Йоша последней.
  // Прошка считает: «Раз — два — ТЯНИ!» — оба удар в такт; Кощей дёргает — оба щит. Последний рывок — самый маленький: Йоша.
  E.repka=done=>{K5.fight=false;ES.fight=false;if(E.clock)E.clock.off();E.log('repka');const root=new V3(OAK.x,0.6,OAK.z+3.2),endP=new V3(C.x,1.0,C.z+2);
    KS.g.visible=true;KS.g.position.set(OAK.x+1.6,0,OAK.z+4.2);KS.g.rotation.y=Math.PI*0.8;sword.visible=false;try{KA.pose('threat');}catch(e){}
    let ch=chainLine(root,endP,0x1a1020);const team=[['ded',ded],['yaga',FR.yaga.m],['pelageya',T.pelageya],['potap',T.potap],['kot',kot],['yosha',T.yosha]];
    k5force(0,'potap');k5force(1,'yosha');if(G.solo)k5force(0,'yosha');
    const slot=i=>new V3(lerp(root.x,endP.x,0.18+i*0.15),0,lerp(root.z,endP.z,0.18+i*0.15)+0.0);
    team.forEach(([k,o],i)=>{const g=o.g||o;const s=slot(i);if(o.pos){placeOnGround(o,s.x+0.5,s.z,0);o.face=Math.PI;}else{g.position.set(s.x+0.5,0,s.z);g.rotation.y=Math.PI;}});
    placeOnGround(T.proshka,endP.x+2.6,endP.z+1.6,0);T.proshka.face=-Math.PI/2;
    const R0={k:0,beat:0,t:0,pull:[-9,-9],surge:null,surgeT:6,last:false,done:false};ES.rp=R0;ES.prog=0.95;
    const beatR=k5Prop(new THREE.Mesh(new THREE.RingGeometry(0.9,1.05,40),k5Add(0xffd76a,{opacity:0.9})));beatR.rotation.x=-Math.PI/2;
    K5L.music('gold',E.freeCount());say('proshka','Все за цепь! Я считаю: раз — два — ТЯНИ!',3,true);floatText(endP.clone().add(new V3(0,3,0)),'На «ТЯНИ!» — удар '+K(0,'attack')+(G.solo?'':' + '+K(1,'attack'))+' разом. Кощей дёрнет — щит!','#ffe08a');
    const per=0.62;const tickF=dt=>{if(R0.done||G.cine||E.cur!==12)return;R0.t+=dt;const nb=Math.floor(R0.t/per),ph=(R0.t%(per*4))/(per*4);beatR.position.copy(endP).setY(0.1);beatR.scale.setScalar(0.6+(1-ph)*2.6);
      if(nb!==R0.beat){R0.beat=nb;const pull=nb%4===3;if(AUD.ready())(pull?AUD.bell(523,{v:0.06,d:0.8}):AUD.osc({f0:880,d:0.05,v:0.02}));floatText(T.proshka.pos.clone().add(new V3(0,1.8,0)),pull?'ТЯНИ!':['раз','два','и…'][nb%4],pull?'#ffd76a':'#ffffff');if(pull)R0.pullAt=R0.t;}
      // все держат свои места
      team.forEach(([k,o],i)=>{const s=slot(i);const back=R0.k*1.4;if(o.pos){o.pos.x=s.x+0.5;o.pos.z=s.z+back;o.vel.set(0,0,0);o.face=Math.PI;}else{(o.g||o).position.set(s.x+0.5,0,s.z+back);}});
      // рывок Кощея: щит обоих
      R0.surgeT-=dt;if(!R0.surge&&R0.surgeT<=0&&!R0.last){R0.surge={t:0};R0.surgeT=G.solo?7:5.5;barkS(KS,'koschei','Не отдам!',1,true);try{KA.pose('threat',{antic:0.2});}catch(e){}}
      if(R0.surge){R0.surge.t+=dt;const ok=G.solo?active(G.soloPi).guard:(active(0).guard&&active(1).guard);if(R0.surge.t>1.0){if(!ok&&R0.k>0){R0.k=Math.max(0,R0.k-1);floatText(endP.clone().add(new V3(0,2.4,0)),'Перетянул! Щиты!','#ff9ab8');shakeAll(0.06,0.3);}
          else if(ok)floatText(endP.clone().add(new V3(0,2.4,0)),'Удержали!','#9fe0ff');R0.surge=null;}else K5L.ink(root.clone().add(new V3(rand(-1,1),0.4,rand(-1,1))),1);}
      ES.prog=0.95;K5L.hud.show(12,0.7+0.3*R0.k/6,0,0,'тянем-потянем '+R0.k+' / 6');};
    W.updates.push(tickF);
    ES.repkaAtk=(h,pi)=>{if(R0.done||R0.surge)return;const win=R0.pullAt!=null&&Math.abs(R0.t-R0.pullAt)<0.3;
      if(R0.last){if(h.kind==='yosha'||G.solo){finish();}return;}
      if(!win){floatText(h.pos.clone().add(new V3(0,1.8,0)),'не в такт','#cccccc');return;}R0.pull[pi]=R0.t;const both=G.solo||Math.abs(R0.pull[0]-R0.pull[1])<0.4;
      if(both&&R0.lastPullBeat!==R0.beat){R0.lastPullBeat=R0.beat;R0.k++;k5s('pSoft');FX.dust(root.clone(),10,0x5a4a3a);floatText(endP.clone().add(new V3(0,2.6,0)),'Тянем-потянем! '+R0.k+' / 6','#ffe08a');E.log('pull');
        if(R0.k>=5){R0.last=true;say('pelageya','Вытянуть не можем… Позвали мышку! Йоша — последний рывок!',3,true);floatText(T.yosha.pos.clone().add(new V3(0,1.6,0)),'Йоша: удар '+K(G.solo?0:1,'attack')+'!','#ffd76a');}}};
    function finish(){R0.done=true;E.log('repkaDone');k5s('shatter');shakeAll(0.12,0.8);k5Flash(root.clone(),0xffe0a0,8,0.6);K5L.gold(root.clone().add(new V3(0,1,0)),40);k5Del(ch);ch=chainLine(root,endP,COL.gold);
      const i=W.updates.indexOf(tickF);if(i>=0)W.updates.splice(i,1);k5Del(beatR);try{KA.pose('slump');}catch(e){}const f=KS.g.position.clone();anim(0.8,k=>{KS.g.position.set(f.x,Math.sin(k*Math.PI)*1.2,f.z+k*1.5);});
      E.oakGreen(1,true);later(1.4,()=>{barkS(kot,'kot','…И там я был, и мёд я пил; у моря видел дуб зелёный…',4,true);});later(5.6,()=>{k5Del(ch);ES.repkaAtk=null;done();});}};
  // удар во время «Репки»
  {const _oa=W.onAttack;W.onAttack=(pi,h)=>{if(E.cur===12&&ES.repkaAtk){ES.repkaAtk(h,pi);return;}if(_oa)_oa(pi,h);};}
  /* ---------- тексты паузы по стадиям ---------- */
  E.PAUSE=[];for(let n=0;n<=12;n++)E.PAUSE[n]='<b>'+K5E.NAMES[n]+'</b><br><i>'+K5L.LINES[n]+'</i><br>Битва с Кощеем: двенадцать строк пролога — двенадцать стадий. Tab — панель стадий и оценок.';
