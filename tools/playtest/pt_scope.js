/* Телеметрия плейтеста. Выполняется ВНУТРИ области видимости игры: ZC.X(этот файл). Игру не меняет — только оборачивает функции
   (tip, say, banner, play, loadLevel, damageHero, makeFoe, unravel, completeLevel, step) и пишет события в PT.ev.
   Время PT.clock — игровое (сек), идёт только в состоянии 'play'; PT.cineT — сколько из него заняли ролики. */
(function(){
  if(window.PT&&PT.installed)return PT;
  const PT=window.PT={installed:true,ev:[],clock:0,cineT:0,pre:null,post:null,seen:{}};
  const strip=s=>String(s==null?'':s).replace(/<br\s*\/?>/g,' ').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
  const words=s=>(s.match(/[A-Za-zА-Яа-яЁё0-9]+/g)||[]).length;
  const lvId=()=>(W&&W.levelId)||'?';
  const push=(k,o)=>{o=o||{};o.k=k;o.t=+PT.clock.toFixed(2);o.lv=lvId();PT.ev.push(o);return o;};
  PT.push=push;PT.strip=strip;
  // тот же текст не пишем чаще раза в 1.5 с (некоторые подсказки обновляются каждый кадр)
  const fresh=(key)=>{const t=PT.clock,l=PT.seen[key];if(l!==undefined&&t-l<1.5){PT.seen[key]=t;return false;}PT.seen[key]=t;return true;};

  { const _tip=tip;tip=function(pi,html,dur){const s=strip(html);if(s&&fresh('tip'+pi+s))push('tip',{pi,chars:s.length,words:words(s),dur:+((dur||2)*(W&&W.tipMul||1)).toFixed(1),text:s.slice(0,160)});return _tip.apply(this,arguments);}; }
  { const _say=say;say=function(who,text,dur,noVoice){const s=strip(text);if(s&&fresh('say'+who+s))push('say',{who:who||'',chars:s.length,words:words(s),dur:dur||2.5,text:s.slice(0,160)});return _say.apply(this,arguments);}; }
  { const _bn=banner;banner=function(text,color,dur,sub){const s=strip(text),u=strip(sub);if((s||u)&&fresh('bn'+s+u))push('banner',{chars:s.length+u.length,words:words(s+' '+u),dur:dur||2,text:(s+' '+u).slice(0,120)});return _bn.apply(this,arguments);}; }
  { const _pl=play;play=function(def){try{const sy=(def&&def.says)||[];let ch=0;for(const q of sy)ch+=strip(q[3]).length;push('cine',{dur:+(def&&def.dur||0).toFixed(1),says:sy.length,chars:ch});}catch(e){}return _pl.apply(this,arguments);}; }
  { const _ll=loadLevel;loadLevel=function(i){const r=_ll.apply(this,arguments);PT.seen={};push('lvl',{id:lvId(),idx:i,name:(W&&W.name)||''});PT.objSeen=[-1,-1];return r;}; }
  { const _dh=damageHero;damageHero=function(h,src){const ok=_dh.apply(this,arguments);if(ok){const r=src&&src.ref;push('hit',{pi:h.player,hero:h.kind,src:(r&&r.kind)||(src&&src.kind)||'?',sig:r&&r.sig||null});}return ok;}; }
  { const _mf=makeFoe;makeFoe=function(kind,x,z,o){const e=_mf.apply(this,arguments);try{push('foe',{kind,x:+x.toFixed(1),z:+z.toFixed(1),big:!!(e&&e.big),emb:e&&e.maxEmb});}catch(err){}return e;}; }
  { const _un=unravel;unravel=function(e){const was=e&&e.alive;const r=_un.apply(this,arguments);if(was)push('kill',{kind:e.kind});return r;}; }
  { const _cl=completeLevel;completeLevel=function(){if(!G.trans)push('done',{id:lvId()});return _cl.apply(this,arguments);}; }
  { const _st=step;step=function(dt){
      if(G.state==='play'){PT.clock+=dt;if(G.cine)PT.cineT+=dt;}
      if(PT.pre)PT.pre(dt);
      _st.call(this,dt);
      if(G.state==='play'){
        for(let pi=0;pi<2;pi++){const p=players[pi];
          if(p.downed&&!p._pd){p._pd=true;push('down',{pi});}
          else if(!p.downed&&p._pd){p._pd=false;push('rev',{pi});}
          if(!PT.objSeen)PT.objSeen=[-1,-1];
          if(p.obj!==PT.objSeen[pi]&&W&&W.objectives&&W.objectives[pi]){PT.objSeen[pi]=p.obj;const o=W.objectives[pi][p.obj];
            if(o){let s='';try{s=strip(typeof o.text==='function'?o.text():o.text);}catch(e){}push('obj',{pi,idx:p.obj,chars:s.length,words:words(s),text:s.slice(0,200)});}}}
        if(PT.post)PT.post(dt);}
    }; }
  PT.summary=()=>{const s={};for(const e of PT.ev){const l=e.lv;const o=s[l]||(s[l]={});o[e.k]=(o[e.k]||0)+1;}return s;};
  return PT;
})();
