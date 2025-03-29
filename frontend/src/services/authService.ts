import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Interface for login response
interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

// Interface for register response
interface RegisterResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

// Interface for user data
interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  bio?: string;
  phoneNumber?: string;
  address?: string;
  avatarUrl?: string;
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: string
): Promise<RegisterResponse> => {
  const response = await axios.post(`${API_URL}/auth/register`, { name, email, password, role });
  return response.data;
};

export const fetchUser = async (): Promise<UserResponse> => {
  const response = await axios.get(`${API_URL}/auth/user`);
  return response.data;
};