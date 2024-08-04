import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./components/Account/reducer";
import restaurantReducer from "./components/Restaurants/reducer";
const store = configureStore({
  reducer: {
    accountReducer,
    restaurantReducer
  },
});
export default store;