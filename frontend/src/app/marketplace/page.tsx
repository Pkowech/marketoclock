'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface Category {
  id: string;
  name: string;
}

export default function Marketplace() {
  const { isAuthenticated } = useAuthStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/categories`);
        setCategories(response.data);
      } catch (err) {
        setError('Failed to fetch categories');
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: currentPage.toString(),
          search,
          ...(categoryId !== 'all' && { categoryId }),
          minPrice: priceRange[0].toString(),
          maxPrice: priceRange[1].toString(),
        });
        const response = await axios.get(`${API_URL}/api/products?${params}`);
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [search, categoryId, priceRange, currentPage]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryId(value);
    setCurrentPage(1);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Market O'Clock</h1>
          <nav className="space-x-4">
            <Link href="/marketplace" className="hover:underline">Marketplace</Link>
            <Link href="/blogs" className="hover:underline">Blogs</Link>
            <Link href="/about" className="hover:underline">About</Link>
            {isAuthenticated && (
              <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            )}
          </nav>
          <Button variant="outline" className="text-white border-white">
            Toggle Theme
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Marketplace</h2>
        {error && <div className="text-center text-red-500 p-4">{error}</div>}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search products..."
              value={search}
              onChange={handleSearch}
            />
            <Select value={categoryId} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-col gap-2">
              <span className="text-sm">Price Range: ${priceRange[0]} - ${priceRange[1]}</span>
              <Slider
                value={priceRange}
                min={0}
                max={1000}
                step={10}
                onValueChange={handlePriceChange}
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <p className="text-center">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link href={`/marketplace/${product.id}`} key={product.id}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription>${product.price}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={300}
                        height={192}
                        className="w-full h-48 object-cover rounded-md"
                      />
                    </CardContent>
                    <CardFooter>
                      <p className="text-sm text-gray-500 truncate">{product.description}</p>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="flex justify-center gap-2 mt-6">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-lg font-semibold">Market O'Clock</h3>
            <p>Connecting suppliers and retailers with innovative marketplace solutions.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Marketplace</h3>
            <ul>
              <li><Link href="/categories" className="hover:underline">Categories</Link></li>
              <li><Link href="/popular" className="hover:underline">Popular Items</Link></li>
              <li><Link href="/new" className="hover:underline">New Arrivals</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Company</h3>
            <ul>
              <li><Link href="/about" className="hover:underline">About Us</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
              <li><Link href="/careers" className="hover:underline">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul>
              <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-6">
          <p>support@marketoclock.com | Nairobi, Kenya</p>
          <p>© 2025 Market O'Clock. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}