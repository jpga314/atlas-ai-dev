import { db } from '../data-loader.js';
import { $, $$, html } from '../utils/dom.js';
import { rich } from '../utils/rich-text.js';
import { replaceHash } from '../router.js';
import { chips, emptyState, filterGroup, sourcesList, statusBadge } from '../components/ui.js';
import { icon } from '../components/icons.js';

const START = 2021;
const NOW = 2027;

// Escala lineal desde el primer hito de la timeline.
function x(year) {
  const clamped = Math.min(Math.max(year, START), NOW);
  return ((clamped - START) / (NOW - START)) * 100;
}

const TICKS = [2021, 2022, 2023, 2024, 2025, 2026];

function eventRow(event, openId) {
  const open = event.id === openId;
  const left = x(event.start);
  const end = event.end ?? NOW;
  const width = Math.max(x(end) - left, 1.2);
  const related = (event.relatedConcepts ?? []).map((id) => db.conceptById.get(id)).filter(Boolean);
  return html`<li class="tl-event ${open ? 'open' : ''}" data-event="${event.id}">
    <button type="button" class="tl-row" aria-expanded="${String(open)}" aria-controls="tl-${event.id}">
      <span class="tl-name"><strong>${event.name}</strong><span class="small muted">${event.dateLabel}</span></span>
      <span class="tl-track" aria-hidden="true">
        <span class="tl-bar ${event.end ? '' : 'ongoing'} ${event.precision === 'approximate' ? 'approx' : ''}" style="left:${left}%;width:${width}%"></span>
      </span>
    </button>
    <div class="tl-detail" id="tl-${event.id}" ${open ? '' : html`hidden`}>
      <div class="reading">
        ${rich(event.description)}
        <h3>Por qué importa</h3>
        ${rich(event.importance)}
        ${event.coexists ? html`<p class="callout">${icon('info', 16)}<span>${event.coexists}</span></p>` : ''}
      </div>
      <div class="tl-side">
        <p class="meta-line">${statusBadge(event.status)}<span class="small muted">${event.precision === 'approximate' ? 'Periodo aproximado' : 'Fecha documentada'}</span></p>
        <h3>Tecnologías relacionadas</h3>
        ${chips(event.technologies)}
        ${related.length ? html`<h3>En la enciclopedia</h3>
          <ul class="chips">${related.map((c) => html`<li><a class="chip" href="#/article/${c.id}">${c.title}</a></li>`)}</ul>` : ''}
        <h3>Fuentes</h3>
        ${sourcesList(event.sources)}
      </div>
    </div>
  </li>`;
}

let activeLane = 'all';

function chart(openId) {
  const lanes = db.timeline.lanes.filter((l) => activeLane === 'all' || l.id === activeLane);
  const groups = lanes.map((lane) => ({ lane, events: db.timeline.events.filter((e) => e.lane === lane.id) })).filter((g) => g.events.length);
  if (!groups.length) return emptyState('Sin hitos en esta categoría', 'Elige otra categoría para seguir explorando.');
  return html`<div class="tl-axis" aria-hidden="true">
      <span class="tl-axis-spacer"></span>
      <span class="tl-axis-track">${TICKS.map((t) => html`<span class="tl-tick" style="left:${x(t)}%">${t}</span>`)}</span>
    </div>
    ${groups.map(({ lane, events }) => html`<section class="tl-lane">
      <header><h2>${lane.name}</h2><p class="small muted">${lane.description}</p></header>
      <ol>${events.map((e) => eventRow(e, openId))}</ol>
    </section>`)}`;
}

export function timelinePage({ params }) {
  if (params.id && !db.timelineById.has(params.id)) return null;
  const options = [{ value: 'all', label: 'Todas' }, ...db.timeline.lanes.map((l) => ({ value: l.id, label: l.short }))];
  if (params.id) activeLane = 'all';

  return {
    title: 'Timeline',
    crumbs: [{ label: 'Timeline' }],
    content: html`<div class="page">
      <header class="page-head">
        <p class="eyebrow">Evolution of AI agent development</p>
        <h1>Timeline</h1>
        <p class="lead">${db.timeline.intro}</p>
      </header>
      <div class="legend" aria-label="Leyenda">
        <span><i class="lg lg-open"></i>Sigue vigente</span>
        <span><i class="lg lg-approx"></i>Inicio aproximado</span>
      </div>
      <div class="filters">${filterGroup('lane', 'Categoría', options, activeLane)}</div>
      <div id="tl-chart" class="timeline">${chart(params.id)}</div>
    </div>`,
    mount(root) {
      const container = $('#tl-chart', root);
      root.addEventListener('click', (e) => {
        const filter = e.target.closest('[data-filter="lane"]');
        if (filter) {
          activeLane = filter.dataset.value;
          $$('[data-filter="lane"]', root).forEach((b) => {
            const on = b === filter;
            b.classList.toggle('on', on);
            b.setAttribute('aria-pressed', String(on));
          });
          container.innerHTML = chart(null).toString();
          replaceHash('#/timeline');
          return;
        }
        const row = e.target.closest('.tl-row');
        if (!row) return;
        const item = row.closest('.tl-event');
        const opening = !item.classList.contains('open');
        $$('.tl-event.open', container).forEach((other) => {
          other.classList.remove('open');
          $('.tl-row', other).setAttribute('aria-expanded', 'false');
          $('.tl-detail', other).hidden = true;
        });
        if (opening) {
          item.classList.add('open');
          row.setAttribute('aria-expanded', 'true');
          $('.tl-detail', item).hidden = false;
          item.scrollIntoView({ block: 'nearest' });
        }
        replaceHash(opening ? `#/timeline/${item.dataset.event}` : '#/timeline');
      });
      if (params.id) $(`[data-event="${params.id}"]`, root)?.scrollIntoView({ block: 'center' });
    },
  };
}
