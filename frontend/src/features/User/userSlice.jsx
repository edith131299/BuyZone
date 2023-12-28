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
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const logoutUser = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const forgotPasswordAction = createAsyncThunk(
  "auth/forgot-password",
  async (data, thunkAPI) => {
    try {
      return await authService.forgotPassword(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetPasswordAction = createAsyncThunk(
  "auth/reset-password",
  async (data, thunkAPI) => {
    try {
      return await authService.resetPassword(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getMyProfile = createAsyncThunk(
  "auth/myprofile",
  async (thunkAPI) => {
    try {
      return await authService.myProfile();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const profileUpdate = createAsyncThunk(
  "auth/update/myprofile",
  async (data, thunkAPI) => {
    try {
      return await authService.updateProfile(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const passwordUpdate = createAsyncThunk(
  "auth/update/password",
  async (data, thunkAPI) => {
    try {
      return await authService.updatePassword(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getUserWishList = createAsyncThunk(
  "auth/user wishList",
  async (thunkAPI) => {
    try {
      return await authService.userWishList();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addToCart = createAsyncThunk(
  "auth/cart",
  async (cart, thunkAPI) => {
    try {
      return await authService.addCart(cart);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const emptyMyCart = createAsyncThunk(
  "auth/Empty-cart",
  async ( thunkAPI) => {
    try {
      return await authService.emptyCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getUserCart = createAsyncThunk("auth/myCart", async (thunkAPI) => {
  try {
    return await authService.userCart();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const removeProductFromCart = createAsyncThunk(
  "user/deleteCart",
  async (cartId, thunkAPI) => {
    try {
      return await authService.deleteProductFromCart(cartId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateQTCart = createAsyncThunk(
  "user/update/QTCart",
  async (cart, thunkAPI) => {
    try {
      return await authService.updateQTCart(cart);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createOrder = createAsyncThunk(
  "user/create/order",
  async (order, thunkAPI) => {
    try {
      return await authService.order(order);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getMyOrders = createAsyncThunk(
  "user/myOrder",
  async (thunkAPI) => {
    try {
      return await authService.myOrder();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
        state.user = action.payload;
        if (state.isSuccess === true) {
          toast.info("User Created Sucessfully");
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data.message;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })

      /* -------------User Login ------------------------ */

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.user = action.payload;
        if (state.isSuccess === true) {
          toast.info("User logged in Sucessfully");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        console.log(action.payload.response.data.message)
        state.message = action.payload.response.data.message;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })

      /* -------------My Profile ------------------------ */

      .addCase(getMyProfile.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
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
        if(state.isSuccess){
          toast.success("Profile Updated Successfully")
        }
      })
      .addCase(profileUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data.message;
        if(state.isError){
          toast.error("Profile Not Updated")
        }
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
        state.message = "User Logout Successfull";
        toast.success("Logout Successfull")
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
          toast.success("Email Sent Successfully");
        }
      })
      .addCase(forgotPasswordAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data.message;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
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
          toast.success("Password Reseted Successfully");
        }
      })
      .addCase(resetPasswordAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data.message;
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
        state.message = action.payload.response.data.message;
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
        state.message = action.payload.response.data.message;
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
        state.message = action.payload.response.data.message;
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
        state.message = action.payload.response.data.message;
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
        state.message = action.payload.response.data.message;
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
        state.message = action.payload.response.data.message;
      })


      /* ------------- Empty Cart  ------------------------ */

      .addCase(emptyMyCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(emptyMyCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCart = action.payload;
        state.message = "Empty Cart Successfull";
      })
      .addCase(emptyMyCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data.message;
      })


      /* ------------- Create Order ------------------------ */

      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.myOrders = action.payload;
        state.myCart=[]
        state.message = "Order Success ";
        if (state.isSuccess === true) {
          toast.success("Order Placed Successfully");
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data.message;
        if (state.isError === true) {
          toast.error("Error in placing Order");
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
        state.message = action.payload.response.data.message;
      });
  },
});

export default authSlice.reducer;
