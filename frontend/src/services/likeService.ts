import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface Like {
  id: string;
  postId: string;
}

export const fetchLikes = async (): Promise<Like[]> => {
  const response = await axios.get(`${API_URL}/likes`);
  return response.data;
};

export const createLike = async (like: Like): Promise<Like> => {
  const response = await axios.post(`${API_URL}/likes`, like);
  return response.data;
};