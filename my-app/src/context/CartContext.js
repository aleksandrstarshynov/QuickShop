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

  // Retrieve userId from localStorage
  const getUserId = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    return user?.id || null;
  };

  // Load cart from the database
  const loadCart = async () => {
    const userId = getUserId();
    if (!userId) {
      setCart([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const cartFromServer = await fetchCartFromDB(userId);
      setCart(cartFromServer);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add a product to the cart
  const addToCart = async (product) => {
    const userId = getUserId();
    if (!userId) {
      alert('Please sign in to add this item to your cart.');
      return;
    }

    const productId = product._id;
    const existingItem = cart.find(item => item.product._id === productId);

    try {
      setLoading(true);
      if (existingItem) {
        const newQuantity = existingItem.quantity + 1;
        await updateCartInDB(userId, productId, newQuantity);
      } else {
        await addToCartInDB(userId, productId);
      }
      const fresh = await fetchCartFromDB(userId);
      setCart(fresh);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update the quantity of a cart item
  const updateQuantity = async (productId, newQuantity) => {
    const userId = getUserId();
    if (!userId || newQuantity < 1) return;

    try {
      setLoading(true);
      await updateCartInDB(userId, productId, newQuantity);
      const fresh = await fetchCartFromDB(userId);
      setCart(fresh);
    } catch (err) {
      console.error('Error updating quantity:', err);
    } finally {
      setLoading(false);
    }
  };

  // Remove an item from the cart
  const removeFromCart = async (productId) => {
    const userId = getUserId();
    if (!userId) return;

    try {
      setLoading(true);
      await deleteCartItemFromDB(userId, productId);
      const fresh = await fetchCartFromDB(userId);
      setCart(fresh);
    } catch (err) {
      console.error('Error deleting from cart:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load and reload on window focus
  useEffect(() => {
    loadCart();
    const handleFocus = () => loadCart();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        reloadCart: loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
