import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { REGISTER_URL, LOGIN_URL } from "../features/endpoints";

const initialState = {
  userData: localStorage.getItem("loginInfoHIU")
    ? JSON.parse(localStorage.getItem("loginInfoHIU"))
    : [],
  isRegisterLoading: false,
  isLoginLoading: false,
  error: false,
  errorCode: 0,
};

export const login = createAsyncThunk("user/login", async (date, thunkAPI) => {
  try {
    const resp = await axios.post(LOGIN_URL, {
      email: date.email,
      password: date.password,
    });
    return resp.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

export const register = createAsyncThunk(
  "user/register",
  async (date, thunkAPI) => {
    try {
      const resp = await axios.post(REGISTER_URL, {
        email: date.email,
        password: date.password,
      });

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  }
);

const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("loginInfoHIU");
      return {
        ...state,
        userData: [],
        isRegisterLoading: false,
        isLoginLoading: false,
        error: false,
        errorCode: 0,
      };
    },
  },
  extraReducers(builder) {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.isLoginLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoginLoading = false;
        state.isRegisterLoading = false;
        state.error = false;
        state.userData = action.payload;
        localStorage.setItem("loginInfoHIU", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.isRegisterLoading = false;
        state.error = action.payload.message;
        state.errorCode = action.payload.status;
      })
      // Register cases
      .addCase(register.pending, (state) => {
        state.isRegisterLoading = true;
        state.isLoginLoading = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoginLoading = false;
        state.isRegisterLoading = false;
        state.error = false;
        localStorage.setItem("loginInfoHIU", JSON.stringify(action.payload));
        state.userData = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.isRegisterLoading = false;
        state.error = action.payload.message;
        state.errorCode = action.payload.status;
      });
  },
});
export const { logout } = authSlice.actions;

export default authSlice.reducer;
