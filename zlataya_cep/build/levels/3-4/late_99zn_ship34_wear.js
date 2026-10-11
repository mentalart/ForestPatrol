/* ============================== РЕЛИЗ final06 · 3-4 «ЛЕТУЧИЙ КОРАБЛЬ»: КАПИТАНСКИЙ СВИСТОК ============================== */
// Награда за чистый полёт: ни одной царапины за 3-4 (уступы, камнепад, арка, низкая туча). Уровень (proto/levels/3-4.js) на посадке
// зовёт buyWard('svistok34'), если вещь есть в WEAR; вещь «заработанная» (earn) — в лавке не продаётся, в примерочной — «На шею».
WEAR.svistok34={slot:'neck',name:'Капитанский свисток',cost:0,earn:'clean34',desc:'С Летучего корабля — за полёт без единой царапины.',
  icon:SV('<path d="M12 12 Q32 40 52 12" fill="none" stroke-width="2"/><rect x="22" y="34" width="22" height="12" rx="6" fill="#ffd23a"/><circle cx="26" cy="40" r="3" fill="#3a2410" stroke="none"/><rect x="42" y="37" width="10" height="6" rx="2" fill="#ffd23a"/>'),
  build(g,f){const r=f.neck[1]+0.02,t=f.hs,cord=M(0x3a5aa0);for(let i=0;i<14;i++){const a=i/14*Math.PI*2;part(g,new THREE.SphereGeometry(0.022*t,5,4),cord,Math.sin(a)*r,-Math.max(0,Math.cos(a))*0.05*t,Math.cos(a)*r);}
    const gd=M(0xffd23a,{emissive:0x806010,emissiveIntensity:0.4});const w=part(g,new THREE.CylinderGeometry(0.05*t,0.05*t,0.16*t,10),gd,0,-0.1*t,r+0.04);w.rotation.z=Math.PI/2;
    part(g,new THREE.BoxGeometry(0.08*t,0.05*t,0.06*t),gd,0.11*t,-0.09*t,r+0.04);}};
