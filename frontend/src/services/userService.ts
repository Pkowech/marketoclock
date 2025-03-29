import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const createUser = async (user: User): Promise<User> => {
  const response = await axios.post(`${API_URL}/users`, user);
  return response.data;
};