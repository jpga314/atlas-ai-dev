const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

export function formatDate(iso) {
  if (!iso) return 'Sin verificar';
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export function plural(n, singular, pluralForm = `${singular}s`) {
  return `${n} ${n === 1 ? singular : pluralForm}`;
}

// Quita acentos y mayúsculas conservando la longitud para poder resaltar sobre el texto original.
export function normalize(text) {
  return String(text ?? '').normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
}

export const DIFFICULTY = {
  beginner: { label: 'Beginner', level: 1 },
  intermediate: { label: 'Intermediate', level: 2 },
  advanced: { label: 'Advanced', level: 3 },
};

export const STATUS = {
  verified: { label: 'Verified', hint: 'Contrastado con la fuente enlazada en la fecha indicada.' },
  'needs-review': { label: 'Needs review', hint: 'Tiene fuentes enlazadas, pero falta contrastarlo línea a línea.' },
  draft: { label: 'Draft', hint: 'Borrador: el término o el contenido aún no está asentado.' },
};
