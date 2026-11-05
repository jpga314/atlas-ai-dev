import { db } from '../data-loader.js';
import { $, $$, html } from '../utils/dom.js';
import { rich, richInline } from '../utils/rich-text.js';
import { visit } from '../state.js';
import { codeBlock, emptyState, filterGroup, sourcesList, toggleButton, verifiedLine } from '../components/ui.js';

let activeTopic = 'all';

function list() {
  const items = db.examples.filter((e) => activeTopic === 'all' || e.topic === activeTopic);
  if (!items.length) return emptyState('Sin ejemplos en este tema', 'Elige otro tema.');
  return html`<ul class="example-list">${items.map((e) => html`<li><a href="#/playground/${e.id}">
    <span class="eyebrow">${e.topic}</span>
    <strong>${e.title}</strong>
    <span class="muted small">${e.objective}</span>
    ${e.tested ? html`<span class="tested small">Ejecutado y comprobado</span>` : ''}
  </a></li>`)}</ul>`;
}

export function playgroundPage() {
  const topics = [...new Set(db.examples.map((e) => e.topic))];
  const options = [{ value: 'all', label: 'Todos' }, ...topics.map((t) => ({ value: t, label: t }))];
  return {
    title: 'Playground',
    crumbs: [{ label: 'Playground' }],
    content: html`<div class="page">
      <header class="page-head">
        <p class="eyebrow">Practical examples</p>
        <h1>Playground</h1>
        <p class="lead">Configuraciones y flujos listos para copiar y adaptar, con cada parte explicada. Comprueba los campos en la documentación de tu versión: estos formatos evolucionan.</p>
      </header>
      <div class="filters">${filterGroup('topic', 'Tema', options, activeTopic)}</div>
      <div id="ex-list">${list()}</div>
    </div>`,
    mount(root) {
      root.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-filter="topic"]');
        if (!btn) return;
        activeTopic = btn.dataset.value;
        $$('[data-filter="topic"]', root).forEach((b) => {
          b.classList.toggle('on', b === btn);
          b.setAttribute('aria-pressed', String(b === btn));
        });
        $('#ex-list', root).innerHTML = list().toString();
      });
    },
  };
}

const block = (n, title, body) => html`<section class="art-section"><h2><span class="art-num">${n}</span>${title}</h2>${body}</section>`;

export function examplePage({ params }) {
  const ex = db.exampleById.get(params.id);
  if (!ex) return null;
  const ref = `example:${ex.id}`;
  const concepts = ex.concepts.map((id) => db.conceptById.get(id)).filter(Boolean);
  const idx = db.examples.indexOf(ex);
  const next = db.examples[idx + 1];
  return {
    title: ex.title,
    crumbs: [{ label: 'Playground', href: '#/playground' }, { label: ex.title }],
    content: html`<article class="page article">
      <header class="art-head">
        <p class="eyebrow">${ex.topic}</p>
        <h1>${ex.title}</h1>
        <div class="art-meta">${verifiedLine(ex)}${ex.tested ? html`<span class="tested small">${ex.tested}</span>` : ''}</div>
        <div class="art-actions">${toggleButton('favorites', ref)}</div>
      </header>
      <div class="reading">
        ${block('01', 'Objetivo', rich(ex.objective))}
        ${block('02', 'Contexto', rich(ex.context))}
        ${block('03', 'Implementación', rich(ex.implementation))}
        ${block('04', 'Código o configuración', ex.files.map((f) => codeBlock({ code: f.code, language: f.language, filename: f.path })))}
        ${block('05', 'Explicación de cada parte', html`<dl class="parts">${ex.parts.map((p) => html`<div><dt><code>${p.label}</code></dt><dd>${richInline(p.text)}</dd></div>`)}</dl>`)}
        ${block('06', 'Resultado esperado', rich(ex.expected))}
        ${block('07', 'Cuándo utilizarlo', rich(ex.whenToUse))}
        ${block('08', 'Posibles limitaciones', html`<ul class="pros-cons cons">${ex.limitations.map((l) => html`<li>${richInline(l)}</li>`)}</ul>`)}
        ${concepts.length ? html`<section class="art-section"><h2>Conceptos relacionados</h2><ul class="chips">${concepts.map((c) => html`<li><a class="chip" href="#/article/${c.id}">${c.title}</a></li>`)}</ul></section>` : ''}
        <section class="art-section"><h2>Fuentes</h2>${sourcesList(ex.sources)}</section>
        ${next ? html`<nav class="pager" aria-label="Siguiente ejemplo"><span></span><a class="pager-next" href="#/playground/${next.id}"><span><small>Siguiente ejemplo</small>${next.title}</span></a></nav>` : ''}
      </div>
    </article>`,
    mount() { visit(ref); },
  };
}
