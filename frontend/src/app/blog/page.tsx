// app/blog/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  
  useEffect(() => {
    // Simulated API fetch
    setPosts([
      {
        id: '101',
        title: 'Market Trends for Q2',
        excerpt: 'An in-depth look at the emerging market trends for the second quarter...',
        image: 'https://source.unsplash.com/random/800x600?business',
        date: '2025-03-01',
      },
      {
        id: '102',
        title: 'Sustainable Fashion on a Budget',
        excerpt: 'Discover how you can dress sustainably without breaking the bank...',
        image: 'https://source.unsplash.com/random/800x600?sustainable',
        date: '2025-02-15',
      },
    ]);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Blog</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Link key={post.id} href={`/post/${post.id}`}>
            <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition">
              <div className="relative h-56">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-2">{post.excerpt}</p>
                <p className="text-sm text-gray-400">{new Date(post.date).toLocaleDateString()}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
