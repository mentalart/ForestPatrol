//@@ wait=1500
// релиз final06: напарник-бот бежит дорожку Игрока 2 в 1-3 «Колобок» (раннер на гуслях): уходит от пней и дыр, прыгает на струны в такт, щит и удар зверям,
// пляска-финал в свою долю. Человека (Игрок 1) играет автопилот из t13v — только его дорожка.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.P=ZC.players;
ZC.startFrom(ZC.LV('1-3'));ZC.G.manual=true;ZC.tick(10);CO.set(true);CO.skill=1;for(let i=0;i<8&&ZC.G.cine;i++){ZC.skip();ZC.tick(20);}ZC.tick(30);
const S=ZC.W.song;[ZC.W.levelId,S.state,'mode='+CO.mode]
//@@
// человек: автопилот Игрока 1 (t13v), бот — сам
window.hbot=function(n){const S=ZC.W.song;const pi=0,J='Space',G='KeyG',R='ShiftLeft',L='KeyA',Rt='KeyD',A='KeyF';
 const oz=o2=>o2.type==='barrel'?o2.bz:o2.z;
 for(let i=0;i<n;i++){if(S.state!=='play')break;const h=U.act(pi);
   const bad=l=>S.obst.some(x=>x.pi===pi&&!x.hit&&(x.type==='stump'||x.type==='hole'||x.type==='barrel')&&x.lanes.includes(l)&&oz(x)<h.pos.z+0.8&&h.pos.z-oz(x)<7.5);
   const pit=S.obst.some(x=>x.pi===pi&&!x.hit&&x.type==='pit'&&x.z<h.pos.z+0.5&&h.pos.z-x.z<12);
   const pick=S.picks.find(q=>q.pi===pi&&!q.taken&&q.z<h.pos.z&&h.pos.z-q.z<9);
   let want=S.lane[pi];if(pit)want=1;else if(pick&&!bad(pick.lane))want=pick.lane;else if(bad(want)){const c=[1,0,2].filter(l=>!bad(l));if(c.length)want=c.sort((a,b)=>Math.abs(a-S.lane[pi])-Math.abs(b-S.lane[pi]))[0];}
   if(want!==S.lane[pi]&&i%6===0)ZC.press(want<S.lane[pi]?L:Rt);
   const lg=S.obst.find(x=>x.pi===pi&&!x.hit&&x.type==='log'&&x.z<h.pos.z&&h.pos.z-x.z<1.25),br=S.obst.find(x=>x.pi===pi&&!x.hit&&x.type==='branch'&&x.z<h.pos.z&&h.pos.z-x.z<1.6);
   const hole=S.obst.find(x=>x.pi===pi&&!x.hit&&x.type==='hole'&&x.lanes.includes(S.lane[pi])&&x.z<h.pos.z&&h.pos.z-x.z<0.9);
   const s=S.strings.find(q=>q.pi===pi&&!q.used&&Math.abs(q.z-h.pos.z)<1.3&&q.lanes.includes(S.lane[pi]));
   const onB=Math.abs(S.bph)<0.012||Math.abs(S.bph-1)<0.012||(S.B&&(S.bph*S.B<0.0175));
   if(s&&onB&&h.grounded)ZC.press(J);else if((lg||hole)&&h.grounded&&!s)ZC.press(J);
   if(br&&h.grounded&&h.rollT<=0)ZC.press(R);
   const b=S.beasts.find(q=>q.pi===pi&&!q.res&&Math.abs(q.z-h.pos.z)<3.6);if(b&&onB&&S.lastK===b.k)ZC.press(G);
   const BT=S.BT;for(const f of S.foes){if(f.res&&f.res!=='parry')continue;const dt=BT[f.k]-S.t;
    if((f.type==='lunge'||f.type==='crow')&&!f.res&&f.locked&&f.lane===S.lane[pi]&&f.pi===pi&&dt<0.9&&dt>0){const c=[0,1,2].filter(l=>l!==f.lane&&!bad(l));const nl=c.length?c.sort((a,b)=>Math.abs(a-S.lane[pi])-Math.abs(b-S.lane[pi]))[0]:(f.lane===0?1:f.lane-1);if(i%3===0)ZC.press(nl<S.lane[pi]?L:Rt);}
    if(f.type==='boar'&&!f.res&&f.pi===pi&&f.lane===S.lane[pi]&&dt<0.22&&dt>0.05&&h.grounded)ZC.press(J);
    if(f.type==='storm'&&!f.res&&f.pi===pi&&f.lanes.includes(S.lane[pi])&&h.pos.z-f.z<10&&h.pos.z>f.z){const c=[0,1,2].filter(l=>!f.lanes.includes(l));if(i%3===0&&c.length){const nl=c.sort((a,b)=>Math.abs(a-S.lane[pi])-Math.abs(b-S.lane[pi]))[0];ZC.press(nl<S.lane[pi]?L:Rt);}}
    if((f.type==='paw'||f.type==='hawk')&&f.pi===pi){if(!f.res&&Math.abs(dt)<0.012)ZC.press(G);if(f.res==='parry'&&S.t>BT[f.k]+0.15&&!f.cn){f.cn=1;ZC.press(A);}}
    if(f.type==='duo'&&!f.res&&Math.abs(dt)<0.012)ZC.press(G);}
   ZC.tick(1);}
 return 't='+S.t.toFixed(1)+' k='+S.lastK+' part='+S.part;};
window.hfin=function(sec){const S=ZC.W.song;const log=[];let st=-1;
 for(let i=0;i<60*sec&&S.state==='final';i++){if(S.fs!==st){st=S.fs;log.push('stage'+st);}
  if(S.fin){const P=S.FST[S.fs];const k=Math.round(S.ft/S.B2),d=S.ft-k*S.B2;if(k>=0&&Math.abs(d)<0.009){const b=k%P.n,w=P.who(b);if(w===2||w===0)ZC.press(P.act(b)==='C'?'KeyG':'Space');}}
  ZC.tick(1);}
 return log.join(',')+' state='+S.state;};
const S=ZC.W.song,r=[hbot(60*70)];r.push('state='+S.state,'part='+S.part,'mode='+CO.mode,'hits='+JSON.stringify(S.hits),'tries='+JSON.stringify(S.tries),'stumbles='+(S.stumbles||0));r
//@@
const S=ZC.W.song,r=[hbot(60*60)];r.push('state='+S.state,'part='+S.part,'hits='+JSON.stringify(S.hits),'tries='+JSON.stringify(S.tries),'combo='+JSON.stringify(S.best),'foes='+S.foes.filter(f=>f.res).length+'/'+S.foes.length);
const sum=a=>a.reduce((x,y)=>x+y,0);r.push(sum(S.hits[1])>=sum(S.tries[1])*0.9&&sum(S.tries[1])>40&&S.foes.every(f=>f.res)?'runner ok':'FAIL runner '+sum(S.hits[1])+'/'+sum(S.tries[1]));r
//@@
const S=ZC.W.song;let n=0;while(S.state!=='final'&&n<60*60){ZC.tick(1);n++;}
const r=['state='+S.state,hfin(40)];r.push('lit='+JSON.stringify(S.lit),'finale='+JSON.stringify(S.finale),'errs='+_errs.length,(S.state==='done'&&S.lit.every(x=>x)&&!_errs.length)?'finale ok':'FAIL finale');r
