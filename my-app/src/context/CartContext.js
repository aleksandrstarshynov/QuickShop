import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import {
  fetchCartFromDB,
  updateCartInDB,
  addToCartInDB,
  deleteCartItemFromDB,
} from '../controller/cartAPI';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const userId = user?.id;

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart for current user
  const loadCart = async () => {
    if (!userId) {
      setCart([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const fresh = await fetchCartFromDB(userId);
      setCart(fresh);
    } catch (error) {
      console.error('Error loading cart:', error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  // Add product and reload
  const addToCart = async (product) => {
    if (!userId) {
      alert('Please sign in to add items to your cart.');
      return;
    }
    setLoading(true);
    try {
      await addToCartInDB(userId, product._id);
      await loadCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Update quantity and reload
  const updateQuantity = async (productId, newQuantity) => {
    if (!userId || newQuantity < 1) return;
    setLoading(true);
    try {
      await updateCartInDB(userId, productId, newQuantity);
      await loadCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // Remove item and reload
  const removeFromCart = async (productId) => {
    if (!userId) return;
    setLoading(true);
    try {
      await deleteCartItemFromDB(userId, productId);
      await loadCart();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  // Reload cart whenever the user changes
  useEffect(() => {
    setCart([]); // clear previous user cart
    loadCart();
  }, [userId]);

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
