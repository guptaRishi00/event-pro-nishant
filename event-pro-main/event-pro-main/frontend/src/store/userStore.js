import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/userAuthSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
