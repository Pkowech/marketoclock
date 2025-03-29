// src/lib/services/product-service.ts
import axios from 'axios';
import { useAuth } from '@/lib/stores/auth-store'; // Still needed for some methods

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categoryId: string;
  seller: { id: string; name: string };
}

export interface ProductResponse {
  items: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export const ProductService = {
  async getProducts(page = 1, limit = 10, search = ''): Promise<ProductResponse> {
    try {
      const response = await axios.get(`${API_URL}/products`, {
        params: { page, limit, search },
      });
      const products = response.data;
      return {
        items: products,
        meta: {
          total: products.length,
          page: 1,
          limit: products.length,
        },
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  async getProductById(id: string): Promise<Product> {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },

  async createProduct(productData: FormData): Promise<Product> {
    const token = useAuth.getState().token;
    try {
      const response = await axios.post(`${API_URL}/products`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  async updateProduct(id: string, productData: FormData): Promise<Product> {
    const token = useAuth.getState().token;
    try {
      const response = await axios.patch(`${API_URL}/products/${id}`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error;
    }
  },

  async deleteProduct(id: string): Promise<void> {
    const token = useAuth.getState().token;
    try {
      const response = await axios.delete(`${API_URL}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw error;
    }
  },
};