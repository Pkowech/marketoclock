// frontend/src/app/explore/page.tsx
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function Explore() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    axios
      .get<{ products: Product[] }>(`${API_URL}/products?sort=popular&search=${search}`)
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.error('Error fetching products:', err));
  }, [search]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Explore</h1>
      <Input
        placeholder="Search trending items..."
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        className="mb-6"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link href={`/marketplace/${product.id}`} key={product.id}>
            <Card>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Image src={product.image} alt={product.name} width={300} height={200} />
                <p>${product.price}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}