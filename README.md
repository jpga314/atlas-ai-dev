# AI Dev Atlas

Enciclopedia interactiva centrada exclusivamente en el desarrollo con agentes de IA. Es una aplicación estática en HTML, CSS y JavaScript Vanilla: sin backend, sin frameworks y sin dependencias que instalar.

## Cómo ejecutarla

**Opción 1: doble clic.** Abre `index.html`. En `file://` los navegadores bloquean por CORS los módulos ES y `fetch()`, así que la página carga `js/standalone.js`, que incluye todo el código y los datos.

**Opción 2: servidor estático**, recomendada para desarrollar, porque usa directamente los módulos y los JSON:

```bash
python -m http.server 8123
```

Después abre `http://localhost:8123`. Si no ves un cambio de CSS o JavaScript, recarga con Ctrl+F5.

> Tras cambiar código o datos, si quieres seguir usando el doble clic, regenera el bundle con `node scripts/build-standalone.mjs`.

Node.js solo se usa para estos scripts de mantenimiento: la aplicación no lo necesita para ejecutarse.

## Estructura

```text
ai-dev-atlas/
├── index.html
├── assets/              Favicon
├── css/                 variables, layout, components, pages, responsive
├── data/                Todo el contenido, en JSON
├── js/
│   ├── app.js           Arranque, rutas y eventos globales
│   ├── router.js        Hash routing
│   ├── state.js         Estado del usuario
│   ├── storage.js       Persistencia en LocalStorage
│   ├── search.js        Índice y búsqueda global
│   ├── data-loader.js   Carga de datos e índices
│   ├── standalone.js    Generado: no editar
│   ├── components/      Interfaz reutilizable, incluido el renderizador de diagramas
│   ├── pages/           Una vista por sección
│   └── utils/           Plantillas, formato, texto enriquecido y resaltado
└── scripts/
    ├── validate-data.mjs    Valida campos y referencias
    └── build-standalone.mjs Genera js/standalone.js
```

## Rutas

Todas las secciones y artículos tienen URL propia:

| Ruta | Vista |
| --- | --- |
| `#/` | Dashboard |
| `#/encyclopedia`, `#/encyclopedia/<categoría>` | Enciclopedia |
| `#/article/<id>` | Artículo |
| `#/timeline`, `#/timeline/<id>` | Timeline |
| `#/tools`, `#/tools/<id>`, `#/tools/compare?ids=a,b` | Herramientas |
| `#/compare`, `#/compare/<id>`, `#/compare/custom?a=x&b=y` | Comparativas |
| `#/lab/<id>?node=<nodo>` | Architecture Lab |
| `#/playground`, `#/playground/<id>` | Ejemplos |
| `#/playground/real-world` | Repositorios públicos reales |
| `#/playground/context-simulator` | Simulador de contexto |
| `#/roadmaps`, `#/roadmaps/<id>?node=<concepto>` | Roadmaps visuales |
| `#/library?tab=favorites` | Biblioteca personal y preferencias |
| `#/search?q=<texto>` | Búsqueda |

Atajos: `/` o `Ctrl+K` para buscar.

## Cómo añadir contenido

No hace falta tocar el código: edita el JSON correspondiente en `data/` y valida.

```bash
node scripts/validate-data.mjs
```

| Archivo | Qué contiene |
| --- | --- |
| `categories.json` | Categorías de la enciclopedia |
| `concepts.json` | Artículos |
| `tools.json` | Fichas (`items`) y la lista de capacidades comparables (`capabilities`) |
| `timeline.json` | Carriles (`lanes`) e hitos (`events`) |
| `comparisons.json` | Comparativas |
| `examples.json` | Ejemplos del Playground |
| `architectures.json` | Diagramas: nodos, aristas y grupos, con sus coordenadas |
| `learning-paths.json` | Roadmaps: etapas, estaciones (`nodes`) y ramas opcionales (`branches`) |
| `real-world.json` | Archivos de repositorios públicos, con resumen propio |
| `simulations.json` | Guion de la simulación del inicio y datos del simulador de contexto |

Copia una entrada existente como plantilla. Los identificadores deben ser únicos y estables, porque los favoritos y el historial se guardan por identificador.

**Pestañas por herramienta:** un artículo puede incluir `perTool` (`tool`, `path`, `text`, `code`, `language`), y un archivo de ejemplo puede incluir `tool`. La herramienta elegida se recuerda en todo el sitio.

**Marcado en los textos:** `` `código` ``, `**negrita**`, enlace a un concepto con `[[id]]` o `[[id|texto]]`, párrafos separados por una línea en blanco y listas con `- `.

**Tablas de capacidades:** los valores son `yes`, `partial`, `no` o `unknown`. Si no se ha confirmado en una fuente, usa `unknown`: la interfaz lo muestra como “Sin verificar”.

## Política editorial

Cada entrada tiene un estado:

- **verified:** contrastada con una fuente leída en la fecha de `lastVerified`. Requiere esa fecha y al menos una fuente.
- **needs-review:** tiene fuentes enlazadas, pero falta contrastarla línea a línea.
- **draft:** el término o el contenido aún no está asentado.

No marques algo como `verified` solo porque el enlace funcione. Si un dato cambia, actualízalo junto con `lastVerified`. El ecosistema de IA cambia rápido: conviene empezar las revisiones por `tools.json`.

## Estado del contenido inicial (5 de noviembre de 2026)

- 47 artículos: 28 Verified, 18 Needs review y 1 Draft.
- 18 ejemplos. El campo `tested` indica qué se ha ejecutado de verdad; los formatos de cada herramienta se basan en su documentación y no se han probado en cada una.
- Los archivos de `real-world.json` se resumen con palabras propias y se enlazan, sin copiar su contenido: cada uno pertenece a su proyecto.
- 2 enlaces de OpenAI bloquean la lectura automática y deben contrastarse a mano.
- El alcance es deliberadamente estrecho: los temas generales de ingeniería, testing y DevOps quedan fuera. Git solo aparece en lo necesario para aislar agentes en paralelo.
- En los ejemplos, el campo `tested` indica qué se ha ejecutado de verdad. Los que requieren un agente real o un repositorio en GitHub no se han ejecutado, y así lo indican.

## Movimiento

Las animaciones están en `js/utils/motion.js` y en `css/pages.css`. Si el sistema pide reducir el movimiento, no se aplican: la simulación del inicio se muestra completa y estática. Esa simulación se pausa fuera de pantalla y tiene un botón de pausa.

## Persistencia

Se guardan en LocalStorage (clave `ai-dev-atlas:v1`), solo como identificadores: favoritos, pendientes, leídos, historial, ruta activa y preferencias. El progreso se calcula a partir de los artículos leídos. Se puede borrar todo desde Mi biblioteca → Preferencias.

## Dependencia externa

Las fuentes tipográficas Inter, Manrope y JetBrains Mono se cargan desde Google Fonts, sin autenticación. Sin conexión, la aplicación funciona igualmente con las fuentes del sistema.
