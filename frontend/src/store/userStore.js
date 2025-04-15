import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/userAuthSlice";
import eventsSlice from "../features/eventsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    events: eventsSlice,
  },
});
