const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

// Получить корзину по userId
export const fetchCartFromDB = async (userId) => {
  console.log('API_BASE =', API_BASE);
  try {
    const response = await fetch(`${API_BASE}/api/cart/${userId}`);
    if (!response.ok) throw new Error('Ошибка загрузки корзины');
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Добавить 1 товар (прибавить к корзине)
export const addToCartInDB = async (userId, productId) => {
  try {
    const response = await fetch(`${API_BASE}/api/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId, quantity: 1 }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Ошибка при добавлении в корзину:', errorData);
      throw new Error('Ошибка при добавлении в корзину');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Обновить количество товара в корзине
export const updateCartInDB = async (userId, productId, quantity) => {
  try {
    const response = await fetch(`${API_BASE}/api/cart`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId, quantity }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Ошибка при обновлении корзины:', errorData);
      throw new Error('Ошибка при обновлении корзины');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};


// Удалить товар из корзины
export const deleteCartItemFromDB = async (userId, productId) => {
  try {
    const response = await fetch(`${API_BASE}/api/cart/${userId}/${productId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Ошибка при удалении товара');
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
