/**
 * 
 * @returns {Promise<Array<string>>} Массив строк с названиями категорий.
 */
export async function fetchCategories() {
  const url = 'https://dummyjson.com/products/categories';

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Ошибка при получении категорий');
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Ошибка при получении категорий:', error);
    return [];
  }
}
