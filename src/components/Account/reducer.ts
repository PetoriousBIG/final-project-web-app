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
            console.log(JSON.stringify(state.currentUser))
        },
  },
});

export const { setUsers, setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;