/**
 * Получает ноутбуки с DummyJSON API с пагинацией.
 * @param {number} limit - Сколько товаров получить (максимум 100).
 * @param {number} skip - Сколько товаров пропустить (например, для следующей страницы).
 * @returns {Promise<Array>} Массив объектов ноутбуков.
 */

export async function fetchProductDB({ category = "", limit = 20, skip = 0 } = {}) {
  const baseUrl = "https://dummyjson.com/products";
  const url = category
    ? `${baseUrl}/category/${category}?limit=${limit}&skip=${skip}`
    : `${baseUrl}?limit=${limit}&skip=${skip}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return [];
  }
}
  