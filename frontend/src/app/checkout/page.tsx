// frontend/src/app/checkout/page.tsx
'use client'; // Required for client-side components in Next.js
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from '@/components/checkout/CheckoutForm'; // Adjust path if needed

const stripePromise = loadStripe('your_stripe_public_key_here');

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}