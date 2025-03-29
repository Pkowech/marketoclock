"use client";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";

export default function NewBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { isAuthenticated, token } = useAuthStore();

  if (!isAuthenticated) return <p>Please log in to write a blog.</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/api/blogs",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Blog posted!");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error posting blog:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Write a Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
          className="w-full p-2 border rounded"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Blog Content"
          className="w-full p-2 border rounded h-40"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Publish
        </button>
      </form>
    </div>
  );
}