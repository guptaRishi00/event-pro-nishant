import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchUserDetails = createAsyncThunk(
  "userauth/fetchprofile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || null;

      if (!token) {
        console.error("No token found in localstorage");
        rejectWithValue("No token found");
      }

      const response = await axios.get("http://localhost:4000/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log("error", error.message);
      rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "userauth",
  initialState: {
    user: null,
    token: localStorage.getItem("token"),
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state, action) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.user = null;
      });
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
