import { db } from '../data-loader.js';
import { $, $$, html } from '../utils/dom.js';
import { prefersReducedMotion } from '../utils/motion.js';
import { icon } from './icons.js';

const STEP_MS = 1300;
const END_PAUSE_MS = 3500;

const line = (step) => html`<li class="ar-line ar-${step.phase}">${step.text}</li>`;

export function agentRun() {
  const { phases, note } = db.simulations.agentRun;
  return html`<figure class="agent-run" id="agent-run">
    <figcaption class="ar-head">
      <ol class="ar-phases" aria-hidden="true">
        ${phases.map((p) => html`<li data-phase="${p.id}">${p.label}</li>`)}
      </ol>
      <button type="button" class="ar-toggle" id="ar-toggle" aria-pressed="false" aria-label="Pausar la simulación" title="Pausar">${icon('pause', 14)}</button>
    </figcaption>
    <ol class="ar-log" id="ar-log"></ol>
    <p class="ar-note">${note}</p>
  </figure>`;
}

// Reproduce el bucle del agente. Se detiene fuera de pantalla y al salir de la página.
export function startAgentRun(root) {
  const { steps } = db.simulations.agentRun;
  const log = $('#ar-log', root);
  const figure = $('#agent-run', root);
  const toggle = $('#ar-toggle', root);

  if (prefersReducedMotion()) {
    log.innerHTML = steps.map((s) => line(s).toString()).join('');
    toggle.hidden = true;
    return null;
  }

  let index = 0;
  let timer = null;
  let paused = false;
  let visible = true;

  const setPhase = (phase) => {
    $$('[data-phase]', figure).forEach((el) => el.classList.toggle('on', el.dataset.phase === phase));
  };

  const schedule = (delay) => {
    clearTimeout(timer);
    if (!paused && visible && !document.hidden) timer = setTimeout(tick, delay);
  };

  function tick() {
    if (index === 0) log.innerHTML = '';
    const step = steps[index];
    log.insertAdjacentHTML('beforeend', line(step).toString());
    log.scrollTop = log.scrollHeight;
    setPhase(step.phase);
    index = (index + 1) % steps.length;
    schedule(index === 0 ? END_PAUSE_MS : STEP_MS);
  }

  toggle.addEventListener('click', () => {
    paused = !paused;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? 'Reanudar la simulación' : 'Pausar la simulación');
    toggle.title = paused ? 'Reanudar' : 'Pausar';
    toggle.innerHTML = icon(paused ? 'play' : 'pause', 14).toString();
    if (paused) clearTimeout(timer); else schedule(0);
  });

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) schedule(STEP_MS); else clearTimeout(timer);
  });
  observer.observe(figure);

  const onVisibility = () => { if (document.hidden) clearTimeout(timer); else schedule(STEP_MS); };
  document.addEventListener('visibilitychange', onVisibility);

  tick();

  return () => {
    clearTimeout(timer);
    observer.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
  };
}
