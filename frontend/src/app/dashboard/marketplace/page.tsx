// frontend/src/app/dashboard/marketplace/page.tsx
"use client";

import { useAuthStore } from '@/store/authStore';

export default function Marketplace() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <p>Please log in to view the marketplace.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard Marketplace</h1>
      <p className="text-[var(--foreground)]">Browse products and services here (to be implemented).</p>
    </div>
  );
}