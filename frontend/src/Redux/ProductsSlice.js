import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GET_ALL_PRODUCTS_URL } from "../features/endpoints";

const initialState = {
  items: [],
  isLoading: true,
  errorMessage: false,
  errorStatus: 0,
};

export const getAllProducts = createAsyncThunk(
  "gettingItems/getAllItems",
  async (token, thunkAPI) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const resp = await axios.get(GET_ALL_PRODUCTS_URL, config);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  }
);

const getAllProductsSlice = createSlice({
  name: "getAllProducts",
  initialState,
  reducers: {
    deleteItem: (state, action) => {
      const productIdToRemove = action.payload;
      const newState = state.items.filter(item => item.id !== productIdToRemove);
      return { ...state, items: newState };
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { deleteItem } = getAllProductsSlice.actions;

export default getAllProductsSlice.reducer;
