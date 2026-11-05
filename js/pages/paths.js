import { db } from '../data-loader.js';
import { $, html } from '../utils/dom.js';
import { plural } from '../utils/format.js';
import { getState, has, setActivePath } from '../state.js';
import { icon } from '../components/icons.js';
import { progressBar, readCount, toggleButton } from '../components/ui.js';

const pathConcepts = (path) => path.steps.map((s) => db.conceptById.get(s.concept));

export function pathsPage() {
  const active = getState().activePath;
  return {
    title: 'Rutas de aprendizaje',
    crumbs: [{ label: 'Rutas de aprendizaje' }],
    liveState: true,
    content: html`<div class="page">
      <header class="page-head">
        <p class="eyebrow">Learning paths</p>
        <h1>Rutas de aprendizaje</h1>
        <p class="lead">Recorridos ordenados por la enciclopedia. El progreso se calcula a partir de los artículos que marcas como leídos.</p>
      </header>
      <ul class="path-list path-list-full">
        ${db.paths.map((p) => {
          const done = readCount(pathConcepts(p));
          return html`<li><a href="#/paths/${p.id}">
            <span class="eyebrow">${p.level} · ${plural(p.steps.length, 'paso')}${p.id === active ? ' · Ruta activa' : ''}</span>
            <strong>${p.title}</strong>
            <span class="muted small">${p.description}</span>
            <span class="path-progress">${progressBar(done, p.steps.length, `Progreso en ${p.title}`)}<span class="small muted">${done}/${p.steps.length}</span></span>
          </a></li>`;
        })}
      </ul>
    </div>`,
  };
}

export function pathDetailPage({ params }) {
  const path = db.pathById.get(params.id);
  if (!path) return null;
  const concepts = pathConcepts(path);
  const done = readCount(concepts);
  const nextIndex = concepts.findIndex((c) => !has('read', `article:${c.id}`));
  const isActive = getState().activePath === path.id;

  return {
    title: path.title,
    crumbs: [{ label: 'Rutas de aprendizaje', href: '#/paths' }, { label: path.title }],
    liveState: true,
    content: html`<div class="page">
      <header class="page-head">
        <p class="eyebrow">${path.level} · ${plural(path.steps.length, 'paso')}</p>
        <h1>${path.title}</h1>
        <p class="lead">${path.description}</p>
        <div class="page-progress">${progressBar(done, concepts.length, 'Progreso en la ruta')}<span class="small muted">${done} de ${concepts.length}</span></div>
        <div class="art-actions">
          ${nextIndex >= 0 ? html`<a class="btn btn-primary" href="#/article/${concepts[nextIndex].id}">${done ? 'Continuar' : 'Empezar'}: ${concepts[nextIndex].title}</a>` : html`<span class="btn btn-static">${icon('check', 16)} Ruta completada</span>`}
          <button type="button" class="btn" id="path-active" aria-pressed="${String(isActive)}">${isActive ? 'Ruta activa' : 'Fijar como ruta activa'}</button>
        </div>
      </header>
      <ol class="path-steps">
        ${path.steps.map((step, i) => {
          const c = concepts[i];
          const read = has('read', `article:${c.id}`);
          return html`<li class="${read ? 'done' : ''} ${i === nextIndex ? 'current' : ''}">
            <span class="step-dot">${read ? icon('check', 14) : i + 1}</span>
            <div class="step-body">
              <a href="#/article/${c.id}"><strong>${c.title}</strong></a>
              <p class="muted small">${step.why}</p>
            </div>
            ${toggleButton('read', `article:${c.id}`, { compact: true })}
          </li>`;
        })}
      </ol>
    </div>`,
    mount(root) {
      $('#path-active', root).addEventListener('click', () => setActivePath(isActive ? null : path.id));
    },
  };
}
