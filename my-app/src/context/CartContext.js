import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchCartFromDB, updateCartInDB } from '../controller/cartAPI'; // ты можешь адаптировать


const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // получаем корзину из базы
  const loadCart = async () => {
  try {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user?.id;

    if (!userId) {
      console.warn('Пользователь не найден в localStorage');
      return;
    }

    const cartFromServer = await fetchCartFromDB(userId);
    setCart(cartFromServer);
  } catch (error) {
    console.error("Ошибка загрузки корзины:", error);
  }
};


const addToCart = async (product, quantity = 1) => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  if (!user || !user.id) {
    alert('Пожалуйста, войдите, чтобы добавить товар в корзину');
    return;
  }

  const userId = user.id;
  const productId = product._id; 

  
  try {
    await updateCartInDB(userId, productId, quantity); // сохраняем на сервер
    setCart([...cart, product]);
  } catch (err) {
    console.error('Ошибка добавления в корзину', err);
  }
};

  const removeFromCart = async (userId, productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    await updateCartInDB(userId, productId, 0);
    setCart(updatedCart);
  };

  useEffect(() => {
    // при первом монтировании
    loadCart();

    // при возврате фокуса на вкладку
    const handleFocus = () => {
      loadCart();
    };
    window.addEventListener('focus', handleFocus);

    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, reloadCart: loadCart }}>
      {children}
    </CartContext.Provider>
  );
};
