// File: src/app/profile/orders.tsx

import React from 'react';
import ProfileLayout from './layout';

export const metadata = {
  title: "Orders - Market O'Clock",
};

export default function Orders() {
  return (
    <ProfileLayout>
      <h1>Orders</h1>
      <p>Here are your orders.</p>
    </ProfileLayout>
  );
}

