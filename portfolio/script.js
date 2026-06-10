/* ============================================
   Pedro Correia Antunes — script.js v2
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Active nav link ── */
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    const path = window.location.pathname;
    if (href && (path.endsWith(href) ||
      (href === 'index.html' && (path === '/' || path.endsWith('/'))))) {
      link.classList.add('active');
    }
  });

  /* ── Mobile hamburger ── */
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
      })
    );
  }

  /* ── Scroll fade-in (IntersectionObserver) ── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

  /* ── Theme toggle ── */
  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light');
      themeBtn.textContent = 'escuro';
    }
    themeBtn.addEventListener('click', () => {
      const light = document.body.classList.toggle('light');
      localStorage.setItem('theme', light ? 'light' : 'dark');
      themeBtn.textContent = light ? 'escuro' : 'claro';
    });
  }

  /* ── Typing animation (role line) ── */
  const roleEl = document.getElementById('heroRole');
  if (roleEl) {
    const words = ['estudante de CC', 'dev', 'curioso por natureza', 'open to work'];
    let w = 0, c = 0, del = false;
    function tick() {
      const word = words[w];
      if (!del) {
        roleEl.textContent = word.slice(0, ++c);
        if (c === word.length) { del = true; return setTimeout(tick, 1600); }
      } else {
        roleEl.textContent = word.slice(0, --c);
        if (c === 0) { del = false; w = (w + 1) % words.length; }
      }
      setTimeout(tick, del ? 55 : 90);
    }
    setTimeout(tick, 700);
  }

  /* ── Terminal animation (contact page) ── */
  const termBody = document.getElementById('termBody');
  if (termBody) {
    const script = [
      { k: 'cmd', v: 'whoami' },
      { k: 'out', v: 'pedro_correia_antunes' },
      { k: 'cmd', v: 'cat status.json' },
      { k: 'out', v: '{ "disponivel": true, "local": "Recife, PE" }' },
      { k: 'cmd', v: 'echo "bora construir algo?"' },
      { k: 'out', v: 'bora construir algo?' },
      { k: 'cur', v: '' },
    ];
    let i = 0;
    function next() {
      if (i >= script.length) return;
      const l = script[i++];
      const div = document.createElement('div');
      if (l.k === 'cmd') {
        div.className = 'terminal-line';
        div.innerHTML = `<span class="t-prompt">→</span><span class="t-cmd"> ${l.v}</span>`;
      } else if (l.k === 'out') {
        div.className = 't-out';
        div.textContent = l.v;
      } else {
        div.className = 'terminal-line';
        div.innerHTML = `<span class="t-prompt">→</span> <span class="t-cursor"></span>`;
      }
      termBody.appendChild(div);
      setTimeout(next, l.k === 'out' ? 180 : 380);
    }
    setTimeout(next, 500);
  }

  /* ── Back to top ── */
  const backTop = document.getElementById('backTop');
  if (backTop) backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── Subtle parallax on hero photo ── */
  const heroPhoto = document.querySelector('.hero-photo');
  if (heroPhoto) {
    window.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      heroPhoto.style.transform = `translate(${x * 0.4}px, ${y * 0.3}px)`;
    }, { passive: true });
  }

  /* ── Nav hide on scroll down ── */
  let lastY = 0;
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.style.transition = 'transform 0.28s ease';
    nav.style.transform  = (y > lastY && y > 100) ? 'translateY(-100%)' : 'translateY(0)';
    lastY = y;
  }, { passive: true });

  /* ── Subtle ambient glow following cursor ── */
  const glow = document.createElement('div');
  Object.assign(glow.style, {
    position: 'fixed', pointerEvents: 'none', zIndex: '9997',
    width: '500px', height: '500px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(45,74,62,0.06) 0%, transparent 70%)',
    transform: 'translate(-50%,-50%)', top: '0', left: '0',
    transition: 'opacity 0.4s ease',
  });
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  }, { passive: true });

});
