/* ============================================================
   ATELIER TÜRKIS — Shared front-end behaviour
   ============================================================ */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     NAVIGATION — centred burger + brush-paint full-screen menu
     Injected on every page so it stays consistent.
     ============================================================ */
  var NAV = [
    { href: 'index.html', de: 'Home', en: 'Home', subs: [] },
    { href: 'kurse.html', de: 'Kurse', en: 'Courses', subs: [
      { href: 'kurse.html', de: 'Aquarell', en: 'Watercolour' },
      { href: 'kurse.html', de: 'Acryl', en: 'Acrylic' },
      { href: 'kurse.html', de: 'Zeichnen', en: 'Drawing' },
      { href: 'kurse.html', de: 'Keramik', en: 'Ceramics' }
    ] },
    { href: 'galerie.html', de: 'Galerie', en: 'Gallery', subs: [
      { href: 'galerie.html', de: 'Atelier-Werke', en: 'Atelier works' },
      { href: 'galerie.html', de: 'Kursteilnehmer', en: 'Participants' }
    ] },
    { href: 'atelier.html', de: 'Atelier', en: 'Atelier', subs: [
      { href: 'atelier.html', de: 'Geschichte', en: 'Story' },
      { href: 'atelier.html', de: 'Team', en: 'Team' },
      { href: 'atelier.html', de: 'Kontakt', en: 'Contact' }
    ] },
    { href: 'canvas.html', de: 'Canvas', en: 'Canvas', subs: [
      { href: 'canvas.html', de: 'Mitmachen', en: 'Join in' },
      { href: 'canvas.html', de: 'Community-Galerie', en: 'Community gallery' }
    ] }
  ];

  function buildNav() {
    var page = (location.pathname.split('/').pop() || 'index.html');
    if (page === '') page = 'index.html';

    // remove any pre-rendered nav/mobile menu from the page markup
    ['nav', 'mobileMenu'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.parentNode) el.parentNode.removeChild(el);
    });

    // brush-edge SVG filter (organic clip-path boundary)
    var defs = document.createElement('div');
    defs.className = 'brush-defs';
    defs.setAttribute('aria-hidden', 'true');
    defs.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg"><filter id="brushEdge">' +
      '<feTurbulence type="fractalNoise" baseFrequency="0.012 0.016" numOctaves="2" seed="7" result="n"/>' +
      '<feDisplacementMap in="SourceGraphic" in2="n" scale="70" xChannelSelector="R" yChannelSelector="G"/>' +
      '</filter></svg>';
    document.body.appendChild(defs);

    // header with centred burger
    var header = document.createElement('header');
    header.className = 'nav' + (page !== 'index.html' ? ' solid' : '');
    header.id = 'nav';
    header.innerHTML =
      '<div class="nav__bar">' +
        '<button class="burger" id="burger" aria-label="Menü öffnen" aria-expanded="false" aria-controls="menuOverlay">' +
          '<span class="burger__box"><span class="burger__line"></span><span class="burger__line"></span></span>' +
        '</button>' +
      '</div>';
    document.body.insertBefore(header, document.body.firstChild);

    // menu items
    var itemsHtml = NAV.map(function (item, i) {
      var subs = item.subs.map(function (s) {
        return '<a href="' + s.href + '" data-de="' + s.de + '" data-en="' + s.en + '">' + s.de + '</a>';
      }).join('');
      var active = item.href === page ? ' is-active' : '';
      return '<div class="menu-item' + active + '" style="--i:' + i + '">' +
        '<a class="menu-link" href="' + item.href + '" data-de="' + item.de + '" data-en="' + item.en + '">' + item.de + '</a>' +
        (subs ? '<div class="menu-subs">' + subs + '</div>' : '') +
      '</div>';
    }).join('');

    var overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    overlay.id = 'menuOverlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML =
      '<div class="menu-paint"></div>' +
      '<div class="menu-inner">' +
        '<div class="menu-brand">Atelier <span>Türkis</span></div>' +
        '<nav class="menu-nav" aria-label="Hauptnavigation">' + itemsHtml + '</nav>' +
        '<div class="menu-foot">' +
          '<div class="menu-contact">' +
            '<a href="#">+41 79 123 45 67</a>' +
            '<a href="#">hallo@atelier-tuerkis.ch</a>' +
          '</div>' +
          '<div class="menu-lang" role="group" aria-label="Sprache wählen">' +
            '<button data-lang="de" class="active">DE</button><span class="sep">|</span><button data-lang="en">EN</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
  }

  buildNav();

  /* ---------- Menu open / close (brush reveal) ---------- */
  var burger = document.getElementById('burger');
  var overlay = document.getElementById('menuOverlay');
  var navEl = document.getElementById('nav');
  var menuOpen = false, closeTimer = null;

  function openMenu() {
    if (menuOpen) return;
    menuOpen = true;
    clearTimeout(closeTimer);
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    navEl.classList.add('menu-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Menü schliessen');
    document.body.classList.add('menu-locked');
    requestAnimationFrame(function () { requestAnimationFrame(function () { overlay.classList.add('painted'); }); });
  }
  function closeMenu() {
    if (!menuOpen) return;
    menuOpen = false;
    overlay.classList.remove('painted');
    navEl.classList.remove('menu-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Menü öffnen');
    document.body.classList.remove('menu-locked');
    closeTimer = setTimeout(function () {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
    }, reduceMotion ? 0 : 820);
  }
  if (burger) burger.addEventListener('click', function () { menuOpen ? closeMenu() : openMenu(); });
  overlay.querySelectorAll('.menu-link, .menu-subs a').forEach(function (a) {
    a.addEventListener('click', function () {
      // same-page links: just close; cross-page links navigate anyway
      if (a.getAttribute('href') === (location.pathname.split('/').pop() || 'index.html')) closeMenu();
    });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menuOpen) closeMenu(); });

  /* ---------- Sticky nav tint + scroll progress ---------- */
  var progress = document.getElementById('scrollProgress');
  function onScroll() {
    if (navEl && !navEl.classList.contains('solid')) {
      if (window.scrollY > 40) navEl.classList.add('scrolled');
      else navEl.classList.remove('scrolled');
    }
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Language switch (DE / EN) ---------- */
  function setLang(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-de], [data-en]').forEach(function (el) {
      var val = el.getAttribute('data-' + lang);
      if (val !== null) el.textContent = val;
    });
    document.querySelectorAll('[data-de-html], [data-en-html]').forEach(function (el) {
      var val = el.getAttribute('data-' + lang + '-html');
      if (val !== null) el.innerHTML = val;
    });
    document.querySelectorAll('.lang button, .footer__lang button, .menu-lang button').forEach(function (b) {
      var active = b.getAttribute('data-lang') === lang;
      b.classList.toggle('active', active);
      if (b.hasAttribute('aria-pressed')) b.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    try { localStorage.setItem('atelier_lang', lang); } catch (e) {}
  }
  document.querySelectorAll('.lang button, .footer__lang button, .menu-lang button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });
  var savedLang = 'de';
  try { savedLang = localStorage.getItem('atelier_lang') || 'de'; } catch (e) {}
  if (savedLang === 'en') setLang('en');

  /* ---------- Filter bar (client-side demo filtering) ---------- */
  document.querySelectorAll('[data-filter-group]').forEach(function (group) {
    group.querySelectorAll('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        group.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        applyFilters();
      });
    });
  });
  function applyFilters() {
    var groups = document.querySelectorAll('[data-filter-group]');
    var active = {};
    groups.forEach(function (g) {
      var sel = g.querySelector('.filter-btn.active');
      active[g.getAttribute('data-filter-group')] = sel ? sel.getAttribute('data-value') : 'all';
    });
    var items = document.querySelectorAll('[data-item]');
    var shown = 0;
    items.forEach(function (item) {
      var visible = true;
      Object.keys(active).forEach(function (key) {
        var want = active[key];
        if (want && want !== 'all') {
          var has = (item.getAttribute('data-' + key) || '').split(' ');
          if (has.indexOf(want) === -1) visible = false;
        }
      });
      item.style.display = visible ? '' : 'none';
      if (visible) shown++;
    });
    var counter = document.getElementById('resultCount');
    if (counter) {
      var de = shown === 1 ? shown + ' Ergebnis' : shown + ' Ergebnisse';
      var en = shown === 1 ? shown + ' result' : shown + ' results';
      counter.setAttribute('data-de', de);
      counter.setAttribute('data-en', en);
      counter.textContent = document.documentElement.getAttribute('lang') === 'en' ? en : de;
    }
    var empty = document.getElementById('emptyState');
    if (empty) empty.style.display = shown === 0 ? '' : 'none';
  }
})();
