import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  fetchCartFromDB,
  updateCartInDB,
  addToCartInDB,
  deleteCartItemFromDB,
} from '../controller/cartAPI';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
const [cart, setCart] = useState([]);
const [loading, setLoading] = useState(true);

  // Get userId from localStorage
  const getUserId = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    return user?.id || null;
  };

  // We get the basket from the database
  const loadCart = async () => {
    const userId = getUserId();
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const cartFromServer = await fetchCartFromDB(userId);
      setCart(cartFromServer);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
    setLoading(false); 
  }
  };

  // Adding the product to the cart
  const addToCart = async (product) => {
    const userId = getUserId();
    if (!userId) {
      alert('Please sign in to add this item to your cart.');
      return;
    }

    const productId = product._id;
    const existingItem = cart.find(item => item.product._id === productId);

    try {
      if (existingItem) {
        // If the product is already available, we increase the quantity
        const newQuantity = existingItem.quantity + 1;
        await updateCartInDB(userId, productId, newQuantity);
      } else {
        // If the product is not there, we add it
        await addToCartInDB(userId, productId);
      }

      // Updating the basket from the server
      const updatedCart = await fetchCartFromDB(userId);
      setCart(updatedCart);
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  // Updating the quantity of goods
  const updateQuantity = async (productId, newQuantity) => {
    const userId = getUserId();
    if (!userId || newQuantity < 1) return;

    try {
      await updateCartInDB(userId, productId, newQuantity);
      setCart(prevCart =>
        prevCart.map(item =>
          item.product._id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  // Removing the item from the cart
  const removeFromCart = async (productId) => {
    const userId = getUserId();
    if (!userId) return;

    try {
      await deleteCartItemFromDB(userId, productId);
      setCart(prevCart => prevCart.filter(item => item.product._id !== productId));
    } catch (err) {
      console.error('Error deleting from recycle bin:', err);
    }
  };

  // Loading the basket on mount and focus
  useEffect(() => {
    loadCart();

    const handleFocus = () => loadCart();
    window.addEventListener('focus', handleFocus);

    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return (
      <CartContext.Provider value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        reloadCart: loadCart,
        loading
      }}>
      {children}
    </CartContext.Provider>
  );
};
