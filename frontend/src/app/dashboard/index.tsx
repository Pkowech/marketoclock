// File: src/app/dashboard/index.tsx

import React from 'react';
import DashboardLayout from './layout';

export const metadata = {
  title: "Dashboard - Market O'Clock",
};


export default function Dashboard() {
  return (
    <DashboardLayout>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard.</p>
    </DashboardLayout>
  );
}