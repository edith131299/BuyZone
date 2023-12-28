import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  myCart: [],
  myOrders: [],
  isAuthenticated: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const authSlice = createSlice({
  name: "authState",
  initialState: initialState,
  reducers: {
    loginRequest(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },
    loginSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    },
    loginFail(state, action) {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      };
    },
    
  },
});
const { actions, reducer } = authSlice;
export const { loginSuccess, loginFail, loginRequest } = actions;

export default reducer;
