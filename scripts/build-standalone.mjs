// Genera js/standalone.js: los módulos y los JSON en un único script clásico.
// Los navegadores bloquean por CORS los módulos ES y fetch() en file://; este archivo
// permite abrir index.html con doble clic. Ejecutar tras cambiar código o datos:
//   node scripts/build-standalone.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join, posix, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const jsDir = join(root, 'js');
const OUTPUT = 'standalone.js';

const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const full = join(dir, entry.name);
  return entry.isDirectory() ? walk(full) : [full];
});

const toId = (file) => relative(jsDir, file).split('\\').join('/');

function transform(source, id) {
  const exported = [];
  const body = source
    .replace(/^import\s+\{([^}]*)\}\s+from\s+'([^']+)';?$/gm, (_, names, spec) => {
      const target = posix.normalize(posix.join(posix.dirname(id), spec));
      const bindings = names.split(',').map((n) => n.trim()).filter(Boolean).map((n) => n.replace(/\s+as\s+/, ': ')).join(', ');
      return `const { ${bindings} } = __require('${target}');`;
    })
    .replace(/^export\s+(async\s+function|function|class)\s+([\w$]+)/gm, (_, kind, name) => {
      exported.push(name);
      return `${kind} ${name}`;
    })
    .replace(/^export\s+(const|let)\s+([\w$]+)/gm, (_, kind, name) => {
      exported.push(name);
      return `${kind} ${name}`;
    });
  if (/^\s*(import|export)\s/m.test(body)) throw new Error(`Sintaxis de módulo no soportada en ${id}`);
  // Los exports se leen con getters para conservar los enlaces vivos de los módulos ES.
  const getters = exported.map((name) => `get ${name}() { return ${name}; }`).join(', ');
  return `__define('${id}', (__require) => {\n${body}\nreturn { ${getters} };\n});`;
}

const modules = walk(jsDir)
  .filter((file) => file.endsWith('.js') && !file.endsWith(OUTPUT))
  .map((file) => transform(readFileSync(file, 'utf8'), toId(file)));

const data = {};
for (const file of readdirSync(join(root, 'data')).filter((f) => f.endsWith('.json'))) {
  data[file.replace('.json', '')] = JSON.parse(readFileSync(join(root, 'data', file), 'utf8'));
}

const output = `// Archivo generado por scripts/build-standalone.mjs. No editar a mano.
window.__ATLAS_DATA__ = ${JSON.stringify(data).replace(/<\/script/g, '<\\/script')};
(() => {
const __factories = new Map();
const __cache = new Map();
const __define = (id, factory) => __factories.set(id, factory);
const __require = (id) => {
  if (!__cache.has(id)) {
    if (!__factories.has(id)) throw new Error('Módulo no encontrado: ' + id);
    __cache.set(id, __factories.get(id)(__require));
  }
  return __cache.get(id);
};
${modules.join('\n')}
__require('app.js');
})();
`;

writeFileSync(join(jsDir, OUTPUT), output);
console.log(`js/${OUTPUT}: ${modules.length} módulos, ${Object.keys(data).length} colecciones, ${Math.round(output.length / 1024)} KB`);
