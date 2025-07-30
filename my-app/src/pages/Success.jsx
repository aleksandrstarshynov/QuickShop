import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Success.css';
import { useCart } from '../context/CartContext.js';

export default function Success() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const paymentIntent = state?.paymentIntent;
  const { cart } = useCart();

    useEffect(() => {
      if (paymentIntent && cart.length > 0) {
        const sendOrderConfirmation = async () => {
          try {
            const items = cart.map(item => ({
              name: item.product?.title || 'Unknown product',
              quantity: item.quantity,
              price: item.product?.price?.toFixed(2) || '0.00',
            }));

          await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/orders/email`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              customerEmail: paymentIntent.receipt_email || 'noreply@example.com',
              customerName: paymentIntent.shipping?.name || 'No Name',
              items,
              totalAmount: (paymentIntent.amount / 100).toFixed(2),
            }),
          });
          } catch (error) {
            console.error('Error sending order email:', error);
          }
        };

        sendOrderConfirmation();
      }
    }, [paymentIntent, cart]);

  return (
    <div className="success-page">
      <h1>Thank you for your purchase!</h1>

      {paymentIntent ? (
        <>
          <p>
            Sum: €{((paymentIntent.amount ?? paymentIntent.amount_received ?? 0) / 100).toFixed(2)}
          </p>
          <p>Status: {paymentIntent.status}</p>
          <div className="details">
            <p>Payment ID: {paymentIntent.id}</p>
            <p>Date: {new Date(paymentIntent.created * 1000).toLocaleString()}</p>
          </div>
        </>
      ) : (
        <p>Payment details not found. Please contact support.</p>
      )}

      <button onClick={() => navigate('/catalog')}>Return to the Catalog</button>
    </div>
  );
}
