// Проба стиля 2D-сериала (20 с, 9:16): начало серии 1 «Звенышко» (docs/46_multserial.md, планы 1-1…1-11, 4-1, 5-4…5-8).
// Регистры: бумага «Книжка Пелагеи» → лак «Палехская ночь» (Кощей, разрыв цепи) → бумага (штаб) → «Хохлома-морф» (титр).
'use strict';
(() => {
const {seg, ease, lerp, clamp, twos, PAL} = MD;

// ---------- общие декорации ----------
const sky = (ctx, t, a = '#1A2148', b = '#3B4C8E', seed = 11) => {
  const g = ctx.createLinearGradient(0, 0, 0, 1500); g.addColorStop(0, a); g.addColorStop(1, b);
  ctx.fillStyle = g; ctx.fillRect(-400, -600, 1880, 3100);
  ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = .35; ctx.fillStyle = MD.grain(ctx); ctx.fillRect(-400, -600, 1880, 3100); ctx.restore();
  MD.stars(ctx, seed, 34, t, '#F7E7B5', [-100, -300, 1280, 1500], 7);
};
const book = ctx => {
  MD.paper(ctx, MD.P('M-60,1500 L540,1462 L540,2000 L-60,2040 Z'), PAL.paper, {shadow: 1.2});
  MD.paper(ctx, MD.P('M1140,1500 L540,1462 L540,2000 L1140,2040 Z'), '#F3E7CE', {shadow: 1.2});
  ctx.save(); ctx.strokeStyle = 'rgba(160,140,110,.45)'; ctx.lineWidth = 3;
  for (let i = 1; i < 7; i++) { const y = 1462 + i * 64; ctx.beginPath(); ctx.moveTo(-40, y + 38 - i * 2); ctx.lineTo(520, y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(560, y); ctx.lineTo(1120, y + 38 - i * 2); ctx.stroke(); }
  ctx.strokeStyle = 'rgba(120,95,60,.6)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(540, 1462); ctx.lineTo(540, 2000); ctx.stroke(); ctx.restore();
};
const lacquer = (ctx, t, seed = 21) => {
  ctx.fillStyle = PAL.lac; ctx.fillRect(-400, -600, 1880, 3100);
  MD.radial(ctx, 560, 760, 1100, 'rgba(80,30,95,.75)', 'rgba(14,10,16,0)', 'source-over');
  MD.stars(ctx, seed, 26, t, '#E8B84A', [-100, -300, 1280, 1600], 6);
};
const border = (ctx, k = 1) => {   // золотая орнаментная рамка палехской шкатулки — в экранных координатах
  ctx.save(); ctx.globalAlpha = k;
  const r1 = new Path2D(); r1.roundRect(34, 34, 1012, 1852, 14); MD.glow(ctx, r1, '#D9A93A', 3, 8);
  const r2 = new Path2D(); r2.roundRect(52, 52, 976, 1816, 10); ctx.setLineDash([3, 14]); MD.glow(ctx, r2, '#D9A93A', 4, 4); ctx.setLineDash([]);
  for (const [x, y] of [[34, 34], [1046, 34], [34, 1886], [1046, 1886]]) { const p = MD.circle(x, y, 18); MD.glow(ctx, p, '#D9A93A', 3, 8); }
  ctx.restore();
};
const frost = (ctx, t, seed, n, box, col = 'rgba(200,250,255,.7)') => {  // ледяная пыль Кощея
  const R = MD.rng(seed); ctx.save(); ctx.fillStyle = col;
  for (let i = 0; i < n; i++) { const x = box[0] + R() * box[2], sp = 30 + R() * 60, y = box[1] + box[3] - ((R() * box[3] + t * sp) % box[3]), r = 2 + R() * 4;
    ctx.globalAlpha = .3 + .5 * R(); ctx.beginPath(); ctx.arc(x + Math.sin(t + i) * 12, y, r, 0, 7); ctx.fill(); }
  ctx.restore();
};

// ---------- 1. Лукоморье раскрывается из книжки (бумага) ----------
const shotLuko = {a: 0, b: 4.2, draw(ctx, t) {
  const k = ease.inOut(seg(t, 0, 4.4));
  MD.camera(ctx, {x: 540, y: lerp(1010, 930, k), z: lerp(.93, 1.05, k)}, t);
  sky(ctx, t);
  ctx.save(); ctx.translate(820, -40); ctx.rotate(.05 * Math.sin(t * 1.3));
  ctx.strokeStyle = 'rgba(247,231,181,.7)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 290); ctx.stroke();
  MD.paper(ctx, MD.circle(0, 390, 105), '#F7E7B5'); MD.paper(ctx, MD.circle(-34, 362, 20), '#E9D59A', {shadow: .2}); MD.paper(ctx, MD.circle(30, 420, 13), '#E9D59A', {shadow: .2});
  ctx.restore();
  book(ctx);
  MD.pop(ctx, t, .1, 1480, () => {
    const cols = ['#2B5DA8', '#3B78C2', '#5A96D8'];
    cols.forEach((c, j) => { const h = 150 - j * 40, off = Math.sin(t * 1.4 + j) * 26; let d = `M-120,1480 L-120,${1480 - h}`;
      for (let x = -120; x <= 1200; x += 90) d += ` Q${x + 45 + off},${1480 - h - 34} ${x + 90 + off},${1480 - h}`;
      MD.paper(ctx, new Path2D(d + ' L1200,1480 Z'), c, {shadow: .8}); });
  });
  MD.pop(ctx, t, .25, 1480, () => MD.paper(ctx, MD.P('M-80,1480 C80,1300 200,1290 320,1400 C380,1340 430,1330 470,1360 L470,1480Z M610,1480 L610,1350 C700,1300 820,1250 960,1330 C1040,1290 1120,1300 1180,1360 L1180,1480Z'), '#245A3E', {shadow: .8}));
  const links = MD.chainLinks(), glint = 1480 - (t - 1.6) * 520;
  const chain = front => MD.pop(ctx, t, .45, 1480, () => links.filter(l => l.front === front).forEach(l => MD.cast.link(ctx, l, {glow: Math.max(0, 1 - Math.abs(l.y - glint) / 70)})));
  chain(false); MD.cast.oakPaper(ctx, t, .45); chain(true);
  MD.pop(ctx, t, .7, 1490, () => {
    let d = 'M-120,1500'; for (let x = -120; x <= 1200; x += 40) d += ` L${x + 20},${1430 + (x % 120 === 0 ? -30 : 0)} L${x + 40},1500`;
    MD.paper(ctx, new Path2D(d + 'Z'), PAL.mossLight, {shadow: .7});
    for (const [x, c] of [[120, PAL.red], [210, '#F2B100'], [880, PAL.red], [960, '#FFFFFF'], [330, '#FFFFFF']]) MD.paper(ctx, MD.circle(x, 1440 + Math.sin(t * 2 + x) * 4, 15), c, {shadow: .4});
  });
}};

// ---------- 2. Кощей, крупно (лак) ----------
const shotKoschei = {a: 4.2, b: 5.9, draw(ctx, t) {
  ctx.save();
  MD.camera(ctx, {x: 540, y: 860, z: lerp(1, 1.1, ease.inOut(seg(t, 4.2, 5.9)))}, t);
  lacquer(ctx, t);
  frost(ctx, t, 5, 40, [0, 0, 1080, 1920]);
  ctx.translate(540, 900);
  const flare = Math.max(0, Math.sin(Math.PI * seg(t, 5.0, 5.75)));
  MD.cast.koscheiFace(ctx, {open: ease.out(seg(t, 4.55, 4.85)), flare, speak: t > 5.05 && t < 5.6 ? Math.abs(Math.sin(t * 22)) : 0});
  ctx.restore();
  border(ctx);
}};

// ---------- 3. Рука тянется к цепи — разрыв — звенья разлетаются (лак) ----------
const BREAK = 8.1, GRAB = 12;
const flyers = (() => { const R = MD.rng(404), L = MD.chainLinks(), b = L[GRAB];
  return L.map(l => { const dx = l.x - b.x, dy = l.y - b.y - 60, d = Math.hypot(dx, dy) || 1, sp = 900 + R() * 900;
    return {...l, vx: dx / d * sp + (R() - .5) * 500, vy: dy / d * sp - 700 - R() * 600, spin: (R() - .5) * 14, hue: R()}; }); })();
const shotBreak = {a: 5.9, b: 10.6, draw(ctx, t) {
  const after = t - BREAK, hot = seg(t, 7.35, BREAK);
  const shake = t < BREAK ? hot * 7 : 26 * (1 - seg(t, BREAK, BREAK + .9));
  const camY = lerp(1000, 640, ease.inOut(seg(t, 9.1, 10.6)));
  ctx.save();
  MD.camera(ctx, {x: 560, y: camY, z: lerp(1, 1.06, seg(t, 5.9, 8)), shake}, t);
  lacquer(ctx, t, 22);
  MD.cast.oakGold(ctx, t, seg(t, 5.9, 6.8), {fall: ease.in(seg(t, BREAK + .2, 10.6))});
  const links = MD.chainLinks(), grab = links[GRAB];
  if (t < BREAK) {
    for (const l of links) { const j = hot * 6; MD.cast.link(ctx, {...l, x: l.x + Math.sin(t * 70 + l.i) * j, y: l.y + Math.cos(t * 63 + l.i) * j}, {lac: 1, hot, glow: hot * .8, free: true}); }
  } else {
    for (const f of flyers) {
      const dt = after, drag = 1 - Math.exp(-dt * 1.6), x = f.x + f.vx * drag / 1.6, y = f.y + f.vy * drag / 1.6 + 260 * dt * dt;
      const fade = 1 - seg(dt, 1.2, 2.2); if (fade <= 0 || f.i === GRAB) continue;
      for (let s = 1; s <= 5; s++) { const d2 = Math.max(0, dt - s * .035), dr = 1 - Math.exp(-d2 * 1.6);
        ctx.fillStyle = `rgba(255,${200 + s * 8},120,${(.5 - s * .08) * fade})`; ctx.beginPath(); ctx.arc(f.x + f.vx * dr / 1.6, f.y + f.vy * dr / 1.6 + 260 * d2 * d2, 9 - s, 0, 7); ctx.fill(); }
      ctx.save(); ctx.globalAlpha = fade; MD.cast.link(ctx, {...f, x, y}, {lac: 1, free: true, spin: f.spin * dt, glow: .7, hot: Math.max(0, .8 - dt)}); ctx.restore();
    }
    // Звенышко — звено из руки Кощея — уносится вверх с хвостом кометы
    const k = ease.out(seg(t, BREAK, 10.4)), zx = lerp(grab.x, 940, k), zy = lerp(grab.y, -40, k) - Math.sin(k * Math.PI) * 120;
    for (let s = 1; s <= 14; s++) { const k2 = ease.out(seg(t - s * .03, BREAK, 10.4)), x2 = lerp(grab.x, 940, k2), y2 = lerp(grab.y, -40, k2) - Math.sin(k2 * Math.PI) * 120;
      MD.radial(ctx, x2, y2, 40 - s * 2, `rgba(255,214,110,${.35 - s * .02})`); }
    MD.radial(ctx, zx, zy, 130, 'rgba(255,230,150,.8)');
    ctx.save(); ctx.translate(zx, zy); MD.cast.zven(ctx, {s: .55, r: after * 6, face: false}); ctx.restore();
  }
  // рука: входит справа, сжимает звено, после разрыва отдёргивается
  const enter = ease.out(seg(t, 6.25, 7.2)), recoil = ease.out(seg(t, BREAK, BREAK + .8));
  const hx = lerp(1500, grab.x + 165, enter) + recoil * 700, hy = grab.y + 10 - recoil * 120;
  ctx.save(); ctx.translate(hx, hy); ctx.rotate(-.15 + recoil * .3);
  MD.cast.koscheiHand(ctx, {grip: t < BREAK ? ease.inOut(seg(t, 7.0, 7.4)) : 1 - recoil, aura: 1 - recoil * .7}); ctx.restore();
  if (t > 6.6 && t < BREAK) {  // молнии от пальцев
    const R = MD.rng(Math.floor(t * 12)); ctx.save(); ctx.strokeStyle = 'rgba(190,240,255,.9)'; ctx.shadowColor = PAL.ice; ctx.shadowBlur = 16; ctx.lineWidth = 4;
    for (let n = 0; n < 2; n++) { let x = hx - 60, y = hy + (R() - .5) * 80; ctx.beginPath(); ctx.moveTo(x, y); for (let s = 0; s < 6; s++) { x += 40 + R() * 60; y += (R() - .5) * 90; ctx.lineTo(x, y); } ctx.stroke(); }
    ctx.restore();
  }
  // ударная волна
  if (after > 0) { const r = 1500 * ease.out(seg(after, 0, .9)), a = 1 - seg(after, 0, .9); const p = MD.circle(grab.x, grab.y, r); MD.glow(ctx, p, `rgba(255,220,130,${a})`, 18 * a + 2, 40); }
  ctx.restore();
  if (after > 0 && after < .45) { ctx.save(); ctx.fillStyle = `rgba(255,246,220,${1 - after / .45})`; ctx.fillRect(0, 0, MD.W, MD.H); ctx.restore(); }
  border(ctx);
}};

// ---------- 4–5. Штаб-сосна ночью: Пелагея пишет, искра влетает в окно и ныряет в тетрадку (бумага) ----------
const WIN = {x: 300, y: 540, r: 196}, NOTE = {x: 560, y: 1236}, OWL = {x: 560, y: 990, s: .92};
const DIVE = [12.75, 13.4];
const zvPath = k => { const p0 = [WIN.x, WIN.y], c1 = [760, 420], c2 = [380, 980], p1 = [NOTE.x, NOTE.y + 10];
  const u = 1 - k; return [u * u * u * p0[0] + 3 * u * u * k * c1[0] + 3 * u * k * k * c2[0] + k * k * k * p1[0], u * u * u * p0[1] + 3 * u * u * k * c1[1] + 3 * u * k * k * c2[1] + k * k * k * p1[1]]; };
const hq = (ctx, t) => {
  const cols = ['#C8652F', '#B85A28', '#D47335', '#BF5F2B'];
  for (let i = -2; i < 11; i++) MD.paper(ctx, MD.P(`M${i * 120},-500 L${i * 120 + 118},-500 L${i * 120 + 118},2400 L${i * 120},2400 Z`), cols[(i + 4) % 4], {shadow: .35, grain: .6});
  // окно
  ctx.save(); ctx.beginPath(); ctx.arc(WIN.x, WIN.y, WIN.r, 0, 7); ctx.clip();
  const g = ctx.createLinearGradient(0, WIN.y - WIN.r, 0, WIN.y + WIN.r); g.addColorStop(0, '#1A2148'); g.addColorStop(1, '#3B4C8E'); ctx.fillStyle = g; ctx.fillRect(0, 0, 700, 900);
  const dark = seg(t, 13.0, 13.5) * (1 - seg(t, 14.2, 14.8)); ctx.fillStyle = `rgba(60,20,80,${dark * .6})`; ctx.fillRect(0, 0, 700, 900);
  MD.stars(ctx, 31, 12, t, '#F7E7B5', [WIN.x - WIN.r, WIN.y - WIN.r, WIN.r * 2, WIN.r * 2], 6);
  for (const [x, y, s] of [[200, 700, 110], [330, 730, 140], [440, 700, 100]]) MD.paper(ctx, MD.P(`M${x - s * .5},${y + 80} L${x},${y - s} L${x + s * .5},${y + 80} Z`), '#1F4A38', {shadow: .5});
  if (t > 11.1 && t < DIVE[0]) {  // далёкая искра приближается
    const k = ease.in(seg(t, 11.1, DIVE[0])), x = lerp(WIN.x + 120, WIN.x, k) + Math.sin(t * 9) * 20 * (1 - k), y = lerp(WIN.y - 120, WIN.y, k);
    MD.radial(ctx, x, y, 30 + k * 90, 'rgba(255,220,130,.9)'); ctx.save(); ctx.translate(x, y); MD.cast.zven(ctx, {s: .08 + k * .32, r: t * 5, face: false}); ctx.restore();
  }
  // иней и глаза Кощея за стеклом
  const fr = seg(t, 13.05, 13.6) * (1 - seg(t, 14.3, 14.9));
  if (fr > 0) { const R = MD.rng(9); ctx.strokeStyle = `rgba(225,250,255,${.85 * fr})`; ctx.lineWidth = 3;
    for (let i = 0; i < 40; i++) { const a = R() * 6.28, r0 = WIN.r, len = (60 + R() * 110) * fr; let x = WIN.x + Math.cos(a) * r0, y = WIN.y + Math.sin(a) * r0;
      const tx = -Math.cos(a), ty = -Math.sin(a); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + tx * len, y + ty * len); ctx.stroke();
      for (let b = 1; b < 4; b++) { const bx = x + tx * len * b / 4, by = y + ty * len * b / 4, bl = len * .25; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + (tx * .6 - ty * .8) * bl, by + (ty * .6 + tx * .8) * bl); ctx.moveTo(bx, by); ctx.lineTo(bx + (tx * .6 + ty * .8) * bl, by + (ty * .6 - tx * .8) * bl); ctx.stroke(); } }
    ctx.fillStyle = `rgba(230,250,255,${.25 * fr})`; ctx.fillRect(0, 0, 700, 900); }
  const ey = seg(t, 13.35, 13.6) * (1 - seg(t, 14.0, 14.3));
  if (ey > 0) for (const ex of [-46, 46]) { MD.radial(ctx, WIN.x + ex + Math.sin(t * 3) * 30, WIN.y - 10, 60, `rgba(159,246,255,${ey * .9})`);
    ctx.fillStyle = `rgba(235,255,255,${ey})`; ctx.beginPath(); ctx.ellipse(WIN.x + ex + Math.sin(t * 3) * 30, WIN.y - 10, 16, 9, 0, 0, 7); ctx.fill(); }
  ctx.restore();
  const ring = new Path2D(); ring.arc(WIN.x, WIN.y, WIN.r + 36, 0, 7); ring.arc(WIN.x, WIN.y, WIN.r, 0, 7);
  ctx.save(); ctx.shadowColor = 'rgba(10,10,32,.5)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 10; ctx.fillStyle = '#6A3F22'; ctx.fill(ring, 'evenodd'); ctx.restore();
  MD.paper(ctx, MD.P(`M${WIN.x - 9},${WIN.y - WIN.r} h18 v${WIN.r * 2} h-18Z M${WIN.x - WIN.r},${WIN.y - 9} h${WIN.r * 2} v18 h-${WIN.r * 2}Z`), '#6A3F22', {shadow: .6});
  // гирлянда флажков
  ctx.save(); ctx.strokeStyle = '#3A2414'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-40, 200); ctx.quadraticCurveTo(540, 360, 1120, 200); ctx.stroke(); ctx.restore();
  const fl = [PAL.red, '#F2B100', PAL.moss, PAL.lilac, '#3B78C2'];
  for (let i = 0; i < 11; i++) { const u = (i + .5) / 11, x = lerp(-40, 1120, u), y = (1 - u) * (1 - u) * 200 + 2 * u * (1 - u) * 360 + u * u * 200;
    ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(t * 2 + i) * .06); MD.paper(ctx, MD.P('M-34,0 L34,0 L0,70 Z'), fl[i % 5], {shadow: .6}); ctx.restore(); }
  // лампа
  const fk = .85 + .15 * Math.sin(t * 13) * Math.sin(t * 7.3);
  MD.radial(ctx, 900, 1080, 520 * fk, 'rgba(255,190,90,.45)');
};
const table = ctx => {
  MD.paper(ctx, MD.P('M-80,1250 L1160,1250 L1160,1310 L-80,1310 Z'), '#7A4A2A', {shadow: 1});
  MD.paper(ctx, MD.P('M-60,1310 L1140,1310 L1140,2100 L-60,2100 Z'), '#5E361D', {shadow: .5});
  ctx.save(); ctx.strokeStyle = 'rgba(30,15,5,.4)'; ctx.lineWidth = 4; for (const y of [1420, 1560, 1700]) { ctx.beginPath(); ctx.moveTo(-60, y); ctx.lineTo(1140, y); ctx.stroke(); } ctx.restore();
  MD.paper(ctx, MD.P('M860,1250 L940,1250 L930,1200 L870,1200 Z'), '#D9A93A', {shadow: .6});
  MD.paper(ctx, MD.P('M880,1200 L920,1200 L920,1090 L880,1090 Z'), '#FBF3E2', {shadow: .6});
};
const owlState = t => {
  const tq = twos(t), up = seg(t, 11.65, 11.8), sh = seg(t, 15.5, 15.6) * (1 - seg(t, 16.7, 16.8));
  const writing = t < 11.65;
  return {t, pencil: true, wing: writing ? -.62 + .14 * Math.sin(tq * 14) : lerp(-.62, .1, ease.out(seg(t, 11.65, 12))),
    look: writing ? [.15 + .1 * Math.sin(tq * 7), .8] : t < 14.6 ? (t > DIVE[0] ? (() => { const p = zvPath(seg(t, ...DIVE)); return [clamp((p[0] - 560) / 300, -1, 1), clamp((p[1] - 890) / 300, -1, 1)]; })() : [-.7, -.7]) : [.8, .3],
    eye: 1 + .25 * ease.back(up) - .1 * seg(t, 14.4, 14.6) + .1 * seg(t, 14.8, 15) , ruffle: up * (1 - seg(t, 12.4, 13)),
    blink: Math.max(Math.sin(Math.PI * seg(t, 10.9, 11.05)), Math.sin(Math.PI * seg(t, 14.0, 14.15))), happy: sh, oh: t > 11.8 && t < 13.2};
};
const room = (ctx, t, cam) => {
  MD.camera(ctx, cam, t);
  hq(ctx, t);
  ctx.save(); ctx.translate(OWL.x, OWL.y + Math.sin(twos(t) * 6) * 4); ctx.scale(OWL.s, OWL.s); MD.cast.pelageya(ctx, owlState(t)); ctx.restore();
  table(ctx);
  const nglow = seg(t, DIVE[1], DIVE[1] + .1) * (1 - .7 * seg(t, DIVE[1] + .1, DIVE[1] + 1));
  ctx.save(); ctx.translate(NOTE.x, NOTE.y); ctx.scale(.86, .86); MD.cast.notebook(ctx, {write: seg(t, 10.6, 11.65) * .7 + .2, glow: nglow + (t > 14.6 ? .3 : 0)}); ctx.restore();
  // Звенышко: влёт по кривой с золотой нитью, ныряние в тетрадку
  if (t >= DIVE[0] && t < DIVE[1]) {
    const k = ease.inOut(seg(t, ...DIVE)); const pts = new Path2D(); for (let s = 0; s <= 40; s++) { const p = zvPath(k * s / 40); s ? pts.lineTo(p[0], p[1]) : pts.moveTo(p[0], p[1]); }
    MD.glow(ctx, pts, '#F0C04A', 5, 16, 1 - seg(t, DIVE[1] - .15, DIVE[1]));
    const p = zvPath(k); ctx.save(); ctx.translate(p[0], p[1]); MD.cast.zven(ctx, {s: lerp(.5, .3, k), r: k * 9, glow: 1, look: [.5, 1]}); ctx.restore();
  }
  if (t >= DIVE[1] && t < 14.6) { const k = seg(t, DIVE[1], 14.6), pts = new Path2D(); for (let s = 0; s <= 40; s++) { const p = zvPath(s / 40); s ? pts.lineTo(p[0], p[1]) : pts.moveTo(p[0], p[1]); }
    MD.glow(ctx, pts, '#F0C04A', 4, 12, .5 * (1 - k)); }
  // выпрыгивает из тетрадки
  if (t >= 14.75) {
    const j = seg(t, 14.75, 15.25), y0 = NOTE.y - 10, hover = t > 15.25 ? Math.sin((t - 15.25) * 5) * 10 : 0;
    const y = lerp(y0, y0 - 230, ease.back(j, 2.2)) + hover, sq = j < .25 ? 1 - seg(j, 0, .25) * .3 : 1;
    const st = j < .15 ? {sx: 1.3, sy: .7} : j < .55 ? {sx: .82, sy: 1.22} : {sx: 1, sy: 1};
    const zx = NOTE.x + 150 * ease.out(j);
    ctx.save(); ctx.translate(zx, y); MD.cast.zven(ctx, {s: .62 * sq, ...st, glow: .8, look: [-.6, -.2], oh: t > 15.0 && t < 15.6, blink: Math.sin(Math.PI * seg(t, 16.1, 16.2))}); ctx.restore();
    const R = MD.rng(Math.floor(t * 8)); for (let i = 0; i < 6; i++) MD.stars(ctx, 900 + Math.floor(t * 8) * 7 + i, 1, t, '#FFE6A0', [zx - 170 + R() * 40, y - 140, 300, 260], 9);
  }
};
const shotHQ = {a: 10.6, b: 14.6, draw(ctx, t) { room(ctx, t, {x: 540, y: 960, z: lerp(1, 1.06, ease.inOut(seg(t, 10.6, 14.6)))}); }};
const shotCU = {a: 14.6, b: 16.9, draw(ctx, t) { room(ctx, t, {x: 560, y: lerp(1080, 1040, seg(t, 14.6, 16.9)), z: lerp(1.72, 1.8, seg(t, 14.6, 16.9))}); }};

// ---------- 6. Титр «Хохлома-морф» ----------
const curls = [
  ['M90,420 C120,250 330,230 340,360 C348,450 230,460 224,392 C220,350 270,346 276,376', PAL.ink],
  ['M990,430 C960,260 750,240 742,370 C736,460 852,466 856,398 C860,356 810,352 806,382', PAL.red],
  ['M80,1560 C110,1730 320,1750 330,1620 C338,1530 220,1520 214,1588 C210,1630 260,1634 266,1604', PAL.red],
  ['M1000,1560 C970,1730 760,1750 750,1620 C744,1530 862,1520 866,1588 C870,1630 820,1634 816,1604', PAL.ink],
  ['M-20,1830 C120,1760 260,1860 400,1790 C540,1860 680,1760 820,1840 C920,1780 1020,1820 1100,1780', PAL.ink],
  ['M-20,120 C120,190 260,90 400,160 C540,90 680,190 820,110 C920,170 1020,130 1100,170', PAL.red],
];
const berries = [[300, 330], [326, 300], [282, 296], [760, 330], [740, 300], [782, 298], [300, 1630], [280, 1660], [322, 1664], [780, 1630], [760, 1662], [802, 1660], [540, 470], [520, 1500], [562, 1500]];
const shotTitle = {a: 16.9, b: 20.0, draw(ctx, t) {
  ctx.fillStyle = '#F5B82E'; ctx.fillRect(0, 0, MD.W, MD.H);
  MD.radial(ctx, 540, 900, 900, 'rgba(255,236,170,.6)', 'rgba(255,236,170,0)', 'source-over');
  curls.forEach(([d, c], i) => MD.drawOn(ctx, MD.P(d), c, 16, ease.out(seg(t, 17.0 + i * .07, 17.9 + i * .07)), 1200, 0));
  for (const [x, y, r, s] of [[180, 560, .5, 1], [900, 560, -.5, -1], [180, 1430, -.5, 1], [900, 1430, .5, -1]]) {
    const k = ease.back(seg(t, 17.3, 17.8)); if (k <= 0) continue;
    ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.scale(k * s, k); MD.paper(ctx, MD.P('M0,0 C40,-70 120,-80 170,-40 C120,10 50,30 0,0Z'), '#3FA34D', {shadow: .5}); ctx.restore(); }
  berries.forEach(([x, y], i) => { const k = ease.back(seg(t, 17.5 + i * .04, 17.85 + i * .04), 2.4); if (k <= 0) return;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k); MD.paper(ctx, MD.circle(0, 0, 24), '#E23B2E', {shadow: .5, grain: .3}); ctx.fillStyle = '#FFF1D6'; ctx.beginPath(); ctx.arc(-7, -8, 6, 0, 7); ctx.fill(); ctx.restore(); });
  const word = (txt, y, size, t0) => { ctx.save(); ctx.font = `${size}px ${MD.FONT.display}`; ctx.textBaseline = 'alphabetic';
    const ws = [...txt].map(ch => ctx.measureText(ch).width), tot = ws.reduce((a, b) => a + b, 0); let x = 540 - tot / 2;
    [...txt].forEach((ch, i) => { const k = seg(t, t0 + i * .06, t0 + .45 + i * .06), dy = -520 * (1 - ease.back(k, 1.8)), rot = (1 - k) * (i % 2 ? .4 : -.4);
      if (k > 0) { ctx.save(); ctx.translate(x + ws[i] / 2, y + dy); ctx.rotate(rot); ctx.textAlign = 'center';
        ctx.fillStyle = '#E23B2E'; ctx.fillText(ch, 9, 9); ctx.fillStyle = PAL.ink; ctx.fillText(ch, 0, 0); ctx.restore(); }
      x += ws[i]; }); ctx.restore(); };
  word('ЗЛАТАЯ', 860, 196, 17.25); word('ЦЕПЬ', 1080, 232, 17.6);
  // цепочка под титром и Звенышко в середине
  const L = 8; for (let i = 0; i < L * 2 + 1; i++) { if (i === L) continue; const k = seg(t, 17.9 + Math.abs(i - L) * .05, 18.1 + Math.abs(i - L) * .05); if (k <= 0) continue;
    MD.cast.link(ctx, {x: 540 + (i - L) * 46, y: 1196, rot: i % 2 ? Math.PI / 2 : 0, front: true}, {s: k}); }
  const zb = ease.back(seg(t, 16.9, 17.4)), hop = Math.abs(Math.sin((t - 17.4) * 4)) * (t > 17.4 ? 26 : 0);
  ctx.save(); ctx.translate(540, 1196 - hop); MD.cast.zven(ctx, {s: .5 * zb + (1 - zb) * 2.2, glow: .6, look: [0, .3], blink: Math.sin(Math.PI * seg(t, 19.1, 19.2))}); ctx.restore();
  const ka = ease.out(seg(t, 18.4, 18.9)); ctx.save(); ctx.globalAlpha = ka; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink;
  ctx.font = `700 60px ${MD.FONT.ui}`; ctx.fillText('СЕРИЯ 1 · ЗВЕНЫШКО', 540, 1380 + (1 - ka) * 40);
  ctx.globalAlpha = ka * .75; ctx.font = `500 38px ${MD.FONT.ui}`; ctx.fillText('проба стиля', 540, 1446 + (1 - ka) * 40); ctx.restore();
  ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = .4; ctx.fillStyle = MD.grain(ctx); ctx.fillRect(0, 0, MD.W, MD.H); ctx.restore();
}};

MD.eps.proba = {
  dur: 20,
  shots: [shotLuko, shotKoschei, shotBreak, shotHQ, shotCU, shotTitle],
  trans: [{at: 4.2, dur: .6, type: 'lacquer', x: 540, y: 820}, {at: 10.6, dur: .6, type: 'page'}, {at: 16.9, dur: .5, type: 'gold', x: 810, y: 900}],
  subs: [
    {a: .9, b: 3.9, who: 'Кот Учёный', color: '#F0C04A', text: 'У Лукоморья дуб зелёный, златая цепь на дубе том…'},
    {a: 5.0, b: 5.9, who: 'Кощей', color: '#9FF6FF', text: 'Довольно.'},
    {a: 8.5, b: 10.4, who: 'Кот Учёный', color: '#F0C04A', text: 'Разлетелись звенья по свету —'},
    {a: 11.85, b: 13.3, who: 'Пелагея', color: '#CDA8FF', text: '(шёпотом) Ой… летит… к нам!'},
    {a: 15.0, b: 16.7, who: 'Звенышко', color: '#FFD75E', text: 'Дзинь-дзинь! За мной — бегом!'},
  ],
  post(ctx, t) {   // общая виньетка — объединяет регистры
    const g = ctx.createRadialGradient(540, 960, 700, 540, 960, 1250); g.addColorStop(0, 'rgba(10,8,20,0)'); g.addColorStop(1, 'rgba(10,8,20,.38)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, MD.W, MD.H);
  },
};
})();
