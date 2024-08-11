import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const RESTAURANTS_API = `${REMOTE_SERVER}/api/restaurants`;

export const fetchAllRestaurants = async () => {
    const response = await axios.get(`${RESTAURANTS_API}`);
    return response.data;
};

export const deleteRestaurant = async (restaurantId: string) => {
    const response = await axios.delete(`${RESTAURANTS_API}/${restaurantId}`);
    return response.data;
}

export const createRestaurant = async (restaurant: any) => {
    const response = await axios.post(`${RESTAURANTS_API}`, restaurant)
    return response.data;
}

export const updateRestaurant = async (restaurant: any) => {
    const response = await axios.put(`${RESTAURANTS_API}/${restaurant._id}`, restaurant);
    return response.data;
}

export const fetchRestaurantUsingId = async (restaurantId: string) => {
    const response = await axios.get(`${RESTAURANTS_API}/${restaurantId}`);
    return response.data;
}

