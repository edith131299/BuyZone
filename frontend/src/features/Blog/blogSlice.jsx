import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { blogService } from "./blogService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllBlogs = createAsyncThunk("auth/blog", async (thunkAPI) => {
  try {
    return await blogService.allBlogs();
  } catch (error) {
    return thunkAPI.rejectWithValue.allBlogs(error);
  }
});
export const getSingleBlog = createAsyncThunk(
  "auth/Singleblog",
  async (id, thunkAPI) => {
    try {
      return await blogService.singleBlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue.singleBlog(error);
    }
  }
);

export const blogSlice = createSlice({
  name: "blogState",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ------------- All Blogs------------------------ */

      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allBlogs = action.payload;
        state.message = "Blogs fetched successfully";
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      /* ------------- Single Blogs------------------------ */

      .addCase(getSingleBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleBlog = action.payload;
        state.message = "Single Blog fetched successfully";
      })
      .addCase(getSingleBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default blogSlice.reducer;
