// frontend/src/components/payment/StripeForm.tsx
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutForm } from '../../app/checkout/CheckoutForm'; // Relative path from current location

const stripePromise = loadStripe('your-publishable-key'); // Replace with your Stripe publishable key

export const StripeForm: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};