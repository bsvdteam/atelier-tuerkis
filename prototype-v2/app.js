/* Atelier Türkis v2 — Interaktionen */
(function () {
  'use strict';

  // --- Intro-Animation (erster Besuch): "die leere Leinwand füllt sich" ---
  var intro = document.getElementById('intro');
  if (intro && !document.documentElement.classList.contains('intro-seen')) {
    try { localStorage.setItem('at_intro_seen', '1'); } catch (e) {}
    document.body.style.overflow = 'hidden';
    var introDone = false;
    function endIntro(fast) {
      if (introDone) return; introDone = true;
      if (fast) intro.classList.add('intro--skip');
      document.body.style.overflow = '';
      setTimeout(function () { if (intro && intro.parentNode) intro.parentNode.removeChild(intro); }, fast ? 420 : 200);
    }
    var introSkip = document.getElementById('introSkip');
    if (introSkip) introSkip.addEventListener('click', function () { endIntro(true); });
    setTimeout(function () { endIntro(false); }, 6750); // nach dem CSS-Ausblenden aufräumen
  }

  // --- Full-page burger menu ---
  var burger = document.getElementById('burger');
  var mmenu = document.getElementById('mmenu');
  var mclose = document.getElementById('mclose');

  // Farb-Enthüllungskreis einspeisen (skaliert per transform → flimmerfrei)
  if (mmenu && !mmenu.querySelector('.mmenu__paint')) {
    var paint = document.createElement('div');
    paint.className = 'mmenu__paint';
    mmenu.insertBefore(paint, mmenu.firstChild);
  }

  // Untertabs beim Hover mittig-rechts einblenden (3 Haupttabs bleiben immer sichtbar)
  function clearSubs() {
    if (!mmenu) return;
    mmenu.querySelectorAll('.sub').forEach(function (s) { s.classList.remove('show'); });
    mmenu.querySelectorAll(':scope > a').forEach(function (a) { a.classList.remove('is-active'); });
  }
  function setGroup(link) {
    clearSubs();
    var sub = link.nextElementSibling;
    if (sub && sub.classList.contains('sub')) { sub.classList.add('show'); link.classList.add('is-active'); }
  }
  if (mmenu) {
    mmenu.querySelectorAll(':scope > a').forEach(function (a) {
      // Gruppen zeigen ihr Untermenü, "Atelier" (ohne Untermenü) blendet es aus
      a.addEventListener('mouseenter', function () { setGroup(a); });
      a.addEventListener('focus', function () { setGroup(a); });
    });
  }

  function openMenu() {
    if (!mmenu) return;
    clearSubs();
    // Enthüllung von der Burger-Position aus starten
    if (burger) {
      var r = burger.getBoundingClientRect();
      mmenu.style.setProperty('--bx', Math.round(r.left + r.width / 2) + 'px');
      mmenu.style.setProperty('--by', Math.round(r.top + r.height / 2) + 'px');
    }
    mmenu.classList.add('open');
    mmenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    if (!mmenu) return;
    mmenu.classList.remove('open');
    mmenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  if (burger) burger.addEventListener('click', openMenu);
  if (mclose) mclose.addEventListener('click', closeMenu);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  // Alle Navigations-Links schliessen das Menü
  if (mmenu) mmenu.querySelectorAll('a[href]').forEach(function (a) { a.addEventListener('click', closeMenu); });

  // --- Leichter Blur-Streifen oben beim Scrollen ---
  var navEl = document.querySelector('.nav');
  function onScroll() { if (navEl) navEl.classList.toggle('scrolled', window.scrollY > 16); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Stimmen-Karussell (automatisch + klickbar) ---
  var testi = document.getElementById('testi');
  if (testi) {
    var cards = [].slice.call(testi.querySelectorAll('.testi__card'));
    var dotsWrap = document.getElementById('testiDots');
    var idx = 0, timer = null;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    cards.forEach(function (c, i) {
      var b = document.createElement('button');
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', 'Stimme ' + (i + 1));
      b.addEventListener('click', function () { go(i, true); });
      dotsWrap.appendChild(b);
    });
    var dots = [].slice.call(dotsWrap.children);
    function render() {
      cards.forEach(function (c, i) { c.classList.toggle('is-active', i === idx); });
      dots.forEach(function (d, i) { d.classList.toggle('is-active', i === idx); });
    }
    function go(i, user) { idx = (i + cards.length) % cards.length; render(); if (user) restart(); }
    function restart() { if (reduce) return; if (timer) clearInterval(timer); timer = setInterval(function () { go(idx + 1); }, 5200); }
    var nx = document.getElementById('testiNext'), pv = document.getElementById('testiPrev');
    if (nx) nx.addEventListener('click', function () { go(idx + 1, true); });
    if (pv) pv.addEventListener('click', function () { go(idx - 1, true); });
    testi.addEventListener('mouseenter', function () { if (timer) clearInterval(timer); });
    testi.addEventListener('mouseleave', restart);
    render(); restart();
  }

  // --- Reveal on scroll ---
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // --- Simple gallery / course filter (data-cat) ---
  document.querySelectorAll('[data-filterbar]').forEach(function (bar) {
    var targetSel = bar.getAttribute('data-filterbar');
    var items = document.querySelectorAll(targetSel + ' [data-cat]');
    bar.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        bar.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var f = btn.getAttribute('data-filter');
        items.forEach(function (it) {
          var show = f === 'all' || (it.getAttribute('data-cat') || '').split(' ').indexOf(f) > -1;
          it.style.display = show ? '' : 'none';
        });
      });
    });
  });

  // --- View-Toggle: Karten- / Kalenderansicht ---
  var viewToggle = document.getElementById('viewToggle');
  if (viewToggle) {
    var ind = viewToggle.querySelector('.viewtoggle__ind');
    var vbtns = viewToggle.querySelectorAll('button');
    var vcards = document.getElementById('view-cards');
    var vcal = document.getElementById('view-calendar');
    function moveInd(btn) { ind.style.width = btn.offsetWidth + 'px'; ind.style.transform = 'translateX(' + (btn.offsetLeft - 5) + 'px)'; }
    function setView(btn) {
      vbtns.forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');
      moveInd(btn);
      var v = btn.getAttribute('data-view');
      if (vcards) vcards.hidden = (v !== 'cards');
      if (vcal) vcal.hidden = (v !== 'calendar');
    }
    vbtns.forEach(function (b) { b.addEventListener('click', function () { setView(b); }); });
    var activeBtn = viewToggle.querySelector('button.active') || vbtns[0];
    requestAnimationFrame(function () { moveInd(activeBtn); });
    window.addEventListener('resize', function () { var a = viewToggle.querySelector('button.active'); if (a) moveInd(a); });
  }

  // --- Monatskalender (unbegrenzt vor/zurück) ---
  var calGrid = document.getElementById('calGrid');
  if (calGrid) {
    var calMonthEl = document.getElementById('calMonth');
    var MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    var WD = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
    // wiederkehrende Kurse nach JS-Wochentag (0=So .. 6=Sa)
    var COURSES = [
      { dow: 1, time: '18–20 Uhr', title: 'Zeichnen Grundlagen', mod: 'sky' },
      { dow: 2, time: '18–20 Uhr', title: 'Aquarell Einsteiger', mod: 'coral' },
      { dow: 3, time: '18–20:30', title: 'Nähen Einsteiger', mod: 'coral' },
      { dow: 4, time: '19–21 Uhr', title: 'Handlettering', mod: 'violet' },
      { dow: 6, time: '10–13 Uhr', title: 'Buchbinden', mod: 'orange' },
      { dow: 6, time: '13–17 Uhr', title: 'Cyanotypie', mod: 'sky' }
    ];
    var today = new Date();
    var cur = new Date(today.getFullYear(), today.getMonth(), 1);
    function renderCal() {
      var y = cur.getFullYear(), m = cur.getMonth();
      calMonthEl.textContent = MONTHS[m] + ' ' + y;
      calGrid.innerHTML = '';
      WD.forEach(function (w) { var h = document.createElement('div'); h.className = 'cal__wd'; h.textContent = w; calGrid.appendChild(h); });
      var lead = (new Date(y, m, 1).getDay() + 6) % 7; // Montag-Start
      var daysInMonth = new Date(y, m + 1, 0).getDate();
      for (var i = 0; i < lead; i++) { var p = document.createElement('div'); p.className = 'cal__cell cal__cell--pad'; calGrid.appendChild(p); }
      for (var d = 1; d <= daysInMonth; d++) {
        var cell = document.createElement('div'); cell.className = 'cal__cell';
        var dow = new Date(y, m, d).getDay();
        if (y === today.getFullYear() && m === today.getMonth() && d === today.getDate()) cell.className += ' cal__cell--today';
        var num = document.createElement('span'); num.className = 'cal__daynum'; num.textContent = d; cell.appendChild(num);
        COURSES.filter(function (c) { return c.dow === dow; }).forEach(function (c) {
          var a = document.createElement('a'); a.className = 'cal__event cal__event--' + c.mod; a.href = 'kurs-detail.html';
          a.innerHTML = '<span class="t">' + c.time + '</span><span class="n">' + c.title + '</span>';
          cell.appendChild(a);
        });
        calGrid.appendChild(cell);
      }
    }
    document.getElementById('calPrev').addEventListener('click', function () { cur.setMonth(cur.getMonth() - 1); renderCal(); });
    document.getElementById('calNext').addEventListener('click', function () { cur.setMonth(cur.getMonth() + 1); renderCal(); });
    document.getElementById('calToday').addEventListener('click', function () { cur = new Date(today.getFullYear(), today.getMonth(), 1); renderCal(); });
    renderCal();
  }

  // --- Werk-Galerie: Thumbnail wechselt das Hauptbild ---
  document.querySelectorAll('.gallery').forEach(function (g) {
    var main = g.querySelector('.gallery__main .ph');
    g.querySelectorAll('.gallery__thumb').forEach(function (t) {
      t.addEventListener('click', function () {
        var cls = t.getAttribute('data-ph');
        if (cls && main) main.className = 'ph ' + cls;
        g.querySelectorAll('.gallery__thumb').forEach(function (x) { x.classList.remove('is-active'); });
        t.classList.add('is-active');
      });
    });
  });

  // --- Language toggle (visual only in prototype) ---
  document.querySelectorAll('.lang button, .mlang button').forEach(function (b) {
    b.addEventListener('click', function () {
      var group = b.closest('.lang, .mlang');
      group.querySelectorAll('button').forEach(function (x) { x.classList.remove('active'); });
      b.classList.add('active');
    });
  });
})();
