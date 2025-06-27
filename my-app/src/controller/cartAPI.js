const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

// Get cart by userId
export const fetchCartFromDB = async (userId) => {
  console.log('API_BASE =', API_BASE);
  try {
    const response = await fetch(`${API_BASE}/api/cart/${userId}`);
    if (!response.ok) throw new Error('Error loading cart');
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Add 1 item (add to cart)
export const addToCartInDB = async (userId, productId) => {
  try {
    const response = await fetch(`${API_BASE}/api/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId, quantity: 1 }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error adding to cart:', errorData);
      throw new Error('Error adding to cart');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Update quantity of items in cart
export const updateCartInDB = async (userId, productId, quantity) => {
  try {
    const response = await fetch(`${API_BASE}/api/cart`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId, quantity }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error updating cart:', errorData);
      throw new Error('Error updating cart');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};


// Remove item from cart
export const deleteCartItemFromDB = async (userId, productId) => {
  try {
    const response = await fetch(`${API_BASE}/api/cart/${userId}/${productId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error while deleting item');
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
