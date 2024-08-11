import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    menuItems: ['hello world'],
};
const menuItemSlice = createSlice({
    name: "menuItems",
    initialState,
    reducers: {
        setMenuItems: (state, action) => {
            state.menuItems = action.payload;
            console.log(`From reducer: ${state.menuItems}`);
        },

        addMenuItem: (state, { payload: menuItem }) => {
            const newMenuItem: any = {
                _id: new Date().getTime().toString(),
                restaurant_id: menuItem.restaurant_id,
                name: menuItem.name,
                description: menuItem.description,
                price: menuItem.price,
                chef_id: menuItem.chef_id,
                chef_name: menuItem.chef_name,
                chefs_intro: menuItem.chef_intro,
                images: menuItem.images
            };
            state.menuItems = [...state.menuItems, newMenuItem] as any;
        },

        deleteMenuItem: (state, { payload: menuItemId}) => {
            state.menuItems = state.menuItems.filter(
                (m: any) => m._id !== menuItemId);
        },

        updateMenuItem: (state, { payload: menuItem }) => {
            state.menuItems = state.menuItems.map((m: any) => 
                m._id === menuItem._id ? menuItem : m
            ) as any;
        },

        editMenuItem: (state, { payload: menuItemId }) => {
            state.menuItems = state.menuItems.map((m: any) => 
                m._id === menuItemId ? { ...m, editing: true} : m
            ) as any;
        },
    },
});

export const { addMenuItem, deleteMenuItem, updateMenuItem, editMenuItem, setMenuItems } =
    menuItemSlice.actions;
export default menuItemSlice.reducer;

