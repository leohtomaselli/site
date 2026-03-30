/* =========================================
   RMS TECNOLOGIA — Main JS
   ERP de Gestão de Frotas
   ========================================= */

// ---- Sticky Header ----
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// ---- Hamburger Menu ----
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
  hamburger.classList.toggle('active');
});

nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
    nav.classList.remove('open');
    hamburger.classList.remove('active');
  }
});

// ---- Animated Counter ----
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  if (target === 0) return;
  const duration = 1800;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

const statsSection = document.querySelector('.hero__stats');
let countersStarted = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      document.querySelectorAll('.stat__number').forEach(animateCounter);
    }
  });
}, { threshold: 0.4 });

if (statsSection) statsObserver.observe(statsSection);

// ---- Scroll Reveal ----
const revealElements = document.querySelectorAll(
  '.module-card, .how-step, .price-example, .pricing-box, .partner-logo, .contact__info, .contact__form, .stat'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
  revealObserver.observe(el);
});

document.head.insertAdjacentHTML('beforeend', `
  <style>
    .revealed { opacity: 1 !important; transform: translateY(0) !important; }
  </style>
`);

// ---- Active Nav Link ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

document.head.insertAdjacentHTML('beforeend', `
  <style>
    .nav__link.active { color: var(--color-accent) !important; }
    .header.scrolled .nav__link.active { color: var(--color-secondary) !important; }
  </style>
`);

// ---- Animate dashboard bars on load ----
window.addEventListener('load', () => {
  document.querySelectorAll('.dash-bar').forEach((bar, i) => {
    bar.style.transform = 'scaleY(0)';
    bar.style.transformOrigin = 'bottom';
    bar.style.transition = `transform 0.5s ease ${0.3 + i * 0.07}s`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { bar.style.transform = 'scaleY(1)'; });
    });
  });
});

// ---- Contact Form ----
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    // TODO: integrate with real backend/API
    setTimeout(() => {
      btn.textContent = 'Solicitação enviada!';
      btn.style.background = '#10B981';
      form.reset();
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.disabled = false;
      }, 3500);
    }, 1200);
  });
}

// ---- Hamburger animation ----
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .hamburger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .hamburger.active span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    .hamburger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  </style>
`);
