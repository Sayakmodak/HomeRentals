import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.js";
import { authApi } from "@/features/api/authApi.js";
import { setupListeners } from "@reduxjs/toolkit/query";
import { hotelApi } from "@/features/api/hotelApi.js";
import { roomApi } from "@/features/api/roomApi.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(hotelApi.middleware)
      .concat(roomApi.middleware),
});

setupListeners(store.dispatch);

const initializeApp = async () => {
  await store.dispatch(
    authApi.endpoints.getUserProfile.initiate({}, { forceRefetch: true })
  );
};
initializeApp();
