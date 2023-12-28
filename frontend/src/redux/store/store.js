import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from "../../features/User/userSlice";
import productReducer from "../../features/Product/productSlice";
import blogReducer from "../../features/Blog/blogSlice";
import contactReducer from "../../features/Contact/contactSlice";

const reducer = combineReducers({
  authState: authReducer,
  productState: productReducer,
  blogState: blogReducer,
  contactState: contactReducer,
});

export const store = configureStore({
  reducer,
  middleware: [thunk],
});
