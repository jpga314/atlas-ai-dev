import { $, $$, html } from '../utils/dom.js';
import { plural } from '../utils/format.js';
import { replaceHash } from '../router.js';
import { search, TYPE_LABELS } from '../search.js';
import { highlightHits } from '../components/search-box.js';
import { emptyState, filterGroup } from '../components/ui.js';

let activeType = 'all';

function results(query) {
  const { tokens, results: all } = search(query, { limit: 200 });
  const counts = all.reduce((acc, r) => ({ ...acc, [r.type]: (acc[r.type] ?? 0) + 1 }), {});
  const options = [{ value: 'all', label: `Todo (${all.length})` }, ...Object.entries(TYPE_LABELS)
    .filter(([type]) => counts[type])
    .map(([type, label]) => ({ value: type, label: `${label} (${counts[type]})` }))];
  const type = counts[activeType] ? activeType : 'all';
  const shown = all.filter((r) => type === 'all' || r.type === type);

  if (!query.trim()) return emptyState('Escribe qué quieres encontrar', 'La búsqueda recorre artículos, herramientas, comparativas, ejemplos, timeline y arquitecturas.');
  if (!all.length) return emptyState(`Sin resultados para “${query}”`, 'Revisa la ortografía o usa un término más general. Los nombres técnicos están en inglés, por ejemplo “subagent”.');

  return html`<div class="filters">${filterGroup('type', 'Tipo', options, type)}</div>
    <p class="small muted result-count" aria-live="polite">${plural(shown.length, 'resultado')}</p>
    <ol class="search-results">${shown.map((r) => html`<li><a href="${r.href}">
      <span class="eyebrow">${TYPE_LABELS[r.type]} · ${r.subtitle}</span>
      <strong>${highlightHits(r.title, tokens)}</strong>
      <span class="small muted">${highlightHits(r.snippet, tokens)}</span>
    </a></li>`)}</ol>`;
}

export function searchPage({ query }) {
  const q = query.q ?? '';
  return {
    title: q ? `Buscar: ${q}` : 'Buscar',
    crumbs: [{ label: 'Búsqueda' }],
    content: html`<div class="page">
      <header class="page-head">
        <p class="eyebrow">Búsqueda global</p>
        <h1>Resultados</h1>
        <div class="filter-text filter-text-lg"><input type="search" id="search-page-input" value="${q}" aria-label="Término de búsqueda" placeholder="Buscar en el atlas…" autocomplete="off"></div>
      </header>
      <div id="search-output">${results(q)}</div>
    </div>`,
    mount(root) {
      const input = $('#search-page-input', root);
      const output = $('#search-output', root);
      input.addEventListener('input', () => {
        output.innerHTML = results(input.value).toString();
        replaceHash(`#/search?q=${encodeURIComponent(input.value)}`);
      });
      root.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-filter="type"]');
        if (!btn) return;
        activeType = btn.dataset.value;
        output.innerHTML = results(input.value).toString();
        $$('[data-filter="type"]', root).find((b) => b.dataset.value === activeType)?.focus();
      });
    },
  };
}
