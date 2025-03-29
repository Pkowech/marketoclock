'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Post {
  id: string;
  content: string;
  likes: number;
  comments: { id: string; content: string }[];
}

export default function FeedPost({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, token } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/posts/${params.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated) fetchPost();
  }, [params.id, isAuthenticated, token]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/dashboard/feed/${params.id}`);
      return;
    }
    try {
      await axios.post(
        `${API_URL}/api/posts/${params.id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPost((prev) => prev ? { ...prev, likes: prev.likes + 1 } : null);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push(`/login?redirect=/dashboard/feed/${params.id}`);
      return;
    }
    try {
      const response = await axios.post(
        `${API_URL}/api/posts/${params.id}/comments`,
        { content: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPost((prev) =>
        prev ? { ...prev, comments: [...prev.comments, response.data] } : null
      );
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (!isAuthenticated) {
    return <p>Please log in to view this post.</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{post.content}</h1>
      <button
        onClick={handleLike}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
      >
        Like ({post.likes})
      </button>
      <form onSubmit={handleComment} className="mt-4 space-y-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Comment
        </button>
      </form>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Comments</h2>
        {post.comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          post.comments.map((c) => <p key={c.id} className="border-b py-2">{c.content}</p>)
        )}
      </div>
    </div>
  );
}