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

  // Получаем userId из localStorage
  const getUserId = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    return user?.id || null;
  };

  // Получаем корзину из базы
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
      console.error('Ошибка загрузки корзины:', error);
    } finally {
    setLoading(false); 
  }
  };

  // Добавляем товар в корзину
  const addToCart = async (product) => {
    const userId = getUserId();
    if (!userId) {
      alert('Пожалуйста, войдите, чтобы добавить товар в корзину');
      return;
    }

    const productId = product._id;
    const existingItem = cart.find(item => item.product._id === productId);

    try {
      if (existingItem) {
        // Если товар уже есть — увеличиваем количество
        const newQuantity = existingItem.quantity + 1;
        await updateCartInDB(userId, productId, newQuantity);
      } else {
        // Если товара нет — добавляем его
        await addToCartInDB(userId, productId);
      }

      // Обновляем корзину с сервера
      const updatedCart = await fetchCartFromDB(userId);
      setCart(updatedCart);
    } catch (err) {
      console.error('Ошибка добавления в корзину:', err);
    }
  };

  // Обновляем количество товара
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
      console.error('Ошибка обновления количества:', err);
    }
  };

  // Удаляем товар из корзины
  const removeFromCart = async (productId) => {
    const userId = getUserId();
    if (!userId) return;

    try {
      await deleteCartItemFromDB(userId, productId);
      setCart(prevCart => prevCart.filter(item => item.product._id !== productId));
    } catch (err) {
      console.error('Ошибка удаления из корзины:', err);
    }
  };

  // Загружаем корзину при монтировании и фокусе
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
