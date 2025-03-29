"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from '@/store/authStore';
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Home, ShoppingBag, Users, MessageSquare, User, LogOut } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { logout, user } = useAuthStore();

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
      label: "Marketplace",
      href: "/dashboard/marketplace",
      icon: <ShoppingBag className="mr-2 h-4 w-4" />,
    },
    {
      label: "Social Feed",
      href: "/dashboard/feed",
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
    },
    {
      label: "Network",
      href: "/dashboard/network",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: <User className="mr-2 h-4 w-4" />,
    },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto border-r">
            <div className="flex items-center justify-center h-16">
              <span className="text-xl font-bold text-blue-600">Market O&apos;Clock</span>
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-4 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="p-4 border-t">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{user?.name || "User"}</p>
                  <p className="text-xs text-gray-500">{user?.email || ""}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center justify-center"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1">
          {/* Mobile header */}
          <div className="md:hidden sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-white border-b">
            <span className="text-xl font-bold text-blue-600">Market O&apos;Clock</span>
            {/* Mobile menu button would go here */}
          </div>

          {/* Content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}