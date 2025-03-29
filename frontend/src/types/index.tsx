import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Market O&apos;Clock | B2B2C Marketplace</title>
        <meta name="description" content="Connect suppliers with retailers and businesses" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-market-blue">Market O&apos;Clock</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/marketplace" className="text-sm font-medium hover:underline">
              Marketplace
            </Link>
            <Link href="/blogs" className="text-sm font-medium hover:underline">
              Blogs
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button size="sm" className="bg-market-blue hover:bg-market-blue/90" asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-12">
        {/* Hero Section */}
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                    Connect, Market, Grow Your Business
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Market O&apos;Clock is a B2B2C marketplace that connects suppliers with retailers and businesses through innovative social engagement features.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-market-blue hover:bg-market-blue/90" size="lg">
                    Get Started
                  </Button>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="mx-auto lg:ml-auto flex items-center justify-center rounded-lg border bg-background p-4">
                {/* Placeholder for hero image */}
                <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                  Marketplace Illustration
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold">Key Features</h2>
              <p className="max-w-[85%] text-muted-foreground">
                Discover what makes Market O&apos;Clock the ultimate B2B2C marketplace platform.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              <Card>
                <CardHeader>
                  <CardTitle>Marketplace</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Connect suppliers with retailers through our efficient marketplace platform.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Microblogs & Blogs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Market products through engaging content with social features.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Multi-Payment Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Secure and flexible payment options for all transactions.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 bg-muted rounded-lg my-12">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to grow your business?</h2>
            <p className="text-muted-foreground mb-8 max-w-[600px] mx-auto">
              Join Market O&apos;Clock today and connect with suppliers and retailers from various industries.
            </p>
            <Button className="bg-market-blue hover:bg-market-blue/90" size="lg">
              Sign Up Now
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/40">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Market O&apos;Clock</h3>
              <p className="text-sm text-muted-foreground">
                Connecting suppliers and retailers through innovative marketplace solutions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/marketplace" className="text-sm text-muted-foreground hover:text-foreground">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="text-sm text-muted-foreground hover:text-foreground">
                    Blogs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground">
                  support@marketoclock.com
                </li>
                <li className="text-sm text-muted-foreground">
                  Nairobi, Kenya
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Market O&apos;Clock. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}