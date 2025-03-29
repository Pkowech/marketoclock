'use client';

import { useAuthStore } from '@/store/authStore';

export default function ProfileSettings() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-4">
        <p>Please log in to view your profile settings.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Profile Settings</h1>
      <p>Manage your profile settings here. (Detailed settings to be implemented.)</p>
      {/* You can integrate the full settings form from profile/page.tsx here if desired */}
    </div>
  );
}