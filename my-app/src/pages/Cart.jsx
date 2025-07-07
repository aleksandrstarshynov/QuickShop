import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    cart,
    loading,
    updateQuantity,
    removeFromCart
  } = useCart();
  const navigate = useNavigate();

  if (loading) {
    return <div className="cart-page__empty">Loading cart...</div>;
  }

  if (!cart.length) {
    return <p className="cart-page__empty">Your cart is empty.</p>;
  }

  const totalPrice = cart.reduce((sum, item) => {
    const price = Number(item.product?.newPrice) || 0;
    return sum + price * Number(item.quantity);
  }, 0);

  return (
    <div className="cart-page">
      <h1 className="cart-page__title">Your Cart</h1>
      <table className="cart-page__table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
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
              <td>€{Number(item.product.newPrice).toFixed(2)}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e =>
                    updateQuantity(item.product._id, parseInt(e.target.value, 10))
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
      <button
        className="cart-page__checkout"
        onClick={() => navigate('/checkout')}
      >
        Proceed to payment
      </button>
    </div>
  );
};

export default Cart;
