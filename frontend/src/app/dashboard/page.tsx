"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, ShoppingBag, Users, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500">Welcome back, {user?.name || "User"}!</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">54</div>
                <p className="text-xs text-muted-foreground">
                  +12 from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Connections</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-muted-foreground">
                  +18 new connections
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Sales</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,423</div>
                <p className="text-xs text-muted-foreground">
                  +8.2% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">432</div>
                <p className="text-xs text-muted-foreground">
                  +19% more than usual
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent activity across the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <p className="text-sm">You connected with <span className="font-medium">Jane Cooper</span></p>
                    <span className="ml-auto text-xs text-gray-500">2h ago</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <p className="text-sm">New comment on your post: <span className="font-medium">&quot;Market trends for Q1&quot;</span></p>
                    <span className="ml-auto text-xs text-gray-500">5h ago</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    <p className="text-sm">You liked <span className="font-medium">Alex Morgan</span>&apos;s product</p>
                    <span className="ml-auto text-xs text-gray-500">1d ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Popular Products</CardTitle>
                <CardDescription>Top trending products this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-md mr-3"></div>
                    <div>
                      <p className="font-medium">Eco-friendly Packaging</p>
                      <p className="text-xs text-gray-500">By GreenSupplies Inc.</p>
                    </div>
                    <div className="ml-auto text-sm font-medium">$24.99</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-md mr-3"></div>
                    <div>
                      <p className="font-medium">Organic Cotton T-shirts (Bulk)</p>
                      <p className="text-xs text-gray-500">By EcoTextiles</p>
                    </div>
                    <div className="ml-auto text-sm font-medium">$199.50</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-md mr-3"></div>
                    <div>
                      <p className="font-medium">Biodegradable Cutlery Set</p>
                      <p className="text-xs text-gray-500">By EcoEat</p>
                    </div>
                    <div className="ml-auto text-sm font-medium">$32.75</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="h-[400px] flex items-center justify-center border rounded-md">
          <p className="text-muted-foreground">Analytics view will be implemented in the next phase</p>
        </TabsContent>
        
        <TabsContent value="activity" className="h-[400px] flex items-center justify-center border rounded-md">
          <p className="text-muted-foreground">Activity feed will be implemented in the next phase</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}