import { html, raw } from '../utils/dom.js';
import { DIFFICULTY, STATUS, formatDate } from '../utils/format.js';
import { highlight } from '../utils/highlight.js';
import { has, getState } from '../state.js';
import { icon } from './icons.js';

export function difficultyBadge(level) {
  const info = DIFFICULTY[level];
  if (!info) return '';
  const pips = [1, 2, 3].map((n) => html`<i class="${n <= info.level ? 'on' : ''}"></i>`);
  return html`<span class="difficulty" title="Dificultad: ${info.label}"><span class="pips" aria-hidden="true">${pips}</span>${info.label}</span>`;
}

export function statusBadge(status) {
  const info = STATUS[status];
  if (!info) return '';
  return html`<span class="status status-${status}" title="${info.hint}">${info.label}</span>`;
}

export function verifiedLine(item) {
  return html`<span class="verified-line">${statusBadge(item.status)}<span class="muted small">${item.lastVerified ? `Verificado: ${formatDate(item.lastVerified)}` : 'Sin verificación de fuentes'}</span></span>`;
}

const LISTS = {
  favorites: { on: 'En favoritos', off: 'Favorito', icon: 'star' },
  readLater: { on: 'Pendiente', off: 'Leer después', icon: 'bookmark' },
  read: { on: 'Leído', off: 'Marcar como leído', icon: 'check' },
};

export function toggleButton(list, ref, { compact = false } = {}) {
  const def = LISTS[list];
  const on = has(list, ref);
  return html`<button type="button" class="btn btn-toggle ${compact ? 'btn-icon' : ''}" data-toggle="${list}" data-ref="${ref}" aria-pressed="${String(on)}" data-on="${def.on}" data-off="${def.off}" aria-label="${on ? def.on : def.off}" title="${on ? def.on : def.off}">
    ${icon(def.icon, 16)}${compact ? '' : html`<span class="btn-label">${on ? def.on : def.off}</span>`}
  </button>`;
}

export function codeBlock({ code, language = 'text', filename = '' }) {
  return html`<figure class="code">
    <figcaption class="code-head">
      <span class="code-name">${filename || language}</span>
      <button type="button" class="code-copy" data-copy aria-label="Copiar código">${icon('copy', 14)}<span>Copiar</span></button>
    </figcaption>
    <pre tabindex="0"><code>${raw(highlight(code, language))}</code></pre>
  </figure>`;
}

export function emptyState(title, text, action = '') {
  return html`<div class="empty"><p class="empty-title">${title}</p><p class="muted">${text}</p>${action}</div>`;
}

export function sourcesList(sources = []) {
  if (!sources.length) return html`<p class="muted">Sin fuentes registradas todavía.</p>`;
  return html`<ul class="sources">${sources.map((s) => html`<li>
    <a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.title}${icon('external', 13)}</a>
    <span class="muted small">${s.note ?? new URL(s.url).hostname.replace('www.', '')}</span>
  </li>`)}</ul>`;
}

export function chips(items, hrefFor) {
  return html`<ul class="chips">${items.map((item) => {
    const href = hrefFor?.(item);
    return html`<li>${href ? html`<a class="chip" href="${href}">${item}</a>` : html`<span class="chip chip-plain">${item}</span>`}</li>`;
  })}</ul>`;
}

export function progressBar(done, total, label) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return html`<div class="progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="${label ?? 'Progreso'}"><span style="width:${pct}%"></span></div>`;
}

export const readCount = (concepts) => {
  const read = new Set(getState().read);
  return concepts.filter((c) => read.has(`article:${c.id}`)).length;
};

export function conceptRow(concept) {
  const read = has('read', `article:${concept.id}`);
  return html`<li class="row ${read ? 'is-read' : ''}">
    <a class="row-link" href="#/article/${concept.id}">
      <span class="row-code">${concept.code}</span>
      <span class="row-body">
        <span class="row-title">${concept.title}${read ? html`<span class="read-mark" title="Leído">${icon('check', 14)}<span class="sr-only">Leído</span></span>` : ''}</span>
        <span class="row-desc">${concept.description}</span>
      </span>
      <span class="row-meta">${difficultyBadge(concept.difficulty)}${statusBadge(concept.status)}</span>
    </a>
  </li>`;
}

// Grupo de botones-filtro accesible; la página gestiona el estado vía data-filter/data-value.
export function filterGroup(name, label, options, current) {
  return html`<div class="filter-group" role="group" aria-label="${label}">
    <span class="filter-label">${label}</span>
    ${options.map((o) => html`<button type="button" class="filter ${current === o.value ? 'on' : ''}" data-filter="${name}" data-value="${o.value}" aria-pressed="${String(current === o.value)}">${o.label}</button>`)}
  </div>`;
}
