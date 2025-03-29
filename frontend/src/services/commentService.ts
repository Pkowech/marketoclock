import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface Comment {
  id: string;
  postId: string;
  content: string;
}

export const fetchComments = async (): Promise<Comment[]> => {
  const response = await axios.get(`${API_URL}/comments`);
  return response.data;
};

export const createComment = async (comment: Comment): Promise<Comment> => {
  const response = await axios.post(`${API_URL}/comments`, comment);
  return response.data;
};