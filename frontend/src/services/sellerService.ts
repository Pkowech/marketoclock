import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface Seller {
  id: string;
  name: string;
}

export const fetchSellers = async (): Promise<Seller[]> => {
  const response = await axios.get(`${API_URL}/sellers`);
  return response.data;
};

export const createSeller = async (seller: Seller): Promise<Seller> => {
  const response = await axios.post(`${API_URL}/sellers`, seller);
  return response.data;
};