import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/User/userSlice";
import productReducer from "../features/Product/productSlice";
import blogReducer from "../features/Blog/blogSlice";
import contactReducer from "../features/Contact/contactSlice";
export const store = configureStore({
  reducer: {
    authState: authReducer,
    productState: productReducer,
    blogState: blogReducer,
    contactState: contactReducer,
  },
});
