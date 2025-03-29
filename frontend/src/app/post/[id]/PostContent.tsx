'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
}

export default function PostContent({ id }: { id: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPost({
          id,
          title: "Market Trends for Q2",
          content: "Here is a detailed blog post on market trends for Q2...",
          image: 'https://source.unsplash.com/random/800x600?business',
          date: '2025-03-01',
        });
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading || !post) {
    return (
      <div className="flex justify-center items-center h-96">
        <p>Loading post...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => router.back()} 
        className="mb-4 text-blue-500 hover:underline"
      >
        &larr; Back
      </button>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(post.date).toLocaleDateString()}
      </p>
      <div className="relative w-full h-64 mb-6">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <p className="mb-8">{post.content}</p>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        <p className="text-gray-600">Comments functionality coming soon...</p>
      </section>
    </div>
  );
}