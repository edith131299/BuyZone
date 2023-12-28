import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { enquiryService } from "./contactService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createEnquiry = createAsyncThunk(
  "contact/post",
  async (data, thunkAPI) => {
    try {
      return await enquiryService.enquiry(data);
    } catch (error) {
      return thunkAPI.rejectWithValue.enquiry(error);
    }
  }
);

export const enquirySlice = createSlice({
  name: "contactState",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ------------- Create Enquiry------------------------ */

      .addCase(createEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.newEnquiry = action.payload;
        state.message = "Enquiry Created successfully";
        alert("Enquiry Submitted");
      })
      .addCase(createEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default enquirySlice.reducer;
