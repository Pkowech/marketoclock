// src/components/auth/AuthProvider.tsx
"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

// Define public routes that don't require authentication
const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password', '/'];

export function AuthProvider({ children }: AuthProviderProps) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If the route requires authentication and user is not authenticated, redirect to login
    if (!publicRoutes.includes(pathname) && !isAuthenticated) {
      router.push('/login');
    }
    
    // If user is authenticated and tries to access auth pages, redirect to dashboard
    if ((pathname === '/login' || pathname === '/register') && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, pathname, router]);

  return <>{children}</>;
}
// Add this to your root layout
// src/app/layout.tsx should include:
// <AuthProvider>{children}</AuthProvider>