U.go();const out=[];const N=ZC.LEVELS.length;let cnt=0;
for(let i=0;i<N;i++){try{ZC.loadLevel(i);ZC.tick(5);}catch(e){out.push('LOAD '+i+' '+e.message);continue;}
 const W=ZC.W;
 for(const pi of[0,1]){(W.objectives[pi]||[]).forEach((o,j)=>{try{const t=typeof o.text==='function'?o.text():o.text;cnt++;if(typeof t!=='string')out.push(W.name+' obj'+pi+'.'+j+' not string');}catch(e){out.push(W.name+' obj'+pi+'.'+j+' '+e.message);}});
  (W.tipZones||[]).forEach((z,j)=>{try{const t=z.text(pi,U.act(pi));cnt++;}catch(e){out.push(W.name+' zone'+j+' '+e.message);}});}
 (W.prompts||[]).forEach((p,j)=>{if(typeof p.note==='function'){try{p.note();cnt++;}catch(e){out.push(W.name+' note'+j+' '+e.message);}}});}
'checked='+cnt+' levels='+N+' errors='+out.length+'\n'+out.join('\n')
