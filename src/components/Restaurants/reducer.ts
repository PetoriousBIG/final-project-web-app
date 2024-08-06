import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    restaurants: [],
};
const restaurantsSlice = createSlice({
    name: "restaurants",
    initialState,
    reducers: {
        setRestaurants: (state, action) => {
            state.restaurants = action.payload;  
        },

        addRestaurant: (state, { payload: restaurant }) => {
            const newRestaurant: any = {
                _id: new Date().getTime().toString(),
                name: restaurant.name,
                descrption: restaurant.descrption,
                rating: restaurant.rating,
                owner_id: restaurant.owner_id,
                owner: restaurant.owner,
                introduction: restaurant.introduction,
                images: restaurant.images
            };
            state.restaurants = [...state.restaurants, newRestaurant] as any;
        },
      
        deleteRestaurant: (state, { payload: restaurantId }) => {
            state.restaurants = state.restaurants.filter(
                (m: any) => m._id !== restaurantId);
        },
      
        updateRestaurant: (state, { payload: restaurant }) => {
            state.restaurants = state.restaurants.map((r: any) =>
                r._id === restaurant._id ? restaurant : r
            ) as any;
        },
      
        editRestaurant: (state, { payload: restaurantsId }) => {
            state.restaurants = state.restaurants.map((r: any) =>
                r._id === restaurantsId ? { ...r, editing: true } : r
            ) as any;
        },
    },
  });

  export const { addRestaurant, deleteRestaurant, updateRestaurant, editRestaurant, setRestaurants } =
      restaurantsSlice.actions;
  export default restaurantsSlice.reducer;