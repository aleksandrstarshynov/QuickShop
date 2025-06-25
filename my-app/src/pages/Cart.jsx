import React, { useEffect, useState } from 'react';
import {
  fetchCartFromDB,
  updateCartInDB,
  deleteCartItemFromDB,
} from '../controller/cartAPI.js'; 
import '../styles/Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const userStr = localStorage.getItem('user');
  const userId = userStr ? JSON.parse(userStr).id : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    async function loadCart() {
      try {
        const data = await fetchCartFromDB(userId);
        console.log('Cart data from server:', data);
        setCart(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadCart();
  }, [userId]);

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const updatedItem = await updateCartInDB(userId, productId, newQuantity);
      setCart(cart.map(item =>
        item.product._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await deleteCartItemFromDB(userId, productId);
      setCart(cart.filter(item => item.product._id !== productId));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading cart...</div>;
  if (!userId) return <div>Please log in to see your cart.</div>;
  if (loading) return <div className="cart-page__empty">Loading cart...</div>;
  if (!userId) return <div className="cart-page__empty">Please log in to see your cart.</div>;

    const totalPrice = cart.reduce((sum, item) => {
    const price = Number(item.product?.newPrice);  // Убедись, что это нужное поле
    const quantity = Number(item.quantity);
    return sum + (price * quantity || 0);  // Если price или quantity NaN, вернёт 0
  }, 0);


  return (
      <div className="cart-page">
      <h1 className="cart-page__title">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="cart-page__empty">Your cart is empty.</p>
      ) : (
        <table className="cart-page__table">
          <thead>
            <tr>
              <th>Product</th><th>Price</th><th>Quantity</th><th>Total</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.product._id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img
                      src={item.product.imageURL}
                      alt={item.product.productName}
                      width="50"
                    />
                    <span>{item.product.productName}</span>
                  </div>
                </td>
                <td>€{Number(item.product?.newPrice).toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.product._id, parseInt(e.target.value))
                    }
                  />
                </td>
                <td>€{(item.product.newPrice * item.quantity).toFixed(2)}</td>
                <td>
                  <button
                    className="cart-page__button"
                    onClick={() => removeFromCart(item.product._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}

          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3"><strong>Total:</strong></td>
              <td><strong>€{totalPrice.toFixed(2)}</strong></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      )}
     <button onClick={() => navigate('/checkout')}>
      Перейти к оплате
    </button>     
    </div>
  );
};

export default Cart;
