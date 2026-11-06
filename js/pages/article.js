import { db } from '../data-loader.js';
import { $$, html } from '../utils/dom.js';
import { rich, richInline } from '../utils/rich-text.js';
import { visit } from '../state.js';
import { readingBar } from '../utils/motion.js';
import { icon } from '../components/icons.js';
import { codeBlock, difficultyBadge, sourcesList, toggleButton, toolTabs, verifiedLine } from '../components/ui.js';

const section = (id, number, title, body) => html`<section class="art-section" id="${id}">
  <h2><span class="art-num">${String(number).padStart(2, '0')}</span>${title}</h2>
  ${body}
</section>`;

const bulletList = (items, cls) => html`<ul class="pros-cons ${cls}">${items.map((i) => html`<li>${richInline(i)}</li>`)}</ul>`;

function relatedList(concept) {
  if (!concept.relatedConcepts.length) return html`<p class="muted">Sin relaciones registradas.</p>`;
  return html`<ul class="relations">${concept.relatedConcepts.map((rel) => {
    const other = db.conceptById.get(rel.id);
    if (!other) return '';
    return html`<li><a href="#/article/${other.id}"><strong>${other.title}</strong></a><span>${richInline(rel.note)}</span></li>`;
  })}</ul>`;
}

function prerequisites(concept) {
  if (!concept.prerequisites.length) return html`<p class="muted">No requiere conocimientos previos específicos del atlas.</p>`;
  return html`<ul class="chips">${concept.prerequisites.map((id) => {
    const other = db.conceptById.get(id);
    return other ? html`<li><a class="chip" href="#/article/${id}">${other.title}</a></li>` : '';
  })}</ul>`;
}

function toolLinks(concept) {
  if (!concept.tools.length) return html`<p class="muted">No hay fichas de herramientas asociadas.</p>`;
  return html`<ul class="chips">${concept.tools.map((id) => {
    const tool = db.toolById.get(id);
    return tool ? html`<li><a class="chip" href="#/tools/${id}">${tool.name}</a></li>` : '';
  })}</ul>`;
}

function exampleBlock(concept) {
  const ex = concept.example;
  const linked = db.examples.filter((e) => e.concepts.includes(concept.id));
  return html`${ex.text ? rich(ex.text) : ''}
    ${ex.code ? codeBlock({ code: ex.code, language: ex.language, filename: ex.filename }) : ''}
    ${ex.explanation ? rich(ex.explanation) : ''}
    ${linked.length ? html`<p class="linked-examples">En el Playground: ${linked.map((e, i) => html`${i ? ', ' : ''}<a href="#/playground/${e.id}">${e.title}</a>`)}</p>` : ''}`;
}

export function articlePage({ params }) {
  const concept = db.conceptById.get(params.id);
  if (!concept) return null;
  const category = db.categoryById.get(concept.category);
  const siblings = db.conceptsByCategory.get(concept.category);
  const index = siblings.indexOf(concept);
  const prev = siblings[index - 1];
  const next = siblings[index + 1];
  const ref = `article:${concept.id}`;
  const comparisons = db.comparisons.filter((c) => c.a.concept === concept.id || c.b.concept === concept.id);

  const sections = [
    ['tecnica', 'Explicación técnica', rich(concept.technicalExplanation)],
    ['problema', '¿Qué problema resuelve?', rich(concept.problem)],
    ['funcionamiento', '¿Cómo funciona?', rich(concept.howItWorks)],
    ...(concept.perTool ? [['por-herramienta', 'En cada herramienta', toolTabs(concept.perTool)]] : []),
    ['cuando', '¿Cuándo utilizarlo?', rich(concept.whenToUse)],
    ['ventajas', 'Ventajas', bulletList(concept.advantages, 'pros')],
    ['limitaciones', 'Desventajas y limitaciones', bulletList(concept.limitations, 'cons')],
    ['ejemplo', 'Ejemplo práctico', exampleBlock(concept)],
    ['relaciones', 'Relación con otros conceptos', relatedList(concept)],
    ['previos', 'Conviene conocer antes', prerequisites(concept)],
    ['herramientas', 'Herramientas relacionadas', toolLinks(concept)],
    ['fuentes', 'Fuentes y documentación oficial', sourcesList(concept.sources)],
  ];

  return {
    title: concept.title,
    crumbs: [
      { label: 'Encyclopedia', href: '#/encyclopedia' },
      { label: category.name, href: `#/encyclopedia/${category.id}` },
      { label: concept.title },
    ],
    content: html`<article class="page article">
      <header class="art-head">
        <p class="eyebrow"><a href="#/encyclopedia/${category.id}">${concept.code} · ${category.name}</a></p>
        <h1>${concept.title}</h1>
        <p class="art-lede">${richInline(concept.description)}</p>
        <div class="art-meta">${difficultyBadge(concept.difficulty)}${verifiedLine(concept)}</div>
        ${concept.editorialNote ? html`<p class="callout">${icon('info', 16)}<span>${richInline(concept.editorialNote)}</span></p>` : ''}
        <div class="art-actions">
          ${toggleButton('read', ref)}${toggleButton('favorites', ref)}${toggleButton('readLater', ref)}
        </div>
      </header>
      <div class="art-layout">
        <div class="art-body reading">
          ${sections.map(([id, title, body], i) => section(id, i + 1, title, body))}
          ${comparisons.length ? html`<aside class="art-compare"><p class="eyebrow">Se suele confundir con</p>
            <ul>${comparisons.map((c) => html`<li><a href="#/compare/${c.id}">${c.title} ${icon('arrowRight', 14)}</a></li>`)}</ul></aside>` : ''}
          <nav class="pager" aria-label="Artículos de la categoría">
            ${prev ? html`<a class="pager-prev" href="#/article/${prev.id}">${icon('arrowLeft', 16)}<span><small>Anterior</small>${prev.title}</span></a>` : html`<span></span>`}
            ${next ? html`<a class="pager-next" href="#/article/${next.id}"><span><small>Siguiente</small>${next.title}</span>${icon('arrowRight', 16)}</a>` : html`<span></span>`}
          </nav>
        </div>
        <nav class="toc" aria-label="En este artículo">
          <p class="eyebrow">En este artículo</p>
          <ol>${sections.map(([id, title]) => html`<li><a href="#" data-scroll-to="${id}" data-toc="${id}">${title}</a></li>`)}</ol>
        </nav>
      </div>
    </article>`,
    mount(root) {
      visit(ref);
      const links = new Map($$('[data-toc]', root).map((a) => [a.dataset.toc, a]));
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((a) => a.classList.remove('active'));
            links.get(entry.target.id)?.classList.add('active');
          }
        });
      }, { rootMargin: '-15% 0px -75% 0px' });
      $$('.art-section', root).forEach((s) => observer.observe(s));
      const stopBar = readingBar();
      return () => { observer.disconnect(); stopBar(); };
    },
  };
}
