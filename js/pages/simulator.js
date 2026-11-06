import { db } from '../data-loader.js';
import { $, $$, html } from '../utils/dom.js';
import { icon } from '../components/icons.js';

const format = (n) => n.toLocaleString('es-ES');

function statusFor(pct) {
  if (pct >= 100) return { cls: 'over', text: 'Contexto desbordado. El agente tendría que compactar o detenerse.' };
  if (pct >= 80) return { cls: 'high', text: 'Cerca del límite. Las instrucciones pierden peso frente a tanto material intermedio.' };
  if (pct >= 50) return { cls: 'mid', text: 'Va llenándose. Buen momento para pensar qué puedes delegar.' };
  return { cls: 'low', text: 'Hay margen. Cuanto más limpio, más peso tiene lo importante.' };
}

export function simulatorPage() {
  const { capacity, items, actions, note } = db.simulations.contextWindow;
  const fresh = () => ({
    on: Object.fromEntries(items.map((i) => [i.id, i.on])),
    tokens: Object.fromEntries(items.map((i) => [i.id, i.tokens])),
    used: new Set(),
    message: '',
  });
  let state = fresh();

  const total = () => items.reduce((sum, i) => sum + (state.on[i.id] ? state.tokens[i.id] : 0), 0);

  return {
    title: 'Simulador de contexto',
    crumbs: [{ label: 'Playground', href: '#/playground' }, { label: 'Simulador de contexto' }],
    content: html`<div class="page sim">
      <header class="page-head">
        <p class="eyebrow">Interactivo</p>
        <h1>Simulador de contexto</h1>
        <p class="lead">Activa lo que carga tu agente y observa cómo se llena su ventana de contexto. Después, prueba las técnicas para liberarla.</p>
      </header>
      <section class="sim-gauge" aria-label="Uso de la ventana de contexto">
        <div class="sim-numbers"><strong id="sim-pct">0%</strong><span class="muted small" id="sim-tokens"></span></div>
        <div class="sim-bar" id="sim-bar"></div>
        <p class="sim-status" id="sim-status" role="status"></p>
      </section>
      <div class="sim-columns">
        <section>
          <h2 class="section-title small-title">Qué ocupa el contexto</h2>
          <ul class="sim-items">
            ${items.map((item, i) => html`<li>
              <label class="sim-item">
                <input type="checkbox" data-item="${item.id}" ${item.on ? html`checked` : ''} ${item.locked ? html`disabled` : ''}>
                <span class="sim-swatch" style="--i:${i}"></span>
                <span class="sim-item-text"><strong>${item.label}</strong><span class="muted small">${item.note}</span></span>
                <span class="sim-tokens" data-tokens="${item.id}"></span>
              </label>
            </li>`)}
          </ul>
        </section>
        <section>
          <h2 class="section-title small-title">Qué puedes hacer</h2>
          <ul class="sim-actions">
            ${actions.map((a) => html`<li>
              <button type="button" class="btn" data-action="${a.id}">${a.label}</button>
              <p class="muted small">${a.note} <a href="#/article/${a.concept}">Saber más</a></p>
            </li>`)}
          </ul>
          <button type="button" class="link-btn sim-reset" id="sim-reset">${icon('arrowLeft', 14)} Volver al estado inicial</button>
        </section>
      </div>
      <p class="callout">${icon('info', 16)}<span>${note}</span></p>
    </div>`,
    mount(root) {
      const bar = $('#sim-bar', root);
      bar.innerHTML = items.map((item, i) => `<span class="sim-seg" data-seg="${item.id}" style="--i:${i}" title="${item.label}"></span>`).join('');

      const paint = () => {
        const used = total();
        const pct = Math.round((used / capacity) * 100);
        const status = statusFor(pct);
        $('#sim-pct', root).textContent = `${pct}%`;
        $('#sim-tokens', root).textContent = `${format(used)} de ${format(capacity)} tokens (ilustrativo)`;
        const statusEl = $('#sim-status', root);
        statusEl.textContent = state.message || status.text;
        root.querySelector('.sim-gauge').dataset.level = status.cls;
        // Si se desborda, la barra se reescala para mostrar todas las piezas.
        const scale = Math.max(used, capacity);
        items.forEach((item) => {
          const tokens = state.on[item.id] ? state.tokens[item.id] : 0;
          $(`[data-seg="${item.id}"]`, root).style.width = `${(tokens / scale) * 100}%`;
          $(`[data-tokens="${item.id}"]`, root).textContent = format(state.tokens[item.id]);
        });
        $$('[data-action]', root).forEach((btn) => {
          const action = actions.find((a) => a.id === btn.dataset.action);
          const helps = Object.keys(action.effects).some((id) => state.on[id] && state.tokens[id] > action.effects[id]);
          btn.disabled = state.used.has(action.id) || !helps;
        });
      };

      root.addEventListener('change', (e) => {
        const id = e.target.dataset?.item;
        if (!id) return;
        state.on[id] = e.target.checked;
        state.message = '';
        paint();
      });

      root.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-action]');
        if (btn) {
          const action = actions.find((a) => a.id === btn.dataset.action);
          const before = total();
          Object.entries(action.effects).forEach(([id, tokens]) => { state.tokens[id] = Math.min(state.tokens[id], tokens); });
          state.used.add(action.id);
          state.message = `${action.label}: ${format(before - total())} tokens liberados. ${action.note}`;
          paint();
          return;
        }
        if (e.target.closest('#sim-reset')) {
          state = fresh();
          $$('[data-item]', root).forEach((input) => { input.checked = state.on[input.dataset.item]; });
          paint();
        }
      });

      paint();
    },
  };
}
