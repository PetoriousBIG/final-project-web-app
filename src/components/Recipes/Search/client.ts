import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

export const searchRecipes = async (query: string) => {
  try {
    const response = await apiClient.get('/api/recipes', { params: { query } });
    return response.data;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};

export const getRecipeDetails = async (id: string) => {
  try {
    const response = await apiClient.get(`/api/recipes/${encodeURIComponent(id)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
};

export const addComment = async (recipeId: string, comment: string) => {
  try {
    const encodedId = encodeURIComponent(recipeId.split('#')[1]); // Extract the ID part after #
    const response = await apiClient.post(`/api/recipes/${encodedId}/comments`, { comment });
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

export const getComments = async (recipeId: string) => {
  try {
    const response = await apiClient.get(`/api/recipes/${encodeURIComponent(recipeId)}/comments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await apiClient.post('/api/users/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};

export const getUserComments = async (userId: string) => {
  try {
    const response = await apiClient.get(`/api/users/${userId}/comments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user comments:', error);
    throw error;
  }
};
export default apiClient;