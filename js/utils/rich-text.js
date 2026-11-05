import { db } from '../data-loader.js';
import { esc, raw } from './dom.js';

// Marcado mínimo del contenido JSON: `código`, **negrita** y [[id-concepto|etiqueta]].
function inline(text) {
  const parts = String(text ?? '').split(/(`[^`]+`)/g);
  return parts.map((part) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return `<code>${esc(part.slice(1, -1))}</code>`;
    }
    return esc(part)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g, (_, id, label) => {
        const concept = db.conceptById?.get(id);
        const text2 = label || concept?.title || id;
        return concept ? `<a href="#/article/${id}">${text2}</a>` : text2;
      });
  }).join('');
}

export const richInline = (text) => raw(inline(text));

// Convierte párrafos separados por línea en blanco y listas con "- " en HTML.
export function rich(text) {
  const blocks = String(text ?? '').split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  return raw(blocks.map((block) => {
    const lines = block.split('\n');
    if (lines.every((l) => l.startsWith('- '))) {
      return `<ul>${lines.map((l) => `<li>${inline(l.slice(2))}</li>`).join('')}</ul>`;
    }
    return `<p>${inline(block)}</p>`;
  }).join(''));
}

// Texto plano para indexar en la búsqueda.
export function plain(text) {
  return String(text ?? '')
    .replace(/\[\[[a-z0-9-]+\|([^\]]+)\]\]/g, '$1')
    .replace(/\[\[([a-z0-9-]+)\]\]/g, '$1')
    .replace(/[`*]/g, '');
}
