import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./components/Account/reducer";
const store = configureStore({
  reducer: {
    accountReducer,
  },
});
export default store;