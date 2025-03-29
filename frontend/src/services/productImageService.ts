import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string;
}

export const fetchProductImages = async (): Promise<ProductImage[]> => {
  const response = await axios.get(`${API_URL}/product-images`);
  return response.data;
};

export const createProductImage = async (image: ProductImage): Promise<ProductImage> => {
  const response = await axios.post(`${API_URL}/product-images`, image);
  return response.data;
};