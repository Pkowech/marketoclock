"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'buyer' | 'supplier'>('buyer');
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [formError, setFormError] = useState('');

  const router = useRouter();
  const { register, isLoading, error: storeError, clearError, isAuthenticated } = useAuthStore();

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
      await register(username, email, password, role, fullName, businessName);
      router.push('/dashboard');
    } catch (err: any) {
      // Use the error message from the thrown error, fallback to store error or default
      const errorMessage = err.message || storeError || 'Registration failed';
      setFormError(errorMessage);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[var(--card)] p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-[var(--primary)]">
            Register for Market O'Clock
          </h2>
          <p className="mt-2 text-center text-sm text-[var(--muted-foreground)]">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors">
              Sign in
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
              <label htmlFor="username" className="block text-sm font-medium text-[var(--foreground)]">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-[var(--border)] rounded-md shadow-sm placeholder-[var(--muted-foreground)] text-[var(--foreground)] bg-[var(--input)] focus:outline-none focus:ring-[var(--ring)] focus:border-[var(--primary)] sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
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
                autoComplete="new-password"
                required
                className="mt-1 block w-full px-3 py-2 border border-[var(--border)] rounded-md shadow-sm placeholder-[var(--muted-foreground)] text-[var(--foreground)] bg-[var(--input)] focus:outline-none focus:ring-[var(--ring)] focus:border-[var(--primary)] sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-[var(--foreground)]">Role</label>
              <select
                id="role"
                name="role"
                className="mt-1 block w-full px-3 py-2 border border-[var(--border)] rounded-md shadow-sm text-[var(--foreground)] bg-[var(--input)] focus:outline-none focus:ring-[var(--ring)] focus:border-[var(--primary)] sm:text-sm"
                value={role}
                onChange={(e) => setRole(e.target.value as 'buyer' | 'supplier')}
              >
                <option value="buyer">Buyer</option>
                <option value="supplier">Supplier</option>
              </select>
            </div>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-[var(--foreground)]">Full Name (Optional)</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-[var(--border)] rounded-md shadow-sm placeholder-[var(--muted-foreground)] text-[var(--foreground)] bg-[var(--input)] focus:outline-none focus:ring-[var(--ring)] focus:border-[var(--primary)] sm:text-sm"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-[var(--foreground)]">Business Name (Optional)</label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-[var(--border)] rounded-md shadow-sm placeholder-[var(--muted-foreground)] text-[var(--foreground)] bg-[var(--input)] focus:outline-none focus:ring-[var(--ring)] focus:border-[var(--primary)] sm:text-sm"
                placeholder="Business Name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 rounded-md text-sm font-medium text-[var(--primary-foreground)] bg-[var(--primary)] hover:bg-[var(--primary)]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ring)] disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}