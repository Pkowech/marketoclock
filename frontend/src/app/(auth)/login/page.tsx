"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState('');

  const router = useRouter();
  const { login, isLoading, error: storeError, clearError, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setFormError('');

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      const errorMessage = err.message || storeError || 'Invalid email or password';
      setFormError(errorMessage);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[var(--card)] p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-[var(--primary)]">
            Sign in to Market O'Clock
          </h2>
          <p className="mt-2 text-center text-sm text-[var(--muted-foreground)]">
            Or{' '}
            <Link href="/register" className="font-medium text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors">
              create a new account
            </Link>
          </p>
        </div>

        {(storeError || formError) && (
          <div className="bg-[var(--destructive)]/10 border border-[var(--destructive)] text-[var(--destructive)] px-4 py-3 rounded" role="alert">
            <span>{storeError || formError}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)]">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-[var(--border)] rounded-md shadow-sm placeholder-[var(--muted-foreground)] text-[var(--foreground)] bg-[var(--input)] focus:outline-none focus:ring-[var(--ring)] focus:border-[var(--primary)] sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--foreground)]">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full px-3 py-2 border border-[var(--border)] rounded-md shadow-sm placeholder-[var(--muted-foreground)] text-[var(--foreground)] bg-[var(--input)] focus:outline-none focus:ring-[var(--ring)] focus:border-[var(--primary)] sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[var(--primary)] focus:ring-[var(--ring)] border-[var(--border)] rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-[var(--foreground)]">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors">
                Forgot your password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 rounded-md text-sm font-medium text-[var(--primary-foreground)] bg-[var(--primary)] hover:bg-[var(--primary)]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ring)] disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}