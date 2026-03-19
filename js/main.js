/* ============================================================
   EMERALD & OPAL PIERCING STUDIO — main.js
   ============================================================ */

/* ── Nav: transparent → solid on scroll ─────────────────────── */
(function () {
  const nav  = document.getElementById('main-nav');
  if (!nav) return;

  const isHome = document.body.classList.contains('page-home');

  function updateNav() {
    if (isHome) {
      nav.classList.toggle('nav--solid',       window.scrollY > 60);
      nav.classList.toggle('nav--transparent', window.scrollY <= 60);
    } else {
      nav.classList.add('nav--solid');
      nav.classList.remove('nav--transparent');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
})();

/* ── Mobile hamburger ───────────────────────────────────────── */
(function () {
  const btn    = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (!btn || !mobileNav) return;

  btn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });

  // Close when a link is clicked
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileNav.classList.remove('open'));
  });
})();

/* ── FAQ accordion ──────────────────────────────────────────── */
(function () {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer')?.classList.remove('open');
      });

      // Re-open if it was closed
      if (!wasOpen) {
        item.classList.add('open');
        answer.classList.add('open');
      }
    });
  });
})();

/* ── Scroll-triggered fade-up ───────────────────────────────── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
})();

/* ── Active nav link ────────────────────────────────────────── */
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
})();


/* ── Contact / Subscribe form (basic prevent + feedback) ─────── */
(function () {
  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = 'Sent! ✓';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 3500);
    });
  });
})();

/* ── Vagaro popup trigger ───────────────────────────────────── */
(function () {
  document.querySelectorAll('.vagaro-book-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var vagaroBtn = document.querySelector('a.loader-btn-html');
      if (vagaroBtn) vagaroBtn.click();
    });
  });
})();
