import { db } from '../data-loader.js';
import { $, $$, html } from '../utils/dom.js';
import { normalize, plural } from '../utils/format.js';
import { has } from '../state.js';
import { conceptRow, emptyState, filterGroup, progressBar, readCount } from '../components/ui.js';
import { icon } from '../components/icons.js';

const FILTERS = {
  difficulty: [
    { value: 'all', label: 'Todas' }, { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' }, { value: 'advanced', label: 'Advanced' },
  ],
  status: [
    { value: 'all', label: 'Todos' }, { value: 'verified', label: 'Verified' },
    { value: 'needs-review', label: 'Needs review' }, { value: 'draft', label: 'Draft' },
  ],
  progress: [
    { value: 'all', label: 'Todo' }, { value: 'unread', label: 'Sin leer' }, { value: 'read', label: 'Leídos' },
  ],
};

// Los filtros sobreviven a la navegación dentro de la enciclopedia durante la sesión.
const filters = { difficulty: 'all', status: 'all', progress: 'all', text: '' };

function applyFilters(concepts) {
  const text = normalize(filters.text.trim());
  return concepts.filter((c) => {
    if (filters.difficulty !== 'all' && c.difficulty !== filters.difficulty) return false;
    if (filters.status !== 'all' && c.status !== filters.status) return false;
    const read = has('read', `article:${c.id}`);
    if (filters.progress === 'read' && !read) return false;
    if (filters.progress === 'unread' && read) return false;
    if (text && !normalize(`${c.title} ${c.description} ${(c.aliases ?? []).join(' ')}`).includes(text)) return false;
    return true;
  });
}

function renderList(category) {
  const scope = category ? [category] : db.categories;
  const groups = scope.map((cat) => ({ cat, concepts: applyFilters(db.conceptsByCategory.get(cat.id)) }));
  const total = groups.reduce((sum, g) => sum + g.concepts.length, 0);
  if (!total) {
    return html`${emptyState('Ningún concepto coincide con estos filtros', 'Quita algún filtro o prueba con otro texto.', html`<button type="button" class="btn" data-clear-filters>Quitar filtros</button>`)}`;
  }
  return html`<p class="small muted result-count" aria-live="polite">${plural(total, 'concepto')}</p>
    ${groups.filter((g) => g.concepts.length).map((g) => html`<section class="cat-section">
      ${category ? '' : html`<header class="cat-section-head">
        <span class="atlas-letter">${g.cat.letter}</span>
        <h2><a href="#/encyclopedia/${g.cat.id}">${g.cat.name}</a></h2>
      </header>`}
      <ul class="rows">${g.concepts.map(conceptRow)}</ul>
    </section>`)}`;
}

function controls() {
  return html`<div class="filters">
    <div class="filter-text">
      ${icon('search', 15)}
      <input type="search" id="enc-text" placeholder="Filtrar esta lista…" aria-label="Filtrar conceptos por texto" value="${filters.text}">
    </div>
    ${filterGroup('difficulty', 'Dificultad', FILTERS.difficulty, filters.difficulty)}
    ${filterGroup('status', 'Estado', FILTERS.status, filters.status)}
    ${filterGroup('progress', 'Progreso', FILTERS.progress, filters.progress)}
  </div>`;
}

export function encyclopediaPage({ params }) {
  const category = params.category ? db.categoryById.get(params.category) : null;
  if (params.category && !category) return null;
  const concepts = category ? db.conceptsByCategory.get(category.id) : db.concepts;
  const done = readCount(concepts);

  return {
    title: category ? category.name : 'Encyclopedia',
    crumbs: category ? [{ label: 'Encyclopedia', href: '#/encyclopedia' }, { label: category.name }] : [{ label: 'Encyclopedia' }],
    content: html`<div class="page">
      <header class="page-head">
        ${category ? html`<p class="eyebrow">Región ${category.letter}</p>` : html`<p class="eyebrow">Knowledge base</p>`}
        <h1>${category ? category.name : 'Encyclopedia'}</h1>
        <p class="lead">${category ? category.description : 'Ocho regiones de conocimiento: de los fundamentos de ingeniería a los componentes de un agente. Todos los artículos siguen la misma estructura.'}</p>
        <div class="page-progress">${progressBar(done, concepts.length, 'Artículos leídos')}<span class="small muted">${done} de ${plural(concepts.length, 'artículo')} leídos</span></div>
      </header>
      ${category ? '' : html`<nav class="cat-jump" aria-label="Categorías">${db.categories.map((c) => html`<a href="#/encyclopedia/${c.id}"><b>${c.letter}</b>${c.name}</a>`)}</nav>`}
      ${controls()}
      <div id="enc-list">${renderList(category)}</div>
    </div>`,
    mount(root) {
      const list = $('#enc-list', root);
      const redraw = () => { list.innerHTML = renderList(category).toString(); };
      const syncButtons = () => {
        $$('[data-filter]', root).forEach((btn) => {
          const on = filters[btn.dataset.filter] === btn.dataset.value;
          btn.classList.toggle('on', on);
          btn.setAttribute('aria-pressed', String(on));
        });
      };
      $('#enc-text', root).addEventListener('input', (e) => { filters.text = e.target.value; redraw(); });
      root.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-filter]');
        if (btn) { filters[btn.dataset.filter] = btn.dataset.value; syncButtons(); redraw(); }
        if (e.target.closest('[data-clear-filters]')) {
          Object.assign(filters, { difficulty: 'all', status: 'all', progress: 'all', text: '' });
          $('#enc-text', root).value = '';
          syncButtons();
          redraw();
        }
      });
    },
  };
}
