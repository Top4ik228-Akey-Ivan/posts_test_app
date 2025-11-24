import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "../services/postsApi";
import postsReducer from "./postsSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(postsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
