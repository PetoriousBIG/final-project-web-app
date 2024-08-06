import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./components/Account/reducer";
import restaurantReducer from "./components/Restaurants/reducer";
import reviewReducer from "./components/Review/reducer";
const store = configureStore({
  reducer: {
    accountReducer,
    restaurantReducer,
    reviewReducer
  },
});
export default store;