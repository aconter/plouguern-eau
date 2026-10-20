(function () {
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  document.querySelectorAll('.sub-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var li = btn.parentElement;
      var open = li.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Carte Google chargée seulement au clic (pas de cookies Google avant)
  document.querySelectorAll('.gmap-load').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var box = btn.closest('.gmap-facade');
      var f = document.createElement('iframe');
      f.className = 'gmap';
      f.src = box.getAttribute('data-src');
      f.title = 'Plouguern Eau sur Google Maps : fiche, note et avis';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      box.replaceWith(f);
    });
  });

  // Animations : en-tete au defilement et apparition des blocs
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  }
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    var groups = '.cards,.gallery,.steps,.audience,.zones,.rel-grid,.reviews,.tips,.sect-links,.sect-links-3';
    var singles = '.section h2,.lead-sm,.split>*,.info-box,.faq,.rounded,.cta-inner';
    var items = [];
    document.querySelectorAll(groups).forEach(function (g) {
      Array.prototype.forEach.call(g.children, function (el, i) {
        el.style.transitionDelay = (i % 3) * 90 + 'ms'; items.push(el);
      });
    });
    document.querySelectorAll(singles).forEach(function (el) {
      if (items.indexOf(el) < 0 && !el.closest('.hero')) items.push(el);
    });
    var vh = window.innerHeight;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var t = e.target; t.classList.add('in'); io.unobserve(t);
          setTimeout(function () { t.classList.remove('reveal', 'in'); t.style.transitionDelay = ''; }, 1000);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) {
      if (el.getBoundingClientRect().top < vh * 0.92) return; // deja visible : pas d'effet
      el.classList.add('reveal'); io.observe(el);
    });
  }
})();
