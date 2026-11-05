// Carga las colecciones JSON y construye los índices que usa el resto de la app.
const COLLECTIONS = ['categories', 'concepts', 'tools', 'timeline', 'comparisons', 'examples', 'architectures', 'learning-paths'];

export const db = {};

const byId = (items) => new Map(items.map((item) => [item.id, item]));

export async function loadData() {
  const loaded = await Promise.all(COLLECTIONS.map(async (name) => {
    // En file:// los datos llegan incrustados en js/standalone.js.
    if (window.__ATLAS_DATA__) return structuredClone(window.__ATLAS_DATA__[name]);
    const response = await fetch(`data/${name}.json`);
    if (!response.ok) throw new Error(`No se pudo cargar data/${name}.json (${response.status})`);
    return response.json();
  }));

  COLLECTIONS.forEach((name, i) => { db[name === 'learning-paths' ? 'paths' : name] = loaded[i]; });

  db.capabilityLabels = db.tools.capabilities;
  db.tools = db.tools.items;

  db.categoryById = byId(db.categories);
  db.conceptById = byId(db.concepts);
  db.toolById = byId(db.tools);
  db.timelineById = byId(db.timeline.events);
  db.comparisonById = byId(db.comparisons);
  db.exampleById = byId(db.examples);
  db.architectureById = byId(db.architectures);
  db.pathById = byId(db.paths);

  // Código tipo atlas: letra de categoría + posición dentro de ella, p. ej. "E.07".
  db.conceptsByCategory = new Map(db.categories.map((c) => [c.id, []]));
  db.concepts.forEach((concept) => {
    const list = db.conceptsByCategory.get(concept.category);
    list.push(concept);
    const letter = db.categoryById.get(concept.category).letter;
    concept.code = `${letter}.${String(list.length).padStart(2, '0')}`;
  });
  db.concepts.forEach((concept) => {
    (concept.alsoIn ?? []).forEach((cat) => db.conceptsByCategory.get(cat).push(concept));
  });
}

// Una referencia "tipo:id" se resuelve a título y enlace para favoritos e historial.
export function resolveRef(ref) {
  const [type, id] = ref.split(':');
  switch (type) {
    case 'article': {
      const item = db.conceptById.get(id);
      return item && { type, typeLabel: 'Artículo', title: item.title, href: `#/article/${id}`, meta: db.categoryById.get(item.category).name, item };
    }
    case 'tool': {
      const item = db.toolById.get(id);
      return item && { type, typeLabel: 'Herramienta', title: item.name, href: `#/tools/${id}`, meta: item.categoryLabel, item };
    }
    case 'comparison': {
      const item = db.comparisonById.get(id);
      return item && { type, typeLabel: 'Comparativa', title: item.title, href: `#/compare/${id}`, meta: 'Comparativa', item };
    }
    case 'example': {
      const item = db.exampleById.get(id);
      return item && { type, typeLabel: 'Ejemplo', title: item.title, href: `#/playground/${id}`, meta: item.topic, item };
    }
    default:
      return null;
  }
}
