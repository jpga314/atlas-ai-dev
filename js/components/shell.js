import { db } from '../data-loader.js';
import { $, html } from '../utils/dom.js';
import { getState, setPref, subscribe } from '../state.js';
import { icon } from './icons.js';
import { progressBar, readCount } from './ui.js';
import { attachSearchBox } from './search-box.js';

const NAV = [
  { href: '#/', match: /^\/$/, label: 'Inicio', icon: 'home' },
  { href: '#/encyclopedia', match: /^\/(encyclopedia|article)/, label: 'Encyclopedia', icon: 'book' },
  { href: '#/timeline', match: /^\/timeline/, label: 'Timeline', icon: 'timeline' },
  { href: '#/tools', match: /^\/tools/, label: 'Tools Explorer', icon: 'wrench' },
  { href: '#/compare', match: /^\/compare/, label: 'Comparativas', icon: 'columns' },
  { href: '#/lab', match: /^\/lab/, label: 'Architecture Lab', icon: 'network' },
  { href: '#/playground', match: /^\/playground/, label: 'Playground', icon: 'code' },
  { href: '#/paths', match: /^\/paths/, label: 'Rutas de aprendizaje', icon: 'route' },
];

function renderSidebar() {
  const sidebar = $('#sidebar');
  sidebar.innerHTML = html`
    <a class="brand" href="#/" aria-label="AI Dev Atlas, inicio">
      <span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 32 32" width="26" height="26"><path d="M7 26 16 5l9 21" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="16" cy="19.5" r="3" fill="var(--accent)"/></svg></span>
      <span class="brand-name">AI Dev Atlas</span>
    </a>
    <nav class="nav">
      <ul>
        ${NAV.map((item) => html`<li><a class="nav-link" data-match="${item.match.source}" href="${item.href}">${icon(item.icon)}<span>${item.label}</span></a></li>`)}
      </ul>
      <p class="nav-heading">Índice</p>
      <ul class="nav-cats">
        ${db.categories.map((c) => html`<li><a class="nav-cat" data-cat="${c.id}" href="#/encyclopedia/${c.id}"><span class="nav-letter">${c.letter}</span><span>${c.name}</span></a></li>`)}
      </ul>
    </nav>
    <div class="sidebar-foot">
      <a class="nav-link" data-match="^\\/library" href="#/library">${icon('library')}<span>Mi biblioteca</span></a>
      <div id="sidebar-progress"></div>
    </div>`.toString();
  updateProgress();
}

function updateProgress() {
  const el = $('#sidebar-progress');
  if (!el) return;
  const done = readCount(db.concepts);
  el.innerHTML = html`<p class="small muted progress-label"><span>Tu progreso</span><span>${done} / ${db.concepts.length}</span></p>${progressBar(done, db.concepts.length, 'Artículos leídos')}`.toString();
}

function renderTopbar() {
  const bar = $('#topbar');
  bar.innerHTML = html`
    <button type="button" class="btn-ghost menu-toggle" id="menu-toggle" aria-label="Abrir menú" aria-controls="sidebar" aria-expanded="false">${icon('menu', 20)}</button>
    <div class="search-box" data-search-box role="search">
      <span class="search-icon">${icon('search', 16)}</span>
      <input type="search" id="global-search" placeholder="Buscar conceptos, herramientas, ejemplos…" aria-label="Buscar en todo el atlas" autocomplete="off" spellcheck="false">
      <kbd class="search-kbd" aria-hidden="true">/</kbd>
      <div class="search-panel" hidden></div>
    </div>
    <div class="topbar-actions">
      <a class="btn-ghost" id="top-library" href="#/library" aria-label="Mi biblioteca">${icon('star', 18)}<span class="counter" id="fav-count"></span></a>
      <button type="button" class="btn-ghost" id="theme-toggle" aria-label="Cambiar tema">${icon(getState().prefs.theme === 'dark' ? 'sun' : 'moon', 18)}</button>
    </div>`.toString();
  attachSearchBox($('[data-search-box]', bar));

  $('#theme-toggle').addEventListener('click', () => {
    const next = getState().prefs.theme === 'dark' ? 'light' : 'dark';
    setPref('theme', next);
    $('#theme-toggle').innerHTML = icon(next === 'dark' ? 'sun' : 'moon', 18).toString();
  });
  updateCounter();
}

function updateCounter() {
  const el = $('#fav-count');
  if (!el) return;
  const { favorites, readLater } = getState();
  const n = favorites.length + readLater.length;
  el.textContent = n || '';
  el.hidden = !n;
}

export function setSidebar(open) {
  $('#sidebar').classList.toggle('open', open);
  $('#sidebar-backdrop').hidden = !open;
  document.body.classList.toggle('no-scroll', open);
  const toggleBtn = $('#menu-toggle');
  toggleBtn.setAttribute('aria-expanded', String(open));
  if (open) $('.nav-link', $('#sidebar'))?.focus();
  else if (document.activeElement?.closest('#sidebar')) toggleBtn.focus();
}

export function initShell() {
  renderSidebar();
  renderTopbar();
  subscribe(() => { updateProgress(); updateCounter(); });
  $('#menu-toggle').addEventListener('click', () => setSidebar(!$('#sidebar').classList.contains('open')));
  $('#sidebar-backdrop').addEventListener('click', () => setSidebar(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && $('#sidebar').classList.contains('open')) setSidebar(false);
  });
}

export function updateActiveNav(path) {
  document.querySelectorAll('.nav-link[data-match]').forEach((link) => {
    const active = new RegExp(link.dataset.match).test(path);
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  const articleId = /^\/article\/([^/]+)/.exec(path)?.[1];
  const categoryId = /^\/encyclopedia\/([^/]+)/.exec(path)?.[1] ?? db.conceptById.get(articleId)?.category;
  document.querySelectorAll('.nav-cat').forEach((link) => {
    link.classList.toggle('active', link.dataset.cat === categoryId);
  });
}
