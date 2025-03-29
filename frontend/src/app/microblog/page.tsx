// app/microblog/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface MicroblogPost {
  id: string;
  author: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
}

export default function MicroblogPage() {
  const [posts, setPosts] = useState<MicroblogPost[]>([]);
  
  useEffect(() => {
    // Simulated fetch (replace with actual API call)
    setPosts([
      {
        id: '1',
        author: 'Alice',
        content: 'Just launched a new collection! #fashion #trendy',
        image: 'https://source.unsplash.com/random/800x600?fashion',
        likes: 23,
        comments: 5,
      },
      {
        id: '2',
        author: 'Bob',
        content: 'Our latest microblog post on market trends is live!',
        likes: 17,
        comments: 3,
      },
    ]);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Microblogs</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-lg">{post.author}</span>
              <span className="text-sm text-gray-500">{post.likes} Likes</span>
            </div>
            <p className="mb-4">{post.content}</p>
            {post.image && (
              <div className="mb-4">
                <Image
                  src={post.image}
                  alt={post.content}
                  width={800}
                  height={600}
                  className="rounded-md w-full h-auto object-cover"
                />
              </div>
            )}
            <div className="flex gap-4">
              <Button variant="outline" size="sm">Like</Button>
              <Button variant="outline" size="sm">Comment ({post.comments})</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
