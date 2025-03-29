"use client";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";

export default function NewItem() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const { isAuthenticated, token } = useAuthStore();

  if (!isAuthenticated) return <p>Please log in to list items.</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/api/items",
        { name, price, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Item listed!");
      setName("");
      setPrice("");
      setDescription("");
    } catch (error) {
      console.error("Error listing item:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">List New Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item Name"
          className="w-full p-2 border rounded"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          type="number"
          className="w-full p-2 border rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          List Item
        </button>
      </form>
    </div>
  );
}