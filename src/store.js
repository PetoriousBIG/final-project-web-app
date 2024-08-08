import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./components/Account/reducer";
import restaurantReducer from "./components/Restaurants/reducer";
import reviewReducer from "./components/Review/reducer";
import menuItemReducer from "./components/Menu/reducer";
const store = configureStore({
  reducer: {
    accountReducer,
    restaurantReducer,
    reviewReducer,
    menuItemReducer
  },
});
export default store;