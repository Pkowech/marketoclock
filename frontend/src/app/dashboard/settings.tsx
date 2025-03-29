// File: src/app/dashboard/settings.tsx
import React from 'react';
import DashboardLayout from './layout';

export const metadata = {
  title: "Settings - Market O'Clock",
};

export default function Settings() {
  return (
    <DashboardLayout>
      <h1>Settings</h1>
      <p>Here are your settings.</p>
    </DashboardLayout>
  );
}