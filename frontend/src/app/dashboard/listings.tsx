// File: src/app/dashboard/listings.tsx
import React from 'react';
import DashboardLayout from './layout';

export const metadata = {
  title: "Listings - Market O'Clock",
};

export default function Listings() {
  return (
    <DashboardLayout>
      <h1>Listings</h1>
      <p>Here are your listings.</p>
    </DashboardLayout>
  );
}

