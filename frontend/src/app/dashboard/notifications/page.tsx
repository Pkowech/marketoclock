// frontend/src/app/dashboard/notifications/page.tsx
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface Notification {
  id: number;
  message: string;
  createdAt: string;
}

export default function Notifications() {
  const { token } = useAuthStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (token) {
      axios
        .get<Notification[]>(`${API_URL}/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setNotifications(res.data))
        .catch((err) => console.error('Error fetching notifications:', err));
    }
  }, [token]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((notif) => (
          <Card key={notif.id}>
            <CardHeader>
              <CardTitle>{notif.message}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{new Date(notif.createdAt).toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}