import { $, $$ } from './dom.js';

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const AUTO_REVEAL = '.section, .art-section, .rows > .row, .atlas-index > li, .compare-list > li, .example-list > li, .tool-grid > li, .path-list > li, .search-results > li, .tl-lane, .plain-list > li';

function countUp(el) {
  const target = Number(el.dataset.count);
  const start = performance.now();
  const duration = 900;
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - progress) ** 3;
    el.textContent = Math.round(target * eased);
    if (progress < 1 && el.isConnected) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  // Con la pestaña en segundo plano no hay frames: el valor final queda garantizado.
  setTimeout(() => { el.textContent = target; }, duration + 150);
}

// Revela elementos al entrar en pantalla y anima los contadores. Devuelve su limpieza.
export function initMotion(root) {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return null;

  const items = new Set([...$$(AUTO_REVEAL, root), ...$$('.reveal', root)]);
  items.forEach((el) => {
    el.classList.add('reveal', 'pending');
  });

  // El retardo escalonado solo se aplica a los que entran juntos en la misma pasada.
  const observer = new IntersectionObserver((entries) => {
    entries.filter((e) => e.isIntersecting).forEach((entry, i) => {
      entry.target.style.setProperty('--reveal-delay', `${Math.min(i * 45, 300)}ms`);
      entry.target.classList.remove('pending');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -6% 0px' });
  items.forEach((el) => observer.observe(el));

  const counters = new IntersectionObserver((entries) => {
    entries.filter((e) => e.isIntersecting).forEach((entry) => {
      countUp(entry.target);
      counters.unobserve(entry.target);
    });
  });
  $$('[data-count]', root).forEach((el) => {
    el.textContent = '0';
    counters.observe(el);
  });

  return () => {
    observer.disconnect();
    counters.disconnect();
  };
}

// Barra superior con el avance de lectura de la página actual.
export function readingBar() {
  const bar = document.createElement('div');
  bar.className = 'read-bar';
  bar.setAttribute('aria-hidden', 'true');
  $('#topbar').append(bar);
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  return () => {
    window.removeEventListener('scroll', update);
    bar.remove();
  };
}
