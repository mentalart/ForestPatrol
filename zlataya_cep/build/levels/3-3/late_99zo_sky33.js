/* ============================== РЕЛИЗ final06 · 3-3 «СИРИН И АЛКОНОСТ»: НЕБО ПО ПЕСНЕ, ПТИЦЫ ОТВЕЧАЮТ, ПОДХВАТ, ПЕРЬЯ-ОЦЕНКИ, ИНСТРУМЕНТАЛ (docs/38) ============================== */
// Обёртка над build33 прототипа (сетка долей, части и боты не меняются — состояние песни в W.song).
//  · небо идёт за песней: Сирин — сумерки, Алконост — светлеет, гроза — темно, перья — рассвет, хоровод — розовая заря, соло Пелагеи — восход солнца;
//  · птицы отвечают: точный прыжок — вспышка у той птицы, чей голос звучит; промах — птица опускает голову; в «эхо» птица показывает рисунок взмахом крыльев;
//  · подхват: на пути Ёжика пропущенную долю подхватывает птица (до двух раз за строчку) — «Сирин подхватила!», строчка не повторяется зря;
//  · перья-оценки: в конце каждой части — 1–3 пера за точность; три пера в «Грозе» — орешек;
//  · инструментал без пения: свирель-подголосок у Алконоста, бубен на сильную долю, гусельный перебор в «Протяжных», колокольчики в «Перьях»;
//  · завязка: птицы спорят, чья песня правильная (печальная или весёлая), — герои их мирят; Звенышко: «Помирите их песней!»
const SKY33=[0x3a3470,0x40387a,0x5a5aa8,0x6a70b8,0x2a2a58,0x7a86c8,0x90a8d8,0xd8a0a8,0xf0c890];
const ECHO33=[[1,0,1,1],[1,1,0,1],[0,1,1,1],[1,1,1,0]];
{const _b33=build33;build33=function(){const _ms=makeSirin,birds=[];makeSirin=function(k){const r=_ms(k);birds.push(r);return r;};try{_b33();}finally{makeSirin=_ms;}
  const S=W.song,F=W.flags;if(!S)return;const sirin=birds[0],alk=birds[1];
  const mats=b=>{const L=[];b.g.traverse(o=>{if(o.isMesh&&o.material&&o.material.emissive&&L.indexOf(o.material)<0)L.push(o.material);});return L;};
  const BM=[mats(sirin),mats(alk)].map(L=>L.map(m=>({m,e:m.emissive.getHex(),i:m.emissiveIntensity})));
  const flash=(i,col)=>{BM[i].forEach(q=>{q.m.emissive.setHex(col);q.m.emissiveIntensity=1.2;});later(0.18,()=>BM[i].forEach(q=>{q.m.emissive.setHex(q.e);q.m.emissiveIntensity=q.i;}));};
  // солнце для последнего куплета
  const sun=new THREE.Mesh(new THREE.SphereGeometry(4,20,14),MB(0xffd890,{transparent:true,opacity:0.95,fog:false}));sun.visible=false;W.group.add(sun);
  const sky=new THREE.Color(SKY33[0]),tmp=new THREE.Color();let lastK=-99,prevHits=[0,0],prevMiss=[0,0],prevCombo=[0,0],lastPhase=0,droop=[0,0],flap=[0,0];const picks={};F.feathers33=[];
  const voiceOf=()=>{const P=W.song&&[0,0,1,1,2,2,2,2,3][S.phase];return P===1?1:0;};   // какая птица ведёт: Сирин (0) или Алконост (1)
  const count=(pi,key)=>{let n=0;for(const k in S.judged[pi])if(S.judged[pi][k]===key)n++;for(const k in S.jg[pi])if(S.jg[pi][k]===key)n++;return n;};
  const partScore=(p)=>{let h=0,t=0;const q0=Math.floor(S.PS[p]/8),q1=Math.ceil(S.PS[p+1]/8);for(const pi of[0,1])for(let q=q0;q<q1;q++){h+=S.hits[pi][q]||0;t+=S.tries[pi][q]||0;}return t?h/t:1;};
  const bird=i=>i?alk:sirin;
  W.updates.push(dt=>{
    // небо по частям
    const tgt=SKY33[Math.min(8,S.phase)];tmp.setHex(tgt);sky.lerp(tmp,Math.min(1,dt*0.9));scene.background.copy(sky);if(scene.fog)scene.fog.color.copy(sky);
    const solo=S.phase===8&&S.state!=='cine';sun.visible=solo||S.state==='stop';if(sun.visible){const z=active(1).pos.z-70;sun.position.set(0,lerp(-6,10,clamp((S.t-S.bt[S.PS[8]])/8,0,1)),z);}
    if(S.state!=='play')return;
    // доля сменилась: инструментал и показ «эха»
    if(S.lastK!==lastK&&S.lastK>=0&&S.lastK<S.NB){lastK=S.lastK;const k=lastK,p=S.phase,i=k-S.PS[p],typ=S.typ(k),q=Math.floor(k/8),line=BER[q%3===2?2:q%2][i%8];
      if(i%8===0||i%8===4)tone(160,0.08,'square',0.05,90);                                  // бубен на сильную долю
      if((p===2||p===3||p===5)&&line[0])later(S.B*0.5,()=>tone(mf(line[0]+12),0.22,'sine',0.06,mf(line[0]+12)*1.01));   // свирель-подголосок
      if(typ==='hold'&&line[0])for(let j=0;j<3;j++)tone(mf(line[0]-12+[0,4,7][j]),0.5,'triangle',0.04,null,j*0.06);       // гусельный перебор
      if(typ==='high'&&i%8===2)tone(2093,0.3,'sine',0.05,2637);                              // колокольчик пера
      if(typ==='echo'&&i%8<4&&ECHO33[Math.floor(i/8)%4][i%8]){flap[0]=1;}                    // Сирин показывает рисунок взмахом
    }
    // ответы птиц: попадания и промахи
    for(const pi of[0,1]){const hh=count(pi,'hit'),mm=count(pi,'miss');
      if(hh>prevHits[pi]){flash(voiceOf(),0xffd76a);}
      if(mm>prevMiss[pi]){droop[voiceOf()]=1;
        // подхват на пути Ёжика: последний промах — птица берёт долю на себя (до двух раз за строчку)
        if(players[pi].path==='easy'){for(let k=Math.max(0,S.lastK-3);k<=S.lastK;k++){if(S.judged[pi][k]!=='miss')continue;const q=Math.floor(k/8),pk=pi+':'+q+':'+(S.rep[q]||0);if((picks[pk]||0)>=2)break;picks[pk]=(picks[pk]||0)+1;
            S.judged[pi][k]='hit';S.hits[pi][q]=(S.hits[pi][q]||0)+1;S.combo[pi]=prevCombo[pi]+1;const b=bird(voiceOf());flash(voiceOf(),0x9fe6ff);
            floatText(b.g.position.clone().add(new V3(0,2.6,0)),(voiceOf()?'Алконост':'Сирин')+' подхватила!','#9fe6ff');tone(mf(76),0.3,'sine',0.1);break;}}}
      prevHits[pi]=count(pi,'hit');prevMiss[pi]=count(pi,'miss');prevCombo[pi]=S.combo[pi];}
    for(const i of[0,1]){droop[i]=Math.max(0,droop[i]-dt*1.5);flap[i]=Math.max(0,flap[i]-dt*3);const b=bird(i);b.head.rotation.x=droop[i]*0.5;if(flap[i]>0)b.wings.forEach(w=>{w.wp.rotation.z=w.s*(0.2+flap[i]*0.9);});}
    // перья-оценки: часть кончилась
    if(S.phase!==lastPhase){const p=lastPhase;lastPhase=S.phase;if(p<8){const r=partScore(p),n=r>=0.9?3:r>=0.65?2:1;F.feathers33[p]=n;
        floatText(alk.g.position.clone().add(new V3(0,3,0)),'Перо'+(n>1?'а':'')+' за часть: '+'✦'.repeat(n),'#ffe08a');tone(1568,0.2,'sine',0.08);if(n===3)later(0.2,()=>tone(2093,0.25,'sine',0.08));
        if(p===4&&n===3&&!F.stormNut){F.stormNut=true;const h=active(0),it=nutItem(h.pos.x,3,h.pos.z-3);later(0.3,()=>takeItem(it,h));floatText(h.pos.clone().add(new V3(0,3,0)),'Три пера в грозе — орешек!','#ffe36b');}}}});
  // завязка: птицы спорят — чья песня правильная
  const _st=W.onStart;W.onStart=()=>{play({dur:15.6,fov:48,shots:[shot(0,[0,3.4,16],[0,4,-4]),shot(4.6,[-3,4.6,4],[-6.4,4.4,-2]),shot(9.6,[3,4.6,4],[6.4,4.4,-2])],
    says:[[0.3,4,null,'<i>На двух облаках две птицы, у каждой девичий лик:</i><br><i>Сирин поёт печально, медленно, а Алконост — радостно, быстро, в тот же миг.</i>',true],
      [4.6,2.6,'sirin','Небо ровное, когда поют тихонько…'],[7.2,2.2,'alkonost','…а весело — ещё ровней, звонко!'],
      [9.6,2.8,'sirin','Моя песня правильная — печальная!',true],[12.4,2.8,'alkonost','Нет, моя — весёлая! Слушай меня!',true]],
    events:[{t:0,fn:()=>{sirin.g.position.set(-6.4,4.2,-2);alk.g.position.set(6.4,4.2,-2);}},{t:9.6,fn:()=>{flash(0,0x8a7aff);}},{t:12.4,fn:()=>{flash(1,0xffd76a);}}],
    tick:(t)=>{sirin.g.position.set(-6.4,4.2,-2);alk.g.position.set(6.4,4.2,-2);sirin.head.rotation.y=t>9.4?0.6:0;alk.head.rotation.y=t>9.4?-0.6:0;},
    end:()=>{S.state='play';snapCams();sirin.head.rotation.y=alk.head.rotation.y=0;later(0.2,()=>say('zven','Они поссорились — и сбилось всё небо. Помирите их песней!',2.8,true));}});};
};}
