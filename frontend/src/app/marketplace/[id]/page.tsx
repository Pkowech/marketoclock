// app/marketplace/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api'; 
import Image from 'next/image'; // Added import
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, ArrowLeft, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  images: { id: string; url: string }[];
  category: { id: string; name: string };
  seller: { id: string; name: string };
  createdAt: string;
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again later.');
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setQuantity(Math.max(1, Math.min(value, product?.stock || 1)));
  };

  const handleAddToCart = () => {
    if (!product) return;
    toast(`${quantity} x ${product.title} added to your cart.`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-lg mb-4">Product not found</p>
        <Link href="/marketplace">
          <Button>Back to Marketplace</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Link href="/marketplace">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Marketplace
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="h-96 bg-gray-100 rounded-t-lg overflow-hidden relative">
            {product.images && product.images.length > 0 ? (
              <Image // Fixed typo from 'image' to 'Image'
                src={product.images[0].url}
                alt={product.title}
                fill
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image Available
              </div>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {product.images.map((image) => (
                <div key={image.id} className="h-20 bg-gray-100 rounded cursor-pointer relative">
                  <Image // Changed from img to Image
                    src={image.url}
                    alt={`${product.title} - Image`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-xl font-semibold text-green-600 mb-4">${product.price.toFixed(2)}</p>
          
          <div className="mb-6">
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-sm text-gray-500 mb-2">
              Category: {product.category ? product.category.name : 'Uncategorized'}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Seller: {product.seller ? product.seller.name : 'Unknown'}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Listed on: {new Date(product.createdAt).toLocaleDateString()}
            </p>
            <p className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </p>
          </div>

          {product.stock > 0 && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <label htmlFor="quantity" className="font-medium">
                    Quantity:
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-20 border rounded p-2 text-center"
                  />
                </div>
                <Button
                  onClick={handleAddToCart}
                  className="w-full"
                  disabled={!user}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                {!user && (
                  <p className="text-sm text-red-500 mt-2 text-center">
                    Please <Link href="/login" className="underline">log in</Link> to add items to your cart
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {user && product.seller && user.id !== product.seller.id && (
            <Button variant="outline" className="w-full">
              Contact Seller
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}