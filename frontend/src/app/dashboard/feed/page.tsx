'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Post {
  id: string;
  content: string;
}

export default function Feed() {
  const { isAuthenticated, token } = useAuthStore();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchPosts = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/posts`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setPosts(response.data);
        } catch (error) {
          console.error('Error fetching posts:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchPosts();
    }
  }, [isAuthenticated, token]);

  if (!isAuthenticated) {
    return <p>Please log in to view the feed.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard Feed</h1>
      <Link href="/dashboard/feed/new">
        <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
          Create New Post
        </button>
      </Link>
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts available yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="border p-4 rounded">
              <Link href={`/dashboard/feed/${post.id}`}>
                <p>{post.content}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}