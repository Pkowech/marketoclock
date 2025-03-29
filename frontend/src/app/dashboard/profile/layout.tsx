import React from 'react';
import Link from 'next/link';
import './profile.css';

export const metadata = {
  title: "Profile - Market O'Clock",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="profile-layout container mx-auto p-6">
      <header className="mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Your Profile</h1>
        <nav className="profile-nav mt-4">
          <Link href="/dashboard/profile">Overview</Link>
          <span className="text-gray-300">|</span>
          <Link href="/dashboard/profile/settings">Settings</Link>
          <span className="text-gray-300">|</span>
          <Link href="/dashboard/profile/orders">Orders</Link>
        </nav>
      </header>
      <section className="bg-white rounded-lg shadow-sm p-6">
        {children}
      </section>
    </div>
  );
}


