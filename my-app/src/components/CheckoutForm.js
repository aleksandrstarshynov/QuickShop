import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../styles/CheckoutForm.css';

const API_BASE = process.env.REACT_APP_API_BASE_URL;

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': { color: '#aab7c4' },
      fontFamily: 'sans-serif',
    },
    invalid: { color: '#9e2146' },
  },
};

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, reloadCart } = useCart();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  // Request clientSecret
  useEffect(() => {
    if (!cart?.length) return;
    (async () => {
      try {
        const resp = await fetch(`${API_BASE}/create-payment-intent`, {  
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: cart }),
        });
        const { clientSecret } = await resp.json();
        setClientSecret(clientSecret);
      } catch {
        setError('Failed to initiate payment');
      }
    })();
  }, [cart]);

  const total = cart.reduce(
    (sum, item) => sum + item.product.newPrice * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError('');

    if (!stripe || !elements) {
      setError('Stripe is not ready');
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      { payment_method: { card } }
    );

    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
    } else if (paymentIntent.status === 'succeeded') {
      setSucceeded(true);
      await reloadCart();
      navigate('/success', { state: { paymentIntent } });
    }
  };

  if (!cart?.length) return <p>Корзина пуста</p>;

  return succeeded ? (
    <div className="checkout-form">
      <h2>Thank you for your purchase!</h2>
      <p>Your payment in the amount of €{total.toFixed(2)} successfully completed.</p>
      <button onClick={() => navigate('/')}>Return to home page</button>
    </div>
  ) : (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <label>Card details</label>
      <CardElement className="StripeElement" options={CARD_ELEMENT_OPTIONS} />
      {error && <div className="error">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || !elements || !clientSecret || processing}
      >
        {processing ? 'Processing…' : `Pay €${total.toFixed(2)}`}
      </button>
    </form>
  );
}
