// Persistencia local: solo identificadores y preferencias, nunca contenido.
const KEY = 'ai-dev-atlas:v1';

export const DEFAULT_STATE = {
  favorites: [],
  readLater: [],
  read: [],
  history: [],
  activePath: null,
  prefs: { theme: 'dark', readingSize: 'md', codeWrap: false, tool: null },
};

let memoryFallback = null;

export function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) ?? 'null') ?? memoryFallback;
    if (!stored) return structuredClone(DEFAULT_STATE);
    return { ...structuredClone(DEFAULT_STATE), ...stored, prefs: { ...DEFAULT_STATE.prefs, ...stored.prefs } };
  } catch {
    return memoryFallback ?? structuredClone(DEFAULT_STATE);
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Modo privado o cuota agotada: la sesión sigue funcionando en memoria.
    memoryFallback = state;
  }
}

export function clearState() {
  try { localStorage.removeItem(KEY); } catch { /* sin almacenamiento disponible */ }
  memoryFallback = null;
}
