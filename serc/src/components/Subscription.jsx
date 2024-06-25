import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../styles/Subscription.css';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx'); // Test publishable key

const SubscriptionForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState(999); // Set default amount for 1 month plan

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // Create Payment Intent on the server
      const paymentIntentRes = await fetch('http://localhost:5000/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      const paymentIntentData = await paymentIntentRes.json();

      if (paymentIntentRes.status !== 200) {
        setError(paymentIntentData.error);
        setLoading(false);
        return;
      }

      // Confirm Payment Intent on the client
      const { error, paymentIntent } = await stripe.confirmCardPayment(paymentIntentData.clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        navigate('/chat');
      } else {
        setError('Payment failed');
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="subscription-container">
      <h1>Get Unlimited Access</h1>
      <div className="plan-details">
        <div className="plan" onClick={() => setAmount(999)}>
          <h2>1 Month</h2>
          <p>$9.99</p>
        </div>
        <div className="plan popular" onClick={() => setAmount(3999)}>
          <h2>1 Year</h2>
          <p>$39.99</p>
          <span>Save 75%</span>
        </div>
        <div className="plan" onClick={() => setAmount(9999)}>
          <h2>Lifetime</h2>
          <p>$99.99</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="payment-form">
        <CardElement />
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="continue-button" disabled={loading}>
          {loading ? 'Processing...' : 'Continue'}
        </button>
      </form>
    </div>
  );
};

const Subscription = () => (
  <Elements stripe={stripePromise}>
    <SubscriptionForm />
  </Elements>
);

export default Subscription;
