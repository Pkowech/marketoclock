// File: src/app/dashboard/orders.tsx
import React from 'react';
import DashboardLayout from './layout';

export const metadata = {
  title: "Orders - Market O'Clock",
};

export default function Orders() {
  return (
    <DashboardLayout>
      <h1>Orders</h1>
      <p>Here are your orders.</p>
    </DashboardLayout>
  );
}
