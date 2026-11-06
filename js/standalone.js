// Archivo generado por scripts/build-standalone.mjs. No editar a mano.
window.__ATLAS_DATA__ = {"architectures":[{"id":"coding-agent","short":"AI Coding Agent","title":"Arquitectura de un AI Coding Agent","status":"verified","summary":"Un modelo que decide, un bucle que ejecuta y un harness que aporta contexto, herramientas y controles.","viewBox":"0 0 860 520","groups":[{"label":"Harness","x":200,"y":20,"w":450,"h":480},{"label":"Entorno","x":680,"y":150,"w":170,"h":280}],"nodes":[{"id":"user","label":"Persona","x":20,"y":210,"w":150,"h":64,"kind":"default","description":"Define el objetivo, aprueba acciones de riesgo y revisa el resultado. No desaparece del proceso: se traslada a la especificación y a la revisión."},{"id":"loop","label":"Bucle del agente","x":340,"y":210,"w":170,"h":64,"kind":"accent","description":"El corazón del agente: envía el contexto al modelo, ejecuta las herramientas pedidas, añade el resultado y repite hasta una condición de parada.","concept":"agent-lifecycle"},{"id":"model","label":"Modelo (LLM)","x":340,"y":60,"w":170,"h":64,"kind":"primary","description":"Decide la siguiente acción a partir del contexto. No ejecuta nada ni recuerda nada entre llamadas: todo lo demás lo pone el harness.","concept":"model-providers"},{"id":"context","label":"Contexto","x":220,"y":370,"w":130,"h":64,"kind":"default","description":"Lo que el modelo ve en cada llamada: instrucciones, historial, archivos leídos y resultados. Es limitado, y hay que gestionarlo.","concept":"context-engineering"},{"id":"instructions","label":"Instrucciones","x":220,"y":60,"w":100,"h":64,"kind":"store","description":"AGENTS.md, CLAUDE.md y reglas. Se cargan como contexto; orientan al modelo, pero no lo obligan.","concept":"agents-md"},{"id":"perms","label":"Permisos y hooks","x":510,"y":370,"w":125,"h":64,"kind":"default","description":"Se interponen antes y después de cada acción. Son el control determinista: lo que no puede quedar a criterio del modelo.","concept":"hooks"},{"id":"memory","label":"Memoria","x":365,"y":370,"w":125,"h":64,"kind":"store","description":"Notas fuera de la ventana de contexto, que sobreviven entre sesiones y se reinyectan.","concept":"persistent-memory"},{"id":"tools","label":"Herramientas","x":695,"y":275,"w":140,"h":56,"kind":"primary","description":"Leer, editar, buscar, ejecutar comandos. Aquí es donde el agente deja de hablar y empieza a actuar.","concept":"tools-agent"},{"id":"repo","label":"Repositorio y terminal","x":695,"y":190,"w":140,"h":56,"kind":"default","description":"El entorno real. Ejecutar tests aquí da al agente un resultado objetivo con el que corregirse.","concept":"git-worktrees"},{"id":"mcp","label":"Servidores MCP","x":695,"y":355,"w":140,"h":56,"kind":"default","description":"Sistemas externos conectados con un protocolo común.","concept":"mcp"}],"edges":[{"from":"user","to":"loop","label":"objetivo","both":true,"ly":-14},{"from":"loop","to":"model","label":"contexto ↔ decisión","both":true,"lx":2},{"from":"instructions","to":"model","dashed":true},{"from":"context","to":"loop"},{"from":"memory","to":"loop","dashed":true},{"from":"loop","to":"perms","label":"valida"},{"from":"perms","to":"tools","label":"ejecuta","lx":-6,"ly":-4},{"from":"tools","to":"repo"},{"from":"tools","to":"mcp","dashed":true}],"notes":"Fíjate en cuántas piezas no son el modelo. Por eso dos productos con el mismo modelo pueden comportarse de forma muy diferente, y por eso se habla de [[agentic-harness|harness]].\n\nEl diagrama es un modelo conceptual, no el diseño interno de un producto concreto: cada herramienta organiza estas piezas a su manera.","sources":[{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"},{"title":"Birgitta Böckeler: Harness engineering for coding agent users","url":"https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html","note":"martinfowler.com, 2 de abril de 2026"},{"title":"Claude Code: overview","url":"https://code.claude.com/docs/en/overview"}],"lastVerified":"2026-11-05"},{"id":"multi-agent","short":"Sistema multiagente","title":"Arquitectura de un sistema multiagente","status":"verified","summary":"Un orquestador divide el trabajo, varios agentes lo ejecutan con su propio contexto y un punto común integra los resultados.","viewBox":"0 0 860 480","groups":[{"label":"Contextos aislados","x":40,"y":165,"w":780,"h":130}],"nodes":[{"id":"objective","label":"Objetivo","x":345,"y":15,"w":170,"h":50,"kind":"default","description":"La tarea global, tal como la plantea una persona."},{"id":"orch","label":"Orquestador","x":345,"y":95,"w":170,"h":54,"kind":"accent","description":"Descompone el objetivo, decide qué se hace en paralelo y da a cada trabajador objetivo, formato, herramientas y límites.","concept":"orchestrators"},{"id":"w1","label":"Agente de investigación","x":60,"y":205,"w":210,"h":70,"kind":"primary","description":"Explora y resume. Puede usar un modelo barato y herramientas de solo lectura.","concept":"subagents"},{"id":"w2","label":"Agente de implementación","x":325,"y":205,"w":210,"h":70,"kind":"primary","description":"Modifica el código. Es el que más necesita aislamiento y verificación.","concept":"subagents"},{"id":"w3","label":"Agente de revisión","x":590,"y":205,"w":210,"h":70,"kind":"primary","description":"Lee los cambios con un contexto limpio, sin haber visto cómo se escribieron. Solo lectura.","concept":"automated-code-review"},{"id":"state","label":"Estado compartido","x":60,"y":345,"w":210,"h":60,"kind":"store","description":"Planes, archivos y ramas: el canal por el que los agentes se pasan información sin compartir conversación.","concept":"agent-communication"},{"id":"synth","label":"Síntesis e integración","x":325,"y":345,"w":210,"h":60,"kind":"accent","description":"Combina los resultados. Dos resultados correctos por separado pueden no serlo en conjunto: hay que comprobar el total.","concept":"orchestrators"},{"id":"verify","label":"Verificación","x":590,"y":345,"w":210,"h":60,"kind":"default","description":"Tests, CI y revisión humana del resultado global."}],"edges":[{"from":"objective","to":"orch"},{"from":"orch","to":"w1","label":"encargo","lx":-10,"ly":-6},{"from":"orch","to":"w2","label":"encargo","lx":34},{"from":"orch","to":"w3","label":"encargo","lx":10,"ly":-6},{"from":"w1","to":"state","both":true,"dashed":true},{"from":"w1","to":"synth","label":"resumen","lx":-14,"ly":4},{"from":"w2","to":"synth","label":"resultado","lx":36},{"from":"w3","to":"synth","label":"hallazgos","lx":14,"ly":4},{"from":"synth","to":"verify"}],"notes":"Anthropic informa de que sus sistemas multiagente usan unas 15 veces los tokens de un chat, por lo que solo compensan en tareas de alto valor.\n\nTambién observó que los encargos vagos hacían que los subagentes duplicaran trabajo o dejaran huecos. La calidad de la delegación importa tanto como el número de agentes.","sources":[{"title":"Anthropic: How we built our multi-agent research system","url":"https://www.anthropic.com/engineering/multi-agent-research-system"},{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"}],"lastVerified":"2026-11-05"},{"id":"config-relations","short":"AGENTS.md, Skills, Subagents, Memory","title":"Relación entre AGENTS.md, Skills, Subagents y Memory","status":"verified","summary":"Todas compiten por una misma ventana de contexto, pero se cargan en momentos distintos y las escriben actores distintos.","viewBox":"0 0 860 470","groups":[{"label":"Ventana de contexto del agente principal","x":240,"y":172,"w":380,"h":163}],"nodes":[{"id":"agents","label":"AGENTS.md / CLAUDE.md","x":20,"y":40,"w":200,"h":64,"kind":"primary","description":"**Siempre.** Lo escribes tú, y contiene lo que importa en casi cualquier tarea. Cuanto más breve, mejor.","concept":"agents-md","sublabel":"se carga siempre"},{"id":"memory","label":"Memoria persistente","x":20,"y":200,"w":200,"h":64,"kind":"store","description":"**Al inicio, y parcial.** La escribe el agente con lo que aprende. Claude Code, por ejemplo, carga las primeras 200 líneas o 25 KB del índice.","concept":"persistent-memory","sublabel":"la escribe el agente"},{"id":"skills","label":"Skills","x":640,"y":40,"w":200,"h":64,"kind":"primary","description":"**Bajo demanda.** Al inicio solo se ve el nombre y la descripción; el contenido se carga al usarse, y entonces permanece en contexto.","concept":"skills","sublabel":"se carga al usarse"},{"id":"sub","label":"Subagents","x":640,"y":200,"w":200,"h":64,"kind":"accent","description":"**Contexto aparte.** Trabajan en su propia ventana, y solo su resultado vuelve a la principal.","concept":"subagents","sublabel":"contexto propio"},{"id":"ctx","label":"Contexto activo","x":335,"y":205,"w":190,"h":70,"kind":"accent","description":"El recurso compartido. Lo que entra aquí influye en cada decisión del modelo, y al llenarse hay que compactar.","concept":"context-management"},{"id":"hooks","label":"Hooks","x":335,"y":385,"w":190,"h":60,"kind":"default","description":"**Fuera del contexto.** Los ejecuta el harness. Por eso son el único elemento de este diagrama que no depende de que el modelo obedezca.","concept":"hooks","sublabel":"deterministas"},{"id":"submem","label":"Memoria del subagente","x":640,"y":370,"w":200,"h":64,"kind":"store","description":"Algunas herramientas permiten que un subagente tenga su propia memoria.","concept":"persistent-memory"}],"edges":[{"from":"agents","to":"ctx","label":"siempre","lx":-14,"ly":-8},{"from":"memory","to":"ctx","label":"índice"},{"from":"skills","to":"ctx","label":"al invocarse","lx":14,"ly":-8},{"from":"sub","to":"ctx","label":"resumen"},{"from":"hooks","to":"ctx","label":"bloquea o añade","dashed":true},{"from":"skills","to":"sub","label":"se pueden precargar","dashed":true},{"from":"sub","to":"submem","both":true,"dashed":true}],"notes":"Una forma de decidir dónde va algo:\n\n- ¿Debe saberse siempre? → AGENTS.md.\n- ¿Es un procedimiento que se usa a veces? → Skill.\n- ¿Genera mucho ruido o necesita menos permisos? → Subagente.\n- ¿Lo aprendió el agente trabajando? → Memoria.\n- ¿No admite excepciones? → Hook.\n\nLas herramientas tienen piezas similares con diferencias: consulta las pestañas por herramienta de cada artículo.","sources":[{"title":"Claude Code: How Claude remembers your project","url":"https://code.claude.com/docs/en/memory"},{"title":"Claude Code: Skills","url":"https://code.claude.com/docs/en/skills"},{"title":"Claude Code: Subagents","url":"https://code.claude.com/docs/en/sub-agents"},{"title":"Claude Code: Hooks reference","url":"https://code.claude.com/docs/en/hooks"},{"title":"AGENTS.md","url":"https://agents.md/","note":"Sitio oficial del formato"}],"lastVerified":"2026-11-05"},{"id":"mcp","short":"Sistema basado en MCP","title":"Arquitectura de un sistema basado en MCP","status":"verified","summary":"El host crea un cliente por servidor. Cada servidor expone capacidades y queda aislado de los demás.","viewBox":"0 0 860 470","groups":[{"label":"Proceso host","x":20,"y":40,"w":340,"h":380},{"label":"Máquina local","x":400,"y":40,"w":440,"h":220},{"label":"Internet","x":400,"y":290,"w":440,"h":130}],"nodes":[{"id":"host","label":"Host","x":50,"y":180,"w":110,"h":90,"kind":"accent","description":"La aplicación de IA, como un agente de código. Crea y gestiona clientes, aplica políticas de seguridad, pide consentimiento y coordina la integración con el modelo. La conversación completa permanece aquí.","concept":"mcp"},{"id":"c1","label":"Client 1","x":210,"y":75,"w":120,"h":56,"kind":"primary","description":"Se comunica con un único servidor (relación 1:1) y adjunta a cada petición la versión del protocolo y sus capacidades.","concept":"mcp"},{"id":"c2","label":"Client 2","x":210,"y":170,"w":120,"h":56,"kind":"primary","description":"Cada cliente mantiene un límite de seguridad con su servidor.","concept":"mcp"},{"id":"c3","label":"Client 3","x":210,"y":325,"w":120,"h":56,"kind":"primary","description":"Un cliente remoto usa Streamable HTTP; uno local suele usar stdio.","concept":"mcp"},{"id":"s1","label":"Servidor: archivos y Git","x":430,"y":75,"w":190,"h":56,"kind":"default","description":"Proceso local, normalmente iniciado por el cliente y comunicado por stdio.","concept":"mcp-servers","sublabel":"stdio"},{"id":"s2","label":"Servidor: base de datos","x":430,"y":170,"w":190,"h":56,"kind":"default","description":"Expone herramientas o recursos. No puede leer toda la conversación ni ver otros servidores.","concept":"mcp-servers","sublabel":"stdio"},{"id":"s3","label":"Servidor: API externa","x":430,"y":325,"w":190,"h":56,"kind":"default","description":"Servicio remoto. La especificación exige validar el origen y recomienda autenticar conexiones.","concept":"mcp-servers","sublabel":"Streamable HTTP"},{"id":"r1","label":"Repositorio","x":680,"y":75,"w":130,"h":56,"kind":"store","description":"Recurso al que accede el servidor. El modelo no se conecta aquí de forma directa."},{"id":"r2","label":"Base de datos","x":680,"y":170,"w":130,"h":56,"kind":"store","description":"Limita las credenciales del servidor: el modelo puede pedir cosas inesperadas."},{"id":"r3","label":"Servicio SaaS","x":680,"y":325,"w":130,"h":56,"kind":"store","description":"A menudo, MCP envuelve aquí una API existente."}],"edges":[{"from":"host","to":"c1"},{"from":"host","to":"c2"},{"from":"host","to":"c3"},{"from":"c1","to":"s1","label":"JSON-RPC","both":true},{"from":"c2","to":"s2","label":"JSON-RPC","both":true},{"from":"c3","to":"s3","label":"JSON-RPC","both":true},{"from":"s1","to":"r1","both":true},{"from":"s2","to":"r2","both":true},{"from":"s3","to":"r3","both":true}],"notes":"La revisión 2026-07-28 de la especificación hace que el protocolo sea sin estado: desaparece el handshake `initialize`, y cada petición lleva su versión y capacidades. Los servidores anuncian las suyas con `server/discover`.\n\nLos servidores exponen tres primitivas: tools, resources y prompts. Sampling, Roots y Logging quedan marcados como obsoletos en esa revisión, aunque siguen funcionando durante el periodo de retirada.","sources":[{"title":"MCP Specification 2026-07-28: Architecture","url":"https://modelcontextprotocol.io/specification/2026-07-28/architecture"},{"title":"MCP Specification 2026-07-28: Key Changes","url":"https://modelcontextprotocol.io/specification/2026-07-28/changelog"},{"title":"Claude Code: MCP","url":"https://code.claude.com/docs/en/mcp"}],"lastVerified":"2026-11-05"},{"id":"ai-workflow","short":"Workflow con IA","title":"Workflow de desarrollo asistido por IA","status":"verified","summary":"Un flujo con puntos de control donde corregir aún es barato, y un bucle de mejora que convierte los errores en controles permanentes.","viewBox":"0 0 860 420","nodes":[{"id":"spec","label":"Especificar","x":20,"y":60,"w":130,"h":64,"kind":"primary","description":"Qué se quiere y cómo se comprueba. Las buenas prácticas de Claude Code sugieren escribir la especificación y construir después en una sesión limpia.","concept":"spec-driven-development"},{"id":"explore","label":"Explorar","x":185,"y":60,"w":130,"h":64,"kind":"default","description":"El agente lee el código sin cambiar nada. Si genera mucha salida, un subagente puede encargarse.","concept":"context-engineering"},{"id":"plan","label":"Planificar","x":350,"y":60,"w":130,"h":64,"kind":"accent","description":"Propuesta de enfoque. Es el punto de revisión más rentable: cambiar de rumbo aquí cuesta poco.","concept":"planning-reasoning"},{"id":"impl","label":"Implementar","x":515,"y":60,"w":130,"h":64,"kind":"default","description":"El agente escribe en una rama o worktree aislados.","concept":"agentic-coding"},{"id":"verify","label":"Verificar","x":680,"y":60,"w":150,"h":64,"kind":"primary","description":"Tests, linter y comprobación del comportamiento real. Sin esto, un agente puede dar por terminada una tarea que no lo está.","concept":"ai-generated-code-testing"},{"id":"review","label":"Revisar","x":680,"y":200,"w":150,"h":64,"kind":"accent","description":"Un revisor con contexto limpio y una persona. Importa más cuanto más autónomo sea el agente."},{"id":"merge","label":"Integrar","x":680,"y":330,"w":150,"h":64,"kind":"default","description":"PR, CI y merge."},{"id":"learn","label":"Mejorar el harness","x":350,"y":270,"w":170,"h":64,"kind":"accent","description":"Si un error se repite, añade una instrucción, un linter o un hook. El siguiente agente ya no lo cometerá.","concept":"harness-engineering"},{"id":"config","label":"Instrucciones y controles","x":80,"y":270,"w":180,"h":64,"kind":"store","description":"AGENTS.md, skills, hooks y tests. Es el entorno que hace que el próximo ciclo empiece mejor.","concept":"agentic-harness"}],"edges":[{"from":"spec","to":"explore"},{"from":"explore","to":"plan"},{"from":"plan","to":"impl"},{"from":"impl","to":"verify"},{"from":"verify","to":"impl","dashed":true},{"from":"verify","to":"review"},{"from":"review","to":"merge"},{"from":"review","to":"learn","label":"errores repetidos","dashed":true,"ly":-8},{"from":"learn","to":"config"},{"from":"config","to":"spec","label":"siguiente ciclo","dashed":true,"lx":-6}],"notes":"No todas las tareas necesitan todos los pasos. Un cambio de texto puede saltar directamente a implementar y verificar; una migración de datos los necesita todos.\n\nEl orden es orientativo y no corresponde a un estándar. Lo importante es tener un objetivo verificable y revisar antes de que corregir sea caro.","sources":[{"title":"Claude Code: Best practices","url":"https://code.claude.com/docs/en/best-practices"},{"title":"Anthropic: Effective harnesses for long-running agents","url":"https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents"},{"title":"Birgitta Böckeler: Harness engineering for coding agent users","url":"https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html","note":"martinfowler.com, 2 de abril de 2026"}],"lastVerified":"2026-11-05"},{"id":"parallel-worktrees","short":"Agentes con Worktrees","title":"Agentes en paralelo con Git Worktrees","status":"verified","summary":"Un solo repositorio, varios directorios de trabajo. Cada agente tiene sus archivos, su rama y su index, y comparten el historial.","viewBox":"0 0 860 490","groups":[{"label":"Compartido por todos","x":280,"y":15,"w":300,"h":105},{"label":"Propio de cada worktree: archivos, HEAD, index","x":20,"y":150,"w":820,"h":170}],"nodes":[{"id":"git","label":".git compartido","x":320,"y":50,"w":220,"h":56,"kind":"accent","description":"Objetos, referencias y configuración son comunes. Un commit en un worktree se ve al momento en los demás.","concept":"git-worktrees","sublabel":"objetos, refs, config"},{"id":"wt1","label":"Worktree principal","x":45,"y":190,"w":170,"h":56,"kind":"primary","description":"El directorio del `git clone`. No se puede eliminar con `git worktree remove`.","concept":"git-worktrees","sublabel":"main"},{"id":"wt2","label":"../app-auth","x":245,"y":190,"w":170,"h":56,"kind":"primary","description":"Linked worktree creado con `git worktree add ../app-auth -b feature/auth`. Necesita sus propias dependencias.","concept":"git-worktrees","sublabel":"feature/auth"},{"id":"wt3","label":"../app-billing","x":445,"y":190,"w":170,"h":56,"kind":"primary","description":"Una rama solo puede estar activa en un worktree a la vez: Git rechaza repetirla sin `--force`.","concept":"git-worktrees","sublabel":"feature/billing"},{"id":"wt4","label":"../app-docs","x":645,"y":190,"w":170,"h":56,"kind":"primary","description":"Una tarea sin relación con las demás es la candidata ideal: no generará conflictos.","concept":"git-worktrees","sublabel":"docs/api"},{"id":"a1","label":"Tú","x":45,"y":262,"w":170,"h":44,"kind":"default","description":"Trabajas o supervisas en el directorio principal, sin interrupciones."},{"id":"a2","label":"Agente A","x":245,"y":262,"w":170,"h":44,"kind":"default","description":"Trabaja en sus archivos sin ver los cambios sin commitear de los demás.","concept":"subagents"},{"id":"a3","label":"Agente B","x":445,"y":262,"w":170,"h":44,"kind":"default","description":"Aunque comparte historia, tiene su propio index: su `git add` no afecta a los demás.","concept":"subagents"},{"id":"a4","label":"Agente C","x":645,"y":262,"w":170,"h":44,"kind":"default","description":"Comparten recursos de la máquina: puertos, bases de datos locales y CPU siguen siendo un punto de choque.","concept":"parallel-agent-development"},{"id":"pr","label":"PRs y CI","x":245,"y":370,"w":170,"h":56,"kind":"default","description":"Cada rama se valida por separado. Esto no descubre los fallos que aparecen al combinar cambios."},{"id":"integrate","label":"Integración","x":445,"y":370,"w":170,"h":56,"kind":"accent","description":"Aquí surgen los conflictos. Fusiona de una en una, actualiza las demás ramas y vuelve a ejecutar los tests."},{"id":"main","label":"main","x":645,"y":370,"w":170,"h":56,"kind":"primary","description":"El resultado integrado."}],"edges":[{"from":"git","to":"wt1","both":true},{"from":"git","to":"wt2","both":true},{"from":"git","to":"wt3","both":true},{"from":"git","to":"wt4","both":true},{"from":"a2","to":"pr","label":"push","lx":26},{"from":"a3","to":"pr","label":"push","ly":-4},{"from":"pr","to":"integrate"},{"from":"integrate","to":"main"}],"notes":"**Lo que los worktrees evitan:** que dos agentes se sobrescriban archivos en disco o compartan el área de preparación.\n\n**Lo que no evitan:** conflictos de merge, conflictos semánticos y choques de recursos como un puerto compartido. Para eso hace falta dividir bien las tareas.","sources":[{"title":"Git: git-worktree","url":"https://git-scm.com/docs/git-worktree"},{"title":"Claude Code: Run parallel sessions with worktrees","url":"https://code.claude.com/docs/en/worktrees"}],"lastVerified":"2026-11-05"},{"id":"specialized-agents","short":"Agentes especializados","title":"Arquitectura de un proyecto con agentes especializados","status":"needs-review","summary":"Un ejemplo de reparto de roles en un repositorio. Cada agente tiene solo las herramientas y el contexto que su función necesita.","viewBox":"0 0 860 460","groups":[{"label":"Subagentes del repositorio","x":190,"y":120,"w":480,"h":200}],"nodes":[{"id":"lead","label":"Agente principal","x":345,"y":30,"w":170,"h":60,"kind":"accent","description":"Conversa contigo, mantiene el plan y decide a quién delegar según la descripción de cada agente.","concept":"orchestrators"},{"id":"explorer","label":"explorer","x":210,"y":155,"w":130,"h":60,"kind":"default","description":"Solo lectura y un modelo económico. Localiza código y resume.","concept":"subagents","sublabel":"Read, Grep, Glob"},{"id":"implementer","label":"implementer","x":365,"y":155,"w":130,"h":60,"kind":"primary","description":"Puede editar. Conviene aislarlo en un worktree si trabaja en paralelo.","concept":"git-worktrees","sublabel":"Edit, Bash"},{"id":"reviewer","label":"reviewer","x":520,"y":155,"w":130,"h":60,"kind":"default","description":"Solo lectura. Al no haber visto cómo se escribió el código, aporta una mirada distinta.","concept":"automated-code-review","sublabel":"Read, Grep"},{"id":"tester","label":"test-runner","x":365,"y":245,"w":130,"h":56,"kind":"default","description":"Ejecuta las pruebas y devuelve solo los fallos, para que no se llene el contexto con salida larga.","sublabel":"Bash, Read"},{"id":"instr","label":"AGENTS.md","x":20,"y":155,"w":140,"h":60,"kind":"store","description":"Convenciones comunes para todos. Evita repetirlas en cada agente.","concept":"agents-md"},{"id":"skills","label":"Skills","x":20,"y":245,"w":140,"h":56,"kind":"store","description":"Procedimientos que pueden precargarse en un agente concreto.","concept":"skills"},{"id":"hooks","label":"Hooks","x":700,"y":155,"w":140,"h":60,"kind":"default","description":"Se aplican con independencia del agente: formatear, bloquear comandos, registrar.","concept":"hooks"},{"id":"mcp","label":"MCP","x":700,"y":245,"w":140,"h":56,"kind":"default","description":"En algunas herramientas, un agente puede tener solo los servidores que necesita.","concept":"mcp"},{"id":"ci","label":"CI y revisión humana","x":345,"y":370,"w":170,"h":60,"kind":"primary","description":"La última barrera. No depende de ningún agente del sistema."}],"edges":[{"from":"lead","to":"explorer"},{"from":"lead","to":"implementer","label":"delega","lx":28},{"from":"lead","to":"reviewer"},{"from":"implementer","to":"tester"},{"from":"instr","to":"explorer","dashed":true},{"from":"skills","to":"tester","dashed":true},{"from":"hooks","to":"reviewer","dashed":true},{"from":"mcp","to":"tester","dashed":true},{"from":"tester","to":"ci","label":"PR"}],"notes":"Este reparto es **un ejemplo, no una receta**. Más agentes no significa mejores resultados: cada rol añade coste y coordinación.\n\nEmpieza sin ninguno, y crea un agente especializado solo cuando un problema concreto lo justifique, por ejemplo cuando la salida de los tests llena el contexto o quieras una revisión con permisos limitados.","sources":[{"title":"Claude Code: Subagents","url":"https://code.claude.com/docs/en/sub-agents"},{"title":"Claude Code: Best practices","url":"https://code.claude.com/docs/en/best-practices"},{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"}],"lastVerified":null}],"categories":[{"id":"ai-agents","letter":"A","name":"AI Agents","tagline":"Qué es un agente y cómo se comporta","description":"Qué distingue a un agente de un asistente, cómo se estructura su bucle de ejecución y cómo se coordina con otros agentes."},{"id":"agent-components","letter":"B","name":"Agent Components","tagline":"Las piezas con las que se configura un agente","description":"Instrucciones, skills, subagentes, memoria, hooks, permisos, MCP y orquestadores. Cada artículo explica la pieza por separado y dónde encaja con las demás."},{"id":"ai-development","letter":"C","name":"Agentic Development","tagline":"Cómo se trabaja con agentes","description":"Las prácticas y términos del desarrollo con agentes de IA. Muchos son recientes y sus límites aún se discuten: cada artículo separa lo que está definido de lo que es uso informal."},{"id":"parallel-agents","letter":"D","name":"Parallel Agents","tagline":"Varios agentes en un mismo repositorio","description":"Cómo hacer que varios agentes trabajen a la vez sin pisarse, con Git Worktrees como mecanismo principal de aislamiento."},{"id":"agent-quality","letter":"E","name":"Evaluation & Quality","tagline":"Comprobar lo que hace un agente","description":"Cómo medir a un agente con evals y cómo verificar y revisar el código que genera."},{"id":"agent-tools","letter":"F","name":"Agent Tools & Platforms","tagline":"Las categorías de herramientas para agentes","description":"Qué es cada categoría: agentes de terminal, asistentes de código, servidores MCP o proveedores de modelos. Las fichas de productos concretos están en Tools Explorer."}],"comparisons":[{"id":"assistant-vs-agent","title":"AI Assistant vs AI Agent","status":"verified","summary":"Un asistente responde y la persona dirige cada paso. Un agente recibe un objetivo y decide los pasos por sí mismo.","a":{"name":"AI Assistant","concept":"assistants-vs-agents","what":"Sistema que responde a peticiones o sugiere: autocompletado, chat. Cada paso lo inicia y aplica una persona.","goal":"Acelerar a la persona, que mantiene el control paso a paso.","pros":["Supervisión sencilla.","Coste bajo por interacción.","Riesgo limitado."],"cons":["La persona hace de intermediaria.","Poco útil en tareas largas."],"chooseWhen":["Quieres controlar cada cambio.","La tarea es pequeña o exploratoria."],"example":"Pides que explique un error y aplicas tú la corrección."},"b":{"name":"AI Agent","concept":"ai-agents","what":"Sistema en el que el modelo dirige su propio proceso y usa herramientas en bucle hasta alcanzar un objetivo.","goal":"Completar una tarea de varios pasos con poca intervención.","pros":["Autonomía en tareas abiertas.","Puede comprobar su trabajo.","Permite delegar y paralelizar."],"cons":["Más coste: unas 4 veces los tokens de un chat, según Anthropic.","Más difícil de predecir.","Actuar en sistemas reales conlleva riesgo."],"chooseWhen":["Los pasos dependen de lo que se descubra.","Hay forma de verificar el resultado."],"example":"Le pides que corrija un test: lo ejecuta, investiga, edita y repite hasta que pase."},"differences":[{"aspect":"Quién decide el siguiente paso","a":"La persona.","b":"El modelo."},{"aspect":"Capacidad de actuar","a":"Generalmente propone.","b":"Ejecuta herramientas y observa el resultado."},{"aspect":"Forma de interacción","a":"Petición y respuesta.","b":"Bucle hasta completar un objetivo."},{"aspect":"Punto de revisión","a":"Cada paso.","b":"Puntos de control o resultado final."}],"together":"Es un espectro, y muchos productos ofrecen ambos modos. La pregunta útil es cuánto control delegas en cada tarea.","sources":[{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"},{"title":"Anthropic: How we built our multi-agent research system","url":"https://www.anthropic.com/engineering/multi-agent-research-system"}],"lastVerified":"2026-11-05"},{"id":"agent-vs-subagent","title":"Agent vs Subagent","status":"verified","summary":"Técnicamente, un subagente es un agente. La diferencia es su posición: trabaja por encargo de otro, con contexto propio, y le devuelve un resultado.","a":{"name":"Agent","concept":"ai-agents","what":"Sistema que recibe el objetivo y conversa con la persona, manteniendo el contexto principal de la tarea.","goal":"Alcanzar el objetivo global y responder ante el usuario.","pros":["Tiene la visión completa.","Conversación continua."],"cons":["Su contexto se llena.","Una sola línea de trabajo."],"chooseWhen":["La tarea es pequeña o muy acoplada.","Necesitas ir decidiendo en conversación."],"example":"Una sesión de Claude Code en la que trabajas una funcionalidad."},"b":{"name":"Subagent","concept":"subagents","what":"Agente al que otro delega una tarea, con ventana de contexto, instrucciones y herramientas propias, que devuelve un resumen.","goal":"Resolver una subtarea sin ensuciar el contexto principal.","pros":["Aísla contexto.","Permisos mínimos por tarea.","Modelo más barato si procede.","Permite paralelismo."],"cons":["Arranca sin contexto: requiere un buen encargo.","Suma tokens.","El resumen puede ocultar problemas."],"chooseWhen":["La subtarea genera mucha salida.","Quieres restringir herramientas, como en un revisor."],"example":"Un subagente de solo lectura revisa el diff y devuelve los hallazgos."},"differences":[{"aspect":"Quién le da el objetivo","a":"La persona.","b":"Otro agente."},{"aspect":"Contexto","a":"El de la conversación.","b":"Propio y separado."},{"aspect":"Qué devuelve","a":"Responde al usuario.","b":"Un resultado al agente que lo lanzó."},{"aspect":"Herramientas","a":"Generalmente, el conjunto completo.","b":"Suele estar restringido."}],"sources":[{"title":"Claude Code: Subagents","url":"https://code.claude.com/docs/en/sub-agents"},{"title":"Anthropic: Effective context engineering for AI agents","url":"https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents","note":"29 de septiembre de 2025"}],"lastVerified":"2026-11-05"},{"id":"skills-vs-subagents","title":"Skills vs Subagents","status":"verified","summary":"Una skill aporta conocimiento al contexto actual; un subagente aporta un contexto aparte. Responden a problemas distintos, y se pueden combinar.","a":{"name":"Skills","concept":"skills","what":"Instrucciones empaquetadas que se cargan en la conversación solo cuando hacen falta.","goal":"Reutilizar un procedimiento o conocimiento sin cargarlo siempre.","pros":["Mínimo coste hasta usarse.","Acceso a toda la conversación.","Reutilizables y versionables."],"cons":["Una vez cargada, ocupa contexto en los turnos siguientes.","Comparte los permisos de la sesión, salvo ajustes."],"chooseWhen":["La tarea necesita el contexto de la conversación.","Quieres un procedimiento repetible."],"example":"`/deploy-staging` guía los pasos de despliegue dentro de tu sesión."},"b":{"name":"Subagents","concept":"subagents","what":"Agentes separados con su propio contexto, herramientas y modelo.","goal":"Aislar trabajo y mantener limpio el contexto principal.","pros":["No ensucian el contexto.","Permiten restringir herramientas.","Ejecución en paralelo."],"cons":["No ven la conversación.","Más tokens en total."],"chooseWhen":["La tarea genera mucha salida.","Necesitas otra perspectiva o menos permisos."],"example":"Un subagente explora 100 archivos y devuelve tres rutas relevantes."},"differences":[{"aspect":"Dónde se ejecuta","a":"En el contexto actual.","b":"En un contexto separado."},{"aspect":"Qué aporta","a":"Conocimiento e instrucciones.","b":"Aislamiento y paralelismo."},{"aspect":"Acceso a la conversación","a":"Sí.","b":"No; recibe un encargo."},{"aspect":"Definición en Claude Code","a":"`.claude/skills/<nombre>/SKILL.md`","b":"`.claude/agents/<nombre>.md`"}],"together":"Se combinan: un subagente puede precargar skills con su campo `skills`, y una skill puede ejecutarse en un subagente con `context: fork`.","sources":[{"title":"Claude Code: Skills","url":"https://code.claude.com/docs/en/skills"},{"title":"Claude Code: Subagents","url":"https://code.claude.com/docs/en/sub-agents"}],"lastVerified":"2026-11-05"},{"id":"agentsmd-vs-skills","title":"AGENTS.md vs Skills","status":"verified","summary":"AGENTS.md es lo que el agente debe saber siempre. Una skill es lo que debe saber a veces.","a":{"name":"AGENTS.md","concept":"agents-md","what":"Archivo Markdown de instrucciones del proyecto, en un formato abierto que leen muchas herramientas.","goal":"Dar el contexto mínimo para trabajar en el repositorio.","pros":["Compatible con muchas herramientas.","Sin configuración.","Siempre disponible."],"cons":["Consume contexto en cada sesión.","Un archivo largo pierde eficacia."],"chooseWhen":["Es un hecho que importa en casi toda tarea.","Son comandos, estructura y convenciones."],"example":"“Los tests se ejecutan con `pnpm test`”."},"b":{"name":"Skills","concept":"skills","what":"Paquetes de instrucciones y recursos que se cargan bajo demanda.","goal":"Hacer disponibles procedimientos largos sin coste permanente.","pros":["Pueden ser extensos.","Incluyen scripts y referencias.","Invocables a mano o automáticamente."],"cons":["La activación automática puede fallar.","Campos no totalmente portables."],"chooseWhen":["Es un procedimiento de varios pasos.","Solo importa en ciertas tareas."],"example":"Un procedimiento de 200 líneas para crear una migración de base de datos."},"differences":[{"aspect":"Cuándo se carga","a":"Al trabajar en el proyecto.","b":"Solo el nombre y la descripción; el resto al usarla."},{"aspect":"Tamaño razonable","a":"Corto.","b":"Largo, con archivos de apoyo."},{"aspect":"Contenido típico","a":"Hechos y reglas.","b":"Procedimientos."},{"aspect":"Portabilidad","a":"Alta.","b":"Depende de la herramienta."}],"sources":[{"title":"AGENTS.md","url":"https://agents.md/","note":"Sitio oficial del formato"},{"title":"Claude Code: Skills","url":"https://code.claude.com/docs/en/skills"},{"title":"Claude Code: How Claude remembers your project","url":"https://code.claude.com/docs/en/memory"}],"lastVerified":"2026-11-05"},{"id":"mcp-vs-api","title":"MCP vs API","status":"verified","summary":"No compiten: una API expone un servicio para cualquier software; MCP estandariza cómo una aplicación de IA descubre y usa capacidades. Un servidor MCP suele envolver una API.","a":{"name":"MCP","concept":"mcp","what":"Protocolo abierto sobre JSON-RPC para conectar aplicaciones de IA con herramientas, recursos y prompts.","goal":"Una integración común para muchas aplicaciones de IA.","pros":["Descubrimiento de capacidades.","Reutilizable entre clientes.","Descripciones pensadas para modelos."],"cons":["Otra capa que mantener.","Las definiciones consumen contexto.","Riesgos propios, como la inyección por contenido."],"chooseWhen":["Un agente debe usar el sistema.","Quieres que varias aplicaciones de IA lo reutilicen."],"example":"Un servidor MCP de tickets expone `create_ticket` a cualquier cliente compatible."},"b":{"name":"API","what":"Interfaz general con la que un software usa otro, como una API REST o GraphQL.","goal":"Exponer funcionalidad a programas en general.","pros":["Estándar universal, con mucha infraestructura.","Control preciso.","No depende de IA."],"cons":["Cada integración es a medida.","Un modelo necesita que le describan cómo usarla."],"chooseWhen":["Los consumidores son programas normales.","Controlas el código de la integración."],"example":"Tu frontend llama a `POST /tickets`."},"differences":[{"aspect":"Consumidor previsto","a":"Aplicaciones de IA.","b":"Cualquier software."},{"aspect":"Descubrimiento","a":"El cliente lista las capacidades.","b":"Según la API: documentación u OpenAPI."},{"aspect":"Formato","a":"JSON-RPC, con primitivas definidas.","b":"Libre: REST, GraphQL, gRPC…"},{"aspect":"Relación","a":"Suele envolver una API.","b":"Puede estar detrás de un servidor MCP."}],"together":"Lo habitual es tener ambos: la API sigue siendo la interfaz del sistema, y el servidor MCP la adapta para los agentes.","sources":[{"title":"MCP Specification 2026-07-28: Architecture","url":"https://modelcontextprotocol.io/specification/2026-07-28/architecture"},{"title":"Anthropic: Introducing the Model Context Protocol","url":"https://www.anthropic.com/news/model-context-protocol","note":"25 de noviembre de 2024"}],"lastVerified":"2026-11-05"},{"id":"mcp-vs-tool-calling","title":"MCP vs Tool Calling","status":"verified","summary":"Tool calling es cómo el modelo pide usar una herramienta. MCP es cómo la aplicación obtiene y ejecuta herramientas externas. Operan en capas distintas.","a":{"name":"MCP","concept":"mcp","what":"Protocolo entre la aplicación de IA y servidores externos.","goal":"Estandarizar el acceso a herramientas y datos.","pros":["Herramientas reutilizables.","Separa el agente del integrador."],"cons":["Requiere cliente y servidor.","Superficie de riesgo adicional."],"chooseWhen":["Las herramientas viven fuera de tu aplicación.","Quieres compartirlas."],"example":"El host conecta con un servidor de base de datos y obtiene sus herramientas."},"b":{"name":"Tool Calling","concept":"tool-calling","what":"Capacidad del modelo de emitir una petición estructurada de herramienta, que la aplicación ejecuta.","goal":"Permitir que el modelo decida acciones de forma validable.","pros":["Simple y directo.","Sin infraestructura adicional."],"cons":["Cada aplicación define e implementa sus herramientas.","El formato varía según el proveedor."],"chooseWhen":["Las herramientas son propias de tu aplicación.","Basta una integración simple."],"example":"Tu app define `get_weather` y la ejecuta cuando el modelo la pide."},"differences":[{"aspect":"Capa","a":"Aplicación ↔ servidor.","b":"Modelo ↔ aplicación."},{"aspect":"Quién lo implementa","a":"Host y servidores.","b":"Proveedor del modelo y tu aplicación."},{"aspect":"Estandarización","a":"Protocolo abierto.","b":"Propia de cada API de modelo."},{"aspect":"¿Sustituye al otro?","a":"No: el modelo sigue usando tool calling.","b":"No: puede usar herramientas de MCP."}],"together":"Flujo típico: el host obtiene herramientas por MCP, las presenta al modelo, este emite una llamada por tool calling y el host la ejecuta por MCP.","sources":[{"title":"MCP Specification 2026-07-28: Architecture","url":"https://modelcontextprotocol.io/specification/2026-07-28/architecture"},{"title":"Claude API: Tool use","url":"https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview"}],"lastVerified":"2026-11-05"},{"id":"branch-vs-worktree","title":"Git Branch vs Git Worktree","status":"verified","summary":"Una rama es una línea de historia; un worktree es un directorio donde tener una rama activa. No son alternativas: un worktree usa una rama.","a":{"name":"Git Branch","what":"Puntero móvil a un commit, que representa una línea de trabajo.","goal":"Aislar cambios en la historia.","pros":["Muy ligera.","Base de todo flujo de Git."],"cons":["Sin worktrees, solo hay una activa por directorio.","Cambiar de rama interrumpe lo que esté en marcha."],"chooseWhen":["Trabajas en una cosa cada vez.","Quieres aislar un cambio en la historia."],"example":"`git switch -c feature/search`"},"b":{"name":"Git Worktree","concept":"git-worktrees","what":"Directorio de trabajo adicional enlazado al mismo repositorio, con sus archivos, su `HEAD` y su `index`.","goal":"Tener varias ramas activas a la vez.","pros":["Trabajo simultáneo real.","Aislamiento de archivos para varios agentes.","Comparte historia."],"cons":["Cada uno necesita sus dependencias.","Más directorios que limpiar.","Una rama no puede estar activa en dos."],"chooseWhen":["Varios agentes o tareas en paralelo.","Revisar un PR sin interrumpir tu trabajo."],"example":"`git worktree add ../app-auth -b feature/auth`"},"differences":[{"aspect":"Qué es","a":"Una referencia en la historia.","b":"Un directorio en disco."},{"aspect":"Ocupa","a":"Casi nada.","b":"Una copia de los archivos de trabajo."},{"aspect":"Simultaneidad","a":"Una activa por directorio.","b":"Una por worktree."},{"aspect":"Evita","a":"Mezclar historia.","b":"Pisar archivos en disco."}],"together":"Ninguno evita los conflictos al integrar: los worktrees solo los trasladan al momento del merge.","sources":[{"title":"Git: git-worktree","url":"https://git-scm.com/docs/git-worktree"},{"title":"Pro Git: Basic Branching and Merging","url":"https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging"}],"lastVerified":"2026-11-05"},{"id":"assisted-vs-agentic","title":"AI-assisted coding vs Agentic coding","summary":"La diferencia es quién mantiene el bucle de trabajo: en la asistencia, la persona; en agentic coding, el agente, con la persona supervisando.","a":{"name":"AI-assisted coding","concept":"ai-assisted-development","what":"Programar con ayuda de un modelo que sugiere o responde; la persona ejecuta y decide cada paso.","goal":"Acelerar la escritura y la comprensión del código.","pros":["Control detallado.","Coste bajo.","Se integra sin cambiar de hábitos."],"cons":["Hay que copiar errores y aplicar cambios.","Rinde menos en cambios amplios."],"chooseWhen":["Código crítico que quieres escribir paso a paso.","Estás aprendiendo una tecnología."],"example":"Autocompletado y preguntas puntuales mientras programas."},"b":{"name":"Agentic coding","concept":"agentic-coding","what":"Delegar tareas en un agente que edita, ejecuta y verifica de forma autónoma.","goal":"Delegar el ciclo completo de una tarea.","pros":["Cambios multiarchivo.","Verificación autónoma.","Trabajo en paralelo."],"cons":["Revisar diffs grandes.","Más tokens.","Mayor riesgo sin buenos controles."],"chooseWhen":["La tarea tiene un criterio de éxito verificable.","Tienes tests y puedes revisar el resultado."],"example":"“Migra estos 30 archivos a la API nueva y haz pasar los tests”."},"differences":[{"aspect":"Ciclo editar-ejecutar-corregir","a":"Lo hace la persona.","b":"Lo hace el agente."},{"aspect":"Unidad de trabajo","a":"Línea, función.","b":"Tarea."},{"aspect":"Rol de la persona","a":"Autora.","b":"Supervisora y revisora."}],"together":"No hay por qué elegir: un mismo día se pueden usar ambos según la tarea.","sources":[{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"},{"title":"Claude Code: overview","url":"https://code.claude.com/docs/en/overview"},{"title":"Simon Willison: Not all AI-assisted programming is vibe coding","url":"https://simonwillison.net/2025/Mar/19/vibe-coding/"}],"status":"needs-review","lastVerified":null},{"id":"rag-vs-memory","title":"RAG vs Persistent Memory","summary":"RAG busca en un corpus de conocimiento para responder. La memoria persistente conserva lo que el agente aprende al trabajar. Se parecen por fuera, porque ambos inyectan texto en el contexto.","a":{"name":"RAG","what":"Retrieval-Augmented Generation: recuperar fragmentos relevantes de una base documental y añadirlos al contexto.","goal":"Responder con conocimiento externo y actualizable.","pros":["Escala a corpus grandes.","Permite citar las fuentes."],"cons":["La calidad depende de la recuperación.","Infraestructura de indexado."],"chooseWhen":["Hay mucha documentación o datos ya existentes.","El conocimiento lo gestiona otro proceso."],"example":"Un asistente que responde a partir de manuales internos."},"b":{"name":"Persistent Memory","concept":"persistent-memory","what":"Información que el agente, o una persona, guarda entre sesiones a partir de su experiencia.","goal":"Dar continuidad y evitar repetir errores.","pros":["Mejora con el uso.","Sencilla si se basa en archivos."],"cons":["Las notas envejecen.","Puede guardar errores o datos sensibles."],"chooseWhen":["Se trata de preferencias y aprendizajes de trabajo.","Se trabaja repetidamente en el mismo proyecto."],"example":"Una nota: “los tests de integración requieren Docker en marcha”."},"differences":[{"aspect":"Quién escribe","a":"Un proceso de ingesta.","b":"El agente o una persona durante el trabajo."},{"aspect":"Qué contiene","a":"Conocimiento externo.","b":"Experiencia y preferencias."},{"aspect":"Cómo se recupera","a":"Búsqueda, a menudo semántica.","b":"Índice cargado al inicio o lectura directa."}],"together":"No se excluyen. Una memoria grande puede usar técnicas de búsqueda, y un agente puede combinar ambas.","sources":[{"title":"Claude Code: How Claude remembers your project","url":"https://code.claude.com/docs/en/memory"},{"title":"Anthropic: Effective context engineering for AI agents","url":"https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents","note":"29 de septiembre de 2025"}],"status":"needs-review","lastVerified":null}],"concepts":[{"id":"ai-agents","title":"AI Agents","category":"ai-agents","difficulty":"beginner","aliases":["agentes de IA","what is an ai agent","qué es un agente","agente"],"description":"Un sistema en el que un modelo de lenguaje dirige su propio proceso: decide qué hacer, usa herramientas, observa el resultado y repite hasta completar un objetivo.","technicalExplanation":"No existe una definición única y universal de “agente”. Anthropic ofrece una útil por su precisión: los **agentes** son sistemas en los que el LLM dirige dinámicamente sus procesos y el uso de herramientas, mientras que en los **workflows** los modelos y las herramientas se orquestan por rutas predefinidas. La diferencia está en **quién controla el flujo**.\n\nEn su forma más básica, un agente es un LLM con herramientas ejecutándose en un bucle:\n\n- Recibe un objetivo y un contexto.\n- El modelo decide la siguiente acción.\n- El sistema ejecuta la herramienta y devuelve el resultado.\n- El modelo evalúa si ha terminado o sigue.\n\nEsta estructura se relaciona con el trabajo sobre ReAct (2022), que propuso intercalar razonamiento y acciones en los modelos de lenguaje. Un agente de código, como Claude Code o Codex, aplica este bucle con herramientas para leer y editar archivos y ejecutar comandos, lo que le permite comprobar su propio trabajo y corregirse.","problem":"Un modelo que solo responde no puede completar tareas cuyos pasos dependen de lo que va descubriendo. Arreglar un bug requiere buscar, leer, formular una hipótesis, cambiar código, ejecutar tests y reaccionar al resultado. Un agente cubre ese ciclo sin que una persona haga de intermediaria en cada paso.","howItWorks":"Un agente combina tres elementos: **modelo** (decide), **herramientas** (actúan y observan) y **bucle con condición de parada**. Alrededor hay un [[agentic-harness|harness]] que gestiona contexto, permisos y verificación.\n\nEl bucle debe tener límites. Sin ellos, un agente puede seguir gastando recursos o insistir en un enfoque equivocado. Lo habitual es limitar turnos, coste o tiempo y exigir aprobación humana en las acciones de riesgo.","whenToUse":"Cuando la tarea es abierta y no puedes prever los pasos: depurar, explorar un código desconocido o implementar un cambio en varios archivos. Si los pasos son fijos, un [[workflows|workflow]] es más barato y predecible; si basta una respuesta, no hace falta un agente. Anthropic recomienda empezar por la solución más simple.","advantages":["Afronta tareas de varios pasos sin intervención continua.","Puede verificar y corregir su propio trabajo.","Se adapta a lo que descubre durante la tarea."],"limitations":["Coste y latencia mayores: Anthropic estima alrededor de 4 veces los tokens de un chat.","Comportamiento no determinista, más difícil de probar.","Los errores se pueden propagar por varios pasos.","Actuar sobre sistemas reales introduce riesgos de seguridad."],"example":{"text":"Le pides “el test de login falla, arréglalo”. El agente ejecuta el test, lee el error, busca la función implicada, edita, vuelve a ejecutar, ve que pasa y te resume el cambio. Ninguno de esos pasos estaba escrito de antemano: cada uno depende del resultado anterior."},"relatedConcepts":[{"id":"assistants-vs-agents","note":"Delimita la diferencia con un asistente."},{"id":"tool-calling","note":"El mecanismo que le permite actuar."},{"id":"agent-architecture","note":"Desglosa sus componentes."},{"id":"workflows","note":"La alternativa de flujo predefinido."},{"id":"agentic-harness","note":"Lo que rodea al modelo y lo hace utilizable."},{"id":"agentic-coding","note":"La aplicación de agentes al desarrollo de software."}],"prerequisites":[],"tools":["claude-code","openai-codex","cursor","gemini-cli","claude-agent-sdk"],"sources":[{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"},{"title":"ReAct: Synergizing Reasoning and Acting in Language Models","url":"https://arxiv.org/abs/2210.03629","note":"arXiv, octubre de 2022"},{"title":"Anthropic: How we built our multi-agent research system","url":"https://www.anthropic.com/engineering/multi-agent-research-system"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05","featured":1},{"id":"assistants-vs-agents","title":"AI Assistants vs AI Agents","category":"ai-agents","difficulty":"beginner","aliases":["asistente vs agente"],"description":"Un asistente responde o sugiere y la persona dirige cada paso; un agente recibe un objetivo y decide por sí mismo los pasos para alcanzarlo.","technicalExplanation":"La distinción es un espectro más que una frontera, y los productos se mueven por él: GitHub Copilot empezó con sugerencias de código y hoy documenta capacidades agénticas. La variable útil es el **grado de control delegado**: quién decide el siguiente paso y si el sistema puede ejecutar acciones y observar el resultado.","problem":"Aclara qué supervisión requiere cada herramienta y qué riesgos implica. Usar “agente” para cualquier chatbot oculta esa diferencia práctica.","howItWorks":"Un asistente hace, en esencia, petición → respuesta, y la persona aplica el resultado. Un agente ejecuta un bucle de decisión, acción y observación sobre un objetivo.","whenToUse":"Asistente para dudas y cambios locales que controlas paso a paso. Agente para tareas de varios pasos en las que puedas revisar el resultado final.","advantages":["Ayuda a elegir el nivel de supervisión correcto.","Evita confusiones de marketing."],"limitations":["No hay frontera nítida: un mismo producto puede tener ambos modos.","El uso del término varía de un proveedor a otro."],"example":{"text":"Autocompletar una función es asistencia. Pedir “añade paginación al endpoint y actualiza los tests”, y que el sistema edite, ejecute y corrija, es comportamiento agéntico."},"relatedConcepts":[{"id":"ai-agents","note":"Definición detallada de agente."},{"id":"ai-coding-assistants","note":"La categoría de producto correspondiente."},{"id":"autonomous-agents","note":"El extremo de mayor autonomía."}],"prerequisites":[],"tools":["github-copilot","claude-code"],"sources":[{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"},{"title":"GitHub Docs: What is GitHub Copilot?","url":"https://docs.github.com/en/copilot/get-started/what-is-github-copilot"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"agent-architecture","title":"Agent Architecture","category":"ai-agents","difficulty":"intermediate","aliases":["arquitectura de agentes"],"description":"La organización interna de un agente: modelo, contexto, herramientas, memoria, bucle de control y capa de seguridad, y cómo se conectan.","technicalExplanation":"Aunque cada producto la implementa a su modo, casi todos los agentes de código comparten estas piezas: el **modelo** decide; el **bucle** alterna inferencia y ejecución; el **contexto** reúne instrucciones, historial y resultados; las **herramientas** actúan sobre el entorno; la **memoria** conserva información fuera de la ventana, y **permisos y hooks** controlan qué se ejecuta.","problem":"Ofrece un mapa para razonar sobre un agente: cuando algo falla, saber si el problema está en el contexto, en una herramienta o en la falta de verificación evita cambiar de modelo sin motivo.","howItWorks":"El host construye el contexto, llama al modelo, valida las peticiones de herramienta contra los permisos, las ejecuta y devuelve el resultado al historial, hasta alcanzar una condición de parada.","whenToUse":"Al diseñar un agente propio o al configurar uno existente. Empieza por lo mínimo: modelo, unas pocas herramientas y un bucle.","advantages":["Permite localizar problemas por componente.","Los componentes se pueden mejorar por separado."],"limitations":["Cada capa añade complejidad y latencia.","Los frameworks pueden ocultar lo que realmente se envía al modelo."],"example":{"text":"Un agente mínimo son unas 50 líneas: un bucle que llama al modelo, ejecuta la herramienta pedida y añade el resultado al historial hasta que el modelo no pide más herramientas."},"relatedConcepts":[{"id":"agentic-harness","note":"Todo menos el modelo."},{"id":"agent-lifecycle","note":"La misma arquitectura vista en el tiempo."},{"id":"tools-agent","note":"Componente de actuación."},{"id":"persistent-memory","note":"Componente de continuidad."}],"prerequisites":["ai-agents"],"tools":["claude-agent-sdk","langgraph"],"sources":[{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"},{"title":"Birgitta Böckeler: Harness engineering for coding agent users","url":"https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html","note":"martinfowler.com, 2 de abril de 2026"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"agent-lifecycle","title":"Agent Lifecycle","category":"ai-agents","difficulty":"intermediate","aliases":["ciclo de vida del agente"],"description":"Las fases por las que pasa un agente durante una tarea: arranque y carga de contexto, bucle de trabajo, compactación, verificación y cierre.","technicalExplanation":"El ciclo de vida importa porque ahí se enganchan los mecanismos de control. Los eventos de hooks de las herramientas lo ilustran. Gemini CLI, por ejemplo, ofrece `SessionStart`, `BeforeAgent`, `BeforeTool`, `AfterTool`, `PreCompress` y `SessionEnd`, y Codex, Cursor y Claude Code tienen equivalentes.","problem":"Sin distinguir fases, es difícil decidir dónde cargar instrucciones, dónde verificar o cómo continuar una tarea interrumpida.","howItWorks":"- **Arranque:** carga instrucciones y memoria.\n- **Bucle:** decisión, acción y observación.\n- **Mantenimiento:** compacta el contexto o delega.\n- **Verificación:** tests y comprobaciones.\n- **Cierre:** resumen, commit, y notas para la siguiente sesión.","whenToUse":"Al diseñar agentes de larga duración o decidir qué hook usar. Una tarea larga necesita además dejar estado para la sesión siguiente.","advantages":["Aclara dónde colocar cada control.","Facilita retomar el trabajo."],"limitations":["Las fases y sus nombres varían entre productos."],"example":{"text":"Anthropic describe un patrón para tareas largas: un agente inicializador crea un script de arranque, una lista de funcionalidades y un log de progreso; cada sesión posterior lee ese estado, trabaja en una funcionalidad y hace commit."},"relatedConcepts":[{"id":"hooks","note":"Se enganchan a los eventos del ciclo."},{"id":"context-compaction","note":"Fase de mantenimiento."},{"id":"agent-architecture","note":"Las piezas que participan en el ciclo."}],"prerequisites":["ai-agents"],"tools":["claude-code"],"sources":[{"title":"Claude Code: Hooks reference","url":"https://code.claude.com/docs/en/hooks"},{"title":"Anthropic: Effective harnesses for long-running agents","url":"https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents"},{"title":"Gemini CLI: Hooks","url":"https://geminicli.com/docs/hooks/"},{"title":"Codex: Hooks","url":"https://learn.chatgpt.com/docs/hooks"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"agent-orchestration","title":"Agent Orchestration","category":"ai-agents","difficulty":"advanced","aliases":["orquestación de agentes"],"description":"La coordinación de uno o varios agentes para completar un trabajo: quién hace qué, en qué orden, con qué información y cómo se combinan los resultados.","technicalExplanation":"Orquestar es una decisión de diseño con opciones. Puede ser **secuencial** (pipeline), **paralela** o **jerárquica** (orquestador y trabajadores), y estar dirigida por **código** o por un **modelo**. La pieza que la ejecuta es el [[orchestrators|orquestador]]. Anthropic informa de que sus sistemas multiagente consumen unas 15 veces los tokens de un chat, por lo que la complejidad debe justificarse.","problem":"Cuando una tarea excede a un agente, hay que repartirla sin duplicar esfuerzos, dejar huecos ni crear conflictos entre resultados.","howItWorks":"Se define la topología, el contrato de cada agente (objetivo, formato de salida, herramientas, límites), el estado compartido y el tratamiento de fallos.","whenToUse":"Solo cuando un agente único no basta o el paralelismo aporta valor claro. Primero intenta mejorar el contexto y las herramientas.","advantages":["Abre la puerta a tareas grandes.","Permite especialización y paralelismo."],"limitations":["Coste multiplicado.","Depuración difícil.","Los fallos de coordinación son un tipo de error nuevo."],"example":{"text":"Investigación: un agente principal planifica, lanza subagentes para distintos aspectos en paralelo y compila la respuesta. Es la arquitectura que Anthropic describe en su sistema Research."},"relatedConcepts":[{"id":"orchestrators","note":"El componente que la ejecuta."},{"id":"multi-agent-systems","note":"El tipo de sistema resultante."},{"id":"workflows","note":"Orquestación por rutas predefinidas."},{"id":"parallel-agent-development","note":"Su aplicación al trabajo en un repositorio."}],"prerequisites":["ai-agents","subagents"],"tools":["langgraph","autogen","claude-agent-sdk"],"sources":[{"title":"Anthropic: How we built our multi-agent research system","url":"https://www.anthropic.com/engineering/multi-agent-research-system"},{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"multi-agent-systems","title":"Multi-agent Systems","category":"ai-agents","difficulty":"advanced","aliases":["sistemas multiagente","MAS"],"description":"Sistemas en los que varios agentes con funciones o contextos diferentes colaboran para resolver una tarea.","technicalExplanation":"El campo de los sistemas multiagente es anterior a los LLM. En el contexto actual, la idea se popularizó con trabajos como AutoGen (2023), en el que agentes colaboran mediante conversación. Hoy, la topología más común en herramientas de desarrollo es jerárquica: un agente principal y varios subagentes.\n\nSus ventajas no son gratuitas: Anthropic señala que estos sistemas funcionan bien en tareas que se pueden paralelizar, como investigar varios frentes, y solo compensan en tareas de alto valor por su coste.","problem":"Una sola ventana de contexto limita la cantidad de información que se puede procesar. Varios agentes pueden explorar en paralelo y aportar especialización.","howItWorks":"Cada agente mantiene su contexto. Se comunican directamente, por medio de un coordinador o a través de estado compartido, como archivos o Git. Un coordinador integra el resultado.","whenToUse":"Cuando las subtareas son independientes y el valor justifica el coste. Si las decisiones de un agente dependen de las de otro, por ejemplo al modificar el mismo módulo, suele ir mejor uno solo.","advantages":["Exploración paralela.","Aislamiento de contexto.","Roles especializados."],"limitations":["Unas 15 veces más tokens que un chat, según Anthropic.","Riesgo de trabajo duplicado o incoherente.","Difícil de evaluar y depurar."],"example":{"text":"Un equipo de agentes de código: uno implementa en una rama, otro escribe tests en otra y un tercero, de solo lectura, revisa. Una persona u orquestador integra el resultado."},"relatedConcepts":[{"id":"subagents","note":"Forma jerárquica más común."},{"id":"orchestrators","note":"Coordinan el sistema."},{"id":"agent-communication","note":"Cómo intercambian información."},{"id":"parallel-agent-development","note":"Su aplicación con Git."}],"prerequisites":["ai-agents","agent-orchestration"],"tools":["autogen","langgraph","claude-code"],"sources":[{"title":"AutoGen: Next-Gen LLM Applications via Multi-Agent Conversation","url":"https://arxiv.org/abs/2308.08155","note":"arXiv, agosto de 2023"},{"title":"Anthropic: How we built our multi-agent research system","url":"https://www.anthropic.com/engineering/multi-agent-research-system"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"autonomous-agents","title":"Autonomous Agents","category":"ai-agents","difficulty":"intermediate","aliases":["agentes autónomos","autonomía"],"description":"Agentes que trabajan durante periodos largos con poca o ninguna intervención humana, a menudo en segundo plano o en la nube.","technicalExplanation":"La autonomía es un parámetro, no una categoría binaria: depende de cuánto tiempo actúa el agente sin revisión y qué acciones puede tomar. Muchas herramientas ofrecen ejecución en segundo plano o en la nube, como Codex Cloud, Cursor Cloud Agents o Claude Code en la web, normalmente con el resultado entregado como rama o PR para revisar.","problem":"La supervisión continua limita el rendimiento: si una persona debe aprobar cada paso, no se puede delegar trabajo mientras se atiende otra cosa.","howItWorks":"Se lanza el agente con un objetivo claro en un entorno aislado. Trabaja, comprueba su resultado con tests y entrega algo revisable. La revisión se traslada del “cada paso” al “resultado final”.","whenToUse":"En tareas bien acotadas y con buena verificación automática. Evítalo si el daño posible es alto o si no hay forma automática de comprobar el resultado.","advantages":["Libera tiempo y permite paralelizar.","Se adapta a tareas programadas."],"limitations":["Los errores se detectan tarde.","Puede generar más código del que se puede revisar.","Requiere aislamiento y permisos cuidadosos."],"example":{"text":"Un agente programado cada noche revisa fallos de CI y abre un PR por cada corrección que supere los tests. Una persona los revisa por la mañana."},"relatedConcepts":[{"id":"permissions","note":"Cuanta más autonomía, más importa acotar."},{"id":"agent-evaluation","note":"Sin evaluación, no se sabe si se puede confiar en él."},{"id":"guardrails","note":"Hacen viable aumentar la autonomía."}],"prerequisites":["ai-agents","permissions"],"tools":["openai-codex","claude-code","cursor"],"sources":[{"title":"Claude Code: overview","url":"https://code.claude.com/docs/en/overview"},{"title":"OpenAI: Codex documentation","url":"https://learn.chatgpt.com/docs"},{"title":"Cursor: índice de documentación (llms.txt)","url":"https://cursor.com/llms.txt"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"planning-reasoning","title":"Planning and Reasoning","category":"ai-agents","difficulty":"intermediate","aliases":["planificación","razonamiento","plan mode","ReAct"],"description":"La capacidad de un agente para descomponer un objetivo en pasos y razonar antes de actuar, en lugar de ejecutar directamente.","technicalExplanation":"ReAct (2022) mostró que intercalar razonamiento y acción mejora la resolución de tareas e interpretabilidad. En herramientas de desarrollo, esto aparece como modos explícitos: Plan Mode en Cursor o Claude Code, y Plan/Act en Cline, donde en modo Plan el agente lee y discute pero no modifica archivos ni ejecuta comandos.","problem":"Un agente que actúa de inmediato puede resolver el problema equivocado. Separar plan y ejecución permite corregir el rumbo cuando es barato.","howItWorks":"El agente explora y propone un plan, una persona o el propio agente lo revisa, y se ejecuta paso a paso, ajustándolo a medida que aparecen resultados.","whenToUse":"En cambios multiarchivo o poco claros. Para una corrección de una línea, planificar es una sobrecarga.","advantages":["Detecta malentendidos pronto.","Reduce trabajo rehecho.","El plan puede servir como estado persistente."],"limitations":["Más tiempo y tokens al inicio.","Un plan puede quedarse obsoleto ante lo que se descubre."],"example":{"text":"En modo plan, el agente propone: “tocaré estos tres archivos; ¿migramos la tabla o usamos una columna nueva?”. Respondes antes de que se haya escrito una línea."},"relatedConcepts":[{"id":"spec-driven-development","note":"Lleva la planificación a un documento explícito."},{"id":"agent-lifecycle","note":"Fase previa a la ejecución."},{"id":"ai-development-workflows","note":"Planificar es un paso habitual del flujo."}],"prerequisites":["ai-agents"],"tools":["cline","cursor","claude-code"],"sources":[{"title":"ReAct: Synergizing Reasoning and Acting in Language Models","url":"https://arxiv.org/abs/2210.03629","note":"arXiv, octubre de 2022"},{"title":"Cline: Plan & Act","url":"https://docs.cline.bot/features/plan-and-act"},{"title":"Cursor: Documentation","url":"https://cursor.com/docs"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"tool-calling","title":"Tool Calling","category":"ai-agents","difficulty":"beginner","aliases":["function calling","llamada a funciones","tool use"],"description":"El mecanismo por el que un modelo solicita ejecutar una función: devuelve el nombre y los argumentos en formato estructurado, y es la aplicación quien la ejecuta.","technicalExplanation":"Es el punto clave que muchos pasan por alto: **el modelo no ejecuta nada**. Recibe definiciones de herramientas (nombre, descripción, esquema JSON), y en su respuesta puede incluir una petición estructurada. La aplicación valida, ejecuta y devuelve el resultado en un mensaje posterior, para que el modelo continúe. OpenAI lo llama *function calling* y Anthropic, *tool use*; el concepto es el mismo.","problem":"Sin un formato estructurado, habría que analizar texto libre para deducir qué quiere hacer el modelo, algo frágil. Con tool calling, la interacción entre modelo y código es explícita y validable.","howItWorks":"- La aplicación envía el mensaje con las herramientas disponibles.\n- El modelo responde con una petición de herramienta.\n- La aplicación la ejecuta y devuelve el resultado.\n- El modelo genera la respuesta final o pide otra herramienta.","whenToUse":"Siempre que un modelo deba obtener datos actuales o realizar acciones. Valida los argumentos: pueden ser incorrectos aunque cumplan el esquema.","advantages":["Salida estructurada y validable.","Separa decisión (modelo) y ejecución (tu código).","Permite aplicar permisos antes de actuar."],"limitations":["Cada definición consume tokens.","El modelo puede elegir mal la herramienta o inventar argumentos.","Los resultados de herramientas pueden traer inyecciones de prompt."],"example":{"language":"json","filename":"respuesta del modelo (simplificada)","code":"{\n  \"type\": \"tool_use\",\n  \"name\": \"get_weather\",\n  \"input\": { \"city\": \"Madrid\" }\n}","explanation":"Tu aplicación ejecuta `get_weather` y devuelve el resultado en el siguiente mensaje."},"relatedConcepts":[{"id":"tools-agent","note":"Lo que se invoca."},{"id":"mcp","note":"Estandariza cómo se ofrecen herramientas externas."},{"id":"ai-agents","note":"Un agente es, en esencia, tool calling en bucle."}],"prerequisites":[],"tools":["claude-agent-sdk"],"sources":[{"title":"Claude API: Tool use","url":"https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview"},{"title":"OpenAI API: Function calling","url":"https://platform.openai.com/docs/guides/function-calling"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"agent-communication","title":"Agent Communication","category":"ai-agents","difficulty":"advanced","aliases":["A2A","Agent2Agent","comunicación entre agentes"],"description":"Cómo intercambian información varios agentes: mediante resúmenes a un coordinador, estado compartido o protocolos como A2A.","technicalExplanation":"Hay varios mecanismos:\n\n- **Jerárquico:** el subagente devuelve un resultado al principal.\n- **Estado compartido:** archivos, ramas de Git, una lista de tareas.\n- **Protocolos abiertos:** A2A (Agent2Agent), desarrollado originalmente por Google y donado a la Linux Foundation, para que agentes de distintos marcos y proveedores se descubran y deleguen tareas entre sí.\n\nLa documentación de A2A los describe como complementarios: **MCP conecta un agente con herramientas y datos; A2A conecta agentes entre sí**.","problem":"Los agentes con contextos separados no comparten lo que saben. Sin un canal claro, repiten trabajo o toman decisiones incompatibles. Entre organizaciones, tampoco hay interoperabilidad sin un estándar.","howItWorks":"En un mismo repositorio, lo más simple suele ser que los agentes se comuniquen con artefactos: un archivo de plan, commits, o el resultado que recibe el coordinador. Entre sistemas independientes, un protocolo define descubrimiento y delegación.","whenToUse":"Prefiere el canal más simple que resuelva el caso. Un protocolo como A2A se justifica cuando los agentes son sistemas opacos e independientes, no subrutinas de tu propio agente.","advantages":["Los artefactos de archivo son auditables.","Los protocolos abiertos permiten interoperar."],"limitations":["Cada mensaje consume contexto.","Un malentendido se propaga.","Un mensaje de otro agente también puede traer contenido malicioso."],"example":{"text":"Un agente implementador deja `PLAN.md` actualizado con lo hecho y lo pendiente. El revisor, en otra sesión, lo lee junto con el diff, sin compartir conversación."},"relatedConcepts":[{"id":"mcp","note":"Protocolo complementario: agente a herramienta."},{"id":"multi-agent-systems","note":"Donde surge esta necesidad."},{"id":"subagents","note":"Comunicación jerárquica."}],"prerequisites":["multi-agent-systems"],"tools":[],"sources":[{"title":"A2A Protocol","url":"https://a2a-protocol.org/latest/"},{"title":"MCP Specification 2026-07-28: Architecture","url":"https://modelcontextprotocol.io/specification/2026-07-28/architecture"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"agents-md","title":"AGENTS.md","category":"agent-components","difficulty":"beginner","aliases":["agents file","instrucciones de agente"],"description":"Un archivo Markdown en el repositorio con las instrucciones que un agente de código necesita para trabajar en él: comandos, convenciones y reglas de contribución. Se suele describir como “un README para agentes”.","technicalExplanation":"AGENTS.md es un formato abierto y deliberadamente simple: Markdown estándar, sin campos obligatorios ni esquema. El agente lo lee como contexto al trabajar en el proyecto. Su valor no está en la sintaxis, sino en la convención: un único nombre de archivo que muchas herramientas buscan, en vez de un archivo propietario por producto.\n\nEl sitio oficial lista entre las herramientas compatibles a OpenAI Codex, Google Jules, Aider, goose, opencode, Zed, Warp, VS Code, Devin, JetBrains Junie, Cursor, RooCode, Gemini CLI, Windsurf y el coding agent de GitHub Copilot. El formato lo custodia la Agentic AI Foundation, bajo la Linux Foundation, a la que OpenAI aportó el proyecto en diciembre de 2025.\n\nConviene recordar que estas instrucciones son **contexto, no configuración que se haga cumplir**. El modelo tiende a seguirlas, pero nada lo garantiza. Para obligar de verdad se necesitan [[hooks]], [[permissions|permisos]] o comprobaciones en CI.","problem":"Un agente que entra en un repositorio desconocido no sabe cómo se instala, cómo se ejecutan los tests ni qué convenciones hay. Sin un lugar acordado, hay que repetirlo en cada sesión, o bien mezclarlo en un README pensado para personas. Y si cada herramienta exige su propio archivo, el equipo acaba manteniendo varias copias que se desincronizan.","howItWorks":"- Colocas un `AGENTS.md` en la raíz del repositorio con instrucciones breves y verificables.\n- En un monorepo puedes añadir otro por subproyecto. Según el sitio oficial, el agente lee el más cercano en el árbol de directorios y ese tiene prioridad.\n- Las instrucciones explícitas del usuario en el chat prevalecen sobre las del archivo.\n- Cada herramienta lo carga de forma un poco distinta: compruébalo en las pestañas de abajo.","whenToUse":"En casi cualquier repositorio donde se usen agentes, y sobre todo si el equipo usa más de una herramienta. Incluye lo que el agente no puede deducir leyendo el código: comandos exactos, restricciones, decisiones no evidentes. Mueve los procedimientos largos a [[skills]] para no cargar contexto en cada sesión.","advantages":["Funciona con muchas herramientas sin duplicar instrucciones.","No requiere dependencias ni esquema: es Markdown versionado con el código.","Evita repetir las mismas correcciones en cada sesión.","Admite instrucciones por subproyecto en monorepos."],"limitations":["No se hace cumplir: el agente puede ignorar o malinterpretar una instrucción.","Todo su contenido consume contexto, así que un archivo largo perjudica en vez de ayudar.","Se queda obsoleto si no se revisa cuando cambian los comandos o la arquitectura.","El grado de soporte (anidado, importaciones) varía según la herramienta."],"example":{"text":"Un AGENTS.md útil es corto y concreto. Cada línea debería evitar un error real.","language":"markdown","filename":"AGENTS.md","code":"# Instrucciones para agentes\n\n## Comandos\n- Instalar: `pnpm install`\n- Tests: `pnpm test` (ejecútalos antes de cada commit)\n- Lint: `pnpm lint --fix`\n\n## Convenciones\n- TypeScript estricto; no uses `any`.\n- La lógica de negocio va en `src/domain`, sin importar nada de `src/http`.\n\n## Pull requests\n- Título con el formato `[area] descripción`.\n- No modifiques `migrations/` sin indicarlo en la descripción.","explanation":"Fíjate en lo que no aparece: ni descripción del producto ni reglas que el linter ya impone. Lo que una herramienta puede comprobar no necesita gastar contexto."},"relatedConcepts":[{"id":"claude-md","note":"Cumple la misma función en Claude Code; se pueden combinar importando uno desde otro."},{"id":"skills","note":"AGENTS.md se carga siempre; una skill solo cuando hace falta. Los procedimientos largos encajan mejor en skills."},{"id":"rules","note":"Las rules permiten instrucciones segmentadas por ruta o tipo de archivo; AGENTS.md segmenta por directorio."},{"id":"hooks","note":"Complemento necesario: lo que no pueda quedar a criterio del modelo debe imponerse con un hook."},{"id":"context-engineering","note":"Es una de las piezas básicas de la información que recibe un agente."}],"prerequisites":["ai-agents"],"tools":["claude-code","openai-codex","cursor","gemini-cli","aider","github-copilot"],"sources":[{"title":"AGENTS.md","url":"https://agents.md/","note":"Sitio oficial del formato"},{"title":"Claude Code: How Claude remembers your project","url":"https://code.claude.com/docs/en/memory"},{"title":"Linux Foundation: formation of the Agentic AI Foundation","url":"https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation","note":"9 de diciembre de 2025"},{"title":"Codex: AGENTS.md","url":"https://learn.chatgpt.com/docs/agent-configuration/agents-md"},{"title":"Cursor: Rules","url":"https://cursor.com/docs/rules"},{"title":"GitHub Docs: Repository custom instructions","url":"https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions"},{"title":"Aider: Specifying coding conventions","url":"https://aider.chat/docs/usage/conventions.html"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05","perTool":[{"tool":"Codex","path":"AGENTS.md, AGENTS.override.md","text":"Encadena archivos desde la raíz del proyecto hasta el directorio actual, y los más cercanos tienen prioridad. También lee `~/.codex`. Deja de cargar al llegar a `project_doc_max_bytes`, 32 KiB por defecto."},{"tool":"Cursor","path":"AGENTS.md","text":"Admite el archivo en la raíz y en subdirectorios, como alternativa simple a `.cursor/rules`."},{"tool":"GitHub Copilot","path":"AGENTS.md, .github/copilot-instructions.md","text":"Los agentes usan el `AGENTS.md` más cercano. Tiene además su propio archivo de instrucciones, y también admite un único `CLAUDE.md` o `GEMINI.md` en la raíz."},{"tool":"Gemini CLI","path":"GEMINI.md","text":"Usa `GEMINI.md` como archivo de contexto, organizado en jerarquía. El sitio de AGENTS.md lo cita como compatible."},{"tool":"Claude Code","path":"CLAUDE.md, AGENTS.md","text":"Lee `AGENTS.md` si no hay `CLAUDE.md`. Si existen ambos, solo lee `CLAUDE.md`, salvo que este lo importe."},{"tool":"Aider","path":"CONVENTIONS.md","text":"Se carga con `aider --read CONVENTIONS.md` o con `read:` en `.aider.conf.yml`. El sitio de AGENTS.md también lo cita como compatible."}]},{"id":"claude-md","title":"CLAUDE.md","category":"agent-components","difficulty":"beginner","aliases":["memoria de proyecto claude"],"description":"El archivo de instrucciones persistentes de Claude Code: se lee al inicio de cada sesión y recoge comandos, convenciones y decisiones de arquitectura.","technicalExplanation":"Claude Code empieza cada sesión con una ventana de contexto vacía. `CLAUDE.md` es lo que escribes tú para que no tenga que redescubrir el proyecto. Puede estar en `./CLAUDE.md` o `./.claude/CLAUDE.md` (compartido por el equipo), y `./CLAUDE.local.md` guarda preferencias personales que no se versionan. También hay niveles de usuario y de organización.\n\nLos archivos de los directorios superiores se cargan al arrancar; los de subdirectorios, bajo demanda al trabajar allí. La documentación es explícita: se tratan como contexto, no como configuración impuesta. Para bloquear una acción en cualquier caso hay que usar un hook `PreToolUse`.","problem":"Evita repetir en cada sesión las mismas aclaraciones: cómo compilar, qué estilo seguir, qué no tocar. La documentación propone añadir algo cuando el agente comete un mismo error por segunda vez o cuando una revisión detecta algo que debería haber sabido.","howItWorks":"Se escribe a mano y se versiona. Puede importar otros archivos con la sintaxis `@ruta`, lo que permite compartir un `AGENTS.md` existente. Para comprobar qué se ha cargado, la documentación recomienda `/context`. Lo que solo afecta a una parte del código encaja mejor en una regla de `.claude/rules/`, y los procedimientos de varios pasos en una skill.","whenToUse":"Siempre que uses Claude Code en un proyecto mantenido. Si el repositorio ya tiene `AGENTS.md`, no hace falta duplicarlo: Claude Code lo lee si no hay `CLAUDE.md`, o puedes importarlo desde uno.","advantages":["Se aplica a todas las superficies de Claude Code: terminal, IDE, escritorio y web.","Jerarquía de niveles: organización, usuario, proyecto y local.","Se revisa como cualquier cambio de código."],"limitations":["Específico de Claude Code; para varias herramientas conviene AGENTS.md.","No garantiza el cumplimiento.","Cuanto más largo, más contexto consume y peor se sigue."],"example":{"language":"markdown","filename":"CLAUDE.md","code":"@AGENTS.md\n\n## Solo para Claude Code\n- Usa plan mode antes de cambios que afecten a más de tres archivos.","explanation":"La primera línea importa el archivo compartido, de modo que el equipo mantiene una sola fuente de instrucciones."},"relatedConcepts":[{"id":"agents-md","note":"Equivalente abierto y multiherramienta."},{"id":"persistent-memory","note":"CLAUDE.md lo escribes tú; la auto memory la escribe el agente."},{"id":"rules","note":"Permite dividir instrucciones por tipo de archivo en `.claude/rules/`."},{"id":"hooks","note":"Lo que deba cumplirse siempre no va aquí, sino en un hook."}],"prerequisites":["agents-md"],"tools":["claude-code"],"sources":[{"title":"Claude Code: How Claude remembers your project","url":"https://code.claude.com/docs/en/memory"},{"title":"Claude Code: overview","url":"https://code.claude.com/docs/en/overview"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05","editorialNote":"Este artículo trata un archivo específico de Claude Code. Para la opción compatible con varias herramientas, consulta [[agents-md]]."},{"id":"rules","title":"Rules","category":"agent-components","difficulty":"beginner","aliases":["reglas",".cursor/rules",".claude/rules"],"description":"Instrucciones persistentes y acotadas: se aplican solo a ciertas rutas, tipos de archivo o situaciones en lugar de cargarse siempre.","technicalExplanation":"“Rules” no es un estándar, sino un nombre común para un mecanismo que cada herramienta implementa a su manera. La idea compartida es la granularidad: la regla de migraciones solo ocupa contexto cuando se tocan migraciones.","problem":"Un archivo global de instrucciones crece hasta ser ruidoso. Las reglas acotadas mantienen la instrucción cerca de donde aplica sin penalizar el resto de las tareas.","howItWorks":"Se definen archivos con el texto de la regla y, según la herramienta, metadatos que indican cuándo aplica. El agente las recibe como contexto cuando se cumple la condición. Como el resto de instrucciones, orientan al modelo pero no lo obligan.","whenToUse":"Cuando una convención solo afecta a una parte del repositorio, como tests, migraciones o un paquete concreto. Si afecta a todo el proyecto, va en el archivo principal; si es un procedimiento, en una skill.","advantages":["Reducen el contexto cargado en cada tarea.","Colocan las convenciones junto al área que afectan."],"limitations":["El formato no es portable entre herramientas.","Con muchas reglas es difícil saber cuáles están activas.","No sustituyen a una comprobación automática."],"example":{"text":"Una regla “los tests de integración usan la base de datos real, no mocks”, limitada a `tests/integration/**`, solo se carga al trabajar en esa carpeta."},"relatedConcepts":[{"id":"agents-md","note":"Instrucciones globales o por directorio; las rules afinan más."},{"id":"skills","note":"Una regla dice cómo comportarse; una skill enseña a hacer una tarea."},{"id":"guardrails","note":"Una regla es una petición; un guardrail se comprueba."}],"prerequisites":["agents-md"],"tools":["claude-code","cursor","windsurf"],"sources":[{"title":"Claude Code: How Claude remembers your project","url":"https://code.claude.com/docs/en/memory"},{"title":"Cursor: índice de documentación (llms.txt)","url":"https://cursor.com/llms.txt"},{"title":"Cursor: Rules","url":"https://cursor.com/docs/rules"},{"title":"GitHub Docs: Repository custom instructions","url":"https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05","perTool":[{"tool":"Cursor","path":".cursor/rules/*.mdc","text":"Deben usar la extensión `.mdc`; los `.md` de esa carpeta se ignoran. Se controlan con `description`, `globs` y `alwaysApply`.","language":"markdown","code":"---\ndescription: Convenciones de los tests de integración\nglobs: tests/integration/**\nalwaysApply: false\n---\n\nUsa la base de datos real del contenedor, no mocks."},{"tool":"GitHub Copilot","path":".github/instructions/*.instructions.md","text":"El nombre debe terminar en `.instructions.md`. `applyTo` indica los archivos, y `excludeAgent` puede limitarlas a revisión de código o a agente en la nube.","language":"markdown","code":"---\napplyTo: \"tests/integration/**\"\n---\n\nUsa la base de datos real del contenedor, no mocks."},{"tool":"Claude Code","path":".claude/rules/","text":"Archivos que pueden limitarse a tipos de archivo o subdirectorios."}]},{"id":"skills","title":"Skills","category":"agent-components","difficulty":"intermediate","aliases":["agent skills","SKILL.md","habilidades"],"description":"Paquetes de instrucciones, y opcionalmente scripts y referencias, que un agente carga solo cuando la tarea los necesita. Convierten un procedimiento repetible en algo reutilizable.","technicalExplanation":"Una skill es un directorio con un archivo `SKILL.md`: frontmatter YAML seguido de instrucciones en Markdown, y opcionalmente carpetas `scripts/`, `references/` y `assets/`. Existe una especificación abierta, **Agent Skills**, que solo exige dos campos: `name`, que debe coincidir con el nombre de la carpeta, y `description`.\n\nEl detalle importante es la **divulgación progresiva**, que la especificación describe en tres niveles:\n\n- **Metadatos:** al inicio solo se cargan el nombre y la descripción de cada skill, unos 100 tokens.\n- **Instrucciones:** al activarse se carga el `SKILL.md`. Se recomienda que tenga menos de 5.000 tokens y 500 líneas.\n- **Recursos:** los archivos de apoyo solo se cargan cuando hacen falta.\n\nPor eso la `description` es el campo decisivo: de ella depende que el agente active la skill en el momento adecuado. La carpeta `.agents/skills/` la leen Codex, Cursor, Gemini CLI y GitHub Copilot, así que una misma skill puede servir en varias herramientas.","problem":"Los procedimientos largos, como desplegar, revisar un PR o migrar una API, no caben en un archivo de instrucciones que se carga siempre: gastarían contexto en cada sesión aunque no se usaran. Tampoco es razonable pegarlos a mano cada vez. Las skills los hacen disponibles sin coste hasta que se necesitan.","howItWorks":"- **Crea la carpeta:** `.agents/skills/revisar-migracion/`.\n- **Escribe `SKILL.md`:** con `name`, `description` e instrucciones.\n- **Añade recursos si hace falta:** scripts para los pasos que deban ser deterministas, y referencias para el material largo.\n- **Pruébala:** comprueba que se active con una petición natural, no solo al invocarla por su nombre.\n\nCampos como `allowed-tools` son experimentales, y otros, como `disable-model-invocation` o `paths`, los añade cada producto. Consulta las pestañas de abajo.","whenToUse":"Cuando repites un procedimiento de varios pasos, cuando hay material de referencia que solo importa a veces o cuando quieres que todo el equipo ejecute una tarea igual. Si solo es un hecho que debe saberse siempre, va en [[agents-md]]. Si la tarea genera mucha salida que no quieres en la conversación principal, valora un [[subagents|subagente]].","advantages":["Coste de contexto casi nulo hasta que se usan.","Se versionan y comparten con el repositorio.","Pueden incluir scripts deterministas para los pasos que no deben quedar al criterio del modelo.","Se pueden invocar a mano, automáticamente o ambas cosas."],"limitations":["La activación automática depende de una buena descripción y puede fallar.","Una vez cargada, sigue ocupando contexto en los turnos siguientes.","El contenido de una skill de terceros es texto y código con poder sobre tu agente: revísalo como cualquier dependencia.","Solo los campos de la especificación son portables; los extras varían según la herramienta."],"example":{"text":"Una skill mínima y portable, según la especificación abierta:","language":"markdown","filename":".agents/skills/resumir-cambios/SKILL.md","code":"---\nname: resumir-cambios\ndescription: Resume los cambios sin commitear y señala riesgos. Úsala cuando pidan qué ha cambiado, un mensaje de commit o revisar el diff.\n---\n\n1. Ejecuta `git diff HEAD`.\n2. Resume los cambios en dos o tres puntos.\n3. Señala riesgos: errores sin gestionar, valores fijos o tests por actualizar.\n4. Si no hay cambios, dilo."},"relatedConcepts":[{"id":"agents-md","note":"Lo que se necesita siempre va ahí; lo que se necesita a veces, en una skill."},{"id":"subagents","note":"Una skill añade instrucciones al contexto actual; un subagente trabaja en un contexto aparte. Se combinan con `context: fork`."},{"id":"context-engineering","note":"La divulgación progresiva es una técnica de context engineering."},{"id":"hooks","note":"Una skill puede registrar hooks mientras está activa."},{"id":"workflows","note":"Muchos workflows repetibles se empaquetan como skills."}],"prerequisites":["agents-md","context-management"],"tools":["claude-code","gemini-cli","cursor","openai-codex"],"sources":[{"title":"Claude Code: Skills","url":"https://code.claude.com/docs/en/skills"},{"title":"Gemini CLI: Documentation","url":"https://geminicli.com/docs/"},{"title":"Cursor: índice de documentación (llms.txt)","url":"https://cursor.com/llms.txt"},{"title":"OpenAI: Codex documentation","url":"https://learn.chatgpt.com/docs"},{"title":"Agent Skills: Specification","url":"https://agentskills.io/specification","note":"Especificación abierta"},{"title":"Cursor: Skills","url":"https://cursor.com/docs/skills"},{"title":"GitHub Docs: About agent skills","url":"https://docs.github.com/en/copilot/concepts/agents/about-agent-skills"},{"title":"Gemini CLI: Skills","url":"https://geminicli.com/docs/cli/skills/"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05","perTool":[{"tool":"Codex","path":".agents/skills/","text":"Skills de repositorio en `.agents/skills` y de usuario en `~/.agents/skills`. Exige `name` y `description`. Carga primero los metadatos."},{"tool":"Cursor","path":".agents/skills/, .cursor/skills/","text":"También carga `.claude/skills/` y `.codex/skills/`. Añade `paths` y `disable-model-invocation`. Se invoca con `/` o automáticamente."},{"tool":"GitHub Copilot","path":".github/skills/, .agents/skills/","text":"También admite `.claude/skills`. Disponible en CLI, agente en la nube, revisión de código y modo agente de los IDE, según versión."},{"tool":"Gemini CLI","path":".gemini/skills/, .agents/skills/","text":"El modelo llama a `activate_skill` y tú apruebas el acceso. Dentro de un mismo nivel, `.agents/` tiene prioridad sobre `.gemini/`."},{"tool":"Claude Code","path":".claude/skills/","text":"Añade campos propios, como `context: fork`, `disable-model-invocation` y la inyección de comandos con `!`."}]},{"id":"subagents","title":"Subagents","category":"agent-components","difficulty":"intermediate","aliases":["subagentes","sub-agents","agentes especializados"],"description":"Agentes auxiliares a los que un agente principal delega una tarea. Trabajan en su propio contexto, con sus propias herramientas, y devuelven solo un resultado resumido.","technicalExplanation":"Un subagente es una instancia separada con ventana de contexto propia, instrucciones propias y, según la herramienta, un conjunto de herramientas restringido. Su razón de ser principal es el **aislamiento de contexto**: explorar 200 archivos puede consumir miles de tokens, pero al agente principal solo le llega la conclusión. Anthropic describe estas arquitecturas como subagentes que trabajan en ventanas limpias y devuelven un resumen condensado, a menudo de 1.000 a 2.000 tokens.\n\nLa idea es común, pero el formato no es portable: casi todas las herramientas usan Markdown con frontmatter, Codex usa TOML, y lo que se puede restringir varía. En Codex, por ejemplo, un agente personalizado hereda los permisos del agente padre, mientras que Cursor ofrece `readonly`.","problem":"Una sola conversación larga se llena de resultados intermedios y pierde calidad. Además, no todas las subtareas requieren los mismos permisos o el mismo modelo: un revisor no necesita poder escribir, y una búsqueda puede hacerla un modelo más barato.","howItWorks":"- El agente principal decide delegar, leyendo la `description` de cada subagente, o lo pides tú explícitamente.\n- El subagente recibe un encargo y arranca sin el historial de la conversación principal.\n- Ejecuta su propio bucle de herramientas y devuelve un mensaje final.\n- Los resultados intermedios no entran en el contexto del agente principal.\n\nEl agente principal solo ve lo que le devuelven, de modo que un encargo vago o un resumen pobre son fallos habituales. Delegar no garantiza que el trabajo sea correcto: conviene comprobar el resultado.","whenToUse":"Para tareas que generan mucha salida (exploración, ejecución de tests, análisis de logs), para restringir permisos (un revisor de solo lectura) y para trabajo paralelo independiente. No compensan en tareas pequeñas: cada subagente arranca sin contexto y debe redescubrir lo que necesita.","advantages":["Mantienen limpio el contexto del agente principal.","Permiten aplicar mínimo privilegio por tarea.","Pueden usar un modelo distinto según el coste de la tarea.","Pueden ejecutarse en paralelo, con worktrees si escriben archivos."],"limitations":["Arrancan sin contexto y hay que darles un encargo completo.","Más agentes implica más consumo total de tokens.","Si varios escriben en los mismos archivos sin aislamiento, entran en conflicto.","El resumen puede ocultar errores o supuestos del subagente."],"example":{"text":"Un revisor de solo lectura. Compara en las pestañas de abajo cómo se expresa en cada herramienta, y consulta el Playground para ver el ejemplo completo."},"relatedConcepts":[{"id":"ai-agents","note":"Un subagente es un agente; lo que lo define es su posición subordinada."},{"id":"skills","note":"Se complementan: una skill aporta conocimiento y un subagente aporta aislamiento."},{"id":"orchestrators","note":"El agente principal actúa como orquestador de sus subagentes."},{"id":"multi-agent-systems","note":"Es la forma jerárquica más común de sistema multiagente."},{"id":"git-worktrees","note":"Permiten que varios subagentes escriban sin pisarse."},{"id":"context-engineering","note":"Aislar subtareas es una técnica central para gestionar el contexto."}],"prerequisites":["ai-agents","context-management"],"tools":["claude-code","gemini-cli","openai-codex","cursor"],"sources":[{"title":"Claude Code: Subagents","url":"https://code.claude.com/docs/en/sub-agents"},{"title":"Anthropic: Effective context engineering for AI agents","url":"https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents","note":"29 de septiembre de 2025"},{"title":"Gemini CLI: Documentation","url":"https://geminicli.com/docs/"},{"title":"OpenAI: Codex documentation","url":"https://learn.chatgpt.com/docs"},{"title":"Cursor: índice de documentación (llms.txt)","url":"https://cursor.com/llms.txt"},{"title":"Cursor: Subagents","url":"https://cursor.com/docs/subagents"},{"title":"Codex: Subagents","url":"https://learn.chatgpt.com/docs/agent-configuration/subagents"},{"title":"Gemini CLI: Subagents","url":"https://geminicli.com/docs/core/subagents/"},{"title":"GitHub Docs: Custom agents configuration","url":"https://docs.github.com/en/copilot/reference/custom-agents-configuration"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05","perTool":[{"tool":"Cursor","path":".cursor/agents/*.md","text":"`readonly: true` bloquea la edición de archivos. También admite `is_background`.","language":"markdown","code":"---\nname: reviewer\ndescription: Revisa los cambios en busca de errores.\nmodel: inherit\nreadonly: true\n---\n\nInforma solo de errores con un escenario concreto de fallo."},{"tool":"Codex","path":".codex/agents/*.toml","text":"Exige `name`, `description` y `developer_instructions`. Hereda los permisos, el proveedor y los servidores MCP del agente padre.","language":"toml","code":"name = \"reviewer\"\ndescription = \"Revisa los cambios en busca de errores.\"\ndeveloper_instructions = \"\"\"\nNo modifiques código.\nInforma solo de errores con un escenario concreto de fallo.\n\"\"\""},{"tool":"Gemini CLI","path":".gemini/agents/*.md","text":"Exige `name` y `description`, y admite `tools`, `mcpServers`, `model` y `max_turns`.","language":"markdown","code":"---\nname: reviewer\ndescription: Revisa los cambios en busca de errores.\n---\n\nInforma solo de errores con un escenario concreto de fallo."},{"tool":"GitHub Copilot","path":"*.agent.md","text":"Los llama “custom agents”. `description` es obligatorio, y `tools` limita lo que pueden usar. Consulta en su documentación dónde colocarlos en tu entorno.","language":"markdown","code":"---\nname: reviewer\ndescription: Revisa los cambios en busca de errores.\ntools: [\"read\"]\n---\n\nInforma solo de errores con un escenario concreto de fallo."},{"tool":"Claude Code","path":".claude/agents/*.md","text":"`tools` es una lista permitida que aplica la herramienta. Admite `memory` e `isolation: worktree`.","language":"markdown","code":"---\nname: reviewer\ndescription: Revisa los cambios en busca de errores.\ntools: Read, Grep, Glob\n---\n\nInforma solo de errores con un escenario concreto de fallo."}]},{"id":"persistent-memory","title":"Persistent Memory","category":"agent-components","difficulty":"intermediate","aliases":["memoria persistente","auto memory","MEMORY.md","memoria de agente"],"description":"La información que un agente conserva entre sesiones y fuera de su ventana de contexto: preferencias, decisiones y aprendizajes que de otro modo se perderían.","technicalExplanation":"Un modelo no recuerda nada entre llamadas: lo que parece memoria es información que se vuelve a inyectar en el contexto. La memoria persistente es, por tanto, un **almacén externo más una política de qué se guarda y cuándo se recupera**.\n\nConviene distinguir tres cosas que suelen mezclarse:\n\n- **Instrucciones** ([[agents-md]], [[claude-md]]): las escribe una persona y describen cómo trabajar.\n- **Memoria escrita por el agente:** notas que el agente crea a partir de correcciones y hallazgos.\n- **Recuperación de conocimiento (RAG):** búsqueda en un corpus externo; no cambia con la experiencia del agente salvo que se reindexe.\n\nLos productos la implementan de distintas formas. Claude Code ofrece *auto memory*, con notas por repositorio de las que se cargan al inicio las primeras 200 líneas o 25 KB, y Devin Desktop documenta memorias que el agente puede consultar. Comprueba siempre qué guarda tu herramienta y dónde. Anthropic describe además la técnica general de “structured note-taking”: el agente escribe notas fuera de la ventana de contexto y las lee más tarde.","problem":"Cada sesión empieza de cero, así que el agente repite errores y hay que volver a darle las mismas explicaciones. En tareas largas, además, el trabajo supera la ventana de contexto y hay que conservar el estado para poder continuar.","howItWorks":"- **Escritura:** el agente, o una persona, guarda un hecho en un almacén, a menudo archivos Markdown.\n- **Indexado:** un archivo índice breve apunta a notas más detalladas.\n- **Recuperación:** el índice se carga al inicio y el detalle se lee bajo demanda.\n- **Mantenimiento:** hay que corregir o borrar lo que quedó obsoleto, porque una nota incorrecta se seguirá reinyectando.\n\nUsar archivos tiene una ventaja práctica: se pueden leer, editar y borrar, lo que facilita auditar qué “sabe” el agente.","whenToUse":"Cuando trabajas repetidamente en el mismo proyecto y hay aprendizajes que no están en el código ni merecen estar en las instrucciones. No guardes lo que puede deducirse del repositorio ni datos sensibles. Lo que deba cumplirse siempre debe ir en una instrucción o en un hook, no en una nota.","advantages":["Reduce correcciones repetidas entre sesiones.","Permite continuar tareas largas tras agotar la ventana de contexto.","Si se basa en archivos, es auditable y editable."],"limitations":["Las notas envejecen: una memoria falsa es peor que ninguna.","Consume contexto en cada sesión.","Puede almacenar datos sensibles si no se controla.","Un contenido malicioso guardado como memoria sigue influyendo en sesiones futuras."],"example":{"text":"Un archivo de notas, válido con cualquier agente. Basta con pedirle que lo lea al empezar y lo actualice al terminar.","language":"markdown","filename":"docs/agent-notes.md","code":"# Notas para agentes\n\n- Los tests de integración necesitan Docker en marcha.\n- La tabla `orders` tiene una columna heredada: no la uses en código nuevo.\n- Decidido: sin ORM en el módulo de informes, por rendimiento (ver docs/decisions/007.md)."},"relatedConcepts":[{"id":"claude-md","note":"Instrucciones escritas por personas frente a notas escritas por el agente."},{"id":"context-management","note":"La memoria reintroduce información en el contexto y compite por su espacio."},{"id":"context-compaction","note":"La compactación resume la sesión actual; la memoria sobrevive entre sesiones."},{"id":"subagents","note":"Pueden tener su propia memoria."},{"id":"guardrails","note":"Lo que se escribe en memoria debería validarse como cualquier otra entrada."}],"prerequisites":["context-management","claude-md"],"tools":["claude-code","windsurf"],"sources":[{"title":"Claude Code: How Claude remembers your project","url":"https://code.claude.com/docs/en/memory"},{"title":"Claude Code: Subagents","url":"https://code.claude.com/docs/en/sub-agents"},{"title":"Anthropic: Effective context engineering for AI agents","url":"https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents","note":"29 de septiembre de 2025"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"context-management","title":"Context Management","category":"agent-components","difficulty":"intermediate","aliases":["gestión de contexto","ventana de contexto","context window"],"description":"Las prácticas y mecanismos para decidir qué ocupa la ventana de contexto de un agente en cada momento, un recurso limitado que se degrada al llenarse.","technicalExplanation":"La ventana de contexto contiene todo lo que el modelo ve en una llamada: instrucciones, historial, resultados de herramientas y archivos leídos. Es finita, y Anthropic la describe como un recurso con rendimientos decrecientes: más tokens no significan mejor resultado si desplazan la atención de lo relevante.\n\nLa gestión de contexto es la parte operativa de [[context-engineering]]. Sus palancas son cargar menos al inicio, recuperar información justo cuando hace falta, resumir lo antiguo y delegar lo voluminoso.","problem":"Sin gestión, un agente lee archivos enteros, acumula salidas largas de comandos y llega al límite. Antes de eso, las instrucciones iniciales pierden peso frente a tanto material intermedio.","howItWorks":"- **Just-in-time:** el agente guarda referencias ligeras, como rutas o consultas, y carga el contenido con herramientas cuando lo necesita.\n- **Compactación:** resume la conversación cerca del límite.\n- **Limpieza:** elimina resultados antiguos de herramientas.\n- **Delegación:** los subagentes procesan lo voluminoso y devuelven un resumen.\n- **Notas externas:** el estado se guarda fuera de la ventana.","whenToUse":"Siempre, pero importa sobre todo en sesiones largas, repositorios grandes y agentes con muchas herramientas: las definiciones de herramientas también ocupan contexto.","advantages":["Mejora la calidad en tareas largas.","Reduce coste y latencia.","Hace viables tareas que superan una sola ventana."],"limitations":["Resumir pierde información.","Recuperar bajo demanda requiere más llamadas.","Exige criterio: cargar de menos también produce errores."],"example":{"text":"En vez de pedir “lee el proyecto y arregla el bug”, un subagente localiza los archivos implicados y devuelve tres rutas con una explicación. El agente principal solo lee esas tres."},"relatedConcepts":[{"id":"context-engineering","note":"Disciplina general de la que esta es la parte operativa."},{"id":"context-compaction","note":"Una de sus técnicas."},{"id":"subagents","note":"Aíslan la salida voluminosa."},{"id":"persistent-memory","note":"Guarda estado fuera de la ventana."},{"id":"mcp","note":"Cada servidor añade definiciones de herramientas que también ocupan contexto."}],"prerequisites":["ai-agents"],"tools":["claude-code"],"sources":[{"title":"Anthropic: Effective context engineering for AI agents","url":"https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents","note":"29 de septiembre de 2025"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"context-compaction","title":"Context Compaction","category":"agent-components","difficulty":"intermediate","aliases":["compactación","compaction","/compact"],"description":"Resumir una conversación cuando se acerca al límite de contexto, para seguir trabajando en una ventana nueva con ese resumen.","technicalExplanation":"Cuando la conversación se acerca al límite de la ventana, el agente sintetiza lo importante y continúa con ese resumen. Anthropic señala que la dificultad está en elegir qué conservar: suele priorizar decisiones de arquitectura, problemas abiertos y detalles de implementación, y descartar salidas de herramientas ya procesadas. Borrar resultados antiguos de herramientas es una forma ligera de compactación.\n\nVarias herramientas permiten reaccionar con un hook antes de compactar: `PreCompact` en Codex y Claude Code, `preCompact` en Cursor y `PreCompress` en Gemini CLI.","problem":"Las tareas largas superan una ventana de contexto. Sin compactación, el agente se detiene o pierde el hilo.","howItWorks":"Se dispara automáticamente cerca del límite o a mano, según la herramienta. El historial se sustituye por un resumen y la sesión sigue. Lo que no entra en el resumen se pierde, salvo que esté en archivos o en memoria persistente.","whenToUse":"En sesiones largas. Para tareas nuevas y no relacionadas suele ser mejor empezar una sesión limpia que compactar.","advantages":["Permite continuar sin reiniciar.","Elimina ruido acumulado."],"limitations":["Es una pérdida irreversible dentro de la sesión: pueden desaparecer matices importantes.","Instrucciones dadas solo en el chat pueden no sobrevivir; lo importante debe estar en archivos."],"example":{"text":"Antes de una compactación, pide al agente que guarde el plan y las decisiones en un archivo del repositorio. Así, lo crítico no depende de la calidad del resumen."},"relatedConcepts":[{"id":"context-management","note":"Es una de sus técnicas."},{"id":"persistent-memory","note":"La memoria sobrevive entre sesiones; el resumen, solo dentro de la sesión."},{"id":"hooks","note":"Varias herramientas permiten reaccionar antes de compactar."}],"prerequisites":["context-management"],"tools":["claude-code"],"sources":[{"title":"Anthropic: Effective context engineering for AI agents","url":"https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents","note":"29 de septiembre de 2025"},{"title":"Claude Code: Hooks reference","url":"https://code.claude.com/docs/en/hooks"},{"title":"Claude Code: Skills","url":"https://code.claude.com/docs/en/skills"},{"title":"Codex: Hooks","url":"https://learn.chatgpt.com/docs/hooks"},{"title":"Cursor: Hooks","url":"https://cursor.com/docs/hooks"},{"title":"Gemini CLI: Hooks","url":"https://geminicli.com/docs/hooks/"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"hooks","title":"Hooks","category":"agent-components","difficulty":"intermediate","aliases":["ganchos","PreToolUse","PostToolUse","lifecycle hooks"],"description":"Comandos que se ejecutan automáticamente en puntos concretos del ciclo de vida de un agente. A diferencia de una instrucción, un hook siempre se ejecuta: no depende de que el modelo decida hacerlo.","technicalExplanation":"Los hooks llevan al agente una idea conocida de los *git hooks*: código determinista enganchado a eventos. Es la diferencia entre **pedir** y **garantizar**: “ejecuta el formateador después de editar” en un archivo de instrucciones es una petición; como hook, sucede siempre.\n\nCodex, Cursor, Gemini CLI y Claude Code los ofrecen con una estructura parecida: un evento, un filtro opcional y un comando que recibe JSON por stdin. En los cuatro, **salir con el código 2 bloquea** la acción. Pero cuidado: en Claude Code, otros códigos de error, **incluido el 1**, no bloquean y la acción continúa, un detalle que da una falsa sensación de seguridad.\n\nLos nombres de los eventos y los campos cambian entre herramientas, por lo que un hook no es portable sin adaptarlo.","problem":"Las instrucciones son probabilísticas: en una sesión larga, el agente puede olvidar formatear, ejecutar los tests o evitar un archivo. Para lo que debe ocurrir siempre hace falta un mecanismo que no pase por el juicio del modelo.","howItWorks":"- Ocurre el evento, por ejemplo: el agente va a ejecutar un comando.\n- La herramienta comprueba qué hooks coinciden.\n- Ejecuta el comando y le pasa el contexto en JSON.\n- Interpreta el resultado: permitir, bloquear o añadir información para el modelo.\n\nLos hooks se ejecutan con tus permisos de usuario, así que conviene tratarlos como código de producción: revisarlos, validar la entrada y no introducir en scripts valores sin comillas.","whenToUse":"Para reglas que no admiten excepciones: formatear tras editar, bloquear comandos peligrosos, proteger archivos, registrar acciones para auditoría o impedir que el agente termine sin que pasen los tests. Si una regla necesita juicio, como “revisa que el nombre sea claro”, una instrucción o un revisor encajan mejor.","advantages":["Determinismo: se ejecutan siempre.","No consumen contexto salvo lo que devuelvan al modelo.","Sirven como guardrails, automatización y auditoría.","Se versionan con el proyecto."],"limitations":["Se ejecutan con tus permisos: un hook malicioso o defectuoso tiene riesgo real.","Un hook lento frena cada acción.","Las comprobaciones por texto de comandos se pueden eludir: no son una frontera de seguridad completa.","Formato no portable entre herramientas."],"example":{"text":"Bloquear comandos peligrosos, en el formato de cada herramienta. Las pestañas de abajo lo muestran, y el Playground incluye un script probado."},"relatedConcepts":[{"id":"guardrails","note":"Un hook es una forma concreta de implementar un guardrail."},{"id":"permissions","note":"Los permisos deciden qué se permite; los hooks añaden lógica propia."},{"id":"agents-md","note":"Instrucciones orientan; hooks imponen."},{"id":"agentic-harness","note":"Son los sensores y controles deterministas del harness."}],"prerequisites":["tools-agent","permissions"],"tools":["claude-code","gemini-cli","cursor"],"sources":[{"title":"Claude Code: Hooks reference","url":"https://code.claude.com/docs/en/hooks"},{"title":"Claude Code: How Claude remembers your project","url":"https://code.claude.com/docs/en/memory"},{"title":"Gemini CLI: Documentation","url":"https://geminicli.com/docs/"},{"title":"Cursor: índice de documentación (llms.txt)","url":"https://cursor.com/llms.txt"},{"title":"Cursor: Hooks","url":"https://cursor.com/docs/hooks"},{"title":"Codex: Hooks","url":"https://learn.chatgpt.com/docs/hooks"},{"title":"Gemini CLI: Hooks","url":"https://geminicli.com/docs/hooks/"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05","perTool":[{"tool":"Cursor","path":".cursor/hooks.json","text":"Eventos como `beforeShellExecution`, `preToolUse` y `afterFileEdit`. Bloquea con exit 2 o con `permission: \"deny\"`. El comando llega en `command` o en `tool_input.command`, según el evento.","language":"json","code":"{\n  \"version\": 1,\n  \"hooks\": {\n    \"beforeShellExecution\": [{ \"command\": \"node .cursor/hooks/guard.mjs\" }]\n  }\n}"},{"tool":"Codex","path":".codex/hooks.json","text":"Eventos como `PreToolUse` y `PostToolUse`. Bloquea con exit 2. El comando llega en `tool_input.command`. Los hooks deben aprobarse con `/hooks` antes de ejecutarse.","language":"json","code":"{\n  \"hooks\": {\n    \"PreToolUse\": [\n      { \"hooks\": [{ \"type\": \"command\", \"command\": \"node .codex/hooks/guard.mjs\" }] }\n    ]\n  }\n}"},{"tool":"Gemini CLI","path":".gemini/settings.json","text":"Eventos como `BeforeTool` y `AfterTool`. Bloquea con exit 2, aunque su documentación prefiere exit 0 con `{\"decision\": \"deny\"}`.","language":"json","code":"{\n  \"hooks\": {\n    \"BeforeTool\": [\n      {\n        \"matcher\": \"run_shell_command\",\n        \"hooks\": [{ \"type\": \"command\", \"command\": \"node .gemini/hooks/guard.mjs\" }]\n      }\n    ]\n  }\n}"},{"tool":"Claude Code","path":".claude/settings.json","text":"Eventos como `PreToolUse` y `PostToolUse`. Bloquea con exit 2. Un exit 1 no bloquea.","language":"json","code":"{\n  \"hooks\": {\n    \"PreToolUse\": [\n      {\n        \"matcher\": \"Bash\",\n        \"hooks\": [{ \"type\": \"command\", \"command\": \"node .claude/hooks/guard.mjs\" }]\n      }\n    ]\n  }\n}"}]},{"id":"permissions","title":"Permissions","category":"agent-components","difficulty":"beginner","aliases":["permisos","permission modes","allowlist"],"description":"Las reglas que determinan qué puede hacer un agente sin preguntar, qué requiere confirmación humana y qué tiene prohibido.","technicalExplanation":"Un agente con acceso a terminal puede hacer casi todo lo que puede hacer tu usuario, por lo que los permisos delimitan esa capacidad. Claude Code ofrece modos como `default`, `acceptEdits`, `plan`, `auto`, `dontAsk` y `bypassPermissions`, además de reglas de permiso y denegación por herramienta. Cline parte de un enfoque en el que cada acción requiere aprobación explícita.\n\nLos permisos son una capa de una defensa mayor, junto con el aislamiento (sandbox, contenedor, worktree) y los [[guardrails]].","problem":"Pedir confirmación para todo genera fatiga, y la persona acaba aprobando sin leer. No pedir nunca expone a daños reales. Hace falta un punto intermedio explícito.","howItWorks":"La herramienta evalúa cada llamada contra las reglas y, según el resultado, la ejecuta, la deniega o pregunta. En Claude Code se evalúan en orden: deny, ask, allow; gana la primera coincidencia. Lo habitual es permitir lo inocuo y frecuente (leer, ejecutar tests) y denegar lo peligroso (borrar datos, leer secretos, hacer push a producción).","whenToUse":"Desde el primer día. Antes de relajar permisos en modo autónomo, aísla el entorno: una aprobación no sirve de nada si el agente puede hacer daño sin pasar por ella.","advantages":["Limitan el daño de un error o de una inyección de prompt.","Reducen interrupciones si están bien ajustados."],"limitations":["La documentación de Claude Code advierte que los patrones que restringen argumentos de Bash son frágiles: otra forma de escribir el comando puede no coincidir.","Reglas amplias como “permitir todo Bash” anulan la protección.","La fatiga de aprobación es un riesgo real."],"example":{"language":"json","filename":".claude/settings.json","code":"{\n  \"permissions\": {\n    \"allow\": [\"Bash(npm run test *)\"],\n    \"deny\": [\"Read(./.env)\", \"Bash(git push *)\"]\n  }\n}","explanation":"Permite tests y lectura, y deniega leer `.env` y hacer push. Comprueba la sintaxis exacta en la documentación de tu versión."},"relatedConcepts":[{"id":"guardrails","note":"Los permisos son un tipo de guardrail."},{"id":"hooks","note":"Añaden lógica a medida donde las reglas no alcanzan."},{"id":"autonomous-agents","note":"A más autonomía, más importa delimitar permisos."}],"prerequisites":["tools-agent"],"tools":["claude-code","cline"],"sources":[{"title":"Claude Code: Permissions","url":"https://code.claude.com/docs/en/permissions"},{"title":"Claude Code: Subagents","url":"https://code.claude.com/docs/en/sub-agents"},{"title":"Cline: Documentation","url":"https://docs.cline.bot/"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"guardrails","title":"Guardrails","category":"agent-components","difficulty":"intermediate","aliases":["barandillas","salvaguardas"],"description":"Los controles que limitan lo que un sistema de IA puede recibir, hacer o devolver, para mantenerlo dentro de un comportamiento aceptable aunque el modelo se equivoque.","technicalExplanation":"“Guardrails” es un término general, no un mecanismo concreto. Agrupa validación de entradas y salidas, permisos, sandboxing, hooks, linters y aprobaciones humanas. Los hay de dos naturalezas: **deterministas** (un hook, una regla de permiso, un test) y **probabilísticos** (un modelo que clasifica si una respuesta es adecuada). Los segundos cubren casos que el código no alcanza, pero pueden fallar.","problem":"El modelo se equivoca, malinterpreta o puede ser manipulado mediante contenido malicioso en archivos, webs o resultados de herramientas (inyección de prompt). Un sistema fiable no puede depender de que el modelo acierte siempre.","howItWorks":"Se colocan controles en varios puntos: antes de la entrada, antes de ejecutar una acción, después de ejecutarla y antes de entregar el resultado. Se aplican en capas, porque ninguna es perfecta.","whenToUse":"En todo agente con capacidad de actuar. La intensidad debe ser proporcional al daño posible: un agente de solo lectura necesita menos que uno que despliega en producción.","advantages":["Reducen el impacto de errores e inyecciones.","Hacen viable dar más autonomía.","Los deterministas son auditables."],"limitations":["Dan falsa seguridad si se confía en una sola capa.","Pueden generar falsos positivos que frenan el trabajo.","Los probabilísticos pueden eludirse."],"example":{"text":"Capas para un agente que abre PRs: solo puede escribir en su worktree (aislamiento), no puede hacer push a `main` (permiso y protección de rama), un hook formatea y ejecuta el linter, la CI valida y una persona aprueba el merge."},"relatedConcepts":[{"id":"hooks","note":"Mecanismo determinista para implementarlos."},{"id":"permissions","note":"Primera capa de control."},{"id":"agentic-harness","note":"Los guardrails son una parte del harness."},{"id":"automated-code-review","note":"Una revisión automática actúa como guardrail en el PR."}],"prerequisites":["ai-agents"],"tools":["claude-code"],"sources":[{"title":"Claude Code: Permissions","url":"https://code.claude.com/docs/en/permissions"},{"title":"Birgitta Böckeler: Harness engineering for coding agent users","url":"https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html","note":"martinfowler.com, 2 de abril de 2026"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"mcp","title":"MCP","category":"agent-components","difficulty":"intermediate","aliases":["Model Context Protocol","protocolo de contexto"],"description":"Model Context Protocol: un estándar abierto para conectar aplicaciones de IA con herramientas y datos externos mediante un protocolo común, en lugar de una integración a medida por cada combinación.","technicalExplanation":"Anthropic presentó MCP como estándar abierto el 25 de noviembre de 2024, y en diciembre de 2025 pasó a ser uno de los proyectos fundacionales de la Agentic AI Foundation, bajo la Linux Foundation. Su arquitectura tiene tres roles:\n\n- **Host:** la aplicación de IA, por ejemplo un agente de código. Crea y gestiona clientes, y aplica las políticas de seguridad y consentimiento.\n- **Client:** creado por el host; mantiene una sesión con un único servidor (relación 1:1).\n- **Server:** expone capacidades específicas. Puede ser un proceso local o un servicio remoto.\n\nLos servidores exponen tres primitivas: **tools** (funciones que el modelo puede invocar), **resources** (datos de contexto) y **prompts** (plantillas). La revisión 2026-07-28 marca como obsoletas Roots, Sampling y Logging: siguen funcionando durante el periodo de retirada, pero las implementaciones nuevas no deberían adoptarlas.\n\nLos mensajes usan JSON-RPC, y el protocolo define dos transportes estándar: **stdio**, para procesos locales, y **Streamable HTTP**, que sustituye al antiguo HTTP+SSE. Esa misma revisión hace que MCP sea **sin estado**: elimina las sesiones y el handshake `initialize`, de modo que cada petición lleva su versión y capacidades, y los servidores anuncian las suyas con `server/discover`. Un principio de diseño relevante es que un servidor no debe poder leer toda la conversación ni “ver” dentro de otros servidores.","problem":"Sin un estándar, conectar N aplicaciones con M herramientas exige hasta N×M integraciones. MCP lo reduce a N+M: cada aplicación implementa un cliente y cada herramienta un servidor. También separa quien sabe del sistema externo de quien construye el agente.","howItWorks":"- El host arranca o se conecta a un servidor configurado.\n- El cliente puede consultar con `server/discover` qué versiones y capacidades admite el servidor.\n- El cliente lista las herramientas y el host las presenta al modelo.\n- Cuando el modelo pide usar una, el host la autoriza, el cliente la invoca y el resultado vuelve al modelo.\n\nMCP no sustituye al [[tool-calling]]: el modelo sigue emitiendo llamadas a herramientas, y MCP estandariza de dónde salen esas herramientas y cómo se ejecutan.","whenToUse":"Cuando un agente deba acceder a sistemas externos (tickets, bases de datos, diseño, monitorización) o quieras reutilizar una integración entre herramientas. Si basta con un comando que el agente ya puede ejecutar, como `gh`, a veces no hace falta: cada servidor añade definiciones que ocupan contexto.","advantages":["Una integración sirve para varias aplicaciones compatibles.","Separa responsabilidades entre host y servidor.","Admite servidores locales y remotos.","Gobernanza abierta bajo la Linux Foundation."],"limitations":["Muchas herramientas expuestas consumen contexto y dificultan elegir bien.","Un servidor es código de terceros con acceso a tus sistemas, y sus descripciones y resultados pueden contener inyecciones de prompt.","Los servidores HTTP deben validar `Origin` y autenticar conexiones; la especificación advierte del DNS rebinding en servidores locales.","El soporte de cada primitiva varía entre clientes."],"example":{"text":"El protocolo es común, pero cada cliente guarda la configuración en un sitio distinto. Compáralo en las pestañas de abajo."},"relatedConcepts":[{"id":"tool-calling","note":"El modelo sigue usando tool calling; MCP estandariza el acceso a las herramientas."},{"id":"mcp-servers","note":"La categoría de componentes que exponen capacidades."},{"id":"tools-agent","note":"Las tools de MCP son una fuente de herramientas para el agente."},{"id":"agent-communication","note":"MCP conecta agente y herramientas; A2A conecta agentes entre sí."},{"id":"context-engineering","note":"Resources y tools son una vía de acceso a contexto externo."},{"id":"permissions","note":"El host debe pedir consentimiento antes de ejecutar herramientas."}],"prerequisites":["tool-calling","tools-agent"],"tools":["claude-code","cursor","openai-codex","gemini-cli","cline","github-copilot","mcp-inspector"],"sources":[{"title":"MCP Specification 2026-07-28: Architecture","url":"https://modelcontextprotocol.io/specification/2026-07-28/architecture"},{"title":"MCP Specification 2026-07-28: Key Changes","url":"https://modelcontextprotocol.io/specification/2026-07-28/changelog"},{"title":"Anthropic: Introducing the Model Context Protocol","url":"https://www.anthropic.com/news/model-context-protocol","note":"25 de noviembre de 2024"},{"title":"Linux Foundation: formation of the Agentic AI Foundation","url":"https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation","note":"9 de diciembre de 2025"},{"title":"Claude Code: MCP","url":"https://code.claude.com/docs/en/mcp"},{"title":"Cursor: MCP","url":"https://cursor.com/docs/mcp"},{"title":"Codex: MCP","url":"https://learn.chatgpt.com/docs/extend/mcp?surface=cli"},{"title":"Gemini CLI: MCP servers","url":"https://geminicli.com/docs/tools/mcp-server/"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05","featured":3,"perTool":[{"tool":"Cursor","path":".cursor/mcp.json","text":"También `~/.cursor/mcp.json` para todos tus proyectos.","language":"json","code":"{\n  \"mcpServers\": {\n    \"docs\": { \"command\": \"npx\", \"args\": [\"-y\", \"mi-servidor-mcp\"] }\n  }\n}"},{"tool":"Codex","path":".codex/config.toml","text":"En TOML, en `~/.codex/config.toml` o en el de un proyecto de confianza.","language":"toml","code":"[mcp_servers.docs]\ncommand = \"npx\"\nargs = [\"-y\", \"mi-servidor-mcp\"]"},{"tool":"Gemini CLI","path":".gemini/settings.json","text":"Para servidores remotos HTTP usa el campo `httpUrl`.","language":"json","code":"{\n  \"mcpServers\": {\n    \"docs\": { \"command\": \"npx\", \"args\": [\"-y\", \"mi-servidor-mcp\"] }\n  }\n}"},{"tool":"Claude Code","path":".mcp.json","text":"En la raíz del proyecto y versionable. También con `claude mcp add`.","language":"json","code":"{\n  \"mcpServers\": {\n    \"docs\": { \"command\": \"npx\", \"args\": [\"-y\", \"mi-servidor-mcp\"] }\n  }\n}"},{"tool":"Cline","path":"Ajustes de MCP","text":"Admite servidores locales por stdio y remotos por HTTP o SSE."}]},{"id":"tools-agent","title":"Tools","category":"agent-components","difficulty":"beginner","aliases":["herramientas del agente","agent tools"],"description":"Las funciones que un agente puede invocar para actuar o informarse: leer archivos, ejecutar comandos, buscar o llamar a una API. Sin herramientas, un modelo solo genera texto.","technicalExplanation":"Una herramienta se define con un nombre, una descripción y un esquema de parámetros. El modelo no la ejecuta: emite una petición estructurada, y es la aplicación la que la ejecuta y devuelve el resultado ([[tool-calling]]).\n\nAnthropic subraya que el diseño de herramientas importa tanto como el del prompt: deben ser claras, sin solapamientos y devolver información útil sin desperdiciar tokens. Un conjunto inflado o ambiguo empeora las decisiones del agente.","problem":"Los modelos no acceden por sí solos al sistema de archivos, a la red ni a tus servicios. Las herramientas les dan esas capacidades de forma controlada.","howItWorks":"El host envía al modelo las definiciones disponibles. El modelo decide si usar alguna. El host valida la petición, comprueba permisos, la ejecuta y añade el resultado a la conversación. Pueden ser nativas del agente o venir de servidores [[mcp|MCP]].","whenToUse":"Dale al agente solo las herramientas necesarias para la tarea. Prefiere pocas y bien descritas a muchas y parecidas.","advantages":["Convierten al modelo en un sistema capaz de actuar.","Permiten verificar en vez de suponer, por ejemplo ejecutando un test.","Se pueden restringir por agente o subagente."],"limitations":["Sus definiciones y resultados consumen contexto.","Cada herramienta amplía la superficie de riesgo.","Las descripciones ambiguas provocan llamadas erróneas."],"example":{"language":"json","filename":"definición de herramienta","code":"{\n  \"name\": \"get_weather\",\n  \"description\": \"Devuelve el tiempo actual de una ciudad.\",\n  \"input_schema\": {\n    \"type\": \"object\",\n    \"properties\": { \"city\": { \"type\": \"string\" } },\n    \"required\": [\"city\"]\n  }\n}","explanation":"El modelo elige la herramienta a partir de `description` e `input_schema`, por lo que redactarlos bien cuenta tanto como el código que hay detrás."},"relatedConcepts":[{"id":"tool-calling","note":"El mecanismo con el que el modelo solicita una herramienta."},{"id":"mcp","note":"Protocolo para ofrecer herramientas externas."},{"id":"permissions","note":"Controlan qué herramientas pueden ejecutarse."},{"id":"agent-architecture","note":"Las herramientas son uno de los componentes del agente."}],"prerequisites":["ai-agents"],"tools":["claude-code"],"sources":[{"title":"Claude API: Tool use","url":"https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview"},{"title":"Anthropic: Effective context engineering for AI agents","url":"https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents","note":"29 de septiembre de 2025"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"workflows","title":"Workflows","category":"agent-components","difficulty":"intermediate","aliases":["flujos de trabajo","prompt chaining","patrones de workflow"],"description":"Sistemas en los que varias llamadas a modelos y herramientas se coordinan por rutas predefinidas en código, en lugar de dejar que el modelo decida cada paso.","technicalExplanation":"Anthropic distingue entre **workflows**, con rutas predefinidas, y **agentes**, en los que el modelo dirige dinámicamente su proceso. Su artículo recoge cinco patrones:\n\n- **Prompt chaining:** cada paso procesa la salida del anterior.\n- **Routing:** se clasifica la entrada y se envía a una tarea especializada.\n- **Parallelization:** subtareas simultáneas o varias ejecuciones para comparar.\n- **Orchestrator-workers:** un LLM central divide la tarea y delega.\n- **Evaluator-optimizer:** un LLM genera y otro evalúa en bucle.\n\nEl término también se usa de manera más amplia para un procedimiento humano-agente, como planificar, implementar y verificar; véase [[ai-development-workflows]].","problem":"Muchas tareas no necesitan la autonomía completa de un agente. Un workflow es más predecible, más barato y más fácil de depurar.","howItWorks":"El código de la aplicación define la secuencia, las ramas y las comprobaciones. El modelo interviene en pasos concretos, y entre ellos se pueden insertar validaciones programáticas.","whenToUse":"Cuando los pasos se conocen de antemano. Anthropic recomienda buscar la solución más simple y añadir complejidad solo si mejora de forma demostrable el resultado.","advantages":["Predecibles y fáciles de depurar.","Permiten validar entre pasos.","Coste más controlado."],"limitations":["No se adaptan a situaciones imprevistas.","Muchas ramas acaban siendo difíciles de mantener.","Cada paso añade latencia."],"example":{"text":"Un flujo de traducción: generar borrador, comprobar por programa que no falten variables `{nombre}` y, solo si pasa, pedir a otro paso que revise el tono."},"relatedConcepts":[{"id":"ai-agents","note":"Alternativa con más autonomía."},{"id":"orchestrators","note":"Orchestrator-workers es uno de los patrones."},{"id":"ai-development-workflows","note":"El mismo término aplicado al proceso de desarrollo."},{"id":"skills","note":"Un workflow repetible puede empaquetarse como skill."}],"prerequisites":["ai-agents"],"tools":["claude-code"],"sources":[{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"orchestrators","title":"Orchestrators","category":"agent-components","difficulty":"advanced","aliases":["orquestadores","orchestrator-workers","lead agent","agente principal"],"description":"El componente que divide un trabajo, reparte las partes entre agentes o pasos, coordina su ejecución y combina los resultados. Puede ser un modelo, código convencional o una combinación de ambos.","technicalExplanation":"Conviene separar dos cosas que se llaman igual:\n\n- **Orquestador basado en LLM:** un agente que decide dinámicamente cómo dividir la tarea. Es el patrón *orchestrator-workers*: un LLM central descompone, delega y sintetiza. Encaja cuando las subtareas no se conocen de antemano, y Anthropic pone como ejemplo cambios de código que afectan a varios archivos.\n- **Orquestador determinista:** código que lanza agentes según un flujo fijo. Es más predecible, pero menos flexible.\n\nEl orquestador no aporta capacidad por sí mismo: su valor está en coordinar. Sus decisiones críticas son cómo dividir para que las partes no choquen, qué contexto recibe cada trabajador, cómo combinar resultados y qué hacer si uno falla. En su sistema de investigación multiagente, Anthropic atribuye a la calidad de las instrucciones de delegación buena parte del resultado, y señala que un encargo vago produce trabajo duplicado.","problem":"Hay tareas demasiado grandes para una sola ventana de contexto, o con partes independientes que pueden avanzar a la vez. Sin coordinación, varios agentes duplican trabajo, chocan en los mismos archivos o producen resultados que no encajan.","howItWorks":"- **Descomposición:** divide el objetivo en subtareas lo más independientes posible.\n- **Delegación:** da a cada trabajador objetivo, límites, formato de salida y herramientas.\n- **Ejecución:** lanza en serie o en paralelo, con aislamiento si escriben archivos.\n- **Seguimiento:** gestiona fallos y reintentos.\n- **Síntesis:** integra los resultados y comprueba el conjunto.","whenToUse":"Cuando la tarea admite división real y su tamaño justifica el coste adicional. Si las subtareas dependen mucho entre sí o tocan los mismos archivos, un solo agente secuencial suele funcionar mejor.","advantages":["Permite abordar tareas mayores que una ventana de contexto.","El paralelismo reduce el tiempo total en trabajo independiente.","Cada trabajador puede especializarse."],"limitations":["Aumenta mucho el consumo de tokens.","Una mala descomposición multiplica el trabajo en vez de reducirlo.","Es más difícil depurar y observar.","El orquestador es un punto único de fallo en sus decisiones."],"example":{"text":"Migrar 40 archivos a una API nueva. El orquestador lista los archivos y comprueba que sean independientes, lanza un trabajador por lote en su propio worktree, cada uno ejecuta los tests, y luego fusiona las ramas y ejecuta la suite completa."},"relatedConcepts":[{"id":"subagents","note":"Sus trabajadores habituales en un agente de código."},{"id":"agent-orchestration","note":"La disciplina general de coordinar agentes."},{"id":"multi-agent-systems","note":"El orquestador es una de las topologías posibles."},{"id":"parallel-agent-development","note":"Coordina el trabajo simultáneo en el mismo repositorio."},{"id":"workflows","note":"Orchestrator-workers es uno de los patrones de workflow."}],"prerequisites":["ai-agents","subagents"],"tools":["claude-code","langgraph","autogen"],"sources":[{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"},{"title":"Anthropic: How we built our multi-agent research system","url":"https://www.anthropic.com/engineering/multi-agent-research-system"},{"title":"Claude Code: overview","url":"https://code.claude.com/docs/en/overview"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"agentic-harness","title":"Agentic Harness","category":"agent-components","difficulty":"advanced","aliases":["harness","arnés","agent harness"],"description":"Todo lo que rodea al modelo y lo convierte en un agente útil: el bucle de ejecución, las herramientas, la gestión de contexto, los permisos y las comprobaciones.","technicalExplanation":"Birgitta Böckeler lo resume así en martinfowler.com: en sentido amplio, un harness es “todo lo que hay en un agente de IA excepto el modelo”. Esa definición ayuda a explicar por qué dos productos con el mismo modelo se comportan de forma muy distinta.\n\nConviene distinguir dos capas:\n\n- **Capa del producto:** lo que aporta la herramienta, como Claude Code o Codex. Incluye el bucle, las herramientas nativas, la compactación y los permisos.\n- **Harness externo (*outer harness*):** lo que el equipo construye a su alrededor, como instrucciones, skills, hooks, tests, linters y CI.\n\nBöckeler organiza el externo en **guías** que orientan antes de actuar (*feedforward*) y **sensores** que observan el resultado para que el agente se corrija (*feedback*), cada uno de tipo computacional (determinista) o inferencial (basado en un modelo). La [[harness-engineering]] es la disciplina de diseñar esta capa.","problem":"Un modelo solo no conserva estado entre llamadas ni ejecuta acciones, y puede dar por terminado un trabajo que no lo está. Anthropic describe, por ejemplo, agentes de larga duración que intentan hacer demasiado de una vez o declaran el trabajo acabado antes de tiempo, algo que el harness debe compensar con estructura.","howItWorks":"- **Bucle:** envía contexto al modelo, ejecuta las herramientas pedidas y repite.\n- **Contexto:** carga instrucciones, recupera información y compacta.\n- **Control:** aplica permisos, sandbox y hooks.\n- **Verificación:** ejecuta tests y linters y devuelve los fallos al modelo.\n- **Continuidad:** guarda progreso en archivos o en Git para retomar el trabajo.","whenToUse":"Todo agente tiene un harness; la decisión es cuánto invertir en la capa externa. Compensa cuando los agentes trabajan con frecuencia en un mismo código, o con cada vez menos supervisión directa.","advantages":["Mejorar el harness suele dar resultados más estables que cambiar de modelo.","Convierte errores puntuales en controles permanentes.","Permite aumentar la autonomía de forma segura."],"limitations":["Requiere inversión y mantenimiento continuos.","Un exceso de reglas o sensores ralentiza al agente.","Los tests generados por IA no bastan todavía como sensor fiable de comportamiento, según Böckeler."],"example":{"text":"Un agente rompe la separación de capas. En lugar de corregirlo solo en el chat, el equipo añade una regla de linter con un mensaje que explica cómo arreglarlo. Desde entonces, cualquier agente recibe esa corrección automáticamente."},"relatedConcepts":[{"id":"harness-engineering","note":"La disciplina de diseñar y mejorar el harness."},{"id":"hooks","note":"Mecanismo típico de control determinista."},{"id":"context-engineering","note":"Se ocupa de una parte del harness: qué ve el agente."},{"id":"guardrails","note":"Controles dentro del harness."},{"id":"agent-evaluation","note":"Permite medir si un cambio mejora el harness."},{"id":"agent-architecture","note":"El harness implementa casi toda la arquitectura salvo el modelo."}],"prerequisites":["ai-agents","context-management","hooks"],"tools":["claude-code","openai-codex"],"sources":[{"title":"Birgitta Böckeler: Harness engineering for coding agent users","url":"https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html","note":"martinfowler.com, 2 de abril de 2026"},{"title":"Anthropic: Effective harnesses for long-running agents","url":"https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents"},{"title":"OpenAI: Harness engineering","url":"https://openai.com/index/harness-engineering/","note":"Fuente primaria; bloqueó la lectura automática, contrastar a mano"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"ai-assisted-development","title":"AI-assisted Development","category":"ai-development","difficulty":"beginner","aliases":["desarrollo asistido por IA","AI-assisted coding"],"description":"Término general para cualquier forma de desarrollar software con ayuda de modelos de IA, desde el autocompletado hasta los agentes, con la persona como responsable del resultado.","technicalExplanation":"Es el paraguas más amplio. Cubre sugerencias en línea, chat, generación de tests, revisión automática y agentes. Se popularizó con herramientas como GitHub Copilot, presentado en vista previa técnica el 29 de junio de 2021 y disponible de forma general el 21 de junio de 2022. Simon Willison señala que usar LLM y revisar, probar y poder explicar el código sigue siendo desarrollo de software normal.","problem":"Reduce el tiempo dedicado a tareas mecánicas, a entender código desconocido o a escribir código repetitivo.","howItWorks":"El modelo recibe contexto (código, instrucción) y propone. La persona acepta, ajusta o rechaza, y sigue siendo responsable de su calidad.","whenToUse":"En casi cualquier tarea de desarrollo, ajustando la revisión al riesgo del código.","advantages":["Acelera tareas repetitivas.","Ayuda a orientarse en tecnologías desconocidas.","Reduce barreras para probar ideas."],"limitations":["Puede introducir errores plausibles.","Puede atrofiar habilidades si no se comprende lo generado.","Plantea cuestiones de privacidad y licencia que debes revisar."],"example":{"text":"Pides una función de validación de IBAN, lees el resultado, añades casos de prueba y corriges un detalle antes de hacer commit."},"relatedConcepts":[{"id":"ai-coding","note":"Casi sinónimo, centrado en escribir código."},{"id":"agentic-coding","note":"La variante con mayor delegación."},{"id":"vibe-coding","note":"Una variante sin revisión del código."}],"prerequisites":[],"tools":["github-copilot","cursor","claude-code"],"sources":[{"title":"GitHub Blog: Copilot is generally available","url":"https://github.blog/2022-06-21-github-copilot-is-generally-available-to-all-developers/","note":"21 de junio de 2022"},{"title":"Simon Willison: Not all AI-assisted programming is vibe coding","url":"https://simonwillison.net/2025/Mar/19/vibe-coding/"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"ai-coding","title":"AI Coding","category":"ai-development","difficulty":"beginner","aliases":["programar con IA"],"description":"Expresión informal para escribir código con modelos de IA. Sin definición estricta: incluye desde el autocompletado hasta los agentes.","technicalExplanation":"No es un término técnico preciso. Lo importante para entender cualquier afirmación sobre “AI coding” es preguntar qué modo de trabajo describe: sugerencias, chat con cambios puntuales o agente autónomo. Cada uno exige una supervisión distinta.","problem":"Sirve como etiqueta común, pero puede ocultar diferencias importantes.","howItWorks":"Depende de la herramienta: completar en línea, generar a partir de una instrucción, o delegar una tarea completa.","whenToUse":"Usa el término como descripción general; para decisiones concretas, precisa el modo de trabajo.","advantages":["Etiqueta sencilla y reconocible."],"limitations":["Demasiado vago para evaluar resultados o riesgos."],"example":{"text":"“Usamos AI coding” puede significar autocompletado con revisión línea a línea o agentes que abren PR por su cuenta: son prácticas muy distintas."},"relatedConcepts":[{"id":"ai-assisted-development","note":"Término más amplio."},{"id":"agentic-coding","note":"Forma más concreta."},{"id":"ai-coding-assistants","note":"Herramientas típicas."}],"prerequisites":[],"tools":[],"sources":[{"title":"Simon Willison: Not all AI-assisted programming is vibe coding","url":"https://simonwillison.net/2025/Mar/19/vibe-coding/"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"agentic-coding","title":"Agentic Coding","category":"ai-development","difficulty":"intermediate","aliases":["codificación agéntica","coding agents","agentes de código"],"description":"Programar delegando tareas en un agente que lee el código, edita archivos, ejecuta comandos y comprueba su trabajo, mientras la persona define objetivos y revisa resultados.","technicalExplanation":"El cambio frente a la asistencia es **quién mantiene el bucle**. Con un asistente, la persona ejecuta, lee el error y vuelve a preguntar. En agentic coding, el agente hace ese ciclo: ejecuta los tests, interpreta el fallo, corrige y repite.\n\nTécnicamente, requiere un modelo capaz de usar herramientas de forma fiable y un entorno donde pueda actuar: terminal, editor o nube. La calidad del resultado depende mucho del contexto que recibe y de si tiene forma de verificarse. Los productos actuales lo ofrecen en varias superficies, como terminal (Claude Code, Codex CLI, Gemini CLI, Aider), IDE (Cursor, Devin Desktop, Cline) y nube (Codex Cloud, Cursor Cloud Agents).\n\nNo implica renunciar al criterio: la persona sigue siendo responsable del código. Lo que cambia es que la atención se desplaza de escribir a especificar, supervisar y revisar.","problem":"En la asistencia clásica, la persona hace de intermediaria entre el modelo y el entorno, copiando errores y aplicando cambios. Delegar el ciclo completo reduce esa carga y permite abordar cambios multiarchivo o trabajar en varias tareas a la vez.","howItWorks":"- **Encargo:** describes el objetivo, las restricciones y cómo verificar el resultado.\n- **Exploración:** el agente busca y lee lo relevante.\n- **Plan:** propone cómo proceder, especialmente en cambios grandes.\n- **Implementación y verificación:** edita, ejecuta tests y corrige.\n- **Revisión:** revisas el diff y das feedback o integras.","whenToUse":"Es adecuado cuando la tarea tiene criterios de éxito comprobables: corregir bugs con un test que falla, migraciones, escribir tests o cambios en código que el equipo conoce bien. Requiere más cuidado cuando el criterio es subjetivo, cuando no hay tests o cuando el código es crítico para la seguridad.","advantages":["Reduce la carga de hacer de intermediario.","Hace viables cambios amplios y mecánicos.","Permite trabajar en paralelo con varios agentes.","Ayuda a entender código desconocido."],"limitations":["Requiere revisar diffs potencialmente grandes.","Sin verificación automática, el agente puede dar por buena una solución incorrecta.","Consume muchos más tokens que el chat.","Actuar en tu máquina exige controlar los permisos."],"example":{"text":"Un encargo que incluye cómo comprobar el resultado:","language":"text","filename":"prompt","code":"El endpoint /orders devuelve 500 cuando el carrito está vacío.\nEscribe primero un test que lo reproduzca, corrige la causa\ny ejecuta toda la suite. No modifiques la API pública.","explanation":"El test da al agente un objetivo verificable. La restricción final evita una “solución” que cambie el contrato."},"relatedConcepts":[{"id":"ai-agents","note":"La tecnología de base."},{"id":"ai-assisted-development","note":"El concepto general."},{"id":"agentic-engineering","note":"La práctica profesional que lo rodea."},{"id":"vibe-coding","note":"Comparte herramientas, pero prescinde de revisar el código."},{"id":"ai-development-workflows","note":"Cómo organizar el trabajo con agentes."}],"prerequisites":["ai-agents","ai-assisted-development"],"tools":["claude-code","openai-codex","cursor","gemini-cli","aider","cline","windsurf"],"sources":[{"title":"Claude Code: overview","url":"https://code.claude.com/docs/en/overview"},{"title":"OpenAI: Codex documentation","url":"https://learn.chatgpt.com/docs"},{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"},{"title":"Claude Code: Best practices","url":"https://code.claude.com/docs/en/best-practices"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05","editorialNote":"No hay una definición normativa: el término se usa de forma descriptiva en el sector. Aquí se explica como un modo de trabajo observable, no como un estándar."},{"id":"agentic-engineering","title":"Agentic Engineering","category":"ai-development","difficulty":"advanced","aliases":["ingeniería agéntica"],"description":"Ingeniería de software en la que se dirigen agentes que escriben gran parte del código, manteniendo las exigencias profesionales de diseño, revisión, pruebas y responsabilidad.","technicalExplanation":"El término se usa sobre todo como contraste con el [[vibe-coding]]: según las crónicas, la idea es que, a medida que los modelos mejoran, la versión profesional de programar con IA no consiste en aceptar el resultado sin mirar, sino en orquestar agentes con supervisión.\n\nComo no tiene una definición normativa, resulta más útil describir lo que implica en la práctica:\n\n- **Especificar** con precisión qué se quiere y cómo se comprueba.\n- **Diseñar el entorno**, como arquitectura, tests, [[agentic-harness|harness]] e instrucciones, para que los agentes trabajen bien.\n- **Coordinar** varios agentes y tareas.\n- **Revisar y responder** por el resultado, aunque no se haya escrito a mano.\n\nLa diferencia con [[agentic-coding]] es de alcance: esta describe la actividad de programar con agentes, mientras que la ingeniería agéntica incluye el sistema y la disciplina a su alrededor.","problem":"Generar código deja de ser el cuello de botella, pero aparecen otros: mantener la calidad, revisar más volumen, evitar deuda técnica y conservar el conocimiento del sistema. Hace falta una práctica profesional para esa nueva situación.","howItWorks":"No es un método fijo. Un equipo suele combinar especificaciones, planificación, ejecución con agentes aislados, verificación automática y revisión humana, y convierte los errores repetidos en controles permanentes.","whenToUse":"Cuando los agentes escriben una parte importante del código de un sistema que hay que mantener. En un prototipo desechable, este rigor puede ser excesivo.","advantages":["Conserva los estándares de ingeniería al aumentar la delegación.","Hace el trabajo con agentes repetible en equipo.","Reduce la dependencia de la intuición individual."],"limitations":["Término todavía impreciso y usado con fines de marketing.","Requiere una inversión inicial en tests, documentación y herramientas.","Las prácticas aún evolucionan rápido, y faltan evidencias a largo plazo."],"example":{"text":"Un equipo acuerda que todo cambio de agente debe llegar con tests, pasar CI y recibir revisión. Cada fallo recurrente se convierte en una regla de linter o una instrucción, y los resultados se miden con evals."},"relatedConcepts":[{"id":"agentic-coding","note":"La actividad central."},{"id":"harness-engineering","note":"Una disciplina concreta dentro de esta práctica."},{"id":"context-engineering","note":"Otra competencia clave."},{"id":"vibe-coding","note":"El contraste con el que suele presentarse."},{"id":"ai-software-engineering","note":"Término cercano y también poco delimitado."}],"prerequisites":["agentic-coding"],"tools":["claude-code","openai-codex"],"sources":[{"title":"The New Stack: Vibe coding is passé","url":"https://thenewstack.io/vibe-coding-is-passe/","note":"Fuente secundaria"},{"title":"Birgitta Böckeler: Harness engineering for coding agent users","url":"https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html","note":"martinfowler.com, 2 de abril de 2026"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05","editorialNote":"Término reciente. Se atribuye su popularización a Andrej Karpathy a comienzos de 2026, pero solo se ha podido contrastar mediante fuentes secundarias y discrepan en la fecha exacta. Por eso sigue como Needs review."},{"id":"context-engineering","title":"Context Engineering","category":"ai-development","difficulty":"intermediate","aliases":["ingeniería de contexto"],"description":"El conjunto de estrategias para seleccionar y mantener la información que recibe un modelo en cada inferencia, incluida la que va más allá del prompt: instrucciones, herramientas, historial y datos.","technicalExplanation":"Anthropic la define como el conjunto de estrategias para curar y mantener el conjunto óptimo de tokens durante la inferencia, y la presenta como una evolución natural de la [[prompt-engineering]]. Si esta se centra en redactar buenas instrucciones, aquella gestiona **todo el estado del contexto** a lo largo de muchos turnos.\n\nEl principio de fondo es que el contexto es un recurso finito con rendimientos decrecientes. El objetivo es encontrar el menor conjunto de información de alta señal que maximice la probabilidad del resultado deseado.\n\nSus técnicas principales son:\n\n- **Recuperación just-in-time:** guardar referencias ligeras (rutas, consultas, enlaces) y cargar el contenido con herramientas cuando se necesite.\n- **[[context-compaction|Compactación]]:** resumir la conversación cerca del límite.\n- **[[persistent-memory|Notas estructuradas]]:** escribir fuera de la ventana y leerlas más tarde.\n- **[[subagents|Subagentes]]:** aislar subtareas y recibir solo un resumen.","problem":"Un agente que trabaja durante muchos turnos acumula información cada vez menos relevante. Cuando el contexto se llena de ruido, las instrucciones pierden peso y empeoran las decisiones. Y si falta el dato correcto, el modelo lo suple con suposiciones plausibles.","howItWorks":"Se trata de decidir, para cada elemento, cuándo entra en contexto y a qué coste:\n\n- **Siempre:** instrucciones breves, como [[agents-md]].\n- **Al necesitarse:** [[skills]], archivos, resultados de herramientas.\n- **Fuera de contexto:** memoria, notas, salida de subagentes.\n\nLa arquitectura híbrida es habitual: unos datos se cargan por adelantado por velocidad, y el resto se explora bajo demanda.","whenToUse":"En todo agente que dure más de unos pocos turnos. Si un agente falla, antes de cambiar de modelo, pregúntate si tenía la información correcta y si esta era visible.","advantages":["Mejora la calidad en tareas largas sin cambiar de modelo.","Reduce coste y latencia.","Hace más predecible el comportamiento.","Permite trabajar en repositorios grandes."],"limitations":["Requiere criterio y experimentación: no hay una receta universal.","Recuperar información bajo demanda añade pasos.","Resumir y filtrar puede eliminar el dato que importaba.","Lo que entra en contexto, incluido contenido externo, puede influir o manipular al modelo."],"example":{"text":"Compara dos enfoques para “explica cómo funciona la autenticación”. Malo: pegar 40 archivos. Mejor: dar en `AGENTS.md` un mapa breve (`auth vive en src/auth`) y dejar que el agente use búsqueda para abrir solo los archivos que necesite."},"relatedConcepts":[{"id":"prompt-engineering","note":"Su antecedente, de alcance menor."},{"id":"context-management","note":"Su parte operativa."},{"id":"skills","note":"Aplican divulgación progresiva."},{"id":"subagents","note":"Aíslan el contexto."},{"id":"harness-engineering","note":"Según algunos autores, el contexto responde a qué ve el agente; el harness, además, a qué se previene y comprueba."},{"id":"mcp","note":"Conecta fuentes externas de contexto."}],"prerequisites":["prompt-engineering","ai-agents"],"tools":["claude-code"],"sources":[{"title":"Anthropic: Effective context engineering for AI agents","url":"https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents","note":"29 de septiembre de 2025"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05","featured":4},{"id":"prompt-engineering","title":"Prompt Engineering","category":"ai-development","difficulty":"beginner","aliases":["ingeniería de prompts"],"description":"La práctica de redactar instrucciones para que un modelo produzca el resultado deseado: claridad, contexto, ejemplos y formato de salida.","technicalExplanation":"Incluye técnicas como ser explícito y directo, dar ejemplos (*few-shot*), definir un rol, separar con estructura las partes del prompt y especificar el formato. Sigue siendo relevante aunque la [[context-engineering]] lo englobe. Anthropic señala que antes de iterar el prompt hay que tener criterios de éxito y una forma de medirlos.","problem":"Un prompt ambiguo produce resultados ambiguos. Una instrucción clara reduce los errores de interpretación.","howItWorks":"Se redacta, se prueba con casos reales, se mide y se itera, como cualquier otra pieza de un sistema.","whenToUse":"Siempre que escribas instrucciones para un modelo, en especial en prompts de sistema, descripciones de herramientas y skills.","advantages":["Es barato y rápido de mejorar.","Sus efectos pueden ser inmediatos."],"limitations":["No compensa falta de datos o herramientas.","Lo que funciona en un modelo puede variar en otro.","Las “fórmulas mágicas” suelen ser mitos."],"example":{"text":"En vez de “revisa este código”, escribe: “Revisa este diff buscando errores de concurrencia. Por cada hallazgo, indica archivo, línea y un escenario concreto de fallo. Si no hay ninguno, dilo”."},"relatedConcepts":[{"id":"context-engineering","note":"La amplía a todo el estado del contexto."},{"id":"skills","note":"Una skill es, en parte, un prompt reutilizable bien escrito."},{"id":"agent-evaluation","note":"Permite medir si un cambio de prompt mejora el resultado."}],"prerequisites":[],"tools":[],"sources":[{"title":"Claude: Prompt engineering overview","url":"https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview"},{"title":"Anthropic: Effective context engineering for AI agents","url":"https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents","note":"29 de septiembre de 2025"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"spec-driven-development","title":"Spec-driven Development","category":"ai-development","difficulty":"intermediate","aliases":["SDD","desarrollo guiado por especificación","Spec Kit"],"description":"Escribir primero una especificación explícita (qué y por qué) y usarla como fuente de la que derivan el plan, las tareas y el código.","technicalExplanation":"Con agentes, la idea tiene un nuevo atractivo: una especificación revisada reduce la ambigüedad antes de generar código, y sobrevive a la sesión. GitHub Spec Kit es un ejemplo de conjunto de herramientas que estructura el proceso en especificación, plan y tareas. Hay debate sobre cuánto detalle compensa y si la especificación puede ser realmente la fuente de verdad o se desincroniza del código.","problem":"Pedir directamente “construye X” deja cientos de decisiones implícitas al modelo. Muchas salen mal y se descubren tarde.","howItWorks":"- **Especificar** requisitos y criterios de aceptación.\n- **Planificar** la arquitectura.\n- **Dividir** en tareas.\n- **Implementar** y comprobar contra la especificación.","whenToUse":"En funcionalidades con varias partes o que implican a varias personas. Para arreglos pequeños es una sobrecarga.","advantages":["Saca a la luz las decisiones antes de programar.","Da continuidad entre sesiones.","Facilita paralelizar tareas."],"limitations":["La especificación puede quedar obsoleta.","Detallar en exceso acerca al waterfall.","Sigue siendo necesario revisar el código."],"example":{"text":"Antes de implementar la exportación a CSV, un `spec.md` define columnas, límites de filas y permisos. El agente propone un plan a partir de él, y los criterios de aceptación se convierten en tests."},"relatedConcepts":[{"id":"planning-reasoning","note":"Formaliza la fase de planificación."},{"id":"ai-development-workflows","note":"Una forma concreta de flujo."}],"prerequisites":["agentic-coding"],"tools":["claude-code","github-copilot"],"sources":[{"title":"GitHub Spec Kit","url":"https://github.com/github/spec-kit"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"vibe-coding","title":"Vibe Coding","category":"ai-development","difficulty":"beginner","aliases":["programar por vibras"],"description":"Construir software con un LLM sin revisar el código que genera, guiándose solo por si el resultado parece funcionar.","technicalExplanation":"Andrej Karpathy acuñó el término el 6 de febrero de 2025. Con el tiempo se ha usado para cualquier programación con IA, pero Simon Willison insiste en la diferencia: si revisas, pruebas y puedes explicar el código, eso es desarrollo de software normal, no vibe coding. Lo que lo define es **no revisar**, y aceptar la responsabilidad o el riesgo que ello conlleva.","problem":"Permite crear prototipos y herramientas personales a gran velocidad, incluso a personas sin formación en programación.","howItWorks":"Describes lo que quieres, pruebas el resultado, y si algo falla, pegas el error y repites, sin leer el código.","whenToUse":"En prototipos desechables, experimentos y herramientas personales de bajo riesgo. No es adecuado para sistemas que manejan datos sensibles, dinero o a otras personas.","advantages":["Velocidad para explorar ideas.","Reduce la barrera de entrada."],"limitations":["Sin revisión pueden colarse fallos de seguridad y de pérdida de datos.","El código se vuelve difícil de mantener.","Si algo falla, nadie entiende por qué."],"example":{"text":"Generar una página para organizar la lista de la compra de una fiesta y descartarla al día siguiente es un buen caso. Crear así un servicio con pagos, no."},"relatedConcepts":[{"id":"ai-assisted-development","note":"Con revisión, deja de ser vibe coding."},{"id":"agentic-engineering","note":"El contraste profesional."},{"id":"agentic-coding","note":"Comparte herramientas, no la revisión."}],"prerequisites":[],"tools":["cursor","claude-code"],"sources":[{"title":"Simon Willison: Not all AI-assisted programming is vibe coding","url":"https://simonwillison.net/2025/Mar/19/vibe-coding/"},{"title":"The New Stack: Vibe coding is passé","url":"https://thenewstack.io/vibe-coding-is-passe/","note":"Fuente secundaria"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"ai-software-engineering","title":"AI Software Engineering","category":"ai-development","difficulty":"intermediate","aliases":["AI engineer","ingeniería de software con IA"],"description":"Expresión ambigua que puede referirse a dos cosas: construir software usando IA, o construir sistemas que incorporan modelos de IA.","technicalExplanation":"Conviene preguntar en qué sentido se usa. En el primero, se solapa con [[agentic-engineering]]. En el segundo, incluye prácticas como evaluación, gestión de prompts, observabilidad de modelos y control de costes para productos que usan LLM. Cognition, por su parte, presentó a Devin en 2024 como “the first AI software engineer”, una afirmación de marketing y no una categoría técnica.","problem":"Aclarar el término evita malentendidos en puestos de trabajo, productos y formación.","howItWorks":"No describe un método concreto; depende del sentido en que se use.","whenToUse":"Precisa siempre si hablas de usar IA para desarrollar o de desarrollar productos con IA.","advantages":["Etiqueta útil en conversaciones generales."],"limitations":["Ambiguo y sensible a modas."],"example":{"text":"“Busco un AI engineer” puede significar alguien que integra LLM en un producto o alguien que usa agentes para programar con rapidez. Son perfiles diferentes."},"relatedConcepts":[{"id":"agentic-engineering","note":"Primer sentido."},{"id":"agent-evaluation","note":"Práctica típica del segundo sentido."}],"prerequisites":[],"tools":["claude-agent-sdk"],"sources":[{"title":"Cognition: Introducing Devin","url":"https://cognition.com/blog/introducing-devin"}],"status":"draft","lastVerified":null,"addedAt":"2026-11-05","editorialNote":"Artículo en borrador: el término no tiene un significado asentado y aquí solo se delimitan sus usos habituales."},{"id":"harness-engineering","title":"Harness Engineering","category":"ai-development","difficulty":"advanced","aliases":["ingeniería del arnés"],"description":"La disciplina de diseñar y mejorar el entorno que rodea a un agente de código (instrucciones, herramientas, comprobaciones y bucles de corrección) para que su trabajo sea fiable.","technicalExplanation":"Birgitta Böckeler (Thoughtworks), en martinfowler.com, describe el [[agentic-harness|harness]] externo como la combinación de:\n\n- **Guías (feedforward):** orientan al agente antes de actuar, como instrucciones y documentación.\n- **Sensores (feedback):** observan lo que produce para que se corrija, como tests y linters.\n\nAmbos pueden ser **computacionales** (deterministas y rápidos: tests, linters, comprobación de tipos) o **inferenciales** (análisis semántico o revisión con un LLM). Según la autora, se regulan tres dimensiones: la **mantenibilidad**, la **adecuación arquitectónica** y el **comportamiento**, siendo esta última la más difícil, porque los tests generados por IA aún no son lo bastante fiables para reducir la supervisión humana.\n\nLa práctica central es que, cuando un problema se repite, no basta con corregirlo: se mejora el harness para que no vuelva a ocurrir. Eso la diferencia de la [[context-engineering]], que se centra en qué información ve el agente, aunque en la práctica ambas se solapan.","problem":"Corregir un mismo error en cada sesión no escala. Y con más delegación, ya no se puede revisar cada línea: hace falta un sistema que oriente y detecte problemas de forma automática.","howItWorks":"- **Observa** dónde falla el agente.\n- **Clasifica:** ¿faltó orientación o faltó detección?\n- **Añade el control** más barato que lo evite. Prefiere uno determinista si es posible.\n- **Haz que el mensaje enseñe:** el error de un linter puede explicar cómo corregirlo, y el agente lo leerá.\n- **Mide** con [[agent-evaluation|evals]] si mejora.\n- **Poda** lo que ya no aporta.","whenToUse":"Cuando los agentes ya escriben una parte notable del código y los errores se repiten. Empieza por lo que ya existe: buenos tests, tipos y linters son parte del harness.","advantages":["Convierte los errores en mejoras permanentes.","Beneficia a todos los agentes y personas del equipo.","Permite aumentar la delegación con más seguridad."],"limitations":["Requiere inversión y mantenimiento.","Los sensores de comportamiento siguen siendo débiles.","Mal hecho, un exceso de controles frena sin mejorar.","Término reciente, con prácticas aún en evolución."],"example":{"text":"El agente sigue importando la base de datos desde la capa HTTP. Una regla de linter lo detecta, con este mensaje: “HTTP no puede importar `db`; usa un servicio de `src/domain`”. El agente recibe la instrucción de corrección en el momento en que comete el error."},"relatedConcepts":[{"id":"agentic-harness","note":"El objeto de esta disciplina."},{"id":"context-engineering","note":"Se solapa con las guías."},{"id":"hooks","note":"Disparan sensores automáticamente."},{"id":"agent-evaluation","note":"Mide el efecto de los cambios."}],"prerequisites":["agentic-coding","agentic-harness"],"tools":["claude-code","openai-codex"],"sources":[{"title":"Birgitta Böckeler: Harness engineering for coding agent users","url":"https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html","note":"martinfowler.com, 2 de abril de 2026"},{"title":"OpenAI: Harness engineering","url":"https://openai.com/index/harness-engineering/","note":"Fuente primaria; bloqueó la lectura automática, contrastar a mano"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05","editorialNote":"El término se difundió a comienzos de 2026 a raíz de un artículo de OpenAI. Esa fuente primaria no se pudo leer de forma automática, así que la definición aquí se basa en el análisis publicado en martinfowler.com."},{"id":"ai-development-workflows","title":"AI Development Workflows","category":"ai-development","difficulty":"intermediate","aliases":["flujos de desarrollo con IA","explore plan code","plan implement verify"],"description":"Las formas de organizar el trabajo entre personas y agentes durante el desarrollo: cómo se encarga, se planifica, se implementa, se verifica y se integra un cambio.","technicalExplanation":"No existe un flujo único, pero los que funcionan comparten una idea: **dar al agente un objetivo verificable y revisar en los puntos donde corregir aún es barato**. Un flujo base tiene estas fases:\n\n- **Explorar:** el agente lee el código sin cambiar nada.\n- **Planificar:** propone cómo proceder. Revisar aquí es lo más rentable.\n- **Implementar:** escribe en una rama o un worktree aislado.\n- **Verificar:** ejecuta tests, linter y, si procede, prueba la aplicación.\n- **Revisar:** una persona u otro agente con contexto limpio examina el diff.\n- **Integrar:** PR, CI y merge.\n\nLa documentación de buenas prácticas de Claude Code propone ideas afines: escribir una especificación, construir en una sesión limpia, dar al agente una comprobación que ejecutar y usar un revisor que no haya visto cómo se escribió el código. Anthropic ha descrito para tareas largas un patrón con un agente inicializador y sesiones que avanzan una funcionalidad a la vez, dejando commit y notas de progreso.","problem":"Pedir directamente un cambio grande suele dar un diff difícil de revisar, y a veces resuelve el problema equivocado. Un flujo define dónde entra el juicio humano y cómo se comprueba el resultado.","howItWorks":"- **Tarea pequeña:** una petición con la verificación incluida.\n- **Tarea media:** explorar, planificar, implementar, verificar.\n- **Tarea grande:** especificación, división en tareas y agentes en paralelo, con un orquestador o una persona integrando.\n- **Tarea larga:** añade archivos de progreso y commits frecuentes para retomar el trabajo entre sesiones.\n\nCada iteración debería dejar algo mejor: si el agente falla de forma repetida, actualiza instrucciones o controles.","whenToUse":"Adapta el flujo al riesgo: un cambio de texto no necesita plan, y una migración de datos necesita todo lo anterior. Evita ceremonias que no eviten un error real.","advantages":["Detecta malentendidos antes de generar mucho código.","Hace el trabajo revisable y repetible.","Facilita retomar tareas y coordinar a varios agentes."],"limitations":["Más fases implican más tiempo y tokens.","Un flujo rígido se aplica mal a tareas pequeñas.","La revisión humana puede convertirse en cuello de botella."],"example":{"text":"Flujo para un bug: 1) el agente escribe un test que reproduce el fallo; 2) confirma que falla; 3) corrige; 4) ejecuta toda la suite; 5) un subagente de solo lectura revisa el diff; 6) abre un PR y CI lo valida."},"relatedConcepts":[{"id":"workflows","note":"Mismo nombre, aplicado a sistemas con LLM."},{"id":"spec-driven-development","note":"Una variante que parte de la especificación."},{"id":"planning-reasoning","note":"La fase de plan."},{"id":"parallel-agent-development","note":"Variante en paralelo."}],"prerequisites":["agentic-coding"],"tools":["claude-code","openai-codex","cursor"],"sources":[{"title":"Claude Code: Best practices","url":"https://code.claude.com/docs/en/best-practices"},{"title":"Anthropic: Effective harnesses for long-running agents","url":"https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents"},{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"git-worktrees","title":"Git Worktrees","category":"parallel-agents","difficulty":"intermediate","aliases":["worktree","git worktree","árboles de trabajo"],"description":"Una función de Git que permite tener varios directorios de trabajo enlazados a un mismo repositorio, cada uno con su rama activa. Es la base habitual para que varios agentes trabajen a la vez sin pisarse los archivos.","technicalExplanation":"Un repositorio normal tiene un directorio de trabajo con una sola rama activa. `git worktree add` crea directorios adicionales, los **linked worktrees**, que comparten con el principal gran parte de los datos de Git.\n\n**Compartido** entre worktrees: la base de objetos (commits), las referencias `refs/heads/*` y `refs/tags/*`, y la configuración.\n\n**Propio de cada worktree:** `HEAD`, el `index` (área de preparación) y, claro, los archivos del directorio.\n\nFrente a clonar varias veces, no se duplica el historial, y un commit hecho en un worktree es visible al instante en los demás, porque la historia es la misma. Frente a cambiar de rama, no hay que guardar el trabajo ni interrumpir lo que esté corriendo.\n\nHay una regla importante: **una rama solo puede estar activa en un worktree a la vez**. `git worktree add` se niega si ya lo está en otro lugar, salvo con `--force`. Se soluciona con una rama nueva (`-b`) o con `--detach`.","problem":"Si dos agentes trabajan en el mismo directorio, se sobrescriben: uno edita un archivo mientras otro lo lee, comparten el área de preparación y un cambio de rama afecta a ambos. Los worktrees dan a cada agente **sus propios archivos, su propia rama y su propio index**.\n\nTambién resuelven una situación cotidiana: atender un hotfix sin interrumpir una compilación o un trabajo a medias.","howItWorks":"Comandos esenciales:\n\n- `git worktree add ../proyecto-feature -b feature`: crea un directorio con una rama nueva.\n- `git worktree add ../proyecto-bug fix-123`: usa una rama existente.\n- `git worktree list`: muestra los worktrees y su rama.\n- `git worktree remove <ruta>`: elimina uno limpio. Con cambios o archivos sin seguimiento hace falta `--force`.\n- `git worktree prune`: limpia los metadatos de directorios borrados a mano.\n- `git worktree lock`: lo protege de ser eliminado.\n\nCon agentes, Claude Code ofrece `claude --worktree nombre`, que crea el worktree bajo `.claude/worktrees/` en una rama nueva, y `isolation: worktree` para subagentes. Codex, Cursor y Devin Desktop también documentan el uso de worktrees.\n\nTen en cuenta que **un worktree es una copia limpia**: no incluye lo que esté en `.gitignore`, como `node_modules` o `.env`. Hay que instalar dependencias en cada uno. En Claude Code, `.worktreeinclude` copia archivos ignorados.","whenToUse":"Para trabajar en paralelo en tareas independientes, revisar un PR sin tocar lo que tienes a medias, atender un hotfix o comparar comportamientos entre versiones. No son necesarios si solo trabajas en una cosa cada vez y cambiar de rama no molesta.","advantages":["Aislamiento real de archivos e index entre tareas.","Comparten el historial: ocupan menos que varios clones y los commits se ven al momento.","Cambiar de tarea es cambiar de directorio, sin stash.","Función nativa de Git, sin dependencias."],"limitations":["**No evitan los conflictos semánticos ni de merge:** solo los aplazan hasta la integración.","Cada uno necesita sus dependencias y su configuración local.","Comparten recursos de la máquina: puertos, bases de datos locales, CPU.","Una misma rama no puede estar activa en dos a la vez.","Hay que limpiarlos para no acumular directorios."],"example":{"text":"Dos agentes en paralelo. Cada uno trabaja en su directorio y su rama, y se integra después mediante PR.","language":"bash","filename":"terminal","code":"# Desde el repositorio principal\ngit worktree add ../app-auth -b feature/auth\ngit worktree add ../app-billing -b feature/billing\n\n# Un agente en cada terminal\n(cd ../app-auth && claude)\n(cd ../app-billing && claude)\n\n# Ver qué hay en marcha\ngit worktree list\n\n# Limpiar al terminar\ngit worktree remove ../app-auth\ngit worktree remove ../app-billing","explanation":"Hay más detalle en el Playground, con un flujo que hemos ejecutado. Observa que `git worktree remove` no borra la rama, de modo que su trabajo sigue accesible."},"relatedConcepts":[{"id":"parallel-agent-development","note":"Su principal uso con agentes."},{"id":"subagents","note":"Pueden aislarse con `isolation: worktree`."},{"id":"shared-file-conflicts","note":"Evitan choques de archivos en disco, no los conflictos al integrar."}],"prerequisites":[],"tools":["claude-code","openai-codex","cursor","windsurf"],"sources":[{"title":"Git: git-worktree","url":"https://git-scm.com/docs/git-worktree"},{"title":"Claude Code: Run parallel sessions with worktrees","url":"https://code.claude.com/docs/en/worktrees"},{"title":"Devin Desktop: Cascade","url":"https://docs.devin.ai/desktop/cascade/cascade"},{"title":"OpenAI: Codex documentation","url":"https://learn.chatgpt.com/docs"},{"title":"Cursor: índice de documentación (llms.txt)","url":"https://cursor.com/llms.txt"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05","featured":2},{"id":"parallel-agent-development","title":"Parallel Agent Development","category":"parallel-agents","difficulty":"advanced","aliases":["multiple AI agents working simultaneously","agentes en paralelo","varios agentes simultáneos"],"description":"Trabajar con varios agentes a la vez sobre un mismo repositorio, cada uno en una tarea, con aislamiento para no interferir y un proceso para integrar los resultados.","technicalExplanation":"La idea es sencilla; la dificultad está en la coordinación. Hacen falta tres cosas:\n\n- **Aislamiento:** cada agente necesita sus archivos. Lo habitual es un [[git-worktrees|worktree]], o bien un contenedor o un entorno en la nube.\n- **Independencia de las tareas:** si dos agentes tocan el mismo módulo, el aislamiento solo aplaza el problema a la hora de integrar.\n- **Integración:** alguien debe fusionar y comprobar el conjunto. Dos cambios pueden pasar sus tests por separado y fallar juntos.\n\nEl paralelismo tiene un límite que no siempre se ve: **tu capacidad de revisión**. Cuatro agentes producen cuatro diffs que alguien tiene que comprender.\n\nClaude Code cubre varias variantes: sesiones con `--worktree`, subagentes con `isolation: worktree` y sesiones en segundo plano. Devin Desktop puede ejecutar cada sesión en su propio worktree, Codex lo ofrece como opción de entorno, y Cline incluye un tablero Kanban para agentes paralelos.","problem":"Las tareas que no dependen entre sí no tienen por qué esperar a que termine otra. Permite convertir el tiempo de espera en trabajo útil, o probar varios enfoques de un mismo problema y quedarse con el mejor.","howItWorks":"- **Divide:** elige tareas que toquen áreas distintas.\n- **Aísla:** un worktree y una rama por agente.\n- **Prepara:** instala dependencias y evita choques de puertos o bases de datos.\n- **Delega con verificación:** cada encargo incluye cómo comprobarlo.\n- **Revisa:** idealmente, con un agente de contexto limpio además de una persona.\n- **Integra de una en una:** fusiona una rama, actualiza las demás y ejecuta los tests antes de seguir.","whenToUse":"Cuando hay varias tareas independientes, buenos tests y capacidad de revisión. No funciona bien con tareas muy acopladas, repositorios sin tests o cuando el diseño aún no está claro.","advantages":["Reduce el tiempo total en tareas independientes.","Permite comparar varias soluciones.","Aprovecha el tiempo de espera de los agentes."],"limitations":["La revisión y la integración se convierten en el cuello de botella.","Mayor consumo de tokens.","Conflictos si la división es mala.","Cambiar de contexto entre tareas cansa a quien supervisa.","Comparten recursos locales: puertos, bases de datos, CPU."],"example":{"text":"Dos sesiones aisladas lanzadas en paralelo con Claude Code. Cada una trabaja en su propio worktree y su propia rama.","language":"bash","filename":"terminal","code":"claude -p --worktree auth \"Añade rate limiting a /login. Incluye tests.\" &\nclaude -p --worktree docs \"Actualiza la guía de API según el código actual.\" &\nwait\ngit worktree list","explanation":"Como los ejecutas con `-p` (no interactivo), Claude Code no limpia estos worktrees al terminar. Revísalos y elimínalos después con `git worktree remove`."},"relatedConcepts":[{"id":"git-worktrees","note":"El mecanismo de aislamiento más común."},{"id":"orchestrators","note":"Pueden coordinar el trabajo."},{"id":"shared-file-conflicts","note":"El riesgo principal de una mala división."},{"id":"multi-agent-systems","note":"Es un tipo de sistema multiagente."}],"prerequisites":["git-worktrees","agentic-coding"],"tools":["claude-code","openai-codex","cursor","windsurf","cline"],"sources":[{"title":"Claude Code: Run parallel sessions with worktrees","url":"https://code.claude.com/docs/en/worktrees"},{"title":"Claude Code: Subagents","url":"https://code.claude.com/docs/en/sub-agents"},{"title":"Devin Desktop: Cascade","url":"https://docs.devin.ai/desktop/cascade/cascade"},{"title":"OpenAI: Codex documentation","url":"https://learn.chatgpt.com/docs"},{"title":"Cline: Documentation","url":"https://docs.cline.bot/"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"shared-file-conflicts","title":"Shared File Conflicts","category":"parallel-agents","difficulty":"intermediate","aliases":["conflictos de archivos compartidos","archivos calientes"],"description":"Los choques que surgen cuando varios agentes o personas modifican los mismos archivos, tanto en disco como en el momento de integrar.","technicalExplanation":"Hay tres niveles distintos:\n\n- **En disco:** dos agentes en el mismo directorio se sobrescriben. Lo evitan los worktrees.\n- **De merge:** Git no puede combinar cambios en las mismas líneas. Se detectan al integrar.\n- **Semánticos:** Git fusiona sin avisar, pero el resultado está roto, como cuando uno renombra una función que otro empieza a usar. Solo los detectan los tests.\n\nAlgunos archivos concentran estos choques, como listas de rutas, lockfiles o barrels de exports.","problem":"Si se ignoran, se pierde trabajo o se integra código que compila por separado pero falla en conjunto.","howItWorks":"Se reducen dividiendo por módulos, asignando la propiedad de cada zona, serializando cambios en archivos calientes e integrando con frecuencia.","whenToUse":"Tenlo en cuenta al planificar cualquier trabajo en paralelo. Detecta de antemano qué archivos tocará cada tarea.","advantages":["Pensar en ello mejora también el diseño modular."],"limitations":["Los conflictos semánticos pasan desapercibidos sin buenos tests.","Los lockfiles generan conflictos frecuentes y deben regenerarse, no fusionarse a mano."],"example":{"text":"Dos agentes añaden un endpoint y ambos editan `routes.js`. Solución: uno prepara primero el registro de rutas y luego cada uno añade la suya en archivos separados."},"relatedConcepts":[{"id":"git-worktrees","note":"Solo evitan el primer nivel."},{"id":"parallel-agent-development","note":"Donde más aparecen."}],"prerequisites":[],"tools":[],"sources":[{"title":"Pro Git: Basic Branching and Merging","url":"https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"agent-evaluation","title":"Agent Evaluation","category":"agent-quality","difficulty":"advanced","aliases":["evals","evaluación de agentes","testing and evaluation","graders"],"description":"Medir de forma sistemática si un agente cumple sus tareas: ejecutarlo sobre un conjunto de casos varias veces y puntuar los resultados.","technicalExplanation":"Probar un agente no es como probar una función: su salida varía entre ejecuciones y hay muchas rutas válidas hacia el mismo resultado. Anthropic propone este vocabulario en *Demystifying evals*:\n\n- **Task:** prueba con entradas y criterios de éxito.\n- **Trial:** un intento; se hacen varios porque el resultado varía.\n- **Grader:** lógica que puntúa un aspecto del rendimiento.\n- **Transcript:** registro completo de un intento.\n- **Outcome:** estado final del entorno, no lo que el agente dice que hizo.\n- **Evaluation harness:** infraestructura que ejecuta y agrega todo.\n\nHay tres tipos de graders: **por código** (rápido, objetivo, a veces frágil), **por modelo** (flexible, pero no determinista) y **humano** (la mejor referencia, pero lento y caro). Un consejo clave: **evalúa el resultado, no el camino**. Comprobar una secuencia exacta de herramientas es frágil, porque los agentes encuentran soluciones válidas no previstas.\n\nTambién se separan las **evals de capacidad**, que empiezan con baja tasa de acierto y marcan hasta dónde mejorar, de las **evals de regresión**, que deberían rondar el 100% y detectar retrocesos.","problem":"Sin evaluación, no se sabe si un cambio de prompt, modelo o herramienta ha mejorado algo o solo lo parece. Se decide por impresiones basadas en un par de casos, y las regresiones se descubren en producción.","howItWorks":"- **Reúne tareas** a partir de fallos reales. Anthropic sugiere empezar con entre 20 y 50.\n- **Define el éxito** de forma que dos expertos lleguen a la misma conclusión.\n- **Aísla el entorno** de cada intento.\n- **Ejecuta varios intentos** y agrega los resultados.\n- **Lee transcripciones:** los números no explican por qué falla.\n- **Promueve** las tareas superadas al conjunto de regresión y ejecútalo en CI.","whenToUse":"En cuanto un agente vaya a usarse de forma continuada o quieras cambiar de modelo o configuración con confianza. No esperes a tener un conjunto perfecto: unos pocos casos reales ya dan información.","advantages":["Convierte las impresiones en datos.","Detecta regresiones antes que los usuarios.","Permite adoptar modelos nuevos con rapidez.","Las transcripciones ayudan a depurar."],"limitations":["Construir y mantener evals cuesta tiempo.","Ejecutarlas consume tokens y tiempo.","Con pocos casos, las diferencias pueden ser ruido.","Un agente puede optimizarse para pasar la eval sin mejorar de verdad."],"example":{"text":"Grader por código para “arregla este bug”: no pregunta al agente si lo arregló, sino que comprueba el *outcome*.","language":"bash","filename":"grade.sh","code":"#!/usr/bin/env bash\n# Éxito: la prueba del bug pasa y no se rompe ninguna otra.\nnpm test -- tests/regression/issue-142.test.js || exit 1\nnpm test || exit 1\necho \"PASS\"","explanation":"Es determinista y barato. Se complementa con un grader por modelo para aspectos subjetivos, como la calidad del código."},"relatedConcepts":[{"id":"ai-generated-code-testing","note":"Verifica el código generado; las evals, al agente que lo genera."},{"id":"agentic-harness","note":"Permiten medir si una mejora del harness funciona."}],"prerequisites":["ai-agents"],"tools":["claude-code"],"sources":[{"title":"Anthropic: Demystifying evals for AI agents","url":"https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"ai-generated-code-testing","title":"AI-generated Code Testing","category":"agent-quality","difficulty":"intermediate","aliases":["probar código generado por IA","verificación"],"description":"Cómo verificar código generado por IA, que puede parecer correcto, compilar e incluso pasar tests, y aun así no hacer lo que se necesita.","technicalExplanation":"La generación automatizada no elimina la necesidad de verificar, la desplaza. Hay riesgos particulares:\n\n- **Tests que validan el error:** si el mismo agente escribe código y tests, ambos pueden compartir la misma idea equivocada.\n- **Tests debilitados:** para “hacerlos pasar”, un agente puede relajar una aserción o eliminar el test.\n- **Dependencias inventadas:** puede referirse a paquetes o APIs inexistentes.\n\nBöckeler señala que los tests generados por IA aún no son fiables para reducir la supervisión humana del comportamiento. La documentación de buenas prácticas de Claude Code insiste en dar al agente una forma de comprobar su trabajo.","problem":"El código plausible es lo más peligroso: el fallo no se ve a simple vista, y el volumen dificulta revisarlo todo.","howItWorks":"- Escribe o revisa tú los tests clave, antes de la implementación si puedes.\n- Confirma que el test falla sin el arreglo.\n- Vigila los cambios en archivos de test dentro del diff.\n- Usa una revisión separada, con contexto limpio.\n- Comprueba el comportamiento real, no solo los tests.","whenToUse":"En todo código generado que vaya a usarse de verdad, con más rigor cuanto mayor sea el riesgo.","advantages":["Reduce errores plausibles.","Permite delegar con más confianza."],"limitations":["Exige tiempo y criterio.","Ninguna técnica sustituye a entender qué debe hacer el sistema."],"example":{"text":"En la revisión de un agente, `git diff --stat tests/` es una comprobación rápida: si se ha modificado un test ya existente para hacer pasar la solución, hay que entender por qué."},"relatedConcepts":[{"id":"agent-evaluation","note":"Evalúa al agente; esto, al código."},{"id":"harness-engineering","note":"Los sensores automatizan parte de esto."}],"prerequisites":[],"tools":["claude-code"],"sources":[{"title":"Birgitta Böckeler: Harness engineering for coding agent users","url":"https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html","note":"martinfowler.com, 2 de abril de 2026"},{"title":"Claude Code: Best practices","url":"https://code.claude.com/docs/en/best-practices"},{"title":"Anthropic: Effective harnesses for long-running agents","url":"https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"automated-code-review","title":"Automated Code Review","category":"agent-quality","difficulty":"intermediate","aliases":["revisión automática","AI code review"],"description":"Herramientas, incluidos modelos de IA, que analizan un cambio y comentan posibles problemas antes o junto con la revisión humana.","technicalExplanation":"Tiene dos familias: **deterministas** (linters y escáneres, con reglas fijas) e **inferenciales** (un modelo analiza el diff). Las segundas pueden detectar problemas semánticos, pero pueden generar falsos positivos y pasar por alto errores. Ejemplos: Copilot code review, Claude Code en GitHub Actions o GitHub Code Review. Un agente revisor con contexto limpio evita el sesgo de quien escribió el código.","problem":"La revisión humana no escala con el volumen de código que producen los agentes.","howItWorks":"En cada PR se ejecuta la revisión, se publican comentarios y una persona decide.","whenToUse":"Como primera pasada que libera a las personas de lo mecánico. No debería ser la única barrera en cambios de riesgo.","advantages":["Inmediata y siempre disponible.","Detecta errores comunes."],"limitations":["Los falsos positivos generan ruido y se acaban ignorando.","Puede dar una falsa sensación de seguridad."],"example":{"text":"Un workflow lanza un agente de solo lectura sobre cada PR. Su instrucción pide informar solo de errores con un escenario concreto de fallo, para reducir el ruido."},"relatedConcepts":[{"id":"subagents","note":"Un revisor de solo lectura es un subagente típico."}],"prerequisites":[],"tools":["claude-code","github-copilot"],"sources":[{"title":"GitHub Docs: What is GitHub Copilot?","url":"https://docs.github.com/en/copilot/get-started/what-is-github-copilot"},{"title":"Claude Code: overview","url":"https://code.claude.com/docs/en/overview"},{"title":"Birgitta Böckeler: Harness engineering for coding agent users","url":"https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html","note":"martinfowler.com, 2 de abril de 2026"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"terminal-agents","title":"Terminal Agents","category":"agent-tools","difficulty":"intermediate","aliases":["agentes de terminal","CLI agents","terminal coding agents"],"description":"Agentes de código que se usan desde la línea de comandos, como Claude Code, Codex CLI, Gemini CLI, Aider o Copilot CLI.","technicalExplanation":"Trabajan directamente con los archivos del directorio actual y con tus herramientas: git, tests, compiladores. Al ser programas de terminal, se integran bien con scripts y CI, y se pueden encadenar con otros comandos. Claude Code, por ejemplo, admite `claude -p` para ejecuciones no interactivas.","problem":"Llevan el agente al entorno donde ya están tus herramientas, sin depender de un editor concreto.","howItWorks":"Se lanza el comando en un repositorio, y el agente lee, edita y ejecuta, pidiendo permiso según su configuración.","whenToUse":"Si trabajas a menudo en terminal, quieres automatizar o usar varios agentes en paralelo con worktrees.","advantages":["Independientes del editor.","Fáciles de automatizar."],"limitations":["Revisar diffs es menos cómodo sin interfaz gráfica.","Acceso potente a tu sistema: cuida los permisos."],"example":{"language":"bash","filename":"terminal","code":"git diff main --name-only | claude -p \"Revisa estos archivos en busca de errores de seguridad\"","explanation":"Ejemplo basado en la documentación de Claude Code."},"relatedConcepts":[{"id":"ai-coding-assistants","note":"Categoría más amplia."},{"id":"parallel-agent-development","note":"Se combinan bien con worktrees."}],"prerequisites":[],"tools":["claude-code","openai-codex","gemini-cli","aider","cline","github-copilot"],"sources":[{"title":"Claude Code: overview","url":"https://code.claude.com/docs/en/overview"},{"title":"Gemini CLI: Documentation","url":"https://geminicli.com/docs/"},{"title":"Aider: Documentation","url":"https://aider.chat/docs/"},{"title":"GitHub Docs: About GitHub Copilot CLI","url":"https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli"},{"title":"Cline: Documentation","url":"https://docs.cline.bot/"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"ai-coding-assistants","title":"AI Coding Assistants","category":"agent-tools","difficulty":"beginner","aliases":["asistentes de código"],"description":"Herramientas que ayudan a programar con modelos de IA, mediante sugerencias, chat o modos de agente dentro del entorno de desarrollo.","technicalExplanation":"Es una categoría amplia y cambiante. GitHub Copilot la popularizó con sugerencias en línea, y hoy la mayoría de productos combina autocompletado, chat y agentes. Las capacidades dependen del plan y de la versión, por lo que conviene consultar las fichas y su fecha de verificación.","problem":"Reduce el trabajo repetitivo y acerca la información al lugar donde se escribe código.","howItWorks":"Se integran en el editor o la terminal, reúnen contexto del proyecto y llaman a un modelo.","whenToUse":"Prácticamente en cualquier flujo; revisa las políticas de privacidad de tu organización.","advantages":["Mejora el flujo de trabajo diario.","Barrera de entrada baja."],"limitations":["Sugerencias plausibles pero incorrectas.","Cuestiones de privacidad y licencias."],"example":{"text":"Escribes el nombre de una función y un comentario, y el asistente propone una implementación que revisas y aceptas o rechazas."},"relatedConcepts":[{"id":"assistants-vs-agents","note":"Distingue los modos de trabajo."},{"id":"terminal-agents","note":"Una variante."},{"id":"ai-assisted-development","note":"La práctica."}],"prerequisites":[],"tools":["github-copilot","cursor","cline","windsurf"],"sources":[{"title":"GitHub Docs: What is GitHub Copilot?","url":"https://docs.github.com/en/copilot/get-started/what-is-github-copilot"},{"title":"GitHub Blog: Copilot is generally available","url":"https://github.blog/2022-06-21-github-copilot-is-generally-available-to-all-developers/","note":"21 de junio de 2022"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"},{"id":"mcp-servers","title":"MCP Servers","category":"agent-tools","difficulty":"intermediate","aliases":["servidores MCP"],"description":"Programas que exponen herramientas, datos y plantillas a aplicaciones de IA mediante el protocolo MCP.","technicalExplanation":"Un servidor puede ser un proceso local, por stdio, o un servicio remoto, por Streamable HTTP. Expone **tools**, **resources** y **prompts**. La especificación insiste en que cada servidor se centre en una responsabilidad y en que no pueda leer toda la conversación. Como es código con acceso a tus sistemas, conviene evaluarlo como cualquier dependencia.","problem":"Encapsula el acceso a un sistema en un componente reutilizable por varios clientes.","howItWorks":"Se configura en el cliente, por ejemplo con `.mcp.json` o `claude mcp add`, y sus herramientas pasan a estar disponibles para el agente.","whenToUse":"Cuando el agente necesita un sistema al que no llega de otra forma. Instala solo los que uses.","advantages":["Reutilizable entre clientes.","Encapsula autenticación y detalles."],"limitations":["Riesgo de seguridad si es de terceros.","Sus definiciones consumen contexto."],"example":{"language":"bash","filename":"terminal","code":"claude mcp add --transport http notion https://mcp.notion.com/mcp\nclaude mcp list"},"relatedConcepts":[{"id":"mcp","note":"El protocolo."},{"id":"tools-agent","note":"Lo que aportan al agente."},{"id":"permissions","note":"Hay que controlar qué pueden hacer."}],"prerequisites":["mcp"],"tools":["claude-code","mcp-inspector","cline"],"sources":[{"title":"MCP Specification 2026-07-28: Architecture","url":"https://modelcontextprotocol.io/specification/2026-07-28/architecture"},{"title":"Claude Code: MCP","url":"https://code.claude.com/docs/en/mcp"},{"title":"Cline: MCP overview","url":"https://docs.cline.bot/mcp/mcp-overview"}],"status":"verified","lastVerified":"2026-11-05","addedAt":"2026-11-05"},{"id":"model-providers","title":"Model Providers","category":"agent-tools","difficulty":"beginner","aliases":["proveedores de modelos","LLM providers","Anthropic","OpenAI","Google"],"description":"Las empresas y plataformas que ofrecen modelos de lenguaje por API, como Anthropic, OpenAI o Google, y las opciones para ejecutarlos localmente.","technicalExplanation":"Algunos agentes están vinculados a un proveedor, y otros, como Aider o Cline, permiten elegir entre muchos, incluidos modelos locales con Ollama o LM Studio. Elegir es un equilibrio entre calidad, coste, latencia, tamaño de contexto y privacidad. El sector cambia tan rápido que comparativas y precios caducan pronto, por lo que esta ficha no los recoge.","problem":"Hace falta decidir qué modelo usar según la tarea, el coste y las restricciones de datos.","howItWorks":"Se accede por API con una clave o mediante una suscripción de la herramienta.","whenToUse":"Al configurar una herramienta. Compara con tus propias tareas, no solo con rankings públicos.","advantages":["Permite elegir según la necesidad."],"limitations":["Información que caduca pronto.","Cada proveedor tiene sus propias políticas de datos."],"example":{"text":"Un equipo usa un modelo potente para planificar y uno más barato para búsquedas de subagentes, una opción que permite el campo `model` en Claude Code."},"relatedConcepts":[{"id":"ai-agents","note":"El modelo es el componente que decide."},{"id":"agent-evaluation","note":"Permite compararlos con datos propios."}],"prerequisites":[],"tools":["aider","cline"],"sources":[{"title":"Aider: Documentation","url":"https://aider.chat/docs/"},{"title":"Cline: Documentation","url":"https://docs.cline.bot/"},{"title":"Claude Code: Subagents","url":"https://code.claude.com/docs/en/sub-agents"}],"status":"needs-review","lastVerified":null,"addedAt":"2026-11-05"}],"examples":[{"id":"agents-md-monorepo","title":"AGENTS.md para un monorepo","topic":"AGENTS.md","objective":"Dar a cualquier agente de código las instrucciones mínimas para trabajar en un monorepo, con reglas específicas para un paquete.","context":"Un monorepo con frontend y API. El equipo usa más de una herramienta, así que no quiere mantener un archivo de instrucciones por producto.","implementation":"Coloca un archivo breve en la raíz y otro más específico en cada paquete que lo necesite. Incluye solo lo que el agente no puede deducir del código y lo que no comprueba ya una herramienta.","files":[{"path":"AGENTS.md","language":"markdown","code":"# Instrucciones para agentes\n\n## Estructura\n- `packages/web`: frontend en React.\n- `packages/api`: API en Node.js. Tiene su propio AGENTS.md.\n\n## Comandos\n- Instalar: `pnpm install`\n- Tests de un paquete: `pnpm --filter <paquete> test`\n- Lint: `pnpm lint`\n\n## Antes de terminar\n- Ejecuta los tests de los paquetes que hayas modificado.\n- No edites `pnpm-lock.yaml` a mano; regenéralo con `pnpm install`.\n\n## Pull requests\n- Título: `[paquete] descripción`.\n- Explica en la descripción cómo has probado el cambio."},{"path":"packages/api/AGENTS.md","language":"markdown","code":"# API\n\n- Las migraciones van en `migrations/` y nunca se editan una vez fusionadas.\n- Los tests de integración necesitan Docker en marcha: `pnpm test:integration`.\n- Las rutas no acceden a la base de datos: usan servicios de `src/services`."}],"parts":[{"label":"Estructura","text":"Un mapa breve evita que el agente gaste contexto explorando."},{"label":"Comandos","text":"Es lo más valioso: comandos exactos, que el agente puede ejecutar para comprobar su trabajo."},{"label":"Antes de terminar","text":"Define qué significa “terminado”. Recuerda que es una instrucción, no una garantía."},{"label":"packages/api/AGENTS.md","text":"Según agents.md, los agentes leen el archivo más cercano en el árbol de directorios, y ese tiene prioridad. El grado de soporte varía según la herramienta."}],"expected":"Un agente que trabaja en `packages/api` conoce los comandos, sabe que debe ejecutar los tests y respeta la regla de las migraciones sin que nadie se lo repita.","whenToUse":"En cualquier repositorio donde se usen agentes, sobre todo si el equipo utiliza varias herramientas.","limitations":["No se hace cumplir: lo crítico debe ir también en un hook o en CI.","Cada herramienta carga los archivos anidados a su manera: compruébalo en la tuya.","Hay que mantenerlo al día cuando cambien los comandos."],"concepts":["agents-md","claude-md","context-engineering"],"sources":[{"title":"AGENTS.md","url":"https://agents.md/","note":"Sitio oficial del formato"},{"title":"Claude Code: How Claude remembers your project","url":"https://code.claude.com/docs/en/memory"}],"status":"verified","lastVerified":"2026-11-05"},{"id":"agents-md-python-lib","title":"AGENTS.md de una biblioteca Python","topic":"AGENTS.md","objective":"Dar a un agente lo imprescindible para contribuir a una biblioteca con usuarios externos.","context":"En una biblioteca, lo que más daña es romper la API pública. El archivo prioriza esa regla y los comandos para comprobar el trabajo.","implementation":"Colócalo en la raíz. Cambia los comandos por los tuyos y borra lo que ya impongan el linter o la CI.","files":[{"path":"AGENTS.md","language":"markdown","code":"# Instrucciones para agentes\n\n## Comandos\n- Instalar: `uv sync`\n- Tests: `uv run pytest`\n- Tipos y lint: `uv run mypy src && uv run ruff check .`\n\nEjecuta los tres antes de dar una tarea por terminada.\n\n## API pública\n- Lo exportado en `src/mi_lib/__init__.py` es API pública.\n- No cambies su firma sin añadir antes un aviso de obsolescencia.\n- Todo cambio visible va en `CHANGELOG.md`, en la sección `Unreleased`.\n\n## Tests\n- Cada corrección de bug incluye un test que falle sin el arreglo.\n- No uses la red en los tests: usa los fixtures de `tests/fixtures`.\n\n## Dependencias\n- No añadas dependencias de ejecución sin indicarlo en la descripción del PR."}],"parts":[{"label":"Comandos","text":"El agente puede comprobar su trabajo sin preguntar."},{"label":"API pública","text":"Lo que el agente no deduce del código: qué no debe romper."},{"label":"Dependencias","text":"Una regla que los agentes suelen pasar por alto si no se indica."}],"expected":"El agente ejecuta las comprobaciones y evita romper la API, o avisa si debe hacerlo.","whenToUse":"En bibliotecas y SDK con usuarios externos.","limitations":["Las instrucciones no se hacen cumplir: una comprobación de API en CI es más fiable.","Los comandos dependen de tu proyecto."],"concepts":["agents-md","context-engineering"],"sources":[{"title":"AGENTS.md","url":"https://agents.md/"}],"status":"verified","lastVerified":"2026-11-05"},{"id":"agents-md-frontend","title":"AGENTS.md de una aplicación frontend","topic":"AGENTS.md","objective":"Evitar que el agente invente componentes y rompa el sistema de diseño.","context":"En frontend, un error habitual es crear otro botón en lugar de usar el que existe. También es útil decir cómo comprobar el resultado visual.","implementation":"Señala dónde están las piezas existentes, en lugar de describirlas. Así el agente las lee cuando las necesita y el archivo sigue siendo breve.","files":[{"path":"AGENTS.md","language":"markdown","code":"# Instrucciones para agentes\n\n## Comandos\n- Desarrollo: `pnpm dev` (puerto 3000)\n- Tests: `pnpm test`\n- E2E: `pnpm e2e` (requiere `pnpm dev` en marcha)\n\n## Interfaz\n- Antes de crear un componente, busca en `src/components/ui`.\n- Colores y espacios salen de `src/styles/tokens.css`. No escribas valores fijos.\n- Los textos van en `src/i18n/es.json`, no en los componentes.\n\n## Comprobar un cambio visual\n- Abre la página afectada y revísala en móvil y escritorio.\n- Comprueba que se puede usar con teclado.\n\n## No tocar\n- `src/generated/` se genera con `pnpm codegen`."}],"parts":[{"label":"Busca en src/components/ui","text":"Un puntero en lugar de una lista: no se queda obsoleto tan rápido."},{"label":"Comprobar un cambio visual","text":"Los tests no ven la interfaz. Indica cómo comprobarla."},{"label":"No tocar","text":"Los archivos generados son una trampa habitual: se editan y se pierden."}],"expected":"El agente reutiliza componentes y tokens, y comprueba el resultado en lugar de darlo por bueno.","whenToUse":"En aplicaciones con sistema de diseño o con internacionalización.","limitations":["Para comprobar visualmente, el agente necesita acceso a un navegador.","Un linter puede imponer los tokens de forma más fiable."],"concepts":["agents-md","rules"],"sources":[{"title":"AGENTS.md","url":"https://agents.md/"}],"status":"verified","lastVerified":"2026-11-05"},{"id":"agents-md-one-source","title":"Una sola fuente de instrucciones para todo el equipo","topic":"AGENTS.md","objective":"Mantener un único archivo de instrucciones aunque el equipo use varias herramientas.","context":"Si cada persona usa una herramienta, es fácil acabar con varios archivos desincronizados. Codex, Cursor y Copilot leen `AGENTS.md` directamente; otras necesitan un paso más.","implementation":"Escribe todo en `AGENTS.md`. Añade un archivo específico solo si tu herramienta lo necesita, y deja en él solo lo que sea exclusivo de esa herramienta.","files":[{"path":"AGENTS.md","language":"markdown","code":"# Instrucciones para agentes\n\n- Tests: `npm test`\n- La lógica de negocio va en `src/domain`."},{"tool":"Claude Code","path":"CLAUDE.md","language":"markdown","code":"@AGENTS.md\n\n## Solo para Claude Code\n- Usa plan mode antes de cambios en más de tres archivos."},{"tool":"Aider","path":".aider.conf.yml","language":"yaml","code":"read: AGENTS.md"}],"parts":[{"label":"@AGENTS.md","text":"Claude Code importa el archivo. Sin `CLAUDE.md`, lo lee directamente, de modo que este archivo solo hace falta si añades algo propio."},{"label":"read:","text":"Aider carga el archivo como contexto de solo lectura."},{"label":"Gemini CLI","text":"Usa `GEMINI.md` y el sitio de AGENTS.md lo cita como compatible: comprueba en su documentación cómo configurarlo en tu versión."}],"expected":"Un cambio en `AGENTS.md` llega a todas las herramientas sin copiarlo.","whenToUse":"Cuando conviven varias herramientas en un equipo.","limitations":["Instrucciones muy ligadas a una herramienta confunden a las demás.","Cada herramienta tiene sus propios límites de tamaño y de carga."],"concepts":["agents-md","claude-md"],"sources":[{"title":"AGENTS.md","url":"https://agents.md/"},{"title":"Claude Code: How Claude remembers your project","url":"https://code.claude.com/docs/en/memory"}],"status":"verified","lastVerified":"2026-11-05"},{"id":"skill-release-notes","title":"Skill portable para notas de versión","topic":"Skills","objective":"Empaquetar un procedimiento repetible en una skill que funcione en varias herramientas.","context":"Cada versión requiere resumir los commits con el formato del equipo. Son demasiadas instrucciones para llevarlas siempre en `AGENTS.md`, y solo se usan de vez en cuando.","implementation":"Crea la skill en `.agents/skills/`, la carpeta que leen Codex, Cursor, Gemini CLI y GitHub Copilot. Usa solo los campos de la especificación abierta para que siga siendo portable.","files":[{"path":".agents/skills/release-notes/SKILL.md","language":"markdown","code":"---\nname: release-notes\ndescription: Redacta notas de versión a partir de los commits desde la última etiqueta. Úsala cuando pidan notas de versión o un changelog.\n---\n\n1. Busca la última etiqueta con `git describe --tags --abbrev=0`.\n2. Lista los commits con `git log <etiqueta>..HEAD --oneline`.\n3. Agrupa los cambios en: Novedades, Correcciones y Otros.\n4. Explica el efecto para quien usa el producto, no el detalle interno.\n5. Omite los commits que solo afecten a tests o a formato.\n6. Si no ves claro un cambio, indícalo en lugar de suponer qué hace."}],"parts":[{"label":"name","text":"Obligatorio. Minúsculas, números y guiones, y debe coincidir con el nombre de la carpeta."},{"label":"description","text":"Obligatorio. Es lo único que se carga al inicio: debe decir qué hace y cuándo usarla."},{"label":"Pasos numerados","text":"Dan un orden fijo. Puedes mover los pasos deterministas a un archivo en `scripts/`."},{"label":"Último paso","text":"Indica qué hacer ante la duda, para reducir invenciones."}],"expected":"Al pedir “prepara las notas de versión”, el agente activa la skill y devuelve el texto agrupado, basándose en commits reales.","whenToUse":"Con procedimientos de varios pasos que se repiten, pero que no se usan en cada sesión.","limitations":["Necesita al menos una etiqueta de Git.","Claude Code usa `.claude/skills/`; Cursor y Copilot también leen esa carpeta.","La activación automática depende de la descripción: pruébala con peticiones naturales."],"concepts":["skills","context-engineering","workflows"],"sources":[{"title":"Agent Skills: Specification","url":"https://agentskills.io/specification"}],"status":"verified","lastVerified":"2026-11-05"},{"id":"skill-db-migration","title":"Skill con script para revisar migraciones","topic":"Skills","tested":"Script ejecutado con cuatro migraciones de prueba: detecta las dos peligrosas.","objective":"Combinar instrucciones con un script determinista para los pasos que no deben quedar al criterio del modelo.","context":"Una migración de base de datos mal escrita puede bloquear una tabla o borrar datos. Algunas de esas comprobaciones se pueden hacer con código, y la skill reúne ambas cosas.","implementation":"Crea la estructura de la especificación: `SKILL.md`, un script en `scripts/` y una referencia en `references/`. El agente solo lee la referencia si la necesita.","files":[{"path":".agents/skills/review-migration/SKILL.md","language":"markdown","code":"---\nname: review-migration\ndescription: Revisa migraciones SQL antes de aplicarlas. Úsala al crear o modificar archivos en migrations/ o si preguntan si una migración es segura.\n---\n\n1. Ejecuta `node scripts/check-migration.mjs <archivo>`.\n2. Si informa de un problema, explícalo y propón una alternativa.\n   Para los patrones habituales, consulta references/patterns.md.\n3. Aunque pase, comprueba que la migración es reversible.\n4. Nunca apliques la migración: la decisión es de una persona."},{"path":".agents/skills/review-migration/scripts/check-migration.mjs","language":"javascript","code":"// Uso: node check-migration.mjs <archivo.sql>\nimport { readFileSync } from 'node:fs';\n\nconst file = process.argv[2];\nconst sql = readFileSync(file, 'utf8');\nconst rules = [\n  [/\\bDROP\\s+(TABLE|COLUMN)\\b/i, 'Borra datos: requiere aprobación humana.'],\n  [/\\bALTER\\s+COLUMN\\b.*\\bTYPE\\b/i, 'Cambiar un tipo puede bloquear la tabla.'],\n  [/\\bADD\\s+COLUMN\\b(?![^;]*\\bDEFAULT\\b)[^;]*\\bNOT\\s+NULL\\b/i, 'NOT NULL sin DEFAULT falla si la tabla tiene filas.'],\n];\nconst problems = rules.filter(([rule]) => rule.test(sql)).map(([, message]) => message);\n\nif (problems.length) {\n  problems.forEach((p) => console.error(`${file}: ${p}`));\n  process.exit(1);\n}\nconsole.log(`${file}: sin problemas detectados`);"},{"path":".agents/skills/review-migration/references/patterns.md","language":"markdown","code":"# Patrones seguros\n\n## Añadir una columna obligatoria\n1. Añádela como opcional.\n2. Rellena los datos existentes.\n3. Añade la restricción NOT NULL.\n\n## Eliminar una columna\n1. Deja de usarla en el código y despliega.\n2. Elimínala en una migración posterior."}],"parts":[{"label":"description","text":"Incluye la carpeta `migrations/` para que se active al trabajar en ella."},{"label":"scripts/","text":"Los scripts se ejecutan; su código no tiene por qué cargarse en contexto."},{"label":"references/","text":"Solo ocupa contexto cuando se lee: divulgación progresiva."},{"label":"Paso 4","text":"Es una instrucción. Para garantizarlo, bloquea el comando con un hook."}],"expected":"Con `ADD COLUMN b text NOT NULL`, el script avisa de que falla si la tabla tiene filas, y el agente propone los pasos seguros.","whenToUse":"Cuando un procedimiento mezcla comprobaciones objetivas con criterio.","limitations":["Las reglas por texto no entienden SQL: pueden fallar en casos complejos.","La lista de reglas es un ejemplo, no una cobertura completa.","Las rutas del script dependen de cómo tu herramienta ejecute la skill."],"concepts":["skills","guardrails","context-engineering"],"sources":[{"title":"Agent Skills: Specification","url":"https://agentskills.io/specification"}],"status":"verified","lastVerified":"2026-11-05"},{"id":"skill-pr-description","title":"Skill con plantilla para descripciones de PR","topic":"Skills","objective":"Que todos los PR, los escriba quien los escriba, sigan el mismo formato.","context":"Las plantillas son material que no hace falta cargar hasta usarlo. La especificación propone `assets/` para ese tipo de recursos.","implementation":"Guarda la plantilla aparte, y usa instrucciones breves que indiquen de dónde sale cada dato.","files":[{"path":".agents/skills/pr-description/SKILL.md","language":"markdown","code":"---\nname: pr-description\ndescription: Redacta la descripción de un pull request con la plantilla del equipo. Úsala al abrir un PR o si piden describir los cambios.\n---\n\n1. Lee el diff con `git diff main...HEAD`.\n2. Rellena assets/template.md.\n3. En \"Cómo se ha probado\", incluye solo lo que hayas ejecutado de verdad.\n4. Si algo queda sin probar, indícalo en esa misma sección."},{"path":".agents/skills/pr-description/assets/template.md","language":"markdown","code":"## Qué cambia\n\n## Por qué\n\n## Cómo se ha probado\n\n## Riesgos"}],"parts":[{"label":"assets/template.md","text":"La plantilla se puede editar sin tocar las instrucciones."},{"label":"Paso 3","text":"Reduce un problema real: descripciones que afirman pruebas que no se han hecho."}],"expected":"Un PR con las cuatro secciones, basado en el diff real.","whenToUse":"Si quieres un formato común de PR o cualquier otro documento recurrente.","limitations":["Si es muy simple, puede bastar una plantilla de PR de la propia plataforma."],"concepts":["skills","workflows"],"sources":[{"title":"Agent Skills: Specification","url":"https://agentskills.io/specification"}],"status":"verified","lastVerified":"2026-11-05"},{"id":"subagent-reviewer","title":"Subagente revisor en cinco herramientas","topic":"Subagents","objective":"Revisar cambios con una mirada independiente y, donde sea posible, con la garantía de que el revisor no modifica nada.","context":"Quien acaba de escribir un código tiende a validarlo. Un agente con contexto limpio puede encontrar otros problemas. La idea es la misma en todas las herramientas, pero el formato y lo que se puede restringir cambian.","implementation":"Elige tu herramienta en las pestañas. Después, pide al agente principal que use `reviewer` sobre el diff actual, indicándole también el objetivo del cambio.","files":[{"tool":"Cursor","path":".cursor/agents/reviewer.md","language":"markdown","code":"---\nname: reviewer\ndescription: Revisa los cambios en busca de errores reales. Úsalo antes de abrir un PR.\nreadonly: true\n---\n\nRevisa solo lo que te indiquen e informa únicamente de problemas que puedan\nprovocar un fallo. Por cada hallazgo, indica archivo, línea y un escenario concreto.\nSi no encuentras nada, dilo: no inventes hallazgos."},{"tool":"Codex","path":".codex/agents/reviewer.toml","language":"toml","code":"name = \"reviewer\"\ndescription = \"Revisa los cambios en busca de errores reales. Úsalo antes de abrir un PR.\"\ndeveloper_instructions = \"\"\"\nNo modifiques ningún archivo.\nRevisa solo lo que te indiquen e informa únicamente de problemas que puedan\nprovocar un fallo. Por cada hallazgo, indica archivo, línea y un escenario concreto.\nSi no encuentras nada, dilo: no inventes hallazgos.\n\"\"\""},{"tool":"Gemini CLI","path":".gemini/agents/reviewer.md","language":"markdown","code":"---\nname: reviewer\ndescription: Revisa los cambios en busca de errores reales. Úsalo antes de abrir un PR.\n---\n\nNo modifiques ningún archivo.\nRevisa solo lo que te indiquen e informa únicamente de problemas que puedan\nprovocar un fallo. Por cada hallazgo, indica archivo, línea y un escenario concreto.\nSi no encuentras nada, dilo: no inventes hallazgos."},{"tool":"GitHub Copilot","path":"reviewer.agent.md","language":"markdown","code":"---\nname: reviewer\ndescription: Revisa los cambios en busca de errores reales. Úsalo antes de abrir un PR.\ntools: [\"read\"]\n---\n\nRevisa solo lo que te indiquen e informa únicamente de problemas que puedan\nprovocar un fallo. Por cada hallazgo, indica archivo, línea y un escenario concreto.\nSi no encuentras nada, dilo: no inventes hallazgos."},{"tool":"Claude Code","path":".claude/agents/reviewer.md","language":"markdown","code":"---\nname: reviewer\ndescription: Revisa los cambios en busca de errores reales. Úsalo antes de abrir un PR.\ntools: Read, Grep, Glob\n---\n\nRevisa solo lo que te indiquen e informa únicamente de problemas que puedan\nprovocar un fallo. Por cada hallazgo, indica archivo, línea y un escenario concreto.\nSi no encuentras nada, dilo: no inventes hallazgos."}],"parts":[{"label":"description","text":"En todas las herramientas sirve para decidir cuándo delegar."},{"label":"readonly (Cursor)","text":"Bloquea la edición de archivos."},{"label":"tools (Copilot, Claude Code)","text":"Limita lo que puede usar. Sin herramientas de edición, no puede modificar nada."},{"label":"“No modifiques” (Codex, Gemini)","text":"Aquí es una instrucción, no una garantía. En Codex, el agente hereda los permisos del padre; en Gemini CLI puedes añadir el campo `tools`."},{"label":"Cuerpo","text":"Pedir un escenario concreto reduce los falsos positivos, y permitir “no hay nada” evita hallazgos inventados."}],"expected":"El revisor devuelve una lista corta de hallazgos, o indica que no encuentra problemas, sin llenar el contexto principal.","whenToUse":"Antes de abrir un PR o tras una sesión larga con el mismo código.","limitations":["No sustituye a los tests ni a la revisión humana.","El subagente no ve la conversación: dale el objetivo y el alcance.","Los formatos no se han probado en cada herramienta: se basan en su documentación."],"concepts":["subagents","automated-code-review","permissions"],"sources":[{"title":"Cursor: Subagents","url":"https://cursor.com/docs/subagents"},{"title":"Codex: Subagents","url":"https://learn.chatgpt.com/docs/agent-configuration/subagents"},{"title":"Gemini CLI: Subagents","url":"https://geminicli.com/docs/core/subagents/"},{"title":"GitHub Docs: Custom agents configuration","url":"https://docs.github.com/en/copilot/reference/custom-agents-configuration"},{"title":"Claude Code: Subagents","url":"https://code.claude.com/docs/en/sub-agents"}],"status":"verified","lastVerified":"2026-11-05"},{"id":"subagent-test-runner","title":"Subagente que ejecuta los tests y resume","topic":"Subagents","objective":"Evitar que la salida larga de los tests llene el contexto principal.","context":"Una suite puede imprimir miles de líneas, de las que solo importan unas pocas. Es el caso ideal para un subagente, que además puede usar un modelo más económico.","implementation":"Crea el subagente en tu herramienta. Limítalo a ejecutar y resumir, sin intentar arreglar nada, para que las decisiones sigan en el agente principal.","files":[{"tool":"Cursor","path":".cursor/agents/test-runner.md","language":"markdown","code":"---\nname: test-runner\ndescription: Ejecuta los tests y resume los fallos. Úsalo cuando haya que ejecutar la suite.\nreadonly: true\n---\n\nEjecuta los tests. Devuelve solo: número de tests, nombres de los que fallan\ny el primer error de cada uno. No intentes arreglar nada."},{"tool":"Codex","path":".codex/agents/test-runner.toml","language":"toml","code":"name = \"test_runner\"\ndescription = \"Ejecuta los tests y resume los fallos. Úsalo cuando haya que ejecutar la suite.\"\ndeveloper_instructions = \"\"\"\nEjecuta los tests. Devuelve solo: número de tests, nombres de los que fallan\ny el primer error de cada uno. No intentes arreglar nada.\n\"\"\""},{"tool":"Gemini CLI","path":".gemini/agents/test-runner.md","language":"markdown","code":"---\nname: test-runner\ndescription: Ejecuta los tests y resume los fallos. Úsalo cuando haya que ejecutar la suite.\nmax_turns: 5\n---\n\nEjecuta los tests. Devuelve solo: número de tests, nombres de los que fallan\ny el primer error de cada uno. No intentes arreglar nada."},{"tool":"Claude Code","path":".claude/agents/test-runner.md","language":"markdown","code":"---\nname: test-runner\ndescription: Ejecuta los tests y resume los fallos. Úsalo cuando haya que ejecutar la suite.\ntools: Bash, Read\n---\n\nEjecuta los tests. Devuelve solo: número de tests, nombres de los que fallan\ny el primer error de cada uno. No intentes arreglar nada."}],"parts":[{"label":"Formato de salida","text":"Es lo que hace útil al subagente: el agente principal recibe unas líneas en lugar de miles."},{"label":"No intentes arreglar nada","text":"Separa diagnosticar de decidir."},{"label":"max_turns (Gemini CLI)","text":"Limita cuánto puede trabajar."},{"label":"readonly (Cursor)","text":"Bloquea editar archivos. Comprueba que permite ejecutar los tests en tu versión."}],"expected":"Un resumen como “120 tests, 2 fallan: `test_login` con KeyError…”.","whenToUse":"Con suites de salida larga o si ejecutas los tests a menudo durante una tarea.","limitations":["Un resumen puede omitir un detalle necesario.","Si la suite es corta, ejecutarla directamente es más simple.","Formatos basados en documentación, sin probar en cada herramienta."],"concepts":["subagents","context-management"],"sources":[{"title":"Cursor: Subagents","url":"https://cursor.com/docs/subagents"},{"title":"Codex: Subagents","url":"https://learn.chatgpt.com/docs/agent-configuration/subagents"},{"title":"Gemini CLI: Subagents","url":"https://geminicli.com/docs/core/subagents/"},{"title":"Claude Code: Subagents","url":"https://code.claude.com/docs/en/sub-agents"}],"status":"verified","lastVerified":"2026-11-05"},{"id":"rules-path-scoped","title":"Reglas que solo se aplican a una carpeta","topic":"Rules","objective":"Aplicar una convención solo en una parte del repositorio, sin cargarla en cada tarea.","context":"Las reglas de los tests de integración no importan al tocar la interfaz. Cursor y GitHub Copilot permiten vincular instrucciones a rutas; con `AGENTS.md`, la alternativa es un archivo en esa carpeta.","implementation":"Elige el formato de tu herramienta. Mantén cada regla corta y sobre una sola cosa.","files":[{"tool":"Cursor","path":".cursor/rules/integration-tests.mdc","language":"markdown","code":"---\ndescription: Convenciones de los tests de integración\nglobs: tests/integration/**\nalwaysApply: false\n---\n\n- Usa la base de datos del contenedor, no mocks.\n- Cada test crea y borra sus propios datos."},{"tool":"GitHub Copilot","path":".github/instructions/integration-tests.instructions.md","language":"markdown","code":"---\napplyTo: \"tests/integration/**\"\n---\n\n- Usa la base de datos del contenedor, no mocks.\n- Cada test crea y borra sus propios datos."},{"tool":"AGENTS.md","path":"tests/integration/AGENTS.md","language":"markdown","code":"- Usa la base de datos del contenedor, no mocks.\n- Cada test crea y borra sus propios datos."}],"parts":[{"label":".mdc","text":"Cursor ignora los `.md` de esa carpeta."},{"label":"globs / applyTo","text":"Indican a qué archivos se aplica."},{"label":"tests/integration/AGENTS.md","text":"Se aplica por directorio, y es la opción más portable."}],"expected":"La regla solo aparece en el contexto al trabajar en esa carpeta.","whenToUse":"Con convenciones que solo afectan a una parte del código.","limitations":["Con muchas reglas, cuesta saber cuáles están activas.","No se hacen cumplir."],"concepts":["rules","agents-md"],"sources":[{"title":"Cursor: Rules","url":"https://cursor.com/docs/rules"},{"title":"GitHub Docs: Repository custom instructions","url":"https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions"},{"title":"AGENTS.md","url":"https://agents.md/"}],"status":"verified","lastVerified":"2026-11-05"},{"id":"mcp-project-config","title":"El mismo servidor MCP en cuatro clientes","topic":"MCP","objective":"Conectar un mismo servidor MCP desde distintas herramientas, sin escribir secretos en el repositorio.","context":"MCP es un estándar, así que el servidor no cambia. Lo que cambia es dónde y cómo lo declara cada cliente. Un equipo que usa varias herramientas tendrá que mantener cada archivo.","implementation":"Sustituye `mi-servidor-mcp` por un paquete en el que confíes. Elige la pestaña de tu cliente y define `DB_URL` en tu entorno.","files":[{"tool":"Cursor","path":".cursor/mcp.json","language":"json","code":"{\n  \"mcpServers\": {\n    \"database\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"mi-servidor-mcp\", \"--dsn\", \"${env:DB_URL}\"]\n    }\n  }\n}"},{"tool":"Codex","path":".codex/config.toml","language":"toml","code":"[mcp_servers.database]\ncommand = \"npx\"\nargs = [\"-y\", \"mi-servidor-mcp\"]\nenv_vars = [\"DB_URL\"]"},{"tool":"Gemini CLI","path":".gemini/settings.json","language":"json","code":"{\n  \"mcpServers\": {\n    \"database\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"mi-servidor-mcp\", \"--dsn\", \"$DB_URL\"]\n    }\n  }\n}"},{"tool":"Claude Code","path":".mcp.json","language":"json","code":"{\n  \"mcpServers\": {\n    \"database\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"mi-servidor-mcp\", \"--dsn\", \"${DB_URL}\"]\n    }\n  }\n}"}],"parts":[{"label":"mcpServers","text":"Cursor, Gemini CLI y Claude Code usan esta clave en JSON. Codex usa tablas `[mcp_servers.<nombre>]` en TOML."},{"label":"command / args","text":"Servidor local por stdio: el cliente lanza el proceso. `npx -y` descarga y ejecuta un paquete, por lo que debes confiar en él."},{"label":"Variables de entorno","text":"**La sintaxis de sustitución varía entre clientes.** Compruébala en su documentación antes de confiar en este ejemplo."}],"expected":"El cliente muestra el servidor conectado y el agente puede usar sus herramientas.","whenToUse":"Cuando el agente necesita un sistema al que no puede acceder de otra forma.","limitations":["Un servidor de terceros es código con acceso a tus sistemas: revísalo antes.","Cada servidor añade definiciones que consumen contexto.","El contenido devuelto puede contener inyecciones de prompt.","Da al servidor credenciales de mínimo privilegio, por ejemplo de solo lectura.","No se ha probado en cada cliente, y la sustitución de variables es lo más sensible."],"concepts":["mcp","mcp-servers","permissions"],"sources":[{"title":"Cursor: MCP","url":"https://cursor.com/docs/mcp"},{"title":"Codex: MCP","url":"https://learn.chatgpt.com/docs/extend/mcp?surface=cli"},{"title":"Gemini CLI: MCP servers","url":"https://geminicli.com/docs/tools/mcp-server/"},{"title":"Claude Code: MCP","url":"https://code.claude.com/docs/en/mcp"}],"status":"needs-review","lastVerified":null},{"id":"hooks-guard-format","title":"Hook que bloquea comandos peligrosos","topic":"Hooks","tested":"Script ejecutado con entradas de prueba en los dos formatos de JSON. No se ha probado dentro de cada herramienta.","objective":"Garantizar que el agente no ejecuta comandos destructivos, sin depender de lo que decida el modelo.","context":"Una instrucción como “no hagas force push” es una petición; un hook se ejecuta siempre. Codex, Cursor, Gemini CLI y Claude Code bloquean si el comando sale con el código 2, así que un mismo script puede servir con una configuración distinta para cada una.","implementation":"Guarda el script en tu repositorio y regístralo en el formato de tu herramienta. Pruébalo a mano antes de confiar en él.","files":[{"path":"hooks/guard.mjs","language":"javascript","code":"// Bloquea comandos peligrosos. Exit 2 bloquea y stderr explica el motivo.\nlet input = '';\nfor await (const chunk of process.stdin) input += chunk;\n\nconst data = JSON.parse(input);\nconst command = data.tool_input?.command ?? data.command ?? '';\nconst forbidden = [/\\brm\\s+-[a-z]*r[a-z]*f/i, /\\bgit\\s+push\\b.*--force/];\n\nif (forbidden.some((rule) => rule.test(command))) {\n  console.error(`Bloqueado por política del proyecto: ${command}`);\n  process.exit(2);\n}"},{"tool":"Cursor","path":".cursor/hooks.json","language":"json","code":"{\n  \"version\": 1,\n  \"hooks\": {\n    \"beforeShellExecution\": [{ \"command\": \"node hooks/guard.mjs\" }]\n  }\n}"},{"tool":"Codex","path":".codex/hooks.json","language":"json","code":"{\n  \"hooks\": {\n    \"PreToolUse\": [\n      { \"hooks\": [{ \"type\": \"command\", \"command\": \"node hooks/guard.mjs\" }] }\n    ]\n  }\n}"},{"tool":"Gemini CLI","path":".gemini/settings.json","language":"json","code":"{\n  \"hooks\": {\n    \"BeforeTool\": [\n      {\n        \"matcher\": \"run_shell_command\",\n        \"hooks\": [{ \"type\": \"command\", \"command\": \"node hooks/guard.mjs\" }]\n      }\n    ]\n  }\n}"},{"tool":"Claude Code","path":".claude/settings.json","language":"json","code":"{\n  \"hooks\": {\n    \"PreToolUse\": [\n      {\n        \"matcher\": \"Bash\",\n        \"hooks\": [{ \"type\": \"command\", \"command\": \"node hooks/guard.mjs\" }]\n      }\n    ]\n  }\n}"},{"path":"prueba manual","language":"bash","code":"echo '{\"tool_input\":{\"command\":\"rm -rf build\"}}' | node hooks/guard.mjs\necho $?   # 2: bloqueado\n\necho '{\"command\":\"npm test\"}' | node hooks/guard.mjs\necho $?   # 0: permitido"}],"parts":[{"label":"tool_input?.command ?? command","text":"El comando llega en un campo distinto según la herramienta y el evento. En `beforeShellExecution` de Cursor está en `command`; en Codex y Claude Code, en `tool_input.command`."},{"label":"process.exit(2)","text":"Bloquea la acción. En Claude Code, **un exit 1 no bloquea**: la acción continúa."},{"label":"console.error","text":"El motivo llega al modelo por stderr, y puede cambiar de enfoque."},{"label":"Gemini CLI","text":"Su documentación no detalla el campo del comando en `BeforeTool`: comprueba que tu entrada coincide. Además, prefiere responder con JSON."},{"label":"Codex","text":"Los hooks deben aprobarse con `/hooks` antes de ejecutarse."}],"expected":"Si el agente intenta `rm -rf build`, la llamada no se ejecuta y recibe el motivo.","whenToUse":"Para reglas sin excepciones. Si la regla requiere criterio, usa una instrucción o un revisor.","limitations":["Filtrar por texto no es una frontera de seguridad: un script que borre archivos lo elude. Combínalo con permisos y aislamiento.","Los hooks se ejecutan con tus permisos: revísalos como código de producción.","Si el JSON no trae el campo esperado, el script deja pasar el comando: pruébalo en tu herramienta."],"concepts":["hooks","guardrails","permissions","agentic-harness"],"sources":[{"title":"Cursor: Hooks","url":"https://cursor.com/docs/hooks"},{"title":"Codex: Hooks","url":"https://learn.chatgpt.com/docs/hooks"},{"title":"Gemini CLI: Hooks","url":"https://geminicli.com/docs/hooks/"},{"title":"Claude Code: Hooks reference","url":"https://code.claude.com/docs/en/hooks"}],"status":"verified","lastVerified":"2026-11-05"},{"id":"persistent-memory-layers","title":"Memoria por capas en Claude Code","topic":"Persistent Memory","objective":"Separar lo que escribe el equipo, lo que aprende el agente y lo que recuerda un subagente concreto.","context":"Ejemplo específico de una herramienta, porque cada una gestiona la memoria de forma distinta. Tras varias sesiones, el agente sigue preguntando lo mismo y repite errores. Pero meterlo todo en `CLAUDE.md` lo haría demasiado largo.","implementation":"Deja las reglas de equipo en `CLAUDE.md`, que puede importar `AGENTS.md`. Deja que la auto memory recoja las correcciones. Y, si un subagente acumula conocimiento propio, actívale el campo `memory`. Trata la memoria como cualquier otro contenido: léela y corrígela.","files":[{"path":"CLAUDE.md","language":"markdown","code":"@AGENTS.md\n\n## Memoria\n- Las decisiones de arquitectura van en `docs/decisions/`, no en notas de memoria.\n- No guardes secretos ni datos de clientes en memoria."},{"path":".claude/agents/code-reviewer.md","language":"markdown","code":"---\nname: code-reviewer\ndescription: Revisa código según las convenciones del proyecto. Úsalo tras implementar un cambio.\ntools: Read, Grep, Glob\nmemory: project\n---\n\nConsulta tu memoria antes de revisar. Al terminar, guarda en ella solo las\nconvenciones o los errores recurrentes que hayas confirmado en el código,\ncon la ruta del archivo donde se ven. Corrige las notas que ya no sean ciertas."},{"path":".gitignore","language":"text","code":"CLAUDE.local.md\n.claude/agent-memory-local/"}],"parts":[{"label":"CLAUDE.md","text":"Instrucciones que escribe una persona y se cargan en cada sesión."},{"label":"@AGENTS.md","text":"Importa el archivo compartido en lugar de duplicarlo."},{"label":"auto memory","text":"No aparece en los archivos: son notas que Claude escribe por repositorio, compartidas entre worktrees. Se cargan las primeras 200 líneas o 25 KB."},{"label":"memory: project","text":"El subagente guarda en `.claude/agent-memory/code-reviewer/`, y se puede versionar. Activarlo le concede automáticamente Read, Write y Edit."},{"label":".gitignore","text":"Excluye lo personal: `CLAUDE.local.md` y la memoria de ámbito `local`."}],"expected":"El agente deja de repetir errores ya corregidos, `CLAUDE.md` sigue siendo breve y puedes consultar qué ha aprendido leyendo unos archivos.","whenToUse":"En proyectos en los que trabajas de forma repetida. No lo necesitas para tareas puntuales.","limitations":["Una nota incorrecta sigue influyendo en sesiones futuras.","`memory` no tiene efecto si la auto memory está desactivada.","Al concederle Write y Edit, ese revisor deja de ser de solo lectura.","Una memoria no garantiza un comportamiento: lo obligatorio va en un hook."],"concepts":["persistent-memory","claude-md","subagents","context-management"],"sources":[{"title":"Claude Code: How Claude remembers your project","url":"https://code.claude.com/docs/en/memory"},{"title":"Claude Code: Subagents","url":"https://code.claude.com/docs/en/sub-agents"}],"status":"verified","lastVerified":"2026-11-05"},{"id":"memory-progress-file","title":"Archivo de progreso para tareas largas","topic":"Persistent Memory","objective":"Retomar una tarea larga en una sesión nueva sin perder lo avanzado, con cualquier agente.","context":"Anthropic describe que los agentes tienden a intentar demasiado de una vez o a declarar el trabajo terminado antes de tiempo. Propone una lista de funcionalidades, un log de progreso y commits frecuentes. Son archivos normales, así que no dependen de ninguna herramienta.","implementation":"Añade la instrucción a `AGENTS.md`, y crea el archivo con la tarea. Cada sesión lee el estado, avanza una cosa y lo deja actualizado.","files":[{"path":"AGENTS.md","language":"markdown","code":"## Tareas largas\n- Al empezar, lee PROGRESS.md y `git log --oneline -10`.\n- Trabaja en una sola funcionalidad por sesión.\n- Márcala como hecha solo si la has comprobado de extremo a extremo.\n- Al terminar, haz commit y actualiza PROGRESS.md."},{"path":"PROGRESS.md","language":"markdown","code":"# Migración a la API v2\n\n## Funcionalidades\n- [x] Listado de pedidos (comprobado en el navegador)\n- [ ] Detalle de pedido  <- siguiente\n- [ ] Exportación a CSV\n\n## Decisiones\n- Mantener v1 hasta terminar: ver docs/decisions/012.md.\n\n## Problemas abiertos\n- El test de exportación necesita datos de prueba nuevos."}],"parts":[{"label":"Una sola funcionalidad","text":"Evita quedarse sin contexto a mitad de un cambio."},{"label":"Solo si la has comprobado","text":"Combate marcar como terminado algo que no lo está."},{"label":"Decisiones","text":"Lo que no se deduce del código y se perdería entre sesiones."}],"expected":"Una sesión nueva sabe en un minuto qué está hecho, qué sigue y por qué.","whenToUse":"En tareas que no caben en una sola sesión.","limitations":["El agente puede olvidarse de actualizar el archivo: un hook al terminar puede recordárselo.","En tareas cortas es una sobrecarga."],"concepts":["persistent-memory","context-compaction","agentic-harness"],"sources":[{"title":"Anthropic: Effective harnesses for long-running agents","url":"https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents"}],"status":"verified","lastVerified":"2026-11-05"},{"id":"spec-plan-build-workflow","title":"Workflow de especificación, construcción y revisión","topic":"Workflows","objective":"Llevar una funcionalidad de una idea a un PR con puntos de control claros, separando las fases en sesiones distintas.","context":"Pedir directamente “construye X” da diffs difíciles de revisar. Las buenas prácticas de Claude Code sugieren escribir la especificación y empezar luego una sesión limpia para construir a partir de ella.","implementation":"Primera sesión: el agente te ayuda a escribir `SPEC.md` sin programar. Segunda sesión, limpia: construye a partir del archivo, con una comprobación que ejecutar. Por último, un revisor sin contexto contrasta el resultado con la especificación.","files":[{"path":"SPEC.md","language":"markdown","code":"# Exportar pedidos a CSV\n\n## Objetivo\nQue una persona administradora pueda descargar los pedidos de un rango de fechas.\n\n## Criterios de aceptación\n- GET /admin/orders.csv?from=&to= devuelve text/csv.\n- Sin permiso de administración devuelve 403.\n- Rango de más de 366 días devuelve 400.\n\n## Fuera de alcance\n- Exportaciones programadas.\n\n## Cómo comprobarlo\n- pnpm --filter api test orders-export"},{"path":"prompts.txt","language":"text","code":"# Sesión 1: especificar\nVoy a añadir una exportación de pedidos a CSV. Hazme preguntas sobre lo que\nno esté claro y redacta SPEC.md. No escribas código.\n\n# Sesión 2 (nueva): construir\nImplementa SPEC.md. Escribe primero los tests de los criterios de aceptación\ny confirma que fallan. Después implementa hasta que pasen.\nNo amplíes el alcance.\n\n# Sesión 2: revisar\nUsa el subagente reviewer para contrastar el diff con SPEC.md.\nInforma solo de criterios incumplidos y de errores que puedan provocar un fallo."}],"parts":[{"label":"Criterios de aceptación","text":"Comprobables: cada uno se convierte en un test. Es la “definición de terminado” del agente."},{"label":"Fuera de alcance","text":"Frena la tendencia a añadir más de lo pedido."},{"label":"Cómo comprobarlo","text":"Da al agente un comando que puede ejecutar, en vez de tener que creer que ha terminado."},{"label":"Sesión nueva","text":"Empieza con un contexto limpio y una definición por escrito, sin el ruido de la conversación anterior."},{"label":"Confirmar que fallan","text":"Un test que nunca ha fallado puede no estar comprobando nada."}],"expected":"Un PR pequeño, con tests ligados a criterios concretos y una revisión independiente contra la especificación.","whenToUse":"En funcionalidades de cierta entidad. Para un arreglo de una línea, este proceso sobra.","limitations":["Escribir y revisar la especificación lleva tiempo.","Si la especificación es incorrecta, el resultado será correctamente incorrecto.","Hay que actualizarla si cambia de rumbo la implementación."],"concepts":["ai-development-workflows","spec-driven-development","subagents"],"sources":[{"title":"Claude Code: Best practices","url":"https://code.claude.com/docs/en/best-practices"},{"title":"GitHub Spec Kit","url":"https://github.com/github/spec-kit"}],"status":"verified","lastVerified":"2026-11-05"},{"id":"git-worktrees-basics","title":"Git Worktrees paso a paso","topic":"Git Worktrees","tested":"Comandos ejecutados en un repositorio de prueba con Git en Windows.","objective":"Tener dos ramas activas a la vez en directorios distintos, entender sus reglas y limpiar al terminar.","context":"Estás en mitad de un trabajo y aparece otra tarea. O quieres que un agente trabaje sin tocar tu directorio. Con un worktree no hace falta `git stash` ni un segundo clon.","implementation":"Ejecútalo desde el repositorio principal. Los worktrees se crean fuera de él, como carpetas hermanas, para que no aparezcan como archivos sin seguimiento.","files":[{"path":"terminal","language":"bash","code":"# Crear dos worktrees, cada uno con una rama nueva\ngit worktree add ../app-auth -b feature/auth\ngit worktree add ../app-billing -b feature/billing\n\n# Ver qué hay activo\ngit worktree list\n\n# Una rama no puede estar activa en dos sitios (esto falla)\ngit worktree add ../otra feature/auth\n\n# Un commit en un worktree es visible desde los demás\n(cd ../app-auth && git add . && git commit -m \"Añade auth\")\ngit log --oneline feature/auth -1\n\n# Limpiar: falla si hay cambios sin commitear, salvo con --force\ngit worktree remove ../app-auth\ngit worktree remove --force ../app-billing\n\n# La rama sigue existiendo y se puede integrar\ngit merge feature/auth"}],"parts":[{"label":"worktree add <ruta> -b <rama>","text":"Crea el directorio y una rama nueva a partir de `HEAD`. Sin `-b`, usa una rama existente."},{"label":"worktree list","text":"Muestra cada directorio, su commit y su rama."},{"label":"fatal: already checked out","text":"Comportamiento esperado. Se resuelve con una rama nueva o con `--detach`."},{"label":"worktree remove","text":"Elimina el directorio, pero **no la rama**: los commits siguen ahí. Si había cambios sin commitear, `--force` los pierde."},{"label":"git worktree prune","text":"Si borras una carpeta a mano, limpia los metadatos que quedan."}],"expected":"Tres directorios con ramas distintas y un mismo historial. Al eliminar los worktrees, las ramas siguen disponibles para integrarse.","whenToUse":"Para tareas paralelas, hotfixes sin interrumpir tu trabajo, revisar un PR o aislar a un agente.","limitations":["Un worktree es una copia limpia: sin `node_modules` ni `.env`. Instala dependencias en cada uno.","No evita los conflictos al integrar.","Varios servidores de desarrollo pueden chocar en el mismo puerto."],"concepts":["git-worktrees"],"sources":[{"title":"Git: git-worktree","url":"https://git-scm.com/docs/git-worktree"}],"status":"verified","lastVerified":"2026-11-05"},{"id":"parallel-agents-worktrees","title":"Agentes en paralelo con worktrees","topic":"Parallel Agents","tested":"Script ejecutado con un agente simulado, tanto correcto como fallido. No se ha ejecutado con un agente real.","objective":"Lanzar varias tareas independientes con cualquier agente, y detectar si alguna falla.","context":"El script no depende de una herramienta: crea un worktree y una rama por tarea, y lanza ahí el agente que indiques. Algunas herramientas tienen su propia opción, como `claude --worktree`, o integran worktrees en su interfaz, como Cursor y Devin Desktop.","implementation":"Comprueba primero que las tareas no toquen los mismos archivos. Define `AGENT_CMD` con el modo no interactivo de tu agente y ejecuta el script desde el repositorio.","files":[{"path":"parallel.sh","language":"bash","code":"#!/usr/bin/env bash\nset -uo pipefail\n\n# Tu agente en modo no interactivo, por ejemplo: AGENT_CMD=\"gemini -p\"\nAGENT_CMD=${AGENT_CMD:?Define AGENT_CMD con el comando de tu agente}\n\nrun_task() {\n  local name=$1 prompt=$2\n  git worktree add -q \"../wt-$name\" -b \"agent/$name\" || return 1\n  (cd \"../wt-$name\" && $AGENT_CMD \"$prompt\" > \"../$name.log\" 2>&1)\n}\n\npids=()\nrun_task rate-limit \"Añade rate limiting a /login con tests.\" & pids+=($!)\nrun_task api-docs \"Actualiza docs/api.md según las rutas actuales.\" & pids+=($!)\n\nstatus=0\nfor pid in \"${pids[@]}\"; do\n  wait \"$pid\" || status=1\ndone\n\ngit worktree list\n[ \"$status\" -eq 0 ] && echo \"Todas las tareas han terminado.\" || echo \"Alguna tarea ha fallado: revisa los .log\"\nexit \"$status\""},{"path":"integración","language":"bash","code":"# Revisar lo que ha hecho cada agente\ngit diff main...agent/rate-limit\ngit diff main...agent/api-docs\n\n# Integrar de una en una, comprobando cada paso\ngit merge agent/api-docs\nnpm test\ngit merge agent/rate-limit\nnpm test\n\n# Limpiar\ngit worktree remove ../wt-rate-limit\ngit worktree remove ../wt-api-docs"}],"parts":[{"label":"AGENT_CMD","text":"El comando no interactivo de tu agente. Consulta su documentación para saber cuál es."},{"label":"git worktree add … -b","text":"Cada tarea tiene sus archivos, su rama y su área de preparación."},{"label":"pids / wait \"$pid\"","text":"Espera a cada tarea por separado. Un simple `wait` devolvería 0 aunque alguna fallara: lo comprobamos al probar este script."},{"label":"git diff main...rama","text":"Muestra solo lo que ha cambiado esa rama desde que divergió de main."},{"label":"npm test tras cada merge","text":"Dos ramas correctas por separado pueden fallar juntas."}],"expected":"Dos ramas independientes con sus logs, y un código de salida distinto de 0 si alguna tarea ha fallado.","whenToUse":"Con tareas realmente independientes y buenos tests. Si las dos tocan el mismo módulo, hazlas en serie.","limitations":["En modo no interactivo nadie aprueba permisos: configúralos antes o las acciones se denegarán.","Un worktree no tiene `node_modules` ni `.env`: añade la instalación al script si hace falta.","Si la rama ya existe, `git worktree add -b` falla.","El límite real es tu capacidad de revisar los diffs."],"concepts":["parallel-agent-development","git-worktrees","shared-file-conflicts"],"sources":[{"title":"Git: git-worktree","url":"https://git-scm.com/docs/git-worktree"}],"status":"verified","lastVerified":"2026-11-05"},{"id":"agent-eval-minimal","title":"Evaluación mínima de un agente","topic":"Evaluation","tested":"Script ejecutado con un agente simulado: 2/2 con el correcto y 0/2 con el que falla.","objective":"Medir con datos si un cambio de instrucciones o de modelo mejora a un agente, sin depender de una herramienta concreta.","context":"Sigue el enfoque de *Demystifying evals*: pocas tareas reales, evaluar el resultado final y no la secuencia de pasos, y repetir cada tarea porque el resultado varía.","implementation":"Define `AGENT_CMD`, indica el prompt y un comando que puntúe el resultado. El script crea un worktree limpio por intento y conserva la transcripción.","files":[{"path":"evals/run.sh","language":"bash","code":"#!/usr/bin/env bash\n# Uso: AGENT_CMD=\"gemini -p\" evals/run.sh <id> \"<prompt>\" \"<grader>\" [intentos]\nid=$1; prompt=$2; grader=$3; trials=${4:-3}\npass=0\nmkdir -p evals/transcripts\n\nfor i in $(seq 1 \"$trials\"); do\n  dir=\"../eval-$id-$i\"\n  git worktree add -q --detach \"$dir\" HEAD\n  (\n    cd \"$dir\"\n    $AGENT_CMD \"$prompt\" > transcript.txt 2>&1\n    bash -c \"$grader\"\n  ) && pass=$((pass + 1))\n  cp \"$dir/transcript.txt\" \"evals/transcripts/$id-$i.txt\"\n  git worktree remove --force \"$dir\"\ndone\n\necho \"$id: $pass/$trials\""},{"path":"terminal","language":"bash","code":"AGENT_CMD=\"tu-agente -p\" evals/run.sh issue-142 \\\n  \"El endpoint /orders devuelve 500 con el carrito vacío. Corrígelo.\" \\\n  \"npm ci && npm test -- tests/regression/issue-142.test.js\""}],"parts":[{"label":"grader","text":"Comprueba el resultado real, no lo que el agente dice haber hecho."},{"label":"trials","text":"Varios intentos, porque un agente no da siempre el mismo resultado."},{"label":"--detach","text":"Cada intento parte del mismo commit sin crear ramas."},{"label":"transcripts","text":"Se conservan para entender por qué ha fallado un intento."},{"label":"pass/trials","text":"Compara este número antes y después de un cambio, con las mismas tareas."}],"expected":"Una línea por tarea, como `issue-142: 2/3`, y una transcripción por intento.","whenToUse":"Antes de cambiar de modelo o de instrucciones en un agente de uso habitual.","limitations":["El grader se ejecuta como código: usa solo tareas de confianza.","Con pocos intentos, una diferencia pequeña puede ser ruido.","No evalúa aspectos subjetivos: para eso hace falta un grader por modelo o humano.","Consume tokens con un agente real."],"concepts":["agent-evaluation","git-worktrees"],"sources":[{"title":"Anthropic: Demystifying evals for AI agents","url":"https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents"}],"status":"verified","lastVerified":"2026-11-05"}],"learning-paths":[{"id":"agents-from-zero","title":"Agentes de IA desde cero","level":"Beginner","duration":"Primer contacto","description":"Qué es un agente, en qué se diferencia de un asistente y cómo empezar a trabajar con uno de forma segura.","stages":[{"title":"Entender la idea","goal":"Saber qué es un agente y qué cambia frente a un chat.","nodes":[{"concept":"ai-assisted-development","why":"El marco general: todas las formas de programar con IA."},{"concept":"ai-agents","why":"La definición central: un modelo que dirige su propio proceso en un bucle.","branches":[{"concept":"agent-lifecycle","why":"Si quieres ver las fases por las que pasa un agente."}]},{"concept":"assistants-vs-agents","why":"Cuánto control delegas en cada caso."}]},{"title":"Cómo actúa","goal":"Comprender cómo pasa de generar texto a hacer cosas.","nodes":[{"concept":"tool-calling","why":"El modelo no ejecuta nada: pide, y la aplicación ejecuta."},{"concept":"tools-agent","why":"Qué tiene a su alcance un agente."}]},{"title":"Primeros pasos seguros","goal":"Usar un agente en un repositorio real sin sustos.","nodes":[{"concept":"agents-md","why":"Tu primera configuración: sencilla, útil y portable."},{"concept":"permissions","why":"Delimita lo que puede hacer antes de darle autonomía."},{"concept":"agentic-coding","why":"Cómo es trabajar así en el día a día.","branches":[{"concept":"vibe-coding","why":"Para distinguir programar con agentes de no revisar el código."},{"concept":"terminal-agents","why":"Una categoría de herramientas para empezar."}]}]}]},{"id":"configure-repo","title":"Prepara tu repositorio para agentes","level":"Intermediate","duration":"Configuración","description":"Instrucciones, skills, subagentes, memoria, hooks y MCP: qué poner en cada sitio y por qué.","stages":[{"title":"El recurso limitado","goal":"Entender por qué no se puede cargar todo siempre.","nodes":[{"concept":"context-management","why":"Todo lo que viene después administra este recurso.","branches":[{"concept":"context-engineering","why":"La disciplina completa, con sus técnicas."}]}]},{"title":"Lo que el agente debe saber","goal":"Dar instrucciones en el sitio adecuado.","nodes":[{"concept":"agents-md","why":"Lo que debe saberse siempre.","branches":[{"concept":"claude-md","why":"Si usas Claude Code."}]},{"concept":"rules","why":"Lo que solo aplica a una parte del repositorio."},{"concept":"skills","why":"Los procedimientos, que se cargan solo al usarse."}]},{"title":"Repartir y recordar","goal":"Mantener el contexto limpio y conservar lo aprendido.","nodes":[{"concept":"subagents","why":"Las tareas ruidosas o con menos permisos."},{"concept":"persistent-memory","why":"Lo que el agente aprende entre sesiones.","branches":[{"concept":"context-compaction","why":"Qué pasa cuando la sesión se llena."}]}]},{"title":"Controlar y conectar","goal":"Garantizar lo que no admite excepciones y acceder a otros sistemas.","nodes":[{"concept":"hooks","why":"Lo que no puede quedar al criterio del modelo.","branches":[{"concept":"guardrails","why":"La visión de conjunto de los controles."}]},{"concept":"mcp","why":"Conexión con sistemas externos.","branches":[{"concept":"mcp-servers","why":"Qué es un servidor y qué riesgos tiene."}]}]}]},{"id":"build-your-agent","title":"Construye tu propio agente","level":"Advanced","duration":"Construcción","description":"De un bucle con herramientas a un agente con contexto, controles y evaluación. Para quien quiere construir, no solo usar.","stages":[{"title":"El núcleo","goal":"Montar el bucle mínimo.","nodes":[{"concept":"workflows","why":"Primero, comprueba si te basta con un flujo predefinido."},{"concept":"tool-calling","why":"El mecanismo con el que todo funciona."},{"concept":"agent-architecture","why":"Las piezas y cómo se conectan.","branches":[{"concept":"model-providers","why":"Qué modelo usar."}]}]},{"title":"Mantenerlo fiable en tareas largas","goal":"Que no degrade su calidad al avanzar.","nodes":[{"concept":"context-engineering","why":"Qué ve el agente en cada paso.","branches":[{"concept":"prompt-engineering","why":"Cómo redactar el prompt de sistema y las herramientas."}]},{"concept":"planning-reasoning","why":"Separar el pensar del hacer."},{"concept":"persistent-memory","why":"Conservar el estado fuera de la ventana."}]},{"title":"Conectar y controlar","goal":"Darle acceso con límites.","nodes":[{"concept":"mcp","why":"Reutilizar integraciones estándar."},{"concept":"guardrails","why":"Controles en capas.","branches":[{"concept":"permissions","why":"La primera de esas capas."}]},{"concept":"agentic-harness","why":"Todo lo anterior junto: lo que no es el modelo."}]},{"title":"Medir","goal":"Saber con datos si mejora.","nodes":[{"concept":"agent-evaluation","why":"Sin evals, cada cambio es una opinión."}]}]},{"id":"parallel-worktrees","title":"Agentes en paralelo con Git Worktrees","level":"Intermediate","duration":"Paralelismo","description":"Cómo coordinar varios agentes en un mismo repositorio sin que se pisen.","stages":[{"title":"Antes de paralelizar","goal":"Saber trabajar bien con un agente y repartir dentro de una sesión.","nodes":[{"concept":"agentic-coding","why":"Cómo se trabaja con un solo agente."},{"concept":"subagents","why":"La forma más simple de repartir trabajo."}]},{"title":"Aislar","goal":"Que cada agente tenga sus archivos.","nodes":[{"concept":"git-worktrees","why":"Varios directorios y un solo repositorio."},{"concept":"shared-file-conflicts","why":"Qué evitan los worktrees y qué no."}]},{"title":"Coordinar e integrar","goal":"Convertir varias ramas en un resultado que funcione.","nodes":[{"concept":"parallel-agent-development","why":"El proceso completo.","branches":[{"concept":"orchestrators","why":"Si quieres que un agente coordine a los demás."}]},{"concept":"automated-code-review","why":"Revisar es el verdadero límite del paralelismo."}]}]},{"id":"harness-quality","title":"Fiabilidad: harness y evals","level":"Advanced","duration":"Calidad","description":"Cómo conseguir que el trabajo de un agente sea fiable y cómo medirlo.","stages":[{"title":"El entorno del agente","goal":"Entender qué hay alrededor del modelo.","nodes":[{"concept":"context-engineering","why":"Qué ve el agente."},{"concept":"agentic-harness","why":"Todo lo que no es el modelo."},{"concept":"harness-engineering","why":"Mejorarlo de forma sistemática.","branches":[{"concept":"agentic-engineering","why":"La práctica profesional que lo rodea."}]}]},{"title":"Controlar","goal":"Evitar y detectar errores automáticamente.","nodes":[{"concept":"guardrails","why":"Controles en capas.","branches":[{"concept":"hooks","why":"Cómo implementarlos de forma determinista."}]},{"concept":"ai-generated-code-testing","why":"Los riesgos de verificar código generado."},{"concept":"automated-code-review","why":"Una segunda mirada con contexto limpio."}]},{"title":"Medir","goal":"Decidir con datos.","nodes":[{"concept":"agent-evaluation","why":"Tareas, intentos y graders."}]}]},{"id":"multi-agent","title":"Orquestación y sistemas multiagente","level":"Advanced","duration":"Orquestación","description":"Cuándo compensa usar varios agentes y cómo coordinarlos.","stages":[{"title":"¿Lo necesitas?","goal":"Empezar por la opción más simple.","nodes":[{"concept":"workflows","why":"A menudo, un flujo predefinido basta."},{"concept":"agent-orchestration","why":"Las opciones de coordinación."}]},{"title":"Las piezas","goal":"Conocer quién coordina y cómo se comunican.","nodes":[{"concept":"orchestrators","why":"La pieza que divide y sintetiza.","branches":[{"concept":"subagents","why":"Sus trabajadores habituales."}]},{"concept":"multi-agent-systems","why":"Beneficios y costes reales."},{"concept":"agent-communication","why":"Cómo intercambian información.","branches":[{"concept":"mcp","why":"Protocolo complementario: de agente a herramienta."}]}]},{"title":"Autonomía","goal":"Dejar que trabajen solos, con garantías.","nodes":[{"concept":"parallel-agent-development","why":"Aplicación a un repositorio."},{"concept":"autonomous-agents","why":"Menos supervisión, más controles.","branches":[{"concept":"agent-evaluation","why":"Cómo saber si puedes confiar."}]}]}]}],"real-world":{"checkedAt":"2026-11-05","note":"Tamaños y secciones medidos el 5 de noviembre de 2026. Estos archivos cambian con el proyecto: abre el enlace para ver la versión actual. Los resúmenes son nuestros; el contenido pertenece a cada proyecto.","items":[{"id":"airflow","type":"AGENTS.md","project":"Apache Airflow","tool":"Multi-herramienta","file":"AGENTS.md","size":"23 KB","url":"https://github.com/apache/airflow/blob/main/AGENTS.md","summary":"Un proyecto grande de código abierto que documenta para agentes sus comandos y su estructura.","highlights":["Tiene secciones propias para límites de arquitectura y modelo de seguridad.","Muestra que en un sistema complejo lo valioso es lo que el código no dice por sí solo."]},{"id":"openai-agents","type":"AGENTS.md","project":"OpenAI Agents SDK (Python)","tool":"Codex","file":"AGENTS.md","size":"38 KB","url":"https://github.com/openai/openai-agents-python/blob/main/AGENTS.md","summary":"Guía de contribución extensa, organizada con tabla de contenidos, reglas obligatorias y reglas de revisión.","highlights":["Separa las políticas obligatorias de la guía de estructura y de operación.","Su tamaño supera los 32 KiB que Codex carga por defecto, límite que se puede configurar: buen recordatorio de medir."]},{"id":"goose","type":"AGENTS.md","project":"goose (Block)","tool":"goose","file":"AGENTS.md","size":"6 KB","url":"https://github.com/block/goose/blob/main/AGENTS.md","summary":"De un proyecto fundador de la Agentic AI Foundation: instrucciones centradas en cómo trabajar en el repositorio.","highlights":["Incluye flujo de contribución, comandos y un bucle de desarrollo con pasos.","Un tamaño intermedio que se puede leer de un vistazo."]},{"id":"agents-md-repo","type":"AGENTS.md","project":"agents.md","tool":"Multi-herramienta","file":"AGENTS.md","size":"2 KB","url":"https://github.com/agentsmd/agents.md/blob/main/AGENTS.md","summary":"El propio sitio del formato usa un archivo breve, con cuatro secciones numeradas.","highlights":["Su primera regla es muy concreta: qué comando usar y cuál evitar.","Prueba de que un proyecto pequeño no necesita más."]},{"id":"vscode","type":"Instrucciones","project":"Visual Studio Code","tool":"GitHub Copilot","file":".github/copilot-instructions.md","size":"14 KB","url":"https://github.com/microsoft/vscode/blob/main/.github/copilot-instructions.md","summary":"Las instrucciones de Copilot de un proyecto enorme, con cómo validar los cambios de TypeScript.","highlights":["Tiene una sección dedicada a validar los cambios.","Incluye una sección de aprendizajes acumulados, una forma simple de memoria versionada."]},{"id":"gemini-cli","type":"Instrucciones","project":"Gemini CLI","tool":"Gemini CLI","file":"GEMINI.md","size":"5 KB","url":"https://github.com/google-gemini/gemini-cli/blob/main/GEMINI.md","summary":"El archivo de contexto que usa el propio proyecto de Gemini CLI.","highlights":["Estructura clara: visión general, compilación, calidad, convenciones.","Ver cómo un equipo usa su propio formato es de lo más instructivo."]},{"id":"cline-rules","type":"Rules","project":"Cline","tool":"Cline","file":".clinerules/general.md","size":"13 KB","url":"https://github.com/cline/cline/blob/main/.clinerules/general.md","summary":"Reglas muy específicas, escritas a partir de problemas concretos del propio repositorio.","highlights":["Cubre trampas reales, como evitar la salida de compilación al buscar en el código.","Ilustra cómo cada error repetido se convierte en una regla."]},{"id":"mcp-builder","type":"Skill","project":"anthropics/skills","tool":"Agent Skills","file":"skills/mcp-builder/SKILL.md","size":"11 KB","url":"https://github.com/anthropics/skills/blob/main/skills/mcp-builder/SKILL.md","summary":"Skill que guía la creación de servidores MCP, con un flujo por fases y archivos de referencia.","highlights":["Buen ejemplo de divulgación progresiva: el detalle está en archivos aparte.","Comprueba la licencia antes de reutilizarla: varía entre las skills del repositorio."]},{"id":"webapp-testing","type":"Skill","project":"anthropics/skills","tool":"Agent Skills","file":"skills/webapp-testing/SKILL.md","size":"4 KB","url":"https://github.com/anthropics/skills/blob/main/skills/webapp-testing/SKILL.md","summary":"Skill breve para probar aplicaciones web, con un árbol de decisión y un patrón de trabajo.","highlights":["Usa un árbol de decisión para elegir el enfoque.","Dedica una sección a un error habitual, lo que evita repetirlo."]},{"id":"awesome-copilot","type":"Colección","project":"github/awesome-copilot","tool":"GitHub Copilot","file":"Repositorio","size":"Colección","url":"https://github.com/github/awesome-copilot","summary":"Colección comunitaria con agentes personalizados, instrucciones, skills, hooks y workflows.","highlights":["Para comparar muchos enfoques distintos de un mismo formato.","Es comunitaria: revisa cada elemento antes de usarlo."]},{"id":"mcp-servers","type":"MCP","project":"modelcontextprotocol/servers","tool":"MCP","file":"Repositorio","size":"Colección","url":"https://github.com/modelcontextprotocol/servers","summary":"Servidores de referencia del protocolo, útiles para aprender cómo se construye uno.","highlights":["Son implementaciones de referencia para aprender, no necesariamente listas para producción.","Combínalos con MCP Inspector para ver el protocolo en acción."]}]},"simulations":{"agentRun":{"note":"Simulación ilustrativa, no una sesión real.","phases":[{"id":"decide","label":"Decide"},{"id":"act","label":"Actúa"},{"id":"observe","label":"Observa"}],"steps":[{"phase":"goal","text":"Objetivo: el test de login falla. Arréglalo."},{"phase":"decide","text":"Primero necesito ver el error."},{"phase":"act","text":"$ npm test -- login"},{"phase":"observe","text":"FAIL: email es undefined en validar()"},{"phase":"decide","text":"Busco dónde se define validar()."},{"phase":"act","text":"$ grep -rn \"validar(\" src"},{"phase":"observe","text":"src/auth/validar.js:12"},{"phase":"decide","text":"No contempla un email vacío. Lo corrijo."},{"phase":"act","text":"editar src/auth/validar.js"},{"phase":"act","text":"$ npm test -- login"},{"phase":"observe","text":"PASS: 1 test superado"},{"phase":"done","text":"Hecho. Revisa el diff antes de integrarlo."}]},"contextWindow":{"capacity":100000,"note":"Todas las cifras son ilustrativas. El tamaño real depende del modelo, de la herramienta y de tu proyecto. Lo que importa son las proporciones y el efecto de cada decisión.","items":[{"id":"system","label":"Prompt de sistema","tokens":3000,"on":true,"locked":true,"note":"Lo incluye la herramienta en cada llamada.","concept":"agent-architecture"},{"id":"agents","label":"AGENTS.md","tokens":1500,"on":true,"note":"Se carga siempre: por eso conviene que sea breve.","concept":"agents-md"},{"id":"skills-meta","label":"10 skills (solo metadatos)","tokens":1000,"on":true,"note":"Unos 100 tokens por skill: casi no ocupan hasta usarlas.","concept":"skills"},{"id":"skill","label":"Una skill activada","tokens":5000,"on":false,"note":"Al activarse entra todo su SKILL.md.","concept":"skills"},{"id":"mcp","label":"Herramientas de 5 servidores MCP","tokens":8000,"on":true,"note":"Cada definición ocupa espacio, se use o no.","concept":"mcp"},{"id":"history","label":"Historial de la conversación","tokens":22000,"on":true,"note":"Crece con cada turno.","concept":"context-management"},{"id":"files","label":"Exploración: 40 archivos leídos","tokens":30000,"on":false,"note":"Lo que más llena el contexto. ¿Lo necesitas aquí?","concept":"context-engineering"},{"id":"tests","label":"Salida larga de los tests","tokens":18000,"on":false,"note":"Miles de líneas de las que importan unas pocas.","concept":"subagents"}],"actions":[{"id":"delegate","label":"Delegar en un subagente","concept":"subagents","effects":{"files":1500,"tests":800},"note":"La exploración y los tests pasan a otro contexto, y solo vuelve un resumen."},{"id":"compact","label":"Compactar la conversación","concept":"context-compaction","effects":{"history":3000},"note":"El historial se sustituye por un resumen. Algunos detalles se pierden."},{"id":"trim-mcp","label":"Dejar solo 1 servidor MCP","concept":"mcp-servers","effects":{"mcp":1600},"note":"Menos definiciones, y además al modelo le cuesta menos elegir."}]}},"timeline":{"intro":"Cómo ha evolucionado el desarrollo con agentes de IA, leído por carriles paralelos. Una etapa nueva rara vez sustituye a la anterior: el autocompletado, los asistentes y los agentes conviven y se complementan.","lanes":[{"id":"ai-tools","short":"Herramientas IA","name":"Herramientas de IA para programar","description":"Del autocompletado a los agentes."},{"id":"ai-concepts","short":"Prácticas IA","name":"Agentes y prácticas emergentes","description":"Ideas y términos; varios aún en discusión."}],"events":[{"id":"copilot","lane":"ai-tools","name":"GitHub Copilot y AI-assisted coding","start":2021.5,"end":null,"dateLabel":"Junio de 2021 (vista previa); junio de 2022 (GA)","precision":"exact","status":"verified","lastVerified":"2026-11-05","description":"GitHub anunció Copilot como vista previa técnica el 29 de junio de 2021, y lo publicó de forma general el 21 de junio de 2022. Llevó las sugerencias de un modelo de lenguaje al editor.","importance":"Normalizó programar junto a un modelo, y abrió el mercado de los asistentes de código.","technologies":["GitHub Copilot","VS Code"],"relatedConcepts":["ai-assisted-development","ai-coding-assistants"],"sources":[{"title":"GitHub Blog: Copilot is generally available","url":"https://github.blog/2022-06-21-github-copilot-is-generally-available-to-all-developers/","note":"21 de junio de 2022"},{"title":"GitHub Docs: What is GitHub Copilot?","url":"https://docs.github.com/en/copilot/get-started/what-is-github-copilot"}],"coexists":"El autocompletado sigue siendo muy útil: los agentes lo complementan, no lo eliminan."},{"id":"ai-assistants","lane":"ai-tools","name":"AI coding assistants conversacionales","start":2022.9,"end":null,"dateLabel":"Desde finales de 2022","precision":"approximate","status":"needs-review","lastVerified":null,"description":"Tras el lanzamiento de ChatGPT, en noviembre de 2022, programar conversando con un modelo se generalizó. Aparecieron editores y extensiones que integran el chat con el código.","importance":"Cambió la interacción de sugerencias en línea a peticiones en lenguaje natural.","technologies":["ChatGPT","Cursor","Aider","Cline"],"relatedConcepts":["ai-coding-assistants","prompt-engineering"],"sources":[{"title":"OpenAI: Introducing ChatGPT","url":"https://openai.com/index/chatgpt/","note":"Contrastar a mano"},{"title":"Aider: Documentation","url":"https://aider.chat/docs/"}]},{"id":"devin","lane":"ai-tools","name":"Agentes de software presentados como producto","start":2024.2,"end":null,"dateLabel":"Marzo de 2024 (Devin)","precision":"exact","status":"verified","lastVerified":"2026-11-05","description":"El 12 de marzo de 2024, Cognition presentó Devin como “the first AI software engineer”, con su propio entorno de herramientas. Esa descripción es una afirmación de marketing de la empresa.","importance":"Dio visibilidad a la idea de delegar tareas completas de ingeniería en un agente.","technologies":["Devin"],"relatedConcepts":["autonomous-agents","agentic-coding"],"sources":[{"title":"Cognition: Introducing Devin","url":"https://cognition.com/blog/introducing-devin"}]},{"id":"claude-code","lane":"ai-tools","name":"Agentes de código en terminal","start":2025.15,"end":null,"dateLabel":"Febrero de 2025 (Claude Code)","precision":"exact","status":"needs-review","lastVerified":null,"description":"Anthropic lanzó Claude Code en vista previa de investigación el 24 de febrero de 2025, y le dio disponibilidad general en mayo de ese año. Codex CLI, Gemini CLI y otros agentes de terminal llevan el mismo enfoque a otros modelos.","importance":"Acercó el bucle completo de agente al entorno habitual del desarrollador, y extendió el uso de instrucciones, skills y hooks.","technologies":["Claude Code","Codex CLI","Gemini CLI","Aider"],"relatedConcepts":["agentic-coding","terminal-agents"],"sources":[{"title":"Claude Code: notas de versión","url":"https://docs.anthropic.com/en/release-notes/claude-code"},{"title":"Claude Code: overview","url":"https://code.claude.com/docs/en/overview"},{"title":"Gemini CLI: Documentation","url":"https://geminicli.com/docs/"}],"coexists":"Aider ya trabajaba en terminal antes de esa fecha: no es un inicio absoluto de la categoría."},{"id":"ai-agents","lane":"ai-concepts","name":"AI agents","start":2022.75,"end":null,"dateLabel":"Desde 2022–2023","precision":"approximate","status":"needs-review","lastVerified":null,"description":"La idea de agente es muy anterior a los LLM. En su forma actual, trabajos como ReAct (octubre de 2022) y el function calling de los modelos (2023) hicieron práctico alternar razonamiento y acción.","importance":"Sentaron la base técnica: un modelo que usa herramientas en bucle.","technologies":["ReAct","Function calling","Tool use"],"relatedConcepts":["ai-agents","tool-calling"],"sources":[{"title":"ReAct: Synergizing Reasoning and Acting in Language Models","url":"https://arxiv.org/abs/2210.03629","note":"arXiv, octubre de 2022"},{"title":"OpenAI API: Function calling","url":"https://platform.openai.com/docs/guides/function-calling"}]},{"id":"multi-agent","lane":"ai-concepts","name":"Multi-agent systems","start":2023.6,"end":null,"dateLabel":"Desde 2023 con LLM","precision":"approximate","status":"verified","lastVerified":"2026-11-05","description":"Los sistemas multiagente son un campo antiguo. Con LLM, trabajos como AutoGen (agosto de 2023) popularizaron la colaboración entre agentes. Hoy lo más común es la jerarquía orquestador-subagentes.","importance":"Permitió superar los límites de una sola ventana de contexto, a costa de bastantes más tokens: Anthropic estima unas 15 veces los de un chat.","technologies":["AutoGen","LangGraph","Subagentes"],"relatedConcepts":["multi-agent-systems","subagents","orchestrators"],"sources":[{"title":"AutoGen: Next-Gen LLM Applications via Multi-Agent Conversation","url":"https://arxiv.org/abs/2308.08155","note":"arXiv, agosto de 2023"},{"title":"Anthropic: How we built our multi-agent research system","url":"https://www.anthropic.com/engineering/multi-agent-research-system"}]},{"id":"mcp","lane":"ai-concepts","name":"Model Context Protocol","start":2024.9,"end":null,"dateLabel":"Noviembre de 2024","precision":"exact","status":"verified","lastVerified":"2026-11-05","description":"Anthropic publicó MCP como estándar abierto el 25 de noviembre de 2024. En diciembre de 2025 pasó a la Agentic AI Foundation de la Linux Foundation, junto con AGENTS.md y goose.","importance":"Dio a la industria una forma común de conectar agentes con herramientas y datos.","technologies":["MCP","JSON-RPC"],"relatedConcepts":["mcp","mcp-servers"],"sources":[{"title":"Anthropic: Introducing the Model Context Protocol","url":"https://www.anthropic.com/news/model-context-protocol","note":"25 de noviembre de 2024"},{"title":"Linux Foundation: formation of the Agentic AI Foundation","url":"https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation","note":"9 de diciembre de 2025"},{"title":"MCP Specification 2026-07-28: Architecture","url":"https://modelcontextprotocol.io/specification/2026-07-28/architecture"}]},{"id":"agentic-coding","lane":"ai-concepts","name":"Agentic coding","start":2025,"end":null,"dateLabel":"Aprox. desde 2025","precision":"approximate","status":"needs-review","lastVerified":null,"description":"El término se generalizó al hacerse habituales los agentes que editan, ejecutan y verifican. No tiene una fecha de origen clara ni un autor: es una descripción que se difundió en el sector.","importance":"Desplaza el trabajo de escribir código a especificar, supervisar y revisar.","technologies":["Claude Code","Codex","Cursor"],"relatedConcepts":["agentic-coding"],"sources":[{"title":"Claude Code: overview","url":"https://code.claude.com/docs/en/overview"},{"title":"Anthropic: Building effective agents","url":"https://www.anthropic.com/engineering/building-effective-agents","note":"19 de diciembre de 2024"}]},{"id":"vibe-coding","lane":"ai-concepts","name":"Vibe coding","start":2025.1,"end":null,"dateLabel":"Febrero de 2025","precision":"exact","status":"verified","lastVerified":"2026-11-05","description":"Andrej Karpathy acuñó el término el 6 de febrero de 2025 para describir construir software con un LLM sin revisar el código.","importance":"Puso nombre a un uso real, útil en prototipos. También ha generado confusión al aplicarse a cualquier programación con IA.","technologies":["LLM"],"relatedConcepts":["vibe-coding"],"sources":[{"title":"Simon Willison: Not all AI-assisted programming is vibe coding","url":"https://simonwillison.net/2025/Mar/19/vibe-coding/"}]},{"id":"context-engineering","lane":"ai-concepts","name":"Context engineering","start":2025.5,"end":null,"dateLabel":"Se difunde en 2025","precision":"approximate","status":"verified","lastVerified":"2026-11-05","description":"A lo largo de 2025 se extendió este término para referirse a gestionar toda la información que recibe un modelo. Anthropic publicó el 29 de septiembre de 2025 una guía de referencia.","importance":"Amplió la atención del prompt al estado completo del contexto en agentes de larga duración.","technologies":["Compactación","Memoria","Subagentes"],"relatedConcepts":["context-engineering","context-management"],"sources":[{"title":"Anthropic: Effective context engineering for AI agents","url":"https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents","note":"29 de septiembre de 2025"}],"coexists":"No sustituye a la ingeniería de prompts: la engloba."},{"id":"agents-md","lane":"ai-concepts","name":"AGENTS.md y estandarización","start":2025.6,"end":null,"dateLabel":"Aprox. 2025; AAIF en diciembre de 2025","precision":"approximate","status":"verified","lastVerified":"2026-11-05","description":"AGENTS.md surgió como convención común de instrucciones para agentes, y OpenAI lo aportó a la Agentic AI Foundation, anunciada el 9 de diciembre de 2025.","importance":"Muestra que el ecosistema empieza a converger en formatos abiertos.","technologies":["AGENTS.md","AAIF"],"relatedConcepts":["agents-md"],"sources":[{"title":"AGENTS.md","url":"https://agents.md/","note":"Sitio oficial del formato"},{"title":"Linux Foundation: formation of the Agentic AI Foundation","url":"https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation","note":"9 de diciembre de 2025"}]},{"id":"agentic-engineering","lane":"ai-concepts","name":"Agentic engineering","start":2026.1,"end":null,"dateLabel":"Comienzos de 2026","precision":"approximate","status":"needs-review","lastVerified":null,"description":"A comienzos de 2026, crónicas del sector atribuyen a Andrej Karpathy la propuesta de este término como sucesor profesional del vibe coding. Las fuentes secundarias consultadas discrepan en la fecha exacta.","importance":"Refleja el paso de experimentar con agentes a tratarlos como parte de una práctica profesional.","technologies":["Orquestación","Revisión","Evals"],"relatedConcepts":["agentic-engineering"],"sources":[{"title":"The New Stack: Vibe coding is passé","url":"https://thenewstack.io/vibe-coding-is-passe/","note":"Fuente secundaria"}]},{"id":"harness-engineering","lane":"ai-concepts","name":"Harness engineering","start":2026.1,"end":null,"dateLabel":"Febrero–abril de 2026","precision":"approximate","status":"verified","lastVerified":"2026-11-05","description":"OpenAI publicó un artículo sobre esta práctica a comienzos de 2026, y Birgitta Böckeler la analizó el 2 de abril de 2026 en martinfowler.com, organizándola en guías y sensores.","importance":"Pone el foco en el sistema que rodea al agente, no solo en el modelo.","technologies":["Linters","Tests","Hooks"],"relatedConcepts":["harness-engineering","agentic-harness"],"sources":[{"title":"Birgitta Böckeler: Harness engineering for coding agent users","url":"https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html","note":"martinfowler.com, 2 de abril de 2026"},{"title":"OpenAI: Harness engineering","url":"https://openai.com/index/harness-engineering/","note":"Fuente primaria; bloqueó la lectura automática, contrastar a mano"}],"coexists":"Complementa a la ingeniería de contexto. No es una etapa que la reemplace."}]},"tools":{"capabilities":[["agentsMd","Lee AGENTS.md"],["mcp","MCP"],["skills","Skills"],["subagents","Subagentes"],["hooks","Hooks"],["worktrees","Git Worktrees"],["terminal","Terminal / CLI"],["ide","IDE o extensión"],["cloud","Ejecución en la nube"],["anyModel","Varios proveedores de modelos"]],"items":[{"id":"aider","name":"Aider","popular":true,"docs":"https://aider.chat/docs/","description":"“Pair programming” con IA en la terminal, muy integrado con Git y compatible con la mayoría de los LLM.","features":["Mapa del repositorio para dar contexto al modelo.","Integración estrecha con Git.","Modos code, architect, ask y help.","Corrección automática de errores de lint y test.","Convenciones en un archivo como `CONVENTIONS.md`."],"useCases":["Programar en pareja desde la terminal.","Usar el modelo o proveedor que prefieras, incluidos locales."],"advantages":["Gran libertad de modelos: OpenAI, Anthropic, Gemini, DeepSeek, Ollama, LM Studio, OpenRouter y más.","Su integración con Git facilita revisar y deshacer."],"limitations":["La página consultada no menciona MCP, skills, subagentes ni hooks.","Requiere gestionar claves y costes de cada proveedor."],"relatedConcepts":["terminal-agents","model-providers"],"sources":[{"title":"Aider: Documentation","url":"https://aider.chat/docs/"},{"title":"Aider: Specifying coding conventions","url":"https://aider.chat/docs/usage/conventions.html"},{"title":"AGENTS.md","url":"https://agents.md/","note":"Sitio oficial del formato"}],"capabilities":{"agentsMd":{"value":"yes","note":"Según agents.md."},"mcp":{"value":"unknown"},"skills":{"value":"unknown"},"subagents":{"value":"unknown"},"hooks":{"value":"unknown"},"worktrees":{"value":"unknown"},"terminal":{"value":"yes"},"ide":{"value":"unknown"},"cloud":{"value":"unknown"},"anyModel":{"value":"yes"}},"category":"terminal-agents","categoryLabel":"Terminal coding agents","status":"verified","lastVerified":"2026-11-05"},{"id":"autogen","name":"AutoGen","docs":"https://github.com/microsoft/autogen","description":"Framework de Microsoft para aplicaciones con varios agentes que colaboran conversando. Importante en la historia del sector, pero ya archivado.","editorialNote":"El repositorio indica que el proyecto está archivado y sin mantenimiento, ni siquiera de seguridad, y presenta Microsoft Agent Framework como su sucesor. No lo uses en proyectos nuevos.","features":["Agentes que colaboran mediante conversación.","Participación humana opcional.","Uso de herramientas externas."],"useCases":["Estudiar patrones multiagente.","Mantener sistemas ya existentes mientras se migran."],"advantages":["Trabajo influyente en la adopción de sistemas multiagente."],"limitations":["Archivado: sin correcciones, seguridad ni soporte.","Los usuarios deben migrar a Microsoft Agent Framework."],"relatedConcepts":["multi-agent-systems","agent-orchestration"],"sources":[{"title":"microsoft/autogen en GitHub","url":"https://github.com/microsoft/autogen"},{"title":"AutoGen: Next-Gen LLM Applications via Multi-Agent Conversation","url":"https://arxiv.org/abs/2308.08155","note":"arXiv, agosto de 2023"}],"category":"agent-frameworks","categoryLabel":"Agent frameworks","status":"verified","lastVerified":"2026-11-05"},{"id":"claude-agent-sdk","name":"Claude Agent SDK","docs":"https://code.claude.com/docs/en/agent-sdk/overview","description":"Biblioteca para Python y TypeScript que da a tus aplicaciones las mismas herramientas, bucle de agente y gestión de contexto que impulsan a Claude Code.","features":["Herramientas integradas de archivos, comandos y web.","Hooks, subagentes y MCP.","Permisos y sesiones.","Skills, comandos y memoria desde `.claude/`."],"useCases":["Incrustar un agente en tu aplicación.","Construir agentes con orquestación y permisos propios."],"advantages":["Reutiliza un harness maduro en vez de escribirlo.","Disponible en Python y TypeScript."],"limitations":["Vinculado a modelos Claude.","Sujeto a los términos comerciales de Anthropic; usa autenticación por API key."],"relatedConcepts":["agent-architecture","agentic-harness","subagents"],"sources":[{"title":"Claude Agent SDK: overview","url":"https://code.claude.com/docs/en/agent-sdk/overview"}],"category":"agent-frameworks","categoryLabel":"Agent frameworks","status":"verified","lastVerified":"2026-11-05"},{"id":"claude-code","name":"Claude Code","popular":true,"docs":"https://code.claude.com/docs/en/overview","description":"Herramienta de programación agéntica de Anthropic: lee el código, edita archivos, ejecuta comandos y se integra con tus herramientas. Disponible en terminal, IDE, app de escritorio y web.","features":["Instrucciones con `CLAUDE.md` o `AGENTS.md`, y auto memory.","Skills, subagentes y hooks.","Conexión a herramientas externas con MCP.","Sesiones aisladas con `--worktree` y subagentes con `isolation: worktree`.","Modo no interactivo (`claude -p`) para scripts y CI.","Integración con GitHub Actions y GitLab CI/CD.","Tareas programadas, en la nube o en el escritorio."],"useCases":["Implementar funcionalidades y corregir bugs en varios archivos.","Automatizar tests, migraciones y dependencias.","Revisión de código y triaje en CI.","Trabajo en paralelo con varias sesiones."],"advantages":["Las mismas instrucciones, ajustes y servidores MCP funcionan en todas sus superficies.","Muy configurable mediante skills, hooks y subagentes.","Se puede automatizar en scripts."],"limitations":["La mayoría de superficies requieren una suscripción de Claude o una cuenta de Anthropic Console.","Centrada en modelos Claude, aunque CLI y extensiones admiten proveedores externos que los sirven.","Un `.claude/settings.json` mal configurado o permisos amplios conllevan riesgo real en tu máquina."],"relatedConcepts":["terminal-agents","agentic-coding","claude-md","skills","subagents","hooks","git-worktrees"],"sources":[{"title":"Claude Code: overview","url":"https://code.claude.com/docs/en/overview"},{"title":"Claude Code: Run parallel sessions with worktrees","url":"https://code.claude.com/docs/en/worktrees"},{"title":"Claude Code: Hooks reference","url":"https://code.claude.com/docs/en/hooks"},{"title":"Claude Code: Skills","url":"https://code.claude.com/docs/en/skills"},{"title":"Claude Code: Subagents","url":"https://code.claude.com/docs/en/sub-agents"}],"capabilities":{"agentsMd":{"value":"yes","note":"Si no hay CLAUDE.md, o importado desde él."},"mcp":{"value":"yes"},"skills":{"value":"yes"},"subagents":{"value":"yes"},"hooks":{"value":"yes"},"worktrees":{"value":"yes"},"terminal":{"value":"yes"},"ide":{"value":"yes","note":"VS Code y JetBrains."},"cloud":{"value":"yes","note":"Claude Code en la web."},"anyModel":{"value":"partial","note":"Modelos Claude, también por proveedores externos."}},"category":"terminal-agents","categoryLabel":"Terminal coding agents","status":"verified","lastVerified":"2026-11-05"},{"id":"cline","name":"Cline","popular":true,"docs":"https://docs.cline.bot/","description":"Agente de código para editor y terminal que lee y escribe archivos, ejecuta comandos y usa un navegador, pidiendo tu aprobación explícita en cada acción.","features":["Modos Plan y Act.","Aprobación humana de cada acción.","Checkpoints para retroceder.","MCP, con servidores locales y remotos.","CLI, app de escritorio, extensión de VS Code y plugin de JetBrains.","Kanban para gestionar agentes en paralelo.","Bring Your Own Key."],"useCases":["Trabajar con supervisión estrecha.","Usar tus propias credenciales de proveedor o un modelo local.","Automatización sin interfaz con la CLI."],"advantages":["Control humano por defecto.","Muchos editores y proveedores.","Separación clara entre planificar y actuar."],"limitations":["Aprobar cada acción puede resultar lento en tareas largas.","Su documentación llama open source a la app de escritorio; verifica la licencia de cada componente."],"relatedConcepts":["ai-coding-assistants","planning-reasoning","permissions","mcp"],"sources":[{"title":"Cline: Documentation","url":"https://docs.cline.bot/"},{"title":"Cline: Plan & Act","url":"https://docs.cline.bot/features/plan-and-act"},{"title":"Cline: MCP overview","url":"https://docs.cline.bot/mcp/mcp-overview"}],"capabilities":{"agentsMd":{"value":"unknown"},"mcp":{"value":"yes"},"skills":{"value":"unknown"},"subagents":{"value":"unknown"},"hooks":{"value":"unknown"},"worktrees":{"value":"unknown"},"terminal":{"value":"yes"},"ide":{"value":"yes"},"cloud":{"value":"unknown"},"anyModel":{"value":"yes","note":"BYOK, incluidos entornos locales."}},"category":"coding-assistants","categoryLabel":"Coding assistants","status":"verified","lastVerified":"2026-11-05"},{"id":"cursor","name":"Cursor","popular":true,"docs":"https://cursor.com/docs","description":"Editor con agente integrado para entender código, planificar y construir funcionalidades, corregir errores y revisar cambios, con modelos de varios proveedores.","features":["Agente con Plan Mode.","Autocompletado Tab.","Rules, skills, plugins y MCP.","Subagentes y hooks.","Cloud Agents.","Worktrees.","Integraciones con GitHub, GitLab, Slack y Linear, entre otros."],"useCases":["Desarrollo diario en un editor gráfico.","Revisar diffs visualmente mientras trabaja el agente.","Delegar tareas en agentes en la nube."],"advantages":["Experiencia integrada de edición y agente.","Permite elegir entre modelos de varios proveedores.","Admite ampliaciones con skills, MCP y reglas."],"limitations":["Es un entorno propio: adoptarlo implica cambiar de editor.","La tabla de modelos y sus capacidades cambian: comprueba la documentación vigente."],"editorialNote":"La presencia de subagentes, hooks, Cloud Agents y worktrees se ha confirmado por las páginas del índice oficial de documentación, no probando el producto.","relatedConcepts":["ai-coding-assistants","rules","mcp"],"sources":[{"title":"Cursor: Documentation","url":"https://cursor.com/docs"},{"title":"Cursor: índice de documentación (llms.txt)","url":"https://cursor.com/llms.txt"},{"title":"AGENTS.md","url":"https://agents.md/","note":"Sitio oficial del formato"}],"capabilities":{"agentsMd":{"value":"yes","note":"Según agents.md."},"mcp":{"value":"yes"},"skills":{"value":"yes"},"subagents":{"value":"yes"},"hooks":{"value":"yes"},"worktrees":{"value":"yes"},"terminal":{"value":"unknown"},"ide":{"value":"yes"},"cloud":{"value":"yes","note":"Cloud Agents."},"anyModel":{"value":"yes"}},"category":"ai-ides","categoryLabel":"AI IDEs","status":"verified","lastVerified":"2026-11-05"},{"id":"windsurf","name":"Devin Desktop (antes Windsurf)","popular":true,"docs":"https://docs.devin.ai/desktop/cascade/cascade","aliases":["Windsurf","Cascade","Devin Local"],"description":"El editor antes conocido como Windsurf, hoy de Cognition y renombrado Devin Desktop. Su agente actual es Devin Local; Cascade queda como agente heredado.","editorialNote":"La documentación de Windsurf redirige ya a docs.devin.ai. Indica que Devin Desktop no inicia conversaciones nuevas de Cascade. La adquisición (julio de 2025) y la fecha del cambio de nombre (junio de 2026) proceden de fuentes secundarias.","features":["Agente Devin Local (Cascade como agente heredado).","Reglas y memorias.","Sesiones en su propio git worktree.","Hook `post_setup_worktree`.","Skills, recomendadas como destino de los workflows de Cascade.","MCP entre las herramientas documentadas en Cascade."],"useCases":["Desarrollo diario en un editor con agente.","Sesiones paralelas aisladas en worktrees."],"advantages":["Worktrees integrados, con hasta 20 por espacio de trabajo.","Rutas heredadas `.windsurf/` que siguen funcionando."],"limitations":["Producto en plena transición: hay documentación y funciones heredadas.","Los workflows de Cascade no se admiten en Devin Local.","El worktree solo se elige al iniciar la sesión."],"relatedConcepts":["ai-coding-assistants","git-worktrees","rules","persistent-memory"],"sources":[{"title":"Devin Desktop: Cascade","url":"https://docs.devin.ai/desktop/cascade/cascade"},{"title":"AGENTS.md","url":"https://agents.md/","note":"Sitio oficial del formato"}],"capabilities":{"agentsMd":{"value":"yes","note":"agents.md cita a Windsurf."},"mcp":{"value":"partial","note":"Documentado en Cascade, el agente heredado."},"skills":{"value":"yes"},"subagents":{"value":"unknown"},"hooks":{"value":"partial","note":"Documentado al menos post_setup_worktree."},"worktrees":{"value":"yes"},"terminal":{"value":"unknown"},"ide":{"value":"yes"},"cloud":{"value":"unknown"},"anyModel":{"value":"unknown"}},"category":"ai-ides","categoryLabel":"AI IDEs","status":"verified","lastVerified":"2026-11-05"},{"id":"gemini-cli","name":"Gemini CLI","popular":true,"docs":"https://geminicli.com/docs/","description":"Lleva los modelos Gemini a la terminal para entender código, automatizar tareas y crear flujos usando el contexto local del proyecto.","editorialNote":"Su documentación indica que, desde el 18 de junio de 2026, Antigravity CLI lo sustituye para los usuarios del nivel gratuito y de Google One. Comprueba si sigue siendo la opción adecuada para tu plan.","features":["Contexto de proyecto con `GEMINI.md`.","Servidores MCP.","Extensiones.","Agent Skills.","Subagentes en `.gemini/agents/`.","Hooks.","Checkpointing de sesión."],"useCases":["Automatizar tareas desde la terminal.","Entender y modificar repositorios con Gemini."],"advantages":["Se instala con npm.","Amplio conjunto de puntos de extensión."],"limitations":["Sustituido por Antigravity CLI para parte de sus usuarios.","Según su documentación, no está optimizado para Gemini 4 Argon."],"relatedConcepts":["terminal-agents","mcp","skills","hooks"],"sources":[{"title":"Gemini CLI: Documentation","url":"https://geminicli.com/docs/"},{"title":"AGENTS.md","url":"https://agents.md/","note":"Sitio oficial del formato"}],"capabilities":{"agentsMd":{"value":"yes","note":"Según agents.md."},"mcp":{"value":"yes"},"skills":{"value":"yes"},"subagents":{"value":"yes","note":"Activados por defecto."},"hooks":{"value":"yes"},"worktrees":{"value":"unknown"},"terminal":{"value":"yes"},"ide":{"value":"unknown"},"cloud":{"value":"unknown"},"anyModel":{"value":"unknown"}},"category":"terminal-agents","categoryLabel":"Terminal coding agents","status":"verified","lastVerified":"2026-11-05"},{"id":"github-copilot","name":"GitHub Copilot","popular":true,"docs":"https://docs.github.com/en/copilot/get-started/what-is-github-copilot","description":"El asistente de IA de GitHub: sugerencias en línea, preguntas sobre código, revisión de PR y un agente que convierte un issue en un pull request.","features":["Sugerencias de código mientras escribes.","Preguntas sobre archivos y repositorios.","Trabajo agéntico en varios pasos.","Revisión de código y PR.","Instrucciones personalizadas, prompts reutilizables y agentes personalizados.","Copilot CLI en terminal, con MCP.","Skills en `.github/skills` o `.agents/skills`."],"useCases":["Autocompletado diario.","Delegar un issue y recibir un PR.","Revisión automática dentro de GitHub."],"advantages":["Integración profunda con GitHub.","Punto de entrada sencillo, con varios planes."],"limitations":["Las capacidades dependen del plan, del cliente y de las políticas de la organización.","Copilot CLI no admite actualmente las políticas MCP a nivel de organización, según su documentación."],"relatedConcepts":["ai-coding-assistants","automated-code-review","ai-assisted-development"],"sources":[{"title":"GitHub Docs: What is GitHub Copilot?","url":"https://docs.github.com/en/copilot/get-started/what-is-github-copilot"},{"title":"GitHub Docs: About GitHub Copilot CLI","url":"https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli"},{"title":"GitHub Blog: Copilot is generally available","url":"https://github.blog/2022-06-21-github-copilot-is-generally-available-to-all-developers/","note":"21 de junio de 2022"},{"title":"AGENTS.md","url":"https://agents.md/","note":"Sitio oficial del formato"}],"capabilities":{"agentsMd":{"value":"partial","note":"agents.md cita al coding agent de Copilot."},"mcp":{"value":"yes"},"skills":{"value":"yes"},"subagents":{"value":"partial","note":"Documenta “custom agents”; no se ha confirmado que sean equivalentes."},"hooks":{"value":"unknown"},"worktrees":{"value":"unknown"},"terminal":{"value":"yes","note":"Copilot CLI."},"ide":{"value":"yes"},"cloud":{"value":"yes","note":"Agente que trabaja de issue a PR."},"anyModel":{"value":"unknown"}},"category":"coding-assistants","categoryLabel":"Coding assistants","status":"verified","lastVerified":"2026-11-05"},{"id":"langgraph","name":"LangGraph","docs":"https://docs.langchain.com/oss/python/langgraph/overview","description":"Framework y runtime de bajo nivel para agentes de larga duración y con estado, que se definen como grafos de estado, nodos y aristas.","features":["Ejecución duradera con checkpoints.","Intervención humana: detener, revisar o modificar el estado.","Memoria a corto y largo plazo.","Combinación de pasos de código y de LLM."],"useCases":["Workflows con estado que deben sobrevivir a fallos.","Agentes que requieren aprobación humana."],"advantages":["Control explícito del flujo.","No impone prompts ni un diseño de agente."],"limitations":["Es de bajo nivel: hay que diseñar más piezas.","Añade una abstracción que conviene comprender antes de adoptarla."],"relatedConcepts":["agent-orchestration","workflows","orchestrators"],"sources":[{"title":"LangGraph: overview","url":"https://docs.langchain.com/oss/python/langgraph/overview"}],"category":"agent-frameworks","categoryLabel":"Agent frameworks","status":"verified","lastVerified":"2026-11-05"},{"id":"mcp-inspector","name":"MCP Inspector","docs":"https://modelcontextprotocol.io/docs/tools/inspector","description":"La herramienta de referencia para probar y depurar servidores MCP, con clientes web, CLI y TUI en un solo paquete.","features":["Interfaz web, CLI y TUI.","Conexión a servidores locales y remotos.","Se ejecuta con `npx`, sin instalación.","Salida legible por máquina para CI."],"useCases":["Depurar un servidor MCP en desarrollo.","Comprobar herramientas expuestas en CI.","Inspeccionar un servidor de terceros antes de usarlo."],"advantages":["Permite ver el intercambio JSON-RPC.","Mismo núcleo en sus tres interfaces."],"limitations":["Requiere Node 22.19.0 o superior.","Sin keychain, guarda los secretos en un archivo sin cifrar salvo que aportes una clave."],"relatedConcepts":["mcp","mcp-servers"],"sources":[{"title":"MCP Inspector","url":"https://modelcontextprotocol.io/docs/tools/inspector"}],"category":"mcp-tools","categoryLabel":"MCP tools","status":"verified","lastVerified":"2026-11-05"},{"id":"openai-codex","name":"OpenAI Codex","popular":true,"docs":"https://learn.chatgpt.com/docs","aliases":["Codex CLI"],"description":"La herramienta de OpenAI para trabajar en código y otras tareas: recopila contexto, actúa y produce resultados. Disponible en las apps de ChatGPT, web, CLI, extensión de IDE y Codex Cloud.","features":["Configuración de agente con `AGENTS.md`.","Skills y plugins.","Subagentes.","Extensión con servidores MCP.","Git worktrees como opción de entorno.","Trabajo local y en la nube."],"useCases":["Explorar código y construir funcionalidades.","Revisar cambios y corregir fallos.","Delegar tareas en la nube."],"advantages":["Varias superficies para una misma herramienta.","Soporte nativo de AGENTS.md.","Opción de ejecutar en local o en la nube."],"limitations":["No confundir con el modelo Codex de 2021, que tenía el mismo nombre.","La documentación consultada no aclara por sí sola la licencia de la CLI ni los hooks."],"relatedConcepts":["terminal-agents","agents-md","agentic-coding"],"sources":[{"title":"OpenAI: Codex documentation","url":"https://learn.chatgpt.com/docs"},{"title":"AGENTS.md","url":"https://agents.md/","note":"Sitio oficial del formato"}],"capabilities":{"agentsMd":{"value":"yes"},"mcp":{"value":"yes"},"skills":{"value":"yes"},"subagents":{"value":"yes"},"hooks":{"value":"yes"},"worktrees":{"value":"yes"},"terminal":{"value":"yes"},"ide":{"value":"yes"},"cloud":{"value":"yes","note":"Codex Cloud."},"anyModel":{"value":"unknown"}},"category":"terminal-agents","categoryLabel":"Terminal coding agents","status":"verified","lastVerified":"2026-11-05"}]}};
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
const { applyPrefs, subscribe, toggle, has, setPref } = __require('state.js');
const { $, $$, html, toast } = __require('utils/dom.js');
const { initShell, setSidebar, updateActiveNav } = __require('components/shell.js');
const { icon } = __require('components/icons.js');
const { initMotion } = __require('utils/motion.js');
const { emptyState } = __require('components/ui.js');

const { dashboardPage } = __require('pages/dashboard.js');
const { encyclopediaPage } = __require('pages/encyclopedia.js');
const { articlePage } = __require('pages/article.js');
const { timelinePage } = __require('pages/timeline.js');
const { toolsPage, toolDetailPage, toolComparePage } = __require('pages/tools.js');
const { compareIndexPage, comparisonPage, customComparePage } = __require('pages/compare.js');
const { labPage } = __require('pages/lab.js');
const { playgroundPage, examplePage, realWorldPage } = __require('pages/playground.js');
const { pathsPage, pathDetailPage } = __require('pages/paths.js');
const { libraryPage } = __require('pages/library.js');
const { searchPage } = __require('pages/search-results.js');
const { simulatorPage } = __require('pages/simulator.js');

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
route('/playground/real-world', realWorldPage);
route('/playground/context-simulator', simulatorPage);
route('/playground/:id', examplePage);
route('/roadmaps', pathsPage);
route('/roadmaps/:id', pathDetailPage);
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
  const stopPage = page.mount?.(holder) ?? null;
  // Al refrescar por un cambio de estado no se repiten las animaciones de entrada.
  const stopMotion = keepFocus ? null : initMotion(holder);
  cleanup = () => { stopPage?.(); stopMotion?.(); };
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

// Aplica la herramienta elegida a todos los grupos de pestañas que la incluyan.
function selectTool(tool) {
  $$('[data-tool-tabs]').forEach((group) => {
    const tabs = $$('[data-tool-tab]', group);
    if (!tabs.some((t) => t.dataset.toolTab === tool)) return;
    tabs.forEach((t) => {
      const on = t.dataset.toolTab === tool;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    $$('[data-tool-panel]', group).forEach((p) => { p.hidden = p.dataset.toolPanel !== tool; });
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
    const toolTab = e.target.closest('[data-tool-tab]');
    if (toolTab) {
      selectTool(toolTab.dataset.toolTab);
      setPref('tool', toolTab.dataset.toolTab);
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
    const current = e.target.closest?.('[data-tool-tab]');
    if (current && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
      e.preventDefault();
      const tabs = $$('[data-tool-tab]', current.parentElement);
      const next = tabs[(tabs.indexOf(current) + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
      next.click();
      next.focus();
      return;
    }
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
__define('components/agent-run.js', (__require) => {
const { db } = __require('data-loader.js');
const { $, $$, html } = __require('utils/dom.js');
const { prefersReducedMotion } = __require('utils/motion.js');
const { icon } = __require('components/icons.js');

const STEP_MS = 1300;
const END_PAUSE_MS = 3500;

const line = (step) => html`<li class="ar-line ar-${step.phase}">${step.text}</li>`;

function agentRun() {
  const { phases, note } = db.simulations.agentRun;
  return html`<figure class="agent-run" id="agent-run">
    <figcaption class="ar-head">
      <ol class="ar-phases" aria-hidden="true">
        ${phases.map((p) => html`<li data-phase="${p.id}">${p.label}</li>`)}
      </ol>
      <button type="button" class="ar-toggle" id="ar-toggle" aria-pressed="false" aria-label="Pausar la simulación" title="Pausar">${icon('pause', 14)}</button>
    </figcaption>
    <ol class="ar-log" id="ar-log"></ol>
    <p class="ar-note">${note}</p>
  </figure>`;
}

// Reproduce el bucle del agente. Se detiene fuera de pantalla y al salir de la página.
function startAgentRun(root) {
  const { steps } = db.simulations.agentRun;
  const log = $('#ar-log', root);
  const figure = $('#agent-run', root);
  const toggle = $('#ar-toggle', root);

  if (prefersReducedMotion()) {
    log.innerHTML = steps.map((s) => line(s).toString()).join('');
    toggle.hidden = true;
    return null;
  }

  let index = 0;
  let timer = null;
  let paused = false;
  let visible = true;

  const setPhase = (phase) => {
    $$('[data-phase]', figure).forEach((el) => el.classList.toggle('on', el.dataset.phase === phase));
  };

  const schedule = (delay) => {
    clearTimeout(timer);
    if (!paused && visible && !document.hidden) timer = setTimeout(tick, delay);
  };

  function tick() {
    if (index === 0) log.innerHTML = '';
    const step = steps[index];
    log.insertAdjacentHTML('beforeend', line(step).toString());
    log.scrollTop = log.scrollHeight;
    setPhase(step.phase);
    index = (index + 1) % steps.length;
    schedule(index === 0 ? END_PAUSE_MS : STEP_MS);
  }

  toggle.addEventListener('click', () => {
    paused = !paused;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? 'Reanudar la simulación' : 'Pausar la simulación');
    toggle.title = paused ? 'Reanudar' : 'Pausar';
    toggle.innerHTML = icon(paused ? 'play' : 'pause', 14).toString();
    if (paused) clearTimeout(timer); else schedule(0);
  });

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) schedule(STEP_MS); else clearTimeout(timer);
  });
  observer.observe(figure);

  const onVisibility = () => { if (document.hidden) clearTimeout(timer); else schedule(STEP_MS); };
  document.addEventListener('visibilitychange', onVisibility);

  tick();

  return () => {
    clearTimeout(timer);
    observer.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
  };
}

return { get agentRun() { return agentRun; }, get startAgentRun() { return startAgentRun; } };
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
  play: '<path d="M7 4.5v15l12-7.5z"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  next: '<path d="M6 5v14l10-7zM18 5v14"/>',
  prev: '<path d="M18 5v14L8 12zM6 5v14"/>',
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
  { href: '#/roadmaps', match: /^\/(roadmaps|paths)/, label: 'Roadmaps', icon: 'route' },
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
const { richInline } = __require('utils/rich-text.js');
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

// Pestañas por herramienta. La herramienta elegida se recuerda y se aplica en todo el sitio.
function toolTabs(items) {
  const preferred = getState().prefs.tool;
  const active = items.some((i) => i.tool === preferred) ? preferred : items[0].tool;
  return html`<div class="tool-tabs" data-tool-tabs>
    <div class="tool-tablist" role="tablist" aria-label="Elige una herramienta">
      ${items.map((i) => html`<button type="button" role="tab" class="tool-tab" data-tool-tab="${i.tool}" aria-selected="${String(i.tool === active)}" tabindex="${i.tool === active ? 0 : -1}">${i.tool}</button>`)}
    </div>
    ${items.map((i) => html`<div class="tool-panel" role="tabpanel" data-tool-panel="${i.tool}" ${i.tool === active ? '' : html`hidden`}>
      ${i.text ? html`<p class="tool-note">${i.path && !i.code ? html`<code>${i.path}</code> ` : ''}${richInline(i.text)}</p>` : ''}
      ${i.code ? codeBlock({ code: i.code, language: i.language, filename: i.path }) : ''}
    </div>`)}
  </div>`;
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

return { get difficultyBadge() { return difficultyBadge; }, get statusBadge() { return statusBadge; }, get verifiedLine() { return verifiedLine; }, get toggleButton() { return toggleButton; }, get codeBlock() { return codeBlock; }, get toolTabs() { return toolTabs; }, get emptyState() { return emptyState; }, get sourcesList() { return sourcesList; }, get chips() { return chips; }, get progressBar() { return progressBar; }, get conceptRow() { return conceptRow; }, get filterGroup() { return filterGroup; }, get readCount() { return readCount; } };
});
__define('data-loader.js', (__require) => {
// Carga las colecciones JSON y construye los índices que usa el resto de la app.
const COLLECTIONS = ['categories', 'concepts', 'tools', 'timeline', 'comparisons', 'examples', 'architectures', 'learning-paths', 'real-world', 'simulations'];

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

  COLLECTIONS.forEach((name, i) => { db[{ 'learning-paths': 'paths', 'real-world': 'realWorld' }[name] ?? name] = loaded[i]; });

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

  // Cada roadmap se aplana para calcular progreso y recorrerlo en orden.
  db.paths.forEach((path) => {
    path.stages.forEach((stage) => {
      stage.allNodes = stage.nodes.flatMap((node) => [
        { ...node, optional: false },
        ...(node.branches ?? []).map((branch) => ({ ...branch, optional: true })),
      ]);
    });
    path.allNodes = path.stages.flatMap((stage) => stage.allNodes);
    path.concepts = path.allNodes.map((node) => db.conceptById.get(node.concept));
    path.steps = path.allNodes;
  });

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
const { readingBar } = __require('utils/motion.js');
const { icon } = __require('components/icons.js');
const { codeBlock, difficultyBadge, sourcesList, toggleButton, toolTabs, verifiedLine } = __require('components/ui.js');

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
    ...(concept.perTool ? [['por-herramienta', 'En cada herramienta', toolTabs(concept.perTool)]] : []),
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
      const stopBar = readingBar();
      return () => { observer.disconnect(); stopBar(); };
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
const { miniMap } = __require('pages/paths.js');
const { agentRun, startAgentRun } = __require('components/agent-run.js');

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
      return html`<li><a href="#/roadmaps/${p.id}">
        <span class="eyebrow">${p.level} · ${plural(p.stages.length, 'etapa')}</span>
        <strong>${p.title}</strong>
        <span class="muted small">${p.description}</span>
        ${miniMap(p)}
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
        <div class="hero-text">
        <p class="eyebrow">Enciclopedia · Timeline · Explorer</p>
        <h1>El mapa del desarrollo con agentes de IA.</h1>
        <p class="lead">Agentes, skills, subagentes, memoria, MCP y worktrees explicados con rigor y con sus fuentes a la vista, para entender qué hace cada pieza y cómo encaja con las demás.</p>
        <div class="search-box search-hero" id="hero-search" role="search">
          <span class="search-icon">${icon('search', 18)}</span>
          <input type="search" placeholder="¿Qué quieres entender? Prueba con “git worktrees” o “MCP”" aria-label="Buscar en el atlas" autocomplete="off" spellcheck="false">
          <div class="search-panel" hidden></div>
        </div>
        <dl class="stats">
          ${stats.map((s) => html`<div><dd><a href="${s.href}" data-count="${s.n}">${s.n}</a></dd><dt>${s.label}</dt></div>`)}
        </dl>
        <p class="small muted editorial-note">${verified} de ${db.concepts.length} artículos tienen estado <strong>Verified</strong>. Cada ficha indica qué se ha contrastado y cuándo; <a href="#/encyclopedia">consulta el índice</a>.</p>
        </div>
        ${agentRun()}
      </section>

      <section class="section">
        <a class="real-banner" href="#/playground/context-simulator">
          <span><span class="eyebrow">Interactivo</span><strong>¿Qué llena el contexto de tu agente?</strong><span class="muted small">Activa skills, servidores MCP o archivos, y prueba a compactar o a delegar en un subagente.</span></span>
          ${icon('arrowRight', 18)}
        </a>
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
          <h2 class="section-title">Roadmaps</h2>
          <a class="link-more" href="#/roadmaps">Todos los roadmaps ${icon('arrowRight', 14)}</a>
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
    mount(root) {
      attachSearchBox($('#hero-search', root));
      return startAgentRun(root);
    },
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
        <p class="lead">${category ? category.description : 'Seis regiones de conocimiento sobre el desarrollo con agentes de IA, de qué es un agente a cómo se evalúa. Todos los artículos siguen la misma estructura.'}</p>
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
const { prefersReducedMotion } = __require('utils/motion.js');

const STEP_MS = 2800;
const TOKEN_MS = 650;

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
      <div class="flow-bar">
        <button type="button" class="btn btn-primary" id="flow-play">${icon('play', 14)}<span>Ver el flujo</span></button>
        <button type="button" class="btn btn-icon" id="flow-prev" aria-label="Paso anterior" title="Paso anterior">${icon('prev', 15)}</button>
        <button type="button" class="btn btn-icon" id="flow-next" aria-label="Paso siguiente" title="Paso siguiente">${icon('next', 15)}</button>
        <span class="small muted" id="flow-count" aria-live="polite"></span>
      </div>
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

      // Reproducción paso a paso por las conexiones directas del diagrama.
      const svg = $('.diagram', root);
      const edgesEl = $$('.dg-edge', svg);
      const flow = arch.edges.map((edge, index) => ({ edge, el: edgesEl[index] })).filter(({ edge }) => !edge.dashed);
      const playBtn = $('#flow-play', root);
      const count = $('#flow-count', root);
      let position = -1;
      let timer = null;
      let frame = null;
      let token = null;

      const moveToken = (line) => {
        token?.remove();
        cancelAnimationFrame(frame);
        if (prefersReducedMotion()) return;
        const from = [line.x1.baseVal.value, line.y1.baseVal.value];
        const to = [line.x2.baseVal.value, line.y2.baseVal.value];
        token = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        token.setAttribute('r', '6');
        token.setAttribute('class', 'dg-token');
        svg.append(token);
        const start = performance.now();
        const step = (now) => {
          const t = Math.min((now - start) / TOKEN_MS, 1);
          const eased = t * (2 - t);
          token.setAttribute('cx', from[0] + (to[0] - from[0]) * eased);
          token.setAttribute('cy', from[1] + (to[1] - from[1]) * eased);
          if (t < 1) frame = requestAnimationFrame(step); else token.remove();
        };
        frame = requestAnimationFrame(step);
      };

      const setPlaying = (on) => {
        clearTimeout(timer);
        timer = null;
        playBtn.innerHTML = html`${icon(on ? 'pause' : 'play', 14)}<span>${on ? 'Pausar' : position >= 0 ? 'Continuar' : 'Ver el flujo'}</span>`.toString();
      };

      const goTo = (index) => {
        position = (index + flow.length) % flow.length;
        const { edge, el } = flow[position];
        select(edge.to);
        el.classList.add('active');
        moveToken($('line', el));
        count.textContent = `Paso ${position + 1} de ${flow.length}`;
      };

      const play = () => {
        goTo(position + 1);
        setPlaying(true);
        timer = setTimeout(play, STEP_MS);
      };

      playBtn.addEventListener('click', () => {
        if (timer) setPlaying(false); else play();
      });
      $('#flow-next', root).addEventListener('click', () => { setPlaying(false); goTo(position + 1); setPlaying(false); });
      $('#flow-prev', root).addEventListener('click', () => { setPlaying(false); goTo(position - 1); setPlaying(false); });
      svg.addEventListener('click', () => { if (timer) setPlaying(false); });

      return () => {
        clearTimeout(timer);
        cancelAnimationFrame(frame);
      };
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
const { $, $$, html, raw } = __require('utils/dom.js');
const { plural } = __require('utils/format.js');
const { getState, has, setActivePath, subscribe } = __require('state.js');
const { replaceHash } = __require('router.js');
const { icon } = __require('components/icons.js');
const { difficultyBadge, progressBar, readCount, toggleButton } = __require('components/ui.js');

const refOf = (id) => `article:${id}`;
const isRead = (id) => has('read', refOf(id));

// Mapa en miniatura: una línea ondulada con una estación por concepto y un hueco entre etapas.
function miniMap(path) {
  const width = 280;
  const height = 44;
  const total = path.steps.length + path.stages.length - 1;
  const step = (width - 16) / Math.max(total, 1);
  const points = [];
  let slot = 0;
  path.stages.forEach((stage) => {
    stage.allNodes.forEach((node) => {
      const x = 8 + slot * step;
      points.push({ x, y: height / 2 + Math.sin(slot * 0.9) * 11, read: isRead(node.concept), optional: node.optional });
      slot += 1;
    });
    slot += 1;
  });
  const line = points.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const dots = points.map((p) => `<circle class="mm-dot ${p.read ? 'done' : ''}" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${p.optional ? 2.6 : 4}"/>`).join('');
  return raw(`<svg class="mini-map" viewBox="0 0 ${width} ${height}" aria-hidden="true"><path d="${line}"/>${dots}</svg>`);
}

function roadmapCard(path) {
  const done = readCount(path.concepts);
  return html`<li class="reveal"><a class="rm-card" href="#/roadmaps/${path.id}">
    <span class="eyebrow">${path.level} · ${plural(path.stages.length, 'etapa')} · ${plural(path.concepts.length, 'concepto')}${path.id === getState().activePath ? ' · Activo' : ''}</span>
    <strong>${path.title}</strong>
    <span class="muted small">${path.description}</span>
    ${miniMap(path)}
    <span class="path-progress">${progressBar(done, path.concepts.length, `Progreso en ${path.title}`)}<span class="small muted">${done}/${path.concepts.length}</span></span>
  </a></li>`;
}

function pathsPage() {
  return {
    title: 'Roadmaps',
    crumbs: [{ label: 'Roadmaps' }],
    liveState: true,
    content: html`<div class="page">
      <header class="page-head">
        <p class="eyebrow">Roadmaps</p>
        <h1>Elige tu camino</h1>
        <p class="lead">Mapas visuales para aprender en orden. La línea principal es lo esencial y las ramas son opcionales. El progreso avanza a medida que marcas artículos como leídos.</p>
      </header>
      <ul class="rm-grid">${db.paths.map(roadmapCard)}</ul>
    </div>`,
  };
}

function station(node, kind) {
  const concept = db.conceptById.get(node.concept);
  return html`<button type="button" class="rm-node rm-${kind}" data-node="${node.concept}" aria-pressed="false">
    <span class="rm-dot" aria-hidden="true">${icon('check', 12)}</span>
    <span class="rm-node-text"><strong>${concept.title}</strong>${kind === 'branch' ? html`<small>Opcional</small>` : ''}</span>
  </button>`;
}

function panel(path, id) {
  const node = path.allNodes.find((n) => n.concept === id);
  const concept = db.conceptById.get(id);
  const index = path.concepts.indexOf(concept);
  const next = path.concepts.slice(index + 1).find((c) => !isRead(c.id));
  return html`<button type="button" class="rm-panel-close btn-ghost" data-close-panel aria-label="Cerrar detalle">${icon('close', 18)}</button>
    <p class="eyebrow">${concept.code} · ${node.optional ? 'Rama opcional' : 'Línea principal'}</p>
    <h2>${concept.title}</h2>
    <p class="rm-why">${node.why}</p>
    <p class="muted">${concept.description}</p>
    <p class="meta-line">${difficultyBadge(concept.difficulty)}</p>
    <div class="rm-panel-actions">
      <a class="btn btn-primary" href="#/article/${id}">Leer el artículo ${icon('arrowRight', 15)}</a>
      ${toggleButton('read', refOf(id))}
    </div>
    ${next ? html`<button type="button" class="link-btn rm-next" data-goto="${next.id}">Siguiente sin leer: ${next.title} ${icon('arrowRight', 14)}</button>` : ''}`;
}

function pathDetailPage({ params, query }) {
  const path = db.pathById.get(params.id);
  if (!path) return null;
  const isActive = getState().activePath === path.id;

  return {
    title: path.title,
    crumbs: [{ label: 'Roadmaps', href: '#/roadmaps' }, { label: path.title }],
    content: html`<div class="page roadmap">
      <header class="page-head">
        <p class="eyebrow">${path.level} · ${plural(path.stages.length, 'etapa')}</p>
        <h1>${path.title}</h1>
        <p class="lead">${path.description}</p>
        <div class="page-progress" id="rm-progress"></div>
        <div class="art-actions">
          <button type="button" class="btn" id="rm-active" aria-pressed="${String(isActive)}">${isActive ? 'Roadmap activo' : 'Fijar como activo'}</button>
        </div>
      </header>
      <div class="legend">
        <span><i class="rm-key"></i>Línea principal</span>
        <span><i class="rm-key rm-key-branch"></i>Rama opcional</span>
        <span><i class="rm-key rm-key-done"></i>Leído</span>
      </div>
      <div class="rm-layout">
        <ol class="rm-map">
          ${path.stages.map((stage, s) => html`<li class="rm-stage reveal">
            <header class="rm-stage-head">
              <span class="rm-stage-num">${String(s + 1).padStart(2, '0')}</span>
              <div><h2>${stage.title}</h2><p class="muted small">${stage.goal}</p></div>
            </header>
            <ul class="rm-line">
              ${stage.nodes.map((node) => html`<li class="rm-row" data-row="${node.concept}">
                ${station(node, 'core')}
                ${node.branches?.length ? html`<div class="rm-branches">${node.branches.map((b) => station(b, 'branch'))}</div>` : ''}
              </li>`)}
            </ul>
          </li>`)}
        </ol>
        <aside class="rm-panel" id="rm-panel" aria-live="polite"></aside>
      </div>
    </div>`,
    mount(root) {
      const panelEl = $('#rm-panel', root);
      const progressEl = $('#rm-progress', root);

      const select = (id, { focus = false, reveal = true } = {}) => {
        $$('.rm-node', root).forEach((n) => {
          const on = n.dataset.node === id;
          n.classList.toggle('selected', on);
          n.setAttribute('aria-pressed', String(on));
          if (on && focus) n.focus({ preventScroll: true });
          if (on && reveal) n.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        });
        panelEl.innerHTML = panel(path, id).toString();
        panelEl.classList.add('open');
        panelEl.classList.remove('swap');
        void panelEl.offsetWidth;
        panelEl.classList.add('swap');
        replaceHash(`#/roadmaps/${path.id}?node=${id}`);
      };

      const paint = () => {
        const firstUnread = path.concepts.find((c) => !isRead(c.id));
        $$('.rm-node', root).forEach((n) => {
          n.classList.toggle('done', isRead(n.dataset.node));
          n.classList.toggle('current', n.dataset.node === firstUnread?.id);
        });
        $$('.rm-row', root).forEach((r) => r.classList.toggle('done', isRead(r.dataset.row)));
        const done = readCount(path.concepts);
        progressEl.innerHTML = html`${progressBar(done, path.concepts.length, 'Progreso en el roadmap')}<span class="small muted">${done} de ${path.concepts.length} leídos</span>`.toString();
        const current = $('.rm-node.selected', root)?.dataset.node;
        if (current) {
          const nextBtn = $('.rm-next', panelEl);
          const index = path.concepts.findIndex((c) => c.id === current);
          const next = path.concepts.slice(index + 1).find((c) => !isRead(c.id));
          if (nextBtn && next) {
            nextBtn.dataset.goto = next.id;
            nextBtn.innerHTML = html`Siguiente sin leer: ${next.title} ${icon('arrowRight', 14)}`.toString();
          } else if (nextBtn) nextBtn.remove();
        }
      };

      root.addEventListener('click', (e) => {
        const node = e.target.closest('.rm-node');
        if (node) { select(node.dataset.node, { reveal: false }); return; }
        const goto = e.target.closest('[data-goto]');
        if (goto) { select(goto.dataset.goto, { focus: true }); return; }
        if (e.target.closest('[data-close-panel]')) panelEl.classList.remove('open');
      });
      $('#rm-active', root).addEventListener('click', (e) => {
        const on = getState().activePath !== path.id;
        setActivePath(on ? path.id : null);
        e.target.textContent = on ? 'Roadmap activo' : 'Fijar como activo';
        e.target.setAttribute('aria-pressed', String(on));
      });

      paint();
      const initial = path.allNodes.find((n) => n.concept === query.node)?.concept
        ?? path.concepts.find((c) => !isRead(c.id))?.id
        ?? path.concepts[0].id;
      select(initial, { reveal: false });
      // En móvil el panel es una hoja inferior: no se abre hasta que se toca una estación.
      if (!query.node && window.matchMedia('(max-width: 1100px)').matches) panelEl.classList.remove('open');
      return subscribe(paint);
    },
  };
}

return { get miniMap() { return miniMap; }, get pathsPage() { return pathsPage; }, get pathDetailPage() { return pathDetailPage; } };
});
__define('pages/playground.js', (__require) => {
const { db } = __require('data-loader.js');
const { $, $$, html } = __require('utils/dom.js');
const { rich, richInline } = __require('utils/rich-text.js');
const { visit } = __require('state.js');
const { icon } = __require('components/icons.js');
const { chips, codeBlock, emptyState, filterGroup, sourcesList, toggleButton, toolTabs, verifiedLine } = __require('components/ui.js');

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
      <a class="real-banner" href="#/playground/real-world">
        <span><span class="eyebrow">En el mundo real</span><strong>Cómo lo hacen Airflow, VS Code, goose o Gemini CLI</strong><span class="muted small">${db.realWorld.items.length} archivos de repositorios públicos, con lo que puedes aprender de cada uno.</span></span>
        ${icon('arrowRight', 18)}
      </a>
      <a class="real-banner" href="#/playground/context-simulator">
        <span><span class="eyebrow">Interactivo</span><strong>Simulador de contexto</strong><span class="muted small">Comprueba qué llena la ventana de un agente y cómo liberarla.</span></span>
        ${icon('arrowRight', 18)}
      </a>
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

function filesBlock(files) {
  const shared = files.filter((f) => !f.tool);
  const tabbed = files.filter((f) => f.tool);
  return html`${shared.map((f) => codeBlock({ code: f.code, language: f.language, filename: f.path }))}
    ${tabbed.length ? toolTabs(tabbed) : ''}`;
}

function realWorldPage() {
  const types = [...new Set(db.realWorld.items.map((i) => i.type))];
  let active = 'all';
  const grid = () => html`<ul class="real-grid">${db.realWorld.items.filter((i) => active === 'all' || i.type === active).map((i) => html`<li class="real-card reveal">
    <p class="eyebrow">${i.type} · ${i.tool}</p>
    <h2>${i.project}</h2>
    <p class="real-file"><code>${i.file}</code><span class="muted small">${i.size}</span></p>
    <p>${i.summary}</p>
    <ul class="mini-list">${i.highlights.map((h) => html`<li>${richInline(h)}</li>`)}</ul>
    <a class="link-more" href="${i.url}" target="_blank" rel="noopener noreferrer">Ver en GitHub ${icon('external', 14)}</a>
  </li>`)}</ul>`;
  return {
    title: 'En el mundo real',
    crumbs: [{ label: 'Playground', href: '#/playground' }, { label: 'En el mundo real' }],
    content: html`<div class="page">
      <header class="page-head">
        <p class="eyebrow">Repositorios públicos</p>
        <h1>En el mundo real</h1>
        <p class="lead">Archivos que usan de verdad proyectos conocidos. Lo mejor para aprender es abrirlos y compararlos: aquí te contamos qué mirar en cada uno.</p>
        <p class="small muted">${db.realWorld.note}</p>
      </header>
      <div class="filters">${filterGroup('real', 'Tipo', [{ value: 'all', label: 'Todos' }, ...types.map((t) => ({ value: t, label: t }))], active)}</div>
      <div id="real-list">${grid()}</div>
    </div>`,
    mount(root) {
      root.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-filter="real"]');
        if (!btn) return;
        active = btn.dataset.value;
        $$('[data-filter="real"]', root).forEach((b) => {
          b.classList.toggle('on', b === btn);
          b.setAttribute('aria-pressed', String(b === btn));
        });
        $('#real-list', root).innerHTML = grid().toString();
      });
    },
  };
}

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
        ${block('04', 'Código o configuración', filesBlock(ex.files))}
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

return { get playgroundPage() { return playgroundPage; }, get realWorldPage() { return realWorldPage; }, get examplePage() { return examplePage; } };
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
__define('pages/simulator.js', (__require) => {
const { db } = __require('data-loader.js');
const { $, $$, html } = __require('utils/dom.js');
const { icon } = __require('components/icons.js');

const format = (n) => n.toLocaleString('es-ES');

function statusFor(pct) {
  if (pct >= 100) return { cls: 'over', text: 'Contexto desbordado. El agente tendría que compactar o detenerse.' };
  if (pct >= 80) return { cls: 'high', text: 'Cerca del límite. Las instrucciones pierden peso frente a tanto material intermedio.' };
  if (pct >= 50) return { cls: 'mid', text: 'Va llenándose. Buen momento para pensar qué puedes delegar.' };
  return { cls: 'low', text: 'Hay margen. Cuanto más limpio, más peso tiene lo importante.' };
}

function simulatorPage() {
  const { capacity, items, actions, note } = db.simulations.contextWindow;
  const fresh = () => ({
    on: Object.fromEntries(items.map((i) => [i.id, i.on])),
    tokens: Object.fromEntries(items.map((i) => [i.id, i.tokens])),
    used: new Set(),
    message: '',
  });
  let state = fresh();

  const total = () => items.reduce((sum, i) => sum + (state.on[i.id] ? state.tokens[i.id] : 0), 0);

  return {
    title: 'Simulador de contexto',
    crumbs: [{ label: 'Playground', href: '#/playground' }, { label: 'Simulador de contexto' }],
    content: html`<div class="page sim">
      <header class="page-head">
        <p class="eyebrow">Interactivo</p>
        <h1>Simulador de contexto</h1>
        <p class="lead">Activa lo que carga tu agente y observa cómo se llena su ventana de contexto. Después, prueba las técnicas para liberarla.</p>
      </header>
      <section class="sim-gauge" aria-label="Uso de la ventana de contexto">
        <div class="sim-numbers"><strong id="sim-pct">0%</strong><span class="muted small" id="sim-tokens"></span></div>
        <div class="sim-bar" id="sim-bar"></div>
        <p class="sim-status" id="sim-status" role="status"></p>
      </section>
      <div class="sim-columns">
        <section>
          <h2 class="section-title small-title">Qué ocupa el contexto</h2>
          <ul class="sim-items">
            ${items.map((item, i) => html`<li>
              <label class="sim-item">
                <input type="checkbox" data-item="${item.id}" ${item.on ? html`checked` : ''} ${item.locked ? html`disabled` : ''}>
                <span class="sim-swatch" style="--i:${i}"></span>
                <span class="sim-item-text"><strong>${item.label}</strong><span class="muted small">${item.note}</span></span>
                <span class="sim-tokens" data-tokens="${item.id}"></span>
              </label>
            </li>`)}
          </ul>
        </section>
        <section>
          <h2 class="section-title small-title">Qué puedes hacer</h2>
          <ul class="sim-actions">
            ${actions.map((a) => html`<li>
              <button type="button" class="btn" data-action="${a.id}">${a.label}</button>
              <p class="muted small">${a.note} <a href="#/article/${a.concept}">Saber más</a></p>
            </li>`)}
          </ul>
          <button type="button" class="link-btn sim-reset" id="sim-reset">${icon('arrowLeft', 14)} Volver al estado inicial</button>
        </section>
      </div>
      <p class="callout">${icon('info', 16)}<span>${note}</span></p>
    </div>`,
    mount(root) {
      const bar = $('#sim-bar', root);
      bar.innerHTML = items.map((item, i) => `<span class="sim-seg" data-seg="${item.id}" style="--i:${i}" title="${item.label}"></span>`).join('');

      const paint = () => {
        const used = total();
        const pct = Math.round((used / capacity) * 100);
        const status = statusFor(pct);
        $('#sim-pct', root).textContent = `${pct}%`;
        $('#sim-tokens', root).textContent = `${format(used)} de ${format(capacity)} tokens (ilustrativo)`;
        const statusEl = $('#sim-status', root);
        statusEl.textContent = state.message || status.text;
        root.querySelector('.sim-gauge').dataset.level = status.cls;
        // Si se desborda, la barra se reescala para mostrar todas las piezas.
        const scale = Math.max(used, capacity);
        items.forEach((item) => {
          const tokens = state.on[item.id] ? state.tokens[item.id] : 0;
          $(`[data-seg="${item.id}"]`, root).style.width = `${(tokens / scale) * 100}%`;
          $(`[data-tokens="${item.id}"]`, root).textContent = format(state.tokens[item.id]);
        });
        $$('[data-action]', root).forEach((btn) => {
          const action = actions.find((a) => a.id === btn.dataset.action);
          const helps = Object.keys(action.effects).some((id) => state.on[id] && state.tokens[id] > action.effects[id]);
          btn.disabled = state.used.has(action.id) || !helps;
        });
      };

      root.addEventListener('change', (e) => {
        const id = e.target.dataset?.item;
        if (!id) return;
        state.on[id] = e.target.checked;
        state.message = '';
        paint();
      });

      root.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-action]');
        if (btn) {
          const action = actions.find((a) => a.id === btn.dataset.action);
          const before = total();
          Object.entries(action.effects).forEach(([id, tokens]) => { state.tokens[id] = Math.min(state.tokens[id], tokens); });
          state.used.add(action.id);
          state.message = `${action.label}: ${format(before - total())} tokens liberados. ${action.note}`;
          paint();
          return;
        }
        if (e.target.closest('#sim-reset')) {
          state = fresh();
          $$('[data-item]', root).forEach((input) => { input.checked = state.on[input.dataset.item]; });
          paint();
        }
      });

      paint();
    },
  };
}

return { get simulatorPage() { return simulatorPage; } };
});
__define('pages/timeline.js', (__require) => {
const { db } = __require('data-loader.js');
const { $, $$, html } = __require('utils/dom.js');
const { rich } = __require('utils/rich-text.js');
const { replaceHash } = __require('router.js');
const { chips, emptyState, filterGroup, sourcesList, statusBadge } = __require('components/ui.js');
const { icon } = __require('components/icons.js');

const START = 2021;
const NOW = 2027;

// Escala lineal desde el primer hito de la timeline.
function x(year) {
  const clamped = Math.min(Math.max(year, START), NOW);
  return ((clamped - START) / (NOW - START)) * 100;
}

const TICKS = [2021, 2022, 2023, 2024, 2025, 2026];

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
        <p class="eyebrow">Evolution of AI agent development</p>
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
  db.realWorld.items.forEach((r) => addDoc({
    type: 'example', ref: `real:${r.id}`, title: `${r.project}: ${r.file}`, subtitle: 'En el mundo real', href: '#/playground/real-world',
    body: [r.summary, ...r.highlights, r.type, r.tool],
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
  prefs: { theme: 'dark', readingSize: 'md', codeWrap: false, tool: null },
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
  toml: [
    [/(?<![^\s])#[^\n]*/y, 'com'],
    [/"""[\s\S]*?"""/y, 'str'], STRING,
    [/^\[[^\]\n]+\]/my, 'kw'],
    [/^[A-Za-z_][\w.-]*(?=\s*=)/my, 'attr'],
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
__define('utils/motion.js', (__require) => {
const { $, $$ } = __require('utils/dom.js');

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const AUTO_REVEAL = '.section, .art-section, .rows > .row, .atlas-index > li, .compare-list > li, .example-list > li, .tool-grid > li, .path-list > li, .search-results > li, .tl-lane, .plain-list > li';

function countUp(el) {
  const target = Number(el.dataset.count);
  const start = performance.now();
  const duration = 900;
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - progress) ** 3;
    el.textContent = Math.round(target * eased);
    if (progress < 1 && el.isConnected) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  // Con la pestaña en segundo plano no hay frames: el valor final queda garantizado.
  setTimeout(() => { el.textContent = target; }, duration + 150);
}

// Revela elementos al entrar en pantalla y anima los contadores. Devuelve su limpieza.
function initMotion(root) {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return null;

  const items = new Set([...$$(AUTO_REVEAL, root), ...$$('.reveal', root)]);
  items.forEach((el) => {
    el.classList.add('reveal', 'pending');
  });

  // El retardo escalonado solo se aplica a los que entran juntos en la misma pasada.
  const observer = new IntersectionObserver((entries) => {
    entries.filter((e) => e.isIntersecting).forEach((entry, i) => {
      entry.target.style.setProperty('--reveal-delay', `${Math.min(i * 45, 300)}ms`);
      entry.target.classList.remove('pending');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -6% 0px' });
  items.forEach((el) => observer.observe(el));

  const counters = new IntersectionObserver((entries) => {
    entries.filter((e) => e.isIntersecting).forEach((entry) => {
      countUp(entry.target);
      counters.unobserve(entry.target);
    });
  });
  $$('[data-count]', root).forEach((el) => {
    el.textContent = '0';
    counters.observe(el);
  });

  return () => {
    observer.disconnect();
    counters.disconnect();
  };
}

// Barra superior con el avance de lectura de la página actual.
function readingBar() {
  const bar = document.createElement('div');
  bar.className = 'read-bar';
  bar.setAttribute('aria-hidden', 'true');
  $('#topbar').append(bar);
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  return () => {
    window.removeEventListener('scroll', update);
    bar.remove();
  };
}

return { get initMotion() { return initMotion; }, get readingBar() { return readingBar; }, get prefersReducedMotion() { return prefersReducedMotion; } };
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
