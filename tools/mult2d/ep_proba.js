// Проба стиля 2D-сериала (24,8 с, 9:16): начало серии 1 «Звенышко» (docs/46_multserial.md, планы 1-1…1-11, 4-1, 5-4…5-8).
// Регистры: бумага «Книжка Пелагеи» → лак «Палехская ночь» (Кощей, разрыв цепи) → бумага (штаб) → «Хохлома-морф» (титр).
// Герои и декорации — детали из ChatGPT (pup.js, sprites/), голоса — VoiceStudio (voice/proba/), рот — Rhubarb (voice/proba/lips/).
'use strict';
(() => {
const {seg, ease, lerp, clamp, twos, PAL} = MD, S = MD.spr;

const {sky, book, lacquer, border, frost, blinkAt, gesture} = MD.set;

// ---------- 1. Лукоморье раскрывается из книжки; Кот сказывает (бумага) ----------
const KOT = {x: 830, y: 1104, s: .62};
const shotLuko = {a: 0, b: 5.8, draw(ctx, t) {
  const k1 = ease.inOut(seg(t, 0, 2.6)), k2 = ease.inOut(seg(t, 2.6, 4.4));
  MD.camera(ctx, {x: lerp(540, 770, k2), y: lerp(lerp(1000, 960, k1), 1250, k2), z: lerp(lerp(.94, 1.0, k1), 1.6, k2)}, t);
  sky(ctx, t);
  S(ctx, 'bg/moon', 880, -60, {w: 290, ax: .5, ay: 0, rot: .05 * Math.sin(t * 1.3), shadow: .8});
  book(ctx);
  MD.pop(ctx, t, .2, 1490, () => S(ctx, 'bg/hills', 540, 1495, {w: 1380, ay: 1, shadow: .8}));
  MD.pop(ctx, t, .1, 1490, () => S(ctx, 'bg/sea', 540 + Math.sin(t * 1.3) * 20, 1500, {w: 1450, ay: 1, shadow: .8}));
  MD.pop(ctx, t, .45, 1500, () => S(ctx, 'bg/oak', 380, 1515, {w: 880, ay: 1}), .8);
  MD.pop(ctx, t, .75, 1500, () => { ctx.save(); ctx.translate(KOT.x, KOT.y); ctx.scale(KOT.s, KOT.s);
    const g = gesture(t, 1.2, 3.0) + gesture(t, 3.6, 5.4);
    MD.pup.kot(ctx, {t, mouth: MD.mouth('kot', t), armR: -.15 - g, armL: .15 + g * .3, eyes: blinkAt(t, [1.9, 4.6]) ? 'shut' : t < 1.2 ? 'half' : 'open',
      brow: seg(t, 3.5, 3.8) * (1 - seg(t, 4.8, 5.1)), tilt: .05 * Math.sin(twos(t) * 2.5)}); ctx.restore(); });
  MD.pop(ctx, t, .7, 1500, () => S(ctx, 'bg/grass', 540, 1545, {w: 1340, ay: 1, shadow: .7}));
}};

// ---------- 2. Кощей, крупно (лак) ----------
const shotKoschei = {a: 5.8, b: 8.4, draw(ctx, t) {
  ctx.save();
  MD.camera(ctx, {x: 540, y: 860, z: lerp(1, 1.1, ease.inOut(seg(t, 5.8, 8.4)))}, t);
  lacquer(ctx, t); frost(ctx, t, 5, 40, [0, 0, 1080, 1920]);
  ctx.translate(540, 930); ctx.scale(3.2, 3.2);
  MD.pup.koscheiBust(ctx, {open: ease.out(seg(t, 6.0, 6.3)), flare: Math.max(0, Math.sin(Math.PI * seg(t, 6.5, 7.6))), mouth: MD.mouth('koschei', t)});
  ctx.restore();
  border(ctx);
}};

// ---------- 3. Рука тянется к цепи — разрыв — звенья разлетаются (лак) ----------
const BREAK = 10.6, GRAB = 12, ARM = 2.1;
const flyers = (() => { const R = MD.rng(404), L = MD.chainLinks(), b = L[GRAB];
  return L.map(l => { const dx = l.x - b.x, dy = l.y - b.y - 60, d = Math.hypot(dx, dy) || 1, sp = 900 + R() * 900;
    return {...l, vx: dx / d * sp + (R() - .5) * 500, vy: dy / d * sp - 700 - R() * 600, spin: (R() - .5) * 14}; }); })();
const shotBreak = {a: 8.4, b: 13.1, draw(ctx, t) {
  const after = t - BREAK, hot = seg(t, 9.85, BREAK);
  const shake = t < BREAK ? hot * 7 : 26 * (1 - seg(t, BREAK, BREAK + .9));
  ctx.save();
  MD.camera(ctx, {x: 560, y: lerp(1000, 640, ease.inOut(seg(t, 11.6, 13.1))), z: lerp(1, 1.06, seg(t, 8.4, 10.5)), shake}, t);
  lacquer(ctx, t, 22);
  MD.cast.oakGold(ctx, t, seg(t, 8.4, 9.3), {fall: ease.in(seg(t, BREAK + .2, 13.1))});
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
    const path = k => [lerp(grab.x, 940, k), lerp(grab.y, -40, k) - Math.sin(k * Math.PI) * 120];
    for (let s = 1; s <= 14; s++) { const [x2, y2] = path(ease.out(seg(t - s * .03, BREAK, 12.9))); MD.radial(ctx, x2, y2, 40 - s * 2, `rgba(255,214,110,${.35 - s * .02})`); }
    const [zx, zy] = path(ease.out(seg(t, BREAK, 12.9)));
    MD.radial(ctx, zx, zy, 130, 'rgba(255,230,150,.8)');
    ctx.save(); ctx.translate(zx, zy); MD.pup.zven(ctx, {s: .3, r: after * 6, face: false}); ctx.restore();
  }
  // рука: входит справа, сжимает звено, после разрыва отдёргивается
  const enter = ease.out(seg(t, 8.75, 9.7)), recoil = ease.out(seg(t, BREAK, BREAK + .8)), grip = t < BREAK ? ease.inOut(seg(t, 9.5, 9.9)) : 1 - recoil;
  const reach = 482 * ARM - 40, hx = grab.x + reach + (1 - enter) * 900 + recoil * 700, hy = grab.y - 30 - recoil * 120;
  MD.radial(ctx, grab.x + 40, grab.y, 260, `rgba(150,70,200,${.5 * enter * (1 - recoil * .7)})`);
  ctx.save(); ctx.translate(hx, hy); MD.pup.koscheiArm(ctx, {s: ARM, rot: Math.PI / 2 + .05 - grip * .06 + recoil * .2}); ctx.restore();
  if (t > 9.1 && t < BREAK) {  // молнии от пальцев
    const R = MD.rng(Math.floor(t * 12)); ctx.save(); ctx.strokeStyle = 'rgba(190,240,255,.9)'; ctx.shadowColor = PAL.ice; ctx.shadowBlur = 16; ctx.lineWidth = 4;
    for (let n = 0; n < 2; n++) { let x = grab.x + 20, y = grab.y + (R() - .5) * 80; ctx.beginPath(); ctx.moveTo(x, y); for (let s = 0; s < 6; s++) { x += 40 + R() * 60; y += (R() - .5) * 90; ctx.lineTo(x, y); } ctx.stroke(); }
    ctx.restore();
  }
  if (after > 0) { const r = 1500 * ease.out(seg(after, 0, .9)), a = 1 - seg(after, 0, .9); MD.glow(ctx, MD.circle(grab.x, grab.y, r), `rgba(255,220,130,${a})`, 18 * a + 2, 40); }
  ctx.restore();
  if (after > 0 && after < .45) { ctx.fillStyle = `rgba(255,246,220,${1 - after / .45})`; ctx.fillRect(0, 0, MD.W, MD.H); }
  border(ctx);
}};

// ---------- 4–5. Штаб-сосна ночью: Пелагея пишет, искра влетает в окно и ныряет в тетрадку (бумага) ----------
const WIN = {x: 300, y: 540, w: 440, r: 160}, NOTE = {x: 560, y: 1262}, OWL = {x: 560, y: 985, s: .78};
const DIVE = [17.0, 17.6], UP = 14.15, POP = 19.05;
const zvPath = k => { const p0 = [WIN.x, WIN.y], c1 = [760, 420], c2 = [380, 980], p1 = [NOTE.x, NOTE.y - 20];
  const u = 1 - k; return [u * u * u * p0[0] + 3 * u * u * k * c1[0] + 3 * u * k * k * c2[0] + k * k * k * p1[0], u * u * u * p0[1] + 3 * u * u * k * c1[1] + 3 * u * k * k * c2[1] + k * k * k * p1[1]]; };
const hq = (ctx, t) => {
  S(ctx, 'bg/wall', 540, -360, {w: 1420, h: 2700, src: [0, 40, 1985, 390], ay: 0, shadow: 0});
  // окно; за стеклом — искра, иней и глаза Кощея
  S(ctx, 'bg/window', WIN.x, WIN.y, {w: WIN.w});
  ctx.save(); ctx.beginPath(); ctx.arc(WIN.x, WIN.y, WIN.r, 0, 7); ctx.clip();
  const dark = seg(t, 17.2, 17.7) * (1 - seg(t, 18.3, 18.9)); ctx.fillStyle = `rgba(60,20,80,${dark * .55})`; ctx.fillRect(0, 0, 700, 900);
  if (t > 13.6 && t < DIVE[0]) {
    const k = ease.in(seg(t, 13.6, DIVE[0])), x = lerp(WIN.x + 100, WIN.x, k) + Math.sin(t * 9) * 18 * (1 - k), y = lerp(WIN.y - 100, WIN.y, k);
    MD.radial(ctx, x, y, 30 + k * 90, 'rgba(255,220,130,.9)'); ctx.save(); ctx.translate(x, y); MD.pup.zven(ctx, {s: .04 + k * .16, r: t * 5, face: false}); ctx.restore();
  }
  const fr = seg(t, 17.25, 17.8) * (1 - seg(t, 18.3, 18.9));
  if (fr > 0) { const R = MD.rng(9); ctx.strokeStyle = `rgba(225,250,255,${.85 * fr})`; ctx.lineWidth = 3;
    for (let i = 0; i < 40; i++) { const a = R() * 6.28, len = (50 + R() * 100) * fr, x = WIN.x + Math.cos(a) * WIN.r, y = WIN.y + Math.sin(a) * WIN.r, tx = -Math.cos(a), ty = -Math.sin(a);
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + tx * len, y + ty * len); ctx.stroke();
      for (let b = 1; b < 4; b++) { const bx = x + tx * len * b / 4, by = y + ty * len * b / 4, bl = len * .25; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + (tx * .6 - ty * .8) * bl, by + (ty * .6 + tx * .8) * bl); ctx.moveTo(bx, by); ctx.lineTo(bx + (tx * .6 + ty * .8) * bl, by + (ty * .6 - tx * .8) * bl); ctx.stroke(); } }
    ctx.fillStyle = `rgba(230,250,255,${.25 * fr})`; ctx.fillRect(0, 0, 700, 900); }
  const ey = seg(t, 17.6, 17.85) * (1 - seg(t, 18.25, 18.5));
  if (ey > 0) for (const ex of [-40, 40]) { const x = WIN.x + ex + Math.sin(t * 3) * 26; MD.radial(ctx, x, WIN.y - 10, 60, `rgba(159,246,255,${ey * .9})`);
    ctx.fillStyle = `rgba(235,255,255,${ey})`; ctx.beginPath(); ctx.ellipse(x, WIN.y - 10, 15, 8, 0, 0, 7); ctx.fill(); }
  ctx.restore();
  S(ctx, 'bg/flags', 540, 150, {w: 1300, ay: .1, rot: .012 * Math.sin(t * 1.6)});
  const fk = .85 + .15 * Math.sin(t * 13) * Math.sin(t * 7.3);
  MD.radial(ctx, 905, 1010, 560 * fk, 'rgba(255,190,90,.42)');
};
const owlState = t => {
  const writing = t < UP, tq = twos(t);
  let eyes = writing ? 'half' : 'wow';
  if (blinkAt(t, [13.5, 18.45])) eyes = 'shut';
  if (t > 20.35) eyes = 'happy';
  return {t, pencil: true, eyes, mouth: MD.mouth('pelageya', t),
    wing: writing ? -.42 + .1 * Math.sin(tq * 14) : lerp(-.42, .12, ease.out(seg(t, UP, UP + .35))),
    eyeScale: 1 + .14 * ease.back(seg(t, UP, UP + .25)) * (1 - seg(t, 16.5, 17)), tilt: writing ? .04 : -.06 * (1 - seg(t, 17.6, 18.2))};
};
const room = (ctx, t, cam) => {
  MD.camera(ctx, cam, t);
  hq(ctx, t);
  ctx.save(); ctx.translate(OWL.x, OWL.y + Math.sin(twos(t) * 6) * 4); ctx.scale(OWL.s, OWL.s); MD.pup.pelageya(ctx, owlState(t)); ctx.restore();
  S(ctx, 'bg/table', 540, 1215, {w: 1320, ay: 0});
  S(ctx, 'bg/lamp', 905, 1290, {w: 220, ay: 1});
  const ng = seg(t, DIVE[1], DIVE[1] + .1) * (1 - .7 * seg(t, DIVE[1] + .1, DIVE[1] + 1)) + (t > 18.9 ? .25 : 0);
  S(ctx, 'bg/notebook', NOTE.x, NOTE.y, {w: 470});
  if (ng > 0) MD.radial(ctx, NOTE.x, NOTE.y - 20, 330, `rgba(255,214,110,${.8 * ng})`);
  const pts = k => { const p = new Path2D(); for (let s = 0; s <= 40; s++) { const q = zvPath(k * s / 40); s ? p.lineTo(q[0], q[1]) : p.moveTo(q[0], q[1]); } return p; };
  if (t >= DIVE[0] && t < DIVE[1]) {
    const k = ease.inOut(seg(t, ...DIVE));
    MD.glow(ctx, pts(k), '#F0C04A', 5, 16, 1 - seg(t, DIVE[1] - .15, DIVE[1]));
    const p = zvPath(k); ctx.save(); ctx.translate(p[0], p[1]); MD.pup.zven(ctx, {s: lerp(.32, .18, k), r: k * 9, glow: 1, eyes: 'open', mouth: 'E'}); ctx.restore();
  }
  if (t >= DIVE[1] && t < 18.9) MD.glow(ctx, pts(1), '#F0C04A', 4, 12, .5 * (1 - seg(t, DIVE[1], 18.9)));
  // выпрыгивает из тетрадки
  if (t >= POP) {
    const j = seg(t, POP, POP + .5), hover = t > POP + .5 ? Math.sin((t - POP - .5) * 5) * 10 : 0;
    const y = lerp(NOTE.y - 10, NOTE.y - 240, ease.back(j, 2.2)) + hover, zx = NOTE.x + 150 * ease.out(j);
    const st = j < .15 ? {sx: 1.3, sy: .7} : j < .55 ? {sx: .82, sy: 1.22} : {sx: 1, sy: 1};
    ctx.save(); ctx.translate(zx, y);
    MD.pup.zven(ctx, {s: .38 * (j < .25 ? 1 - seg(j, 0, .25) * .3 : 1), ...st, glow: .7, mouth: MD.mouth('zven', t), eyes: blinkAt(t, [21.0]) ? 'half' : t > 21.2 ? 'happy' : 'open'});
    ctx.restore();
    for (let i = 0; i < 4; i++) MD.stars(ctx, 900 + Math.floor(t * 8) * 7 + i, 1, t, '#FFE6A0', [zx - 160, y - 150, 320, 280], 9);
  }
};
const shotHQ = {a: 13.1, b: 18.9, draw(ctx, t) { room(ctx, t, {x: 540, y: 960, z: lerp(1, 1.08, ease.inOut(seg(t, 13.1, 18.9)))}); }};
const shotCU = {a: 18.9, b: 21.7, draw(ctx, t) { room(ctx, t, {x: 600, y: lerp(1060, 1030, seg(t, 18.9, 21.7)), z: lerp(1.72, 1.8, seg(t, 18.9, 21.7))}); }};

// ---------- 6. Титр «Хохлома-морф» ----------
const T0 = 21.7;
const curls = [
  ['M90,420 C120,250 330,230 340,360 C348,450 230,460 224,392 C220,350 270,346 276,376', PAL.ink],
  ['M990,430 C960,260 750,240 742,370 C736,460 852,466 856,398 C860,356 810,352 806,382', PAL.red],
  ['M80,1560 C110,1730 320,1750 330,1620 C338,1530 220,1520 214,1588 C210,1630 260,1634 266,1604', PAL.red],
  ['M1000,1560 C970,1730 760,1750 750,1620 C744,1530 862,1520 866,1588 C870,1630 820,1634 816,1604', PAL.ink],
  ['M-20,1830 C120,1760 260,1860 400,1790 C540,1860 680,1760 820,1840 C920,1780 1020,1820 1100,1780', PAL.ink],
  ['M-20,120 C120,190 260,90 400,160 C540,90 680,190 820,110 C920,170 1020,130 1100,170', PAL.red],
];
const berries = [[300, 330], [326, 300], [282, 296], [760, 330], [740, 300], [782, 298], [300, 1630], [280, 1660], [322, 1664], [780, 1630], [760, 1662], [802, 1660], [540, 470], [520, 1500], [562, 1500]];
const shotTitle = {a: T0, b: T0 + 3.1, draw(ctx, t) {
  const u = t - T0 + 16.9;   // время титра в разметке первой пробы
  ctx.fillStyle = '#F5B82E'; ctx.fillRect(0, 0, MD.W, MD.H);
  MD.radial(ctx, 540, 900, 900, 'rgba(255,236,170,.6)', 'rgba(255,236,170,0)', 'source-over');
  curls.forEach(([d, c], i) => MD.drawOn(ctx, MD.P(d), c, 16, ease.out(seg(u, 17.0 + i * .07, 17.9 + i * .07)), 1200, 0));
  for (const [x, y, r, s] of [[180, 560, .5, 1], [900, 560, -.5, -1], [180, 1430, -.5, 1], [900, 1430, .5, -1]]) {
    const k = ease.back(seg(u, 17.3, 17.8)); if (k <= 0) continue;
    ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.scale(k * s, k); MD.paper(ctx, MD.P('M0,0 C40,-70 120,-80 170,-40 C120,10 50,30 0,0Z'), '#3FA34D', {shadow: .5}); ctx.restore(); }
  berries.forEach(([x, y], i) => { const k = ease.back(seg(u, 17.5 + i * .04, 17.85 + i * .04), 2.4); if (k <= 0) return;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k); MD.paper(ctx, MD.circle(0, 0, 24), '#E23B2E', {shadow: .5, grain: .3}); ctx.fillStyle = '#FFF1D6'; ctx.beginPath(); ctx.arc(-7, -8, 6, 0, 7); ctx.fill(); ctx.restore(); });
  const word = (txt, y, size, t0) => { ctx.save(); ctx.font = `${size}px ${MD.FONT.display}`; ctx.textBaseline = 'alphabetic';
    const ws = [...txt].map(ch => ctx.measureText(ch).width), tot = ws.reduce((a, b) => a + b, 0); let x = 540 - tot / 2;
    [...txt].forEach((ch, i) => { const k = seg(u, t0 + i * .06, t0 + .45 + i * .06), dy = -520 * (1 - ease.back(k, 1.8)), rot = (1 - k) * (i % 2 ? .4 : -.4);
      if (k > 0) { ctx.save(); ctx.translate(x + ws[i] / 2, y + dy); ctx.rotate(rot); ctx.textAlign = 'center';
        ctx.fillStyle = '#E23B2E'; ctx.fillText(ch, 9, 9); ctx.fillStyle = PAL.ink; ctx.fillText(ch, 0, 0); ctx.restore(); }
      x += ws[i]; }); ctx.restore(); };
  word('ЗЛАТАЯ', 860, 196, 17.25); word('ЦЕПЬ', 1080, 232, 17.6);
  const L = 8; for (let i = 0; i < L * 2 + 1; i++) { if (i === L) continue; const k = seg(u, 17.9 + Math.abs(i - L) * .05, 18.1 + Math.abs(i - L) * .05); if (k <= 0) continue;
    MD.cast.link(ctx, {x: 540 + (i - L) * 46, y: 1196, rot: i % 2 ? Math.PI / 2 : 0, front: true}, {s: k}); }
  const zb = ease.back(seg(u, 16.9, 17.4)), hop = u > 17.4 ? Math.abs(Math.sin((u - 17.4) * 4)) * 26 : 0;
  ctx.save(); ctx.translate(540, 1196 - hop); MD.pup.zven(ctx, {s: .3 * zb + (1 - zb) * 1.4, glow: .5, eyes: blinkAt(u, [19.1]) ? 'half' : 'happy', mouth: 'D'}); ctx.restore();
  const ka = ease.out(seg(u, 18.4, 18.9)); ctx.save(); ctx.globalAlpha = ka; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink;
  ctx.font = `700 60px ${MD.FONT.ui}`; ctx.fillText('СЕРИЯ 1 · ЗВЕНЫШКО', 540, 1380 + (1 - ka) * 40);
  ctx.globalAlpha = ka * .75; ctx.font = `500 38px ${MD.FONT.ui}`; ctx.fillText('проба стиля', 540, 1446 + (1 - ka) * 40); ctx.restore();
  ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = .4; ctx.fillStyle = MD.grain(ctx); ctx.fillRect(0, 0, MD.W, MD.H); ctx.restore();
}};

MD.eps.proba = {
  dur: 24.8,
  shots: [shotLuko, shotKoschei, shotBreak, shotHQ, shotCU, shotTitle],
  trans: [{at: 5.8, dur: .6, type: 'lacquer', x: 540, y: 780}, {at: 13.1, dur: .6, type: 'page'}, {at: T0, dur: .5, type: 'gold', x: 810, y: 930}],
  voiceDir: 'voice/proba',
  voice: [
    {id: 'kot_01', who: 'kot', at: .7}, {id: 'koschei_01', who: 'koschei', at: 6.45}, {id: 'kot_02', who: 'kot', at: 11.0},
    {id: 'pelageya_01', who: 'pelageya', at: 14.35}, {id: 'zvenyshko_01', who: 'zven', at: 19.45},
  ],
  subs: [
    {a: .7, b: 5.7, who: 'Кот Учёный', color: '#F0C04A', text: 'У Лукоморья дуб зелёный, златая цепь на дубе том…'},
    {a: 6.45, b: 8.35, who: 'Кощей', color: '#9FF6FF', text: 'Довольно.'},
    {a: 11.0, b: 13.1, who: 'Кот Учёный', color: '#F0C04A', text: 'Разлетелись звенья по свету —'},
    {a: 14.35, b: 17.5, who: 'Пелагея', color: '#CDA8FF', text: '(шёпотом) Ой… летит… к нам!'},
    {a: 19.45, b: 21.65, who: 'Звенышко', color: '#FFD75E', text: 'Дзинь-дзинь! За мной — бегом!'},
  ],
  post(ctx) {   // общая виньетка — объединяет регистры
    const g = ctx.createRadialGradient(540, 960, 700, 540, 960, 1250); g.addColorStop(0, 'rgba(10,8,20,0)'); g.addColorStop(1, 'rgba(10,8,20,.38)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, MD.W, MD.H);
  },
};
})();
