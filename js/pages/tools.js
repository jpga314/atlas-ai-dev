import { db } from '../data-loader.js';
import { $, $$, html } from '../utils/dom.js';
import { normalize, plural, formatDate } from '../utils/format.js';
import { richInline, rich } from '../utils/rich-text.js';
import { visit } from '../state.js';
import { go } from '../router.js';
import { icon } from '../components/icons.js';
import { chips, emptyState, filterGroup, sourcesList, statusBadge, toggleButton } from '../components/ui.js';

const MAX_COMPARE = 3;
const selected = new Set();
let activeCategory = 'all';
let text = '';

const CAP_LABELS = { yes: 'Sí', partial: 'Parcial', no: 'No', unknown: 'Sin verificar' };

function capCell(cap) {
  const value = cap?.value ?? 'unknown';
  return html`<span class="cap cap-${value}"><i aria-hidden="true"></i>${CAP_LABELS[value]}</span>${cap?.note ? html`<span class="cap-note">${richInline(cap.note)}</span>` : ''}`;
}

function toolCard(tool) {
  const on = selected.has(tool.id);
  return html`<li class="tool-card">
    <a class="tool-main" href="#/tools/${tool.id}">
      <span class="eyebrow">${tool.categoryLabel}</span>
      <strong>${tool.name}</strong>
      <span class="muted small">${tool.description}</span>
    </a>
    <div class="tool-foot">
      ${statusBadge(tool.status)}
      <label class="check">
        <input type="checkbox" data-compare="${tool.id}" ${on ? html`checked` : ''}>
        <span>Comparar</span>
      </label>
    </div>
  </li>`;
}

function grid() {
  const q = normalize(text.trim());
  const tools = db.tools.filter((t) => (activeCategory === 'all' || t.category === activeCategory)
    && (!q || normalize(`${t.name} ${t.description} ${t.features.join(' ')}`).includes(q)));
  if (!tools.length) return emptyState('Ninguna herramienta coincide', 'Cambia la categoría o el texto del filtro.');
  return html`<p class="small muted result-count" aria-live="polite">${plural(tools.length, 'herramienta')}</p><ul class="tool-grid">${tools.map(toolCard)}</ul>`;
}

function compareBar() {
  const n = selected.size;
  return html`<span>${n ? `${plural(n, 'herramienta seleccionada', 'herramientas seleccionadas')}` : `Selecciona hasta ${MAX_COMPARE} herramientas para compararlas`}</span>
    <button type="button" class="btn btn-primary" id="do-compare" ${n < 2 ? html`disabled` : ''}>Comparar</button>`;
}

export function toolsPage() {
  const options = [{ value: 'all', label: 'Todas' }, ...db.tools
    .reduce((acc, t) => (acc.some((o) => o.value === t.category) ? acc : [...acc, { value: t.category, label: t.categoryLabel }]), [])];
  return {
    title: 'Tools Explorer',
    crumbs: [{ label: 'Tools Explorer' }],
    content: html`<div class="page">
      <header class="page-head">
        <p class="eyebrow">Explorer</p>
        <h1>Tools Explorer</h1>
        <p class="lead">Fichas de herramientas con funciones comprobadas en su documentación oficial. Cuando no se ha podido confirmar algo, la ficha lo dice en lugar de suponerlo. El sector cambia rápido: revisa siempre la fecha de verificación.</p>
      </header>
      <div class="filters">
        <div class="filter-text">${icon('search', 15)}<input type="search" id="tool-text" value="${text}" placeholder="Filtrar herramientas…" aria-label="Filtrar herramientas por texto"></div>
        ${filterGroup('tool-cat', 'Categoría', options, activeCategory)}
      </div>
      <div class="compare-bar" id="compare-bar">${compareBar()}</div>
      <div id="tool-list">${grid()}</div>
    </div>`,
    mount(root) {
      const list = $('#tool-list', root);
      const bar = $('#compare-bar', root);
      $('#tool-text', root).addEventListener('input', (e) => { text = e.target.value; list.innerHTML = grid().toString(); });
      root.addEventListener('click', (e) => {
        const filter = e.target.closest('[data-filter="tool-cat"]');
        if (filter) {
          activeCategory = filter.dataset.value;
          $$('[data-filter="tool-cat"]', root).forEach((b) => {
            b.classList.toggle('on', b === filter);
            b.setAttribute('aria-pressed', String(b === filter));
          });
          list.innerHTML = grid().toString();
        }
        if (e.target.closest('#do-compare')) go(`#/tools/compare?ids=${[...selected].join(',')}`);
      });
      root.addEventListener('change', (e) => {
        const id = e.target.dataset?.compare;
        if (!id) return;
        if (e.target.checked && selected.size >= MAX_COMPARE) {
          e.target.checked = false;
          return;
        }
        if (e.target.checked) selected.add(id); else selected.delete(id);
        bar.innerHTML = compareBar().toString();
      });
    },
  };
}

export function toolDetailPage({ params }) {
  const tool = db.toolById.get(params.id);
  if (!tool) return null;
  const ref = `tool:${tool.id}`;
  const list = (title, items, cls = '') => html`<section class="art-section"><h2>${title}</h2><ul class="pros-cons ${cls}">${items.map((i) => html`<li>${richInline(i)}</li>`)}</ul></section>`;
  const related = tool.relatedConcepts.map((id) => db.conceptById.get(id)).filter(Boolean);

  return {
    title: tool.name,
    crumbs: [{ label: 'Tools Explorer', href: '#/tools' }, { label: tool.name }],
    content: html`<article class="page article">
      <header class="art-head">
        <p class="eyebrow">${tool.categoryLabel}</p>
        <h1>${tool.name}</h1>
        <p class="art-lede">${richInline(tool.description)}</p>
        <div class="art-meta">${statusBadge(tool.status)}<span class="small muted">Última verificación: ${formatDate(tool.lastVerified)}</span></div>
        ${tool.editorialNote ? html`<p class="callout">${icon('info', 16)}<span>${richInline(tool.editorialNote)}</span></p>` : ''}
        <div class="art-actions">
          ${toggleButton('favorites', ref)}
          <a class="btn" href="${tool.docs}" target="_blank" rel="noopener noreferrer">Documentación oficial ${icon('external', 14)}</a>
        </div>
      </header>
      <div class="reading tool-body">
        ${list('Funcionalidades', tool.features)}
        ${list('Casos de uso', tool.useCases)}
        ${list('Ventajas', tool.advantages, 'pros')}
        ${list('Limitaciones', tool.limitations, 'cons')}
        ${tool.capabilities ? html`<section class="art-section"><h2>Capacidades contrastadas</h2>
          <table class="data-table"><tbody>
            ${db.capabilityLabels.map(([key, label]) => html`<tr><th scope="row">${label}</th><td>${capCell(tool.capabilities[key])}</td></tr>`)}
          </tbody></table></section>` : ''}
        <section class="art-section"><h2>Tecnologías relacionadas</h2>
          ${related.length ? html`<ul class="chips">${related.map((c) => html`<li><a class="chip" href="#/article/${c.id}">${c.title}</a></li>`)}</ul>` : ''}
          ${tool.technologies?.length ? chips(tool.technologies) : ''}
        </section>
        <section class="art-section"><h2>Fuentes</h2>${sourcesList(tool.sources)}</section>
      </div>
    </article>`,
    mount() { visit(ref); },
  };
}

export function toolComparePage({ query }) {
  const tools = (query.ids ?? '').split(',').map((id) => db.toolById.get(id)).filter(Boolean).slice(0, MAX_COMPARE);
  const crumbs = [{ label: 'Tools Explorer', href: '#/tools' }, { label: 'Comparar' }];
  if (tools.length < 2) {
    return {
      title: 'Comparar herramientas',
      crumbs,
      content: html`<div class="page">${emptyState('Faltan herramientas por comparar', 'Selecciona al menos dos en el Tools Explorer.', html`<a class="btn btn-primary" href="#/tools">Ir a Tools Explorer</a>`)}</div>`,
    };
  }
  const textRow = (label, fn) => html`<tr><th scope="row">${label}</th>${tools.map((t) => html`<td>${fn(t)}</td>`)}</tr>`;
  const miniList = (items) => html`<ul class="mini-list">${items.map((i) => html`<li>${richInline(i)}</li>`)}</ul>`;
  return {
    title: 'Comparar herramientas',
    crumbs,
    content: html`<div class="page">
      <header class="page-head">
        <p class="eyebrow">Comparación</p>
        <h1>${tools.map((t) => t.name).join(' · ')}</h1>
        <p class="lead">“Sin verificar” significa que no se ha podido confirmar en la documentación consultada, no que la función no exista.</p>
      </header>
      <div class="table-scroll" tabindex="0" role="region" aria-label="Tabla comparativa de herramientas">
        <table class="data-table compare-table">
          <thead><tr><td></td>${tools.map((t) => html`<th scope="col"><a href="#/tools/${t.id}">${t.name}</a></th>`)}</tr></thead>
          <tbody>
            ${textRow('Categoría', (t) => t.categoryLabel)}
            ${textRow('Descripción', (t) => richInline(t.description))}
            ${db.capabilityLabels.map(([key, label]) => textRow(label, (t) => (t.capabilities ? capCell(t.capabilities[key]) : html`<span class="muted">No aplica</span>`)))}
            ${textRow('Casos de uso', (t) => miniList(t.useCases))}
            ${textRow('Ventajas', (t) => miniList(t.advantages))}
            ${textRow('Limitaciones', (t) => miniList(t.limitations))}
            ${textRow('Verificación', (t) => html`${statusBadge(t.status)} <span class="small muted">${formatDate(t.lastVerified)}</span>`)}
            ${textRow('Documentación', (t) => html`<a href="${t.docs}" target="_blank" rel="noopener noreferrer">Oficial ${icon('external', 13)}</a>`)}
          </tbody>
        </table>
      </div>
    </div>`,
  };
}
