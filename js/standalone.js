// Archivo generado por scripts/build-standalone.mjs. No editar a mano.
window.__ATLAS_DATA__ = {"architectures":[{"id":"coding-agent","short":"AI Coding Agent","title":"Arquitectura de un AI Coding Agent","status":"verified","summary":"Un modelo que decide, un bucle que ejecuta y un harness que aporta contexto, herramientas y controles.","viewBox":"0 0 860 520","groups":[{"label":"Harness","x":200,"y":20,"w":450,"h":480},{"label":"Entorno","x":680,"y":150,"w":170,"h":280}],"nodes":[{"id":"user","label":"Persona","x":20,"y":210,"w":150,"h":64,"kind":"default","description":"Define el objetivo, aprueba acciones de riesgo y revisa el resultado. No desaparece del proceso: se traslada a la especificación y a la revisión."},{"id":"loop","label":"Bucle del agente","x":340,"y":210,"w":170,"h":64,"kind":"accent","description":"El corazón del agente: envía el contexto al modelo, ejecuta las herramientas pedidas, añade el resultado y repite hasta una condición de parada.","concept":"agent-lifecycle"},{"id":"model","label":"Modelo (LLM)","x":340,"y":60,"w":170,"h":64,"kind":"primary","description":"Decide la siguiente acción a partir del contexto. No ejecuta nada ni recuerda nada entre llamadas: todo lo demás lo pone el harness.","concept":"model-providers"},{"id":"context","label":"Contexto","x":220,"y":370,"w":130,"h":64,"kind":"default","description":"Lo que el modelo ve en cada llamada: instrucciones, historial, archivos leídos y resultados. Es limitado, y hay que gestionarlo.","concept":"context-engineering"},{"id":"instructions","label":"Instrucciones","x":220,"y":60,"w":100,"h":64,"kind":"store","description":"AGENTS.md, CLAUDE.md y reglas. Se cargan como contexto; orientan al modelo, pero no lo obligan.","concept":"agents-md"},{"id":"perms","label":"Permisos y hooks","x":510,"y":370,"w":125,"h":64,"kind":"default","description":"Se interponen antes y después de cada acción. Son el control determinista: lo que no puede quedar a criterio del modelo.","concept":"hooks"},{"id":"memory","label":"Memoria","x":365,"y":370,"w":125,"h":64,"kind":"store","description":"Notas fuera de la ventana de contexto, que sobreviven entre sesiones y se reinyectan.","concept":"persistent-memory"},{"id":"tools","label":"Herramientas","x":695,"y":275,"w":140,"h":56,"kind":"primary","description":"Leer, editar, buscar, ejecutar comandos. Aquí es donde el agente deja de hablar y empieza a actuar.","concept":"tools-agent"},{"id":"repo","label":"Repositorio y terminal","x":695,"y":190,"w":140,"h":56,"kind":"default","description":"El entorno real. Ejecutar tests aquí da al agente un resultado objetivo con el que corregirse.","concept":"git-worktrees"},{"id":"mcp","label":"Servidores MCP","x":695,"y":355,"w":140,"h":56,"kind":"default","description":"Sistemas externos conectados con un protocolo común.","concept":"mcp"}],"edges":[{"from":"user","to":"loop","label":"objetivo","both":true,"ly":-14},{"from":"loop","to":"model","label":"contexto ↔ decisión","both":true,"lx":2},{"from":"instructions","to":"model","dashed":true},{"from":"context","to":"loop"},{"from":"memory","to":"loop","dashed":true},{"from":"loop","to":"perms","label":"valida"},{"from":"perms","to":"tools","label":"ejecuta","lx":-6,"ly":-4},{"from":"tools","to":"repo"},{"from":"tools","to":"mcp","dashed":true}],"notes":"Fíjate en cuántas piezas no son el modelo. Por eso dos productos con el mismo modelo pueden comportarse de forma muy diferente, y por eso se habla de [[agentic-harness|harness]].\n\nEl diagrama es un modelo conceptual, no el diseño interno de un producto concreto: cada herramienta organiza estas piezas a su manera.","sources":[{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"},{"title":"Birgitta Böckeler: Harness engineering for coding agent users","url":"https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html","note":"martinfowler.com, 2 de abril de 2026"},{"title":"Claude Code: overview","url":"https://code.claude.com/docs/en/overview"}],"lastVerified":"2026-11-05"},{"id":"multi-agent","short":"Sistema multiagente","title":"Arquitectura de un sistema multiagente","status":"verified","summary":"Un orquestador divide el trabajo, varios agentes lo ejecutan con su propio contexto y un punto común integra los resultados.","viewBox":"0 0 860 480","groups":[{"label":"Contextos aislados","x":40,"y":165,"w":780,"h":130}],"nodes":[{"id":"objective","label":"Objetivo","x":345,"y":15,"w":170,"h":50,"kind":"default","description":"La tarea global, tal como la plantea una persona."},{"id":"orch","label":"Orquestador","x":345,"y":95,"w":170,"h":54,"kind":"accent","description":"Descompone el objetivo, decide qué se hace en paralelo y da a cada trabajador objetivo, formato, herramientas y límites.","concept":"orchestrators"},{"id":"w1","label":"Agente de investigación","x":60,"y":205,"w":210,"h":70,"kind":"primary","description":"Explora y resume. Puede usar un modelo barato y herramientas de solo lectura.","concept":"subagents"},{"id":"w2","label":"Agente de implementación","x":325,"y":205,"w":210,"h":70,"kind":"primary","description":"Modifica el código. Es el que más necesita aislamiento y verificación.","concept":"subagents"},{"id":"w3","label":"Agente de revisión","x":590,"y":205,"w":210,"h":70,"kind":"primary","description":"Lee los cambios con un contexto limpio, sin haber visto cómo se escribieron. Solo lectura.","concept":"automated-code-review"},{"id":"state","label":"Estado compartido","x":60,"y":345,"w":210,"h":60,"kind":"store","description":"Planes, archivos y ramas: el canal por el que los agentes se pasan información sin compartir conversación.","concept":"agent-communication"},{"id":"synth","label":"Síntesis e integración","x":325,"y":345,"w":210,"h":60,"kind":"accent","description":"Combina los resultados. Dos resultados correctos por separado pueden no serlo en conjunto: hay que comprobar el total.","concept":"orchestrators"},{"id":"verify","label":"Verificación","x":590,"y":345,"w":210,"h":60,"kind":"default","description":"Tests, CI y revisión humana del resultado global.","concept":"ci-cd"}],"edges":[{"from":"objective","to":"orch"},{"from":"orch","to":"w1","label":"encargo","lx":-10,"ly":-6},{"from":"orch","to":"w2","label":"encargo","lx":34},{"from":"orch","to":"w3","label":"encargo","lx":10,"ly":-6},{"from":"w1","to":"state","both":true,"dashed":true},{"from":"w1","to":"synth","label":"resumen","lx":-14,"ly":4},{"from":"w2","to":"synth","label":"resultado","lx":36},{"from":"w3","to":"synth","label":"hallazgos","lx":14,"ly":4},{"from":"synth","to":"verify"}],"notes":"Anthropic informa de que sus sistemas multiagente usan unas 15 veces los tokens de un chat, por lo que solo compensan en tareas de alto valor.\n\nTambién observó que los encargos vagos hacían que los subagentes duplicaran trabajo o dejaran huecos. La calidad de la delegación importa tanto como el número de agentes.","sources":[{"title":"Anthropic: How we built our multi-agent research system","url":"https://www.anthropic.com/engineering/multi-agent-research-system"},{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"}],"lastVerified":"2026-11-05"},{"id":"config-relations","short":"AGENTS.md, Skills, Subagents, Memory","title":"Relación entre AGENTS.md, Skills, Subagents y Memory","status":"verified","summary":"Todas compiten por una misma ventana de contexto, pero se cargan en momentos distintos y las escriben actores distintos.","viewBox":"0 0 860 470","groups":[{"label":"Ventana de contexto del agente principal","x":240,"y":172,"w":380,"h":163}],"nodes":[{"id":"agents","label":"AGENTS.md / CLAUDE.md","x":20,"y":40,"w":200,"h":64,"kind":"primary","description":"**Siempre.** Lo escribes tú, y contiene lo que importa en casi cualquier tarea. Cuanto más breve, mejor.","concept":"agents-md","sublabel":"se carga siempre"},{"id":"memory","label":"Memoria persistente","x":20,"y":200,"w":200,"h":64,"kind":"store","description":"**Al inicio, y parcial.** La escribe el agente con lo que aprende. Claude Code carga las primeras 200 líneas o 25 KB del índice.","concept":"persistent-memory","sublabel":"la escribe el agente"},{"id":"skills","label":"Skills","x":640,"y":40,"w":200,"h":64,"kind":"primary","description":"**Bajo demanda.** Al inicio solo se ve el nombre y la descripción; el contenido se carga al usarse, y entonces permanece en contexto.","concept":"skills","sublabel":"se carga al usarse"},{"id":"sub","label":"Subagents","x":640,"y":200,"w":200,"h":64,"kind":"accent","description":"**Contexto aparte.** Trabajan en su propia ventana, y solo su resultado vuelve a la principal.","concept":"subagents","sublabel":"contexto propio"},{"id":"ctx","label":"Contexto activo","x":335,"y":205,"w":190,"h":70,"kind":"accent","description":"El recurso compartido. Lo que entra aquí influye en cada decisión del modelo, y al llenarse hay que compactar.","concept":"context-management"},{"id":"hooks","label":"Hooks","x":335,"y":385,"w":190,"h":60,"kind":"default","description":"**Fuera del contexto.** Los ejecuta el harness. Por eso son el único elemento de este diagrama que no depende de que el modelo obedezca.","concept":"hooks","sublabel":"deterministas"},{"id":"submem","label":"Memoria del subagente","x":640,"y":370,"w":200,"h":64,"kind":"store","description":"Un subagente puede tener su propia memoria con el campo `memory`.","concept":"persistent-memory"}],"edges":[{"from":"agents","to":"ctx","label":"siempre","lx":-14,"ly":-8},{"from":"memory","to":"ctx","label":"índice"},{"from":"skills","to":"ctx","label":"al invocarse","lx":14,"ly":-8},{"from":"sub","to":"ctx","label":"resumen"},{"from":"hooks","to":"ctx","label":"bloquea o añade","dashed":true},{"from":"skills","to":"sub","label":"se pueden precargar","dashed":true},{"from":"sub","to":"submem","both":true,"dashed":true}],"notes":"Una forma de decidir dónde va algo:\n\n- ¿Debe saberse siempre? → AGENTS.md.\n- ¿Es un procedimiento que se usa a veces? → Skill.\n- ¿Genera mucho ruido o necesita menos permisos? → Subagente.\n- ¿Lo aprendió el agente trabajando? → Memoria.\n- ¿No admite excepciones? → Hook.\n\nLos detalles proceden de Claude Code; otras herramientas tienen piezas similares con diferencias.","sources":[{"title":"Claude Code: How Claude remembers your project","url":"https://code.claude.com/docs/en/memory"},{"title":"Claude Code: Skills","url":"https://code.claude.com/docs/en/skills"},{"title":"Claude Code: Subagents","url":"https://code.claude.com/docs/en/sub-agents"},{"title":"Claude Code: Hooks reference","url":"https://code.claude.com/docs/en/hooks"},{"title":"AGENTS.md","url":"https://agents.md/","note":"Sitio oficial del formato"}],"lastVerified":"2026-11-05"},{"id":"mcp","short":"Sistema basado en MCP","title":"Arquitectura de un sistema basado en MCP","status":"verified","summary":"El host crea un cliente por servidor. Cada servidor expone capacidades y queda aislado de los demás.","viewBox":"0 0 860 470","groups":[{"label":"Proceso host","x":20,"y":40,"w":340,"h":380},{"label":"Máquina local","x":400,"y":40,"w":440,"h":220},{"label":"Internet","x":400,"y":290,"w":440,"h":130}],"nodes":[{"id":"host","label":"Host","x":50,"y":180,"w":110,"h":90,"kind":"accent","description":"La aplicación de IA, como un agente de código. Crea y gestiona clientes, aplica políticas de seguridad, pide consentimiento y coordina la integración con el modelo. La conversación completa permanece aquí.","concept":"mcp"},{"id":"c1","label":"Client 1","x":210,"y":75,"w":120,"h":56,"kind":"primary","description":"Se comunica con un único servidor (relación 1:1) y adjunta a cada petición la versión del protocolo y sus capacidades.","concept":"mcp"},{"id":"c2","label":"Client 2","x":210,"y":170,"w":120,"h":56,"kind":"primary","description":"Cada cliente mantiene un límite de seguridad con su servidor.","concept":"mcp"},{"id":"c3","label":"Client 3","x":210,"y":325,"w":120,"h":56,"kind":"primary","description":"Un cliente remoto usa Streamable HTTP; uno local suele usar stdio.","concept":"mcp"},{"id":"s1","label":"Servidor: archivos y Git","x":430,"y":75,"w":190,"h":56,"kind":"default","description":"Proceso local, normalmente iniciado por el cliente y comunicado por stdio.","concept":"mcp-servers","sublabel":"stdio"},{"id":"s2","label":"Servidor: base de datos","x":430,"y":170,"w":190,"h":56,"kind":"default","description":"Expone herramientas o recursos. No puede leer toda la conversación ni ver otros servidores.","concept":"mcp-servers","sublabel":"stdio"},{"id":"s3","label":"Servidor: API externa","x":430,"y":325,"w":190,"h":56,"kind":"default","description":"Servicio remoto. La especificación exige validar el origen y recomienda autenticar conexiones.","concept":"mcp-servers","sublabel":"Streamable HTTP"},{"id":"r1","label":"Repositorio","x":680,"y":75,"w":130,"h":56,"kind":"store","description":"Recurso al que accede el servidor. El modelo no se conecta aquí de forma directa."},{"id":"r2","label":"Base de datos","x":680,"y":170,"w":130,"h":56,"kind":"store","description":"Limita las credenciales del servidor: el modelo puede pedir cosas inesperadas."},{"id":"r3","label":"Servicio SaaS","x":680,"y":325,"w":130,"h":56,"kind":"store","description":"A menudo, MCP envuelve aquí una API existente.","concept":"api-design"}],"edges":[{"from":"host","to":"c1"},{"from":"host","to":"c2"},{"from":"host","to":"c3"},{"from":"c1","to":"s1","label":"JSON-RPC","both":true},{"from":"c2","to":"s2","label":"JSON-RPC","both":true},{"from":"c3","to":"s3","label":"JSON-RPC","both":true},{"from":"s1","to":"r1","both":true},{"from":"s2","to":"r2","both":true},{"from":"s3","to":"r3","both":true}],"notes":"La revisión 2026-07-28 de la especificación hace que el protocolo sea sin estado: desaparece el handshake `initialize`, y cada petición lleva su versión y capacidades. Los servidores anuncian las suyas con `server/discover`.\n\nLos servidores exponen tres primitivas: tools, resources y prompts. Sampling, Roots y Logging quedan marcados como obsoletos en esa revisión, aunque siguen funcionando durante el periodo de retirada.","sources":[{"title":"MCP Specification 2026-07-28: Architecture","url":"https://modelcontextprotocol.io/specification/2026-07-28/architecture"},{"title":"MCP Specification 2026-07-28: Key Changes","url":"https://modelcontextprotocol.io/specification/2026-07-28/changelog"},{"title":"Claude Code: MCP","url":"https://code.claude.com/docs/en/mcp"}],"lastVerified":"2026-11-05"},{"id":"ai-workflow","short":"Workflow con IA","title":"Workflow de desarrollo asistido por IA","status":"verified","summary":"Un flujo con puntos de control donde corregir aún es barato, y un bucle de mejora que convierte los errores en controles permanentes.","viewBox":"0 0 860 420","nodes":[{"id":"spec","label":"Especificar","x":20,"y":60,"w":130,"h":64,"kind":"primary","description":"Qué se quiere y cómo se comprueba. Las buenas prácticas de Claude Code sugieren escribir la especificación y construir después en una sesión limpia.","concept":"spec-driven-development"},{"id":"explore","label":"Explorar","x":185,"y":60,"w":130,"h":64,"kind":"default","description":"El agente lee el código sin cambiar nada. Si genera mucha salida, un subagente puede encargarse.","concept":"context-engineering"},{"id":"plan","label":"Planificar","x":350,"y":60,"w":130,"h":64,"kind":"accent","description":"Propuesta de enfoque. Es el punto de revisión más rentable: cambiar de rumbo aquí cuesta poco.","concept":"planning-reasoning"},{"id":"impl","label":"Implementar","x":515,"y":60,"w":130,"h":64,"kind":"default","description":"El agente escribe en una rama o worktree aislados.","concept":"agentic-coding"},{"id":"verify","label":"Verificar","x":680,"y":60,"w":150,"h":64,"kind":"primary","description":"Tests, linter y comprobación del comportamiento real. Sin esto, un agente puede dar por terminada una tarea que no lo está.","concept":"ai-generated-code-testing"},{"id":"review","label":"Revisar","x":680,"y":200,"w":150,"h":64,"kind":"accent","description":"Un revisor con contexto limpio y una persona. Importa más cuanto más autónomo sea el agente.","concept":"code-reviews"},{"id":"merge","label":"Integrar","x":680,"y":330,"w":150,"h":64,"kind":"default","description":"PR, CI y merge.","concept":"pull-requests"},{"id":"learn","label":"Mejorar el harness","x":350,"y":270,"w":170,"h":64,"kind":"accent","description":"Si un error se repite, añade una instrucción, un linter o un hook. El siguiente agente ya no lo cometerá.","concept":"harness-engineering"},{"id":"config","label":"Instrucciones y controles","x":80,"y":270,"w":180,"h":64,"kind":"store","description":"AGENTS.md, skills, hooks y tests. Es el entorno que hace que el próximo ciclo empiece mejor.","concept":"agentic-harness"}],"edges":[{"from":"spec","to":"explore"},{"from":"explore","to":"plan"},{"from":"plan","to":"impl"},{"from":"impl","to":"verify"},{"from":"verify","to":"impl","dashed":true},{"from":"verify","to":"review"},{"from":"review","to":"merge"},{"from":"review","to":"learn","label":"errores repetidos","dashed":true,"ly":-8},{"from":"learn","to":"config"},{"from":"config","to":"spec","label":"siguiente ciclo","dashed":true,"lx":-6}],"notes":"No todas las tareas necesitan todos los pasos. Un cambio de texto puede saltar directamente a implementar y verificar; una migración de datos los necesita todos.\n\nEl orden es orientativo y no corresponde a un estándar. Lo importante es tener un objetivo verificable y revisar antes de que corregir sea caro.","sources":[{"title":"Claude Code: Best practices","url":"https://code.claude.com/docs/en/best-practices"},{"title":"Anthropic: Effective harnesses for long-running agents","url":"https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents"},{"title":"Birgitta Böckeler: Harness engineering for coding agent users","url":"https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html","note":"martinfowler.com, 2 de abril de 2026"}],"lastVerified":"2026-11-05"},{"id":"parallel-worktrees","short":"Agentes con Worktrees","title":"Agentes en paralelo con Git Worktrees","status":"verified","summary":"Un solo repositorio, varios directorios de trabajo. Cada agente tiene sus archivos, su rama y su index, y comparten el historial.","viewBox":"0 0 860 490","groups":[{"label":"Compartido por todos","x":280,"y":15,"w":300,"h":105},{"label":"Propio de cada worktree: archivos, HEAD, index","x":20,"y":150,"w":820,"h":170}],"nodes":[{"id":"git","label":".git compartido","x":320,"y":50,"w":220,"h":56,"kind":"accent","description":"Objetos, referencias y configuración son comunes. Un commit en un worktree se ve al momento en los demás.","concept":"git-worktrees","sublabel":"objetos, refs, config"},{"id":"wt1","label":"Worktree principal","x":45,"y":190,"w":170,"h":56,"kind":"primary","description":"El directorio del `git clone`. No se puede eliminar con `git worktree remove`.","concept":"git-worktrees","sublabel":"main"},{"id":"wt2","label":"../app-auth","x":245,"y":190,"w":170,"h":56,"kind":"primary","description":"Linked worktree creado con `git worktree add ../app-auth -b feature/auth`. Necesita sus propias dependencias.","concept":"git-worktrees","sublabel":"feature/auth"},{"id":"wt3","label":"../app-billing","x":445,"y":190,"w":170,"h":56,"kind":"primary","description":"Una rama solo puede estar activa en un worktree a la vez: Git rechaza repetirla sin `--force`.","concept":"git-worktrees","sublabel":"feature/billing"},{"id":"wt4","label":"../app-docs","x":645,"y":190,"w":170,"h":56,"kind":"primary","description":"Una tarea sin relación con las demás es la candidata ideal: no generará conflictos.","concept":"git-worktrees","sublabel":"docs/api"},{"id":"a1","label":"Tú","x":45,"y":262,"w":170,"h":44,"kind":"default","description":"Trabajas o supervisas en el directorio principal, sin interrupciones."},{"id":"a2","label":"Agente A","x":245,"y":262,"w":170,"h":44,"kind":"default","description":"Trabaja en sus archivos sin ver los cambios sin commitear de los demás.","concept":"subagents"},{"id":"a3","label":"Agente B","x":445,"y":262,"w":170,"h":44,"kind":"default","description":"Aunque comparte historia, tiene su propio index: su `git add` no afecta a los demás.","concept":"subagents"},{"id":"a4","label":"Agente C","x":645,"y":262,"w":170,"h":44,"kind":"default","description":"Comparten recursos de la máquina: puertos, bases de datos locales y CPU siguen siendo un punto de choque.","concept":"parallel-agent-development"},{"id":"pr","label":"PRs y CI","x":245,"y":370,"w":170,"h":56,"kind":"default","description":"Cada rama se valida por separado. Esto no descubre los fallos que aparecen al combinar cambios.","concept":"pull-requests"},{"id":"integrate","label":"Integración","x":445,"y":370,"w":170,"h":56,"kind":"accent","description":"Aquí surgen los conflictos. Fusiona de una en una, actualiza las demás ramas y vuelve a ejecutar los tests.","concept":"conflict-resolution"},{"id":"main","label":"main","x":645,"y":370,"w":170,"h":56,"kind":"primary","description":"El resultado integrado."}],"edges":[{"from":"git","to":"wt1","both":true},{"from":"git","to":"wt2","both":true},{"from":"git","to":"wt3","both":true},{"from":"git","to":"wt4","both":true},{"from":"a2","to":"pr","label":"push","lx":26},{"from":"a3","to":"pr","label":"push","ly":-4},{"from":"pr","to":"integrate"},{"from":"integrate","to":"main"}],"notes":"**Lo que los worktrees evitan:** que dos agentes se sobrescriban archivos en disco o compartan el área de preparación.\n\n**Lo que no evitan:** conflictos de merge, conflictos semánticos y choques de recursos como un puerto compartido. Para eso hace falta dividir bien las tareas.","sources":[{"title":"Git: git-worktree","url":"https://git-scm.com/docs/git-worktree"},{"title":"Claude Code: Run parallel sessions with worktrees","url":"https://code.claude.com/docs/en/worktrees"}],"lastVerified":"2026-11-05"},{"id":"specialized-agents","short":"Agentes especializados","title":"Arquitectura de un proyecto con agentes especializados","status":"needs-review","summary":"Un ejemplo de reparto de roles en un repositorio. Cada agente tiene solo las herramientas y el contexto que su función necesita.","viewBox":"0 0 860 460","groups":[{"label":"En .claude/agents/","x":190,"y":120,"w":480,"h":200}],"nodes":[{"id":"lead","label":"Agente principal","x":345,"y":30,"w":170,"h":60,"kind":"accent","description":"Conversa contigo, mantiene el plan y decide a quién delegar según la descripción de cada agente.","concept":"orchestrators"},{"id":"explorer","label":"explorer","x":210,"y":155,"w":130,"h":60,"kind":"default","description":"Solo lectura y un modelo económico. Localiza código y resume.","concept":"subagents","sublabel":"Read, Grep, Glob"},{"id":"implementer","label":"implementer","x":365,"y":155,"w":130,"h":60,"kind":"primary","description":"Puede editar. Trabaja en un worktree con `isolation: worktree`.","concept":"git-worktrees","sublabel":"Edit, Bash"},{"id":"reviewer","label":"reviewer","x":520,"y":155,"w":130,"h":60,"kind":"default","description":"Solo lectura. Al no haber visto cómo se escribió el código, aporta una mirada distinta.","concept":"automated-code-review","sublabel":"Read, Grep"},{"id":"tester","label":"test-runner","x":365,"y":245,"w":130,"h":56,"kind":"default","description":"Ejecuta las pruebas y devuelve solo los fallos, para que no se llene el contexto con salida larga.","concept":"unit-testing","sublabel":"Bash, Read"},{"id":"instr","label":"AGENTS.md","x":20,"y":155,"w":140,"h":60,"kind":"store","description":"Convenciones comunes para todos. Evita repetirlas en cada agente.","concept":"agents-md"},{"id":"skills","label":"Skills","x":20,"y":245,"w":140,"h":56,"kind":"store","description":"Procedimientos que pueden precargarse en un agente concreto.","concept":"skills"},{"id":"hooks","label":"Hooks","x":700,"y":155,"w":140,"h":60,"kind":"default","description":"Se aplican con independencia del agente: formatear, bloquear comandos, registrar.","concept":"hooks"},{"id":"mcp","label":"MCP","x":700,"y":245,"w":140,"h":56,"kind":"default","description":"Un agente puede tener solo los servidores que necesita, con el campo `mcpServers`.","concept":"mcp"},{"id":"ci","label":"CI y revisión humana","x":345,"y":370,"w":170,"h":60,"kind":"primary","description":"La última barrera. No depende de ningún agente del sistema.","concept":"ci-cd"}],"edges":[{"from":"lead","to":"explorer"},{"from":"lead","to":"implementer","label":"delega","lx":28},{"from":"lead","to":"reviewer"},{"from":"implementer","to":"tester"},{"from":"instr","to":"explorer","dashed":true},{"from":"skills","to":"tester","dashed":true},{"from":"hooks","to":"reviewer","dashed":true},{"from":"mcp","to":"tester","dashed":true},{"from":"tester","to":"ci","label":"PR"}],"notes":"Este reparto es **un ejemplo, no una receta**. Más agentes no significa mejores resultados: cada rol añade coste y coordinación.\n\nEmpieza sin ninguno, y crea un agente especializado solo cuando un problema concreto lo justifique, por ejemplo cuando la salida de los tests llena el contexto o quieras una revisión con permisos limitados.","sources":[{"title":"Claude Code: Subagents","url":"https://code.claude.com/docs/en/sub-agents"},{"title":"Claude Code: Best practices","url":"https://code.claude.com/docs/en/best-practices"},{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"}],"lastVerified":null}],"categories":[{"id":"software-engineering","letter":"A","name":"Software Engineering","tagline":"Paradigmas, diseño y arquitectura","description":"Los fundamentos que siguen decidiendo la calidad de un sistema, lo escriba una persona o un agente: paradigmas, principios de diseño, estilos de arquitectura y diseño de APIs."},{"id":"ai-development","letter":"B","name":"AI Development","tagline":"Cómo se trabaja con IA al programar","description":"Las prácticas y términos del desarrollo con modelos de lenguaje. Muchos son recientes y sus límites aún se discuten: cada artículo separa lo que está definido de lo que es uso informal."},{"id":"ai-agents","letter":"C","name":"AI Agents","tagline":"Qué es un agente y cómo se comporta","description":"Qué distingue a un agente de un asistente, cómo se estructura su bucle de ejecución, cómo se coordina con otros agentes y cómo se evalúa."},{"id":"agent-components","letter":"D","name":"Agent Components","tagline":"Las piezas con las que se configura un agente","description":"Instrucciones, skills, subagentes, memoria, hooks, permisos, MCP y orquestadores. Cada artículo explica la pieza por separado y dónde encaja con las demás."},{"id":"git-collaboration","letter":"E","name":"Git & Parallel Development","tagline":"Ramas, worktrees y trabajo simultáneo","description":"Del modelo de Git a la coordinación de varios agentes en paralelo, con especial atención a Git Worktrees y a la prevención de conflictos."},{"id":"devops-infrastructure","letter":"F","name":"DevOps & Infrastructure","tagline":"Entregar y operar software","description":"Integración y entrega continuas, contenedores, infraestructura como código, nube, monitorización y estrategias de despliegue."},{"id":"testing-quality","letter":"G","name":"Testing & Quality","tagline":"Comprobar que funciona, y seguir comprobándolo","description":"Tipos de pruebas, análisis estático y las particularidades de verificar código generado por IA y de evaluar agentes."},{"id":"tools-platforms","letter":"H","name":"Development Tools & Platforms","tagline":"Las categorías de herramientas del sector","description":"Qué es cada categoría de herramienta: IDEs, editores, agentes de terminal, servidores MCP o proveedores de modelos. Las fichas de productos concretos están en Tools Explorer."}],"comparisons":[{"id":"assistant-vs-agent","title":"AI Assistant vs AI Agent","status":"verified","summary":"Un asistente responde y la persona dirige cada paso. Un agente recibe un objetivo y decide los pasos por sí mismo.","a":{"name":"AI Assistant","concept":"assistants-vs-agents","what":"Sistema que responde a peticiones o sugiere: autocompletado, chat. Cada paso lo inicia y aplica una persona.","goal":"Acelerar a la persona, que mantiene el control paso a paso.","pros":["Supervisión sencilla.","Coste bajo por interacción.","Riesgo limitado."],"cons":["La persona hace de intermediaria.","Poco útil en tareas largas."],"chooseWhen":["Quieres controlar cada cambio.","La tarea es pequeña o exploratoria."],"example":"Pides que explique un error y aplicas tú la corrección."},"b":{"name":"AI Agent","concept":"ai-agents","what":"Sistema en el que el modelo dirige su propio proceso y usa herramientas en bucle hasta alcanzar un objetivo.","goal":"Completar una tarea de varios pasos con poca intervención.","pros":["Autonomía en tareas abiertas.","Puede comprobar su trabajo.","Permite delegar y paralelizar."],"cons":["Más coste: unas 4 veces los tokens de un chat, según Anthropic.","Más difícil de predecir.","Actuar en sistemas reales conlleva riesgo."],"chooseWhen":["Los pasos dependen de lo que se descubra.","Hay forma de verificar el resultado."],"example":"Le pides que corrija un test: lo ejecuta, investiga, edita y repite hasta que pase."},"differences":[{"aspect":"Quién decide el siguiente paso","a":"La persona.","b":"El modelo."},{"aspect":"Capacidad de actuar","a":"Generalmente propone.","b":"Ejecuta herramientas y observa el resultado."},{"aspect":"Forma de interacción","a":"Petición y respuesta.","b":"Bucle hasta completar un objetivo."},{"aspect":"Punto de revisión","a":"Cada paso.","b":"Puntos de control o resultado final."}],"together":"Es un espectro, y muchos productos ofrecen ambos modos. La pregunta útil es cuánto control delegas en cada tarea.","sources":[{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"},{"title":"Anthropic: How we built our multi-agent research system","url":"https://www.anthropic.com/engineering/multi-agent-research-system"}],"lastVerified":"2026-11-05"},{"id":"agent-vs-subagent","title":"Agent vs Subagent","status":"verified","summary":"Técnicamente, un subagente es un agente. La diferencia es su posición: trabaja por encargo de otro, con contexto propio, y le devuelve un resultado.","a":{"name":"Agent","concept":"ai-agents","what":"Sistema que recibe el objetivo y conversa con la persona, manteniendo el contexto principal de la tarea.","goal":"Alcanzar el objetivo global y responder ante el usuario.","pros":["Tiene la visión completa.","Conversación continua."],"cons":["Su contexto se llena.","Una sola línea de trabajo."],"chooseWhen":["La tarea es pequeña o muy acoplada.","Necesitas ir decidiendo en conversación."],"example":"Una sesión de Claude Code en la que trabajas una funcionalidad."},"b":{"name":"Subagent","concept":"subagents","what":"Agente al que otro delega una tarea, con ventana de contexto, instrucciones y herramientas propias, que devuelve un resumen.","goal":"Resolver una subtarea sin ensuciar el contexto principal.","pros":["Aísla contexto.","Permisos mínimos por tarea.","Modelo más barato si procede.","Permite paralelismo."],"cons":["Arranca sin contexto: requiere un buen encargo.","Suma tokens.","El resumen puede ocultar problemas."],"chooseWhen":["La subtarea genera mucha salida.","Quieres restringir herramientas, como en un revisor."],"example":"Un subagente de solo lectura revisa el diff y devuelve los hallazgos."},"differences":[{"aspect":"Quién le da el objetivo","a":"La persona.","b":"Otro agente."},{"aspect":"Contexto","a":"El de la conversación.","b":"Propio y separado."},{"aspect":"Qué devuelve","a":"Responde al usuario.","b":"Un resultado al agente que lo lanzó."},{"aspect":"Herramientas","a":"Generalmente, el conjunto completo.","b":"Suele estar restringido."}],"sources":[{"title":"Claude Code: Subagents","url":"https://code.claude.com/docs/en/sub-agents"},{"title":"Anthropic: Effective context engineering for AI agents","url":"https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents","note":"29 de septiembre de 2025"}],"lastVerified":"2026-11-05"},{"id":"skills-vs-subagents","title":"Skills vs Subagents","status":"verified","summary":"Una skill aporta conocimiento al contexto actual; un subagente aporta un contexto aparte. Responden a problemas distintos, y se pueden combinar.","a":{"name":"Skills","concept":"skills","what":"Instrucciones empaquetadas que se cargan en la conversación solo cuando hacen falta.","goal":"Reutilizar un procedimiento o conocimiento sin cargarlo siempre.","pros":["Mínimo coste hasta usarse.","Acceso a toda la conversación.","Reutilizables y versionables."],"cons":["Una vez cargada, ocupa contexto en los turnos siguientes.","Comparte los permisos de la sesión, salvo ajustes."],"chooseWhen":["La tarea necesita el contexto de la conversación.","Quieres un procedimiento repetible."],"example":"`/deploy-staging` guía los pasos de despliegue dentro de tu sesión."},"b":{"name":"Subagents","concept":"subagents","what":"Agentes separados con su propio contexto, herramientas y modelo.","goal":"Aislar trabajo y mantener limpio el contexto principal.","pros":["No ensucian el contexto.","Permiten restringir herramientas.","Ejecución en paralelo."],"cons":["No ven la conversación.","Más tokens en total."],"chooseWhen":["La tarea genera mucha salida.","Necesitas otra perspectiva o menos permisos."],"example":"Un subagente explora 100 archivos y devuelve tres rutas relevantes."},"differences":[{"aspect":"Dónde se ejecuta","a":"En el contexto actual.","b":"En un contexto separado."},{"aspect":"Qué aporta","a":"Conocimiento e instrucciones.","b":"Aislamiento y paralelismo."},{"aspect":"Acceso a la conversación","a":"Sí.","b":"No; recibe un encargo."},{"aspect":"Definición en Claude Code","a":"`.claude/skills/<nombre>/SKILL.md`","b":"`.claude/agents/<nombre>.md`"}],"together":"Se combinan: un subagente puede precargar skills con su campo `skills`, y una skill puede ejecutarse en un subagente con `context: fork`.","sources":[{"title":"Claude Code: Skills","url":"https://code.claude.com/docs/en/skills"},{"title":"Claude Code: Subagents","url":"https://code.claude.com/docs/en/sub-agents"}],"lastVerified":"2026-11-05"},{"id":"agentsmd-vs-skills","title":"AGENTS.md vs Skills","status":"verified","summary":"AGENTS.md es lo que el agente debe saber siempre. Una skill es lo que debe saber a veces.","a":{"name":"AGENTS.md","concept":"agents-md","what":"Archivo Markdown de instrucciones del proyecto, en un formato abierto que leen muchas herramientas.","goal":"Dar el contexto mínimo para trabajar en el repositorio.","pros":["Compatible con muchas herramientas.","Sin configuración.","Siempre disponible."],"cons":["Consume contexto en cada sesión.","Un archivo largo pierde eficacia."],"chooseWhen":["Es un hecho que importa en casi toda tarea.","Son comandos, estructura y convenciones."],"example":"“Los tests se ejecutan con `pnpm test`”."},"b":{"name":"Skills","concept":"skills","what":"Paquetes de instrucciones y recursos que se cargan bajo demanda.","goal":"Hacer disponibles procedimientos largos sin coste permanente.","pros":["Pueden ser extensos.","Incluyen scripts y referencias.","Invocables a mano o automáticamente."],"cons":["La activación automática puede fallar.","Campos no totalmente portables."],"chooseWhen":["Es un procedimiento de varios pasos.","Solo importa en ciertas tareas."],"example":"Un procedimiento de 200 líneas para crear una migración de base de datos."},"differences":[{"aspect":"Cuándo se carga","a":"Al trabajar en el proyecto.","b":"Solo el nombre y la descripción; el resto al usarla."},{"aspect":"Tamaño razonable","a":"Corto.","b":"Largo, con archivos de apoyo."},{"aspect":"Contenido típico","a":"Hechos y reglas.","b":"Procedimientos."},{"aspect":"Portabilidad","a":"Alta.","b":"Depende de la herramienta."}],"sources":[{"title":"AGENTS.md","url":"https://agents.md/","note":"Sitio oficial del formato"},{"title":"Claude Code: Skills","url":"https://code.claude.com/docs/en/skills"},{"title":"Claude Code: How Claude remembers your project","url":"https://code.claude.com/docs/en/memory"}],"lastVerified":"2026-11-05"},{"id":"mcp-vs-api","title":"MCP vs API","status":"verified","summary":"No compiten: una API expone un servicio para cualquier software; MCP estandariza cómo una aplicación de IA descubre y usa capacidades. Un servidor MCP suele envolver una API.","a":{"name":"MCP","concept":"mcp","what":"Protocolo abierto sobre JSON-RPC para conectar aplicaciones de IA con herramientas, recursos y prompts.","goal":"Una integración común para muchas aplicaciones de IA.","pros":["Descubrimiento de capacidades.","Reutilizable entre clientes.","Descripciones pensadas para modelos."],"cons":["Otra capa que mantener.","Las definiciones consumen contexto.","Riesgos propios, como la inyección por contenido."],"chooseWhen":["Un agente debe usar el sistema.","Quieres que varias aplicaciones de IA lo reutilicen."],"example":"Un servidor MCP de tickets expone `create_ticket` a cualquier cliente compatible."},"b":{"name":"API","concept":"api-design","what":"Interfaz general con la que un software usa otro, como una API REST o GraphQL.","goal":"Exponer funcionalidad a programas en general.","pros":["Estándar universal, con mucha infraestructura.","Control preciso.","No depende de IA."],"cons":["Cada integración es a medida.","Un modelo necesita que le describan cómo usarla."],"chooseWhen":["Los consumidores son programas normales.","Controlas el código de la integración."],"example":"Tu frontend llama a `POST /tickets`."},"differences":[{"aspect":"Consumidor previsto","a":"Aplicaciones de IA.","b":"Cualquier software."},{"aspect":"Descubrimiento","a":"El cliente lista las capacidades.","b":"Según la API: documentación u OpenAPI."},{"aspect":"Formato","a":"JSON-RPC, con primitivas definidas.","b":"Libre: REST, GraphQL, gRPC…"},{"aspect":"Relación","a":"Suele envolver una API.","b":"Puede estar detrás de un servidor MCP."}],"together":"Lo habitual es tener ambos: la API sigue siendo la interfaz del sistema, y el servidor MCP la adapta para los agentes.","sources":[{"title":"MCP Specification 2026-07-28: Architecture","url":"https://modelcontextprotocol.io/specification/2026-07-28/architecture"},{"title":"Anthropic: Introducing the Model Context Protocol","url":"https://www.anthropic.com/news/model-context-protocol","note":"25 de noviembre de 2024"}],"lastVerified":"2026-11-05"},{"id":"mcp-vs-tool-calling","title":"MCP vs Tool Calling","status":"verified","summary":"Tool calling es cómo el modelo pide usar una herramienta. MCP es cómo la aplicación obtiene y ejecuta herramientas externas. Operan en capas distintas.","a":{"name":"MCP","concept":"mcp","what":"Protocolo entre la aplicación de IA y servidores externos.","goal":"Estandarizar el acceso a herramientas y datos.","pros":["Herramientas reutilizables.","Separa el agente del integrador."],"cons":["Requiere cliente y servidor.","Superficie de riesgo adicional."],"chooseWhen":["Las herramientas viven fuera de tu aplicación.","Quieres compartirlas."],"example":"El host conecta con un servidor de base de datos y obtiene sus herramientas."},"b":{"name":"Tool Calling","concept":"tool-calling","what":"Capacidad del modelo de emitir una petición estructurada de herramienta, que la aplicación ejecuta.","goal":"Permitir que el modelo decida acciones de forma validable.","pros":["Simple y directo.","Sin infraestructura adicional."],"cons":["Cada aplicación define e implementa sus herramientas.","El formato varía según el proveedor."],"chooseWhen":["Las herramientas son propias de tu aplicación.","Basta una integración simple."],"example":"Tu app define `get_weather` y la ejecuta cuando el modelo la pide."},"differences":[{"aspect":"Capa","a":"Aplicación ↔ servidor.","b":"Modelo ↔ aplicación."},{"aspect":"Quién lo implementa","a":"Host y servidores.","b":"Proveedor del modelo y tu aplicación."},{"aspect":"Estandarización","a":"Protocolo abierto.","b":"Propia de cada API de modelo."},{"aspect":"¿Sustituye al otro?","a":"No: el modelo sigue usando tool calling.","b":"No: puede usar herramientas de MCP."}],"together":"Flujo típico: el host obtiene herramientas por MCP, las presenta al modelo, este emite una llamada por tool calling y el host la ejecuta por MCP.","sources":[{"title":"MCP Specification 2026-07-28: Architecture","url":"https://modelcontextprotocol.io/specification/2026-07-28/architecture"},{"title":"Claude API: Tool use","url":"https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview"}],"lastVerified":"2026-11-05"},{"id":"branch-vs-worktree","title":"Git Branch vs Git Worktree","status":"verified","summary":"Una rama es una línea de historia; un worktree es un directorio donde tener una rama activa. No son alternativas: un worktree usa una rama.","a":{"name":"Git Branch","concept":"git-branches","what":"Puntero móvil a un commit, que representa una línea de trabajo.","goal":"Aislar cambios en la historia.","pros":["Muy ligera.","Base de todo flujo de Git."],"cons":["Sin worktrees, solo hay una activa por directorio.","Cambiar de rama interrumpe lo que esté en marcha."],"chooseWhen":["Trabajas en una cosa cada vez.","Quieres aislar un cambio en la historia."],"example":"`git switch -c feature/search`"},"b":{"name":"Git Worktree","concept":"git-worktrees","what":"Directorio de trabajo adicional enlazado al mismo repositorio, con sus archivos, su `HEAD` y su `index`.","goal":"Tener varias ramas activas a la vez.","pros":["Trabajo simultáneo real.","Aislamiento de archivos para varios agentes.","Comparte historia."],"cons":["Cada uno necesita sus dependencias.","Más directorios que limpiar.","Una rama no puede estar activa en dos."],"chooseWhen":["Varios agentes o tareas en paralelo.","Revisar un PR sin interrumpir tu trabajo."],"example":"`git worktree add ../app-auth -b feature/auth`"},"differences":[{"aspect":"Qué es","a":"Una referencia en la historia.","b":"Un directorio en disco."},{"aspect":"Ocupa","a":"Casi nada.","b":"Una copia de los archivos de trabajo."},{"aspect":"Simultaneidad","a":"Una activa por directorio.","b":"Una por worktree."},{"aspect":"Evita","a":"Mezclar historia.","b":"Pisar archivos en disco."}],"together":"Ninguno evita los conflictos al integrar: los worktrees solo los trasladan al momento del merge.","sources":[{"title":"Git: git-worktree","url":"https://git-scm.com/docs/git-worktree"},{"title":"Pro Git: Basic Branching and Merging","url":"https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging"}],"lastVerified":"2026-11-05"},{"id":"assisted-vs-agentic","title":"AI-assisted coding vs Agentic coding","summary":"La diferencia es quién mantiene el bucle de trabajo: en la asistencia, la persona; en agentic coding, el agente, con la persona supervisando.","a":{"name":"AI-assisted coding","concept":"ai-assisted-development","what":"Programar con ayuda de un modelo que sugiere o responde; la persona ejecuta y decide cada paso.","goal":"Acelerar la escritura y la comprensión del código.","pros":["Control detallado.","Coste bajo.","Se integra sin cambiar de hábitos."],"cons":["Hay que copiar errores y aplicar cambios.","Rinde menos en cambios amplios."],"chooseWhen":["Código crítico que quieres escribir paso a paso.","Estás aprendiendo una tecnología."],"example":"Autocompletado y preguntas puntuales mientras programas."},"b":{"name":"Agentic coding","concept":"agentic-coding","what":"Delegar tareas en un agente que edita, ejecuta y verifica de forma autónoma.","goal":"Delegar el ciclo completo de una tarea.","pros":["Cambios multiarchivo.","Verificación autónoma.","Trabajo en paralelo."],"cons":["Revisar diffs grandes.","Más tokens.","Mayor riesgo sin buenos controles."],"chooseWhen":["La tarea tiene un criterio de éxito verificable.","Tienes tests y puedes revisar el resultado."],"example":"“Migra estos 30 archivos a la API nueva y haz pasar los tests”."},"differences":[{"aspect":"Ciclo editar-ejecutar-corregir","a":"Lo hace la persona.","b":"Lo hace el agente."},{"aspect":"Unidad de trabajo","a":"Línea, función.","b":"Tarea."},{"aspect":"Rol de la persona","a":"Autora.","b":"Supervisora y revisora."}],"together":"No hay por qué elegir: un mismo día se pueden usar ambos según la tarea.","sources":[{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"},{"title":"Claude Code: overview","url":"https://code.claude.com/docs/en/overview"},{"title":"Simon Willison: Not all AI-assisted programming is vibe coding","url":"https://simonwillison.net/2025/Mar/19/vibe-coding/"}],"status":"needs-review","lastVerified":null},{"id":"rag-vs-memory","title":"RAG vs Persistent Memory","summary":"RAG busca en un corpus de conocimiento para responder. La memoria persistente conserva lo que el agente aprende al trabajar. Se parecen por fuera, porque ambos inyectan texto en el contexto.","a":{"name":"RAG","what":"Retrieval-Augmented Generation: recuperar fragmentos relevantes de una base documental y añadirlos al contexto.","goal":"Responder con conocimiento externo y actualizable.","pros":["Escala a corpus grandes.","Permite citar las fuentes."],"cons":["La calidad depende de la recuperación.","Infraestructura de indexado."],"chooseWhen":["Hay mucha documentación o datos ya existentes.","El conocimiento lo gestiona otro proceso."],"example":"Un asistente que responde a partir de manuales internos."},"b":{"name":"Persistent Memory","concept":"persistent-memory","what":"Información que el agente, o una persona, guarda entre sesiones a partir de su experiencia.","goal":"Dar continuidad y evitar repetir errores.","pros":["Mejora con el uso.","Sencilla si se basa en archivos."],"cons":["Las notas envejecen.","Puede guardar errores o datos sensibles."],"chooseWhen":["Se trata de preferencias y aprendizajes de trabajo.","Se trabaja repetidamente en el mismo proyecto."],"example":"Una nota: “los tests de integración requieren Docker en marcha”."},"differences":[{"aspect":"Quién escribe","a":"Un proceso de ingesta.","b":"El agente o una persona durante el trabajo."},{"aspect":"Qué contiene","a":"Conocimiento externo.","b":"Experiencia y preferencias."},{"aspect":"Cómo se recupera","a":"Búsqueda, a menudo semántica.","b":"Índice cargado al inicio o lectura directa."}],"together":"No se excluyen. Una memoria grande puede usar técnicas de búsqueda, y un agente puede combinar ambas.","sources":[{"title":"Claude Code: How Claude remembers your project","url":"https://code.claude.com/docs/en/memory"},{"title":"Anthropic: Effective context engineering for AI agents","url":"https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents","note":"29 de septiembre de 2025"}],"status":"needs-review","lastVerified":null},{"id":"monolith-vs-microservices-cmp","title":"Monolith vs Microservices","summary":"El monolito se despliega como una unidad; los microservicios, por separado. Estos últimos cambian complejidad interna por complejidad operativa.","a":{"name":"Monolith","concept":"monolith-vs-microservices","what":"Aplicación desplegada como una sola unidad, que puede estar bien modularizada.","goal":"Simplicidad de desarrollo y operación.","pros":["Despliegue y depuración sencillos.","Transacciones simples.","Menos infraestructura."],"cons":["Todo se despliega a la vez.","Puede degradarse sin disciplina modular."],"chooseWhen":["Equipo pequeño.","Dominio aún poco claro."],"example":"Una aplicación Django con módulos bien separados."},"b":{"name":"Microservices","concept":"microservices","what":"Servicios pequeños, desplegables por separado, que se comunican por red.","goal":"Autonomía de equipos y despliegue independiente.","pros":["Escalado por partes.","Equipos autónomos."],"cons":["Sistema distribuido: fallos parciales, latencia, consistencia.","Requiere plataforma madura."],"chooseWhen":["Varios equipos con dominios claros.","Partes con necesidades de escala muy distintas."],"example":"Pagos y Catálogo como servicios separados."},"differences":[{"aspect":"Despliegue","a":"Conjunto.","b":"Independiente."},{"aspect":"Comunicación","a":"Llamadas en proceso.","b":"Red."},{"aspect":"Datos","a":"Suele ser una base compartida.","b":"Por servicio."},{"aspect":"Depuración","a":"Más directa.","b":"Requiere observabilidad."}],"together":"Fowler propone en *Monolith First* empezar por un monolito, por lo difícil que es acertar con los límites al principio. El monolito modular es un punto intermedio.","sources":[{"title":"Martin Fowler: Monolith First","url":"https://martinfowler.com/bliki/MonolithFirst.html"},{"title":"James Lewis y Martin Fowler: Microservices","url":"https://martinfowler.com/articles/microservices.html"}],"status":"needs-review","lastVerified":null},{"id":"ci-vs-cd","title":"CI vs CD","summary":"CI integra y verifica cada cambio. CD lleva esos cambios a un estado listo para desplegar, o los despliega.","a":{"name":"CI","concept":"ci-cd","what":"Integración continua: integrar a menudo en la rama principal, con compilación y tests automáticos.","goal":"Detectar pronto los problemas de integración.","pros":["Conflictos más pequeños.","Feedback rápido."],"cons":["Requiere buenos tests.","Un pipeline lento perjudica."],"chooseWhen":["Siempre que haya más de una línea de trabajo."],"example":"Cada PR ejecuta lint y tests."},"b":{"name":"CD","concept":"deployment-strategies","what":"Entrega continua (siempre desplegable) o despliegue continuo (se despliega de forma automática).","goal":"Publicar de forma frecuente, segura y rutinaria.","pros":["Publicaciones pequeñas.","Menos riesgo por cambio."],"cons":["Requiere automatización y observabilidad.","Exige prácticas de despliegue seguro."],"chooseWhen":["Quieres reducir el tiempo hasta producción.","Tienes buena verificación automática."],"example":"Al fusionar en `main`, se despliega en staging y luego en producción."},"differences":[{"aspect":"Termina en","a":"Un cambio verificado.","b":"Un cambio listo o desplegado."},{"aspect":"Pregunta que responde","a":"¿Funciona integrado?","b":"¿Se puede publicar?"},{"aspect":"Prerrequisito","a":"Tests automáticos.","b":"CI sólida."}],"together":"CD depende de CI: sin verificación fiable, automatizar el despliegue solo acelera los fallos.","sources":[{"title":"Martin Fowler: Continuous Integration","url":"https://martinfowler.com/articles/continuousIntegration.html"},{"title":"Martin Fowler: Continuous Delivery","url":"https://martinfowler.com/bliki/ContinuousDelivery.html"}],"status":"needs-review","lastVerified":null},{"id":"unit-vs-integration","title":"Unit Testing vs Integration Testing","summary":"Los tests unitarios comprueban piezas aisladas y son rápidos. Los de integración comprueban que las piezas funcionan juntas, y dan otro tipo de confianza.","a":{"name":"Unit Testing","concept":"unit-testing","what":"Pruebas rápidas de una unidad de código, generalmente aislada.","goal":"Verificar la lógica y localizar errores con precisión.","pros":["Muy rápidos.","Fallos fáciles de localizar."],"cons":["No detectan errores entre componentes."],"chooseWhen":["Lógica con reglas y casos límite."],"example":"Comprobar el cálculo de un descuento."},"b":{"name":"Integration Testing","concept":"integration-testing","what":"Pruebas de varios componentes juntos, como un servicio y su base de datos.","goal":"Verificar las fronteras y la configuración.","pros":["Detectan errores de contrato y consultas.","Más cercanas a la realidad."],"cons":["Más lentos.","Pueden ser inestables."],"chooseWhen":["Interacción con bases de datos, colas o APIs."],"example":"Guardar y leer un pedido en una base de datos real en un contenedor."},"differences":[{"aspect":"Alcance","a":"Una unidad.","b":"Varios componentes."},{"aspect":"Velocidad","a":"Milisegundos.","b":"Segundos o más."},{"aspect":"Dependencias","a":"Sustituidas o inexistentes.","b":"Reales o muy cercanas."},{"aspect":"Cantidad típica","a":"Muchos.","b":"Menos."}],"together":"Se complementan, tal como sugiere la pirámide de tests. Con agentes, los unitarios dan feedback rápido, y los de integración evitan que un mock oculte un problema.","sources":[{"title":"Martin Fowler: Unit Test","url":"https://martinfowler.com/bliki/UnitTest.html"},{"title":"Martin Fowler: Integration Test","url":"https://martinfowler.com/bliki/IntegrationTest.html"},{"title":"Martin Fowler: Test Pyramid","url":"https://martinfowler.com/bliki/TestPyramid.html"}],"status":"needs-review","lastVerified":null}],"concepts":[{"id":"programming-paradigms","title":"Programming Paradigms","category":"software-engineering","difficulty":"beginner","aliases":["paradigmas de programación"],"description":"Los grandes estilos de organizar un programa, como el imperativo, el orientado a objetos, el funcional o el declarativo.","technicalExplanation":"Un paradigma determina cómo se modelan el estado y el flujo. El **imperativo** describe pasos que cambian estado. El **declarativo** (SQL, CSS) describe el resultado deseado. La **orientación a objetos** agrupa datos y comportamiento. El **funcional** compone funciones y evita el estado mutable. La mayoría de los lenguajes actuales son multiparadigma, por lo que no se trata de elegir bando, sino la herramienta adecuada para cada parte.","problem":"Da vocabulario y herramientas mentales para estructurar la complejidad.","howItWorks":"Cada paradigma ofrece abstracciones distintas: clases, funciones de orden superior, consultas o reglas.","whenToUse":"Elige según el problema y la convención del equipo: transformaciones de datos encajan bien con el estilo funcional; modelos con estado rico, con objetos; consultas, con estilo declarativo.","advantages":["Amplía las formas de razonar sobre un problema.","Facilita aprender lenguajes nuevos."],"limitations":["Aplicarlos con dogmatismo genera código forzado.","Mezclarlos sin criterio reduce la coherencia."],"example":{"language":"javascript","filename":"estilos.js","code":"// Imperativo\nlet total = 0;\nfor (const p of precios) total += p;\n\n// Funcional\nconst suma = precios.reduce((acc, p) => acc + p, 0);"},"relatedConcepts":[{"id":"oop","note":"Uno de los paradigmas principales."},{"id":"functional-programming","note":"Otro de los principales."}],"prerequisites":[],"tools":[],"sources":[{"title":"Wikipedia: Programming paradigm","url":"https://en.wikipedia.org/wiki/Programming_paradigm"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"oop","title":"Object-oriented Programming","category":"software-engineering","difficulty":"beginner","aliases":["OOP","POO","programación orientada a objetos","clases"],"description":"Paradigma que organiza el software en objetos que combinan datos y comportamiento, y que se comunican entre sí.","technicalExplanation":"Sus conceptos habituales son **encapsulación** (ocultar el estado interno), **herencia** (reutilizar y especializar), **polimorfismo** (una interfaz, varias implementaciones) y **abstracción**. Hoy se suele preferir la composición a la herencia profunda, porque esta última acopla mucho.","problem":"Permite modelar conceptos con estado y reglas propias, y limitar qué partes del sistema pueden cambiar cada dato.","howItWorks":"Se definen clases o prototipos. Los objetos exponen métodos, y el resto del código los usa sin conocer sus detalles internos.","whenToUse":"Cuando hay entidades con estado y reglas propias o varias variantes intercambiables de un comportamiento.","advantages":["Encapsula el estado.","El polimorfismo facilita extender sin modificar."],"limitations":["Las jerarquías profundas son rígidas.","Puede añadir abstracción innecesaria."],"example":{"language":"javascript","filename":"cuenta.js","code":"class Cuenta {\n  #saldo = 0;\n  ingresar(cantidad) {\n    if (cantidad <= 0) throw new Error('Cantidad no válida');\n    this.#saldo += cantidad;\n  }\n}"},"relatedConcepts":[{"id":"solid","note":"Principios surgidos en este contexto."},{"id":"design-patterns","note":"Muchos se formulan con objetos."},{"id":"functional-programming","note":"Enfoque alternativo y combinable."}],"prerequisites":["programming-paradigms"],"tools":[],"sources":[{"title":"MDN: Object-oriented programming","url":"https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects/Object-oriented_programming"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"functional-programming","title":"Functional Programming","category":"software-engineering","difficulty":"intermediate","aliases":["programación funcional","FP"],"description":"Paradigma que construye programas componiendo funciones y evitando el estado mutable y los efectos secundarios.","technicalExplanation":"Sus ideas centrales son las **funciones puras** (mismo resultado para la misma entrada, sin efectos), la **inmutabilidad** y las **funciones de orden superior**. Las funciones puras son fáciles de probar y de paralelizar, porque no dependen de estado externo. Los efectos, como I/O, se empujan a los bordes del sistema.","problem":"Reduce errores causados por estado compartido y facilita razonar sobre el código.","howItWorks":"Se transforman datos con funciones como `map`, `filter` y `reduce` en lugar de mutarlos.","whenToUse":"Para transformación de datos, cálculos y lógica de negocio que convenga probar de forma aislada.","advantages":["Fácil de probar.","Menos errores por estado compartido.","Facilita la concurrencia."],"limitations":["Curva de aprendizaje en lenguajes y conceptos avanzados.","Puede costar más memoria si se copian datos de forma ingenua."],"example":{"language":"javascript","filename":"pedidos.js","code":"const totalPagado = (pedidos) => pedidos\n  .filter((p) => p.pagado)\n  .reduce((suma, p) => suma + p.importe, 0);"},"relatedConcepts":[{"id":"oop","note":"Enfoque complementario."},{"id":"unit-testing","note":"Las funciones puras se prueban con facilidad."}],"prerequisites":["programming-paradigms"],"tools":[],"sources":[{"title":"Wikipedia: Functional programming","url":"https://en.wikipedia.org/wiki/Functional_programming"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"solid","title":"SOLID Principles","category":"software-engineering","difficulty":"intermediate","aliases":["SOLID","principios SOLID"],"description":"Cinco principios de diseño orientado a objetos, promovidos por Robert C. Martin, para que el código sea más fácil de cambiar.","technicalExplanation":"- **S**, responsabilidad única: un módulo debe tener un solo motivo para cambiar.\n- **O**, abierto/cerrado: extender sin modificar lo existente.\n- **L**, sustitución de Liskov: un subtipo debe poder sustituir a su tipo base.\n- **I**, segregación de interfaces: interfaces pequeñas y específicas.\n- **D**, inversión de dependencias: depender de abstracciones, no de detalles.","problem":"Reduce el acoplamiento que hace que un cambio pequeño rompa partes lejanas del sistema.","howItWorks":"Se aplican como criterios al diseñar y refactorizar, no como reglas mecánicas.","whenToUse":"Cuando el código tiende a cambiar. No abstraigas de antemano un código simple que no ha mostrado esa necesidad.","advantages":["Facilita probar y extender.","Vocabulario común para discutir diseño."],"limitations":["Aplicados en exceso, generan capas innecesarias.","Son orientaciones, no leyes."],"example":{"language":"javascript","filename":"inversion.js","code":"// El caso de uso depende de un puerto, no de una base de datos concreta\nfunction crearPedido(repositorio, datos) {\n  return repositorio.guardar(datos);\n}"},"relatedConcepts":[{"id":"oop","note":"Su contexto original."},{"id":"clean-architecture","note":"Aplica la inversión de dependencias a nivel de arquitectura."},{"id":"design-patterns","note":"Muchos patrones ayudan a cumplirlos."}],"prerequisites":["oop"],"tools":[],"sources":[{"title":"Wikipedia: SOLID","url":"https://en.wikipedia.org/wiki/SOLID"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"design-patterns","title":"Design Patterns","category":"software-engineering","difficulty":"intermediate","aliases":["patrones de diseño","GoF"],"description":"Soluciones reutilizables y con nombre a problemas de diseño recurrentes, como Strategy, Observer o Factory.","technicalExplanation":"El libro *Design Patterns* (1994), de Gamma, Helm, Johnson y Vlissides, los popularizó, dividiéndolos en creacionales, estructurales y de comportamiento. Más que código para copiar, son un vocabulario. Algunos pierden sentido en lenguajes con funciones de primera clase, donde Strategy puede ser una simple función.","problem":"Evita reinventar soluciones, y permite comunicar una idea de diseño con una palabra.","howItWorks":"Se reconoce el problema y se adapta el patrón al contexto.","whenToUse":"Cuando el problema aparece de verdad. Introducir un patrón “por si acaso” es una fuente común de complejidad.","advantages":["Vocabulario compartido.","Soluciones probadas."],"limitations":["Sobreingeniería si se aplica sin necesidad.","Algunos solo compensan carencias del lenguaje."],"example":{"language":"javascript","filename":"strategy.js","code":"const envio = {\n  estandar: (peso) => 3 + peso * 0.5,\n  urgente: (peso) => 8 + peso,\n};\nconst coste = envio[tipo](peso);","explanation":"Strategy en JavaScript: un objeto de funciones basta, sin jerarquía de clases."},"relatedConcepts":[{"id":"oop","note":"Su contexto más habitual."},{"id":"solid","note":"Ayudan a cumplir estos principios."}],"prerequisites":["oop"],"tools":[],"sources":[{"title":"Refactoring.Guru: Design Patterns","url":"https://refactoring.guru/design-patterns"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"clean-architecture","title":"Clean Architecture","category":"software-engineering","difficulty":"advanced","aliases":["arquitectura limpia"],"description":"Estilo de arquitectura que organiza el código en capas concéntricas, en el que las dependencias apuntan siempre hacia dentro, hacia las reglas de negocio.","technicalExplanation":"Robert C. Martin la describió en 2012 sintetizando ideas de arquitecturas anteriores, como la hexagonal. Su regla es la **regla de la dependencia**: el código interno no conoce nada del externo. Las capas típicas son entidades, casos de uso, adaptadores e infraestructura.","problem":"Evita que el negocio quede atado a un framework o una base de datos, y permite probarlo sin ellos.","howItWorks":"La lógica define interfaces, y la infraestructura las implementa. Se ensambla todo en un punto de arranque.","whenToUse":"En sistemas con lógica de negocio compleja y larga vida. En un CRUD sencillo es excesiva.","advantages":["Negocio probable sin infraestructura.","Sustituir un detalle técnico es más fácil."],"limitations":["Más archivos e indirección.","Puede resultar artificial en aplicaciones simples."],"example":{"text":"Un caso de uso `CrearPedido` recibe un `PedidoRepositorio` (interfaz). En tests usa una implementación en memoria; en producción, una con PostgreSQL. El caso de uso no cambia."},"relatedConcepts":[{"id":"hexagonal-architecture","note":"Idea muy cercana, con otro vocabulario."},{"id":"solid","note":"Lleva la inversión de dependencias a escala de sistema."},{"id":"ddd","note":"Se combinan a menudo."}],"prerequisites":["solid"],"tools":[],"sources":[{"title":"Robert C. Martin: The Clean Architecture","url":"https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"hexagonal-architecture","title":"Hexagonal Architecture","category":"software-engineering","difficulty":"advanced","aliases":["ports and adapters","puertos y adaptadores"],"description":"Arquitectura propuesta por Alistair Cockburn que aísla el núcleo de la aplicación del exterior mediante puertos (interfaces) y adaptadores (implementaciones).","technicalExplanation":"También se llama *Ports and Adapters*. La aplicación expone y usa **puertos**; los **adaptadores** conectan esos puertos con tecnologías concretas, como HTTP, una base de datos o una cola. Distingue el lado que dirige la aplicación (una petición HTTP, un test) del lado dirigido por ella (la base de datos).","problem":"Permite usar la aplicación igual desde una interfaz, un test o un script, y sin depender de tecnologías concretas.","howItWorks":"Se definen puertos en el núcleo, y se implementan adaptadores fuera. Los tests pueden sustituir cualquier adaptador.","whenToUse":"Cuando la lógica importa, y hay varias entradas o salidas o se quiere probar sin infraestructura.","advantages":["Pruebas sin infraestructura.","Sustitución de tecnologías."],"limitations":["Más indirección.","Excesiva en aplicaciones simples."],"example":{"text":"El puerto `EnviarNotificacion` tiene un adaptador de email en producción y uno que guarda en memoria en los tests."},"relatedConcepts":[{"id":"clean-architecture","note":"Comparte el principio de aislar el núcleo."},{"id":"ddd","note":"Encaja bien con un modelo de dominio."}],"prerequisites":["solid"],"tools":[],"sources":[{"title":"Alistair Cockburn: Hexagonal architecture","url":"https://alistair.cockburn.us/hexagonal-architecture/"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"ddd","title":"Domain Driven Design","category":"software-engineering","difficulty":"advanced","aliases":["DDD","diseño guiado por el dominio","bounded context"],"description":"Enfoque, descrito por Eric Evans en 2003, que centra el diseño del software en un modelo del dominio de negocio, compartido entre expertos y desarrolladores.","technicalExplanation":"Tiene dos vertientes. La **estratégica** incluye el *lenguaje ubicuo* y los *bounded contexts*, que delimitan dónde es válido cada modelo. La **táctica** ofrece bloques como entidades, value objects y agregados. Lo primero suele aportar más valor.","problem":"En dominios complejos, las discrepancias entre el lenguaje del negocio y el código causan errores. Un solo modelo para toda la empresa se vuelve inmanejable.","howItWorks":"Se trabaja con expertos para construir un lenguaje común, se divide el sistema en contextos y se refleja el modelo en el código.","whenToUse":"Cuando la complejidad está en las reglas de negocio. No compensa si el problema es sobre todo técnico o un CRUD.","advantages":["Alinea software y negocio.","Ayuda a delimitar servicios o módulos."],"limitations":["Requiere acceso a expertos del dominio.","Curva de aprendizaje.","Se aplica mal si solo se copian sus patrones tácticos."],"example":{"text":"“Cliente” significa cosas distintas en Facturación y en Soporte. Dos bounded contexts permiten tener dos modelos en lugar de uno enorme y contradictorio."},"relatedConcepts":[{"id":"microservices","note":"Los bounded contexts ayudan a delimitar servicios."},{"id":"clean-architecture","note":"Protege el modelo de la infraestructura."}],"prerequisites":["oop"],"tools":[],"sources":[{"title":"Martin Fowler: Domain Driven Design","url":"https://martinfowler.com/bliki/DomainDrivenDesign.html"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"microservices","title":"Microservices","category":"software-engineering","difficulty":"advanced","aliases":["microservicios"],"description":"Estilo de arquitectura en el que una aplicación se compone de pequeños servicios desplegables de forma independiente, que se comunican por la red.","technicalExplanation":"James Lewis y Martin Fowler describieron en 2014 sus características habituales: servicios organizados por capacidades de negocio, despliegue independiente, datos descentralizados y automatización. El precio es un sistema distribuido: latencia, fallos parciales, consistencia eventual y necesidad de observabilidad.","problem":"Permite que equipos grandes trabajen y desplieguen de forma independiente, y escalar por separado partes distintas.","howItWorks":"Cada servicio tiene su propio despliegue y datos, y se comunica por APIs o eventos. Requiere CI/CD y plataforma sólidas.","whenToUse":"Con varios equipos y dominios bien delimitados. No es buen punto de partida para un equipo pequeño.","advantages":["Despliegue y escalado independientes.","Autonomía de los equipos."],"limitations":["Complejidad operativa alta.","Depurar y mantener la consistencia es más difícil.","Mal delimitados, dan un “monolito distribuido”."],"example":{"text":"Una tienda separa Catálogo, Pagos y Envíos. Pagos se despliega sin tocar los demás y publica un evento `PagoConfirmado`."},"relatedConcepts":[{"id":"monolith-vs-microservices","note":"La decisión de fondo."},{"id":"event-driven-architecture","note":"Estilo frecuente de comunicación."},{"id":"kubernetes","note":"Plataforma común de ejecución."},{"id":"observability","note":"Imprescindible en sistemas distribuidos."}],"prerequisites":["api-design"],"tools":["kubernetes-tool","docker-tool"],"sources":[{"title":"James Lewis y Martin Fowler: Microservices","url":"https://martinfowler.com/articles/microservices.html"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"monolith-vs-microservices","title":"Monolith vs Microservices","category":"software-engineering","difficulty":"intermediate","aliases":["monolito","monolito modular"],"description":"La decisión entre desplegar la aplicación como una unidad o dividirla en servicios independientes. No hay una respuesta universal.","technicalExplanation":"Un monolito no es sinónimo de código desordenado: puede ser muy modular. Martin Fowler observa en *Monolith First* que muchos proyectos exitosos empezaron como monolito, porque al principio no se conocen bien los límites adecuados. Un punto intermedio es el **monolito modular**.","problem":"Elegir mal implica o una complejidad distribuida innecesaria, o un monolito que frena a muchos equipos.","howItWorks":"Se valora el tamaño del equipo, la madurez operativa, la claridad de los dominios y las necesidades de escalado.","whenToUse":"Empieza por lo simple salvo que haya una razón clara. Hay una comparativa detallada en la sección de Comparativas.","advantages":["Pensarlo evita adoptar microservicios por moda."],"limitations":["Migrar en cualquier dirección es caro."],"example":{"text":"Una startup de tres personas con un monolito modular puede desplegar varias veces al día. Dividirlo le haría gastar su tiempo en infraestructura."},"relatedConcepts":[{"id":"microservices","note":"Una de las opciones."},{"id":"ddd","note":"Ayuda a encontrar los límites."}],"prerequisites":[],"tools":[],"sources":[{"title":"Martin Fowler: Monolith First","url":"https://martinfowler.com/bliki/MonolithFirst.html"},{"title":"James Lewis y Martin Fowler: Microservices","url":"https://martinfowler.com/articles/microservices.html"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"api-design","title":"API Design","category":"software-engineering","difficulty":"intermediate","aliases":["diseño de APIs","OpenAPI"],"description":"Definir cómo se comunica un sistema con sus consumidores: recursos u operaciones, formatos, errores y versionado.","technicalExplanation":"Una API es un contrato difícil de cambiar una vez publicado. Las buenas APIs son coherentes, predecibles y tienen errores útiles. Las especificaciones como OpenAPI permiten describir APIs HTTP de forma legible por máquinas, lo que facilita generar documentación, clientes y pruebas. También ayudan a los agentes a usarlas bien.","problem":"Una API mal diseñada propaga sus problemas a todos sus consumidores y es costosa de corregir.","howItWorks":"Se diseña primero el contrato, se revisa con los consumidores, se versiona y se prueban los cambios incompatibles.","whenToUse":"Siempre que otro equipo o sistema vaya a consumir tu código.","advantages":["Permite desarrollar en paralelo contra un contrato.","Facilita la evolución independiente."],"limitations":["Requiere disciplina de compatibilidad.","Los errores de diseño perduran."],"example":{"language":"yaml","filename":"openapi.yaml","code":"paths:\n  /orders/{id}:\n    get:\n      summary: Obtiene un pedido\n      responses:\n        \"200\":\n          description: Pedido encontrado\n        \"404\":\n          description: No existe"},"relatedConcepts":[{"id":"rest","note":"Estilo común."},{"id":"graphql","note":"Alternativa."},{"id":"mcp","note":"Otro tipo de contrato, orientado a modelos."}],"prerequisites":[],"tools":[],"sources":[{"title":"OpenAPI Specification","url":"https://spec.openapis.org/oas/latest.html"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"rest","title":"REST","category":"software-engineering","difficulty":"beginner","aliases":["RESTful","API REST"],"description":"Estilo de arquitectura para sistemas distribuidos, definido por Roy Fielding en 2000, basado en recursos, representaciones y una interfaz uniforme.","technicalExplanation":"Sus restricciones incluyen cliente-servidor, ausencia de estado, cache e interfaz uniforme. En la práctica, “API REST” suele significar JSON sobre HTTP con recursos y verbos, aunque muchas no cumplen todas las restricciones originales, en particular el hipermedia.","problem":"Da una forma uniforme y escalable de exponer recursos, que aprovecha la infraestructura de HTTP.","howItWorks":"Los recursos se identifican con URLs y se manipulan con métodos como `GET`, `POST`, `PUT` y `DELETE`. Los códigos de estado comunican el resultado.","whenToUse":"Es una opción sensata por defecto para APIs públicas y CRUD.","advantages":["Ampliamente comprendido.","Se beneficia de la cache HTTP."],"limitations":["Puede pedir datos de más o de menos.","El término se usa con poca precisión."],"example":{"language":"bash","filename":"terminal","code":"curl https://api.example.com/orders/42\ncurl -X POST https://api.example.com/orders -d '{\"item\":\"libro\"}'"},"relatedConcepts":[{"id":"api-design","note":"Marco general."},{"id":"graphql","note":"Alternativa."}],"prerequisites":[],"tools":[],"sources":[{"title":"Roy Fielding: REST (disertación, capítulo 5)","url":"https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"graphql","title":"GraphQL","category":"software-engineering","difficulty":"intermediate","aliases":["queries","schema"],"description":"Lenguaje de consulta para APIs, en el que el cliente pide exactamente los campos que necesita a partir de un esquema con tipos.","technicalExplanation":"Un servidor GraphQL expone un **esquema** tipado y un único endpoint. El cliente envía consultas, y el servidor resuelve cada campo mediante *resolvers*. Esto evita varias peticiones para una pantalla, pero traslada al servidor retos como el problema N+1 y el control del coste de cada consulta.","problem":"Evita pedir datos de más o de menos, algo importante en clientes con necesidades muy distintas.","howItWorks":"Se define el esquema, se implementan resolvers y los clientes escriben consultas que se validan contra él.","whenToUse":"Con varios clientes con necesidades diversas o datos muy relacionados. Para una API simple, REST suele bastar.","advantages":["El cliente pide lo que necesita.","Esquema tipado y explorable."],"limitations":["La cache HTTP es más compleja.","Consultas costosas si no se limitan."],"example":{"language":"text","filename":"query.graphql","code":"query {\n  order(id: 42) {\n    total\n    items { name }\n  }\n}"},"relatedConcepts":[{"id":"rest","note":"Alternativa más simple."},{"id":"api-design","note":"Marco general."}],"prerequisites":["api-design"],"tools":[],"sources":[{"title":"GraphQL: Learn","url":"https://graphql.org/learn/"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"event-driven-architecture","title":"Event-driven Architecture","category":"software-engineering","difficulty":"advanced","aliases":["EDA","arquitectura orientada a eventos","eventos","pub/sub"],"description":"Estilo en el que los componentes se comunican publicando y reaccionando a eventos, en lugar de llamarse directamente.","technicalExplanation":"Fowler advierte de que “event-driven” agrupa patrones distintos: notificación de eventos, transferencia de estado por eventos, event sourcing y CQRS. Conviene precisar cuál se usa. El emisor no conoce a los consumidores, lo que reduce el acoplamiento, pero dificulta seguir el flujo del sistema.","problem":"Permite añadir reacciones sin modificar al emisor, y absorber picos de carga con colas.","howItWorks":"Un productor publica en un bróker y los consumidores suscritos procesan el mensaje de forma asíncrona. Deben tolerar duplicados y desorden.","whenToUse":"En integraciones entre dominios y procesos asíncronos. Evítalo si necesitas una respuesta inmediata y un flujo simple.","advantages":["Bajo acoplamiento.","Buen comportamiento ante picos."],"limitations":["Flujo difícil de seguir y depurar.","Consistencia eventual.","Hay que gestionar duplicados y errores."],"example":{"text":"`PedidoCreado` activa, sin que el servicio de pedidos lo sepa, el email de confirmación, la reserva de stock y una actualización de analítica."},"relatedConcepts":[{"id":"microservices","note":"Forma común de comunicación entre ellos."},{"id":"observability","note":"Necesaria para seguir flujos asíncronos."}],"prerequisites":["api-design"],"tools":[],"sources":[{"title":"Martin Fowler: What do you mean by “Event-Driven”?","url":"https://martinfowler.com/articles/201701-event-driven.html"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"ai-assisted-development","title":"AI-assisted Development","category":"ai-development","difficulty":"beginner","aliases":["desarrollo asistido por IA","AI-assisted coding"],"description":"Término general para cualquier forma de desarrollar software con ayuda de modelos de IA, desde el autocompletado hasta los agentes, con la persona como responsable del resultado.","technicalExplanation":"Es el paraguas más amplio. Cubre sugerencias en línea, chat, generación de tests, revisión automática y agentes. Se popularizó con herramientas como GitHub Copilot, presentado en vista previa técnica el 29 de junio de 2021 y disponible de forma general el 21 de junio de 2022. Simon Willison señala que usar LLM y revisar, probar y poder explicar el código sigue siendo desarrollo de software normal.","problem":"Reduce el tiempo dedicado a tareas mecánicas, a entender código desconocido o a escribir código repetitivo.","howItWorks":"El modelo recibe contexto (código, instrucción) y propone. La persona acepta, ajusta o rechaza, y sigue siendo responsable de su calidad.","whenToUse":"En casi cualquier tarea de desarrollo, ajustando la revisión al riesgo del código.","advantages":["Acelera tareas repetitivas.","Ayuda a orientarse en tecnologías desconocidas.","Reduce barreras para probar ideas."],"limitations":["Puede introducir errores plausibles.","Puede atrofiar habilidades si no se comprende lo generado.","Plantea cuestiones de privacidad y licencia que debes revisar."],"example":{"text":"Pides una función de validación de IBAN, lees el resultado, añades casos de prueba y corriges un detalle antes de hacer commit."},"relatedConcepts":[{"id":"ai-coding","note":"Casi sinónimo, centrado en escribir código."},{"id":"agentic-coding","note":"La variante con mayor delegación."},{"id":"vibe-coding","note":"Una variante sin revisión del código."}],"prerequisites":[],"tools":["github-copilot","cursor","claude-code"],"sources":[{"title":"GitHub Blog: Copilot is generally available","url":"https://github.blog/2022-06-21-github-copilot-is-generally-available-to-all-developers/","note":"21 de junio de 2022"},{"title":"Simon Willison: Not all AI-assisted programming is vibe coding","url":"https://simonwillison.net/2025/Mar/19/vibe-coding/"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"ai-coding","title":"AI Coding","category":"ai-development","difficulty":"beginner","aliases":["programar con IA"],"description":"Expresión informal para escribir código con modelos de IA. Sin definición estricta: incluye desde el autocompletado hasta los agentes.","technicalExplanation":"No es un término técnico preciso. Lo importante para entender cualquier afirmación sobre “AI coding” es preguntar qué modo de trabajo describe: sugerencias, chat con cambios puntuales o agente autónomo. Cada uno exige una supervisión distinta.","problem":"Sirve como etiqueta común, pero puede ocultar diferencias importantes.","howItWorks":"Depende de la herramienta: completar en línea, generar a partir de una instrucción, o delegar una tarea completa.","whenToUse":"Usa el término como descripción general; para decisiones concretas, precisa el modo de trabajo.","advantages":["Etiqueta sencilla y reconocible."],"limitations":["Demasiado vago para evaluar resultados o riesgos."],"example":{"text":"“Usamos AI coding” puede significar autocompletado con revisión línea a línea o agentes que abren PR por su cuenta: son prácticas muy distintas."},"relatedConcepts":[{"id":"ai-assisted-development","note":"Término más amplio."},{"id":"agentic-coding","note":"Forma más concreta."},{"id":"ai-coding-assistants","note":"Herramientas típicas."}],"prerequisites":[],"tools":[],"sources":[{"title":"Simon Willison: Not all AI-assisted programming is vibe coding","url":"https://simonwillison.net/2025/Mar/19/vibe-coding/"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"agentic-coding","title":"Agentic Coding","category":"ai-development","difficulty":"intermediate","aliases":["codificación agéntica","coding agents","agentes de código"],"description":"Programar delegando tareas en un agente que lee el código, edita archivos, ejecuta comandos y comprueba su trabajo, mientras la persona define objetivos y revisa resultados.","technicalExplanation":"El cambio frente a la asistencia es **quién mantiene el bucle**. Con un asistente, la persona ejecuta, lee el error y vuelve a preguntar. En agentic coding, el agente hace ese ciclo: ejecuta los tests, interpreta el fallo, corrige y repite.\n\nTécnicamente, requiere un modelo capaz de usar herramientas de forma fiable y un entorno donde pueda actuar: terminal, editor o nube. La calidad del resultado depende mucho del contexto que recibe y de si tiene forma de verificarse. Los productos actuales lo ofrecen en varias superficies, como terminal (Claude Code, Codex CLI, Gemini CLI, Aider), IDE (Cursor, Devin Desktop, Cline) y nube (Codex Cloud, Cursor Cloud Agents).\n\nNo implica renunciar al criterio: la persona sigue siendo responsable del código. Lo que cambia es que la atención se desplaza de escribir a especificar, supervisar y revisar.","problem":"En la asistencia clásica, la persona hace de intermediaria entre el modelo y el entorno, copiando errores y aplicando cambios. Delegar el ciclo completo reduce esa carga y permite abordar cambios multiarchivo o trabajar en varias tareas a la vez.","howItWorks":"- **Encargo:** describes el objetivo, las restricciones y cómo verificar el resultado.\n- **Exploración:** el agente busca y lee lo relevante.\n- **Plan:** propone cómo proceder, especialmente en cambios grandes.\n- **Implementación y verificación:** edita, ejecuta tests y corrige.\n- **Revisión:** revisas el diff y das feedback o integras.","whenToUse":"Es adecuado cuando la tarea tiene criterios de éxito comprobables: corregir bugs con un test que falla, migraciones, escribir tests o cambios en código que el equipo conoce bien. Requiere más cuidado cuando el criterio es subjetivo, cuando no hay tests o cuando el código es crítico para la seguridad.","advantages":["Reduce la carga de hacer de intermediario.","Hace viables cambios amplios y mecánicos.","Permite trabajar en paralelo con varios agentes.","Ayuda a entender código desconocido."],"limitations":["Requiere revisar diffs potencialmente grandes.","Sin verificación automática, el agente puede dar por buena una solución incorrecta.","Consume muchos más tokens que el chat.","Actuar en tu máquina exige controlar los permisos."],"example":{"text":"Un encargo que incluye cómo comprobar el resultado:","language":"text","filename":"prompt","code":"El endpoint /orders devuelve 500 cuando el carrito está vacío.\nEscribe primero un test que lo reproduzca, corrige la causa\ny ejecuta toda la suite. No modifiques la API pública.","explanation":"El test da al agente un objetivo verificable. La restricción final evita una “solución” que cambie el contrato."},"relatedConcepts":[{"id":"ai-agents","note":"La tecnología de base."},{"id":"ai-assisted-development","note":"El concepto general."},{"id":"agentic-engineering","note":"La práctica profesional que lo rodea."},{"id":"vibe-coding","note":"Comparte herramientas, pero prescinde de revisar el código."},{"id":"ai-development-workflows","note":"Cómo organizar el trabajo con agentes."}],"prerequisites":["ai-agents","ai-assisted-development"],"tools":["claude-code","openai-codex","cursor","gemini-cli","aider","cline","windsurf"],"sources":[{"title":"Claude Code: overview","url":"https://code.claude.com/docs/en/overview"},{"title":"OpenAI: Codex documentation","url":"https://learn.chatgpt.com/docs"},{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"},{"title":"Claude Code: Best practices","url":"https://code.claude.com/docs/en/best-practices"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05","editorialNote":"No hay una definición normativa: el término se usa de forma descriptiva en el sector. Aquí se explica como un modo de trabajo observable, no como un estándar."},{"id":"agentic-engineering","title":"Agentic Engineering","category":"ai-development","difficulty":"advanced","aliases":["ingeniería agéntica"],"description":"Ingeniería de software en la que se dirigen agentes que escriben gran parte del código, manteniendo las exigencias profesionales de diseño, revisión, pruebas y responsabilidad.","technicalExplanation":"El término se usa sobre todo como contraste con el [[vibe-coding]]: según las crónicas, la idea es que, a medida que los modelos mejoran, la versión profesional de programar con IA no consiste en aceptar el resultado sin mirar, sino en orquestar agentes con supervisión.\n\nComo no tiene una definición normativa, resulta más útil describir lo que implica en la práctica:\n\n- **Especificar** con precisión qué se quiere y cómo se comprueba.\n- **Diseñar el entorno**, como arquitectura, tests, [[agentic-harness|harness]] e instrucciones, para que los agentes trabajen bien.\n- **Coordinar** varios agentes y tareas.\n- **Revisar y responder** por el resultado, aunque no se haya escrito a mano.\n\nLa diferencia con [[agentic-coding]] es de alcance: esta describe la actividad de programar con agentes, mientras que la ingeniería agéntica incluye el sistema y la disciplina a su alrededor.","problem":"Generar código deja de ser el cuello de botella, pero aparecen otros: mantener la calidad, revisar más volumen, evitar deuda técnica y conservar el conocimiento del sistema. Hace falta una práctica profesional para esa nueva situación.","howItWorks":"No es un método fijo. Un equipo suele combinar especificaciones, planificación, ejecución con agentes aislados, verificación automática y revisión humana, y convierte los errores repetidos en controles permanentes.","whenToUse":"Cuando los agentes escriben una parte importante del código de un sistema que hay que mantener. En un prototipo desechable, este rigor puede ser excesivo.","advantages":["Conserva los estándares de ingeniería al aumentar la delegación.","Hace el trabajo con agentes repetible en equipo.","Reduce la dependencia de la intuición individual."],"limitations":["Término todavía impreciso y usado con fines de marketing.","Requiere una inversión inicial en tests, documentación y herramientas.","Las prácticas aún evolucionan rápido, y faltan evidencias a largo plazo."],"example":{"text":"Un equipo acuerda que todo cambio de agente debe llegar con tests, pasar CI y recibir revisión. Cada fallo recurrente se convierte en una regla de linter o una instrucción, y los resultados se miden con evals."},"relatedConcepts":[{"id":"agentic-coding","note":"La actividad central."},{"id":"harness-engineering","note":"Una disciplina concreta dentro de esta práctica."},{"id":"context-engineering","note":"Otra competencia clave."},{"id":"vibe-coding","note":"El contraste con el que suele presentarse."},{"id":"ai-software-engineering","note":"Término cercano y también poco delimitado."}],"prerequisites":["agentic-coding"],"tools":["claude-code","openai-codex"],"sources":[{"title":"The New Stack: Vibe coding is passé","url":"https://thenewstack.io/vibe-coding-is-passe/","note":"Fuente secundaria"},{"title":"Birgitta Böckeler: Harness engineering for coding agent users","url":"https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html","note":"martinfowler.com, 2 de abril de 2026"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05","editorialNote":"Término reciente. Se atribuye su popularización a Andrej Karpathy a comienzos de 2026, pero solo se ha podido contrastar mediante fuentes secundarias y discrepan en la fecha exacta. Por eso sigue como Needs review."},{"id":"context-engineering","title":"Context Engineering","category":"ai-development","difficulty":"intermediate","aliases":["ingeniería de contexto"],"description":"El conjunto de estrategias para seleccionar y mantener la información que recibe un modelo en cada inferencia, incluida la que va más allá del prompt: instrucciones, herramientas, historial y datos.","technicalExplanation":"Anthropic la define como el conjunto de estrategias para curar y mantener el conjunto óptimo de tokens durante la inferencia, y la presenta como una evolución natural de la [[prompt-engineering]]. Si esta se centra en redactar buenas instrucciones, aquella gestiona **todo el estado del contexto** a lo largo de muchos turnos.\n\nEl principio de fondo es que el contexto es un recurso finito con rendimientos decrecientes. El objetivo es encontrar el menor conjunto de información de alta señal que maximice la probabilidad del resultado deseado.\n\nSus técnicas principales son:\n\n- **Recuperación just-in-time:** guardar referencias ligeras (rutas, consultas, enlaces) y cargar el contenido con herramientas cuando se necesite.\n- **[[context-compaction|Compactación]]:** resumir la conversación cerca del límite.\n- **[[persistent-memory|Notas estructuradas]]:** escribir fuera de la ventana y leerlas más tarde.\n- **[[subagents|Subagentes]]:** aislar subtareas y recibir solo un resumen.","problem":"Un agente que trabaja durante muchos turnos acumula información cada vez menos relevante. Cuando el contexto se llena de ruido, las instrucciones pierden peso y empeoran las decisiones. Y si falta el dato correcto, el modelo lo suple con suposiciones plausibles.","howItWorks":"Se trata de decidir, para cada elemento, cuándo entra en contexto y a qué coste:\n\n- **Siempre:** instrucciones breves, como [[agents-md]].\n- **Al necesitarse:** [[skills]], archivos, resultados de herramientas.\n- **Fuera de contexto:** memoria, notas, salida de subagentes.\n\nLa arquitectura híbrida es habitual: unos datos se cargan por adelantado por velocidad, y el resto se explora bajo demanda.","whenToUse":"En todo agente que dure más de unos pocos turnos. Si un agente falla, antes de cambiar de modelo, pregúntate si tenía la información correcta y si esta era visible.","advantages":["Mejora la calidad en tareas largas sin cambiar de modelo.","Reduce coste y latencia.","Hace más predecible el comportamiento.","Permite trabajar en repositorios grandes."],"limitations":["Requiere criterio y experimentación: no hay una receta universal.","Recuperar información bajo demanda añade pasos.","Resumir y filtrar puede eliminar el dato que importaba.","Lo que entra en contexto, incluido contenido externo, puede influir o manipular al modelo."],"example":{"text":"Compara dos enfoques para “explica cómo funciona la autenticación”. Malo: pegar 40 archivos. Mejor: dar en `AGENTS.md` un mapa breve (`auth vive en src/auth`) y dejar que el agente use búsqueda para abrir solo los archivos que necesite."},"relatedConcepts":[{"id":"prompt-engineering","note":"Su antecedente, de alcance menor."},{"id":"context-management","note":"Su parte operativa."},{"id":"skills","note":"Aplican divulgación progresiva."},{"id":"subagents","note":"Aíslan el contexto."},{"id":"harness-engineering","note":"Según algunos autores, el contexto responde a qué ve el agente; el harness, además, a qué se previene y comprueba."},{"id":"mcp","note":"Conecta fuentes externas de contexto."}],"prerequisites":["prompt-engineering","ai-agents"],"tools":["claude-code"],"sources":[{"title":"Anthropic: Effective context engineering for AI agents","url":"https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents","note":"29 de septiembre de 2025"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05","featured":4},{"id":"prompt-engineering","title":"Prompt Engineering","category":"ai-development","difficulty":"beginner","aliases":["ingeniería de prompts"],"description":"La práctica de redactar instrucciones para que un modelo produzca el resultado deseado: claridad, contexto, ejemplos y formato de salida.","technicalExplanation":"Incluye técnicas como ser explícito y directo, dar ejemplos (*few-shot*), definir un rol, separar con estructura las partes del prompt y especificar el formato. Sigue siendo relevante aunque la [[context-engineering]] lo englobe. Anthropic señala que antes de iterar el prompt hay que tener criterios de éxito y una forma de medirlos.","problem":"Un prompt ambiguo produce resultados ambiguos. Una instrucción clara reduce los errores de interpretación.","howItWorks":"Se redacta, se prueba con casos reales, se mide y se itera, como cualquier otra pieza de un sistema.","whenToUse":"Siempre que escribas instrucciones para un modelo, en especial en prompts de sistema, descripciones de herramientas y skills.","advantages":["Es barato y rápido de mejorar.","Sus efectos pueden ser inmediatos."],"limitations":["No compensa falta de datos o herramientas.","Lo que funciona en un modelo puede variar en otro.","Las “fórmulas mágicas” suelen ser mitos."],"example":{"text":"En vez de “revisa este código”, escribe: “Revisa este diff buscando errores de concurrencia. Por cada hallazgo, indica archivo, línea y un escenario concreto de fallo. Si no hay ninguno, dilo”."},"relatedConcepts":[{"id":"context-engineering","note":"La amplía a todo el estado del contexto."},{"id":"skills","note":"Una skill es, en parte, un prompt reutilizable bien escrito."},{"id":"agent-evaluation","note":"Permite medir si un cambio de prompt mejora el resultado."}],"prerequisites":[],"tools":[],"sources":[{"title":"Claude: Prompt engineering overview","url":"https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview"},{"title":"Anthropic: Effective context engineering for AI agents","url":"https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents","note":"29 de septiembre de 2025"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"spec-driven-development","title":"Spec-driven Development","category":"ai-development","difficulty":"intermediate","aliases":["SDD","desarrollo guiado por especificación","Spec Kit"],"description":"Escribir primero una especificación explícita (qué y por qué) y usarla como fuente de la que derivan el plan, las tareas y el código.","technicalExplanation":"Con agentes, la idea tiene un nuevo atractivo: una especificación revisada reduce la ambigüedad antes de generar código, y sobrevive a la sesión. GitHub Spec Kit es un ejemplo de conjunto de herramientas que estructura el proceso en especificación, plan y tareas. Hay debate sobre cuánto detalle compensa y si la especificación puede ser realmente la fuente de verdad o se desincroniza del código.","problem":"Pedir directamente “construye X” deja cientos de decisiones implícitas al modelo. Muchas salen mal y se descubren tarde.","howItWorks":"- **Especificar** requisitos y criterios de aceptación.\n- **Planificar** la arquitectura.\n- **Dividir** en tareas.\n- **Implementar** y comprobar contra la especificación.","whenToUse":"En funcionalidades con varias partes o que implican a varias personas. Para arreglos pequeños es una sobrecarga.","advantages":["Saca a la luz las decisiones antes de programar.","Da continuidad entre sesiones.","Facilita paralelizar tareas."],"limitations":["La especificación puede quedar obsoleta.","Detallar en exceso acerca al waterfall.","Sigue siendo necesario revisar el código."],"example":{"text":"Antes de implementar la exportación a CSV, un `spec.md` define columnas, límites de filas y permisos. El agente propone un plan a partir de él, y los criterios de aceptación se convierten en tests."},"relatedConcepts":[{"id":"planning-reasoning","note":"Formaliza la fase de planificación."},{"id":"ai-development-workflows","note":"Una forma concreta de flujo."},{"id":"bdd","note":"Comparte la idea de definir primero el comportamiento."}],"prerequisites":["agentic-coding"],"tools":["claude-code","github-copilot"],"sources":[{"title":"GitHub Spec Kit","url":"https://github.com/github/spec-kit"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"vibe-coding","title":"Vibe Coding","category":"ai-development","difficulty":"beginner","aliases":["programar por vibras"],"description":"Construir software con un LLM sin revisar el código que genera, guiándose solo por si el resultado parece funcionar.","technicalExplanation":"Andrej Karpathy acuñó el término el 6 de febrero de 2025. Con el tiempo se ha usado para cualquier programación con IA, pero Simon Willison insiste en la diferencia: si revisas, pruebas y puedes explicar el código, eso es desarrollo de software normal, no vibe coding. Lo que lo define es **no revisar**, y aceptar la responsabilidad o el riesgo que ello conlleva.","problem":"Permite crear prototipos y herramientas personales a gran velocidad, incluso a personas sin formación en programación.","howItWorks":"Describes lo que quieres, pruebas el resultado, y si algo falla, pegas el error y repites, sin leer el código.","whenToUse":"En prototipos desechables, experimentos y herramientas personales de bajo riesgo. No es adecuado para sistemas que manejan datos sensibles, dinero o a otras personas.","advantages":["Velocidad para explorar ideas.","Reduce la barrera de entrada."],"limitations":["Sin revisión pueden colarse fallos de seguridad y de pérdida de datos.","El código se vuelve difícil de mantener.","Si algo falla, nadie entiende por qué."],"example":{"text":"Generar una página para organizar la lista de la compra de una fiesta y descartarla al día siguiente es un buen caso. Crear así un servicio con pagos, no."},"relatedConcepts":[{"id":"ai-assisted-development","note":"Con revisión, deja de ser vibe coding."},{"id":"agentic-engineering","note":"El contraste profesional."},{"id":"agentic-coding","note":"Comparte herramientas, no la revisión."}],"prerequisites":[],"tools":["cursor","claude-code"],"sources":[{"title":"Simon Willison: Not all AI-assisted programming is vibe coding","url":"https://simonwillison.net/2025/Mar/19/vibe-coding/"},{"title":"The New Stack: Vibe coding is passé","url":"https://thenewstack.io/vibe-coding-is-passe/","note":"Fuente secundaria"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"ai-software-engineering","title":"AI Software Engineering","category":"ai-development","difficulty":"intermediate","aliases":["AI engineer","ingeniería de software con IA"],"description":"Expresión ambigua que puede referirse a dos cosas: construir software usando IA, o construir sistemas que incorporan modelos de IA.","technicalExplanation":"Conviene preguntar en qué sentido se usa. En el primero, se solapa con [[agentic-engineering]]. En el segundo, incluye prácticas como evaluación, gestión de prompts, observabilidad de modelos y control de costes para productos que usan LLM. Cognition, por su parte, presentó a Devin en 2024 como “the first AI software engineer”, una afirmación de marketing y no una categoría técnica.","problem":"Aclarar el término evita malentendidos en puestos de trabajo, productos y formación.","howItWorks":"No describe un método concreto; depende del sentido en que se use.","whenToUse":"Precisa siempre si hablas de usar IA para desarrollar o de desarrollar productos con IA.","advantages":["Etiqueta útil en conversaciones generales."],"limitations":["Ambiguo y sensible a modas."],"example":{"text":"“Busco un AI engineer” puede significar alguien que integra LLM en un producto o alguien que usa agentes para programar con rapidez. Son perfiles diferentes."},"relatedConcepts":[{"id":"agentic-engineering","note":"Primer sentido."},{"id":"agent-evaluation","note":"Práctica típica del segundo sentido."}],"prerequisites":[],"tools":["claude-agent-sdk"],"sources":[{"title":"Cognition: Introducing Devin","url":"https://cognition.com/blog/introducing-devin"}],"status":"draft","lastVerified":null,"addedAt":"2026-11-05","editorialNote":"Artículo en borrador: el término no tiene un significado asentado y aquí solo se delimitan sus usos habituales."},{"id":"harness-engineering","title":"Harness Engineering","category":"ai-development","difficulty":"advanced","aliases":["ingeniería del arnés"],"description":"La disciplina de diseñar y mejorar el entorno que rodea a un agente de código (instrucciones, herramientas, comprobaciones y bucles de corrección) para que su trabajo sea fiable.","technicalExplanation":"Birgitta Böckeler (Thoughtworks), en martinfowler.com, describe el [[agentic-harness|harness]] externo como la combinación de:\n\n- **Guías (feedforward):** orientan al agente antes de actuar, como instrucciones y documentación.\n- **Sensores (feedback):** observan lo que produce para que se corrija, como tests y linters.\n\nAmbos pueden ser **computacionales** (deterministas y rápidos: tests, linters, comprobación de tipos) o **inferenciales** (análisis semántico o revisión con un LLM). Según la autora, se regulan tres dimensiones: la **mantenibilidad**, la **adecuación arquitectónica** y el **comportamiento**, siendo esta última la más difícil, porque los tests generados por IA aún no son lo bastante fiables para reducir la supervisión humana.\n\nLa práctica central es que, cuando un problema se repite, no basta con corregirlo: se mejora el harness para que no vuelva a ocurrir. Eso la diferencia de la [[context-engineering]], que se centra en qué información ve el agente, aunque en la práctica ambas se solapan.","problem":"Corregir un mismo error en cada sesión no escala. Y con más delegación, ya no se puede revisar cada línea: hace falta un sistema que oriente y detecte problemas de forma automática.","howItWorks":"- **Observa** dónde falla el agente.\n- **Clasifica:** ¿faltó orientación o faltó detección?\n- **Añade el control** más barato que lo evite. Prefiere uno determinista si es posible.\n- **Haz que el mensaje enseñe:** el error de un linter puede explicar cómo corregirlo, y el agente lo leerá.\n- **Mide** con [[agent-evaluation|evals]] si mejora.\n- **Poda** lo que ya no aporta.","whenToUse":"Cuando los agentes ya escriben una parte notable del código y los errores se repiten. Empieza por lo que ya existe: buenos tests, tipos y linters son parte del harness.","advantages":["Convierte los errores en mejoras permanentes.","Beneficia a todos los agentes y personas del equipo.","Permite aumentar la delegación con más seguridad."],"limitations":["Requiere inversión y mantenimiento.","Los sensores de comportamiento siguen siendo débiles.","Mal hecho, un exceso de controles frena sin mejorar.","Término reciente, con prácticas aún en evolución."],"example":{"text":"El agente sigue importando la base de datos desde la capa HTTP. Una regla de linter lo detecta, con este mensaje: “HTTP no puede importar `db`; usa un servicio de `src/domain`”. El agente recibe la instrucción de corrección en el momento en que comete el error."},"relatedConcepts":[{"id":"agentic-harness","note":"El objeto de esta disciplina."},{"id":"context-engineering","note":"Se solapa con las guías."},{"id":"static-analysis","note":"Sensor computacional típico."},{"id":"hooks","note":"Disparan sensores automáticamente."},{"id":"agent-evaluation","note":"Mide el efecto de los cambios."}],"prerequisites":["agentic-coding","agentic-harness"],"tools":["claude-code","openai-codex"],"sources":[{"title":"Birgitta Böckeler: Harness engineering for coding agent users","url":"https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html","note":"martinfowler.com, 2 de abril de 2026"},{"title":"OpenAI: Harness engineering","url":"https://openai.com/index/harness-engineering/","note":"Fuente primaria; bloqueó la lectura automática, contrastar a mano"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05","editorialNote":"El término se difundió a comienzos de 2026 a raíz de un artículo de OpenAI. Esa fuente primaria no se pudo leer de forma automática, así que la definición aquí se basa en el análisis publicado en martinfowler.com."},{"id":"ai-development-workflows","title":"AI Development Workflows","category":"ai-development","difficulty":"intermediate","aliases":["flujos de desarrollo con IA","explore plan code","plan implement verify"],"description":"Las formas de organizar el trabajo entre personas y agentes durante el desarrollo: cómo se encarga, se planifica, se implementa, se verifica y se integra un cambio.","technicalExplanation":"No existe un flujo único, pero los que funcionan comparten una idea: **dar al agente un objetivo verificable y revisar en los puntos donde corregir aún es barato**. Un flujo base tiene estas fases:\n\n- **Explorar:** el agente lee el código sin cambiar nada.\n- **Planificar:** propone cómo proceder. Revisar aquí es lo más rentable.\n- **Implementar:** escribe en una rama o un worktree aislado.\n- **Verificar:** ejecuta tests, linter y, si procede, prueba la aplicación.\n- **Revisar:** una persona u otro agente con contexto limpio examina el diff.\n- **Integrar:** PR, CI y merge.\n\nLa documentación de buenas prácticas de Claude Code propone ideas afines: escribir una especificación, construir en una sesión limpia, dar al agente una comprobación que ejecutar y usar un revisor que no haya visto cómo se escribió el código. Anthropic ha descrito para tareas largas un patrón con un agente inicializador y sesiones que avanzan una funcionalidad a la vez, dejando commit y notas de progreso.","problem":"Pedir directamente un cambio grande suele dar un diff difícil de revisar, y a veces resuelve el problema equivocado. Un flujo define dónde entra el juicio humano y cómo se comprueba el resultado.","howItWorks":"- **Tarea pequeña:** una petición con la verificación incluida.\n- **Tarea media:** explorar, planificar, implementar, verificar.\n- **Tarea grande:** especificación, división en tareas y agentes en paralelo, con un orquestador o una persona integrando.\n- **Tarea larga:** añade archivos de progreso y commits frecuentes para retomar el trabajo entre sesiones.\n\nCada iteración debería dejar algo mejor: si el agente falla de forma repetida, actualiza instrucciones o controles.","whenToUse":"Adapta el flujo al riesgo: un cambio de texto no necesita plan, y una migración de datos necesita todo lo anterior. Evita ceremonias que no eviten un error real.","advantages":["Detecta malentendidos antes de generar mucho código.","Hace el trabajo revisable y repetible.","Facilita retomar tareas y coordinar a varios agentes."],"limitations":["Más fases implican más tiempo y tokens.","Un flujo rígido se aplica mal a tareas pequeñas.","La revisión humana puede convertirse en cuello de botella."],"example":{"text":"Flujo para un bug: 1) el agente escribe un test que reproduce el fallo; 2) confirma que falla; 3) corrige; 4) ejecuta toda la suite; 5) un subagente de solo lectura revisa el diff; 6) abre un PR y CI lo valida."},"relatedConcepts":[{"id":"workflows","note":"Mismo nombre, aplicado a sistemas con LLM."},{"id":"spec-driven-development","note":"Una variante que parte de la especificación."},{"id":"planning-reasoning","note":"La fase de plan."},{"id":"parallel-agent-development","note":"Variante en paralelo."},{"id":"pull-requests","note":"Punto de integración habitual."}],"prerequisites":["agentic-coding"],"tools":["claude-code","openai-codex","cursor"],"sources":[{"title":"Claude Code: Best practices","url":"https://code.claude.com/docs/en/best-practices"},{"title":"Anthropic: Effective harnesses for long-running agents","url":"https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents"},{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"ai-agents","title":"AI Agents","category":"ai-agents","difficulty":"beginner","aliases":["agentes de IA","what is an ai agent","qué es un agente","agente"],"description":"Un sistema en el que un modelo de lenguaje dirige su propio proceso: decide qué hacer, usa herramientas, observa el resultado y repite hasta completar un objetivo.","technicalExplanation":"No existe una definición única y universal de “agente”. Anthropic ofrece una útil por su precisión: los **agentes** son sistemas en los que el LLM dirige dinámicamente sus procesos y el uso de herramientas, mientras que en los **workflows** los modelos y las herramientas se orquestan por rutas predefinidas. La diferencia está en **quién controla el flujo**.\n\nEn su forma más básica, un agente es un LLM con herramientas ejecutándose en un bucle:\n\n- Recibe un objetivo y un contexto.\n- El modelo decide la siguiente acción.\n- El sistema ejecuta la herramienta y devuelve el resultado.\n- El modelo evalúa si ha terminado o sigue.\n\nEsta estructura se relaciona con el trabajo sobre ReAct (2022), que propuso intercalar razonamiento y acciones en los modelos de lenguaje. Un agente de código, como Claude Code o Codex, aplica este bucle con herramientas para leer y editar archivos y ejecutar comandos, lo que le permite comprobar su propio trabajo y corregirse.","problem":"Un modelo que solo responde no puede completar tareas cuyos pasos dependen de lo que va descubriendo. Arreglar un bug requiere buscar, leer, formular una hipótesis, cambiar código, ejecutar tests y reaccionar al resultado. Un agente cubre ese ciclo sin que una persona haga de intermediaria en cada paso.","howItWorks":"Un agente combina tres elementos: **modelo** (decide), **herramientas** (actúan y observan) y **bucle con condición de parada**. Alrededor hay un [[agentic-harness|harness]] que gestiona contexto, permisos y verificación.\n\nEl bucle debe tener límites. Sin ellos, un agente puede seguir gastando recursos o insistir en un enfoque equivocado. Lo habitual es limitar turnos, coste o tiempo y exigir aprobación humana en las acciones de riesgo.","whenToUse":"Cuando la tarea es abierta y no puedes prever los pasos: depurar, explorar un código desconocido o implementar un cambio en varios archivos. Si los pasos son fijos, un [[workflows|workflow]] es más barato y predecible; si basta una respuesta, no hace falta un agente. Anthropic recomienda empezar por la solución más simple.","advantages":["Afronta tareas de varios pasos sin intervención continua.","Puede verificar y corregir su propio trabajo.","Se adapta a lo que descubre durante la tarea."],"limitations":["Coste y latencia mayores: Anthropic estima alrededor de 4 veces los tokens de un chat.","Comportamiento no determinista, más difícil de probar.","Los errores se pueden propagar por varios pasos.","Actuar sobre sistemas reales introduce riesgos de seguridad."],"example":{"text":"Le pides “el test de login falla, arréglalo”. El agente ejecuta el test, lee el error, busca la función implicada, edita, vuelve a ejecutar, ve que pasa y te resume el cambio. Ninguno de esos pasos estaba escrito de antemano: cada uno depende del resultado anterior."},"relatedConcepts":[{"id":"assistants-vs-agents","note":"Delimita la diferencia con un asistente."},{"id":"tool-calling","note":"El mecanismo que le permite actuar."},{"id":"agent-architecture","note":"Desglosa sus componentes."},{"id":"workflows","note":"La alternativa de flujo predefinido."},{"id":"agentic-harness","note":"Lo que rodea al modelo y lo hace utilizable."},{"id":"agentic-coding","note":"La aplicación de agentes al desarrollo de software."}],"prerequisites":[],"tools":["claude-code","openai-codex","cursor","gemini-cli","claude-agent-sdk"],"sources":[{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"},{"title":"ReAct: Synergizing Reasoning and Acting in Language Models","url":"https://arxiv.org/abs/2210.03629","note":"arXiv, octubre de 2022"},{"title":"Anthropic: How we built our multi-agent research system","url":"https://www.anthropic.com/engineering/multi-agent-research-system"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05","featured":1},{"id":"assistants-vs-agents","title":"AI Assistants vs AI Agents","category":"ai-agents","difficulty":"beginner","aliases":["asistente vs agente"],"description":"Un asistente responde o sugiere y la persona dirige cada paso; un agente recibe un objetivo y decide por sí mismo los pasos para alcanzarlo.","technicalExplanation":"La distinción es un espectro más que una frontera, y los productos se mueven por él: GitHub Copilot empezó con sugerencias de código y hoy documenta capacidades agénticas. La variable útil es el **grado de control delegado**: quién decide el siguiente paso y si el sistema puede ejecutar acciones y observar el resultado.","problem":"Aclara qué supervisión requiere cada herramienta y qué riesgos implica. Usar “agente” para cualquier chatbot oculta esa diferencia práctica.","howItWorks":"Un asistente hace, en esencia, petición → respuesta, y la persona aplica el resultado. Un agente ejecuta un bucle de decisión, acción y observación sobre un objetivo.","whenToUse":"Asistente para dudas y cambios locales que controlas paso a paso. Agente para tareas de varios pasos en las que puedas revisar el resultado final.","advantages":["Ayuda a elegir el nivel de supervisión correcto.","Evita confusiones de marketing."],"limitations":["No hay frontera nítida: un mismo producto puede tener ambos modos.","El uso del término varía de un proveedor a otro."],"example":{"text":"Autocompletar una función es asistencia. Pedir “añade paginación al endpoint y actualiza los tests”, y que el sistema edite, ejecute y corrija, es comportamiento agéntico."},"relatedConcepts":[{"id":"ai-agents","note":"Definición detallada de agente."},{"id":"ai-coding-assistants","note":"La categoría de producto correspondiente."},{"id":"autonomous-agents","note":"El extremo de mayor autonomía."}],"prerequisites":[],"tools":["github-copilot","claude-code"],"sources":[{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"},{"title":"GitHub Docs: What is GitHub Copilot?","url":"https://docs.github.com/en/copilot/get-started/what-is-github-copilot"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"agent-architecture","title":"Agent Architecture","category":"ai-agents","difficulty":"intermediate","aliases":["arquitectura de agentes"],"description":"La organización interna de un agente: modelo, contexto, herramientas, memoria, bucle de control y capa de seguridad, y cómo se conectan.","technicalExplanation":"Aunque cada producto la implementa a su modo, casi todos los agentes de código comparten estas piezas: el **modelo** decide; el **bucle** alterna inferencia y ejecución; el **contexto** reúne instrucciones, historial y resultados; las **herramientas** actúan sobre el entorno; la **memoria** conserva información fuera de la ventana, y **permisos y hooks** controlan qué se ejecuta.","problem":"Ofrece un mapa para razonar sobre un agente: cuando algo falla, saber si el problema está en el contexto, en una herramienta o en la falta de verificación evita cambiar de modelo sin motivo.","howItWorks":"El host construye el contexto, llama al modelo, valida las peticiones de herramienta contra los permisos, las ejecuta y devuelve el resultado al historial, hasta alcanzar una condición de parada.","whenToUse":"Al diseñar un agente propio o al configurar uno existente. Empieza por lo mínimo: modelo, unas pocas herramientas y un bucle.","advantages":["Permite localizar problemas por componente.","Los componentes se pueden mejorar por separado."],"limitations":["Cada capa añade complejidad y latencia.","Los frameworks pueden ocultar lo que realmente se envía al modelo."],"example":{"text":"Un agente mínimo son unas 50 líneas: un bucle que llama al modelo, ejecuta la herramienta pedida y añade el resultado al historial hasta que el modelo no pide más herramientas."},"relatedConcepts":[{"id":"agentic-harness","note":"Todo menos el modelo."},{"id":"agent-lifecycle","note":"La misma arquitectura vista en el tiempo."},{"id":"tools-agent","note":"Componente de actuación."},{"id":"persistent-memory","note":"Componente de continuidad."}],"prerequisites":["ai-agents"],"tools":["claude-agent-sdk","langgraph"],"sources":[{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"},{"title":"Birgitta Böckeler: Harness engineering for coding agent users","url":"https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html","note":"martinfowler.com, 2 de abril de 2026"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"agent-lifecycle","title":"Agent Lifecycle","category":"ai-agents","difficulty":"intermediate","aliases":["ciclo de vida del agente"],"description":"Las fases por las que pasa un agente durante una tarea: arranque y carga de contexto, bucle de trabajo, compactación, verificación y cierre.","technicalExplanation":"El ciclo de vida importa porque ahí se enganchan los mecanismos de control. La lista de eventos de hooks de Claude Code lo ilustra: inicio de sesión, envío de prompt, antes y después de cada herramienta, compactación, inicio y fin de subagente, parada y fin de sesión.","problem":"Sin distinguir fases, es difícil decidir dónde cargar instrucciones, dónde verificar o cómo continuar una tarea interrumpida.","howItWorks":"- **Arranque:** carga instrucciones y memoria.\n- **Bucle:** decisión, acción y observación.\n- **Mantenimiento:** compacta el contexto o delega.\n- **Verificación:** tests y comprobaciones.\n- **Cierre:** resumen, commit, y notas para la siguiente sesión.","whenToUse":"Al diseñar agentes de larga duración o decidir qué hook usar. Una tarea larga necesita además dejar estado para la sesión siguiente.","advantages":["Aclara dónde colocar cada control.","Facilita retomar el trabajo."],"limitations":["Las fases y sus nombres varían entre productos."],"example":{"text":"Anthropic describe un patrón para tareas largas: un agente inicializador crea un script de arranque, una lista de funcionalidades y un log de progreso; cada sesión posterior lee ese estado, trabaja en una funcionalidad y hace commit."},"relatedConcepts":[{"id":"hooks","note":"Se enganchan a los eventos del ciclo."},{"id":"context-compaction","note":"Fase de mantenimiento."},{"id":"agent-architecture","note":"Las piezas que participan en el ciclo."}],"prerequisites":["ai-agents"],"tools":["claude-code"],"sources":[{"title":"Claude Code: Hooks reference","url":"https://code.claude.com/docs/en/hooks"},{"title":"Anthropic: Effective harnesses for long-running agents","url":"https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"agent-orchestration","title":"Agent Orchestration","category":"ai-agents","difficulty":"advanced","aliases":["orquestación de agentes"],"description":"La coordinación de uno o varios agentes para completar un trabajo: quién hace qué, en qué orden, con qué información y cómo se combinan los resultados.","technicalExplanation":"Orquestar es una decisión de diseño con opciones. Puede ser **secuencial** (pipeline), **paralela** o **jerárquica** (orquestador y trabajadores), y estar dirigida por **código** o por un **modelo**. La pieza que la ejecuta es el [[orchestrators|orquestador]]. Anthropic informa de que sus sistemas multiagente consumen unas 15 veces los tokens de un chat, por lo que la complejidad debe justificarse.","problem":"Cuando una tarea excede a un agente, hay que repartirla sin duplicar esfuerzos, dejar huecos ni crear conflictos entre resultados.","howItWorks":"Se define la topología, el contrato de cada agente (objetivo, formato de salida, herramientas, límites), el estado compartido y el tratamiento de fallos.","whenToUse":"Solo cuando un agente único no basta o el paralelismo aporta valor claro. Primero intenta mejorar el contexto y las herramientas.","advantages":["Abre la puerta a tareas grandes.","Permite especialización y paralelismo."],"limitations":["Coste multiplicado.","Depuración difícil.","Los fallos de coordinación son un tipo de error nuevo."],"example":{"text":"Investigación: un agente principal planifica, lanza subagentes para distintos aspectos en paralelo y compila la respuesta. Es la arquitectura que Anthropic describe en su sistema Research."},"relatedConcepts":[{"id":"orchestrators","note":"El componente que la ejecuta."},{"id":"multi-agent-systems","note":"El tipo de sistema resultante."},{"id":"workflows","note":"Orquestación por rutas predefinidas."},{"id":"parallel-agent-development","note":"Su aplicación al trabajo en un repositorio."}],"prerequisites":["ai-agents","subagents"],"tools":["langgraph","autogen","claude-agent-sdk"],"sources":[{"title":"Anthropic: How we built our multi-agent research system","url":"https://www.anthropic.com/engineering/multi-agent-research-system"},{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"multi-agent-systems","title":"Multi-agent Systems","category":"ai-agents","difficulty":"advanced","aliases":["sistemas multiagente","MAS"],"description":"Sistemas en los que varios agentes con funciones o contextos diferentes colaboran para resolver una tarea.","technicalExplanation":"El campo de los sistemas multiagente es anterior a los LLM. En el contexto actual, la idea se popularizó con trabajos como AutoGen (2023), en el que agentes colaboran mediante conversación. Hoy, la topología más común en herramientas de desarrollo es jerárquica: un agente principal y varios subagentes.\n\nSus ventajas no son gratuitas: Anthropic señala que estos sistemas funcionan bien en tareas que se pueden paralelizar, como investigar varios frentes, y solo compensan en tareas de alto valor por su coste.","problem":"Una sola ventana de contexto limita la cantidad de información que se puede procesar. Varios agentes pueden explorar en paralelo y aportar especialización.","howItWorks":"Cada agente mantiene su contexto. Se comunican directamente, por medio de un coordinador o a través de estado compartido, como archivos o Git. Un coordinador integra el resultado.","whenToUse":"Cuando las subtareas son independientes y el valor justifica el coste. Si las decisiones de un agente dependen de las de otro, por ejemplo al modificar el mismo módulo, suele ir mejor uno solo.","advantages":["Exploración paralela.","Aislamiento de contexto.","Roles especializados."],"limitations":["Unas 15 veces más tokens que un chat, según Anthropic.","Riesgo de trabajo duplicado o incoherente.","Difícil de evaluar y depurar."],"example":{"text":"Un equipo de agentes de código: uno implementa en una rama, otro escribe tests en otra y un tercero, de solo lectura, revisa. Una persona u orquestador integra el resultado."},"relatedConcepts":[{"id":"subagents","note":"Forma jerárquica más común."},{"id":"orchestrators","note":"Coordinan el sistema."},{"id":"agent-communication","note":"Cómo intercambian información."},{"id":"parallel-agent-development","note":"Su aplicación con Git."}],"prerequisites":["ai-agents","agent-orchestration"],"tools":["autogen","langgraph","claude-code"],"sources":[{"title":"AutoGen: Next-Gen LLM Applications via Multi-Agent Conversation","url":"https://arxiv.org/abs/2308.08155","note":"arXiv, agosto de 2023"},{"title":"Anthropic: How we built our multi-agent research system","url":"https://www.anthropic.com/engineering/multi-agent-research-system"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"autonomous-agents","title":"Autonomous Agents","category":"ai-agents","difficulty":"intermediate","aliases":["agentes autónomos","autonomía"],"description":"Agentes que trabajan durante periodos largos con poca o ninguna intervención humana, a menudo en segundo plano o en la nube.","technicalExplanation":"La autonomía es un parámetro, no una categoría binaria: depende de cuánto tiempo actúa el agente sin revisión y qué acciones puede tomar. Muchas herramientas ofrecen ejecución en segundo plano o en la nube, como Codex Cloud, Cursor Cloud Agents o Claude Code en la web, normalmente con el resultado entregado como rama o PR para revisar.","problem":"La supervisión continua limita el rendimiento: si una persona debe aprobar cada paso, no se puede delegar trabajo mientras se atiende otra cosa.","howItWorks":"Se lanza el agente con un objetivo claro en un entorno aislado. Trabaja, comprueba su resultado con tests y entrega algo revisable. La revisión se traslada del “cada paso” al “resultado final”.","whenToUse":"En tareas bien acotadas y con buena verificación automática. Evítalo si el daño posible es alto o si no hay forma automática de comprobar el resultado.","advantages":["Libera tiempo y permite paralelizar.","Se adapta a tareas programadas."],"limitations":["Los errores se detectan tarde.","Puede generar más código del que se puede revisar.","Requiere aislamiento y permisos cuidadosos."],"example":{"text":"Un agente programado cada noche revisa fallos de CI y abre un PR por cada corrección que supere los tests. Una persona los revisa por la mañana."},"relatedConcepts":[{"id":"permissions","note":"Cuanta más autonomía, más importa acotar."},{"id":"agent-evaluation","note":"Sin evaluación, no se sabe si se puede confiar en él."},{"id":"guardrails","note":"Hacen viable aumentar la autonomía."}],"prerequisites":["ai-agents","permissions"],"tools":["openai-codex","claude-code","cursor"],"sources":[{"title":"Claude Code: overview","url":"https://code.claude.com/docs/en/overview"},{"title":"OpenAI: Codex documentation","url":"https://learn.chatgpt.com/docs"},{"title":"Cursor: índice de documentación (llms.txt)","url":"https://cursor.com/llms.txt"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"planning-reasoning","title":"Planning and Reasoning","category":"ai-agents","difficulty":"intermediate","aliases":["planificación","razonamiento","plan mode","ReAct"],"description":"La capacidad de un agente para descomponer un objetivo en pasos y razonar antes de actuar, en lugar de ejecutar directamente.","technicalExplanation":"ReAct (2022) mostró que intercalar razonamiento y acción mejora la resolución de tareas e interpretabilidad. En herramientas de desarrollo, esto aparece como modos explícitos: Plan Mode en Cursor o Claude Code, y Plan/Act en Cline, donde en modo Plan el agente lee y discute pero no modifica archivos ni ejecuta comandos.","problem":"Un agente que actúa de inmediato puede resolver el problema equivocado. Separar plan y ejecución permite corregir el rumbo cuando es barato.","howItWorks":"El agente explora y propone un plan, una persona o el propio agente lo revisa, y se ejecuta paso a paso, ajustándolo a medida que aparecen resultados.","whenToUse":"En cambios multiarchivo o poco claros. Para una corrección de una línea, planificar es una sobrecarga.","advantages":["Detecta malentendidos pronto.","Reduce trabajo rehecho.","El plan puede servir como estado persistente."],"limitations":["Más tiempo y tokens al inicio.","Un plan puede quedarse obsoleto ante lo que se descubre."],"example":{"text":"En modo plan, el agente propone: “tocaré estos tres archivos; ¿migramos la tabla o usamos una columna nueva?”. Respondes antes de que se haya escrito una línea."},"relatedConcepts":[{"id":"spec-driven-development","note":"Lleva la planificación a un documento explícito."},{"id":"agent-lifecycle","note":"Fase previa a la ejecución."},{"id":"ai-development-workflows","note":"Planificar es un paso habitual del flujo."}],"prerequisites":["ai-agents"],"tools":["cline","cursor","claude-code"],"sources":[{"title":"ReAct: Synergizing Reasoning and Acting in Language Models","url":"https://arxiv.org/abs/2210.03629","note":"arXiv, octubre de 2022"},{"title":"Cline: Plan & Act","url":"https://docs.cline.bot/features/plan-and-act"},{"title":"Cursor: Documentation","url":"https://cursor.com/docs"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"tool-calling","title":"Tool Calling","category":"ai-agents","difficulty":"beginner","aliases":["function calling","llamada a funciones","tool use"],"description":"El mecanismo por el que un modelo solicita ejecutar una función: devuelve el nombre y los argumentos en formato estructurado, y es la aplicación quien la ejecuta.","technicalExplanation":"Es el punto clave que muchos pasan por alto: **el modelo no ejecuta nada**. Recibe definiciones de herramientas (nombre, descripción, esquema JSON), y en su respuesta puede incluir una petición estructurada. La aplicación valida, ejecuta y devuelve el resultado en un mensaje posterior, para que el modelo continúe. OpenAI lo llama *function calling* y Anthropic, *tool use*; el concepto es el mismo.","problem":"Sin un formato estructurado, habría que analizar texto libre para deducir qué quiere hacer el modelo, algo frágil. Con tool calling, la interacción entre modelo y código es explícita y validable.","howItWorks":"- La aplicación envía el mensaje con las herramientas disponibles.\n- El modelo responde con una petición de herramienta.\n- La aplicación la ejecuta y devuelve el resultado.\n- El modelo genera la respuesta final o pide otra herramienta.","whenToUse":"Siempre que un modelo deba obtener datos actuales o realizar acciones. Valida los argumentos: pueden ser incorrectos aunque cumplan el esquema.","advantages":["Salida estructurada y validable.","Separa decisión (modelo) y ejecución (tu código).","Permite aplicar permisos antes de actuar."],"limitations":["Cada definición consume tokens.","El modelo puede elegir mal la herramienta o inventar argumentos.","Los resultados de herramientas pueden traer inyecciones de prompt."],"example":{"language":"json","filename":"respuesta del modelo (simplificada)","code":"{\n  \"type\": \"tool_use\",\n  \"name\": \"get_weather\",\n  \"input\": { \"city\": \"Madrid\" }\n}","explanation":"Tu aplicación ejecuta `get_weather` y devuelve el resultado en el siguiente mensaje."},"relatedConcepts":[{"id":"tools-agent","note":"Lo que se invoca."},{"id":"mcp","note":"Estandariza cómo se ofrecen herramientas externas."},{"id":"ai-agents","note":"Un agente es, en esencia, tool calling en bucle."}],"prerequisites":[],"tools":["claude-agent-sdk"],"sources":[{"title":"Claude API: Tool use","url":"https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview"},{"title":"OpenAI API: Function calling","url":"https://platform.openai.com/docs/guides/function-calling"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"agent-communication","title":"Agent Communication","category":"ai-agents","difficulty":"advanced","aliases":["A2A","Agent2Agent","comunicación entre agentes"],"description":"Cómo intercambian información varios agentes: mediante resúmenes a un coordinador, estado compartido o protocolos como A2A.","technicalExplanation":"Hay varios mecanismos:\n\n- **Jerárquico:** el subagente devuelve un resultado al principal.\n- **Estado compartido:** archivos, ramas de Git, una lista de tareas.\n- **Protocolos abiertos:** A2A (Agent2Agent), desarrollado originalmente por Google y donado a la Linux Foundation, para que agentes de distintos marcos y proveedores se descubran y deleguen tareas entre sí.\n\nLa documentación de A2A los describe como complementarios: **MCP conecta un agente con herramientas y datos; A2A conecta agentes entre sí**.","problem":"Los agentes con contextos separados no comparten lo que saben. Sin un canal claro, repiten trabajo o toman decisiones incompatibles. Entre organizaciones, tampoco hay interoperabilidad sin un estándar.","howItWorks":"En un mismo repositorio, lo más simple suele ser que los agentes se comuniquen con artefactos: un archivo de plan, commits, o el resultado que recibe el coordinador. Entre sistemas independientes, un protocolo define descubrimiento y delegación.","whenToUse":"Prefiere el canal más simple que resuelva el caso. Un protocolo como A2A se justifica cuando los agentes son sistemas opacos e independientes, no subrutinas de tu propio agente.","advantages":["Los artefactos de archivo son auditables.","Los protocolos abiertos permiten interoperar."],"limitations":["Cada mensaje consume contexto.","Un malentendido se propaga.","Un mensaje de otro agente también puede traer contenido malicioso."],"example":{"text":"Un agente implementador deja `PLAN.md` actualizado con lo hecho y lo pendiente. El revisor, en otra sesión, lo lee junto con el diff, sin compartir conversación."},"relatedConcepts":[{"id":"mcp","note":"Protocolo complementario: agente a herramienta."},{"id":"multi-agent-systems","note":"Donde surge esta necesidad."},{"id":"subagents","note":"Comunicación jerárquica."}],"prerequisites":["multi-agent-systems"],"tools":[],"sources":[{"title":"A2A Protocol","url":"https://a2a-protocol.org/latest/"},{"title":"MCP Specification 2026-07-28: Architecture","url":"https://modelcontextprotocol.io/specification/2026-07-28/architecture"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"agent-evaluation","title":"Agent Evaluation","category":"ai-agents","alsoIn":["testing-quality"],"difficulty":"advanced","aliases":["evals","evaluación de agentes","testing and evaluation","graders"],"description":"Medir de forma sistemática si un agente cumple sus tareas: ejecutarlo sobre un conjunto de casos varias veces y puntuar los resultados.","technicalExplanation":"Probar un agente no es como probar una función: su salida varía entre ejecuciones y hay muchas rutas válidas hacia el mismo resultado. Anthropic propone este vocabulario en *Demystifying evals*:\n\n- **Task:** prueba con entradas y criterios de éxito.\n- **Trial:** un intento; se hacen varios porque el resultado varía.\n- **Grader:** lógica que puntúa un aspecto del rendimiento.\n- **Transcript:** registro completo de un intento.\n- **Outcome:** estado final del entorno, no lo que el agente dice que hizo.\n- **Evaluation harness:** infraestructura que ejecuta y agrega todo.\n\nHay tres tipos de graders: **por código** (rápido, objetivo, a veces frágil), **por modelo** (flexible, pero no determinista) y **humano** (la mejor referencia, pero lento y caro). Un consejo clave: **evalúa el resultado, no el camino**. Comprobar una secuencia exacta de herramientas es frágil, porque los agentes encuentran soluciones válidas no previstas.\n\nTambién se separan las **evals de capacidad**, que empiezan con baja tasa de acierto y marcan hasta dónde mejorar, de las **evals de regresión**, que deberían rondar el 100% y detectar retrocesos.","problem":"Sin evaluación, no se sabe si un cambio de prompt, modelo o herramienta ha mejorado algo o solo lo parece. Se decide por impresiones basadas en un par de casos, y las regresiones se descubren en producción.","howItWorks":"- **Reúne tareas** a partir de fallos reales. Anthropic sugiere empezar con entre 20 y 50.\n- **Define el éxito** de forma que dos expertos lleguen a la misma conclusión.\n- **Aísla el entorno** de cada intento.\n- **Ejecuta varios intentos** y agrega los resultados.\n- **Lee transcripciones:** los números no explican por qué falla.\n- **Promueve** las tareas superadas al conjunto de regresión y ejecútalo en CI.","whenToUse":"En cuanto un agente vaya a usarse de forma continuada o quieras cambiar de modelo o configuración con confianza. No esperes a tener un conjunto perfecto: unos pocos casos reales ya dan información.","advantages":["Convierte las impresiones en datos.","Detecta regresiones antes que los usuarios.","Permite adoptar modelos nuevos con rapidez.","Las transcripciones ayudan a depurar."],"limitations":["Construir y mantener evals cuesta tiempo.","Ejecutarlas consume tokens y tiempo.","Con pocos casos, las diferencias pueden ser ruido.","Un agente puede optimizarse para pasar la eval sin mejorar de verdad."],"example":{"text":"Grader por código para “arregla este bug”: no pregunta al agente si lo arregló, sino que comprueba el *outcome*.","language":"bash","filename":"grade.sh","code":"#!/usr/bin/env bash\n# Éxito: la prueba del bug pasa y no se rompe ninguna otra.\nnpm test -- tests/regression/issue-142.test.js || exit 1\nnpm test || exit 1\necho \"PASS\"","explanation":"Es determinista y barato. Se complementa con un grader por modelo para aspectos subjetivos, como la calidad del código."},"relatedConcepts":[{"id":"ai-generated-code-testing","note":"Verifica el código generado; las evals, al agente que lo genera."},{"id":"regression-testing","note":"Las evals de regresión aplican esta idea a agentes."},{"id":"agentic-harness","note":"Permiten medir si una mejora del harness funciona."},{"id":"ci-cd","note":"El conjunto de regresión puede ejecutarse en CI."}],"prerequisites":["ai-agents","unit-testing"],"tools":["claude-code"],"sources":[{"title":"Anthropic: Demystifying evals for AI agents","url":"https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"agents-md","title":"AGENTS.md","category":"agent-components","difficulty":"beginner","aliases":["agents file","instrucciones de agente"],"description":"Un archivo Markdown en el repositorio con las instrucciones que un agente de código necesita para trabajar en él: comandos, convenciones y reglas de contribución. Se suele describir como “un README para agentes”.","technicalExplanation":"AGENTS.md es un formato abierto y deliberadamente simple: Markdown estándar, sin campos obligatorios ni esquema. El agente lo lee como contexto al trabajar en el proyecto. Su valor no está en la sintaxis, sino en la convención: un único nombre de archivo que muchas herramientas buscan, en vez de un archivo propietario por producto.\n\nEl sitio oficial lista entre las herramientas compatibles a OpenAI Codex, Google Jules, Aider, goose, opencode, Zed, Warp, VS Code, Devin, JetBrains Junie, Cursor, RooCode, Gemini CLI, Windsurf y el coding agent de GitHub Copilot. El formato lo custodia la Agentic AI Foundation, bajo la Linux Foundation, a la que OpenAI aportó el proyecto en diciembre de 2025.\n\nConviene recordar que estas instrucciones son **contexto, no configuración que se haga cumplir**. El modelo tiende a seguirlas, pero nada lo garantiza. Para obligar de verdad se necesitan [[hooks]], [[permissions|permisos]] o comprobaciones en CI.","problem":"Un agente que entra en un repositorio desconocido no sabe cómo se instala, cómo se ejecutan los tests ni qué convenciones hay. Sin un lugar acordado, hay que repetirlo en cada sesión, o bien mezclarlo en un README pensado para personas. Y si cada herramienta exige su propio archivo, el equipo acaba manteniendo varias copias que se desincronizan.","howItWorks":"- Colocas un `AGENTS.md` en la raíz del repositorio con instrucciones breves y verificables.\n- En un monorepo puedes añadir otro por subproyecto. Según el sitio oficial, el agente lee el más cercano en el árbol de directorios y ese tiene prioridad.\n- Las instrucciones explícitas del usuario en el chat prevalecen sobre las del archivo.\n- Si una herramienta usa otro archivo, suele poder importarlo. Claude Code, por ejemplo, lee `AGENTS.md` si no hay `CLAUDE.md`, y si existen ambos solo lee `CLAUDE.md`, salvo que este lo importe o se cambie el ajuste.","whenToUse":"En casi cualquier repositorio donde se usen agentes, y sobre todo si el equipo usa más de una herramienta. Incluye lo que el agente no puede deducir leyendo el código: comandos exactos, restricciones, decisiones no evidentes. Mueve los procedimientos largos a [[skills]] para no cargar contexto en cada sesión.","advantages":["Funciona con muchas herramientas sin duplicar instrucciones.","No requiere dependencias ni esquema: es Markdown versionado con el código.","Evita repetir las mismas correcciones en cada sesión.","Admite instrucciones por subproyecto en monorepos."],"limitations":["No se hace cumplir: el agente puede ignorar o malinterpretar una instrucción.","Todo su contenido consume contexto, así que un archivo largo perjudica en vez de ayudar.","Se queda obsoleto si no se revisa cuando cambian los comandos o la arquitectura.","El grado de soporte (anidado, importaciones) varía según la herramienta."],"example":{"text":"Un AGENTS.md útil es corto y concreto. Cada línea debería evitar un error real.","language":"markdown","filename":"AGENTS.md","code":"# Instrucciones para agentes\n\n## Comandos\n- Instalar: `pnpm install`\n- Tests: `pnpm test` (ejecútalos antes de cada commit)\n- Lint: `pnpm lint --fix`\n\n## Convenciones\n- TypeScript estricto; no uses `any`.\n- La lógica de negocio va en `src/domain`, sin importar nada de `src/http`.\n\n## Pull requests\n- Título con el formato `[area] descripción`.\n- No modifiques `migrations/` sin indicarlo en la descripción.","explanation":"Fíjate en lo que no aparece: ni descripción del producto ni reglas que el linter ya impone. Lo que una herramienta puede comprobar no necesita gastar contexto."},"relatedConcepts":[{"id":"claude-md","note":"Cumple la misma función en Claude Code; se pueden combinar importando uno desde otro."},{"id":"skills","note":"AGENTS.md se carga siempre; una skill solo cuando hace falta. Los procedimientos largos encajan mejor en skills."},{"id":"rules","note":"Las rules permiten instrucciones segmentadas por ruta o tipo de archivo; AGENTS.md segmenta por directorio."},{"id":"hooks","note":"Complemento necesario: lo que no pueda quedar a criterio del modelo debe imponerse con un hook."},{"id":"context-engineering","note":"Es una de las piezas básicas de la información que recibe un agente."}],"prerequisites":["ai-agents"],"tools":["claude-code","openai-codex","cursor","gemini-cli","aider","github-copilot"],"sources":[{"title":"AGENTS.md","url":"https://agents.md/","note":"Sitio oficial del formato"},{"title":"Claude Code: How Claude remembers your project","url":"https://code.claude.com/docs/en/memory"},{"title":"Linux Foundation: formation of the Agentic AI Foundation","url":"https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation","note":"9 de diciembre de 2025"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"claude-md","title":"CLAUDE.md","category":"agent-components","difficulty":"beginner","aliases":["memoria de proyecto claude"],"description":"El archivo de instrucciones persistentes de Claude Code: se lee al inicio de cada sesión y recoge comandos, convenciones y decisiones de arquitectura.","technicalExplanation":"Claude Code empieza cada sesión con una ventana de contexto vacía. `CLAUDE.md` es lo que escribes tú para que no tenga que redescubrir el proyecto. Puede estar en `./CLAUDE.md` o `./.claude/CLAUDE.md` (compartido por el equipo), y `./CLAUDE.local.md` guarda preferencias personales que no se versionan. También hay niveles de usuario y de organización.\n\nLos archivos de los directorios superiores se cargan al arrancar; los de subdirectorios, bajo demanda al trabajar allí. La documentación es explícita: se tratan como contexto, no como configuración impuesta. Para bloquear una acción en cualquier caso hay que usar un hook `PreToolUse`.","problem":"Evita repetir en cada sesión las mismas aclaraciones: cómo compilar, qué estilo seguir, qué no tocar. La documentación propone añadir algo cuando el agente comete un mismo error por segunda vez o cuando una revisión detecta algo que debería haber sabido.","howItWorks":"Se escribe a mano y se versiona. Puede importar otros archivos con la sintaxis `@ruta`, lo que permite compartir un `AGENTS.md` existente. Para comprobar qué se ha cargado, la documentación recomienda `/context`. Lo que solo afecta a una parte del código encaja mejor en una regla de `.claude/rules/`, y los procedimientos de varios pasos en una skill.","whenToUse":"Siempre que uses Claude Code en un proyecto mantenido. Si el repositorio ya tiene `AGENTS.md`, no hace falta duplicarlo: Claude Code lo lee si no hay `CLAUDE.md`, o puedes importarlo desde uno.","advantages":["Se aplica a todas las superficies de Claude Code: terminal, IDE, escritorio y web.","Jerarquía de niveles: organización, usuario, proyecto y local.","Se revisa como cualquier cambio de código."],"limitations":["Específico de Claude Code; para varias herramientas conviene AGENTS.md.","No garantiza el cumplimiento.","Cuanto más largo, más contexto consume y peor se sigue."],"example":{"language":"markdown","filename":"CLAUDE.md","code":"@AGENTS.md\n\n## Solo para Claude Code\n- Usa plan mode antes de cambios que afecten a más de tres archivos.","explanation":"La primera línea importa el archivo compartido, de modo que el equipo mantiene una sola fuente de instrucciones."},"relatedConcepts":[{"id":"agents-md","note":"Equivalente abierto y multiherramienta."},{"id":"persistent-memory","note":"CLAUDE.md lo escribes tú; la auto memory la escribe el agente."},{"id":"rules","note":"Permite dividir instrucciones por tipo de archivo en `.claude/rules/`."},{"id":"hooks","note":"Lo que deba cumplirse siempre no va aquí, sino en un hook."}],"prerequisites":["agents-md"],"tools":["claude-code"],"sources":[{"title":"Claude Code: How Claude remembers your project","url":"https://code.claude.com/docs/en/memory"},{"title":"Claude Code: overview","url":"https://code.claude.com/docs/en/overview"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"rules","title":"Rules","category":"agent-components","difficulty":"beginner","aliases":["reglas",".cursor/rules",".claude/rules"],"description":"Instrucciones persistentes y acotadas: se aplican solo a ciertas rutas, tipos de archivo o situaciones en lugar de cargarse siempre.","technicalExplanation":"“Rules” no es un estándar, sino un nombre común para un mecanismo que cada herramienta implementa a su manera. En Claude Code son archivos en `.claude/rules/` que pueden limitarse a tipos de archivo o subdirectorios. Cursor y Devin Desktop también documentan reglas propias. La idea compartida es la granularidad: la regla de migraciones solo ocupa contexto cuando se tocan migraciones.","problem":"Un archivo global de instrucciones crece hasta ser ruidoso. Las reglas acotadas mantienen la instrucción cerca de donde aplica sin penalizar el resto de las tareas.","howItWorks":"Se definen archivos con el texto de la regla y, según la herramienta, metadatos que indican cuándo aplica. El agente las recibe como contexto cuando se cumple la condición. Como el resto de instrucciones, orientan al modelo pero no lo obligan.","whenToUse":"Cuando una convención solo afecta a una parte del repositorio, como tests, migraciones o un paquete concreto. Si afecta a todo el proyecto, va en el archivo principal; si es un procedimiento, en una skill.","advantages":["Reducen el contexto cargado en cada tarea.","Colocan las convenciones junto al área que afectan."],"limitations":["El formato no es portable entre herramientas.","Con muchas reglas es difícil saber cuáles están activas.","No sustituyen a una comprobación automática."],"example":{"text":"Una regla “los tests de integración usan la base de datos real, no mocks”, limitada a `tests/integration/**`, solo se carga al trabajar en esa carpeta."},"relatedConcepts":[{"id":"agents-md","note":"Instrucciones globales o por directorio; las rules afinan más."},{"id":"skills","note":"Una regla dice cómo comportarse; una skill enseña a hacer una tarea."},{"id":"guardrails","note":"Una regla es una petición; un guardrail se comprueba."}],"prerequisites":["agents-md"],"tools":["claude-code","cursor","windsurf"],"sources":[{"title":"Claude Code: How Claude remembers your project","url":"https://code.claude.com/docs/en/memory"},{"title":"Cursor: índice de documentación (llms.txt)","url":"https://cursor.com/llms.txt"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"skills","title":"Skills","category":"agent-components","difficulty":"intermediate","aliases":["agent skills","SKILL.md","habilidades"],"description":"Paquetes de instrucciones, y opcionalmente scripts y referencias, que un agente carga solo cuando la tarea los necesita. Convierten un procedimiento repetible en algo reutilizable.","technicalExplanation":"Una skill es un directorio con un archivo `SKILL.md`: frontmatter YAML seguido de instrucciones en Markdown. El detalle importante es la **divulgación progresiva**, que en Claude Code funciona en tres etapas:\n\n- **Inicio:** el agente solo ve el nombre y la descripción de cada skill, que ocupan poco.\n- **Invocación:** cuando escribes `/nombre` o el modelo decide que es relevante, el `SKILL.md` completo entra en la conversación.\n- **Bajo demanda:** los archivos de apoyo solo se leen si el `SKILL.md` los menciona, y los scripts se ejecutan sin cargarse.\n\nPor eso la `description` es el campo decisivo: de ella depende que el modelo active la skill en el momento adecuado. El concepto no es exclusivo de un producto: la documentación de Gemini CLI, Cursor y Codex también describe skills, aunque no debe darse por hecho que los campos sean idénticos.","problem":"Los procedimientos largos, como desplegar, revisar un PR o migrar una API, no caben en un archivo de instrucciones que se carga siempre: gastarían contexto en cada sesión aunque no se usaran. Tampoco es razonable pegarlos a mano cada vez. Las skills los hacen disponibles sin coste hasta que se necesitan.","howItWorks":"En Claude Code, las skills viven en `.claude/skills/<nombre>/SKILL.md` (proyecto) o `~/.claude/skills/<nombre>/SKILL.md` (personal). Algunos campos relevantes:\n\n- `description`: qué hace y cuándo usarla.\n- `disable-model-invocation: true`: solo tú puedes lanzarla; recomendable si tiene efectos secundarios, como desplegar.\n- `allowed-tools`: herramientas permitidas sin preguntar durante ese turno.\n- `context: fork`: la ejecuta en un subagente.\n- `paths`: limita la activación automática a ciertos archivos.\n\nLa documentación recomienda mantener `SKILL.md` por debajo de 500 líneas y mover el detalle a archivos aparte.","whenToUse":"Cuando repites un procedimiento de varios pasos, cuando hay material de referencia que solo importa a veces o cuando quieres que todo el equipo ejecute una tarea igual. Si solo es un hecho que debe saberse siempre, va en [[agents-md]]. Si la tarea genera mucha salida que no quieres en la conversación principal, valora un [[subagents|subagente]].","advantages":["Coste de contexto casi nulo hasta que se usan.","Se versionan y comparten con el repositorio.","Pueden incluir scripts deterministas para los pasos que no deben quedar al criterio del modelo.","Se pueden invocar a mano, automáticamente o ambas cosas."],"limitations":["La activación automática depende de una buena descripción y puede fallar.","Una vez cargada, sigue ocupando contexto en los turnos siguientes.","El contenido de una skill de terceros es texto y código con poder sobre tu agente: revísalo como cualquier dependencia.","Fuera de Claude Code solo un subconjunto de campos es portable."],"example":{"text":"Ejemplo adaptado de la documentación de Claude Code: resume los cambios sin commitear. La línea con `!` ejecuta el comando antes de que el modelo vea la skill.","language":"markdown","filename":".claude/skills/summarize-changes/SKILL.md","code":"---\ndescription: Summarizes uncommitted changes and flags anything risky. Use when the user asks what changed, wants a commit message, or asks to review their diff.\n---\n\n## Current changes\n\n!`git diff HEAD`\n\n## Instructions\n\nSummarize the changes above in two or three bullet points, then list any risks\nyou notice, such as missing error handling, hardcoded values, or tests that need\nupdating. If the diff is empty, say there are no uncommitted changes."},"relatedConcepts":[{"id":"agents-md","note":"Lo que se necesita siempre va ahí; lo que se necesita a veces, en una skill."},{"id":"subagents","note":"Una skill añade instrucciones al contexto actual; un subagente trabaja en un contexto aparte. Se combinan con `context: fork`."},{"id":"context-engineering","note":"La divulgación progresiva es una técnica de context engineering."},{"id":"hooks","note":"Una skill puede registrar hooks mientras está activa."},{"id":"workflows","note":"Muchos workflows repetibles se empaquetan como skills."}],"prerequisites":["agents-md","context-management"],"tools":["claude-code","gemini-cli","cursor","openai-codex"],"sources":[{"title":"Claude Code: Skills","url":"https://code.claude.com/docs/en/skills"},{"title":"Gemini CLI: Documentation","url":"https://geminicli.com/docs/"},{"title":"Cursor: índice de documentación (llms.txt)","url":"https://cursor.com/llms.txt"},{"title":"OpenAI: Codex documentation","url":"https://learn.chatgpt.com/docs"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"subagents","title":"Subagents","category":"agent-components","difficulty":"intermediate","aliases":["subagentes","sub-agents","agentes especializados"],"description":"Agentes auxiliares a los que un agente principal delega una tarea. Trabajan en su propio contexto, con sus propias herramientas, y devuelven solo un resultado resumido.","technicalExplanation":"Un subagente es una instancia separada con ventana de contexto propia, instrucciones propias y un conjunto de herramientas que puede estar restringido. Su razón de ser principal es el **aislamiento de contexto**: explorar 200 archivos puede consumir miles de tokens, pero al agente principal solo le llega la conclusión. Anthropic describe estas arquitecturas como subagentes que trabajan en ventanas limpias y devuelven un resumen condensado, a menudo de 1.000 a 2.000 tokens.\n\nEn Claude Code se definen como Markdown con frontmatter en `.claude/agents/` (proyecto) o `~/.claude/agents/` (usuario). Solo `name` y `description` son obligatorios; otros campos fijan `tools`, `model`, `permissionMode`, `skills`, `mcpServers`, `hooks`, `memory` e `isolation`. Con `isolation: worktree`, el subagente trabaja en un [[git-worktrees|worktree]] temporal. Gemini CLI los documenta como experimentales, y Codex y Cursor también tienen documentación propia sobre ellos.","problem":"Una sola conversación larga se llena de resultados intermedios y pierde calidad. Además, no todas las subtareas requieren los mismos permisos o el mismo modelo: un revisor no necesita poder escribir, y una búsqueda puede hacerla un modelo más barato.","howItWorks":"- El agente principal decide delegar, leyendo la `description` de cada subagente, o lo pides tú explícitamente.\n- El subagente recibe un encargo y arranca sin el historial de la conversación principal.\n- Ejecuta su propio bucle de herramientas y devuelve un mensaje final.\n- Los resultados intermedios no entran en el contexto del agente principal.\n\nEl agente principal solo ve lo que le devuelven, de modo que un encargo vago o un resumen pobre son fallos habituales. Delegar no garantiza que el trabajo sea correcto: conviene comprobar el resultado.","whenToUse":"Para tareas que generan mucha salida (exploración, ejecución de tests, análisis de logs), para restringir permisos (un revisor de solo lectura) y para trabajo paralelo independiente. No compensan en tareas pequeñas: cada subagente arranca sin contexto y debe redescubrir lo que necesita.","advantages":["Mantienen limpio el contexto del agente principal.","Permiten aplicar mínimo privilegio por tarea.","Pueden usar un modelo distinto según el coste de la tarea.","Pueden ejecutarse en paralelo, con worktrees si escriben archivos."],"limitations":["Arrancan sin contexto y hay que darles un encargo completo.","Más agentes implica más consumo total de tokens.","Si varios escriben en los mismos archivos sin aislamiento, entran en conflicto.","El resumen puede ocultar errores o supuestos del subagente."],"example":{"text":"Revisor de solo lectura basado en el ejemplo oficial. Sin `Edit` ni `Write`, no puede modificar archivos, salvo que actives `memory`, que le concede esas herramientas.","language":"markdown","filename":".claude/agents/code-reviewer.md","code":"---\nname: code-reviewer\ndescription: Reviews code for quality, security, and best practices. Use proactively after code changes.\ntools: Read, Grep, Glob\nmodel: sonnet\n---\n\nYou are a senior code reviewer. When invoked, analyze the changed code and\ngive specific, actionable feedback on quality, security, and best practices."},"relatedConcepts":[{"id":"ai-agents","note":"Un subagente es un agente; lo que lo define es su posición subordinada."},{"id":"skills","note":"Se complementan: una skill aporta conocimiento y un subagente aporta aislamiento."},{"id":"orchestrators","note":"El agente principal actúa como orquestador de sus subagentes."},{"id":"multi-agent-systems","note":"Es la forma jerárquica más común de sistema multiagente."},{"id":"git-worktrees","note":"Permiten que varios subagentes escriban sin pisarse."},{"id":"context-engineering","note":"Aislar subtareas es una técnica central para gestionar el contexto."}],"prerequisites":["ai-agents","context-management"],"tools":["claude-code","gemini-cli","openai-codex","cursor"],"sources":[{"title":"Claude Code: Subagents","url":"https://code.claude.com/docs/en/sub-agents"},{"title":"Anthropic: Effective context engineering for AI agents","url":"https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents","note":"29 de septiembre de 2025"},{"title":"Gemini CLI: Documentation","url":"https://geminicli.com/docs/"},{"title":"OpenAI: Codex documentation","url":"https://learn.chatgpt.com/docs"},{"title":"Cursor: índice de documentación (llms.txt)","url":"https://cursor.com/llms.txt"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"persistent-memory","title":"Persistent Memory","category":"agent-components","difficulty":"intermediate","aliases":["memoria persistente","auto memory","MEMORY.md","memoria de agente"],"description":"La información que un agente conserva entre sesiones y fuera de su ventana de contexto: preferencias, decisiones y aprendizajes que de otro modo se perderían.","technicalExplanation":"Un modelo no recuerda nada entre llamadas: lo que parece memoria es información que se vuelve a inyectar en el contexto. La memoria persistente es, por tanto, un **almacén externo más una política de qué se guarda y cuándo se recupera**.\n\nConviene distinguir tres cosas que suelen mezclarse:\n\n- **Instrucciones** ([[agents-md]], [[claude-md]]): las escribe una persona y describen cómo trabajar.\n- **Memoria escrita por el agente:** notas que el agente crea a partir de correcciones y hallazgos.\n- **Recuperación de conocimiento (RAG):** búsqueda en un corpus externo; no cambia con la experiencia del agente salvo que se reindexe.\n\nClaude Code implementa la segunda como *auto memory*: notas por repositorio, compartidas entre worktrees, de las que se cargan al inicio las primeras 200 líneas o 25 KB. Los subagentes también pueden tener memoria propia con el campo `memory`, con ámbito `user`, `project` o `local`. Anthropic describe además la técnica general de “structured note-taking”: el agente escribe notas fuera de la ventana de contexto y las lee más tarde.","problem":"Cada sesión empieza de cero, así que el agente repite errores y hay que volver a darle las mismas explicaciones. En tareas largas, además, el trabajo supera la ventana de contexto y hay que conservar el estado para poder continuar.","howItWorks":"- **Escritura:** el agente, o una persona, guarda un hecho en un almacén, a menudo archivos Markdown.\n- **Indexado:** un archivo índice breve apunta a notas más detalladas.\n- **Recuperación:** el índice se carga al inicio y el detalle se lee bajo demanda.\n- **Mantenimiento:** hay que corregir o borrar lo que quedó obsoleto, porque una nota incorrecta se seguirá reinyectando.\n\nUsar archivos tiene una ventaja práctica: se pueden leer, editar y borrar, lo que facilita auditar qué “sabe” el agente.","whenToUse":"Cuando trabajas repetidamente en el mismo proyecto y hay aprendizajes que no están en el código ni merecen estar en las instrucciones. No guardes lo que puede deducirse del repositorio ni datos sensibles. Lo que deba cumplirse siempre debe ir en una instrucción o en un hook, no en una nota.","advantages":["Reduce correcciones repetidas entre sesiones.","Permite continuar tareas largas tras agotar la ventana de contexto.","Si se basa en archivos, es auditable y editable."],"limitations":["Las notas envejecen: una memoria falsa es peor que ninguna.","Consume contexto en cada sesión.","Puede almacenar datos sensibles si no se controla.","Un contenido malicioso guardado como memoria sigue influyendo en sesiones futuras."],"example":{"text":"Un subagente con memoria de proyecto. Las notas se guardan en `.claude/agent-memory/<nombre>/` y se pueden versionar.","language":"markdown","filename":".claude/agents/code-reviewer.md","code":"---\nname: code-reviewer\ndescription: Reviews code for quality and project conventions.\ntools: Read, Grep, Glob\nmemory: project\n---\n\nReview the changed code. Update your agent memory with recurring issues\nand project conventions you discover, and consult it before each review."},"relatedConcepts":[{"id":"claude-md","note":"Instrucciones escritas por personas frente a notas escritas por el agente."},{"id":"context-management","note":"La memoria reintroduce información en el contexto y compite por su espacio."},{"id":"context-compaction","note":"La compactación resume la sesión actual; la memoria sobrevive entre sesiones."},{"id":"subagents","note":"Pueden tener su propia memoria."},{"id":"guardrails","note":"Lo que se escribe en memoria debería validarse como cualquier otra entrada."}],"prerequisites":["context-management","claude-md"],"tools":["claude-code","windsurf"],"sources":[{"title":"Claude Code: How Claude remembers your project","url":"https://code.claude.com/docs/en/memory"},{"title":"Claude Code: Subagents","url":"https://code.claude.com/docs/en/sub-agents"},{"title":"Anthropic: Effective context engineering for AI agents","url":"https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents","note":"29 de septiembre de 2025"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"context-management","title":"Context Management","category":"agent-components","difficulty":"intermediate","aliases":["gestión de contexto","ventana de contexto","context window"],"description":"Las prácticas y mecanismos para decidir qué ocupa la ventana de contexto de un agente en cada momento, un recurso limitado que se degrada al llenarse.","technicalExplanation":"La ventana de contexto contiene todo lo que el modelo ve en una llamada: instrucciones, historial, resultados de herramientas y archivos leídos. Es finita, y Anthropic la describe como un recurso con rendimientos decrecientes: más tokens no significan mejor resultado si desplazan la atención de lo relevante.\n\nLa gestión de contexto es la parte operativa de [[context-engineering]]. Sus palancas son cargar menos al inicio, recuperar información justo cuando hace falta, resumir lo antiguo y delegar lo voluminoso.","problem":"Sin gestión, un agente lee archivos enteros, acumula salidas largas de comandos y llega al límite. Antes de eso, las instrucciones iniciales pierden peso frente a tanto material intermedio.","howItWorks":"- **Just-in-time:** el agente guarda referencias ligeras, como rutas o consultas, y carga el contenido con herramientas cuando lo necesita.\n- **Compactación:** resume la conversación cerca del límite.\n- **Limpieza:** elimina resultados antiguos de herramientas.\n- **Delegación:** los subagentes procesan lo voluminoso y devuelven un resumen.\n- **Notas externas:** el estado se guarda fuera de la ventana.","whenToUse":"Siempre, pero importa sobre todo en sesiones largas, repositorios grandes y agentes con muchas herramientas: las definiciones de herramientas también ocupan contexto.","advantages":["Mejora la calidad en tareas largas.","Reduce coste y latencia.","Hace viables tareas que superan una sola ventana."],"limitations":["Resumir pierde información.","Recuperar bajo demanda requiere más llamadas.","Exige criterio: cargar de menos también produce errores."],"example":{"text":"En vez de pedir “lee el proyecto y arregla el bug”, un subagente localiza los archivos implicados y devuelve tres rutas con una explicación. El agente principal solo lee esas tres."},"relatedConcepts":[{"id":"context-engineering","note":"Disciplina general de la que esta es la parte operativa."},{"id":"context-compaction","note":"Una de sus técnicas."},{"id":"subagents","note":"Aíslan la salida voluminosa."},{"id":"persistent-memory","note":"Guarda estado fuera de la ventana."},{"id":"mcp","note":"Cada servidor añade definiciones de herramientas que también ocupan contexto."}],"prerequisites":["ai-agents"],"tools":["claude-code"],"sources":[{"title":"Anthropic: Effective context engineering for AI agents","url":"https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents","note":"29 de septiembre de 2025"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"context-compaction","title":"Context Compaction","category":"agent-components","difficulty":"intermediate","aliases":["compactación","compaction","/compact"],"description":"Resumir una conversación cuando se acerca al límite de contexto, para seguir trabajando en una ventana nueva con ese resumen.","technicalExplanation":"Cuando la conversación se acerca al límite de la ventana, el agente sintetiza lo importante y continúa con ese resumen. Anthropic señala que la dificultad está en elegir qué conservar: suele priorizar decisiones de arquitectura, problemas abiertos y detalles de implementación, y descartar salidas de herramientas ya procesadas. Borrar resultados antiguos de herramientas es una forma ligera de compactación.\n\nClaude Code ofrece además eventos de hook `PreCompact` y `PostCompact`, y vuelve a adjuntar tras compactar la invocación más reciente de cada skill, con un presupuesto limitado.","problem":"Las tareas largas superan una ventana de contexto. Sin compactación, el agente se detiene o pierde el hilo.","howItWorks":"Se dispara automáticamente cerca del límite o a mano, según la herramienta. El historial se sustituye por un resumen y la sesión sigue. Lo que no entra en el resumen se pierde, salvo que esté en archivos o en memoria persistente.","whenToUse":"En sesiones largas. Para tareas nuevas y no relacionadas suele ser mejor empezar una sesión limpia que compactar.","advantages":["Permite continuar sin reiniciar.","Elimina ruido acumulado."],"limitations":["Es una pérdida irreversible dentro de la sesión: pueden desaparecer matices importantes.","Instrucciones dadas solo en el chat pueden no sobrevivir; lo importante debe estar en archivos."],"example":{"text":"Antes de una compactación, pide al agente que guarde el plan y las decisiones en un archivo del repositorio. Así, lo crítico no depende de la calidad del resumen."},"relatedConcepts":[{"id":"context-management","note":"Es una de sus técnicas."},{"id":"persistent-memory","note":"La memoria sobrevive entre sesiones; el resumen, solo dentro de la sesión."},{"id":"hooks","note":"En Claude Code se puede reaccionar con PreCompact y PostCompact."}],"prerequisites":["context-management"],"tools":["claude-code"],"sources":[{"title":"Anthropic: Effective context engineering for AI agents","url":"https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents","note":"29 de septiembre de 2025"},{"title":"Claude Code: Hooks reference","url":"https://code.claude.com/docs/en/hooks"},{"title":"Claude Code: Skills","url":"https://code.claude.com/docs/en/skills"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"hooks","title":"Hooks","category":"agent-components","difficulty":"intermediate","aliases":["ganchos","PreToolUse","PostToolUse","lifecycle hooks"],"description":"Comandos que se ejecutan automáticamente en puntos concretos del ciclo de vida de un agente. A diferencia de una instrucción, un hook siempre se ejecuta: no depende de que el modelo decida hacerlo.","technicalExplanation":"Los hooks llevan al agente una idea conocida de los *git hooks*: código determinista enganchado a eventos. Es la diferencia entre **pedir** y **garantizar**: “ejecuta el formateador después de editar” en un archivo de instrucciones es una petición; como hook `PostToolUse`, sucede siempre.\n\nEn Claude Code se configuran en `settings.json`, agrupados por evento, *matcher* y manejador. Entre sus eventos están `SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PermissionRequest`, `PostToolUse`, `Stop`, `SubagentStart`, `SubagentStop`, `PreCompact`, `WorktreeCreate` y `SessionEnd`.\n\nEl hook recibe JSON por stdin con campos como `session_id`, `cwd` y `hook_event_name`, además de `tool_name` y `tool_input` en los eventos de herramienta. Su código de salida importa: 0 es éxito, y 2 es un error bloqueante cuyo efecto depende del evento. En `PreToolUse` bloquea la llamada y el modelo recibe stderr como motivo; en `PostToolUse` no bloquea nada, porque la herramienta ya se ejecutó. Otros códigos, **incluido el 1**, son errores no bloqueantes y la acción continúa, un detalle que causa muchos falsos sentidos de seguridad.\n\nOtras herramientas también tienen hooks, como Gemini CLI y Cursor, con formatos propios. No asumas que un hook es portable.","problem":"Las instrucciones son probabilísticas: en una sesión larga, el agente puede olvidar formatear, ejecutar los tests o evitar un archivo. Para lo que debe ocurrir siempre hace falta un mecanismo que no pase por el juicio del modelo.","howItWorks":"- Ocurre el evento, por ejemplo: el agente va a ejecutar `Bash`.\n- La herramienta comprueba qué hooks coinciden con el evento y el `matcher`.\n- Ejecuta el manejador y le pasa el contexto en JSON.\n- Interpreta el resultado: permitir, bloquear o añadir información para el modelo.\n\nLos hooks se ejecutan con tus permisos de usuario, así que conviene tratarlos como código de producción: revisarlos, validar la entrada y no introducir en scripts valores sin comillas.","whenToUse":"Para reglas que no admiten excepciones: formatear tras editar, bloquear comandos peligrosos, proteger archivos, registrar acciones para auditoría o impedir que el agente termine sin que pasen los tests. Si una regla necesita juicio, como “revisa que el nombre sea claro”, una instrucción o un revisor encajan mejor.","advantages":["Determinismo: se ejecutan siempre.","No consumen contexto salvo lo que devuelvan al modelo.","Sirven como guardrails, automatización y auditoría.","Se versionan con el proyecto."],"limitations":["Se ejecutan con tus permisos: un hook malicioso o defectuoso tiene riesgo real.","Un hook lento frena cada acción.","Las comprobaciones por texto de comandos se pueden eludir: no son una frontera de seguridad completa.","Formato no portable entre herramientas."],"example":{"text":"Bloquea comandos `rm` con exit 2. El `if` usa la sintaxis de reglas de permisos para filtrar antes de lanzar el script.","language":"json","filename":".claude/settings.json","code":"{\n  \"hooks\": {\n    \"PreToolUse\": [\n      {\n        \"matcher\": \"Bash\",\n        \"hooks\": [\n          {\n            \"type\": \"command\",\n            \"if\": \"Bash(rm *)\",\n            \"command\": \"${CLAUDE_PROJECT_DIR}/.claude/hooks/block-rm.sh\"\n          }\n        ]\n      }\n    ]\n  }\n}"},"relatedConcepts":[{"id":"guardrails","note":"Un hook es una forma concreta de implementar un guardrail."},{"id":"permissions","note":"Los permisos deciden qué se permite; los hooks añaden lógica propia."},{"id":"agents-md","note":"Instrucciones orientan; hooks imponen."},{"id":"agentic-harness","note":"Son los sensores y controles deterministas del harness."},{"id":"git-fundamentals","note":"Los git hooks son el antecedente de la idea."}],"prerequisites":["tools-agent","permissions"],"tools":["claude-code","gemini-cli","cursor"],"sources":[{"title":"Claude Code: Hooks reference","url":"https://code.claude.com/docs/en/hooks"},{"title":"Claude Code: How Claude remembers your project","url":"https://code.claude.com/docs/en/memory"},{"title":"Gemini CLI: Documentation","url":"https://geminicli.com/docs/"},{"title":"Cursor: índice de documentación (llms.txt)","url":"https://cursor.com/llms.txt"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"permissions","title":"Permissions","category":"agent-components","difficulty":"beginner","aliases":["permisos","permission modes","allowlist"],"description":"Las reglas que determinan qué puede hacer un agente sin preguntar, qué requiere confirmación humana y qué tiene prohibido.","technicalExplanation":"Un agente con acceso a terminal puede hacer casi todo lo que puede hacer tu usuario, por lo que los permisos delimitan esa capacidad. Claude Code ofrece modos como `default`, `acceptEdits`, `plan`, `auto`, `dontAsk` y `bypassPermissions`, además de reglas de permiso y denegación por herramienta. Cline parte de un enfoque en el que cada acción requiere aprobación explícita.\n\nLos permisos son una capa de una defensa mayor, junto con el aislamiento (sandbox, contenedor, worktree) y los [[guardrails]].","problem":"Pedir confirmación para todo genera fatiga, y la persona acaba aprobando sin leer. No pedir nunca expone a daños reales. Hace falta un punto intermedio explícito.","howItWorks":"La herramienta evalúa cada llamada contra las reglas y, según el resultado, la ejecuta, la deniega o pregunta. En Claude Code se evalúan en orden: deny, ask, allow; gana la primera coincidencia. Lo habitual es permitir lo inocuo y frecuente (leer, ejecutar tests) y denegar lo peligroso (borrar datos, leer secretos, hacer push a producción).","whenToUse":"Desde el primer día. Antes de relajar permisos en modo autónomo, aísla el entorno: una aprobación no sirve de nada si el agente puede hacer daño sin pasar por ella.","advantages":["Limitan el daño de un error o de una inyección de prompt.","Reducen interrupciones si están bien ajustados."],"limitations":["La documentación de Claude Code advierte que los patrones que restringen argumentos de Bash son frágiles: otra forma de escribir el comando puede no coincidir.","Reglas amplias como “permitir todo Bash” anulan la protección.","La fatiga de aprobación es un riesgo real."],"example":{"language":"json","filename":".claude/settings.json","code":"{\n  \"permissions\": {\n    \"allow\": [\"Bash(npm run test *)\"],\n    \"deny\": [\"Read(./.env)\", \"Bash(git push *)\"]\n  }\n}","explanation":"Permite tests y lectura, y deniega leer `.env` y hacer push. Comprueba la sintaxis exacta en la documentación de tu versión."},"relatedConcepts":[{"id":"guardrails","note":"Los permisos son un tipo de guardrail."},{"id":"hooks","note":"Añaden lógica a medida donde las reglas no alcanzan."},{"id":"autonomous-agents","note":"A más autonomía, más importa delimitar permisos."}],"prerequisites":["tools-agent"],"tools":["claude-code","cline"],"sources":[{"title":"Claude Code: Permissions","url":"https://code.claude.com/docs/en/permissions"},{"title":"Claude Code: Subagents","url":"https://code.claude.com/docs/en/sub-agents"},{"title":"Cline: Documentation","url":"https://docs.cline.bot/"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"guardrails","title":"Guardrails","category":"agent-components","difficulty":"intermediate","aliases":["barandillas","salvaguardas"],"description":"Los controles que limitan lo que un sistema de IA puede recibir, hacer o devolver, para mantenerlo dentro de un comportamiento aceptable aunque el modelo se equivoque.","technicalExplanation":"“Guardrails” es un término general, no un mecanismo concreto. Agrupa validación de entradas y salidas, permisos, sandboxing, hooks, linters y aprobaciones humanas. Los hay de dos naturalezas: **deterministas** (un hook, una regla de permiso, un test) y **probabilísticos** (un modelo que clasifica si una respuesta es adecuada). Los segundos cubren casos que el código no alcanza, pero pueden fallar.","problem":"El modelo se equivoca, malinterpreta o puede ser manipulado mediante contenido malicioso en archivos, webs o resultados de herramientas (inyección de prompt). Un sistema fiable no puede depender de que el modelo acierte siempre.","howItWorks":"Se colocan controles en varios puntos: antes de la entrada, antes de ejecutar una acción, después de ejecutarla y antes de entregar el resultado. Se aplican en capas, porque ninguna es perfecta.","whenToUse":"En todo agente con capacidad de actuar. La intensidad debe ser proporcional al daño posible: un agente de solo lectura necesita menos que uno que despliega en producción.","advantages":["Reducen el impacto de errores e inyecciones.","Hacen viable dar más autonomía.","Los deterministas son auditables."],"limitations":["Dan falsa seguridad si se confía en una sola capa.","Pueden generar falsos positivos que frenan el trabajo.","Los probabilísticos pueden eludirse."],"example":{"text":"Capas para un agente que abre PRs: solo puede escribir en su worktree (aislamiento), no puede hacer push a `main` (permiso y protección de rama), un hook formatea y ejecuta el linter, la CI valida y una persona aprueba el merge."},"relatedConcepts":[{"id":"hooks","note":"Mecanismo determinista para implementarlos."},{"id":"permissions","note":"Primera capa de control."},{"id":"agentic-harness","note":"Los guardrails son una parte del harness."},{"id":"automated-code-review","note":"Una revisión automática actúa como guardrail en el PR."}],"prerequisites":["ai-agents"],"tools":["claude-code"],"sources":[{"title":"Claude Code: Permissions","url":"https://code.claude.com/docs/en/permissions"},{"title":"Birgitta Böckeler: Harness engineering for coding agent users","url":"https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html","note":"martinfowler.com, 2 de abril de 2026"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"mcp","title":"MCP","category":"agent-components","difficulty":"intermediate","aliases":["Model Context Protocol","protocolo de contexto"],"description":"Model Context Protocol: un estándar abierto para conectar aplicaciones de IA con herramientas y datos externos mediante un protocolo común, en lugar de una integración a medida por cada combinación.","technicalExplanation":"Anthropic presentó MCP como estándar abierto el 25 de noviembre de 2024, y en diciembre de 2025 pasó a ser uno de los proyectos fundacionales de la Agentic AI Foundation, bajo la Linux Foundation. Su arquitectura tiene tres roles:\n\n- **Host:** la aplicación de IA, por ejemplo un agente de código. Crea y gestiona clientes, y aplica las políticas de seguridad y consentimiento.\n- **Client:** creado por el host; mantiene una sesión con un único servidor (relación 1:1).\n- **Server:** expone capacidades específicas. Puede ser un proceso local o un servicio remoto.\n\nLos servidores exponen tres primitivas: **tools** (funciones que el modelo puede invocar), **resources** (datos de contexto) y **prompts** (plantillas). La revisión 2026-07-28 marca como obsoletas Roots, Sampling y Logging: siguen funcionando durante el periodo de retirada, pero las implementaciones nuevas no deberían adoptarlas.\n\nLos mensajes usan JSON-RPC, y el protocolo define dos transportes estándar: **stdio**, para procesos locales, y **Streamable HTTP**, que sustituye al antiguo HTTP+SSE. Esa misma revisión hace que MCP sea **sin estado**: elimina las sesiones y el handshake `initialize`, de modo que cada petición lleva su versión y capacidades, y los servidores anuncian las suyas con `server/discover`. Un principio de diseño relevante es que un servidor no debe poder leer toda la conversación ni “ver” dentro de otros servidores.","problem":"Sin un estándar, conectar N aplicaciones con M herramientas exige hasta N×M integraciones. MCP lo reduce a N+M: cada aplicación implementa un cliente y cada herramienta un servidor. También separa quien sabe del sistema externo de quien construye el agente.","howItWorks":"- El host arranca o se conecta a un servidor configurado.\n- El cliente puede consultar con `server/discover` qué versiones y capacidades admite el servidor.\n- El cliente lista las herramientas y el host las presenta al modelo.\n- Cuando el modelo pide usar una, el host la autoriza, el cliente la invoca y el resultado vuelve al modelo.\n\nMCP no sustituye al [[tool-calling]]: el modelo sigue emitiendo llamadas a herramientas, y MCP estandariza de dónde salen esas herramientas y cómo se ejecutan.","whenToUse":"Cuando un agente deba acceder a sistemas externos (tickets, bases de datos, diseño, monitorización) o quieras reutilizar una integración entre herramientas. Si basta con un comando que el agente ya puede ejecutar, como `gh`, a veces no hace falta: cada servidor añade definiciones que ocupan contexto.","advantages":["Una integración sirve para varias aplicaciones compatibles.","Separa responsabilidades entre host y servidor.","Admite servidores locales y remotos.","Gobernanza abierta bajo la Linux Foundation."],"limitations":["Muchas herramientas expuestas consumen contexto y dificultan elegir bien.","Un servidor es código de terceros con acceso a tus sistemas, y sus descripciones y resultados pueden contener inyecciones de prompt.","Los servidores HTTP deben validar `Origin` y autenticar conexiones; la especificación advierte del DNS rebinding en servidores locales.","El soporte de cada primitiva varía entre clientes."],"example":{"text":"Servidor remoto en `.mcp.json`, que Claude Code lee en la raíz del proyecto y se puede versionar para compartirlo con el equipo.","language":"json","filename":".mcp.json","code":"{\n  \"mcpServers\": {\n    \"shared-server\": {\n      \"type\": \"http\",\n      \"url\": \"https://example.com/mcp\"\n    }\n  }\n}"},"relatedConcepts":[{"id":"tool-calling","note":"El modelo sigue usando tool calling; MCP estandariza el acceso a las herramientas."},{"id":"mcp-servers","note":"La categoría de componentes que exponen capacidades."},{"id":"tools-agent","note":"Las tools de MCP son una fuente de herramientas para el agente."},{"id":"agent-communication","note":"MCP conecta agente y herramientas; A2A conecta agentes entre sí."},{"id":"context-engineering","note":"Resources y tools son una vía de acceso a contexto externo."},{"id":"permissions","note":"El host debe pedir consentimiento antes de ejecutar herramientas."}],"prerequisites":["tool-calling","tools-agent"],"tools":["claude-code","cursor","openai-codex","gemini-cli","cline","github-copilot","mcp-inspector"],"sources":[{"title":"MCP Specification 2026-07-28: Architecture","url":"https://modelcontextprotocol.io/specification/2026-07-28/architecture"},{"title":"MCP Specification 2026-07-28: Key Changes","url":"https://modelcontextprotocol.io/specification/2026-07-28/changelog"},{"title":"Anthropic: Introducing the Model Context Protocol","url":"https://www.anthropic.com/news/model-context-protocol","note":"25 de noviembre de 2024"},{"title":"Linux Foundation: formation of the Agentic AI Foundation","url":"https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation","note":"9 de diciembre de 2025"},{"title":"Claude Code: MCP","url":"https://code.claude.com/docs/en/mcp"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05","featured":3},{"id":"tools-agent","title":"Tools","category":"agent-components","difficulty":"beginner","aliases":["herramientas del agente","agent tools"],"description":"Las funciones que un agente puede invocar para actuar o informarse: leer archivos, ejecutar comandos, buscar o llamar a una API. Sin herramientas, un modelo solo genera texto.","technicalExplanation":"Una herramienta se define con un nombre, una descripción y un esquema de parámetros. El modelo no la ejecuta: emite una petición estructurada, y es la aplicación la que la ejecuta y devuelve el resultado ([[tool-calling]]).\n\nAnthropic subraya que el diseño de herramientas importa tanto como el del prompt: deben ser claras, sin solapamientos y devolver información útil sin desperdiciar tokens. Un conjunto inflado o ambiguo empeora las decisiones del agente.","problem":"Los modelos no acceden por sí solos al sistema de archivos, a la red ni a tus servicios. Las herramientas les dan esas capacidades de forma controlada.","howItWorks":"El host envía al modelo las definiciones disponibles. El modelo decide si usar alguna. El host valida la petición, comprueba permisos, la ejecuta y añade el resultado a la conversación. Pueden ser nativas del agente o venir de servidores [[mcp|MCP]].","whenToUse":"Dale al agente solo las herramientas necesarias para la tarea. Prefiere pocas y bien descritas a muchas y parecidas.","advantages":["Convierten al modelo en un sistema capaz de actuar.","Permiten verificar en vez de suponer, por ejemplo ejecutando un test.","Se pueden restringir por agente o subagente."],"limitations":["Sus definiciones y resultados consumen contexto.","Cada herramienta amplía la superficie de riesgo.","Las descripciones ambiguas provocan llamadas erróneas."],"example":{"language":"json","filename":"definición de herramienta","code":"{\n  \"name\": \"get_weather\",\n  \"description\": \"Devuelve el tiempo actual de una ciudad.\",\n  \"input_schema\": {\n    \"type\": \"object\",\n    \"properties\": { \"city\": { \"type\": \"string\" } },\n    \"required\": [\"city\"]\n  }\n}","explanation":"El modelo elige la herramienta a partir de `description` e `input_schema`, por lo que redactarlos bien cuenta tanto como el código que hay detrás."},"relatedConcepts":[{"id":"tool-calling","note":"El mecanismo con el que el modelo solicita una herramienta."},{"id":"mcp","note":"Protocolo para ofrecer herramientas externas."},{"id":"permissions","note":"Controlan qué herramientas pueden ejecutarse."},{"id":"agent-architecture","note":"Las herramientas son uno de los componentes del agente."}],"prerequisites":["ai-agents"],"tools":["claude-code"],"sources":[{"title":"Claude API: Tool use","url":"https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview"},{"title":"Anthropic: Effective context engineering for AI agents","url":"https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents","note":"29 de septiembre de 2025"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"workflows","title":"Workflows","category":"agent-components","difficulty":"intermediate","aliases":["flujos de trabajo","prompt chaining","patrones de workflow"],"description":"Sistemas en los que varias llamadas a modelos y herramientas se coordinan por rutas predefinidas en código, en lugar de dejar que el modelo decida cada paso.","technicalExplanation":"Anthropic distingue entre **workflows**, con rutas predefinidas, y **agentes**, en los que el modelo dirige dinámicamente su proceso. Su artículo recoge cinco patrones:\n\n- **Prompt chaining:** cada paso procesa la salida del anterior.\n- **Routing:** se clasifica la entrada y se envía a una tarea especializada.\n- **Parallelization:** subtareas simultáneas o varias ejecuciones para comparar.\n- **Orchestrator-workers:** un LLM central divide la tarea y delega.\n- **Evaluator-optimizer:** un LLM genera y otro evalúa en bucle.\n\nEl término también se usa de manera más amplia para un procedimiento humano-agente, como planificar, implementar y verificar; véase [[ai-development-workflows]].","problem":"Muchas tareas no necesitan la autonomía completa de un agente. Un workflow es más predecible, más barato y más fácil de depurar.","howItWorks":"El código de la aplicación define la secuencia, las ramas y las comprobaciones. El modelo interviene en pasos concretos, y entre ellos se pueden insertar validaciones programáticas.","whenToUse":"Cuando los pasos se conocen de antemano. Anthropic recomienda buscar la solución más simple y añadir complejidad solo si mejora de forma demostrable el resultado.","advantages":["Predecibles y fáciles de depurar.","Permiten validar entre pasos.","Coste más controlado."],"limitations":["No se adaptan a situaciones imprevistas.","Muchas ramas acaban siendo difíciles de mantener.","Cada paso añade latencia."],"example":{"text":"Un flujo de traducción: generar borrador, comprobar por programa que no falten variables `{nombre}` y, solo si pasa, pedir a otro paso que revise el tono."},"relatedConcepts":[{"id":"ai-agents","note":"Alternativa con más autonomía."},{"id":"orchestrators","note":"Orchestrator-workers es uno de los patrones."},{"id":"ai-development-workflows","note":"El mismo término aplicado al proceso de desarrollo."},{"id":"skills","note":"Un workflow repetible puede empaquetarse como skill."}],"prerequisites":["ai-agents"],"tools":["claude-code"],"sources":[{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"orchestrators","title":"Orchestrators","category":"agent-components","difficulty":"advanced","aliases":["orquestadores","orchestrator-workers","lead agent","agente principal"],"description":"El componente que divide un trabajo, reparte las partes entre agentes o pasos, coordina su ejecución y combina los resultados. Puede ser un modelo, código convencional o una combinación de ambos.","technicalExplanation":"Conviene separar dos cosas que se llaman igual:\n\n- **Orquestador basado en LLM:** un agente que decide dinámicamente cómo dividir la tarea. Es el patrón *orchestrator-workers*: un LLM central descompone, delega y sintetiza. Encaja cuando las subtareas no se conocen de antemano, y Anthropic pone como ejemplo cambios de código que afectan a varios archivos.\n- **Orquestador determinista:** código que lanza agentes según un flujo fijo. Es más predecible, pero menos flexible.\n\nEl orquestador no aporta capacidad por sí mismo: su valor está en coordinar. Sus decisiones críticas son cómo dividir para que las partes no choquen, qué contexto recibe cada trabajador, cómo combinar resultados y qué hacer si uno falla. En su sistema de investigación multiagente, Anthropic atribuye a la calidad de las instrucciones de delegación buena parte del resultado, y señala que un encargo vago produce trabajo duplicado.","problem":"Hay tareas demasiado grandes para una sola ventana de contexto, o con partes independientes que pueden avanzar a la vez. Sin coordinación, varios agentes duplican trabajo, chocan en los mismos archivos o producen resultados que no encajan.","howItWorks":"- **Descomposición:** divide el objetivo en subtareas lo más independientes posible.\n- **Delegación:** da a cada trabajador objetivo, límites, formato de salida y herramientas.\n- **Ejecución:** lanza en serie o en paralelo, con aislamiento si escriben archivos.\n- **Seguimiento:** gestiona fallos y reintentos.\n- **Síntesis:** integra los resultados y comprueba el conjunto.","whenToUse":"Cuando la tarea admite división real y su tamaño justifica el coste adicional. Si las subtareas dependen mucho entre sí o tocan los mismos archivos, un solo agente secuencial suele funcionar mejor.","advantages":["Permite abordar tareas mayores que una ventana de contexto.","El paralelismo reduce el tiempo total en trabajo independiente.","Cada trabajador puede especializarse."],"limitations":["Aumenta mucho el consumo de tokens.","Una mala descomposición multiplica el trabajo en vez de reducirlo.","Es más difícil depurar y observar.","El orquestador es un punto único de fallo en sus decisiones."],"example":{"text":"Migrar 40 archivos a una API nueva. El orquestador lista los archivos y comprueba que sean independientes, lanza un trabajador por lote en su propio worktree, cada uno ejecuta los tests, y luego fusiona las ramas y ejecuta la suite completa."},"relatedConcepts":[{"id":"subagents","note":"Sus trabajadores habituales en un agente de código."},{"id":"agent-orchestration","note":"La disciplina general de coordinar agentes."},{"id":"multi-agent-systems","note":"El orquestador es una de las topologías posibles."},{"id":"parallel-agent-development","note":"Coordina el trabajo simultáneo en el mismo repositorio."},{"id":"workflows","note":"Orchestrator-workers es uno de los patrones de workflow."}],"prerequisites":["ai-agents","subagents"],"tools":["claude-code","langgraph","autogen"],"sources":[{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"},{"title":"Anthropic: How we built our multi-agent research system","url":"https://www.anthropic.com/engineering/multi-agent-research-system"},{"title":"Claude Code: overview","url":"https://code.claude.com/docs/en/overview"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"agentic-harness","title":"Agentic Harness","category":"agent-components","difficulty":"advanced","aliases":["harness","arnés","agent harness"],"description":"Todo lo que rodea al modelo y lo convierte en un agente útil: el bucle de ejecución, las herramientas, la gestión de contexto, los permisos y las comprobaciones.","technicalExplanation":"Birgitta Böckeler lo resume así en martinfowler.com: en sentido amplio, un harness es “todo lo que hay en un agente de IA excepto el modelo”. Esa definición ayuda a explicar por qué dos productos con el mismo modelo se comportan de forma muy distinta.\n\nConviene distinguir dos capas:\n\n- **Capa del producto:** lo que aporta la herramienta, como Claude Code o Codex. Incluye el bucle, las herramientas nativas, la compactación y los permisos.\n- **Harness externo (*outer harness*):** lo que el equipo construye a su alrededor, como instrucciones, skills, hooks, tests, linters y CI.\n\nBöckeler organiza el externo en **guías** que orientan antes de actuar (*feedforward*) y **sensores** que observan el resultado para que el agente se corrija (*feedback*), cada uno de tipo computacional (determinista) o inferencial (basado en un modelo). La [[harness-engineering]] es la disciplina de diseñar esta capa.","problem":"Un modelo solo no conserva estado entre llamadas ni ejecuta acciones, y puede dar por terminado un trabajo que no lo está. Anthropic describe, por ejemplo, agentes de larga duración que intentan hacer demasiado de una vez o declaran el trabajo acabado antes de tiempo, algo que el harness debe compensar con estructura.","howItWorks":"- **Bucle:** envía contexto al modelo, ejecuta las herramientas pedidas y repite.\n- **Contexto:** carga instrucciones, recupera información y compacta.\n- **Control:** aplica permisos, sandbox y hooks.\n- **Verificación:** ejecuta tests y linters y devuelve los fallos al modelo.\n- **Continuidad:** guarda progreso en archivos o en Git para retomar el trabajo.","whenToUse":"Todo agente tiene un harness; la decisión es cuánto invertir en la capa externa. Compensa cuando los agentes trabajan con frecuencia en un mismo código, o con cada vez menos supervisión directa.","advantages":["Mejorar el harness suele dar resultados más estables que cambiar de modelo.","Convierte errores puntuales en controles permanentes.","Permite aumentar la autonomía de forma segura."],"limitations":["Requiere inversión y mantenimiento continuos.","Un exceso de reglas o sensores ralentiza al agente.","Los tests generados por IA no bastan todavía como sensor fiable de comportamiento, según Böckeler."],"example":{"text":"Un agente rompe la separación de capas. En lugar de corregirlo solo en el chat, el equipo añade una regla de linter con un mensaje que explica cómo arreglarlo. Desde entonces, cualquier agente recibe esa corrección automáticamente."},"relatedConcepts":[{"id":"harness-engineering","note":"La disciplina de diseñar y mejorar el harness."},{"id":"hooks","note":"Mecanismo típico de control determinista."},{"id":"context-engineering","note":"Se ocupa de una parte del harness: qué ve el agente."},{"id":"guardrails","note":"Controles dentro del harness."},{"id":"agent-evaluation","note":"Permite medir si un cambio mejora el harness."},{"id":"agent-architecture","note":"El harness implementa casi toda la arquitectura salvo el modelo."}],"prerequisites":["ai-agents","context-management","hooks"],"tools":["claude-code","openai-codex"],"sources":[{"title":"Birgitta Böckeler: Harness engineering for coding agent users","url":"https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html","note":"martinfowler.com, 2 de abril de 2026"},{"title":"Anthropic: Effective harnesses for long-running agents","url":"https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents"},{"title":"OpenAI: Harness engineering","url":"https://openai.com/index/harness-engineering/","note":"Fuente primaria; bloqueó la lectura automática, contrastar a mano"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"git-fundamentals","title":"Git Fundamentals","category":"git-collaboration","difficulty":"beginner","aliases":["git básico","commit","control de versiones"],"description":"Git es un sistema de control de versiones distribuido: guarda instantáneas de tu proyecto y cada copia contiene el historial completo.","technicalExplanation":"Git nació en 2005 en la comunidad del kernel de Linux, con Linus Torvalds al frente, tras romperse la relación con BitKeeper. Sus objetivos eran velocidad, diseño simple y gran soporte para desarrollo no lineal. A diferencia de otros sistemas, piensa en **instantáneas**, no en diferencias. Un archivo pasa por tres estados: modificado, preparado (*staged*) y confirmado (*committed*).","problem":"Permite saber qué cambió, cuándo y por qué, deshacer errores y que varias personas trabajen sin pisarse. Para un agente, además, los commits son puntos de control seguros.","howItWorks":"`git add` prepara cambios, `git commit` crea una instantánea, `git log` muestra la historia, y `git push`/`git pull` sincronizan con un remoto. Una rama es un puntero móvil a un commit.","whenToUse":"En prácticamente todo proyecto de software. Es también un prerrequisito para trabajar con agentes con seguridad.","advantages":["Trabajo sin conexión y operaciones rápidas.","Historial completo y verificable.","Ramas muy ligeras."],"limitations":["Curva de aprendizaje con conceptos poco intuitivos.","Algunos comandos pueden destruir trabajo si no se entienden.","Poco adecuado para binarios grandes sin extensiones como LFS."],"example":{"language":"bash","filename":"terminal","code":"git status\ngit add src/login.js\ngit commit -m \"Corrige la validación del email\"\ngit log --oneline -5","explanation":"Preparar y confirmar por separado permite elegir qué entra en cada commit."},"relatedConcepts":[{"id":"git-branches","note":"Siguiente paso natural."},{"id":"git-worktrees","note":"Varios directorios para un solo repositorio."},{"id":"pull-requests","note":"Capa de colaboración sobre Git."}],"prerequisites":[],"tools":[],"sources":[{"title":"Pro Git: A Short History of Git","url":"https://git-scm.com/book/en/v2/Getting-Started-A-Short-History-of-Git"},{"title":"Pro Git: What is Git?","url":"https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"git-flow","title":"Git Flow","category":"git-collaboration","difficulty":"intermediate","aliases":["gitflow"],"description":"Modelo de ramas con `main` y `develop` permanentes, más ramas temporales de feature, release y hotfix.","technicalExplanation":"Lo propuso Vincent Driessen en 2010. Su autor añadió después una nota: para el software entregado continuamente, como las aplicaciones web, recomienda flujos más simples como [[github-flow]]. Git Flow encaja sobre todo con software versionado explícitamente o con varias versiones en mantenimiento.","problem":"Coordina ciclos de versión formales, separando el desarrollo en curso de lo que se prepara para publicar.","howItWorks":"Las features salen de `develop` y vuelven a ella. Una rama `release` estabiliza la versión y se integra en `main` y `develop`. Un `hotfix` sale de `main`.","whenToUse":"En productos con versiones planificadas o varias líneas soportadas a la vez. Para despliegue continuo suele ser excesivo.","advantages":["Estructura clara para versiones formales.","Permite mantener varias versiones."],"limitations":["Ramas largas que aumentan los conflictos.","Más burocracia.","Encaja peor con la integración continua."],"example":{"language":"bash","filename":"terminal","code":"git switch -c feature/export develop\n# ...trabajo...\ngit switch develop\ngit merge --no-ff feature/export"},"relatedConcepts":[{"id":"github-flow","note":"Alternativa más simple."},{"id":"merge-vs-rebase","note":"Git Flow usa merges explícitos."},{"id":"ci-cd","note":"Tensión con la integración continua."}],"prerequisites":["git-branches"],"tools":[],"sources":[{"title":"Vincent Driessen: A successful Git branching model","url":"https://nvie.com/posts/a-successful-git-branching-model/"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"github-flow","title":"GitHub Flow","category":"git-collaboration","difficulty":"beginner","description":"Flujo ligero: una rama principal siempre desplegable, ramas cortas para cada cambio y pull requests para revisar e integrar.","technicalExplanation":"Tiene pocas reglas: crea una rama, haz commits, abre un PR, recibe revisión y fusiona. Se apoya en CI para mantener estable la rama principal. Se lleva bien con agentes: cada agente puede trabajar en una rama corta y entregar un PR.","problem":"Reduce la ceremonia y mantiene los cambios pequeños, lo que facilita revisar e integrar con frecuencia.","howItWorks":"`git switch -c mi-cambio`, commits, push, PR, revisión, CI verde, merge y borrado de la rama.","whenToUse":"En aplicaciones con despliegue continuo y equipos que pueden mantener `main` estable.","advantages":["Sencillo de aprender.","Integración frecuente, menos conflictos.","Encaja con CI/CD."],"limitations":["Requiere buena CI.","No gestiona por sí solo varias versiones en mantenimiento."],"example":{"language":"bash","filename":"terminal","code":"git switch -c fix/login-email\ngit push -u origin fix/login-email\ngh pr create --fill"},"relatedConcepts":[{"id":"pull-requests","note":"Pieza central del flujo."},{"id":"git-flow","note":"Alternativa más formal."},{"id":"parallel-agent-development","note":"Un PR por agente es un patrón natural."}],"prerequisites":["git-branches"],"tools":["github-actions-tool"],"sources":[{"title":"GitHub Docs: GitHub flow","url":"https://docs.github.com/en/get-started/using-github/github-flow"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"git-branches","title":"Git Branches","category":"git-collaboration","difficulty":"beginner","aliases":["ramas"],"description":"Una rama es un puntero móvil a un commit, que permite desarrollar líneas de trabajo independientes dentro de un repositorio.","technicalExplanation":"Crear una rama es muy barato porque solo crea una referencia. `HEAD` indica dónde estás. Una sola copia de trabajo solo puede tener una rama activa a la vez: por eso, para trabajar con dos a la vez, en el mismo disco, se usan [[git-worktrees]].","problem":"Aísla cambios en curso para que no afecten a otros hasta estar listos.","howItWorks":"`git switch -c nombre` crea y cambia. Los commits avanzan el puntero de la rama activa. `git merge` o `git rebase` la integran.","whenToUse":"Para cada cambio que no vaya directo a la rama principal. Mantenlas cortas.","advantages":["Ligeras y rápidas.","Permiten experimentar sin riesgo."],"limitations":["Las ramas largas divergen y generan conflictos.","Cambiar de rama afecta a todo el directorio de trabajo."],"example":{"language":"bash","filename":"terminal","code":"git switch -c feature/search\ngit branch --list\ngit switch main"},"relatedConcepts":[{"id":"git-worktrees","note":"Permiten tener varias ramas activas a la vez."},{"id":"merge-vs-rebase","note":"Dos formas de integrarlas."}],"prerequisites":["git-fundamentals"],"tools":[],"sources":[{"title":"Pro Git: Basic Branching and Merging","url":"https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"merge-vs-rebase","title":"Merge vs Rebase","category":"git-collaboration","difficulty":"intermediate","aliases":["merge","rebase","fusionar"],"description":"Dos formas de integrar cambios: `merge` une historias con un commit de fusión; `rebase` reescribe tus commits sobre otra base para obtener una historia lineal.","technicalExplanation":"`merge` conserva lo que pasó, y añade un commit con dos padres si las ramas divergieron. `rebase` crea commits nuevos con otros identificadores, lo que da una historia lineal pero la reescribe. Pro Git da la regla clásica: no hagas rebase de commits que existan fuera de tu repositorio y sobre los que otras personas puedan haber basado trabajo.","problem":"Hay que integrar el trabajo paralelo eligiendo entre fidelidad histórica y legibilidad.","howItWorks":"`git merge main` fusiona main en tu rama. `git rebase main` reaplica tus commits sobre main. En ambos casos pueden surgir conflictos; en rebase, se resuelven commit a commit.","whenToUse":"Rebase para limpiar una rama propia antes de integrarla. Merge para integrar ramas compartidas. Lo importante es la coherencia dentro del equipo.","advantages":["Merge: no reescribe historia y es seguro en ramas compartidas.","Rebase: historia lineal y más fácil de leer."],"limitations":["Merge: puede llenar la historia de commits de fusión.","Rebase: reescribir ramas compartidas causa problemas a otros."],"example":{"language":"bash","filename":"terminal","code":"# Actualizar mi rama sobre main\ngit fetch origin\ngit rebase origin/main\n# Alternativa sin reescribir\ngit merge origin/main"},"relatedConcepts":[{"id":"squash-commits","note":"Otra forma de limpiar la historia."},{"id":"conflict-resolution","note":"Ambos pueden requerirla."},{"id":"git-branches","note":"Lo que se integra."}],"prerequisites":["git-branches"],"tools":[],"sources":[{"title":"Pro Git: Rebasing","url":"https://git-scm.com/book/en/v2/Git-Branching-Rebasing"},{"title":"Git: git-merge","url":"https://git-scm.com/docs/git-merge"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"squash-commits","title":"Squash Commits","category":"git-collaboration","difficulty":"intermediate","aliases":["squash","aplastar commits"],"description":"Combinar varios commits en uno para dejar una historia más limpia, normalmente al integrar una rama.","technicalExplanation":"Se puede hacer con `git rebase -i` o con `git merge --squash`, y muchas plataformas ofrecen “squash and merge” al fusionar un PR. Es útil con agentes, que tienden a crear muchos commits intermedios. A cambio, se pierde el detalle intermedio en la rama principal.","problem":"Evita que la historia principal se llene de commits como “corrige typo” o “otra prueba”.","howItWorks":"Se reúnen los cambios de varios commits en uno, con un mensaje único que describe el resultado.","whenToUse":"Cuando los commits intermedios no aportan valor. Evítalo si la rama tiene commits lógicos separados que convenga conservar.","advantages":["Historia legible, un commit por cambio.","Revertir un cambio completo es más fácil."],"limitations":["Se pierde granularidad para `git bisect`.","Reescribe historia si se hace sobre commits publicados."],"example":{"language":"bash","filename":"terminal","code":"git switch main\ngit merge --squash feature/search\ngit commit -m \"Añade búsqueda global\""},"relatedConcepts":[{"id":"merge-vs-rebase","note":"Estrategia de integración relacionada."},{"id":"pull-requests","note":"Opción habitual al fusionar un PR."}],"prerequisites":["merge-vs-rebase"],"tools":[],"sources":[{"title":"Pro Git: Rewriting History","url":"https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History"},{"title":"Git: git-merge","url":"https://git-scm.com/docs/git-merge"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"git-worktrees","title":"Git Worktrees","category":"git-collaboration","difficulty":"intermediate","aliases":["worktree","git worktree","árboles de trabajo"],"description":"Una función de Git que permite tener varios directorios de trabajo enlazados a un mismo repositorio, cada uno con su rama activa. Es la base habitual para que varios agentes trabajen a la vez sin pisarse los archivos.","technicalExplanation":"Un repositorio normal tiene un directorio de trabajo con una sola rama activa. `git worktree add` crea directorios adicionales, los **linked worktrees**, que comparten con el principal gran parte de los datos de Git.\n\n**Compartido** entre worktrees: la base de objetos (commits), las referencias `refs/heads/*` y `refs/tags/*`, y la configuración.\n\n**Propio de cada worktree:** `HEAD`, el `index` (área de preparación) y, claro, los archivos del directorio.\n\nFrente a clonar varias veces, no se duplica el historial, y un commit hecho en un worktree es visible al instante en los demás, porque la historia es la misma. Frente a cambiar de rama, no hay que guardar el trabajo ni interrumpir lo que esté corriendo.\n\nHay una regla importante: **una rama solo puede estar activa en un worktree a la vez**. `git worktree add` se niega si ya lo está en otro lugar, salvo con `--force`. Se soluciona con una rama nueva (`-b`) o con `--detach`.","problem":"Si dos agentes trabajan en el mismo directorio, se sobrescriben: uno edita un archivo mientras otro lo lee, comparten el área de preparación y un cambio de rama afecta a ambos. Los worktrees dan a cada agente **sus propios archivos, su propia rama y su propio index**.\n\nTambién resuelven una situación cotidiana: atender un hotfix sin interrumpir una compilación o un trabajo a medias.","howItWorks":"Comandos esenciales:\n\n- `git worktree add ../proyecto-feature -b feature`: crea un directorio con una rama nueva.\n- `git worktree add ../proyecto-bug fix-123`: usa una rama existente.\n- `git worktree list`: muestra los worktrees y su rama.\n- `git worktree remove <ruta>`: elimina uno limpio. Con cambios o archivos sin seguimiento hace falta `--force`.\n- `git worktree prune`: limpia los metadatos de directorios borrados a mano.\n- `git worktree lock`: lo protege de ser eliminado.\n\nCon agentes, Claude Code ofrece `claude --worktree nombre`, que crea el worktree bajo `.claude/worktrees/` en una rama nueva, y `isolation: worktree` para subagentes. Codex, Cursor y Devin Desktop también documentan el uso de worktrees.\n\nTen en cuenta que **un worktree es una copia limpia**: no incluye lo que esté en `.gitignore`, como `node_modules` o `.env`. Hay que instalar dependencias en cada uno. En Claude Code, `.worktreeinclude` copia archivos ignorados.","whenToUse":"Para trabajar en paralelo en tareas independientes, revisar un PR sin tocar lo que tienes a medias, atender un hotfix o comparar comportamientos entre versiones. No son necesarios si solo trabajas en una cosa cada vez y cambiar de rama no molesta.","advantages":["Aislamiento real de archivos e index entre tareas.","Comparten el historial: ocupan menos que varios clones y los commits se ven al momento.","Cambiar de tarea es cambiar de directorio, sin stash.","Función nativa de Git, sin dependencias."],"limitations":["**No evitan los conflictos semánticos ni de merge:** solo los aplazan hasta la integración.","Cada uno necesita sus dependencias y su configuración local.","Comparten recursos de la máquina: puertos, bases de datos locales, CPU.","Una misma rama no puede estar activa en dos a la vez.","Hay que limpiarlos para no acumular directorios."],"example":{"text":"Dos agentes en paralelo. Cada uno trabaja en su directorio y su rama, y se integra después mediante PR.","language":"bash","filename":"terminal","code":"# Desde el repositorio principal\ngit worktree add ../app-auth -b feature/auth\ngit worktree add ../app-billing -b feature/billing\n\n# Un agente en cada terminal\n(cd ../app-auth && claude)\n(cd ../app-billing && claude)\n\n# Ver qué hay en marcha\ngit worktree list\n\n# Limpiar al terminar\ngit worktree remove ../app-auth\ngit worktree remove ../app-billing","explanation":"Hay más detalle en el Playground, con un flujo que hemos ejecutado. Observa que `git worktree remove` no borra la rama, de modo que su trabajo sigue accesible."},"relatedConcepts":[{"id":"git-branches","note":"Cada worktree tiene una rama activa."},{"id":"parallel-agent-development","note":"Su principal uso con agentes."},{"id":"subagents","note":"Pueden aislarse con `isolation: worktree`."},{"id":"shared-file-conflicts","note":"Evitan choques de archivos en disco, no los conflictos al integrar."},{"id":"dev-environments","note":"Cada worktree necesita un entorno preparado."},{"id":"conflict-resolution","note":"Aparecerá al fusionar las ramas."}],"prerequisites":["git-fundamentals","git-branches"],"tools":["claude-code","openai-codex","cursor","windsurf"],"sources":[{"title":"Git: git-worktree","url":"https://git-scm.com/docs/git-worktree"},{"title":"Claude Code: Run parallel sessions with worktrees","url":"https://code.claude.com/docs/en/worktrees"},{"title":"Devin Desktop: Cascade","url":"https://docs.devin.ai/desktop/cascade/cascade"},{"title":"OpenAI: Codex documentation","url":"https://learn.chatgpt.com/docs"},{"title":"Cursor: índice de documentación (llms.txt)","url":"https://cursor.com/llms.txt"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05","featured":2},{"id":"parallel-development","title":"Parallel Development","category":"git-collaboration","difficulty":"intermediate","aliases":["desarrollo paralelo"],"description":"Varias líneas de trabajo avanzando a la vez sobre el mismo código, para integrarse después.","technicalExplanation":"Es tan antiguo como los equipos de software. Sus reglas no cambian con la IA: mantener cambios pequeños, integrar a menudo y reducir el acoplamiento. La integración continua surgió en parte para reducir el coste de integrar trabajo divergente.","problem":"Permite avanzar en varias tareas sin que una bloquee a otra.","howItWorks":"Cada línea tiene su rama. El trabajo se integra de forma frecuente, verificando con CI.","whenToUse":"Cuando las tareas son lo bastante independientes. Si tocan el mismo código, hay que coordinarlas o hacerlas en serie.","advantages":["Mayor rendimiento del equipo.","Reduce esperas."],"limitations":["El coste de integración crece con el tiempo que divergen las ramas.","Requiere coordinación y buenos límites entre módulos."],"example":{"text":"Una persona actualiza la página de precios mientras otra añade la exportación a CSV. Si tocan módulos distintos, integrar será trivial."},"relatedConcepts":[{"id":"parallel-agent-development","note":"La misma idea con agentes."},{"id":"ci-cd","note":"Reduce el coste de integrar."},{"id":"git-branches","note":"Mecanismo básico."}],"prerequisites":["git-branches"],"tools":[],"sources":[{"title":"Martin Fowler: Continuous Integration","url":"https://martinfowler.com/articles/continuousIntegration.html"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"parallel-agent-development","title":"Parallel Agent Development","category":"git-collaboration","difficulty":"advanced","aliases":["multiple AI agents working simultaneously","agentes en paralelo","varios agentes simultáneos"],"description":"Trabajar con varios agentes a la vez sobre un mismo repositorio, cada uno en una tarea, con aislamiento para no interferir y un proceso para integrar los resultados.","technicalExplanation":"La idea es sencilla; la dificultad está en la coordinación. Hacen falta tres cosas:\n\n- **Aislamiento:** cada agente necesita sus archivos. Lo habitual es un [[git-worktrees|worktree]], o bien un contenedor o un entorno en la nube.\n- **Independencia de las tareas:** si dos agentes tocan el mismo módulo, el aislamiento solo aplaza el problema a la hora de integrar.\n- **Integración:** alguien debe fusionar y comprobar el conjunto. Dos cambios pueden pasar sus tests por separado y fallar juntos.\n\nEl paralelismo tiene un límite que no siempre se ve: **tu capacidad de revisión**. Cuatro agentes producen cuatro diffs que alguien tiene que comprender.\n\nClaude Code cubre varias variantes: sesiones con `--worktree`, subagentes con `isolation: worktree` y sesiones en segundo plano. Devin Desktop puede ejecutar cada sesión en su propio worktree, Codex lo ofrece como opción de entorno, y Cline incluye un tablero Kanban para agentes paralelos.","problem":"Las tareas que no dependen entre sí no tienen por qué esperar a que termine otra. Permite convertir el tiempo de espera en trabajo útil, o probar varios enfoques de un mismo problema y quedarse con el mejor.","howItWorks":"- **Divide:** elige tareas que toquen áreas distintas.\n- **Aísla:** un worktree y una rama por agente.\n- **Prepara:** instala dependencias y evita choques de puertos o bases de datos.\n- **Delega con verificación:** cada encargo incluye cómo comprobarlo.\n- **Revisa:** idealmente, con un agente de contexto limpio además de una persona.\n- **Integra de una en una:** fusiona una rama, actualiza las demás y ejecuta los tests antes de seguir.","whenToUse":"Cuando hay varias tareas independientes, buenos tests y capacidad de revisión. No funciona bien con tareas muy acopladas, repositorios sin tests o cuando el diseño aún no está claro.","advantages":["Reduce el tiempo total en tareas independientes.","Permite comparar varias soluciones.","Aprovecha el tiempo de espera de los agentes."],"limitations":["La revisión y la integración se convierten en el cuello de botella.","Mayor consumo de tokens.","Conflictos si la división es mala.","Cambiar de contexto entre tareas cansa a quien supervisa.","Comparten recursos locales: puertos, bases de datos, CPU."],"example":{"text":"Dos sesiones aisladas lanzadas en paralelo con Claude Code. Cada una trabaja en su propio worktree y su propia rama.","language":"bash","filename":"terminal","code":"claude -p --worktree auth \"Añade rate limiting a /login. Incluye tests.\" &\nclaude -p --worktree docs \"Actualiza la guía de API según el código actual.\" &\nwait\ngit worktree list","explanation":"Como los ejecutas con `-p` (no interactivo), Claude Code no limpia estos worktrees al terminar. Revísalos y elimínalos después con `git worktree remove`."},"relatedConcepts":[{"id":"git-worktrees","note":"El mecanismo de aislamiento más común."},{"id":"orchestrators","note":"Pueden coordinar el trabajo."},{"id":"shared-file-conflicts","note":"El riesgo principal de una mala división."},{"id":"multi-agent-systems","note":"Es un tipo de sistema multiagente."},{"id":"code-reviews","note":"La revisión es el límite real del paralelismo."},{"id":"conflict-resolution","note":"Paso final de la integración."}],"prerequisites":["git-worktrees","agentic-coding"],"tools":["claude-code","openai-codex","cursor","windsurf","cline"],"sources":[{"title":"Claude Code: Run parallel sessions with worktrees","url":"https://code.claude.com/docs/en/worktrees"},{"title":"Claude Code: Subagents","url":"https://code.claude.com/docs/en/sub-agents"},{"title":"Devin Desktop: Cascade","url":"https://docs.devin.ai/desktop/cascade/cascade"},{"title":"OpenAI: Codex documentation","url":"https://learn.chatgpt.com/docs"},{"title":"Cline: Documentation","url":"https://docs.cline.bot/"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"shared-file-conflicts","title":"Shared File Conflicts","category":"git-collaboration","difficulty":"intermediate","aliases":["conflictos de archivos compartidos","archivos calientes"],"description":"Los choques que surgen cuando varios agentes o personas modifican los mismos archivos, tanto en disco como en el momento de integrar.","technicalExplanation":"Hay tres niveles distintos:\n\n- **En disco:** dos agentes en el mismo directorio se sobrescriben. Lo evitan los worktrees.\n- **De merge:** Git no puede combinar cambios en las mismas líneas. Se detectan al integrar.\n- **Semánticos:** Git fusiona sin avisar, pero el resultado está roto, como cuando uno renombra una función que otro empieza a usar. Solo los detectan los tests.\n\nAlgunos archivos concentran estos choques, como listas de rutas, lockfiles o barrels de exports.","problem":"Si se ignoran, se pierde trabajo o se integra código que compila por separado pero falla en conjunto.","howItWorks":"Se reducen dividiendo por módulos, asignando la propiedad de cada zona, serializando cambios en archivos calientes e integrando con frecuencia.","whenToUse":"Tenlo en cuenta al planificar cualquier trabajo en paralelo. Detecta de antemano qué archivos tocará cada tarea.","advantages":["Pensar en ello mejora también el diseño modular."],"limitations":["Los conflictos semánticos pasan desapercibidos sin buenos tests.","Los lockfiles generan conflictos frecuentes y deben regenerarse, no fusionarse a mano."],"example":{"text":"Dos agentes añaden un endpoint y ambos editan `routes.js`. Solución: uno prepara primero el registro de rutas y luego cada uno añade la suya en archivos separados."},"relatedConcepts":[{"id":"git-worktrees","note":"Solo evitan el primer nivel."},{"id":"conflict-resolution","note":"Qué hacer cuando ocurren."},{"id":"parallel-agent-development","note":"Donde más aparecen."}],"prerequisites":["git-branches"],"tools":[],"sources":[{"title":"Pro Git: Basic Branching and Merging","url":"https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"conflict-resolution","title":"Conflict Resolution","category":"git-collaboration","difficulty":"intermediate","aliases":["resolución de conflictos","merge conflict"],"description":"El proceso de combinar a mano o con ayuda cambios que Git no puede fusionar de forma automática.","technicalExplanation":"Git marca las zonas en conflicto con `<<<<<<<`, `=======` y `>>>>>>>`. Resolver no es elegir una versión: es entender qué querían conseguir ambos cambios y producir un código que cumpla los dos objetivos. Un agente puede ayudar si conoce la intención de cada rama, pero conviene revisar la resolución y ejecutar los tests.","problem":"Es inevitable cuando hay trabajo en paralelo sobre el mismo código.","howItWorks":"- `git status` muestra los archivos en conflicto.\n- Edita para conseguir el resultado correcto.\n- `git add` marca el archivo como resuelto.\n- `git merge --continue` o `git rebase --continue`.\n- Ejecuta los tests.\n\nSi te pierdes, `git merge --abort` vuelve al estado anterior.","whenToUse":"Cuando Git lo pide. Para reducir su coste, integra con frecuencia y mantén los cambios pequeños.","advantages":["Fuerza a comprender cómo interactúan los cambios."],"limitations":["Puede introducir errores silenciosos si se resuelve de forma mecánica.","Es más difícil cuanto más han divergido las ramas."],"example":{"language":"bash","filename":"terminal","code":"git merge feature/auth\n# CONFLICT en src/routes.js\n# ...edita el archivo...\ngit add src/routes.js\ngit merge --continue\nnpm test"},"relatedConcepts":[{"id":"merge-vs-rebase","note":"Ambos pueden generar conflictos."},{"id":"shared-file-conflicts","note":"De dónde vienen."}],"prerequisites":["git-branches"],"tools":["claude-code"],"sources":[{"title":"Pro Git: Basic Branching and Merging","url":"https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging"},{"title":"Git: git-merge","url":"https://git-scm.com/docs/git-merge"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"pull-requests","title":"Pull Requests","category":"git-collaboration","difficulty":"beginner","aliases":["PR","merge request","MR"],"description":"Una propuesta para fusionar los cambios de una rama en otra, con espacio para discutir, revisar y pasar comprobaciones automáticas. GitLab lo llama merge request.","technicalExplanation":"No es una función de Git, sino de plataformas como GitHub o GitLab. Reúne el diff, la conversación, las comprobaciones de CI y las aprobaciones. Con agentes, el PR es la frontera natural de revisión: un agente lo abre y una persona decide.","problem":"Da un punto de control antes de que un cambio llegue a la rama principal, y un registro de por qué se hizo.","howItWorks":"Subes una rama, abres el PR, se ejecuta CI, se revisa, se ajusta y se fusiona. Las reglas de protección pueden exigir aprobaciones y CI en verde.","whenToUse":"En casi todo trabajo de equipo y en cualquier cambio hecho por un agente.","advantages":["Calidad y conocimiento compartido.","Historial de decisiones.","Punto único para automatizaciones."],"limitations":["Los PR grandes se revisan mal.","Pueden crear colas de espera."],"example":{"language":"bash","filename":"terminal","code":"git push -u origin fix/login\ngh pr create --title \"Corrige login\" --body \"Cierra #142\"\ngh pr checks"},"relatedConcepts":[{"id":"code-reviews","note":"Lo que ocurre dentro."},{"id":"github-flow","note":"Su flujo natural."},{"id":"automated-code-review","note":"Puede intervenir en el PR."}],"prerequisites":["git-branches"],"tools":["github-actions-tool","github-copilot"],"sources":[{"title":"GitHub Docs: About pull requests","url":"https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"code-reviews","title":"Code Reviews","category":"git-collaboration","difficulty":"beginner","aliases":["revisión de código"],"description":"Otra persona, o un agente, examina un cambio antes de integrarlo, para detectar defectos y mantener la salud del código.","technicalExplanation":"La guía de ingeniería de Google señala que el objetivo principal es que la salud del código mejore con el tiempo, no exigir perfección: se aprueba un cambio cuando mejora la situación. Con código generado por IA, la revisión gana importancia, porque el autor puede no haber razonado cada línea, y el volumen aumenta.","problem":"Detecta errores, comparte conocimiento y mantiene la coherencia del diseño.","howItWorks":"Se revisa primero el diseño y luego los detalles, con comentarios claros y accionables. Lo que puede comprobar una herramienta debería hacerlo la herramienta.","whenToUse":"En todo cambio que vaya a producción, con la profundidad acorde al riesgo.","advantages":["Detecta defectos que los tests no ven.","Difunde el conocimiento."],"limitations":["Consume tiempo y puede crear cuellos de botella.","Disminuye su eficacia con diffs grandes.","Es tentador confiar demasiado en código que parece correcto."],"example":{"text":"Al revisar un cambio de un agente, comprueba primero si resuelve el problema correcto, luego los casos límite que no menciona, y por último si el código añade complejidad innecesaria."},"relatedConcepts":[{"id":"pull-requests","note":"Contexto habitual."},{"id":"automated-code-review","note":"La complementa, sin sustituirla."},{"id":"ai-generated-code-testing","note":"Otra capa de verificación."}],"prerequisites":[],"tools":[],"sources":[{"title":"Google Engineering Practices: Code Review","url":"https://google.github.io/eng-practices/review/"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"ci-cd","title":"CI/CD","category":"devops-infrastructure","difficulty":"beginner","aliases":["integración continua","entrega continua","despliegue continuo","pipeline"],"description":"Prácticas para integrar cambios con frecuencia (CI) y mantener el software siempre listo para desplegar (entrega continua), a veces automáticamente (despliegue continuo).","technicalExplanation":"**CI** consiste en integrar a menudo en la rama principal, con compilación y tests automáticos. **Entrega continua** significa que cada cambio que supera el pipeline se puede desplegar en cualquier momento. **Despliegue continuo** va más allá y lo despliega de forma automática. Con agentes, el pipeline se convierte en un verificador independiente del autor.","problem":"Reduce el coste y el riesgo de integrar y publicar, al hacerlo en pasos pequeños.","howItWorks":"Un cambio dispara un pipeline: compilación, tests, análisis, empaquetado y despliegue. Si un paso falla, se detiene.","whenToUse":"En casi todo proyecto mantenido.","advantages":["Detecta problemas pronto.","Publicaciones pequeñas y menos arriesgadas."],"limitations":["Pipelines lentos o inestables frustran al equipo.","Requiere invertir en tests."],"example":{"text":"Cada PR ejecuta lint y tests. Al fusionar en `main`, se construye una imagen, se despliega en staging y, tras comprobaciones, en producción."},"relatedConcepts":[{"id":"github-actions","note":"Una plataforma de CI/CD."},{"id":"deployment-strategies","note":"Cómo se despliega."},{"id":"regression-testing","note":"Parte del pipeline."}],"prerequisites":[],"tools":["github-actions-tool"],"sources":[{"title":"Martin Fowler: Continuous Integration","url":"https://martinfowler.com/articles/continuousIntegration.html"},{"title":"Martin Fowler: Continuous Delivery","url":"https://martinfowler.com/bliki/ContinuousDelivery.html"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"docker","title":"Docker","category":"devops-infrastructure","difficulty":"beginner","aliases":["contenedores","container","Dockerfile"],"description":"Plataforma para construir, distribuir y ejecutar aplicaciones en contenedores, separadas de la infraestructura en la que corren.","technicalExplanation":"Una **imagen** es una plantilla inmutable con instrucciones para crear un contenedor, a menudo basada en otra imagen. Un **contenedor** es una instancia en ejecución, aislada de otros contenedores y del host, que se puede iniciar, detener o eliminar. Comparte el kernel del host, a diferencia de una máquina virtual.","problem":"Elimina el “en mi máquina funciona”: el mismo artefacto corre en desarrollo y producción. También sirve para aislar a un agente de tu sistema.","howItWorks":"Un `Dockerfile` define la imagen, `docker build` la construye y `docker run` crea el contenedor.","whenToUse":"Para empaquetar servicios, reproducir entornos y aislar la ejecución.","advantages":["Entornos reproducibles.","Arranque rápido comparado con una VM."],"limitations":["El aislamiento no es tan fuerte como el de una VM.","Imágenes grandes o con vulnerabilidades si no se cuidan."],"example":{"language":"dockerfile","filename":"Dockerfile","code":"FROM node:22-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nCMD [\"node\", \"server.js\"]"},"relatedConcepts":[{"id":"kubernetes","note":"Orquesta contenedores."},{"id":"dev-environments","note":"Base de entornos reproducibles."},{"id":"guardrails","note":"Aislar a un agente en un contenedor limita el daño."}],"prerequisites":[],"tools":["docker-tool"],"sources":[{"title":"Docker Docs: Docker overview","url":"https://docs.docker.com/get-started/docker-overview/"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"kubernetes","title":"Kubernetes","category":"devops-infrastructure","difficulty":"advanced","aliases":["k8s","orquestación de contenedores"],"description":"Plataforma de código abierto para orquestar contenedores: los despliega, los escala y los mantiene en el estado deseado.","technicalExplanation":"Google lo anunció en 2014, y la versión 1.0 llegó en julio de 2015, cuando se anunció también su donación a la recién creada CNCF. Funciona de forma declarativa: describes el estado deseado y sus controladores trabajan para alcanzarlo. Los **pods** son la unidad mínima.","problem":"Gestionar muchos contenedores a mano es inviable: hay que reiniciar los que fallan, repartir carga y desplegar sin cortes.","howItWorks":"Aplicas manifiestos, y el plano de control programa los pods en nodos y los reconcilia continuamente.","whenToUse":"Con muchos servicios y equipo de plataforma. Para una aplicación pequeña, suele ser excesivo.","advantages":["Autorreparación y escalado.","Modelo declarativo muy extendido."],"limitations":["Complejidad operativa alta.","Curva de aprendizaje empinada."],"example":{"language":"bash","filename":"terminal","code":"kubectl apply -f deployment.yaml\nkubectl rollout status deployment/web\nkubectl get pods"},"relatedConcepts":[{"id":"docker","note":"Ejecuta contenedores."},{"id":"microservices","note":"Suele ser su plataforma."},{"id":"deployment-strategies","note":"Facilita los despliegues graduales."}],"prerequisites":["docker"],"tools":["kubernetes-tool"],"sources":[{"title":"Kubernetes: Overview","url":"https://kubernetes.io/docs/concepts/overview/"},{"title":"Kubernetes: 10 Years of Kubernetes","url":"https://kubernetes.io/blog/2024/06/06/10-Years-of-Kubernetes/"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"terraform","title":"Terraform","category":"devops-infrastructure","difficulty":"intermediate","aliases":["HCL","OpenTofu"],"description":"Herramienta de HashiCorp para definir y crear infraestructura de forma declarativa mediante archivos de configuración.","technicalExplanation":"Se describe el estado deseado en HCL. `terraform plan` muestra los cambios y `terraform apply` los ejecuta. Un archivo de **estado** relaciona la configuración con los recursos reales. Los *providers* conectan con AWS y muchos otros servicios. Revisar el plan es especialmente importante si lo genera un agente.","problem":"Evita crear infraestructura a mano, de forma no reproducible y sin revisión.","howItWorks":"`init`, `plan`, `apply`. El estado se guarda de forma remota y con bloqueo en equipos.","whenToUse":"Para infraestructura que hay que reproducir, revisar o versionar.","advantages":["Plan previo revisable.","Funciona con muchos proveedores."],"limitations":["El archivo de estado es delicado y puede contener secretos.","Un `apply` erróneo puede destruir recursos."],"example":{"language":"hcl","filename":"main.tf","code":"resource \"aws_s3_bucket\" \"assets\" {\n  bucket = \"mi-app-assets\"\n}"},"relatedConcepts":[{"id":"infrastructure-as-code","note":"La práctica que implementa."},{"id":"aws","note":"Un proveedor habitual."}],"prerequisites":["infrastructure-as-code"],"tools":["terraform-tool"],"sources":[{"title":"HashiCorp: What is Terraform?","url":"https://developer.hashicorp.com/terraform/intro"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"infrastructure-as-code","title":"Infrastructure as Code","category":"devops-infrastructure","difficulty":"intermediate","aliases":["IaC","infraestructura como código"],"description":"Definir y gestionar la infraestructura mediante código versionado, en vez de hacerlo a mano.","technicalExplanation":"Aplica a la infraestructura las prácticas del software: control de versiones, revisión, pruebas y automatización. Puede ser declarativa (Terraform) o imperativa (scripts). Fowler señala como ventaja que permite aplicar a los servidores lo aprendido sobre calidad de software.","problem":"Los cambios manuales producen entornos diferentes, difíciles de reproducir y sin historial.","howItWorks":"El código describe los recursos, un pipeline o una persona aplica los cambios y Git guarda el historial.","whenToUse":"En cuanto la infraestructura deba reproducirse o la administre más de una persona.","advantages":["Reproducible y auditable.","Revisión antes de aplicar."],"limitations":["Los cambios manuales generan desviación (*drift*).","Curva de aprendizaje."],"example":{"text":"Crear un entorno de pruebas idéntico a producción se reduce a aplicar el mismo código con otras variables."},"relatedConcepts":[{"id":"terraform","note":"Herramienta popular."},{"id":"ci-cd","note":"El pipeline puede aplicarla."}],"prerequisites":[],"tools":[],"sources":[{"title":"Martin Fowler: Infrastructure As Code","url":"https://martinfowler.com/bliki/InfrastructureAsCode.html"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"jenkins","title":"Jenkins","category":"devops-infrastructure","difficulty":"intermediate","aliases":["Jenkinsfile"],"description":"Servidor de automatización de código abierto, muy usado para CI/CD, extensible mediante plugins.","technicalExplanation":"Los pipelines se pueden describir como código en un `Jenkinsfile`. Normalmente se autoaloja, lo que da control pero exige mantener el servidor, agentes de ejecución y plugins.","problem":"Automatiza compilación, pruebas y despliegue, incluso en entornos con requisitos especiales o sin nube.","howItWorks":"Un controlador programa trabajos, y los agentes de Jenkins los ejecutan por etapas.","whenToUse":"Si necesitas autoalojamiento y mucha personalización, o ya tienes inversión en él.","advantages":["Muy flexible.","Gran ecosistema de plugins."],"limitations":["Mantenimiento operativo.","Los plugins pueden causar incompatibilidades y riesgos."],"example":{"language":"text","filename":"Jenkinsfile","code":"pipeline {\n  agent any\n  stages {\n    stage('Test') {\n      steps { sh 'npm test' }\n    }\n  }\n}"},"relatedConcepts":[{"id":"ci-cd","note":"Su función."},{"id":"github-actions","note":"Alternativa integrada con GitHub."},{"id":"gitlab-ci","note":"Alternativa integrada con GitLab."}],"prerequisites":["ci-cd"],"tools":[],"sources":[{"title":"Jenkins User Documentation","url":"https://www.jenkins.io/doc/"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"gitlab-ci","title":"GitLab CI","category":"devops-infrastructure","difficulty":"intermediate","aliases":[".gitlab-ci.yml","GitLab CI/CD"],"description":"El sistema de CI/CD integrado en GitLab, que se configura con un archivo `.gitlab-ci.yml` en el repositorio.","technicalExplanation":"Un pipeline se compone de etapas y trabajos, ejecutados por *runners*, que pueden ser de GitLab o autoalojados. Está integrado con merge requests, registro de contenedores y entornos.","problem":"Evita mantener una herramienta de CI aparte si ya usas GitLab.","howItWorks":"Un push o merge request crea un pipeline según las reglas del archivo.","whenToUse":"Si tu código está en GitLab.","advantages":["Integración directa.","Configuración versionada."],"limitations":["Vinculado a la plataforma.","Pipelines complejos pueden ser difíciles de mantener."],"example":{"language":"yaml","filename":".gitlab-ci.yml","code":"test:\n  image: node:22\n  script:\n    - npm ci\n    - npm test"},"relatedConcepts":[{"id":"ci-cd","note":"Su función."},{"id":"github-actions","note":"Equivalente en GitHub."}],"prerequisites":["ci-cd"],"tools":[],"sources":[{"title":"GitLab Docs: CI/CD","url":"https://docs.gitlab.com/ci/"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"github-actions","title":"GitHub Actions","category":"devops-infrastructure","difficulty":"beginner","aliases":["workflow yaml",".github/workflows"],"description":"La plataforma de automatización de GitHub: ejecuta workflows definidos en YAML en respuesta a eventos del repositorio.","technicalExplanation":"Sus piezas, según la documentación: un **workflow** es un proceso automatizado en `.github/workflows`; un **event** lo dispara (push, PR, calendario, manual); un **job** es un grupo de pasos en un mismo **runner**; un **step** es un script o acción, y una **action** es código reutilizable. Los jobs se ejecutan en paralelo salvo que se declaren dependencias.","problem":"Automatiza CI/CD y otras tareas directamente junto al código.","howItWorks":"Un evento lanza el workflow, se asigna un runner, y cada paso se ejecuta en orden.","whenToUse":"Si tu código está en GitHub y no tienes requisitos que lo impidan.","advantages":["Integrado con PRs.","Gran catálogo de acciones."],"limitations":["Las acciones de terceros son una vía de ataque a la cadena de suministro: fíjalas a un commit.","Depurar en remoto es lento."],"example":{"language":"yaml","filename":".github/workflows/ci.yml","code":"name: CI\non: [pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm test"},"relatedConcepts":[{"id":"ci-cd","note":"Su función."},{"id":"pull-requests","note":"Disparador frecuente."},{"id":"automated-code-review","note":"Puede ejecutarla."}],"prerequisites":["ci-cd"],"tools":["github-actions-tool","claude-code"],"sources":[{"title":"GitHub Docs: Understanding GitHub Actions","url":"https://docs.github.com/en/actions/get-started/understand-github-actions"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"aws","title":"AWS","category":"devops-infrastructure","difficulty":"intermediate","aliases":["Amazon Web Services","EC2","S3","Lambda"],"description":"Amazon Web Services, una de las principales plataformas de nube, con servicios de cómputo, almacenamiento, bases de datos, redes e IA.","technicalExplanation":"Ejemplos conocidos son EC2 (máquinas virtuales), S3 (almacenamiento de objetos), Lambda (funciones sin servidor), RDS (bases de datos) e IAM (identidades y permisos). Sigue un modelo de **responsabilidad compartida**: AWS protege la nube, y tú lo que pones en ella.","problem":"Evita comprar y operar hardware propio, y permite escalar bajo demanda.","howItWorks":"Se crean recursos por consola, CLI, API o infraestructura como código, y se paga por uso.","whenToUse":"Si necesitas su catálogo y puedes asumir su complejidad. Valora alternativas más simples en proyectos pequeños.","advantages":["Catálogo muy amplio.","Presencia global."],"limitations":["Costes difíciles de prever.","IAM es complejo y un error puede exponer datos.","Dependencia del proveedor."],"example":{"text":"Una web estática puede servirse desde S3 con CDN, y su backend ejecutarse en Lambda, sin administrar servidores."},"relatedConcepts":[{"id":"cloud-computing","note":"Categoría a la que pertenece."},{"id":"terraform","note":"Forma habitual de gestionar sus recursos."}],"prerequisites":["cloud-computing"],"tools":[],"sources":[{"title":"AWS: What is AWS?","url":"https://aws.amazon.com/what-is-aws/"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"cloud-computing","title":"Cloud Computing","category":"devops-infrastructure","difficulty":"beginner","aliases":["nube","IaaS","PaaS","SaaS","cloud native"],"description":"Acceso por red y bajo demanda a recursos de computación compartidos, que se aprovisionan rápidamente y se pagan según su uso.","technicalExplanation":"La definición del NIST (SP 800-145) recoge cinco características: autoservicio bajo demanda, acceso amplio por red, recursos compartidos, elasticidad rápida y servicio medido; tres modelos de servicio: IaaS, PaaS y SaaS; y cuatro de despliegue: privada, comunitaria, pública e híbrida.","problem":"Sustituye una inversión inicial en infraestructura por gasto según el uso, y permite adaptarse a la demanda.","howItWorks":"El proveedor opera el hardware, y tú consumes servicios mediante API.","whenToUse":"Para cargas variables o cuando no quieres operar hardware. Con cargas muy estables y grandes, conviene comparar costes.","advantages":["Elasticidad.","Menor inversión inicial."],"limitations":["Costes que se descontrolan.","Dependencia del proveedor.","Exige configurar bien la seguridad."],"example":{"text":"Una tienda aumenta su capacidad en campañas y la reduce después, en vez de comprar servidores para el pico."},"relatedConcepts":[{"id":"aws","note":"Proveedor destacado."},{"id":"kubernetes","note":"Plataforma frecuente en nube."}],"prerequisites":[],"tools":[],"sources":[{"title":"NIST SP 800-145: The NIST Definition of Cloud Computing","url":"https://csrc.nist.gov/pubs/sp/800/145/final"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"monitoring","title":"Monitoring","category":"devops-infrastructure","difficulty":"beginner","aliases":["monitorización","golden signals","alertas"],"description":"Recoger y visualizar métricas de un sistema, y alertar cuando se sale de lo esperado.","technicalExplanation":"El libro de SRE de Google propone cuatro **señales de oro**: latencia, tráfico, errores y saturación. Recomienda que las alertas indiquen algo que requiere acción y que se centren en los síntomas que afectan a los usuarios.","problem":"Permite saber que algo va mal antes que los usuarios, y entender tendencias.","howItWorks":"Se instrumenta el sistema, se almacenan series temporales, se crean paneles y se definen alertas.","whenToUse":"En todo sistema en producción.","advantages":["Detección temprana.","Datos para planificar la capacidad."],"limitations":["El exceso de alertas genera fatiga.","Solo responde a preguntas anticipadas."],"example":{"text":"Alerta cuando más del 1% de las peticiones devuelve error durante cinco minutos, en vez de avisar por un pico puntual de CPU."},"relatedConcepts":[{"id":"observability","note":"Va más allá: permite investigar lo inesperado."},{"id":"deployment-strategies","note":"Las métricas guían un despliegue gradual."}],"prerequisites":[],"tools":[],"sources":[{"title":"Google SRE Book: Monitoring Distributed Systems","url":"https://sre.google/sre-book/monitoring-distributed-systems/"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"observability","title":"Observability","category":"devops-infrastructure","difficulty":"intermediate","aliases":["observabilidad","OpenTelemetry","trazas","logs"],"description":"La capacidad de entender el estado interno de un sistema a partir de los datos que emite, incluso ante problemas no previstos.","technicalExplanation":"Se apoya en señales como **trazas**, **métricas** y **logs**. OpenTelemetry es un estándar abierto para generarlas y recogerlas. Las trazas distribuidas siguen una petición entre servicios. En agentes, el *transcript* cumple un papel parecido: registra cada decisión y llamada a herramienta.","problem":"En sistemas distribuidos, los fallos son a menudo nuevos, y no basta con un panel preparado de antemano.","howItWorks":"Se instrumenta el código para emitir señales con contexto, y se exploran con herramientas que permiten filtrar y correlacionar.","whenToUse":"En sistemas distribuidos o de comportamiento difícil de prever, incluidos los agentes.","advantages":["Permite diagnosticar problemas nuevos.","Acelera la resolución de incidentes."],"limitations":["Instrumentar y almacenar tiene un coste.","Hay que cuidar que no se registren datos sensibles."],"example":{"text":"Un pedido tarda diez segundos. La traza muestra que nueve se van en una sola consulta del servicio de inventario."},"relatedConcepts":[{"id":"monitoring","note":"Complementaria."},{"id":"microservices","note":"Los hace depurables."},{"id":"agent-evaluation","note":"Las transcripciones son la observabilidad del agente."}],"prerequisites":["monitoring"],"tools":[],"sources":[{"title":"OpenTelemetry: Observability primer","url":"https://opentelemetry.io/docs/concepts/observability-primer/"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"deployment-strategies","title":"Deployment Strategies","category":"devops-infrastructure","difficulty":"intermediate","aliases":["blue-green","canary","rolling update","estrategias de despliegue"],"description":"Formas de publicar una versión nueva reduciendo el riesgo y el tiempo de indisponibilidad: rolling, blue-green y canary, entre otras.","technicalExplanation":"- **Rolling:** sustituye instancias poco a poco.\n- **Blue-green:** mantiene dos entornos y cambia el tráfico de uno a otro, lo que facilita volver atrás.\n- **Canary:** envía primero la nueva versión a un pequeño porcentaje de usuarios.\n- **Feature flags:** separan desplegar de activar.","problem":"Evita que un fallo afecte a todos los usuarios a la vez, y permite retroceder rápido.","howItWorks":"Se publica de forma gradual, se observan las métricas y se continúa o se revierte.","whenToUse":"Según el riesgo y la infraestructura. Las migraciones de base de datos requieren además compatibilidad entre versiones.","advantages":["Menor impacto de los fallos.","Retroceso rápido."],"limitations":["Dos versiones coexisten durante un tiempo.","Requiere automatización y buenas métricas."],"example":{"text":"Una versión llega al 5% del tráfico. Si la tasa de errores no sube en 30 minutos, se amplía al 25% y después al 100%."},"relatedConcepts":[{"id":"ci-cd","note":"El último paso del pipeline."},{"id":"monitoring","note":"Las métricas guían la decisión."},{"id":"kubernetes","note":"Incorpora actualizaciones rolling."}],"prerequisites":["ci-cd"],"tools":[],"sources":[{"title":"Martin Fowler: Blue Green Deployment","url":"https://martinfowler.com/bliki/BlueGreenDeployment.html"},{"title":"Danilo Sato: Canary Release","url":"https://martinfowler.com/bliki/CanaryRelease.html"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"unit-testing","title":"Unit Testing","category":"testing-quality","difficulty":"beginner","aliases":["tests unitarios","pruebas unitarias"],"description":"Pruebas pequeñas y rápidas que comprueban una unidad de código, como una función o clase, normalmente en aislamiento.","technicalExplanation":"Fowler observa que no hay una definición única de “unidad”. Lo común es que las pruebas sean pequeñas, rápidas y escritas por quien programa. Forman la base de la pirámide de tests. Para un agente son un sensor muy valioso: un resultado rápido e inequívoco.","problem":"Detecta regresiones en la lógica al instante y documenta el comportamiento esperado.","howItWorks":"Se prepara una entrada, se ejecuta la unidad y se comprueba el resultado.","whenToUse":"Para lógica con reglas o casos límite.","advantages":["Muy rápidos.","Localizan bien los errores."],"limitations":["No detectan fallos entre componentes.","Si se ligan a la implementación, frenan los refactors."],"example":{"language":"javascript","filename":"iva.test.js","code":"import test from 'node:test';\nimport assert from 'node:assert/strict';\nimport { conIva } from './iva.js';\n\ntest('añade el 21% de IVA', () => {\n  assert.equal(conIva(100), 121);\n});"},"relatedConcepts":[{"id":"integration-testing","note":"Siguiente nivel de la pirámide."},{"id":"tdd","note":"Forma de trabajo basada en ellos."},{"id":"regression-testing","note":"Parte de la red de regresión."}],"prerequisites":[],"tools":[],"sources":[{"title":"Martin Fowler: Unit Test","url":"https://martinfowler.com/bliki/UnitTest.html"},{"title":"Martin Fowler: Test Pyramid","url":"https://martinfowler.com/bliki/TestPyramid.html"},{"title":"Node.js: Test runner","url":"https://nodejs.org/api/test.html"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"integration-testing","title":"Integration Testing","category":"testing-quality","difficulty":"intermediate","aliases":["tests de integración"],"description":"Pruebas que comprueban que varios componentes funcionan bien juntos, como un servicio y su base de datos.","technicalExplanation":"Fowler advierte de que el término se usa con significados distintos: pruebas estrechas de un solo punto de integración, o amplias con muchos servicios reales. Conviene precisar su alcance en cada equipo.","problem":"Detecta errores que los tests unitarios no pueden ver: contratos, consultas, configuración o serialización.","howItWorks":"Se ejecutan componentes reales, a menudo con una base de datos en un contenedor y datos controlados.","whenToUse":"En las fronteras del sistema: base de datos, colas o APIs externas.","advantages":["Dan más confianza.","Detectan problemas de configuración."],"limitations":["Más lentos.","Pueden ser inestables si dependen de la red."],"example":{"text":"Un test levanta PostgreSQL en un contenedor, ejecuta las migraciones, guarda un pedido con el repositorio real y lo vuelve a leer."},"relatedConcepts":[{"id":"unit-testing","note":"Nivel inferior."},{"id":"e2e-testing","note":"Nivel superior."},{"id":"docker","note":"Facilita levantar dependencias."}],"prerequisites":["unit-testing"],"tools":[],"sources":[{"title":"Martin Fowler: Integration Test","url":"https://martinfowler.com/bliki/IntegrationTest.html"},{"title":"Martin Fowler: Test Pyramid","url":"https://martinfowler.com/bliki/TestPyramid.html"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"e2e-testing","title":"End-to-End Testing","category":"testing-quality","difficulty":"intermediate","aliases":["E2E","pruebas de extremo a extremo","Playwright"],"description":"Pruebas que ejercitan el sistema completo como lo haría un usuario, normalmente desde un navegador.","technicalExplanation":"Dan alta confianza en los flujos críticos, pero son las más lentas y frágiles. La pirámide de tests recomienda tener pocas, y dejar el grueso de las comprobaciones en niveles inferiores. Herramientas como Playwright automatizan navegadores reales y ayudan a un agente a comprobar la interfaz.","problem":"Comprueba lo que de verdad importa: que el usuario pueda completar una tarea.","howItWorks":"Se automatizan pasos en la interfaz y se comprueban los resultados visibles.","whenToUse":"En los pocos recorridos críticos, como registro o pago.","advantages":["Alta confianza.","Verifican todo el conjunto."],"limitations":["Lentas y a veces inestables.","Difícil localizar la causa de un fallo."],"example":{"language":"javascript","filename":"login.spec.js","code":"import { test, expect } from '@playwright/test';\n\ntest('inicia sesión', async ({ page }) => {\n  await page.goto('/login');\n  await page.getByLabel('Email').fill('ana@example.com');\n  await page.getByRole('button', { name: 'Entrar' }).click();\n  await expect(page.getByText('Bienvenida')).toBeVisible();\n});"},"relatedConcepts":[{"id":"integration-testing","note":"Nivel inferior."},{"id":"ai-generated-code-testing","note":"Valida el comportamiento real."}],"prerequisites":["unit-testing"],"tools":["playwright"],"sources":[{"title":"Playwright: Introduction","url":"https://playwright.dev/docs/intro"},{"title":"Martin Fowler: Test Pyramid","url":"https://martinfowler.com/bliki/TestPyramid.html"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"tdd","title":"TDD","category":"testing-quality","difficulty":"intermediate","aliases":["Test Driven Development","desarrollo guiado por pruebas","red green refactor"],"description":"Técnica en la que se escribe primero un test que falla, luego el código mínimo para pasarlo y después se refactoriza.","technicalExplanation":"El ciclo es **rojo, verde, refactor**. Kent Beck lo popularizó. Encaja bien con agentes: un test que falla ofrece un objetivo verificable, y confirmar que falla antes de arreglarlo demuestra que realmente detecta el problema.","problem":"Asegura que hay tests y un diseño orientado a su uso, y evita escribir código innecesario.","howItWorks":"Escribe un test, comprueba que falla, implementa lo mínimo, comprueba que pasa, mejora el código y repite.","whenToUse":"Con lógica clara y al corregir bugs. Es menos natural cuando exploras algo aún sin definir.","advantages":["Buena cobertura de forma natural.","Da confianza para refactorizar."],"limitations":["Requiere disciplina.","Un mal test fija un mal diseño."],"example":{"text":"Para un bug con un agente: “escribe un test que reproduzca el fallo, muéstrame que falla, corrige y confirma que pasa sin haber modificado el test”."},"relatedConcepts":[{"id":"unit-testing","note":"Su herramienta."},{"id":"bdd","note":"Variante centrada en el comportamiento."},{"id":"agentic-coding","note":"Da al agente un objetivo verificable."}],"prerequisites":["unit-testing"],"tools":[],"sources":[{"title":"Martin Fowler: Test Driven Development","url":"https://martinfowler.com/bliki/TestDrivenDevelopment.html"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"bdd","title":"BDD","category":"testing-quality","difficulty":"intermediate","aliases":["Behavior Driven Development","Gherkin","Cucumber"],"description":"Práctica que describe el comportamiento esperado con ejemplos concretos, en un lenguaje compartido por negocio y desarrollo.","technicalExplanation":"Surgió de TDD, y se centra en la conversación: descubrir ejemplos antes de programar. El formato *Given/When/Then* de Gherkin, usado por herramientas como Cucumber, permite convertir esos ejemplos en pruebas ejecutables. Usar Gherkin sin la colaboración pierde gran parte de su valor.","problem":"Evita malentendidos sobre qué debe hacer el sistema.","howItWorks":"Personas de negocio y técnicas acuerdan ejemplos, se formalizan y se automatizan.","whenToUse":"Cuando las reglas de negocio son complejas y hay acceso a sus expertos.","advantages":["Aclara requisitos.","Documentación ejecutable."],"limitations":["La capa de automatización tiene un coste.","Sin colaboración, solo añade burocracia."],"example":{"language":"text","filename":"descuento.feature","code":"Scenario: Descuento para clientes habituales\n  Given un cliente con más de 10 pedidos\n  When compra por 100 €\n  Then paga 90 €"},"relatedConcepts":[{"id":"tdd","note":"Su origen."},{"id":"spec-driven-development","note":"Idea afín: definir primero el comportamiento."}],"prerequisites":["tdd"],"tools":[],"sources":[{"title":"Cucumber: Behaviour-Driven Development","url":"https://cucumber.io/docs/bdd/"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"static-analysis","title":"Static Analysis","category":"testing-quality","difficulty":"beginner","aliases":["análisis estático","linter","ESLint","type checking"],"description":"Analizar el código sin ejecutarlo para detectar errores, problemas de estilo o vulnerabilidades.","technicalExplanation":"Incluye linters, comprobadores de tipos y escáneres de seguridad. Para los agentes es uno de los mejores sensores: rápido, determinista, y su mensaje puede indicar cómo corregir el problema. Según la terminología de Böckeler, es un sensor computacional del harness.","problem":"Detecta clases enteras de errores antes de ejecutar el código, y aplica convenciones automáticamente.","howItWorks":"La herramienta analiza el árbol sintáctico o los tipos, y aplica reglas. Se ejecuta en el editor, en hooks y en CI.","whenToUse":"En todo proyecto, desde el inicio.","advantages":["Rápido y barato.","Aplica reglas sin discusiones."],"limitations":["Falsos positivos.","No detecta errores de lógica de negocio."],"example":{"language":"bash","filename":"terminal","code":"npx eslint src --fix\nnpx tsc --noEmit"},"relatedConcepts":[{"id":"code-quality","note":"Una forma de medirla."},{"id":"harness-engineering","note":"Sensor computacional."},{"id":"hooks","note":"Se puede ejecutar tras cada edición."}],"prerequisites":[],"tools":["eslint"],"sources":[{"title":"ESLint: Documentation","url":"https://eslint.org/docs/latest/"},{"title":"Birgitta Böckeler: Harness engineering for coding agent users","url":"https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html","note":"martinfowler.com, 2 de abril de 2026"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"code-quality","title":"Code Quality","category":"testing-quality","difficulty":"beginner","aliases":["calidad de código","deuda técnica","mantenibilidad"],"description":"El grado en que el código es correcto, legible, mantenible y fácil de cambiar. No se reduce a una sola métrica.","technicalExplanation":"Algunas propiedades son medibles (complejidad, duplicación, cobertura), pero las métricas son indicadores, no objetivos en sí mismos. Una cobertura alta no garantiza buenos tests. Con código generado por IA, el riesgo típico es la acumulación de código que funciona pero añade complejidad innecesaria.","problem":"La mala calidad frena cada cambio futuro y aumenta los errores.","howItWorks":"Se combinan revisión, herramientas automáticas, refactorización continua y convenciones del equipo.","whenToUse":"Siempre, ajustando la exigencia a la vida prevista del código.","advantages":["Cambios más rápidos a largo plazo.","Menos defectos."],"limitations":["Las métricas pueden manipularse.","El perfeccionismo también tiene un coste."],"example":{"text":"Un PR añade una abstracción que solo se usa una vez. Pasa todos los tests, pero la revisión pide simplificarla: la calidad no se ve solo en los resultados."},"relatedConcepts":[{"id":"static-analysis","note":"Herramienta de medida."},{"id":"code-reviews","note":"Detecta lo que las métricas no ven."},{"id":"automated-code-review","note":"Añade otra capa."}],"prerequisites":[],"tools":["sonarqube"],"sources":[{"title":"SonarQube: Documentation","url":"https://docs.sonarsource.com/sonarqube-server/latest/"},{"title":"Google Engineering Practices: Code Review","url":"https://google.github.io/eng-practices/review/"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"ai-generated-code-testing","title":"AI-generated Code Testing","category":"testing-quality","difficulty":"intermediate","aliases":["probar código generado por IA","verificación"],"description":"Cómo verificar código generado por IA, que puede parecer correcto, compilar e incluso pasar tests, y aun así no hacer lo que se necesita.","technicalExplanation":"La generación automatizada no elimina la necesidad de verificar, la desplaza. Hay riesgos particulares:\n\n- **Tests que validan el error:** si el mismo agente escribe código y tests, ambos pueden compartir la misma idea equivocada.\n- **Tests debilitados:** para “hacerlos pasar”, un agente puede relajar una aserción o eliminar el test.\n- **Dependencias inventadas:** puede referirse a paquetes o APIs inexistentes.\n\nBöckeler señala que los tests generados por IA aún no son fiables para reducir la supervisión humana del comportamiento. La documentación de buenas prácticas de Claude Code insiste en dar al agente una forma de comprobar su trabajo.","problem":"El código plausible es lo más peligroso: el fallo no se ve a simple vista, y el volumen dificulta revisarlo todo.","howItWorks":"- Escribe o revisa tú los tests clave, antes de la implementación si puedes.\n- Confirma que el test falla sin el arreglo.\n- Vigila los cambios en archivos de test dentro del diff.\n- Usa una revisión separada, con contexto limpio.\n- Comprueba el comportamiento real, no solo los tests.","whenToUse":"En todo código generado que vaya a usarse de verdad, con más rigor cuanto mayor sea el riesgo.","advantages":["Reduce errores plausibles.","Permite delegar con más confianza."],"limitations":["Exige tiempo y criterio.","Ninguna técnica sustituye a entender qué debe hacer el sistema."],"example":{"text":"En la revisión de un agente, `git diff --stat tests/` es una comprobación rápida: si se ha modificado un test ya existente para hacer pasar la solución, hay que entender por qué."},"relatedConcepts":[{"id":"agent-evaluation","note":"Evalúa al agente; esto, al código."},{"id":"tdd","note":"Fijar el test antes reduce el riesgo."},{"id":"code-reviews","note":"Sigue siendo necesaria."},{"id":"harness-engineering","note":"Los sensores automatizan parte de esto."}],"prerequisites":["unit-testing"],"tools":["claude-code","playwright"],"sources":[{"title":"Birgitta Böckeler: Harness engineering for coding agent users","url":"https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html","note":"martinfowler.com, 2 de abril de 2026"},{"title":"Claude Code: Best practices","url":"https://code.claude.com/docs/en/best-practices"},{"title":"Anthropic: Effective harnesses for long-running agents","url":"https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"regression-testing","title":"Regression Testing","category":"testing-quality","difficulty":"beginner","aliases":["pruebas de regresión","regresión"],"description":"Volver a ejecutar pruebas para confirmar que lo que ya funcionaba sigue funcionando tras un cambio.","technicalExplanation":"Más que un tipo de prueba, es un uso de ellas: una suite automática que se ejecuta en cada cambio. Un buen hábito es que cada bug corregido deje un test que impida que vuelva. Las evals de regresión aplican esta idea a los agentes.","problem":"Sin esta red, cada cambio puede romper algo lejano sin que nadie lo note.","howItWorks":"Se ejecuta la suite en CI en cada PR, y se añade un test por cada fallo encontrado.","whenToUse":"Siempre. Si la suite completa es lenta, ejecuta un subconjunto en cada PR y la completa más tarde.","advantages":["Permite cambiar con confianza.","Previene errores repetidos."],"limitations":["Los tests inestables minan la confianza.","Una suite lenta se termina ignorando."],"example":{"text":"Tras corregir el bug #142, se añade `tests/regression/issue-142.test.js`. Ya no puede volver a aparecer sin que CI lo detecte."},"relatedConcepts":[{"id":"ci-cd","note":"Donde se ejecutan."},{"id":"agent-evaluation","note":"Evals de regresión."},{"id":"unit-testing","note":"Su base habitual."}],"prerequisites":["unit-testing"],"tools":[],"sources":[{"title":"Martin Fowler: Test Pyramid","url":"https://martinfowler.com/bliki/TestPyramid.html"},{"title":"Anthropic: Demystifying evals for AI agents","url":"https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"automated-code-review","title":"Automated Code Review","category":"testing-quality","difficulty":"intermediate","aliases":["revisión automática","AI code review"],"description":"Herramientas, incluidos modelos de IA, que analizan un cambio y comentan posibles problemas antes o junto con la revisión humana.","technicalExplanation":"Tiene dos familias: **deterministas** (linters y escáneres, con reglas fijas) e **inferenciales** (un modelo analiza el diff). Las segundas pueden detectar problemas semánticos, pero pueden generar falsos positivos y pasar por alto errores. Ejemplos: Copilot code review, Claude Code en GitHub Actions o GitHub Code Review. Un agente revisor con contexto limpio evita el sesgo de quien escribió el código.","problem":"La revisión humana no escala con el volumen de código que producen los agentes.","howItWorks":"En cada PR se ejecuta la revisión, se publican comentarios y una persona decide.","whenToUse":"Como primera pasada que libera a las personas de lo mecánico. No debería ser la única barrera en cambios de riesgo.","advantages":["Inmediata y siempre disponible.","Detecta errores comunes."],"limitations":["Los falsos positivos generan ruido y se acaban ignorando.","Puede dar una falsa sensación de seguridad."],"example":{"text":"Un workflow lanza un agente de solo lectura sobre cada PR. Su instrucción pide informar solo de errores con un escenario concreto de fallo, para reducir el ruido."},"relatedConcepts":[{"id":"code-reviews","note":"La complementa."},{"id":"static-analysis","note":"Su vertiente determinista."},{"id":"github-actions","note":"Punto habitual de ejecución."},{"id":"subagents","note":"Un revisor de solo lectura es un subagente típico."}],"prerequisites":["code-reviews"],"tools":["claude-code","github-copilot","sonarqube"],"sources":[{"title":"GitHub Docs: What is GitHub Copilot?","url":"https://docs.github.com/en/copilot/get-started/what-is-github-copilot"},{"title":"Claude Code: overview","url":"https://code.claude.com/docs/en/overview"},{"title":"Birgitta Böckeler: Harness engineering for coding agent users","url":"https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html","note":"martinfowler.com, 2 de abril de 2026"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"ides","title":"IDEs","category":"tools-platforms","difficulty":"beginner","aliases":["entorno de desarrollo integrado","IntelliJ","Visual Studio"],"description":"Entornos de desarrollo integrados: reúnen edición, compilación, depuración, refactorización y navegación del código en una sola aplicación.","technicalExplanation":"Su valor está en comprender el código: análisis semántico, refactorizaciones fiables y depurador. La frontera con los editores se ha difuminado por las extensiones y por protocolos como LSP. Hoy muchos incorporan agentes, o se construyen en torno a ellos.","problem":"Evita saltar entre herramientas, y ofrece ayuda basada en una comprensión profunda del lenguaje.","howItWorks":"Indexan el proyecto y ofrecen navegación, comprobaciones y depuración.","whenToUse":"En proyectos grandes o lenguajes con buen soporte, como Java o C#.","advantages":["Refactorización y depuración potentes."],"limitations":["Más pesados.","Curva de aprendizaje de sus funciones."],"example":{"text":"“Renombrar símbolo” en un IDE actualiza las referencias entendiendo el código, algo más fiable que buscar y reemplazar texto."},"relatedConcepts":[{"id":"code-editors","note":"Categoría cercana."},{"id":"ai-coding-assistants","note":"Se integran en ellos."},{"id":"terminal-agents","note":"Alternativa de interfaz."}],"prerequisites":[],"tools":["cursor","windsurf"],"sources":[{"title":"Visual Studio Code: Documentation","url":"https://code.visualstudio.com/docs"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"code-editors","title":"Code Editors","category":"tools-platforms","difficulty":"beginner","aliases":["editores de código","VS Code","Neovim","Zed"],"description":"Aplicaciones ligeras para editar código, ampliables con extensiones, como VS Code, Neovim o Zed.","technicalExplanation":"Se apoyan en extensiones y servidores de lenguaje (LSP) para acercarse a la funcionalidad de un IDE. Varias herramientas de IA, como Cursor, se han construido a partir de VS Code, y agentes como Cline se instalan como extensión.","problem":"Ofrece una edición rápida y adaptable sin la carga de un IDE completo.","howItWorks":"El núcleo edita texto, y las extensiones añaden lenguajes, depuración y agentes.","whenToUse":"Para trabajar con varios lenguajes o si prefieres un entorno ligero.","advantages":["Rápidos y personalizables.","Gran ecosistema."],"limitations":["La calidad depende de las extensiones.","Las extensiones pueden suponer un riesgo de seguridad."],"example":{"text":"Abres un repositorio en VS Code, añades las extensiones del lenguaje y de tu agente, y tienes el entorno listo."},"relatedConcepts":[{"id":"ides","note":"Categoría cercana."},{"id":"dev-environments","note":"Parte del entorno."}],"prerequisites":[],"tools":["cursor","cline"],"sources":[{"title":"Visual Studio Code: Documentation","url":"https://code.visualstudio.com/docs"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"terminal-agents","title":"Terminal Agents","category":"tools-platforms","difficulty":"intermediate","aliases":["agentes de terminal","CLI agents","terminal coding agents"],"description":"Agentes de código que se usan desde la línea de comandos, como Claude Code, Codex CLI, Gemini CLI, Aider o Copilot CLI.","technicalExplanation":"Trabajan directamente con los archivos del directorio actual y con tus herramientas: git, tests, compiladores. Al ser programas de terminal, se integran bien con scripts y CI, y se pueden encadenar con otros comandos. Claude Code, por ejemplo, admite `claude -p` para ejecuciones no interactivas.","problem":"Llevan el agente al entorno donde ya están tus herramientas, sin depender de un editor concreto.","howItWorks":"Se lanza el comando en un repositorio, y el agente lee, edita y ejecuta, pidiendo permiso según su configuración.","whenToUse":"Si trabajas a menudo en terminal, quieres automatizar o usar varios agentes en paralelo con worktrees.","advantages":["Independientes del editor.","Fáciles de automatizar."],"limitations":["Revisar diffs es menos cómodo sin interfaz gráfica.","Acceso potente a tu sistema: cuida los permisos."],"example":{"language":"bash","filename":"terminal","code":"git diff main --name-only | claude -p \"Revisa estos archivos en busca de errores de seguridad\"","explanation":"Ejemplo basado en la documentación de Claude Code."},"relatedConcepts":[{"id":"ai-coding-assistants","note":"Categoría más amplia."},{"id":"parallel-agent-development","note":"Se combinan bien con worktrees."},{"id":"ci-cd","note":"Se pueden ejecutar en pipelines."}],"prerequisites":[],"tools":["claude-code","openai-codex","gemini-cli","aider","cline","github-copilot"],"sources":[{"title":"Claude Code: overview","url":"https://code.claude.com/docs/en/overview"},{"title":"Gemini CLI: Documentation","url":"https://geminicli.com/docs/"},{"title":"Aider: Documentation","url":"https://aider.chat/docs/"},{"title":"GitHub Docs: About GitHub Copilot CLI","url":"https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli"},{"title":"Cline: Documentation","url":"https://docs.cline.bot/"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"ai-coding-assistants","title":"AI Coding Assistants","category":"tools-platforms","difficulty":"beginner","aliases":["asistentes de código"],"description":"Herramientas que ayudan a programar con modelos de IA, mediante sugerencias, chat o modos de agente dentro del entorno de desarrollo.","technicalExplanation":"Es una categoría amplia y cambiante. GitHub Copilot la popularizó con sugerencias en línea, y hoy la mayoría de productos combina autocompletado, chat y agentes. Las capacidades dependen del plan y de la versión, por lo que conviene consultar las fichas y su fecha de verificación.","problem":"Reduce el trabajo repetitivo y acerca la información al lugar donde se escribe código.","howItWorks":"Se integran en el editor o la terminal, reúnen contexto del proyecto y llaman a un modelo.","whenToUse":"Prácticamente en cualquier flujo; revisa las políticas de privacidad de tu organización.","advantages":["Mejora el flujo de trabajo diario.","Barrera de entrada baja."],"limitations":["Sugerencias plausibles pero incorrectas.","Cuestiones de privacidad y licencias."],"example":{"text":"Escribes el nombre de una función y un comentario, y el asistente propone una implementación que revisas y aceptas o rechazas."},"relatedConcepts":[{"id":"assistants-vs-agents","note":"Distingue los modos de trabajo."},{"id":"terminal-agents","note":"Una variante."},{"id":"ai-assisted-development","note":"La práctica."}],"prerequisites":[],"tools":["github-copilot","cursor","cline","windsurf"],"sources":[{"title":"GitHub Docs: What is GitHub Copilot?","url":"https://docs.github.com/en/copilot/get-started/what-is-github-copilot"},{"title":"GitHub Blog: Copilot is generally available","url":"https://github.blog/2022-06-21-github-copilot-is-generally-available-to-all-developers/","note":"21 de junio de 2022"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"mcp-servers","title":"MCP Servers","category":"tools-platforms","difficulty":"intermediate","aliases":["servidores MCP"],"description":"Programas que exponen herramientas, datos y plantillas a aplicaciones de IA mediante el protocolo MCP.","technicalExplanation":"Un servidor puede ser un proceso local, por stdio, o un servicio remoto, por Streamable HTTP. Expone **tools**, **resources** y **prompts**. La especificación insiste en que cada servidor se centre en una responsabilidad y en que no pueda leer toda la conversación. Como es código con acceso a tus sistemas, conviene evaluarlo como cualquier dependencia.","problem":"Encapsula el acceso a un sistema en un componente reutilizable por varios clientes.","howItWorks":"Se configura en el cliente, por ejemplo con `.mcp.json` o `claude mcp add`, y sus herramientas pasan a estar disponibles para el agente.","whenToUse":"Cuando el agente necesita un sistema al que no llega de otra forma. Instala solo los que uses.","advantages":["Reutilizable entre clientes.","Encapsula autenticación y detalles."],"limitations":["Riesgo de seguridad si es de terceros.","Sus definiciones consumen contexto."],"example":{"language":"bash","filename":"terminal","code":"claude mcp add --transport http notion https://mcp.notion.com/mcp\nclaude mcp list"},"relatedConcepts":[{"id":"mcp","note":"El protocolo."},{"id":"tools-agent","note":"Lo que aportan al agente."},{"id":"permissions","note":"Hay que controlar qué pueden hacer."}],"prerequisites":["mcp"],"tools":["claude-code","mcp-inspector","cline"],"sources":[{"title":"MCP Specification 2026-07-28: Architecture","url":"https://modelcontextprotocol.io/specification/2026-07-28/architecture"},{"title":"Claude Code: MCP","url":"https://code.claude.com/docs/en/mcp"},{"title":"Cline: MCP overview","url":"https://docs.cline.bot/mcp/mcp-overview"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"model-providers","title":"Model Providers","category":"tools-platforms","difficulty":"beginner","aliases":["proveedores de modelos","LLM providers","Anthropic","OpenAI","Google"],"description":"Las empresas y plataformas que ofrecen modelos de lenguaje por API, como Anthropic, OpenAI o Google, y las opciones para ejecutarlos localmente.","technicalExplanation":"Algunos agentes están vinculados a un proveedor, y otros, como Aider o Cline, permiten elegir entre muchos, incluidos modelos locales con Ollama o LM Studio. Elegir es un equilibrio entre calidad, coste, latencia, tamaño de contexto y privacidad. El sector cambia tan rápido que comparativas y precios caducan pronto, por lo que esta ficha no los recoge.","problem":"Hace falta decidir qué modelo usar según la tarea, el coste y las restricciones de datos.","howItWorks":"Se accede por API con una clave o mediante una suscripción de la herramienta.","whenToUse":"Al configurar una herramienta. Compara con tus propias tareas, no solo con rankings públicos.","advantages":["Permite elegir según la necesidad."],"limitations":["Información que caduca pronto.","Cada proveedor tiene sus propias políticas de datos."],"example":{"text":"Un equipo usa un modelo potente para planificar y uno más barato para búsquedas de subagentes, una opción que permite el campo `model` en Claude Code."},"relatedConcepts":[{"id":"ai-agents","note":"El modelo es el componente que decide."},{"id":"agent-evaluation","note":"Permite compararlos con datos propios."}],"prerequisites":[],"tools":["aider","cline"],"sources":[{"title":"Aider: Documentation","url":"https://aider.chat/docs/"},{"title":"Cline: Documentation","url":"https://docs.cline.bot/"},{"title":"Claude Code: Subagents","url":"https://code.claude.com/docs/en/sub-agents"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"dev-environments","title":"Development Environments","category":"tools-platforms","difficulty":"intermediate","aliases":["entornos de desarrollo","dev containers","sandbox"],"description":"El conjunto de herramientas, dependencias y configuración necesarios para trabajar en un proyecto, de forma local, en un contenedor o en la nube.","technicalExplanation":"Un entorno reproducible evita el “en mi máquina funciona”, y también facilita a un agente verificar su trabajo. Opciones habituales: gestores de versiones, Dev Containers y entornos en la nube. Con agentes en paralelo, cada [[git-worktrees|worktree]] necesita sus dependencias y sus puertos, un detalle que suele olvidarse.","problem":"Sin un entorno definido, incorporarse lleva días, y un agente no puede ejecutar los tests que necesita para comprobarse.","howItWorks":"Se describe en código, como un `devcontainer.json`, y se recrea de forma automática.","whenToUse":"En cualquier proyecto en equipo, y sobre todo si lo van a usar agentes autónomos.","advantages":["Incorporación rápida.","Aislamiento y reproducibilidad."],"limitations":["Mantenimiento de la definición.","Rendimiento en contenedores según el sistema."],"example":{"language":"json","filename":".devcontainer/devcontainer.json","code":"{\n  \"image\": \"mcr.microsoft.com/devcontainers/javascript-node:22\",\n  \"postCreateCommand\": \"npm ci\"\n}"},"relatedConcepts":[{"id":"docker","note":"Base de muchos entornos."},{"id":"git-worktrees","note":"Cada uno necesita su entorno."},{"id":"guardrails","note":"Un entorno aislado limita el daño."}],"prerequisites":[],"tools":[],"sources":[{"title":"Development Containers","url":"https://containers.dev/"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"}],"examples":[{"id":"agents-md-monorepo","title":"AGENTS.md para un monorepo","topic":"AGENTS.md","objective":"Dar a cualquier agente de código las instrucciones mínimas para trabajar en un monorepo, con reglas específicas para un paquete.","context":"Un monorepo con frontend y API. El equipo usa más de una herramienta, así que no quiere mantener un archivo de instrucciones por producto.","implementation":"Coloca un archivo breve en la raíz y otro más específico en cada paquete que lo necesite. Incluye solo lo que el agente no puede deducir del código y lo que no comprueba ya una herramienta.","files":[{"path":"AGENTS.md","language":"markdown","code":"# Instrucciones para agentes\n\n## Estructura\n- `packages/web`: frontend en React.\n- `packages/api`: API en Node.js. Tiene su propio AGENTS.md.\n\n## Comandos\n- Instalar: `pnpm install`\n- Tests de un paquete: `pnpm --filter <paquete> test`\n- Lint: `pnpm lint`\n\n## Antes de terminar\n- Ejecuta los tests de los paquetes que hayas modificado.\n- No edites `pnpm-lock.yaml` a mano; regenéralo con `pnpm install`.\n\n## Pull requests\n- Título: `[paquete] descripción`.\n- Explica en la descripción cómo has probado el cambio."},{"path":"packages/api/AGENTS.md","language":"markdown","code":"# API\n\n- Las migraciones van en `migrations/` y nunca se editan una vez fusionadas.\n- Los tests de integración necesitan Docker en marcha: `pnpm test:integration`.\n- Las rutas no acceden a la base de datos: usan servicios de `src/services`."}],"parts":[{"label":"Estructura","text":"Un mapa breve evita que el agente gaste contexto explorando."},{"label":"Comandos","text":"Es lo más valioso: comandos exactos, que el agente puede ejecutar para comprobar su trabajo."},{"label":"Antes de terminar","text":"Define qué significa “terminado”. Recuerda que es una instrucción, no una garantía."},{"label":"packages/api/AGENTS.md","text":"Según agents.md, los agentes leen el archivo más cercano en el árbol de directorios, y ese tiene prioridad. El grado de soporte varía según la herramienta."}],"expected":"Un agente que trabaja en `packages/api` conoce los comandos, sabe que debe ejecutar los tests y respeta la regla de las migraciones sin que nadie se lo repita.","whenToUse":"En cualquier repositorio donde se usen agentes, sobre todo si el equipo utiliza varias herramientas.","limitations":["No se hace cumplir: lo crítico debe ir también en un hook o en CI.","En Claude Code, si hay un `CLAUDE.md`, este tiene prioridad salvo que importe `AGENTS.md`.","Hay que mantenerlo al día cuando cambien los comandos."],"concepts":["agents-md","claude-md","context-engineering"],"sources":[{"title":"AGENTS.md","url":"https://agents.md/","note":"Sitio oficial del formato"},{"title":"Claude Code: How Claude remembers your project","url":"https://code.claude.com/docs/en/memory"}],"status":"verified","lastVerified":"2026-11-05"},{"id":"skill-release-notes","title":"Skill para redactar notas de versión","topic":"Skills","objective":"Empaquetar un procedimiento repetible que solo se cargue cuando alguien lo pida.","context":"Cada versión requiere resumir los commits con el formato del equipo. Son demasiadas instrucciones para llevarlas en `AGENTS.md`, y solo se usan de vez en cuando.","implementation":"Crea un directorio de skill con su `SKILL.md`. El comando entre `!` y comillas invertidas se ejecuta antes de que el modelo vea la skill, y su salida ocupa ese lugar. Al escribir un archivo, se puede dejar que el modelo la active o reservarla para invocación manual.","files":[{"path":".claude/skills/release-notes/SKILL.md","language":"markdown","code":"---\ndescription: Redacta notas de versión a partir de los commits desde la última etiqueta. Úsala cuando pidan notas de versión o un changelog.\ndisable-model-invocation: true\nallowed-tools: Bash(git log *), Bash(git describe *)\n---\n\n## Commits desde la última etiqueta\n\n!`git log $(git describe --tags --abbrev=0)..HEAD --oneline`\n\n## Instrucciones\n\n1. Agrupa los cambios en: Novedades, Correcciones y Otros.\n2. Redacta para personas usuarias: explica el efecto, no el detalle interno.\n3. Omite los commits que solo afecten a tests o a formato.\n4. Si no ves claro un cambio, indícalo en lugar de suponer qué hace."}],"parts":[{"label":"description","text":"Es lo único que se ve hasta invocar la skill. De ella depende que se active en el momento adecuado."},{"label":"disable-model-invocation","text":"Solo tú la lanzas, con `/release-notes`. Conviene si no quieres que se ejecute por iniciativa del modelo."},{"label":"allowed-tools","text":"Herramientas que se pueden usar sin pedir permiso durante el turno en que se invoca la skill."},{"label":"!`git log …`","text":"Inyección de comando: el modelo recibe la salida, no el comando, por lo que parte de datos reales en vez de suponerlos."},{"label":"Instrucciones","text":"Están redactadas como reglas permanentes. Claude no vuelve a leer el archivo en turnos posteriores."}],"expected":"Al escribir `/release-notes`, Claude Code recibe los commits reales y devuelve unas notas agrupadas con el formato del equipo.","whenToUse":"Con procedimientos de varios pasos que se repiten pero no se usan en cada sesión. Si tiene efectos secundarios, reserva su invocación para personas.","limitations":["Necesita al menos una etiqueta de Git; si no, `git describe` falla.","Fuera de Claude Code, campos como `disable-model-invocation` no son portables.","Una vez cargada, sigue ocupando contexto en esa sesión."],"concepts":["skills","context-engineering","workflows"],"sources":[{"title":"Claude Code: Skills","url":"https://code.claude.com/docs/en/skills"}],"status":"verified","lastVerified":"2026-11-05"},{"id":"subagent-reviewer","title":"Subagente revisor de solo lectura","topic":"Subagents","objective":"Revisar cambios con una mirada independiente y con la garantía de que el revisor no puede modificar nada.","context":"Quien acaba de escribir un código tiende a validarlo. Un agente con contexto limpio, que no ha visto cómo se escribió, puede encontrar otros problemas. La documentación de Claude Code advierte de que un revisor al que se le pide buscar problemas siempre encontrará algo, así que conviene orientarlo a fallos reales.","implementation":"Define el subagente con una lista cerrada de herramientas. Claude Code aplica ese límite: no es una petición en un prompt. Pídele después que revise el diff actual.","files":[{"path":".claude/agents/reviewer.md","language":"markdown","code":"---\nname: reviewer\ndescription: Revisa los cambios en busca de errores reales. Úsalo después de implementar un cambio y antes de abrir un PR.\ntools: Read, Grep, Glob\nmodel: sonnet\n---\n\nEres un revisor de código. No has participado en la implementación.\n\nRevisa solo lo que te indiquen y comunica únicamente problemas que puedan\nprovocar un fallo. Omite las cuestiones de estilo y las preferencias.\n\nPor cada hallazgo indica:\n- Archivo y línea.\n- Un escenario concreto en el que falla.\n- Cómo lo has comprobado.\n\nSi no encuentras nada, dilo: no inventes hallazgos para justificar la revisión."},{"path":"prompt","language":"text","code":"Usa el subagente reviewer para revisar los archivos que devuelve\n\"git diff main --name-only\". Te paso el objetivo del cambio:\nevitar que un carrito vacío genere un error 500 en /orders."}],"parts":[{"label":"name / description","text":"Son los únicos campos obligatorios. El agente principal usa `description` para decidir cuándo delegar."},{"label":"tools","text":"Lista permitida. Sin `Edit`, `Write` ni `Bash`, no puede modificar archivos. Sin `Bash` tampoco puede lanzar `git diff`, y por eso el encargo le indica qué revisar."},{"label":"model","text":"Permite elegir un modelo según el coste de la tarea."},{"label":"prompt del sistema","text":"El cuerpo del archivo. Pedir un escenario de fallo reduce los falsos positivos."},{"label":"encargo","text":"El subagente no ve la conversación: hay que darle el objetivo y el alcance."}],"expected":"El subagente devuelve una lista corta de hallazgos con archivo, línea y escenario, o indica que no encuentra problemas. Los resultados intermedios no llenan el contexto principal.","whenToUse":"Antes de abrir un PR, en cambios de cierto riesgo o cuando el agente principal lleva una sesión larga con ese código.","limitations":["No sustituye a los tests ni a la revisión humana.","Sin `Bash` no puede ejecutar tests para confirmar sus hipótesis; añadirlo amplía sus permisos.","Añade coste en tokens."],"concepts":["subagents","automated-code-review","code-reviews","permissions"],"sources":[{"title":"Claude Code: Subagents","url":"https://code.claude.com/docs/en/sub-agents"},{"title":"Claude Code: Best practices","url":"https://code.claude.com/docs/en/best-practices"}],"status":"verified","lastVerified":"2026-11-05"},{"id":"mcp-project-config","title":"Configuración MCP compartida por el equipo","topic":"MCP","objective":"Conectar un servidor MCP remoto y uno local para todo el equipo, sin escribir credenciales en el repositorio.","context":"El equipo quiere que el agente consulte una base de datos de desarrollo y un servicio remoto. Claude Code lee `.mcp.json` en la raíz del proyecto, y ese archivo se puede versionar.","implementation":"Declara los servidores en `.mcp.json` y usa expansión de variables de entorno para los secretos. Cada persona define esas variables en su entorno. Los URL de ejemplo deben sustituirse por los de tus servidores.","files":[{"path":".mcp.json","language":"json","code":"{\n  \"mcpServers\": {\n    \"docs\": {\n      \"type\": \"http\",\n      \"url\": \"https://mcp.example.com/mcp\",\n      \"headers\": { \"Authorization\": \"Bearer ${DOCS_TOKEN}\" }\n    },\n    \"database-tools\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"@bytebase/dbhub\", \"--dsn\", \"${DB_URL}\"]\n    }\n  }\n}"},{"path":"terminal","language":"bash","code":"# Alternativa: añadirlo por CLI con ámbito de proyecto\nclaude mcp add --transport http docs --scope project https://mcp.example.com/mcp\n\n# Comprobar\nclaude mcp list"}],"parts":[{"label":"\"type\": \"http\"","text":"Transporte recomendado para servidores remotos. Si hay `url` pero no `type`, Claude Code lo trata como error de configuración y lo omite."},{"label":"${DOCS_TOKEN}","text":"Se expande desde el entorno. Admite también `${VAR:-valor}`. Así, el secreto no llega al repositorio."},{"label":"\"command\" / \"args\"","text":"Servidor local por stdio: el cliente lanza el proceso. `npx -y` descarga y ejecuta un paquete, por lo que debes confiar en él."},{"label":"--scope project","text":"Guarda la configuración en `.mcp.json`. Los ámbitos son `local` (por defecto), `project` y `user`."}],"expected":"Dentro de una sesión, `/mcp` muestra ambos servidores conectados, y sus herramientas están disponibles para el agente.","whenToUse":"Cuando todo el equipo necesita las mismas integraciones. Para credenciales o herramientas personales, usa el ámbito `user` o `local`.","limitations":["Un servidor de terceros es código con acceso a tus sistemas: revísalo antes.","Cada servidor añade definiciones que consumen contexto.","El contenido devuelto puede contener inyecciones de prompt.","Da al servidor credenciales de mínimo privilegio, por ejemplo de solo lectura."],"concepts":["mcp","mcp-servers","permissions"],"sources":[{"title":"Claude Code: MCP","url":"https://code.claude.com/docs/en/mcp"},{"title":"MCP Specification 2026-07-28: Architecture","url":"https://modelcontextprotocol.io/specification/2026-07-28/architecture"}],"status":"verified","lastVerified":"2026-11-05"},{"id":"persistent-memory-layers","title":"Memoria persistente por capas","topic":"Persistent Memory","objective":"Separar lo que escribe el equipo, lo que aprende el agente y lo que recuerda un subagente concreto.","context":"Tras varias sesiones, el agente sigue preguntando lo mismo y repite errores. Pero meterlo todo en `CLAUDE.md` lo haría demasiado largo.","implementation":"Deja las reglas de equipo en `CLAUDE.md`, que puede importar `AGENTS.md`. Deja que la auto memory recoja las correcciones. Y, si un subagente acumula conocimiento propio, actívale el campo `memory`. Trata la memoria como cualquier otro contenido: léela y corrígela.","files":[{"path":"CLAUDE.md","language":"markdown","code":"@AGENTS.md\n\n## Memoria\n- Las decisiones de arquitectura van en `docs/decisions/`, no en notas de memoria.\n- No guardes secretos ni datos de clientes en memoria."},{"path":".claude/agents/code-reviewer.md","language":"markdown","code":"---\nname: code-reviewer\ndescription: Revisa código según las convenciones del proyecto. Úsalo tras implementar un cambio.\ntools: Read, Grep, Glob\nmemory: project\n---\n\nConsulta tu memoria antes de revisar. Al terminar, guarda en ella solo las\nconvenciones o los errores recurrentes que hayas confirmado en el código,\ncon la ruta del archivo donde se ven. Corrige las notas que ya no sean ciertas."},{"path":".gitignore","language":"text","code":"CLAUDE.local.md\n.claude/agent-memory-local/"}],"parts":[{"label":"CLAUDE.md","text":"Instrucciones que escribe una persona y se cargan en cada sesión."},{"label":"@AGENTS.md","text":"Importa el archivo compartido en lugar de duplicarlo."},{"label":"auto memory","text":"No aparece en los archivos: son notas que Claude escribe por repositorio, compartidas entre worktrees. Se cargan las primeras 200 líneas o 25 KB."},{"label":"memory: project","text":"El subagente guarda en `.claude/agent-memory/code-reviewer/`, y se puede versionar. Activarlo le concede automáticamente Read, Write y Edit."},{"label":".gitignore","text":"Excluye lo personal: `CLAUDE.local.md` y la memoria de ámbito `local`."}],"expected":"El agente deja de repetir errores ya corregidos, `CLAUDE.md` sigue siendo breve y puedes consultar qué ha aprendido leyendo unos archivos.","whenToUse":"En proyectos en los que trabajas de forma repetida. No lo necesitas para tareas puntuales.","limitations":["Una nota incorrecta sigue influyendo en sesiones futuras.","`memory` no tiene efecto si la auto memory está desactivada.","Al concederle Write y Edit, ese revisor deja de ser de solo lectura.","Una memoria no garantiza un comportamiento: lo obligatorio va en un hook."],"concepts":["persistent-memory","claude-md","subagents","context-management"],"sources":[{"title":"Claude Code: How Claude remembers your project","url":"https://code.claude.com/docs/en/memory"},{"title":"Claude Code: Subagents","url":"https://code.claude.com/docs/en/sub-agents"}],"status":"verified","lastVerified":"2026-11-05"},{"id":"spec-plan-build-workflow","title":"Workflow de especificación, construcción y revisión","topic":"Workflows","objective":"Llevar una funcionalidad de una idea a un PR con puntos de control claros, separando las fases en sesiones distintas.","context":"Pedir directamente “construye X” da diffs difíciles de revisar. Las buenas prácticas de Claude Code sugieren escribir la especificación y empezar luego una sesión limpia para construir a partir de ella.","implementation":"Primera sesión: el agente te ayuda a escribir `SPEC.md` sin programar. Segunda sesión, limpia: construye a partir del archivo, con una comprobación que ejecutar. Por último, un revisor sin contexto contrasta el resultado con la especificación.","files":[{"path":"SPEC.md","language":"markdown","code":"# Exportar pedidos a CSV\n\n## Objetivo\nQue una persona administradora pueda descargar los pedidos de un rango de fechas.\n\n## Criterios de aceptación\n- GET /admin/orders.csv?from=&to= devuelve text/csv.\n- Sin permiso de administración devuelve 403.\n- Rango de más de 366 días devuelve 400.\n\n## Fuera de alcance\n- Exportaciones programadas.\n\n## Cómo comprobarlo\n- pnpm --filter api test orders-export"},{"path":"prompts.txt","language":"text","code":"# Sesión 1: especificar\nVoy a añadir una exportación de pedidos a CSV. Hazme preguntas sobre lo que\nno esté claro y redacta SPEC.md. No escribas código.\n\n# Sesión 2 (nueva): construir\nImplementa SPEC.md. Escribe primero los tests de los criterios de aceptación\ny confirma que fallan. Después implementa hasta que pasen.\nNo amplíes el alcance.\n\n# Sesión 2: revisar\nUsa el subagente reviewer para contrastar el diff con SPEC.md.\nInforma solo de criterios incumplidos y de errores que puedan provocar un fallo."}],"parts":[{"label":"Criterios de aceptación","text":"Comprobables: cada uno se convierte en un test. Es la “definición de terminado” del agente."},{"label":"Fuera de alcance","text":"Frena la tendencia a añadir más de lo pedido."},{"label":"Cómo comprobarlo","text":"Da al agente un comando que puede ejecutar, en vez de tener que creer que ha terminado."},{"label":"Sesión nueva","text":"Empieza con un contexto limpio y una definición por escrito, sin el ruido de la conversación anterior."},{"label":"Confirmar que fallan","text":"Un test que nunca ha fallado puede no estar comprobando nada."}],"expected":"Un PR pequeño, con tests ligados a criterios concretos y una revisión independiente contra la especificación.","whenToUse":"En funcionalidades de cierta entidad. Para un arreglo de una línea, este proceso sobra.","limitations":["Escribir y revisar la especificación lleva tiempo.","Si la especificación es incorrecta, el resultado será correctamente incorrecto.","Hay que actualizarla si cambia de rumbo la implementación."],"concepts":["ai-development-workflows","spec-driven-development","tdd","subagents"],"sources":[{"title":"Claude Code: Best practices","url":"https://code.claude.com/docs/en/best-practices"},{"title":"GitHub Spec Kit","url":"https://github.com/github/spec-kit"}],"status":"verified","lastVerified":"2026-11-05"},{"id":"hooks-guard-format","title":"Hooks: bloquear comandos peligrosos y formatear","topic":"Hooks","tested":"Script del hook ejecutado con entradas de prueba; la integración con Claude Code no se ha ejecutado.","objective":"Garantizar dos reglas sin depender del modelo: impedir comandos destructivos y formatear cada archivo editado.","context":"Una instrucción como “no hagas force push” es una petición. Un hook se ejecuta siempre. El script está en Node para que funcione igual en Windows, macOS y Linux, sin depender de `jq`.","implementation":"Registra los hooks en `.claude/settings.json` y guarda el script en el repositorio para que lo revise el equipo. Adapta el comando de formateo a tu proyecto.","files":[{"path":".claude/settings.json","language":"json","code":"{\n  \"hooks\": {\n    \"PreToolUse\": [\n      {\n        \"matcher\": \"Bash\",\n        \"hooks\": [\n          { \"type\": \"command\", \"command\": \"node \\\"${CLAUDE_PROJECT_DIR}/.claude/hooks/guard-bash.mjs\\\"\" }\n        ]\n      }\n    ],\n    \"PostToolUse\": [\n      {\n        \"matcher\": \"Edit|Write\",\n        \"hooks\": [\n          { \"type\": \"command\", \"command\": \"npx prettier --write --ignore-unknown .\" }\n        ]\n      }\n    ]\n  }\n}"},{"path":".claude/hooks/guard-bash.mjs","language":"javascript","code":"// PreToolUse: recibe la llamada en JSON por stdin. Exit 2 bloquea y stderr llega al modelo.\nlet input = '';\nfor await (const chunk of process.stdin) input += chunk;\n\nconst command = JSON.parse(input).tool_input?.command ?? '';\nconst forbidden = [/\\brm\\s+-[a-z]*r[a-z]*f/i, /\\bgit\\s+push\\b.*--force/];\n\nif (forbidden.some((rule) => rule.test(command))) {\n  console.error(`Bloqueado por política del proyecto: ${command}`);\n  process.exit(2);\n}"},{"path":"prueba manual","language":"bash","code":"echo '{\"tool_input\":{\"command\":\"rm -rf build\"}}' | node .claude/hooks/guard-bash.mjs\necho $?   # 2: bloqueado\n\necho '{\"tool_input\":{\"command\":\"npm test\"}}' | node .claude/hooks/guard-bash.mjs\necho $?   # 0: permitido"}],"parts":[{"label":"PreToolUse","text":"Se ejecuta antes de la herramienta y puede impedirla."},{"label":"matcher","text":"Filtra por herramienta. `Edit|Write` coincide con cualquiera de las dos."},{"label":"process.exit(2)","text":"Solo el código 2 bloquea. **Un exit 1 no bloquea:** la acción continúa. Es un error frecuente."},{"label":"console.error","text":"Con exit 2, stderr llega al modelo como motivo, y puede cambiar de enfoque."},{"label":"PostToolUse","text":"La herramienta ya se ejecutó, así que no puede impedirla. Sirve para reaccionar, por ejemplo formateando."},{"label":"prettier .","text":"Formatea todo el proyecto en cada edición: es sencillo, pero lento en repositorios grandes. Se puede leer la ruta editada del JSON de entrada para formatear solo ese archivo."}],"expected":"Si el agente intenta `rm -rf build`, la llamada no se ejecuta y recibe el motivo. Tras cada edición, el código queda formateado.","whenToUse":"Para reglas sin excepciones. Si la regla requiere criterio, usa una instrucción o un revisor.","limitations":["Filtrar comandos por texto no es una frontera de seguridad: otra forma de escribirlo puede eludirlo, por ejemplo un script que borre archivos. Combínalo con permisos y aislamiento.","Los hooks se ejecutan con tus permisos: revísalos como código de producción.","Un hook lento frena cada acción."],"concepts":["hooks","guardrails","permissions","agentic-harness"],"sources":[{"title":"Claude Code: Hooks reference","url":"https://code.claude.com/docs/en/hooks"}],"status":"verified","lastVerified":"2026-11-05"},{"id":"git-worktrees-basics","title":"Git Worktrees paso a paso","topic":"Git Worktrees","tested":"Comandos ejecutados en un repositorio de prueba con Git en Windows.","objective":"Tener dos ramas activas a la vez en directorios distintos, entender sus reglas y limpiar al terminar.","context":"Estás en mitad de un trabajo y aparece otra tarea. O quieres que un agente trabaje sin tocar tu directorio. Con un worktree no hace falta `git stash` ni un segundo clon.","implementation":"Ejecútalo desde el repositorio principal. Los worktrees se crean fuera de él, como carpetas hermanas, para que no aparezcan como archivos sin seguimiento.","files":[{"path":"terminal","language":"bash","code":"# Crear dos worktrees, cada uno con una rama nueva\ngit worktree add ../app-auth -b feature/auth\ngit worktree add ../app-billing -b feature/billing\n\n# Ver qué hay activo\ngit worktree list\n\n# Una rama no puede estar activa en dos sitios (esto falla)\ngit worktree add ../otra feature/auth\n\n# Un commit en un worktree es visible desde los demás\n(cd ../app-auth && git add . && git commit -m \"Añade auth\")\ngit log --oneline feature/auth -1\n\n# Limpiar: falla si hay cambios sin commitear, salvo con --force\ngit worktree remove ../app-auth\ngit worktree remove --force ../app-billing\n\n# La rama sigue existiendo y se puede integrar\ngit merge feature/auth"}],"parts":[{"label":"worktree add <ruta> -b <rama>","text":"Crea el directorio y una rama nueva a partir de `HEAD`. Sin `-b`, usa una rama existente."},{"label":"worktree list","text":"Muestra cada directorio, su commit y su rama."},{"label":"fatal: already checked out","text":"Comportamiento esperado. Se resuelve con una rama nueva o con `--detach`."},{"label":"worktree remove","text":"Elimina el directorio, pero **no la rama**: los commits siguen ahí. Si había cambios sin commitear, `--force` los pierde."},{"label":"git worktree prune","text":"Si borras una carpeta a mano, limpia los metadatos que quedan."}],"expected":"Tres directorios con ramas distintas y un mismo historial. Al eliminar los worktrees, las ramas siguen disponibles para integrarse.","whenToUse":"Para tareas paralelas, hotfixes sin interrumpir tu trabajo, revisar un PR o aislar a un agente.","limitations":["Un worktree es una copia limpia: sin `node_modules` ni `.env`. Instala dependencias en cada uno.","No evita los conflictos al integrar.","Varios servidores de desarrollo pueden chocar en el mismo puerto."],"concepts":["git-worktrees","git-branches","parallel-development"],"sources":[{"title":"Git: git-worktree","url":"https://git-scm.com/docs/git-worktree"}],"status":"verified","lastVerified":"2026-11-05"},{"id":"parallel-agents-worktrees","title":"Agentes en paralelo con worktrees","topic":"Parallel Agents","status":"needs-review","objective":"Lanzar varias tareas independientes con agentes a la vez, y luego revisarlas e integrarlas de una en una.","context":"Tienes dos tareas que tocan áreas distintas. Claude Code puede crear un worktree por sesión con `--worktree`. En modo no interactivo (`-p`) no limpia sus worktrees al terminar, y por eso hay un paso explícito de limpieza.","implementation":"Comprueba primero que las tareas no tocan los mismos archivos. Lanza una sesión por tarea, revisa cada rama y fusiona en orden, ejecutando los tests tras cada merge. Como esos worktrees se bloquean durante la ejecución, puede que debas desbloquearlos antes de eliminarlos.","files":[{"path":"parallel.sh","language":"bash","code":"#!/usr/bin/env bash\nset -euo pipefail\n\n# Una sesión aislada por tarea; cada una crea su worktree y su rama\nclaude -p --worktree rate-limit \"Añade rate limiting a /login con tests. Ejecuta los tests antes de terminar.\" > rate-limit.log &\nclaude -p --worktree api-docs \"Actualiza docs/api.md según las rutas actuales. No modifiques código.\" > api-docs.log &\nwait\n\ngit worktree list"},{"path":"integración","language":"bash","code":"# Revisar lo que ha hecho cada agente\ngit diff main...worktree-rate-limit\ngit diff main...worktree-api-docs\n\n# Integrar de una en una, comprobando cada paso\ngit merge worktree-api-docs\nnpm test\ngit merge worktree-rate-limit\nnpm test\n\n# Limpiar\ngit worktree remove .claude/worktrees/rate-limit\ngit worktree remove .claude/worktrees/api-docs"},{"path":".gitignore","language":"text","code":".claude/worktrees/"}],"parts":[{"label":"--worktree <nombre>","text":"Crea `.claude/worktrees/<nombre>/`, en una rama `worktree-<nombre>`."},{"label":"-p","text":"No interactivo. Interactivamente, Claude pregunta al salir si conserva el worktree; con `-p`, no."},{"label":"> *.log &","text":"Ejecuta cada sesión en segundo plano y guarda su salida para revisarla."},{"label":"wait","text":"Espera a que terminen todas."},{"label":"git diff main...rama","text":"Muestra solo lo que ha cambiado esa rama desde que divergió de main."},{"label":"npm test tras cada merge","text":"Dos ramas correctas por separado pueden fallar juntas. Es la única forma de detectar conflictos semánticos."},{"label":".gitignore","text":"La documentación recomienda ignorar `.claude/worktrees/` para que no aparezca como archivos sin seguimiento."}],"expected":"Dos ramas independientes, con sus logs. Tras revisarlas, `main` las integra con los tests en verde.","whenToUse":"Con tareas realmente independientes y buenos tests. Si las dos tocan el mismo módulo, hazlas en serie.","limitations":["Este ejemplo se basa en la documentación y **no se ha ejecutado**, porque consume tokens de una cuenta real.","Los permisos: en modo no interactivo no hay quien apruebe; configúralos antes o las acciones se denegarán.","Si la rama base no es la esperada, revisa `worktree.baseRef`; por defecto parte de la rama por defecto del remoto.","El límite real es tu capacidad de revisar los diffs."],"concepts":["parallel-agent-development","git-worktrees","conflict-resolution","shared-file-conflicts"],"sources":[{"title":"Claude Code: Run parallel sessions with worktrees","url":"https://code.claude.com/docs/en/worktrees"}],"lastVerified":null},{"id":"cicd-github-actions","title":"Pipeline de CI con GitHub Actions","topic":"CI/CD","status":"needs-review","objective":"Comprobar automáticamente cada pull request, lo haya escrito una persona o un agente.","context":"CI es un verificador que no depende de quien escribió el código. Si un agente dice que “todo funciona”, el pipeline lo comprueba de forma independiente.","implementation":"Guarda el workflow en `.github/workflows/`. Después, en la configuración del repositorio, exige este check con una regla de protección de rama para que no se pueda fusionar sin pasarlo.","files":[{"path":".github/workflows/ci.yml","language":"yaml","code":"name: CI\n\non:\n  pull_request:\n  push:\n    branches: [main]\n\npermissions:\n  contents: read\n\njobs:\n  lint:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 22\n          cache: npm\n      - run: npm ci\n      - run: npm run lint\n\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 22\n          cache: npm\n      - run: npm ci\n      - run: npm test"}],"parts":[{"label":"on","text":"El evento que dispara el workflow: cada PR y cada push a `main`."},{"label":"permissions","text":"Reduce los permisos del token al mínimo. Es buena práctica, sobre todo si ejecutas código generado."},{"label":"jobs","text":"`lint` y `test` se ejecutan en paralelo, porque no se han declarado dependencias entre ellos."},{"label":"runs-on","text":"El runner: aquí, una máquina virtual alojada por GitHub."},{"label":"uses","text":"Una action reutilizable. Para mayor seguridad, fija las de terceros a un commit concreto."},{"label":"run","text":"Un comando de shell. `npm ci` instala exactamente lo que indica el lockfile."}],"expected":"Cada PR muestra dos checks. Si uno falla, el PR queda marcado y, con protección de rama, no se puede fusionar.","whenToUse":"En todo repositorio de GitHub con tests. Es lo primero que conviene tener antes de delegar en agentes.","limitations":["YAML revisado, pero no ejecutado en un repositorio real.","Comprueba las versiones vigentes de las actions y de Node.","Requiere que existan los scripts `lint` y `test` en `package.json`.","Solo detecta lo que comprueban tus tests."],"concepts":["ci-cd","github-actions","regression-testing","pull-requests"],"sources":[{"title":"GitHub Docs: Understanding GitHub Actions","url":"https://docs.github.com/en/actions/get-started/understand-github-actions"}],"lastVerified":null},{"id":"testing-regression-node","title":"Tests de regresión con el runner de Node.js","topic":"Testing","tested":"Código ejecutado con Node.js 24: 2 de 2 tests correctos.","objective":"Capturar un bug con un test, de modo que no pueda volver a aparecer, sin instalar dependencias.","context":"Un cálculo de IVA devolvía `24.187900000000003` por la aritmética de coma flotante. Este flujo es también un buen encargo para un agente: primero el test, después el arreglo.","implementation":"Escribe el test de regresión, confirma que falla con el código antiguo, corrige y ejecuta toda la suite con `node --test`.","files":[{"path":"iva.js","language":"javascript","code":"export const conIva = (importe, tipo = 21) => Math.round(importe * (100 + tipo)) / 100;"},{"path":"iva.test.js","language":"javascript","code":"import test from 'node:test';\nimport assert from 'node:assert/strict';\nimport { conIva } from './iva.js';\n\ntest('añade el 21% por defecto', () => {\n  assert.equal(conIva(100), 121);\n});\n\n// Regresión: 19.99 * 1.21 producía 24.187900000000003.\ntest('redondea a céntimos', () => {\n  assert.equal(conIva(19.99), 24.19);\n});"},{"path":"terminal","language":"bash","code":"node --test"}],"parts":[{"label":"node:test","text":"Runner incluido en Node.js, sin dependencias."},{"label":"assert/strict","text":"Comparaciones estrictas: `equal` se comporta como `===`."},{"label":"Comentario de regresión","text":"Explica por qué existe el test, para que nadie lo borre por parecer redundante."},{"label":"Math.round(...) / 100","text":"Trabaja la operación en céntimos. En un sistema de cobro real conviene usar enteros o una biblioteca decimal."}],"expected":"`node --test` informa de 2 tests superados. Si alguien reintroduce el error, CI fallará.","whenToUse":"Cada vez que corrijas un bug. Con un agente, pídele que muestre el test fallando antes de arreglarlo.","limitations":["Solo cubre el caso probado.","Si el mismo agente escribe código y test, ambos pueden compartir la misma idea errónea.","No comprueba la integración con otros componentes."],"concepts":["unit-testing","regression-testing","tdd","ai-generated-code-testing"],"sources":[{"title":"Node.js: Test runner","url":"https://nodejs.org/api/test.html"},{"title":"Martin Fowler: Test Pyramid","url":"https://martinfowler.com/bliki/TestPyramid.html"}],"status":"verified","lastVerified":"2026-11-05"},{"id":"agent-eval-minimal","title":"Evaluación mínima de un agente","topic":"Testing","status":"needs-review","objective":"Medir con datos si un cambio de instrucciones o de modelo mejora a un agente, en lugar de juzgarlo por impresión.","context":"Sigue el enfoque de *Demystifying evals*: empezar con pocas tareas reales, evaluar el resultado final y no la secuencia de pasos, y repetir cada tarea porque el resultado varía.","implementation":"Cada tarea tiene un prompt y un comando que puntúa el resultado. El script crea un worktree limpio por intento, lanza el agente y ejecuta el grader. Empieza con los fallos reales de tu proyecto.","files":[{"path":"evals/tasks.json","language":"json","code":"[\n  {\n    \"id\": \"issue-142\",\n    \"prompt\": \"El endpoint /orders devuelve 500 con el carrito vacío. Corrígelo.\",\n    \"grader\": \"npm test -- tests/regression/issue-142.test.js\"\n  }\n]"},{"path":"evals/run.sh","language":"bash","code":"#!/usr/bin/env bash\n# Uso: evals/run.sh <id> \"<prompt>\" \"<grader>\" [intentos]\nid=$1; prompt=$2; grader=$3; trials=${4:-3}\npass=0\n\nfor i in $(seq 1 \"$trials\"); do\n  dir=\"../eval-$id-$i\"\n  git worktree add -q --detach \"$dir\" HEAD\n  (\n    cd \"$dir\"\n    npm ci --silent\n    claude -p \"$prompt\" > transcript.txt\n    eval \"$grader\"\n  ) && pass=$((pass + 1))\n  git worktree remove --force \"$dir\"\ndone\n\necho \"$id: $pass/$trials\""}],"parts":[{"label":"grader","text":"Grader por código: comprueba el *outcome*, no lo que el agente dice haber hecho."},{"label":"trials","text":"Varios intentos, porque un agente no da siempre el mismo resultado."},{"label":"--detach","text":"Cada intento parte del mismo commit sin crear ramas: entorno limpio y reproducible."},{"label":"transcript.txt","text":"Conservarlo antes de borrar el worktree ayuda a entender por qué ha fallado; este script mínimo lo descarta, así que cópialo si lo necesitas."},{"label":"pass/trials","text":"Compara este número antes y después de un cambio, siempre con las mismas tareas."}],"expected":"Una línea por tarea, como `issue-142: 2/3`. Las tareas que pasen siempre se pueden trasladar a un conjunto de regresión.","whenToUse":"Antes de cambiar de modelo o de instrucciones en un agente de uso habitual.","limitations":["Script ilustrativo: no se ha ejecutado, porque consume tokens de una cuenta real.","`eval` ejecuta el texto del grader: usa solo tareas de confianza.","Con pocos intentos, una diferencia pequeña puede ser ruido.","No evalúa aspectos subjetivos, como la calidad del código; para eso hace falta un grader por modelo o humano."],"concepts":["agent-evaluation","regression-testing","git-worktrees"],"sources":[{"title":"Anthropic: Demystifying evals for AI agents","url":"https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents"}],"lastVerified":null}],"learning-paths":[{"id":"agents-from-zero","title":"Agentes de IA desde cero","level":"Beginner","description":"Qué es un agente, qué lo distingue de un asistente y cómo se configura para trabajar en un repositorio.","steps":[{"concept":"ai-assisted-development","why":"El marco general."},{"concept":"ai-agents","why":"La definición central y el bucle de trabajo."},{"concept":"assistants-vs-agents","why":"Cuánto control delegas en cada caso."},{"concept":"tool-calling","why":"Cómo actúa de verdad un modelo."},{"concept":"tools-agent","why":"Qué tiene a su alcance."},{"concept":"agents-md","why":"Tu primera configuración, sencilla y útil."},{"concept":"permissions","why":"Cómo limitar lo que puede hacer."},{"concept":"agentic-coding","why":"Cómo es trabajar así en el día a día."}]},{"id":"configure-repo","title":"Prepara tu repositorio para agentes","level":"Intermediate","description":"Instrucciones, skills, subagentes, memoria, hooks y MCP: qué poner en cada sitio y por qué.","steps":[{"concept":"context-management","why":"El recurso que todo lo demás administra."},{"concept":"agents-md","why":"Lo que debe saberse siempre."},{"concept":"rules","why":"Lo que solo aplica a una parte."},{"concept":"skills","why":"Los procedimientos que se cargan bajo demanda."},{"concept":"subagents","why":"Las tareas que conviene aislar."},{"concept":"persistent-memory","why":"Lo que el agente aprende."},{"concept":"hooks","why":"Lo que no puede quedar a su criterio."},{"concept":"mcp","why":"Conexión con sistemas externos."}]},{"id":"parallel-worktrees","title":"Agentes en paralelo con Git Worktrees","level":"Intermediate","description":"Del modelo de ramas de Git a coordinar varios agentes sin que se pisen.","steps":[{"concept":"git-fundamentals","why":"El modelo de Git."},{"concept":"git-branches","why":"Líneas de trabajo."},{"concept":"git-worktrees","why":"Varias ramas activas a la vez."},{"concept":"shared-file-conflicts","why":"Qué evitan los worktrees y qué no."},{"concept":"conflict-resolution","why":"Cómo integrar."},{"concept":"parallel-agent-development","why":"El proceso completo."},{"concept":"code-reviews","why":"El verdadero límite del paralelismo."}]},{"id":"harness-quality","title":"Fiabilidad: harness, tests y evals","level":"Advanced","description":"Cómo conseguir que el trabajo de un agente sea fiable y cómo medirlo.","steps":[{"concept":"context-engineering","why":"Qué ve el agente."},{"concept":"agentic-harness","why":"Todo lo que rodea al modelo."},{"concept":"harness-engineering","why":"Mejorarlo de forma sistemática."},{"concept":"static-analysis","why":"Sensores deterministas."},{"concept":"guardrails","why":"Controles en capas."},{"concept":"ai-generated-code-testing","why":"Riesgos de verificar código generado."},{"concept":"agent-evaluation","why":"Medir para decidir."}]},{"id":"multi-agent","title":"Orquestación y sistemas multiagente","level":"Advanced","description":"Cuándo compensa usar varios agentes y cómo coordinarlos.","steps":[{"concept":"workflows","why":"Empieza por la opción más simple."},{"concept":"agent-orchestration","why":"Las opciones de coordinación."},{"concept":"orchestrators","why":"La pieza que coordina."},{"concept":"multi-agent-systems","why":"Beneficios y costes."},{"concept":"agent-communication","why":"Cómo intercambian información."},{"concept":"parallel-agent-development","why":"Aplicación a un repositorio."}]},{"id":"engineering-basics","title":"Fundamentos de ingeniería","level":"Beginner","description":"Los principios que deciden la calidad de un sistema, lo escriba quien lo escriba.","steps":[{"concept":"programming-paradigms","why":"Formas de pensar el código."},{"concept":"oop","why":"Un paradigma muy extendido."},{"concept":"functional-programming","why":"Una alternativa que se combina bien."},{"concept":"solid","why":"Principios de diseño."},{"concept":"design-patterns","why":"Un vocabulario compartido."},{"concept":"unit-testing","why":"Comprobar lo que se escribe."},{"concept":"ci-cd","why":"Entregar con frecuencia."}]}],"timeline":{"intro":"Cómo ha evolucionado el desarrollo de software, leído por carriles paralelos. Una etapa nueva rara vez sustituye a la anterior: casi todas siguen vigentes y se apoyan unas en otras.","lanes":[{"id":"foundations","short":"Programación","name":"Programación e ingeniería","description":"Los cimientos, que siguen en uso."},{"id":"tooling","short":"Herramientas","name":"IDEs y control de versiones","description":"Con qué se escribe y se versiona el código."},{"id":"process","short":"Metodologías","name":"Metodologías","description":"Cómo se organiza el trabajo."},{"id":"delivery","short":"DevOps y nube","name":"DevOps, CI/CD y Cloud Native","description":"Cómo se entrega y opera el software."},{"id":"ai-tools","short":"Herramientas IA","name":"Herramientas de IA para programar","description":"Del autocompletado a los agentes."},{"id":"ai-concepts","short":"Prácticas IA","name":"Agentes y prácticas emergentes","description":"Ideas y términos; varios aún en discusión."}],"events":[{"id":"traditional-programming","lane":"foundations","name":"Programación tradicional","start":1957,"end":null,"dateLabel":"Desde 1957 (FORTRAN)","precision":"exact","status":"needs-review","lastVerified":null,"description":"FORTRAN, entregado por IBM en 1957, se cita a menudo como el primer lenguaje de alto nivel de amplia difusión. Permitió escribir programas en una notación cercana a las matemáticas en vez de en ensamblador.","importance":"Inició la tendencia que todavía sigue: subir el nivel de abstracción con el que las personas expresan lo que quieren de una máquina.","technologies":["FORTRAN","C","Java","Python"],"relatedConcepts":["programming-paradigms"],"sources":[{"title":"IBM: Fortran","url":"https://www.ibm.com/history/fortran"}]},{"id":"software-engineering-term","lane":"foundations","name":"Ingeniería de software como disciplina","start":1968,"end":null,"dateLabel":"Desde 1968","precision":"exact","status":"needs-review","lastVerified":null,"description":"En 1968, una conferencia de la OTAN en Garmisch puso en circulación el término “software engineering”, en un contexto de proyectos que se retrasaban y fallaban.","importance":"Planteó que construir software requiere métodos sistemáticos. Muchos de sus problemas siguen presentes, también al trabajar con agentes.","technologies":["Diseño","Arquitectura","Pruebas"],"relatedConcepts":["design-patterns","clean-architecture"],"sources":[{"title":"Actas de las conferencias de la OTAN","url":"http://homepages.cs.ncl.ac.uk/brian.randell/NATO/"}]},{"id":"ides","lane":"tooling","name":"IDEs y herramientas de desarrollo","start":1985,"end":null,"dateLabel":"Aprox. años 80 en adelante","precision":"approximate","status":"needs-review","lastVerified":null,"description":"Los entornos integrados reunieron edición, compilación y depuración. Más tarde añadieron refactorización y análisis semántico. Visual Studio Code, presentado en 2015, popularizó el modelo de editor ligero con extensiones.","importance":"Definieron el puesto de trabajo del desarrollador y son la superficie donde hoy se integran muchos agentes.","technologies":["Visual Studio","Eclipse","IntelliJ IDEA","VS Code"],"relatedConcepts":["ides","code-editors"],"sources":[{"title":"Visual Studio Code: Documentation","url":"https://code.visualstudio.com/docs"}]},{"id":"git","lane":"tooling","name":"Git","start":2005,"end":null,"dateLabel":"Desde 2005","precision":"exact","status":"verified","lastVerified":"2026-11-05","description":"La comunidad del kernel de Linux creó Git en 2005, con Linus Torvalds al frente, tras perder el uso gratuito de BitKeeper. Se diseñó para ser rápido y soportar miles de ramas paralelas.","importance":"Su modelo de ramas baratas hizo posible GitHub Flow, los pull requests y, hoy, el trabajo aislado de varios agentes mediante worktrees.","technologies":["Git","GitHub","GitLab"],"relatedConcepts":["git-fundamentals","git-worktrees"],"sources":[{"title":"Pro Git: A Short History of Git","url":"https://git-scm.com/book/en/v2/Getting-Started-A-Short-History-of-Git"},{"title":"Git: git-worktree","url":"https://git-scm.com/docs/git-worktree"}]},{"id":"agile","lane":"process","name":"Metodologías ágiles","start":2001,"end":null,"dateLabel":"Desde 2001 (Manifiesto)","precision":"exact","status":"verified","lastVerified":"2026-11-05","description":"El Manifiesto Ágil, de 2001, prioriza a las personas y sus interacciones, el software que funciona, la colaboración con el cliente y la respuesta al cambio. Recogió prácticas de métodos ya existentes como Scrum y XP.","importance":"Convirtió la entrega iterativa en la norma. Sus ciclos cortos de feedback encajan con cómo se trabaja bien con agentes.","technologies":["Scrum","XP","Kanban"],"relatedConcepts":["tdd","ci-cd"],"sources":[{"title":"Manifesto for Agile Software Development","url":"https://agilemanifesto.org/"}],"coexists":"No sustituyó de golpe a otros procesos: en sectores regulados conviven enfoques más formales."},{"id":"cicd","lane":"delivery","name":"CI y entrega continua","start":2000,"end":null,"dateLabel":"Años 2000; libro de referencia en 2010","precision":"approximate","status":"needs-review","lastVerified":null,"description":"La integración continua se difundió con XP y con el artículo de Martin Fowler. El libro *Continuous Delivery* (2010), de Jez Humble y David Farley, sistematizó la idea de tener siempre el software listo para desplegar.","importance":"Automatizó la verificación. Hoy, esa misma infraestructura es el sensor que comprueba el trabajo de los agentes.","technologies":["Jenkins","GitLab CI","GitHub Actions"],"relatedConcepts":["ci-cd","regression-testing"],"sources":[{"title":"Martin Fowler: Continuous Integration","url":"https://martinfowler.com/articles/continuousIntegration.html"},{"title":"Martin Fowler: Continuous Delivery","url":"https://martinfowler.com/bliki/ContinuousDelivery.html"}]},{"id":"cloud","lane":"delivery","name":"Computación en la nube","start":2006,"end":null,"dateLabel":"Desde 2006 (AWS S3 y EC2)","precision":"exact","status":"needs-review","lastVerified":null,"description":"AWS lanzó S3 y EC2 en 2006, y popularizó el acceso a infraestructura bajo demanda. El NIST publicó en 2011 una definición que sigue siendo referencia.","importance":"Cambió la infraestructura de compra a servicio, y permitió automatizarla mediante API.","technologies":["AWS","Azure","Google Cloud"],"relatedConcepts":["cloud-computing","aws"],"sources":[{"title":"NIST SP 800-145: The NIST Definition of Cloud Computing","url":"https://csrc.nist.gov/pubs/sp/800/145/final"},{"title":"AWS: What is AWS?","url":"https://aws.amazon.com/what-is-aws/"}]},{"id":"devops","lane":"delivery","name":"DevOps","start":2009,"end":null,"dateLabel":"Desde 2009","precision":"approximate","status":"needs-review","lastVerified":null,"description":"El movimiento surgió para reducir la separación entre desarrollo y operaciones. Se suele situar su origen en torno a los primeros DevOpsDays, celebrados en Gante en 2009.","importance":"Hizo de la automatización y la responsabilidad compartida una práctica cultural, no solo una herramienta.","technologies":["Infraestructura como código","Monitorización"],"relatedConcepts":["ci-cd","infrastructure-as-code","observability"],"sources":[{"title":"DevOpsDays","url":"https://devopsdays.org/"}]},{"id":"cloud-native","lane":"delivery","name":"Contenedores y Cloud Native","start":2013,"end":null,"dateLabel":"Desde 2013 (Docker); 2014 (Kubernetes)","precision":"exact","status":"needs-review","lastVerified":null,"description":"Docker popularizó los contenedores en 2013. Google anunció Kubernetes en 2014, y su versión 1.0, de julio de 2015, se presentó junto con la creación de la CNCF.","importance":"Estandarizó cómo empaquetar y operar aplicaciones, y dio una vía cómoda de aislar procesos, incluidos los agentes.","technologies":["Docker","Kubernetes","CNCF"],"relatedConcepts":["docker","kubernetes","microservices"],"sources":[{"title":"Kubernetes: 10 Years of Kubernetes","url":"https://kubernetes.io/blog/2024/06/06/10-Years-of-Kubernetes/"},{"title":"Docker Docs: Docker overview","url":"https://docs.docker.com/get-started/docker-overview/"}]},{"id":"dev-automation","lane":"delivery","name":"Automatización del desarrollo","start":2018,"end":null,"dateLabel":"Aprox. desde 2018","precision":"approximate","status":"needs-review","lastVerified":null,"description":"Las plataformas de código integraron la automatización: workflows disparados por eventos del repositorio, como GitHub Actions, además de actualización de dependencias y análisis automáticos.","importance":"Acercó la automatización al repositorio, y creó los puntos de enganche que hoy usan los agentes para actuar en cada PR.","technologies":["GitHub Actions","GitLab CI"],"relatedConcepts":["github-actions","automated-code-review"],"sources":[{"title":"GitHub Docs: Understanding GitHub Actions","url":"https://docs.github.com/en/actions/get-started/understand-github-actions"}]},{"id":"copilot","lane":"ai-tools","name":"GitHub Copilot y AI-assisted coding","start":2021.5,"end":null,"dateLabel":"Junio de 2021 (vista previa); junio de 2022 (GA)","precision":"exact","status":"verified","lastVerified":"2026-11-05","description":"GitHub anunció Copilot como vista previa técnica el 29 de junio de 2021, y lo publicó de forma general el 21 de junio de 2022. Llevó las sugerencias de un modelo de lenguaje al editor.","importance":"Normalizó programar junto a un modelo, y abrió el mercado de los asistentes de código.","technologies":["GitHub Copilot","VS Code"],"relatedConcepts":["ai-assisted-development","ai-coding-assistants"],"sources":[{"title":"GitHub Blog: Copilot is generally available","url":"https://github.blog/2022-06-21-github-copilot-is-generally-available-to-all-developers/","note":"21 de junio de 2022"},{"title":"GitHub Docs: What is GitHub Copilot?","url":"https://docs.github.com/en/copilot/get-started/what-is-github-copilot"}],"coexists":"El autocompletado sigue siendo muy útil: los agentes lo complementan, no lo eliminan."},{"id":"ai-assistants","lane":"ai-tools","name":"AI coding assistants conversacionales","start":2022.9,"end":null,"dateLabel":"Desde finales de 2022","precision":"approximate","status":"needs-review","lastVerified":null,"description":"Tras el lanzamiento de ChatGPT, en noviembre de 2022, programar conversando con un modelo se generalizó. Aparecieron editores y extensiones que integran el chat con el código.","importance":"Cambió la interacción de sugerencias en línea a peticiones en lenguaje natural.","technologies":["ChatGPT","Cursor","Aider","Cline"],"relatedConcepts":["ai-coding-assistants","prompt-engineering"],"sources":[{"title":"OpenAI: Introducing ChatGPT","url":"https://openai.com/index/chatgpt/","note":"Contrastar a mano"},{"title":"Aider: Documentation","url":"https://aider.chat/docs/"}]},{"id":"devin","lane":"ai-tools","name":"Agentes de software presentados como producto","start":2024.2,"end":null,"dateLabel":"Marzo de 2024 (Devin)","precision":"exact","status":"verified","lastVerified":"2026-11-05","description":"El 12 de marzo de 2024, Cognition presentó Devin como “the first AI software engineer”, con su propio entorno de herramientas. Esa descripción es una afirmación de marketing de la empresa.","importance":"Dio visibilidad a la idea de delegar tareas completas de ingeniería en un agente.","technologies":["Devin"],"relatedConcepts":["autonomous-agents","agentic-coding"],"sources":[{"title":"Cognition: Introducing Devin","url":"https://cognition.com/blog/introducing-devin"}]},{"id":"claude-code","lane":"ai-tools","name":"Agentes de código en terminal","start":2025.15,"end":null,"dateLabel":"Febrero de 2025 (Claude Code)","precision":"exact","status":"needs-review","lastVerified":null,"description":"Anthropic lanzó Claude Code en vista previa de investigación el 24 de febrero de 2025, y le dio disponibilidad general en mayo de ese año. Codex CLI, Gemini CLI y otros agentes de terminal llevan el mismo enfoque a otros modelos.","importance":"Acercó el bucle completo de agente al entorno habitual del desarrollador, y extendió el uso de instrucciones, skills y hooks.","technologies":["Claude Code","Codex CLI","Gemini CLI","Aider"],"relatedConcepts":["agentic-coding","terminal-agents"],"sources":[{"title":"Claude Code: notas de versión","url":"https://docs.anthropic.com/en/release-notes/claude-code"},{"title":"Claude Code: overview","url":"https://code.claude.com/docs/en/overview"},{"title":"Gemini CLI: Documentation","url":"https://geminicli.com/docs/"}],"coexists":"Aider ya trabajaba en terminal antes de esa fecha: no es un inicio absoluto de la categoría."},{"id":"ai-agents","lane":"ai-concepts","name":"AI agents","start":2022.75,"end":null,"dateLabel":"Desde 2022–2023","precision":"approximate","status":"needs-review","lastVerified":null,"description":"La idea de agente es muy anterior a los LLM. En su forma actual, trabajos como ReAct (octubre de 2022) y el function calling de los modelos (2023) hicieron práctico alternar razonamiento y acción.","importance":"Sentaron la base técnica: un modelo que usa herramientas en bucle.","technologies":["ReAct","Function calling","Tool use"],"relatedConcepts":["ai-agents","tool-calling"],"sources":[{"title":"ReAct: Synergizing Reasoning and Acting in Language Models","url":"https://arxiv.org/abs/2210.03629","note":"arXiv, octubre de 2022"},{"title":"OpenAI API: Function calling","url":"https://platform.openai.com/docs/guides/function-calling"}]},{"id":"multi-agent","lane":"ai-concepts","name":"Multi-agent systems","start":2023.6,"end":null,"dateLabel":"Desde 2023 con LLM","precision":"approximate","status":"verified","lastVerified":"2026-11-05","description":"Los sistemas multiagente son un campo antiguo. Con LLM, trabajos como AutoGen (agosto de 2023) popularizaron la colaboración entre agentes. Hoy lo más común es la jerarquía orquestador-subagentes.","importance":"Permitió superar los límites de una sola ventana de contexto, a costa de bastantes más tokens: Anthropic estima unas 15 veces los de un chat.","technologies":["AutoGen","LangGraph","Subagentes"],"relatedConcepts":["multi-agent-systems","subagents","orchestrators"],"sources":[{"title":"AutoGen: Next-Gen LLM Applications via Multi-Agent Conversation","url":"https://arxiv.org/abs/2308.08155","note":"arXiv, agosto de 2023"},{"title":"Anthropic: How we built our multi-agent research system","url":"https://www.anthropic.com/engineering/multi-agent-research-system"}]},{"id":"mcp","lane":"ai-concepts","name":"Model Context Protocol","start":2024.9,"end":null,"dateLabel":"Noviembre de 2024","precision":"exact","status":"verified","lastVerified":"2026-11-05","description":"Anthropic publicó MCP como estándar abierto el 25 de noviembre de 2024. En diciembre de 2025 pasó a la Agentic AI Foundation de la Linux Foundation, junto con AGENTS.md y goose.","importance":"Dio a la industria una forma común de conectar agentes con herramientas y datos.","technologies":["MCP","JSON-RPC"],"relatedConcepts":["mcp","mcp-servers"],"sources":[{"title":"Anthropic: Introducing the Model Context Protocol","url":"https://www.anthropic.com/news/model-context-protocol","note":"25 de noviembre de 2024"},{"title":"Linux Foundation: formation of the Agentic AI Foundation","url":"https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation","note":"9 de diciembre de 2025"},{"title":"MCP Specification 2026-07-28: Architecture","url":"https://modelcontextprotocol.io/specification/2026-07-28/architecture"}]},{"id":"agentic-coding","lane":"ai-concepts","name":"Agentic coding","start":2025,"end":null,"dateLabel":"Aprox. desde 2025","precision":"approximate","status":"needs-review","lastVerified":null,"description":"El término se generalizó al hacerse habituales los agentes que editan, ejecutan y verifican. No tiene una fecha de origen clara ni un autor: es una descripción que se difundió en el sector.","importance":"Desplaza el trabajo de escribir código a especificar, supervisar y revisar.","technologies":["Claude Code","Codex","Cursor"],"relatedConcepts":["agentic-coding"],"sources":[{"title":"Claude Code: overview","url":"https://code.claude.com/docs/en/overview"},{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"}]},{"id":"vibe-coding","lane":"ai-concepts","name":"Vibe coding","start":2025.1,"end":null,"dateLabel":"Febrero de 2025","precision":"exact","status":"verified","lastVerified":"2026-11-05","description":"Andrej Karpathy acuñó el término el 6 de febrero de 2025 para describir construir software con un LLM sin revisar el código.","importance":"Puso nombre a un uso real, útil en prototipos. También ha generado confusión al aplicarse a cualquier programación con IA.","technologies":["LLM"],"relatedConcepts":["vibe-coding"],"sources":[{"title":"Simon Willison: Not all AI-assisted programming is vibe coding","url":"https://simonwillison.net/2025/Mar/19/vibe-coding/"}]},{"id":"context-engineering","lane":"ai-concepts","name":"Context engineering","start":2025.5,"end":null,"dateLabel":"Se difunde en 2025","precision":"approximate","status":"verified","lastVerified":"2026-11-05","description":"A lo largo de 2025 se extendió este término para referirse a gestionar toda la información que recibe un modelo. Anthropic publicó el 29 de septiembre de 2025 una guía de referencia.","importance":"Amplió la atención del prompt al estado completo del contexto en agentes de larga duración.","technologies":["Compactación","Memoria","Subagentes"],"relatedConcepts":["context-engineering","context-management"],"sources":[{"title":"Anthropic: Effective context engineering for AI agents","url":"https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents","note":"29 de septiembre de 2025"}],"coexists":"No sustituye a la ingeniería de prompts: la engloba."},{"id":"agents-md","lane":"ai-concepts","name":"AGENTS.md y estandarización","start":2025.6,"end":null,"dateLabel":"Aprox. 2025; AAIF en diciembre de 2025","precision":"approximate","status":"verified","lastVerified":"2026-11-05","description":"AGENTS.md surgió como convención común de instrucciones para agentes, y OpenAI lo aportó a la Agentic AI Foundation, anunciada el 9 de diciembre de 2025.","importance":"Muestra que el ecosistema empieza a converger en formatos abiertos.","technologies":["AGENTS.md","AAIF"],"relatedConcepts":["agents-md"],"sources":[{"title":"AGENTS.md","url":"https://agents.md/","note":"Sitio oficial del formato"},{"title":"Linux Foundation: formation of the Agentic AI Foundation","url":"https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation","note":"9 de diciembre de 2025"}]},{"id":"agentic-engineering","lane":"ai-concepts","name":"Agentic engineering","start":2026.1,"end":null,"dateLabel":"Comienzos de 2026","precision":"approximate","status":"needs-review","lastVerified":null,"description":"A comienzos de 2026, crónicas del sector atribuyen a Andrej Karpathy la propuesta de este término como sucesor profesional del vibe coding. Las fuentes secundarias consultadas discrepan en la fecha exacta.","importance":"Refleja el paso de experimentar con agentes a tratarlos como parte de una práctica profesional.","technologies":["Orquestación","Revisión","Evals"],"relatedConcepts":["agentic-engineering"],"sources":[{"title":"The New Stack: Vibe coding is passé","url":"https://thenewstack.io/vibe-coding-is-passe/","note":"Fuente secundaria"}]},{"id":"harness-engineering","lane":"ai-concepts","name":"Harness engineering","start":2026.1,"end":null,"dateLabel":"Febrero–abril de 2026","precision":"approximate","status":"verified","lastVerified":"2026-11-05","description":"OpenAI publicó un artículo sobre esta práctica a comienzos de 2026, y Birgitta Böckeler la analizó el 2 de abril de 2026 en martinfowler.com, organizándola en guías y sensores.","importance":"Pone el foco en el sistema que rodea al agente, no solo en el modelo.","technologies":["Linters","Tests","Hooks"],"relatedConcepts":["harness-engineering","agentic-harness"],"sources":[{"title":"Birgitta Böckeler: Harness engineering for coding agent users","url":"https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html","note":"martinfowler.com, 2 de abril de 2026"},{"title":"OpenAI: Harness engineering","url":"https://openai.com/index/harness-engineering/","note":"Fuente primaria; bloqueó la lectura automática, contrastar a mano"}],"coexists":"Complementa a la ingeniería de contexto. No es una etapa que la reemplace."}]},"tools":{"capabilities":[["agentsMd","Lee AGENTS.md"],["mcp","MCP"],["skills","Skills"],["subagents","Subagentes"],["hooks","Hooks"],["worktrees","Git Worktrees"],["terminal","Terminal / CLI"],["ide","IDE o extensión"],["cloud","Ejecución en la nube"],["anyModel","Varios proveedores de modelos"]],"items":[{"id":"claude-code","name":"Claude Code","popular":true,"docs":"https://code.claude.com/docs/en/overview","description":"Herramienta de programación agéntica de Anthropic: lee el código, edita archivos, ejecuta comandos y se integra con tus herramientas. Disponible en terminal, IDE, app de escritorio y web.","features":["Instrucciones con `CLAUDE.md` o `AGENTS.md`, y auto memory.","Skills, subagentes y hooks.","Conexión a herramientas externas con MCP.","Sesiones aisladas con `--worktree` y subagentes con `isolation: worktree`.","Modo no interactivo (`claude -p`) para scripts y CI.","Integración con GitHub Actions y GitLab CI/CD.","Tareas programadas, en la nube o en el escritorio."],"useCases":["Implementar funcionalidades y corregir bugs en varios archivos.","Automatizar tests, migraciones y dependencias.","Revisión de código y triaje en CI.","Trabajo en paralelo con varias sesiones."],"advantages":["Las mismas instrucciones, ajustes y servidores MCP funcionan en todas sus superficies.","Muy configurable mediante skills, hooks y subagentes.","Se puede automatizar en scripts."],"limitations":["La mayoría de superficies requieren una suscripción de Claude o una cuenta de Anthropic Console.","Centrada en modelos Claude, aunque CLI y extensiones admiten proveedores externos que los sirven.","Un `.claude/settings.json` mal configurado o permisos amplios conllevan riesgo real en tu máquina."],"relatedConcepts":["terminal-agents","agentic-coding","claude-md","skills","subagents","hooks","git-worktrees"],"sources":[{"title":"Claude Code: overview","url":"https://code.claude.com/docs/en/overview"},{"title":"Claude Code: Run parallel sessions with worktrees","url":"https://code.claude.com/docs/en/worktrees"},{"title":"Claude Code: Hooks reference","url":"https://code.claude.com/docs/en/hooks"},{"title":"Claude Code: Skills","url":"https://code.claude.com/docs/en/skills"},{"title":"Claude Code: Subagents","url":"https://code.claude.com/docs/en/sub-agents"}],"capabilities":{"agentsMd":{"value":"yes","note":"Si no hay CLAUDE.md, o importado desde él."},"mcp":{"value":"yes"},"skills":{"value":"yes"},"subagents":{"value":"yes"},"hooks":{"value":"yes"},"worktrees":{"value":"yes"},"terminal":{"value":"yes"},"ide":{"value":"yes","note":"VS Code y JetBrains."},"cloud":{"value":"yes","note":"Claude Code en la web."},"anyModel":{"value":"partial","note":"Modelos Claude, también por proveedores externos."}},"category":"terminal-agents","categoryLabel":"Terminal coding agents","status":"verified","lastVerified":"2026-11-05"},{"id":"cursor","name":"Cursor","popular":true,"docs":"https://cursor.com/docs","description":"Editor con agente integrado para entender código, planificar y construir funcionalidades, corregir errores y revisar cambios, con modelos de varios proveedores.","features":["Agente con Plan Mode.","Autocompletado Tab.","Rules, skills, plugins y MCP.","Subagentes y hooks.","Cloud Agents.","Worktrees.","Integraciones con GitHub, GitLab, Slack y Linear, entre otros."],"useCases":["Desarrollo diario en un editor gráfico.","Revisar diffs visualmente mientras trabaja el agente.","Delegar tareas en agentes en la nube."],"advantages":["Experiencia integrada de edición y agente.","Permite elegir entre modelos de varios proveedores.","Admite ampliaciones con skills, MCP y reglas."],"limitations":["Es un entorno propio: adoptarlo implica cambiar de editor.","La tabla de modelos y sus capacidades cambian: comprueba la documentación vigente."],"editorialNote":"La presencia de subagentes, hooks, Cloud Agents y worktrees se ha confirmado por las páginas del índice oficial de documentación, no probando el producto.","relatedConcepts":["ai-coding-assistants","code-editors","rules","mcp"],"sources":[{"title":"Cursor: Documentation","url":"https://cursor.com/docs"},{"title":"Cursor: índice de documentación (llms.txt)","url":"https://cursor.com/llms.txt"},{"title":"AGENTS.md","url":"https://agents.md/","note":"Sitio oficial del formato"}],"capabilities":{"agentsMd":{"value":"yes","note":"Según agents.md."},"mcp":{"value":"yes"},"skills":{"value":"yes"},"subagents":{"value":"yes"},"hooks":{"value":"yes"},"worktrees":{"value":"yes"},"terminal":{"value":"unknown"},"ide":{"value":"yes"},"cloud":{"value":"yes","note":"Cloud Agents."},"anyModel":{"value":"yes"}},"category":"ai-ides","categoryLabel":"AI IDEs","status":"verified","lastVerified":"2026-11-05"},{"id":"openai-codex","name":"OpenAI Codex","popular":true,"docs":"https://learn.chatgpt.com/docs","aliases":["Codex CLI"],"description":"La herramienta de OpenAI para trabajar en código y otras tareas: recopila contexto, actúa y produce resultados. Disponible en las apps de ChatGPT, web, CLI, extensión de IDE y Codex Cloud.","features":["Configuración de agente con `AGENTS.md`.","Skills y plugins.","Subagentes.","Extensión con servidores MCP.","Git worktrees como opción de entorno.","Trabajo local y en la nube."],"useCases":["Explorar código y construir funcionalidades.","Revisar cambios y corregir fallos.","Delegar tareas en la nube."],"advantages":["Varias superficies para una misma herramienta.","Soporte nativo de AGENTS.md.","Opción de ejecutar en local o en la nube."],"limitations":["No confundir con el modelo Codex de 2021, que tenía el mismo nombre.","La documentación consultada no aclara por sí sola la licencia de la CLI ni los hooks."],"relatedConcepts":["terminal-agents","agents-md","agentic-coding"],"sources":[{"title":"OpenAI: Codex documentation","url":"https://learn.chatgpt.com/docs"},{"title":"AGENTS.md","url":"https://agents.md/","note":"Sitio oficial del formato"}],"capabilities":{"agentsMd":{"value":"yes"},"mcp":{"value":"yes"},"skills":{"value":"yes"},"subagents":{"value":"yes"},"hooks":{"value":"unknown"},"worktrees":{"value":"yes"},"terminal":{"value":"yes"},"ide":{"value":"yes"},"cloud":{"value":"yes","note":"Codex Cloud."},"anyModel":{"value":"unknown"}},"category":"terminal-agents","categoryLabel":"Terminal coding agents","status":"verified","lastVerified":"2026-11-05"},{"id":"github-copilot","name":"GitHub Copilot","popular":true,"docs":"https://docs.github.com/en/copilot/get-started/what-is-github-copilot","description":"El asistente de IA de GitHub: sugerencias en línea, preguntas sobre código, revisión de PR y un agente que convierte un issue en un pull request.","features":["Sugerencias de código mientras escribes.","Preguntas sobre archivos y repositorios.","Trabajo agéntico en varios pasos.","Revisión de código y PR.","Instrucciones personalizadas, prompts reutilizables y agentes personalizados.","Copilot CLI en terminal, con MCP."],"useCases":["Autocompletado diario.","Delegar un issue y recibir un PR.","Revisión automática dentro de GitHub."],"advantages":["Integración profunda con GitHub.","Punto de entrada sencillo, con varios planes."],"limitations":["Las capacidades dependen del plan, del cliente y de las políticas de la organización.","Copilot CLI no admite actualmente las políticas MCP a nivel de organización, según su documentación."],"relatedConcepts":["ai-coding-assistants","pull-requests","automated-code-review","ai-assisted-development"],"sources":[{"title":"GitHub Docs: What is GitHub Copilot?","url":"https://docs.github.com/en/copilot/get-started/what-is-github-copilot"},{"title":"GitHub Docs: About GitHub Copilot CLI","url":"https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli"},{"title":"GitHub Blog: Copilot is generally available","url":"https://github.blog/2022-06-21-github-copilot-is-generally-available-to-all-developers/","note":"21 de junio de 2022"},{"title":"AGENTS.md","url":"https://agents.md/","note":"Sitio oficial del formato"}],"capabilities":{"agentsMd":{"value":"partial","note":"agents.md cita al coding agent de Copilot."},"mcp":{"value":"yes"},"skills":{"value":"unknown"},"subagents":{"value":"partial","note":"Documenta “custom agents”; no se ha confirmado que sean equivalentes."},"hooks":{"value":"unknown"},"worktrees":{"value":"unknown"},"terminal":{"value":"yes","note":"Copilot CLI."},"ide":{"value":"yes"},"cloud":{"value":"yes","note":"Agente que trabaja de issue a PR."},"anyModel":{"value":"unknown"}},"category":"coding-assistants","categoryLabel":"Coding assistants","status":"verified","lastVerified":"2026-11-05"},{"id":"windsurf","name":"Devin Desktop (antes Windsurf)","popular":true,"docs":"https://docs.devin.ai/desktop/cascade/cascade","aliases":["Windsurf","Cascade","Devin Local"],"description":"El editor antes conocido como Windsurf, hoy de Cognition y renombrado Devin Desktop. Su agente actual es Devin Local; Cascade queda como agente heredado.","editorialNote":"La documentación de Windsurf redirige ya a docs.devin.ai. Indica que Devin Desktop no inicia conversaciones nuevas de Cascade. La adquisición (julio de 2025) y la fecha del cambio de nombre (junio de 2026) proceden de fuentes secundarias.","features":["Agente Devin Local (Cascade como agente heredado).","Reglas y memorias.","Sesiones en su propio git worktree.","Hook `post_setup_worktree`.","Skills, recomendadas como destino de los workflows de Cascade.","MCP entre las herramientas documentadas en Cascade."],"useCases":["Desarrollo diario en un editor con agente.","Sesiones paralelas aisladas en worktrees."],"advantages":["Worktrees integrados, con hasta 20 por espacio de trabajo.","Rutas heredadas `.windsurf/` que siguen funcionando."],"limitations":["Producto en plena transición: hay documentación y funciones heredadas.","Los workflows de Cascade no se admiten en Devin Local.","El worktree solo se elige al iniciar la sesión."],"relatedConcepts":["ai-coding-assistants","git-worktrees","rules","persistent-memory"],"sources":[{"title":"Devin Desktop: Cascade","url":"https://docs.devin.ai/desktop/cascade/cascade"},{"title":"AGENTS.md","url":"https://agents.md/","note":"Sitio oficial del formato"}],"capabilities":{"agentsMd":{"value":"yes","note":"agents.md cita a Windsurf."},"mcp":{"value":"partial","note":"Documentado en Cascade, el agente heredado."},"skills":{"value":"yes"},"subagents":{"value":"unknown"},"hooks":{"value":"partial","note":"Documentado al menos post_setup_worktree."},"worktrees":{"value":"yes"},"terminal":{"value":"unknown"},"ide":{"value":"yes"},"cloud":{"value":"unknown"},"anyModel":{"value":"unknown"}},"category":"ai-ides","categoryLabel":"AI IDEs","status":"verified","lastVerified":"2026-11-05"},{"id":"gemini-cli","name":"Gemini CLI","popular":true,"docs":"https://geminicli.com/docs/","description":"Lleva los modelos Gemini a la terminal para entender código, automatizar tareas y crear flujos usando el contexto local del proyecto.","editorialNote":"Su documentación indica que, desde el 18 de junio de 2026, Antigravity CLI lo sustituye para los usuarios del nivel gratuito y de Google One. Comprueba si sigue siendo la opción adecuada para tu plan.","features":["Contexto de proyecto con `GEMINI.md`.","Servidores MCP.","Extensiones.","Agent Skills.","Subagentes (experimental).","Hooks.","Checkpointing de sesión."],"useCases":["Automatizar tareas desde la terminal.","Entender y modificar repositorios con Gemini."],"advantages":["Se instala con npm.","Amplio conjunto de puntos de extensión."],"limitations":["Sustituido por Antigravity CLI para parte de sus usuarios.","Según su documentación, no está optimizado para Gemini 4 Argon.","Los subagentes son experimentales."],"relatedConcepts":["terminal-agents","mcp","skills","hooks"],"sources":[{"title":"Gemini CLI: Documentation","url":"https://geminicli.com/docs/"},{"title":"AGENTS.md","url":"https://agents.md/","note":"Sitio oficial del formato"}],"capabilities":{"agentsMd":{"value":"yes","note":"Según agents.md."},"mcp":{"value":"yes"},"skills":{"value":"yes"},"subagents":{"value":"partial","note":"Experimental."},"hooks":{"value":"yes"},"worktrees":{"value":"unknown"},"terminal":{"value":"yes"},"ide":{"value":"unknown"},"cloud":{"value":"unknown"},"anyModel":{"value":"unknown"}},"category":"terminal-agents","categoryLabel":"Terminal coding agents","status":"verified","lastVerified":"2026-11-05"},{"id":"aider","name":"Aider","popular":true,"docs":"https://aider.chat/docs/","description":"“Pair programming” con IA en la terminal, muy integrado con Git y compatible con la mayoría de los LLM.","features":["Mapa del repositorio para dar contexto al modelo.","Integración estrecha con Git.","Modos code, architect, ask y help.","Corrección automática de errores de lint y test.","Convenciones en un archivo como `CONVENTIONS.md`."],"useCases":["Programar en pareja desde la terminal.","Usar el modelo o proveedor que prefieras, incluidos locales."],"advantages":["Gran libertad de modelos: OpenAI, Anthropic, Gemini, DeepSeek, Ollama, LM Studio, OpenRouter y más.","Su integración con Git facilita revisar y deshacer."],"limitations":["La página consultada no menciona MCP, skills, subagentes ni hooks.","Requiere gestionar claves y costes de cada proveedor."],"relatedConcepts":["terminal-agents","git-fundamentals","model-providers"],"sources":[{"title":"Aider: Documentation","url":"https://aider.chat/docs/"},{"title":"Aider: Specifying coding conventions","url":"https://aider.chat/docs/usage/conventions.html"},{"title":"AGENTS.md","url":"https://agents.md/","note":"Sitio oficial del formato"}],"capabilities":{"agentsMd":{"value":"yes","note":"Según agents.md."},"mcp":{"value":"unknown"},"skills":{"value":"unknown"},"subagents":{"value":"unknown"},"hooks":{"value":"unknown"},"worktrees":{"value":"unknown"},"terminal":{"value":"yes"},"ide":{"value":"unknown"},"cloud":{"value":"unknown"},"anyModel":{"value":"yes"}},"category":"terminal-agents","categoryLabel":"Terminal coding agents","status":"verified","lastVerified":"2026-11-05"},{"id":"cline","name":"Cline","popular":true,"docs":"https://docs.cline.bot/","description":"Agente de código para editor y terminal que lee y escribe archivos, ejecuta comandos y usa un navegador, pidiendo tu aprobación explícita en cada acción.","features":["Modos Plan y Act.","Aprobación humana de cada acción.","Checkpoints para retroceder.","MCP, con servidores locales y remotos.","CLI, app de escritorio, extensión de VS Code y plugin de JetBrains.","Kanban para gestionar agentes en paralelo.","Bring Your Own Key."],"useCases":["Trabajar con supervisión estrecha.","Usar tus propias credenciales de proveedor o un modelo local.","Automatización sin interfaz con la CLI."],"advantages":["Control humano por defecto.","Muchos editores y proveedores.","Separación clara entre planificar y actuar."],"limitations":["Aprobar cada acción puede resultar lento en tareas largas.","Su documentación llama open source a la app de escritorio; verifica la licencia de cada componente."],"relatedConcepts":["ai-coding-assistants","planning-reasoning","permissions","mcp"],"sources":[{"title":"Cline: Documentation","url":"https://docs.cline.bot/"},{"title":"Cline: Plan & Act","url":"https://docs.cline.bot/features/plan-and-act"},{"title":"Cline: MCP overview","url":"https://docs.cline.bot/mcp/mcp-overview"}],"capabilities":{"agentsMd":{"value":"unknown"},"mcp":{"value":"yes"},"skills":{"value":"unknown"},"subagents":{"value":"unknown"},"hooks":{"value":"unknown"},"worktrees":{"value":"unknown"},"terminal":{"value":"yes"},"ide":{"value":"yes"},"cloud":{"value":"unknown"},"anyModel":{"value":"yes","note":"BYOK, incluidos entornos locales."}},"category":"coding-assistants","categoryLabel":"Coding assistants","status":"verified","lastVerified":"2026-11-05"},{"id":"claude-agent-sdk","name":"Claude Agent SDK","docs":"https://code.claude.com/docs/en/agent-sdk/overview","description":"Biblioteca para Python y TypeScript que da a tus aplicaciones las mismas herramientas, bucle de agente y gestión de contexto que impulsan a Claude Code.","features":["Herramientas integradas de archivos, comandos y web.","Hooks, subagentes y MCP.","Permisos y sesiones.","Skills, comandos y memoria desde `.claude/`."],"useCases":["Incrustar un agente en tu aplicación.","Construir agentes con orquestación y permisos propios."],"advantages":["Reutiliza un harness maduro en vez de escribirlo.","Disponible en Python y TypeScript."],"limitations":["Vinculado a modelos Claude.","Sujeto a los términos comerciales de Anthropic; usa autenticación por API key."],"relatedConcepts":["agent-architecture","agentic-harness","subagents"],"sources":[{"title":"Claude Agent SDK: overview","url":"https://code.claude.com/docs/en/agent-sdk/overview"}],"category":"agent-frameworks","categoryLabel":"Agent frameworks","status":"verified","lastVerified":"2026-11-05"},{"id":"langgraph","name":"LangGraph","docs":"https://docs.langchain.com/oss/python/langgraph/overview","description":"Framework y runtime de bajo nivel para agentes de larga duración y con estado, que se definen como grafos de estado, nodos y aristas.","features":["Ejecución duradera con checkpoints.","Intervención humana: detener, revisar o modificar el estado.","Memoria a corto y largo plazo.","Combinación de pasos de código y de LLM."],"useCases":["Workflows con estado que deben sobrevivir a fallos.","Agentes que requieren aprobación humana."],"advantages":["Control explícito del flujo.","No impone prompts ni un diseño de agente."],"limitations":["Es de bajo nivel: hay que diseñar más piezas.","Añade una abstracción que conviene comprender antes de adoptarla."],"relatedConcepts":["agent-orchestration","workflows","orchestrators"],"sources":[{"title":"LangGraph: overview","url":"https://docs.langchain.com/oss/python/langgraph/overview"}],"category":"agent-frameworks","categoryLabel":"Agent frameworks","status":"verified","lastVerified":"2026-11-05"},{"id":"autogen","name":"AutoGen","docs":"https://github.com/microsoft/autogen","description":"Framework de Microsoft para aplicaciones con varios agentes que colaboran conversando. Importante en la historia del sector, pero ya archivado.","editorialNote":"El repositorio indica que el proyecto está archivado y sin mantenimiento, ni siquiera de seguridad, y presenta Microsoft Agent Framework como su sucesor. No lo uses en proyectos nuevos.","features":["Agentes que colaboran mediante conversación.","Participación humana opcional.","Uso de herramientas externas."],"useCases":["Estudiar patrones multiagente.","Mantener sistemas ya existentes mientras se migran."],"advantages":["Trabajo influyente en la adopción de sistemas multiagente."],"limitations":["Archivado: sin correcciones, seguridad ni soporte.","Los usuarios deben migrar a Microsoft Agent Framework."],"relatedConcepts":["multi-agent-systems","agent-orchestration"],"sources":[{"title":"microsoft/autogen en GitHub","url":"https://github.com/microsoft/autogen"},{"title":"AutoGen: Next-Gen LLM Applications via Multi-Agent Conversation","url":"https://arxiv.org/abs/2308.08155","note":"arXiv, agosto de 2023"}],"category":"agent-frameworks","categoryLabel":"Agent frameworks","status":"verified","lastVerified":"2026-11-05"},{"id":"mcp-inspector","name":"MCP Inspector","docs":"https://modelcontextprotocol.io/docs/tools/inspector","description":"La herramienta de referencia para probar y depurar servidores MCP, con clientes web, CLI y TUI en un solo paquete.","features":["Interfaz web, CLI y TUI.","Conexión a servidores locales y remotos.","Se ejecuta con `npx`, sin instalación.","Salida legible por máquina para CI."],"useCases":["Depurar un servidor MCP en desarrollo.","Comprobar herramientas expuestas en CI.","Inspeccionar un servidor de terceros antes de usarlo."],"advantages":["Permite ver el intercambio JSON-RPC.","Mismo núcleo en sus tres interfaces."],"limitations":["Requiere Node 22.19.0 o superior.","Sin keychain, guarda los secretos en un archivo sin cifrar salvo que aportes una clave."],"relatedConcepts":["mcp","mcp-servers"],"sources":[{"title":"MCP Inspector","url":"https://modelcontextprotocol.io/docs/tools/inspector"}],"category":"mcp-tools","categoryLabel":"MCP tools","status":"verified","lastVerified":"2026-11-05"},{"id":"playwright","name":"Playwright","docs":"https://playwright.dev/docs/intro","description":"Framework de pruebas end-to-end que automatiza navegadores reales.","features":["Pruebas en Chromium, Firefox y WebKit.","Localizadores por rol y texto.","Modo sin interfaz para CI."],"useCases":["Probar flujos críticos de una web.","Dar a un agente una forma de comprobar la interfaz."],"advantages":["Pruebas cercanas a la experiencia real."],"limitations":["Pruebas más lentas que las unitarias."],"relatedConcepts":["e2e-testing","ai-generated-code-testing"],"sources":[{"title":"Playwright: Introduction","url":"https://playwright.dev/docs/intro"}],"category":"testing-tools","categoryLabel":"Testing tools","status":"needs-review","lastVerified":null},{"id":"eslint","name":"ESLint","docs":"https://eslint.org/docs/latest/","description":"Linter configurable para JavaScript que detecta problemas y aplica convenciones.","features":["Reglas configurables y reglas propias.","Corrección automática de parte de los problemas."],"useCases":["Imponer convenciones en CI.","Dar feedback inmediato a un agente."],"advantages":["Rápido y determinista."],"limitations":["No detecta errores de lógica de negocio."],"relatedConcepts":["static-analysis","harness-engineering"],"sources":[{"title":"ESLint: Documentation","url":"https://eslint.org/docs/latest/"}],"category":"testing-tools","categoryLabel":"Testing tools","status":"needs-review","lastVerified":null},{"id":"sonarqube","name":"SonarQube","docs":"https://docs.sonarsource.com/sonarqube-server/latest/","description":"Plataforma de análisis continuo de calidad y seguridad del código.","features":["Análisis estático para varios lenguajes.","Criterios de calidad integrables en CI."],"useCases":["Controlar la calidad de forma centralizada."],"advantages":["Visión de conjunto del estado del código."],"limitations":["Requiere ajustar reglas para no generar ruido."],"relatedConcepts":["static-analysis","code-quality","automated-code-review"],"sources":[{"title":"SonarQube: Documentation","url":"https://docs.sonarsource.com/sonarqube-server/latest/"}],"category":"testing-tools","categoryLabel":"Testing tools","status":"needs-review","lastVerified":null},{"id":"github-actions-tool","name":"GitHub Actions","docs":"https://docs.github.com/en/actions","description":"Automatización integrada en GitHub: workflows en YAML que se ejecutan por eventos del repositorio.","features":["Workflows, jobs, steps y actions.","Runners alojados o propios.","Disparadores por push, PR, calendario o manuales."],"useCases":["CI/CD en repositorios de GitHub.","Ejecutar agentes o revisiones en cada PR."],"advantages":["Integrado con pull requests."],"limitations":["Las acciones de terceros son un riesgo de cadena de suministro."],"relatedConcepts":["github-actions","ci-cd"],"sources":[{"title":"GitHub Docs: Understanding GitHub Actions","url":"https://docs.github.com/en/actions/get-started/understand-github-actions"}],"category":"devops-tools","categoryLabel":"DevOps tools","status":"verified","lastVerified":"2026-11-05"},{"id":"docker-tool","name":"Docker","docs":"https://docs.docker.com/get-started/docker-overview/","description":"Plataforma para construir, distribuir y ejecutar aplicaciones en contenedores.","features":["Imágenes y contenedores.","Dockerfile para definir builds."],"useCases":["Empaquetar servicios.","Aislar la ejecución de un agente."],"advantages":["Entornos reproducibles."],"limitations":["Aislamiento menor que el de una máquina virtual."],"relatedConcepts":["docker","dev-environments"],"sources":[{"title":"Docker Docs: Docker overview","url":"https://docs.docker.com/get-started/docker-overview/"}],"category":"devops-tools","categoryLabel":"DevOps tools","status":"verified","lastVerified":"2026-11-05"},{"id":"kubernetes-tool","name":"Kubernetes","docs":"https://kubernetes.io/docs/concepts/overview/","description":"Plataforma de código abierto para orquestar contenedores de forma declarativa.","features":["Autorreparación.","Escalado.","Actualizaciones graduales."],"useCases":["Operar muchos servicios en producción."],"advantages":["Modelo declarativo muy extendido."],"limitations":["Complejidad operativa alta."],"relatedConcepts":["kubernetes","microservices"],"sources":[{"title":"Kubernetes: Overview","url":"https://kubernetes.io/docs/concepts/overview/"}],"category":"devops-tools","categoryLabel":"DevOps tools","status":"verified","lastVerified":"2026-11-05"},{"id":"terraform-tool","name":"Terraform","docs":"https://developer.hashicorp.com/terraform/intro","description":"Herramienta de infraestructura como código de HashiCorp.","features":["Configuración declarativa en HCL.","`plan` y `apply`.","Providers para muchos servicios."],"useCases":["Crear y versionar infraestructura en la nube."],"advantages":["Plan revisable antes de aplicar."],"limitations":["El archivo de estado es delicado y puede contener secretos."],"relatedConcepts":["terraform","infrastructure-as-code"],"sources":[{"title":"HashiCorp: What is Terraform?","url":"https://developer.hashicorp.com/terraform/intro"}],"category":"devops-tools","categoryLabel":"DevOps tools","status":"needs-review","lastVerified":null}]}};
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
__define('app.js', (__require) => {
const { loadData } = __require('data-loader.js');
const { buildIndex } = __require('search.js');
const { route, match, parseHash, startRouter, refresh } = __require('router.js');
const { applyPrefs, subscribe, toggle, has } = __require('state.js');
const { $, $$, html, toast } = __require('utils/dom.js');
const { initShell, setSidebar, updateActiveNav } = __require('components/shell.js');
const { icon } = __require('components/icons.js');
const { emptyState } = __require('components/ui.js');

const { dashboardPage } = __require('pages/dashboard.js');
const { encyclopediaPage } = __require('pages/encyclopedia.js');
const { articlePage } = __require('pages/article.js');
const { timelinePage } = __require('pages/timeline.js');
const { toolsPage, toolDetailPage, toolComparePage } = __require('pages/tools.js');
const { compareIndexPage, comparisonPage, customComparePage } = __require('pages/compare.js');
const { labPage } = __require('pages/lab.js');
const { playgroundPage, examplePage } = __require('pages/playground.js');
const { pathsPage, pathDetailPage } = __require('pages/paths.js');
const { libraryPage } = __require('pages/library.js');
const { searchPage } = __require('pages/search-results.js');

route('/', dashboardPage);
route('/encyclopedia', encyclopediaPage);
route('/encyclopedia/:category', encyclopediaPage);
route('/article/:id', articlePage);
route('/timeline', timelinePage);
route('/timeline/:id', timelinePage);
route('/tools', toolsPage);
route('/tools/compare', toolComparePage);
route('/tools/:id', toolDetailPage);
route('/compare', compareIndexPage);
route('/compare/custom', customComparePage);
route('/compare/:id', comparisonPage);
route('/lab', labPage);
route('/lab/:id', labPage);
route('/playground', playgroundPage);
route('/playground/:id', examplePage);
route('/paths', pathsPage);
route('/paths/:id', pathDetailPage);
route('/library', libraryPage);
route('/search', searchPage);

const notFound = () => ({
  title: 'Página no encontrada',
  crumbs: [],
  content: html`<div class="page">${emptyState('Esta coordenada no está en el mapa', 'La dirección no corresponde a ninguna sección ni artículo del atlas.', html`<a class="btn btn-primary" href="#/">Volver al inicio</a>`)}</div>`,
});

let liveState = false;
let cleanup = null;

function renderCrumbs(crumbs) {
  const el = $('#crumbs');
  el.hidden = !crumbs?.length;
  if (!crumbs?.length) { el.innerHTML = ''; return; }
  el.innerHTML = html`<ol>${[{ label: 'Inicio', href: '#/' }, ...crumbs].map((c, i, all) => html`<li>${i < all.length - 1 && c.href
    ? html`<a href="${c.href}">${c.label}</a>${icon('chevron', 12)}`
    : html`<span aria-current="page">${c.label}</span>`}</li>`)}</ol>`.toString();
}

function render({ resetScroll, keepFocus, initial } = {}) {
  const { path, query } = parseHash();
  const matched = match(path);
  const page = matched ? matched.handler({ params: matched.params, query }) ?? notFound() : notFound();
  const view = $('#view');
  const focusKey = keepFocus && document.activeElement?.dataset?.ref
    ? `[data-toggle="${document.activeElement.dataset.toggle}"][data-ref="${document.activeElement.dataset.ref}"]`
    : null;

  cleanup?.();
  document.title = page.title ? `${page.title} · AI Dev Atlas` : 'AI Dev Atlas';
  renderCrumbs(page.crumbs);
  // Un contenedor nuevo por render evita acumular listeners entre páginas.
  const holder = document.createElement('div');
  holder.innerHTML = page.content.toString();
  view.replaceChildren(holder);
  cleanup = page.mount?.(holder) ?? null;
  liveState = Boolean(page.liveState);
  updateActiveNav(path);

  if (resetScroll) {
    window.scrollTo(0, 0);
    setSidebar(false);
    $('#main').focus({ preventScroll: true });
    $('#announcer').textContent = page.title ?? 'Inicio';
    view.classList.remove('enter');
    void view.offsetWidth;
    view.classList.add('enter');
  }
  if (focusKey) $(focusKey)?.focus({ preventScroll: true });
  if (initial) $('#main').blur();
}

function syncToggles() {
  $$('[data-toggle]').forEach((btn) => {
    const on = has(btn.dataset.toggle, btn.dataset.ref);
    const label = on ? btn.dataset.on : btn.dataset.off;
    btn.setAttribute('aria-pressed', String(on));
    btn.setAttribute('aria-label', label);
    btn.title = label;
    const span = $('.btn-label', btn);
    if (span) span.textContent = label;
  });
}

async function copyCode(button) {
  const code = button.closest('.code').querySelector('code').textContent;
  try {
    await navigator.clipboard.writeText(code);
  } catch {
    // Contextos sin permiso de portapapeles: se recurre a una selección temporal.
    const area = document.createElement('textarea');
    area.value = code;
    document.body.append(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }
  const label = $('span', button);
  label.textContent = 'Copiado';
  setTimeout(() => { label.textContent = 'Copiar'; }, 1500);
  toast('Código copiado al portapapeles');
}

function bindGlobalEvents() {
  document.addEventListener('click', (e) => {
    const toggler = e.target.closest('[data-toggle]');
    if (toggler) {
      toggle(toggler.dataset.toggle, toggler.dataset.ref);
      return;
    }
    const copier = e.target.closest('[data-copy]');
    if (copier) { copyCode(copier); return; }
    const scroller = e.target.closest('[data-scroll-to]');
    if (scroller) {
      e.preventDefault();
      document.getElementById(scroller.dataset.scrollTo)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  document.addEventListener('keydown', (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName ?? '');
    if ((e.key === '/' && !typing) || (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey))) {
      e.preventDefault();
      $('#global-search').focus();
    }
  });

  subscribe(() => {
    syncToggles();
    if (liveState) refresh();
  });
}

async function boot() {
  applyPrefs();
  try {
    await loadData();
  } catch (error) {
    const viaFile = location.protocol === 'file:';
    $('#view').innerHTML = html`<div class="page">${emptyState(
      'No se pudo cargar el contenido',
      viaFile
        ? 'El navegador bloquea la lectura de JSON desde file://. Sirve la carpeta con un servidor estático: python -m http.server 8123'
        : `Error al leer los datos: ${error.message}`,
    )}</div>`.toString();
    return;
  }
  buildIndex();
  initShell();
  bindGlobalEvents();
  startRouter(render);
}

boot();

return {  };
});
__define('components/diagram.js', (__require) => {
const { esc, raw } = __require('utils/dom.js');

// Punto donde la recta entre centros corta el borde del rectángulo del nodo.
function edgePoint(node, toward, pad = 5) {
  const cx = node.x + node.w / 2;
  const cy = node.y + node.h / 2;
  const dx = toward.x - cx;
  const dy = toward.y - cy;
  if (dx === 0 && dy === 0) return { x: cx, y: cy };
  const sx = dx === 0 ? Infinity : (node.w / 2 + pad) / Math.abs(dx);
  const sy = dy === 0 ? Infinity : (node.h / 2 + pad) / Math.abs(dy);
  const s = Math.min(sx, sy);
  return { x: cx + dx * s, y: cy + dy * s };
}

const center = (n) => ({ x: n.x + n.w / 2, y: n.y + n.h / 2 });

function wrapLabel(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  words.forEach((word) => {
    if ((`${line} ${word}`).trim().length > maxChars && line) { lines.push(line); line = word; }
    else line = `${line} ${word}`.trim();
  });
  if (line) lines.push(line);
  return lines;
}

// Dibuja un diagrama declarado en JSON: grupos, nodos seleccionables y aristas etiquetadas.
function renderDiagram(arch) {
  const nodeById = new Map(arch.nodes.map((n) => [n.id, n]));
  const [, , width, height] = arch.viewBox.split(' ').map(Number);

  const groups = (arch.groups ?? []).map((g) => `
    <g class="dg-group">
      <rect x="${g.x}" y="${g.y}" width="${g.w}" height="${g.h}" rx="10"/>
      <text x="${g.x + 14}" y="${g.y + 22}">${esc(g.label)}</text>
    </g>`).join('');

  const edges = arch.edges.map((e, i) => {
    const from = nodeById.get(e.from);
    const to = nodeById.get(e.to);
    const a = edgePoint(from, center(to));
    const b = edgePoint(to, center(from), 7);
    const lx = (a.x + b.x) / 2 + (e.lx ?? 0);
    const ly = (a.y + b.y) / 2 + (e.ly ?? 0);
    const start = e.both ? 'marker-start="url(#dg-arrow-start)"' : '';
    const label = e.label ? `
      <g class="dg-edge-label">
        <rect x="${lx - e.label.length * 3.15 - 5}" y="${ly - 10}" width="${e.label.length * 6.3 + 10}" height="20" rx="4"/>
        <text x="${lx}" y="${ly + 4}" text-anchor="middle">${esc(e.label)}</text>
      </g>` : '';
    return `<g class="dg-edge ${e.dashed ? 'dashed' : ''}" data-edge="${i}" data-from="${e.from}" data-to="${e.to}">
      <line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" marker-end="url(#dg-arrow)" ${start}/>${label}
    </g>`;
  }).join('');

  const nodes = arch.nodes.map((n) => {
    const lines = wrapLabel(n.label, Math.max(8, Math.floor(n.w / 8.2)));
    const totalLines = lines.length + (n.sublabel ? 1 : 0);
    const firstY = n.y + n.h / 2 - ((totalLines - 1) * 17) / 2 + 5;
    const labelSvg = lines.map((line, i) => `<text class="dg-label" x="${n.x + n.w / 2}" y="${firstY + i * 17}" text-anchor="middle">${esc(line)}</text>`).join('');
    const sub = n.sublabel ? `<text class="dg-sub" x="${n.x + n.w / 2}" y="${firstY + lines.length * 17}" text-anchor="middle">${esc(n.sublabel)}</text>` : '';
    return `<g class="dg-node kind-${n.kind ?? 'default'}" data-node="${n.id}" role="button" tabindex="0" aria-label="${esc(n.label)}: ver explicación">
      <rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="8"/>${labelSvg}${sub}
    </g>`;
  }).join('');

  return raw(`<svg class="diagram" viewBox="${arch.viewBox}" style="min-width:${Math.min(width, 620)}px" role="group" aria-label="Diagrama: ${esc(arch.title)}" data-height="${height}">
    <defs>
      <marker id="dg-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" class="dg-arrow-head"/></marker>
      <marker id="dg-arrow-start" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" class="dg-arrow-head"/></marker>
    </defs>
    ${groups}${edges}${nodes}
  </svg>`);
}

return { get renderDiagram() { return renderDiagram; } };
});
__define('components/icons.js', (__require) => {
const { raw } = __require('utils/dom.js');

// Iconografía de línea coherente (24×24, trazo 1.75). Derivada del set Lucide (licencia ISC).
const PATHS = {
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  timeline: '<path d="M3 6h9M3 12h15M3 18h6"/><circle cx="15" cy="6" r="2"/><circle cx="21" cy="12" r="0.5"/><circle cx="12" cy="18" r="2"/>',
  book: '<path d="M4 19.5V5a2 2 0 0 1 2-2h14v15H6.5A2.5 2.5 0 0 0 4 20.5 2.5 2.5 0 0 0 6.5 23H20v-5"/>',
  wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.8-.6-.6-2.8z"/>',
  columns: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M12 4v16"/>',
  network: '<rect x="9" y="2.5" width="6" height="5" rx="1"/><rect x="2.5" y="16.5" width="6" height="5" rx="1"/><rect x="15.5" y="16.5" width="6" height="5" rx="1"/><path d="M12 7.5V12M5.5 16.5V12h13v4.5"/>',
  code: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
  route: '<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H16a3.5 3.5 0 0 0 0-7H8a3.5 3.5 0 0 1 0-7h7.5"/>',
  bookmark: '<path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4.5L5 21V4a1 1 0 0 1 1-1z"/>',
  star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9z"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8 12.5 3 3 5-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20.5 20.5-4.5-4.5"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11z"/>',
  copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  arrowRight: '<path d="M4 12h16M14 6l6 6-6 6"/>',
  arrowLeft: '<path d="M20 12H4M10 6l-6 6 6 6"/>',
  chevron: '<path d="m9 6 6 6-6 6"/>',
  library: '<path d="M4 4v16M9 4v16M14 5l5 15"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
};

function icon(name, size = 18) {
  return raw(`<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PATHS[name] ?? ''}</svg>`);
}

return { get icon() { return icon; } };
});
__define('components/search-box.js', (__require) => {
const { $, $$, html } = __require('utils/dom.js');
const { go } = __require('router.js');
const { search, markHits, TYPE_LABELS } = __require('search.js');

const highlightHits = (text, tokens) => markHits(text, tokens).map((p) => (p.hit ? html`<mark>${p.text}</mark>` : p.text));

// Conecta un input con el panel de resultados instantáneos. Se reutiliza en cabecera e inicio.
function attachSearchBox(box) {
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

return { get attachSearchBox() { return attachSearchBox; }, get highlightHits() { return highlightHits; } };
});
__define('components/shell.js', (__require) => {
const { db } = __require('data-loader.js');
const { $, html } = __require('utils/dom.js');
const { getState, setPref, subscribe } = __require('state.js');
const { icon } = __require('components/icons.js');
const { progressBar, readCount } = __require('components/ui.js');
const { attachSearchBox } = __require('components/search-box.js');

const NAV = [
  { href: '#/', match: /^\/$/, label: 'Inicio', icon: 'home' },
  { href: '#/encyclopedia', match: /^\/(encyclopedia|article)/, label: 'Encyclopedia', icon: 'book' },
  { href: '#/timeline', match: /^\/timeline/, label: 'Timeline', icon: 'timeline' },
  { href: '#/tools', match: /^\/tools/, label: 'Tools Explorer', icon: 'wrench' },
  { href: '#/compare', match: /^\/compare/, label: 'Comparativas', icon: 'columns' },
  { href: '#/lab', match: /^\/lab/, label: 'Architecture Lab', icon: 'network' },
  { href: '#/playground', match: /^\/playground/, label: 'Playground', icon: 'code' },
  { href: '#/paths', match: /^\/paths/, label: 'Rutas de aprendizaje', icon: 'route' },
];

function renderSidebar() {
  const sidebar = $('#sidebar');
  sidebar.innerHTML = html`
    <a class="brand" href="#/" aria-label="AI Dev Atlas, inicio">
      <span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 32 32" width="26" height="26"><path d="M7 26 16 5l9 21" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="16" cy="19.5" r="3" fill="var(--accent)"/></svg></span>
      <span class="brand-name">AI Dev Atlas</span>
    </a>
    <nav class="nav">
      <ul>
        ${NAV.map((item) => html`<li><a class="nav-link" data-match="${item.match.source}" href="${item.href}">${icon(item.icon)}<span>${item.label}</span></a></li>`)}
      </ul>
      <p class="nav-heading">Índice</p>
      <ul class="nav-cats">
        ${db.categories.map((c) => html`<li><a class="nav-cat" data-cat="${c.id}" href="#/encyclopedia/${c.id}"><span class="nav-letter">${c.letter}</span><span>${c.name}</span></a></li>`)}
      </ul>
    </nav>
    <div class="sidebar-foot">
      <a class="nav-link" data-match="^\\/library" href="#/library">${icon('library')}<span>Mi biblioteca</span></a>
      <div id="sidebar-progress"></div>
    </div>`.toString();
  updateProgress();
}

function updateProgress() {
  const el = $('#sidebar-progress');
  if (!el) return;
  const done = readCount(db.concepts);
  el.innerHTML = html`<p class="small muted progress-label"><span>Tu progreso</span><span>${done} / ${db.concepts.length}</span></p>${progressBar(done, db.concepts.length, 'Artículos leídos')}`.toString();
}

function renderTopbar() {
  const bar = $('#topbar');
  bar.innerHTML = html`
    <button type="button" class="btn-ghost menu-toggle" id="menu-toggle" aria-label="Abrir menú" aria-controls="sidebar" aria-expanded="false">${icon('menu', 20)}</button>
    <div class="search-box" data-search-box role="search">
      <span class="search-icon">${icon('search', 16)}</span>
      <input type="search" id="global-search" placeholder="Buscar conceptos, herramientas, ejemplos…" aria-label="Buscar en todo el atlas" autocomplete="off" spellcheck="false">
      <kbd class="search-kbd" aria-hidden="true">/</kbd>
      <div class="search-panel" hidden></div>
    </div>
    <div class="topbar-actions">
      <a class="btn-ghost" id="top-library" href="#/library" aria-label="Mi biblioteca">${icon('star', 18)}<span class="counter" id="fav-count"></span></a>
      <button type="button" class="btn-ghost" id="theme-toggle" aria-label="Cambiar tema">${icon(getState().prefs.theme === 'dark' ? 'sun' : 'moon', 18)}</button>
    </div>`.toString();
  attachSearchBox($('[data-search-box]', bar));

  $('#theme-toggle').addEventListener('click', () => {
    const next = getState().prefs.theme === 'dark' ? 'light' : 'dark';
    setPref('theme', next);
    $('#theme-toggle').innerHTML = icon(next === 'dark' ? 'sun' : 'moon', 18).toString();
  });
  updateCounter();
}

function updateCounter() {
  const el = $('#fav-count');
  if (!el) return;
  const { favorites, readLater } = getState();
  const n = favorites.length + readLater.length;
  el.textContent = n || '';
  el.hidden = !n;
}

function setSidebar(open) {
  $('#sidebar').classList.toggle('open', open);
  $('#sidebar-backdrop').hidden = !open;
  document.body.classList.toggle('no-scroll', open);
  const toggleBtn = $('#menu-toggle');
  toggleBtn.setAttribute('aria-expanded', String(open));
  if (open) $('.nav-link', $('#sidebar'))?.focus();
  else if (document.activeElement?.closest('#sidebar')) toggleBtn.focus();
}

function initShell() {
  renderSidebar();
  renderTopbar();
  subscribe(() => { updateProgress(); updateCounter(); });
  $('#menu-toggle').addEventListener('click', () => setSidebar(!$('#sidebar').classList.contains('open')));
  $('#sidebar-backdrop').addEventListener('click', () => setSidebar(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && $('#sidebar').classList.contains('open')) setSidebar(false);
  });
}

function updateActiveNav(path) {
  document.querySelectorAll('.nav-link[data-match]').forEach((link) => {
    const active = new RegExp(link.dataset.match).test(path);
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  const articleId = /^\/article\/([^/]+)/.exec(path)?.[1];
  const categoryId = /^\/encyclopedia\/([^/]+)/.exec(path)?.[1] ?? db.conceptById.get(articleId)?.category;
  document.querySelectorAll('.nav-cat').forEach((link) => {
    link.classList.toggle('active', link.dataset.cat === categoryId);
  });
}

return { get setSidebar() { return setSidebar; }, get initShell() { return initShell; }, get updateActiveNav() { return updateActiveNav; } };
});
__define('components/ui.js', (__require) => {
const { html, raw } = __require('utils/dom.js');
const { DIFFICULTY, STATUS, formatDate } = __require('utils/format.js');
const { highlight } = __require('utils/highlight.js');
const { has, getState } = __require('state.js');
const { icon } = __require('components/icons.js');

function difficultyBadge(level) {
  const info = DIFFICULTY[level];
  if (!info) return '';
  const pips = [1, 2, 3].map((n) => html`<i class="${n <= info.level ? 'on' : ''}"></i>`);
  return html`<span class="difficulty" title="Dificultad: ${info.label}"><span class="pips" aria-hidden="true">${pips}</span>${info.label}</span>`;
}

function statusBadge(status) {
  const info = STATUS[status];
  if (!info) return '';
  return html`<span class="status status-${status}" title="${info.hint}">${info.label}</span>`;
}

function verifiedLine(item) {
  return html`<span class="verified-line">${statusBadge(item.status)}<span class="muted small">${item.lastVerified ? `Verificado: ${formatDate(item.lastVerified)}` : 'Sin verificación de fuentes'}</span></span>`;
}

const LISTS = {
  favorites: { on: 'En favoritos', off: 'Favorito', icon: 'star' },
  readLater: { on: 'Pendiente', off: 'Leer después', icon: 'bookmark' },
  read: { on: 'Leído', off: 'Marcar como leído', icon: 'check' },
};

function toggleButton(list, ref, { compact = false } = {}) {
  const def = LISTS[list];
  const on = has(list, ref);
  return html`<button type="button" class="btn btn-toggle ${compact ? 'btn-icon' : ''}" data-toggle="${list}" data-ref="${ref}" aria-pressed="${String(on)}" data-on="${def.on}" data-off="${def.off}" aria-label="${on ? def.on : def.off}" title="${on ? def.on : def.off}">
    ${icon(def.icon, 16)}${compact ? '' : html`<span class="btn-label">${on ? def.on : def.off}</span>`}
  </button>`;
}

function codeBlock({ code, language = 'text', filename = '' }) {
  return html`<figure class="code">
    <figcaption class="code-head">
      <span class="code-name">${filename || language}</span>
      <button type="button" class="code-copy" data-copy aria-label="Copiar código">${icon('copy', 14)}<span>Copiar</span></button>
    </figcaption>
    <pre tabindex="0"><code>${raw(highlight(code, language))}</code></pre>
  </figure>`;
}

function emptyState(title, text, action = '') {
  return html`<div class="empty"><p class="empty-title">${title}</p><p class="muted">${text}</p>${action}</div>`;
}

function sourcesList(sources = []) {
  if (!sources.length) return html`<p class="muted">Sin fuentes registradas todavía.</p>`;
  return html`<ul class="sources">${sources.map((s) => html`<li>
    <a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.title}${icon('external', 13)}</a>
    <span class="muted small">${s.note ?? new URL(s.url).hostname.replace('www.', '')}</span>
  </li>`)}</ul>`;
}

function chips(items, hrefFor) {
  return html`<ul class="chips">${items.map((item) => {
    const href = hrefFor?.(item);
    return html`<li>${href ? html`<a class="chip" href="${href}">${item}</a>` : html`<span class="chip chip-plain">${item}</span>`}</li>`;
  })}</ul>`;
}

function progressBar(done, total, label) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return html`<div class="progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="${label ?? 'Progreso'}"><span style="width:${pct}%"></span></div>`;
}

const readCount = (concepts) => {
  const read = new Set(getState().read);
  return concepts.filter((c) => read.has(`article:${c.id}`)).length;
};

function conceptRow(concept) {
  const read = has('read', `article:${concept.id}`);
  return html`<li class="row ${read ? 'is-read' : ''}">
    <a class="row-link" href="#/article/${concept.id}">
      <span class="row-code">${concept.code}</span>
      <span class="row-body">
        <span class="row-title">${concept.title}${read ? html`<span class="read-mark" title="Leído">${icon('check', 14)}<span class="sr-only">Leído</span></span>` : ''}</span>
        <span class="row-desc">${concept.description}</span>
      </span>
      <span class="row-meta">${difficultyBadge(concept.difficulty)}${statusBadge(concept.status)}</span>
    </a>
  </li>`;
}

// Grupo de botones-filtro accesible; la página gestiona el estado vía data-filter/data-value.
function filterGroup(name, label, options, current) {
  return html`<div class="filter-group" role="group" aria-label="${label}">
    <span class="filter-label">${label}</span>
    ${options.map((o) => html`<button type="button" class="filter ${current === o.value ? 'on' : ''}" data-filter="${name}" data-value="${o.value}" aria-pressed="${String(current === o.value)}">${o.label}</button>`)}
  </div>`;
}

return { get difficultyBadge() { return difficultyBadge; }, get statusBadge() { return statusBadge; }, get verifiedLine() { return verifiedLine; }, get toggleButton() { return toggleButton; }, get codeBlock() { return codeBlock; }, get emptyState() { return emptyState; }, get sourcesList() { return sourcesList; }, get chips() { return chips; }, get progressBar() { return progressBar; }, get conceptRow() { return conceptRow; }, get filterGroup() { return filterGroup; }, get readCount() { return readCount; } };
});
__define('data-loader.js', (__require) => {
// Carga las colecciones JSON y construye los índices que usa el resto de la app.
const COLLECTIONS = ['categories', 'concepts', 'tools', 'timeline', 'comparisons', 'examples', 'architectures', 'learning-paths'];

const db = {};

const byId = (items) => new Map(items.map((item) => [item.id, item]));

async function loadData() {
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
function resolveRef(ref) {
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

return { get loadData() { return loadData; }, get resolveRef() { return resolveRef; }, get db() { return db; } };
});
__define('pages/article.js', (__require) => {
const { db } = __require('data-loader.js');
const { $$, html } = __require('utils/dom.js');
const { rich, richInline } = __require('utils/rich-text.js');
const { visit } = __require('state.js');
const { icon } = __require('components/icons.js');
const { codeBlock, difficultyBadge, sourcesList, toggleButton, verifiedLine } = __require('components/ui.js');

const section = (id, number, title, body) => html`<section class="art-section" id="${id}">
  <h2><span class="art-num">${String(number).padStart(2, '0')}</span>${title}</h2>
  ${body}
</section>`;

const bulletList = (items, cls) => html`<ul class="pros-cons ${cls}">${items.map((i) => html`<li>${richInline(i)}</li>`)}</ul>`;

function relatedList(concept) {
  if (!concept.relatedConcepts.length) return html`<p class="muted">Sin relaciones registradas.</p>`;
  return html`<ul class="relations">${concept.relatedConcepts.map((rel) => {
    const other = db.conceptById.get(rel.id);
    if (!other) return '';
    return html`<li><a href="#/article/${other.id}"><strong>${other.title}</strong></a><span>${richInline(rel.note)}</span></li>`;
  })}</ul>`;
}

function prerequisites(concept) {
  if (!concept.prerequisites.length) return html`<p class="muted">No requiere conocimientos previos específicos del atlas.</p>`;
  return html`<ul class="chips">${concept.prerequisites.map((id) => {
    const other = db.conceptById.get(id);
    return other ? html`<li><a class="chip" href="#/article/${id}">${other.title}</a></li>` : '';
  })}</ul>`;
}

function toolLinks(concept) {
  if (!concept.tools.length) return html`<p class="muted">No hay fichas de herramientas asociadas.</p>`;
  return html`<ul class="chips">${concept.tools.map((id) => {
    const tool = db.toolById.get(id);
    return tool ? html`<li><a class="chip" href="#/tools/${id}">${tool.name}</a></li>` : '';
  })}</ul>`;
}

function exampleBlock(concept) {
  const ex = concept.example;
  const linked = db.examples.filter((e) => e.concepts.includes(concept.id));
  return html`${ex.text ? rich(ex.text) : ''}
    ${ex.code ? codeBlock({ code: ex.code, language: ex.language, filename: ex.filename }) : ''}
    ${ex.explanation ? rich(ex.explanation) : ''}
    ${linked.length ? html`<p class="linked-examples">En el Playground: ${linked.map((e, i) => html`${i ? ', ' : ''}<a href="#/playground/${e.id}">${e.title}</a>`)}</p>` : ''}`;
}

function articlePage({ params }) {
  const concept = db.conceptById.get(params.id);
  if (!concept) return null;
  const category = db.categoryById.get(concept.category);
  const siblings = db.conceptsByCategory.get(concept.category);
  const index = siblings.indexOf(concept);
  const prev = siblings[index - 1];
  const next = siblings[index + 1];
  const ref = `article:${concept.id}`;
  const comparisons = db.comparisons.filter((c) => c.a.concept === concept.id || c.b.concept === concept.id);

  const sections = [
    ['tecnica', 'Explicación técnica', rich(concept.technicalExplanation)],
    ['problema', '¿Qué problema resuelve?', rich(concept.problem)],
    ['funcionamiento', '¿Cómo funciona?', rich(concept.howItWorks)],
    ['cuando', '¿Cuándo utilizarlo?', rich(concept.whenToUse)],
    ['ventajas', 'Ventajas', bulletList(concept.advantages, 'pros')],
    ['limitaciones', 'Desventajas y limitaciones', bulletList(concept.limitations, 'cons')],
    ['ejemplo', 'Ejemplo práctico', exampleBlock(concept)],
    ['relaciones', 'Relación con otros conceptos', relatedList(concept)],
    ['previos', 'Conviene conocer antes', prerequisites(concept)],
    ['herramientas', 'Herramientas relacionadas', toolLinks(concept)],
    ['fuentes', 'Fuentes y documentación oficial', sourcesList(concept.sources)],
  ];

  return {
    title: concept.title,
    crumbs: [
      { label: 'Encyclopedia', href: '#/encyclopedia' },
      { label: category.name, href: `#/encyclopedia/${category.id}` },
      { label: concept.title },
    ],
    content: html`<article class="page article">
      <header class="art-head">
        <p class="eyebrow"><a href="#/encyclopedia/${category.id}">${concept.code} · ${category.name}</a></p>
        <h1>${concept.title}</h1>
        <p class="art-lede">${richInline(concept.description)}</p>
        <div class="art-meta">${difficultyBadge(concept.difficulty)}${verifiedLine(concept)}</div>
        ${concept.editorialNote ? html`<p class="callout">${icon('info', 16)}<span>${richInline(concept.editorialNote)}</span></p>` : ''}
        <div class="art-actions">
          ${toggleButton('read', ref)}${toggleButton('favorites', ref)}${toggleButton('readLater', ref)}
        </div>
      </header>
      <div class="art-layout">
        <div class="art-body reading">
          ${sections.map(([id, title, body], i) => section(id, i + 1, title, body))}
          ${comparisons.length ? html`<aside class="art-compare"><p class="eyebrow">Se suele confundir con</p>
            <ul>${comparisons.map((c) => html`<li><a href="#/compare/${c.id}">${c.title} ${icon('arrowRight', 14)}</a></li>`)}</ul></aside>` : ''}
          <nav class="pager" aria-label="Artículos de la categoría">
            ${prev ? html`<a class="pager-prev" href="#/article/${prev.id}">${icon('arrowLeft', 16)}<span><small>Anterior</small>${prev.title}</span></a>` : html`<span></span>`}
            ${next ? html`<a class="pager-next" href="#/article/${next.id}"><span><small>Siguiente</small>${next.title}</span>${icon('arrowRight', 16)}</a>` : html`<span></span>`}
          </nav>
        </div>
        <nav class="toc" aria-label="En este artículo">
          <p class="eyebrow">En este artículo</p>
          <ol>${sections.map(([id, title]) => html`<li><a href="#" data-scroll-to="${id}" data-toc="${id}">${title}</a></li>`)}</ol>
        </nav>
      </div>
    </article>`,
    mount(root) {
      visit(ref);
      const links = new Map($$('[data-toc]', root).map((a) => [a.dataset.toc, a]));
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((a) => a.classList.remove('active'));
            links.get(entry.target.id)?.classList.add('active');
          }
        });
      }, { rootMargin: '-15% 0px -75% 0px' });
      $$('.art-section', root).forEach((s) => observer.observe(s));
      return () => observer.disconnect();
    },
  };
}

return { get articlePage() { return articlePage; } };
});
__define('pages/compare.js', (__require) => {
const { db } = __require('data-loader.js');
const { $, html } = __require('utils/dom.js');
const { rich, richInline } = __require('utils/rich-text.js');
const { go } = __require('router.js');
const { visit } = __require('state.js');
const { emptyState, sourcesList, toggleButton, verifiedLine } = __require('components/ui.js');
const { icon } = __require('components/icons.js');

const miniList = (items = []) => html`<ul class="mini-list">${items.map((i) => html`<li>${richInline(i)}</li>`)}</ul>`;

// Vista reutilizable: dos columnas que se apilan en móvil, con filas alineadas.
function sideBySide(aName, bName, rows) {
  return html`<div class="vs-table" role="table" aria-label="Comparación de ${aName} y ${bName}">
    <div class="vs-row vs-head" role="row">
      <span role="columnheader" class="vs-aspect"><span class="sr-only">Aspecto</span></span>
      <span role="columnheader"><strong>${aName}</strong></span>
      <span role="columnheader"><strong>${bName}</strong></span>
    </div>
    ${rows.map((r) => html`<div class="vs-row" role="row">
      <span class="vs-aspect" role="rowheader">${r.aspect}</span>
      <div role="cell"><span class="vs-mobile-name">${aName}</span>${r.a}</div>
      <div role="cell"><span class="vs-mobile-name">${bName}</span>${r.b}</div>
    </div>`)}
  </div>`;
}

function compareIndexPage() {
  const options = [...db.concepts].sort((x, y) => x.title.localeCompare(y.title, 'es'));
  const select = (id, label) => html`<label class="select-field"><span>${label}</span><select id="${id}">
    <option value="">Elige un concepto…</option>
    ${options.map((c) => html`<option value="${c.id}">${c.title}</option>`)}
  </select></label>`;
  return {
    title: 'Comparativas',
    crumbs: [{ label: 'Comparativas' }],
    content: html`<div class="page">
      <header class="page-head">
        <p class="eyebrow">Comparison system</p>
        <h1>Comparativas</h1>
        <p class="lead">Conceptos que se confunden a menudo, explicados frente a frente: qué es cada uno, en qué se diferencian y cuándo conviene elegirlos.</p>
      </header>
      <ul class="compare-list">
        ${db.comparisons.map((c) => html`<li><a href="#/compare/${c.id}">
          <span class="compare-names"><strong>${c.a.name}</strong><span class="vs">vs</span><strong>${c.b.name}</strong></span>
          <span class="muted small">${c.summary}</span>
        </a></li>`)}
      </ul>
      <section class="section custom-compare">
        <h2 class="section-title">Compara dos conceptos cualesquiera</h2>
        <p class="muted">Enfrenta dos artículos de la enciclopedia a partir de sus propias fichas.</p>
        <form id="custom-compare" class="custom-form">
          ${select('cmp-a', 'Primer concepto')}
          ${select('cmp-b', 'Segundo concepto')}
          <button class="btn btn-primary" type="submit">Comparar</button>
        </form>
        <p class="small form-error" id="cmp-error" role="alert" hidden>Elige dos conceptos distintos.</p>
      </section>
    </div>`,
    mount(root) {
      $('#custom-compare', root).addEventListener('submit', (e) => {
        e.preventDefault();
        const a = $('#cmp-a', root).value;
        const b = $('#cmp-b', root).value;
        const invalid = !a || !b || a === b;
        $('#cmp-error', root).hidden = !invalid;
        if (!invalid) go(`#/compare/custom?a=${a}&b=${b}`);
      });
    },
  };
}

function comparisonPage({ params }) {
  const c = db.comparisonById.get(params.id);
  if (!c) return null;
  const ref = `comparison:${c.id}`;
  const conceptLink = (side) => (side.concept && db.conceptById.has(side.concept)
    ? html`<a class="link-more" href="#/article/${side.concept}">Artículo completo ${icon('arrowRight', 14)}</a>` : '');
  return {
    title: c.title,
    crumbs: [{ label: 'Comparativas', href: '#/compare' }, { label: c.title }],
    content: html`<article class="page comparison">
      <header class="page-head">
        <p class="eyebrow">Comparativa</p>
        <h1 class="vs-title">${c.a.name} <span class="vs">vs</span> ${c.b.name}</h1>
        <p class="lead">${richInline(c.summary)}</p>
        <div class="art-meta">${verifiedLine(c)}</div>
        <div class="art-actions">${toggleButton('favorites', ref)}</div>
      </header>

      <section class="section vs-defs">
        <div><h2>${c.a.name}</h2>${rich(c.a.what)}${conceptLink(c.a)}</div>
        <div><h2>${c.b.name}</h2>${rich(c.b.what)}${conceptLink(c.b)}</div>
      </section>

      <section class="section">
        <h2 class="section-title">Diferencias fundamentales</h2>
        ${sideBySide(c.a.name, c.b.name, c.differences.map((d) => ({ aspect: d.aspect, a: richInline(d.a), b: richInline(d.b) })))}
      </section>

      <section class="section">
        <h2 class="section-title">Objetivos, ventajas y límites</h2>
        ${sideBySide(c.a.name, c.b.name, [
          { aspect: 'Objetivo', a: richInline(c.a.goal), b: richInline(c.b.goal) },
          { aspect: 'Ventajas', a: miniList(c.a.pros), b: miniList(c.b.pros) },
          { aspect: 'Desventajas', a: miniList(c.a.cons), b: miniList(c.b.cons) },
        ])}
      </section>

      <section class="section vs-defs">
        <div><h2>Elige ${c.a.name} si…</h2>${miniList(c.a.chooseWhen)}<h3>Ejemplo de uso</h3>${rich(c.a.example)}</div>
        <div><h2>Elige ${c.b.name} si…</h2>${miniList(c.b.chooseWhen)}<h3>Ejemplo de uso</h3>${rich(c.b.example)}</div>
      </section>

      ${c.together ? html`<p class="callout">${icon('info', 16)}<span>${richInline(c.together)}</span></p>` : ''}

      <section class="section"><h2 class="section-title">Fuentes</h2>${sourcesList(c.sources)}</section>
    </article>`,
    mount() { visit(ref); },
  };
}

function customComparePage({ query }) {
  const a = db.conceptById.get(query.a);
  const b = db.conceptById.get(query.b);
  const crumbs = [{ label: 'Comparativas', href: '#/compare' }, { label: 'Personalizada' }];
  if (!a || !b || a === b) {
    return {
      title: 'Comparativa personalizada',
      crumbs,
      content: html`<div class="page">${emptyState('Faltan conceptos por comparar', 'Elige dos conceptos distintos en la página de comparativas.', html`<a class="btn btn-primary" href="#/compare">Ir a comparativas</a>`)}</div>`,
    };
  }
  const row = (aspect, fn) => ({ aspect, a: fn(a), b: fn(b) });
  return {
    title: `${a.title} vs ${b.title}`,
    crumbs,
    content: html`<div class="page">
      <header class="page-head">
        <p class="eyebrow">Comparativa personalizada</p>
        <h1 class="vs-title">${a.title} <span class="vs">vs</span> ${b.title}</h1>
        <p class="lead">Generada a partir de las fichas de la enciclopedia. No es una comparativa editorial: muestra cada concepto por separado, sin interpretar sus diferencias.</p>
      </header>
      ${sideBySide(a.title, b.title, [
        row('Definición', (c) => richInline(c.description)),
        row('Problema', (c) => rich(c.problem)),
        row('Cuándo usarlo', (c) => rich(c.whenToUse)),
        row('Ventajas', (c) => miniList(c.advantages)),
        row('Limitaciones', (c) => miniList(c.limitations)),
        row('Dificultad', (c) => c.difficulty),
        row('Artículo', (c) => html`<a href="#/article/${c.id}">Leer ${c.title}</a>`),
      ])}
    </div>`,
  };
}

return { get sideBySide() { return sideBySide; }, get compareIndexPage() { return compareIndexPage; }, get comparisonPage() { return comparisonPage; }, get customComparePage() { return customComparePage; } };
});
__define('pages/dashboard.js', (__require) => {
const { db, resolveRef } = __require('data-loader.js');
const { $, html } = __require('utils/dom.js');
const { plural } = __require('utils/format.js');
const { getState } = __require('state.js');
const { icon } = __require('components/icons.js');
const { attachSearchBox } = __require('components/search-box.js');
const { difficultyBadge, progressBar, readCount, statusBadge } = __require('components/ui.js');

function featuredBlock() {
  const items = db.concepts.filter((c) => c.featured).sort((a, b) => a.featured - b.featured);
  const [lead, ...rest] = items;
  return html`<div class="featured">
    <a class="featured-lead" href="#/article/${lead.id}">
      <span class="eyebrow">${lead.code} · ${db.categoryById.get(lead.category).name}</span>
      <h3>${lead.title}</h3>
      <p>${lead.description}</p>
      <span class="meta-line">${difficultyBadge(lead.difficulty)}${statusBadge(lead.status)}</span>
      <span class="more">Leer el artículo ${icon('arrowRight', 16)}</span>
    </a>
    <ul class="featured-rest">
      ${rest.map((c) => html`<li><a href="#/article/${c.id}">
        <span class="eyebrow">${c.code}</span>
        <strong>${c.title}</strong>
        <span class="muted small">${c.description}</span>
      </a></li>`)}
    </ul>
  </div>`;
}

function atlasIndex() {
  return html`<ol class="atlas-index">
    ${db.categories.map((c) => {
      const concepts = db.conceptsByCategory.get(c.id);
      const done = readCount(concepts);
      return html`<li><a href="#/encyclopedia/${c.id}">
        <span class="atlas-letter">${c.letter}</span>
        <span class="atlas-body"><strong>${c.name}</strong><span class="muted small">${c.tagline}</span></span>
        <span class="atlas-count">${concepts.length}</span>
        <span class="atlas-progress">${progressBar(done, concepts.length, `Progreso en ${c.name}`)}</span>
      </a></li>`;
    })}
  </ol>`;
}

function pathsBlock() {
  return html`<ul class="path-list">
    ${db.paths.slice(0, 3).map((p) => {
      const concepts = p.steps.map((s) => db.conceptById.get(s.concept));
      const done = readCount(concepts);
      return html`<li><a href="#/paths/${p.id}">
        <span class="eyebrow">${p.level} · ${plural(p.steps.length, 'paso')}</span>
        <strong>${p.title}</strong>
        <span class="muted small">${p.description}</span>
        <span class="path-progress">${progressBar(done, p.steps.length, `Progreso en ${p.title}`)}<span class="small muted">${done}/${p.steps.length}</span></span>
      </a></li>`;
    })}
  </ul>`;
}

function personalBlock() {
  const { favorites, readLater, history, read } = getState();
  const last = history.map((h) => resolveRef(h.ref)).find(Boolean);
  return html`<div class="personal">
    <h2 class="section-title small-title">Tu atlas</h2>
    ${last ? html`<a class="continue" href="${last.href}"><span class="eyebrow">Continúa donde lo dejaste</span><strong>${last.title}</strong></a>`
    : html`<p class="muted small">Aún no has visitado ningún artículo. Tu historial aparecerá aquí.</p>`}
    <ul class="personal-links">
      <li><a href="#/library?tab=favorites">${icon('star', 16)}<span>Favoritos</span><b>${favorites.length}</b></a></li>
      <li><a href="#/library?tab=readLater">${icon('bookmark', 16)}<span>Pendientes</span><b>${readLater.length}</b></a></li>
      <li><a href="#/library?tab=read">${icon('check', 16)}<span>Leídos</span><b>${read.length}</b></a></li>
    </ul>
  </div>`;
}

function latestAdded() {
  const list = db.concepts
    .map((c, i) => ({ c, i }))
    .sort((a, b) => b.c.addedAt.localeCompare(a.c.addedAt) || b.i - a.i)
    .slice(0, 5)
    .map(({ c }) => c);
  return html`<ol class="plain-list">${list.map((c) => html`<li><a href="#/article/${c.id}"><span class="row-code">${c.code}</span><span>${c.title}</span></a></li>`)}</ol>`;
}

function popularTools() {
  const tools = db.tools.filter((t) => t.popular).slice(0, 6);
  return html`<ul class="tool-strip">${tools.map((t) => html`<li><a href="#/tools/${t.id}"><strong>${t.name}</strong><span class="muted small">${t.categoryLabel}</span></a></li>`)}</ul>`;
}

function dashboardPage() {
  const verified = db.concepts.filter((c) => c.status === 'verified').length;
  const stats = [
    { n: db.concepts.length, label: 'conceptos', href: '#/encyclopedia' },
    { n: db.tools.length, label: 'herramientas', href: '#/tools' },
    { n: db.comparisons.length, label: 'comparativas', href: '#/compare' },
    { n: db.examples.length, label: 'ejemplos', href: '#/playground' },
    { n: db.architectures.length, label: 'arquitecturas', href: '#/lab' },
    { n: db.timeline.events.length, label: 'hitos', href: '#/timeline' },
  ];

  return {
    title: 'Inicio',
    crumbs: [],
    content: html`<div class="page dashboard">
      <section class="hero">
        <p class="eyebrow">Enciclopedia · Timeline · Explorer</p>
        <h1>El mapa del desarrollo de software, de los paradigmas a los agentes.</h1>
        <p class="lead">Conceptos, herramientas y arquitecturas explicados con rigor y con sus fuentes a la vista, para entender qué hace cada pieza y cómo encaja con las demás.</p>
        <div class="search-box search-hero" id="hero-search" role="search">
          <span class="search-icon">${icon('search', 18)}</span>
          <input type="search" placeholder="¿Qué quieres entender? Prueba con “git worktrees” o “MCP”" aria-label="Buscar en el atlas" autocomplete="off" spellcheck="false">
          <div class="search-panel" hidden></div>
        </div>
        <dl class="stats">
          ${stats.map((s) => html`<div><dd><a href="${s.href}">${s.n}</a></dd><dt>${s.label}</dt></div>`)}
        </dl>
        <p class="small muted editorial-note">${verified} de ${db.concepts.length} artículos tienen estado <strong>Verified</strong>. Cada ficha indica qué se ha contrastado y cuándo; <a href="#/encyclopedia">consulta el índice</a>.</p>
      </section>

      <section class="section">
        <header class="section-head"><h2 class="section-title">Conceptos destacados</h2></header>
        ${featuredBlock()}
      </section>

      <section class="section split">
        <div>
          <header class="section-head">
            <h2 class="section-title">Índice del atlas</h2>
            <a class="link-more" href="#/encyclopedia">Ver todo ${icon('arrowRight', 14)}</a>
          </header>
          ${atlasIndex()}
        </div>
        <aside class="side-col">
          ${personalBlock()}
          <div>
            <h2 class="section-title small-title">Últimos añadidos</h2>
            ${latestAdded()}
          </div>
        </aside>
      </section>

      <section class="section">
        <header class="section-head">
          <h2 class="section-title">Rutas de aprendizaje</h2>
          <a class="link-more" href="#/paths">Todas las rutas ${icon('arrowRight', 14)}</a>
        </header>
        ${pathsBlock()}
      </section>

      <section class="section">
        <header class="section-head">
          <h2 class="section-title">Herramientas populares</h2>
          <a class="link-more" href="#/tools">Tools Explorer ${icon('arrowRight', 14)}</a>
        </header>
        ${popularTools()}
      </section>
    </div>`,
    mount(root) { attachSearchBox($('#hero-search', root)); },
  };
}

return { get dashboardPage() { return dashboardPage; } };
});
__define('pages/encyclopedia.js', (__require) => {
const { db } = __require('data-loader.js');
const { $, $$, html } = __require('utils/dom.js');
const { normalize, plural } = __require('utils/format.js');
const { has } = __require('state.js');
const { conceptRow, emptyState, filterGroup, progressBar, readCount } = __require('components/ui.js');
const { icon } = __require('components/icons.js');

const FILTERS = {
  difficulty: [
    { value: 'all', label: 'Todas' }, { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' }, { value: 'advanced', label: 'Advanced' },
  ],
  status: [
    { value: 'all', label: 'Todos' }, { value: 'verified', label: 'Verified' },
    { value: 'needs-review', label: 'Needs review' }, { value: 'draft', label: 'Draft' },
  ],
  progress: [
    { value: 'all', label: 'Todo' }, { value: 'unread', label: 'Sin leer' }, { value: 'read', label: 'Leídos' },
  ],
};

// Los filtros sobreviven a la navegación dentro de la enciclopedia durante la sesión.
const filters = { difficulty: 'all', status: 'all', progress: 'all', text: '' };

function applyFilters(concepts) {
  const text = normalize(filters.text.trim());
  return concepts.filter((c) => {
    if (filters.difficulty !== 'all' && c.difficulty !== filters.difficulty) return false;
    if (filters.status !== 'all' && c.status !== filters.status) return false;
    const read = has('read', `article:${c.id}`);
    if (filters.progress === 'read' && !read) return false;
    if (filters.progress === 'unread' && read) return false;
    if (text && !normalize(`${c.title} ${c.description} ${(c.aliases ?? []).join(' ')}`).includes(text)) return false;
    return true;
  });
}

function renderList(category) {
  const scope = category ? [category] : db.categories;
  const groups = scope.map((cat) => ({ cat, concepts: applyFilters(db.conceptsByCategory.get(cat.id)) }));
  const total = groups.reduce((sum, g) => sum + g.concepts.length, 0);
  if (!total) {
    return html`${emptyState('Ningún concepto coincide con estos filtros', 'Quita algún filtro o prueba con otro texto.', html`<button type="button" class="btn" data-clear-filters>Quitar filtros</button>`)}`;
  }
  return html`<p class="small muted result-count" aria-live="polite">${plural(total, 'concepto')}</p>
    ${groups.filter((g) => g.concepts.length).map((g) => html`<section class="cat-section">
      ${category ? '' : html`<header class="cat-section-head">
        <span class="atlas-letter">${g.cat.letter}</span>
        <h2><a href="#/encyclopedia/${g.cat.id}">${g.cat.name}</a></h2>
      </header>`}
      <ul class="rows">${g.concepts.map(conceptRow)}</ul>
    </section>`)}`;
}

function controls() {
  return html`<div class="filters">
    <div class="filter-text">
      ${icon('search', 15)}
      <input type="search" id="enc-text" placeholder="Filtrar esta lista…" aria-label="Filtrar conceptos por texto" value="${filters.text}">
    </div>
    ${filterGroup('difficulty', 'Dificultad', FILTERS.difficulty, filters.difficulty)}
    ${filterGroup('status', 'Estado', FILTERS.status, filters.status)}
    ${filterGroup('progress', 'Progreso', FILTERS.progress, filters.progress)}
  </div>`;
}

function encyclopediaPage({ params }) {
  const category = params.category ? db.categoryById.get(params.category) : null;
  if (params.category && !category) return null;
  const concepts = category ? db.conceptsByCategory.get(category.id) : db.concepts;
  const done = readCount(concepts);

  return {
    title: category ? category.name : 'Encyclopedia',
    crumbs: category ? [{ label: 'Encyclopedia', href: '#/encyclopedia' }, { label: category.name }] : [{ label: 'Encyclopedia' }],
    content: html`<div class="page">
      <header class="page-head">
        ${category ? html`<p class="eyebrow">Región ${category.letter}</p>` : html`<p class="eyebrow">Knowledge base</p>`}
        <h1>${category ? category.name : 'Encyclopedia'}</h1>
        <p class="lead">${category ? category.description : 'Ocho regiones de conocimiento: de los fundamentos de ingeniería a los componentes de un agente. Todos los artículos siguen la misma estructura.'}</p>
        <div class="page-progress">${progressBar(done, concepts.length, 'Artículos leídos')}<span class="small muted">${done} de ${plural(concepts.length, 'artículo')} leídos</span></div>
      </header>
      ${category ? '' : html`<nav class="cat-jump" aria-label="Categorías">${db.categories.map((c) => html`<a href="#/encyclopedia/${c.id}"><b>${c.letter}</b>${c.name}</a>`)}</nav>`}
      ${controls()}
      <div id="enc-list">${renderList(category)}</div>
    </div>`,
    mount(root) {
      const list = $('#enc-list', root);
      const redraw = () => { list.innerHTML = renderList(category).toString(); };
      const syncButtons = () => {
        $$('[data-filter]', root).forEach((btn) => {
          const on = filters[btn.dataset.filter] === btn.dataset.value;
          btn.classList.toggle('on', on);
          btn.setAttribute('aria-pressed', String(on));
        });
      };
      $('#enc-text', root).addEventListener('input', (e) => { filters.text = e.target.value; redraw(); });
      root.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-filter]');
        if (btn) { filters[btn.dataset.filter] = btn.dataset.value; syncButtons(); redraw(); }
        if (e.target.closest('[data-clear-filters]')) {
          Object.assign(filters, { difficulty: 'all', status: 'all', progress: 'all', text: '' });
          $('#enc-text', root).value = '';
          syncButtons();
          redraw();
        }
      });
    },
  };
}

return { get encyclopediaPage() { return encyclopediaPage; } };
});
__define('pages/lab.js', (__require) => {
const { db } = __require('data-loader.js');
const { $, $$, html } = __require('utils/dom.js');
const { rich } = __require('utils/rich-text.js');
const { replaceHash } = __require('router.js');
const { renderDiagram } = __require('components/diagram.js');
const { sourcesList, statusBadge } = __require('components/ui.js');
const { icon } = __require('components/icons.js');

function nodePanel(arch, node) {
  if (!node) {
    return html`<p class="eyebrow">Cómo leer este diagrama</p>
      <p>Selecciona cualquier elemento para ver qué hace y con qué se conecta. También puedes recorrerlos con <kbd>Tab</kbd> y pulsar <kbd>Enter</kbd>.</p>
      <p class="muted small">Las líneas continuas son flujo directo; las discontinuas, relaciones opcionales o indirectas.</p>`;
  }
  const label = (id) => arch.nodes.find((n) => n.id === id)?.label;
  const links = arch.edges
    .filter((e) => e.from === node.id || e.to === node.id)
    .map((e) => ({ other: e.from === node.id ? e.to : e.from, out: e.from === node.id, text: e.label }));
  return html`<p class="eyebrow">Elemento seleccionado</p>
    <h2>${node.label}</h2>
    ${rich(node.description)}
    ${links.length ? html`<h3>Conexiones</h3>
      <ul class="edge-list">${links.map((l) => html`<li><button type="button" class="link-btn" data-goto-node="${l.other}">${icon(l.out ? 'arrowRight' : 'arrowLeft', 14)} ${label(l.other)}</button>${l.text ? html`<span class="muted small">${l.text}</span>` : ''}</li>`)}</ul>` : ''}
    ${node.concept && db.conceptById.has(node.concept) ? html`<a class="link-more" href="#/article/${node.concept}">Leer ${db.conceptById.get(node.concept).title} ${icon('arrowRight', 14)}</a>` : ''}`;
}

function labPage({ params, query }) {
  const arch = params.id ? db.architectureById.get(params.id) : db.architectures[0];
  if (!arch) return null;
  const initial = arch.nodes.find((n) => n.id === query.node) ?? null;

  return {
    title: arch.title,
    crumbs: [{ label: 'Architecture Lab', href: '#/lab' }, { label: arch.title }],
    content: html`<div class="page lab">
      <header class="page-head">
        <p class="eyebrow">Architecture Lab</p>
        <h1>${arch.title}</h1>
        <p class="lead">${arch.summary}</p>
      </header>
      <nav class="lab-tabs" aria-label="Diagramas disponibles">
        ${db.architectures.map((a, i) => html`<a href="#/lab/${a.id}" ${a === arch ? html`aria-current="page" class="on"` : ''}><b>${i + 1}</b>${a.short}</a>`)}
      </nav>
      <div class="lab-stage">
        <div class="diagram-wrap" tabindex="0" role="region" aria-label="Lienzo del diagrama">${renderDiagram(arch)}</div>
        <aside class="node-panel" id="node-panel" aria-live="polite">${nodePanel(arch, initial)}</aside>
      </div>
      <section class="section lab-foot">
        <div class="reading">
          <h2 class="section-title small-title">Cómo interpretarlo</h2>
          ${rich(arch.notes)}
        </div>
        <div>
          <p class="meta-line">${statusBadge(arch.status)}</p>
          <h2 class="section-title small-title">Fuentes</h2>
          ${sourcesList(arch.sources)}
        </div>
      </section>
    </div>`,
    mount(root) {
      const panel = $('#node-panel', root);
      const select = (id, focusNode = false) => {
        const node = arch.nodes.find((n) => n.id === id);
        panel.innerHTML = nodePanel(arch, node).toString();
        const svg = $('.diagram', root);
        svg.classList.toggle('has-selection', Boolean(id));
        $$('.dg-node', svg).forEach((n) => {
          const on = n.dataset.node === id;
          n.classList.toggle('selected', on);
          n.setAttribute('aria-pressed', String(on));
          if (on && focusNode) n.focus();
        });
        const neighbours = new Set([id]);
        $$('.dg-edge', svg).forEach((e) => {
          const on = e.dataset.from === id || e.dataset.to === id;
          e.classList.toggle('active', on);
          if (on) { neighbours.add(e.dataset.from); neighbours.add(e.dataset.to); }
        });
        $$('.dg-node', svg).forEach((n) => n.classList.toggle('near', neighbours.has(n.dataset.node)));
        replaceHash(`#/lab/${arch.id}${id ? `?node=${id}` : ''}`);
      };
      root.addEventListener('click', (e) => {
        const node = e.target.closest('.dg-node');
        if (node) { select(node.dataset.node); return; }
        const goto = e.target.closest('[data-goto-node]');
        if (goto) { select(goto.dataset.gotoNode, true); }
      });
      root.addEventListener('keydown', (e) => {
        const node = e.target.closest?.('.dg-node');
        if (node && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          select(node.dataset.node);
        }
      });
      if (initial) select(initial.id);
    },
  };
}

return { get labPage() { return labPage; } };
});
__define('pages/library.js', (__require) => {
const { db, resolveRef } = __require('data-loader.js');
const { $, html } = __require('utils/dom.js');
const { getState, setPref, clearHistory, resetAll } = __require('state.js');
const { replaceHash } = __require('router.js');
const { emptyState, progressBar, readCount, toggleButton } = __require('components/ui.js');

const TABS = [
  { id: 'favorites', label: 'Favoritos', empty: 'Marca con la estrella lo que quieras tener a mano.' },
  { id: 'readLater', label: 'Pendientes', empty: 'Guarda artículos con “Leer después” para retomarlos aquí.' },
  { id: 'history', label: 'Historial', empty: 'Los artículos, herramientas y ejemplos que abras aparecerán aquí.' },
  { id: 'read', label: 'Leídos', empty: 'Marca un artículo como leído para ver tu progreso.' },
  { id: 'progress', label: 'Progreso' },
  { id: 'prefs', label: 'Preferencias' },
];

let currentTab = 'favorites';

function itemList(tab) {
  const state = getState();
  const refs = tab.id === 'history' ? state.history.map((h) => h.ref) : [...state[tab.id]].reverse();
  const items = refs.map((ref) => ({ ref, info: resolveRef(ref) })).filter((x) => x.info);
  if (!items.length) {
    return emptyState(`${tab.label}: nada por aquí todavía`, tab.empty, html`<a class="btn" href="#/encyclopedia">Explorar la enciclopedia</a>`);
  }
  return html`
    ${tab.id === 'history' ? html`<div class="list-tools"><button type="button" class="btn" id="clear-history">Borrar historial</button></div>` : ''}
    <ul class="rows library-rows">${items.map(({ ref, info }) => html`<li class="row">
      <a class="row-link" href="${info.href}">
        <span class="row-code">${info.typeLabel}</span>
        <span class="row-body"><span class="row-title">${info.title}</span><span class="row-desc">${info.meta}</span></span>
      </a>
      ${tab.id === 'history' ? '' : toggleButton(tab.id, ref, { compact: true })}
    </li>`)}</ul>`;
}

function progressView() {
  const total = readCount(db.concepts);
  return html`<div class="progress-view">
    <div class="page-progress">${progressBar(total, db.concepts.length, 'Progreso total')}<span class="small muted">${total} de ${db.concepts.length} artículos leídos</span></div>
    <ul class="progress-cats">${db.categories.map((c) => {
      const list = db.conceptsByCategory.get(c.id);
      const done = readCount(list);
      return html`<li><a href="#/encyclopedia/${c.id}"><span class="nav-letter">${c.letter}</span><span>${c.name}</span></a>${progressBar(done, list.length, `Progreso en ${c.name}`)}<span class="small muted">${done}/${list.length}</span></li>`;
    })}</ul>
  </div>`;
}

const segmented = (name, label, options, current) => html`<fieldset class="pref"><legend>${label}</legend><div class="segmented">
  ${options.map((o) => html`<label><input type="radio" name="${name}" value="${o.value}" ${current === o.value ? html`checked` : ''}><span>${o.label}</span></label>`)}
</div></fieldset>`;

function prefsView() {
  const { prefs } = getState();
  return html`<form id="prefs" class="prefs" onsubmit="return false">
    ${segmented('theme', 'Tema', [{ value: 'dark', label: 'Oscuro' }, { value: 'light', label: 'Claro' }], prefs.theme)}
    ${segmented('readingSize', 'Tamaño de lectura', [{ value: 'sm', label: 'Compacto' }, { value: 'md', label: 'Normal' }, { value: 'lg', label: 'Grande' }], prefs.readingSize)}
    ${segmented('codeWrap', 'Código largo', [{ value: 'off', label: 'Desplazar' }, { value: 'on', label: 'Ajustar línea' }], prefs.codeWrap ? 'on' : 'off')}
    <div class="pref-danger">
      <p class="small muted">Todo se guarda solo en este navegador. Puedes borrarlo cuando quieras.</p>
      <button type="button" class="btn" id="reset-all">Borrar mis datos locales</button>
    </div>
  </form>`;
}

function libraryPage({ query }) {
  if (query.tab && TABS.some((t) => t.id === query.tab)) currentTab = query.tab;
  const tab = TABS.find((t) => t.id === currentTab);
  const { favorites, readLater, read, history } = getState();
  const counts = { favorites: favorites.length, readLater: readLater.length, read: read.length, history: history.length };
  let body;
  if (tab.id === 'progress') body = progressView();
  else if (tab.id === 'prefs') body = prefsView();
  else body = itemList(tab);

  return {
    title: 'Mi biblioteca',
    crumbs: [{ label: 'Mi biblioteca' }],
    liveState: true,
    content: html`<div class="page">
      <header class="page-head">
        <p class="eyebrow">Solo en este navegador</p>
        <h1>Mi biblioteca</h1>
      </header>
      <nav class="tabs" aria-label="Secciones de la biblioteca">
        ${TABS.map((t) => html`<a href="#/library?tab=${t.id}" ${t.id === tab.id ? html`aria-current="page" class="on"` : ''}>${t.label}${counts[t.id] !== undefined ? html`<b>${counts[t.id]}</b>` : ''}</a>`)}
      </nav>
      <div class="tab-body">${body}</div>
    </div>`,
    mount(root) {
      replaceHash(`#/library?tab=${tab.id}`);
      $('#clear-history', root)?.addEventListener('click', clearHistory);
      const prefs = $('#prefs', root);
      if (prefs) {
        prefs.addEventListener('change', (e) => {
          const { name, value } = e.target;
          setPref(name, name === 'codeWrap' ? value === 'on' : value);
        });
        $('#reset-all', root).addEventListener('click', () => {
          if (window.confirm('¿Borrar favoritos, pendientes, leídos, historial y preferencias de este navegador?')) resetAll();
        });
      }
    },
  };
}

return { get libraryPage() { return libraryPage; } };
});
__define('pages/paths.js', (__require) => {
const { db } = __require('data-loader.js');
const { $, html } = __require('utils/dom.js');
const { plural } = __require('utils/format.js');
const { getState, has, setActivePath } = __require('state.js');
const { icon } = __require('components/icons.js');
const { progressBar, readCount, toggleButton } = __require('components/ui.js');

const pathConcepts = (path) => path.steps.map((s) => db.conceptById.get(s.concept));

function pathsPage() {
  const active = getState().activePath;
  return {
    title: 'Rutas de aprendizaje',
    crumbs: [{ label: 'Rutas de aprendizaje' }],
    liveState: true,
    content: html`<div class="page">
      <header class="page-head">
        <p class="eyebrow">Learning paths</p>
        <h1>Rutas de aprendizaje</h1>
        <p class="lead">Recorridos ordenados por la enciclopedia. El progreso se calcula a partir de los artículos que marcas como leídos.</p>
      </header>
      <ul class="path-list path-list-full">
        ${db.paths.map((p) => {
          const done = readCount(pathConcepts(p));
          return html`<li><a href="#/paths/${p.id}">
            <span class="eyebrow">${p.level} · ${plural(p.steps.length, 'paso')}${p.id === active ? ' · Ruta activa' : ''}</span>
            <strong>${p.title}</strong>
            <span class="muted small">${p.description}</span>
            <span class="path-progress">${progressBar(done, p.steps.length, `Progreso en ${p.title}`)}<span class="small muted">${done}/${p.steps.length}</span></span>
          </a></li>`;
        })}
      </ul>
    </div>`,
  };
}

function pathDetailPage({ params }) {
  const path = db.pathById.get(params.id);
  if (!path) return null;
  const concepts = pathConcepts(path);
  const done = readCount(concepts);
  const nextIndex = concepts.findIndex((c) => !has('read', `article:${c.id}`));
  const isActive = getState().activePath === path.id;

  return {
    title: path.title,
    crumbs: [{ label: 'Rutas de aprendizaje', href: '#/paths' }, { label: path.title }],
    liveState: true,
    content: html`<div class="page">
      <header class="page-head">
        <p class="eyebrow">${path.level} · ${plural(path.steps.length, 'paso')}</p>
        <h1>${path.title}</h1>
        <p class="lead">${path.description}</p>
        <div class="page-progress">${progressBar(done, concepts.length, 'Progreso en la ruta')}<span class="small muted">${done} de ${concepts.length}</span></div>
        <div class="art-actions">
          ${nextIndex >= 0 ? html`<a class="btn btn-primary" href="#/article/${concepts[nextIndex].id}">${done ? 'Continuar' : 'Empezar'}: ${concepts[nextIndex].title}</a>` : html`<span class="btn btn-static">${icon('check', 16)} Ruta completada</span>`}
          <button type="button" class="btn" id="path-active" aria-pressed="${String(isActive)}">${isActive ? 'Ruta activa' : 'Fijar como ruta activa'}</button>
        </div>
      </header>
      <ol class="path-steps">
        ${path.steps.map((step, i) => {
          const c = concepts[i];
          const read = has('read', `article:${c.id}`);
          return html`<li class="${read ? 'done' : ''} ${i === nextIndex ? 'current' : ''}">
            <span class="step-dot">${read ? icon('check', 14) : i + 1}</span>
            <div class="step-body">
              <a href="#/article/${c.id}"><strong>${c.title}</strong></a>
              <p class="muted small">${step.why}</p>
            </div>
            ${toggleButton('read', `article:${c.id}`, { compact: true })}
          </li>`;
        })}
      </ol>
    </div>`,
    mount(root) {
      $('#path-active', root).addEventListener('click', () => setActivePath(isActive ? null : path.id));
    },
  };
}

return { get pathsPage() { return pathsPage; }, get pathDetailPage() { return pathDetailPage; } };
});
__define('pages/playground.js', (__require) => {
const { db } = __require('data-loader.js');
const { $, $$, html } = __require('utils/dom.js');
const { rich, richInline } = __require('utils/rich-text.js');
const { visit } = __require('state.js');
const { codeBlock, emptyState, filterGroup, sourcesList, toggleButton, verifiedLine } = __require('components/ui.js');

let activeTopic = 'all';

function list() {
  const items = db.examples.filter((e) => activeTopic === 'all' || e.topic === activeTopic);
  if (!items.length) return emptyState('Sin ejemplos en este tema', 'Elige otro tema.');
  return html`<ul class="example-list">${items.map((e) => html`<li><a href="#/playground/${e.id}">
    <span class="eyebrow">${e.topic}</span>
    <strong>${e.title}</strong>
    <span class="muted small">${e.objective}</span>
    ${e.tested ? html`<span class="tested small">Ejecutado y comprobado</span>` : ''}
  </a></li>`)}</ul>`;
}

function playgroundPage() {
  const topics = [...new Set(db.examples.map((e) => e.topic))];
  const options = [{ value: 'all', label: 'Todos' }, ...topics.map((t) => ({ value: t, label: t }))];
  return {
    title: 'Playground',
    crumbs: [{ label: 'Playground' }],
    content: html`<div class="page">
      <header class="page-head">
        <p class="eyebrow">Practical examples</p>
        <h1>Playground</h1>
        <p class="lead">Configuraciones y flujos listos para copiar y adaptar, con cada parte explicada. Comprueba los campos en la documentación de tu versión: estos formatos evolucionan.</p>
      </header>
      <div class="filters">${filterGroup('topic', 'Tema', options, activeTopic)}</div>
      <div id="ex-list">${list()}</div>
    </div>`,
    mount(root) {
      root.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-filter="topic"]');
        if (!btn) return;
        activeTopic = btn.dataset.value;
        $$('[data-filter="topic"]', root).forEach((b) => {
          b.classList.toggle('on', b === btn);
          b.setAttribute('aria-pressed', String(b === btn));
        });
        $('#ex-list', root).innerHTML = list().toString();
      });
    },
  };
}

const block = (n, title, body) => html`<section class="art-section"><h2><span class="art-num">${n}</span>${title}</h2>${body}</section>`;

function examplePage({ params }) {
  const ex = db.exampleById.get(params.id);
  if (!ex) return null;
  const ref = `example:${ex.id}`;
  const concepts = ex.concepts.map((id) => db.conceptById.get(id)).filter(Boolean);
  const idx = db.examples.indexOf(ex);
  const next = db.examples[idx + 1];
  return {
    title: ex.title,
    crumbs: [{ label: 'Playground', href: '#/playground' }, { label: ex.title }],
    content: html`<article class="page article">
      <header class="art-head">
        <p class="eyebrow">${ex.topic}</p>
        <h1>${ex.title}</h1>
        <div class="art-meta">${verifiedLine(ex)}${ex.tested ? html`<span class="tested small">${ex.tested}</span>` : ''}</div>
        <div class="art-actions">${toggleButton('favorites', ref)}</div>
      </header>
      <div class="reading">
        ${block('01', 'Objetivo', rich(ex.objective))}
        ${block('02', 'Contexto', rich(ex.context))}
        ${block('03', 'Implementación', rich(ex.implementation))}
        ${block('04', 'Código o configuración', ex.files.map((f) => codeBlock({ code: f.code, language: f.language, filename: f.path })))}
        ${block('05', 'Explicación de cada parte', html`<dl class="parts">${ex.parts.map((p) => html`<div><dt><code>${p.label}</code></dt><dd>${richInline(p.text)}</dd></div>`)}</dl>`)}
        ${block('06', 'Resultado esperado', rich(ex.expected))}
        ${block('07', 'Cuándo utilizarlo', rich(ex.whenToUse))}
        ${block('08', 'Posibles limitaciones', html`<ul class="pros-cons cons">${ex.limitations.map((l) => html`<li>${richInline(l)}</li>`)}</ul>`)}
        ${concepts.length ? html`<section class="art-section"><h2>Conceptos relacionados</h2><ul class="chips">${concepts.map((c) => html`<li><a class="chip" href="#/article/${c.id}">${c.title}</a></li>`)}</ul></section>` : ''}
        <section class="art-section"><h2>Fuentes</h2>${sourcesList(ex.sources)}</section>
        ${next ? html`<nav class="pager" aria-label="Siguiente ejemplo"><span></span><a class="pager-next" href="#/playground/${next.id}"><span><small>Siguiente ejemplo</small>${next.title}</span></a></nav>` : ''}
      </div>
    </article>`,
    mount() { visit(ref); },
  };
}

return { get playgroundPage() { return playgroundPage; }, get examplePage() { return examplePage; } };
});
__define('pages/search-results.js', (__require) => {
const { $, $$, html } = __require('utils/dom.js');
const { plural } = __require('utils/format.js');
const { replaceHash } = __require('router.js');
const { search, TYPE_LABELS } = __require('search.js');
const { highlightHits } = __require('components/search-box.js');
const { emptyState, filterGroup } = __require('components/ui.js');

let activeType = 'all';

function results(query) {
  const { tokens, results: all } = search(query, { limit: 200 });
  const counts = all.reduce((acc, r) => ({ ...acc, [r.type]: (acc[r.type] ?? 0) + 1 }), {});
  const options = [{ value: 'all', label: `Todo (${all.length})` }, ...Object.entries(TYPE_LABELS)
    .filter(([type]) => counts[type])
    .map(([type, label]) => ({ value: type, label: `${label} (${counts[type]})` }))];
  const type = counts[activeType] ? activeType : 'all';
  const shown = all.filter((r) => type === 'all' || r.type === type);

  if (!query.trim()) return emptyState('Escribe qué quieres encontrar', 'La búsqueda recorre artículos, herramientas, comparativas, ejemplos, timeline y arquitecturas.');
  if (!all.length) return emptyState(`Sin resultados para “${query}”`, 'Revisa la ortografía o usa un término más general. Los nombres técnicos están en inglés, por ejemplo “subagent”.');

  return html`<div class="filters">${filterGroup('type', 'Tipo', options, type)}</div>
    <p class="small muted result-count" aria-live="polite">${plural(shown.length, 'resultado')}</p>
    <ol class="search-results">${shown.map((r) => html`<li><a href="${r.href}">
      <span class="eyebrow">${TYPE_LABELS[r.type]} · ${r.subtitle}</span>
      <strong>${highlightHits(r.title, tokens)}</strong>
      <span class="small muted">${highlightHits(r.snippet, tokens)}</span>
    </a></li>`)}</ol>`;
}

function searchPage({ query }) {
  const q = query.q ?? '';
  return {
    title: q ? `Buscar: ${q}` : 'Buscar',
    crumbs: [{ label: 'Búsqueda' }],
    content: html`<div class="page">
      <header class="page-head">
        <p class="eyebrow">Búsqueda global</p>
        <h1>Resultados</h1>
        <div class="filter-text filter-text-lg"><input type="search" id="search-page-input" value="${q}" aria-label="Término de búsqueda" placeholder="Buscar en el atlas…" autocomplete="off"></div>
      </header>
      <div id="search-output">${results(q)}</div>
    </div>`,
    mount(root) {
      const input = $('#search-page-input', root);
      const output = $('#search-output', root);
      input.addEventListener('input', () => {
        output.innerHTML = results(input.value).toString();
        replaceHash(`#/search?q=${encodeURIComponent(input.value)}`);
      });
      root.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-filter="type"]');
        if (!btn) return;
        activeType = btn.dataset.value;
        output.innerHTML = results(input.value).toString();
        $$('[data-filter="type"]', root).find((b) => b.dataset.value === activeType)?.focus();
      });
    },
  };
}

return { get searchPage() { return searchPage; } };
});
__define('pages/timeline.js', (__require) => {
const { db } = __require('data-loader.js');
const { $, $$, html } = __require('utils/dom.js');
const { rich } = __require('utils/rich-text.js');
const { replaceHash } = __require('router.js');
const { chips, emptyState, filterGroup, sourcesList, statusBadge } = __require('components/ui.js');
const { icon } = __require('components/icons.js');

const NOW = 2027;

// Escala por tramos: el periodo reciente es denso en hitos y necesita más ancho.
function x(year) {
  const segments = [[1950, 2000, 0, 22], [2000, 2020, 22, 50], [2020, NOW, 50, 100]];
  const y = Math.min(Math.max(year, 1950), NOW);
  const [y0, y1, p0, p1] = segments.find(([a, b]) => y >= a && y <= b);
  return p0 + ((y - y0) / (y1 - y0)) * (p1 - p0);
}

const TICKS = [1950, 1980, 2000, 2010, 2020, 2022, 2024, 2026];

function eventRow(event, openId) {
  const open = event.id === openId;
  const left = x(event.start);
  const end = event.end ?? NOW;
  const width = Math.max(x(end) - left, 1.2);
  const related = (event.relatedConcepts ?? []).map((id) => db.conceptById.get(id)).filter(Boolean);
  return html`<li class="tl-event ${open ? 'open' : ''}" data-event="${event.id}">
    <button type="button" class="tl-row" aria-expanded="${String(open)}" aria-controls="tl-${event.id}">
      <span class="tl-name"><strong>${event.name}</strong><span class="small muted">${event.dateLabel}</span></span>
      <span class="tl-track" aria-hidden="true">
        <span class="tl-bar ${event.end ? '' : 'ongoing'} ${event.precision === 'approximate' ? 'approx' : ''}" style="left:${left}%;width:${width}%"></span>
      </span>
    </button>
    <div class="tl-detail" id="tl-${event.id}" ${open ? '' : html`hidden`}>
      <div class="reading">
        ${rich(event.description)}
        <h3>Por qué importa</h3>
        ${rich(event.importance)}
        ${event.coexists ? html`<p class="callout">${icon('info', 16)}<span>${event.coexists}</span></p>` : ''}
      </div>
      <div class="tl-side">
        <p class="meta-line">${statusBadge(event.status)}<span class="small muted">${event.precision === 'approximate' ? 'Periodo aproximado' : 'Fecha documentada'}</span></p>
        <h3>Tecnologías relacionadas</h3>
        ${chips(event.technologies)}
        ${related.length ? html`<h3>En la enciclopedia</h3>
          <ul class="chips">${related.map((c) => html`<li><a class="chip" href="#/article/${c.id}">${c.title}</a></li>`)}</ul>` : ''}
        <h3>Fuentes</h3>
        ${sourcesList(event.sources)}
      </div>
    </div>
  </li>`;
}

let activeLane = 'all';

function chart(openId) {
  const lanes = db.timeline.lanes.filter((l) => activeLane === 'all' || l.id === activeLane);
  const groups = lanes.map((lane) => ({ lane, events: db.timeline.events.filter((e) => e.lane === lane.id) })).filter((g) => g.events.length);
  if (!groups.length) return emptyState('Sin hitos en esta categoría', 'Elige otra categoría para seguir explorando.');
  return html`<div class="tl-axis" aria-hidden="true">
      <span class="tl-axis-spacer"></span>
      <span class="tl-axis-track">${TICKS.map((t) => html`<span class="tl-tick" style="left:${x(t)}%">${t}</span>`)}</span>
    </div>
    ${groups.map(({ lane, events }) => html`<section class="tl-lane">
      <header><h2>${lane.name}</h2><p class="small muted">${lane.description}</p></header>
      <ol>${events.map((e) => eventRow(e, openId))}</ol>
    </section>`)}`;
}

function timelinePage({ params }) {
  if (params.id && !db.timelineById.has(params.id)) return null;
  const options = [{ value: 'all', label: 'Todas' }, ...db.timeline.lanes.map((l) => ({ value: l.id, label: l.short }))];
  if (params.id) activeLane = 'all';

  return {
    title: 'Timeline',
    crumbs: [{ label: 'Timeline' }],
    content: html`<div class="page">
      <header class="page-head">
        <p class="eyebrow">Evolution of software development</p>
        <h1>Timeline</h1>
        <p class="lead">${db.timeline.intro}</p>
      </header>
      <div class="legend" aria-label="Leyenda">
        <span><i class="lg lg-open"></i>Sigue vigente</span>
        <span><i class="lg lg-approx"></i>Inicio aproximado</span>
      </div>
      <div class="filters">${filterGroup('lane', 'Categoría', options, activeLane)}</div>
      <div id="tl-chart" class="timeline">${chart(params.id)}</div>
    </div>`,
    mount(root) {
      const container = $('#tl-chart', root);
      root.addEventListener('click', (e) => {
        const filter = e.target.closest('[data-filter="lane"]');
        if (filter) {
          activeLane = filter.dataset.value;
          $$('[data-filter="lane"]', root).forEach((b) => {
            const on = b === filter;
            b.classList.toggle('on', on);
            b.setAttribute('aria-pressed', String(on));
          });
          container.innerHTML = chart(null).toString();
          replaceHash('#/timeline');
          return;
        }
        const row = e.target.closest('.tl-row');
        if (!row) return;
        const item = row.closest('.tl-event');
        const opening = !item.classList.contains('open');
        $$('.tl-event.open', container).forEach((other) => {
          other.classList.remove('open');
          $('.tl-row', other).setAttribute('aria-expanded', 'false');
          $('.tl-detail', other).hidden = true;
        });
        if (opening) {
          item.classList.add('open');
          row.setAttribute('aria-expanded', 'true');
          $('.tl-detail', item).hidden = false;
          item.scrollIntoView({ block: 'nearest' });
        }
        replaceHash(opening ? `#/timeline/${item.dataset.event}` : '#/timeline');
      });
      if (params.id) $(`[data-event="${params.id}"]`, root)?.scrollIntoView({ block: 'center' });
    },
  };
}

return { get timelinePage() { return timelinePage; } };
});
__define('pages/tools.js', (__require) => {
const { db } = __require('data-loader.js');
const { $, $$, html } = __require('utils/dom.js');
const { normalize, plural, formatDate } = __require('utils/format.js');
const { richInline, rich } = __require('utils/rich-text.js');
const { visit } = __require('state.js');
const { go } = __require('router.js');
const { icon } = __require('components/icons.js');
const { chips, emptyState, filterGroup, sourcesList, statusBadge, toggleButton } = __require('components/ui.js');

const MAX_COMPARE = 3;
const selected = new Set();
let activeCategory = 'all';
let text = '';

const CAP_LABELS = { yes: 'Sí', partial: 'Parcial', no: 'No', unknown: 'Sin verificar' };

function capCell(cap) {
  const value = cap?.value ?? 'unknown';
  return html`<span class="cap cap-${value}"><i aria-hidden="true"></i>${CAP_LABELS[value]}</span>${cap?.note ? html`<span class="cap-note">${richInline(cap.note)}</span>` : ''}`;
}

function toolCard(tool) {
  const on = selected.has(tool.id);
  return html`<li class="tool-card">
    <a class="tool-main" href="#/tools/${tool.id}">
      <span class="eyebrow">${tool.categoryLabel}</span>
      <strong>${tool.name}</strong>
      <span class="muted small">${tool.description}</span>
    </a>
    <div class="tool-foot">
      ${statusBadge(tool.status)}
      <label class="check">
        <input type="checkbox" data-compare="${tool.id}" ${on ? html`checked` : ''}>
        <span>Comparar</span>
      </label>
    </div>
  </li>`;
}

function grid() {
  const q = normalize(text.trim());
  const tools = db.tools.filter((t) => (activeCategory === 'all' || t.category === activeCategory)
    && (!q || normalize(`${t.name} ${t.description} ${t.features.join(' ')}`).includes(q)));
  if (!tools.length) return emptyState('Ninguna herramienta coincide', 'Cambia la categoría o el texto del filtro.');
  return html`<p class="small muted result-count" aria-live="polite">${plural(tools.length, 'herramienta')}</p><ul class="tool-grid">${tools.map(toolCard)}</ul>`;
}

function compareBar() {
  const n = selected.size;
  return html`<span>${n ? `${plural(n, 'herramienta seleccionada', 'herramientas seleccionadas')}` : `Selecciona hasta ${MAX_COMPARE} herramientas para compararlas`}</span>
    <button type="button" class="btn btn-primary" id="do-compare" ${n < 2 ? html`disabled` : ''}>Comparar</button>`;
}

function toolsPage() {
  const options = [{ value: 'all', label: 'Todas' }, ...db.tools
    .reduce((acc, t) => (acc.some((o) => o.value === t.category) ? acc : [...acc, { value: t.category, label: t.categoryLabel }]), [])];
  return {
    title: 'Tools Explorer',
    crumbs: [{ label: 'Tools Explorer' }],
    content: html`<div class="page">
      <header class="page-head">
        <p class="eyebrow">Explorer</p>
        <h1>Tools Explorer</h1>
        <p class="lead">Fichas de herramientas con funciones comprobadas en su documentación oficial. Cuando no se ha podido confirmar algo, la ficha lo dice en lugar de suponerlo. El sector cambia rápido: revisa siempre la fecha de verificación.</p>
      </header>
      <div class="filters">
        <div class="filter-text">${icon('search', 15)}<input type="search" id="tool-text" value="${text}" placeholder="Filtrar herramientas…" aria-label="Filtrar herramientas por texto"></div>
        ${filterGroup('tool-cat', 'Categoría', options, activeCategory)}
      </div>
      <div class="compare-bar" id="compare-bar">${compareBar()}</div>
      <div id="tool-list">${grid()}</div>
    </div>`,
    mount(root) {
      const list = $('#tool-list', root);
      const bar = $('#compare-bar', root);
      $('#tool-text', root).addEventListener('input', (e) => { text = e.target.value; list.innerHTML = grid().toString(); });
      root.addEventListener('click', (e) => {
        const filter = e.target.closest('[data-filter="tool-cat"]');
        if (filter) {
          activeCategory = filter.dataset.value;
          $$('[data-filter="tool-cat"]', root).forEach((b) => {
            b.classList.toggle('on', b === filter);
            b.setAttribute('aria-pressed', String(b === filter));
          });
          list.innerHTML = grid().toString();
        }
        if (e.target.closest('#do-compare')) go(`#/tools/compare?ids=${[...selected].join(',')}`);
      });
      root.addEventListener('change', (e) => {
        const id = e.target.dataset?.compare;
        if (!id) return;
        if (e.target.checked && selected.size >= MAX_COMPARE) {
          e.target.checked = false;
          return;
        }
        if (e.target.checked) selected.add(id); else selected.delete(id);
        bar.innerHTML = compareBar().toString();
      });
    },
  };
}

function toolDetailPage({ params }) {
  const tool = db.toolById.get(params.id);
  if (!tool) return null;
  const ref = `tool:${tool.id}`;
  const list = (title, items, cls = '') => html`<section class="art-section"><h2>${title}</h2><ul class="pros-cons ${cls}">${items.map((i) => html`<li>${richInline(i)}</li>`)}</ul></section>`;
  const related = tool.relatedConcepts.map((id) => db.conceptById.get(id)).filter(Boolean);

  return {
    title: tool.name,
    crumbs: [{ label: 'Tools Explorer', href: '#/tools' }, { label: tool.name }],
    content: html`<article class="page article">
      <header class="art-head">
        <p class="eyebrow">${tool.categoryLabel}</p>
        <h1>${tool.name}</h1>
        <p class="art-lede">${richInline(tool.description)}</p>
        <div class="art-meta">${statusBadge(tool.status)}<span class="small muted">Última verificación: ${formatDate(tool.lastVerified)}</span></div>
        ${tool.editorialNote ? html`<p class="callout">${icon('info', 16)}<span>${richInline(tool.editorialNote)}</span></p>` : ''}
        <div class="art-actions">
          ${toggleButton('favorites', ref)}
          <a class="btn" href="${tool.docs}" target="_blank" rel="noopener noreferrer">Documentación oficial ${icon('external', 14)}</a>
        </div>
      </header>
      <div class="reading tool-body">
        ${list('Funcionalidades', tool.features)}
        ${list('Casos de uso', tool.useCases)}
        ${list('Ventajas', tool.advantages, 'pros')}
        ${list('Limitaciones', tool.limitations, 'cons')}
        ${tool.capabilities ? html`<section class="art-section"><h2>Capacidades contrastadas</h2>
          <table class="data-table"><tbody>
            ${db.capabilityLabels.map(([key, label]) => html`<tr><th scope="row">${label}</th><td>${capCell(tool.capabilities[key])}</td></tr>`)}
          </tbody></table></section>` : ''}
        <section class="art-section"><h2>Tecnologías relacionadas</h2>
          ${related.length ? html`<ul class="chips">${related.map((c) => html`<li><a class="chip" href="#/article/${c.id}">${c.title}</a></li>`)}</ul>` : ''}
          ${tool.technologies?.length ? chips(tool.technologies) : ''}
        </section>
        <section class="art-section"><h2>Fuentes</h2>${sourcesList(tool.sources)}</section>
      </div>
    </article>`,
    mount() { visit(ref); },
  };
}

function toolComparePage({ query }) {
  const tools = (query.ids ?? '').split(',').map((id) => db.toolById.get(id)).filter(Boolean).slice(0, MAX_COMPARE);
  const crumbs = [{ label: 'Tools Explorer', href: '#/tools' }, { label: 'Comparar' }];
  if (tools.length < 2) {
    return {
      title: 'Comparar herramientas',
      crumbs,
      content: html`<div class="page">${emptyState('Faltan herramientas por comparar', 'Selecciona al menos dos en el Tools Explorer.', html`<a class="btn btn-primary" href="#/tools">Ir a Tools Explorer</a>`)}</div>`,
    };
  }
  const textRow = (label, fn) => html`<tr><th scope="row">${label}</th>${tools.map((t) => html`<td>${fn(t)}</td>`)}</tr>`;
  const miniList = (items) => html`<ul class="mini-list">${items.map((i) => html`<li>${richInline(i)}</li>`)}</ul>`;
  return {
    title: 'Comparar herramientas',
    crumbs,
    content: html`<div class="page">
      <header class="page-head">
        <p class="eyebrow">Comparación</p>
        <h1>${tools.map((t) => t.name).join(' · ')}</h1>
        <p class="lead">“Sin verificar” significa que no se ha podido confirmar en la documentación consultada, no que la función no exista.</p>
      </header>
      <div class="table-scroll" tabindex="0" role="region" aria-label="Tabla comparativa de herramientas">
        <table class="data-table compare-table">
          <thead><tr><td></td>${tools.map((t) => html`<th scope="col"><a href="#/tools/${t.id}">${t.name}</a></th>`)}</tr></thead>
          <tbody>
            ${textRow('Categoría', (t) => t.categoryLabel)}
            ${textRow('Descripción', (t) => richInline(t.description))}
            ${db.capabilityLabels.map(([key, label]) => textRow(label, (t) => (t.capabilities ? capCell(t.capabilities[key]) : html`<span class="muted">No aplica</span>`)))}
            ${textRow('Casos de uso', (t) => miniList(t.useCases))}
            ${textRow('Ventajas', (t) => miniList(t.advantages))}
            ${textRow('Limitaciones', (t) => miniList(t.limitations))}
            ${textRow('Verificación', (t) => html`${statusBadge(t.status)} <span class="small muted">${formatDate(t.lastVerified)}</span>`)}
            ${textRow('Documentación', (t) => html`<a href="${t.docs}" target="_blank" rel="noopener noreferrer">Oficial ${icon('external', 13)}</a>`)}
          </tbody>
        </table>
      </div>
    </div>`,
  };
}

return { get toolsPage() { return toolsPage; }, get toolDetailPage() { return toolDetailPage; }, get toolComparePage() { return toolComparePage; } };
});
__define('router.js', (__require) => {
// Router por hash: "#/article/mcp?x=1". Cada ruta devuelve { title, crumbs, content, mount, liveState }.
const routes = [];
let currentRender = null;

function route(pattern, handler) {
  const keys = [];
  const source = pattern.replace(/:[a-z]+/gi, (m) => { keys.push(m.slice(1)); return '([^/]+)'; });
  routes.push({ regex: new RegExp(`^${source}/?$`), keys, handler });
}

function parseHash() {
  const hash = location.hash.replace(/^#/, '') || '/';
  const [path, queryString = ''] = hash.split('?');
  return { path, query: Object.fromEntries(new URLSearchParams(queryString)) };
}

function match(path) {
  for (const { regex, keys, handler } of routes) {
    const m = regex.exec(path);
    if (m) {
      const params = Object.fromEntries(keys.map((k, i) => [k, decodeURIComponent(m[i + 1])]));
      return { handler, params };
    }
  }
  return null;
}

function startRouter(render) {
  currentRender = render;
  window.addEventListener('hashchange', () => render({ resetScroll: true }));
  render({ resetScroll: false, initial: true });
}

const refresh = () => currentRender?.({ resetScroll: false, keepFocus: true });

const go = (hash) => { location.hash = hash; };

// Actualiza la URL sin volver a pintar la página (estado interno de una vista compartible).
function replaceHash(hash) {
  history.replaceState(null, '', hash);
}

return { get route() { return route; }, get parseHash() { return parseHash; }, get match() { return match; }, get startRouter() { return startRouter; }, get replaceHash() { return replaceHash; }, get refresh() { return refresh; }, get go() { return go; } };
});
__define('search.js', (__require) => {
const { db } = __require('data-loader.js');
const { normalize } = __require('utils/format.js');
const { plain } = __require('utils/rich-text.js');

const STOPWORDS = new Set(['de', 'la', 'el', 'los', 'las', 'y', 'en', 'un', 'una', 'que', 'con', 'por', 'para', 'del', 'al', 'es', 'como', 'the', 'of', 'and', 'vs', 'o']);

const TYPE_LABELS = {
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

function buildIndex() {
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

function tokenize(query) {
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

function search(query, { limit = 60 } = {}) {
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
function markHits(text, tokens) {
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

return { get buildIndex() { return buildIndex; }, get tokenize() { return tokenize; }, get search() { return search; }, get markHits() { return markHits; }, get TYPE_LABELS() { return TYPE_LABELS; } };
});
__define('state.js', (__require) => {
const { loadState, saveState, clearState, DEFAULT_STATE } = __require('storage.js');

const HISTORY_LIMIT = 30;
let state = loadState();
const listeners = new Set();

function commit() {
  saveState(state);
  listeners.forEach((fn) => fn(state));
}

const getState = () => state;
const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };
const has = (list, ref) => state[list].includes(ref);

function toggle(list, ref) {
  const on = !has(list, ref);
  state[list] = on ? [...state[list], ref] : state[list].filter((r) => r !== ref);
  // Leer un artículo lo saca de la lista de pendientes.
  if (list === 'read' && on) state.readLater = state.readLater.filter((r) => r !== ref);
  commit();
  return on;
}

function visit(ref) {
  const rest = state.history.filter((h) => h.ref !== ref);
  state.history = [{ ref, at: Date.now() }, ...rest].slice(0, HISTORY_LIMIT);
  saveState(state);
}

function clearHistory() {
  state.history = [];
  commit();
}

function setPref(key, value) {
  state.prefs = { ...state.prefs, [key]: value };
  applyPrefs();
  commit();
}

function setActivePath(id) {
  state.activePath = id;
  commit();
}

function resetAll() {
  clearState();
  state = structuredClone(DEFAULT_STATE);
  applyPrefs();
  commit();
}

function applyPrefs() {
  const root = document.documentElement;
  root.dataset.theme = state.prefs.theme;
  root.dataset.reading = state.prefs.readingSize;
  root.dataset.codeWrap = state.prefs.codeWrap ? 'on' : 'off';
  document.querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', state.prefs.theme === 'light' ? '#F4EDE0' : '#14123D');
}

return { get toggle() { return toggle; }, get visit() { return visit; }, get clearHistory() { return clearHistory; }, get setPref() { return setPref; }, get setActivePath() { return setActivePath; }, get resetAll() { return resetAll; }, get applyPrefs() { return applyPrefs; }, get getState() { return getState; }, get subscribe() { return subscribe; }, get has() { return has; } };
});
__define('storage.js', (__require) => {
// Persistencia local: solo identificadores y preferencias, nunca contenido.
const KEY = 'ai-dev-atlas:v1';

const DEFAULT_STATE = {
  favorites: [],
  readLater: [],
  read: [],
  history: [],
  activePath: null,
  prefs: { theme: 'dark', readingSize: 'md', codeWrap: false },
};

let memoryFallback = null;

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) ?? 'null') ?? memoryFallback;
    if (!stored) return structuredClone(DEFAULT_STATE);
    return { ...structuredClone(DEFAULT_STATE), ...stored, prefs: { ...DEFAULT_STATE.prefs, ...stored.prefs } };
  } catch {
    return memoryFallback ?? structuredClone(DEFAULT_STATE);
  }
}

function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Modo privado o cuota agotada: la sesión sigue funcionando en memoria.
    memoryFallback = state;
  }
}

function clearState() {
  try { localStorage.removeItem(KEY); } catch { /* sin almacenamiento disponible */ }
  memoryFallback = null;
}

return { get loadState() { return loadState; }, get saveState() { return saveState; }, get clearState() { return clearState; }, get DEFAULT_STATE() { return DEFAULT_STATE; } };
});
__define('utils/dom.js', (__require) => {
// Plantillas HTML con escape automático: todo valor se escapa salvo que venga de html()/raw().
class Safe {
  constructor(value) { this.value = value; }
  toString() { return this.value; }
}

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (ch) => ESCAPES[ch]);
const raw = (value) => new Safe(String(value ?? ''));

function renderValue(value) {
  if (value === null || value === undefined || value === false || value === true) return '';
  if (Array.isArray(value)) return value.map(renderValue).join('');
  if (value instanceof Safe) return value.value;
  return esc(value);
}

function html(strings, ...values) {
  let out = strings[0];
  values.forEach((value, i) => { out += renderValue(value) + strings[i + 1]; });
  return new Safe(out);
}

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

let toastTimer;
function toast(message) {
  const el = $('#toast');
  el.textContent = message;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.hidden = true; }, 2200);
}

return { get html() { return html; }, get toast() { return toast; }, get esc() { return esc; }, get raw() { return raw; }, get $() { return $; }, get $$() { return $$; } };
});
__define('utils/format.js', (__require) => {
const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

function formatDate(iso) {
  if (!iso) return 'Sin verificar';
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

function plural(n, singular, pluralForm = `${singular}s`) {
  return `${n} ${n === 1 ? singular : pluralForm}`;
}

// Quita acentos y mayúsculas conservando la longitud para poder resaltar sobre el texto original.
function normalize(text) {
  return String(text ?? '').normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
}

const DIFFICULTY = {
  beginner: { label: 'Beginner', level: 1 },
  intermediate: { label: 'Intermediate', level: 2 },
  advanced: { label: 'Advanced', level: 3 },
};

const STATUS = {
  verified: { label: 'Verified', hint: 'Contrastado con la fuente enlazada en la fecha indicada.' },
  'needs-review': { label: 'Needs review', hint: 'Tiene fuentes enlazadas, pero falta contrastarlo línea a línea.' },
  draft: { label: 'Draft', hint: 'Borrador: el término o el contenido aún no está asentado.' },
};

return { get formatDate() { return formatDate; }, get plural() { return plural; }, get normalize() { return normalize; }, get DIFFICULTY() { return DIFFICULTY; }, get STATUS() { return STATUS; } };
});
__define('utils/highlight.js', (__require) => {
const { esc } = __require('utils/dom.js');

// Resaltador mínimo por lenguaje: cada regla es [regex, clase]. Se prueban en orden en cada posición.
const STRING = [/"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'/y, 'str'];

const RULES = {
  bash: [
    [/(?<![^\s])#[^\n]*/y, 'com'], STRING,
    [/\$\{?[A-Za-z_][A-Za-z0-9_]*\}?/y, 'var'],
    [/(?<![\w./-])(?:git|claude|cd|mkdir|cat|echo|npm|npx|node|docker|wait|for|do|done|if|then|fi|exit|jq|grep|rm|cp|python|in)(?![\w./-])/y, 'kw'],
    [/(?<=\s)--?[A-Za-z][\w-]*/y, 'attr'],
  ],
  json: [
    [/"(?:[^"\\\n]|\\.)*"(?=\s*:)/y, 'attr'],
    [/"(?:[^"\\\n]|\\.)*"/y, 'str'],
    [/\b(?:true|false|null)\b|-?\b\d+(?:\.\d+)?\b/y, 'num'],
  ],
  yaml: [
    [/(?<![^\s])#[^\n]*/y, 'com'], STRING,
    [/\$\{\{[^}]*\}\}/y, 'var'],
    [/(?<=^\s*(?:-\s+)?)[A-Za-z_][\w.-]*(?=:)/my, 'attr'],
    [/\b(?:true|false|null)\b|\b\d+(?:\.\d+)?\b/y, 'num'],
  ],
  markdown: [
    [/^---$/my, 'com'],
    [/^#{1,6} [^\n]*/my, 'kw'],
    [/`[^`\n]+`/y, 'str'],
    [/\*\*[^*\n]+\*\*/y, 'attr'],
    [/^[A-Za-z_-]+(?=:\s)/my, 'attr'],
    [/^\s*(?:[-*]|\d+\.) /my, 'num'],
  ],
  javascript: [
    [/\/\/[^\n]*|\/\*[\s\S]*?\*\//y, 'com'], STRING,
    [/`(?:[^`\\]|\\.)*`/y, 'str'],
    [/\b(?:import|from|export|default|const|let|var|function|return|if|else|for|of|in|await|async|new|class|throw|try|catch)\b/y, 'kw'],
    [/\b(?:true|false|null|undefined)\b|\b\d+(?:\.\d+)?\b/y, 'num'],
  ],
  hcl: [
    [/(?<![^\s])#[^\n]*/y, 'com'], STRING,
    [/\b(?:resource|provider|variable|output|terraform|module|data)\b/y, 'kw'],
    [/\b(?:true|false)\b|\b\d+\b/y, 'num'],
  ],
  dockerfile: [
    [/^\s*#[^\n]*/my, 'com'], STRING,
    [/^(?:FROM|RUN|COPY|WORKDIR|CMD|ENV|EXPOSE|USER|ENTRYPOINT)\b/my, 'kw'],
  ],
};

RULES.sh = RULES.bash;
RULES.js = RULES.javascript;
RULES.md = RULES.markdown;
RULES.yml = RULES.yaml;

function highlight(code, language) {
  const rules = RULES[language];
  if (!rules) return esc(code);
  let out = '';
  let pos = 0;
  let plainStart = 0;
  const flush = (end) => { if (end > plainStart) out += esc(code.slice(plainStart, end)); };
  while (pos < code.length) {
    let matched = false;
    for (const [regex, cls] of rules) {
      regex.lastIndex = pos;
      const match = regex.exec(code);
      if (match && match[0].length > 0) {
        flush(pos);
        out += `<span class="tok-${cls}">${esc(match[0])}</span>`;
        pos += match[0].length;
        plainStart = pos;
        matched = true;
        break;
      }
    }
    if (!matched) pos += 1;
  }
  flush(code.length);
  return out;
}

return { get highlight() { return highlight; } };
});
__define('utils/rich-text.js', (__require) => {
const { db } = __require('data-loader.js');
const { esc, raw } = __require('utils/dom.js');

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

const richInline = (text) => raw(inline(text));

// Convierte párrafos separados por línea en blanco y listas con "- " en HTML.
function rich(text) {
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
function plain(text) {
  return String(text ?? '')
    .replace(/\[\[[a-z0-9-]+\|([^\]]+)\]\]/g, '$1')
    .replace(/\[\[([a-z0-9-]+)\]\]/g, '$1')
    .replace(/[`*]/g, '');
}

return { get rich() { return rich; }, get plain() { return plain; }, get richInline() { return richInline; } };
});
__require('app.js');
})();
