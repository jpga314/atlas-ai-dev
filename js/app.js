import { loadData } from './data-loader.js';
import { buildIndex } from './search.js';
import { route, match, parseHash, startRouter, refresh } from './router.js';
import { applyPrefs, subscribe, toggle, has, setPref } from './state.js';
import { $, $$, html, toast } from './utils/dom.js';
import { initShell, setSidebar, updateActiveNav } from './components/shell.js';
import { icon } from './components/icons.js';
import { initMotion } from './utils/motion.js';
import { emptyState } from './components/ui.js';

import { dashboardPage } from './pages/dashboard.js';
import { encyclopediaPage } from './pages/encyclopedia.js';
import { articlePage } from './pages/article.js';
import { timelinePage } from './pages/timeline.js';
import { toolsPage, toolDetailPage, toolComparePage } from './pages/tools.js';
import { compareIndexPage, comparisonPage, customComparePage } from './pages/compare.js';
import { labPage } from './pages/lab.js';
import { playgroundPage, examplePage, realWorldPage } from './pages/playground.js';
import { pathsPage, pathDetailPage } from './pages/paths.js';
import { libraryPage } from './pages/library.js';
import { searchPage } from './pages/search-results.js';
import { simulatorPage } from './pages/simulator.js';

route('/', dashboardPage);
route('/encyclopedia', encyclopediaPage);
route('/encyclopedia/:category', encyclopediaPage);
route('/article/:id', articlePage);
route('/timeline', timelinePage);
route('/timeline/:id', timelinePage);
route('/tools', toolsPage);
route('/tools/compare', toolComparePage);
route('/tools/:id', toolDetailPage);
route('/compare', compareIndexPage);
route('/compare/custom', customComparePage);
route('/compare/:id', comparisonPage);
route('/lab', labPage);
route('/lab/:id', labPage);
route('/playground', playgroundPage);
route('/playground/real-world', realWorldPage);
route('/playground/context-simulator', simulatorPage);
route('/playground/:id', examplePage);
route('/roadmaps', pathsPage);
route('/roadmaps/:id', pathDetailPage);
route('/paths', pathsPage);
route('/paths/:id', pathDetailPage);
route('/library', libraryPage);
route('/search', searchPage);

const notFound = () => ({
  title: 'Página no encontrada',
  crumbs: [],
  content: html`<div class="page">${emptyState('Esta coordenada no está en el mapa', 'La dirección no corresponde a ninguna sección ni artículo del atlas.', html`<a class="btn btn-primary" href="#/">Volver al inicio</a>`)}</div>`,
});

let liveState = false;
let cleanup = null;

function renderCrumbs(crumbs) {
  const el = $('#crumbs');
  el.hidden = !crumbs?.length;
  if (!crumbs?.length) { el.innerHTML = ''; return; }
  el.innerHTML = html`<ol>${[{ label: 'Inicio', href: '#/' }, ...crumbs].map((c, i, all) => html`<li>${i < all.length - 1 && c.href
    ? html`<a href="${c.href}">${c.label}</a>${icon('chevron', 12)}`
    : html`<span aria-current="page">${c.label}</span>`}</li>`)}</ol>`.toString();
}

function render({ resetScroll, keepFocus, initial } = {}) {
  const { path, query } = parseHash();
  const matched = match(path);
  const page = matched ? matched.handler({ params: matched.params, query }) ?? notFound() : notFound();
  const view = $('#view');
  const focusKey = keepFocus && document.activeElement?.dataset?.ref
    ? `[data-toggle="${document.activeElement.dataset.toggle}"][data-ref="${document.activeElement.dataset.ref}"]`
    : null;

  cleanup?.();
  document.title = page.title ? `${page.title} · AI Dev Atlas` : 'AI Dev Atlas';
  renderCrumbs(page.crumbs);
  // Un contenedor nuevo por render evita acumular listeners entre páginas.
  const holder = document.createElement('div');
  holder.innerHTML = page.content.toString();
  view.replaceChildren(holder);
  const stopPage = page.mount?.(holder) ?? null;
  // Al refrescar por un cambio de estado no se repiten las animaciones de entrada.
  const stopMotion = keepFocus ? null : initMotion(holder);
  cleanup = () => { stopPage?.(); stopMotion?.(); };
  liveState = Boolean(page.liveState);
  updateActiveNav(path);

  if (resetScroll) {
    window.scrollTo(0, 0);
    setSidebar(false);
    $('#main').focus({ preventScroll: true });
    $('#announcer').textContent = page.title ?? 'Inicio';
    view.classList.remove('enter');
    void view.offsetWidth;
    view.classList.add('enter');
  }
  if (focusKey) $(focusKey)?.focus({ preventScroll: true });
  if (initial) $('#main').blur();
}

function syncToggles() {
  $$('[data-toggle]').forEach((btn) => {
    const on = has(btn.dataset.toggle, btn.dataset.ref);
    const label = on ? btn.dataset.on : btn.dataset.off;
    btn.setAttribute('aria-pressed', String(on));
    btn.setAttribute('aria-label', label);
    btn.title = label;
    const span = $('.btn-label', btn);
    if (span) span.textContent = label;
  });
}

// Aplica la herramienta elegida a todos los grupos de pestañas que la incluyan.
function selectTool(tool) {
  $$('[data-tool-tabs]').forEach((group) => {
    const tabs = $$('[data-tool-tab]', group);
    if (!tabs.some((t) => t.dataset.toolTab === tool)) return;
    tabs.forEach((t) => {
      const on = t.dataset.toolTab === tool;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    $$('[data-tool-panel]', group).forEach((p) => { p.hidden = p.dataset.toolPanel !== tool; });
  });
}

async function copyCode(button) {
  const code = button.closest('.code').querySelector('code').textContent;
  try {
    await navigator.clipboard.writeText(code);
  } catch {
    // Contextos sin permiso de portapapeles: se recurre a una selección temporal.
    const area = document.createElement('textarea');
    area.value = code;
    document.body.append(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }
  const label = $('span', button);
  label.textContent = 'Copiado';
  setTimeout(() => { label.textContent = 'Copiar'; }, 1500);
  toast('Código copiado al portapapeles');
}

function bindGlobalEvents() {
  document.addEventListener('click', (e) => {
    const toggler = e.target.closest('[data-toggle]');
    if (toggler) {
      toggle(toggler.dataset.toggle, toggler.dataset.ref);
      return;
    }
    const toolTab = e.target.closest('[data-tool-tab]');
    if (toolTab) {
      selectTool(toolTab.dataset.toolTab);
      setPref('tool', toolTab.dataset.toolTab);
      return;
    }
    const copier = e.target.closest('[data-copy]');
    if (copier) { copyCode(copier); return; }
    const scroller = e.target.closest('[data-scroll-to]');
    if (scroller) {
      e.preventDefault();
      document.getElementById(scroller.dataset.scrollTo)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  document.addEventListener('keydown', (e) => {
    const current = e.target.closest?.('[data-tool-tab]');
    if (current && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
      e.preventDefault();
      const tabs = $$('[data-tool-tab]', current.parentElement);
      const next = tabs[(tabs.indexOf(current) + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
      next.click();
      next.focus();
      return;
    }
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName ?? '');
    if ((e.key === '/' && !typing) || (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey))) {
      e.preventDefault();
      $('#global-search').focus();
    }
  });

  subscribe(() => {
    syncToggles();
    if (liveState) refresh();
  });
}

async function boot() {
  applyPrefs();
  try {
    await loadData();
  } catch (error) {
    const viaFile = location.protocol === 'file:';
    $('#view').innerHTML = html`<div class="page">${emptyState(
      'No se pudo cargar el contenido',
      viaFile
        ? 'El navegador bloquea la lectura de JSON desde file://. Sirve la carpeta con un servidor estático: python -m http.server 8123'
        : `Error al leer los datos: ${error.message}`,
    )}</div>`.toString();
    return;
  }
  buildIndex();
  initShell();
  bindGlobalEvents();
  startRouter(render);
}

boot();
