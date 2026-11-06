import { db } from '../data-loader.js';
import { $, $$, html } from '../utils/dom.js';
import { rich } from '../utils/rich-text.js';
import { replaceHash } from '../router.js';
import { renderDiagram } from '../components/diagram.js';
import { sourcesList, statusBadge } from '../components/ui.js';
import { icon } from '../components/icons.js';
import { prefersReducedMotion } from '../utils/motion.js';

const STEP_MS = 2800;
const TOKEN_MS = 650;

function nodePanel(arch, node) {
  if (!node) {
    return html`<p class="eyebrow">Cómo leer este diagrama</p>
      <p>Selecciona cualquier elemento para ver qué hace y con qué se conecta. También puedes recorrerlos con <kbd>Tab</kbd> y pulsar <kbd>Enter</kbd>.</p>
      <p class="muted small">Las líneas continuas son flujo directo; las discontinuas, relaciones opcionales o indirectas.</p>`;
  }
  const label = (id) => arch.nodes.find((n) => n.id === id)?.label;
  const links = arch.edges
    .filter((e) => e.from === node.id || e.to === node.id)
    .map((e) => ({ other: e.from === node.id ? e.to : e.from, out: e.from === node.id, text: e.label }));
  return html`<p class="eyebrow">Elemento seleccionado</p>
    <h2>${node.label}</h2>
    ${rich(node.description)}
    ${links.length ? html`<h3>Conexiones</h3>
      <ul class="edge-list">${links.map((l) => html`<li><button type="button" class="link-btn" data-goto-node="${l.other}">${icon(l.out ? 'arrowRight' : 'arrowLeft', 14)} ${label(l.other)}</button>${l.text ? html`<span class="muted small">${l.text}</span>` : ''}</li>`)}</ul>` : ''}
    ${node.concept && db.conceptById.has(node.concept) ? html`<a class="link-more" href="#/article/${node.concept}">Leer ${db.conceptById.get(node.concept).title} ${icon('arrowRight', 14)}</a>` : ''}`;
}

export function labPage({ params, query }) {
  const arch = params.id ? db.architectureById.get(params.id) : db.architectures[0];
  if (!arch) return null;
  const initial = arch.nodes.find((n) => n.id === query.node) ?? null;

  return {
    title: arch.title,
    crumbs: [{ label: 'Architecture Lab', href: '#/lab' }, { label: arch.title }],
    content: html`<div class="page lab">
      <header class="page-head">
        <p class="eyebrow">Architecture Lab</p>
        <h1>${arch.title}</h1>
        <p class="lead">${arch.summary}</p>
      </header>
      <nav class="lab-tabs" aria-label="Diagramas disponibles">
        ${db.architectures.map((a, i) => html`<a href="#/lab/${a.id}" ${a === arch ? html`aria-current="page" class="on"` : ''}><b>${i + 1}</b>${a.short}</a>`)}
      </nav>
      <div class="flow-bar">
        <button type="button" class="btn btn-primary" id="flow-play">${icon('play', 14)}<span>Ver el flujo</span></button>
        <button type="button" class="btn btn-icon" id="flow-prev" aria-label="Paso anterior" title="Paso anterior">${icon('prev', 15)}</button>
        <button type="button" class="btn btn-icon" id="flow-next" aria-label="Paso siguiente" title="Paso siguiente">${icon('next', 15)}</button>
        <span class="small muted" id="flow-count" aria-live="polite"></span>
      </div>
      <div class="lab-stage">
        <div class="diagram-wrap" tabindex="0" role="region" aria-label="Lienzo del diagrama">${renderDiagram(arch)}</div>
        <aside class="node-panel" id="node-panel" aria-live="polite">${nodePanel(arch, initial)}</aside>
      </div>
      <section class="section lab-foot">
        <div class="reading">
          <h2 class="section-title small-title">Cómo interpretarlo</h2>
          ${rich(arch.notes)}
        </div>
        <div>
          <p class="meta-line">${statusBadge(arch.status)}</p>
          <h2 class="section-title small-title">Fuentes</h2>
          ${sourcesList(arch.sources)}
        </div>
      </section>
    </div>`,
    mount(root) {
      const panel = $('#node-panel', root);
      const select = (id, focusNode = false) => {
        const node = arch.nodes.find((n) => n.id === id);
        panel.innerHTML = nodePanel(arch, node).toString();
        const svg = $('.diagram', root);
        svg.classList.toggle('has-selection', Boolean(id));
        $$('.dg-node', svg).forEach((n) => {
          const on = n.dataset.node === id;
          n.classList.toggle('selected', on);
          n.setAttribute('aria-pressed', String(on));
          if (on && focusNode) n.focus();
        });
        const neighbours = new Set([id]);
        $$('.dg-edge', svg).forEach((e) => {
          const on = e.dataset.from === id || e.dataset.to === id;
          e.classList.toggle('active', on);
          if (on) { neighbours.add(e.dataset.from); neighbours.add(e.dataset.to); }
        });
        $$('.dg-node', svg).forEach((n) => n.classList.toggle('near', neighbours.has(n.dataset.node)));
        replaceHash(`#/lab/${arch.id}${id ? `?node=${id}` : ''}`);
      };
      root.addEventListener('click', (e) => {
        const node = e.target.closest('.dg-node');
        if (node) { select(node.dataset.node); return; }
        const goto = e.target.closest('[data-goto-node]');
        if (goto) { select(goto.dataset.gotoNode, true); }
      });
      root.addEventListener('keydown', (e) => {
        const node = e.target.closest?.('.dg-node');
        if (node && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          select(node.dataset.node);
        }
      });
      if (initial) select(initial.id);

      // Reproducción paso a paso por las conexiones directas del diagrama.
      const svg = $('.diagram', root);
      const edgesEl = $$('.dg-edge', svg);
      const flow = arch.edges.map((edge, index) => ({ edge, el: edgesEl[index] })).filter(({ edge }) => !edge.dashed);
      const playBtn = $('#flow-play', root);
      const count = $('#flow-count', root);
      let position = -1;
      let timer = null;
      let frame = null;
      let token = null;

      const moveToken = (line) => {
        token?.remove();
        cancelAnimationFrame(frame);
        if (prefersReducedMotion()) return;
        const from = [line.x1.baseVal.value, line.y1.baseVal.value];
        const to = [line.x2.baseVal.value, line.y2.baseVal.value];
        token = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        token.setAttribute('r', '6');
        token.setAttribute('class', 'dg-token');
        svg.append(token);
        const start = performance.now();
        const step = (now) => {
          const t = Math.min((now - start) / TOKEN_MS, 1);
          const eased = t * (2 - t);
          token.setAttribute('cx', from[0] + (to[0] - from[0]) * eased);
          token.setAttribute('cy', from[1] + (to[1] - from[1]) * eased);
          if (t < 1) frame = requestAnimationFrame(step); else token.remove();
        };
        frame = requestAnimationFrame(step);
      };

      const setPlaying = (on) => {
        clearTimeout(timer);
        timer = null;
        playBtn.innerHTML = html`${icon(on ? 'pause' : 'play', 14)}<span>${on ? 'Pausar' : position >= 0 ? 'Continuar' : 'Ver el flujo'}</span>`.toString();
      };

      const goTo = (index) => {
        position = (index + flow.length) % flow.length;
        const { edge, el } = flow[position];
        select(edge.to);
        el.classList.add('active');
        moveToken($('line', el));
        count.textContent = `Paso ${position + 1} de ${flow.length}`;
      };

      const play = () => {
        goTo(position + 1);
        setPlaying(true);
        timer = setTimeout(play, STEP_MS);
      };

      playBtn.addEventListener('click', () => {
        if (timer) setPlaying(false); else play();
      });
      $('#flow-next', root).addEventListener('click', () => { setPlaying(false); goTo(position + 1); setPlaying(false); });
      $('#flow-prev', root).addEventListener('click', () => { setPlaying(false); goTo(position - 1); setPlaying(false); });
      svg.addEventListener('click', () => { if (timer) setPlaying(false); });

      return () => {
        clearTimeout(timer);
        cancelAnimationFrame(frame);
      };
    },
  };
}
