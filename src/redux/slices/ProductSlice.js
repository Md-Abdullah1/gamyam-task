import { createSlice } from "@reduxjs/toolkit";
import { productsData } from "../../data/products";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: productsData,
  },
  reducers: {
    addProduct: (state, action) => {
      state.items.push({
        id: state.items?.length + 1 || Date.now(),
        createdAt: new Date().toISOString(),
        ...action.payload,
      });
    },
    editProduct: (state, action) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
  },
});

export const { addProduct, editProduct } = productsSlice.actions;
export default productsSlice.reducer;
