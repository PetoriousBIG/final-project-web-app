import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    users: [],
    currentUser: null
};
const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },

        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
    },
  },
});

export const { setUsers, setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;