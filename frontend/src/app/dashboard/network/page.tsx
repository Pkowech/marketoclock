// frontend/src/app/dashboard/network/page.tsx
"use client";

import { useAuthStore } from '@/store/authStore';

export default function Network() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <p>Please log in to view your network.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard Network</h1>
      <p className="text-[var(--foreground)]">Connect with suppliers and buyers here (to be implemented).</p>
    </div>
  );
}