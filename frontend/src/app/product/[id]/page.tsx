// app/product/[id]/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate fetching product details by ID (replace with actual API call)
    setTimeout(() => {
      setProduct({
        id,
        name: "Unisex Denim Jacket",
        price: 49.99,
        description: "A versatile denim jacket that fits every style.",
        image: 'https://source.unsplash.com/random/800x600?denim',
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading || !product) {
    return (
      <div className="flex justify-center items-center h-96">
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => router.back()} className="mb-4 text-blue-500 hover:underline">&larr; Back</button>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="relative w-full md:w-1/2 h-96">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-market-accent mb-4">${product.price.toFixed(2)}</p>
          <p className="mb-6">{product.description}</p>
          <Button className="bg-market-blue hover:bg-market-blue/90">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}
// app/product/[id]/page.tsx
// app/product/[id]/page.tsx
// app/product/[id]/page.tsx
