import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "app",
  initialState: {
    products: [],
  },
  reducers: {
    addProducts: (state, action) => {
      state.products = [...state.products, ...action.payload];
    },
    deleteProduct: (state, action) => {
      const updatedProducts = state.products.filter(
        (item) => item.id != action.payload
      );
      state.products = [...updatedProducts];
    },
  },
});
export const { addProducts, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
