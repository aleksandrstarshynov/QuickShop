import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE,
});

/**
 * Get a list of products with pagination and by category (if supported by the server).
 * @param {Object} options
 * @param {string|string[]} options.category - Category name or array of categories (optional).
 * @param {number} options.limit - How many items to get (default 20).
 * @param {number} options.skip - How many products to skip (for example, for pagination).
 * @returns {Promise<Array>} Array of product objects.
 */
export async function fetchProductDB({ category = '', limit = 20, skip = 0 } = {}) {
  try {
    const params = { limit, skip };

    if (Array.isArray(category)) {
      // if an array arrived, we glue it into a string separated by commas
      params.category = category.join(',');
    } else if (category) {
      params.category = category;
    }

    const response = await api.get('/products', { params });
    return response.data.products || [];
  } catch (error) {
    console.error('Error while receiving products:', error);
    return [];
  }
}

/**
 * Get one product by ID.
 * @param {string|number} id - Product ID.
 * @returns {Promise<Object|null>} The product object, or null on error.
 */
export async function fetchProductById(id) {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error receiving product by ID:', error);
    return null;
  }
}
