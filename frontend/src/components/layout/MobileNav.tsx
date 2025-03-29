// frontend/src/components/layout/MobileNav.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuthStore();

  const routes = [
    { href: '/marketplace', label: 'Marketplace', active: pathname === '/marketplace' || pathname.startsWith('/marketplace/') },
    { href: '/microblog', label: 'Blogs', active: pathname === '/microblog' },
    { href: '/about', label: 'About', active: pathname === '/about' },
    { href: '/dashboard', label: 'Dashboard', active: pathname === '/dashboard' || pathname.startsWith('/dashboard/'), auth: true },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col pt-16 bg-[var(--card)]">
        <nav className="flex flex-col space-y-4">
          {routes.map((route) => {
            if (route.auth && !isAuthenticated) return null;
            return (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-base font-medium transition-colors hover:text-[var(--primary)] px-2 py-1",
                  route.active ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]"
                )}
              >
                {route.label}
              </Link>
            );
          })}
          {isAuthenticated ? (
            <Button variant="outline" onClick={() => { logout(); setOpen(false); }}>
              Logout
            </Button>
          ) : (
            <div className="flex flex-col space-y-2">
              <Link href="/login" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link href="/register" onClick={() => setOpen(false)}>
                <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}