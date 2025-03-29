import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface Post {
  id: string;
  title: string;
  content: string;
}

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
};

export const createPost = async (post: Post): Promise<Post> => {
  const response = await axios.post(`${API_URL}/posts`, post);
  return response.data;
};