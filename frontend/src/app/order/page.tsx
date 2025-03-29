// app/order/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
}

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API fetch (replace with actual call)
    setTimeout(() => {
      setOrders([
        { id: 'A001', date: '2025-03-05', total: 89.99, status: 'Delivered' },
        { id: 'A002', date: '2025-03-10', total: 45.50, status: 'Processing' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><p>Loading orders...</p></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-market-accent">${order.total.toFixed(2)}</p>
                <p className="text-sm text-gray-500">{order.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-6">
        <Button>View Order History</Button>
      </div>
    </div>
  );
}
