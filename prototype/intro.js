/* ============================================================
   ATELIER TÜRKIS — Cinematic scroll intro (home, first visit)
   "Türkis" stays fixed in the centre the whole time. Art words
   bloom around it, then fly out. Then eyebrow + sentence fade in,
   the background darkens crème → teal → black, then the start
   page fades in smoothly.
   ============================================================ */
(function () {
  'use strict';

  var cinematic = document.getElementById('cinematic');
  if (!cinematic) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var seen = false;
  try { seen = localStorage.getItem('atelier_cine_seen') === 'true'; } catch (e) {}

  function removeAll() {
    document.body.classList.remove('cine-active');
    ['cineSpacer', 'cinematic', 'cineVeil'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.parentNode) el.parentNode.removeChild(el);
    });
  }

  if (seen || reduceMotion) { removeAll(); return; }

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  /* ---------- Word field (art / calm / creativity) ---------- */
  var WORDS = [
    'Kreativität','Ruhe','Farbe','Licht','Fantasie','Freiheit','Handwerk','Stille',
    'Liebe','Neugier','Geduld','Spiel','Ausdruck','Wärme','Fluss','Inspiration',
    'Textur','Form','Linie','Achtsamkeit','Gelassenheit','Freude','Muße','Präsenz',
    'Schönheit','Balance','Hingabe','Leichtigkeit','Mut','Klarheit','Poesie','Rhythmus',
    'Pinsel','Skizze','Aquarell','Atem','Raum','Gefühl','Wandel','Staunen'
  ];
  var COLORS = ['#1A1A18','#1A6B6F','#1A1A18','#C4623A','#1A6B6F','#C48A7E','#7A9E7E','#6B6B68','#2E9EA4','#1A1A18','#E8C87A'];

  var wordsLayer = document.getElementById('cineWords');
  var isMobile = window.innerWidth < 700;
  var cols = isMobile ? 4 : 8;
  var rows = isMobile ? 7 : 6;
  var cellCount = cols * rows;

  var items = [];
  var wi = 0;
  for (var i = 0; i < cellCount && wi < WORDS.length; i++) {
    var col = i % cols;
    var row = Math.floor(i / cols);
    var x = ((col + 0.5) / cols) * 100 + (Math.random() * 8 - 4);
    var y = ((row + 0.5) / rows) * 100 + (Math.random() * 9 - 4.5);
    x = Math.max(6, Math.min(94, x));
    y = Math.max(7, Math.min(92, y));

    // keep a clear central band so "Türkis" is never covered
    if (Math.abs(x - 50) < (isMobile ? 24 : 22) && Math.abs(y - 50) < 15) continue;

    var el = document.createElement('span');
    var isSans = wi % 3 === 0;
    el.className = 'cine-word ' + (isSans ? 'cine-word--sans' : 'cine-word--serif' + (Math.random() > 0.5 ? ' italic' : ''));
    el.textContent = WORDS[wi];

    var size = isSans
      ? (isMobile ? 11 + Math.random() * 3 : 12 + Math.random() * 5)
      : (isMobile ? 15 + Math.random() * 11 : 22 + Math.random() * 26);
    el.style.fontSize = size.toFixed(1) + 'px';
    el.style.left = x + '%';
    el.style.top = y + '%';
    el.style.color = COLORS[wi % COLORS.length];
    el.style.opacity = '0';
    wordsLayer.appendChild(el);

    var dx = x - 50, dy = y - 50;
    var len = Math.sqrt(dx * dx + dy * dy) || 1;
    items.push({
      el: el, ux: dx / len, uy: dy / len,
      rot: (Math.random() * 2 - 1) * 22,
      baseOp: 0.5 + Math.random() * 0.5,
      dist: len
    });
    wi++;
  }

  // appear order: inner ring first, blooming outward
  var order = items.map(function (_, k) { return k; });
  order.sort(function (a, b) { return items[a].dist - items[b].dist; });
  var appearAt = [];
  order.forEach(function (idx, k) {
    appearAt[idx] = 0.05 + (k / Math.max(1, order.length - 1)) * 0.37; // last ≈ 0.42
  });

  /* ---------- Elements ---------- */
  var bg = document.getElementById('cineBg');
  var wordEl = document.getElementById('cineWord');       // "Türkis" — always centred
  var eyebrowEl = document.getElementById('cineEyebrow'); // "Atelier"
  var sentenceEl = document.getElementById('cineSentence');
  var hint = document.getElementById('cineHint');

  /* ---------- Colour helpers ---------- */
  function hex(h) { return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]; }
  function mix(a, b, t) {
    var A = hex(a), B = hex(b);
    return 'rgb(' + Math.round(A[0] + (B[0] - A[0]) * t) + ',' + Math.round(A[1] + (B[1] - A[1]) * t) + ',' + Math.round(A[2] + (B[2] - A[2]) * t) + ')';
  }
  var CREME = '#F5F0E8', TEAL = '#1A6B6F', OLIVE = '#5F6B3F', INK = '#141412';
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  /* ---------- The scrub ---------- */
  var released = false;
  function update() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var p = max > 0 ? clamp(window.scrollY / max) : 0;

    var diag = Math.sqrt(window.innerWidth * window.innerWidth + window.innerHeight * window.innerHeight);
    var fly = clamp((p - 0.46) / 0.16); // words leave 0.46 → 0.62

    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var a = clamp((p - appearAt[i]) / 0.06);
      var op = it.baseOp * a * (1 - fly);
      var tx = it.ux * diag * 1.3 * fly;
      var ty = it.uy * diag * 1.3 * fly;
      var s = (0.86 + 0.14 * a) * (1 + fly * 0.25);
      it.el.style.opacity = op.toFixed(3);
      it.el.style.transform = 'translate(-50%,-50%) translate(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px) scale(' + s.toFixed(3) + ') rotate(' + (it.rot * fly).toFixed(1) + 'deg)';
    }

    if (hint) hint.style.opacity = (1 - clamp(p / 0.05)).toFixed(3);

    // eyebrow + sentence fade in around the persistent word
    if (eyebrowEl) eyebrowEl.style.opacity = clamp((p - 0.58) / 0.10).toFixed(3);
    if (sentenceEl) sentenceEl.style.opacity = clamp((p - 0.64) / 0.10).toFixed(3);

    // background: crème → teal → ink (gentle gradient while dark)
    var colA, colB;
    if (p < 0.70) { colA = CREME; colB = CREME; }
    else if (p < 0.82) { var t1 = (p - 0.70) / 0.12; colA = mix(CREME, TEAL, t1); colB = mix(CREME, OLIVE, t1); }
    else { var t2 = clamp((p - 0.82) / 0.12); colA = mix(TEAL, INK, t2); colB = mix(OLIVE, INK, t2); }
    if (bg) bg.style.background = 'linear-gradient(140deg, ' + colA + ', ' + colB + ')';

    // text lightens as the background darkens
    var dark = clamp((p - 0.74) / 0.10);
    if (wordEl) wordEl.style.color = mix('#1A1A18', CREME, dark);
    if (eyebrowEl) eyebrowEl.style.color = mix('#77726A', CREME, dark);
    if (sentenceEl) sentenceEl.style.color = mix('#5F5D58', CREME, dark);

    // release → smooth crossfade to the start page (no vertical slide)
    if (!released && p >= 0.995) {
      released = true;
      try { localStorage.setItem('atelier_cine_seen', 'true'); } catch (e) {}
      var veil = document.getElementById('cineVeil');
      if (veil) { veil.style.display = 'block'; veil.style.opacity = '1'; } // covers with black
      document.body.classList.remove('cine-active');                        // reveal site behind veil
      var sp = document.getElementById('cineSpacer');
      if (sp && sp.parentNode) sp.parentNode.removeChild(sp);
      if (cinematic.parentNode) cinematic.parentNode.removeChild(cinematic);
      window.scrollTo(0, 0);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          if (veil) {
            veil.style.opacity = '0';
            setTimeout(function () { if (veil.parentNode) veil.parentNode.removeChild(veil); }, 850);
          }
        });
      });
    }
  }

  var ticking = false;
  function onScroll() {
    if (released) return;
    if (!ticking) { ticking = true; requestAnimationFrame(function () { update(); ticking = false; }); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
