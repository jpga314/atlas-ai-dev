import { loadState, saveState, clearState, DEFAULT_STATE } from './storage.js';

const HISTORY_LIMIT = 30;
let state = loadState();
const listeners = new Set();

function commit() {
  saveState(state);
  listeners.forEach((fn) => fn(state));
}

export const getState = () => state;
export const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };
export const has = (list, ref) => state[list].includes(ref);

export function toggle(list, ref) {
  const on = !has(list, ref);
  state[list] = on ? [...state[list], ref] : state[list].filter((r) => r !== ref);
  // Leer un artículo lo saca de la lista de pendientes.
  if (list === 'read' && on) state.readLater = state.readLater.filter((r) => r !== ref);
  commit();
  return on;
}

export function visit(ref) {
  const rest = state.history.filter((h) => h.ref !== ref);
  state.history = [{ ref, at: Date.now() }, ...rest].slice(0, HISTORY_LIMIT);
  saveState(state);
}

export function clearHistory() {
  state.history = [];
  commit();
}

export function setPref(key, value) {
  state.prefs = { ...state.prefs, [key]: value };
  applyPrefs();
  commit();
}

export function setActivePath(id) {
  state.activePath = id;
  commit();
}

export function resetAll() {
  clearState();
  state = structuredClone(DEFAULT_STATE);
  applyPrefs();
  commit();
}

export function applyPrefs() {
  const root = document.documentElement;
  root.dataset.theme = state.prefs.theme;
  root.dataset.reading = state.prefs.readingSize;
  root.dataset.codeWrap = state.prefs.codeWrap ? 'on' : 'off';
  document.querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', state.prefs.theme === 'light' ? '#F4EDE0' : '#14123D');
}
