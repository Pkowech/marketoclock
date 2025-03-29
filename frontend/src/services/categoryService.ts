import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface Category {
  id: string;
  name: string;
}

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
};

export const createCategory = async (category: Category): Promise<Category> => {
  const response = await axios.post(`${API_URL}/categories`, category);
  return response.data;
};