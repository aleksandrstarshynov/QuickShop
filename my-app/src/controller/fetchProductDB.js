import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE,
});

/**
 * Получить список товаров с пагинацией и по категории (если поддерживается сервером).
 * @param {Object} options
 * @param {string} options.category - Название категории (необязательно).
 * @param {number} options.limit - Сколько товаров получить (по умолчанию 20).
 * @param {number} options.skip - Сколько товаров пропустить (например, для пагинации).
 * @returns {Promise<Array>} Массив объектов товаров.
 */
export async function fetchProductDB({ category = '', limit = 20, skip = 0 } = {}) {
  try {
    const params = { limit, skip };
    if (category) params.category = category;

    const response = await api.get('/products', { params });
    return response.data.products || []; // предполагается, что сервер возвращает { products: [...] }
  } catch (error) {
    console.error('Ошибка при получении продуктов:', error);
    return [];
  }
}

/**
 * Получить один товар по ID.
 * @param {string|number} id - ID товара.
 * @returns {Promise<Object|null>} Объект товара или null при ошибке.
 */
export async function fetchProductById(id) {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении товара по ID:', error);
    return null;
  }
}
