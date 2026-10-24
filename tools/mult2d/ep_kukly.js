// Лист кукол: все куклы серии в покое и в позе — проверка шарниров и посадки глаз и рта (node tools/mult2d/shoot.js --ep kukly --at 0,1).
// t = 0 — покой, t = 1 — поза (руки вверх, взгляд вбок, рот открыт).
'use strict';
(() => {
const row = (ctx, t, list, y) => list.forEach(([name, x, s], i) => {
  const p = t >= 1 ? {armL: .9, armR: .5, elbowL: .5, elbowR: -.4, legL: .15, legR: .1, eyes: 'side', mouth: 'D', brow: 1, tilt: .1, sling: true, ladle: .4, pillow: true} : {pillow: name === 'tishka'};
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); MD.pup[name](ctx, {t, ...p}); ctx.restore();
  ctx.fillStyle = '#333'; ctx.font = '28px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(name, x, y + 340 * s + 40);
});
MD.eps.kukly = {dur: 2, shots: [{a: 0, b: 2, draw(ctx, t) {
  ctx.fillStyle = '#FBF3E2'; ctx.fillRect(0, 0, MD.W, MD.H);
  ctx.strokeStyle = 'rgba(0,0,0,.08)'; for (let x = 0; x < MD.W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, MD.H); ctx.stroke(); }
  row(ctx, t, [['proshka', 270, .55], ['potap', 780, .5]], 560);
  row(ctx, t, [['yosha', 230, .55], ['tishka', 560, .6], ['kolobok', 880, .45]], 1350);
}}]};
})();
