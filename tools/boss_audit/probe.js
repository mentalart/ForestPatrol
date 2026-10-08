;(function(){
const PR=window.PR={log:[],on:false,c:0,st:{},fr:[],cine:null};
const T=()=>+(G.time||0).toFixed(2);
const strip=h=>String(h==null?'':h).replace(/<br\s*\/?>/g,' ').replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
const push=(k,o)=>{if(PR.on)PR.log.push(Object.assign({t:T(),lv:(W&&W.levelId)||'',k},o));};
PR.push=push;
const voiced=(who,text)=>{try{const e=FIN.vox&&FIN.vox.find&&FIN.vox.find(who,text);return e?(e.dur||1):0;}catch(e){return -1;}};
{const f=tip;tip=function(pi,html,dur){push('tip',{pi,text:strip(html),dur:dur||2});return f.apply(this,arguments);};}
{const f=banner;banner=function(text,color,dur,sub){push('banner',{text:strip(text),sub:strip(sub),dur:dur||2.2,color});return f.apply(this,arguments);};}
{const f=say;say=function(who,text,dur,nv){push('say',{who,text:strip(text),dur,v:voiced(who,text)});return f.apply(this,arguments);};}
{const f=sayP;sayP=function(text,dur){push('sayP',{text:strip(text),dur});return f.apply(this,arguments);};}
{const f=floatText;floatText=function(pos,text,color){push('float',{text:strip(text),color});return f.apply(this,arguments);};}
{const f=play;play=function(def){const sy=(def&&def.says||[]).map(s=>({t:s[0],d:s[1],who:s[2],text:strip(s[3]),v:voiced(s[2],s[3])}));push('play',{dur:def&&def.dur,says:sy,shots:(def&&def.shots||[]).length});return f.apply(this,arguments);};}
{const f=prompt;prompt=function(pi,action,at,cond,note){push('prompt',{pi,action,note:strip(note)});return f.apply(this,arguments);};}
if(FIN.bossfx)FIN.bossfx.onshake=(pi,amp,dur)=>push('shake',{a:amp,d:dur,pi:pi});   // итоговая амплитуда (после потолка боссовых уровней)
else{const f=shake;shake=function(pi,amp,dur){push('shake',{a:amp,d:dur,pi:pi});return f.apply(this,arguments);};}
try{const ct=CINE.trauma;CINE.trauma=function(a){push('trauma',{a});return ct.apply(this,arguments);};}catch(e){}
try{const fd=CINE.flashDip;CINE.flashDip=function(col,a){push('flashDip',{a:a||0.5,col});return fd.apply(this,arguments);};}catch(e){}
let _hs=0,_fo=0;
const IDS=['hint0','hint1','hintS','banner','subs','finBossHint','finTut','bossbar','vest','skip','pbub','owl','skaz','card'];
PR.sample=function(){
  try{updateUI(0.1);}catch(e){}
  for(const id of IDS){const el=document.getElementById(id);if(!el)continue;const cs=getComputedStyle(el);const op=parseFloat(cs.opacity);
    const shown=cs.display!=='none'&&cs.visibility!=='hidden'&&op>0.15;const txt=shown?strip(el.innerText||el.textContent):'';
    const r0=txt?el.getBoundingClientRect():null,key=id==='finBossHint'&&r0?txt+'@'+(r0.top|0):txt;   // подсказка босса может сдвинуться под баннер при том же тексте (F-2d)
    if(PR.st[id]!==key){PR.st[id]=key;const r=r0;push('dom',{id,text:txt,rect:r?[r.left|0,r.top|0,r.width|0,r.height|0]:null,fs:txt?cs.fontSize:null});}}
  const c=G.cine;if(!!c!==!!PR.cine){PR.cine=c?1:0;push(c?'cine+':'cine-',{dur:c&&c.dur});}
};
PR.perf=function(){const i=renderer.info;return {calls:i.render.calls,tri:i.render.triangles,geo:i.memory.geometries,fx:(FIN.fx&&FIN.fx.list&&FIN.fx.list.length)||0};};
const _tk=ZC.tick;ZC.tick=function(n){for(let i=0;i<(n||1);i++){_tk(1);
  if(PR.on){const h=G.hitstop||0;if(h>_hs+0.01)push('hitstop',{a:+h.toFixed(2)});_hs=h;
    const fe=document.getElementById('flash');const fo=fe?parseFloat(fe.style.opacity)||0:0;if(fo>0.3&&_fo<=0.3)push('flash',{op:fo});_fo=fo;
    PR.c++;if(PR.c%6===0)PR.sample();
    if(PR.c%120===0){try{const t0=performance.now();render();try{renderer.getContext().finish();}catch(e){}const ms=performance.now()-t0;const p=PR.perf();push('perf',{ms:+ms.toFixed(0),calls:p.calls,tri:p.tri,fx:p.fx,geo:p.geo,en:(W.enemies||[]).length,split:G.split||0});}catch(e){}}}}};
PR.reset=()=>{PR.log.length=0;PR.st={};PR.c=0;PR.cine=null;PR.fl=0;};
PR.dump=(lv)=>JSON.stringify(PR.log);
})();
