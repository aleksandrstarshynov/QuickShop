import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) return;

    async function fetchCart() {
      try {
        const res = await fetch(`/api/cart/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch cart');
        const data = await res.json();
        setCart(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, [userId]);

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const res = await fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId, quantity: newQuantity }),
      });
      if (!res.ok) throw new Error('Failed to update quantity');
      const updatedItem = await res.json();
      setCart(cart.map(item => 
        item.product._id === productId ? {...item, quantity: newQuantity} : item
      ));
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await fetch(`/api/cart/${userId}/${productId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete item');
      setCart(cart.filter(item => item.product._id !== productId));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading cart...</div>;
  if (!userId) return <div>Please log in to see your cart.</div>;

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 0
  );

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product</th><th>Price</th><th>Quantity</th><th>Total</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(({product, quantity}) => (
              <tr key={product._id}>
                <td>
                  <img src={product.thumbnail || product.images[0]} alt={product.title || product.name} width="50" />
                  <span>{product.title || product.name}</span>
                </td>
                <td>€{product.price.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={e => updateQuantity(product._id, parseInt(e.target.value))}
                  />
                </td>
                <td>€{(product.price * quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => removeFromCart(product._id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3"><strong>Total:</strong></td>
              <td>€{totalPrice.toFixed(2)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
};

export default Cart;
