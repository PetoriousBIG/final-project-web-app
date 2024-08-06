import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

export const getUserComments = async (userId: string) => {
  try {
    const response = await apiClient.get(`/api/users/${userId}/comments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user comments:', error);
    throw error;
  }
};
