import { db, resolveRef } from '../data-loader.js';
import { $, html } from '../utils/dom.js';
import { getState, setPref, clearHistory, resetAll } from '../state.js';
import { replaceHash } from '../router.js';
import { emptyState, progressBar, readCount, toggleButton } from '../components/ui.js';

const TABS = [
  { id: 'favorites', label: 'Favoritos', empty: 'Marca con la estrella lo que quieras tener a mano.' },
  { id: 'readLater', label: 'Pendientes', empty: 'Guarda artículos con “Leer después” para retomarlos aquí.' },
  { id: 'history', label: 'Historial', empty: 'Los artículos, herramientas y ejemplos que abras aparecerán aquí.' },
  { id: 'read', label: 'Leídos', empty: 'Marca un artículo como leído para ver tu progreso.' },
  { id: 'progress', label: 'Progreso' },
  { id: 'prefs', label: 'Preferencias' },
];

let currentTab = 'favorites';

function itemList(tab) {
  const state = getState();
  const refs = tab.id === 'history' ? state.history.map((h) => h.ref) : [...state[tab.id]].reverse();
  const items = refs.map((ref) => ({ ref, info: resolveRef(ref) })).filter((x) => x.info);
  if (!items.length) {
    return emptyState(`${tab.label}: nada por aquí todavía`, tab.empty, html`<a class="btn" href="#/encyclopedia">Explorar la enciclopedia</a>`);
  }
  return html`
    ${tab.id === 'history' ? html`<div class="list-tools"><button type="button" class="btn" id="clear-history">Borrar historial</button></div>` : ''}
    <ul class="rows library-rows">${items.map(({ ref, info }) => html`<li class="row">
      <a class="row-link" href="${info.href}">
        <span class="row-code">${info.typeLabel}</span>
        <span class="row-body"><span class="row-title">${info.title}</span><span class="row-desc">${info.meta}</span></span>
      </a>
      ${tab.id === 'history' ? '' : toggleButton(tab.id, ref, { compact: true })}
    </li>`)}</ul>`;
}

function progressView() {
  const total = readCount(db.concepts);
  return html`<div class="progress-view">
    <div class="page-progress">${progressBar(total, db.concepts.length, 'Progreso total')}<span class="small muted">${total} de ${db.concepts.length} artículos leídos</span></div>
    <ul class="progress-cats">${db.categories.map((c) => {
      const list = db.conceptsByCategory.get(c.id);
      const done = readCount(list);
      return html`<li><a href="#/encyclopedia/${c.id}"><span class="nav-letter">${c.letter}</span><span>${c.name}</span></a>${progressBar(done, list.length, `Progreso en ${c.name}`)}<span class="small muted">${done}/${list.length}</span></li>`;
    })}</ul>
  </div>`;
}

const segmented = (name, label, options, current) => html`<fieldset class="pref"><legend>${label}</legend><div class="segmented">
  ${options.map((o) => html`<label><input type="radio" name="${name}" value="${o.value}" ${current === o.value ? html`checked` : ''}><span>${o.label}</span></label>`)}
</div></fieldset>`;

function prefsView() {
  const { prefs } = getState();
  return html`<form id="prefs" class="prefs" onsubmit="return false">
    ${segmented('theme', 'Tema', [{ value: 'dark', label: 'Oscuro' }, { value: 'light', label: 'Claro' }], prefs.theme)}
    ${segmented('readingSize', 'Tamaño de lectura', [{ value: 'sm', label: 'Compacto' }, { value: 'md', label: 'Normal' }, { value: 'lg', label: 'Grande' }], prefs.readingSize)}
    ${segmented('codeWrap', 'Código largo', [{ value: 'off', label: 'Desplazar' }, { value: 'on', label: 'Ajustar línea' }], prefs.codeWrap ? 'on' : 'off')}
    <div class="pref-danger">
      <p class="small muted">Todo se guarda solo en este navegador. Puedes borrarlo cuando quieras.</p>
      <button type="button" class="btn" id="reset-all">Borrar mis datos locales</button>
    </div>
  </form>`;
}

export function libraryPage({ query }) {
  if (query.tab && TABS.some((t) => t.id === query.tab)) currentTab = query.tab;
  const tab = TABS.find((t) => t.id === currentTab);
  const { favorites, readLater, read, history } = getState();
  const counts = { favorites: favorites.length, readLater: readLater.length, read: read.length, history: history.length };
  let body;
  if (tab.id === 'progress') body = progressView();
  else if (tab.id === 'prefs') body = prefsView();
  else body = itemList(tab);

  return {
    title: 'Mi biblioteca',
    crumbs: [{ label: 'Mi biblioteca' }],
    liveState: true,
    content: html`<div class="page">
      <header class="page-head">
        <p class="eyebrow">Solo en este navegador</p>
        <h1>Mi biblioteca</h1>
      </header>
      <nav class="tabs" aria-label="Secciones de la biblioteca">
        ${TABS.map((t) => html`<a href="#/library?tab=${t.id}" ${t.id === tab.id ? html`aria-current="page" class="on"` : ''}>${t.label}${counts[t.id] !== undefined ? html`<b>${counts[t.id]}</b>` : ''}</a>`)}
      </nav>
      <div class="tab-body">${body}</div>
    </div>`,
    mount(root) {
      replaceHash(`#/library?tab=${tab.id}`);
      $('#clear-history', root)?.addEventListener('click', clearHistory);
      const prefs = $('#prefs', root);
      if (prefs) {
        prefs.addEventListener('change', (e) => {
          const { name, value } = e.target;
          setPref(name, name === 'codeWrap' ? value === 'on' : value);
        });
        $('#reset-all', root).addEventListener('click', () => {
          if (window.confirm('¿Borrar favoritos, pendientes, leídos, historial y preferencias de este navegador?')) resetAll();
        });
      }
    },
  };
}
