/**
 * Получает список товаров с DummyJSON API с пагинацией.
 * @param {Object} options
 * @param {string} options.category - Название категории (необязательно).
 * @param {number} options.limit - Сколько товаров получить (по умолчанию 20, максимум 100).
 * @param {number} options.skip - Сколько товаров пропустить (например, для пагинации).
 * @returns {Promise<Array>} Массив объектов товаров.
 */
export async function fetchProductDB({ category = "", limit = 20, skip = 0 } = {}) {
  const baseUrl = "https://dummyjson.com/products";

  const isCategoryValid = typeof category === 'string' && category.trim() !== "";
  const url = isCategoryValid
    ? `${baseUrl}/category/${category}?limit=${limit}&skip=${skip}`
    : `${baseUrl}?limit=${limit}&skip=${skip}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return [];
  }
}

/**
 * Получает один товар по ID.
 * @param {string|number} id - ID товара.
 * @returns {Promise<Object|null>} Объект товара или null при ошибке.
 */
export async function fetchProductById(id) {
  const baseUrl = "https://dummyjson.com/products";
  try {
    const response = await fetch(`${baseUrl}/${id}`);
    if (!response.ok) throw new Error('Продукт не найден');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении товара по id:", error);
    return null;
  }
}
