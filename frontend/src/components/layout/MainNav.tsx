// frontend/src/components/layout/MainNav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';

interface NavRoute {
  href: string;
  label: string;
  active: boolean;
  auth?: boolean;
}

export function MainNav() {
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuthStore();

  const routes: NavRoute[] = [
    { href: '/', label: 'Home', active: pathname === '/' },
    { href: '/explore', label: 'Explore', active: pathname === '/explore' },
    { href: '/marketplace', label: 'Marketplace', active: pathname === '/marketplace' || pathname.startsWith('/marketplace/') },
    { href: '/microblog', label: 'Blogs', active: pathname === '/microblog' },
    { href: '/about', label: 'About', active: pathname === '/about' },
    { href: '/dashboard/feed', label: 'Feed', active: pathname === '/dashboard/feed', auth: true },
    { href: '/dashboard/notifications', label: 'Notifications', active: pathname === '/dashboard/notifications', auth: true },
    { href: '/dashboard/profile', label: 'Profile', active: pathname === '/dashboard/profile', auth: true },
  ];

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => {
        if (route.auth && !isAuthenticated) return null;
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-[var(--primary)]',
              route.active ? 'text-[var(--primary)]' : 'text-[var(--muted-foreground)]'
            )}
          >
            {route.label}
          </Link>
        );
      })}
      {isAuthenticated && (
        <Link href="/dashboard/feed/new">
          <Button variant="outline" size="sm">Compose</Button>
        </Link>
      )}
      {isAuthenticated ? (
        <Button variant="outline" onClick={logout} size="sm">
          Logout
        </Button>
      ) : (
        <div className="flex items-center space-x-2">
          <Link href="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}