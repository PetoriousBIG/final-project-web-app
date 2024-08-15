import axios from 'axios';

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
const apiClient = axios.create({
  baseURL: REMOTE_SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

export const getUserDetails = async (userId: string) => {
  const response = await axios.get(`${USERS_API}/${userId}`);
  return response.data;
};

export const getUserReviews = async (userId: string) => {
  const response = await axios.get(`${USERS_API}/${userId}/reviews`);
  return response.data;
};

export const getOwnerRestaurants = async (userId: string) => {
  const response = await axios.get(`${USERS_API}/${userId}/restaurants`);
  return response.data;
};

export const getChefDishes = async (userId: string) => {
  const response = await axios.get(`${USERS_API}/${userId}/dishes`);
  return response.data;
};


export const getRecipeDetails = async (id: string) => {
  try {
    const fullUri = id.includes('http://www.edamam.com/ontologies/edamam.owl#')
      ? id
      : `http://www.edamam.com/ontologies/edamam.owl#${id}`;
    
    const response = await apiClient.get(`/api/recipes/${encodeURIComponent(fullUri)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    return { label: 'Unknown Recipe', name: 'Unknown Recipe' };
  }
};

export const getUserComments = async (userId) => {
  try {
    const response = await apiClient.get(`${USERS_API}/${userId}/comments`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn('Comments endpoint not found. Returning empty array.');
      return [];
    }
    throw error;
  }
};
