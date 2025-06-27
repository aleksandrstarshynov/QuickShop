import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Success.css';

export default function Success() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const paymentIntent = state?.paymentIntent;

  return (
    <div className="success-page">
      <h1>Thank you for your purchase!</h1>

      {paymentIntent ? (
        <>
          <p>
            Sum:{' '}
            €{(
              (paymentIntent.amount ?? paymentIntent.amount_received ?? 0) /
              100
            ).toFixed(2)}
          </p>
          <p>Status:{paymentIntent.status}</p>
          <div className="details">
            <p>Payment ID: {paymentIntent.id}</p>
            <p>Date: {new Date(paymentIntent.created * 1000).toLocaleString()}</p>
          </div>
        </>
      ) : (
        <p>Payment details not found. Please contact support.</p>
      )}

      <button onClick={() => navigate('/catalog')}>
        Return to the Catalog
      </button>
    </div>
  );
}
