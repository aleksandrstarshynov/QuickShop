import slugify from 'slugify';

export function normalizeCategoryString(categoryStr) {
  if (!categoryStr) return [];
  return categoryStr
    .split(',')
    .map(c => slugify(c.trim(), { lower: true }))
    .filter(Boolean);
}
