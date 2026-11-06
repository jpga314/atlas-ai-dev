import { db } from '../data-loader.js';
import { $, $$, html, raw } from '../utils/dom.js';
import { plural } from '../utils/format.js';
import { getState, has, setActivePath, subscribe } from '../state.js';
import { replaceHash } from '../router.js';
import { icon } from '../components/icons.js';
import { difficultyBadge, progressBar, readCount, toggleButton } from '../components/ui.js';

const refOf = (id) => `article:${id}`;
const isRead = (id) => has('read', refOf(id));

// Mapa en miniatura: una línea ondulada con una estación por concepto y un hueco entre etapas.
export function miniMap(path) {
  const width = 280;
  const height = 44;
  const total = path.steps.length + path.stages.length - 1;
  const step = (width - 16) / Math.max(total, 1);
  const points = [];
  let slot = 0;
  path.stages.forEach((stage) => {
    stage.allNodes.forEach((node) => {
      const x = 8 + slot * step;
      points.push({ x, y: height / 2 + Math.sin(slot * 0.9) * 11, read: isRead(node.concept), optional: node.optional });
      slot += 1;
    });
    slot += 1;
  });
  const line = points.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const dots = points.map((p) => `<circle class="mm-dot ${p.read ? 'done' : ''}" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${p.optional ? 2.6 : 4}"/>`).join('');
  return raw(`<svg class="mini-map" viewBox="0 0 ${width} ${height}" aria-hidden="true"><path d="${line}"/>${dots}</svg>`);
}

function roadmapCard(path) {
  const done = readCount(path.concepts);
  return html`<li class="reveal"><a class="rm-card" href="#/roadmaps/${path.id}">
    <span class="eyebrow">${path.level} · ${plural(path.stages.length, 'etapa')} · ${plural(path.concepts.length, 'concepto')}${path.id === getState().activePath ? ' · Activo' : ''}</span>
    <strong>${path.title}</strong>
    <span class="muted small">${path.description}</span>
    ${miniMap(path)}
    <span class="path-progress">${progressBar(done, path.concepts.length, `Progreso en ${path.title}`)}<span class="small muted">${done}/${path.concepts.length}</span></span>
  </a></li>`;
}

export function pathsPage() {
  return {
    title: 'Roadmaps',
    crumbs: [{ label: 'Roadmaps' }],
    liveState: true,
    content: html`<div class="page">
      <header class="page-head">
        <p class="eyebrow">Roadmaps</p>
        <h1>Elige tu camino</h1>
        <p class="lead">Mapas visuales para aprender en orden. La línea principal es lo esencial y las ramas son opcionales. El progreso avanza a medida que marcas artículos como leídos.</p>
      </header>
      <ul class="rm-grid">${db.paths.map(roadmapCard)}</ul>
    </div>`,
  };
}

function station(node, kind) {
  const concept = db.conceptById.get(node.concept);
  return html`<button type="button" class="rm-node rm-${kind}" data-node="${node.concept}" aria-pressed="false">
    <span class="rm-dot" aria-hidden="true">${icon('check', 12)}</span>
    <span class="rm-node-text"><strong>${concept.title}</strong>${kind === 'branch' ? html`<small>Opcional</small>` : ''}</span>
  </button>`;
}

function panel(path, id) {
  const node = path.allNodes.find((n) => n.concept === id);
  const concept = db.conceptById.get(id);
  const index = path.concepts.indexOf(concept);
  const next = path.concepts.slice(index + 1).find((c) => !isRead(c.id));
  return html`<button type="button" class="rm-panel-close btn-ghost" data-close-panel aria-label="Cerrar detalle">${icon('close', 18)}</button>
    <p class="eyebrow">${concept.code} · ${node.optional ? 'Rama opcional' : 'Línea principal'}</p>
    <h2>${concept.title}</h2>
    <p class="rm-why">${node.why}</p>
    <p class="muted">${concept.description}</p>
    <p class="meta-line">${difficultyBadge(concept.difficulty)}</p>
    <div class="rm-panel-actions">
      <a class="btn btn-primary" href="#/article/${id}">Leer el artículo ${icon('arrowRight', 15)}</a>
      ${toggleButton('read', refOf(id))}
    </div>
    ${next ? html`<button type="button" class="link-btn rm-next" data-goto="${next.id}">Siguiente sin leer: ${next.title} ${icon('arrowRight', 14)}</button>` : ''}`;
}

export function pathDetailPage({ params, query }) {
  const path = db.pathById.get(params.id);
  if (!path) return null;
  const isActive = getState().activePath === path.id;

  return {
    title: path.title,
    crumbs: [{ label: 'Roadmaps', href: '#/roadmaps' }, { label: path.title }],
    content: html`<div class="page roadmap">
      <header class="page-head">
        <p class="eyebrow">${path.level} · ${plural(path.stages.length, 'etapa')}</p>
        <h1>${path.title}</h1>
        <p class="lead">${path.description}</p>
        <div class="page-progress" id="rm-progress"></div>
        <div class="art-actions">
          <button type="button" class="btn" id="rm-active" aria-pressed="${String(isActive)}">${isActive ? 'Roadmap activo' : 'Fijar como activo'}</button>
        </div>
      </header>
      <div class="legend">
        <span><i class="rm-key"></i>Línea principal</span>
        <span><i class="rm-key rm-key-branch"></i>Rama opcional</span>
        <span><i class="rm-key rm-key-done"></i>Leído</span>
      </div>
      <div class="rm-layout">
        <ol class="rm-map">
          ${path.stages.map((stage, s) => html`<li class="rm-stage reveal">
            <header class="rm-stage-head">
              <span class="rm-stage-num">${String(s + 1).padStart(2, '0')}</span>
              <div><h2>${stage.title}</h2><p class="muted small">${stage.goal}</p></div>
            </header>
            <ul class="rm-line">
              ${stage.nodes.map((node) => html`<li class="rm-row" data-row="${node.concept}">
                ${station(node, 'core')}
                ${node.branches?.length ? html`<div class="rm-branches">${node.branches.map((b) => station(b, 'branch'))}</div>` : ''}
              </li>`)}
            </ul>
          </li>`)}
        </ol>
        <aside class="rm-panel" id="rm-panel" aria-live="polite"></aside>
      </div>
    </div>`,
    mount(root) {
      const panelEl = $('#rm-panel', root);
      const progressEl = $('#rm-progress', root);

      const select = (id, { focus = false, reveal = true } = {}) => {
        $$('.rm-node', root).forEach((n) => {
          const on = n.dataset.node === id;
          n.classList.toggle('selected', on);
          n.setAttribute('aria-pressed', String(on));
          if (on && focus) n.focus({ preventScroll: true });
          if (on && reveal) n.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        });
        panelEl.innerHTML = panel(path, id).toString();
        panelEl.classList.add('open');
        panelEl.classList.remove('swap');
        void panelEl.offsetWidth;
        panelEl.classList.add('swap');
        replaceHash(`#/roadmaps/${path.id}?node=${id}`);
      };

      const paint = () => {
        const firstUnread = path.concepts.find((c) => !isRead(c.id));
        $$('.rm-node', root).forEach((n) => {
          n.classList.toggle('done', isRead(n.dataset.node));
          n.classList.toggle('current', n.dataset.node === firstUnread?.id);
        });
        $$('.rm-row', root).forEach((r) => r.classList.toggle('done', isRead(r.dataset.row)));
        const done = readCount(path.concepts);
        progressEl.innerHTML = html`${progressBar(done, path.concepts.length, 'Progreso en el roadmap')}<span class="small muted">${done} de ${path.concepts.length} leídos</span>`.toString();
        const current = $('.rm-node.selected', root)?.dataset.node;
        if (current) {
          const nextBtn = $('.rm-next', panelEl);
          const index = path.concepts.findIndex((c) => c.id === current);
          const next = path.concepts.slice(index + 1).find((c) => !isRead(c.id));
          if (nextBtn && next) {
            nextBtn.dataset.goto = next.id;
            nextBtn.innerHTML = html`Siguiente sin leer: ${next.title} ${icon('arrowRight', 14)}`.toString();
          } else if (nextBtn) nextBtn.remove();
        }
      };

      root.addEventListener('click', (e) => {
        const node = e.target.closest('.rm-node');
        if (node) { select(node.dataset.node, { reveal: false }); return; }
        const goto = e.target.closest('[data-goto]');
        if (goto) { select(goto.dataset.goto, { focus: true }); return; }
        if (e.target.closest('[data-close-panel]')) panelEl.classList.remove('open');
      });
      $('#rm-active', root).addEventListener('click', (e) => {
        const on = getState().activePath !== path.id;
        setActivePath(on ? path.id : null);
        e.target.textContent = on ? 'Roadmap activo' : 'Fijar como activo';
        e.target.setAttribute('aria-pressed', String(on));
      });

      paint();
      const initial = path.allNodes.find((n) => n.concept === query.node)?.concept
        ?? path.concepts.find((c) => !isRead(c.id))?.id
        ?? path.concepts[0].id;
      select(initial, { reveal: false });
      // En móvil el panel es una hoja inferior: no se abre hasta que se toca una estación.
      if (!query.node && window.matchMedia('(max-width: 1100px)').matches) panelEl.classList.remove('open');
      return subscribe(paint);
    },
  };
}
