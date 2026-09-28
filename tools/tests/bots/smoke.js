//@@
const out=[];for(const L of ZC.LEVELS){try{ZC.startFrom(ZC.LV(L.id));ZC.G.manual=true;ZC.tick(20);if(ZC.G.cine)ZC.skip();ZC.tick(20);
  // немного погулять обоими и нажать всё подряд
  for(let i=0;i<180;i++){if(i%20===0){ZC.press('KeyR');ZC.press('Semicolon');}if(i%33===0){ZC.press('KeyF');ZC.press('Comma');}if(i%47===0){ZC.press('KeyE');ZC.press('KeyL');}ZC.hold('KeyW',i<90);ZC.hold('ArrowUp',i<90);ZC.tick(1);}
  ZC.hold('KeyW',false);ZC.hold('ArrowUp',false);if(ZC.G.cine)ZC.skip();ZC.tick(60);out.push(L.id+':ok');}catch(e){out.push(L.id+': ERR '+e.message+' '+(e.stack||'').split('\n').slice(1,3).join(' | '));}}out.join(' ')
