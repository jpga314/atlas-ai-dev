import { esc } from './dom.js';

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

export function highlight(code, language) {
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
