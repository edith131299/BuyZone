import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "./productService";
import { toast } from "react-toastify";

const initialState = {
  products: {},
  singleProduct: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllProducts = createAsyncThunk(
  "auth/products",
  async (userData, thunkAPI) => {
    try {
      return await productService.getProducts(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getSingleProduct = createAsyncThunk(
  "auth/singleProduct",
  async (userData, thunkAPI) => {
    try {
      return await productService.singleProduct(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addToWishList = createAsyncThunk(
  "auth/wishList",
  async (prodId, thunkAPI) => {
    try {
      return await productService.addToWishlist(prodId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addRating = createAsyncThunk(
  "auth/rating",
  async (data, thunkAPI) => {
    try {
      return await productService.rating(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const searchProduct = createAsyncThunk(
  "auth/searchProducts",
  async (data, thunkAPI) => {
    try {
      return await productService.searchProduct(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const productSlice = createSlice({
  name: "productState",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ------------- Get All Product ----------------------- */

      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;

        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      /* ------------- Add to WishList ----------------------- */

      .addCase(addToWishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addToWishList = action.payload;
        state.message = "Product added to wishlist";
      })
      .addCase(addToWishList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      /* ------------- Get Single Product ----------------------- */
      .addCase(getSingleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleProduct = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      /* ------------- Get Single Product ----------------------- */
      .addCase(addRating.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRating.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleProduct = action.payload;
      })
      .addCase(addRating.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default productSlice.reducer;
