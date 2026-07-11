/* =============================================================
   TRICHY PHOTOGRAPHER — Main JavaScript
   Handles: sticky header, mobile menu, scroll reveal,
            testimonials slider, portfolio filter + lightbox,
            contact form (WhatsApp), footer year.
   Vanilla JS — no frameworks.
   ============================================================= */
(function () {
  'use strict';

  /* -------- 1. STICKY HEADER on scroll -------- */
  const header = document.querySelector('.header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* -------- 2. MOBILE NAV TOGGLE -------- */
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      menu.classList.toggle('open');
    });
    // close menu when a link is clicked
    menu.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        menu.classList.remove('open');
      })
    );
  }

  /* -------- 3. SCROLL REVEAL (fade-in) -------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  /* -------- 4. TESTIMONIALS SLIDER -------- */
  const slider = document.querySelector('.slider');
  if (slider) {
    const slidesEl = slider.querySelector('.slides');
    const slides = slider.querySelectorAll('.slide');
    const dotsWrap = slider.querySelector('.slider-dots');
    let index = 0;

    // build dots
    slides.forEach((_, i) => {
      const b = document.createElement('button');
      if (i === 0) b.classList.add('active');
      b.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
      b.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(b);
    });
    const dots = dotsWrap.querySelectorAll('button');

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      slidesEl.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, di) => d.classList.toggle('active', di === index));
    }
    // auto-advance
    let timer = setInterval(() => goTo(index + 1), 5500);
    slider.addEventListener('mouseenter', () => clearInterval(timer));
    slider.addEventListener('mouseleave', () => {
      timer = setInterval(() => goTo(index + 1), 5500);
    });
  }

  /* -------- 5. PORTFOLIO FILTER -------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const tiles = document.querySelectorAll('.masonry .tile, .gallery-grid .tile');
  if (filterBtns.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        tiles.forEach((t) => {
          const show = cat === 'all' || t.dataset.category === cat;
          t.classList.toggle('hide', !show);
        });
      });
    });
  }

  /* -------- 6. LIGHTBOX -------- */
  const lightbox = document.querySelector('.lightbox');
  if (lightbox && tiles.length) {
    const lbImg = lightbox.querySelector('img');
    const btnClose = lightbox.querySelector('.lb-close');
    const btnPrev = lightbox.querySelector('.lb-nav.prev');
    const btnNext = lightbox.querySelector('.lb-nav.next');
    let current = 0;
    const visibleTiles = () =>
      Array.from(tiles).filter((t) => !t.classList.contains('hide'));

    function open(tile) {
      const list = visibleTiles();
      current = list.indexOf(tile);
      show();
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function show() {
      const list = visibleTiles();
      const tile = list[current];
      if (!tile) return;
      const full = tile.dataset.full || tile.querySelector('img').src;
      lbImg.src = full;
    }
    function move(dir) {
      const list = visibleTiles();
      current = (current + dir + list.length) % list.length;
      show();
    }
    function close() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    tiles.forEach((t) => t.addEventListener('click', () => open(t)));
    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', () => move(-1));
    btnNext.addEventListener('click', () => move(1));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') move(-1);
      if (e.key === 'ArrowRight') move(1);
    });
  }

  /* -------- 7. CONTACT FORM -> WhatsApp -------- */
  const form = document.querySelector('#contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const message = form.message.value.trim();
      if (!name || !phone || !message) return;
      const text =
        `*New Enquiry — Trichy Photographer*%0A%0A` +
        `*Name:* ${encodeURIComponent(name)}%0A` +
        `*Phone:* ${encodeURIComponent(phone)}%0A` +
        `*Message:* ${encodeURIComponent(message)}`;
      // Opens WhatsApp chat with pre-filled enquiry (number in international format)
      window.open(`https://wa.me/917845117177?text=${text}`, '_blank');
      form.reset();
      const note = form.querySelector('.form-note');
      if (note) note.textContent = 'Opening WhatsApp… thank you, we will reply shortly!';
    });
  }

  /* -------- 8. AUTO FOOTER YEAR -------- */
  const yearEl = document.querySelector('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ===========================================================
     MOTION & GRAPHICS ENHANCEMENTS
     =========================================================== */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------- 9. SCROLL PROGRESS BAR -------- */
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);
  const updateBar = () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = scrolled + '%';
  };
  window.addEventListener('scroll', updateBar, { passive: true });
  updateBar();

  /* -------- 10. FLOATING GOLD BOKEH PARTICLES -------- */
  if (!reduceMotion) {
    document.querySelectorAll('.hero, .page-banner, .cta-banner').forEach((sec) => {
      const layer = document.createElement('div');
      layer.className = 'bokeh-layer';
      const count = sec.classList.contains('hero') ? 18 : 10;
      for (let i = 0; i < count; i++) {
        const b = document.createElement('span');
        b.className = 'bokeh';
        const size = 6 + Math.floor((i * 37) % 26);            // 6–32px (deterministic, no Math.random needed)
        b.style.width = b.style.height = size + 'px';
        b.style.left = ((i * 53) % 100) + '%';
        b.style.animationDuration = 9 + ((i * 7) % 12) + 's';
        b.style.animationDelay = ((i * 13) % 14) + 's';
        layer.appendChild(b);
      }
      sec.appendChild(layer);
    });
  }

  /* -------- 11. FLOATING DECORATIVE APERTURE RINGS -------- */
  const heroSec = document.querySelector('.hero');
  if (heroSec && !reduceMotion) {
    const mk = (cls, css) => {
      const d = document.createElement('div');
      d.className = 'deco ' + cls;
      Object.assign(d.style, css); // motion comes from CSS spin + mouse-drift (margin), not transform-parallax
      heroSec.appendChild(d);
    };
    mk('spin', { width: '220px', height: '220px', top: '12%', left: '-70px' });
    mk('spin rev', { width: '340px', height: '340px', bottom: '-90px', right: '-110px', borderStyle: 'dashed' });
  }

  /* -------- 12. PARALLAX ON SCROLL -------- */
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  const heroBgs = document.querySelectorAll('.hero-bg');
  if (!reduceMotion) {
    let ticking = false;
    const runParallax = () => {
      const y = window.scrollY;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.2;
        el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      });
      // subtle zoom/drift on hero backgrounds not using fixed attachment
      heroBgs.forEach((bg) => {
        if (getComputedStyle(bg).backgroundAttachment !== 'fixed') {
          bg.style.transform = `scale(1.08) translateY(${y * 0.12}px)`;
        }
      });
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { window.requestAnimationFrame(runParallax); ticking = true; }
    }, { passive: true });
    runParallax();
  }

  /* -------- 13. MOUSE PARALLAX IN HERO -------- */
  if (heroSec && !reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    const inner = heroSec.querySelector('.hero-inner');
    const portrait = heroSec.querySelector('.hero-portrait');
    heroSec.addEventListener('mousemove', (e) => {
      const dx = (e.clientX / window.innerWidth - 0.5);
      const dy = (e.clientY / window.innerHeight - 0.5);
      if (inner) inner.style.transform = `translate(${dx * 18}px, ${dy * 12}px)`;
      // subtle 3D depth on the photographer portrait
      if (portrait) portrait.style.transform =
        `perspective(900px) rotateY(${dx * -6}deg) rotateX(${dy * 5}deg) translate(${dx * 10}px, ${dy * 8}px)`;
      heroSec.querySelectorAll('.deco').forEach((d, i) => {
        const f = (i + 1) * 22;
        d.style.marginLeft = dx * f + 'px';
        d.style.marginTop = dy * f + 'px';
      });
    });
  }

  /* -------- 14. ANIMATED STAT COUNTERS -------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const dur = 1600;
        let start = null;
        const step = (ts) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
          el.textContent = Math.floor(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target + suffix;
        };
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => cio.observe(c));
  }

  /* -------- 15. 3D TILT ON CARDS -------- */
  if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.service-card, .service-photo').forEach((card) => {
      card.classList.add('tilt');
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          `perspective(800px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg) translateY(-8px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  /* -------- 16. BACK-TO-TOP BUTTON -------- */
  const top = document.createElement('button');
  top.className = 'back-top';
  top.setAttribute('aria-label', 'Back to top');
  top.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(top);
  top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => {
    top.classList.toggle('show', window.scrollY > 600);
  }, { passive: true });

  /* -------- 17. PRELOADER (hide once page fully loaded) -------- */
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    const hide = () => preloader.classList.add('hidden');
    if (document.readyState === 'complete') setTimeout(hide, 400);
    else window.addEventListener('load', () => setTimeout(hide, 300));
    // safety fallback so it never gets stuck waiting on remote images
    setTimeout(hide, 2500);
  }

  /* -------- 18. CINEMATIC FILM-GRAIN OVERLAY -------- */
  if (!reduceMotion) {
    const grain = document.createElement('div');
    grain.className = 'grain';
    document.body.appendChild(grain);
  }

  /* -------- 19. CUSTOM GOLD CURSOR (desktop only) -------- */
  if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    const ring = document.createElement('div'); ring.className = 'cursor-ring';
    const dot = document.createElement('div'); dot.className = 'cursor-dot';
    document.body.appendChild(ring); document.body.appendChild(dot);
    document.body.classList.add('gold-cursor');

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });
    // ring trails the dot with easing for a smooth premium feel
    const loop = () => {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    };
    loop();
    // enlarge over interactive elements
    document.querySelectorAll('a, button, .tile, .filter-btn, .service-card, .service-photo, input, textarea')
      .forEach((el) => {
        el.addEventListener('mouseenter', () => ring.classList.add('hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
      });
    // hide when leaving the window
    document.addEventListener('mouseleave', () => { ring.style.opacity = 0; dot.style.opacity = 0; });
    document.addEventListener('mouseenter', () => { ring.style.opacity = 1; dot.style.opacity = 1; });
  }

  /* -------- 21. HERO TYPEWRITER (rotating words) -------- */
  const typed = document.querySelector('.typed');
  if (typed) {
    const words = (typed.dataset.words || '').split(',').map((w) => w.trim()).filter(Boolean);
    if (words.length) {
      let wi = 0, ci = 0, deleting = false;
      const tick = () => {
        const word = words[wi];
        typed.textContent = word.slice(0, ci);
        if (!deleting && ci < word.length) {
          ci++; setTimeout(tick, 110);
        } else if (!deleting && ci === word.length) {
          deleting = true; setTimeout(tick, 1400);          // pause on full word
        } else if (deleting && ci > 0) {
          ci--; setTimeout(tick, 55);
        } else {
          deleting = false; wi = (wi + 1) % words.length; setTimeout(tick, 250);
        }
      };
      tick();
    }
  }

  /* -------- 22. BEFORE / AFTER COMPARISON SLIDERS -------- */
  document.querySelectorAll('.ba').forEach((ba) => {
    let dragging = false;
    const setPos = (clientX) => {
      const r = ba.getBoundingClientRect();
      let pct = ((clientX - r.left) / r.width) * 100;
      pct = Math.max(2, Math.min(98, pct));
      ba.style.setProperty('--pos', pct + '%');
    };
    const start = (e) => { dragging = true; setPos((e.touches ? e.touches[0] : e).clientX); e.preventDefault(); };
    const move = (e) => { if (dragging) setPos((e.touches ? e.touches[0] : e).clientX); };
    const end = () => { dragging = false; };
    ba.addEventListener('mousedown', start);
    ba.addEventListener('touchstart', start, { passive: false });
    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('touchmove', move, { passive: true });
    window.addEventListener('mouseup', end);
    window.addEventListener('touchend', end);
    // also let a simple hover-drag work without holding on desktop
    ba.addEventListener('mousemove', (e) => { if (!dragging) setPos(e.clientX); });
  });

  /* -------- 20. MAGNETIC BUTTONS -------- */
  if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.btn-gold, .nav-cta, .wa-float, .back-top').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }
})();
