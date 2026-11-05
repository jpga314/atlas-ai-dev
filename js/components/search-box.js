import { $, $$, html } from '../utils/dom.js';
import { go } from '../router.js';
import { search, markHits, TYPE_LABELS } from '../search.js';

export const highlightHits = (text, tokens) => markHits(text, tokens).map((p) => (p.hit ? html`<mark>${p.text}</mark>` : p.text));

// Conecta un input con el panel de resultados instantáneos. Se reutiliza en cabecera e inicio.
export function attachSearchBox(box) {
  const input = $('input', box);
  const panel = $('.search-panel', box);
  let active = -1;

  const close = () => { panel.hidden = true; active = -1; input.setAttribute('aria-expanded', 'false'); };

  const setActive = (index) => {
    const items = $$('[data-result]', panel);
    if (!items.length) return;
    active = (index + items.length) % items.length;
    items.forEach((item, i) => item.classList.toggle('active', i === active));
    items[active].scrollIntoView({ block: 'nearest' });
  };

  const update = () => {
    const query = input.value.trim();
    if (!query) { close(); return; }
    const { tokens, results } = search(query, { limit: 8 });
    active = -1;
    panel.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    if (!results.length) {
      panel.innerHTML = html`<p class="search-none">Sin resultados para “${query}”. Prueba con otro término, por ejemplo <em>worktree</em> o <em>MCP</em>.</p>`.toString();
      return;
    }
    panel.innerHTML = html`
      <ul>${results.map((r) => html`<li><a data-result href="${r.href}">
        <span class="result-type">${TYPE_LABELS[r.type]}</span>
        <span class="result-title">${highlightHits(r.title, tokens)}</span>
        <span class="result-sub">${r.subtitle}</span>
      </a></li>`)}</ul>
      <a class="search-all" data-result href="#/search?q=${encodeURIComponent(query)}">Ver todos los resultados de “${query}”</a>`.toString();
  };

  input.setAttribute('aria-expanded', 'false');
  input.addEventListener('input', update);
  input.addEventListener('focus', update);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
    else if (e.key === 'Escape') { close(); input.blur(); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = $$('[data-result]', panel)[active];
      if (selected) go(selected.getAttribute('href'));
      else if (input.value.trim()) go(`#/search?q=${encodeURIComponent(input.value.trim())}`);
      close();
      input.blur();
    }
  });
  panel.addEventListener('click', (e) => { if (e.target.closest('a')) { close(); input.value = ''; } });
  document.addEventListener('click', (e) => { if (!box.contains(e.target)) close(); });
}
