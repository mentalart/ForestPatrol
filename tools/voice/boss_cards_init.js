// Тексты карточек боссов, которые игра читает вслух, но которых нет ни в задачах, ни в подсказках-зонах (их берёт harvest_read.js): урок #finTut,
// подсказка боя #finBossHint, табличка Соловья #solsign — они собираются в бою (late_79e_lesson.js, late_79_hints.js, 3-B/late_99v_k3b.js).
// Скрипт запоминает каждое значение этих карточек, когда игра их записывает, и на выходе отдаёт тексты в том виде, в каком их читает raBoss
// (late_79b_readaloud.js). Сам по себе ничего не запускает — нужен прогон ботов, которые доходят до карточек:
//   1. копия tools/tests/run.js со строками: после `const page=await browser.newPage(…)` — `await page.addInitScript({path:'tools/voice/boss_cards_init.js'});`,
//      перед `await browser.close()` — `console.log('BCDUMP '+JSON.stringify(await page.evaluate(()=>window.__BCDUMP?window.__BCDUMP():[])));`
//      (TESTS_DIR=папка с копией run.js и bots/, NOSHOTS=1, tools/tests/run_one.sh <бот> zlataya_cep/zlataya_cep_final06.html);
//   2. боты: tfin_boss4b tfin_bossaudit tfin_bossui tfin_help tfin_hintctl tfin_hintlayer tfin_k1bfull tfin_k2blesson tfin_k3bboss tfin_k3blesson
//      tfin_lesson tfin_sky32tut tfin_tutfont tk5e_act1lessons tk5e_act2lessons tk5e_act3lessons tk5e_lesson tk5e_lesson2 tk5e_s1 tk5e_smoke t3bv;
//   3. строки `BCDUMP ["finTut|текст", …]` из вывода — в тексты для read_tts.py: {lv:'boss', kind:'boss', text}; тексты, заведённые самими ботами
//      (tfin_bossui «Урок: щит», tfin_hintctl «Табличка», «Другая подсказка босса», «Бей по знаку!»), в игре не встречаются — их не озвучивать.
(() => {
  if (window.__BC) return;
  const B = window.__BC = {}, SEL = '#finTut,#finBossHint,#solsign';
  const wrap = (proto, name) => {
    const d = Object.getOwnPropertyDescriptor(proto, name);
    if (!d || !d.set) return;
    Object.defineProperty(proto, name, {get: d.get, configurable: true, set(v) {
      d.set.call(this, v);
      try { const c = this.closest && this.closest(SEL); if (c) { const k = c.id + '|' + c.outerHTML; B[k] = (B[k] || 0) + 1; } } catch (e) {}
    }});
  };
  wrap(Element.prototype, 'innerHTML'); wrap(Node.prototype, 'textContent'); wrap(HTMLElement.prototype, 'innerText');
  window.__BCDUMP = () => {
    const out = {};
    const norm = (id, html) => {
      const e = document.createElement('div'); e.innerHTML = html; const c = e.firstElementChild;
      c.querySelectorAll('.ft-tag,.ft-ico,.ss-ico,.ft-skip,kbd,.pb,.fh-keys,.ft-keys').forEach(x => x.remove());
      if (id === 'solsign') return (c.textContent || '').replace(/[◆✦✓]/g, ' ').replace(/\s+/g, ' ').replace(/\s+([,.!?:;])/g, '$1').trim();
      const q = id === 'finBossHint' ? '.fh-title,.fh-text' : '.ft-head,.ft-text';
      return [...c.querySelectorAll(q)].map(x => x.textContent).join('. ').replace(/[◆✦✓]/g, ' ').replace(/\s+/g, ' ').replace(/\s+([,.!?:;])/g, '$1').replace(/([.!?])\./g, '$1').trim();
    };
    for (const k of Object.keys(B)) { const i = k.indexOf('|'), id = k.slice(0, i), t = norm(id, k.slice(i + 1)); if (t) out[id + '|' + t] = 1; }
    return Object.keys(out);
  };
})();
