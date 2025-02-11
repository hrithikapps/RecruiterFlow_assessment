import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice";

const store = configureStore({
  reducer: {
    app: productsSlice,
  },
});

export default store;
