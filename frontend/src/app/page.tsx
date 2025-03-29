// frontend/src/app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/store/authStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface Post {
  id: string;
  content: string;
}

export default function Home() {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    checkAuth();
    axios
      .get<Post[]>(`${API_URL}/posts?limit=3`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.error('Error fetching posts:', err));
  }, [checkAuth]);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Head>
        <title>Market O'Clock | B2B2C Marketplace</title>
        <meta name="description" content="Connecting suppliers with retailers for a seamless B2B2C experience" />
        <meta property="og:title" content="Market O'Clock" />
        <meta property="og:description" content="Join the future of B2B2C commerce" />
        <meta property="og:image" content="/images/hero-image.jpg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center">
          <Image
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
            alt="Market O'Clock Platform Preview"
            fill
            className="absolute inset-0 object-cover z-0"
            priority
          />
          <div className="relative z-10 text-center text-white space-y-6 bg-black/50 p-6 rounded-lg max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
              Welcome to Market O'Clock
            </h1>
            <p className="md:text-xl">
              A B2B2C platform connecting suppliers and retailers, with a social twist.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row justify-center">
              {isAuthenticated ? (
                <Button className="bg-[var(--primary)] hover:bg-[var(--primary)]/90" size="lg" asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <Button className="bg-[var(--primary)] hover:bg-[var(--primary)]/90" size="lg" asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              )}
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/20" asChild>
                <Link href="/explore">Explore</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Recent Posts Section */}
        {isAuthenticated && (
          <section className="py-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-[var(--foreground)]">What’s Happening</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <CardTitle>{post.content.slice(0, 20)}...</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{post.content}</p>
                    <Link href={`/dashboard/feed/${post.id}`} className="text-[var(--primary)]">Read More</Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" size="lg" asChild>
                <Link href="/dashboard/feed">See All Posts</Link>
              </Button>
            </div>
          </section>
        )}

        {/* Featured Products Section */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-[var(--foreground)]">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { src: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9', title: 'Product 1', desc: 'Amazing product on sale!', sale: '$80.00' },
              { src: 'https://images.unsplash.com/photo-1542272604-787c3835535d', title: 'Product 2', desc: "Don't miss this deal!", sale: '$40.00' },
            ].map((product) => (
              <Card key={product.title}>
                <Image src={product.src} alt={product.title} width={300} height={200} className="rounded-t-md object-cover" />
                <CardHeader>
                  <CardTitle>{product.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{product.desc}</p>
                  <p className="text-[var(--destructive)] font-bold">{product.sale}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link href="/marketplace">View All Products</Link>
            </Button>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 bg-[var(--muted)] rounded-lg my-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-[var(--foreground)]">Join the Community</h2>
            <p className="text-[var(--muted-foreground)] mb-8 max-w-xl mx-auto">
              Connect, trade, and share with Market O'Clock.
            </p>
            <Button className="bg-[var(--primary)] hover:bg-[var(--primary)]/90" size="lg" asChild>
              <Link href={isAuthenticated ? '/dashboard' : '/register'}>
                {isAuthenticated ? 'Dashboard' : 'Sign Up'}
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}