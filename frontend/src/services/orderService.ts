import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface Order {
  id: string;
  productId: string;
  quantity: number;
}

export const fetchOrders = async (): Promise<Order[]> => {
  const response = await axios.get(`${API_URL}/orders`);
  return response.data;
};

export const createOrder = async (order: Order): Promise<Order> => {
  const response = await axios.post(`${API_URL}/orders`, order);
  return response.data;
};