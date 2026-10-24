// Куклы-перекладки из деталей ChatGPT (sprites/<герой>/…, нарезка — cut.py). Координаты — в пикселях листа деталей,
// масштаб задаёт сцена. Рот — форма Rhubarb (A–H, X — покой), глаза — набор (open, half, shut, wow, side, happy).
'use strict';
MD.pup = {};
(() => {
const S = MD.spr, M = m => (!m || m === 'X') ? 'A' : m;
const OPEN = {X: 0, A: 0, B: .3, C: .6, D: 1, E: .7, F: .35, G: .2, H: .5};

// Пелагея: тело, голова с лицевым диском, глаза, клюв, кокошник, крылья на шарнирах (ближнее — с карандашом).
MD.pup.pelageya = (ctx, st = {}) => {
  const P = 'pelageya/', t = st.t || 0;
  const eyes = {open: ['eye_l', 'eye_r'], half: ['eye_half_l', 'eye_half_r'], shut: ['eye_shut_l', 'eye_shut_r'], happy: ['eye_shut_l', 'eye_shut_r'],
    wow: ['eye_wow_l', 'eye_wow_r'], side: ['eye_side_l', 'eye_side_r']}[st.eyes || 'open'];
  S(ctx, P + 'wing_r', 158, 0, {ax: .5, ay: .08, rot: -(st.wingR ?? .12)});
  S(ctx, P + 'foot_l', -70, 352, {s: .8, ay: .15}); S(ctx, P + 'foot_r', 70, 352, {s: .8, ay: .15});
  S(ctx, P + 'body', 0, 150);
  ctx.save(); ctx.translate(0, -112); ctx.rotate(st.tilt || 0);
  S(ctx, P + 'head', 0, 0);
  const es = st.eyeScale ?? 1;
  const lx = (st.look?.[0] || 0) * 10, ly = (st.look?.[1] || 0) * 6;
  S(ctx, P + eyes[0], -78 + lx, -6 + ly, {s: .98 * es, shadow: .3}); S(ctx, P + eyes[1], 78 + lx, -6 + ly, {s: .98 * es, shadow: .3});
  S(ctx, P + 'mouth_' + M(st.mouth), 0, 92, {s: .5, shadow: .3});
  S(ctx, P + 'kokoshnik', 0, -170, {s: .95, ax: .5, ay: .5, shadow: .5});
  ctx.restore();
  ctx.save(); ctx.translate(-158, 0); ctx.rotate(st.wing ?? .12);
  S(ctx, P + 'wing_l', 0, 0, {ax: .5, ay: .08});
  if (st.pencil) { ctx.save(); ctx.translate(-10, 230); ctx.rotate(-.8);
    MD.paper(ctx, MD.P('M-12,0 L12,0 L12,120 L0,150 L-12,120 Z'), '#F2B100', {shadow: .5});
    ctx.fillStyle = MD.PAL.ink; ctx.beginPath(); ctx.moveTo(-4, 140); ctx.lineTo(4, 140); ctx.lineTo(0, 150); ctx.fill(); ctx.restore(); }
  ctx.restore();
};

// Звенышко: кольцо, в просвете — лицо (диск, глаза, рот); ореол — по желанию; без лица — просто звено (st.face=false).
MD.pup.zven = (ctx, st = {}) => {
  const Z = 'zvenyshko/';
  ctx.save(); ctx.scale((st.s ?? 1) * (st.sx ?? 1), (st.s ?? 1) * (st.sy ?? 1)); ctx.rotate(st.r || 0);
  if (st.glow) S(ctx, Z + 'halo', 0, 0, {s: 1.6, op: 'lighter', alpha: st.glow * .85, shadow: 0});
  if (st.face !== false) S(ctx, Z + 'face', 0, 4, {s: .62, shadow: 0});
  S(ctx, Z + 'ring', 0, 0);
  if (st.face !== false) {
    const e = {open: ['eye_l', 'eye_r'], half: ['eye_half_l', 'eye_half_r'], happy: ['eye_happy_l', 'eye_happy_r'], side: ['eye_side_l', 'eye_side_r']}[st.eyes || 'open'];
    S(ctx, Z + e[0], -27, -26, {s: .42, shadow: .2}); S(ctx, Z + e[1], 27, -26, {s: .42, shadow: .2});
    S(ctx, Z + 'mouth_' + (st.mouth && st.mouth !== 'X' ? st.mouth : 'X'), 0, 48, {s: .48, shadow: .2});
  }
  ctx.restore();
};

// Кот Учёный: хвост, лапы, кафтан, рукава (правый — жест сказителя), голова с очками и ртом.
MD.pup.kot = (ctx, st = {}) => {
  const K = 'kot/', t = st.t || 0;
  S(ctx, K + 'tail', 150, 440, {ax: .15, ay: .95, rot: .25 + .12 * Math.sin(t * 1.7)});
  S(ctx, K + 'leg', -78, 455, {ay: 0, s: .8}); S(ctx, K + 'leg', 78, 455, {ay: 0, s: .8, flip: true});
  S(ctx, K + 'robe', 0, 250);
  S(ctx, K + 'sleeve_l', -168, 50, {ax: .5, ay: .05, rot: st.armL ?? .15});
  S(ctx, K + 'sleeve_r', 168, 50, {ax: .5, ay: .05, rot: st.armR ?? -.15});
  ctx.save(); ctx.translate(0, -68); ctx.rotate(st.tilt || 0);
  S(ctx, K + 'head', 0, 0);
  const eyes = {open: 'eyes', half: 'eyes_half', shut: 'eyes_shut', left: 'eyes_side_l', right: 'eyes_side_r'}[st.eyes || 'open'];
  S(ctx, K + eyes, (st.look?.[0] || 0) * 8, -22 + (st.look?.[1] || 0) * 5, {s: .82, shadow: .3});
  S(ctx, K + 'brow_l', -58, -78 - (st.brow || 0) * 12, {s: .8, shadow: .2}); S(ctx, K + 'brow_r', 58, -78 - (st.brow || 0) * 12, {s: .8, shadow: .2});
  S(ctx, K + 'mouth_' + M(st.mouth), 0, 66, {s: .78, shadow: .2});
  ctx.restore();
};

// Кощей, бюст (стиль «лак»): глаза светятся льдом, рот открывается по форме Rhubarb.
MD.pup.koscheiBust = (ctx, st = {}) => {
  S(ctx, 'koschei/bust_sad', 0, 0, {rim: 'rgba(232,184,74,.9)', rimBlur: 26});
  const open = st.open ?? 1, fl = st.flare || 0;
  for (const ex of [-19, 19]) {
    MD.radial(ctx, ex, -40, 26 + fl * 40, `rgba(159,246,255,${(.25 + fl * .55) * open})`);
    if (open > .05) { ctx.save(); ctx.shadowColor = MD.PAL.ice; ctx.shadowBlur = 10 + fl * 16; ctx.fillStyle = `rgba(225,255,255,${.6 + .4 * fl})`;
      ctx.beginPath(); ctx.ellipse(ex, -40, 5.5, 3.2 * open, 0, 0, 7); ctx.fill(); ctx.restore(); }
  }
  const o = OPEN[st.mouth || 'X'] || 0;
  if (o > 0) { ctx.save(); ctx.fillStyle = '#2A1020'; ctx.beginPath(); ctx.ellipse(0, 30, 9, 2 + o * 7, 0, 0, 7); ctx.fill(); ctx.restore(); }
};
// Рука Кощея: рукав с кистью, плечо — точка опоры, rot=π/2 — рука тянется влево.
MD.pup.koscheiArm = (ctx, st = {}) => {
  S(ctx, 'koschei/arm_l', 0, 0, {ax: .5, ay: .02, rot: st.rot ?? Math.PI / 2, s: st.s ?? 1, rim: 'rgba(232,184,74,.85)', rimBlur: 22});
};

// ---------- Лесной патруль и Колобок (серия 1) ----------
// Общее: st.mouth — форма Rhubarb, st.eyes — open/half/shut/side, st.tilt — наклон головы, st.armL/st.armR — плечо (рад, + — вперёд-вверх),
// st.elbowL/st.elbowR — локоть, st.legL/st.legR — бедро, st.lean — наклон корпуса, st.brow — подъём бровей 0…1, st.t — время (хвост, дыхание).
const EYES = (st, l = '_l', r = '_r') => { const e = {open: 'eye', half: 'eye_half', shut: 'eye_shut', happy: 'eye_shut', side: 'eye_side', wow: 'eye'}[st.eyes || 'open'] || 'eye'; return [e + l, e + r]; };
const has = k => !!MD.SPR[k];
// Рука из плеча и предплечья (или одной детали): pivot — точка шарнира в долях детали, elbow — где у плеча локоть (px детали).
const arm = (ctx, x, y, a1, a2, o) => {
  ctx.save(); ctx.translate(x, y); if (o.flip) ctx.scale(-1, 1); ctx.rotate(a1);
  S(ctx, o.up, 0, 0, {ax: o.upP[0], ay: o.upP[1], s: o.s});
  if (o.lo) { ctx.translate(o.elbow[0] * (o.s || 1), o.elbow[1] * (o.s || 1)); ctx.rotate(a2); S(ctx, o.lo, 0, 0, {ax: o.loP[0], ay: o.loP[1], s: o.s}); if (o.hold) o.hold(ctx); }
  else if (o.hold) o.hold(ctx);
  ctx.restore();
};
const face = (ctx, P, st, f) => {
  const [el, er] = EYES(st), es = (st.eyeScale ?? 1) * f.es, look = st.eyes === 'wow' ? 1.12 : 1;
  const ek = n => has(P + n) ? P + n : P + n.replace(/_(half|side|shut)/, '');
  const lx = (st.look?.[0] || 0) * 9, ly = (st.look?.[1] || 0) * 6;   // взгляд: глаз целиком чуть сдвигается в сторону взгляда
  S(ctx, ek(el), -f.ex + lx, f.ey + ly, {s: es * look, shadow: .3}); S(ctx, ek(er), f.ex + lx, f.ey + ly, {s: es * look, shadow: .3});
  if (f.brow && has(P + 'brow_l')) { const b = (st.brow || 0) * 14 + (st.eyes === 'wow' ? 10 : 0);
    S(ctx, P + 'brow_l', -f.ex, f.by - b, {s: f.bs, rot: -(st.browTilt || 0), shadow: .2}); S(ctx, P + 'brow_r', f.ex, f.by - b, {s: f.bs, rot: st.browTilt || 0, shadow: .2}); }
  const m = st.mouthKey || ('mouth_' + (st.mouth && st.mouth !== 'X' ? st.mouth : (has(P + 'mouth_X') ? 'X' : 'A')));
  S(ctx, P + (has(P + m) ? m : 'mouth_A'), f.mx, f.my, {s: f.ms, shadow: .25});
};

// Прошка: лисёнок-треугольник, хвост из трёх пучков, рогатка в правой лапе (st.sling).
MD.pup.proshka = (ctx, st = {}) => {
  const P = 'proshka/', t = st.t || 0;
  ctx.save(); ctx.rotate(st.lean || 0);
  S(ctx, P + 'tail', 40, 150, {ax: .06, ay: .32, s: .8, rot: -.35 + (st.tail ?? .1 * Math.sin(t * 2.2)) + MD.spring(t, st.tailKick ?? -9) * .3});
  // нога в листе — бедро и голень с зазором: голень подтянута к бедру (колено без просвета)
  const leg = (k, x, rot, knee) => { const im = MD.SPR[P + k], w = im.width, h = im.height, s = .78;
    ctx.save(); ctx.translate(x, 150); ctx.rotate(rot); S(ctx, P + k, 0, 0, {ax: .5, ay: .05 * h / 290, s, src: [0, 0, w, 290]});
    ctx.translate(0, (290 - 52) * s); ctx.rotate(knee || 0); S(ctx, P + k, 0, 0, {ax: .5, ay: 0, s, src: [0, 290, w, h - 290]}); ctx.restore(); };
  leg('leg_l', -40, st.legL || 0, st.kneeL); leg('leg_r', 40, -(st.legR || 0), st.kneeR);
  const A = {up: P + 'arm_up_l', lo: P + 'arm_lo_l', upP: [.8, .1], elbow: [-74, 118], loP: [.17, .08], s: .95};
  arm(ctx, 92, -128, .25 + (st.armR || 0), .5 + (st.elbowR || 0), {...A, flip: true, hold: st.sling ? c => S(c, P + 'slingshot', 40, 160, {s: .55, rot: -.4}) : null});
  S(ctx, P + 'body', 0, 0);
  ctx.save(); ctx.translate(0, -170); ctx.rotate(st.tilt || 0);
  S(ctx, P + 'head', 0, 0, {ax: .5, ay: .82});
  face(ctx, P, st, {ex: 58, ey: -95, es: .9, brow: 1, by: -150, bs: .9, mx: 0, my: -12, ms: .62});
  ctx.restore();
  arm(ctx, -92, -128, .25 + (st.armL || 0), .5 + (st.elbowL || 0), A);
  ctx.restore();
};

// Потап: медвежонок-круг в косоворотке, лапти; лапы целиком из плеча.
MD.pup.potap = (ctx, st = {}) => {
  const P = 'potap/', t = st.t || 0;
  ctx.save(); ctx.rotate(st.lean || 0);
  S(ctx, P + 'tail', 150, 120, {s: .8});
  S(ctx, P + 'leg_l', -110, 150, {ax: .55, ay: .08, rot: st.legL || 0}); S(ctx, P + 'leg_r', 110, 150, {ax: .45, ay: .08, rot: -(st.legR || 0)});
  S(ctx, P + 'arm_r', 215, -95, {ax: .45, ay: .12, rot: -(st.armR || 0) - .08});
  S(ctx, P + 'body', 0, 0, {s: .92});
  ctx.save(); ctx.translate(0, -175); ctx.rotate(st.tilt || 0);
  S(ctx, P + 'head', 0, 0, {ax: .5, ay: .85});
  face(ctx, P, st, {ex: 66, ey: -170, es: .9, brow: 1, by: -222, bs: .9, mx: 0, my: -82, ms: .95});
  ctx.restore();
  S(ctx, P + 'arm_l', -215, -95, {ax: .55, ay: .12, rot: (st.armL || 0) + .08});
  if (st.hold) { ctx.save(); ctx.translate(0, -40); st.hold(ctx); ctx.restore(); }
  ctx.restore();
};

// Йоша: ёжик — большая голова-шарик с иглами, маленькое тело, ковшик (st.ladle: угол наклона, null — без ковшика).
MD.pup.yosha = (ctx, st = {}) => {
  const P = 'yosha/', t = st.t || 0;
  ctx.save(); ctx.rotate(st.lean || 0);
  S(ctx, P + 'leg_l', -55, 120, {ax: .5, ay: .1, s: .8, rot: st.legL || 0}); S(ctx, P + 'leg_r', 55, 120, {ax: .5, ay: .1, s: .8, rot: -(st.legR || 0)});
  S(ctx, P + 'body', 0, 30, {s: .8});
  ctx.save(); ctx.translate(0, -60); ctx.rotate(st.tilt || 0);
  S(ctx, P + 'head', 0, 0, {ax: .5, ay: .9, s: .8});
  face(ctx, P, st, {ex: 66, ey: -150, es: .62, brow: 1, by: -205, bs: .8, mx: 0, my: -72, ms: .6});
  ctx.restore();
  S(ctx, P + 'arm_l', -95, -20, {ax: .8, ay: .12, s: .7, rot: (st.armL || 0)});
  ctx.save(); ctx.translate(95, -20); ctx.rotate(-(st.armR || 0));
  S(ctx, P + 'arm_r', 0, 0, {ax: .2, ay: .12, s: .7});
  if (st.ladle != null) S(ctx, P + 'ladle', 40, 130, {ax: .62, ay: .35, s: .55, rot: st.ladle});
  ctx.restore();
  ctx.restore();
};

// Тишка: бельчонок-малыш в колпаке, обнимает подушку (st.pillow), огромный хвост.
MD.pup.tishka = (ctx, st = {}) => {
  const P = 'tishka/', t = st.t || 0;
  ctx.save(); ctx.rotate(st.lean || 0);
  S(ctx, P + 'tail', 120, 60, {ax: .2, ay: .9, s: .8, rot: .1 + .05 * Math.sin(t * 1.4)});
  S(ctx, P + 'leg_l', -60, 120, {ax: .6, ay: .2, s: .65, rot: st.legL || 0}); S(ctx, P + 'leg_r', 60, 120, {ax: .4, ay: .2, s: .65, rot: -(st.legR || 0), flip: true});
  S(ctx, P + 'body', 0, 20, {s: .75});
  ctx.save(); ctx.translate(0, -70); ctx.rotate(st.tilt || 0);
  S(ctx, P + 'head', 0, 0, {ax: .5, ay: .88, s: .75});
  face(ctx, P, st, {ex: 52, ey: -120, es: .5, mx: 0, my: -55, ms: .5});
  S(ctx, P + 'cap', 30, -270, {ax: .3, ay: .6, s: .62, rot: .25 + .08 * Math.sin(t * 1.1) + (st.capKick ? MD.spring(t, st.capKick) * .3 : 0)});
  ctx.restore();
  if (st.pillow) S(ctx, P + 'pillow', 0, 40, {s: .55, rot: -.08});
  S(ctx, P + 'arm_r', 70, -20, {ax: .3, ay: .15, s: .6, rot: -(st.armR || 0), flip: true});
  S(ctx, P + 'arm_r', -70, -20, {ax: .3, ay: .15, s: .6, rot: st.armL || 0});
  ctx.restore();
};

// Колобок: шарик с лицом, катится (st.roll — угол качения тела, лицо не катится), мука облачком (st.flour 0…1).
MD.pup.kolobok = (ctx, st = {}) => {
  const P = 'kolobok/';
  S(ctx, P + 'body', 0, 0, {rot: st.roll || 0});
  S(ctx, P + 'cheek_l', -150, 50, {s: .45, alpha: .75, shadow: 0}); S(ctx, P + 'cheek_r', 150, 50, {s: .45, alpha: .75, shadow: 0});
  face(ctx, P, st, {ex: 80, ey: -30, es: .9, brow: 1, by: -105, bs: 1, mx: 0, my: 80, ms: .9});
  if (st.flour) S(ctx, P + 'flour', -260, 200, {s: .9 * st.flour, alpha: st.flour, shadow: .3});
};
})();
