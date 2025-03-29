// src/lib/services/microblog-service.ts
import axios from 'axios';
import { useAuth } from '@/lib/stores/auth-store';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface MicroblogPost {
  id: string;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
  author: { id: string; name: string };
}

export interface MicroblogResponse {
  items: MicroblogPost[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export const MicroblogService = {
  async getPosts(page = 1, limit = 20): Promise<MicroblogResponse> {
    try {
      const response = await axios.get(`${API_URL}/microblog`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching microblog posts:', error);
      throw error;
    }
  },

  async getPostById(id: string): Promise<MicroblogPost> {
    try {
      const response = await axios.get(`${API_URL}/microblog/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching microblog post ${id}:`, error);
      throw error;
    }
  },

  async createPost(postData: { content: string; images?: File[] }): Promise<MicroblogPost> {
    const token = useAuth.getState().token;
    const formData = new FormData();
    formData.append('content', postData.content);
    
    if (postData.images && postData.images.length > 0) {
      postData.images.forEach((image) => {
        formData.append(`images`, image);
      });
    }

    try {
      const response = await axios.post(`${API_URL}/microblog`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating microblog post:', error);
      throw error;
    }
  },

  async likePost(id: string): Promise<void> {
    const token = useAuth.getState().token;
    try {
      const response = await axios.post(`${API_URL}/microblog/${id}/like`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error liking post ${id}:`, error);
      throw error;
    }
  },

  async addComment(postId: string, content: string): Promise<void> {
    const token = useAuth.getState().token;
    try {
      const response = await axios.post(
        `${API_URL}/microblog/${postId}/comments`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error(`Error adding comment to post ${postId}:`, error);
      throw error;
    }
  },
};