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

// Обновить товар в корзине (добавить или изменить количество)
export const updateCartInDB = async (userId, productId, quantity) => {
  console.log({ userId, productId, quantity });
  try {
    const response = await fetch(`${API_BASE}/api/cart`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, productId, quantity }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Ошибка от сервера:', errorData);
      throw new Error('Ошибка при обновлении корзины');
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
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
