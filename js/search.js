import { db } from './data-loader.js';
import { normalize } from './utils/format.js';
import { plain } from './utils/rich-text.js';

const STOPWORDS = new Set(['de', 'la', 'el', 'los', 'las', 'y', 'en', 'un', 'una', 'que', 'con', 'por', 'para', 'del', 'al', 'es', 'como', 'the', 'of', 'and', 'vs', 'o']);

export const TYPE_LABELS = {
  article: 'Artículos', tool: 'Herramientas', comparison: 'Comparativas',
  example: 'Ejemplos', timeline: 'Timeline', architecture: 'Arquitecturas',
};

let documents = [];

function addDoc(doc) {
  const body = plain(doc.body.filter(Boolean).join(' · '));
  documents.push({
    ...doc,
    body,
    normTitle: normalize(doc.title),
    normAliases: normalize((doc.aliases ?? []).join(' ')),
    normBody: normalize(body),
  });
}

export function buildIndex() {
  documents = [];
  db.concepts.forEach((c) => addDoc({
    type: 'article', ref: `article:${c.id}`, title: c.title, subtitle: `${c.code} · ${db.categoryById.get(c.category).name}`,
    href: `#/article/${c.id}`, aliases: c.aliases,
    body: [c.description, c.technicalExplanation, c.problem, c.howItWorks, c.whenToUse, ...c.advantages, ...c.limitations],
  }));
  db.tools.forEach((t) => addDoc({
    type: 'tool', ref: `tool:${t.id}`, title: t.name, subtitle: t.categoryLabel, href: `#/tools/${t.id}`, aliases: t.aliases,
    body: [t.description, ...t.features, ...t.useCases],
  }));
  db.comparisons.forEach((c) => addDoc({
    type: 'comparison', ref: `comparison:${c.id}`, title: c.title, subtitle: 'Comparativa', href: `#/compare/${c.id}`,
    body: [c.summary, c.a.what, c.b.what],
  }));
  db.examples.forEach((e) => addDoc({
    type: 'example', ref: `example:${e.id}`, title: e.title, subtitle: e.topic, href: `#/playground/${e.id}`,
    body: [e.objective, e.context, e.implementation, ...e.files.map((f) => f.code)],
  }));
  db.timeline.events.forEach((e) => addDoc({
    type: 'timeline', ref: `timeline:${e.id}`, title: e.name, subtitle: `Timeline · ${e.dateLabel}`, href: `#/timeline/${e.id}`,
    body: [e.description, e.importance, ...e.technologies],
  }));
  db.architectures.forEach((a) => addDoc({
    type: 'architecture', ref: `architecture:${a.id}`, title: a.title, subtitle: 'Architecture Lab', href: `#/lab/${a.id}`,
    body: [a.summary, ...a.nodes.map((n) => `${n.label} ${n.description}`)],
  }));
}

export function tokenize(query) {
  const tokens = normalize(query).split(/[^\p{L}\p{N}._-]+/u).filter(Boolean);
  const useful = tokens.filter((t) => !STOPWORDS.has(t));
  return useful.length ? useful : tokens;
}

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function scoreDoc(doc, tokens) {
  let score = 0;
  for (const token of tokens) {
    let tokenScore = 0;
    if (doc.normTitle === token) tokenScore += 60;
    else if (new RegExp(`(^|[^\\p{L}\\p{N}])${escapeRegex(token)}`, 'u').test(doc.normTitle)) tokenScore += 30;
    else if (doc.normTitle.includes(token)) tokenScore += 16;
    if (doc.normAliases.includes(token)) tokenScore += 22;
    if (doc.normBody.includes(token)) tokenScore += 3 + Math.min(doc.normBody.split(token).length - 1, 6);
    if (tokenScore === 0) return 0; // Todos los términos deben aparecer.
    score += tokenScore;
  }
  return score;
}

function makeSnippet(doc, tokens, radius = 90) {
  const index = tokens.map((t) => doc.normBody.indexOf(t)).filter((i) => i >= 0).sort((a, b) => a - b)[0];
  if (index === undefined) return doc.body.slice(0, radius * 2) + (doc.body.length > radius * 2 ? '…' : '');
  const start = Math.max(0, index - radius);
  const end = Math.min(doc.body.length, index + radius);
  return `${start > 0 ? '…' : ''}${doc.body.slice(start, end).replace(/\s+/g, ' ')}${end < doc.body.length ? '…' : ''}`;
}

export function search(query, { limit = 60 } = {}) {
  const tokens = tokenize(query);
  if (!tokens.length) return { tokens, results: [] };
  const results = documents
    .map((doc) => ({ doc, score: scoreDoc(doc, tokens) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title, 'es'))
    .slice(0, limit)
    .map(({ doc, score }) => ({ ...doc, score, snippet: makeSnippet(doc, tokens) }));
  return { tokens, results };
}

// Devuelve fragmentos [{text, hit}] para resaltar coincidencias sin inyectar HTML.
export function markHits(text, tokens) {
  const norm = normalize(text);
  const ranges = [];
  tokens.forEach((token) => {
    let i = norm.indexOf(token);
    while (i >= 0 && token) {
      ranges.push([i, i + token.length]);
      i = norm.indexOf(token, i + token.length);
    }
  });
  ranges.sort((a, b) => a[0] - b[0]);
  const parts = [];
  let cursor = 0;
  ranges.forEach(([start, end]) => {
    if (start < cursor) return;
    if (start > cursor) parts.push({ text: text.slice(cursor, start), hit: false });
    parts.push({ text: text.slice(start, end), hit: true });
    cursor = end;
  });
  if (cursor < text.length) parts.push({ text: text.slice(cursor), hit: false });
  return parts;
}
