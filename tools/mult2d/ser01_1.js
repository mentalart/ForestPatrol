// Серия 1, пролог и сцена 1 «Сказка у дуба» (сценарий 49_ser01_zvenyshko.md): крючок-погоня, Кот и слушатели, Кощей за морем,
// колыбельная и туча, Колобок-кегли, перетягивание цепи, разрыв, пять сторон, Кот каменеет, титр.
'use strict';
(() => {
const B0 = MD.ser01.all.length;   // первый план файла — для звуковых меток
const {seg, ease, lerp, clamp, twos, PAL} = MD, SP = MD.spr, K = MD.K, S = MD.ser01;
const {shot, D, play, A, grain, flash, spark, zvenFace, lightning, kid, luko, LUKO, KOT, rock, bust, forestNight, hohloma, word} = S;

// =================== П-1. Крючок: искра летит на нас сквозь ночной лес, за ней вороны — стоп-кадр, Кот листает назад ===================
const HIT = 3.5;
const hook = (ctx, t, lt) => {
  const u = Math.min(lt, HIT), k = seg(u, 0, HIT);
  const cam = MD.cam(u, [[0, {x: 540, y: 1100, z: 1}], [HIT, {x: 560, y: 900, z: 1.7}, 'in']]);
  forestNight(ctx, t, cam, k);
  // вороны позади искры
  const cx = lerp(520, 560, k), cy = lerp(700, 840, k), ss = lerp(.04, .5, ease.in(k));
  MD.crows(ctx, t, cx + 40, cy - 60, 7, ss * 1.2, 300 * ss / .3, 4);
  // ветки переднего плана проносятся мимо камеры
  for (let i = 0; i < 6; i++) { const ph = ((u * .9 + i / 6) % 1), sc = .3 + ph * ph * 5, a = i * 1.05;
    ctx.save(); ctx.translate(540 + Math.cos(a) * 900 * ph * ph, 900 + Math.sin(a) * 1100 * ph * ph); ctx.rotate(a); ctx.scale(sc, sc); ctx.globalAlpha = clamp(ph * 3) * (1 - clamp((ph - .9) * 10));
    MD.paper(ctx, MD.P('M0,0 C60,-30 140,-20 220,-60 L230,-40 C150,0 70,-6 0,24Z'), '#151A33', {shadow: .4}); MD.paper(ctx, MD.P('M120,-30 L170,-90 L180,-70Z'), '#151A33', {shadow: .2}); ctx.restore(); }
  const zx = 540 + Math.sin(u * 5) * 120 * (1 - k), zy = lerp(760, 900, k), zs = lerp(.03, 1.2, ease.in(k));
  spark(ctx, zx, zy, zs, u * 7, d => { const kk = seg(u - d * 3, 0, HIT); return [540 + Math.sin((u - d * 3) * 5) * 120 * (1 - kk), lerp(760, 900, kk)]; });
};
shot(7, (ctx, t, lt) => {
  hook(ctx, t, lt);
  if (lt >= HIT) {   // стоп-кадр: бумага желтеет, Кот входит в кадр снизу и машет «стоп»
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'color'; ctx.fillStyle = `rgba(150,120,80,${.75 * seg(lt, HIT, HIT + .3)})`; ctx.fillRect(0, 0, MD.W, MD.H); ctx.restore();
    grain(ctx, .5);
    const ky = K(lt, [[HIT + .2, 2500], [HIT + .7, 1950, 'back'], [6.6, 1950], [7.2, 2600]]);
    const wave = Math.sin(twos(lt) * 12) * .5;
    const stopPose = lt < HIT + 1.7;   // «Стоп-стоп-стоп!» — поза-замещение, дальше говорит кукла
    A(ctx, 'kot', {x: 700, y: ky, s: 1.15, shadow: false}, stopPose ? {t, pose: 'stop', sy: 1 + Math.abs(Math.sin(twos(lt) * 14)) * .03} : play('kot', t, {armR: 1.9 + wave, armL: -1.2 - wave, brow: 1, look: [-1, 0]}));
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(250, 330); ctx.rotate(-.12); const sk = ease.back(seg(lt, HIT + .1, HIT + .4));
    ctx.scale(sk, sk); ctx.fillStyle = '#E23B2E'; ctx.font = `110px ${MD.FONT.display}`; ctx.textAlign = 'center'; ctx.fillText('СТОП!', 6, 6); ctx.fillStyle = '#FFF1D6'; ctx.fillText('СТОП!', 0, 0); ctx.restore();
  }
  flash(ctx, lt, HIT, .3);
}, [['ser01_040', HIT + .5]]);

// =================== 1-1. Сказка у дуба: Кот сказывает, тень на дубе повторяет, слушатели хохочут ===================
const kidsAt = [['bunny', 520, .9, 1480], ['squirrel', 830, .85, 1470], ['hedgehog', 950, .85, 1510]];
const KOLO = {x: 660, y: 1520, s: .3};
const kids = (c, t, st) => kidsAt.forEach(([k, x, s, y], i) => kid(c, k, x, y, s, {t, ...(typeof st === 'function' ? st(i) : st)}));
const kotGest = (lt, a) => K(lt - a, [[0, {armR: -.1, armL: .1}], [.3, {armR: 1.5, armL: .2}, 'back'], [1.4, {armR: 1.6, armL: .3}], [1.7, {armR: -.4, armL: -.4}, 'in'],
  [1.9, {armR: -.2, armL: -.2}, 'back'], [3.2, {armR: -.2, armL: -.2}], [3.6, {armR: 1.0, armL: -1.0}, 'back'], [4.6, {armR: .9, armL: -.9}]]);
shot(7, (ctx, t, lt, L) => {
  const at = .6, laugh = lt > at + D('ser01_001') - .2;
  const cam = MD.cam(lt, [[0, {x: 540, y: 900, z: 1}], [2.5, {x: 560, y: 1150, z: 1.35}], [L, {x: 570, y: 1180, z: 1.45}]], [[at + 1.95, .5]]);
  const g = kotGest(lt, at), bac = lt > at + 1.7 && lt < at + 2.2 ? MD.spring(lt, at + 1.75, 4, 6) : 0;
  const kst = play('kot', t, {...g, look: [-.6, 0], sy: 1 - bac * .08, gest: false});
  luko(ctx, t, cam, {
    back: c => { c.save(); c.globalAlpha = .3; c.filter = 'brightness(0)'; MD.actor(c, 'kot', {x: 230, y: 1150, s: .85, shadow: false, flip: true}, lt > at + .05 && lt < at + 1.3 ? {t, pose: 'villain'} : {...kst, t}); c.restore(); },   // тень на дубе
    fg: c => {
      kids(c, t, () => ({laugh, look: 1}));
      const roll = laugh ? Math.sin((lt - at - D('ser01_001')) * 9) * .5 : 0;
      A(c, 'kolobok', {x: KOLO.x + roll * 30, y: KOLO.y, s: KOLO.s, rot: roll}, {t, roll, mouth: laugh ? 'D' : 'X', eyes: laugh ? 'shut' : 'open', brow: laugh ? 1 : 0, look: [1, 0]});
    },
    mid: c => {
      const imit = lt > at + .05 && lt < at + 1.3;   // изображает Кощея: «когти» и страшная рожица
      A(c, 'kot', {x: KOT.x, y: KOT.y, s: KOT.s, flip: imit}, imit ? {t, pose: 'villain', sy: 1 + MD.spring(lt, at + .05, 3, 6) * .06} : kst);
      if (bac > .3) MD.burst(c, lt, at + 1.75, KOT.x - 120, KOT.y - 280, '#FFF1D6', 10, 140, .35);
    }});
  grain(ctx, .12);
}, [['ser01_001', .6]], {dur: .6, type: 'page'});

// =================== 1-2. За морем: Кощей спиной на скале — оборачивается; крупно: «Как водится… проиграл.» — ледяная слеза ===================
shot(2.2, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 600, y: 1150, z: 1}], [L, {x: 625, y: 560, z: 3.6}, 'inOut']]);
  rock(ctx, t, cam, {back: lt < 1.5, eyes: lt > 1.6 ? .9 : 0});
  MD.set.border(ctx);
}, [], {dur: .6, type: 'lacquer', x: 640, y: 520});
shot(1, (ctx, t, lt, L) => {
  const cam = {x: 540, y: 880, z: K(lt, [[0, 1.05], [L, 1.2]])};
  MD.layer(ctx, t, cam, .3, c => { MD.set.lacquer(c, t); MD.set.frost(c, t, 5, 40, [0, 0, 1080, 1920]); });
  MD.layer(ctx, t, cam, 1, c => {
    bust(c, t, {open: ease.out(seg(lt, .1, .5)), rot: K(lt, [[0, .08], [.8, 0]])});
    const tear = .4 + D('ser01_002'), u = seg(lt, tear, tear + .7);   // слеза: из глаза вниз, звякает о камень
    if (u > 0 && u < 1) { const y = lerp(810, 1600, ease.in(u)); MD.radial(c, 520, y, 30, 'rgba(159,246,255,.9)'); c.fillStyle = '#E8FFFF'; c.beginPath(); c.ellipse(520, y, 7, 11, 0, 0, 7); c.fill(); }
    MD.burst(c, lt, tear + .7, 520, 1600, '#C8F8FF', 10, 120, .4);
  });
  MD.radial(ctx, 260, 900, 700, 'rgba(14,10,16,.6)', 'rgba(14,10,16,0)', 'source-over');
  MD.set.border(ctx);
}, [['ser01_002', .4]]);

// =================== 1-3. Колыбельная: зверята засыпают по одному, ноты золотыми нитями летят над морем к скале ===================
shot(1, (ctx, t, lt, L) => {
  const a2 = .3 + D('ser01_003') + .35, s0 = a2 + .6;
  const cam = MD.cam(lt, [[0, {x: 520, y: 1150, z: 1.6}], [s0, {x: 540, y: 1160, z: 1.5}], [L, {x: 1000, y: 950, z: 1.25}, 'inOut']]);
  const sleep = i => clamp((lt - s0 - .6 - i * .6) / .5);
  luko(ctx, t, cam, {
    fg: c => {
      kids(c, t, i => ({sleep: sleep(i), fall: i === 0 ? ease.inOut(seg(lt, s0 + 2.4, s0 + 2.9)) * .55 : 0}));
      const ks = sleep(3);
      A(c, 'kolobok', {x: KOLO.x, y: KOLO.y, s: KOLO.s, rot: ks * .3}, {t, eyes: ks > .5 ? 'shut' : 'half', mouth: 'X'});
    },
    mid: c => {
      A(c, 'kot', {x: KOT.x, y: KOT.y, s: KOT.s}, lt > a2 + .1 ? {t, pose: 'sing', rotP: .04 * Math.sin(lt * 1.6), sy: MD.breath(lt, .02, .5)} : play('kot', t, {eyes: lt > a2 ? 'half' : 'open', armL: lt > a2 ? .6 + .25 * Math.sin(lt * 2.2) : .1, armR: lt > a2 ? .5 + .2 * Math.sin(lt * 2.2 + 1) : 0, tilt: lt > a2 ? .08 * Math.sin(lt * 1.6) : 0, gest: false}));
    },
    front: c => {   // ноты золотыми нитями: из лап Кота к морю
      for (let i = 0; i < 12; i++) { const u = seg(lt, a2 + i * .3, a2 + i * .3 + 2.6); if (u <= 0 || u >= 1) continue;
        const x = lerp(KOT.x + 80, 1700, u), y = 1050 - u * 300 + Math.sin(u * 8 + i) * 50;
        c.save(); c.globalAlpha = Math.sin(u * Math.PI); c.fillStyle = '#F7D36A'; c.shadowColor = '#F0C04A'; c.shadowBlur = 24; c.font = `${70 + (i % 3) * 16}px serif`; c.fillText(i % 2 ? '♪' : '♫', x, y); c.restore();
        MD.radial(c, x, y - 20, 50, `rgba(255,214,110,${.25 * Math.sin(u * Math.PI)})`); }
    }});
}, [['ser01_003', .3], ['ser01_004', .3 + D('ser01_003') + .35]]);

// =================== 1-4. Ноты замерзают у скалы и рассыпаются; кулак; «Довольно.»; туча ползёт по морю ===================
shot(2.1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 600, y: 760, z: 2.1}], [L, {x: 620, y: 620, z: 2.9}]]);
  rock(ctx, t, cam, {eyes: seg(lt, 1.2, 1.5), frost: seg(lt, .3, 1.8), over: c => {
    for (let i = 0; i < 6; i++) { const u = seg(lt, i * .12, .9 + i * .12), x = lerp(-100, 560 + i * 18, u), y = 560 + Math.sin(i * 2) * 60;
      if (u < 1) { c.save(); c.globalAlpha = 1; c.fillStyle = u > .7 ? '#CFF8FF' : '#F7D36A'; c.shadowColor = u > .7 ? '#9FF6FF' : '#F0C04A'; c.shadowBlur = 16; c.font = '46px serif'; c.fillText('♪', x, y); c.restore(); }
      else MD.burst(c, lt, .9 + i * .12, 560 + i * 18, 545 + Math.sin(i * 2) * 60, '#CFF8FF', 7, 60, .4); } }});
  MD.set.border(ctx);
}, [], {dur: .4, type: 'cut'});
shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 960, z: 1}], [L, {x: 540, y: 1000, z: 1.1}]], [[.55, .8]]);
  MD.layer(ctx, t, cam, .2, c => { MD.set.lacquer(c, t, 44); SP(c, 'bg/tucha', 540, K(lt, [[0, 1900], [L, 900, 'out']]), {w: 1700, rim: 'rgba(167,123,216,.8)', rimBlur: 30}); if (lt > 1.1) lightning(c, t, 300 + (Math.floor(t * 4) % 3) * 220, 700, 2); });
  MD.layer(ctx, t, cam, 1, c => {
    const clench = lt > .5, k = ease.back(seg(lt, .5, .7));
    MD.radial(c, 540, 1180, 420, `rgba(150,70,200,${.45 + .3 * k})`);
    SP(c, clench ? 'koschei/ruka_fist' : 'koschei/ruka_reach', 640, 1200, {w: clench ? 1000 * (1 - .04 * k) : 1150, rot: -.35 - .1 * k, rim: 'rgba(232,184,74,.8)', rimBlur: 22});
    if (clench) MD.burst(c, lt, .55, 820, 1150, '#CFF8FF', 14, 260, .45);
  });
  S.lacSea(ctx, t, 1740); MD.set.border(ctx);
}, [['ser01_005', .7]]);
shot(2.3, (ctx, t, lt, L) => {   // с берега: туча ползёт по морю к нам, по воде — ледяная дорожка
  const k = seg(lt, 0, L);
  const cam = MD.cam(lt, [[0, {x: 640, y: 1050, z: 1.1}], [L, {x: 600, y: 1150, z: 1.25}]]);
  luko(ctx, t, cam, {cloud: [lerp(1250, 800, k), lerp(700, 560, k), lerp(700, 1400, k)], ice: ease.out(k), fire: 1 - k * .3,
    fg: c => { kids(c, t, i => ({sleep: 1, fall: i === 0 ? .55 : 0})); A(c, 'kolobok', {x: KOLO.x, y: KOLO.y, s: KOLO.s, rot: .3}, {t, eyes: 'shut', mouth: 'X'}); },
    mid: c => {
      A(c, 'kot', {x: KOT.x, y: KOT.y, s: KOT.s}, play('kot', t, {eyes: lt > 1.2 ? 'open' : 'half', look: [1, -.5], brow: seg(lt, 1.2, 1.5), armL: .4, armR: .3})); }});
  MD.grade(ctx, 'rgba(120,80,170,1)', .25 * k);
}, [], {dur: .4, type: 'cut'});

// =================== 1-5. Иней хватает траву, костёр сжимается; Колобок вскакивает и катится, сбивая спящих, как кегли ===================
shot(1, (ctx, t, lt, L) => {
  const go = .5, x0 = KOLO.x - 40, x1 = 1800, x = K(lt, [[0, KOLO.x], [go, KOLO.x], [go + .25, x0, 'in'], [L, x1, 'lin']]);
  const hitT = i => kidsAt[i][1] > KOLO.x ? go + .25 + (kidsAt[i][1] - x0) / (x1 - x0) * (L - go - .25) : 99;
  const cam = MD.cam(lt, [[0, {x: 640, y: 1350, z: 1.55}], [go + .3, {x: 620, y: 1350, z: 1.5}], [L, {x: 1150, y: 1330, z: 1.35}]], [[hitT(1), .6], [hitT(2), .6]]);
  luko(ctx, t, cam, {frost: ease.out(seg(lt, 0, L)), fire: 1 - .6 * seg(lt, 0, L), cloud: [800, 650, 1600],
    fg: c => {
      kidsAt.forEach(([kd, kx, s, ky], i) => { const h = hitT(i), f = seg(lt, h, h + .5);
        kid(c, kd, kx + f * 220, ky - Math.sin(f * Math.PI) * 260, s, {t, sleep: f > 0 ? 0 : 1, fall: (i === 0 ? .55 : 0) + f * 6 * (i % 2 ? 1 : -1), look: 1}); });
      const j = MD.jump(lt, .05, .35, 120), roll = lt > go ? (x - KOLO.x) / 60 : 0;
      A(c, 'kolobok', {x, y: KOLO.y + (j.y || 0), s: KOLO.s * 1.5, rot: 0}, play('kolobok', t, {roll, eyes: lt < go + .2 ? 'wow' : 'open', brow: 1, sx: j.sx, sy: j.sy, look: [1, 0],
        flour: lt > go && (lt % .5) < .3 ? 1 - (lt % .5) / .3 : 0}));
      if (lt > go) MD.dust(c, lt, go + .25, KOLO.x, 1550, 10);
    }});
  MD.grade(ctx, 'rgba(110,80,170,1)', .3);
}, [['ser01_006', .45]], {dur: .4, type: 'cut'});

// =================== 1-6. Кот встаёт, шерсть дыбом, прямо в тучу и на нас: «Кто там?! Тебя сюда не звали!» ===================
shot(1, (ctx, t, lt) => {
  const st = MD.startle(lt, .05);
  const cam = MD.cam(lt, [[0, {x: KOT.x + 20, y: 1060, z: 2.1}], [.4, {x: KOT.x + 20, y: 1010, z: 2.35}, 'out']], [[.1, 1]]);
  luko(ctx, t, cam, {fire: .4, frost: 1, cloud: [800, 650, 1600],
    mid: c => A(c, 'kot', {x: KOT.x, y: KOT.y + (st.y || 0), s: KOT.s}, play('kot', t, {sx: st.sx, sy: st.sy, brow: 1, eyes: 'open', armR: K(lt, [[0, 0], [.4, 1.8, 'back'], [1.5, 1.7], [1.9, 2.2]]), armL: K(lt, [[0, 0], [.4, -.6]]), look: [0, -.3], gest: false}))});
  MD.grade(ctx, 'rgba(120,70,180,1)', .28);
}, [['ser01_007', .3]]);

// =================== 1-7. Перетягивание цепи: рука из тучи тянет, Кот упирается — «Не отдам!» ===================
const TUG = 4.4;
const chainPts = (lt, hx, hy, kx, ky, ox, oy, tense) => {   // цепь: от дуба через лапы Кота к руке
  const pts = []; const seg1 = 9, seg2 = 12;
  for (let i = 0; i <= seg1; i++) { const u = i / seg1; pts.push([lerp(ox, kx, u), lerp(oy, ky, u) + Math.sin(u * Math.PI) * 60 * (1 - tense)]); }
  for (let i = 1; i <= seg2; i++) { const u = i / seg2; pts.push([lerp(kx, hx, u), lerp(ky, hy, u) + Math.sin(u * Math.PI) * 50 * (1 - tense) + Math.sin(lt * 60 + i) * 6 * tense]); }
  return pts;
};
shot(TUG, (ctx, t, lt, L) => {
  const tense = seg(lt, .6, 3.6), slide = ease.in(seg(lt, .9, 3.9));
  const cam = MD.cam(lt, [[0, {x: 640, y: 1050, z: 1.05}], [L, {x: 700, y: 1020, z: 1.25}]]); cam.shake = tense * 6;
  const hx = K(lt, [[0, 1500], [.6, 1080, 'back'], [L, 1150]]), hy = K(lt, [[0, 300], [.6, 760, 'back'], [L, 700]]);
  const kx = KOT.x + 60 + slide * 140, ky = KOT.y;
  luko(ctx, t, cam, {fire: .35, frost: 1, cloud: [1000, 520, 1700],
    mid: c => {
      const ks = KOT.s * 1.05 * 960 / 327, px = kx + 175 * ks, py = ky - 140 * ks;   // лапы с цепью в позе «тянет»
      const pts = chainPts(lt, hx - 150, hy + 40, px, py, LUKO.oak[0], LUKO.oak[1], tense);
      pts.forEach(([x, y], i) => { if (i % 1 === 0) MD.cast.link(c, {x, y, rot: i % 2 ? Math.PI / 2 : 0, front: true}, {hot: tense * .9, glow: tense * .6, lac: tense > .5 ? 1 : 0}); });
      A(c, 'kot', {x: kx, y: ky, s: KOT.s * 1.05, rot: -tense * .06}, {t, pose: 'pull', sx: 1 + Math.sin(lt * 40) * .01 * tense, sy: 1 - tense * .05});
      if (lt > .9) MD.dust(c, lt, .9 + Math.floor((lt - .9) / .5) * .5, kx + 40, ky - 4, 6);
      MD.radial(c, hx - 150, hy + 40, 280, `rgba(150,70,200,${.5 + .2 * Math.sin(t * 9)})`);
      SP(c, 'koschei/ruka_fist', hx, hy, {w: 900, rot: Math.PI - .55 + Math.sin(lt * 30) * .02 * tense, rim: 'rgba(232,184,74,.8)', rimBlur: 22});
      if (lt > .8 && lt < TUG) lightning(c, t, hx - 300, hy - 200, 1, 5);
    }});
  MD.grade(ctx, 'rgba(110,70,170,1)', .3);
}, [['ser01_041', 1.4]]);

// =================== 1-8. Разрыв: вспышка, кометы звеньев; одно звено в кулаке — кусает палец и вырывается; вороны в погоню ===================
const BR = .15;
const flyers = (() => { const R = MD.rng(77); return Array.from({length: 22}, (_, i) => ({a: -Math.PI / 2 + (R() - .5) * 2.6, sp: 900 + R() * 1200, spin: (R() - .5) * 16, comet: i < 5})); })();
shot(1, (ctx, t, lt, L) => {
  const after = lt - BR;
  const cam = MD.cam(lt, [[0, {x: 700, y: 1020, z: 1.25}], [1.2, {x: 640, y: 900, z: .95}, 'out'], [L, {x: 620, y: 860, z: .92}]], [[BR, 2]]);
  luko(ctx, t, cam, {fire: .3, frost: 1, cloud: [1000, 520, 1700],
    mid: c => {
      const sit = ease.out(seg(lt, BR, BR + .4));   // Кот летит на спину
      A(c, 'kot', {x: KOT.x + 200 - sit * 120, y: KOT.y - Math.sin(sit * Math.PI) * 120, s: KOT.s * 1.05, rot: (1 - sit) * -.6}, lt < BR ? {t, pose: 'pull'} : {t, pose: 'fallen', sy: 1 - MD.spring(lt, BR + .4, 3, 6) * .1});
      for (const f of flyers) { if (after < 0) break; const d = 1 - Math.exp(-after * 1.4), x = 900 + Math.cos(f.a) * f.sp * d / 1.4, y = 880 + Math.sin(f.a) * f.sp * d / 1.4 + 200 * after * after;
        const fade = f.comet ? 1 : 1 - seg(after, .8, 1.6); if (fade <= 0) continue;
        if (f.comet) S.spark(c, x, y, .12, after * f.spin, dd => { const d2 = 1 - Math.exp(-Math.max(0, after - dd * 3) * 1.4); return [900 + Math.cos(f.a) * f.sp * d2 / 1.4, 880 + Math.sin(f.a) * f.sp * d2 / 1.4 + 200 * (after - dd * 3) ** 2]; });
        else { c.save(); c.globalAlpha = fade; MD.cast.link(c, {x, y, rot: 0, front: true}, {lac: 1, spin: f.spin * after, glow: .7, hot: Math.max(0, .9 - after)}); c.restore(); } }
      if (after > 0) { const r = 1600 * ease.out(seg(after, 0, .9)), a = 1 - seg(after, 0, .9); MD.glow(c, MD.circle(900, 880, r), `rgba(255,220,130,${a})`, 20 * a + 2, 40); }
    }});
  flash(ctx, lt, BR, .45);
}, [['ser01_008', 1.0]], {dur: .3, type: 'cut'});
shot(3.2, (ctx, t, lt, L) => {   // крупно: звено в кулаке
  const bite = 1.3, free = 1.55;
  const cam = MD.cam(lt, [[0, {x: 540, y: 900, z: 1.25}], [free, {x: 540, y: 880, z: 1.35}], [L, {x: 600, y: 860, z: 1.1}]], [[bite, 1.2]]);
  MD.layer(ctx, t, cam, .2, c => { MD.set.lacquer(c, t, 46); SP(c, 'bg/tucha', 560, 600, {w: 1800, alpha: .8, rim: 'rgba(167,123,216,.7)', rimBlur: 30}); });
  MD.layer(ctx, t, cam, 1, c => {
    const open = lt > free, wr = Math.sin(lt * 26) * .2 * (lt < free ? 1 : 0);
    MD.radial(c, 560, 1000, 380, 'rgba(150,70,200,.55)');
    const zx = open ? K(lt, [[free, 540], [L, 1500, 'in']]) : 560 + Math.sin(lt * 31) * 10, zy = open ? K(lt, [[free, 920], [L, 150, 'in']]) : 930;
    if (!open) zvenFace(c, zx, zy, .55, {r: wr, eyes: lt > bite - .2 ? 'side' : 'open', mouth: lt > bite - .15 ? 'D' : 'E', sx: lt > bite - .1 && lt < bite + .1 ? 1.25 : 1, sy: lt > bite - .1 && lt < bite + .1 ? .8 : 1});
    SP(c, open ? 'koschei/ruka_reach' : 'koschei/ruka_fist', open ? 980 : 880, open ? 1000 : 960, {w: open ? 1200 : 900, rot: Math.PI - .3 + (lt > bite && lt < free ? MD.spring(lt, bite, 5, 5) * .15 : 0), rim: 'rgba(232,184,74,.8)', rimBlur: 22});
    if (open) { zvenFace(c, zx, zy, .5, {r: (lt - free) * 4, eyes: 'happy', mouth: 'D'}); S.spark(c, zx, zy, .01, 0, d => [K(lt - d * 2, [[free, 540], [L, 1500, 'in']]), K(lt - d * 2, [[free, 920], [L, 150, 'in']])]); }
    MD.burst(c, lt, bite, 600, 900, '#FFE6A0', 16, 260, .4);
    const ck = seg(lt, free + .3, L);   // вороны срываются из тучи вслед
    if (ck > 0) MD.crows(c, t, lerp(-200, 1300, ease.in(ck)), lerp(700, 300, ck), 7, .55, 200, 9);
  });
  MD.set.border(ctx);
});

// =================== 1-9. Пять сторон: звено падает в мир и будит злодея (жёсткие склейки) ===================
const WORLDS = [['mir_les', 'leshiy/rise', 'ser01_009', 560, 'rise'], ['mir_kitezh', 'vodyanoy/som', 'ser01_010', 640, 'float'], ['mir_nebo', 'solovey/whistle', 'ser01_011', 520, 'catch'],
  ['mir_smorodina', 'gorynych/front', 'ser01_012', 620, 'wobble'], ['mir_buyan', 'likho/sheep', 'ser01_013', 580, 'hide']];
WORLDS.forEach(([bg, hero, id, w, how], i) => shot(1.55, (ctx, t, lt, L) => {
  const land = .55;
  const cam = MD.cam(lt, [[0, {x: 540, y: 820, z: 1.15}], [land, {x: 540, y: 900, z: 1.1}], [L, {x: 540, y: 960, z: 1.18}]], [[land, .7]]);
  MD.layer(ctx, t, cam, .3, c => { const im = MD.SPR['bg/' + bg]; SP(c, 'bg/' + bg, 540, 960, {s: Math.max(1180 / im.width, 2100 / im.height), shadow: 0}); });
  MD.layer(ctx, t, cam, 1, c => {
    const hx = 540 + (i % 2 ? 60 : -40), hy = 1300, r = seg(lt, land, land + .4);
    let y = hy, sx = 1, sy = 1, rot = 0, alpha = 1;
    if (how === 'rise') { y = hy + (1 - ease.back(r)) * 500; sy = 1 + MD.spring(lt, land + .4, 3, 6) * .1; }
    if (how === 'float') { y = hy + (1 - ease.out(r)) * 300 + Math.sin(lt * 3) * 12; }
    if (how === 'catch') { sy = 1 - MD.spring(lt, land, 4, 6) * .12; sx = 2 - sy; }
    if (how === 'wobble') { rot = MD.spring(lt, land, 3, 3) * .12; }
    if (how === 'hide') { sy = 1 + MD.spring(lt, land, 3, 5) * .1; }
    c.save(); c.translate(hx, y); c.rotate(rot); c.scale(sx, sy); SP(c, hero, 0, 0, {w, ay: 1}); c.restore();
    if (how === 'float' && r > 0) for (let k = 0; k < 3; k++) MD.glow(c, MD.ellipse(hx, hy - 30, 120 + ((lt * 200 + k * 80) % 260), 22 + ((lt * 30 + k * 12) % 40)), 'rgba(200,240,255,.6)', 3, 6, 1 - ((lt * 200 + k * 80) % 260) / 260);
    const k = ease.in(seg(lt, 0, land)), sxp = 540 + Math.sin(i * 2.3) * 260 * (1 - k), syp = lerp(-120, hy - 300, k);
    if (lt < land) S.spark(c, sxp, syp, .14, lt * 8, d => { const kk = ease.in(seg(lt - d * 2, 0, land)); return [540 + Math.sin(i * 2.3) * 260 * (1 - kk), lerp(-120, hy - 300, kk)]; });
    else if (how !== 'catch' && how !== 'hide') S.spark(c, hx + 40 + Math.sin(lt * 9) * 6, hy - 300 + Math.sin(lt * 5) * 10, .1, lt * 3, null, .8);
    MD.burst(c, lt, land, sxp, hy - 300, '#FFE6A0', 14, 240, .4);
  });
  grain(ctx, .2);
}, [[id, .2]], i ? {dur: .2, type: 'cut'} : {dur: .5, type: 'page'}));

// =================== 1-10. Облетевший дуб: Кот тянется к последней искре — и каменеет снизу вверх; буквы пеплом ===================
shot(1, (ctx, t, lt, L) => {
  const st = seg(lt, .6, L - .5);   // окаменение: доля роста снизу вверх
  const cam = MD.cam(lt, [[0, {x: 560, y: 1150, z: 1.6}], [L, {x: 540, y: 1050, z: 1.05}]]);
  MD.layer(ctx, t, cam, .05, c => { MD.set.sky(c, t, '#1E2036', '#4A4E6A', 13); S.spark(c, 760, 220, .07, t * 3, null, .9); });
  MD.layer(ctx, t, cam, 1, c => {
    SP(c, 'bg/oak_bare', 540, 1760, {w: 1200, ay: 1});
    const kx = 600, ky = 1640, s = .72, top = ky - 1150 * s, cut = lerp(ky + 20, top - 40, ease.inOut(st));
    const kst = {t, pose: 'reach', sy: 1 + (1 - st) * .02 * Math.sin(lt * 3)};
    c.save(); c.beginPath(); c.rect(-500, -500, 2200, cut + 500); c.clip(); A(c, 'kot', {x: kx, y: ky, s}, kst); c.restore();   // ещё живой — выше линии
    c.save(); c.beginPath(); c.rect(-500, cut, 2200, 2000); c.clip(); c.filter = 'grayscale(1) brightness(.75) contrast(1.2)'; A(c, 'kot', {x: kx, y: ky, s}, {...kst, t: 1}); c.restore();
    MD.frostGrow(c, 1, 3, kx, cut + 10, -Math.PI / 2, 60, 8);
    const R = MD.rng(61); c.save(); c.font = `46px ${MD.FONT.body}`; c.textAlign = 'center';
    for (let i = 0; i < 30; i++) { const s0 = .5 + R() * 3, u = seg(lt, s0, s0 + 2.6); if (u <= 0 || u >= 1) continue;
      c.globalAlpha = Math.sin(u * Math.PI) * .85; c.fillStyle = u < .5 ? '#3A2A20' : '#8A8A90';
      c.fillText('СКАЗКАЦЕПЬКОТДУБЛУКОМОРЬЕ'[i % 25], kx - 260 + R() * 520 + Math.sin(u * 6 + i) * 50, ky - 500 - u * 800); }
    c.restore();
  });
  MD.grade(ctx, `rgba(90,90,110,1)`, .25 * st, 'color');
  grain(ctx, .2);
}, [['ser01_014', .5]], {dur: .5, type: 'page'});

// =================== 1-11. Титр: золотая нить проносится сквозь кадр и завязывается в «ЗЛАТАЯ ЦЕПЬ» ===================
shot(4.2, (ctx, t, lt) => {
  hohloma(ctx, lt);
  const th = new Path2D(); th.moveTo(-50, 1500); th.bezierCurveTo(300, 1200, 900, 1400, 980, 1000); th.bezierCurveTo(1040, 700, 200, 760, 120, 1000); th.bezierCurveTo(60, 1180, 600, 1250, 1130, 1196);
  MD.drawOn(ctx, th, '#F0C04A', 9, ease.out(seg(lt, 0, .9)), 3500, 18);
  word(ctx, lt, 'ЗЛАТАЯ', 860, 196, .5); word(ctx, lt, 'ЦЕПЬ', 1080, 232, .85);
  const L8 = 8; for (let i = 0; i < L8 * 2 + 1; i++) { if (i === L8) continue; const k = seg(lt, 1.2 + Math.abs(i - L8) * .05, 1.4 + Math.abs(i - L8) * .05); if (k <= 0) continue;
    MD.cast.link(ctx, {x: 540 + (i - L8) * 46, y: 1196, rot: i % 2 ? Math.PI / 2 : 0, front: true}, {s: k}); }
  const zb = ease.back(seg(lt, .8, 1.3)), hp = lt > 1.3 ? Math.abs(Math.sin((lt - 1.3) * 4)) * 26 : 0;
  if (lt > .8) zvenFace(ctx, 540, 1196 - hp, .3 * zb + (1 - zb) * 1.4, {glow: .5, eyes: MD.set.blinkAt(lt, [2.4]) ? 'half' : 'happy', mouth: 'D'});
  const ka = ease.out(seg(lt, 1.7, 2.2)); ctx.save(); ctx.globalAlpha = ka; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink;
  ctx.font = `700 64px ${MD.FONT.ui}`; ctx.fillText('СЕРИЯ 1 · ЗВЕНЫШКО', 540, 1390 + (1 - ka) * 40); ctx.restore();
  grain(ctx, .4);
}, [], {dur: .5, type: 'gold', x: 540, y: 1000});
// ---------- звуковые метки (audio_ser01.py) ----------
const Q = (i, lt, n) => S.cue(S.all[B0 + i], lt, n);
Q(0, 0, 'whoosh_in'); Q(0, HIT, 'freeze'); Q(1, .6 + 1.95, 'bac'); Q(1, .6 + D('ser01_001'), 'kids_laugh'); Q(2, 0, 'koschei_drone'); Q(2, 1.5, 'turn');
Q(3, .4 + D('ser01_002') + .7, 'tear'); Q(4, .3 + D('ser01_003') + .35, 'lullaby'); Q(5, .9, 'notes_freeze'); Q(6, .55, 'fist'); Q(6, 1.1, 'thunder');
Q(7, 0, 'cloud'); Q(8, .05, 'hop'); Q(8, .75, 'roll'); Q(9, .1, 'bristle'); Q(10, .6, 'tense'); Q(11, BR, 'snap'); Q(12, 1.3, 'bite'); Q(12, 1.55, 'zing'); Q(12, 1.85, 'crows');
for (let i = 0; i < 5; i++) Q(13 + i, .55, 'land' + i);
Q(18, .6, 'stone'); Q(19, 0, 'title');
})();
