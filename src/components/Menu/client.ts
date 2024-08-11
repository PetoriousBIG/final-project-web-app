import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const MENU_API = `${REMOTE_SERVER}/api/menu-items`;

export const fetchAllMenuItems = async () => {
    const response = await axios.get(`${MENU_API}`);
    return response.data;
};

export const fetchMenuItemById = async (id: String) => {
    const response = await axios.get(`${MENU_API}/${id}`)
    return response.data;
}

export const fetchMenuItemsByRestaurant = async (restaurant_id: String) => {
    const response = await axios.get(`${MENU_API}`, {
        params: {
            restaurant_id: restaurant_id
        }
    });
    return response.data;
}

export const fetchMenuItemsByChef = async (chef_id: String) => {
    const response = await axios.get(`${MENU_API}`, {
        params: {
            chef_id: chef_id
        }
    });
    return response.data;
}

export const deleteMenuItem = async (menuItemId: String) => {
    const response = await axios.delete(`${MENU_API}/${menuItemId}`);
    return response.data;
}

export const createMenuItem = async (menuItem: any) => {
    const response = await axios.post(`${MENU_API}`, menuItem);
    return response.data;
}

export const updateMenuItem = async (menuItem: any) => {
    const response = await axios.put(`${MENU_API}/${menuItem._id}`, menuItem);
    return response.data;
}