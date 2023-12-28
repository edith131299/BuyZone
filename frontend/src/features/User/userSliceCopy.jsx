import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";

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

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue.register(error);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue.login(error);
    }
  }
);
export const logoutUser = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    return thunkAPI.rejectWithValue.logout(error);
  }
});
export const forgotPasswordAction = createAsyncThunk(
  "auth/forgot-password",
  async (data, thunkAPI) => {
    try {
      return await authService.forgotPassword(data);
    } catch (error) {
      return thunkAPI.rejectWithValue.forgotPassword(error);
    }
  }
);
export const resetPasswordAction = createAsyncThunk(
  "auth/reset-password",
  async (data, thunkAPI) => {
    try {
      return await authService.resetPassword(data);
    } catch (error) {
      return thunkAPI.rejectWithValue.resetPassword(error);
    }
  }
);
export const getMyProfile = createAsyncThunk(
  "auth/myprofile",
  async (thunkAPI) => {
    try {
      return await authService.myProfile();
    } catch (error) {
      return thunkAPI.rejectWithValue.myProfile(error);
    }
  }
);
export const profileUpdate = createAsyncThunk(
  "auth/update/myprofile",
  async (data, thunkAPI) => {
    try {
      return await authService.updateProfile(data);
    } catch (error) {
      return thunkAPI.rejectWithValue.updateProfile(error);
    }
  }
);
export const passwordUpdate = createAsyncThunk(
  "auth/update/password",
  async (data, thunkAPI) => {
    try {
      return await authService.updatePassword(data);
    } catch (error) {
      return thunkAPI.rejectWithValue.updatePassword(error);
    }
  }
);
export const getUserWishList = createAsyncThunk(
  "auth/wishList",
  async (thunkAPI) => {
    try {
      return await authService.userWishList();
    } catch (error) {
      return thunkAPI.rejectWithValue.userWishList(error);
    }
  }
);
export const addToCart = createAsyncThunk(
  "auth/cart",
  async (cart, thunkAPI) => {
    try {
      return await authService.addCart(cart);
    } catch (error) {
      return thunkAPI.rejectWithValue.addCart(error);
    }
  }
);
export const getUserCart = createAsyncThunk("auth/myCart", async (thunkAPI) => {
  try {
    return await authService.userCart();
  } catch (error) {
    return thunkAPI.rejectWithValue.userCart(error);
  }
});
export const removeProductFromCart = createAsyncThunk(
  "user/deleteCart",
  async (cartId, thunkAPI) => {
    try {
      return await authService.deleteProductFromCart(cartId);
    } catch (error) {
      return thunkAPI.rejectWithValue.deleteProductFromCart(error);
    }
  }
);
export const updateQTCart = createAsyncThunk(
  "user/update/QTCart",
  async (cart, thunkAPI) => {
    try {
      return await authService.updateQTCart(cart);
    } catch (error) {
      return thunkAPI.rejectWithValue.updateQTCart(error);
    }
  }
);

export const createOrder = createAsyncThunk(
  "user/create/order",
  async (order, thunkAPI) => {
    try {
      return await authService.order(order);
    } catch (error) {
      return thunkAPI.rejectWithValue.order(error);
    }
  }
);
export const getMyOrders = createAsyncThunk(
  "user/myOrder",
  async (thunkAPI) => {
    try {
      return await authService.myOrder();
    } catch (error) {
      return thunkAPI.rejectWithValue.order(error);
    }
  }
);

export const authSlice = createSlice({
  name: "authState",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* -------------Register User------------------------ */

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.createdUser = action.payload;
        if (state.isSuccess === true) {
          toast.info("User Created Sucessfully");
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })

      /* -------------User Login ------------------------ */

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.user = action.payload;
        if (state.isSuccess === true) {
          alert("User logged in Sucessfully");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          alert(action.error);
        }
      })

      /* -------------My Profile ------------------------ */

      .addCase(getMyProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.message = "User profile Received";
      })
      .addCase(getMyProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      /* -------------Update Profile ------------------------ */

      .addCase(profileUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(profileUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "User profile Updated";
      })
      .addCase(profileUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      /* ------------- Logout User ------------------------ */

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isAuthenticated = false;
        state.user = {};

        state.message = "User profile Updated";
      })
      /* ------------- Forgot Password ------------------------ */

      .addCase(forgotPasswordAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPasswordAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Email Sent Successfully";
        if (state.isSuccess) {
          alert("Email Sent Successfully");
        }
      })
      .addCase(forgotPasswordAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      /* ------------- Reset Password ------------------------ */

      .addCase(resetPasswordAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPasswordAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.message = "Password Reseted Successfully";
        if (state.isSuccess) {
          alert("Password Reseted Successfully");
        }
      })
      .addCase(resetPasswordAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      /* -------------Update Password ------------------------ */

      .addCase(passwordUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(passwordUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.passwordChange = action.payload;
        state.message = "Password Updated";
      })
      .addCase(passwordUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      /* -------------User WishList ------------------------ */

      .addCase(getUserWishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wishList = action.payload.wishList;
        state.message = "User WishList Received";
      })
      .addCase(getUserWishList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      /* -------------Add To Cart ------------------------ */

      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.newCart = action.payload;
        state.message = "User WishList Received";
        if (state.isSuccess === true) {
          alert("Product added to Cart");
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      /* -------------Get User Cart ------------------------ */

      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.myCart = action.payload;
        state.message = "User Cart Received";
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      /* -------------Delete Product from Cart ------------------------ */

      .addCase(removeProductFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedProductFromCart = action.payload;
        state.message = "deleted product from Cart ";
      })
      .addCase(removeProductFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      /* -------------Update Quantity To Cart ------------------------ */

      .addCase(updateQTCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQTCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        state.isSuccess = true;
        state.updatedQTCart = action.payload;
        state.message = "Cart Quantity updated ";
      })
      .addCase(updateQTCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      /* ------------- Create Order ------------------------ */

      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderedProduct = action.payload;
        state.message = "Order Success ";
        if (state.isSuccess === true) {
          alert("Order Placed Successfully");
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          alert("Error in placing Order");
        }
      })
      /* -------------Get My Order ------------------------ */

      .addCase(getMyOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.myOrders = action.payload;
        state.message = "Orders fetched Successfully ";
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default authSlice.reducer;
