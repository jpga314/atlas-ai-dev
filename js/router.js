// Router por hash: "#/article/mcp?x=1". Cada ruta devuelve { title, crumbs, content, mount, liveState }.
const routes = [];
let currentRender = null;

export function route(pattern, handler) {
  const keys = [];
  const source = pattern.replace(/:[a-z]+/gi, (m) => { keys.push(m.slice(1)); return '([^/]+)'; });
  routes.push({ regex: new RegExp(`^${source}/?$`), keys, handler });
}

export function parseHash() {
  const hash = location.hash.replace(/^#/, '') || '/';
  const [path, queryString = ''] = hash.split('?');
  return { path, query: Object.fromEntries(new URLSearchParams(queryString)) };
}

export function match(path) {
  for (const { regex, keys, handler } of routes) {
    const m = regex.exec(path);
    if (m) {
      const params = Object.fromEntries(keys.map((k, i) => [k, decodeURIComponent(m[i + 1])]));
      return { handler, params };
    }
  }
  return null;
}

export function startRouter(render) {
  currentRender = render;
  window.addEventListener('hashchange', () => render({ resetScroll: true }));
  render({ resetScroll: false, initial: true });
}

export const refresh = () => currentRender?.({ resetScroll: false, keepFocus: true });

export const go = (hash) => { location.hash = hash; };

// Actualiza la URL sin volver a pintar la página (estado interno de una vista compartible).
export function replaceHash(hash) {
  history.replaceState(null, '', hash);
}
