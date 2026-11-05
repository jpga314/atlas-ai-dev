// Comprueba campos obligatorios y referencias entre colecciones. Uso: node scripts/validate-data.mjs
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dataDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'data');
const load = (name) => JSON.parse(readFileSync(join(dataDir, `${name}.json`), 'utf8'));

const categories = load('categories');
const concepts = load('concepts');
const { items: tools } = load('tools');
const { events, lanes } = load('timeline');
const comparisons = load('comparisons');
const examples = load('examples');
const architectures = load('architectures');
const paths = load('learning-paths');

const problems = [];
const ids = (list) => new Set(list.map((x) => x.id));
const conceptIds = ids(concepts);
const toolIds = ids(tools);
const categoryIds = ids(categories);
const laneIds = ids(lanes);
const STATUS = new Set(['verified', 'needs-review', 'draft']);
const DIFFICULTY = new Set(['beginner', 'intermediate', 'advanced']);

const requireFields = (where, item, fields) => fields.forEach((f) => {
  if (item[f] === undefined || item[f] === null || item[f] === '') problems.push(`${where}: falta "${f}"`);
});
const refs = (where, list, set) => (list ?? []).forEach((id) => { if (!set.has(id)) problems.push(`${where}: referencia desconocida "${id}"`); });
const unique = (name, list) => {
  const seen = new Set();
  list.forEach((x) => { if (seen.has(x.id)) problems.push(`${name}: id duplicado "${x.id}"`); seen.add(x.id); });
};
const editorial = (where, item) => {
  if (!STATUS.has(item.status)) problems.push(`${where}: estado no válido "${item.status}"`);
  if (item.status === 'verified' && !item.lastVerified) problems.push(`${where}: Verified sin lastVerified`);
  if (item.status === 'verified' && !item.sources?.length) problems.push(`${where}: Verified sin fuentes`);
};

[['concepts', concepts], ['tools', tools], ['timeline', events], ['comparisons', comparisons], ['examples', examples], ['architectures', architectures], ['learning-paths', paths]]
  .forEach(([name, list]) => unique(name, list));

concepts.forEach((c) => {
  const where = `concepto ${c.id}`;
  requireFields(where, c, ['title', 'category', 'difficulty', 'description', 'technicalExplanation', 'problem', 'howItWorks', 'whenToUse', 'advantages', 'limitations', 'example', 'sources', 'status', 'addedAt']);
  if (!categoryIds.has(c.category)) problems.push(`${where}: categoría desconocida "${c.category}"`);
  if (!DIFFICULTY.has(c.difficulty)) problems.push(`${where}: dificultad no válida "${c.difficulty}"`);
  editorial(where, c);
  refs(where, c.relatedConcepts.map((r) => r.id), conceptIds);
  refs(where, c.prerequisites, conceptIds);
  refs(where, c.tools, toolIds);
  refs(where, [...JSON.stringify(c).matchAll(/\[\[([a-z0-9-]+)/g)].map((m) => m[1]), conceptIds);
});
tools.forEach((t) => {
  requireFields(`herramienta ${t.id}`, t, ['name', 'category', 'description', 'features', 'useCases', 'advantages', 'limitations', 'docs', 'status']);
  editorial(`herramienta ${t.id}`, t);
  refs(`herramienta ${t.id}`, t.relatedConcepts, conceptIds);
});
events.forEach((e) => {
  requireFields(`hito ${e.id}`, e, ['name', 'dateLabel', 'start', 'description', 'importance', 'sources', 'status']);
  editorial(`hito ${e.id}`, e);
  if (!laneIds.has(e.lane)) problems.push(`hito ${e.id}: carril desconocido "${e.lane}"`);
  refs(`hito ${e.id}`, e.relatedConcepts, conceptIds);
});
comparisons.forEach((c) => {
  editorial(`comparativa ${c.id}`, c);
  [c.a, c.b].forEach((side) => {
    requireFields(`comparativa ${c.id}`, side, ['name', 'what', 'goal', 'pros', 'cons', 'chooseWhen', 'example']);
    if (side.concept) refs(`comparativa ${c.id}`, [side.concept], conceptIds);
  });
});
examples.forEach((e) => {
  requireFields(`ejemplo ${e.id}`, e, ['title', 'topic', 'objective', 'context', 'implementation', 'files', 'parts', 'expected', 'whenToUse', 'limitations']);
  editorial(`ejemplo ${e.id}`, e);
  refs(`ejemplo ${e.id}`, e.concepts, conceptIds);
});
architectures.forEach((a) => {
  editorial(`arquitectura ${a.id}`, a);
  const nodeIds = ids(a.nodes);
  a.nodes.forEach((n) => { if (n.concept) refs(`arquitectura ${a.id}`, [n.concept], conceptIds); });
  a.edges.forEach((e) => refs(`arquitectura ${a.id}`, [e.from, e.to], nodeIds));
});
paths.forEach((p) => refs(`ruta ${p.id}`, p.steps.map((s) => s.concept), conceptIds));

if (problems.length) {
  console.error(`${problems.length} problemas:\n${problems.join('\n')}`);
  process.exit(1);
}
console.log(`Datos correctos: ${concepts.length} conceptos, ${tools.length} herramientas, ${events.length} hitos, ${comparisons.length} comparativas, ${examples.length} ejemplos, ${architectures.length} arquitecturas, ${paths.length} rutas.`);
