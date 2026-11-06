import { db, resolveRef } from '../data-loader.js';
import { $, html } from '../utils/dom.js';
import { plural } from '../utils/format.js';
import { getState } from '../state.js';
import { icon } from '../components/icons.js';
import { attachSearchBox } from '../components/search-box.js';
import { difficultyBadge, progressBar, readCount, statusBadge } from '../components/ui.js';
import { miniMap } from './paths.js';
import { agentRun, startAgentRun } from '../components/agent-run.js';

function featuredBlock() {
  const items = db.concepts.filter((c) => c.featured).sort((a, b) => a.featured - b.featured);
  const [lead, ...rest] = items;
  return html`<div class="featured">
    <a class="featured-lead" href="#/article/${lead.id}">
      <span class="eyebrow">${lead.code} · ${db.categoryById.get(lead.category).name}</span>
      <h3>${lead.title}</h3>
      <p>${lead.description}</p>
      <span class="meta-line">${difficultyBadge(lead.difficulty)}${statusBadge(lead.status)}</span>
      <span class="more">Leer el artículo ${icon('arrowRight', 16)}</span>
    </a>
    <ul class="featured-rest">
      ${rest.map((c) => html`<li><a href="#/article/${c.id}">
        <span class="eyebrow">${c.code}</span>
        <strong>${c.title}</strong>
        <span class="muted small">${c.description}</span>
      </a></li>`)}
    </ul>
  </div>`;
}

function atlasIndex() {
  return html`<ol class="atlas-index">
    ${db.categories.map((c) => {
      const concepts = db.conceptsByCategory.get(c.id);
      const done = readCount(concepts);
      return html`<li><a href="#/encyclopedia/${c.id}">
        <span class="atlas-letter">${c.letter}</span>
        <span class="atlas-body"><strong>${c.name}</strong><span class="muted small">${c.tagline}</span></span>
        <span class="atlas-count">${concepts.length}</span>
        <span class="atlas-progress">${progressBar(done, concepts.length, `Progreso en ${c.name}`)}</span>
      </a></li>`;
    })}
  </ol>`;
}

function pathsBlock() {
  return html`<ul class="path-list">
    ${db.paths.slice(0, 3).map((p) => {
      const concepts = p.steps.map((s) => db.conceptById.get(s.concept));
      const done = readCount(concepts);
      return html`<li><a href="#/roadmaps/${p.id}">
        <span class="eyebrow">${p.level} · ${plural(p.stages.length, 'etapa')}</span>
        <strong>${p.title}</strong>
        <span class="muted small">${p.description}</span>
        ${miniMap(p)}
        <span class="path-progress">${progressBar(done, p.steps.length, `Progreso en ${p.title}`)}<span class="small muted">${done}/${p.steps.length}</span></span>
      </a></li>`;
    })}
  </ul>`;
}

function personalBlock() {
  const { favorites, readLater, history, read } = getState();
  const last = history.map((h) => resolveRef(h.ref)).find(Boolean);
  return html`<div class="personal">
    <h2 class="section-title small-title">Tu atlas</h2>
    ${last ? html`<a class="continue" href="${last.href}"><span class="eyebrow">Continúa donde lo dejaste</span><strong>${last.title}</strong></a>`
    : html`<p class="muted small">Aún no has visitado ningún artículo. Tu historial aparecerá aquí.</p>`}
    <ul class="personal-links">
      <li><a href="#/library?tab=favorites">${icon('star', 16)}<span>Favoritos</span><b>${favorites.length}</b></a></li>
      <li><a href="#/library?tab=readLater">${icon('bookmark', 16)}<span>Pendientes</span><b>${readLater.length}</b></a></li>
      <li><a href="#/library?tab=read">${icon('check', 16)}<span>Leídos</span><b>${read.length}</b></a></li>
    </ul>
  </div>`;
}

function latestAdded() {
  const list = db.concepts
    .map((c, i) => ({ c, i }))
    .sort((a, b) => b.c.addedAt.localeCompare(a.c.addedAt) || b.i - a.i)
    .slice(0, 5)
    .map(({ c }) => c);
  return html`<ol class="plain-list">${list.map((c) => html`<li><a href="#/article/${c.id}"><span class="row-code">${c.code}</span><span>${c.title}</span></a></li>`)}</ol>`;
}

function popularTools() {
  const tools = db.tools.filter((t) => t.popular).slice(0, 6);
  return html`<ul class="tool-strip">${tools.map((t) => html`<li><a href="#/tools/${t.id}"><strong>${t.name}</strong><span class="muted small">${t.categoryLabel}</span></a></li>`)}</ul>`;
}

export function dashboardPage() {
  const verified = db.concepts.filter((c) => c.status === 'verified').length;
  const stats = [
    { n: db.concepts.length, label: 'conceptos', href: '#/encyclopedia' },
    { n: db.tools.length, label: 'herramientas', href: '#/tools' },
    { n: db.comparisons.length, label: 'comparativas', href: '#/compare' },
    { n: db.examples.length, label: 'ejemplos', href: '#/playground' },
    { n: db.architectures.length, label: 'arquitecturas', href: '#/lab' },
    { n: db.timeline.events.length, label: 'hitos', href: '#/timeline' },
  ];

  return {
    title: 'Inicio',
    crumbs: [],
    content: html`<div class="page dashboard">
      <section class="hero">
        <div class="hero-text">
        <p class="eyebrow">Enciclopedia · Timeline · Explorer</p>
        <h1>El mapa del desarrollo con agentes de IA.</h1>
        <p class="lead">Agentes, skills, subagentes, memoria, MCP y worktrees explicados con rigor y con sus fuentes a la vista, para entender qué hace cada pieza y cómo encaja con las demás.</p>
        <div class="search-box search-hero" id="hero-search" role="search">
          <span class="search-icon">${icon('search', 18)}</span>
          <input type="search" placeholder="¿Qué quieres entender? Prueba con “git worktrees” o “MCP”" aria-label="Buscar en el atlas" autocomplete="off" spellcheck="false">
          <div class="search-panel" hidden></div>
        </div>
        <dl class="stats">
          ${stats.map((s) => html`<div><dd><a href="${s.href}" data-count="${s.n}">${s.n}</a></dd><dt>${s.label}</dt></div>`)}
        </dl>
        <p class="small muted editorial-note">${verified} de ${db.concepts.length} artículos tienen estado <strong>Verified</strong>. Cada ficha indica qué se ha contrastado y cuándo; <a href="#/encyclopedia">consulta el índice</a>.</p>
        </div>
        ${agentRun()}
      </section>

      <section class="section">
        <a class="real-banner" href="#/playground/context-simulator">
          <span><span class="eyebrow">Interactivo</span><strong>¿Qué llena el contexto de tu agente?</strong><span class="muted small">Activa skills, servidores MCP o archivos, y prueba a compactar o a delegar en un subagente.</span></span>
          ${icon('arrowRight', 18)}
        </a>
      </section>

      <section class="section">
        <header class="section-head"><h2 class="section-title">Conceptos destacados</h2></header>
        ${featuredBlock()}
      </section>

      <section class="section split">
        <div>
          <header class="section-head">
            <h2 class="section-title">Índice del atlas</h2>
            <a class="link-more" href="#/encyclopedia">Ver todo ${icon('arrowRight', 14)}</a>
          </header>
          ${atlasIndex()}
        </div>
        <aside class="side-col">
          ${personalBlock()}
          <div>
            <h2 class="section-title small-title">Últimos añadidos</h2>
            ${latestAdded()}
          </div>
        </aside>
      </section>

      <section class="section">
        <header class="section-head">
          <h2 class="section-title">Roadmaps</h2>
          <a class="link-more" href="#/roadmaps">Todos los roadmaps ${icon('arrowRight', 14)}</a>
        </header>
        ${pathsBlock()}
      </section>

      <section class="section">
        <header class="section-head">
          <h2 class="section-title">Herramientas populares</h2>
          <a class="link-more" href="#/tools">Tools Explorer ${icon('arrowRight', 14)}</a>
        </header>
        ${popularTools()}
      </section>
    </div>`,
    mount(root) {
      attachSearchBox($('#hero-search', root));
      return startAgentRun(root);
    },
  };
}
