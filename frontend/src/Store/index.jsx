import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./userInfo-slice";
import cartSlice from "./cartCounter-slice";

const store = configureStore({
  reducer: {
    userInfo: userInfoSlice.reducer,
    cartCounter: cartSlice.reducer,
  },
});

export default store;
