import { db } from '../data-loader.js';
import { $, html } from '../utils/dom.js';
import { rich, richInline } from '../utils/rich-text.js';
import { go } from '../router.js';
import { visit } from '../state.js';
import { emptyState, sourcesList, toggleButton, verifiedLine } from '../components/ui.js';
import { icon } from '../components/icons.js';

const miniList = (items = []) => html`<ul class="mini-list">${items.map((i) => html`<li>${richInline(i)}</li>`)}</ul>`;

// Vista reutilizable: dos columnas que se apilan en móvil, con filas alineadas.
export function sideBySide(aName, bName, rows) {
  return html`<div class="vs-table" role="table" aria-label="Comparación de ${aName} y ${bName}">
    <div class="vs-row vs-head" role="row">
      <span role="columnheader" class="vs-aspect"><span class="sr-only">Aspecto</span></span>
      <span role="columnheader"><strong>${aName}</strong></span>
      <span role="columnheader"><strong>${bName}</strong></span>
    </div>
    ${rows.map((r) => html`<div class="vs-row" role="row">
      <span class="vs-aspect" role="rowheader">${r.aspect}</span>
      <div role="cell"><span class="vs-mobile-name">${aName}</span>${r.a}</div>
      <div role="cell"><span class="vs-mobile-name">${bName}</span>${r.b}</div>
    </div>`)}
  </div>`;
}

export function compareIndexPage() {
  const options = [...db.concepts].sort((x, y) => x.title.localeCompare(y.title, 'es'));
  const select = (id, label) => html`<label class="select-field"><span>${label}</span><select id="${id}">
    <option value="">Elige un concepto…</option>
    ${options.map((c) => html`<option value="${c.id}">${c.title}</option>`)}
  </select></label>`;
  return {
    title: 'Comparativas',
    crumbs: [{ label: 'Comparativas' }],
    content: html`<div class="page">
      <header class="page-head">
        <p class="eyebrow">Comparison system</p>
        <h1>Comparativas</h1>
        <p class="lead">Conceptos que se confunden a menudo, explicados frente a frente: qué es cada uno, en qué se diferencian y cuándo conviene elegirlos.</p>
      </header>
      <ul class="compare-list">
        ${db.comparisons.map((c) => html`<li><a href="#/compare/${c.id}">
          <span class="compare-names"><strong>${c.a.name}</strong><span class="vs">vs</span><strong>${c.b.name}</strong></span>
          <span class="muted small">${c.summary}</span>
        </a></li>`)}
      </ul>
      <section class="section custom-compare">
        <h2 class="section-title">Compara dos conceptos cualesquiera</h2>
        <p class="muted">Enfrenta dos artículos de la enciclopedia a partir de sus propias fichas.</p>
        <form id="custom-compare" class="custom-form">
          ${select('cmp-a', 'Primer concepto')}
          ${select('cmp-b', 'Segundo concepto')}
          <button class="btn btn-primary" type="submit">Comparar</button>
        </form>
        <p class="small form-error" id="cmp-error" role="alert" hidden>Elige dos conceptos distintos.</p>
      </section>
    </div>`,
    mount(root) {
      $('#custom-compare', root).addEventListener('submit', (e) => {
        e.preventDefault();
        const a = $('#cmp-a', root).value;
        const b = $('#cmp-b', root).value;
        const invalid = !a || !b || a === b;
        $('#cmp-error', root).hidden = !invalid;
        if (!invalid) go(`#/compare/custom?a=${a}&b=${b}`);
      });
    },
  };
}

export function comparisonPage({ params }) {
  const c = db.comparisonById.get(params.id);
  if (!c) return null;
  const ref = `comparison:${c.id}`;
  const conceptLink = (side) => (side.concept && db.conceptById.has(side.concept)
    ? html`<a class="link-more" href="#/article/${side.concept}">Artículo completo ${icon('arrowRight', 14)}</a>` : '');
  return {
    title: c.title,
    crumbs: [{ label: 'Comparativas', href: '#/compare' }, { label: c.title }],
    content: html`<article class="page comparison">
      <header class="page-head">
        <p class="eyebrow">Comparativa</p>
        <h1 class="vs-title">${c.a.name} <span class="vs">vs</span> ${c.b.name}</h1>
        <p class="lead">${richInline(c.summary)}</p>
        <div class="art-meta">${verifiedLine(c)}</div>
        <div class="art-actions">${toggleButton('favorites', ref)}</div>
      </header>

      <section class="section vs-defs">
        <div><h2>${c.a.name}</h2>${rich(c.a.what)}${conceptLink(c.a)}</div>
        <div><h2>${c.b.name}</h2>${rich(c.b.what)}${conceptLink(c.b)}</div>
      </section>

      <section class="section">
        <h2 class="section-title">Diferencias fundamentales</h2>
        ${sideBySide(c.a.name, c.b.name, c.differences.map((d) => ({ aspect: d.aspect, a: richInline(d.a), b: richInline(d.b) })))}
      </section>

      <section class="section">
        <h2 class="section-title">Objetivos, ventajas y límites</h2>
        ${sideBySide(c.a.name, c.b.name, [
          { aspect: 'Objetivo', a: richInline(c.a.goal), b: richInline(c.b.goal) },
          { aspect: 'Ventajas', a: miniList(c.a.pros), b: miniList(c.b.pros) },
          { aspect: 'Desventajas', a: miniList(c.a.cons), b: miniList(c.b.cons) },
        ])}
      </section>

      <section class="section vs-defs">
        <div><h2>Elige ${c.a.name} si…</h2>${miniList(c.a.chooseWhen)}<h3>Ejemplo de uso</h3>${rich(c.a.example)}</div>
        <div><h2>Elige ${c.b.name} si…</h2>${miniList(c.b.chooseWhen)}<h3>Ejemplo de uso</h3>${rich(c.b.example)}</div>
      </section>

      ${c.together ? html`<p class="callout">${icon('info', 16)}<span>${richInline(c.together)}</span></p>` : ''}

      <section class="section"><h2 class="section-title">Fuentes</h2>${sourcesList(c.sources)}</section>
    </article>`,
    mount() { visit(ref); },
  };
}

export function customComparePage({ query }) {
  const a = db.conceptById.get(query.a);
  const b = db.conceptById.get(query.b);
  const crumbs = [{ label: 'Comparativas', href: '#/compare' }, { label: 'Personalizada' }];
  if (!a || !b || a === b) {
    return {
      title: 'Comparativa personalizada',
      crumbs,
      content: html`<div class="page">${emptyState('Faltan conceptos por comparar', 'Elige dos conceptos distintos en la página de comparativas.', html`<a class="btn btn-primary" href="#/compare">Ir a comparativas</a>`)}</div>`,
    };
  }
  const row = (aspect, fn) => ({ aspect, a: fn(a), b: fn(b) });
  return {
    title: `${a.title} vs ${b.title}`,
    crumbs,
    content: html`<div class="page">
      <header class="page-head">
        <p class="eyebrow">Comparativa personalizada</p>
        <h1 class="vs-title">${a.title} <span class="vs">vs</span> ${b.title}</h1>
        <p class="lead">Generada a partir de las fichas de la enciclopedia. No es una comparativa editorial: muestra cada concepto por separado, sin interpretar sus diferencias.</p>
      </header>
      ${sideBySide(a.title, b.title, [
        row('Definición', (c) => richInline(c.description)),
        row('Problema', (c) => rich(c.problem)),
        row('Cuándo usarlo', (c) => rich(c.whenToUse)),
        row('Ventajas', (c) => miniList(c.advantages)),
        row('Limitaciones', (c) => miniList(c.limitations)),
        row('Dificultad', (c) => c.difficulty),
        row('Artículo', (c) => html`<a href="#/article/${c.id}">Leer ${c.title}</a>`),
      ])}
    </div>`,
  };
}
