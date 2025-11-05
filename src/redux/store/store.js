import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../slices/ProductSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});
