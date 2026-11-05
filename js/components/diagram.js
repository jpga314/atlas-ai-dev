import { esc, raw } from '../utils/dom.js';

// Punto donde la recta entre centros corta el borde del rectángulo del nodo.
function edgePoint(node, toward, pad = 5) {
  const cx = node.x + node.w / 2;
  const cy = node.y + node.h / 2;
  const dx = toward.x - cx;
  const dy = toward.y - cy;
  if (dx === 0 && dy === 0) return { x: cx, y: cy };
  const sx = dx === 0 ? Infinity : (node.w / 2 + pad) / Math.abs(dx);
  const sy = dy === 0 ? Infinity : (node.h / 2 + pad) / Math.abs(dy);
  const s = Math.min(sx, sy);
  return { x: cx + dx * s, y: cy + dy * s };
}

const center = (n) => ({ x: n.x + n.w / 2, y: n.y + n.h / 2 });

function wrapLabel(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  words.forEach((word) => {
    if ((`${line} ${word}`).trim().length > maxChars && line) { lines.push(line); line = word; }
    else line = `${line} ${word}`.trim();
  });
  if (line) lines.push(line);
  return lines;
}

// Dibuja un diagrama declarado en JSON: grupos, nodos seleccionables y aristas etiquetadas.
export function renderDiagram(arch) {
  const nodeById = new Map(arch.nodes.map((n) => [n.id, n]));
  const [, , width, height] = arch.viewBox.split(' ').map(Number);

  const groups = (arch.groups ?? []).map((g) => `
    <g class="dg-group">
      <rect x="${g.x}" y="${g.y}" width="${g.w}" height="${g.h}" rx="10"/>
      <text x="${g.x + 14}" y="${g.y + 22}">${esc(g.label)}</text>
    </g>`).join('');

  const edges = arch.edges.map((e, i) => {
    const from = nodeById.get(e.from);
    const to = nodeById.get(e.to);
    const a = edgePoint(from, center(to));
    const b = edgePoint(to, center(from), 7);
    const lx = (a.x + b.x) / 2 + (e.lx ?? 0);
    const ly = (a.y + b.y) / 2 + (e.ly ?? 0);
    const start = e.both ? 'marker-start="url(#dg-arrow-start)"' : '';
    const label = e.label ? `
      <g class="dg-edge-label">
        <rect x="${lx - e.label.length * 3.15 - 5}" y="${ly - 10}" width="${e.label.length * 6.3 + 10}" height="20" rx="4"/>
        <text x="${lx}" y="${ly + 4}" text-anchor="middle">${esc(e.label)}</text>
      </g>` : '';
    return `<g class="dg-edge ${e.dashed ? 'dashed' : ''}" data-edge="${i}" data-from="${e.from}" data-to="${e.to}">
      <line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" marker-end="url(#dg-arrow)" ${start}/>${label}
    </g>`;
  }).join('');

  const nodes = arch.nodes.map((n) => {
    const lines = wrapLabel(n.label, Math.max(8, Math.floor(n.w / 8.2)));
    const totalLines = lines.length + (n.sublabel ? 1 : 0);
    const firstY = n.y + n.h / 2 - ((totalLines - 1) * 17) / 2 + 5;
    const labelSvg = lines.map((line, i) => `<text class="dg-label" x="${n.x + n.w / 2}" y="${firstY + i * 17}" text-anchor="middle">${esc(line)}</text>`).join('');
    const sub = n.sublabel ? `<text class="dg-sub" x="${n.x + n.w / 2}" y="${firstY + lines.length * 17}" text-anchor="middle">${esc(n.sublabel)}</text>` : '';
    return `<g class="dg-node kind-${n.kind ?? 'default'}" data-node="${n.id}" role="button" tabindex="0" aria-label="${esc(n.label)}: ver explicación">
      <rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="8"/>${labelSvg}${sub}
    </g>`;
  }).join('');

  return raw(`<svg class="diagram" viewBox="${arch.viewBox}" style="min-width:${Math.min(width, 620)}px" role="group" aria-label="Diagrama: ${esc(arch.title)}" data-height="${height}">
    <defs>
      <marker id="dg-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" class="dg-arrow-head"/></marker>
      <marker id="dg-arrow-start" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" class="dg-arrow-head"/></marker>
    </defs>
    ${groups}${edges}${nodes}
  </svg>`);
}
